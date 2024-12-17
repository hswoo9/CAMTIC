var finPerm = {

    global : {
        rsList : [],
    },


    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "year", "yyyy-MM", new Date());

        let data = {}
        data.deptLevel = 2;
        const deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

        finPerm.fn_searchData();

        /*$("#dept, #year").on("change", function(){
            finPerm.fn_searchData();
        });*/
    },

    fn_searchData : function(){

        $("#rndGrid").hide();
        $("#unRndGrid").hide();
        $("#engnGrid").hide();
        $("#otherGrid").hide();

        var date = new Date($("#year").val().split("-")[0], $("#year").val().split("-")[1], 0);
        var parameters = {
            year : $("#year").val().split("-")[0],
            baseYear : $("#year").val().split("-")[0],
            deptSeq : $("#dept").val(),
            startDt : $("#year").val().split("-")[0] + "-01-01",
            endDt : $("#year").val() + "-" + date.getDate(),
            pjtYear : $("#year").val().split("-")[0],
            busnSubClass : "Y"
        }

        $.ajax({
            url: "/cam_achieve/getProjectCostCalcList",
            data: parameters,
            type: "post",
            dataType: "json",
            beforeSend : function(){
                $("#my-spinner").show();
            },
            success: function(rs) {
                finPerm.global.rsList = rs.data;
                finPerm.fn_makeGrid();
            },
            error: function (e) {
                console.log('error : ', e);
            }
        });
    },

    fn_makeGrid : function(){

        finPerm.fn_rndGrid();       // R&D
        finPerm.fn_unRndGrid();     // 비R&D
        finPerm.fn_engnGrid();      // 엔지니어링
        finPerm.fn_otherGrid();     // 용역/기타
        finPerm.fn_objDataSet();    // 팀 목표
        finPerm.fn_costCalcTotal(); // 소계
        finPerm.fn_operCostSet();   // 운영비

        $("#my-spinner").hide();
    },

    fn_rndGrid : function(){

        let rndTotAmt = 0;          // 총 사업비
        let rndDelvTotAmt = 0;      // 수주금액
        let rndSaleTotAmt = 0;      // 매출액
        let rndIncpTotAmt = 0;      // 운영수익

        let rndExpDelvTotAmt = 0;   // 예상수주금액
        let rndExpSaleTotAmt = 0;   // 예상매출액
        let rndExpIncpTotAmt = 0;   // 예상운영수익

        $("#rndGrid").kendoGrid({
            dataSource: finPerm.global.rsList.rndList,
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "연번",
                    width: 40
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 80
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 100
                }, {
                    title: "프로젝트명",
                    field: "PJT_NM",
                    width: 350
                }, {
                    title: "주관기관<br>(업체명)",
                    field: "CRM_NM",
                    width: 120,
                    footerTemplate: "합계",
                }, {
                    title: "수주일",
                    field: "LIST_STR_DE",
                    width: 80
                }, {
                    title: "종료예정일",
                    field: "LIST_NOW_END_DE",
                    width: 80
                }, {
                    title: "종료일",
                    field: "LIST_END_DE",
                    width: 80
                }, {
                    title: "수주금액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.allPjtAmt(e);

                        if(e.PJT_STEP == "R" && e.PJT_STOP == "N") {
                            rndExpDelvTotAmt += Number(e.PJT_EXP_AMT || 0);
                        }

                        rndDelvTotAmt += amt;

                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(rndDelvTotAmt)+"</div>";
                    }
                }, {
                    title: "총 사업비",
                    field: "ALL_BUSN_COST",
                    width: 100,
                    template: function(e){
                        var allBusnCost = 0;
                        if(e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S") {
                            rndTotAmt += e.ALL_BUSN_COST;
                            allBusnCost = e.ALL_BUSN_COST;
                        } else {
                            rndTotAmt += e.PJT_AMT;
                            allBusnCost = e.PJT_AMT;
                        }
                        return '<div style="text-align: right">'+comma(allBusnCost)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(rndTotAmt)+"</div>";
                    }
                }, {
                    title: "매출액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resSaleAmt(e);

                        rndSaleTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(rndSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resProfitAmt(e);

                        rndIncpTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(rndIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.devSaleAmt(e);

                        rndExpSaleTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(rndExpSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "예상운영수익",
                    width: 100,
                    template: function(e){
                        var amt = 0;
                        amt = costCalc.devProfitAmt(e);

                        rndExpIncpTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(rndExpIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "전년도<br>매출액",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listBefSale || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "전년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listBefProfit || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "차년도<br>매출액",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listAftSale || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "차년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listAftProfit || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                },
            ],
            dataBound : function (){

                /** 수주 */
                $("#rndDelvAmt").text(comma(rndDelvTotAmt || 0));

                /** 매출 */
                $("#rndSaleAmt").text(comma(rndSaleTotAmt || 0));

                /** 운영수익 */
                $("#rndIncpAmt").text(comma(rndIncpTotAmt || 0));

                /** 예상수주 */
                $("#expRndAmt").text(comma(rndExpDelvTotAmt));

                /** 예상매출 */
                $("#expSaleRndAmt").text(comma(rndExpSaleTotAmt || 0));

                /** 예상운영수익 */
                $("#expIncpRndAmt").text(comma(rndExpIncpTotAmt || 0));
            },
        }).data("kendoGrid");

    },

    fn_unRndGrid : function(){

        let unRndTotAmt = 0;          // 총 사업비
        let unRndDelvTotAmt = 0;      // 수주금액
        let unRndSaleTotAmt = 0;      // 매출액
        let unRndIncpTotAmt = 0;      // 운영수익

        let unRndExpDelvTotAmt = 0;   // 예상수주금액
        let unRndExpSaleTotAmt = 0;   // 예상매출액
        let unRndExpIncpTotAmt = 0;   // 예상운영수익

        $("#unRndGrid").kendoGrid({
            dataSource: finPerm.global.rsList.unRndList,
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "연번",
                    width: 40
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 80
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 100
                }, {
                    title: "프로젝트명",
                    field: "PJT_NM",
                    width: 350
                }, {
                    title: "주관기관<br>(업체명)",
                    field: "CRM_NM",
                    width: 120,
                    footerTemplate: "합계",
                }, {
                    title: "수주일",
                    field: "LIST_STR_DE",
                    width: 80
                }, {
                    title: "종료예정일",
                    field: "LIST_NOW_END_DE",
                    width: 80
                }, {
                    title: "종료일",
                    field: "LIST_END_DE",
                    width: 80
                }, {
                    title: "수주금액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.allPjtAmt(e);

                        if(e.PJT_STEP == "S" && e.PJT_STOP == "N") {
                            unRndExpDelvTotAmt += Number(e.PJT_EXP_AMT || 0);
                        }

                        unRndDelvTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(unRndDelvTotAmt)+"</div>";
                    }
                }, {
                    title: "총 사업비",
                    field: "ALL_BUSN_COST",
                    width: 100,
                    template: function(e){
                        var allBusnCost = 0;
                        if(e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S") {
                            unRndTotAmt += e.ALL_BUSN_COST;
                            allBusnCost = e.ALL_BUSN_COST;
                        } else {
                            unRndTotAmt += e.PJT_AMT;
                            allBusnCost = e.PJT_AMT;
                        }
                        return '<div style="text-align: right">'+comma(allBusnCost)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(unRndTotAmt)+"</div>";
                    }
                }, {
                    title: "매출액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resSaleAmt(e);

                        unRndSaleTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(unRndSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resProfitAmt(e);

                        unRndIncpTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(unRndIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.devSaleAmt(e);

                        unRndExpSaleTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(unRndExpSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "예상운영수익",
                    width: 100,
                    template: function(e){
                        var amt = 0;
                        amt = costCalc.devProfitAmt(e);

                        unRndExpIncpTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(unRndExpIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "전년도<br>매출액",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listBefSale || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "전년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listBefProfit || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "차년도<br>매출액",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listAftSale || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "차년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listAftProfit || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                },
            ],
            dataBound : function (){

                /** 수주 */
                $("#unRndDelvAmt").text(comma(unRndDelvTotAmt || 0));

                /** 매출 */
                $("#unRndSaleAmt").text(comma(unRndSaleTotAmt || 0));

                /** 운영수익 */
                $("#unRndIncpAmt").text(comma(unRndIncpTotAmt || 0));

                /** 예상수주 */
                $("#expUnRndAmt").text(comma(unRndExpDelvTotAmt || 0));

                /** 예상매출 */
                $("#expSaleUnRndAmt").text(comma(unRndExpSaleTotAmt || 0));

                /** 예상운영수익 */
                $("#expIncpUnRndAmt").text(comma(unRndExpIncpTotAmt || 0));
            },
        }).data("kendoGrid");

    },

    fn_engnGrid : function(){

        let engnTotAmt = 0;          // 총 사업비
        let engnDelvTotAmt = 0;      // 수주금액
        let engnSaleTotAmt = 0;      // 매출액
        let engnIncpTotAmt = 0;      // 운영수익

        let engnExpDelvTotAmt = 0;   // 예상수주금액
        let engnExpSaleTotAmt = 0;   // 예상매출액
        let engnExpIncpTotAmt = 0;   // 예상운영수익

        $("#engnGrid").kendoGrid({
            dataSource: finPerm.global.rsList.engnList,
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "연번",
                    width: 40
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 80
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 100
                }, {
                    title: "프로젝트명",
                    field: "PJT_NM",
                    width: 350
                }, {
                    title: "주관기관<br>(업체명)",
                    field: "CRM_NM",
                    width: 120,
                    footerTemplate: "합계",
                }, {
                    title: "수주일",
                    field: "LIST_STR_DE",
                    width: 80
                }, {
                    title: "종료예정일",
                    field: "LIST_NOW_END_DE",
                    width: 80
                }, {
                    title: "종료일",
                    field: "LIST_END_DE",
                    width: 80
                }, {
                    title: "수주금액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.allPjtAmt(e);

                        if((e.PJT_STEP == "E" || e.PJT_STEP == "E0" || e.PJT_STEP == "E1" || e.PJT_STEP == "E2") && e.PJT_STOP == "N") {
                            engnExpDelvTotAmt += Number(e.EXP_AMT || 0);
                        }

                        engnDelvTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(engnDelvTotAmt)+"</div>";
                    }
                }, {
                    title: "총 사업비",
                    field: "ALL_BUSN_COST",
                    width: 100,
                    template: function(e){
                        var allBusnCost = 0;
                        if(e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S") {
                            engnTotAmt += e.ALL_BUSN_COST;
                            allBusnCost = e.ALL_BUSN_COST;
                        } else {
                            engnTotAmt += e.PJT_AMT;
                            allBusnCost = e.PJT_AMT;
                        }
                        return '<div style="text-align: right">'+comma(allBusnCost)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(engnTotAmt)+"</div>";
                    }
                }, {
                    title: "매출액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resSaleAmt(e);

                        engnSaleTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(engnSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resProfitAmt(e);

                        engnIncpTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(engnIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.devSaleAmt(e);

                        engnExpSaleTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(engnExpSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "예상운영수익",
                    width: 100,
                    template: function(e){
                        var amt = 0;
                        amt = costCalc.devProfitAmt(e);

                        engnExpIncpTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(engnExpIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "전년도<br>매출액",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listBefSale || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "전년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listBefProfit || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "차년도<br>매출액",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listAftSale || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "차년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listAftProfit || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                },
            ],
            dataBound : function (){

                /** 수주 */
                $("#engnDelvAmt").text(comma(engnDelvTotAmt || 0));

                /** 매출 */
                $("#engnSaleAmt").text(comma(engnSaleTotAmt || 0));

                /** 운영수익 */
                $("#engnIncpAmt").text(comma(engnIncpTotAmt || 0));

                /** 예상수주 */
                $("#expEngnAmt").text(comma(engnExpDelvTotAmt));

                /** 예상매출 */
                $("#expSaleEngnAmt").text(comma(engnExpSaleTotAmt || 0));

                /** 예상운영수익 */
                $("#expIncpEngnAmt").text(comma(engnExpIncpTotAmt || 0));
            },
        }).data("kendoGrid");

    },

    fn_otherGrid : function(){

        let otherTotAmt = 0;          // 총 사업비
        let otherDelvTotAmt = 0;      // 수주금액
        let otherSaleTotAmt = 0;      // 매출액
        let otherIncpTotAmt = 0;      // 운영수익

        let otherExpDelvTotAmt = 0;   // 예상수주금액
        let otherExpSaleTotAmt = 0;   // 예상매출액
        let otherExpIncpTotAmt = 0;   // 예상운영수익

        $("#otherGrid").kendoGrid({
            dataSource: finPerm.global.rsList.otherList,
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "연번",
                    width: 40
                }, {
                    field: "BUSN_NM",
                    title: "사업구분",
                    width: 80
                }, {
                    field: "PJT_CD",
                    title: "프로젝트 코드",
                    width: 100
                }, {
                    title: "프로젝트명",
                    field: "PJT_NM",
                    width: 350
                }, {
                    title: "주관기관<br>(업체명)",
                    field: "CRM_NM",
                    width: 120,
                    footerTemplate: "합계",
                }, {
                    title: "수주일",
                    field: "LIST_STR_DE",
                    width: 80
                }, {
                    title: "종료예정일",
                    field: "LIST_NOW_END_DE",
                    width: 80
                }, {
                    title: "종료일",
                    field: "LIST_END_DE",
                    width: 80
                }, {
                    title: "수주금액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.allPjtAmt(e);

                        if((e.PJT_STEP == "Y" || e.PJT_STEP == "E" || e.PJT_STEP == "E0" || e.PJT_STEP == "E1" || e.PJT_STEP == "E2" || e.PJT_STEP == "R" || e.PJT_STEP == "S") && e.PJT_STOP == "N") {
                            otherExpDelvTotAmt += Number(e.EXP_AMT || 0);
                        }

                        otherDelvTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(otherDelvTotAmt)+"</div>";
                    }
                }, {
                    title: "총 사업비",
                    field: "ALL_BUSN_COST",
                    width: 100,
                    template: function(e){
                        var allBusnCost = 0;
                        if(e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S") {
                            otherTotAmt += e.ALL_BUSN_COST;
                            allBusnCost = e.ALL_BUSN_COST;
                        } else {
                            otherTotAmt += e.PJT_AMT;
                            allBusnCost = e.PJT_AMT;
                        }
                        return '<div style="text-align: right">'+comma(allBusnCost)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(otherTotAmt)+"</div>";
                    }
                }, {
                    title: "매출액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resSaleAmt(e);

                        otherSaleTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(otherSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resProfitAmt(e);

                        otherIncpTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(otherIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.devSaleAmt(e);

                        otherExpSaleTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(otherExpSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "예상운영수익",
                    width: 100,
                    template: function(e){
                        var amt = 0;
                        amt = costCalc.devProfitAmt(e);

                        otherExpIncpTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(otherExpIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "전년도<br>매출액",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listBefSale || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "전년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listBefProfit || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "차년도<br>매출액",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listAftSale || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                }, {
                    title: "차년도<br>운영수익",
                    width: 100,
                    template: function(e){
                        let amt = Number(e.listAftProfit || 0);

                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    }
                },
            ],
            dataBound : function (){

                /** 수주 */
                $("#otherDelvAmt").text(comma(otherDelvTotAmt || 0));

                /** 매출 */
                $("#otherSaleAmt").text(comma(otherSaleTotAmt || 0));

                /** 운영수익 */
                $("#otherIncpAmt").text(comma(otherIncpTotAmt || 0));

                /** 예상수주 */
                $("#expOtherAmt").text(comma(otherExpDelvTotAmt || 0));

                /** 예상매출 */
                $("#expSaleOtherAmt").text(comma(otherExpSaleTotAmt || 0));

                /** 예상운영수익 */
                $("#expIncpOtherAmt").text(comma(otherExpIncpTotAmt || 0));
            },
        }).data("kendoGrid");

    },

    fn_objDataSet : function(){
        /** 목표 */
        $("#objDelvAmt").text(comma(finPerm.global.rsList.deptObj.DELV_OBJ) || 0);
        $("#objSaleAmt").text(comma(finPerm.global.rsList.deptObj.SALE_OBJ) || 0);
        $("#objIncpAmt").text(comma(finPerm.global.rsList.deptObj.INCP_OBJ) || 0);
    },

    fn_costCalcTotal : function(){
        /** 달성소계 */
        $("#delvTotAmt").text(comma(Number(uncommaN($("#rndDelvAmt").text() || 0)) + Number(uncommaN($("#unRndDelvAmt").text() || 0)) + Number(uncommaN($("#engnDelvAmt").text() || 0)) + Number(uncommaN($("#otherDelvAmt").text() || 0))));
        $("#saleTotAmt").text(comma(Number(uncommaN($("#rndSaleAmt").text() || 0)) + Number(uncommaN($("#unRndSaleAmt").text() || 0)) + Number(uncommaN($("#engnSaleAmt").text() || 0)) + Number(uncommaN($("#otherSaleAmt").text() || 0))));
        $("#incpTotAmt").text(comma(Number(uncommaN($("#rndIncpAmt").text() || 0)) + Number(uncommaN($("#unRndIncpAmt").text() || 0)) + Number(uncommaN($("#engnIncpAmt").text() || 0)) + Number(uncommaN($("#otherIncpAmt").text() || 0))));

        /** 예상소계 */
        $("#expTotAmt").text(comma(Number(uncommaN($("#expRndAmt").text() || 0)) + Number(uncommaN($("#expUnRndAmt").text() || 0)) + Number(uncommaN($("#expEngnAmt").text() || 0)) + Number(uncommaN($("#expOtherAmt").text() || 0))));
        $("#expSaleTotAmt").text(comma(Number(uncommaN($("#expSaleRndAmt").text() || 0)) + Number(uncommaN($("#expSaleUnRndAmt").text() || 0)) + Number(uncommaN($("#expSaleEngnAmt").text() || 0)) + Number(uncommaN($("#expSaleOtherAmt").text() || 0))));
        $("#expIncpTotAmt").text(comma(Number(uncommaN($("#expIncpRndAmt").text() || 0)) + Number(uncommaN($("#expIncpUnRndAmt").text() || 0)) + Number(uncommaN($("#expIncpEngnAmt").text() || 0)) + Number(uncommaN($("#expIncpOtherAmt").text() || 0))));

        /** 합계 */
        $("#totAmtSum").text(comma(Number(uncommaN($("#expTotAmt").text())) + Number(uncommaN($("#delvTotAmt").text()))));
        $("#saleTotAmtSum").text(comma(Number(uncommaN($("#saleTotAmt").text())) + Number(uncommaN($("#expSaleTotAmt").text()))));
        $("#incpTotAmtSum").text(comma(Number(uncommaN($("#incpTotAmt").text())) + Number(uncommaN($("#expIncpTotAmt").text()))));

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
    },

    fn_operCostSet : function(){

        var parameters = {
            deptSeq : $("#dept").val(),
            startDt : $("#year").val().split("-")[0] + "-01-01",
            endDt : $("#year").val().split("-")[0] + "-12-31"
        }

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
        $("#expPayTotAmt").text(comma(Math.round(finPerm.global.rsList.operObj.PAYROLL_OBJ) || 0));
        $("#expExnpTotAmt").text(comma(Math.round(finPerm.global.rsList.operObj.EXNP_OBJ) || 0));
        $("#expCommTotAmt").text(comma(Math.round(finPerm.global.rsList.operObj.COMM_OBJ) || 0));
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

    fn_pjtSearch : function (busnClass){

        if(busnClass == "R") {
            $("#rndGrid").show();
            $("#unRndGrid").hide();
            $("#engnGrid").hide();
            $("#otherGrid").hide();
        } else if(busnClass == "S") {
            $("#rndGrid").hide();
            $("#unRndGrid").show();
            $("#engnGrid").hide();
            $("#otherGrid").hide();
        } else if(busnClass == "D") {
            $("#rndGrid").hide();
            $("#unRndGrid").hide();
            $("#engnGrid").show();
            $("#otherGrid").hide();
        } else if(busnClass == "V") {
            $("#rndGrid").hide();
            $("#unRndGrid").hide();
            $("#engnGrid").hide();
            $("#otherGrid").show();
        }

    },

    fn_objSetting : function(type){
        var url = "/cam_achieve/popObjSetting.do?year=" + $("#year").val().split("-")[0] + "&objType=" + type;

        if($("#dept").val() != ""){
            url += "&deptSeq=" + $("#dept").val();
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