let sum=0;
var prjBgtMng = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["searchText"]);
        customKendo.fn_datePicker("frDt", '', "yyyy-MM-dd", new Date(prjBgtMng.global.now.getFullYear() + '-01-01'));
        customKendo.fn_datePicker("toDt", '', "yyyy-MM-dd", new Date(prjBgtMng.global.now.getFullYear() + '-12-31'));

        var bcDsData = {
            cmGroupCode : "BUSN_CLASS"
        };
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        bcDs.rs.pop(); // 법인 삭제
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");
        $("#searchValue2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "프로젝트코드", value: "1" },
                { text: "프로젝트명", value: "2" },
                { text: "담당자", value: "3" }
            ],
            index: 0
        });

        $("#dtGubun").kendoDropDownList({
            dataSource : [
                {text : "시작일", value : "a"},
                {text : "종료일", value : "b"}
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        prjBgtMng.gridReload();
    },

    gridReload : function (){
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }
        
        prjBgtMng.mainGrid();
    },

    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/g20/getProjectViewList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.dtGubun = $("#dtGubun").val();
                    data.pjtFromDate = $("#frDt").val().replace(/-/g, "");
                    data.pjtToDate = $("#toDt").val().replace(/-/g, "");

                    data.busnClass = $("#busnClass").val();

                    data.searchValue2 = $("#searchValue2").data("kendoDropDownList").value();
                    data.searchText = $("#searchText").val();

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

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 551,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20,  50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="prjBgtMng.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    template: "#= --record #",
                    width: 30
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 80
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: 400,
                    template: function(e){
                       return '<a href="javascript:void(0);" style="font-weight: bold;" onclick="prjBgtMng.fn_projectPopView(\'' + e.PJT_CD + '\')";>' + e.PJT_NM + '</a>'
                    }
                }, {
                    field: "REG_DT",
                    title: "등록일자",
                    width: 80,
                }, {
                    field: "pjtFromDate",
                    title: "시작일자",
                    width: 80,
                }, {
                    field: "pjtToDate",
                    title: "종료일자",
                    width: 80,
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    // project 상세페이지
    fn_projectPopView : function (key){
        var url = "/mng/pop/projectMngPop.do?pjtCd=" + key;

        var name = "blank";
        var option = "width = 1280, height = 850, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    dateValidationCheck : function (id, val){
        var sDt = new Date($("#frDt").val());
        var nDt = new Date($("#toDt").val());

        if(id == "frDt"){
            if(sDt > nDt){
                $("#toDt").val(val);
            }
        }else{
            if(sDt > nDt){
                $("#frDt").val(val);
            }
        }
    }
}