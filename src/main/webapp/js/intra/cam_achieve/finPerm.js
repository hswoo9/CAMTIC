var finPerm = {


    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "year", "yyyy-MM", new Date());

        let data = {}
        data.deptLevel = 2;
        const deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

        finPerm.fn_searchData();

        $("#dept, #year").on("change", function(){
            finPerm.fn_searchData();
        });
    },

    fn_searchData : function(){
        $("#engnGrid").css("display", "none");

        var date = new Date($("#year").val().split("-")[0], $("#year").val().split("-")[1], 0);
        var parameters = {
            year : $("#year").val().split("-")[0],
            baseYear : $("#year").val().split("-")[0],
            deptSeq : $("#dept").val(),
            startDt : $("#year").val() + "-01",
            endDt : $("#year").val() + "-" + date.getDate()
        }

        var rs = customKendo.fn_customAjax("/cam_achieve/getAllPjtCalc", parameters);

        var result = rs.map;
        var result2 = rs.payrollMap;

        /** 수주 */
        $("#rndDelvAmt").text(comma(result.rndAmt));
        $("#unRndDelvAmt").text(comma(result.unRndAmt));
        $("#engnDelvAmt").text(comma(result.engnAmt));
        $("#otherDelvAmt").text(comma(result.otherAmt));

        /** 매출 */
        $("#rndSaleAmt").text(comma(result.saleRndAmt || 0));
        $("#unRndSaleAmt").text(comma(result.saleunRndAmt || 0));
        $("#engnSaleAmt").text(comma(result.saleEngnAmt || 0));
        $("#otherSaleAmt").text(comma(result.saleOtherAmt || 0));

        /** 운영수익 */
        $("#rndIncpAmt").text(comma(result.incpRndAmt || 0));
        $("#unRndIncpAmt").text(comma(result.incpUnRndAmt || 0));
        $("#engnIncpAmt").text(comma(result.incpEngnAmt || 0));
        $("#otherIncpAmt").text(comma(result.incpOtherAmt || 0));

        /** 달성소계 */
        $("#delvTotAmt").text(comma(result.engnAmt + result.otherAmt + result.rndAmt + result.unRndAmt));
        $("#saleTotAmt").text(comma((result.saleRndAmt || 0) + (result.saleUnRndAmt || 0) + (result.saleEngnAmt || 0) + (result.saleOtherAmt || 0)));
        $("#incpTotAmt").text(comma((result.incpRndAmt || 0) + (result.incpUnRndAmt || 0) + (result.incpEngnAmt || 0) + (result.incpOtherAmt || 0)));

        /** 예상수주 */
        $("#expRndAmt").text(comma(result.expRndAmt));
        $("#expUnRndAmt").text(comma(result.expUnRndAmt));
        $("#expEngnAmt").text(comma(result.expEngnAmt));
        $("#expOtherAmt").text(comma(result.expOtherAmt));

        /** 예상매출 */
        $("#expSaleRndAmt").text(comma(result.expSaleRndAmt || 0));
        $("#expSaleUnRndAmt").text(comma(result.expSaleUnRndAmt || 0));
        $("#expSaleOtherAmt").text(comma(result.expSaleOtherAmt || 0));
        $("#expSaleEngnAmt").text(comma(result.expSaleEngnAmt || 0));

        /** 예상운영수익 */
        $("#expIncpRndAmt").text(comma(result.expIncpRndAmt || 0));
        $("#expIncpUnRndAmt").text(comma(result.expIncpUnRndAmt || 0));
        $("#expIncpEngnAmt").text(comma(result.expIncpEngnAmt || 0));
        $("#expIncpOtherAmt").text(comma(result.expIncpOtherAmt || 0));

        /** 예상소계 */
        $("#expTotAmt").text(comma((result.expEngnAmt || 0) + (result.expOtherAmt || 0) + (result.expRndAmt || 0) + (result.expUnRndAmt || 0)));
        $("#expSaleTotAmt").text(comma((result.expSaleEngnAmt || 0) + (result.expSaleOtherAmt || 0) + (result.expSaleRndAmt || 0) + (result.expSaleUnRndAmt || 0)));
        $("#expIncpTotAmt").text(comma((result.expIncpEngnAmt || 0) + (result.expIncpOtherAmt || 0) + (result.expIncpRndAmt || 0) + (result.expIncpUnRndAmt || 0)));

        /** 합계 */
        $("#totAmtSum").text(comma(Number(uncommaN($("#expTotAmt").text())) + Number(uncommaN($("#delvTotAmt").text()))));
        $("#saleTotAmtSum").text(comma(Number(uncommaN($("#saleTotAmt").text())) + Number(uncommaN($("#expSaleTotAmt").text()))));
        $("#incpTotAmtSum").text(comma(Number(uncommaN($("#incpTotAmt").text())) + Number(uncommaN($("#expIncpTotAmt").text()))));

        /** 목표 */
        $("#objDelvAmt").text(comma(Math.round(result.objDelvAmt) || 0));
        $("#objSaleAmt").text(comma(Math.round(result.objSaleAmt) || 0));
        $("#objIncpAmt").text(comma(Math.round(result.objIncpAmt) || 0));

        /** 달성율 */
        if(Number(uncommaN($("#delvTotAmt").text())) != 0 && Number(uncommaN($("#objDelvAmt").text())) != 0){
            $("#delvPer").text(Math.round((Number(uncommaN($("#delvTotAmt").text())) / Number(uncommaN($("#objDelvAmt").text())) * 100) * 10) / 10 + " %");
        } else {
            $("#delvPer").text("0%");
        }
        if(Number(uncommaN($("#saleTotAmt").text())) != 0 && Number(uncommaN($("#objSaleAmt").text())) != 0){
            $("#salePer").text(Math.round((Number(uncommaN($("#saleTotAmt").text())) / Number(uncommaN($("#objSaleAmt").text())) * 100) * 10) / 10 + " %");
        } else {
            $("#salePer").text("0%");
        }
        if(Number(uncommaN($("#incpTotAmt").text())) != 0 && Number(uncommaN($("#objIncpAmt").text())) != 0){
            $("#incpPer").text(Math.round((Number(uncommaN($("#incpTotAmt").text())) / Number(uncommaN($("#objIncpAmt").text())) * 100) * 10) / 10 + " %");
        } else {
            $("#incpPer").text("0%");
        }

        /** 예상 달성율 */
        if(Number(uncommaN($("#totAmtSum").text())) != 0 && Number(uncommaN($("#objDelvAmt").text())) != 0){
            $("#expDelvPer").text(Math.round((Number(uncommaN($("#totAmtSum").text())) / Number(uncommaN($("#objDelvAmt").text())) * 100) * 10) / 10 + " %");
        } else {
            $("#expDelvPer").text("0%");
        }
        if(Number(uncommaN($("#saleTotAmtSum").text())) != 0 && Number(uncommaN($("#objSaleAmt").text())) != 0){
            $("#expSalePer").text(Math.round((Number(uncommaN($("#saleTotAmtSum").text())) / Number(uncommaN($("#objSaleAmt").text())) * 100) * 10) / 10 + " %");
        } else {
            $("#expSalePer").text("0%");
        }
        if(Number(uncommaN($("#incpTotAmtSum").text())) != 0 && Number(uncommaN($("#objIncpAmt").text())) != 0){
            $("#expIncpPer").text(Math.round((Number(uncommaN($("#incpTotAmtSum").text())) / Number(uncommaN($("#objIncpAmt").text())) * 100) * 10) / 10 + " %");
        } else {
            $("#expIncpPer").text("0%");
        }


        parameters.month = $("#year").val();
        parameters.startDt = $("#year").val().split("-")[0] + "-01-01";
        parameters.endDt = $("#year").val().split("-")[0] + "-12-31";

        /** 운영비 - 인건비 */
        var payRs = customKendo.fn_customAjax("/cam_achieve/getDeptPayrollListForTotRate", parameters);
        var payList = payRs.list;
        var pay = 0;
        for(var j = 0; j < payList.length; j++) {
            pay += Number(payList[j].TOT_PAY || 0);
        }
        $("#payTotAmt").text(comma(pay));

        /** 운영비 - 자체경비 */
        var exnpRs =  customKendo.fn_customAjax("/cam_achieve/getExnpListForTotRate", parameters);
        var exnpLs = exnpRs.list;
        var exnpPay = 0;
        for(var j = 0; j < exnpLs.length; j++) {
            exnpPay += Number(exnpLs[j].TOT_COST || 0);
        }
        $("#exnpTotAmt").text(comma(exnpPay));

        /** 운영비 */
        $("#operTotAmt").text(comma(Number(pay) + Number(exnpPay) + Number(uncommaN($("#commTotAmt").text()))));

        /** 달성사업화지수 */
        var incpTotAmt = Number(uncommaN($("#incpTotAmt").text()));     // 운영수익
        var operTotAmt = Number(uncommaN($("#operTotAmt").text()));     // 운영비
        var operPer = 0;
        if(incpTotAmt == 0 || operTotAmt == 0){
            operPer = 0
        } else {
            operPer = Math.round((incpTotAmt / operTotAmt * 100) * 10) / 10;
        }
        $("#operPer").text(operPer);

        /** 운영비 목표 (예상 운영비) */
        $("#expPayTotAmt").text(comma(Math.round(result.objPayrollAmt) || 0));
        $("#expExnpTotAmt").text(comma(Math.round(result.objExnpAmt) || 0));
        $("#expCommTotAmt").text(comma(Math.round(result.objCommAmt) || 0));
        $("#expOperTotAmt").text(comma(Number(uncommaN($("#expPayTotAmt").text())) + Number(uncommaN($("#expExnpTotAmt").text())) + Number(uncommaN($("#expCommTotAmt").text()))));

        /** 예상사업화지수 */
        var expIncpTotAmt = Number(uncommaN($("#expIncpTotAmt").text()));       // 운영수익예상 소계
        var expOperTotAmt = Number(uncommaN($("#expOperTotAmt").text()));       // 예상운영비
        var expOperPer = 0;
        if(expIncpTotAmt == 0 || expOperTotAmt == 0){
            expOperPer = 0
        } else {
            expOperPer = Math.round((expIncpTotAmt / expOperTotAmt * 100) * 10) / 10;
        }
        $("#expOperPer").text(expOperPer);
    },

    fn_engnSearch : function (){
        $("#engnGrid").css("display", "block");

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/cam_achieve/getEngnList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.year = $("#year").val();
                    data.deptSeq = $("#dept").val();

                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });


        let totAmt = 0;
        let delvTotAmt = 0;
        let saleTotAmt = 0;
        let incpTotAmt = 0;

        let expTotAmt = 0;
        let expSaleTotAmt = 0;
        let expIncpTotAmt = 0;

        $("#engnGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 500,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function (){
                totAmt = 0;
                delvTotAmt = 0;
                saleTotAmt = 0;
                incpTotAmt = 0;

                expTotAmt = 0;
                expSaleTotAmt = 0;
                expIncpTotAmt = 0;
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 35
                },{
                    title: "수주/협업/이월",
                    width: 80,
                    field: "STAT_A"
                }, {
                    title: "수주일자",
                    field: "DELV_DE",
                    width: 80
                }, {
                    title: "수주일자",
                    field: "DELV_EST_DE",
                    width: 80
                }, {
                    title: "납품예정일자",
                    field: "DELV_DE",
                    width: 80
                }, {
                    title: "프로젝트명",
                    field: "PJT_NM",
                    width: 200
                }, {
                    title: "업체명",
                    field: "CRM_NM",
                    width: 100,
                    footerTemplate: "합계",
                }, {
                    title: "총 사업비",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        totAmt += e.PJT_AMT;
                        return '<div style="text-align: right">'+comma(e.PJT_AMT)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(totAmt)+"</div>";
                    }
                }, {
                    title: "수주액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        delvTotAmt += e.PJT_AMT;
                        return '<div style="text-align: right">'+comma(e.PJT_AMT)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(delvTotAmt)+"</div>";
                    }
                }, {
                    title: "매출액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        if(e.RESULT_STATUS != 100){
                            return '<div style="text-align: right">0</div>'
                        } else {
                            saleTotAmt += e.PJT_AMT;
                            return '<div style="text-align: right">'+comma(e.PJT_AMT)+'</div>'
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(saleTotAmt)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        var saleAmt = 0;

                        if(e.RESULT_STATUS == 100){
                            saleAmt = e.PJT_AMT;
                        }

                        saleAmt = (saleAmt || 0) - (e.PURC_TOT_AMT || 0) - (e.RES_EXNP_SUM || 0);

                        incpTotAmt += saleAmt;
                        return '<div style="text-align: right">'+comma(saleAmt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(incpTotAmt)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        if(e.RESULT_STATUS != 100){
                            return '<div style="text-align: right">0</div>'
                        } else {
                            expSaleTotAmt += e.PJT_AMT;
                            return '<div style="text-align: right">'+comma(e.PJT_AMT)+'</div>'
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(expSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "예상운영수익",
                    width: 100,
                    template: function(e){
                        var saleAmt = 0;

                        if(e.RESULT_STATUS == 100){
                            saleAmt = e.PJT_AMT;
                        }

                        saleAmt = (saleAmt || 0) - (e.PURC_TOT_AMT || 0) - (e.RES_EXNP_SUM || 0);

                        expIncpTotAmt += saleAmt;
                        return '<div style="text-align: right">'+comma(saleAmt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(expIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "전년도<br>매출액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: center">-</div>'
                    }
                }, {
                    title: "전년도<br>수익액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: center">-</div>'

                    }
                }, {
                    title: "차년도<br>매출액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: center">-</div>'

                    }
                }, {
                    title: "차년도<br>수익액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: center">-</div>'
                    }
                }, {
                    title: "비고",
                    width: 100,
                    template: function(e){
                        return '';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
        }).data("kendoGrid");



    },

    fn_objSetting : function(type){
        var url = "/cam_achieve/popObjSetting.do?year=" + $("#year").val().split("-")[0];

        if(type == "team"){
            url += "&deptLevel=2";
            if($("#dept").val() != ""){
                url += "&deptSeq=" + $("#dept").val();
            }
        } else {
            url += "&deptLevel=99&deptSeq=999999";
        }

        var name = "_blank";
        var option = "width = 680, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}