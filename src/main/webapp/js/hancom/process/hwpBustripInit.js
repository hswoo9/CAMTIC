var busInit = {

    bustripInit: function(hrBizReqId){
        const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: hrBizReqId
        });
        const busInfo = result.rs.rs;

        const companionResult = customKendo.fn_customAjax("/bustrip/getBustripTotInfo", {
            hrBizReqId: hrBizReqId
        });
        const companionList = companionResult.list;
        const extList = result.rs.extData;

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

        let startDate = new Date(busInfo.TRIP_DAY_FR);
        let endDate = new Date(busInfo.TRIP_DAY_TO);

        let dayText = "";
        let diffInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        let weekends = 0;

        // 주말제외
        for(let i = 0; i < diffInDays; i++){
            if(startDate.getDay() == 0 || startDate.getDay() == 6){
                weekends++;
            }
            startDate.setDate(startDate.getDate() + 1);
        }

        diffInDays = diffInDays - weekends + 1;
        dayText = " (" + diffInDays + "일간)";

        let tripDate = busInfo.TRIP_DAY_FR.split("-")[0]+"년"+busInfo.TRIP_DAY_FR.split("-")[1]+"월"+busInfo.TRIP_DAY_FR.split("-")[2]+"일 "+busInfo.TRIP_TIME_FR
            +" ~ "
            +busInfo.TRIP_DAY_TO.split("-")[0]+"년"+busInfo.TRIP_DAY_TO.split("-")[1]+"월"+busInfo.TRIP_DAY_TO.split("-")[2]+"일 "+busInfo.TRIP_TIME_TO;

        tripDate += dayText;
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
            carText = "기타(" + busInfo.USE_TRSPT_RMK + ")";
        }
        let car = carText;

        hwpDocCtrl.putFieldText('car', car);
        hwpDocCtrl.putFieldText('empName', busInfo.EMP_NAME);
        hwpDocCtrl.putFieldText('dept', busInfo.DEPT_NAME+" "+busInfo.TEAM_NAME);
        hwpDocCtrl.putFieldText('position', busInfo.POSITION_NAME);
        hwpDocCtrl.putFieldText('title', busInfo.TITLE);
        hwpDocCtrl.putFieldText('pjtName', busInfo.BUSN_NAME);

        let regSign = busInfo.EMP_NAME;
        hwpDocCtrl.putFieldText('regSign', regSign)

        /** 2. 출장자 리스트 */
        hwpDocCtrl.putFieldText("COMPANION_HTML", " ");
        let htmlData = '';
        htmlData = busInit.htmlCompanion(companionList, extList);
        hwpDocCtrl.moveToField("COMPANION_HTML", true, true, false);
        hwpDocCtrl.setTextFile(htmlData, "html","insertfile");

        /** 3. 출장자 열람자 세팅 */
        draft.global.readersArr = [];
        $("#readerName").val();

        var readerEmpNameStr = "";

        for(var i = 0 ; i < companionList.length ; i++){
            var empSeq = companionList[i].EMP_SEQ;

            if(empSeq == $("#empSeq").val()){
                continue;
            }

            const userResult = getUser(empSeq);
            if(userResult != null){
                var tmpData = {
                    empSeq : $("#empSeq").val(),
                    seqType: "u",
                    readerEmpSeq: userResult.EMP_SEQ.toString(),
                    readerEmpName: userResult.EMP_NAME_KR,
                    readerDeptSeq: userResult.DEPT_SEQ,
                    readerDeptName: userResult.DEPT_NAME,
                    readerDutyCode: userResult.DUTY_CODE,
                    readerDutyName: userResult.DUTY_NAME,
                    readerPositionCode: userResult.POSITION_CODE,
                    readerPositionName: userResult.POSITION_NAME,
                    docId : ""
                };
                readerEmpNameStr += "," + tmpData.readerEmpName + "(" + fn_getSpot(tmpData.readerDutyName, tmpData.readerPositionName) + ")";


                draft.global.readersArr.push(tmpData);
            }

        }

        $("#readerName").val(readerEmpNameStr.substring(1));
    },

    bustripResInit: function(hrBizReqResultId, type){
        const result = customKendo.fn_customAjax("/bustrip/getBustripOne", { hrBizReqResultId: hrBizReqResultId });
        const busInfo = result.map;

        const companionResult = customKendo.fn_customAjax("/bustrip/getBustripResTotInfo", { hrBizReqResultId: hrBizReqResultId });
        const companionList = companionResult.list;

        const bustripResult = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {hrBizReqId: busInfo.HR_BIZ_REQ_ID});
        const extList = bustripResult.rs.extData;

        const exnpList = customKendo.fn_customAjax("/inside/getBustripExnpInfo", { hrBizReqResultId: hrBizReqResultId }).list;

        console.log("exnpList", exnpList);
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

        let startDate = new Date(busInfo.TRIP_DAY_FR);
        let endDate = new Date(busInfo.TRIP_DAY_TO);

        let dayText = "";
        let diffInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        let weekends = 0;

        // 주말제외
        for(let i = 0; i < diffInDays; i++){
            if(startDate.getDay() == 0 || startDate.getDay() == 6){
                weekends++;
            }
            startDate.setDate(startDate.getDate() + 1);
        }

        diffInDays = diffInDays - weekends + 1;
        dayText = " (" + diffInDays + "일간)";

        let tripDate = busInfo.TRIP_DAY_FR.split("-")[0]+"년"+busInfo.TRIP_DAY_FR.split("-")[1]+"월"+busInfo.TRIP_DAY_FR.split("-")[2]+"일 "+busInfo.TRIP_TIME_FR
            +" ~ "
            +busInfo.TRIP_DAY_TO.split("-")[0]+"년"+busInfo.TRIP_DAY_TO.split("-")[1]+"월"+busInfo.TRIP_DAY_TO.split("-")[2]+"일 "+busInfo.TRIP_TIME_TO;
        tripDate += dayText;
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
            carText = "기타(" + busInfo.USE_TRSPT_RMK + ")";
        }
        let car = carText + "(" + busInfo.MOVE_DST + "Km)";

        hwpDocCtrl.putFieldText('car', car);

        hwpDocCtrl.putFieldText('empName', busInfo.EMP_NAME);

        hwpDocCtrl.putFieldText('dept', busInfo.DEPT_NAME+" "+busInfo.TEAM_NAME);

        hwpDocCtrl.putFieldText('position', busInfo.POSITION_NAME);

        hwpDocCtrl.putFieldText('title', busInfo.RESULT);

        hwpDocCtrl.putFieldText('pjtName', busInfo.BUSN_NAME);

        let regSign = busInfo.EMP_NAME;
        hwpDocCtrl.putFieldText('regSign', regSign);

        /** 2. 출장자 리스트 */
        hwpDocCtrl.putFieldText("COMPANION_HTML", " ");
        let htmlData = '';
        htmlData = busInit.htmlCompanion(companionList, extList);
        hwpDocCtrl.moveToField("COMPANION_HTML", true, true, false);
        hwpDocCtrl.setTextFile(htmlData, "html","insertfile");

        /** 3. 여비 리스트 */
        let htmlData2 = '';
        if(busInfo.TRIP_CODE != "4"){
            htmlData2 = busInit.htmlBusExnp(exnpList);
        }else{
            const bfExnpList1 = customKendo.fn_customAjax("/bustrip/getBusinessOverExnpInfo", { hrBizReqId: busInfo.HR_BIZ_REQ_ID }).list;
            const bfExnpList2 = customKendo.fn_customAjax("/bustrip/getBusinessOverExnpInfo", { hrBizReqId: busInfo.HR_BIZ_REQ_ID, hrBizReqResultId: hrBizReqResultId }).list;
            htmlData2 = busInit.htmlBusiExnp(bfExnpList1, bfExnpList2);
        }

        setTimeout(function() {
            hwpDocCtrl.putFieldText("EXNP_TABLE", " ");
            hwpDocCtrl.moveToField("EXNP_TABLE", true, true, false);
            hwpDocCtrl.setTextFile(htmlData2, "html","insertfile");
        }, 2000);

        /** 4. 출장자 열람자 세팅 */
        draft.global.readersArr = [];
        $("#readerName").val();

        var readerEmpNameStr = "";

        for(var i = 0 ; i < companionList.length ; i++){
            var empSeq = companionList[i].EMP_SEQ;

            if(empSeq == $("#empSeq").val()){
                continue;
            }

            const userResult = getUser(empSeq);
            if(userResult != null){
                var tmpData = {
                    empSeq : $("#empSeq").val(),
                    seqType: "u",
                    readerEmpSeq: userResult.EMP_SEQ.toString(),
                    readerEmpName: userResult.EMP_NAME_KR,
                    readerDeptSeq: userResult.DEPT_SEQ,
                    readerDeptName: userResult.DEPT_NAME,
                    readerDutyCode: userResult.DUTY_CODE,
                    readerDutyName: userResult.DUTY_NAME,
                    readerPositionCode: userResult.POSITION_CODE,
                    readerPositionName: userResult.POSITION_NAME,
                    docId : ""
                };
                readerEmpNameStr += "," + tmpData.readerEmpName + "(" + fn_getSpot(tmpData.readerDutyName, tmpData.readerPositionName) + ")";


                draft.global.readersArr.push(tmpData);
            }

        }

        $("#readerName").val(readerEmpNameStr.substring(1));
    },

    htmlCompanion: function(list, extList){
        var html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 200px"><p style="font-weight: bold;">소 속</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 90px"><p style="font-weight: bold">직 위</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 73px"><p style="font-weight: bold">성 명</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 270px"><p style="font-weight: bold">비 고</p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '   <tr>';
            html += '       <td style="height:25px;text-align:center;"><p>'+map.deptNm+" "+ map.teamNm +'</p></td>';
            html += '       <td style="height:25px;text-align:center;"><p>'+map.positionNm+'</p></td>';
            html += '       <td style="height:25px;text-align:center;"><p>'+map.EMP_NAME+'</p></td>';
            html += '       <td style="height:25px;text-align:center;"></td>';
            html += '   </tr>';
        }

        for(let i=0; i<extList.length; i++){
            const map = extList[i];
            html += '   <tr>';
            html += '       <td style="height:25px;text-align:center;"><p>'+map.EXT_BELONG+'</p></td>';
            html += '       <td style="height:25px;text-align:center;"><p>'+map.EXT_SPOT+'</p></td>';
            html += '       <td style="height:25px;text-align:center;"><p>'+map.EXT_NM+'</p></td>';
            html += '       <td style="height:25px;text-align:center;"><p>'+map.EXT_ETC+'</p></td>';
            html += '   </tr>';
        }

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlBusExnp: function(list){
        //총합
        let oilCostTotal = 0;
        let trafCostTotal = 0;
        let roomCostTotal = 0;
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
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">이름</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">유류비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">교통비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">숙박비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">통행료</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">일비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">식비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">주차비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">기타</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">합계</p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            console.log("list[i]", list[i]);
            if(list[i].EMP_SEQ != null && (list[i].DIVISION == 1 || list[i].DIVISION == 5)){
                let personTot = 0;

                oilCostTotal += Number(list[i].OIL_COST.replace(/,/g, ""));
                trafCostTotal += Number(list[i].TRAF_COST.replace(/,/g, ""));
                roomCostTotal += Number(list[i].ROOM_COST.replace(/,/g, ""));
                tollCostTotal += Number(list[i].TOLL_COST.replace(/,/g, ""));
                dayCostTotal += Number(list[i].DAY_COST.replace(/,/g, ""));
                eatCostTotal += Number(list[i].EAT_COST.replace(/,/g, ""));
                parkingCostTotal += Number(list[i].PARKING_COST.replace(/,/g, ""));
                etcCostTotal += Number(list[i].ETC_COST.replace(/,/g, ""));

                html += '   <tr>';
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].EMP_NAME+'</p></td>';

                personTot += Number(list[i].OIL_COST.replace(/,/g, ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].OIL_COST+'</p></td>';

                personTot += Number(list[i].TRAF_COST.replace(/,/g, ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].TRAF_COST+'</p></td>';

                personTot += Number(list[i].ROOM_COST.replace(/,/g, ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].ROOM_COST+'</p></td>';

                personTot += Number(list[i].TOLL_COST.replace(/,/g, ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].TOLL_COST+'</p></td>';

                personTot += Number(list[i].DAY_COST.replace(/,/g, ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].DAY_COST+'</p></td>';

                personTot += Number(list[i].EAT_COST.replace(/,/g, ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].EAT_COST+'</p></td>';

                personTot += Number(list[i].PARKING_COST.replace(/,/g, ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].PARKING_COST+'</p></td>';

                personTot += Number(list[i].ETC_COST.replace(/,/g, ""));
                html += '       <td style="height:25px;text-align:center;"><p>'+list[i].ETC_COST+'</p></td>';

                html += '       <td style="height:25px;text-align:center;"><p>'+fn_numberWithCommas(personTot)+'</p></td>';
                html += '   </tr>';

            }else if(list[i].DIVISION == 2){
                oilCostTotal += Number(list[i].OIL_COST.replace(/,/g, ""));
                trafCostTotal += Number(list[i].TRAF_COST.replace(/,/g, ""));
                roomCostTotal += Number(list[i].ROOM_COST.replace(/,/g, ""));
                tollCostTotal += Number(list[i].TOLL_COST.replace(/,/g, ""));
                dayCostTotal += Number(list[i].DAY_COST.replace(/,/g, ""));
                eatCostTotal += Number(list[i].EAT_COST.replace(/,/g, ""));
                parkingCostTotal += Number(list[i].PARKING_COST.replace(/,/g, ""));
                etcCostTotal += Number(list[i].ETC_COST.replace(/,/g, ""));

                html += '                   <tr>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">법인카드</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].OIL_COST ? list[i].OIL_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].TRAF_COST ? list[i].TRAF_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].ROOM_COST ? list[i].ROOM_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].TOLL_COST ? list[i].TOLL_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].DAY_COST ? list[i].DAY_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].EAT_COST ? list[i].EAT_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].PARKING_COST ? list[i].PARKING_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ (list[i].ETC_COST ? list[i].ETC_COST : 0) +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ list[i].TOT_COST +'</p></td>';
                html += '                   </tr>';
            }else if(list[i].DIVISION == 3){
                oilCostTotal += Number(list[i].OIL_COST.replace(/,/g, ""));
                tollCostTotal += Number(list[i].TOLL_COST.replace(/,/g, ""));

                html += '                   <tr>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">법인차량</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ list[i].OIL_COST +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ list[i].TOLL_COST +'</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">0</p></td>';
                html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+ list[i].TOT_COST +'</p></td>';
                html += '                   </tr>';
            }

            finalTotal += Number(list[i].TOT_COST.replace(/,/g, ""));
        }
        
        html += '                   <tr>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">합계</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(oilCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(trafCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold;">'+fn_comma(roomCostTotal)+'</p></td>';
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
        console.log("bfList", bfList);
        console.log("list", list);

        //총합
        let oilCostTotal = 0;
        let trafCostTotal = 0;
        let roomCostTotal = 0;
        let tollCostTotal = 0;
        let dayCostTotal = 0;
        let eatCostTotal = 0;
        let parkingCostTotal = 0;
        let etcCostTotal = 0;
        let finalTotal = 0;

        let oilCostTotalP = 0;
        let trafCostTotalP = 0;
        let roomCostTotalP = 0;
        let tollCostTotalP = 0;
        let dayCostTotalP = 0;
        let eatCostTotalP = 0;
        let parkingCostTotalP = 0;
        let etcCostTotalP = 0;
        let finalTotalP = 0;

        var html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 64px"><p style="font-weight: bold; font-size: 11px">이름</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold; font-size: 11px">항공료</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold; font-size: 11px">교통비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold; font-size: 11px">숙박비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold; font-size: 11px">비자발급비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold; font-size: 11px">일비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold; font-size: 11px">식비</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold; font-size: 11px">보험료</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold; font-size: 11px">기타</p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 64px"><p style="font-weight: bold; font-size: 11px">합계</p></td>';
        html += '               </tr>';

        for(let i=0; i<bfList.length; i++){
            const map = bfList[i];
            if(map.DIVISION == "1" || map.DIVISION == "5"){
                oilCostTotalP = 0;
                trafCostTotalP = 0;
                roomCostTotalP = 0;
                tollCostTotalP = 0;
                dayCostTotalP = 0;
                eatCostTotalP = 0;
                parkingCostTotalP = 0;
                etcCostTotalP = 0;
                finalTotalP = 0;

                oilCostTotal += Number(map.AIR_COST.replaceAll(",", ""));
                trafCostTotal += Number(map.TRAF_COST.replaceAll(",", ""));
                roomCostTotal += Number(map.ROOM_COST.replaceAll(",", ""));
                tollCostTotal += Number(map.VISA_COST.replaceAll(",", ""));
                dayCostTotal += Number(map.DAY_COST.replaceAll(",", ""));
                eatCostTotal += Number(map.EAT_COST.replaceAll(",", ""));
                parkingCostTotal += Number(map.INS_COST.replaceAll(",", ""));
                etcCostTotal += Number(map.ETC_COST.replaceAll(",", ""));
                finalTotal += Number(map.TOT_COST.replaceAll(",", ""));

                oilCostTotalP += Number(map.AIR_COST.replaceAll(",", ""));
                trafCostTotalP += Number(map.TRAF_COST.replaceAll(",", ""));
                roomCostTotalP += Number(map.ROOM_COST.replaceAll(",", ""));
                tollCostTotalP += Number(map.VISA_COST.replaceAll(",", ""));
                dayCostTotalP += Number(map.DAY_COST.replaceAll(",", ""));
                eatCostTotalP += Number(map.EAT_COST.replaceAll(",", ""));
                parkingCostTotalP += Number(map.INS_COST.replaceAll(",", ""));
                etcCostTotalP += Number(map.ETC_COST.replaceAll(",", ""));
                finalTotalP += Number(map.TOT_COST.replaceAll(",", ""));

                for(let j=0;j<list.length; j++){
                    const jMap = list[j];
                    if((jMap.DIVISION == "1" && (map.EMP_SEQ == jMap.EMP_SEQ)) || (jMap.DIVISION == "5" && (map.EMP_SEQ == jMap.EMP_SEQ))){
                        trafCostTotal += Number(jMap.TRAF_COST.replaceAll(",", ""));
                        roomCostTotal += Number(jMap.ROOM_COST.replaceAll(",", ""));
                        etcCostTotal += Number(jMap.ETC_COST.replaceAll(",", ""));
                        finalTotal += Number(jMap.TOT_COST.replaceAll(",", ""));

                        trafCostTotalP += Number(jMap.TRAF_COST.replaceAll(",", ""));
                        roomCostTotalP += Number(jMap.ROOM_COST.replaceAll(",", ""));
                        etcCostTotalP += Number(jMap.ETC_COST.replaceAll(",", ""));
                        finalTotalP += Number(jMap.TOT_COST.replaceAll(",", ""));
                    }
                }

                html += '   <tr>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.EMP_NAME+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(oilCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(trafCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(roomCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(tollCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(dayCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(eatCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(parkingCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(etcCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(finalTotalP)+'</p></td>';
                html += '   </tr>';
            }
        }

        for(let i=0; i<bfList.length; i++){
            const map = bfList[i];

            if(map.DIVISION == "4"){
                oilCostTotalP = 0;
                trafCostTotalP = 0;
                roomCostTotalP = 0;
                tollCostTotalP = 0;
                dayCostTotalP = 0;
                eatCostTotalP = 0;
                parkingCostTotalP = 0;
                etcCostTotalP = 0;
                finalTotalP = 0;

                oilCostTotal += Number(map.AIR_COST.replaceAll(",", ""));
                trafCostTotal += Number(map.TRAF_COST.replaceAll(",", ""));
                roomCostTotal += Number(map.ROOM_COST.replaceAll(",", ""));
                tollCostTotal += Number(map.VISA_COST.replaceAll(",", ""));
                dayCostTotal += Number(map.DAY_COST.replaceAll(",", ""));
                eatCostTotal += Number(map.EAT_COST.replaceAll(",", ""));
                parkingCostTotal += Number(map.INS_COST.replaceAll(",", ""));
                etcCostTotal += Number(map.ETC_COST.replaceAll(",", ""));
                finalTotal += Number(map.TOT_COST.replaceAll(",", ""));

                oilCostTotalP += Number(map.AIR_COST.replaceAll(",", ""));
                trafCostTotalP += Number(map.TRAF_COST.replaceAll(",", ""));
                roomCostTotalP += Number(map.ROOM_COST.replaceAll(",", ""));
                tollCostTotalP += Number(map.VISA_COST.replaceAll(",", ""));
                dayCostTotalP += Number(map.DAY_COST.replaceAll(",", ""));
                eatCostTotalP += Number(map.EAT_COST.replaceAll(",", ""));
                parkingCostTotalP += Number(map.INS_COST.replaceAll(",", ""));
                etcCostTotalP += Number(map.ETC_COST.replaceAll(",", ""));
                finalTotalP += Number(map.TOT_COST.replaceAll(",", ""));

                for(let j=0;j<list.length; j++){
                    const jMap = list[j];
                    if(jMap.DIVISION == "4"){
                        trafCostTotal += Number(jMap.TRAF_COST.replaceAll(",", ""));
                        roomCostTotal += Number(jMap.ROOM_COST.replaceAll(",", ""));
                        etcCostTotal += Number(jMap.ETC_COST.replaceAll(",", ""));
                        finalTotal += Number(jMap.TOT_COST.replaceAll(",", ""));

                        trafCostTotalP += Number(jMap.TRAF_COST.replaceAll(",", ""));
                        roomCostTotalP += Number(jMap.ROOM_COST.replaceAll(",", ""));
                        etcCostTotalP += Number(jMap.ETC_COST.replaceAll(",", ""));
                        finalTotalP += Number(jMap.TOT_COST.replaceAll(",", ""));
                    }
                }

                html += '   <tr>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">업체지급</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(oilCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(trafCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(roomCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(tollCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(dayCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(eatCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(parkingCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(etcCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(finalTotalP)+'</p></td>';
                html += '   </tr>';
            }
        }

        for(let i=0; i<bfList.length; i++){
            const map = bfList[i];

            if(map.DIVISION == "2"){
                oilCostTotalP = 0;
                trafCostTotalP = 0;
                roomCostTotalP = 0;
                tollCostTotalP = 0;
                dayCostTotalP = 0;
                eatCostTotalP = 0;
                parkingCostTotalP = 0;
                etcCostTotalP = 0;
                finalTotalP = 0;

                oilCostTotal += Number(map.AIR_COST.replaceAll(",", ""));
                trafCostTotal += Number(map.TRAF_COST.replaceAll(",", ""));
                roomCostTotal += Number(map.ROOM_COST.replaceAll(",", ""));
                tollCostTotal += Number(map.VISA_COST.replaceAll(",", ""));
                dayCostTotal += Number(map.DAY_COST.replaceAll(",", ""));
                eatCostTotal += Number(map.EAT_COST.replaceAll(",", ""));
                parkingCostTotal += Number(map.INS_COST.replaceAll(",", ""));
                etcCostTotal += Number(map.ETC_COST.replaceAll(",", ""));
                finalTotal += Number(map.TOT_COST.replaceAll(",", ""));

                oilCostTotalP += Number(map.AIR_COST.replaceAll(",", ""));
                trafCostTotalP += Number(map.TRAF_COST.replaceAll(",", ""));
                roomCostTotalP += Number(map.ROOM_COST.replaceAll(",", ""));
                tollCostTotalP += Number(map.VISA_COST.replaceAll(",", ""));
                dayCostTotalP += Number(map.DAY_COST.replaceAll(",", ""));
                eatCostTotalP += Number(map.EAT_COST.replaceAll(",", ""));
                parkingCostTotalP += Number(map.INS_COST.replaceAll(",", ""));
                etcCostTotalP += Number(map.ETC_COST.replaceAll(",", ""));
                finalTotalP += Number(map.TOT_COST.replaceAll(",", ""));

                for(let j=0;j<list.length; j++){
                    const jMap = list[j];
                    if(jMap.DIVISION == "2"){
                        trafCostTotal += Number(jMap.TRAF_COST.replaceAll(",", ""));
                        roomCostTotal += Number(jMap.ROOM_COST.replaceAll(",", ""));
                        etcCostTotal += Number(jMap.ETC_COST.replaceAll(",", ""));
                        finalTotal += Number(jMap.TOT_COST.replaceAll(",", ""));

                        trafCostTotalP += Number(jMap.TRAF_COST.replaceAll(",", ""));
                        roomCostTotalP += Number(jMap.ROOM_COST.replaceAll(",", ""));
                        etcCostTotalP += Number(jMap.ETC_COST.replaceAll(",", ""));
                        finalTotalP += Number(jMap.TOT_COST.replaceAll(",", ""));
                    }
                }

                html += '   <tr>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">법인카드</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(oilCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(trafCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(roomCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(tollCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(dayCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(eatCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(parkingCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(etcCostTotalP)+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+comma(finalTotalP)+'</p></td>';
                html += '   </tr>';
            }
        }

        for(let i=0; i<bfList.length; i++){
            const map = bfList[i];

            if(map.DIVISION == "3"){
                oilCostTotal += Number(map.AIR_COST.replaceAll(",", ""));
                trafCostTotal += Number(map.TRAF_COST.replaceAll(",", ""));
                roomCostTotal += Number(map.ROOM_COST.replaceAll(",", ""));
                tollCostTotal += Number(map.VISA_COST.replaceAll(",", ""));
                dayCostTotal += Number(map.DAY_COST.replaceAll(",", ""));
                eatCostTotal += Number(map.EAT_COST.replaceAll(",", ""));
                parkingCostTotal += Number(map.INS_COST.replaceAll(",", ""));
                etcCostTotal += Number(map.ETC_COST.replaceAll(",", ""));
                finalTotal += Number(map.TOT_COST.replaceAll(",", ""));

                html += '   <tr>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">법인차량</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.AIR_COST+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.TRAF_COST+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.ROOM_COST+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.VISA_COST+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.DAY_COST+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.EAT_COST+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.INS_COST+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.ETC_COST+'</p></td>';
                html += '       <td style="height:25px;text-align:center;"><p style="font-size: 11px">'+map.TOT_COST+'</p></td>';
                html += '   </tr>';
            }
        }

        html += '                   <tr>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">합계</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(oilCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(trafCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(roomCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(tollCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(dayCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(eatCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(parkingCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(etcCostTotal)+'</p></td>';
        html += '                       <td style="height:25px; text-align:center;"><p style="font-weight: bold; font-size: 11px">'+fn_comma(finalTotal)+'</p></td>';
        html += '                   </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}