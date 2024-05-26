var weekMeet = {


    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());

        weekMeet.fn_searchData();


    },

    fn_searchData : function(){

        var parameters = {
            year : $("#year").val(),
        }

        var rs = customKendo.fn_customAjax("/cam_achieve/getEngnDeptData", parameters);

        console.log(rs);
        var ls = rs.ls;
        var engnSaleList = rs.saleLs.engnSaleList;
        var rndSaleList = rs.saleLs.rndSaleList;

        for(var i = 0 ; i < ls.length ; i++){
            $("td[name='delvAch']").each(function(){
                if($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ){
                    $(this).text(comma((Math.floor(ls[i].PJT_AMT / 1000000) || 0)));
                }
            });

            $("td[name='delvExp']").each(function(){
                if($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ){
                    $(this).text(comma((Math.floor((ls[i].EXP_AMT + ls[i].EXP_AMT2) / 1000000) || 0)));
                }
            });

            $("td[name='delvSum']").each(function(){
                if($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ){
                    $(this).text(comma((Math.floor((ls[i].PJT_AMT + (ls[i].EXP_AMT + ls[i].EXP_AMT2)) / 1000000) || 0)));
                }
            });

            $("td[name='saleAch']").each(function(){
                if($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ){
                    var saleEngnAchSum = 0;
                    var saleRndAchSum = 0;

                    for(var j = 0 ; j < engnSaleList.length ; j++){
                        if($(this).attr("id").split("_")[1] == engnSaleList[j].DEPT_SEQ){
                            saleEngnAchSum += engnSaleList[j].PJT_AMT;
                        }
                    }

                    for(var j = 0 ; j < rndSaleList.length ; j++){
                        if($(this).attr("id").split("_")[1] == rndSaleList[j].DEPT_SEQ){
                            saleRndAchSum += rndSaleList[j].PJT_AMT;
                        }
                    }

                    $(this).text(comma((Math.floor((ls[i].PJT_AMT + (saleEngnAchSum || 0) + (saleRndAchSum || 0)) / 1000000)) || 0));
                    $("#saleSum_" + ls[i].DEPT_SEQ).text(comma((Math.floor((Number(uncomma($("#saleSum_" + ls[i].DEPT_SEQ).text()))) + (ls[i].PJT_AMT + (saleEngnAchSum || 0) + (saleRndAchSum || 0)) / 1000000)) || 0));
                }
            });

            $("td[name='saleExp']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    var saleEngnExpSum = 0;
                    var saleRndExpSum = 0;

                    for (var j = 0; j < engnSaleList.length; j++) {
                        if ($(this).attr("id").split("_")[1] == engnSaleList[j].DEPT_SEQ) {
                            saleEngnExpSum += engnSaleList[j].PJT_AMT;
                        }
                    }

                    for (var j = 0; j < rndSaleList.length; j++) {
                        if ($(this).attr("id").split("_")[1] == rndSaleList[j].DEPT_SEQ) {
                            saleRndExpSum += rndSaleList[j].PJT_AMT;
                        }
                    }

                    $(this).text(comma((Math.floor((ls[i].PJT_AMT + (saleEngnExpSum || 0) + (ls[i].PJT_AMT - (saleRndExpSum || 0))) / 1000000)) || 0));
                    $("#saleSum_" + ls[i].DEPT_SEQ).text(comma((Math.floor((Number(uncomma($("#saleSum_" + ls[i].DEPT_SEQ).text()))) + (ls[i].PJT_AMT + (saleEngnExpSum || 0) + (ls[i].PJT_AMT - (saleRndExpSum || 0))) / 1000000)) || 0));
                }
            });
        }
        
    },

}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}