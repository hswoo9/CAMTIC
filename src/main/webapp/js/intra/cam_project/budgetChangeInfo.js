var budgetChangeInfo = {
    global : {
        searchAjaxData : {}
    },

    fn_defaultScript : function(){
        this.gridReload();
    },

    gridReload: function (){
        budgetChangeInfo.global.searchAjaxData = {
            pjtSn : $("#pjtSn").val()
        }

        budgetChangeInfo.mainGrid("/projectRnd/getChangeList", budgetChangeInfo.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#budgetChangeMainGrid").kendoGrid({
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
            dataBound: budgetChangeInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="budgetChangeInfo.changeDrafting()">' +
                            '	<span class="k-button-text">세세목 변경서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="budgetChangeInfo.reDrafting()">' +
                            '	<span class="k-button-text">사업비 반납</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="budgetChangeInfo.gridReload()">' +
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
                        return '<a onclick="approveDocView(\''+e.DOC_ID+'\', \''+e.APPRO_KEY+'\', \''+e.DOC_MENU_CD+'\')" style="font-weight: bold ">' + e.DOC_TITLE + '</a>'
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
                            return "요청중"
                        }else{
                            return "결재완료"
                        }
                    },
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    changeDrafting: function() {
        $("#changeDraftFrm").one("submit", function() {
            var url = "/popup/cam_project/approvalFormPopup/changeApprovalPop.do";
            var name = "changeApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/changeApprovalPop.do";
            this.method = 'POST';
            this.target = 'changeApprovalPop';
        }).trigger("submit");
    },

    reDrafting: function() {
        $("#changeDraftFrm").one("submit", function() {
            var url = "/popup/cam_project/approvalFormPopup/reApprovalPop.do";
            var name = "reApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/reApprovalPop.do";
            this.method = 'POST';
            this.target = 'reApprovalPop';
        }).trigger("submit");
    },
}