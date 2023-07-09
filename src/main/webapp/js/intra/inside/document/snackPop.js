var snackReq = {

    init: function() {
        snackReq.dataSet(snackData);
    },

    saveBtn: function() {
        //로그인 사원seq
        let empSeq = $("#empSeq").val();
        let empName = $("#empName").val();

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
        let areaSn = $("#areaSn").val();
        let areaName = $("#areaName").val();
        let usAmount = $("#usAmount").val();
        let useReason = $("#useReason").val();

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

        let data = {
            empSeq : empSeq,
            empName : empName,
            useDt : useDt,
            useHour : useHour,
            useMin : useMin,
            snackType : snackType,
            snackTypeText : snackTypeText,
            chargeUser : chargeUser,
            chargeUserText : chargeUserText,
            payType : payType,
            payTypeText : payTypeText,
            areaSn : areaSn,
            areaName : areaName,
            usAmount : usAmount,
            useReason : useReason,
            userSn : userSn,
            userText : userText
        }

        if($("#snackInfoSn").val() == "") {
            if(!confirm("식대 사용 내역을 등록 하시겠습니까?")){
                return;
            }
            snackReq.setSnackInsert(data);
        }else {
            if(!confirm("식대 사용 내역을 수정 하시겠습니까?")){
                return;
            }
        }
    },

    uptBtn: function(){
        snackReq.enableSetting(true);

        $(".btn-A").hide();
        $(".btn-B").show();
    },

    setSnackInsert: function(data){
        $.ajax({
            url : "/inside/setSnackInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("식대 사용 등록 저장이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
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

    dataSet: function(snackData) {
        customKendo.fn_textBox(["useHour", "useMin", "userText", "corporCard", "areaName", "usAmount", "useReason"]);
        customKendo.fn_datePicker("useDt", 'month', "yyyy-MM-dd", new Date());
        let snackTypeDataSource = [
            {text: "야간 간식", value: "1"},
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

        //$("#useDt").data("kendoDatePicker").readonly(true);
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
            $("#usAmount").val(data.AMOUNT_SN);
            $("#useReason").val(data.USE_REASON);

            let userSn = snackData.USER_SN;
            let userSnArr = userSn.split(',');

            let userText = snackData.USER_TEXT;
            let userTextArr = userText.split(',');

            let userArr = [];
            /** 결재선 */
            for(let i=0; i<userSnArr.length; i++) {
                let data = {
                    empSeq: userSnArr[i],
                    empName: userTextArr[i]
                }
                userArr.push(data);
            }
            customKendo.fn_dropDownList("chargeUser", userArr, "empName", "empSeq", 2);;
            $("#chargeUser").data("kendoDropDownList").value(data.RECIPIENT_EMP_SEQ);
            snackReq.enableSetting(false);
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
    }
}

function userDataSet(userArr) {
    console.log(userArr);

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

    customKendo.fn_dropDownList("chargeUser", userArr, "empName", "empSeq", 2);;
    $("#chargeUser").data("kendoDropDownList").enable(true);
}
