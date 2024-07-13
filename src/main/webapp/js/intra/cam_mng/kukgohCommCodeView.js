var kukgohCommCodeView = {

    global: {

    },

    fn_defaultScript: function () {
        kukgohCommCodeView.mainGrid();
        customKendo.fn_textBox(["req"]);
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getCmmnCodeDetailList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.cmmnCode = $("#cmmnCode").val();
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

        $("#kukgohCommCodeGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="kukgohCommCodeView.fn_save()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="kukgohCommCodeView.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            persistSelection : true,
            columns: [
                {
                    field : "CMMN_DETAIL_CODE",
                    title : "코드",
                    width : 100
                },
                {
                    field : "CMMN_DETAIL_CODE_NM",
                    title : "코드명",
                    width : 150
                },
                {
                    field : "",
                    title : "관리항목1",
                    template: function(e){
                        return '<input type="text" class="k-input" name="aText" obj="A" keyVal="' + e.CNTC_SN + '" value="'+ (e.CMMN_OBJ_A || '')+ '"  />'
                    }
                },
                {
                    field : "",
                    title : "관리항목2",
                    template: function(e){
                        return '<input type="text" class="k-input" name="aText" obj="B" keyVal="' + e.CNTC_SN + '" value="'+ (e.CMMN_OBJ_B || '')+ '" />'
                    }
                },
                {
                    field : "CMMN_CODE_DC",
                    title : "코드설명",
                    width : 180
                },
                {
                    field : "MANAGE_IEM_CN_1",
                    title : "e나라도움 관리항목1"
                },
                {
                    field : "MANAGE_IEM_CN_2",
                    title : "e나라도움 관리항목2"
                },
                {
                    field : "MANAGE_IEM_CN_3",
                    title : "e나라도움 관리항목3"
                },
                {
                    field : "MANAGE_IEM_CN_4",
                    title : "e나라도움 관리항목4"
                },
                {
                    field : "MANAGE_IEM_CN_5",
                    title : "e나라도움 관리항목5"
                },
                {
                    title : "첨부파일",
                    width : 100
                }]
        }).data("kendoGrid");
    },

    fn_reqPopOnen : function(){
        var url = "/mng/kukgohCommCodeViewPop.do";
        var name = "kukgohCommCodeViewPop";
        var option = "width=520, height=620, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    fn_save : function (){
        const grid = $("#kukgohCommCodeGrid").data("kendoGrid");
        grid.tbody.find("tr").each(function () {
            var data = {
                cntcSn : "",
                obj : "",
                cmmnObjA : "",
                cmmnObjB : "",
                regEmpSeq : $("#myEmpSeq").val()
            }

            $(this).find("input[name='aText']").each(function () {
                if($(this).val() != ""){
                    data.cntcSn = $(this).attr("keyVal");
                    data.obj = $(this).attr("obj");
                    if(data.obj == "A"){
                        data.cmmnObjA = $(this).val();
                    }else if(data.obj == "B"){
                        data.cmmnObjB = $(this).val();
                    }
                }
            });

            if(data.cntcSn != ""){
                $.ajax({
                    url : "/kukgoh/setCommCodeObject",
                    data : data,
                    type : "post",
                    dataType : "json",
                    success : function(rs){
                        if(rs.code == 200){
                            alert("저장되었습니다.");
                            kukgohCommCodeView.gridReload();
                        }
                    }
                });
            }
        });
    }



}