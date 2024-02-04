/** 겸직 */
var tmpDuty = {

    global : {
    },

    defaultScript : function(){
        userViewPop.dataSet();
    },

    tmpDutySet : function(){
        const data = {
            empSeq : $("#userEmpSeq").val()
        }
        const result = customKendo.fn_customAjax("/userManage/getTmpDutyList", data);
        const tmpDutyList = result.list;

        let html = '';
        for(let i=0; i<tmpDutyList.length; i++){
            const tmpDutyMap = tmpDutyList[i];

            html += '<span style="color: #0a80c5"><b>'+tmpDutyMap.TMP_DEPT_NAME+' '+tmpDutyMap.TMP_DUTY_NAME+'</b></span>' +
                '<span style="margin-left: 5px; color: #b94a48"><b style="cursor: pointer;" onclick="tmpDuty.fn_delTmpDuty('+tmpDutyMap.EMP_TMP_SN+')">X</b></span><br>';
        }
        $("#tmpDutyDiv").html(html);
    },

    fn_addTmpDuty : function(){
        const deptComp = $("#deptComp").data("kendoDropDownList").value();
        const deptCompText = $("#deptComp").data("kendoDropDownList").text();
        const deptTemp = $("#deptTeam").data("kendoDropDownList").value();
        const deptTempText = $("#deptTeam").data("kendoDropDownList").text();
        const duty = $("#duty").data("kendoDropDownList").value();
        const dutyText = $("#duty").data("kendoDropDownList").text();

        if(deptComp == ""){
            alert("부서를 선택해주세요."); return;
        }
        if(duty == ""){
            alert("직책을 선택해주세요."); return;
        }

        let empSeq = $("#userEmpSeq").val();
        let tmpDeptSeq = "";
        let tmpDeptName = "";
        let tmpDutySeq = duty;
        let tmpDutyName = dutyText;
        let regEmpSeq = $("#regEmpSeq").val();

        /** 부서장 겸직일 경우 */
        if(deptTemp == ""){
            tmpDeptSeq = deptComp;
            tmpDeptName = deptCompText;

        /** 팀장 겸직일 경우 */
        }else{
            tmpDeptSeq = deptTemp;
            tmpDeptName = deptTempText;
        }

        const data = {
            empSeq : empSeq,
            tmpDeptSeq : tmpDeptSeq,
            tmpDeptName : tmpDeptName,
            tmpDutySeq : tmpDutySeq,
            tmpDutyName : tmpDutyName,
            regEmpSeq : regEmpSeq
        }
        const result = customKendo.fn_customAjax("/userManage/setTmpDuty", data);
        if(result.code != "200"){
            alert("저장되었습니다.");
            location.reload();
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    },

    fn_delTmpDuty : function(empTmpSn){
        if(!confirm("삭제하시겠습니까?")){
            return ;
        }
        
        let regEmpSeq = $("#regEmpSeq").val();

        const data = {
            empTmpSn : empTmpSn,
            regEmpSeq : regEmpSeq
        }
        const result = customKendo.fn_customAjax("/userManage/setTmpDutyDel", data);
        if(result.code != "200"){
            alert("삭제되었습니다.");
            location.reload();
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    }
}