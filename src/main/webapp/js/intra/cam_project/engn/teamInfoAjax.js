var teamAjax = {
    global : {
        
    },

    fn_defaultScript : function (){

    },

    fn_addVersion : function (){
        if(!confirm("새 버전을 추가하시겠습니까?")){
            return;
        }

        const parameter = {
            pjtSn: $("#pjtSn").val(),
            regEmpSeq: $("#regEmpSeq").val()
        }

        const result = customKendo.fn_customAjax("/project/team/setTeamAddVersion", parameter);
        if(result.code == "200"){
            alert("저장이 완료되었습니다.");
            commonProject.getReloadPage(5, 5, 5);
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    }
}