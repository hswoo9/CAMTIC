var bustripExnpPop = {

    fn_defaultScript : function (type){

        $(".empName, .oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost").kendoTextBox();

        var costData = $(".oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost");

        costData.css("text-align", "right");

        if(type != "upd"){
            costData.val(0)
        }
        costData.bind("keyup keydown", function(){
            bustripExnpPop.inputNumberFormat(this);

            if(this.value == ""){
                this.value = 0;
            }

            var bustExnpTb = document.getElementById('bustExnpTb');

            var rowList = bustExnpTb.rows;

            for(var i = 1 ; i < rowList.length ; i++){
                var row = rowList[i];
                var tdsNum = row.childElementCount;
                var totalCost = 0;

                for (var j = 1; j < tdsNum - 1; j++) {
                    totalCost += parseInt($(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
                    console.log("j = " + j + ", " + $(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
                }

                if(totalCost != 0){
                    $(row.cells[tdsNum - 1]).find("input[type=text]").val(bustripExnpPop.fn_comma(totalCost));
                } else {
                    $(row.cells[tdsNum - 1]).find("input[type=text]").val(0);
                }


            }
        });

        bustripExnpPop.fn_settingCost(type);
    },

    inputNumberFormat: function (obj){
        obj.value = bustripExnpPop.fn_comma(obj.value);

    },

    fn_comma: function(str){
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
    },

    fn_save:function(id, type){
        if($("input[name='driver']:checked").val() == "" || $("input[name='driver']:checked").val() == null ||  $("input[name='driver']:checked").val() == undefined){
            alert("운행자가 필요합니다");
            return;
        }
        var bustExnpTb = document.getElementById('bustExnpTb');
        var rowList = bustExnpTb.rows;

        var result = "";
        for(var i = 1 ; i < rowList.length ; i++){
            var row = rowList[i];
            var tdsNum = row.childElementCount;
            var totalCost = 0;


            var data = {
                hrBizReqId : id,
                hrBizExnpId : $(row.cells[0]).find("input[name='hrBizExnpId']").val(),
                empName : $(row.cells[0]).find("input[type=text]").val(),
                empSeq : $(row.cells[0]).find("input[name='empSeq']").val(),
                oilCost : $(row.cells[1]).find("input[type=text]").val(),
                trafCost : $(row.cells[2]).find("input[type=text]").val(),
                trafDayCost : $(row.cells[3]).find("input[type=text]").val(),
                tollCost : $(row.cells[4]).find("input[type=text]").val(),
                dayCost : $(row.cells[5]).find("input[type=text]").val(),
                eatCost : $(row.cells[6]).find("input[type=text]").val(),
                parkingCost : $(row.cells[7]).find("input[type=text]").val(),
                etcCost : $(row.cells[8]).find("input[type=text]").val(),
                totCost : $(row.cells[9]).find("input[type=text]").val(),
                expStat : "Y",
                driver : "N",
                type : type
            }

            if(data.empSeq == $("input[name='driver']:checked").val()){
                data.driver = "Y"
                data.driverEmpSeq = data.empSeq
            }

            result = customKendo.fn_customAjax("/bustrip/saveBustripExnpPop", data);
        }

        if(type != "upd"){
            customKendo.fn_customAjax("/bustrip/insBustripExnpResult", result);
        }



        parent.opener.bustripResult.mainGrid();

        window.close();
    },

    fn_settingCost(type){
        if(type != "upd") {
            let costList = customKendo.fn_customAjax("/bustrip/getBustripCostList", {
                hrBizReqId: $("#hrBizReqId").val()
            }).list;
            console.log(costList);
            for(let i=0; i<costList.length; i++){
                $("."+String(costList[i].EXNP_CODE)).val(fn_numberWithCommas(costList[i].COST_AMT));
            }

            let dayCostArr = [];
            $.each($(".addData"), function(i, v){
                let dayCost = {};
                dayCost.empSeq = $(v).find('.empSeq').val();

                let dayCostResult = customKendo.fn_customAjax("/bustrip/getBustripMaxDayCost", {
                    empSeq: $(v).find('.empSeq').val(),
                    hrBizReqId: $("#hrBizReqId").val()
                });

                dayCost.dayCost = dayCostResult.data.DAY_COST;
                dayCostArr[i] = dayCost;
            });

            console.log(dayCostArr);

            for(let i=0; i<dayCostArr.length; i++){
                if(Number(dayCostArr[i].dayCost.replace(",", "")) > 0){
                    $("#dayCost"+String(dayCostArr[i].empSeq)).val(0);
                    $("#dayCost"+String(dayCostArr[i].empSeq)).data("kendoTextBox").enable(false);
                }
            }
        }
    }
}