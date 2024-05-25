var selInEvalItemPop = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    init : function(){
        customKendo.fn_textBox(["evalManageTitle"]);
        selInEvalItemPop.gridReload();
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="selInEvalItemPop.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "EVAL_MANAGE_TITLE",
                    title: "관리명",
                    template : function(e){
                        return '<a class="title" onclick="selInEvalItemPop.inEvalRegPop(' + e.EVAL_ITEM_MAIN_ID + ')" style="cursor: pointer;">' + e.EVAL_MANAGE_TITLE + '</a>'
                    }
                }, {
                    field: "EVAL_ITEM_CNT",
                    title: "항목수",
                    width: 80
                }, {
                    title: "선택",
                    width: 80,
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="selInEvalItemPop.selEvalItem(' + e.EVAL_ITEM_MAIN_ID + ')">' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    }
                }
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=evalChk]").prop("checked", true);
            else $("input[name=evalChk]").prop("checked", false);
        });
    },

    gridReload : function() {
        selInEvalItemPop.global.searchAjaxData = {
            evalManageTitle : $("#evalManageTitle").val()
        }

        selInEvalItemPop.mainGrid("/inside/getEvalItemMainList.do", selInEvalItemPop.global.searchAjaxData);
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

    selEvalItem : function(e){
        var recruitAreaInfoSn = $("#recruitEvalSheetId").val();
        console.log("recruitAreaInfoSn",recruitAreaInfoSn);
        if(confirm("면접 평가표를 설정하시겠습니까?")){
            selInEvalItemPop.global.saveAjaxData = {
                recruitInfoSn : $("#recruitInfoSn").val(),
                recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
                recruitEvalSheetId : $("#recruitEvalSheetId").val(),
                interviewEvalSheet : e,
                empSeq : $("#empSeq").val(),
                evalItemMainId : e
            }

            var result = customKendo.fn_customAjax("/inside/setRecruitEvalSelSheet.do", selInEvalItemPop.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                opener.parent.$("#recruitEvalSheetId").val(result.params.recruitEvalSheetId);
                window.close();
            }
        }
    }
}
