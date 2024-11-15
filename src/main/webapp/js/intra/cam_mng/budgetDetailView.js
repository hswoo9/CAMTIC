var exnpSum = 0, incpSum = 0, depoSum = 0;
var bdv = {

    fn_defaultScript: function (){
        const params = {
            pjtCd: $("#pjtCd").val(),
            bgtCd: $("#bgtCd").val()
        }
        if($("#stat").val() == "mngView"){
            params.startDt = $("#strDt").val();
            params.endDt = $("#endDt").val();
            params.stat2 = "Y";
        }

        if($("#temp").val() == "A"){
            bdv.mainGridA("/mng/getBudgetDetailViewData", params);
        } else if($("#temp").val() == "B"){
            bdv.mainGridB("/mng/getIncpBudgetDetailViewData", params);
        }
    },

    mainGridA : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 555,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "지출내역 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "PAY_APP_TYPE",
                    title: "문서유형",
                    width: 90,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 1){
                            if(e.EXNP_SN != null){
                                return "지출결의서";    
                            }else{
                                return "지급신청서";
                            }
                        } else if (e.PAY_APP_TYPE == 2){
                            return "여입결의서";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "반납결의서";
                        } else if(e.PAY_APP_TYPE == 4){
                            return "대체결의서";
                        }
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 150
                }, {
                    field: "EXNP_BRIEFS",
                    title: "신청건명",
                    width: 350,
                    template: function(e){

                        var title = "";
                        if(e.EXNP_BRIEFS != null && e.EXNP_BRIEFS != "" && e.EXNP_BRIEFS != undefined){
                            title = e.EXNP_BRIEFS;
                        } else if(e.APP_TITLE != null && e.APP_TITLE != "" && e.APP_TITLE != undefined){
                            title = e.APP_TITLE;
                        } else {
                            title = '';
                        }
                        
                        return '<div style="cursor: pointer; font-weight: bold" onclick="bdv.fn_regExnpPopup('+e.EXNP_SN+', '+ e.PAY_APP_SN +', '+e.PAY_APP_TYPE+')">'+title+'</div>';
                    }
                }, {
                    field: "EMP_NAME",
                    title: "신청자",
                    width: 70
                }, {
                    field: "R_DT",
                    title: "지출결의일",
                    width: 80,
                    footerTemplate: "합계"
                }, {
                    field: "TOT_COST",
                    title: "지출금액",
                    width: 110,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            exnpSum += Number(e.TOT_COST);
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(exnpSum)+"</div>";
                    }
                }, {
                    field: "RE_STAT",
                    title: "상태",
                    width: 70,
                    template : function(e){
                        console.log(e);
                        var stat = "";

                        if(e.RE_STAT == "Y"){
                            stat = "승인"
                        } else {
                            stat = "미승인"
                        }

                        return stat;
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
            dataBound: function(){
                exnpSum = 0;
            }
        }).data("kendoGrid");
    },

    mainGridB : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 555,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "수입내역 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "PAY_APP_TYPE",
                    title: "구분",
                    width: 80,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 'N'){
                            return "수입결의서";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "반납결의서";
                        }
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 150
                }, {
                    field: "APP_DE",
                    title: "결의일자",
                    width: 80,
                }, {
                    field: "APP_CONT",
                    title: "적요",
                    width: 350,
                    template: function(e){
                        if(e.INFO_CODE != null && e.INFO_CODE != "" && e.INFO_CODE != undefined){
                            return '<div style="cursor: pointer; font-weight: bold">'+e.APP_CONT+'</div>';
                        } else {
                            if(e.PAY_APP_TYPE == 3){
                                return '<div style="cursor: pointer; font-weight: bold" onclick="bdv.fn_regExnpPopup('+e.PAY_INCP_SN+', '+ e.PAY_APP_SN +', '+e.PAY_APP_TYPE+')">'+e.APP_CONT+'</div>';
                            } else {
                                return '<div style="cursor: pointer; font-weight: bold" onclick="bdv.fn_reqRegPopup('+e.PAY_INCP_SN+', \'B\')">'+e.APP_CONT+'</div>';
                            }
                        }
                    }
                }, {
                    field: "CRM_NM",
                    title: "거래처",
                    width: 120
                }, {
                    field: "EMP_NAME",
                    title: "신청자",
                    width: 80,
                    footerTemplate: "합계"
                }, {
                    field: "TOT_COST",
                    title: "총금액",
                    width: 100,
                    template: function(e){
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            incpSum += e.TOT_COST;
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(incpSum)+"</div>";
                    }
                }, {
                    field: "DEPO_COST",
                    title: "입금금액",
                    width: 100,
                    template: function(e){
                        if(e.DEPO_COST != null && e.DEPO_COST != "" && e.DEPO_COST != undefined){
                            depoSum += e.DEPO_COST;
                            return '<div style="text-align: right">'+comma(e.DEPO_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(depoSum)+"</div>";
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
            dataBound: function(){
                incpSum = 0;
                depoSum = 0;
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

    fn_regExnpPopup : function (key, paySn, payAppType){
        var url = "/payApp/pop/regExnpPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regExnpPop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        }

        let status = "rev";
        if(payAppType == 1){
            status = "rev";
        } else if (payAppType == 2){
            status = "in";
        } else if (payAppType == 3){
            status = "re";
        } else if (payAppType == 4){
            status = "alt";
        }

        if(status != null && status != ""){
            url += "&status=" + status;
        }

        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}