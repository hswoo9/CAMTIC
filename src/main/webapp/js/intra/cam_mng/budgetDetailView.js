var bdv = {

    fn_defaultScript: function (){
        if($("#temp").val() == "A"){
            bdv.mainGridA("/mng/getBudgetDetailViewData", { pjtCd: $("#pjtCd").val(), bgtCd: $("#bgtCd").val() });
        } else if($("#temp").val() == "B"){
            bdv.mainGridB("/mng/getIncpBudgetDetailViewData", { pjtCd: $("#pjtCd").val(), bgtCd: $("#bgtCd").val() });
        }
    },

    mainGridA : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서유형",
                    width: 90,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 1){
                            return "지급신청서";
                        } else if (e.PAY_APP_TYPE == 2){
                            return "여입신청서";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "반납신청서";
                        } else if(e.PAY_APP_TYPE == 4){
                            return "대체신청서";
                        }
                    }
                }, {
                    title: "신청건명",
                    field: "APP_TITLE",
                    width: 280,
                    template: function(e){

                        var title = "";
                        if(e.APP_TITLE != null && e.APP_TITLE != "" && e.APP_TITLE != undefined){
                            title = e.APP_TITLE;
                        } else {
                            title = e.APP_CONT;
                        }

                        if(e.ORG_YN == 'N'){
                            return '<div style="cursor: pointer; font-weight: bold" onclick="bdv.fn_reqRegPopup('+e.PAY_APP_SN+', \'A\')">'+title+'</div>';
                        } else {
                            return '<div style="cursor: pointer; font-weight: bold">'+title+'</div>';
                        }
                    }
                }, {
                    title: "신청자",
                    width: 70,
                    field: "EMP_NAME"
                }, {
                    title: "지출요청일",
                    width: 80,
                    field: "REQ_DE",
                    template : function(e){
                        if(e.EXNP_ISS != null && e.EXNP_ISS != "" && e.EXNP_ISS != undefined){
                            return '<a href="javascript:alert(\''+e.EXNP_ISS+'\')" style="font-weight: bold">'+e.REQ_DE+'</a>';
                        } else {
                            return e.REQ_DE
                        }
                    }
                }, {
                    title: "지출금액",
                    width: 110,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "상태",
                    width: 70,
                    template : function(e){
                        console.log(e);
                        var stat = "";

                        if(e.REVERT_YN == "Y"){
                            stat = "반려";

                            return '<span onclick="javascript:alert(\''+e.REVERT_ISS+'\')" style="font-weight: bold; color: red; cursor: pointer">'+stat+'</span>';
                        }

                        if(e.DOC_STATUS == "100"){
                            stat = "결재완료"
                            if(e.ITEM_COUNT == e.EXNP_DOC_STATUS && e.EXNP_STATUS == e.EXNP_DOC_STATUS && e.EXNP_STATUS != 0 && e.EXNP_DOC_STATUS2 == 100){
                                stat = "지출완료";
                            } else if(e.ITEM_COUNT != e.EXNP_DOC_STATUS && e.EXNP_DOC_STATUS != 0){
                                stat = "부분지출";
                            } else if (e.EXNP_STATUS != 0){
                                stat = "지출대기";
                            }
                        } else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "50"){
                            stat = "결재중"
                        } else if(e.DOC_STATUS == "30"){
                            stat = "반려"
                        } else {
                            stat = "작성중"
                        }

                        return stat;
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainGridB : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "구분",
                    width: 90,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 'N'){
                            return "수입결의서";
                        } else if (e.PAY_APP_TYPE == 'Y'){
                            return "반제(수입)";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "반납결의서";
                        }
                    }
                }, {
                    title: "결의일자",
                    width: 70,
                    field: "PAY_EXNP_DE",
                }, {
                    title: "적요",
                    field: "APP_CONT",
                    width: 280,
                    template: function(e){
                        if(e.INFO_CODE != null && e.INFO_CODE != "" && e.INFO_CODE != undefined){
                            return '<div style="cursor: pointer; font-weight: bold">'+e.APP_CONT+'</div>';
                        } else {
                            return '<div style="cursor: pointer; font-weight: bold" onclick="bdv.fn_reqRegPopup('+e.PAY_INCP_SN+', \'B\')">'+e.APP_CONT+'</div>';
                        }
                    }
                }, {
                    title: "거래처",
                    width: 120,
                    field: "CRM_NM"
                }, {
                    title: "신청자",
                    width: 80,
                    field: "EMP_NAME"
                }, {
                    title: "총금액",
                    width: 100,
                    template: function(e){
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_reqRegPopup : function(key, type){
        var url = "";

        if(type == "A"){
            url = "/payApp/pop/regPayAppPop.do";
            if(key != null && key != ""){
                url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key;
            }
        } else if(type == "B"){
            url = "/payApp/pop/regIncmPop.do";
            if(key != null && key != ""){
                url = "/payApp/pop/regIncmPop.do?payIncpSn=" + key;
            }
        }

        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}