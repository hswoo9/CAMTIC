const dutyInfoReq = {
    global: {
        dutyInfo: {}
    },

    init: function(){
        dutyInfoReq.pageSet();
        dutyInfoReq.dataSet();
        dutyInfoReq.buttonSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["dutyName", "appLine"]);
        customKendo.fn_textArea(["outlineName", "outlineDetail", "internal", "external", "abilityA", "abilityB", "abilityC", "abilityD", "abilityE", "responsibility"]);
        customKendo.fn_datePicker("dutyMonth", 'year', "yyyy-MM", new Date());
        $("#dutyMonth").attr("readonly", true);
    },

    dataSet: function(){
        let mode = $("#mode").val();
        if(mode == "upd" || mode == "mng"){
            let dutyInfo = customKendo.fn_customAjax("/campus/getDutyInfoOne", {
                pk: $("#pk").val()
            }).data;
            dutyInfoReq.global.dutyInfo = dutyInfo;

            $("#dutyMonth").val(dutyInfo.DUTY_MONTH);
            $("#dutyName").val(dutyInfo.DUTY_NAME);
            $("#outlineName").val(dutyInfo.OUTLINE_NAME);
            $("#outlineDetail").val(dutyInfo.OUTLINE_DETAIL);
            $("#internal").val(dutyInfo.INTERNAL);
            $("#external").val(dutyInfo.EXTERNAL);
            $("#appLine").val(dutyInfo.APP_LINE);
            $("#abilityA").val(dutyInfo.ABILITY_A);
            $("#abilityB").val(dutyInfo.ABILITY_B);
            $("#abilityC").val(dutyInfo.ABILITY_C);
            $("#abilityD").val(dutyInfo.ABILITY_D);
            $("#abilityE").val(dutyInfo.ABILITY_E);
            $("#responsibility").val(dutyInfo.RESPONSIBILITY);
        }

        let status = dutyInfoReq.global.dutyInfo.STATUS;
        if((mode == "upd" && status == 10) || (mode == "upd" && status == 100) || mode == "mng"){
            $("#dutyMonth").data("kendoDatePicker").enable(false);
            $("#dutyName, #appLine, #outlineName, #outlineDetail, #internal, #external, #abilityA, #abilityB, #abilityC, #abilityD, #abilityE, #responsibility").attr("readonly", true);
        }
    },

    buttonSet: function(){
        let mode = $("#mode").val();
        let status = dutyInfoReq.global.dutyInfo.STATUS;
        if(mode == "upd"){
            if(status == 0 || status == 30) {
                $("#appBtn").show();
            }else if(status == 10){
                $("#canBtn").show();
            }else if(status == 100){
                $("#saveBtn").hide();
            }
        }
        if(mode == "mng"){
            $("#saveBtn").hide();
            if(status == 10){
                $("#recBtn").show();
                $("#comBtn").show();
            }
        }
    },

    saveBtn: function(){
        if(!confirm("직무기술서를 저장하시겠습니까?")){
            return;
        }

        let dutyMonth = $("#dutyMonth").val();
        let dutyName = $("#dutyName").val();
        let outlineName = $("#outlineName").val();
        let outlineDetail = $("#outlineDetail").val();
        let internal = $("#internal").val();
        let external = $("#external").val();
        let appLine = $("#appLine").val();
        let abilityA = $("#abilityA").val();
        let abilityB = $("#abilityB").val();
        let abilityC = $("#abilityC").val();
        let abilityD = $("#abilityD").val();
        let abilityE = $("#abilityE").val();
        let responsibility = $("#responsibility").val();

        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let mode = $("#mode").val();

        if(dutyName == ""){ alert("직무명이 작성되지 않았습니다."); return;}
        if(outlineName == ""){ alert("직무개요가 작성되지 않았습니다."); return;}
        if(outlineDetail == ""){ alert("직무내용이 작성되지 않았습니다."); return;}
        if(internal == ""){ alert("내부고객이 작성되지 않았습니다."); return;}
        if(external == ""){ alert("외부고객이 작성되지 않았습니다."); return;}
        if(appLine == ""){ alert("보고체계가 작성되지 않았습니다."); return;}
        if(abilityA == ""){ alert("학력 및 경력이 작성되지 않았습니다."); return;}
        if(abilityB == ""){ alert("전문지식이 작성되지 않았습니다."); return;}
        if(abilityC == ""){ alert("필수자질이 작성되지 않았습니다."); return;}
        if(abilityD == ""){ alert("자격 및 면허가 작성되지 않았습니다."); return;}
        if(abilityE == ""){ alert("기타 참고사항이 작성되지 않았습니다."); return;}
        if(responsibility == ""){ alert("주요책무가 작성되지 않았습니다."); return;}

        let data = {
            dutyMonth: dutyMonth,
            dutyName: dutyName,
            outlineName: outlineName,
            outlineDetail: outlineDetail,
            internal: internal,
            external: external,
            appLine: appLine,
            abilityA: abilityA,
            abilityB: abilityB,
            abilityC: abilityC,
            abilityD: abilityD,
            abilityE: abilityE,
            responsibility: responsibility,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        let url = "/campus/setDutyInfoIns";
        if(mode == "upd"){
            data.pk = $("#pk").val();
            url = "/campus/setDutyInfoUpd";
        }
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("직무기술서 저장이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }
    },

    fn_dutyCertReq: function(status){
        let data = {
            pk : $("#pk").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val(),
            status : status
        }

        var result = customKendo.fn_customAjax("/campus/setDutyCertReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }else if(status == 0){
                alert("승인 요청이 취소되었습니다.");
            }
            opener.gridReload();
            window.close();
        }
    }
}