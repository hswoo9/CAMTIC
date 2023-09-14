const bustripExnpReq = {
    global: {
        costData: "",
        bustripInfo: {}
    },

    init: function(type){
        bustripExnpReq.pageSet(type);
        bustripExnpReq.dataSet(type);
    },

    pageSet: function(type){
        window.resizeTo(1700, 750);
        bustripExnpReq.global.costData = $(".oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost");
        let corpArr = [
            {text: "개인", value: "N"},
            {text: "법인", value: "Y"}
        ]
        if($("#mod").val() == "mng"){
            $(".empName, .oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost").kendoTextBox({
                enable: false
            });
            $(".corpYn").kendoDropDownList({
                dataSource : corpArr,
                dataTextField: "text",
                dataValueField: "value",
                enable: false
            });
        }else {
            $(".empName, .oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost").kendoTextBox();
            $(".corpYn").kendoDropDownList({
                dataSource : corpArr,
                dataTextField: "text",
                dataValueField: "value"
            });
        }
        let costData = bustripExnpReq.global.costData;
        costData.css("text-align", "right");
        costData.bind("keyup", bustripExnpReq.fn_setTableSum);
        $(".eatCorpYn").bind("keyup", bustripExnpReq.fn_setTableSum);
    },

    dataSet: function(type){
        let costData = bustripExnpReq.global.costData;
        if(type != "upd"){
            costData.val(0);
        }
        var data = {
            hrBizReqResultId: hrBizReqResultId
        }
        var result = customKendo.fn_customAjax("/bustrip/getBustripOne", data);
        bustripExnpReq.global.bustripInfo = result.map;
        console.log(result.map);

        bustripExnpReq.fn_getExnpInfo(type);
        bustripExnpReq.fn_getFuelInfo(type);
    },

    fn_getExnpInfo(type){
        let bustripInfo = bustripExnpReq.global.bustripInfo;
        let costList = customKendo.fn_customAjax("/bustrip/getBustripCostList", {
            hrBizReqResultId: hrBizReqResultId
        }).list;
        console.log("bustripInfo", bustripInfo);
        console.log("costList", costList);
        if(type != "upd") {
            for(let i=0; i<costList.length; i++){
                $("."+String(costList[i].EXNP_CODE)).val(fn_comma(costList[i].COST_AMT));
            }

            let dayCostArr = [];
            $.each($(".addData"), function(i, v){
                let dayCost = {};
                dayCost.empSeq = $(v).find('.empSeq').val();

                let dayCostResult = customKendo.fn_customAjax("/bustrip/getBustripMaxDayCost", {
                    empSeq: $(v).find('.empSeq').val(),
                    hrBizReqResultId: hrBizReqResultId
                });

                dayCost.dayCost = dayCostResult.data.DAY_COST;
                dayCostArr[i] = dayCost;
            });

            console.log("dayCostArr", dayCostArr);

            for(let i=0; i<dayCostArr.length; i++){
                var costN = 0;
                if(dayCostArr[i].dayCost.replace(",", "") > 0){
                    $("#dayCost"+String(dayCostArr[i].empSeq)).val(0);
                }else{
                    if(bustripInfo.TRIP_CODE == "3" && (bustripInfo.USE_TRSPT == "0" || bustripInfo.DRIVER_EMP_SEQ == dayCostArr[i].empSeq)){

                        let amt = $("#dayCost"+String(dayCostArr[i].empSeq)).val().replace(",", "");
                        console.log("amt", amt)
                        // $("#dayCost"+String(dayCostArr[i].empSeq)).val(fn_comma(costList[costN].COST_AMT + (Number(amt)+10000)));
                        $("#dayCost"+String(dayCostArr[i].empSeq)).val(fn_comma(costList[costN].COST_AMT));
                        costN++;
                    }
                }
            }
        }
    },

    fn_getFuelInfo: function(type){
        if(type != "upd") {
            let bustripInfo = bustripExnpReq.global.bustripInfo;
            var empSeq = bustripInfo.DRIVER_EMP_SEQ;

            let costInfo = customKendo.fn_customAjax("/bustrip/getBustripFuelCostInfo", {
                empSeq: empSeq
            }).data;

            console.log("costInfo", costInfo);
            console.log(bustripInfo);
            let realDis = Number(bustripInfo.MOVE_DST);
            let codeDis = Number(costInfo.DISTANCE);
            let ceil = Math.ceil(realDis/codeDis);
            let amt = ceil * Number(costInfo.COST_AMT);

            $(".oilCost").val(0);
            $("#oilCost"+String(empSeq)).val(fn_comma(amt));
        }
        bustripExnpReq.fn_setTableSum();
    },

    fn_eatCheck(e){
        if(e.value > 30000 && $(e).closest("td").find("input[name=corpYn]").val() == "N"){
            alert("개인카드 식비는 3만원 초과 입력이 불가능합니다.");
            e.value = 0;
            bustripExnpReq.fn_setTableSum();
        }
    },

    fn_setTableSum: function(){
        fn_inputNumberFormat(this);
        if(this.value == ""){
            this.value = 0;
        }

        if(this.value == ""){
            this.value = 0;
        }

        var bustExnpTb = document.getElementById('bustExnpTb');

        var rowList = bustExnpTb.rows;

        let totalCostArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let totalTotalCost = 0;

        //가로합계
        for(var i = 1 ; i < rowList.length-1 ; i++){
            var row = rowList[i];
            var tdsNum = row.childElementCount;
            var totalCost = 0;

            for (var j = 1; j < tdsNum - 1; j++) {
                totalCostArr[j] += parseInt($(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
                totalCost += parseInt($(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
                console.log("j = " + j + ", " + $(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
            }
            console.log(totalCostArr);

            if(totalCost != 0){
                $(row.cells[tdsNum - 1]).find("input[type=text]").val(fn_comma(totalCost));
            } else {
                $(row.cells[tdsNum - 1]).find("input[type=text]").val(0);
            }
            totalTotalCost += totalCost;
        }

        //세로합계
        for(var i = 1 ; i < 2 ; i++){
            var row = rowList[rowList.length-1];
            var tdsNum = row.childElementCount;

            for (var j = 1; j < tdsNum - 2; j++) {
                if(totalCostArr[j] != 0){
                    $(row.cells[j]).find("input[type=text]").val(fn_comma(totalCostArr[j]));
                } else {
                    $(row.cells[j]).find("input[type=text]").val(0);
                }
            }

            if(totalTotalCost != 0){
                $(row.cells[tdsNum - 1]).find("input[type=text]").val(fn_comma(totalTotalCost));
            } else {
                $(row.cells[tdsNum - 1]).find("input[type=text]").val(0);
            }
        }
    },

    fn_saveBtn: function(id, type){
        var bustExnpTb = document.getElementById('bustExnpTb');
        var rowList = bustExnpTb.rows;

        var result = "";
        for(var i = 1 ; i < rowList.length-1 ; i++){
            var row = rowList[i];
            var tdsNum = row.childElementCount;
            var totalCost = 0;


            let empSeq = $(row.cells[0]).find("input[name='empSeq']").val();
            var data = {
                hrBizReqResultId : hrBizReqResultId,
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

                oilCorpYn : $(row.cells[1]).find("#oilCorpYn"+empSeq).data("kendoDropDownList").value(),
                trafCorpYn : $(row.cells[2]).find("#trafCorpYn"+empSeq).data("kendoDropDownList").value(),
                trafDayCorpYn : $(row.cells[3]).find("#trafDayCorpYn"+empSeq).data("kendoDropDownList").value(),
                tollCorpYn : $(row.cells[4]).find("#tollCorpYn"+empSeq).data("kendoDropDownList").value(),
                eatCorpYn : $(row.cells[6]).find("#eatCorpYn"+empSeq).data("kendoDropDownList").value(),
                parkingCorpYn : $(row.cells[7]).find("#parkingCorpYn"+empSeq).data("kendoDropDownList").value(),
                etcCorpYn : $(row.cells[8]).find("#etcCorpYn"+empSeq).data("kendoDropDownList").value(),
                expStat : "Y",
                type : type
            }

            result = customKendo.fn_customAjax("/bustrip/saveBustripExnpPop", data);
        }

        var data = {
            hrBizReqResultId : hrBizReqResultId,
            empSeq : $("#regEmpSeq").val(),
            status : 10
        }

        var result = customKendo.fn_customAjax("/bustrip/setReqCert", data);
        alert("승인요청이 완료되었습니다.");
        parent.opener.gridReload();
        window.close();
    },

    fn_setCertRep : function (p, key){
        var message = "승인하시겠습니까?"
        if(p == 30){
            message = "반려하시겠습니까?"
        }
        if(!confirm(message)){
            return;
        }
        var data = {
            hrBizReqResultId : hrBizReqResultId,
            empSeq : $("#regEmpSeq").val(),
            status : p
        }

        var result = customKendo.fn_customAjax("/bustrip/setReqCert", data);

        if(result.flag){
            opener.gridReload();
            window.close();
        }

    }
}