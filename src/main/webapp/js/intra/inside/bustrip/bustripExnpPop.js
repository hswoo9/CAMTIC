const bustripExnpReq = {
    global: {
        costData: "",
        bustripInfo: {},
        flag : false
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
            });
            $(".oilCost").attr('disabled', false);
            $(".corpYn").kendoDropDownList({
                dataSource : corpArr,
                dataTextField: "text",
                dataValueField: "value"
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

        let exnpTraf = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpTraf",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(exnpTraf.length > 0){
            var html = "";
            for(let i=0; i<exnpTraf.length; i++){
                let row = exnpTraf[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpTrafDiv").html(html);
        }

        let exnpTrafDay = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpTrafDay",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(exnpTrafDay.length > 0){
            var html = "";
            for(let i=0; i<exnpTrafDay.length; i++){
                let row = exnpTrafDay[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpTrafDayDiv").html(html);
        }

        let exnpToll = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpToll",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(exnpToll.length > 0){
            var html = "";
            for(let i=0; i<exnpToll.length; i++){
                let row = exnpToll[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpTollDiv").html(html);
        }

        let exnpEat = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpEat",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(exnpEat.length > 0){
            var html = "";
            for(let i=0; i<exnpEat.length; i++){
                let row = exnpEat[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpEatDiv").html(html);
        }

        let exnpParking = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpParking",
            hrBizReqResultId: hrBizReqResultId
        }).list;
        if(exnpParking.length > 0){
            var html = "";
            for(let i=0; i<exnpParking.length; i++){
                let row = exnpParking[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpParkingDiv").html(html);
        }

        let exnpEtc = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpEtc",
            hrBizReqResultId: hrBizReqResultId
        }).list;

        if(exnpEtc.length > 0){
            var html = "";
            for(let i=0; i<exnpEtc.length; i++){
                let row = exnpEtc[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpEtcDiv").html(html);
        }
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


        const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", data);
        const cardList = cardResult.list;

        for(let i=0; i<cardList.length; i++){
            const cardMap = cardList[i];

            var data = {
                cardNo : cardMap.CARD_NO,
                authDate : cardMap.AUTH_DD,
                authNo : cardMap.AUTH_NO,
                authTime : cardMap.AUTH_HH,
                buySts : cardMap.BUY_STS
            }

            const iBrenchResult = customKendo.fn_customAjax("/cam_mng/companyCard/useCardDetail", data);
            const e = iBrenchResult.cardInfo;

            if(e != null){
                let html = '';
                html += '<tr class="cardData">';
                index ++;
                html += '    <input type="hidden" class="cardNo" value="'+e.CARD_NO+'" />';
                html += '    <input type="hidden" class="authDate" value="'+e.AUTH_DD+'" />';
                html += '    <input type="hidden" class="authNum" value="'+e.AUTH_NO+'" />';
                html += '    <input type="hidden" class="authTime" value="'+e.AUTH_HH+'" />';
                html += '    <input type="hidden" class="buySts" value="'+e.BUY_STS+'" />';
                html += '    <input type="hidden" class="fileNo" value="'+e.FILE_NO+'" />';

                html += '    <td style="text-align: center"><input type="checkbox" name="card" style="position: relative; top: 2px"/></td>';
                html += '    <td>'+e.AUTH_DD.substring(0, 4) + '-' + e.AUTH_DD.substring(4, 6) + '-' + e.AUTH_DD.substring(6, 8)+'</td>';
                html += '    <td>'+e.AUTH_NO+'</td>';
                html += '    <td>'+e.MER_NM+'</td>';
                html += '    <td>'+e.MER_BIZNO.substring(0, 3) + '-' + e.MER_BIZNO.substring(3, 5) + '-' + e.MER_BIZNO.substring(5, 11)+'</td>';
                html += '    <td>'+(e.TR_NM == undefined ? "" : e.TR_NM)+'</td>';
                html += '    <td>'+e.CARD_NO.substring(0,4) + '-' + e.CARD_NO.substring(4,8) + '-' + e.CARD_NO.substring(8,12) + '-' + e.CARD_NO.substring(12,16)+'</td>';
                html += '    <td style="text-align: right">'+fn_numberWithCommas(e.AUTH_AMT)+'</td>';
                html += '</tr>';
                $("#detailRow").append(html);
            }
        }
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
                    if(bustripInfo.TRIP_CODE == "3") {
                        if(bustripInfo.USE_TRSPT == "0"){
                            for(let j=0; j<costList.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "1"){
                                    $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costList[j].COST_AMT));
                                }
                            }
                        }

                        if(bustripInfo.USE_TRSPT == "10" && String(bustripInfo.DRIVER_EMP_SEQ) == String(dayCostArr[i].empSeq)){
                            for(let j=0; j<costList.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "2"){
                                    $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costList[j].COST_AMT));
                                }
                            }
                        }

                        if(bustripInfo.USE_TRSPT == "10" && String(bustripInfo.DRIVER_EMP_SEQ) != String(dayCostArr[i].empSeq)){
                            for(let j=0; j<costList.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "3"){
                                    $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costList[j].COST_AMT));
                                }
                            }
                        }

                        if(bustripInfo.USE_TRSPT != "0" && bustripInfo.USE_TRSPT != "10"){
                            for(let j=0; j<costList.length; j++){
                                if(costList[j].TRIP_CODE == "3" && costList[j].EXNP_CODE == "dayCost" && costList[j].EXNP_DETAIL_CODE == "4"){
                                    $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costList[j].COST_AMT));
                                }
                            }
                        }
                        
                    /** 시내출장 여비추가 n km이상일때 일비 지급*/
                    }else if(bustripInfo.TRIP_CODE == "1" && (bustripInfo.USE_TRSPT == "10" || bustripInfo.USE_TRSPT == "0")){
                        for(let j=0; j<costList.length; j++){
                            if(costList[j].TRIP_CODE == "1" && costList[j].EXNP_CODE == "dayCost" && bustripInfo.MOVE_DST >= costList[j].EXNP_DETAIL_CODE){
                                $("#dayCost"+dayCostArr[i].empSeq).val(fn_comma(costList[j].COST_AMT));
                            }
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

    fn_eatCostCheck : function (){
        bustripExnpReq.global.flag =  false;
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
        var bustripNum = tripNum;                        // 출장인원
        var eatCostTotal = bustripDays * bustripNum * 30000;    // 식비 한도

        if(Number($("#eatTotalCost").val().toString().toMoney2()) > Number(eatCostTotal)){
            bustripExnpReq.global.flag = true;
        }

        if(bustripExnpReq.global.flag){
            alert("사용 가능한 식비를 초과하였습니다.\n(식비 한도: 출장인원수 x 출장일수 x 30,000)")
            return;
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

        if($(':focus').hasClass('eatCost')){
            bustripExnpReq.fn_eatCostCheck();
        }
    },

    fn_saveBtn: function(id, type, mode){
        if(bustripExnpReq.global.flag){
            alert("사용 가능한 식비를 초과하였습니다.\n(식비 한도: 출장인원수 x 출장일수 x 30,000)");
            return;
        }

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

        /** Ibrench 선택 내역 저장 */
        var parameters = {
            hrBizReqResultId : hrBizReqResultId
        }
        let cardArr = [];
        $.each($(".cardData"), function(i, v){
            const cardData = {};
            const cardNo = $(v).find('.cardNo').val();
            const authDate = $(v).find('.authDate').val();
            const authNum = $(v).find('.authNum').val();
            const authTime = $(v).find('.authTime').val();
            const buySts = $(v).find('.buySts').val();
            const fileNo = $(v).find('.fileNo').val();

            cardData.cardNo = cardNo;
            cardData.authDate = authDate;
            cardData.authNum = authNum;
            cardData.authTime = authTime;
            cardData.buySts = buySts;

            cardArr.push(cardData);
        });

        if(cardArr.length != 0){
            parameters.cardArr = JSON.stringify(cardArr);
        }
        customKendo.fn_customAjax("/bustrip/setCardHist", parameters);

        /** 첨부파일 저장 프로세스 */

        /** 교통비 파일 */
        if($("#exnpTraf")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpTraf");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<$("#exnpTraf")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpTraf")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 교통일비 파일 */
        if($("#exnpTrafDay")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpTrafDay");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<$("#exnpTrafDay")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpTrafDay")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 통행료 파일 */
        if($("#exnpToll")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpToll");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<$("#exnpToll")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpToll")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 식비 파일 */
        if($("#exnpEat")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpEat");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<$("#exnpEat")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpEat")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 주차비 파일 */
        if($("#exnpParking")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpParking");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<$("#exnpParking")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpParking")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 주차비 파일 */
        if($("#exnpEtc")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpEtc");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<$("#exnpEtc")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpEtc")[0].files[i]);
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
            opener.gridReload();
            window.close();
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

    fn_paymentCardHistory : function (){
        var url = "/mng/pop/paymentCardHistory.do?type=3&index=2&reqType=bustrip";

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },

    fn_ardHistoryDel : function(){
        if($("input[name='card']:checked").length == 0){
            alert("삭제할 카드내역을 선택해주세요."); return;
        }

        $.each($("input[name='card']:checked"), function(){
            alert("저장을 해야 반영됩니다.");
            $(this).closest("tr").remove();
        });
    }
}