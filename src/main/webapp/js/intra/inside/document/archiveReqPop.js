var archiveReq = {
    init: function (){
        archiveReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_datePicker("docYear", 'decade', "yyyy", new Date());
        fn_deptSetting(2);
        customKendo.fn_textBox(["docNum", "visit", "empName"]);
        $("#docYear, #empName").attr("readonly", true);
    },

    saveBtn: function(){
        let docYear = $("#docYear").val();
        let docNum = $("#docNum").val();
        let deptSn = $("#dept").val();
        let deptName = $("#dept").data("kendoDropDownList").text();
        let teamSn = $("#team").val();
        let teamName = $("#team").data("kendoDropDownList").text();
        let visit = $("#visit").val();
        let managerSn = $("#empSeq").val();
        let managerName = $("#empName").val();

        let data = {
            docYear : docYear,
            docNum : docNum,
            deptSn : deptSn,
            deptName : deptName,
            teamSn : teamSn,
            teamName : teamName,
            visit : visit,
            managerSn : managerSn,
            managerName : managerName
        }

        if(docNum == "") { alert("문서번호가 선택되지 않았습니다."); return; }
        if(visit == "") { alert("문서위치가 작성되지 않았습니다."); return; }
        if(managerSn == "") { alert("등록자가 작성되지 않았습니다."); return; }

        if($("#archiveSn").val() == "") {
            if(!confirm("문서를 등록하시겠습니까?")){
                return;
            }
            archiveReq.setArchiveInsert(data);
        }else {
            if(!confirm("문서를 수정하시겠습니까?")){
                return;
            }
            archiveReq.setArchiveUpdate(data);
        }
    },

    setArchiveInsert: function(data){
        let result = customKendo.fn_customAjax("/inside/setArchiveInsert", data);
        if(result.flag) {
            alert("문서 등록이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    setArchiveUpdate: function(data){

    }
}