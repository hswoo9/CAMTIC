var evalResUser = {
    fn_defaultScript: function (){
        const data = {
            evalSn: $("#evalSn").val(),
            evalMemSn: $("#evalMemSn").val()
        };
        const result = customKendo.fn_customAjax("/evaluation/getEvaluation", data);
        const evalMap = result.data;

        const yearText = evalMap.BS_YEAR+"년 역량평가표 ("+evalMap.EVAL_NUM+"차)";
        $("#yearTd").text(yearText);

        const result2 = customKendo.fn_customAjax("/evaluation/getEvalMemDet", data);
        const evalMem = result2.data;

        console.log("evalMem : ", evalMem);

        const userInfo = getUser(evalMem.EVAL_EMP_SEQ);
        $("#targetDept").text(userInfo.DEPT_NAME);
        $("#targetEmpName").text(userInfo.EMP_NAME_KR);
        $("#targetSpot").text(fn_getSpot(userInfo.DUTY_NAME, userInfo.POSITION_NAME));
        $("#targetJob").text(userInfo.JOB_DETAIL);

        if(evalMem.EVAL_EVAL_F_SEQ != null && evalMem.EVAL_EVAL_F_SEQ != "" && evalMem.EVAL_EVAL_F_SEQ != "undefined"){
            const subUser = getUser(evalMem.EVAL_EVAL_F_SEQ);
            $("#td1-1").text("");
            $("#td1-2").text("");
            $("#td1-3").text("");
            $("#td1-4").text("");
            $("#td1-5").text("");
            $("#td1-6").text("");
            $("#td1-7").text("");
            $("#td1-8").text("");
        }
    }
}

