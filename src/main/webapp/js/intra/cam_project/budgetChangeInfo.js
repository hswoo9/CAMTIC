var budgetChangeInfo = {
    global : {
        searchAjaxData : {}
    },

    fn_defaultScript : function(){
        this.gridReload();
    },

    gridReload: function (){
        budgetChangeInfo.global.searchAjaxData = {
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        budgetChangeInfo.mainGrid("/purc/getPurcReqList.do", budgetChangeInfo.global.searchAjaxData);
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
            dataBound: budgetChangeInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="budgetChangeInfo.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">세세목 변경서 작성</span>' +
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
                    field: "DOC_APPR_DT",
                    title: "요청일",
                    width: 120,
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    title: "상태",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        if(e.STATUS == "W"){
                            return "작성중"
                        }else if(e.STATUS == "C"){
                            return "요청완료"
                        }
                    },
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_reqRegPopup : function (key){

        var data = {
            compSeq : 1000,
            docType : "A",
            empSeq : "1",
            formId : 139,
            linkagePopActive : "N",
            linkagePopHeight : "900",
            linkagePopWidth : "965",
            linkageType : "1",
            menuCd : "normal",
            mod : "W",
            type : "drafting",
            pjtSn : $("#pjtSn").val(),
        }

        linkageProcessOn(data, "target");

    },
}