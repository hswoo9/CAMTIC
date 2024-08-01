var recruitDrafting = {
    global: {
        searchAjaxData: {}
    },

    fn_defaultScript : function(){
        recruitDrafting.gridReload();
    },

    gridReload : function() {
        recruitDrafting.global.searchAjaxData = {
            recruitInfoSn: $("#recruitInfoSn").val(),
            type: "recruitDrafting"
        }

        recruitDrafting.mainGrid("/inside/getApplicationList", recruitDrafting.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="recruitDrafting.officialDrafting()">' +
                            '	<span class="k-button-text">일반 기안문 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitDrafting.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "순번",
                    width: 50,
                    template: "#= ++record #"
                }, {
                    field: "USER_NAME",
                    title: "성명",
                    width : 80,
                    template : function(e){
                        return '<a style="cursor: pointer;" onclick="recruitDrafting.applicationInfo(' + e.APPLICATION_ID + ')">' + e.USER_NAME + '</a>'
                    }
                }, {
                    field: "AGE",
                    title: "연령",
                    template : function(e){
                        return e.AGE + "세"
                    },
                    width : 50
                }, {
                    field: "GENDER",
                    title: "성별",
                    width : 50
                }, {
                    field: "SCHOOL_NAME",
                    title: "최종학력",
                    width : 120
                }, {
                    field: "WORK_DATE",
                    title: "경력",
                    width : 80,
                    template : function(e){
                        if(e.WORK_DATE != null){
                            return recruitAdminPop.fn_calculate(e.WORK_DATE);
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "ADDR",
                    title: "지역",
                    width : 120
                }, {
                    field: "LANG_NAME",
                    title: "외국어",
                    width : 120
                }, {
                    field: "JOB",
                    title: "채용분야",
                    width : 120
                }, {
                    field: "SAVE_DATE",
                    title: "지원일시",
                    width : 150
                }, {
                    field: "DUPLICATION_CNT",
                    title: "중복지원",
                    template : function(e){
                        if(e.DUPLICATION_CNT == "0"){
                            return e.DUPLICATION_CNT + "건"
                        }else{
                            return '<a onclick="recruitAdminPop.duplicationCntPop(this)" style="cursor: pointer;">' + e.DUPLICATION_CNT + "건</a>"
                        }
                    },
                    width : 80
                }, {
                    field: "DOC_SCREEN_AVERAGE",
                    title: "서류심사",
                    width : 100,
                    template : function(e){
                        var str = "";
                        var avg = e.DOC_SCREEN_AVERAGE == null ? 0 :  Math.round(e.DOC_SCREEN_AVERAGE * 10) / 10;

                        if(e.APPLICATION_STAT == "D" || e.APPLICATION_STAT == "I" || e.APPLICATION_STAT == "IF"){
                            str = '합격 (' + avg + "점)";
                        }else if(e.APPLICATION_STAT == "DF"){
                            str = '불합격 (' + avg + "점)";
                        }else{
                            str = avg + '점';
                        }

                        return str;
                    },
                }, {
                    field: "IN_SCREEN_AVERAGE",
                    title: "면접심사",
                    width : 100,
                    template : function(e){
                        console.log(e);
                        if(e.IN_AVOID != "Y"){
                            var avg = e.IN_SCREEN_AVERAGE == null ? 0 : Math.round(e.IN_SCREEN_AVERAGE * 10) / 10;
                            var str = "";


                            if(e.APPLICATION_STAT == "I"){
                                str = '합격 (' + avg + "점)";
                            }else if(e.APPLICATION_STAT == "IF"){
                                str = '불합격 (' + avg + "점)";
                            }else if(e.APPLICATION_STAT == "D"){
                                str = avg + '점';
                            }else{
                                str = "";
                            }

                            return str;
                        }else{
                            return e.IN_AVOID_TXT
                        }
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 1);
            }
        }).data("kendoGrid");
    },

    normalDrafting: function() {
        $("#recruitDraftFrm").one("submit", function() {
            var url = "/popup/inside/approvalFormPopup/recruitApprovalPop.do";
            var name = "recruitApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/inside/approvalFormPopup/recruitApprovalPop.do";
            this.method = 'POST';
            this.target = 'recruitApprovalPop';
        }).trigger("submit");
    },

    officialDrafting: function() {
        $("#recruitDraftFrm").one("submit", function() {
            var url = "/popup/inside/approvalFormPopup/recruitOfficialApprovalPop.do";
            var name = "recruitOfficialApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/inside/approvalFormPopup/recruitOfficialApprovalPop.do";
            this.method = 'POST';
            this.target = 'recruitOfficialApprovalPop';
        }).trigger("submit");
    },

    applicationInfo : function(e){
        var url = "/inside/pop/applicationView.do?applicationId=" + e + "&recruitInfoSn=" + $("#recruitInfoSn").val() + "&type=recruitDrafting" + "&stat=docView";

        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}