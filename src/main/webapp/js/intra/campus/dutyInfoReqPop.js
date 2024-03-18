const dutyInfoReq = {
    global: {
        dutyInfo: {},
        applyMonthDataSource: []
    },

    init: function(){
        customKendo.fn_textBox(["dutyName", "appLine"]);
        customKendo.fn_textArea(["outlineName", "outlineDetail", "internal", "external", "abilityA", "abilityB", "abilityC", "abilityD", "abilityE", "responsibility"]);
        dutyInfoReq.dataSet();
        dutyInfoReq.pageSet();
        dutyInfoReq.buttonSet();
    },

    dataSet: function(){
        let mode = $("#mode").val();
        if(mode == "upd" || mode == "mng"){
            /** pk로 데이터 호출 */
            let dutyInfo = customKendo.fn_customAjax("/campus/getDutyInfoOne", {
                pk: $("#pk").val()
            }).data;
            dutyInfoReq.global.dutyInfo = dutyInfo;

            $("#dutyMonth").val(dutyInfo.DUTY_MONTH);
            $("#dutyName").val(dutyInfo.DUTY_NAME);
            $("#dutyNameMng").text(dutyInfo.DUTY_NAME);
            $("#outlineName").val(dutyInfo.OUTLINE_NAME);
            $("#outlineNameMng").html(dutyInfo.OUTLINE_NAME.replaceAll("\n", "<br>"));
            $("#outlineDetail").val(dutyInfo.OUTLINE_DETAIL);
            $("#outlineDetailMng").html(dutyInfo.OUTLINE_DETAIL.replaceAll("\n", "<br>"));
            $("#internal").val(dutyInfo.INTERNAL);
            $("#internalMng").html(dutyInfo.INTERNAL.replaceAll("\n", "<br>"));
            $("#external").val(dutyInfo.EXTERNAL);
            $("#externalMng").html(dutyInfo.EXTERNAL.replaceAll("\n", "<br>"));
            $("#appLine").val(dutyInfo.APP_LINE);
            $("#appLineMng").html(dutyInfo.APP_LINE.replaceAll("\n", "<br>"));
            $("#abilityA").val(dutyInfo.ABILITY_A);
            $("#abilityAMng").html(dutyInfo.ABILITY_A.replaceAll("\n", "<br>"));
            $("#abilityB").val(dutyInfo.ABILITY_B);
            $("#abilityBMng").html(dutyInfo.ABILITY_B.replaceAll("\n", "<br>"));
            $("#abilityC").val(dutyInfo.ABILITY_C);
            $("#abilityCMng").html(dutyInfo.ABILITY_C.replaceAll("\n", "<br>"));
            $("#abilityD").val(dutyInfo.ABILITY_D);
            $("#abilityDMng").html(dutyInfo.ABILITY_D.replaceAll("\n", "<br>"));
            $("#abilityE").val(dutyInfo.ABILITY_E);
            $("#abilityEMng").html(dutyInfo.ABILITY_E.replaceAll("\n", "<br>"));
            $("#responsibility").val(dutyInfo.RESPONSIBILITY);
            $("#responsibilityMng").html(dutyInfo.RESPONSIBILITY.replaceAll("\n", "<br>"));

            if(dutyInfo.STATUS == "100" || mode =="mng" || ($("#dutyMonth").val() != "" && $("#dutyMonth").val().split("-")[0] <= 2023)){
                $(".mng-mode").show();
                $(".upd-mode").hide();
            } else {
                $(".mng-mode").hide();
                $(".upd-mode").show();
            }
        }

        if(mode == "mng"){
            /** 불러온 데이터에서 작성자를 추출, 해당 작성자로 작성한 직무기술서 리스트 호출 */
            let applyMonthDataSource = customKendo.fn_customAjax("/campus/getDutyInfoList", {
                regEmpSeq: dutyInfoReq.global.dutyInfo.REG_EMP_SEQ
            }).list;
            dutyInfoReq.global.applyMonthDataSource = applyMonthDataSource;
        }
    },

    pageSet: function(){
        /** 변수 세팅 */
        let mode = $("#mode").val();
        let dutyInfo = dutyInfoReq.global.dutyInfo;
        let applyMonthDataSource = dutyInfoReq.global.applyMonthDataSource;
        let status = dutyInfo.STATUS;

        /** 켄도 UI 세팅 */
        if(mode == "mng"){
            $(".mngTr").show();
            $(".insTr").hide();

            customKendo.fn_dropDownList("applyMonth", applyMonthDataSource, "DUTY_MONTH_TEXT","DUTY_INFO_SN", 3);
            $("#applyMonth").data("kendoDropDownList").bind("change", function(e){
                let pk = $("#applyMonth").data("kendoDropDownList").value();
                $("#pk").val(pk);
                dutyInfoReq.dataSet();
                dutyInfoReq.pageSet();
                dutyInfoReq.buttonSet();
            });
        }else {
            $(".mngTr").hide();
            $(".insTr").show();
            customKendo.fn_datePicker("dutyMonth", 'year', "yyyy-MM", new Date());
            $("#dutyMonth").attr("readonly", true);
        }

        /** 데이터 세팅 */
        if(mode == "upd" || mode == "mng"){
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
        if(mode == "mng"){
            $("#userInfo").text(dutyInfo.REG_EMP_NAME+" "+dutyInfo.SPOT);
        }
        if((mode == "upd" && status == 10) || (mode == "upd" && status == 100) || mode == "mng" || ($("#dutyMonth").val() != "" && $("#dutyMonth").val().split("-")[0] <= 2023)){
            if(mode != "mng"){
                $("#dutyMonth").data("kendoDatePicker").enable(false);
            }
            $("#dutyName, #appLine, #outlineName, #outlineDetail, #internal, #external, #abilityA, #abilityB, #abilityC, #abilityD, #abilityE, #responsibility").attr("readonly", true);
        }
    },

    buttonSet: function(){
        $("#appBtn").hide();
        $("#canBtn").hide();
        $("#recBtn").hide();
        $("#comBtn").hide();

        let mode = $("#mode").val();
        let status = dutyInfoReq.global.dutyInfo.STATUS;
        if(mode == "upd"){
            if(status == 0 || status == 30) {
                $("#appBtn").show();
                $("#saveBtn").show();
            }else if(status == 10){
                $("#canBtn").show();
                $("#saveBtn").hide();
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

        if($("#dutyMonth").val() != "" && $("#dutyMonth").val().split("-")[0] <= 2023){
            $("#saveBtn").hide();
            $("#appBtn").hide();
            $("#canBtn").hide();
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
            opener.dutyInfo.gridReload();
            location.href = "/Campus/pop/dutyInfoReqPop.do?mode=upd&pk=" + result.params.dutyInfoSn;
        }
    },

    fn_dutyCertReq: function(status){
        let data = {
            pk : $("#pk").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val(),
            status : status
        }

        if(status == 10){
            if(!confirm("요청하시겠습니까?")){
                return;
            }
        } else if(status == 0){
            if(!confirm("취소하시겠습니까?")){
                return;
            }
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
            opener.dutyInfo.gridReload();
            window.close();
        }
    }
}