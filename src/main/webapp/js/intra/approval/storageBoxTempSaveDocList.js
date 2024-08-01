/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 상신/보관함 > 임시보관문서
 *
 * function / global variable / local variable setting
 */

var storageBoxTemp = {
    global : {
        now : new Date(),
        searchAjaxData : "",
        saveAjaxData : "",

        checkedDocArr : new Array()
    },

    init : function(){
        customKendo.fn_textBox(["docTitle"]);

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(storageBoxTemp.global.now.setMonth(storageBoxTemp.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        storageBoxTemp.gridReload();
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
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="storageBoxTemp.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="storageBoxTemp.setCheckedDocDel()">' +
                            '	<span class="k-button-text">문서 삭제</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "임시보관문서 목록.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    width: '3%',
                    template : "<input type='checkbox' id='docId#=DOC_ID#' name='docId' value='#=DOC_ID#' class='k-checkbox checkbox'/>"
                }, {
                    field : "FORM_NAME",
                    title : "문서종류",
                    width : 180,
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
                    width : "160px",
                    template : function(e){
                        if(e.DOC_NO == null || e.DOC_NO == ""){
                            return "-"
                        }else{
                            return e.DOC_NO
                        }
                    }
                }, {
                    title : "문서제목",
                    template : function (e){
                        var securityIcon = '';
                        if(e.SECURITY_TYPE == "009"){
                            securityIcon = '<img src="/images/ico/ico_security.png" style="vertical-align: text-top;" title="보안문서">';
                        }

                        if(e.DOC_TITLE == null || e.DOC_TITLE == ""){
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255);">제목 없음</a>';
                        }else{
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255); display:inline-block;"><xmp style="margin: 0">'+textCut(e.DOC_TITLE, 70)+'</xmp></a>';
                        }
                    },
                    attributes : {
                        style : "text-align : left;"
                    }
                }, {
                    field : "REG_DATE",
                    title : "저장일시",
                    width : "120px"
                }, {
                    title : "",
                    width : 80,
                    template : function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick=\"tempOrReDraftingPop('+ e.DOC_ID + ',\'' + e.DOC_MENU_CD + '\',\'' + e.APPRO_KEY + '\',\'' + e.LINKAGE_TYPE + '\',\'reDrafting\', \'tempDrafting\')\">' +
                            '<span class="k-icon k-i-track-changes k-button-icon"></span>' +
                            '<span class="k-button-text">상신</span>' +
                            '</button>';
                    }
                }]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=docId]").prop("checked", true);
            else $("input[name=docId]").prop("checked", false);
        });
    },

    gridReload : function() {
        storageBoxTemp.global.searchAjaxData = {
            empSeq : $("#empSeq").val(),
            docTitle : $("#docTitle").val(),
            startDay : $("#startDay").val(),
            endDay : $("#endDay").val(),
            approveStat : "temp",
        }

        storageBoxTemp.mainGrid("/approvalUser/getUserDocStorageBoxList", storageBoxTemp.global.searchAjaxData);
    },

    setCheckedDocDel : function(){
        if(confirm("삭제하시겠습니까?")){
            storageBoxTemp.global.checkedDocArr = new Array();

            $.each($("input[name=docId]:checked"), function(i, v){
                var data = {
                    empSeq : $("#empSeq").val(),
                    docId : v.value
                }

                storageBoxTemp.global.checkedDocArr.push(data);
            });

            storageBoxTemp.global.saveAjaxData = {
                docArr : JSON.stringify(storageBoxTemp.global.checkedDocArr),
            }

            console.log(storageBoxTemp.global.checkedDocArr);

            var result = customKendo.fn_customAjax("/approvalUser/setCheckedDocDel.do", storageBoxTemp.global.saveAjaxData);

            if(result.flag){
                alert("삭제되었습니다.");
                $("#checkAll").prop("checked", false);
                storageBoxTemp.gridReload();
            }
        }
    },
}