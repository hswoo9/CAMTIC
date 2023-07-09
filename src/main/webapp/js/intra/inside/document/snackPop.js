var snackReq = {

    init: function() {
        snackReq.dataSet();
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
            payType : payType,
            payTypeText : payTypeText,
            areaSn : areaSn,
            areaName : areaName,
            usAmount : usAmount,
            useReason : useReason
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

    dataSet: function() {
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

        $("#useDt, #userText").data("kendoDatePicker").readOnly();
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
        userText += userArr[i].approveEmpName;
        userSn += userArr[i].approveEmpSeq;
    }
    $("#userText").val(userText);
    $("#userSn").val(userSn);

    customKendo.fn_dropDownList("chargeUser", userArr, "approveEmpName", "approveEmpSeq", 2);
    $("#chargeUser").data("kendoDropDownList").enable(false);
    $("#chargeUser").data("kendoDropDownList").enable(true);
}
