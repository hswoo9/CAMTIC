var flag = false;
var roomReq = {
    init: function(){
        roomReq.dataSet(roomData);
    },

    dataSet: function(roomData){
        customKendo.fn_textBox(["etc", "pay", "empName", "name", "remarkCn"]);
        /*let saveRouteArr = [
            {text: "달력 화면", value: "달력 화면"},
            {text: "등록 화면", value: "등록 화면"}
        ]
        customKendo.fn_dropDownList("saveRoute", saveRouteArr, "text", "value", 2);*/
        let saveTypeArr = [
            {text: "기간 등록", value: "1"},
            {text: "일별 등록", value: "2"}
        ]
        customKendo.fn_dropDownList("saveType", saveTypeArr, "text", "value", 2);
        $("#saveType").data("kendoDropDownList").value(1);
        $("#saveType").data("kendoDropDownList").enable(false);
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", $("#startDt").val() == "" ? new Date() : $("#startDt").val());
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
        $("#startTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "09:00"});
        $("#endTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "18:00"});
        $("#startDt, #endDt, #applyDt, #empName, #startTime, #endTime, #name").attr("readonly", true);
        const roomArr = customKendo.fn_customAjax('/inside/getRoomCode').list;

        $("#roomClass").kendoMultiSelect({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: roomArr,
            filter: "contains",
            downArrow: true,
            placeholder: "선택하세요.",

        })
        // customKendo.fn_dropDownList("roomClass", roomArr, "text", "value", 1);
        let usePurposeArr = [
            {text: "교육 훈련", value: "1"},
            {text: "일반 회의", value: "4"},
            {text: "대관", value: "5"},
            {text: "기타", value: "0"}
        ]
        customKendo.fn_dropDownList("usePurpose", usePurposeArr, "text", "value", 2);
        /*$("#usePurpose").data("kendoDropDownList").bind("change", roomReq.fn_toggleUsePurpose)*/

        $("#exSpecificDay").kendoDropDownTree({
            placeholder: "해당없음",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "토요일 제외", expanded: true},
                {text: "일요일 제외", expanded: true}
            ]
        });

        $("#rentalFee").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: "" },
                {text: "유료", value: "0"},
                {text: "무료", value: "1"}
            ],
            index: 0
        });
        $("#rentalFee").data("kendoDropDownList").bind("change", roomReq.fn_toggleRentalFee)
    },

    saveBtn: function(){

        if(!confirm("회의실사용신청을 저장하시겠습니까?")){
            return;
        }

        var roomIdxArr = [];

        roomIdxArr = $("#roomClass").data("kendoMultiSelect").value();

        for(var i = 0; i < roomIdxArr.length; i++){
            /*let saveRoute = $("#saveRoute").val();*/
            let roomReqSn = $("#roomReqSn").val();
            let startDt = $("#startDt").val();
            let endDt = $("#endDt").val();
            let startTime = $("#startTime").val();
            let endTime = $("#endTime").val();
            let roomClassSn = roomIdxArr[i];
            let roomClassText = "";
            let usePurposeSn = $("#usePurpose").val();
            let usePurposeText = $("#usePurpose").data("kendoDropDownList").text();
            let etc = "";
            let rentalFeeSn = $("#rentalFee").val();
            let rentalFeeText = $("#rentalFee").data("kendoDropDownList").text();
            let pay = $("#pay").val();
            let empSeq = $("#empSeq").val();
            let empName = $("#empName").val();
            let remarkCn = $("#remarkCn").val();
            let regEmpSeq = $("#regEmpSeq").val();
            let regEmpName = $("#regEmpName").val();

            if(startDt == ""||endDt == ""){ alert("운행일시가 작성되지 않았습니다."); return;}
            if(roomClassSn == ""){ alert("사용회의실이 선택되지 않았습니다."); return;}
            if(usePurposeSn == ""){ alert("사용목적이 선택되지 않았습니다."); return;}
            if(rentalFeeSn == ""){ alert("대관료가 선택되지 않았습니다."); return;}
            if(empSeq == ""){ alert("사용 담당자가 선택되지 않았습니다."); return;}
            if(rentalFeeSn == "0" && pay == ""){ alert("대관료가 작성되지 않았습니다."); return;}

            let data = {
                roomReqSn : roomReqSn,
                startDt : startDt,
                endDt : endDt,
                startTime : startTime,
                endTime : endTime,
                roomClassSn : roomClassSn,
                roomClassText : roomClassText,
                usePurposeSn : usePurposeSn,
                usePurposeText : usePurposeText,
                etc : etc,
                rentalFeeSn : rentalFeeSn,
                rentalFeeText : rentalFeeText,
                pay : pay,
                empSeq : empSeq,
                empName : empName,
                remarkCn : remarkCn,
                regEmpSeq : regEmpSeq,
                regEmpName : regEmpName
            }
            roomReq.searchDuplicateRoom(data);

            if(!flag){
                break;
            }
        }

        for(var i = 0; i < roomIdxArr.length; i++){
            /*let saveRoute = $("#saveRoute").val();*/
            let roomReqSn = $("#roomReqSn").val();
            let startDt = $("#startDt").val();
            let endDt = $("#endDt").val();
            let startTime = $("#startTime").val();
            let endTime = $("#endTime").val();
            let roomClassSn = roomIdxArr[i];
            let roomClassText = "";
            let usePurposeSn = $("#usePurpose").val();
            let usePurposeText = $("#usePurpose").data("kendoDropDownList").text();
            let etc = "";
            let rentalFeeSn = $("#rentalFee").val();
            let rentalFeeText = $("#rentalFee").data("kendoDropDownList").text();
            let pay = $("#pay").val();
            let empSeq = $("#empSeq").val();
            let empName = $("#empName").val();
            let remarkCn = $("#remarkCn").val();
            let regEmpSeq = $("#regEmpSeq").val();
            let regEmpName = $("#regEmpName").val();

            if(startDt == ""||endDt == ""){ alert("운행일시가 작성되지 않았습니다."); return;}
            if(roomClassSn == ""){ alert("사용회의실이 선택되지 않았습니다."); return;}
            if(usePurposeSn == ""){ alert("사용목적이 선택되지 않았습니다."); return;}
            if(rentalFeeSn == ""){ alert("대관료가 선택되지 않았습니다."); return;}
            if(empSeq == ""){ alert("사용 담당자가 선택되지 않았습니다."); return;}
            if(rentalFeeSn == "0" && pay == ""){ alert("대관료가 작성되지 않았습니다."); return;}

            let data = {
                roomReqSn : roomReqSn,
                startDt : startDt,
                endDt : endDt,
                startTime : startTime,
                endTime : endTime,
                roomClassSn : roomClassSn,
                roomClassText : roomClassText,
                usePurposeSn : usePurposeSn,
                usePurposeText : usePurposeText,
                etc : etc,
                rentalFeeSn : rentalFeeSn,
                rentalFeeText : rentalFeeText,
                pay : pay,
                empSeq : empSeq,
                empName : empName,
                remarkCn : remarkCn,
                regEmpSeq : regEmpSeq,
                regEmpName : regEmpName
            }

            console.log(data);
            if(flag) {
                if($("#roomReqSn").val() == "") {
                    roomReq.setRoomRequestInsert(data);
                }else {
                    roomReq.setRoomRequestUpdate(data);
                }
            }
        }

        if(flag){
            alert("저장이 완료되었습니다.");
        }


    },

    searchDuplicateRoom: function(data){
        $.ajax({
            url : "/inside/searchDuplicateRoom",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                if(result.flag == "true") {
                    let duplicateText = "";
                    for(let i = 0; i < result.list.length; i++) {
                        if(i != 0) {
                            duplicateText += ", ";
                        }
                        duplicateText += result.list[i].EMP_NAME;
                    }
                    alert("선택하신 기간(시간)에 "+duplicateText+"님께서 사용등록 하셨습니다.");
                    flag = false;
                }else {
                    flag = true;
                }
            },
            error : function() {
                alert("회의실 신청 중복 조회 중 오류가 발생했습니다. 관리자에게 문의 바랍니다.");
                flag = false;
            }
        });
    },

    setRoomRequestInsert: function(data){
        $.ajax({
            url : "/inside/setRoomRequestInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                opener.gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setRoomRequestUpdate: function(data){

    },

    fn_toggleUsePurpose: function(){
        const usePurpose = $("#usePurpose").data("kendoDropDownList").value();
        if(usePurpose == "4") {
            $(".varUsePurpose").show();
        }else {
            $(".varUsePurpose").hide();
        }
    },

    fn_toggleRentalFee: function(){
        const rentalFee = $("#rentalFee").data("kendoDropDownList").value();
        if(rentalFee == "0") {
            $(".varRentalFee").show();
        }else {
            $(".varRentalFee").hide();
        }
    },

    exSpecificDayPopup : function(){
        var url = "/Inside/pop/exSpecificDayPop.do";
        var name = "특정일 제외 팝업";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    }
}

