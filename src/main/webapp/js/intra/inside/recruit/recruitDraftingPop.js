var recruitDrafting = {
    global: {
        searchAjaxData: {}
    },

    fn_defaultScript : function(){
        this.gridReload();
    },

    gridReload : function() {
        this.global.searchAjaxData = {
            recruitInfoSn: $("recruitInfoSn").val()
        }

        this.mainGrid("/inside/getDraftingList", {
            recruitInfoSn: $("#recruitInfoSn").val()
        });
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
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
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 180,
                }, {
                    field: "DOC_TITLE",
                    title: "문서제목",
                    template : function(e){
                        return '<a onclick="approveDocView(\''+e.DOC_ID+'\', \''+e.APPRO_KEY+'\', \''+e.DOC_MENU_CD+'\')" style="font-weight: bold ">' + e.DOC_TITLE + '</a>';
                    }
                }, {
                    field: "DRAFT_DATE",
                    title: "요청일",
                    width: 120,
                }, {
                    title: "요청자",
                    field: "DRAFT_EMP_NAME",
                    width: 100
                }, {
                    title: "상태",
                    field: "STATUS",
                    width: 100,
                    template: function(e){
                        if(e.STATUS != "100"){
                            return "요청중";
                        }else{
                            return "결재완료";
                        }
                    },
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
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
    }
}