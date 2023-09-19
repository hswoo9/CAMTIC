var commissionerReq = {

    global : {
        saveAjaxData : "",
    },

    init : function(){
        commissionerReq.dataSet();
    },

    dataSet : function(){
        customKendo.fn_textBox(["id", "pwd", "name", "firstRrnName", "secondRrnName", "telNum", "email", "belong", "dutyPosition", "bmk"]);

        $("#gender").kendoRadioGroup({
            items: [
                { label : "남", value : "M" },
                { label : "여", value : "F" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "M",
        }).data("kendoRadioGroup");
    },

    saveBtn : function(){
        if($("#id").val() == ""){
            alert("임시아이디가 작성되지 않았습니다.");
            $("#id").focus();
            return;
        }else if($("#pwd").val() == ""){
            alert("임시비밀번호가 작성되지 않았습니다.");
            $("#pwd").focus();
            return;
        }else if($("#name").val() == ""){
            alert("성명 작성되지 않았습니다.");
            $("#name").focus();
            return;
        }else if($("#firstRrnName").val() == "") {
            alert("주민등록번호 앞자리가 작성되지 않았습니다.");
            $("#firstRrnName").focus();
            return;
        }else if($("#secondRrnName").val() == "") {
            alert("주민등록번호 뒷자리가 작성되지 않았습니다.");
            $("#secondRrnName").focus();
            return;
        }else if($("#gender").data("kendoRadioGroup").value() == "") {
            alert("직급(직책)이 작성되지 않았습니다.");
            return;
        }

        commissionerReq.global.saveAjaxData = {
            id: $("#id").val(),
            pwd: $("#pwd").val(),
            name: $("#name").val(),
            firstRrnName: $("#firstRrnName").val(),
            secondRrnName: $("#secondRrnName").val(),
            telNum: $("#telNum").val(),
            email: $("#email").val(),
            belong: $("#belong").val(),
            regEmpSeq: $("#regEmpSeq").val(),
            regEmpName: $("#regEmpName").val(),
            gender : $("#gender").data("kendoRadioGroup").value(),
            dutyPosition : $("#dutyPosition").val(),
            bmk : $("#bmk").val()
        }

        if(confirm("평가위원을 저장하시겠습니까?")){
            var result = customKendo.fn_customAjax("/inside/setCommissionerInsert", commissionerReq.global.saveAjaxData);
            if(result.flag){
                alert("등록되었습니다.");
                opener.parent.commissionerManage.gridReload();
                window.close();
            }
        }
    },
}

