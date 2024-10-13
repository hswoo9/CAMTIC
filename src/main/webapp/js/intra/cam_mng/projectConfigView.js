var projectConfigView = {

    global: {
        dropDownDataSource : "",
    },

    fn_defaultScript: function () {
        customKendo.fn_datePicker("fromMonth", 'decade', "yyyy", new Date());

        projectConfigView.global.dropDownDataSource = [
            { text: "미설정", value: "N" },
            { text: "설정완료", value: "Y" }
        ]
        customKendo.fn_dropDownList("searchType", projectConfigView.global.dropDownDataSource, "text", "value");

        projectConfigView.mainGrid();
    },

    gridReload : function(){
        $("#kukgohPjtConfigGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/kukgoh/getProjectList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.year = $("#fromMonth").val();
                    data.pjtNm = $("#pjtNm").val();
                    data.searchType = $("#searchType").data("kendoDropDownList").value();
                    return data;
                }

            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#kukgohPjtConfigGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            resizable : true,
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="projectConfigView.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    field : "PJT_CD",
                    title : "프로젝트코드",
                    width : 100
                },
                {
                    field : "PJT_NM",
                    title : "프로젝트명",
                    width : 250
                },
                {
                    title : "사업코드",
                    width : 50,
                    template : function(dataItem){
                        return "<button type='button' class='k-button k-button-solid-base' onclick='projectConfigView.fn_btnPjtChoice("+dataItem.PJT_SN+", \""+dataItem.PJT_CD+"\", \""+(dataItem.DDTLBZ_ID || "")+"\");'>선택</button>";
                    },
                },
                {
                    title : "설정취소",
                    width : 50,
                    template : function(e){
                        if(e.LNK_PJT_SN != null){
                            return '<button type="button" class="k-button k-button-solid-error" onclick="projectConfigView.fn_delEnaraProject('+e.LNK_PJT_SN+')">취소</button>'
                        } else {
                            return "";
                        }
                    }
                },
                {
                    field : "DDTLBZ_ID",
                    title : "상세사업ID",
                    width : 90
                },
                {
                    field : "DDTLBZ_NM",
                    title : "상세사업명",
                    width : 90
                },
                {
                    field : "UPPER_BSNS_NM",
                    title : "상위사업명",
                    width : 90
                },
                {
                    field : "BSNSYEAR",
                    title : "회계연도",
                    width : 70
                },
                {
                    field : "",
                    title : "신청일자",
                    width : 90,
                    template : function(data){
                        if(data.REQST_DE != "" && data.REQST_DE != null){
                            return data.REQST_DE.toString().substring(0,4) + "-" + data.REQST_DE.toString().substring(4,6) + "-" + data.REQST_DE.toString().substring(6,8);
                        } else {
                            return ""
                        }
                    }
                }
               ]
        }).data("kendoGrid");
    },

    fn_btnPjtChoice : function(pjtSn, pjtCd, cd){
        if(cd != ""){
            alert("설정이 완료된 프로젝트입니다.");
            return;
        }
        var url = "/mng/budgetPjtChoicePop.do?pjtSn="+pjtSn+"&pjtCd="+pjtCd;
        var name = "budgetChoicePop";
        var option = "width=1200, height=800, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    fn_delEnaraProject : function(e){
        if(!confirm("프로젝트 설정을 취소하시겠습니까?")){
            return;
        }

        $.ajax({
            url : "/kukgoh/delEnaraProject",
            data : {
                lnkPjtSn : e
            },
            type : "post",
            dataType: "json",
            success : function(rs){
                if(rs.code == 200){
                    alert(rs.message);
                    projectConfigView.gridReload();
                }
            }
        })
    }

}