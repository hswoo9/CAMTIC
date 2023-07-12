var docuContractReq = {
    init: function(){
        docuContractReq.dataSet();
        docuContractReq.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_textBox(["projectName", "coName", "contractAmount", "remarkCn"]);
        customKendo.fn_datePicker("docuDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("startDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDe", 'month', "yyyy-MM-dd", new Date());
        let mainClassArr = [
            {text: "CAMTIC", value: "1"},
            {text: "JVADA", value: "2"}
        ]
        customKendo.fn_dropDownList("mainClass", mainClassArr, "text", "value", 2);
        let classArr = [
            {text: "제작", value: "1"},
            {text: "가공", value: "2"},
            {text: "구매", value: "3"},
            {text: "공사", value: "4"},
            {text: "전담인력", value: "5"},
            {text: "시간제", value: "6"},
            {text: "위촉연구원", value: "7"},
            {text: "현장연수생", value: "8"},
            {text: "입주", value: "9"},
            {text: "장비사용", value: "10"},
            {text: "용역", value: "11"},
            {text: "기타", value: "12"}
        ]
        customKendo.fn_dropDownList("class", classArr, "text", "value", 2);
        $("#docuDe, #startDe, #endDe").attr("readonly", true);
    },

    saveBtn: function(){
        let mainClassSn = $("#mainClass").val();
        let mainClassName = $("#mainClass").data("kendoDropDownList").text();
        let classSn = $("#class").val();
        let className = $("#class").data("kendoDropDownList").text();
        let docuName = mainClassSn == 1 ? "TIC" : "JVADA";
        let docuDe = $("#docuDe").val();
        let projectName = $("#projectName").val();
        let projectMoney = $("#projectMoney").val();
        let startDe = $("#startDe").val();
        let endDe = $("#endDe").val();
        let coSn = $("#coSn").val();
        let coName = $("#coName").val();
        let remarkCn = $("#remarkCn").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let data = {
            mainClassSn : mainClassSn,
            mainClassName : mainClassName,
            classSn : classSn,
            className : className,
            docuName : docuName,
            docuDe : docuDe,
            projectName : projectName,
            projectMoney : projectMoney,
            startDe : startDe,
            endDe : endDe,
            coSn : coSn,
            coName : coName,
            remarkCn : remarkCn,
            regEmpSeq : regEmpSeq,
            regEmpName : regEmpName
        }

        if(classSn == "") { alert("구분이 선택되지 않았습니다."); return; }
        if(docuDe == "") { alert("계약일시가 작성되지 않았습니다."); return; }
        if(projectName == "") { alert("계약건명이 선택되지 않았습니다."); return; }

        if($("#documentSn").val() == "") {
            if(!confirm("문서를 등록하시겠습니까?")){
                return;
            }
            docuContractReq.setDocuContractInsert(data);
        }else {
            if(!confirm("문서를 수정하시겠습니까?")){
                return;
            }
            docuContractReq.setDocuContractUpdate(data);
        }
    },

    setDocuContractInsert: function(data){
        let result = customKendo.fn_customAjax("/inside/setDocuContractInsert", data);
        if(result.flag) {
            alert("문서 등록이 완료되었습니다.");
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    setDocuContractUpdate: function(data){

    }
}