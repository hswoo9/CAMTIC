const studyView = {
    init : function(){
    },

    updBtn: function(pk, fk, studyClass, studyText){
        if(pk == "" || pk == undefined || pk == null){
            alert("잘못된 접근입니다. 로그아웃 후 재시도 바랍니다.");
            return;
        }
        console.log(pk+", "+fk+", "+studyClass+", "+studyText);

        let data = {
            studyUserSn: pk,
            studyInfoSn: fk,
            studyClassSn: studyClass,
            studyClassText: studyText
        }
        studyView.setStudyUserMngUpdate(data);
    },

    setStudyUserMngUpdate: function(data){
        $.ajax({
            url : "/campus/setStudyUserMngUpdate",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);

            },
            error : function(e) {
                alert("데이터 저장 중 에러가 발생했습니다.");
                console.log(e);
            }
        });
    }
}