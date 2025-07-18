var storageBoxDraft = {
    global : {
        now : new Date(),
        searchAjaxData : "",
    },

    init : function(params){
        customKendo.fn_textBox(["docTitle"]);

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(storageBoxDraft.global.now.setMonth(storageBoxDraft.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        let studyDataSource = [
            { text: "전체", value: "" },
            { text: "진행중", value: "1" }
        ]
        customKendo.fn_dropDownList("search", studyDataSource, "text", "value", 3);

        $("#docStatus").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "상신", value: "10"},
                {text: "결재중", value: "20"},
                {text: "재상신", value: "50"},
            ]
        });

        $("#searchKeyword").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "문서명", value: "A" },
                { text: "문서번호", value: "B" },
                { text: "문서종류", value: "C" }
            ]
        });

        storageBoxDraft.gridReload();
    },

    mainGrid : function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 489,
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
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="storageBoxDraft.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },{
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "상신문서 목록.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
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
                        return "-";
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
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255); display:inline-block;"><xmp style="margin: 0">'+textCut(e.DOC_TITLE, 60)+'</xmp></a>';
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
                    },
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
                    width : "120px",
                    template : function(e){
                        if(e.APPROVE_STAT_CODE_DESC == "결재"){
                            return "결재중";
                        }else{
                            return e.APPROVE_STAT_CODE_DESC;
                        }
                    }
                }, {
                    title : "결재선",
                    width : 80,
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docApproveLineView('+e.DOC_ID+');">' +
                            '<span class="k-icon k-i-hyperlink-open-sm k-button-icon"></span>' +
                            '</button>'
                    }
                }, {
                    title : "",
                    width : 80,
                    template : function(e){
                        if(e.APPROVE_STAT_CODE == "10" || e.APPROVE_STAT_CODE == "50"){
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick=\"storageBoxDraft.setDocApprovalRetrieve('+ e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.LINKAGE_TYPE + '\',\'retrieve\')\">' +
                                '<span class="k-icon k-i-change-manually k-button-icon"></span>' +
                                '<span class="k-button-text">회수</span>' +
                                '</button>';
                        }else{
                            return "-";
                        }
                    }
                }]
        }).data("kendoGrid");
    },

    gridReload : function() {
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }

        storageBoxDraft.global.searchAjaxData = {
            empSeq : $("#empSeq").val(),
            searchKeyword : $("#searchKeyword").val(),
            docTitle : $("#docTitle").val(),
            startDay : $("#startDay").val(),
            endDay : $("#endDay").val(),
            approveStat : "draft",
            docStatus : $("#docStatus").data("kendoDropDownList").value()
        }

        storageBoxDraft.mainGrid("/approvalUser/getUserDocStorageBoxList", storageBoxDraft.global.searchAjaxData);
    },

    setDocApprovalRetrieve : function(docId, approKey, linkageType, type){
        docApprovalRetrieve(docId, approKey, linkageType, type, function(){storageBoxDraft.gridReload()});
    }
}