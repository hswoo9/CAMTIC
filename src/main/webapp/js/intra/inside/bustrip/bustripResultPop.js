var now = new Date();
var docContent = "";

var bustripResultPop = {

    init : function(k){

        bustripResultPop.dataSet(k);
    },

    dataSet : function(k) {
        var data = {
            hrBizReqId : k
        }
        var ds = customKendo.fn_customAjax("/bustrip/getBustripTotInfo", data);
        customKendo.fn_dropDownList("realDriver", ds.list, "EMP_NAME", "EMP_SEQ");

        customKendo.fn_textBox(["result"]);
    },

    fn_save : function(e){
        if(!confirm("출장 결과보고를 저장하시겠습니까?")){
            return;
        }

        if(realDriver == null || realDriver == ""){
            alert("운행자를 선택해주세요.");
            return;
        } else if (result == null || result == ""){
            alert("출장결과를 입력해주세요.");
            return;
        } else if (moveDst == null || moveDst == ""){
            alert("운행거리를 입력해주세요.");
            return;
        }

        var data = {
            hrBizReqId : e,
            driverEmpSeq : $("#realDriver").val(),
            result : $("#result").val(),
            moveDst : $("#moveDst").val(),
            positionCode : $("#positionCode").val(),
            dutyCode : $("#dutyCode").val(),
            deptSeq : $("#deptSeq").val(),
            empSeq : $("#empSeq").val(),
            empName : $("#empName").val()
        }

        var rs = customKendo.fn_customAjax("/bustrip/saveBustripResult", data);



    }
}

