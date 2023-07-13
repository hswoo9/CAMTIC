var docuOrderReq = {
    init: function (){
        docuOrderReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["orderNum", "projectName", "coName", "contractAmount", "deliveryAmount", "conditionName", "remarkCn"]);
        customKendo.fn_datePicker("docuDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("startDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDe", 'month', "yyyy-MM-dd", new Date());
        let classArr = [
            {text: "제작", value: "1"},
            {text: "가공", value: "2"},
            {text: "사업", value: "3"},
            {text: "기타", value: "4"}
        ]
        customKendo.fn_dropDownList("class", classArr, "text", "value", 2);
        let docuCheckArr = [
            {text: "있음", value: "1"},
            {text: "없음", value: "2"},
        ]
        customKendo.fn_dropDownList("docuCheck", docuCheckArr, "text", "value", 2);
        $("#docuDe, #startDe, #endDe").attr("readonly", true);
        $("#orderNum").data("kendoTextBox").enable(false);
        $("#contractAmount").data("kendoTextBox").enable(false);
        $("#deliveryAmount").data("kendoTextBox").enable(false);
    },

    saveBtn: function(){
        let classSn = $("#class").val();
        let className = $("#class").data("kendoDropDownList").text();
        let docuDe = $("#docuDe").val();
        let docuCheckSn = $("#docuCheck").val();
        let docuCheckName = $("#docuCheck").data("kendoDropDownList").text();
        let projectName = $("#projectName").val();
        let startDe = $("#startDe").val();
        let endDe = $("#endDe").val();
        let coSn = $("#coSn").val();
        let coName = $("#coName").val();
        let conditionName = $("#conditionName").val();
        let remarkCn = $("#remarkCn").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let data = {
            classSn : classSn,
            className : className,
            docuDe : docuDe,
            docuCheckSn : docuCheckSn,
            docuCheckName : docuCheckName,
            projectName : projectName,
            startDe : startDe,
            endDe : endDe,
            coSn : coSn,
            coName : coName,
            conditionName : conditionName,
            remarkCn : remarkCn,
            regEmpSeq : regEmpSeq,
            regEmpName : regEmpName
        }

        if(classSn == "") { alert("구분이 선택되지 않았습니다."); return; }
        if(projectName == "") { alert("계약건명이 선택되지 않았습니다."); return; }
        if(docuDe == "") { alert("계약일시가 작성되지 않았습니다."); return; }
        if(startDe == "" || endDe == "") { alert("계약기간이 작성되지 않았습니다."); return; }

        if($("#documentSn").val() == "") {
            if(!confirm("문서를 등록하시겠습니까?")){
                return;
            }
            docuOrderReq.setDocuOrderInsert(data);
        }else {
            if(!confirm("문서를 수정하시겠습니까?")){
                return;
            }
            docuOrderReq.setDocuOrderUpdate(data);
        }
    },

    setDocuOrderInsert: function(data){
        let result = customKendo.fn_customAjax("/inside/setDocuOrderInsert", data);
        if(result.flag) {
            alert("문서 등록이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    setDocuOrderUpdate: function(data){

    }
}