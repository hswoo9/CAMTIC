var inEvalManage = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    init : function(){
        customKendo.fn_textBox(["evalManageTitle"]);
        inEvalManage.gridReload();
    },

    mainGrid1 : function(url, params) {
        $("#mainGrid1").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="inEvalManage.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="inEvalManage.inEvalRegPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="inEvalManage.inEvalRegCopy()">' +
                            '	<span class="k-button-text">복사</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="inEvalManage.setEvalItemActiveUpd()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='eval_#=EVAL_ITEM_MAIN_ID#' name='evalChk' value='#=EVAL_ITEM_MAIN_ID#'/>",
                    width: 50
                },{
                    template: "#= --record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "EVAL_MANAGE_TITLE",
                    title: "관리명",
                    template : function(e){
                        return '<a class="title" onclick="inEvalManage.inEvalRegPop(' + e.EVAL_ITEM_MAIN_ID + ')" style="cursor: pointer;">' + e.EVAL_MANAGE_TITLE + '</a>'
                    }
                }, {
                    field: "EVAL_ITEM_CNT",
                    title: "항목수",
                    width: 80
                }, {
                    title: "관리",
                    width : 150,
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info"  onclick="inEvalManage.inEvalRegPop(' + e.EVAL_ITEM_MAIN_ID + ')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    },
                    width: 80
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=evalChk]").prop("checked", true);
            else $("input[name=evalChk]").prop("checked", false);
        });
    },

    gridReload : function() {
        inEvalManage.global.searchAjaxData = {
            evalManageTitle : $("#evalManageTitle").val()
        }

        inEvalManage.mainGrid1("/inside/getEvalItemMainList.do", inEvalManage.global.searchAjaxData);
    },

    inEvalRegPop : function(e) {
        var url = "/inside/pop/inEvalRegPop.do";
        if(e != null){
            url += "?evalItemMainId=" + e
        }
        var name = "inEvalRegPop";
        var option = "width=1000, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    inEvalRegCopy : function(){
        if(confirm("선택한 평가표를 복사하시겠습니까?")){
            var evalItemMainId = "";

            $.each($("input[name='evalChk']:checked"), function(){
                evalItemMainId += "," + $(this).val()
            })

            inEvalManage.global.saveAjaxData = {
                empSeq : $("#empSeq").val(),
                evalItemMainId : evalItemMainId.substring(1)
            }

            var result = customKendo.fn_customAjax("/inside/setInEvalRegCopy.do", inEvalManage.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                inEvalManage.gridReload();
            }
        }
    },

    setEvalItemActiveUpd : function(){
        if($("input[name='evalChk']:checked").length == 0){
            alert("삭제할 면접평가표를 선택해주세요.");
            return
        }

        if(confirm("선택한 면접평가표을 삭제하시겠습니까?")){
            var evalItemMainId = "";

            $.each($("input[name='evalChk']:checked"), function(){
                evalItemMainId += "," + $(this).val()
            })

            inEvalManage.global.saveAjaxData = {
                empSeq : $("#empSeq").val(),
                evalItemMainId : evalItemMainId.substring(1)
            }

            var result = customKendo.fn_customAjax("/inside/setEvalItemActiveUpd.do", inEvalManage.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                inEvalManage.gridReload();
            }
        }
    }
}
