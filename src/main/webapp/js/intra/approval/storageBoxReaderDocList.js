/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 상신/보관함 > 임시보관문서
 *
 * function / global variable / local variable setting
 */

var storageBoxReader = {
    global : {
        now : new Date(),
        searchAjaxData : "",
    },

    init : function(){
        customKendo.fn_textBox(["docTitle"]);

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(storageBoxReader.global.now.setMonth(storageBoxReader.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        $("#readStatus").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "열람", value: "Y"},
                {text: "미열람", value: "N"}
            ]
        })
        $("#readStatus").change(function(){
            storageBoxReader.gridReload();
        });

        storageBoxReader.gridReload();
    },

    mainGrid : function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 489,
            dataSource: customKendo.fn_gridDataSource2(url, params, 10),
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
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="storageBoxReader.setBatchReading()">' +
                            '	<span class="k-button-text">일괄열람</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="storageBoxReader.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "열람문서 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    width: '3%',
                    template : "<input type='checkbox' id='docId#=DOC_ID#' name='docId' value='#=DOC_ID#' class='k-checkbox checkbox'/>"
                }, {
                    field: "FORM_NAME",
                    title: "문서종류",
                    width: 200,
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
                    field : "DOC_NO",
                    title : "문서번호",
                    template : function(e){
                        if(e.DOC_NO == null || e.DOC_NO == ""){
                            return "-"
                        }else{
                            return e.DOC_NO
                        }
                    },
                    width : 200
                }, {
                    field : "DOC_TITLE",
                    title : "문서제목",
                    template : function (e){
                        var securityIcon = '';
                        if(e.SECURITY_TYPE == "009"){
                            securityIcon = '<img src="/images/ico/ico_security.png" style="vertical-align: text-top;" title="보안문서">';
                        }

                        if(e.DOC_TITLE == null || e.DOC_TITLE == ""){
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255);">제목 없음</a>';
                        }else{
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255); display:inline-block;"><xmp style="margin: 0">'+textCut(e.DOC_TITLE, 46)+'</xmp></a>';
                        }
                    },
                    attributes : {
                        style : "text-align : left;"
                    }
                }, {
                    field : "DRAFT_DT",
                    title : "기안일",
                    width : "120px",
                    template : function(e){
                        if(e.REPTIT_DRFT_YN == "N"){
                            if(e.DRAFT_DT != null){
                                return e.DRAFT_DT;
                            }else{
                                return "-";
                            }
                        }else if(e.REPTIT_DRFT_YN == "Y"){
                            return e.REPTIT_DRFT_DT;
                        }
                    }
                }, {
                    field : "LAST_APPROVE_DT",
                    title : "완료일",
                    width : "120px",
                    template : function(e){
                        if(e.LAST_APPROVE_DT == null || e.LAST_APPROVE_DT == ""){
                            return "-"
                        }else{
                            return e.LAST_APPROVE_DT
                        }
                    }
                }, {
                    field : "APPROVE_STAT_CODE_DESC",
                    title : "결재상태",
                    width : "120px"
                }, {
                    field : "READER_YN",
                    title : "열람구분",
                    template : function(e){
                        if(e.READER_YN == 'Y'){
                            return '열람'
                        }else{
                            return '미열람'
                        }
                    },
                    width : 80,
                }, {
                    title : "결재선",
                    width : 80,
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docApproveLineView('+e.DOC_ID+');">' +
                            '<span class="k-icon k-i-hyperlink-open-sm k-button-icon"></span>' +
                            '</button>'
                    }
                }
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=docId]").prop("checked", true);
            else $("input[name=docId]").prop("checked", false);
        });
    },

    gridReload : function() {
        storageBoxReader.global.searchAjaxData = {
            groupSeq : $("#groupSeq").val(),
            compSeq : $("#compSeq").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            docTitle : $("#docTitle").val(),
            startDay : $("#startDay").val(),
            endDay : $("#endDay").val(),
            approveStat : "reader",
            readStatus : $("#readStatus").data("kendoDropDownList").value()
        }

        storageBoxReader.mainGrid("/approvalUser/getUserReadDocStorageBoxList", storageBoxReader.global.searchAjaxData);
    },

    setBatchReading : function(){
        storageBoxReader.global.checkedDocArr = new Array();

        $.each($("input[name=docId]:checked"), function(i, v){
            var data = {
                empSeq : $("#empSeq").val(),
                docId : v.value,
                groupSeq : $("#groupSeq").val(),
                compSeq : $("#compSeq").val(),
                deptSeq : $("#deptSeq").val(),
            }

            storageBoxReader.global.checkedDocArr.push(data);
        });

        storageBoxReader.global.saveAjaxData = {
            batchDocReadArr : JSON.stringify(storageBoxReader.global.checkedDocArr),
        }

        var result = customKendo.fn_customAjax("/approval/setDocReaderReadUser", storageBoxReader.global.saveAjaxData);

        if(result.flag){
            alert("처리되었습니다.");
            $("#checkAll").prop("checked", false);
            storageBoxReader.gridReload();
        }
    }
}