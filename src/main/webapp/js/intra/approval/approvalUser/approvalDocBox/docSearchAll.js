/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 문서함 > 문서검색전체
 *
 * function / global variable / local variable setting
 */
var docSearchAll = {
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
            value : new Date(docSearchAll.global.now.setMonth(docSearchAll.global.now.getMonth() - 1))
        });

        $("#startDay, #endDay").attr("readonly", true);

        docSearchAll.global.dropDownDataSource = [
            { text : "생산문서", value : "000" },
            { text : "접수문서", value : "001" },
        ];

        $("#searchCategory").kendoDropDownList({
            dataSource : docSearchAll.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value"
        });

        docSearchAll.global.dropDownDataSource = [
            { text : "전체", value : "" },
            { text : "제목", value : "T" },
            { text : "문서번호", value : "N" },
            { text : "기안자", value : "DN" },
            { text : "기록물철", value : "WI" },
            { text : "양식명", value : "FN" },
            { text : "발신기관", value : "SE" },
            { text : "수신기관", value : "RE" },
        ];
        $("#searchKeyWord").kendoDropDownList({
            dataSource : docSearchAll.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value"
        });

        $("#searchContent").kendoTextBox();

        docSearchAll.gridReload();
    },

    gridReload : function() {
        docSearchAll.global.searchAjaxData = {
            empSeq : $("#empSeq").val(),
            deptSeq : $("#sDeptSeq").val(),
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
        docSearchAll.mainGrid("/approvalUser/getApprovalDocSearchList.do", docSearchAll.global.searchAjaxData);
    },

    mainGrid :  function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 430,
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
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
                    field : "DOC_GBN_SN",
                    title : "문서구분",
                    width : 90,
                    template : function(e){
                        if(e.DOC_GBN_SN == "000"){
                            return "생산문서"
                        }else{
                            return "접수문서"
                        }
                    },
                }, {
                    field : "FORM_NAME",
                    title : "양식명",
                    width : 160
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
                    width : 90
                }, {
                    field : "DRAFT_EMP_NAME",
                    title : "기안/접수자",
                    width : 90,
                }, {
                    field : "C_AITITLE",
                    title : "기록물철",
                    width : 120,
                }, {
                    field : "ORGAN",
                    title : "발신기관",
                    width : 120,
                }, {
                    field : "C_SIRECEIVENAME",
                    title : "수신기관",
                    width : 120,
                }, {
                    title : "결재선",
                    width : 70,
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="docApproveLineView('+e.DOC_ID+');">' +
                            '<span class="k-icon k-i-hyperlink-open-sm k-button-icon"></span>' +
                            '</button>'
                    }
                }]
        }).data("kendoGrid");
    },

    /** 조직도 부서 팝업 or 모달 */
    deptSearchPopup : function (){
        windowPopUrl = "/common/deptPopup.do";
        popName = "조직도";
        popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=355, height=700";

        window.open(windowPopUrl, popName, popStyle);
    },

    dateValidationCheck : function(id, val){
        var sDt = new Date($("#startDay").val());
        var nDt = new Date($("#endDay").val());

        if(id == "startDay"){
            if(sDt > nDt){
                $("#endDay").data("kendoDatePicker").value(val);
            }
        }else{
            if(sDt > nDt){
                $("#startDay").data("kendoDatePicker").value(val);
            }
        }
    },
}