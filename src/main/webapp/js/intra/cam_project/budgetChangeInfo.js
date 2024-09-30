var budgetChangeInfo = {
    global : {
        searchAjaxData : {}
    },

    fn_defaultScript : function(){
        this.gridReload();
    },

    gridReload: function (){
        budgetChangeInfo.global.searchAjaxData = {
            pjtSn : $("#pjtSn").val(),
            order : "asc"
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
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="budgetChangeOpenModal()">' +
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
                        if(e.STATUS == "30" || e.STATUS == "40"){
                            return '<div onclick="tempOrReDraftingPop(\''+e.DOC_ID+'\', \''+e.DOC_MENU_CD+'\', \''+e.APPRO_KEY+'\', 2, \'reDrafting\', \'target\');" style="font-weight: bold ">' + e.DOC_TITLE + '</div>';
                        } else {
                            return '<div onclick="approveDocView(\''+e.DOC_ID+'\', \''+e.APPRO_KEY+'\', \''+e.DOC_MENU_CD+'\')" style="font-weight: bold">' + e.DOC_TITLE + '</div>';
                        }
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
                        if(e.STATUS != "100" && e.STATUS != "101"){
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
        if($("input[name='bgtCd']:checked").length == 0){
            alert("변경할 예산을 선택해주세요."); return;
        }

        var joinSn = "";
        $.each($("input[name='bgtCd']:checked"), function(i){
            if(i != 0){
                joinSn += ",";
            }
            joinSn += $(this).val();
        });
        $("#list").val(joinSn);

        const result = customKendo.fn_customAjax("/projectRnd/insChangeInfo", {
            pjtSn: $("#pjtSn").val(),
            empSeq: $("#loginEmpSeq").val(),
            num: 1
        });

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            $("#pjtChSn").val(result.params.pjtChSn);
            $("#changeDraftFrm").one("submit", function() {
                var url = "/popup/cam_project/approvalFormPopup/changeApprovalPop.do";
                var name = "changeApprovalPop";
                var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                var popup = window.open(url, name, option);
                this.action = "/popup/cam_project/approvalFormPopup/changeApprovalPop.do";
                this.method = 'POST';
                this.target = 'changeApprovalPop';
            }).trigger("submit");
        }
    },

    reDrafting: function() {
        const result = customKendo.fn_customAjax("/projectRnd/insChangeInfo", {
            pjtSn: $("#pjtSn").val(),
            empSeq: $("#loginEmpSeq").val(),
            num: 2
        });

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            $("#pjtChSn").val(result.params.pjtChSn);

            alert("1. 열람자 지정 필수(예산담당자) \n2. 기존에 없는 비목으로 변경이 필요한 경우 전자결재 내의 한글양식에서 수정하여 사용해주시기바랍니다.");
            $("#changeDraftFrm").one("submit", function() {
                var url = "/popup/cam_project/approvalFormPopup/reApprovalPop.do";
                var name = "reApprovalPop";
                var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                var popup = window.open(url, name, option);
                this.action = "/popup/cam_project/approvalFormPopup/reApprovalPop.do";
                this.method = 'POST';
                this.target = 'reApprovalPop';
            }).trigger("submit");
        }
    },
}