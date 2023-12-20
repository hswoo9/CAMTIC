var teamAjax = {
    global : {

    },

    fn_defaultScript : function (){

    },

    fn_addVersion : function (ck){
        if(!confirm("새 버전을 추가하시겠습니까?")){
            return;
        }

        const parameters = {
            pjtSn: $("#pjtSn").val(),
            regEmpSeq: $("#regEmpSeq").val(),

            tmType : 0,
        }

        if(ck != null){
            parameters.ck = ck;
        }

        const result = customKendo.fn_customAjax("/project/team/setTeamAddVersion", parameters);
        if(result.code == "200"){
            alert("저장이 완료되었습니다.");
            commonProject.getReloadPage(5, 5, 5);
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    },

    fn_save: function(){
        const parameters = {
            pjtSn : $("#pjtSn").val(),
            teamVersionSn : $("#teamVersionSn").val(),

            tmType : 0,

            myInvAmt : uncomma($("#myInvAmt_"+$("#myTmSn").val()).val()),

            modEmpSeq : $("#regEmpSeq").val()
        }

        if(parameters.myInvAmt == "" || parameters.myInvAmt == 0 || parameters.myInvAmt == null){
            alert("예상비용이 입력되지 않았습니다."); return;
        }

        if(!confirm("자가 예상비용을 저장하시겠습니까?")){
            return;
        }

        if(parameters.pjtSn == "" || parameters.teamVersionSn == ""){
            alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 재시도 바랍니다."); return;
        }

        const result = customKendo.fn_customAjax("/project/team/updMyTeam", parameters);
        if(result.code == "200"){
            alert("저장이 완료되었습니다.");
            commonProject.getReloadPage(5, 5, 5);
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    },

    fn_approve : function(stat){
        let confirmText = "";
        let successText = "";
        if(stat == 10){
            confirmText = "승인요청하시겠습니까?";
            successText = "승인요청이 완료되었습니다.";
        }else{
            confirmText = "승인요청 취소하시겠습니까?";
            successText = "승인요청이 취소되었습니다.";
        }
        if(!confirm(confirmText)){
            return;
        }
        const parameters = {
            pjtSn : $("#pjtSn").val(),
            teamVersionSn : $("#teamVersionSn").val(),
            stat : stat
        }

        const result = customKendo.fn_customAjax("/project/team/updTeamVersionAppStat", parameters);
        if(result.code == "200"){
            alert(successText);
            commonProject.getReloadPage(5, 5, 5);
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    }
}