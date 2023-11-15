var snackReq = {
    global: {
        userArr: [],
        snackData: {}
    },

    init: function() {
        snackReq.dataSet(snackData);
    },

    dataSet: function(snackData) {
        customKendo.fn_textBox(["useHour", "useMin", "userText", "corporCard", "areaName", "usAmount", "useReason"]);
        customKendo.fn_datePicker("useDt", 'month', "yyyy-MM-dd", new Date());
        let snackTypeDataSource = [
            {text: "야간 식대", value: "1"},
            {text: "휴일 식대", value: "2"},
            {text: "평일 식대", value: "3"}
        ]
        customKendo.fn_dropDownList("snackType", snackTypeDataSource, "text", "value", 2);
        let payTypeDataSource = [
            {text: "개인", value: "1"},
            {text: "법인", value: "2"},
            {text: "외상", value: "3"}
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
            $("#useHour").val(data.USE_TIME.split(':')[0]);
            $("#useMin").val(data.USE_TIME.split(':')[1]);
            $("#snackType").data("kendoDropDownList").value(data.SNACK_TYPE);
            $("#userSn").val(data.USER_SN);
            $("#userText").val(data.USER_TEXT);
            $("#payType").data("kendoDropDownList").value(data.PAY_TYPE);
            $("#areaName").val(data.AREA_NAME);
            $("#usAmount").val(data.AMOUNT_SN.toString().toMoney());
            $("#useReason").val(data.USE_REASON);

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

            snackReq.settingTempFileDataInit(data, 'result');
            snackReq.global.snackData = data;
        }
    },

    settingTempFileDataInit : function(e, p){
        var html = '';
        fCommon.global.attFiles.push(e);

        if(p == "result"){
            if(e.file_no > 0){
                $(".resultTh").hide();
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e.file_path+e.file_uuid+'\', \''+e.file_org_name+'.'+e.file_ext+'\')">'+ e.file_org_name +'</span></td>';
                html += '   <td>'+ e.file_ext +'</td>';
                html += '   <td>'+ e.file_size +'</td>';
                html += '</tr>';
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="3" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        } else {
            if(e.file_no > 0){
                $(".resultTh").show();
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e.file_path+e.file_uuid+'\', \''+e.file_org_name+'.'+e.file_ext+'\')">'+ e.file_org_name +'</span></td>';
                html += '   <td>'+ e.file_ext +'</td>';
                html += '   <td>'+ e.file_size +'</td>';
                html += '   <td>';
                html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e.file_no +', this)">' +
                    '			<span class="k-button-text">삭제</span>' +
                    '		</button>';
                html += '   </td>';
                html += '</tr>';
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
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
        let useHour = $("#useHour").val();
        let useMin = $("#useMin").val();
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
        $.each($('.addData'), function(i, v){
            let empSeq = $(v).find('.amtEmpSeq').val();
            let amtInfo = {
                amtEmpSeq					: $(v).find('.amtEmpSeq').val(),
                amtEmpName			     	: $(v).find('.amtEmpName').text(),
                amt         				: $(v).find('#amt'+empSeq).val().replace(/,/g, "").replace(/(^0+)/, "")
            }
            amtUserArr.push(amtInfo);
            checkAmt += Number($(v).find('#amt'+empSeq).val().replace(/,/g, "").replace(/(^0+)/, ""))
        });

        if(checkAmt != usAmount){
            alert("이용금액을 정확하게 기입해주세요.");
            return;
        }
        if(useDt == "" || useHour == "" || useMin == "") {
            alert("이용일시가 작성되지 않았습니다.");
            return;
        }
        if(useHour >= 24) {
            alert("이용시간이 잘못 기입되었습니다.");
            return;
        }
        if(useMin >= 60) {
            alert("이용시간이 잘못 기입되었습니다.");
            return;
        }
        if(snackTypeText == "") {
            alert("식대구분이 선택되지 않았습니다.");
            return;
        }
        if(chargeUser == "") {
            alert("거래확인서류 수령자를 선택하지 않았습니다.");
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

        if(fCommon.global.attFiles.length < 1) {
            alert("영수증이 첨부되지 않았습니다.");
            return;
        }

        if(fCommon.global.attFiles.length >= 2) {
            alert("영수증 파일은 1개만 첨부 가능합니다.");
            return;
        }

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
        formData.append("useHour", useHour);
        formData.append("useMin", useMin);
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

        //증빙파일 첨부파일
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("snackFile", fCommon.global.attFiles[i]);
            }
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
                console.log(result);
                alert("식대 사용 등록 저장이 완료되었습니다.");
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
        $("#useHour").data("kendoTextBox").enable(boolean);
        $("#useMin").data("kendoTextBox").enable(boolean);
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
    }
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
