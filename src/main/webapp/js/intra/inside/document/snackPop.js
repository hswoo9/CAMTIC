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
        let areaSn = $("#areaSn").val();
        let areaName = $("#areaName").val();
        let usAmount = $("#usAmount").val();
        let useReason = $("#useReason").val();

        if(useDt == "" || useHour == "" || useMin == "") {
            alert("이용일시가 작성되지 않았습니다.");
            return;
        }
        if(snackTypeText == "") {
            alert("식대구분이 선택되지 않았습니다.");
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
        customKendo.fn_textBox(["useHour", "useMin", "user", "recipient", "corporCard", "areaName", "usAmount", "useReason"]);

        $("#useDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#snackType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "야간 간식", value: "1"},
                {text: "휴일 식대", value: "2"},
                {text: "평일 식대", value: "3"}
            ],
            index: 0
        });

        $("#UseReason").kendoTextBox();

        $("#payDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "개인", value: "개인"},
                {text: "법인", value: "법인"},
                {text: "외상", value: "외상"}
            ],
            index: 0
        });

        $("#useDt").data("kendoDatePicker").readOnly();
    }
}

