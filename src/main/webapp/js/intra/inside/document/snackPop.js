var snackReq = {
    global: {
        hwpCtrl : "",
        params : "",
        userArr: [],
        snackData: {},
        attFiles : new Array(),
        addAttFiles : new Array(),
        cardList : new Array(),
        fileNoArr : new Array(),
        fileArray : new Array()
    },

    init: function() {
        snackReq.hwpSet();
        snackReq.dataSet(snackData);
    },

    hwpSet: function(){
        snackReq.loading();
        snackReq.global.params = params;
        snackReq.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", snackReq.global.params.hwpUrl, function () {snackReq.editorComplete();});
    },

    loading: function(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    },

    editorComplete: function(){
        let filePath = "http://218.158.231.184/upload/templateForm/snackExnpForm.hwp";
        snackReq.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            snackReq.openCallBack();
            snackReq.global.hwpCtrl.EditMode = 0;
            snackReq.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            snackReq.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            snackReq.global.hwpCtrl.ShowRibbon(false);
            snackReq.global.hwpCtrl.ShowCaret(false);
            snackReq.global.hwpCtrl.ShowStatusBar(false);
            snackReq.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
    },

    dataSet: function(snackData) {
        console.log("dataSet");
        customKendo.fn_textBox(["userText", "corporCard", "areaName", "usAmount", "useReason"]);
        customKendo.fn_datePicker("useDt", 'month', "yyyy-MM-dd", new Date());
        let snackTypeDataSource = [
            {text: "야간 식대", value: "1"},
            {text: "휴일 식대", value: "2"},
            {text: "평일 식대", value: "3"}
        ]
        customKendo.fn_dropDownList("snackType", snackTypeDataSource, "text", "value", 2);
        let payTypeDataSource = [
            {text: "개인", value: "1"},
            {text: "법인", value: "2"}
        ]
        customKendo.fn_dropDownList("payType", payTypeDataSource, "text", "value", 2);
        let chargeUserDataSource = []
        customKendo.fn_dropDownList("chargeUser", chargeUserDataSource, "text", "value", 2);
        $("#chargeUser").data("kendoDropDownList").enable(false);
        $("#usAmount").bind("keyup", snackReq.splitBill);

        $("#useDt").attr("readonly", true);
        $("#userText").data("kendoTextBox").readonly(true);

        if(!isNaN(snackData.STATUS)) {
            let data = snackData;
            $("#useDt").val(data.USE_DT);
            /*$("#useHour").val(data.USE_TIME.split(':')[0]);
            $("#useMin").val(data.USE_TIME.split(':')[1]);*/
            $("#snackType").data("kendoDropDownList").value(data.SNACK_TYPE);
            $("#userSn").val(data.USER_SN);
            $("#userText").val(data.USER_TEXT);
            $("#payType").data("kendoDropDownList").value(data.PAY_TYPE);
            $("#areaName").val(data.AREA_NAME);
            $("#usAmount").val(data.AMOUNT_SN.toString().toMoney());
            $("#useReason").val(data.USE_REASON);
            $("#corporCard").val(data.CARD_TEXT);
            $("#cardBaNb").val(data.CARD_SN);

            snackReq.fn_changePayType(data.PAY_TYPE);

            let userSn = snackData.USER_SN;
            let userSnArr = userSn.split(',');

            let userText = snackData.USER_TEXT;
            let userTextArr = userText.split(',');

            let userArr = [];
            /** 결재선 */
            for(let i= 0; i<userSnArr.length; i++) {
                let data = {
                    empSeq: userSnArr[i],
                    empName: userTextArr[i]
                }
                userArr.push(data);
            }
            snackReq.userDataSet2(userArr);
            // customKendo.fn_dropDownList("chargeUser", userArr, "empName", "empSeq", 2);
            $("#chargeUser").data("kendoDropDownList").value(data.RECIPIENT_EMP_SEQ);
            snackReq.splitBill2(data.AMOUNT_SN);

            if(snackData.STATUS == 0 && $("#mode").val() == "infoPop"){
                snackReq.enableSetting(true);
                $("#restaurantSearch").attr("disabled", true);
                $("#cardSearch").attr("disabled", true);
            } else {
                snackReq.enableSetting(false);
            }

            if($("#mode").val() == "mod"){
                snackReq.enableSetting(true);
            }

            if(snackData.STATUS != 100){
                $("#cardSearch").attr("disabled", false);
            }

            var fileNoArr = [];
            var result = "";

            if(data.FR_FILE_NO != '' && data.FR_FILE_NO != null) {
                fileNoArr = data.FR_FILE_NO.split(',');

                for(var i=0; i<fileNoArr.length; i++) {
                    result += "," + fileNoArr[i];
                }
            } else {
                result += ",0";
            }

            var snackSubmitData = {
                snackInfoSn: $("#snackInfoSn").val(),
                fileNo: result.substring(1)
            };

            var returnData = customKendo.fn_customAjax("/snack/getFileList", snackSubmitData);
            var returnFileArr = returnData.fileList;
            snackReq.global.fileArray = returnFileArr;

            for(let x=0; x < returnFileArr.length; x++){
                if(snackData.STATUS == 100 && $("#mode").val() == "infoPop") {
                    snackReq.settingTempFileDataInit(returnFileArr[x], 'result');
                }else{
                    snackReq.settingTempFileDataInit(returnFileArr[x], 'mod');
                }
            }
            //snackReq.settingTempFileDataInit(data.FR_FILE_NO, 'result');
            snackReq.global.snackData = data;

            var parameters = {
                snackInfoSn: $("#snackInfoSn").val()
            }
            const cardResult = customKendo.fn_customAjax("/snack/getCardList", parameters);
            const cardList = cardResult.list;

            /*if(cardList.length != 0){
                $("#corporCard").val(cardList[0].TR_NM);
                $("#cardSearch").prop("disabled", false);
            }*/

            for(let i=0; i<cardList.length; i++){
                const cardMap = cardList[i];

                const iBrenchResult = customKendo.fn_customAjax("/cam_mng/companyCard/useCardDetail", {
                    cardNo : cardMap.CARD_NO,
                    authDate : cardMap.AUTH_DD,
                    authNo : cardMap.AUTH_NO,
                    authTime : cardMap.AUTH_HH,
                    buySts : cardMap.BUY_STS
                });
                const e = iBrenchResult.cardInfo;

                if(e != null){
                    let html = '';
                    html += '<tr class="cardData">';
                    html += '    <input type="hidden" class="cardNo" value="'+e.CARD_NO+'" />';
                    html += '    <input type="hidden" class="fileNo" value="'+cardMap.fileNo+'" />';
                    html += '    <input type="hidden" class="authDate" value="'+e.AUTH_DD+'" />';
                    html += '    <input type="hidden" class="authNum" value="'+e.AUTH_NO+'" />';
                    html += '    <input type="hidden" class="authTime" value="'+e.AUTH_HH+'" />';
                    html += '    <input type="hidden" class="buySts" value="'+e.BUY_STS+'" />';

                    html += '    <td style="text-align: center"><input type="checkbox" name="card" style="position: relative; top: 2px"/></td>';
                    html += '    <td>'+e.AUTH_DD.substring(0, 4) + '-' + e.AUTH_DD.substring(4, 6) + '-' + e.AUTH_DD.substring(6, 8)+'</td>';
                    html += '    <td>'+e.AUTH_NO+'</td>';
                    html += '    <td>'+e.MER_NM+'</td>';
                    html += '    <td>'+e.MER_BIZNO.substring(0, 3) + '-' + e.MER_BIZNO.substring(3, 5) + '-' + e.MER_BIZNO.substring(5, 11)+'</td>';
                    html += '    <td>'+(e.TR_NM == undefined ? "" : e.TR_NM)+'</td>';
                    html += '    <td>'+e.CARD_NO.substring(0,4) + '-' + e.CARD_NO.substring(4,8) + '-' + e.CARD_NO.substring(8,12) + '-' + e.CARD_NO.substring(12,16)+'</td>';
                    html += '    <td class="auth-amt" style="text-align: right">'+fn_numberWithCommas(e.AUTH_AMT)+'</td>';
                    html += '</tr>';
                    $("#detailRow").append(html);
                }

                e.fileNo = cardMap.fileNo;
                snackReq.global.cardList.push(e);

                var fileNo = {
                    fileNo: e.fileNo
                };
                snackReq.global.fileNoArr.push(fileNo);
            }
        }else{

        }

        if($("#cardToSn").val() != ""){
            var cardParams = {
                cardToSn : $("#cardToSn").val()
            }

            var result = customKendo.fn_customAjax("/card/getCardToInfo", cardParams);

            var rs = result.cardInfo;

            $("#useDt").val(rs.CARD_TO_DE);
            $("#userSn").val(rs.USE_EMP_SEQ);
            $("#userText").val(rs.USE_EMP_NAME);
            let chargeUserDataSource = []
            chargeUserDataSource.push({text: rs.USE_EMP_NAME, value: rs.USE_EMP_SEQ});
            customKendo.fn_dropDownList("chargeUser", chargeUserDataSource, "text", "value", 2);
            $("#chargeUser").data("kendoDropDownList").enable(true);

            $("#payType").data("kendoDropDownList").select(2);
            $("#cardHistoryDisplay").css("display", "");
            $("#corporCard").prop("disabled", true);
            $("#usAmount").prop("disabled", true);

            $("#cardBaNb").val(rs.CARD_BA_NB);
            $("#corporCard").val(rs.TR_NM);
            console.log(result);
        }

    },

    settingTempFileDataInit : function(e, p){
        var html = '';
        fCommon.global.attFiles.push(e);

        if(p == "result"){
            if(e.file_no > 0){
                $(".defultTr").hide();
                $(".resultTh").hide();
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e.file_path+e.file_uuid+'\', \''+e.file_org_name+'.'+e.file_ext+'\')">'+ e.file_org_name +'</span></td>';
                html += '   <td>'+ e.file_ext +'</td>';
                html += '   <td>'+ e.file_size +'</td>';
                html += '   <td>';
                /*if(e.file_ext.toLowerCase() == "pdf" || e.file_ext.toLowerCase() == "jpg" || e.file_ext.toLowerCase() == "png" || e.file_ext.toLowerCase() == "jpeg"){
                }*/
                html += '<input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ e.file_path +'\', \''+ e.file_uuid +'\')">'
                html += '   </td>';
                html += '</tr>';
                $("#fileGrid").append(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        } else {
            if(e.file_no > 0){
                $(".defultTr").hide();
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e.file_path+e.file_uuid+'\', \''+e.file_org_name+'.'+e.file_ext+'\')">'+ e.file_org_name +'</span></td>';
                html += '   <td>'+ e.file_ext +'</td>';
                html += '   <td>'+ e.file_size +'</td>';
                html += '   <td>';
                /*if(e.file_ext.toLowerCase() == "pdf" || e.file_ext.toLowerCase() == "jpg" || e.file_ext.toLowerCase() == "png" || e.file_ext.toLowerCase() == "jpeg"){
                }*/
                html += '<input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ e.file_path +'\', \''+ e.file_uuid +'\')">'
                html += '   <td>';
                html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e.file_no +', this)">' +
                    '			<span class="k-button-text">삭제</span>' +
                    '		</button>';
                html += '   </td>';
                html += '</tr>';
                $("#fileGrid").append(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }



    },

    saveBtn: function() {
        //로그인 사원seq
        let empSeq = $("#regEmpSeq").val();
        let empName = $("#regEmpName").val();
        let regDeptName = $("#regDeptName").val();
        let regTeamName = $("#regTeamName").val();

        //폼 데이터
        let useDt = $("#useDt").val();
        /*let useHour = $("#useHour").val();
        let useMin = $("#useMin").val();*/
        let snackType = $("#snackType").val();
        let snackTypeText = $("#snackType").data("kendoDropDownList").text();
        let userSn = $("#userSn").val();
        let userText = $("#userText").val();
        let payType = $("#payType").val();
        let payTypeText = $("#payType").data("kendoDropDownList").text();
        let chargeUser = $("#chargeUser").val();
        let chargeUserText = $("#chargeUser").data("kendoDropDownList").text();
        let areaSn = 1;
        let areaName = $("#areaName").val();
        let usAmount = $("#usAmount").val().replace(/,/g, "").replace(/(^0+)/, "");
        let useReason = $("#useReason").val();
        let amtUserArr = new Array();
        let checkAmt = 0;
        let status = 100;
        let cardText = $("#corporCard").val();
        let cardSn = $("#cardBaNb").val()

        $.each($('.addData'), function(i, v){
            let empSeq = $(v).find('.amtEmpSeq').val();

            let amtInfo = {
                amtEmpSeq					: $(v).find('.amtEmpSeq').val(),
                amtEmpName			     	: $(v).find('.amtEmpName').text(),
                amt         				: $(v).find('#amt'+empSeq).val().replace(/,/g, "").replace(/(^0+)/, "") == '' ? 0 : $(v).find('#amt'+empSeq).val().replace(/,/g, "").replace(/(^0+)/, "")
            }
            amtUserArr.push(amtInfo);
            checkAmt += Number($(v).find('#amt'+empSeq).val().replace(/,/g, "").replace(/(^0+)/, ""));
        });

        /*if(checkAmt != usAmount){
            alert("이용금액을 정확하게 기입해주세요.");
            return;
        }*/
        if(useDt == "") {
            alert("이용일시가 작성되지 않았습니다.");
            return;
        }
        /*if(useHour >= 24) {
            alert("이용시간이 잘못 기입되었습니다.");
            return;
        }
        if(useMin >= 60) {
            alert("이용시간이 잘못 기입되었습니다.");
            return;
        }*/
        if(snackType == "") {
            alert("식대구분이 선택되지 않았습니다.");
            return;
        }
        if(chargeUser == "") {
            alert("거래확인서류 수령자를 선택하지 않았습니다.");
            return;
        }
        if(cardSn == "") {
            alert("카드가 선택되지 않았습니다.");
            return;
        }
        if(areaName == "") {
            alert("주문처가 작성되지 않았습니다.");
            return;
        }
        if(usAmount == "") {
            alert("이용금액이 작성되지 않았습니다.");
            return;
        }
        if(useReason == "") {
            alert("이용사유가 작성되지 않았습니다.");
            return;
        }

        if((snackReq.global.attFiles.length + snackReq.global.addAttFiles.length + fCommon.global.attFiles.length) < 1) {
            alert("영수증이 첨부되지 않았습니다.");
            return;
        }

        /*if(fCommon.global.attFiles.length >= 2) {
            alert("영수증 파일은 1개만 첨부 가능합니다.");
            return;
        }*/

        var formData = new FormData();
        if($("#snackInfoSn").val() != null && $("#snackInfoSn").val() != ""){
            formData.append("snackInfoSn", $("#snackInfoSn").val());
        }
        formData.append("menuCd", "snack");
        formData.append("empSeq", empSeq);
        formData.append("empName", empName);
        formData.append("regDeptName", regDeptName);
        formData.append("regTeamName", regTeamName);
        formData.append("useDt", useDt);
        /*formData.append("useHour", useHour);
        formData.append("useMin", useMin);*/
        formData.append("snackType", snackType);
        formData.append("snackTypeText", snackTypeText);
        formData.append("chargeUser", chargeUser);
        formData.append("chargeUserText", chargeUserText);
        formData.append("payType", payType);
        formData.append("payTypeText", payTypeText);
        formData.append("areaSn", areaSn);
        formData.append("areaName", areaName);
        formData.append("usAmount", usAmount);
        formData.append("useReason", useReason);
        formData.append("userSn", userSn);
        formData.append("userText", userText);
        formData.append("amtUser", JSON.stringify(amtUserArr));

        formData.append("status", status);

        formData.append("cardText", cardText);
        formData.append("cardSn", cardSn);

        if($("#cardToSn").val() != ""){
            formData.append("cardToSn", $("#cardToSn").val());
        }

        //증빙파일 첨부파일
        if(snackReq.global.addAttFiles != null){
            for(var i = 0; i < snackReq.global.addAttFiles.length; i++){
                formData.append("snackFile", snackReq.global.addAttFiles[i]);
            }
        }

        var fileNoArr = [];

        /** Ibrench 선택 내역 */
        let cardArr = [];
        $.each($(".cardData"), function(i, v){
            const cardData = {};
            const cardNo = $(v).find('.cardNo').val();
            const authDate = $(v).find('.authDate').val();
            const authNum = $(v).find('.authNum').val();
            const fileNo = $(v).find('.fileNo').val();
            const authTime = $(v).find('.authTime').val();
            const buySts = $(v).find('.buySts').val();

            cardData.cardNo = cardNo;
            cardData.authDate = authDate;
            cardData.authNum = authNum;
            cardData.fileNo = fileNo;
            cardData.authTime = authTime;
            cardData.buySts = buySts;
            cardData.trNm = $("#corporCard").val();

            fileNoArr.push(fileNo);
            cardArr.push(cardData);
        });

        formData.append("fileNo", fileNoArr.join(","));

        if(cardArr.length != 0){
            formData.append("cardArr", JSON.stringify(cardArr));
        }

        if($("#snackInfoSn").val() == "") {
            if(!confirm("식대 사용 내역을 등록 하시겠습니까?")){
                return;
            }
            snackReq.setSnackInsert(formData);
        }else {
            if(!confirm("식대 사용 내역을 수정 하시겠습니까?")){
                return;
            }
            snackReq.setSnackInsert(formData);
        }
    },

    uptBtn: function(){
        snackReq.enableSetting(true);

        $(".btn-A").hide();
        $(".btn-B").show();
        snackReq.settingTempFileDataInit(snackReq.global.snackData);
    },

    setSnackInsert: function(formData){
        $.ajax({
            url : "/inside/setSnackInsert",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(result){
                alert("식대 사용 등록 저장이 완료되었습니다.");
                if(result.params.snackInfoSn != null){
                    location.href="/Inside/pop/snackPop?snackInfoSn=" + result.params.snackInfoSn;
                }
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                //window.close();
            }
        });
    },

    fn_snackCertReq: function(status){
        var data = {
            snackInfoSn : $("#snackInfoSn").val(),
            empSeq : $("#empSeq").val(),
            status : status
        }

        var result = customKendo.fn_customAjax("/inside/setSnackReqCert", data);

        if(result.flag){
            alert("승인 요청이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }
    },

    enableSetting: function(boolean){
        /*$("#useHour").data("kendoTextBox").enable(boolean);
        $("#useMin").data("kendoTextBox").enable(boolean);*/
        $("#userText").data("kendoTextBox").enable(boolean);
        $("#corporCard").data("kendoTextBox").enable(boolean);
        $("#areaName").data("kendoTextBox").enable(boolean);
        $("#usAmount").data("kendoTextBox").enable(boolean);
        $("#useReason").data("kendoTextBox").enable(boolean);

        $("#useDt").data("kendoDatePicker").enable(boolean);

        $("#snackType").data("kendoDropDownList").enable(boolean);
        $("#payType").data("kendoDropDownList").enable(boolean);
        $("#chargeUser").data("kendoDropDownList").enable(boolean);

        $("#userMultiSelect").attr("disabled", !boolean);
        $("#cardSearch").attr("disabled", !boolean);
        $("#restaurantSearch").attr("disabled", !boolean);
        $("#file").attr("disabled", !boolean);
    },

    snackPrintPop : function() {
        var url = "/Inside/pop/snackPrintPop.do?snackInfoSn="+$("#snackInfoSn").val();
        var name = "snackPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    fn_contentMod : function(){
        location.href="/Inside/pop/snackPop.do?snackInfoSn=" + $("#snackInfoSn").val() + "&mode=mod";
    },

    splitBill: function(){
        fn_inputNumberFormat(this);
        if(this.value == ""){
            this.value = 0;
        }

        if(this.value == ""){
            this.value = 0;
        }

        let userArr = snackReq.global.userArr;

        let money = this.value.replace(/,/g, "").replace(/(^0+)/, "");
        let count = snackReq.global.userArr.length;

        let chargeUser = $("#chargeUser").val() == '' ? userArr[0].empSeq : $("#chargeUser").val();

        for(let i=0; i<userArr.length; i++){
            let amt = Math.floor(money/count);
            let more = Math.floor(money%count);
            if(userArr[i].empSeq == chargeUser){
                $("#amt"+userArr[i].empSeq).val(fn_numberWithCommas(amt+more));
            }else{
                $("#amt"+userArr[i].empSeq).val(fn_numberWithCommas(amt));
            }
        }
    },

    splitBill2: function(e){
        fn_inputNumberFormat(this);

        let userArr = snackReq.global.userArr;
        let money = e;
        let count = snackReq.global.userArr.length;

        let chargeUser = $("#chargeUser").val() == '' ? userArr[0].empSeq : $("#chargeUser").val();

        for(let i= 0; i<userArr.length; i++){
            let amt = Math.floor(money/count);
            let more = Math.floor(money%count);
            if(userArr[i].empSeq == chargeUser){
                $("#amt"+userArr[i].empSeq).val(fn_numberWithCommas(amt+more));
            }else{
                $("#amt"+userArr[i].empSeq).val(fn_numberWithCommas(amt));
            }
        }
    },

    userDataSet2 : function(userArr) {
        console.log(userArr);
        snackReq.global.userArr = userArr;
        snackReq.global.userArr = snackReq.global.userArr.slice(0);

        let userText = "";
        let userSn = "";
        for(let i=0; i<userArr.length; i++) {
            if(userText != "") {
                userText += ", ";
                userSn += ",";
            }
            userText += userArr[i].empName;
            userSn += userArr[i].empSeq;
        }
        $("#userText").val(userText);
        $("#userSn").val(userSn);

        let html = "";
        html += "<table>";
        for(let i=0; i<userArr.length; i++){
            html += "<tr class='addData'>";
            html += "<input type='hidden' class='amtEmpSeq' value='"+userArr[i].empSeq+"'/>";
            html += "<th class='amtEmpName'>"+userArr[i].empName+"</th>";
            html += "<td><input type='text' id='amt"+userArr[i].empSeq+"' style='width: 80%; text-align: right' class='amt' oninput='onlyNumber(this);'/> 원</td>";
            html += "</tr>";
        }
        html += "</table>";
        $("#amtTd").html(html);
        $("#amtTd .amt").kendoTextBox();
        $("#amtTr").hide();

        customKendo.fn_dropDownList("chargeUser", userArr, "empName", "empSeq", 2);
        $("#chargeUser").data("kendoDropDownList").enable(true);
    },

    fn_paymentCardHistory : function (e){
        var cardNameFlag = $("#corporCard").val();

        var payType = $("#payType").val();

        if(e != "" && e != null){
            if(cardNameFlag == ''){
                alert("조회할 카드를 선택 후 추가하십시요.");
                return false;
            }

            payType = e;
        }

        var url = "/mng/pop/paymentCardHistory.do?type=3&index=2&reqType=snack&requestType=" + payType + "&cardBaNb=" + $("#cardBaNb").val();

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
    },

    fn_changePayType : function (e){
        if(e != ''){
            $("#cardSearch").prop("disabled", false);
            $("#corporCard").val("");
            $("#cardBaNb").val("");

            if(e == 2){
                $("#cardHistoryDisplay").css("display", "");
                $("#corporCard").prop("disabled", true);
                $("#usAmount").prop("disabled", true);
            }else{
                $("#cardHistoryDisplay").css("display", "none");
                $("#corporCard").prop("disabled", true);
                $("#usAmount").prop("disabled", false);
            }
        }

    },

    fn_tempFileSet : function (arr){
        snackReq.global.attFiles = arr;
        snackReq.addFileInfoTable();
    },

    addFileInfoTable : function(){
        var diffSize = snackReq.global.attFiles.length;
        let size = 0;
        for(var x = 0; x < $("input[name='fileList']")[0].files.length; x++){
            snackReq.global.addAttFiles.push($("input[name='fileList']")[0].files[x]);
        }

        if(snackReq.global.attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < snackReq.global.attFiles.length; i++) {

                if(snackReq.global.attFiles[i].fileOrgName != null) {
                    size = snackReq.bytesToKB(snackReq.global.attFiles[i].fileSize);
                    html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                    html += '   <td>' + snackReq.global.attFiles[i].fileOrgName + ' <span style="color: dodgerblue;">[영수증 파일]</span></td>';
                    html += '   <td>' + snackReq.global.attFiles[i].fileExt + '</td>';
                    html += '   <td>' + size + '</td>';
                    html += '   <td>';
                    /*if(snackReq.global.attFiles[i].fileExt.toLowerCase() == "pdf" || snackReq.global.attFiles[i].fileExt.toLowerCase() == "jpg" || snackReq.global.attFiles[i].fileExt.toLowerCase() == "png" || snackReq.global.attFiles[i].fileExt.toLowerCase() == "jpeg"){
                    }*/
                    html += '<input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ snackReq.global.attFiles[i].filePath +'\', \''+ snackReq.global.attFiles[i].fileUuid +'\')">'
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="snackReq.commonFileDel(' + snackReq.global.attFiles[i].fileNo + ', this, '+ i +')">';
                    html += '   </td>';
                    html += '</tr>';
                }
            }

            $("#fileGrid").append(html);
        }

        if(snackReq.global.addAttFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();

            var html = '';
            for (var j = 0; j < snackReq.global.addAttFiles.length; j++) {
                size = snackReq.bytesToKB(snackReq.global.addAttFiles[j].size);
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile'+ (diffSize + j)+'">';
                html += '   <td>' + snackReq.global.addAttFiles[j].name.split(".")[0] + '</td>';
                html += '   <td>' + snackReq.global.addAttFiles[j].name.split(".")[1] + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td></td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="snackReq.fnUploadFile(' + (diffSize + j) + ', this, '+ j +')">';
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }
    },

    fnUploadFile : function(e, v, inx) {
        $(v).closest("tr").remove();
        snackReq.global.addAttFiles.splice(inx, 1);

        if($("#fileGrid").find("tr").length == 0){
            $("#fileGrid").html('<tr class="defultTr">' +
                '	<td colspan="5" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>' +
                '</tr>');
        }
        console.log(snackReq.global.attFiles);
        console.log(snackReq.global.addAttFiles);
    },

    commonFileDel: function(e, v, inx){
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
                        $(v).closest("tr").remove();
                        snackReq.global.attFiles.splice(inx, 1);
                        if($("#fileGrid").find("tr").length == 0){
                            $("#fileGrid").html('<tr class="defultTr">' +
                                '	<td colspan="5" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>' +
                                '</tr>');
                        }
                    }
                }
            });
        }

        console.log(snackReq.global.attFiles);
        console.log(snackReq.global.addAttFiles);
    },

    bytesToKB : function (bytes) {
        const sizes = ['KB'];
        if (bytes === 0) return '0 KB';

        const kilobytes = bytes / 1024;
        return `${kilobytes.toFixed(2)} KB`;
    },

    fileViewer : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var hostUrl = "";
        if($(location).attr("host").split(":")[0].indexOf("218.158.231.184") > -1 || $(location).attr("host").split(":")[0].indexOf("new.camtic.or.kr") > -1){
            hostUrl = "http://218.158.231.184";
        } else {
            hostUrl = "http://218.158.231.186";
        }
        var popup = window.open(hostUrl + path, name, option);
    },

    snackExnpFormDown : function (){
        snackReq.loading();
        snackReq.global.hwpCtrl.PutFieldText("useDate", $("#useDt").val());
        snackReq.global.hwpCtrl.PutFieldText("useType", $("#snackType").data("kendoDropDownList").text());
        snackReq.global.hwpCtrl.PutFieldText("useName", $("#userText").val());
        snackReq.global.hwpCtrl.PutFieldText("useMoney", uncomma($("#usAmount").val()));
        snackReq.global.hwpCtrl.MoveToField("useTarget", true, true, false);
        snackReq.global.hwpCtrl.SetTextFile($("#useReason").val().replaceAll("\n", "<br>"), "html","insertfile");

        setTimeout(function() {
            snackReq.global.hwpCtrl.SaveAs(snackReq.global.fileTitle, "hwp", "download:true");
            $.LoadingOverlay("hide", {});
        }, 3000);
        /*var protocol = window.location.protocol + "//";
        var locationHost = protocol + window.location.host;

        var filePath = "/upload/templateForm/snackExnpForm.hwp";

        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent('식대지출증빙양식.hwp'),
        });*/
    },

    fn_multiDownload : function (){
        var fileArray = snackReq.global.fileArray;

        if(fileArray.length > 0){
            for(let i=0; i<fileArray.length; i++){
                fileDown(fileArray[i].file_path+fileArray[i].file_uuid, fileArray[i].file_org_name+'.'+fileArray[i].file_ext);
            }
        }
    },
}

function userDataSet(userArr) {
    console.log(userArr);
    snackReq.global.userArr = userArr;

    let userText = "";
    let userSn = "";
    for(let i=0; i<userArr.length; i++) {
        if(userText != "") {
            userText += ", ";
            userSn += ",";
        }
        userText += userArr[i].empName;
        userSn += userArr[i].empSeq;
    }
    $("#userText").val(userText);
    $("#userSn").val(userSn);

    let html = "";
    html += "<table>";
    for(let i=0; i<userArr.length; i++){
        html += "<tr class='addData'>";
        html += "<input type='hidden' class='amtEmpSeq' value='"+userArr[i].empSeq+"'/>";
        html += "<th class='amtEmpName'>"+userArr[i].empName+"</th>";
        html += "<td><input type='text' id='amt"+userArr[i].empSeq+"' style='width: 80%; text-align: right' class='amt' oninput='onlyNumber(this);'/> 원</td>";
        html += "</tr>";
    }
    html += "</table>";
    $("#amtTd").html(html);
    $("#amtTd .amt").kendoTextBox();
    $("#amtTr").hide();

    customKendo.fn_dropDownList("chargeUser", userArr, "empName", "empSeq", 3);
    $("#chargeUser").data("kendoDropDownList").enable(true);
}
