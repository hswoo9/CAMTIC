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
        bustripExnpReq.global.costData = $(".trafCost, .roomCost, .etcCost, .totalCost, .corpCarInput");
        let corpArr = [
            {text: "개인", value: "N"},
            {text: "법인", value: "Y"}
        ]
        if($("#mod").val() == "mng"){
            $(".empName, .trafCost, .roomCost, .etcCost, .totalCost, .corpInput, .corpCarInput").kendoTextBox({
            });
            $(".oilCost").attr('disabled', false);
            $(".corpYn").kendoDropDownList({
                dataSource : corpArr,
                dataTextField: "text",
                dataValueField: "value"
            });
        }else {
            $(".empName, .trafCost, .roomCost, .etcCost, .totalCost, .corpInput, .corpCarInput").kendoTextBox();
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

        bustripExnpReq.fn_setTableSum();

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

        let exnpRoom = customKendo.fn_customAjax("/bustrip/getExnpFile", {
            fileCd: "exnpRoom",
            hrBizReqResultId: hrBizReqResultId
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
        let index = 0;
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
    },

    fn_getExnpInfo: function(){

    },

    fn_getFuelInfo: function(){
        bustripExnpReq.fn_setTableSum();
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

        let totalCostArr = [0, 0, 0, 0];
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
        var trafTotal = 0;
        var roomTotal = 0;
        var etcTotal = 0;
        var totalTotal = 0;

        $(".addData").each(function () {
            var row = this;
            if (row.classList.value == 'addData') {
                trafTotal += Number($(row.cells[1]).find("input[type=text]").val().replace(/,/g, ''));
                roomTotal += Number($(row.cells[2]).find("input[type=text]").val().replace(/,/g, ''));
                etcTotal += Number($(row.cells[3]).find("input[type=text]").val().replace(/,/g, ''));
                totalTotal += Number($(row.cells[4]).find("input[type=text]").val().replace(/,/g, ''));
            }
        });

        // 외부인력
        $(".extData").each(function () {
            var row = this;
            if (row.classList.value == 'extData') {
                trafTotal += Number($(row.cells[1]).find("input[type=text]").val().replace(/,/g, ''));
                roomTotal += Number($(row.cells[2]).find("input[type=text]").val().replace(/,/g, ''));
                etcTotal += Number($(row.cells[3]).find("input[type=text]").val().replace(/,/g, ''));
                totalTotal += Number($(row.cells[4]).find("input[type=text]").val().replace(/,/g, ''));
            }
        });

        //업체지급 더하기
        trafTotal += Number(uncomma($("#corpCrm2").val()));
        roomTotal += Number(uncomma($("#corpCrm3").val()));
        etcTotal += Number(uncomma($("#corpCrm8").val()));

        //법인카드 더하기
        trafTotal += Number(uncomma($("#corp2").val()));
        roomTotal += Number(uncomma($("#corp3").val()));
        etcTotal += Number(uncomma($("#corp8").val()));

        $("#trafTotalCost").val(comma(trafTotal));
        $("#roomTotalCost").val(comma(roomTotal));
        $("#etcTotalCost").val(comma(etcTotal));
        $("#totalTotalCost").val(comma(totalTotal));

        corpTotalSet();

        //합계의 총합은 마지막
        totalTotal += Number(uncomma($("#corpCrm9").val()));
        totalTotal += Number(uncomma($("#corpTotal").val()));
        $("#totalTotalCost").val(comma(totalTotal));
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
            var data = {};
            let empSeq = $(row.cells[0]).find("input[name='empSeq']").val();

            // 개인
            if(row.classList.value == 'addData'){
                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizOverExnpId : $(row.cells[0]).find("input[name='hrBizOverExnpId']").val(),
                    empName : $(row.cells[0]).find("input[type=text]").val(),
                    empSeq : $(row.cells[0]).find("input[name='empSeq']").val(),
                    trafCost : $(row.cells[1]).find("input[type=text]").val(),
                    roomCost : $(row.cells[2]).find("input[type=text]").val(),
                    etcCost : $(row.cells[3]).find("input[type=text]").val(),
                    totCost : $(row.cells[4]).find("input[type=text]").val(),
                    type : type,
                    division : '1'
                };

                var returnFlag = bustripExnpReq.fn_exnpAttachCheck(data);
                if(!returnFlag[0]){
                    alert(returnFlag[1]);
                    break;
                }
            }

            // 개인
            if(row.classList.value == 'extData'){
                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizOverExnpId : $(row.cells[0]).find("input[name='hrBizOverExnpId']").val(),
                    empName : $(row.cells[0]).find("input[type=text]").val(),
                    empSeq : 'A99' + $(row.cells[0]).find("input[name='empSeq']").val(),
                    trafCost : $(row.cells[1]).find("input[type=text]").val(),
                    roomCost : $(row.cells[2]).find("input[type=text]").val(),
                    etcCost : $(row.cells[3]).find("input[type=text]").val(),
                    totCost : $(row.cells[4]).find("input[type=text]").val(),
                    type : type,
                    division : '5'
                }
            }

            // 업체지급
            if(row.classList.value == 'corpCrmData'){
                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizOverExnpId : $("#corpCrmExnpId").val(),
                    trafCost : $("#corpCrm2").val(),
                    roomCost : $("#corpCrm3").val(),
                    etcCost : $("#corpCrm8").val(),
                    totCost : $("#corpCrm9").val(),
                    type : type,
                    division : '4'
                };
            }

            // 법인카드
            if(row.classList.value == 'corpData'){
                var totalTrafCost = $("#corp2").val();
                var totalRoomCost = $("#corp3").val();
                var totalEtcCost = $("#corp8").val();
                var totalAmt = $("#corpTotal").val();

                data = {
                    hrBizReqId : $("#hrBizReqId").val(),
                    hrBizReqResultId : hrBizReqResultId,
                    hrBizOverExnpId : $("#corpExnpId").val(),
                    trafCost : totalTrafCost,
                    roomCost : totalRoomCost,
                    etcCost : totalEtcCost,
                    totCost : totalAmt,
                    type : type,
                    division : '2'
                };
            }

            result = customKendo.fn_customAjax("/bustrip/saveBustripOverExnpPop", data);
        }

        if(!returnFlag[0]){
            return false;
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
        if($("#exnpRoom")[0].files.length > 0){
            var formData = new FormData();
            formData.append("menuCd", "exnpRoom");
            formData.append("empSeq", $("#regEmpSeq").val());
            formData.append("hrBizReqResultId", hrBizReqResultId);

            for(let i=0; i<$("#exnpRoom")[0].files.length; i++){
                formData.append("bustripFile", $("#exnpRoom")[0].files[i]);
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
            // window.close();
            // location.reload()
        }else{
            var result = customKendo.fn_customAjax("/bustrip/setReqCert", data);
            alert("저장이 완료되었습니다.");
            opener.gridReload();
            // window.close();
            // location.reload()
        }

        window.close();
        opener.bustripResList.popBustripRes(hrBizReqResultId,$("#hrBizReqId").val(),$("#tripType").val());
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
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
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

    fn_popRegDet : function (v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i + "&cardVal=M";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_exnpAttachCheck : function (e){
        var type = $("#type").val();
        var data = e;

        var arr = ["trafCost", "roomCost", "etcCost"];
        var idArr = ["Traf", "Room", "Etc"];

        var map = {
            trafCost : "국내이동교통비",
            roomCost : "숙박비",
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

    personalExnpFormDown : function (){
        var protocol = window.location.protocol + "//";
        var locationHost = protocol + window.location.host;

        var filePath = "/upload/templateForm/personalExnpForm.hwp";

        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent('개인여비지출증빙.hwp'),
        });
    }
}