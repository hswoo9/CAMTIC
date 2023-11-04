var lecturePop = {
    fn_lectureReqPop: function(pjtSn, pk){
        let url = "/projectUnRnd/lectureReqPop.do?pjtSn="+pjtSn;
        if(pk != null && pk != ""){
            url += "&pk="+pk;
        }
        const name = "lectureReqPop";
        const option = "width = 1200, height = 762, top = 100, left = 300, location = no";
        window.open(url, name, option);
    },

    lectureTeacherPop: function(pk){
        let url = "/projectUnRnd/lectureTeacherPop.do?pk="+pk;
        const name = "lectureTeacherPop";
        const option = "width = 1000, height = 700, top = 150, left = 400, location = no";
        window.open(url, name, option);
    },

    lecturePersonPop: function(pk){
        let url = "/projectUnRnd/lecturePersonPop.do?pk="+pk;
        const name = "lecturePersonPop";
        const option = "width = 1200, height = 589, top = 150, left = 300, location = no";
        window.open(url, name, option);
    },

    lectureEduPop: function(pk){
        let url = "/projectUnRnd/lectureEduPop.do?pk="+pk;
        const name = "lectureEduPop";
        const option = "width = 1200, height = 589, top = 150, left = 300, location = no";
        window.open(url, name, option);
    },

    lecturePayPop: function(pk){
        let url = "/projectUnRnd/lecturePayPop.do?pk="+pk;
        const name = "lectureEduPop";
        const option = "width = 1200, height = 589, top = 150, left = 300, location = no";
        window.open(url, name, option);
    },

    lecturePersonReqPop: function(pk){
        let url = "/projectUnRnd/lecturePersonReqPop.do?pk="+pk;
        const name = "lecturePersonReqPop";
        const option = "width = 1000, height = 589, top = 150, left = 400, location = no";
        window.open(url, name, option);
    },

    lecturePayReqPop: function(pk){
        let url = "/projectUnRnd/lecturePayReqPop.do?pk="+pk;
        const name = "lecturePayReqPop";
        const option = "width = 1000, height = 589, top = 150, left = 400, location = no";
        window.open(url, name, option);
    },
}