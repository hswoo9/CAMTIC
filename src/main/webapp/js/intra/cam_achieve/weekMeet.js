var weekMeet = {

    global : {
        deptList: [],
        rsList: [],
    },

    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "year", "yyyy-MM", new Date());

        weekMeet.fn_dataReset();

        // $("#year").change(function (){
        //     weekMeet.fn_dataReset();
        // });
    },

    fn_dataReset : function() {

        $("td[name='delvObj']").text("0");
        $("td[name='delvAch']").text("0");
        $("td[name='delvAchPer']").text("0");
        $("td[name='delvExp']").text("0");
        $("td[name='delvExpPer']").text("0");
        $("td[name='delvSum']").text("0");
        $("td[name='delvSumPer']").text("0");
        $("td[name='saleObj']").text("0");
        $("td[name='saleAch']").text("0");
        $("td[name='saleAchPer']").text("0");
        $("td[name='saleExp']").text("0");
        $("td[name='saleExpPer']").text("0");
        $("td[name='saleSum']").text("0");
        $("td[name='saleSumPer']").text("0");
        $("td[name='incpObj']").text("0");
        $("td[name='incpAch']").text("0");
        $("td[name='incpAchPer']").text("0");
        $("td[name='incpExp']").text("0");
        $("td[name='incpExpPer']").text("0");
        $("td[name='incpSum']").text("0");
        $("td[name='incpSumPer']").text("0");

        weekMeet.fn_searchData();
    },

    fn_searchData : function(){

        $("div[name='deptGrid']").hide();

        let date = new Date($("#year").val().split("-")[0], $("#year").val().split("-")[1], 0);
        var parameters = {
            year : $("#year").val().split("-")[0],
            baseYear : $("#year").val().split("-")[0],
            startDt : $("#year").val().split("-")[0] + "-01-01",
            endDt : $("#year").val() + "-" + date.getDate(),
            pjtYear : $("#year").val().split("-")[0],
            deptLevel: "1"
        }

        $.ajax({
            url : "/cam_achieve/getDeptProjectCostCalcList",
            data : parameters,
            type : "post",
            dataType : "json",
            beforeSend : function(){
                $("#my-spinner").show();
            },
            success : function(rs) {
                console.log(rs.data);

                weekMeet.global.rsList = rs.data;

                weekMeet.fn_makeGrid();
            }
        })
    },

    fn_makeGrid : function(){

        for(let i=0; i<weekMeet.global.rsList.length; i++) {

            $("div[name='deptGrid']").each(function() {
                if ($(this).attr("id").split("_")[1] == weekMeet.global.rsList[i].DEPT_SEQ) {
                    weekMeet.fn_makeDeptGrid(weekMeet.global.rsList[i]);
                }
            });
        }

        weekMeet.fn_costCalcTotal(); // 소계

        $("#my-spinner").hide();
    },

    fn_makeDeptGrid : function(data){

        let totAmt = 0;          // 총 사업비
        let delvTotAmt = 0;      // 수주금액
        let saleTotAmt = 0;      // 매출액
        let incpTotAmt = 0;      // 운영수익

        let expDelvTotAmt = 0;   // 예상수주금액
        let expSaleTotAmt = 0;   // 예상매출액
        let expIncpTotAmt = 0;   // 예상운영수익

        $("#grid_" + data.DEPT_SEQ).kendoGrid({
            dataSource: data.deptAch,
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
                            expDelvTotAmt += Number(e.PJT_EXP_AMT || 0);
                        }

                        delvTotAmt += amt;

                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(delvTotAmt)+"</div>";
                    }
                }, {
                    title: "총 사업비",
                    field: "ALL_BUSN_COST",
                    width: 100,
                    template: function(e){
                        var allBusnCost = 0;
                        if(e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S") {
                            totAmt += e.ALL_BUSN_COST;
                            allBusnCost = e.ALL_BUSN_COST;
                        } else {
                            totAmt += e.PJT_AMT;
                            allBusnCost = e.PJT_AMT;
                        }
                        return '<div style="text-align: right">'+comma(allBusnCost)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(totAmt)+"</div>";
                    }
                }, {
                    title: "매출액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resSaleAmt(e);

                        saleTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(saleTotAmt)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.resProfitAmt(e);

                        incpTotAmt += amt;
                        return '<div style="text-align: right;">'+comma(amt)+'</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(incpTotAmt)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        let amt = 0;
                        amt = costCalc.devSaleAmt(e);

                        expSaleTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(expSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "예상운영수익",
                    width: 100,
                    template: function(e){
                        var amt = 0;
                        amt = costCalc.devProfitAmt(e);

                        expIncpTotAmt += amt;
                        return '<div style="text-align: right">'+comma(amt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(expIncpTotAmt)+"</div>";
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

                /** 수주 목표 */
                $("#delvObj_" + data.DEPT_SEQ).text(comma(Math.floor(data.deptObj[0].DELV_OBJ / 1000000) || 0));

                /** 수주 달성 */
                $("#delvAch_" + data.DEPT_SEQ).text(comma(Math.floor(delvTotAmt / 1000000) || 0));

                /** 수주 예상 */
                $("#delvExp_" + data.DEPT_SEQ).text(comma(Math.floor(expDelvTotAmt / 1000000) || 0));

                /** 수주 합계 */
                $("#delvSum_" + data.DEPT_SEQ).text(comma((Math.floor(delvTotAmt / 1000000) || 0) + (Math.floor(expDelvTotAmt / 1000000) || 0)));

                /** 매출 목표 */
                $("#saleObj_" + data.DEPT_SEQ).text(comma(Math.floor(data.deptObj[0].SALE_OBJ / 1000000) || 0));

                /** 매출 달성 */
                $("#saleAch_" + data.DEPT_SEQ).text(comma(Math.floor(saleTotAmt / 1000000) || 0));

                /** 매출 예상 */
                $("#saleExp_" + data.DEPT_SEQ).text(comma(Math.floor(expSaleTotAmt / 1000000) || 0));

                /** 매출 합계 */
                $("#saleSum_" + data.DEPT_SEQ).text(comma((Math.floor(saleTotAmt / 1000000) || 0) + (Math.floor(expSaleTotAmt / 1000000) || 0)));

                /** 운영수익 목표 */
                $("#incpObj_" + data.DEPT_SEQ).text(comma(Math.floor(data.deptObj[0].INCP_OBJ / 1000000) || 0));

                /** 운영수익 달성 */
                $("#incpAch_" + data.DEPT_SEQ).text(comma(Math.floor(incpTotAmt / 1000000) || 0));

                /** 운영수익 예상 */
                $("#incpExp_" + data.DEPT_SEQ).text(comma(Math.floor(expIncpTotAmt / 1000000) || 0));

                /** 운영수익 합계 */
                $("#incpSum_" + data.DEPT_SEQ).text(comma((Math.floor(incpTotAmt / 1000000) || 0) + (Math.floor(expIncpTotAmt / 1000000) || 0)));
            },
        }).data("kendoGrid");
    },

    fn_costCalcTotal : function(){

        var delvObjTotal = 0;       // 수주목표 총계
        var delvAchTotal = 0;       // 수주달성 총계
        var delvExpTotal = 0;       // 수주예상 총계
        var delvSumTotal = 0;       // 수주합계 총계

        var saleObjTotal = 0;       // 매출목표 총계
        var saleAchTotal = 0;       // 매출달성 총계
        var saleExpTotal = 0;       // 매출예상 총계
        var saleSumTotal = 0;       // 매출합계 총계

        var incpObjTotal = 0;       // 운영수익목표 총계
        var incpAchTotal = 0;       // 운영수익달성 총계
        var incpExpTotal = 0;       // 운영수익예상 총계
        var incpSumTotal = 0;       // 운영수익합계 총계

        /** 수주 목표 */
        $("td[name='delvObj']").each(function() {
            delvObjTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 수주 달성 */
        $("td[name='delvAch']").each(function(){
            delvAchTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 수주 예상 */
        $("td[name='delvExp']").each(function(){
            delvExpTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 수주 합계 */
        $("td[name='delvSum']").each(function(){
            delvSumTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 매출 목표 */
        $("td[name='saleObj']").each(function() {
            saleObjTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 매출 달성 */
        $("td[name='saleAch']").each(function(){
            saleAchTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 매출 예상 */
        $("td[name='saleExp']").each(function() {
            saleExpTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 매출 합계 */
        $("td[name='saleSum']").each(function(){
            saleSumTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 운영수익 목표 */
        $("td[name='incpObj']").each(function() {
            incpObjTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 운영수익 달성 */
        $("td[name='incpAch']").each(function() {
            incpAchTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 운영수익 예상 */
        $("td[name='incpExp']").each(function() {
            incpExpTotal += Number(uncommaN($(this).text()) || 0);
        });

        /** 운영수익 합계 */
        $("td[name='incpSum']").each(function(){
            incpSumTotal += Number(uncommaN($(this).text()) || 0);
        });

        $("#delvObjTotal").text(comma(delvObjTotal));
        $("#delvAchTotal").text(comma(delvAchTotal));
        $("#delvExpTotal").text(comma(delvExpTotal));
        $("#delvSumTotal").text(comma(delvSumTotal));

        $("#saleObjTotal").text(comma(saleObjTotal));
        $("#saleAchTotal").text(comma(saleAchTotal));
        $("#saleExpTotal").text(comma(saleExpTotal));
        $("#saleSumTotal").text(comma(saleSumTotal));

        $("#incpObjTotal").text(comma(incpObjTotal));
        $("#incpAchTotal").text(comma(incpAchTotal));
        $("#incpExpTotal").text(comma(incpExpTotal));
        $("#incpSumTotal").text(comma(incpSumTotal));

        weekMeet.fn_calcPercent();
    },

    fn_pjtSearch : function (deptSeq){

        $("div[name='deptGrid']").hide();

        $("#grid_" + deptSeq).show();

    },

    fn_calcPercent : function(){

        /** 수주 달성 비율 */
        $("td[name='delvAchPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#delvObj_" + deptSeq).text()));
            var achAmt = Number(uncommaN($("#delvAch_" + deptSeq).text()));

            if(objAmt == 0 || achAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((achAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 수주 예상 비율 */
        $("td[name='delvExpPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#delvObj_" + deptSeq).text()));
            var expAmt = Number(uncommaN($("#delvExp_" + deptSeq).text()));

            if(objAmt == 0 || expAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((expAmt / objAmt * 100) * 10) / 10
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 수주 합계 비율 */
        $("td[name='delvSumPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#delvObj_" + deptSeq).text()));
            var sumAmt = Number(uncommaN($("#delvSum_" + deptSeq).text()));

            if(objAmt == 0 || sumAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((sumAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 매출 달성 비율 */
        $("td[name='saleAchPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#saleObj_" + deptSeq).text()));
            var achAmt = Number(uncommaN($("#saleAch_" + deptSeq).text()));

            if(objAmt == 0 || achAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((achAmt / objAmt * 100) * 10) / 10
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 매출 예상 비율 */
        $("td[name='saleExpPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#saleObj_" + deptSeq).text()));
            var expAmt = Number(uncommaN($("#saleExp_" + deptSeq).text()));

            if(objAmt == 0 || expAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((expAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 매출 합계 비율 */
        $("td[name='saleSumPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#saleObj_" + deptSeq).text()));
            var sumAmt = Number(uncommaN($("#saleSum_" + deptSeq).text()));

            if(objAmt == 0 || sumAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((sumAmt / objAmt * 100) * 10) / 10
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 운영수익 달성 비율 */
        $("td[name='incpAchPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#incpObj_" + deptSeq).text()));
            var achAmt = Number(uncommaN($("#incpAch_" + deptSeq).text()));

            if(objAmt == 0 || achAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((achAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 운영수익 예상 비율 */
        $("td[name='incpExpPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#incpObj_" + deptSeq).text()));
            var expAmt = Number(uncommaN($("#incpExp_" + deptSeq).text()));

            if(objAmt == 0 || expAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((expAmt / objAmt * 100) * 10) / 10;

                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 운영수익 합계 비율 */
        $("td[name='incpSumPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#incpObj_" + deptSeq).text()));
            var sumAmt = Number(uncommaN($("#incpSum_" + deptSeq).text()));

            if(objAmt == 0 || sumAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((sumAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 수주 총계 비율 */
        let objAmt = Number(uncommaN($("#delvObjTotal").text()));
        let achAmt = Number(uncommaN($("#delvAchTotal").text()));
        let expAmt = Number(uncommaN($("#delvExpTotal").text()));
        let sumAmt = Number(uncommaN($("#delvSumTotal").text()));

        if(objAmt == 0 || achAmt == 0){
            $("#delvAchPerTotal").text("0 %");
        } else {
            var num = Math.round((achAmt / objAmt * 100) * 10) / 10;
            $("#delvAchPerTotal").text( num.toFixed(1) + " %" );
        }
        if(objAmt == 0 || expAmt == 0){
            $("#delvExpPerTotal").text("0 %");
        } else {
            var num = Math.round((expAmt / objAmt * 100) * 10) / 10;

            $("#delvExpPerTotal").text( num.toFixed(1) + " %" );
        }
        if(objAmt == 0 || sumAmt == 0){
            $("#delvSumPerTotal").text("0 %");
        } else {
            var num = Math.round((sumAmt / objAmt * 100) * 10);

            $("#delvSumPerTotal").text( num.toFixed(1) + " %" );
        }

        /** 매출 총계 비율 */
        objAmt = Number(uncommaN($("#saleObjTotal").text()));
        achAmt = Number(uncommaN($("#saleAchTotal").text()));
        expAmt = Number(uncommaN($("#saleExpTotal").text()));
        sumAmt = Number(uncommaN($("#saleSumTotal").text()));

        if(objAmt == 0 || achAmt == 0){
            $("#saleAchPerTotal").text("0 %");
        } else {
            $("#saleAchPerTotal").text( Math.round((achAmt / objAmt * 100) * 10) / 10 + " %" );
        }
        if(objAmt == 0 || expAmt == 0){
            $("#saleExpPerTotal").text("0 %");
        } else {
            $("#saleExpPerTotal").text( Math.round((expAmt / objAmt * 100) * 10) / 10 + " %" );
        }
        if(objAmt == 0 || sumAmt == 0){
            $("#saleSumPerTotal").text("0 %");
        } else {
            $("#saleSumPerTotal").text( Math.round((sumAmt / objAmt * 100) * 10) / 10 + " %" );
        }

        /** 운영수익 총계 비율 */
        objAmt = Number(uncommaN($("#incpObjTotal").text()));
        achAmt = Number(uncommaN($("#incpAchTotal").text()));
        expAmt = Number(uncommaN($("#incpExpTotal").text()));
        sumAmt = Number(uncommaN($("#incpSumTotal").text()));

        if(objAmt == 0 || achAmt == 0){
            $("#incpAchPerTotal").text("0 %");
        } else {
            $("#incpAchPerTotal").text( Math.round((achAmt / objAmt * 100) * 10) / 10 + " %" );
        }
        if(objAmt == 0 || expAmt == 0){
            $("#incpExpPerTotal").text("0 %");
        } else {
            $("#incpExpPerTotal").text( Math.round((expAmt / objAmt * 100) * 10) / 10 + " %" );
        }
        if(objAmt == 0 || sumAmt == 0){
            $("#incpSumPerTotal").text("0 %");
        } else {
            $("#incpSumPerTotal").text( Math.round((sumAmt / objAmt * 100) * 10) / 10 + " %" );
        }

    },

    fn_objSetting : function(){
        var url = "/cam_achieve/popObjSetting.do?year=" + $("#year").val() + "&deptLevel=1";
        var name = "_blank";
        var option = "width = 680, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}