const bustripExnpReq = {
    global: {
        costData: ""
    },

    init: function(type){
        bustripExnpReq.pageSet(type);
        bustripExnpReq.dataSet(type);
    },

    pageSet: function(type){
        bustripExnpReq.global.costData = $(".oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost");
        let corpArr = [
            {text: "개인", value: "N"},
            {text: "법인", value: "Y"}
        ]
        if(type == "upd" || ("#mod").val() == "mng"){
            $(".empName, .oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost").kendoTextBox({
                enable: false
            });
            $(".corpYn").kendoDropDownList({
                dataSource : corpArr,
                dataTextField: "text",
                dataValueField: "value",
                enable: false
            });
            $("input[name=driver]").each(function(i) {
                $(this).attr('disabled', "true");
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
        costData.bind("keyup", bustripExnpReq.horizontalSum);
        $(".eatCorpYn").bind("keyup", bustripExnpReq.horizontalSum);
    },

    dataSet: function(type){
        let costData = bustripExnpReq.global.costData;
        if(type != "upd"){
            costData.val(0);
        }

        bustripExnpReq.fn_getExnpInfo(type);
        bustripExnpReq.horizontalSum();
    },

    horizontalSum: function(){
        fn_inputNumberFormat(this);
        if(this.value == ""){
            this.value = 0;
        }

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
                $(row.cells[tdsNum - 1]).find("input[type=text]").val(fn_comma(totalCost));
            } else {
                $(row.cells[tdsNum - 1]).find("input[type=text]").val(0);
            }
        }
    },

    verticalSum: function(){

    },

    fn_saveBtn: function(id, type){
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
                oilCorpYn : $(row.cells[1]).find("input[name='corpYn']").val(),
                trafCost : $(row.cells[2]).find("input[type=text]").val(),
                trafCorpYn : $(row.cells[1]).find("input[name='corpYn']").val(),
                trafDayCost : $(row.cells[3]).find("input[type=text]").val(),
                trafDayCorpYn : $(row.cells[1]).find("input[name='corpYn']").val(),
                tollCost : $(row.cells[4]).find("input[type=text]").val(),
                tollCorpYn : $(row.cells[1]).find("input[name='corpYn']").val(),
                dayCost : $(row.cells[5]).find("input[type=text]").val(),
                eatCost : $(row.cells[6]).find("input[type=text]").val(),
                eatCorpYn : $(row.cells[1]).find("input[name='corpYn']").val(),
                parkingCost : $(row.cells[7]).find("input[type=text]").val(),
                parkingCorpYn : $(row.cells[1]).find("input[name='corpYn']").val(),
                etcCost : $(row.cells[8]).find("input[type=text]").val(),
                etcCorpYn : $(row.cells[1]).find("input[name='corpYn']").val(),
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
        alert("승인요청이 완료되었습니다.");
        parent.opener.gridReload();

        window.close();
    },

    fn_getExnpInfo(type){
        if(type != "upd") {
            let costList = customKendo.fn_customAjax("/bustrip/getBustripCostList", {
                hrBizReqId: $("#hrBizReqId").val()
            }).list;
            console.log(costList);
            for(let i=0; i<costList.length; i++){
                $("."+String(costList[i].EXNP_CODE)).val(fn_comma(costList[i].COST_AMT));
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
                }
            }
        }
    },

    eatCheck(e){
        if(e.value >= 30000 && $(e).closest("td").find("input[name=corpYn]").val() == "N"){
            alert("개인카드 식비는 3만원 이상 입력이 불가능합니다.");
            e.value = 0;
            bustripExnpReq.horizontalSum();
        }
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
            hrBizReqId : key,
            empSeq : $("#regEmpSeq").val(),
            status : p
        }

        var result = customKendo.fn_customAjax("/bustrip/setReqCert", data);

        if(result.flag){
            opener.gridReload();
            window.close();
        }

    },
}