var carReq = {
    init: function(){
        carReq.dataSet(carData);
    },

    dataSet: function(carData){
        customKendo.fn_textBox(["carTitle", "visit", "waypoint", "empName", "emergencyName", "emergencyTel"]);
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("applyDt", '', "yyyy-MM-dd", new Date());
        let carArr = [
            {text: "카니발", value: "1"},
            {text: "아반떼", value: "5"},
            {text: "트럭", value: "3"},
            {text: "자가", value: "10"},
            {text: "대중교통", value: "0"},
            {text: "모하비", value: "12"},
            {text: "솔라티", value: "13"},
            {text: "드론관제차량", value: "14"}
        ]
        customKendo.fn_dropDownList("carClass", carArr, "text", "value", 2);
        let carTypeArr = [
            {text: "업무용", value: "1"},
            {text: "개인 사유", value: "2"}
        ]
        customKendo.fn_dropDownList("carType", carTypeArr, "text", "value", 2);
        $("#carType").data("kendoDropDownList").bind("change", carReq.fn_toggleEmergency)
        $("#startTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "09:00"});
        $("#endTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "18:00"});
        fn_onlyDeptSetting(2);

        if(!isNaN(carData.CAR_REQ_SN)) {
            let data = carData;
            $("#startDt").val(data.START_DT);
            $("#endDt").val(data.END_DT);
            $("#startTime").val(data.START_TIME);
            $("#endTime").val(data.END_TIME);
            $("#dept").data("kendoDropDownList").value(data.USE_DEPT_SEQ);
            $("#carClass").data("kendoDropDownList").value(data.CAR_CLASS_SN);
            $("#carType").data("kendoDropDownList").value(data.CAR_TYPE_SN);
            $("#carTitle").val(data.CAR_TITLE_NAME);
            $("#visit").val(data.VISIT_NAME);
            $("#waypoint").val(data.WAY_POINT_NAME);
            $("#empSeq").val(data.EMP_SEQ);
            $("#empName").val(data.EMP_NAME);
            carReq.fn_toggleEmergency();
            if(carType == 2) {
                $("#emergencyName").val(data.EMERGENCY_NAME);
                $("#emergencyTel").val(data.EMERGENCY_TEL);
            }
        }
    },

    saveBtn: function(){
        let carReqSn = $("#carReqSn").val();
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let useDeptSeq = $("#dept").val();
        let useDeptName = $("#dept").data("kendoDropDownList").text();
        let carClassSn = $("#carClass").val();
        let carClassText = $("#carClass").data("kendoDropDownList").text();
        let carTypeSn = $("#carType").val();
        let carTypeText = $("#carType").data("kendoDropDownList").text();
        let carTitle = $("#carTitle").val();
        let visit = $("#visit").val();
        let waypoint = $("#waypoint").val();
        let empSeq = $("#empSeq").val();
        let empName = $("#empName").val();
        let emergencyName = $("#emergencyName").val();
        let emergencyTel = $("#emergencyTel").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        if(startDt == ""||endDt == ""){ alert("운행일시가 작성되지 않았습니다."); return;}
        if(useDeptSeq == ""){ alert("사용부서가 선택되지 않았습니다."); return;}
        if(carClassSn == ""){ alert("사용차량이 선택되지 않았습니다."); return;}
        if(carTypeSn == ""){ alert("운행구분 선택되지 않았습니다."); return;}
        if(empSeq == ""){ alert("운행자 선택되지 않았습니다."); return;}
        if(carTypeSn == "2" && emergencyName == ""){ alert("비상연락처가 작성되지 않았습니다."); return;}
        if(carTypeSn == "2" && emergencyTel == ""){ alert("비상연락처가 작성되지 않았습니다."); return;}

        let data = {
            carReqSn : carReqSn,
            startDt : startDt,
            endDt : endDt,
            startTime : startTime,
            endTime : endTime,
            useDeptSeq : useDeptSeq,
            useDeptName : useDeptName,
            carClassSn : carClassSn,
            carClassText : carClassText,
            carTypeSn : carTypeSn,
            carTypeText : carTypeText,
            carTitleName : carTitle,
            visitName : visit,
            waypointName : waypoint,
            empSeq : empSeq,
            empName : empName,
            emergencyName : emergencyName,
            emergencyTel : emergencyTel,
            regEmpSeq : regEmpSeq,
            regEmpName : regEmpName
        }
        //중복체크
        let flag = carReq.searchDuplicateCar(data);

        if(flag) {
            if($("#carReqSn").val() == "") {
                if(!confirm("차량사용신청을 저장하시겠습니까?")){
                    return;
                }
                carReq.setCarRequestInsert(data);
            }else {
                if(!confirm("차량사용신청을 수정하시겠습니까?")){
                    return;
                }
                carReq.setCarRequestUpdate(data);
            }
        }

    },

    searchDuplicateCar: function(data){
        $.ajax({
            url : "/bustrip/searchDuplicateCar",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                if(result.flag == "true") {
                    //let flag = false;
                    let duplicateText = "";
                    for(let i = 0; i < result.list.length; i++) {
                        //if(result.list[i].EMP_NAME != $("#regEmpName").val()) {
                            if(i != 0) {
                                duplicateText += ", ";
                            }
                            duplicateText += result.list[i].EMP_NAME;
                            //flag = true;
                        //}
                    }
                    //if(flag) {
                        alert("선택하신 출장기간(시간)에 "+duplicateText+"님께서 사용등록 하셨습니다.");
                        return false;
                    //}else {
                    //    return flag;
                    //}
                }else {
                    return true;
                }
            },
            error : function() {
                alert("운행일시 중복 조회 중 오류가 발생했습니다. 관리자에게 문의 바랍니다.");
                return false;
            }
        });
    },

    setCarRequestInsert: function(data){
        console.log(data);
        $.ajax({
            url : "/bustrip/setCarRequestInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("차량 사용 신청이 완료되었습니다.");
                opener.gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setCarRequestUpdate: function(data){
        $.ajax({
            url : "/bustrip/setCarRequestUpdate",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("차량 사용 신청이 완료되었습니다.");
                opener.gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    fn_toggleEmergency: function(){
        const carType = $("#carType").val();
        if(carType == 2) {
            $(".varTR").show();
        }else {
            $(".varTR").hide();
        }
    }
}

function gridReload(){
    $("#scheduler").data("kendoScheduler").dataSource.read();
}