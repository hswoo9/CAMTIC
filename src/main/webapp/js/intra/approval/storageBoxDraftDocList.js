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
        })

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
                pageSizes: [10, 20, 50, "ALL"],
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
                    width : 180
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
                            return securityIcon + '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255);">'+e.DOC_TITLE+'</a>';
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
                        if(e.APPROVE_STAT_CODE == "10" || e.APPROVE_STAT_CODE == "20" || e.APPROVE_STAT_CODE == "50"){
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick=\"storageBoxDraft.setDocApprovalRetrieve('+ e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.LINKAGE_TYPE + '\',\'retrieve\')\">' +
                                '<span class="k-icon k-i-change-manually k-button-icon"></span>' +
                                '<span class="k-button-text">회수</span>' +
                                '</button>';
                        } else if(e.APPROVE_STAT_CODE == "100" || e.APPROVE_STAT_CODE == "101"){
                            return "-";
                        }
                    }
                }]
        }).data("kendoGrid");
    },

    gridReload : function() {
        storageBoxDraft.global.searchAjaxData = {
            empSeq : $("#empSeq").val(),
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