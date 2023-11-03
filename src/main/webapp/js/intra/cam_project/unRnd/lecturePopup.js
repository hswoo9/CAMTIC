var lecturePop = {
    fn_lectureReqPop: function(pjtSn, pk){
        let url = "/projectUnRnd/lectureReqPop.do?pjtSn="+pjtSn;
        if(pk != null && pk != ""){
            url += "&pk="+pk;
        }
        const name = "lectureReqPop";
        const option = "width = 1200, height = 800, top = 50, left = 300, location = no";
        window.open(url, name, option);
    },

    lectureTeacherPop: function(pk){
        let url = "/projectUnRnd/lectureTeacherPop.do?pk="+pk;
        const name = "lectureTeacherPop";
        const option = "width = 600, height = 400, top = 250, left = 500, location = no";
        window.open(url, name, option);
    }
}