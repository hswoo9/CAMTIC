/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 문서함 > 문서검색
 *
 * function / global variable / local variable setting
 */
var docSearchDeptAll = {
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
            value : new Date(docSearchDeptAll.global.now.setMonth(docSearchDeptAll.global.now.getMonth() - 1))
        });

        $("#startDay, #endDay").attr("readonly", true);

        docSearchDeptAll.global.dropDownDataSource = [
            { text : "전체", value : "" },
            { text : "제목", value : "T" },
            { text : "문서번호", value : "N" },
            { text : "기안자", value : "DN" },
            { text : "양식명", value : "FN" },
        ];
        $("#searchKeyWord").kendoDropDownList({
            dataSource : docSearchDeptAll.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value"
        });

        $("#searchContent").kendoTextBox();

        docSearchDeptAll.gridReload();
    },

    gridReload : function() {
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }

        docSearchDeptAll.global.searchAjaxData = {
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
        docSearchDeptAll.mainGrid("/approvalUser/getApprovalDocSearchList.do", docSearchDeptAll.global.searchAjaxData);
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
            toolbar : [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "부서문서목록.xlsx",
                filterable : true,
                allPages: true
            },
            columns: [
                {
                    field : "DOC_NO",
                    title : "문서번호",
                    width : 200,
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
                    width : 200,
                    template : function(e){
                        if(e.DOC_MENU_CD == "rndDelv"){
                            return "수주보고_R&D";
                        } else if (e.DOC_MENU_CD == "unRndDelv"){
                            return "수주보고_비R&D";
                        } else if (e.DOC_MENU_CD == "rndDev"){
                            return "수행계획서_R&D";
                        } else if (e.DOC_MENU_CD == "unRndDev"){
                            return "수행계획서_비R&D";
                        } else if (e.DOC_MENU_CD == "rndRes"){
                            return "결과보고서_R&D";
                        } else if (e.DOC_MENU_CD == "unRndRes"){
                            return "결과보고서_비R&D";
                        } else if (e.DOC_MENU_CD == "delv"){
                            if(e.BUSN_CLASS == "D"){
                                return "수주보고_엔지니어링";
                            }else{
                                return "수주보고_용역/기타";
                            }
                        } else if (e.DOC_MENU_CD == "dev"){
                            if(e.BUSN_CLASS == "D"){
                                return "수행계획서_엔지니어링";
                            }else{
                                return "수행계획서_용역/기타";
                            }
                        } else if (e.DOC_MENU_CD == "pjtRes"){
                            if(e.BUSN_CLASS == "D"){
                                return "결과보고서_엔지니어링";
                            }else{
                                return "결과보고서_용역/기타";
                            }
                        } else {
                            return e.FORM_NAME;
                        }
                    }
                }, {
                    field: "DOC_TITLE",
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
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\',\'' + e.DEL_FLAG + '\');" ' + textColor + '>'+textCut(e.DOC_TITLE, 87)+'</a>';
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

    dateValidationCheck : function (id, val){
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