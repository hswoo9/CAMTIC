var busInit = {

    bustripInit: function(hrBizReqId){
        const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: hrBizReqId
        });
        const busInfo = result.rs.rs;

        //요청일
        hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
        hwpDocCtrl.putFieldText('toDate', fn_getNowDate(1));

        let tripCode = busInfo.TRIP_CODE;
        let tripCodeText = "";
        if (tripCode == 1) {
            tripCodeText = "도내(시내)";
        }else if (tripCode == 2) {
            tripCodeText = "도내(시외)";
        }else if (tripCode == 3) {
            tripCodeText = "도외";
        }else if (tripCode == 4) {
            tripCodeText = "해외";
        }
        hwpDocCtrl.global.HwpCtrl.MoveToField('tripCode', true, true, false);
        hwpDocCtrl.putFieldText('tripCode', tripCodeText);

        let tripDate = busInfo.TRIP_DAY_FR.split("-")[0]+"년"+busInfo.TRIP_DAY_FR.split("-")[1]+"월"+busInfo.TRIP_DAY_FR.split("-")[2]+"일 "+busInfo.TRIP_TIME_FR
            +" ~ "
            +busInfo.TRIP_DAY_TO.split("-")[0]+"년"+busInfo.TRIP_DAY_TO.split("-")[1]+"월"+busInfo.TRIP_DAY_TO.split("-")[2]+"일 "+busInfo.TRIP_TIME_TO;
        hwpDocCtrl.global.HwpCtrl.MoveToField('tripDate', true, true, false);
        hwpDocCtrl.putFieldText('tripDate', tripDate);


        let visit = busInfo.VISIT_CRM + ", "+ busInfo.VISIT_LOC;
        if(busInfo.VISIT_LOC_SUB != ""){
            visit = busInfo.VISIT_CRM + ", " + busInfo.VISIT_LOC_SUB+" / "+busInfo.VISIT_LOC;
        }
        hwpDocCtrl.global.HwpCtrl.MoveToField('visit', true, true, false);
        hwpDocCtrl.putFieldText('visit', visit);



        let carText = "";
        const carList = busInfo.USE_TRSPT;
        if (carList == 1) {
            carText = "카니발";
        }else if (carList == 5) {
            carText = "아반떼";
        }else if (carList == 3) {
            carText = "트럭";
        }else if (carList == 10) {
            carText = "자가";
        }else if (carList == 0) {
            carText = "대중교통";
        }else if (carList == 12) {
            carText = "모하비";
        }else if (carList == 13) {
            carText = "솔라티";
        }else if (carList == 14) {
            carText = "드론관제차량";
        }else if (carList == 11) {
            carText = "기타";
        }
        let car = carText;
        hwpDocCtrl.global.HwpCtrl.MoveToField('car', true, true, false);
        hwpDocCtrl.putFieldText('car', car);

        hwpDocCtrl.global.HwpCtrl.MoveToField('empName', true, true, false);
        hwpDocCtrl.putFieldText('empName', busInfo.EMP_NAME);

        hwpDocCtrl.global.HwpCtrl.MoveToField('dept', true, true, false);
        hwpDocCtrl.putFieldText('dept', busInfo.DEPT_NAME+" "+busInfo.TEAM_NAME);

        hwpDocCtrl.global.HwpCtrl.MoveToField('position', true, true, false);
        hwpDocCtrl.putFieldText('position', busInfo.POSITION_NAME);

        hwpDocCtrl.global.HwpCtrl.MoveToField('title', true, true, false);
        hwpDocCtrl.putFieldText('title', busInfo.TITLE);

        let regSign = busInfo.EMP_NAME+" (인)";
        hwpDocCtrl.global.HwpCtrl.MoveToField('regSign', true, true, false);
        hwpDocCtrl.putFieldText('regSign', regSign);
    },

    bustripResInit: function(hrBizReqResultId){
        const result = customKendo.fn_customAjax("/bustrip/getBustripOne", { hrBizReqResultId: hrBizReqResultId });
        const busInfo = result.map;

        const exnpList = customKendo.fn_customAjax("/inside/getBustripExnpInfo", { hrBizReqResultId: hrBizReqResultId }).list;

        //요청일
        hwpDocCtrl.putFieldText('toDate', fn_getNowDate(1));

        let tripCode = busInfo.TRIP_CODE;
        let tripCodeText = "";
        if (tripCode == 1) {
            tripCodeText = "도내(시내)";
        }else if (tripCode == 2) {
            tripCodeText = "도내(시외)";
        }else if (tripCode == 3) {
            tripCodeText = "도외";
        }else if (tripCode == 4) {
            tripCodeText = "해외";
        }
        hwpDocCtrl.putFieldText('tripCode', tripCodeText);

        let tripDate = busInfo.TRIP_DAY_FR.split("-")[0]+"년"+busInfo.TRIP_DAY_FR.split("-")[1]+"월"+busInfo.TRIP_DAY_FR.split("-")[2]+"일 "+busInfo.TRIP_TIME_FR
            +" ~ "
            +busInfo.TRIP_DAY_TO.split("-")[0]+"년"+busInfo.TRIP_DAY_TO.split("-")[1]+"월"+busInfo.TRIP_DAY_TO.split("-")[2]+"일 "+busInfo.TRIP_TIME_TO;
        hwpDocCtrl.putFieldText('tripDate', tripDate);

        let visit = busInfo.VISIT_CRM + ", "+ busInfo.VISIT_LOC;
        if(busInfo.VISIT_LOC_SUB != ""){
            visit = busInfo.VISIT_CRM + ", " + busInfo.VISIT_LOC_SUB+" / "+busInfo.VISIT_LOC;
        }
        hwpDocCtrl.putFieldText('visit', visit);

        let carText = "";
        const carList = busInfo.USE_TRSPT;
        if (carList == 1) {
            carText = "카니발";
        }else if (carList == 5) {
            carText = "아반떼";
        }else if (carList == 3) {
            carText = "트럭";
        }else if (carList == 10) {
            carText = "자가";
        }else if (carList == 0) {
            carText = "대중교통";
        }else if (carList == 12) {
            carText = "모하비";
        }else if (carList == 13) {
            carText = "솔라티";
        }else if (carList == 14) {
            carText = "드론관제차량";
        }else if (carList == 11) {
            carText = "기타";
        }
        let car = carText;
        hwpDocCtrl.putFieldText('car', car);

        hwpDocCtrl.putFieldText('empName', busInfo.EMP_NAME);

        hwpDocCtrl.putFieldText('dept', busInfo.DEPT_NAME+" "+busInfo.TEAM_NAME);

        hwpDocCtrl.putFieldText('position', busInfo.POSITION_NAME);

        hwpDocCtrl.putFieldText('title', busInfo.TITLE);

        let regSign = busInfo.EMP_NAME+" (인)";
        hwpDocCtrl.putFieldText('regSign', regSign);

        let htmlData = '';
        if(busInfo.TRIP_CODE != "4"){
            htmlData = busInit.htmlBusExnp(exnpList);
        }else{
            const bfExnpList = customKendo.fn_customAjax("/inside/getBusinessExnpInfo", { hrBizReqId: busInfo.HR_BIZ_REQ_ID }).list;
            htmlData = busInit.htmlBusiExnp(bfExnpList, exnpList);
        }

        hwpDocCtrl.moveToField('exnpTable', true, true, false);
        hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
    },

    htmlBusExnp: function(list){
        //총합
        let oilCostTotal = 0;
        let trafCostTotal = 0;
        let tollCostTotal = 0;
        let dayCostTotal = 0;
        let eatCostTotal = 0;
        let parkingCostTotal = 0;
        let etcCostTotal = 0;

        let finalTotal = 0;

        var html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">이름</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">유류비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">교통비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">통행료</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">일비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">식비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">주차비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">기타</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px"><p style="font-weight: bold;">합계</p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            if(list[i].EMP_SEQ != null && list[i].DIVISION == 1){
                let personTot = 0;

                oilCostTotal += Number(list[i].OIL_COST.replace(",", ""));
                trafCostTotal += Number(list[i].TRAF_COST.replace(",", ""));
                tollCostTotal += Number(list[i].TOLL_COST.replace(",", ""));
                dayCostTotal += Number(list[i].DAY_COST.replace(",", ""));
                eatCostTotal += Number(list[i].EAT_COST.replace(",", ""));
                parkingCostTotal += Number(list[i].PARKING_COST.replace(",", ""));
                etcCostTotal += Number(list[i].ETC_COST.replace(",", ""));

                html += '   <tr>';
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].EMP_NAME+'</p></td>';

                personTot += Number(list[i].OIL_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].OIL_COST+'</p></td>';

                personTot += Number(list[i].TRAF_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].TRAF_COST+'</p></td>';

                personTot += Number(list[i].TOLL_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].TOLL_COST+'</p></td>';

                personTot += Number(list[i].DAY_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].DAY_COST+'</p></td>';

                personTot += Number(list[i].EAT_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].EAT_COST+'</p></td>';

                personTot += Number(list[i].PARKING_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].PARKING_COST+'</p></td>';

                personTot += Number(list[i].ETC_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].ETC_COST+'</p></td>';

                html += '       <td style="height:25px;text-align:center;"><p>'+fn_numberWithCommas(personTot)+'</p></td>';
                html += '   </tr>';

            }else if(list[i].DIVISION == 2){
                oilCostTotal += Number(list[i].OIL_COST.replace(",", ""));
                trafCostTotal += Number(list[i].TRAF_COST.replace(",", ""));
                tollCostTotal += Number(list[i].TOLL_COST.replace(",", ""));
                dayCostTotal += Number(list[i].DAY_COST.replace(",", ""));
                eatCostTotal += Number(list[i].EAT_COST.replace(",", ""));
                parkingCostTotal += Number(list[i].PARKING_COST.replace(",", ""));
                etcCostTotal += Number(list[i].ETC_COST.replace(",", ""));

                html += '                   <tr>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">법인카드</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].OIL_COST ? list[i].OIL_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].TRAF_COST ? list[i].TRAF_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].TOLL_COST ? list[i].TOLL_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].DAY_COST ? list[i].DAY_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].EAT_COST ? list[i].EAT_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].PARKING_COST ? list[i].PARKING_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].ETC_COST ? list[i].ETC_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ list[i].TOT_COST +'</p></td>';
                html += '                   </tr>';
            }else if(list[i].DIVISION == 3){
                oilCostTotal += Number(list[i].OIL_COST.replace(",", ""));
                tollCostTotal += Number(list[i].TOLL_COST.replace(",", ""));

                html += '                   <tr>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">법인차량</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ list[i].OIL_COST +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ list[i].TOLL_COST +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ list[i].TOT_COST +'</p></td>';
                html += '                   </tr>';
            }

            finalTotal += Number(list[i].TOT_COST.replace(",", ""));
        }
        
        html += '                   <tr>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">합계</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(oilCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(trafCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(tollCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(dayCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(eatCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(parkingCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(etcCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(finalTotal)+'</p></td>';
        html += '                   </tr>';
        html += '               </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlBusiExnp: function(bfList, list){
        let bf_oilCostTotal = 0;
        let bf_trafCostTotal = 0;
        let bf_trafDayTotal = 0;
        let bf_tollCostTotal = 0;
        let bf_dayCostTotal = 0;
        let bf_eatCostTotal = 0;
        let bf_parkingCostTotal = 0;
        let bf_etcCostTotal = 0;
        let bf_totalCostTotal = 0;

        let bf_oilCorpCostTotal = 0;
        let bf_trafCorpCostTotal = 0;
        let bf_trafDayCorpotal = 0;
        let bf_tollCorpCostTotal = 0;
        let bf_dayCorpCostTotal = 0;
        let bf_eatCorpCostTotal = 0;
        let bf_parkingCorpCostTotal = 0;
        let bf_etcCorpCostTotal = 0;
        let bf_totalCorpCostTotal = 0;

        let oilCostTotal = 0;
        let trafCostTotal = 0;
        let trafDayTotal = 0;
        let tollCostTotal = 0;
        let dayCostTotal = 0;
        let eatCostTotal = 0;
        let parkingCostTotal = 0;
        let etcCostTotal = 0;
        let totalCostTotal = 0;

        let oilCorpCostTotal = 0;
        let trafCorpCostTotal = 0;
        let trafDayCorpotal = 0;
        let tollCorpCostTotal = 0;
        let dayCorpCostTotal = 0;
        let eatCorpCostTotal = 0;
        let parkingCorpCostTotal = 0;
        let etcCorpCostTotal = 0;
        let totalCorpCostTotal = 0;

        var html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 57px"><p style="font-weight: bold; font-size: 11px">구분</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 58px"><p style="font-weight: bold; font-size: 11px">이름</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 57px"><p style="font-weight: bold; font-size: 11px">항공료</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 58px"><p style="font-weight: bold; font-size: 11px">교통비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 57px"><p style="font-weight: bold; font-size: 11px">숙박비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 58px"><p style="font-weight: bold; font-size: 11px">비자발급비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 57px"><p style="font-weight: bold; font-size: 11px">일비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 58px"><p style="font-weight: bold; font-size: 11px">식비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 57px"><p style="font-weight: bold; font-size: 11px">보험료</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 58px"><p style="font-weight: bold; font-size: 11px">기타</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 57px"><p style="font-weight: bold; font-size: 11px">합계</p></td>';
        html += '               </tr>';

        for(let i=0; i<bfList.length; i++){
            if(bfList[i].EMP_SEQ == null){
                continue;
            }
            const map = bfList[i];
            console.log("map");
            console.log(map);
            let personTot = 0;

            bf_oilCostTotal += Number(map.OIL_COST.replace(",", ""));
            bf_trafCostTotal += Number(map.TRAF_COST.replace(",", ""));
            bf_trafDayTotal += Number(map.TRAF_DAY_COST.replace(",", ""));
            bf_tollCostTotal += Number(map.TOLL_COST.replace(",", ""));
            bf_dayCostTotal += Number(map.DAY_COST.replace(",", ""));
            bf_eatCostTotal += Number(map.EAT_COST.replace(",", ""));
            bf_parkingCostTotal += Number(map.PARKING_COST.replace(",", ""));
            bf_etcCostTotal += Number(map.ETC_COST.replace(",", ""));

            html += '   <tr>';
            if(i==0){
                html += '       <td rowspan="'+(list.length+1)+'" style="height:25px;background-color:#FFE0E0; text-align:center; width: 57px"><p style="font-weight: bold; font-size: 11px">사전정산</p></td>';
            }
            html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.EMP_NAME+'</p></td>';

            if(map.OIL_CORP_YN != "Y"){
                personTot += Number(map.OIL_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.OIL_COST+'</p></td>';
            }else{
                bf_oilCorpCostTotal += Number(map.OIL_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';
            }

            if(map.TRAF_CORP_YN != "Y"){
                personTot += Number(map.TRAF_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.TRAF_COST+'</p></td>';
            }else{
                bf_trafCorpCostTotal += Number(map.TRAF_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';
            }

            if(map.TRAF_DAY_CORP_YN != "Y"){
                personTot += Number(map.TRAF_DAY_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.TRAF_DAY_COST+'</p></td>';
            }else{
                bf_trafDayCorpotal += Number(map.TRAF_DAY_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';
            }

            if(map.TOLL_CORP_YN != "Y"){
                personTot += Number(map.TOLL_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.TOLL_COST+'</p></td>';
            }else{
                bf_tollCorpCostTotal += Number(map.TOLL_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';
            }

            bf_dayCorpCostTotal += Number(map.DAY_COST.replace(",", ""));
            html += '       <td style="height:25px;text-align:center;"><p><p style="font-size: 11px">0</p></p></td>';

            if(map.EAT_CORP_YN != "Y"){
                personTot += Number(map.EAT_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.EAT_COST+'</p></td>';
            }else{
                bf_eatCorpCostTotal += Number(map.EAT_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';
            }

            if(map.PARKING_CORP_YN != "Y"){
                personTot += Number(map.PARKING_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.PARKING_COST+'</p></td>';
            }else{
                bf_parkingCorpCostTotal += Number(map.PARKING_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';
            }

            if(map.ETC_CORP_YN != "Y"){
                personTot += Number(map.ETC_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.ETC_COST+'</p></td>';
            }else{
                bf_etcCorpCostTotal += Number(map.ETC_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.ETC_COST+'</p></td>';
            }

            html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+fn_comma(personTot)+'</p></td>';
            bf_totalCostTotal += Number(personTot);
            html += '   </tr>';
        }
        html += '                   <tr>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">법인</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_oilCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_trafCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_trafDayCorpotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_tollCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_dayCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_eatCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_parkingCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_etcCorpCostTotal)+'</p></td>';
        bf_totalCorpCostTotal = bf_oilCorpCostTotal+bf_trafCorpCostTotal+bf_trafDayCorpotal+bf_tollCorpCostTotal+bf_dayCorpCostTotal+bf_eatCorpCostTotal+bf_parkingCorpCostTotal+bf_etcCorpCostTotal+bf_etcCorpCostTotal;
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_totalCorpCostTotal)+'</p></td>';
        bf_totalCostTotal += Number(bf_totalCorpCostTotal);
        html += '                   </tr>';

        html += '                   <tr>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">합계</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_oilCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_trafCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_trafDayTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_tollCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_dayCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_eatCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_parkingCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_etcCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_totalCostTotal)+'</p></td>';
        html += '                   </tr>';

        for(let i=0; i<list.length; i++){
            if(list[i].EMP_SEQ == null){
                continue;
            }
            const map = list[i];
            console.log("map");
            console.log(map);
            let personTot = 0;

            oilCostTotal += Number(map.OIL_COST.replace(",", ""));
            trafCostTotal += Number(map.TRAF_COST.replace(",", ""));
            trafDayTotal += Number(map.TRAF_DAY_COST.replace(",", ""));
            tollCostTotal += Number(map.TOLL_COST.replace(",", ""));
            dayCostTotal += Number(map.DAY_COST.replace(",", ""));
            eatCostTotal += Number(map.EAT_COST.replace(",", ""));
            parkingCostTotal += Number(map.PARKING_COST.replace(",", ""));
            etcCostTotal += Number(map.ETC_COST.replace(",", ""));

            html += '   <tr>';
            if(i==0){
                html += '       <td rowspan="'+(list.length+1)+'" style="height:25px;background-color:#FFE0E0; text-align:center; width: 57px"><p style="font-weight: bold; font-size: 11px">사후정산</p></td>';
            }
            html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.EMP_NAME+'</p></td>';

            html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';

            if(map.TRAF_CORP_YN != "Y"){
                personTot += Number(map.TRAF_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.TRAF_COST+'</p></td>';
            }else{
                trafCorpCostTotal += Number(map.TRAF_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';
            }

            if(map.TRAF_DAY_CORP_YN != "Y"){
                personTot += Number(map.TRAF_DAY_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.TRAF_DAY_COST+'</p></td>';
            }else{
                trafDayCorpotal += Number(map.TRAF_DAY_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';
            }

            html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';

            html += '       <td style="height:25px;text-align:center;"><p><p style="font-size: 11px">0</p></p></td>';

            html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';

            html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">0</p></td>';

            if(map.ETC_CORP_YN != "Y"){
                personTot += Number(map.ETC_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.ETC_COST+'</p></td>';
            }else{
                etcCorpCostTotal += Number(map.ETC_COST.replace(",", ""));
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.ETC_COST+'</p></td>';
            }

            html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+fn_comma(personTot)+'</p></td>';
            totalCostTotal += Number(personTot);
            html += '   </tr>';
        }
        html += '                   <tr>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">법인</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(oilCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(trafCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(trafDayCorpotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(tollCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(dayCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(eatCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(parkingCorpCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(etcCorpCostTotal)+'</p></td>';
        totalCorpCostTotal = oilCorpCostTotal+trafCorpCostTotal+trafDayCorpotal+tollCorpCostTotal+dayCorpCostTotal+eatCorpCostTotal+parkingCorpCostTotal+etcCorpCostTotal+etcCorpCostTotal;
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(totalCorpCostTotal)+'</p></td>';
        totalCostTotal += Number(totalCorpCostTotal);
        html += '                   </tr>';

        html += '                   <tr>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">합계</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(oilCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(trafCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(trafDayTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(tollCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(dayCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(eatCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(parkingCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(etcCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(totalCostTotal)+'</p></td>';
        html += '                   </tr>';
        html += '                   <tr>';
        html += '                       <td style="height:25px; background-color:#FFE0E0;  text-align:center;"><p style="font-weight: bold; font-size: 11px">총 합계</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">총 합계</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_oilCostTotal + oilCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_trafCostTotal + trafCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_trafDayTotal + trafDayTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_tollCostTotal + tollCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_dayCostTotal + dayCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_eatCostTotal + eatCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_parkingCostTotal + parkingCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_etcCostTotal + etcCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(bf_totalCostTotal + totalCostTotal)+'</p></td>';
        html += '                   </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}