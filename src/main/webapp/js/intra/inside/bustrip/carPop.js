var flag = false;
let carType = "A";
var carReq = {
    init: function(){
        carReq.pageSet();
        carReq.dataSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["carTitle", "visit", "waypoint", "empName", "emergencyName", "emergencyTel", "carClassRmk"]);
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", $("#startDt").val() == "" ? new Date() : $("#startDt").val());
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("applyDt", '', "yyyy-MM-dd", new Date());

        const carArr = customKendo.fn_customAjax('/inside/getCarCode', {deptSeq: $("#regDeptSeq").val()}).list;
        customKendo.fn_dropDownList("carClass", carArr, "text", "value", 1);
        $("#carClass").data("kendoDropDownList").bind("change", function(){
            if($("#carClass").data("kendoDropDownList").text() == "기타"){
                $("#inputWrap").show();
            } else {
                $("#inputWrap").hide();
            }
        })

        let carTypeArr = [
            {text: "업무용", value: "1"},
            {text: "개인 사유", value: "2"}
        ]
        customKendo.fn_dropDownList("carType", carTypeArr, "text", "value", 2);
        if($("#mode").val() == "drafting"){
            $("#carType").data("kendoDropDownList").value("2");
            $("#carType").data("kendoDropDownList").enable(false);
            carReq.fn_toggleEmergency();
        }
        $("#carType").data("kendoDropDownList").bind("change", carReq.fn_toggleEmergency)
        $("#startTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "09:00"});
        $("#endTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "18:00"});
        fn_onlyDeptSetting(2);
        $("#startDt, #endDt, #applyDt, #empName, #startTime, #endTime").attr("readonly", true);
    },

    dataSet: function(){
        const result = customKendo.fn_customAjax("/bustrip/getCarRequestInfo", {carReqSn: $("#carReqSn").val()});
        const data = result.data;

        if(data != null) {
            $("#startDt").val(data.START_DT);
            $("#endDt").val(data.END_DT);
            $("#startTime").val(data.START_TIME);
            $("#endTime").val(data.END_TIME);
            $("#dept").data("kendoDropDownList").value(data.USE_DEPT_SEQ);
            $("#carClass").data("kendoDropDownList").value(data.CAR_CLASS_SN);
            $("#carType").data("kendoDropDownList").value(data.CAR_TYPE_SN);
            $("#carClassRmk").val(data.CAR_CLASS_RMK);
            $("#carTitle").val(data.CAR_TITLE_NAME);
            $("#visit").val(data.VISIT_NAME);
            $("#waypoint").val(data.WAY_POINT_NAME);
            $("#empSeq").val(data.EMP_SEQ);
            $("#empName").val(data.EMP_NAME);
            carReq.fn_toggleEmergency();
            $("#emergencyName").val(data.EMERGENCY_NAME);
            $("#emergencyTel").val(data.EMERGENCY_TEL);
            carReq.fn_buttonSet(data);

            if($("#carClass").data("kendoDropDownList").text() == "기타"){
                $("#inputWrap").show();
            } else {
                $("#inputWrap").hide();
            }
        }
    },

    saveBtn: function(){
        let carReqSn = $("#carReqSn").val();
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let useDeptSeq = $("#dept").data("kendoDropDownList").value();
        let useDeptName = $("#dept").data("kendoDropDownList").text();
        let carClassSn = $("#carClass").data("kendoDropDownList").value();
        let carClassText = $("#carClass").data("kendoDropDownList").text();
        let carClassRmk = $("#carClassRmk").val();
        let carTypeSn = $("#carType").data("kendoDropDownList").value();
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

        if(startDt > endDt){ alert("운행일시를 확인해주세요."); return;}
        if(startDt == endDt && startTime > endTime){ alert("운행일시를 확인해주세요."); return;}
        if(startDt == ""||endDt == ""){ alert("운행일시가 작성되지 않았습니다."); return;}
        if(useDeptSeq == ""){ alert("사용부서가 선택되지 않았습니다."); return;}
        if(carClassSn == ""){ alert("사용차량이 선택되지 않았습니다."); return;}
        if(carClassText == "기타" && carClassRmk == ""){ alert("사용 차량이 입력되지 않았습니다."); return;}
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
            carClassRmk : carClassRmk,
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

        if(carClassText != "기타") {
            carReq.searchDuplicateCar(data);

            var chkData = customKendo.fn_customAjax("/inside/carRequestCheck", data).cnt;
            if(chkData > 0){
                alert("선택하신 일시에 해당 차량 신청건이 존재합니다");
                return false;
            }
        } else {
            flag = true;
        }

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
        let url = "/inside/searchDuplicateCar";
        let result = customKendo.fn_customAjax(url, data);

        /** true면 중복있음 false면 없음 */
        if(result.check == "true") {
            let duplicateText = "";
            let realCount = 0;
            for(let i = 0; i < result.list.length; i++) {
                if(data.type == "bustripReq" && data.regEmpSeq == result.list[i].EMP_SEQ){
                }else {
                    if(i != 0) {
                        duplicateText += ", ";
                    }
                    duplicateText += result.list[i].EMP_NAME;
                    realCount += 1;
                }
            }
            if(realCount == 0){
                carType = "B";
            }
            if(!flag && data.type != "bustripReq"){
                alert("선택하신 출장기간(시간)에 "+duplicateText+"님께서 사용등록 하셨습니다.");
            }
            if(!flag && carType == "A" && data.type == "bustripReq"){
                alert("선택하신 출장기간(시간)에 "+duplicateText+"님께서 사용등록 하셨습니다.");
            }
        }else {
            flag = true;
        }
    },

    setCarRequestInsert: function(data){
        console.log(data);
        $.ajax({
            url : "/inside/setCarRequestInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                if(data.type != "bustripReq") {
                    alert("차량 사용 신청이 완료되었습니다.");
                    if($("#type").val() == "drafting" && $("#carType").data("kendoDropDownList").value() == "2"){
                        opener.location.reload();
                        $("#carReqSn").val(result.params.carReqSn);
                        $("#carDraftFrm").one("submit", function() {
                            var url = "/popup/inside/approvalFormPopup/carApprovalPop.do";
                            var name = "_self";
                            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                            var popup = window.open(url, name, option);
                            this.action = "/popup/inside/approvalFormPopup/carApprovalPop.do";
                            this.method = 'POST';
                            this.target = '_self';
                        }).trigger("submit");
                    }else{
                        opener.location.reload();
                        window.close();
                    }
                }
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setCarRequestUpdate: function(data){
        $.ajax({
            url : "/inside/setCarRequestUpdate",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("차량 사용 신청이 완료되었습니다.");
                opener.carList.refresh();
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
    },

    fn_buttonSet : function(carMap){
        console.log(carMap);
        var buttonHtml = "";
        if(carMap != null){
            if(carMap.CAR_TYPE_SN == "2"){
                var status = carMap.STATUS;
                if(status == "0"){
                    buttonHtml += "<button type=\"button\" id=\"carSaveBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"carReq.saveBtn()\">저장</button>";
                    buttonHtml += "<button type=\"button\" id=\"carDelBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-error\" disabled onclick=\"carReq.delBtn();\">삭제</button>";
                    buttonHtml += "<button type=\"button\" id=\"carAppBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"carReq.carDrafting()\">상신</button>";
                }else if(status == "10"){
                    buttonHtml += "<button type=\"button\" id=\"carCanBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+carMap.DOC_ID+"', '"+carMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                }else if(status == "30" || status == "40"){
                    buttonHtml += "<button type=\"button\" id=\"carSaveBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"carReq.saveBtn()\">저장</button>";
                    buttonHtml += "<button type=\"button\" id=\"carDelBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-error\" disabled onclick=\"carReq.delBtn();\">삭제</button>";
                    buttonHtml += "<button type=\"button\" id=\"carCanBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('"+carMap.DOC_ID+"', '"+carMap.DOC_MENU_CD+"', '"+carMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
                }else if(status == "100"){
                    buttonHtml += "<button type=\"button\" id=\"carCanBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+carMap.DOC_ID+"', '"+carMap.APPRO_KEY+"', '"+carMap.DOC_MENU_CD+"');\">열람</button>";
                } else {
                    buttonHtml += "<button type=\"button\" id=\"carSaveBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"carReq.saveBtn()\">저장</button>";
                }
            }else{
                buttonHtml += "<button type=\"button\" id=\"carSaveBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"carReq.saveBtn()\">저장</button>";
                buttonHtml += "<button type=\"button\" id=\"carDelBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-error\" disabled onclick=\"carReq.delBtn();\">삭제</button>";
            }
        }else{
            buttonHtml += "<button type=\"button\" id=\"carSaveBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"carReq.saveBtn()\">저장</button>";
        }
        buttonHtml += "<button type=\"button\" class=\"k-button k-button-solid-error\" style=\"margin-right:5px;\" onclick=\"window.close();\">닫기</button>";
        $("#carBtn").html(buttonHtml);
    },

    carDrafting: function() {
        $("#carDraftFrm").one("submit", function() {
            var url = "/popup/inside/approvalFormPopup/carApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/inside/approvalFormPopup/carApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    delBtn: function(){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        const data = {
            carReqSn: $("#carReqSn").val()
        }
        const result = customKendo.fn_customAjax("/inside/setCarRequestDelete", data);
        if(result.flag){
            alert("삭제되었습니다.");
            window.close();
        }
    }
}
