var regisReq = {
    init: function(){
        regisReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["documentPart", "receiveName", "empName", "documentTitleName", "userText", "remarkCn"]);
        customKendo.fn_datePicker("effectiveDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("shipmentDt", 'month', "yyyy-MM-dd", new Date());
        let deptPartArr = [
            {text: "전직원", value: "1"},
            {text: "경영지원실", value: "2"},
            {text: "R&BD사업본부", value: "3"},
            {text: "기업성장지원본부", value: "4"},
            {text: "사업부", value: "5"},
            {text: "담당자 선택", value: "6"}
        ]
        customKendo.fn_dropDownList("deptPart", deptPartArr, "text", "value", 2);
        $("#deptPart").data("kendoDropDownList").bind("change", regisReq.fn_toggleManger)
        $("#documentPartName, #empName, #effectiveDt, #shipmentDt").attr("readonly", true);
    },

    saveBtn: function(){
        let docuType = 2;
        let documentSn = $("#documentSn").val();
        let documentPartType = $("#documentPartType").val();
        let documentPartName = $("#documentPartName").val();
        let effectiveDt = $("#effectiveDt").val().replace(/-/g, "");
        let shipmentDt = $("#shipmentDt").val().replace(/-/g, "");
        let receiveName = $("#receiveName").val();
        let managerSn = $("#empSeq").val();
        let managerName = $("#empName").val();
        let documentTitleName = $("#documentTitleName").val();
        let deptPartType = $("#deptPart").val();
        let deptPartText;
        if(deptPartType != 6) {
            deptPartText = $("#deptPart").data("kendoDropDownList").text();
        }
        let userSn = $("#userSn").val();
        let userText = $("#userText").val();
        let remarkCn = $("#remarkCn").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let data = {
            docuType : docuType,
            documentSn : documentSn,
            documentPartType : documentPartType,
            documentPartName : documentPartName,
            effectiveDt : effectiveDt,
            shipmentDt : shipmentDt,
            receiveName : receiveName,
            managerSn : managerSn,
            managerName : managerName,
            documentTitleName : documentTitleName,
            deptPartType : deptPartType,
            deptPartText : deptPartText,
            userSn : userSn,
            userText : userText,
            remarkCn : remarkCn,
            regEmpSeq : regEmpSeq,
            regEmpName : regEmpName
        }

        if(documentPartType == "") { alert("구분이 선택되지 않았습니다."); return; }
        if(effectiveDt == "") { alert("시행일자가 선택되지 않았습니다."); return; }
        if(shipmentDt == "") { alert("접수일자가 선택되지 않았습니다."); return; }
        if(receiveName == "") { alert("발신기관이 작성되지 않았습니다."); return; }
        if(managerSn == "") { alert("접수자가 선택되지 않았습니다."); return; }
        if(documentTitleName == "") { alert("제목이 작성되지 않았습니다."); return; }
        if(deptPartType == "") { alert("담당부서를 선택되지 않았습니다."); return; }
        if(deptPartType == 6 && userSn == "") { alert("담당자가 선택되지 않았습니다."); return; }
        if(receiveName == "") { alert("수신처가 작성되지 않았습니다."); return; }

        if(documentSn === "") {
            if(!confirm("문서를 등록하시겠습니까?")){
                return;
            }
            regisReq.setDocumentInsert(data);
        }else {
            if(!confirm("문서를 수정하시겠습니까?")){
                return;
            }
            regisReq.setInComeUpdate(data);
        }
    },

    setDocumentInsert: function(data){
        let result = customKendo.fn_customAjax("/Inside/setDocumentInsert", data);
        if(result.flag) {
            alert("문서 등록이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    setInComeUpdate: function(data){
        let result = customKendo.fn_customAjax("/Inside/setInComeUpdate", data);
        if(result.flag) {
            alert("문서 수정이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    fn_toggleManger: function(){
        if($("#deptPart").val() == 6) {
            $(".managerTd").show();
            $(".colTd").show(); //담당 부서 담당자 선택
            $(".colTd1").hide();
        }else {
            $(".managerTd").hide();
        }
    }
}

function userDataSet(userArr) {
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
}