const busiExnp = {
    global: {
        costData: "",
        bustripInfo: {},
        flag : false,

        tripCode : "",
        dutyCode : "",

        dayCost : 0,
        maxRoomCost : 0,
        eatCost : 0,
        days : 0,
        personnel: 0,
    },

    init: function(type){
        busiExnp.pageSet(type);
        busiExnp.dataSet(type);
    },

    pageSet: function(type){
        window.resizeTo(1700, 750);
        busiExnp.global.costData = $(".oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost, .extCrmInput, .corpCarInput, .corpInput");

        $(".empName, .oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost, .extCrmInput, .corpCarInput").kendoTextBox();

        const corpArr = [
            {text: "개인", value: "N"},
            {text: "법인", value: "Y"}
        ]
        $(".corpYn").kendoDropDownList({
            dataSource : corpArr,
            dataTextField: "text",
            dataValueField: "value"
        });

        $(".corpYn").css("display", "none");

        customKendo.fn_textBox(["exchangeRate"]);

        for(var i = 1 ; i <= 9; i++ ){
            customKendo.fn_textBox(["corp"+i]);
            customKendo.fn_textBox(["corpCar"+i]);
            customKendo.fn_textBox(["corpCrm"+i]);
        }

        /** 합계 자동계산 바인드 */
        let costData = busiExnp.global.costData;
        costData.css("text-align", "right");
        costData.bind("keyup", busiExnp.fn_setTableSum);

        busiExnp.fn_setTableSum();

        /** 지출증빙 첨부파일 */
        let exnpAir = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "busiExnpAir",
            hrBizReqResultId: $("#hrBizReqId").val()
        }).list;
        if(exnpAir.length > 0){
            var html = "";
            for(let i=0; i<exnpAir.length; i++){
                let row = exnpAir[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpAirDiv").html(html);
        }

        let exnpTraf = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "busiExnpTraf",
            hrBizReqResultId: $("#hrBizReqId").val()
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

        let exnpRoom = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "busiExnpRoom",
            hrBizReqResultId: $("#hrBizReqId").val()
        }).list;
        if(exnpRoom.length > 0){
            var html = "";
            for(let i=0; i<exnpRoom.length; i++){
                let row = exnpRoom[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpRoomDiv").html(html);
        }

        let exnpVisa = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "busiExnpVisa",
            hrBizReqResultId: $("#hrBizReqId").val()
        }).list;
        if(exnpVisa.length > 0){
            var html = "";
            for(let i=0; i<exnpVisa.length; i++){
                let row = exnpVisa[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpVisaDiv").html(html);
        }

        let exnpIns = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "busiExnpIns",
            hrBizReqResultId: $("#hrBizReqId").val()
        }).list;
        if(exnpIns.length > 0){
            var html = "";
            for(let i=0; i<exnpIns.length; i++){
                let row = exnpIns[i];
                html += "<div>";
                html += '   <span style="cursor: pointer" onclick="fileDown(\''+row.file_path+row.file_uuid+'\', \''+row.file_org_name+'.'+row.file_ext+'\')">'+row.file_org_name+'</span>'
                html += '   <span style="color: red; cursor: pointer; margin-left: 5px" onclick="bustrip.fileDel(\''+row.file_no+'\', this)">X</span>'
                html += "</div>";
            }
            $("#exnpInsDiv").html(html);
        }

        let exnpEtc = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "busiExnpEtc",
            hrBizReqResultId: $("#hrBizReqId").val()
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
        /** 출장정보 */
        const busResult = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: $("#hrBizReqId").val()
        });
        const busInfo = busResult.rs.rs;
        busiExnp.global.bustripInfo = busInfo;
        console.log(busResult);

        /** 등급 */
        const nationCd = busInfo.NATION_CODE;
        const nationResult = customKendo.fn_customAjax("/bustrip/getNationCodeInfo", {
            nationCd: nationCd
        });
        const nationInfo = nationResult.data;
        let nationText = nationInfo.LG_CD_NM+"등급 "+nationInfo.NATION_CD_NM;
        $("#grade").text(nationText);

        /** 출장기간 */
        $("#tripDayFr").val(busInfo.TRIP_DAY_FR);
        $("#tripDayTo").val(busInfo.TRIP_DAY_TO);
        const date1 = new Date(busInfo.TRIP_DAY_FR);
        const date2 = new Date(busInfo.TRIP_DAY_TO);
        let diff = Math.abs(date1.getTime() - date2.getTime());
        diff = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;

        let nights = busInfo.NIGHTS ? busInfo.NIGHTS : 0; console.log("nights " + nights);
        if(diff > 1 && nights == 0){
            nights = diff - 1;
        }
        let bustripDtHtml = busInfo.TRIP_DAY_FR+' ~ '+busInfo.TRIP_DAY_TO+' (<input id="nights" style="width: 30px; text-align: right" oninput="onlyNumber(this)" onkeyup="busiExnp.fn_calc(this)" value="'+nights+'">박 '+ diff+'일)';
        $("#bustripDt").html(bustripDtHtml);
        customKendo.fn_textBox(["nights"]);

        /** 환율 */
        $("#exchangeRate").val(busInfo.EXCHANGE_RATE);

        /** 동반자 */
        const companion = [];

        const userInfo = getUser(busInfo.EMP_SEQ);
        const companionList = busResult.rs.list;
        console.log(userInfo);

        let myData = {
            empName : busInfo.EMP_NAME,
            empSeq : busInfo.EMP_SEQ,
            dutyName : userInfo.DUTY_NAME
        }
        companion.push(myData);

        for(let i=0; i<companionList.length; i++){
            const comInfo = companionList[i];
            const comData = {
                empName : comInfo.EMP_NAME,
                empSeq : comInfo.EMP_SEQ,
                dutyName : comInfo.DUTY_NAME
            }
            companion.push(comData);
        }
        busiExnp.global.personnel = companion;

        let companionText = "";

        /** 기본 해외출장 타입 = 2 : 팀장이하 */
        let busyType = 2;

        /** for문 돌려서 부서장이상일시 해외출장 타입 = 1 : 부서장 이상 */
        for(let i=0; i<companion.length; i++){
            const map = companion[i];
            if(map.dutyName == "본부장" || map.dutyName == "사업부장" || map.dutyName == "원장"){
                busyType = 1;
                $("#duty").text("부서장이상");
            }

            if(i != 0){
                companionText += ", ";
            }
            companionText += map.empName;
        }
        $("#companion").text(companionText);



        /** 여비 초기값 세팅 */
        let costData = busiExnp.global.costData;
        if(type != "upd"){
            costData.val(0);
        }

        /** 여비 조회 */
        busiExnp.global.tripCode = nationInfo.LG_CD;
        busiExnp.global.dutyCode = busyType;
        busiExnp.global.days = diff;

        busiExnp.fn_getExnpInfo();

        /** 법인카드 사용내역 */
        var data = {
            hrBizReqId: $("#hrBizReqId").val()
        }
        const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", data);
        const cardList = cardResult.list;

        let corpMoney = 0;

        var selCorpType = {
            1 : '항공료',
            2 : '국내이동교통비',
            3 : '숙박비',
            4 : '비자발급비',
            5 : '일비',
            6 : '식비',
            7 : '보험료',
            8 : '기타'
        }

        let html = '';
        let index = 0;
        for(let i=0; i<cardList.length; i++){
            const cardMap = cardList[i];

            var data = {
                cardNo : cardMap.CARD_NO,
                authDate : cardMap.AUTH_DD,
                authNo : cardMap.AUTH_NO,
                authTime : cardMap.AUTH_HH,
                buySts : cardMap.BUY_STS,
                hrBizReqId : $("#hrBizReqId").val(),
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
        busiExnp.fn_calc();
    },

    /** 해당 해외출장에 맞는 여비 데이터 세팅 */
    fn_getExnpInfo(){
        const costList = customKendo.fn_customAjax("/bustrip/getBusinessCostList", {
            hrBizReqId: $("#hrBizReqId").val()
        }).list;
        console.log("businessCostList", costList);

        let dayCost = 0;
        let maxRoomCost = 0;
        let eatCost = 0;

        for(let i=0; i<costList.length; i++){
            const map = costList[i];

            if(map.TRIP_CODE == busiExnp.global.tripCode){
                if(1 == busiExnp.global.dutyCode){

                    if(map.EXNP_CODE == "1"){
                        dayCost = map.COST_AMT;
                    }
                    if(map.EXNP_CODE == "2"){
                        maxRoomCost = map.COST_AMT;
                    }
                    if(map.EXNP_CODE == "3"){
                        eatCost = map.COST_AMT;
                    }

                }else if(2 == busiExnp.global.dutyCode){

                    if(map.EXNP_CODE == "1"){
                        dayCost = map.TEAM_COST_AMT;
                    }
                    if(map.EXNP_CODE == "2"){
                        maxRoomCost = map.TEAM_COST_AMT;
                    }
                    if(map.EXNP_CODE == "3"){
                        eatCost = map.TEAM_COST_AMT;
                    }

                }
            }
        }

        console.log("일비 : "+dayCost+"$");
        console.log("최대 숙박비 : "+maxRoomCost+"$");
        console.log("식비 : "+eatCost+"$");

        busiExnp.global.dayCost = dayCost;
        busiExnp.global.maxRoomCost = maxRoomCost;
        busiExnp.global.eatCost = eatCost;
        busiExnp.fn_roomCostCheck();
    },

    fn_calc: function(e){
        const rate = $("#exchangeRate").val();

        /** 일비(정액) */
        const dayCost = Number(rate) * Number(busiExnp.global.dayCost) * Number(busiExnp.global.days);
        $(".dayCost").val(comma(Math.floor(Math.floor(dayCost) / 1000) * 1000));

        /** 식비(정액) */
        const eatCost = Number(rate) * Number(busiExnp.global.eatCost) * Number(busiExnp.global.days);
        $(".eatCost").val(comma(Math.floor(Math.floor(eatCost) / 1000) * 1000));
        $(".extCrm6").val(comma(Math.floor(Math.floor(eatCost) / 1000) * 1000));

        /** 최대 숙박비 계산 */
        this.fn_roomCostCheck();

        /** 환율에 콤마 찍어서 리턴 */
        // return fn_inputNumberFormat(e);

        busiExnp.fn_setTableSum();

        return e;
    },

    fn_setTableSum: function(){
        if($(":focus").hasClass("trafDayCost")){
            busiExnp.fn_roomCostCheck();
        }

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
        for(var i = 1 ; i < $("#bustExnpTb").find("tr").length -1; i++){
            var row = rowList[rowList.length-1];
            var tdsNum = row.childElementCount;

            for (var j = 1; j < tdsNum - 1; j++) {
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

    fn_roomCostCheck: function(){
        /** 숙박비 */
        const rate = $("#exchangeRate").val();
        const maxRoomCost = Number(rate) * Number(busiExnp.global.maxRoomCost) * Number($("#nights").val());
        var len = 0;
        var addLen = 0;
        var extLen = 0;
        $("#bustExnpTb").each(function(){
            addLen = $(this).find(".addData").length;
            extLen = $(this).find(".extData").length;
        });

        len = addLen + extLen;
        const maxRoomCost2 = Math.floor(Math.floor(maxRoomCost * Number(len) / 1000) * 1000);  // 최대숙박비 * 인원수
        let sum = 0;

        $("span > .trafDayCost").each(function(){
            const roomCost = Number(uncomma(this.value));

            sum += Number(uncomma(this.value));
            if(sum > maxRoomCost2){
                this.value = comma(uncomma(this.value) - (sum - maxRoomCost2));
                return false;
            }
        })

        $("#roomMaxPay").text( " (1인: " + comma(Math.floor(Math.floor(maxRoomCost) / 1000) * 1000) + ") ");
    },

    fn_saveBtn: function(id, type, mode){
        const nights = $("#nights").val();
        const exchangeRate = busiExnp.uncomma($("#exchangeRate").val());

        if(exchangeRate == "" || exchangeRate == 0){
            alert("환율을 입력해주세요."); return;
        }
        if(nights == ""){
            alert("출장기간을 입력해주세요."); return;
        }

        var bustExnpTb = document.getElementById('bustExnpTb');
        var rowList = bustExnpTb.rows;

        var result = "";
        for(var i = 1 ; i < rowList.length-1 ; i++){
            var row = rowList[i];
            var data = {};
            // 업체지급
            if(row.classList.value == 'corpCrmData'){
                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizOverExnpId : $("#corpCrmExnpId").val(),
                    airCost : $("#corpCrm1").val(),
                    trafCost : $("#corpCrm2").val(),
                    roomCost : $("#corpCrm3").val(),
                    visaCost : $("#corpCrm4").val(),
                    dayCost : $("#corpCrm5").val(),
                    eatCost : $("#corpCrm6").val(),
                    insCost : $("#corpCrm7").val(),
                    etcCost : $("#corpCrm8").val(),
                    totCost : $("#corpCrm9").val(),
                    type : type,
                    division : '4'
                };

                var returnFlag = busiExnp.fn_exnpAttachCheck(data);
                busiExnp.global.flag = returnFlag[0];
                if(!returnFlag[0]){
                    alert(returnFlag[1]);
                    break;
                }
            }
        }
        if(!returnFlag[0]){
            return false;
        }

        for(var i = 1 ; i < rowList.length-1 ; i++){
            var row = rowList[i];

            var data = {};
            let empSeq = $(row.cells[0]).find("input[name='empSeq']").val();
            if(row.classList.value == 'addData'){
                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizOverExnpId : $(row.cells[0]).find("input[name='hrBizOverExnpId']").val(),
                    empName : $(row.cells[0]).find("input[type=text]").val(),
                    empSeq : $(row.cells[0]).find("input[name='empSeq']").val(),
                    airCost : $(row.cells[1]).find("input[type=text]").val(),
                    trafCost : $(row.cells[2]).find("input[type=text]").val(),
                    roomCost : $(row.cells[3]).find("input[type=text]").val(),
                    visaCost : $(row.cells[4]).find("input[type=text]").val(),
                    dayCost : $(row.cells[5]).find("input[type=text]").val(),
                    eatCost : $(row.cells[6]).find("input[type=text]").val(),
                    insCost : $(row.cells[7]).find("input[type=text]").val(),
                    etcCost : $(row.cells[8]).find("input[type=text]").val(),
                    totCost : $(row.cells[9]).find("input[type=text]").val(),

                    airCorpYn : $(row.cells[1]).find("#oilCorpYn"+empSeq).data("kendoDropDownList").value(),
                    trafCorpYn : $(row.cells[2]).find("#trafCorpYn"+empSeq).data("kendoDropDownList").value(),
                    trafDayCorpYn : $(row.cells[3]).find("#trafDayCorpYn"+empSeq).data("kendoDropDownList").value(),
                    visaCorpYn : $(row.cells[4]).find("#tollCorpYn"+empSeq).data("kendoDropDownList").value(),
                    eatCorpYn : "Y",
                    insCorpYn : $(row.cells[7]).find("#parkingCorpYn"+empSeq).data("kendoDropDownList").value(),
                    etcCorpYn : $(row.cells[8]).find("#etcCorpYn"+empSeq).data("kendoDropDownList").value(),
                    expStat : "Y",
                    type : type,
                    division : '1'
                }
            }

            // 외부인력
            if(row.classList.value == 'extData') {
                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    empName : $(row.cells[0]).find("input[type=text]").val(),
                    empSeq : 'A99' + $(row.cells[0]).find("input[name='extMemSn']").val(),
                    hrBizOverExnpId : $(row.cells[0]).find("input[name='hrBizOverExnpId']").val(),
                    airCost : $(row.cells[1]).find("input[type=text]").val(),
                    trafCost : $(row.cells[2]).find("input[type=text]").val(),
                    roomCost : $(row.cells[3]).find("input[type=text]").val(),
                    visaCost : $(row.cells[4]).find("input[type=text]").val(),
                    dayCost : $(row.cells[5]).find("input[type=text]").val(),
                    eatCost : $(row.cells[6]).find("input[type=text]").val(),
                    insCost : $(row.cells[7]).find("input[type=text]").val(),
                    etcCost : $(row.cells[8]).find("input[type=text]").val(),
                    totCost : $(row.cells[9]).find("input[type=text]").val(),
                    type : type,
                    division : '5'
                };
            }

            // 업체지급
            if(row.classList.value == 'corpCrmData'){
                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizOverExnpId : $("#corpCrmExnpId").val(),
                    airCost : $("#corpCrm1").val(),
                    trafCost : $("#corpCrm2").val(),
                    roomCost : $("#corpCrm3").val(),
                    visaCost : $("#corpCrm4").val(),
                    dayCost : $("#corpCrm5").val(),
                    eatCost : $("#corpCrm6").val(),
                    insCost : $("#corpCrm7").val(),
                    etcCost : $("#corpCrm8").val(),
                    totCost : $("#corpCrm9").val(),
                    type : type,
                    division : '4'
                };
            }

            // 법인카드
            if(row.classList.value == 'corpCardData'){
                var totalAirCost = $("#corp1").val();
                var totalTrafCost = $("#corp2").val();
                var totalRoomCost = $("#corp3").val();
                var totalVisaCost = $("#corp4").val();
                var totalDayCost = $("#corp5").val();
                var totalEatCost = $("#corp6").val();
                var totalInsCost = $("#corp7").val();
                var totalEtcCost = $("#corp8").val();
                var totalAmt = $("#corp9").val();

                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizOverExnpId : $("#corpExnpId").val(),
                    airCost : totalAirCost || 0,
                    trafCost : totalTrafCost,
                    roomCost : totalRoomCost,
                    visaCost : totalVisaCost,
                    dayCost : totalDayCost,
                    eatCost : totalEatCost,
                    insCost : totalInsCost,
                    etcCost : totalEtcCost,
                    totCost : totalAmt,
                    type : type,
                    division : '2'
                };
            }

            // 법인차량
            if(row.classList.value == 'corpCarData'){
                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizOverExnpId : $("#corpCarExnpId").val(),
                    airCost : $("#corpCar1").val(),
                    trafCost : $("#corpCar2").val(),
                    roomCost : $("#corpCar3").val(),
                    visaCost : $("#corpCar4").val(),
                    dayCost : $("#corpCar5").val(),
                    eatCost : $("#corpCar6").val(),
                    insCost : $("#corpCar7").val(),
                    etcCost : $("#corpCar8").val(),
                    totCost : $("#corpCar9").val(),
                    type : type,
                    division : '3'
                };
            }

            result = customKendo.fn_customAjax("/bustrip/saveBustripOverExnpPop", data);
        }

        /** Ibrench 선택 내역 저장 */
        var parameters = {
            hrBizReqId : $("#hrBizReqId").val()
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
        customKendo.fn_customAjax("/bustrip/setBusiCardHist", parameters);

        /** 첨부파일 저장 프로세스 */
        /** 항공료 파일 */
        if($("#exnpAir")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "busiExnpAir");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", $("#hrBizReqId").val());

            for(let i=0; i<$("#exnpAir")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpAir")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 국내이동교통비 파일 */
        if($("#exnpTraf")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "busiExnpTraf");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", $("#hrBizReqId").val());

            for(let i=0; i<$("#exnpTraf")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpTraf")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 숙박비 파일 */
        if($("#exnpRoom")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "busiExnpRoom");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", $("#hrBizReqId").val());

            for(let i=0; i<$("#exnpRoom")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpRoom")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 비자발급비 파일 */
        if($("#exnpVisa")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "busiExnpVisa");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", $("#hrBizReqId").val());

            for(let i=0; i<$("#exnpVisa")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpVisa")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 보험료 파일 */
        if($("#exnpIns")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "busiExnpIns");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", $("#hrBizReqId").val());

            for(let i=0; i<$("#exnpIns")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpIns")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        /** 기타 파일 */
        if($("#exnpEtc")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "busiExnpEtc");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", $("#hrBizReqId").val());

            for(let i=0; i<$("#exnpEtc")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpEtc")[0].files[i]);
            }
            customKendo.fn_customFormDataAjax("/bustrip/setExnpFile", formData);
        }

        var data = {
            hrBizReqId: $("#hrBizReqId").val(),
            nights: nights,
            exchangeRate: exchangeRate,
            empSeq: $("#regEmpSeq").val(),
            status: 100
        }

        if(mode != null && mode == "mng"){
            alert("수정이 완료되었습니다.");
            opener.window.location.reload();
            // window.close();
            // location.reload();
        }else{
            var result = customKendo.fn_customAjax("/bustrip/setBusiCert", data);
            alert("저장이 완료되었습니다.");
            opener.gridReload();
            // window.close();
            // location.reload();
        }

        window.close();
        window.open("/bustrip/pop/bustripReqPop.do?hrBizReqId=" + $("#hrBizReqId").val(), "bustripResListPop", "width=1200, height=795, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    },

    fn_exnpAttachCheck : function (e){
        var type = $("#type").val();
        var data = e;

        var arr = ["airCost", "trafCost", "roomCost", "visaCost", "insCost", "etcCost"];
        var idArr = ["Air", "Traf", "Room", "Visa", "Ins", "Etc"];

        var map = {
            airCost : "항공료",
            trafCost : "국내이동교통비",
            roomCost : "숙박비",
            visaCost : "비자발급비",
            insCost : "보험료",
            etcCost : "기타"
        }

        if(type == 'ins'){ //신규
            for(let i=0; i<arr.length; i++){
                if(data[arr[i]] != '0'){
                    if($("#exnp"+idArr[i])[0].files.length == 0){
                        return [false, map[arr[i]]+" 지출증빙 첨부파일을\n확인해주세요."];
                    }
                }
            }

            return [true, ""];
        }else if(type == 'upd'){ // 수정
            for(let i=0; i<arr.length; i++){
                if(data[arr[i]] != '0'){
                    if($("#exnp"+idArr[i]+"Div div:visible").length == 0){
                        if($("#exnp"+idArr[i])[0].files.length == 0){
                            return [false, map[arr[i]]+" 지출증빙 첨부파일을\n확인해주세요."];
                        }
                    }
                }
            }

            return [true, ""];
        }
    },

    uncomma : function(str) {
        str = String(str);
        return str.replace(/[^\d.]+/g, '');
    }
}