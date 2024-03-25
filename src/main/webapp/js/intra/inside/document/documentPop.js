var docuReq = {
    init: function (){
        docuReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["receiveName", "empName", "documentTitleName", "remarkCn"]);
        customKendo.fn_datePicker("effectiveDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("shipmentDt", 'month', "yyyy-MM-dd", new Date());

        var data = {};
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("documentPart", deptDsA.rs, "dept_name", "dept_seq", 2);

        $("#empName, #effectiveDt, #shipmentDt").attr("readonly", true);
    },

    saveBtn: function(){
        let docuType = 1;
        let documentSn = $("#documentSn").val();
        let documentPartType = $("#documentPart").val();
        let documentPartName = $("#documentPart").data("kendoDropDownList").text();
        let effectiveDt = $("#effectiveDt").val().replace(/-/g, "");
        let shipmentDt = $("#shipmentDt").val().replace(/-/g, "");
        let receiveName = $("#receiveName").val();
        let managerSn = $("#empSeq").val();
        let managerName = $("#empName").val();
        let documentTitleName = $("#documentTitleName").val();
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
            remarkCn : remarkCn,
            regEmpSeq : regEmpSeq,
            regEmpName : regEmpName
        }

        if(documentPartType == "") { alert("구분이 선택되지 않았습니다."); return; }
        if(effectiveDt == "") { alert("시행일자가 선택되지 않았습니다."); return; }
        if(shipmentDt == "") { alert("발송일자가 선택되지 않았습니다."); return; }
        if(receiveName == "") { alert("수신처가 작성되지 않았습니다."); return; }
        if(managerSn == "") { alert("담당자가 선택되지 않았습니다."); return; }
        if(documentTitleName == "") { alert("제목이 작성되지 않았습니다."); return; }
        if(receiveName == "") { alert("수신처가 작성되지 않았습니다."); return; }

        if (documentSn === "") {
            if(!confirm("문서를 등록하시겠습니까?")){
                return;
            }
            docuReq.setDocumentInsert(data);
        }else {
            if(!confirm("문서를 수정하시겠습니까?")){
                return;
            }
            docuReq.setDocumentUpdate(data);
        }
    },

    setDocumentInsert: function(data){
        let result = customKendo.fn_customAjax("/inside/setDocumentInsert", data);
        if(result.flag) {
            alert("문서 등록이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    setDocumentUpdate: function(data){
        let result = customKendo.fn_customAjax("/Inside/setDocumentUpdate", data);
        if(result.flag) {
            alert("문서 수정이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    }
}