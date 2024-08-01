/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 문서함 > 내 문서함 ( 미사용 )
 *
 * function / global variable / local variable setting
 */
var docBoxDept = {
    global : {
        dropDownDataSource : "",
        searchAjaxData  : "",
        saveAjaxData    : "",
        now             : new Date(),

        windowPopUrl    : "",
        popName         : "",
        popStyle        : "",
    },

    fnDefaultScript : function(){
        $("#endDay").kendoDatePicker({
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#startDay").kendoDatePicker({
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(docBoxDept.global.now.setMonth(docBoxDept.global.now.getMonth() - 1))
        });

        $("#startDay, #endDay").attr("readonly", true);

        docBoxDept.global.dropDownDataSource = [
            { text : "내부문서", value : "000" },
            { text : "발송문서", value : "001" },
            { text : "접수문서", value : "002" },
        ];

        $("#searchCategory").kendoDropDownList({
            dataSource : docBoxDept.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value",
        });

        docBoxDept.global.dropDownDataSource = [
            { text : "제목", value : "T" },
            { text : "문서번호", value : "N" },
            { text : "기안자", value : "DN" },
            { text : "양식명", value : "FN" }
        ];
        customKendo.fn_dropDownList("searchKeyWord", docBoxDept.global.dropDownDataSource, "text", "value");

        $("#searchContent").kendoTextBox();

        docBoxDept.gridReload();
    },

    gridReload : function() {
        docBoxDept.global.searchAjaxData = {
            deptSeq : $("#deptSeq").val(),
            empSeq : $("#empSeq").val(),
            groupSeq : $("#groupSeq").val(),
            compSeq : $("#compSeq").val(),
            startDay : $("#startDay").val(),
            endDay : $("#endDay").val(),
            searchCategory : $("#searchCategory").val(),
            searchKeyWord : $("#searchKeyWord").val(),
            searchContent : $("#searchContent").val().replaceAll("&", '|'),
        }

        /**
         * 카테고리 검색조건 추가해야함
         */
        docBoxDept.mainGrid("/approvalUser/getApprovalDocSearchList.do", docBoxDept.global.searchAjaxData);
    },

    mainGrid :  function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 451,
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            resizable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            dataBound : function(e){
                var items = e.sender.items();
                items.each(function () {
                    var dataItem = $("#mainGrid").data("kendoGrid").dataItem(this);
                    if(dataItem != null){
                        if (dataItem.DEL_FLAG == "Y") {
                            this.className += " text_redLine";
                        }
                    }
                })
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : "DOC_NO",
                    title : "문서번호",
                    width : 150,
                    template : function(e){
                        if(e.DOC_NO == null || e.DOC_NO == ""){
                            return "-"
                        }else{
                            return e.DOC_NO
                        }
                    },
                }, {
                    field : "FORM_NAME",
                    title : "양식명",
                    width : 180
                }, {
                    title : "제목",
                    template : function (e){
                        var securityIcon = '';
                        var textColor= 'style="color: rgb(0, 51, 255);"';

                        if(e.DEL_FLAG == "Y"){
                            textColor = 'style="color: #f33e51;"';
                        }

                        if(e.SECURITY_TYPE == "009"){
                            securityIcon = '<img src="/images/ico/ico_security.png" style="vertical-align: text-top;" title="보안문서">';
                        }

                        if(e.DOC_TITLE == null || e.DOC_TITLE == ""){
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\',\'' + e.DEL_FLAG + '\');" ' + textColor + '>제목 없음</a>';
                        }else{
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\',\'' + e.DEL_FLAG + '\');" ' + textColor + '>'+e.DOC_TITLE+'</a>';
                        }
                    },
                    attributes : {
                        style : "text-align : left;"
                    }
                }, {
                    field : "REG_DATE",
                    title : "등록일자",
                    width : "120px"
                }, {
                    field : "DRAFT_EMP_NAME",
                    title : "기안자",
                    width : 90,
                }, {
                    title : "결재선",
                    width : 70,
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="docApproveLineView('+e.DOC_ID+');">' +
                            '<span class="k-icon k-i-hyperlink-open-sm k-button-icon"></span>' +
                            '</button>'
                    }
                }/*, {
                    title : "",
                    width : 100,
                    template : function(e){
                        if((e.APPROVE_STAT_CODE == "30" || e.APPROVE_STAT_CODE == "40") && e.DEL_FLAG == "N"){
                            return '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick=\"tempOrReDraftingPop('+ e.DOC_ID + ',\'' + e.DOC_MENU_CD + '\',\'' + e.APPRO_KEY + '\',\'' + e.LINKAGE_TYPE + '\',\'reDrafting\')\">' +
                                '<span class="k-icon k-i-track-changes-enable k-button-icon"></span>' +
                                '<span class="k-button-text">재기안</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    }
                }*/]
        }).data("kendoGrid");
    },
}