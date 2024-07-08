var bustripExnpReq = {
    global: {
        costData: "",
        bustripInfo: {},
        flag : false,
        exnpTrafFile : [],
        exnpRoomFile : [],
        exnpTollFile : [],
        exnpEatFile : [],
        exnpParkingFile : [],
        exnpEtcFile : [],

        exnpTrafBsFile : [],
        exnpRoomBsFile : [],
        exnpEatBsFile : [],
        exnpParkingBsFile : [],
        exnpEtcBsFile : [],
        exnpTollBsFile : [],

        corpCarTollFile : [],
        corpCarTollBsFile : [],

        maxEatCost : 0, // 식비 한도액
        ingEatCost : 0, // 현재 입력된 식비 총액
    },

    init: function(type){
        bustripExnpReq.pageSet(type);
        bustripExnpReq.dataSet(type);

        $(".corpCarInput").on("change", function(){
            bustripExnpReq.fn_setCorpCarTotal();
        });

    },

    pageSet: function(type){
        window.resizeTo(1700, 900);
        bustripExnpReq.global.costData = $(".oilCost, .trafCost, .roomCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost, #corpCarTollCost, .corpInput, .extCost");
        let corpArr = [
            {text: "개인", value: "N"},
            {text: "법인", value: "Y"}
        ]
        if($("#mod").val() == "mng"){
            $(".empName, .oilCost, .trafCost, .roomCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost, .corpInput, .corpCarInput, .extCost").kendoTextBox({});
            $(".oilCost").attr('disabled', false);
            $(".corpYn").kendoDropDownList({
                dataSource : corpArr,
                dataTextField: "text",
                dataValueField: "value"
            });
        }else {
            $(".empName, .oilCost, .trafCost, .roomCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost, .corpInput, .corpCarInput, .extCost").kendoTextBox();
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

        bustripExnpReq.global.exnpTrafBsFile = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpTraf",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(bustripExnpReq.global.exnpTrafBsFile.length > 0){
            var html = "";
            for(let i=0; i<bustripExnpReq.global.exnpTrafBsFile.length; i++){
                let row = bustripExnpReq.global.exnpTrafBsFile[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this, \'exnpTraf\')">X</span>'
                html += "</div>";
            }
            $("#exnpTrafDiv").html(html);
        }

        bustripExnpReq.global.exnpRoomBsFile = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpRoom",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(bustripExnpReq.global.exnpRoomBsFile.length > 0){
            var html = "";
            for(let i=0; i<bustripExnpReq.global.exnpRoomBsFile.length; i++){
                let row = bustripExnpReq.global.exnpRoomBsFile[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this, \'exnpRoom\')">X</span>'
                html += "</div>";
            }
            $("#exnpRoomDiv").html(html);
        }

        bustripExnpReq.global.exnpTollBsFile = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpToll",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(bustripExnpReq.global.exnpTollBsFile.length > 0){
            var html = "";
            for(let i=0; i<bustripExnpReq.global.exnpTollBsFile.length; i++){
                let row = bustripExnpReq.global.exnpTollBsFile[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this, \'exnpToll\')">X</span>'
                html += "</div>";
            }
            $("#exnpTollDiv").html(html);
        }

        bustripExnpReq.global.exnpEatBsFile = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpEat",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if( bustripExnpReq.global.exnpEatBsFile.length > 0){
            var html = "";
            for(let i=0; i< bustripExnpReq.global.exnpEatBsFile.length; i++){
                let row =  bustripExnpReq.global.exnpEatBsFile[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this, \'exnpEat\')">X</span>'
                html += "</div>";
            }
            $("#exnpEatDiv").html(html);
        }

        bustripExnpReq.global.exnpParkingBsFile = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpParking",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(bustripExnpReq.global.exnpParkingBsFile.length > 0){
            var html = "";
            for(let i=0; i<bustripExnpReq.global.exnpParkingBsFile.length; i++){
                let row = bustripExnpReq.global.exnpParkingBsFile[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this, \'exnpParking\')">X</span>'
                html += "</div>";
            }
            $("#exnpParkingDiv").html(html);
        }

        bustripExnpReq.global.exnpEtcBsFile = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpEtc",
            hrBizReqResultId: hrBizReqResultId
        }).list;

        if(bustripExnpReq.global.exnpEtcBsFile.length > 0){
            var html = "";
            for(let i=0; i<bustripExnpReq.global.exnpEtcBsFile.length; i++){
                let row = bustripExnpReq.global.exnpEtcBsFile[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this, \'exnpEtc\')">X</span>'
                html += "</div>";
            }
            $("#exnpEtcDiv").html(html);
        }

        bustripExnpReq.global.corpCarTollBsFile = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "corpCarToll",
            hrBizReqResultId: hrBizReqResultId
        }).list;

        if(bustripExnpReq.global.corpCarTollBsFile.length > 0){
            var html = "";
            for(let i=0; i<bustripExnpReq.global.corpCarTollBsFile.length; i++){
                let row = bustripExnpReq.global.corpCarTollBsFile[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this, \'corpCarToll\')">X</span>'
                html += "</div>";
            }
            $("#corpCarTollDiv").html(html);
        }

        $("#exnpTraf").change(function(){
            bustripExnpReq.fn_fileSet("exnpTrafDiv");
        });

        $("#exnpRoom").change(function(){
            bustripExnpReq.fn_fileSet("exnpRoomDiv");
        });

        $("#exnpToll").change(function(){
            bustripExnpReq.fn_fileSet("exnpTollDiv");
        });

        $("#exnpEat").change(function(){
            bustripExnpReq.fn_fileSet("exnpEatDiv");
        });

        $("#exnpParking").change(function(){
            bustripExnpReq.fn_fileSet("exnpParkingDiv");
        });

        $("#exnpEtc").change(function(){
            bustripExnpReq.fn_fileSet("exnpEtcDiv");
        });

        $("#corpCarToll").change(function(){
            bustripExnpReq.fn_fileSet("corpCarTollDiv");
        });
    },

    dataSet: function(type){
        console.log("dataSet")
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

        const corpResilt = customKendo.fn_customAjax("/inside/getBustripExnpInfo", data);
        const corpList = corpResilt.list;
        for(let i=0; i<corpList.length; i++){
            const corpMap = corpList[i];
            $(".corpHrBizExnpId").val(corpMap.HR_BIZ_EXNP_ID);
        }

        const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", data);
        const cardList = cardResult.list;

        let corpMoney = 0;

        var selCorpType = {
            1 : '유류비',
            2 : '교통비',
            3 : '숙박비',
            4 : '통행료',
            5 : '일비',
            6 : '식비',
            7 : '주차비',
            8 : '기타'
        }

        let html = '';
        for(let i=0; i<cardList.length; i++){
            const cardMap = cardList[i];

            var data = {
                cardNo : cardMap.CARD_NO,
                authDate : cardMap.AUTH_DD,
                authNo : cardMap.AUTH_NO,
                authTime : cardMap.AUTH_HH,
                buySts : cardMap.BUY_STS,
                hrBizReqResultId : hrBizReqResultId
            }

            const iBrenchResult = customKendo.fn_customAjax("/cam_mng/companyCard/useCardDetail", data);
            const e = iBrenchResult.cardInfo;

            if(e != null){
                html += '<tr class="cardData">';
                index ++;
                html += '    <input type="hidden" class="exnpType" value="'+cardMap.EXNP_TYPE+'" />';
                html += '    <input type="hidden" class="cardNo" value="'+e.CARD_NO+'" />';
                html += '    <input type="hidden" class="authDate" value="'+e.AUTH_DD+'" />';
                html += '    <input type="hidden" class="authNum" value="'+e.AUTH_NO+'" />';
                html += '    <input type="hidden" class="authTime" value="'+e.AUTH_HH+'" />';
                html += '    <input type="hidden" class="buySts" value="'+e.BUY_STS+'" />';
                html += '    <input type="hidden" class="fileNo" value="'+e.FILE_NO+'" />';

                html += '    <td style="text-align: center"><input type="checkbox" name="card" style="position: relative; top: 2px"/></td>';
                html += '    <td style="text-align: center">'+selCorpType[cardMap.EXNP_TYPE]+'</td>';
                html += '    <td>'+e.AUTH_DD.substring(0, 4) + '-' + e.AUTH_DD.substring(4, 6) + '-' + e.AUTH_DD.substring(6, 8)+'</td>';
                html += '    <td>'+e.AUTH_NO+'</td>';
                html += '    <td>'+e.MER_NM+'</td>';
                html += '    <td>'+e.MER_BIZNO.substring(0, 3) + '-' + e.MER_BIZNO.substring(3, 5) + '-' + e.MER_BIZNO.substring(5, 11)+'</td>';
                html += '    <td>'+(e.TR_NM == undefined ? "" : e.TR_NM)+'</td>';
                html += '    <td>'+e.CARD_NO.substring(0,4) + '-' + e.CARD_NO.substring(4,8) + '-' + e.CARD_NO.substring(8,12) + '-' + e.CARD_NO.substring(12,16)+'</td>';
                html += '    <td class="amt" style="text-align: right">'+fn_numberWithCommas(e.AUTH_AMT)+'</td>';
                html += '</tr>';
                corpMoney += Number(e.AUTH_AMT);

            }

        }

        $("#corpUseTotal").text(fn_numberWithCommas(corpMoney));
        $("#detailRow").append(html);
        corpTotalSet();

        bustripExnpReq.fn_getExnpInfo(type);
        bustripExnpReq.fn_getFuelInfo(type);

        bustripExnpReq.fn_setCorpCarTotal();
    },

    fn_getExnpInfo(type){
        let bustripInfo = bustripExnpReq.global.bustripInfo;
        let costList = customKendo.fn_customAjax("/bustrip/getBustripCostList", {
            hrBizReqResultId: hrBizReqResultId
        }).list;

        console.log("bustripInfo", bustripInfo);
        console.log("costList", costList);
        // if(type != "upd") {
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

            $.each($(".extData"), function(i, v){
                let dayCost = {};
                dayCost.empSeq = $(v).find('.empSeq').val();

                let dayCostResult = customKendo.fn_customAjax("/bustrip/getBustripMaxDayCost", {
                    empSeq: $(v).find('.empSeq').val(),
                    hrBizReqResultId: hrBizReqResultId
                });

                dayCost.dayCost = dayCostResult.data.DAY_COST;
                dayCostArr.push(dayCost);
            });

            console.log("dayCostArr", dayCostArr);

            for(let i=0; i<dayCostArr.length; i++){
                var costN = 0;
                if(dayCostArr[i].dayCost.replace(",", "") > 0 && false){
                    $("#dayCost"+String(dayCostArr[i].empSeq)).val(0);
                } else{
                    if(bustripInfo.TRIP_CODE == "3") {
                        /** 대중교통 */
                        if(bustripInfo.USE_TRSPT == "0"){
                            var costAmt = 0;
                            for(let j=0; j<costList.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "1"){
                                    costAmt = costList[j].COST_AMT;
                                }
                            }

                            for(let j=0; j<dayCostArr.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "1"){
                                    $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costAmt * bustripInfo.DIFDAY));
                                }
                            }
                        }

                        /** 자가(운행시) */
                        if(bustripInfo.USE_TRSPT == "10" && String(bustripInfo.DRIVER_EMP_SEQ) == String(dayCostArr[i].empSeq)){
                            var costAmt = 0;
                            for(let j=0; j<costList.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "2"){
                                    costAmt = costList[j].COST_AMT;
                                }
                            }

                            for(let j=0; j<dayCostArr.length; j++){
                                $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costAmt * bustripInfo.DIFDAY));
                            }
                        }

                        /** 자가(동행시) */
                        if(bustripInfo.USE_TRSPT == "10" && String(bustripInfo.DRIVER_EMP_SEQ) != String(dayCostArr[i].empSeq)){
                            var costAmt = 0;
                            for(let j=0; j<costList.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "3"){
                                    costAmt = costList[j].COST_AMT;
                                }
                            }

                            for(let j=0; j<dayCostArr.length; j++){
                                $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costAmt * bustripInfo.DIFDAY));
                            }
                        }

                        /** 법인차량 */
                        if(bustripInfo.USE_TRSPT != "0" && bustripInfo.USE_TRSPT != "10"){
                            var costAmt = 0;
                            for(let j=0; j<costList.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "4"){
                                    costAmt = costList[j].COST_AMT;
                                }
                            }

                            for(let j=0; j<dayCostArr.length; j++){
                                $("#dayCost"+dayCostArr[j].empSeq).val(fn_comma(costAmt * bustripInfo.DIFDAY));
                            }
                        }
                        
                    /** 시내출장 여비추가 n km이상일때 일비 지급*/
                    }else if(bustripInfo.TRIP_CODE == "1" && (bustripInfo.USE_TRSPT == "10" || bustripInfo.USE_TRSPT == "0")){
                        for(let j=0; j<dayCostArr.length; j++){
                            var costAmt = 0;
                            if(costList[j] != undefined){
                                costAmt = Number(costList[j].COST_AMT);
                            } else if (costList.length == 0) {
                                $("#dayCost"+dayCostArr[i].empSeq).val(0);
                            } else{
                                if(costList[j].TRIP_CODE == "1" && costList[j].EXNP_CODE == "dayCost" && bustripInfo.MOVE_DST >= costList[j].EXNP_DETAIL_CODE){
                                    $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costAmt * bustripInfo.DIFDAY));
                                }
                            }
                        }
                    } else if (bustripInfo.TRIP_CODE == "2") {
                        var costAmt = 0;
                        for(let j=0; j<dayCostArr.length; j++) {
                            if (costList[j] != undefined) {
                                costAmt = Number(costList[j].COST_AMT);
                            }
                        }
                        for(let j=0; j<dayCostArr.length; j++){
                            $("#dayCost"+dayCostArr[j].empSeq).val(fn_comma(costAmt * bustripInfo.DIFDAY));
                        }
                    } else {
                        for(let j=0; j<dayCostArr.length; j++){
                            $("#dayCost"+dayCostArr[j].empSeq).val(0);
                        }
                    }
                    /*if(bustripInfo.TRIP_CODE == "3" && (bustripInfo.USE_TRSPT == "0" || bustripInfo.DRIVER_EMP_SEQ == dayCostArr[i].empSeq)){

                        let amt = $("#dayCost"+String(dayCostArr[i].empSeq)).val().replace(",", "");
                        console.log("amt", amt)
                        // $("#dayCost"+String(dayCostArr[i].empSeq)).val(fn_comma(costList[costN].COST_AMT + (Number(amt)+10000)));
                        $("#dayCost"+String(dayCostArr[i].empSeq)).val(fn_comma(costList[costN].COST_AMT));
                        costN++;
                    }*/
                }
            }
        // }
    },

    fn_getFuelInfo: function(type){
        console.log("fn_getFuelInfo");
        // if(type != "upd") {
            let bustripInfo = bustripExnpReq.global.bustripInfo;
            var empSeq = bustripInfo.DRIVER_EMP_SEQ;

            const params = {
                empSeq: empSeq,
                endDt: bustripInfo.TRIP_DAY_TO
            }
            if(bustripInfo != null && bustripInfo.PJT_SN != null){
                params.pjtSn = bustripInfo.PJT_SN;
            }else{
                params.pjtSn = "0";
            }

            const costInfo = customKendo.fn_customAjax("/bustrip/getBustripFuelCostInfo", params).data;

            console.log("costInfo", costInfo);
            console.log("bustripInfo", bustripInfo);

            let realDis = Math.round(Number(bustripInfo.MOVE_DST) /10) * 10;
            let codeDis = Number(costInfo.DISTANCE);
            let ceil = Math.ceil(realDis/codeDis);
            let amt = ceil * Number(costInfo.COST_AMT);

            $(".oilCost").val(0);

            //도내(시내) 자가 + 10km 이상일 때 유류비 10,000원 고정
            if(bustripInfo.TRIP_CODE == 1 && bustripInfo.USE_TRSPT == 10){
                if(bustripInfo.MOVE_DST >= 10){
                    $("#oilCost"+String(empSeq)).val(fn_comma(10000));
                }
            }else if(bustripInfo.TRIP_CODE == 1 && bustripInfo.USE_TRSPT != 10){ //도내(시내) 자가X + 10km 이상일 때 유류비 10,000원 고정
                // if(bustripInfo.MOVE_DST >= 10) {
                //     $("#corpCarOilCost").val(fn_comma(10000));
                // }

                if(bustripInfo.USE_TRSPT != 0 || bustripInfo.USE_TRSPT != 10){
                    $("#corpCarOilCost").val(fn_comma(0));
                }
            }else{
                if(bustripInfo.USE_TRSPT == 10){
                    $("#oilCost"+String(empSeq)).val(fn_comma(amt));
                }else if(bustripInfo.USE_TRSPT != 10){
                    $("#corpCarOilCost").val(fn_comma(amt));
                }
            }
        // }
        bustripExnpReq.fn_setTableSum();
    },

    fn_eatCheck(e){
        if(e.value > 30000 && $(e).closest("td").find("input[name=corpYn]").val() == "N"){
            alert("개인카드 식비는 3만원 초과 입력이 불가능합니다.");
            e.value = 0;
            bustripExnpReq.fn_setTableSum();
        }
    },

    fn_eatCostCheck : function (){
        // bustripExnpReq.global.flag =  false;
        var frDate = new Date(tripDayFr);
        var toDate = new Date(tripDayTo);

        var diffDays = Math.abs((toDate.getTime() - frDate.getTime()) / (1000*60*60*24));   // 밀리세컨 * 초 * 분 * 시 = 일
        var weekends = 0;

        for(var i=0; i < diffDays; i++){
            var currentDate = new Date(frDate.getTime() + i * (1000*3600*24));

            if(currentDate.getDay() === 0 || currentDate.getDay() === 6){
                weekends++;
            }
        }

        var bustripDays = diffDays - weekends + 1;      // 주말제외한 출장일수
        var bustripNum = $(".addData").length;           // 출장인원
        var extNum = $(".extData").length;               // 외부인원
        var maxEatCost = Number(bustripDays * (bustripNum + extNum) * 30000);    // 식비 한도
        bustripExnpReq.global.maxEatCost = maxEatCost;

        var sum = 0;

        sum += Number(uncomma($("#corp6").val()));

        $("span > .eatCost").each(function(){
            const eatCost = Number(uncomma(this.value));
            console.log("eatCost", eatCost);
            console.log("maxEatCost", maxEatCost);
            sum += Number(uncomma(this.value));
            console.log("sum ", sum);

            bustripExnpReq.global.ingEatCost = sum;
            if(sum > maxEatCost){
                this.value = comma(Number(uncomma(this.value) - (sum - maxEatCost)));
                // bustripExnpReq.global.flag = true;
                bustripExnpReq.fn_setTableSum();
                return false;
            }
        })
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

            if(i != rowList.length-2){
                for (var j = 1; j < tdsNum - 1; j++) {
                    totalCostArr[j] += parseInt($(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
                    totalCost += parseInt($(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
                }
            }else{
                var totalAmt = 0;
                $(".cardData").each(function(k, v){
                    const exnpType = $(v).find('.exnpType').val();
                    totalCostArr[exnpType] += Number($(v).find('.amt').text().replace(/,/g, ''));
                    totalAmt += Number($(v).find('.amt').text().replace(/,/g, ''));
                    console.log("k = " + k + ", " + Number($(v).find('.amt').text().replace(/,/g, '')));
                });
                totalCost += totalAmt;
            }

            if(totalCost != 0){
                $(row.cells[tdsNum - 1]).find("input[type=text]").val(fn_comma(totalCost));
            } else {
                $(row.cells[tdsNum - 1]).find("input[type=text]").val(0);
            }
            totalTotalCost += totalCost;
        }

        //세로합계
        var oilTotal = 0;
        var trafTotal = 0;
        var roomTotal = 0;
        var tollTotal = 0;
        var dayTotal = 0;
        var eatTotal = 0;
        var parkingTotal = 0;
        var etcTotal = 0;
        var totalTotal = 0;

        // 개인
        $(".addData").each(function () {
            var row = this;
            if (row.classList.value == 'addData') {
                oilTotal += Number($(row.cells[1]).find("input[type=text]").val().replace(/,/g, ''));
                trafTotal += Number($(row.cells[2]).find("input[type=text]").val().replace(/,/g, ''));
                roomTotal += Number($(row.cells[3]).find("input[type=text]").val().replace(/,/g, ''));
                tollTotal += Number($(row.cells[4]).find("input[type=text]").val().replace(/,/g, ''));
                dayTotal += Number($(row.cells[5]).find("input[type=text]").val().replace(/,/g, ''));
                eatTotal += Number($(row.cells[6]).find("input[type=text]").val().replace(/,/g, ''));
                parkingTotal += Number($(row.cells[7]).find("input[type=text]").val().replace(/,/g, ''));
                etcTotal += Number($(row.cells[8]).find("input[type=text]").val().replace(/,/g, ''));
                totalTotal += Number($(row.cells[9]).find("input[type=text]").val().replace(/,/g, ''));
            }
        });

        // 외부인력
        $(".extData").each(function () {
            var row = this;
            if (row.classList.value == 'extData') {
                oilTotal += Number($(row.cells[1]).find("input[type=text]").val().replace(/,/g, ''));
                trafTotal += Number($(row.cells[2]).find("input[type=text]").val().replace(/,/g, ''));
                roomTotal += Number($(row.cells[3]).find("input[type=text]").val().replace(/,/g, ''));
                tollTotal += Number($(row.cells[4]).find("input[type=text]").val().replace(/,/g, ''));
                dayTotal += Number($(row.cells[5]).find("input[type=text]").val().replace(/,/g, ''));
                eatTotal += Number($(row.cells[6]).find("input[type=text]").val().replace(/,/g, ''));
                parkingTotal += Number($(row.cells[7]).find("input[type=text]").val().replace(/,/g, ''));
                etcTotal += Number($(row.cells[8]).find("input[type=text]").val().replace(/,/g, ''));
                totalTotal += Number($(row.cells[9]).find("input[type=text]").val().replace(/,/g, ''));
            }
        });

        //법인카드 더하기
        oilTotal += Number(uncomma($("#corp1").val()));
        trafTotal += Number(uncomma($("#corp2").val()));
        roomTotal += Number(uncomma($("#corp3").val()));
        tollTotal += Number(uncomma($("#corp4").val()));
        dayTotal += Number(uncomma($("#corp5").val()));
        eatTotal += Number(uncomma($("#corp6").val()));
        parkingTotal += Number(uncomma($("#corp7").val()));
        etcTotal += Number(uncomma($("#corp8").val()));

        //법인차량 더하기
        tollTotal += Number(uncomma($("#corpCarTollCost").val()));
        oilTotal += Number(uncomma($("#corpCarOilCost").val()));

        $("#oilTotalCost").val(comma(oilTotal));
        $("#trafTotalCost").val(comma(trafTotal));
        $("#roomTotalCost").val(comma(roomTotal));
        $("#tollTotalCost").val(comma(tollTotal));
        $("#dayTotalCost").val(comma(dayTotal));
        $("#eatTotalCost").val(comma(eatTotal));
        $("#parkingTotalCost").val(comma(parkingTotal));
        $("#etcTotalCost").val(comma(etcTotal));

        if ($(':focus').hasClass('eatCost')) {
            bustripExnpReq.fn_eatCostCheck();
        }

        corpTotalSet();
        bustripExnpReq.fn_setCorpCarTotal();

        //합계의 총합은 마지막
        totalTotal += Number(uncomma($("#corpTotal").val()));
        totalTotal += Number(uncomma($("#corpCarTotalCost").val()));
        $("#totalTotalCost").val(comma(totalTotal));

    },

    loading : function(){
        $.LoadingOverlay("show", {
            background: "rgba(0, 0, 0, 0.5)",
            image: "",
            maxSize: 60,
            fontawesome: "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor: "#FFFFFF",
        });
    },

    fn_save: function(id, type, mode){
        bustripExnpReq.loading();
        setTimeout(() => bustripExnpReq.fn_saveBtn(id, type, mode), 200);
    },

    fn_saveBtn: function(id, type, mode){

        var returnFlag = true;
        // if(bustripExnpReq.global.flag){
        //     alert("사용 가능한 식비를 초과하였습니다.\n(식비 한도: 출장인원수 x 출장일수 x 30,000)");
        //     return;
        // }

        var bustExnpTb = document.getElementById('bustExnpTb');
        var rowList = bustExnpTb.rows;

        var result = "";
        for(var i = 1 ; i < rowList.length-1 ; i++) {
            var row = rowList[i];
            var data = {};

            let oilCk = "N";
            if(bustripExnpReq.global.bustripInfo.USE_TRSPT != "0" && bustripExnpReq.global.bustripInfo.USE_TRSPT != "10" ){
                oilCk = "Y";
            }

            // 개인
            if(row.classList.value == 'addData'){
                data = {
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizExnpId : hrBizExnpId,
                    empName : $(row.cells[0]).find("input[type=text]").val(),
                    empSeq : $(row.cells[0]).find("input[name='empSeq']").val(),
                    oilCost : $(row.cells[1]).find("input[type=text]").val(),
                    trafCost : $(row.cells[2]).find("input[type=text]").val(),
                    roomCost : $(row.cells[3]).find("input[type=text]").val(),
                    tollCost : $(row.cells[4]).find("input[type=text]").val(),
                    dayCost : $(row.cells[5]).find("input[type=text]").val(),
                    eatCost : $(row.cells[6]).find("input[type=text]").val(),
                    parkingCost : $(row.cells[7]).find("input[type=text]").val(),
                    etcCost : $(row.cells[8]).find("input[type=text]").val(),
                    totCost : $(row.cells[9]).find("input[type=text]").val(),

                    oilCorpYn : oilCk,
                    type : type,
                    division : '1'
                };

                var returnFlag = bustripExnpReq.fn_exnpAttachCheck(data);
                if(!returnFlag[0]){
                    alert(returnFlag[1]);
                    break;
                }
            }
        }
        if(!returnFlag[0]){
            $.LoadingOverlay("hide", {});
            return false;
        }

        for(var i = 1 ; i < rowList.length-1 ; i++){
            var row = rowList[i];
            // if(i == 1) {
                var hrBizExnpId = $(row.cells[0]).find("input[name='hrBizExnpId']").val();
            // }

            var data = {};

            let oilCk = "N";
            if(bustripExnpReq.global.bustripInfo.USE_TRSPT != "0" && bustripExnpReq.global.bustripInfo.USE_TRSPT != "10" ){
                oilCk = "Y";
            }

            // 개인
            if(row.classList.value == 'addData'){
                data = {
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizExnpId : hrBizExnpId,
                    empName : $(row.cells[0]).find("input[type=text]").val(),
                    empSeq : $(row.cells[0]).find("input[name='empSeq']").val(),
                    oilCost : $(row.cells[1]).find("input[type=text]").val(),
                    trafCost : $(row.cells[2]).find("input[type=text]").val(),
                    roomCost : $(row.cells[3]).find("input[type=text]").val(),
                    tollCost : $(row.cells[4]).find("input[type=text]").val(),
                    dayCost : $(row.cells[5]).find("input[type=text]").val(),
                    eatCost : $(row.cells[6]).find("input[type=text]").val(),
                    parkingCost : $(row.cells[7]).find("input[type=text]").val(),
                    etcCost : $(row.cells[8]).find("input[type=text]").val(),
                    totCost : $(row.cells[9]).find("input[type=text]").val(),

                    oilCorpYn : oilCk,
                    type : type,
                    division : '1'
                };
            }

            // 외부인원
            if(row.classList.value == 'extData'){
                data = {
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizExnpId : hrBizExnpId,
                    empName : $(row.cells[0]).find("input[type=text]").val(),
                    empSeq : $(row.cells[0]).find("input[name='empSeq']").val(),
                    oilCost : $(row.cells[1]).find("input[type=text]").val(),
                    trafCost : $(row.cells[2]).find("input[type=text]").val(),
                    roomCost : $(row.cells[3]).find("input[type=text]").val(),
                    tollCost : $(row.cells[4]).find("input[type=text]").val(),
                    dayCost : $(row.cells[5]).find("input[type=text]").val(),
                    eatCost : $(row.cells[6]).find("input[type=text]").val(),
                    parkingCost : $(row.cells[7]).find("input[type=text]").val(),
                    etcCost : $(row.cells[8]).find("input[type=text]").val(),
                    totCost : $(row.cells[9]).find("input[type=text]").val(),

                    type : type,
                    division : '5'
                };
            }

            // 법인카드
            if(row.classList.value == 'corpData'){
                var totalOilCost = $("#corp1").val();
                var totalTrafCost = $("#corp2").val();
                var totalRoomCost = $("#corp3").val();
                var totalTollCost = $("#corp4").val();
                var totalDayCost = $("#corp5").val();
                var totalEatCost = $("#corp6").val();
                var totalParkingCost = $("#corp7").val();
                var totalEtcCost = $("#corp8").val();
                var totalAmt = $("#corpTotal").val();

                data = {
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizExnpId : $("#corpExnpId").val(),
                    oilCost : totalOilCost || 0,
                    trafCost : totalTrafCost,
                    roomCost : totalRoomCost,
                    tollCost : totalTollCost,
                    dayCost : totalDayCost,
                    eatCost : totalEatCost,
                    parkingCost : totalParkingCost,
                    etcCost : totalEtcCost,
                    totCost : totalAmt,
                    type : type,
                    division : '2'
                };
            }

            // 법인차량
            if(row.classList.value == 'corpCarData'){
                data = {
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizExnpId : $("#corpCarExnpId").val(),
                    oilCost : $("#corpCarOilCost").val(),
                    trafCost : $("#corpCarTrafCost").val(),
                    roomCost : $("#corpCarRoomCost").val(),
                    tollCost : $("#corpCarTollCost").val(),
                    dayCost : $("#corpCarDayCost").val(),
                    eatCost : $("#corpCarEatCost").val(),
                    parkingCost : $("#corpCarParkingCost").val(),
                    etcCost : $("#corpCarEtcCost").val(),
                    totCost : $("#corpCarTotalCost").val(),
                    type : type,
                    division : '3'
                };
            }


            result = customKendo.fn_customAjax("/bustrip/saveBustripExnpPop", data);
        }

        /** Ibrench 선택 내역 저장 */
        var parameters = {
            hrBizReqResultId : hrBizReqResultId
        }
        let cardArr = [];
        $.each($(".cardData"), function(i, v){
            const cardData = {};
            const exnpType = $(v).find('.exnpType').val();
            const cardNo = $(v).find('.cardNo').val();
            const authDate = $(v).find('.authDate').val();
            const authNum = $(v).find('.authNum').val();
            const authTime = $(v).find('.authTime').val();
            const buySts = $(v).find('.buySts').val();
            const fileNo = $(v).find('.fileNo').val();

            cardData.exnpType = exnpType;
            cardData.cardNo = cardNo;
            cardData.authDate = authDate;
            cardData.authNum = authNum;
            cardData.authTime = authTime;
            cardData.buySts = buySts;
            cardData.fileNo = fileNo;

            cardArr.push(cardData);
        });

        if(cardArr.length != 0){
            parameters.cardArr = JSON.stringify(cardArr);
        }
        customKendo.fn_customAjax("/bustrip/setCardHist", parameters);

        /** 첨부파일 저장 프로세스 */
        /** 교통비 파일 */
        if(bustripExnpReq.global.exnpTrafFile.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpTraf");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<bustripExnpReq.global.exnpTrafFile.length; i++){
                formData.append("bustripFile", bustripExnpReq.global.exnpTrafFile[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 숙박비 파일 */
        if(bustripExnpReq.global.exnpRoomFile.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpRoom");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<bustripExnpReq.global.exnpRoomFile.length; i++){
                formData.append("bustripFile", bustripExnpReq.global.exnpRoomFile[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 통행료 파일 */
        if(bustripExnpReq.global.exnpTollFile.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpToll");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i< bustripExnpReq.global.exnpTollFile.length; i++){
                formData.append("bustripFile", bustripExnpReq.global.exnpTollFile[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 식비 파일 */
        if(bustripExnpReq.global.exnpEatFile.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpEat");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<bustripExnpReq.global.exnpEatFile.length; i++){
                formData.append("bustripFile", bustripExnpReq.global.exnpEatFile[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 주차비 파일 */
        if(bustripExnpReq.global.exnpParkingFile.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpParking");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<bustripExnpReq.global.exnpParkingFile.length; i++){
                formData.append("bustripFile", bustripExnpReq.global.exnpParkingFile[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 기타 파일 */
        if(bustripExnpReq.global.exnpEtcFile.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpEtc");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<bustripExnpReq.global.exnpEtcFile.length; i++){
                formData.append("bustripFile", bustripExnpReq.global.exnpEtcFile[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 법인카드 통행료 파일 */
        if(bustripExnpReq.global.corpCarTollFile.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "corpCarToll");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<bustripExnpReq.global.corpCarTollFile.length; i++){
                formData.append("bustripFile", bustripExnpReq.global.corpCarTollFile[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        var data = {
            hrBizReqResultId : hrBizReqResultId,
            empSeq : $("#regEmpSeq").val(),
            status : 100
        }

        if(mode != null && mode == "mng"){
            alert("수정이 완료되었습니다.");
            opener.window.location.reload();
            window.close();
        }else{
            var result = customKendo.fn_customAjax("/bustrip/setReqCert", data);
            alert("저장이 완료되었습니다.");
            // opener.gridReload();
            if(window.opener.bustList){
                window.opener.bustList.gridReload();
            }
            if(window.opener.bustInfo){
                window.opener.bustInfo.bustripMainGrid();
            }
            window.close();
        }

        window.close();
        opener.bustripResList.popBustripRes(hrBizReqResultId,hrBizReqId,$("#tripType").val());
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

    },

    fn_paymentCardHistory : function (inx, type){
        var url = "/mng/pop/paymentCardHistory.do?type=3&index=2&reqType=bustrip&corpType=" + type + "&exnpType="+inx;

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no";
        var popup = window.open(url, name, option);
    },

    fn_ardHistoryDel : function(){
        if($("input[name='card']:checked").length == 0){
            alert("삭제할 카드내역을 선택해주세요."); return;
        }

        var total = Number($("#corpUseTotal").text().replace(/,/g, ''));
        $.each($("input[name='card']:checked"), function(){
            alert("저장을 해야 반영됩니다.");

            var rowAmount = parseFloat($(this).closest("tr").find(".amt").text().replace(/,/g, ''));
            total -= rowAmount;

            $(this).closest("tr").remove();

            var rowExnpType = $(this).closest("tr").find(".exnpType").val();
            var corpInputValue = Number(uncomma($("#corp" + rowExnpType).val()));

            if(corpInputValue > 0){
                $("#corp" + rowExnpType).val(fn_numberWithCommas(corpInputValue - rowAmount));
            }else{
                $("#corp" + rowExnpType).val(0);
            }

            for(var i = 0; i < bustrip.global.corpCardList.length; i++){
                if(bustrip.global.corpCardList[i].CARD_NO == $(this).closest("tr").find(".cardNo").val() &&
                    bustrip.global.corpCardList[i].AUTH_DD == $(this).closest("tr").find(".authDate").val() &&
                    bustrip.global.corpCardList[i].AUTH_HH == $(this).closest("tr").find(".authTime").val() &&
                    bustrip.global.corpCardList[i].AUTH_NO == $(this).closest("tr").find(".authNum").val() &&
                    bustrip.global.corpCardList[i].BUY_STS == $(this).closest("tr").find(".buySts").val() &&
                    bustrip.global.corpCardList[i].AUTH_AMT == uncomma($(this).closest("tr").find(".amt").text())
                ){
                    bustrip.global.corpCardList.splice(i, 1);
                    break;
                }
            }
        });

        corpTotalSet();

        bustripExnpReq.fn_setTableSum();

        $("#corpUseTotal").text(fn_numberWithCommas(total));
    },

    fn_setCorpCarTotal : function (){
        var total = 0;
        var corpCarOil = $("#corpCarOilCost").val();
        var corpCarToll = $("#corpCarTollCost").val();

        total = Number(uncomma(corpCarOil)) + Number(uncomma(corpCarToll));

        $("#corpCarTollCost").val(comma(corpCarToll));
        $("#corpCarTotalCost").val(comma(total));
    },

    fn_exnpAttachCheck : function (e){
        var type = $("#type").val();
        var data = e;
        var empName = data.empName;

        var arr = ["trafCost", "roomCost", "tollCost", "eatCost", "parkingCost", "etcCost"];
        var idArr = ["Traf", "Room", "Toll", "Eat", "Parking", "Etc"];

        var map = {
            trafCost : "교통비",
            roomCost : "숙박비",
            tollCost : "통행료",
            eatCost : "식비",
            parkingCost : "주차비",
            etcCost : "기타"
        }

        if(type == 'ins'){ //신규
            var flag = true;

            for(let i=0; i<arr.length; i++){
                if(data[arr[i]] != '0'){
                    if($("#exnp"+idArr[i])[0].files.length == 0){
                        if(idArr[i] == "Traf"){
                            if(bustripExnpReq.global.exnpTrafFile.length == 0){
                                flag = false;
                            }
                        } else if(idArr[i] == "Room"){
                            if(bustripExnpReq.global.exnpRoomFile.length == 0){
                                flag = false;
                            }
                        } else if(idArr[i] == "Toll"){
                            if(bustripExnpReq.global.exnpTollFile.length == 0){
                                flag = false;
                            }
                        } else if(idArr[i] == "Eat"){
                            if(bustripExnpReq.global.exnpEatFile.length == 0){
                                flag = false;
                            }
                        } else if(idArr[i] == "Parking"){
                            if(bustripExnpReq.global.exnpParkingFile.length == 0){
                                flag = false;
                            }
                        } else if(idArr[i] == "Etc"){
                            if(bustripExnpReq.global.exnpEtcFile.length == 0){
                                flag = false;
                            }
                        }

                        if(!flag){
                            return [false, "["+empName+"] "+map[arr[i]]+" 지출증빙 첨부파일을\n확인해주세요."];
                        }
                    }
                }
            }

            if($("#corpCarTollCost").val() != 0){
                if($("#corpCarToll")[0].files.length == 0){
                    if(bustripExnpReq.global.corpCarTollFile.length == 0){
                        flag = false;
                    }

                    if(!flag){
                        return [false, "법인차량 지출증빙 첨부파일을\n확인해주세요."];
                    }
                }

            }

            return [true, ""];
        }else if(type == 'upd'){ // 수정
            var flag = true;

            for(let i=0; i<arr.length; i++){
                if(data[arr[i]] != '0'){
                    if($("#exnp"+idArr[i]+"Div div:visible").length == 0){
                        if($("#exnp"+idArr[i])[0].files.length == 0){
                            if(idArr[i] == "Traf"){
                                if(bustripExnpReq.global.exnpTrafFile.length == 0){
                                    flag = false;
                                }
                            } else if(idArr[i] == "Room"){
                                if(bustripExnpReq.global.exnpRoomFile.length == 0){
                                    flag = false;
                                }
                            } else if(idArr[i] == "Toll"){
                                if(bustripExnpReq.global.exnpTollFile.length == 0){
                                    flag = false;
                                }
                            } else if(idArr[i] == "Eat"){
                                if(bustripExnpReq.global.exnpEatFile.length == 0){
                                    flag = false;
                                }
                            } else if(idArr[i] == "Parking"){
                                if(bustripExnpReq.global.exnpParkingFile.length == 0){
                                    flag = false;
                                }
                            } else if(idArr[i] == "Etc"){
                                if(bustripExnpReq.global.exnpEtcFile.length == 0){
                                    flag = false;
                                }
                            }

                            if(!flag){
                                return [false, "["+empName+"] "+map[arr[i]]+" 지출증빙 첨부파일을\n확인해주세요."];
                            }
                        }
                    }
                }
            }

            if($("#corpCarTollCost").val() != 0){
                if($("#corpCarTollDiv div:visible").length == 0){
                    if($("#corpCarToll")[0].files.length == 0){
                        if(bustripExnpReq.global.corpCarTollFile.length == 0){
                            flag = false;
                        }

                        if(!flag){
                            return [false, "법인차량 지출증빙 첨부파일을\n확인해주세요."];
                        }
                    }
                }
            }

            return [true, ""];
        }
    },

    personalExnpFormDown : function (){
        var protocol = window.location.protocol + "//";
        var locationHost = protocol + window.location.host;

        var filePath = "/upload/templateForm/personalExnpForm.hwp";

        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent('개인여비지출증빙.hwp'),
        });
    },

    fn_fileSet: function(e){
        if(e == "exnpTrafDiv"){
            for(let i=0; i<$("#exnpTraf")[0].files.length; i++){
                var fileInfo = {};
                let file = $("#exnpTraf")[0].files[i];
                fileInfo.name = file.name;
                fileInfo.size = file.size;

                bustripExnpReq.global.exnpTrafFile.push($("#exnpTraf")[0].files[i]);
            }

            if(bustripExnpReq.global.exnpTrafBsFile.length > 0){
                var html = "";
                for(let i=0; i<bustripExnpReq.global.exnpTrafBsFile.length; i++){
                    let row = bustripExnpReq.global.exnpTrafBsFile[i];
                    html += "<div>";
                    html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                    html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this)">X</span>'
                    html += "</div>";
                }
                $("#" + e).html(html);
            } else {
                $("#" + e).html("");
            }

            for(let i=0; i < bustripExnpReq.global.exnpTrafFile.length; i++){
                var file = bustripExnpReq.global.exnpTrafFile[i];
                var html = "";
                html += "<div id='exnpTrafDiv"+i+"'>";
                html += '   <span>'+file.name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fn_fileDel(\''+i+'\', \'exnpTrafDiv\', \''+file.name+'\')">X</span>'
                html += "</div>";
                $("#" + e).append(html);
            }

            $("#exnpTraf").val("");

        } else if(e == "exnpRoomDiv"){
            for(let i=0; i<$("#exnpRoom")[0].files.length; i++){
                var fileInfo = {};
                let file = $("#exnpRoom")[0].files[i];
                fileInfo.name = file.name;
                fileInfo.size = file.size;

                bustripExnpReq.global.exnpRoomFile.push($("#exnpRoom")[0].files[i]);
            }

            if(bustripExnpReq.global.exnpRoomBsFile.length > 0){
                var html = "";
                for(let i=0; i<bustripExnpReq.global.exnpRoomBsFile.length; i++){
                    let row = bustripExnpReq.global.exnpRoomBsFile[i];
                    html += "<div>";
                    html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                    html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this)">X</span>'
                    html += "</div>";
                }
                $("#" + e).html(html);
            } else {
                $("#" + e).html("");
            }

            for(let i=0; i < bustripExnpReq.global.exnpRoomFile.length; i++){
                var file = bustripExnpReq.global.exnpRoomFile[i];
                var html = "";
                html += "<div id='exnpRoomDiv"+i+"'>";
                html += '   <span>'+file.name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fn_fileDel(\''+i+'\', \'exnpRoomDiv\', \''+file.name+'\')">X</span>'
                html += "</div>";
                $("#" + e).append(html);
            }

            $("#exnpRoom").val("");
        } else if(e == "exnpTollDiv"){
            for(let i=0; i<$("#exnpToll")[0].files.length; i++){
                var fileInfo = {};
                let file = $("#exnpToll")[0].files[i];
                fileInfo.name = file.name;
                fileInfo.size = file.size;

                bustripExnpReq.global.exnpTollFile.push($("#exnpToll")[0].files[i]);
            }

            if(bustripExnpReq.global.exnpTollBsFile.length > 0){
                var html = "";
                for(let i=0; i<bustripExnpReq.global.exnpTollBsFile.length; i++){
                    let row = bustripExnpReq.global.exnpTollBsFile[i];
                    html += "<div>";
                    html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                    html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this)">X</span>'
                    html += "</div>";
                }
                $("#" + e).html(html);
            } else {
                $("#" + e).html("");
            }

            for(let i=0; i < bustripExnpReq.global.exnpTollFile.length; i++){
                var file = bustripExnpReq.global.exnpTollFile[i];
                var html = "";
                html += "<div id='exnpTollDiv"+i+"'>";
                html += '   <span>'+file.name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fn_fileDel(\''+i+'\', \'exnpTollDiv\', \''+file.name+'\')">X</span>'
                html += "</div>";
                $("#" + e).append(html);
            }

            $("#exnpToll").val("");
        } else if(e == "exnpEatDiv"){
            for(let i=0; i<$("#exnpEat")[0].files.length; i++){
                var fileInfo = {};
                let file = $("#exnpEat")[0].files[i];
                fileInfo.name = file.name;
                fileInfo.size = file.size;

                bustripExnpReq.global.exnpEatFile.push($("#exnpEat")[0].files[i]);
            }

            if(bustripExnpReq.global.exnpEatBsFile.length > 0){
                var html = "";
                for(let i=0; i<bustripExnpReq.global.exnpEatBsFile.length; i++){
                    let row = bustripExnpReq.global.exnpEatBsFile[i];
                    html += "<div>";
                    html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                    html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this)">X</span>'
                    html += "</div>";
                }
                $("#" + e).html(html);
            } else {
                $("#" + e).html("");
            }

            for(let i=0; i < bustripExnpReq.global.exnpEatFile.length; i++){
                var file = bustripExnpReq.global.exnpEatFile[i];
                var html = "";
                html += "<div id='exnpEatDiv"+i+"'>";
                html += '   <span>'+file.name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fn_fileDel(\''+i+'\', \'exnpEatDiv\', \''+file.name+'\')">X</span>'
                html += "</div>";
                $("#" + e).append(html);
            }

            $("#exnpEat").val("");
        } else if(e == "exnpParkingDiv"){
            for(let i=0; i<$("#exnpParking")[0].files.length; i++){
                var fileInfo = {};
                let file = $("#exnpParking")[0].files[i];
                fileInfo.name = file.name;
                fileInfo.size = file.size;

                bustripExnpReq.global.exnpParkingFile.push($("#exnpParking")[0].files[i]);
            }

            if(bustripExnpReq.global.exnpParkingBsFile.length > 0){
                var html = "";
                for(let i=0; i<bustripExnpReq.global.exnpParkingBsFile.length; i++){
                    let row = bustripExnpReq.global.exnpParkingBsFile[i];
                    html += "<div>";
                    html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                    html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this)">X</span>'
                    html += "</div>";
                }
                $("#" + e).html(html);
            } else {
                $("#" + e).html("");
            }

            for(let i=0; i < bustripExnpReq.global.exnpParkingFile.length; i++){
                var file = bustripExnpReq.global.exnpParkingFile[i];
                var html = "";
                html += "<div id='exnpParkingDiv"+i+"'>";
                html += '   <span>'+file.name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fn_fileDel(\''+i+'\', \'exnpParkingDiv\', \''+file.name+'\')">X</span>'
                html += "</div>";
                $("#" + e).append(html);
            }

            $("#exnpParking").val("");
        } else if(e == "exnpEtcDiv"){
            for(let i=0; i<$("#exnpEtc")[0].files.length; i++){
                var fileInfo = {};
                let file = $("#exnpEtc")[0].files[i];
                fileInfo.name = file.name;
                fileInfo.size = file.size;

                bustripExnpReq.global.exnpEtcFile.push($("#exnpEtc")[0].files[i]);
            }

            if(bustripExnpReq.global.exnpEtcBsFile.length > 0){
                var html = "";
                for(let i=0; i<bustripExnpReq.global.exnpEtcBsFile.length; i++){
                    let row = bustripExnpReq.global.exnpEtcBsFile[i];
                    html += "<div>";
                    html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                    html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this)">X</span>'
                    html += "</div>";
                }
                $("#" + e).html(html);
            } else {
                $("#" + e).html("");
            }

            for(let i=0; i < bustripExnpReq.global.exnpEtcFile.length; i++){
                var file = bustripExnpReq.global.exnpEtcFile[i];
                var html = "";
                html += "<div id='exnpEtcDiv"+i+"'>";
                html += '   <span>'+file.name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fn_fileDel(\''+i+'\', \'exnpEtcDiv\', \''+file.name+'\')">X</span>'
                html += "</div>";
                $("#" + e).append(html);
            }

            $("#exnpEtc").val("");
        } else if(e == "corpCarTollDiv"){
            for(let i=0; i<$("#corpCarToll")[0].files.length; i++){
                var fileInfo = {};
                let file = $("#corpCarToll")[0].files[i];
                fileInfo.name = file.name;
                fileInfo.size = file.size;

                bustripExnpReq.global.corpCarTollFile.push($("#corpCarToll")[0].files[i]);
            }

            if(bustripExnpReq.global.corpCarTollBsFile.length > 0){
                var html = "";
                for(let i=0; i<bustripExnpReq.global.corpCarTollBsFile.length; i++){
                    let row = bustripExnpReq.global.corpCarTollBsFile[i];
                    html += "<div>";
                    html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                    html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fileDel(\''+row.file_no+'\', this)">X</span>'
                    html += "</div>";
                }
                $("#" + e).html(html);
            } else {
                $("#" + e).html("");
            }

            for(let i=0; i < bustripExnpReq.global.corpCarTollFile.length; i++){
                var file = bustripExnpReq.global.corpCarTollFile[i];
                var html = "";
                html += "<div id='corpCarTollDiv"+i+"'>";
                html += '   <span>'+file.name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustripExnpReq.fn_fileDel(\''+i+'\', \'corpCarTollDiv\', \''+file.name+'\')">X</span>'
                html += "</div>";
                $("#" + e).append(html);
            }

            $("#corpCarToll").val("");
        }
    },

    fn_fileDel : function (idx, name, fileName){
        $("#" + name + idx).remove();

        bustripExnpReq.global.exnpTrafFile.forEach((item, index) => {
            if(item.name == fileName){
                bustripExnpReq.global.exnpTrafFile.splice(index, 1);
            }
        });

        bustripExnpReq.global.exnpRoomFile.forEach((item, index) => {
            if(item.name == fileName){
                bustripExnpReq.global.exnpRoomFile.splice(index, 1);
            }
        });

        bustripExnpReq.global.exnpTollFile.forEach((item, index) => {
            if(item.name == fileName){
                bustripExnpReq.global.exnpTollFile.splice(index, 1);
            }
        });

        bustripExnpReq.global.exnpEatFile.forEach((item, index) => {
            if(item.name == fileName){
                bustripExnpReq.global.exnpEatFile.splice(index, 1);
            }
        });

        bustripExnpReq.global.exnpParkingFile.forEach((item, index) => {
            if(item.name == fileName){
                bustripExnpReq.global.exnpParkingFile.splice(index, 1);
            }
        });

        bustripExnpReq.global.exnpEtcFile.forEach((item, index) => {
            if(item.name == fileName){
                bustripExnpReq.global.exnpEtcFile.splice(index, 1);
            }
        });

        bustripExnpReq.global.corpCarTollFile.forEach((item, index) => {
            if(item.name == fileName){
                bustripExnpReq.global.corpCarTollFile.splice(index, 1);
            }
        });
    },

    fileDel: function(e, v, type){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            $.ajax({
                url: "/common/commonFileDel",
                data: {
                    fileNo: e
                },
                type: "post",
                datatype: "json",
                success: function (rs) {
                    var rs = rs.rs;
                    alert(rs.message);
                    if(rs.code == "200"){
                        $(v).parent().hide();

                        if(type == "exnpTraf"){
                            bustripExnpReq.global.exnpTrafBsFile.forEach((item, index) => {
                                if(item.file_no == e){
                                    bustripExnpReq.global.exnpTrafBsFile.splice(index, 1);
                                }
                            });
                        } else if(type == "exnpRoom"){
                            bustripExnpReq.global.exnpRoomBsFile.forEach((item, index) => {
                                if(item.file_no == e){
                                    bustripExnpReq.global.exnpRoomBsFile.splice(index, 1);
                                }
                            });
                        } else if(type == "exnpTraf"){
                            bustripExnpReq.global.exnpTrafBsFile.forEach((item, index) => {
                                if(item.file_no == e){
                                    bustripExnpReq.global.exnpTrafBsFile.splice(index, 1);
                                }
                            });
                        } else if(type == "exnpEat"){
                            bustripExnpReq.global.exnpEatBsFile.forEach((item, index) => {
                                if(item.file_no == e){
                                    bustripExnpReq.global.exnpEatBsFile.splice(index, 1);
                                }
                            });
                        } else if(type == "exnpParking"){
                            bustripExnpReq.global.exnpParkingBsFile.forEach((item, index) => {
                                if(item.file_no == e){
                                    bustripExnpReq.global.exnpParkingBsFile.splice(index, 1);
                                }
                            });
                        } else if(type == "exnpEtc"){
                            bustripExnpReq.global.exnpEtcBsFile.forEach((item, index) => {
                                if(item.file_no == e){
                                    bustripExnpReq.global.exnpEtcBsFile.splice(index, 1);
                                }
                            });
                        } else if(type == "corpCarToll"){
                            bustripExnpReq.global.corpCarTollBsFile.forEach((item, index) => {
                                if(item.file_no == e){
                                    bustripExnpReq.global.corpCarTollBsFile.splice(index, 1);
                                }
                            });
                        }
                    }
                }
            });
        }
    },


}