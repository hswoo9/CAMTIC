var lecturePop = {
    fn_lectureReqPop: function(pjtSn, pk){
        let url = "/projectUnRnd/lectureReqPop.do?pjtSn="+pjtSn;
        url += "&type=lec";
        if(pk != null && pk != ""){
            url += "&pk="+pk;
        }
        const name = "lectureReqPop";
        const option = "width = 1200, height = 762, top = 100, left = 300, location = no";
        window.open(url, name, option);
    },

    fn_consultingReqPop: function(pjtSn, pk){
        let url = "/projectUnRnd/lectureReqPop.do?pjtSn="+pjtSn + "&busnClass=" + $("#busnClass").val();
        url += "&type=con";
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

    consultingTeacherPop: function(pk){
        let url = "/projectUnRnd/consultingTeacherPop.do?pk="+pk;
        const name = "consultingTeacherPop";
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
        const scYear = $("#recruitEndDt").val();
        var year = scYear.split("-")[0];

        let url = "/projectUnRnd/lectureEduPop.do?pk="+pk+"&year="+year;
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

    lecturePersonMngPop: function(personSn){
        let url = "/projectUnRnd/lecturePersonMngPop.do";
        if(personSn != null){
            url += "?personSn="+personSn;
        }
        const name = "lecturePersonMngPop";
        const option = "width = 1000, height = 589, top = 150, left = 410, location = no";
        window.open(url, name, option);
    },

    lectureTeacherMngPop: function(teacherSn){
        let url = "/projectUnRnd/lectureTeacherMngPop.do";
        if(teacherSn != null){
            url += "?teacherSn="+teacherSn;
        }
        const name = "lectureTeacherMngPop";
        const option = "width = 1000, height = 589, top = 150, left = 410, location = no";
        window.open(url, name, option);
    },

    personReqPop: function(pk){
        let url = "/projectUnRnd/personReqPop.do?pk="+pk;
        const name = "personReqPop";
        const option = "width = 1000, height = 589, top = 150, left = 400, location = no";
        window.open(url, name, option);
    },

    lecturePayReqPop: function(pk){
        let url = "/projectUnRnd/lecturePayReqPop.do?pk="+pk;

        let personArr = [];
        $("input[name=person]:checked").each(function(i){
            personArr.push($(this).val());
        });
        if($("input[name=person]:checked").length == 0) {
            alert("수강자가 선택되지 않았습니다.");
            return;
        }

        url += "&list="+personArr.join();

        const name = "lecturePayReqPop";
        const option = "width = 650, height = 445, top = 150, left = 500, location = no";
        window.open(url, name, option);
    },

    personPrintPop: function(){
        if($("input[name='person']:checked").length == 0){
            alert("수료증을 출력할 인원을 선택해주세요."); return;
        }
        if($("input[name='person']:checked").length > 1){
            alert("수료증은 1명씩 출력가능합니다."); return;
        }

        var dataItem = $("#personGrid").data("kendoGrid").dataItem($("input[name='person']:checked").closest("tr"));
        if(dataItem.REQ_STATUS != 'O'){
            alert("강의 수료전 수료증 발급이 불가능합니다.");
            return;
        }

        let url = "/project/pop/personPrintPop.do?pk="+$("#pk").val()+"&personReqSn="+$("#personReqSn"+$("input[name='person']:checked").val()).val();
        const name = "personReqPop";
        const option = "width=1680, height=870, scrollbars=no, top=200, left=200, resizable=no, toolbars=no, menubar=no";
        window.open(url, name, option);
    },

    sendSmsPop : function(){
        var joinSn = "";
        $.each($("input[name='person']:checked"), function(i){
            if(i != 0){
                joinSn += ",";
            }
            joinSn += $(this).val();
        });

        if($("input[name='person']:checked").length == 0){
            alert("SMS 발송 할 직원을 선택해주세요."); return;
        }

        var url = "/system/pop/messageSendPop.do?userList="+joinSn+"&type=lecture";
        var name = "messageSendPop";
        var option = "width=315, height=718, scrollbars=no, top=200, left=600, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    lectureTeamPop: function(pjtSn, pk){
        let url = "/projectUnRnd/lectureTeamPop.do?pjtSn="+pjtSn + "&busnClass=" + $("#busnClass").val();
        if(pk != null && pk != ""){
            url += "&pjtUnitSn="+pk;
        }
        const name = "lectureReqPop";
        const option = "width = 860, height = 500, top = 100, left = 300, location = no";
        window.open(url, name, option);
    }
}