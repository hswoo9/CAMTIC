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

        $(".empName, .oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost").kendoTextBox();

        const corpArr = [
            {text: "개인", value: "N"},
            {text: "법인", value: "Y"}
        ]
        $(".corpYn").kendoDropDownList({
            dataSource : corpArr,
            dataTextField: "text",
            dataValueField: "value"
        });

        /** 합계 자동계산 바인드 */
        let costData = bustripExnpReq.global.costData;
        costData.css("text-align", "right");
        costData.bind("keyup", bustripExnpReq.fn_setTableSum);
    },

    dataSet: function(type){
        /** 출장정보 */
        const busResult = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: $("#hrBizReqId").val()
        });
        const busInfo = busResult.rs.rs;
        bustripExnpReq.global.bustripInfo = busInfo;
        console.log(busResult);

        /** 등급 */
        const nationCd = busInfo.NATION_CODE;
        const nationResult = customKendo.fn_customAjax("/bustrip/getNationCodeInfo", {
            nationCd: nationCd
        });
        const nationInfo = nationResult.data;
        console.log(nationInfo);
        let nationText = nationInfo.LG_CD_NM+"등급 "+nationInfo.NATION_CD_NM;
        $("#grade").text(nationText);


        /** 출장기간 */
        const date1 = new Date(busInfo.TRIP_DAY_FR);
        const date2 = new Date(busInfo.TRIP_DAY_TO);
        let diff = Math.abs(date1.getTime() - date2.getTime());
        diff = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;

        let nights = 0;
        if(diff > 1){
            nights = diff - 2;
        }
        let bustripDtHtml = busInfo.TRIP_DAY_FR+' ~ '+busInfo.TRIP_DAY_TO+' (<input id="nights" style="width: 30px; text-align: right" value="'+nights+'">박 '+ diff+'일)';
        $("#bustripDt").html(bustripDtHtml);
        customKendo.fn_textBox(["nights"]);

        /** 동반자 */
        const companion = [];

        const userInfo = getUser(busInfo.EMP_SEQ);
        console.log(userInfo);

        let myInfo = {
            empName : busInfo.EMP_NAME,
            empSeq : busInfo.EMP_SEQ
        }

        /** 여비 초기값 세팅 */
        let costData = bustripExnpReq.global.costData;
        if(type != "upd"){
            costData.val(0);
        }

        /** 여비 조회 */
        bustripExnpReq.fn_getExnpInfo(type);
        bustripExnpReq.fn_getFuelInfo(type);
    },

    fn_getExnpInfo(type){
        let bustripInfo = bustripExnpReq.global.bustripInfo;
        let costList = customKendo.fn_customAjax("/bustrip/getBusinessCostList", {
            hrBizReqId: hrBizReqId
        }).list;
        console.log("bustripInfo", bustripInfo);
        console.log("costList", costList);

        /** 수정이 아니면 여비데이터 세팅 */
        if(type != "upd") {
            for(let i=0; i<costList.length; i++){

            }
        }
    },

    fn_getFuelInfo: function(type){
        if(type != "upd") {
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
        return;

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
            cardData.fileNo = fileNo;

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