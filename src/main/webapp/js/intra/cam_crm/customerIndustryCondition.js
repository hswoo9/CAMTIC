var industryCondition = {

    global : {
        now : new Date(),
        searchAjaxData : "",
        dropDownDataSource : "",
    },

    fn_defaultScript : function (){

        industryCondition.fn_setCustomerCondition();
    },

    fn_setCustomerCondition : function(){
        var result = customKendo.fn_customAjax("/crm/getCustomerIndustryCondition.do", industryCondition.global.searchAjaxData);
        if(result.flag) {
            var ls = result.list;
            var depthName = ["일반기계", "기타", "자동차", "정보영상/인쇄전자/반도체", "식품/바이오", "소재", "우주/항공/방산", "RFT/풍력/태양광", "LED"]
            var aa = 0, bb = 0, cc = 0, dd = 0, ee = 0, ff = 0, gg = 0, hh = 0, jj = 0, kk = 0;
            for(var i = 0; i < ls.length; i++){
                if(ls[i].MAIN_CODE == "GM") {
                    $("#gmCnt").text(ls[i].CNT);
                    aa += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "OTHER") {
                    $("#otherCnt").text(ls[i].CNT);
                    bb += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "CAR") {
                    $("#carCnt").text(ls[i].CNT);
                    cc += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "VD") {
                    $("#vdCnt").text(ls[i].CNT);
                    dd += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "F") {
                    $("#fCnt").text(ls[i].CNT);
                    ee += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "MA") {
                    $("#maCnt").text(ls[i].CNT);
                    ff += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "UN") {
                    $("#unCnt").text(ls[i].CNT);
                    gg += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "RFT") {
                    $("#rftCnt").text(ls[i].CNT);
                    hh += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "LED") {
                    $("#rftCnt").text(ls[i].CNT);
                    jj += ls[i].CNT;
                }
                if(ls[i].MAIN_CODE == "") {
                    $("#unRegCnt").text(ls[i].CNT);
                    kk += ls[i].CNT;
                }
            }

            $("#depthCustomChart").kendoChart({
                title: {
                    text: "분야별 고객현황"
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "column"
                },
                series: [{
                    name: "Total Visits",
                    data: [aa, bb, cc, dd, ee, ff, gg, hh, jj]
                }],
                valueAxis: {
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                categoryAxis: {
                    categories: depthName,
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });
        }
    }
}