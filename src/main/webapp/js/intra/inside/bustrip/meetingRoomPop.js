var flag = false;
var roomReq = {
    init: function(){
        roomReq.dataSet();

        if($("#roomReqSn").val()){
            roomReq.getRoomData();
        }
    },

    dataSet: function(){
        customKendo.fn_textBox(["etc", "pay", "empName", "name", "remarkCn"]);

        // let saveTypeArr = [
        //     {text: "기간 등록", value: "1"},
        //     {text: "일별 등록", value: "2"}
        // ]
        // customKendo.fn_dropDownList("saveType", saveTypeArr, "text", "value", 2);
        // $("#saveType").data("kendoDropDownList").value(1);
        // $("#saveType").data("kendoDropDownList").enable(false);

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
            autoClose: false,
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
            autoClose: false,
            enable : false,
            dataValueField: "value",
            dataTextField: "text"
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

    getRoomData : function(){
        const result = customKendo.fn_customAjax("/inside/getRoomRequest", {roomReqSn: $("#roomReqSn").val()});
        const data = result.data;

        if(data != null) {
            console.log(data);
            $("#startDt").val(data.START_DT);
            $("#endDt").val(data.END_DT);
            $("#startTime").val(data.START_TIME);
            $("#endTime").val(data.END_TIME);
            $("#roomClass").data("kendoMultiSelect").value(data.ROOM_CLASS_SN);
            $("#usePurpose").data("kendoDropDownList").value(data.USE_PURPOSE_SN);
            $("#rentalFee").data("kendoDropDownList").value(data.RENTAL_FEE_SN);
            $("#rentalFee").data("kendoDropDownList").trigger("change");
            $("#pay").val(data.PAY);
            $("#name").val(data.REG_EMP_NAME);
            $("#empName").val(data.MANAGER_NAME);
            $("#empSeq").val(data.MANAGER_SN);
            $("#remarkCn").val(data.REMARK_CN);
            roomReq.fn_buttonSet(data);
        }
    },


    saveBtn: function(){
        const startDt = $("#startDt").val();
        const endDt = $("#endDt").val();
        const startTime = $("#startTime").val();
        const endTime = $("#endTime").val();

        if(startDt > endDt){ alert("사용일시를 확인해주세요."); return;}
        if(startDt == endDt && startTime > endTime){ alert("사용일시를 확인해주세요."); return;}
        if($("#startDt").val() == "" || $("#endDt").val() == ""){
            alert("사용일시가 작성되지 않았습니다.");
            return;
        }else if($("#roomClass").data("kendoMultiSelect").value().length == "0"){
            alert("사용회의실이 선택되지 않았습니다.");
            return;
        }else if($("#usePurpose").val() == ""){
            alert("사용목적이 선택되지 않았습니다.");
            return;
        }else if($("#rentalFee").val() == "") {
            alert("대관료가 선택되지 않았습니다.");
            return;
        }else if($("#empSeq").val() == ""){
            alert("사용 담당자가 선택되지 않았습니다.");
            return;
        }else if($("#rentalFee").val() == "0" && $("#pay").val() == ""){
            alert("대관료가 작성되지 않았습니다.");
            return;
        }

        if(!confirm("회의실사용신청을 저장하시겠습니까?")){
            return;
        }

        /** 사용 회의실 리스트 */
        const dataList = roomReq.insertDataList();

        var result = customKendo.fn_customAjax("/inside/setRoomRequestInsert", {
            dataList : JSON.stringify(dataList)
        });

        if(result.flag){
            alert("저장이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else{
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    delBtn: function(){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        const data = {
            roomReqSn: $("#roomReqSn").val()
        }
        const result = customKendo.fn_customAjax("/inside/setRoomRequestDelete", data);
        if(result.flag){
            alert("삭제되었습니다.");
            opener.gridReload();
            window.close();
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

    fn_buttonSet : function(data){
        var buttonHtml = "";
        if(data != null){
            if(data.REG_EMP_SEQ == $("#regEmpSeq").val()){
                buttonHtml += "<button type=\"button\" id=\"roomDelBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"roomReq.delBtn();\">삭제</button>";
                buttonHtml += "<button type=\"button\" id=\"roomSaveBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"roomReq.saveBtn();\">저장</button>";
            } else {
                roomReq.fn_kendoUIEnableSet();
            }
        }else{
            buttonHtml += "<button type=\"button\" id=\"carSaveBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"roomReq.saveBtn()\">저장</button>";
        }
        buttonHtml += "<button type=\"button\" class=\"k-button k-button-solid-error\" style=\"margin-right:5px;\" onclick=\"window.close();\">닫기</button>";
        $("#roomBtn").html(buttonHtml);
    },

    fn_kendoUIEnableSet : function(){
        $(".k-multiselect").addClass("k-disabled");
        $(".k-dropdownlist").addClass("k-disabled");
        $(".k-input").addClass("k-disabled");
        $(".k-grid-button").addClass("k-disabled");
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
    },

    addExSpecificDay : function(){
        var startDt = new Date($("#startDt").val());
        var endDt = new Date($("#endDt").val());
        const diffDate = Math.abs((startDt.getTime() - endDt.getTime())/(1000 * 60 * 60 * 24));
        var otherArr = new kendo.data.HierarchicalDataSource({
            data : [{text: "일요일 제외", value : "noSun"}, {text: "토요일 제외", value : "noSat"}]
        })

        if(diffDate > 1){
            for(var i = 0; i < diffDate + 1; i++){
                var a = new Date($("#startDt").val());
                var date = new Date(a.setDate(a.getDate() + i));
                if(date.getDay() != "0" && date.getDay() != "6"){
                    otherArr.options.data.push({
                        text : date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "(" + roomReq.getDay(date.getDay()) + ")",
                        value : date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
                    })
                }
            }

            $("#exSpecificDay").data("kendoDropDownTree").setDataSource(otherArr);
            $("#exSpecificDay").data("kendoDropDownTree").enable(true);
        }else{
            $("#exSpecificDay").data("kendoDropDownTree").enable(false);
        }
    },

    getDay : function(dayNum){
        var dayKor = ['일', '월', '화', '수', '목', '금', '토'];
        return dayKor[dayNum];
    },

    insertDataList : function(){
        var dataArr = new Array();
        var roomIdxArr = $("#roomClass").data("kendoMultiSelect").value();
        var startDt = new Date($("#startDt").val());
        var endDt = new Date($("#endDt").val());
        var exSpecificDayVal = $("#exSpecificDay").data("kendoDropDownTree").value();

        for(var i = 0; i < roomIdxArr.length; i++){
            let roomClassSn = roomIdxArr[i];
            let roomClassText = "";

            const diffDate = Math.abs((startDt.getTime() - endDt.getTime())/(1000 * 60 * 60 * 24));

            if(diffDate > 0) {
                for (var j = 0; j < diffDate + 1; j++) {
                    var a = new Date($("#startDt").val());
                    var date = new Date(a.setDate(a.getDate() + j));

                    var isExcludedDate = !exSpecificDayVal.includes(date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
                    var isWeekend = date.getDay() === 0 || date.getDay() === 6;
                    var allowedWeekend = !exSpecificDayVal.includes("noSun") && date.getDay() === 0 || !exSpecificDayVal.includes("noSat") && date.getDay() === 6;

                    if(isExcludedDate && (isWeekend && allowedWeekend || !isWeekend)){
                        var data = roomReq.saveData();
                        data.startDt = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                        data.endDt = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
                        data.roomClassSn = roomClassSn;
                        data.roomClassText = roomClassText;
                        roomReq.searchDuplicateRoom(data);
                        if(!flag){
                            return;
                        }else{
                            dataArr.push(data);
                        }
                    }
                }
            }else{
                var data = roomReq.saveData();
                data.startDt = $("#startDt").val();
                data.endDt = $("#endDt").val();
                data.roomClassSn = String(roomClassSn);
                data.roomClassText = roomClassText;
                roomReq.searchDuplicateRoom(data);
                if(!flag){
                    return;
                }else{
                    dataArr.push(data);
                }
            }
        }
        if(!flag){
            return;
        }

        return dataArr;
    },

    saveData : function(){
        var e = {
            roomReqSn : $("#roomReqSn").val(),
            startTime : $("#startTime").val(),
            endTime : $("#endTime").val(),
            usePurposeSn : $("#usePurpose").val(),
            usePurposeText : $("#usePurpose").data("kendoDropDownList").text(),
            etc : "",
            rentalFeeSn : $("#rentalFee").val(),
            rentalFeeText : $("#rentalFee").data("kendoDropDownList").text(),
            pay : $("#pay").val(),
            empSeq : $("#empSeq").val(),
            empName : $("#empName").val(),
            remarkCn : $("#remarkCn").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val(),
        }

        return e;
    }
}

