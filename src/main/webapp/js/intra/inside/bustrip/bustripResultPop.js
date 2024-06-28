var bustripResultPop = {
    global: {
        data : new Object(),
        attFiles : new Array(),
        tripCode : "",
        busResData : new Object(),
    },

    init: function(){
        bustrip.fn_setPageName();
        bustripResultPop.pageSet();
        // bustripResultPop.fn_crmChk();

        /** 출장결과보고 미작성 시 출장신청 데이터 로드 */
        if(hrBizReqResultId == ""){
            bustripResultPop.reqDataSet();
        }else{
            bustripResultPop.resDataSet();
        }

        if($("#carList").data("kendoDropDownList").value() == "0"){
            $("#moveDst").val(0)
            $(".bustripTr").hide();
        }
        if($("#carList").data("kendoDropDownList").text() == "기타"){
            $("#inputWrap").show();
            $("#costText").hide();
        } else {
            $("#inputWrap").hide();
        }

        if($("#tripCode").data("kendoRadioGroup").value() == 1){
            $("#costText").hide();
        }
    },

    pageSet: function(){
        window.resizeTo(1200, 795);
        /** Kendo 위젯 세팅 */
        customKendo.fn_textBox(["busnName", "popEmpName", "visitCrm", "visitLoc", "visitLocSub", "userName", "moveDst", "empName", "deptName", "dutyName", "carRmk", "regEmpName"]);
        customKendo.fn_textArea(["bustObj", "result"]);
        customKendo.fn_datePicker("reqDate", 'month', "yyyy-MM-dd", new Date());
        $("#visitCrm").attr("readonly", true);

        /** 출장코드 세팅 */
        bustrip.fn_tripCodeSet();
        /** 출장신청기간 세팅 */
        bustrip.fn_reqDtSet();
        /** 관련사업 세팅 */
        bustrip.fn_busnLgSet();
        /** 차량코드 세팅 */
        bustrip.fn_carCodeSet();
        /** 경유지코드 세팅 */
        bustrip.fn_waypointCodeSet();
        /** 운행자리스트 세팅 */
        bustrip.fn_realDriverSet();

        $("input[name='project']").click(function (){
            if(this.value == "2"){
                $("#busnLine").css("display", "");
            } else {
                $("#busnLine").css("display", "none");
            }
        });

        $("#date2").on("change", function(){
            const endDt = $("#date2").val();
            const pjtSn = $("#pjtSn").val();

            /** 종료일 시점 유가정보 조회 */
            const params = {
                endDt: endDt
            }
            if(pjtSn != "undefined" && pjtSn != "" && pjtSn != null){
                params.projectCd = busInfo.PJT_SN;
            }else{
                params.projectCd = "0";
            }

            const costInfo = customKendo.fn_customAjax("/bustrip/getRegFuelCost", params).data;

            if(costInfo != null){
                $("#costText").text("(10km당 기준유가 "+comma(costInfo.REG_COST_AMT)+"원 반영)");
            }
        });
    },

    reqDataSet: function(){
        console.log("reqDataSet");
        if(hrBizReqId == ""){ return; }

        const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: hrBizReqId
        });
        const busInfo = result.rs.rs;
        const list = result.rs.list;
        const fileInfo = result.rs.fileInfo;
        const fileInfo2 = result.rs.fileInfo2;
        const fileInfo3 = result.rs.fileInfo3;

        const extData = result.rs.extData;

        bustripResultPop.global.data = busInfo;

        /** 사번, 성명, 부서명, 신청일 */
        $("#empSeq").val(busInfo.EMP_SEQ);
        $("#empName").val(busInfo.EMP_NAME);
        $("#deptName").val(busInfo.DEPT_NAME);
        $("#reqDate").val(busInfo.REG_DATE);

        /** 구분 */
        $("#tripCode").data("kendoRadioGroup").value(busInfo.TRIP_CODE);
        bustripResultPop.global.tripCode = busInfo.TRIP_CODE;

        /** 관련사업, 프로젝트명 */
        bustripInit.settingProjectDataInit(busInfo);

        /** 동반자 */
        bustripInit.settingCompanionDataInit(list);

        /** 방문지 */
        $("#crmSn").val(busInfo.CRM_SN);
        $("#visitCrm").val(busInfo.VISIT_CRM);
        if($("#crmSn").val() == "99999999"){
            $("#crmYn").attr("checked", false);
            $("#visitCrm").data("kendoTextBox").enable(true);
            $("#crmBtn").attr('disabled', true);
        } else {
            $("#crmYn").attr("checked", true);
            $("#visitCrm").data("kendoTextBox").enable(false);
            $("#crmBtn").attr('disabled', false);
        }
        // bustripResultPop.fn_crmChk();

        /** 출장지역 */
        $("#visitLoc").val(busInfo.VISIT_LOC);

        /** 경유지, km, 경유지명*/
        let visitLocCode = $("#visitLocCode").data("kendoDropDownList");
        visitLocCode.value(busInfo.VISIT_LOC_CODE);
        visitLocCode.trigger("change");
        if($("#visitLocCode").val() == "999"){
            $("#visitLocSub").val(busInfo.VISIT_LOC_SUB);
        }

        /** 출장일 */
        $("#date1").val(busInfo.TRIP_DAY_FR);
        $("#date2").val(busInfo.TRIP_DAY_TO);
        $("#time1").val(busInfo.TRIP_TIME_FR);
        $("#time2").val(busInfo.TRIP_TIME_TO);

        if(busInfo.PJT_SN != null){
            $("#project").data("kendoRadioGroup").value("2");
            $("input[name='project'][value='2']").trigger("click");
        } else {
            $("#project").data("kendoRadioGroup").value("1");
            $("input[name='project'][value='1']").trigger("click");
        }

        $("#busnName").val(busInfo.BUSN_NAME);
        $("#pjtSn").val(busInfo.PJT_SN);

        $("#project").data("kendoRadioGroup").enable(false);

        /** 차량 */
        $("#carReqSn").val(busInfo.CAR_REQ_SN);
        $("#carList").data("kendoDropDownList").value(busInfo.USE_TRSPT);
        $("#carRmk").val(busInfo.USE_TRSPT_RMK);
        if(busInfo.USE_CAR == "Y"){
            $("#car2").prop("checked", true);
        } else {
            $("#car1").prop("checked", true);
        }
        if($("#carList").data("kendoDropDownList").text() == "기타"){
            $("#inputWrap").show();
        } else {
            $("#inputWrap").hide();
        }

        /** 출장목적 */
        $("#bustObj").val(busInfo.TITLE);

        /** 첨부파일 - 카드사용내역 */
        const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", {
            hrBizReqId: hrBizReqId
        });

        let tempArr = [];
        let count = 0;
        const bustripList = fileInfo;
        const bustripList2 = fileInfo2;
        const bustripList3 = fileInfo3;
        const cardList = cardResult.list;

        for(let i=0; i<bustripList.length; i++){
            tempArr[count] = bustripList[i];
            count ++;
        }

        // for(let i=0; i<bustripList2.length; i++){
        //     tempArr[count] = bustripList2[i];
        //     count ++;
        // }

        // for(let i=0; i<bustripList3.length; i++){
        //     tempArr[count] = bustripList3[i];
        //     count ++;
        // }

        // for(let i=0; i<cardList.length; i++){
        //     if(cardList[i].FILE_NO != null){
        //         const fileData = customKendo.fn_customAjax("/common/getFileInfo", {
        //             fileNo: cardList[i].FILE_NO
        //         }).data;
        //         tempArr[count] = fileData;
        //         count ++;
        //     }
        // }

        bustripInit.settingTempFileDataInit(tempArr, 'result', bustripResultPop.global.data.STATUS);

        /** 해외출장일시 폼 변경 */
        if(busInfo.TRIP_CODE == "4"){
            business.busiCk();
            $("#nationList").data("kendoDropDownList").value(busInfo.NATION_CODE);
            $("#nationList").data("kendoDropDownList").trigger("change");
        }

        /** 상황에 따른 켄도 위젯 할성화/비활성화 */
        if($("#mod").val() == "mng"){
            $(':radio:not(:checked)').attr('disabled', true);

            $("#busnName").data("kendoTextBox").enable(false);
            $("#projectAddBtn").css("display", "none");

            $("#popEmpName").data("kendoTextBox").enable(false);
            $("#addMemberBtn").css("display", "none");

            $("#visitCrm").data("kendoTextBox").enable(false);
            $("#visitLoc").data("kendoTextBox").enable(false);
            $("#crmBtn").css("display", "none");
            $("#crmYn").attr("disabled", "true");

            $("#visitLocCode").data("kendoDropDownList").enable(false);
            if($("#visitLocCode").val() == "999"){
                $("#visitLocSub").data("kendoTextBox").enable(false);
            }
            $("#date1").data("kendoDatePicker").enable(false);
            $("#date2").data("kendoDatePicker").enable(false);
            $("#time1").data("kendoTimePicker").enable(false);
            $("#time2").data("kendoTimePicker").enable(false);

            $("#carList").data("kendoDropDownList").enable(false);
            $("#carRmk").data("kendoDropDownList").enable(false);
            $("#carBtn").css("display", "none");

            $("#bustObj").data("kendoTextArea").enable(false);

            $("#moveDst").data("kendoTextBox").enable(false);
            $("#moveBtn").css("display", "none");
            $("#highpassBtn").css("display", "none");

            $("#realDriver").data("kendoDropDownList").enable(false);

            $("#result").data("kendoTextArea").enable(false);

            $("#fileUpload").css("display", "none");

            if($("#mod").val() == "mng"){
                $("#saveBtn").css("display", "none");
            }
        }

        if(extData.length != 0){
            var extName = "";
            var extBelong = "";
            var extSpot = "";
            var extEtc = "";

            for(var i = 0 ; i < extData.length ; i++){
                extName += extData[i].EXT_NM + ",";
                extBelong += extData[i].EXT_BELONG + ",";
                extSpot += extData[i].EXT_SPOT + ",";
                extEtc += extData[i].EXT_ETC + ",";
            }
            $("#externalName").val(extName.substring(0,extName.length-1));
            $("#externalBelong").val(extBelong.substring(0,extBelong.length-1));
            $("#externalSpot").val(extSpot.substring(0,extSpot.length-1));
            $("#externalEtc").val(extEtc.substring(0,extEtc.length-1));
        }

        const endDt = busInfo.TRIP_DAY_TO;
        const pjtSn = busInfo.PJT_SN;

        /** 종료일 시점 유가정보 조회 */
        const params = {
            endDt: endDt
        }
        if(pjtSn != null && pjtSn != ""){
            params.projectCd = pjtSn;
        }else{
            params.projectCd = "0";
        }

        const costInfo = customKendo.fn_customAjax("/bustrip/getRegFuelCost", params).data;

        if(costInfo != null){
            $("#costText").text("(10km당 기준유가 "+comma(costInfo.REG_COST_AMT)+"원 반영)");
        }
    },

    resDataSet: function() {
        console.log("resDataSet");
        const result = customKendo.fn_customAjax("/bustrip/getBustripResReqInfo", {
            hrBizReqId: hrBizReqId,
            hrBizReqResultId: hrBizReqResultId
        });

        console.log(result)

        const map = result.rs.map;
        const resInfo = result.rs.rsRes;
        const resList = result.rs.resList;
        const fileInfo = result.rs.fileInfo;
        const fileInfo2 = result.rs.fileInfo2;
        const fileInfo3 = result.rs.fileInfo3;
        const fileInfo4 = result.rs.fileInfo4;
        const extData = result.rs.extData;

        bustripResultPop.global.data = resInfo;
        bustripResultPop.global.busResData = resInfo;

        $("#apprBtnBox").html("");
        var apprBtnBoxHtml = "";
        if($("#mod").val() == "mng"){
            if(resInfo.EXP_STAT == 100){
                if(resInfo.STATUS == 100 || resInfo.STATUS == 101){
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+resInfo.DOC_ID+"\", \""+resInfo.DOC_APPRO_KEY+"\", \""+resInfo.DOC_MENU_CD+"\");'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>열람</span>" +
                        "</button>";
                } else{
                    apprBtnBoxHtml = "";
                }
            }
        }else{
            if(resInfo.EXP_STAT == 100){
                if(resInfo.STATUS == 0){
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='bustripResList.bustripResDrafting(\""+resInfo.HR_BIZ_REQ_RESULT_ID+"\");'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>상신</span>" +
                        "</button>";
                } else if(resInfo.STATUS == 10 || resInfo.STATUS == 50){
                    $("#fileUpload").css("display", "none");
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+resInfo.DOC_ID+"\", \""+resInfo.DOC_APPRO_KEY+"\", 1, \"retrieve\");'>" +
                        "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                        "<span class='k-button-text'>회수</span>" +
                        "</button>";
                } else if(resInfo.STATUS == 30 || resInfo.STATUS == 40){
                    apprBtnBoxHtml = "<button id='bustripResReBtn' type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='bustripResList.bustripResReDrafting(\""+resInfo.DOC_ID+"\", \"bustripRes\", \""+resInfo.DOC_APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>재상신</span>" +
                        "</button>";
                } else if(resInfo.STATUS == 100 || resInfo.STATUS == 101){
                    $("#fileUpload").css("display", "none");
                    $("#fileViewer").css("display", "");
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+resInfo.DOC_ID+"\", \""+resInfo.DOC_APPRO_KEY+"\", \""+resInfo.DOC_MENU_CD+"\");'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>열람</span>" +
                        "</button>";
                } else{
                    apprBtnBoxHtml = "";
                }
            } else {
                apprBtnBoxHtml = ""
            }
        }

        $("#apprBtnBox").html(apprBtnBoxHtml);

        if(resInfo != null && resInfo.DOC_ID != null){
            reDraftOnlyOne(resInfo.DOC_ID, $("#regEmpSeq").val(), "bustripResReBtn");
        }

        $("#empSeq").val(resInfo.EMP_SEQ);
        $("#empName").val(resInfo.EMP_NAME);
        $("#regEmpSeq").val(resInfo.REG_EMP_SEQ);
        $("#regEmpName").val(resInfo.REG_EMP_NAME);
        $("#deptName").val(resInfo.REG_DEPT_NAME);
        $("#reqDate").val(resInfo.REPORT_DATE);

        $("#tripCode").data("kendoRadioGroup").value(resInfo.TRIP_CODE);

        /** 관련사업, 프로젝트명 */
        bustripInit.settingProjectDataInit(resInfo);

        if(resInfo.PJT_SN != null){
            $("#project").data("kendoRadioGroup").value("2");
            $("input[name='project'][value='2']").trigger("click");
        } else {
            $("#project").data("kendoRadioGroup").value("1");
            $("input[name='project'][value='1']").trigger("click");
        }

        /** 동반자 */
        bustripInit.settingCompanionDataInit(resList);

        /** 방문지 */
        $("#crmSn").val(resInfo.CRM_SN);
        $("#visitCrm").val(resInfo.VISIT_CRM);
        if($("#crmSn").val() == "99999999"){
            $("#crmYn").attr("checked", false);
            $("#visitCrm").data("kendoTextBox").enable(true);
            $("#crmBtn").attr('disabled', true);
        } else {
            $("#crmYn").attr("checked", true);
            $("#visitCrm").data("kendoTextBox").enable(false);
            $("#crmBtn").attr('disabled', false);
        }
        // bustripResultPop.fn_crmChk();

        /** 출장지역 */
        $("#visitLoc").val(resInfo.VISIT_LOC);

        /** 경유지, km, 경유지명*/
        let visitLocCode = $("#visitLocCode").data("kendoDropDownList");
        visitLocCode.value(resInfo.VISIT_LOC_CODE);
        visitLocCode.trigger("change");
        if($("#visitLocCode").val() == "999"){
            $("#visitLocSub").val(resInfo.VISIT_LOC_SUB);
        }

        /** 출장일 */
        $("#date1").val(resInfo.TRIP_DAY_FR);
        $("#date2").val(resInfo.TRIP_DAY_TO);
        $("#time1").val(resInfo.TRIP_TIME_FR);
        $("#time2").val(resInfo.TRIP_TIME_TO);

        /** 차량 */
        $("#bustObj").val(resInfo.TITLE);
        $("#carReqSn").val(resInfo.CAR_REQ_SN);
        $("#carList").data("kendoDropDownList").value(resInfo.USE_TRSPT);
        $("#carRmk").val(resInfo.USE_TRSPT_RMK);
        if(resInfo.USE_CAR == "Y"){
            $("#car2").prop("checked", true);
        } else {
            $("#car1").prop("checked", true);
        }
        if($("#carList").data("kendoDropDownList").text() == "기타"){
            $("#inputWrap").show();
        } else {
            $("#inputWrap").hide();
        }

        /** 출장목적 */
        $("#bustObj").val(resInfo.TITLE);

        /** 해외출장일시 폼 변경 */
        if(resInfo.TRIP_CODE == "4"){
            business.busiCk();
            $("#nationList").data("kendoDropDownList").value(resInfo.NATION_CODE);
            $("#nationList").data("kendoDropDownList").trigger("change");
        }else{
            /** 운행거리 */
            $("#moveDst").val(resInfo.MOVE_DST);
            /** 운행자 */
            $("#realDriver").data("kendoDropDownList").value(resInfo.DRIVER_EMP_SEQ);
        }

        /** 출장 결과 */
        $("#result").val(resInfo.RESULT);

        /** 여비 표 */
        bustripInit.settingExnpDataInit(map);

        /** 첨부파일 */
        const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", {
            hrBizReqResultId: hrBizReqResultId
        });

        let tempArr = [];
        let count = 0;
        const bustripList = fileInfo;
        const bustripList2 = fileInfo2;
        const bustripList3 = fileInfo3;
        const bustripList4 = fileInfo4;
        const cardList = cardResult.list;

        for(let i=0; i<bustripList.length; i++){
            tempArr[count] = bustripList[i];
            count ++;
        }

        for(let i=0; i<bustripList2.length; i++){
            tempArr[count] = bustripList2[i];
            count ++;
        }

        // for(let i=0; i<bustripList3.length; i++){
        //     tempArr[count] = bustripList3[i];
        //     count ++;
        // }

        // for(let i=0; i<bustripList4.length; i++){
        //     tempArr[count] = bustripList4[i];
        //     count ++;
        // }

        // for(let i=0; i<cardList.length; i++){
        //     if(cardList[i].FILE_NO != null){
        //         const fileData = customKendo.fn_customAjax("/common/getFileInfo", {
        //             fileNo: cardList[i].FILE_NO
        //         }).data;
        //         tempArr[count] = fileData;
        //         count ++;
        //     }
        // }

        bustripInit.settingTempFileDataInit(tempArr, 'result', bustripResultPop.global.data.STATUS);
        bustrip.global.fileArray = tempArr;

        /** 상황에 따른 켄도 위젯 할성화/비활성화 */
        if(resInfo.STATUS == 100 || $("#mod").val() == "mng"){
            $(':radio:not(:checked)').attr('disabled', true);

            $("#busnName").data("kendoTextBox").enable(false);
            $("#projectAddBtn").css("display", "none");

            $("#popEmpName").data("kendoTextBox").enable(false);
            $("#addMemberBtn").css("display", "none");

            $("#visitCrm").data("kendoTextBox").enable(false);
            $("#visitLoc").data("kendoTextBox").enable(false);
            $("#crmBtn").css("display", "none");
            $("#crmYn").attr("disabled", "true");

            $("#visitLocCode").data("kendoDropDownList").enable(false);
            if($("#visitLocCode").val() == "999"){
                $("#visitLocSub").data("kendoTextBox").enable(false);
            }
            $("#date1").data("kendoDatePicker").enable(false);
            $("#date2").data("kendoDatePicker").enable(false);
            $("#time1").data("kendoTimePicker").enable(false);
            $("#time2").data("kendoTimePicker").enable(false);

            $("#carList").data("kendoDropDownList").enable(false);
            if(resInfo.TRIP_CODE != "4" && $("#carList").data("kendoDropDownList").text() == "기타"){
                $("#carRmk").data("kendoDropDownList").enable(false);
            }
            $("#carBtn").css("display", "none");

            $("#bustObj").data("kendoTextArea").enable(false);

            $("#moveDst").data("kendoTextBox").enable(false);
            $("#moveBtn").css("display", "none");
            $("#highpassBtn").css("display", "none");

            if(resInfo.TRIP_CODE != "4"){
                $("#realDriver").data("kendoDropDownList").enable(false);
            }

            $("#result").data("kendoTextArea").enable(false);

            $("#fileUpload").css("display", "none");

            if($("#mod").val() == "mng"){
                $("#saveBtn").css("display", "none");
            }
        }

        if(resInfo.TRIP_CODE == "4") {
            $("#exAddBtn").attr("disabled", "disabled");
        }

        if(extData.length != 0){
            var extName = "";
            var extBelong = "";
            var extSpot = "";
            var extEtc = "";

            for(var i = 0 ; i < extData.length ; i++){
                extName += extData[i].EXT_NM + ",";
                extBelong += extData[i].EXT_BELONG + ",";
                extSpot += extData[i].EXT_SPOT + ",";
                extEtc += extData[i].EXT_ETC + ",";
            }
            $("#externalName").val(extName.substring(0,extName.length-1));
            $("#externalBelong").val(extBelong.substring(0,extBelong.length-1));
            $("#externalSpot").val(extSpot.substring(0,extSpot.length-1));
            $("#externalEtc").val(extEtc.substring(0,extEtc.length-1));
        }

        const endDt = resInfo.TRIP_DAY_TO;
        const pjtSn = resInfo.PJT_SN;

        /** 종료일 시점 유가정보 조회 */
        const params = {
            endDt: endDt
        }
        if(pjtSn != null && pjtSn != ""){
            params.projectCd = pjtSn;
        }else{
            params.projectCd = "0";
        }

        const costInfo = customKendo.fn_customAjax("/bustrip/getRegFuelCost", params).data;

        if(costInfo != null){
            $("#costText").text("(10km당 기준유가 "+comma(costInfo.REG_COST_AMT)+"원 반영)");
        }

    },

    fn_saveBtn: function(){
        if($("#tripCode").data("kendoRadioGroup").value() == ""){ alert("출장 구분을 선택해주세요."); return;}
        if($("#project").data("kendoRadioGroup").value() != "1" && $("#busnName").val() == ""){ alert("사업명을 입력해주세요."); return;}
        if($("#visitCrm").val() == ""){ alert("방문지를 입력해주세요."); return; }
        if($("#visitLoc").val() == ""){ alert("출장지역을 입력해주세요."); return; }
        if($("#visitLocCode").val() == "999" && $("#visitLocSub").val() == ""){ alert("경유지명을 입력해주세요."); return;}
        if($("#bustObj").val() == ""){ alert("출장목적을 입력해주세요."); return; }
        if($("#tripCode").data("kendoRadioGroup").value() != 4 && $("#tripCode").data("kendoRadioGroup").value() != "") {
            if($("#carList").val() == ""){ alert("차량을 선택해주세요."); return; }
            if($("#carList").data("kendoDropDownList").text() == "기타" && $("#carRmk").val() == ""){ alert("차량을 입력해주세요."); return; }
        }
        if($("#tripCode").data("kendoRadioGroup").value() != 4){
            if($("#realDriver").val() == ""){ alert("운행자를 선택해주세요."); return; }
            if($("#moveDst").val() == ""){ alert("운행거리를 입력해주세요."); return; }
        }
        if($("#result").val() == ""){ alert("출장결과를 입력해주세요."); return; }

        var formData = new FormData();
        formData.append("menuCd", "bustripResReq");
        formData.append("hrBizReqId", hrBizReqId);
        formData.append("empSeq", $("#empSeq").val());
        formData.append("empName", $("#empName").val());
        formData.append("regEmpSeq", $("#regEmpSeq").val());
        formData.append("regEmpName", $("#regEmpName").val());
        formData.append("deptSeq", $("#regDeptSeq").val());
        formData.append("deptName", $("#regDeptName").val());
        formData.append("positionCode", $("#regPositionCode").val());
        formData.append("dutyCode", $("#regDutyCode").val());
        formData.append("applyDate", $("#reqDate").val());
        formData.append("tripCode", $("#tripCode").data("kendoRadioGroup").value());
        formData.append("busnName", $("#busnName").val());
        if($("#pjtSn").val() != ""){
            formData.append("pjtSn", $("#pjtSn").val());
        }
        formData.append("compEmpSeq", $("#popEmpSeq").val());
        formData.append("compEmpName", $("#popEmpName").val());
        formData.append("compDeptSeq", $("#popDeptSeq").val());
        formData.append("compDeptName", $("#popDeptName").val());
        if($("#crmYn").is(':checked')){
            formData.append("crmSn", $("#crmSn").val());
        } else {
            formData.append("crmSn", "99999999");
        }
        formData.append("visitCrm", $("#visitCrm").val());

        if($("#tripCode").data("kendoRadioGroup").value() != "4"){
            formData.append("visitLoc", $("#visitLoc").val());
            formData.append("moveDst", $("#moveDst").val());
            formData.append("driverEmpSeq", $("#realDriver").val());
            formData.append("realDriver", $("#realDriver").val());
        }else{
            formData.append("visitLoc", $("#nationList").data("kendoDropDownList").text());
            formData.append("nationCode", $("#nationList").data("kendoDropDownList").value());
            formData.append("moveDst", "0");
        }
        formData.append("visitLoc", $("#visitLoc").val());
        formData.append("visitLocSub", $("#visitLocCode").val() == "999" || $("#visitLocCode").val() == "" ? $("#visitLocSub").val() : $("#visitLocCode").data("kendoDropDownList").text());
        formData.append("visitLocCode", $("#visitLocCode").val());
        formData.append("tripDayFr", $("#date1").val());
        formData.append("tripDayTo", $("#date2").val());
        formData.append("tripTimeFr", $("#time1").val());
        formData.append("tripTimeTo", $("#time2").val());
        formData.append("useCar", "Y");
        formData.append("useTrspt", $("#carList").val());
        formData.append("title", $("#bustObj").val());
        formData.append("result", $("#result").val());
        formData.append("useTrsptRmk", $("#carRmk").val());

        formData.append("companionChangeCheck", $("#companionChangeCheck").val());

        var extArr = [];

        if($("#externalName").val() != ""){
            for(let i=0; i<$("#externalName").val().toString().split(",").length; i++){

                if($("#externalName").val().split(",")[i] != ""){
                    extArr.push({
                        belong : $("#externalBelong").val().split(",")[i] || "",
                        spot : $("#externalSpot").val().split(",")[i] || "",
                        name : $("#externalName").val().split(",")[i] || "",
                        etc : $("#externalEtc").val().split(",")[i] || ""
                    });
                }
            }
        }

        formData.append("externalArr", JSON.stringify(extArr));

        /** 증빙파일 첨부파일 */
        if(bustripResultPop.global.attFiles != null){
            for(var i = 0; i < bustripResultPop.global.attFiles.length; i++){
                formData.append("bustripResFile", bustripResultPop.global.attFiles[i]);
            }
        }

        if(hrBizReqResultId == ""){
            if(!confirm("출장 결과보고를 저장하고 다음단계로 넘어가시겠습니까?")){ return; }
        }else{
            /*if(!confirm("결과보고 데이터를 수정할 시, 여비정산 승인을 다시 받아야합니다. 수정하시겠습니까?")){ return; }*/
            formData.append("hrBizReqResultId", hrBizReqResultId);
        }

        /** 차량신청 체크 */
        if($("#tripCode").data("kendoRadioGroup").value() != 4 && $("#carList").val() != "10" && $("#carList").val() != "0"){
            let data = {
                startDt : $("#date1").val(),
                endDt : $("#date2").val(),
                startTime : $("#time1").val(),
                endTime : $("#time2").val(),
                useDeptSeq : $("#regDeptSeq").val(),
                useDeptName : $("#regDeptName").val(),
                carClassSn : $("#carList").val(),
                carClassText : $("#carList").data("kendoDropDownList").text(),
                carClassRmk : $("#carRmk").val(),
                carTypeSn : 1,
                carTypeText : "업무용",
                carTitleName : $("#bustObj").val(),
                visitName : $("#visitLoc").val(),
                waypointName : $("#visitLocSub").val(),
                empSeq : $("#empSeq").val(),
                empName : $("#empName").val(),
                regEmpSeq : $("#empSeq").val(),
                regEmpName : $("#empName").val(),
                type: "bustripReq"
            }

            if($("#carList").data("kendoDropDownList").text() != "기타"){
                carReq.searchDuplicateCar(data);
            } else {
                flag = true;
            }

            if(flag) {
                data.carReqSn = $("#carReqSn").val();
                carReq.setCarRequestUpdate(data);
                formData.append("carReqSn", $("#carReqSn").val());
            } else {
                return ;
            }
        }else {
            flag = true;
        }

        if(flag){
            $.ajax({
                url : "/bustrip/saveBustripResult",
                type : 'POST',
                data : formData,
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                async : false,
                success : function(result){
                    if(bustripResultPop.global.busResData != null && bustripResultPop.global.busResData.DOC_ID != null){
                        let formId = "136";

                        let tripCode = $("#tripCode").data("kendoRadioGroup").value();

                        /** 도내 */
                        if(tripCode == 1 || tripCode == 2) {
                            formId = "136";

                            /** 도외 */
                        }else if(tripCode == 3) {
                            formId = "170";

                            /** 해외 */
                        }else if(tripCode == 4) {
                            formId = "171";
                        }

                        customKendo.fn_customAjax("/approval/setFormIdUpd", {
                            docId : bustripResultPop.global.busResData.DOC_ID,
                            formId : formId
                        });
                    }

                    console.log(result);
                    if(hrBizReqResultId == ""){
                        alert("출장 결과보고 저장이 완료되었습니다.");
                        var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqResultId="+result.params.hrBizReqResultId+"&hrBizReqId="+hrBizReqId+"&tripType="+$("#tripCode").data("kendoRadioGroup").value();
                    }else{
                        alert("출장 결과보고 수정이 완료되었습니다.");
                        var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqResultId="+hrBizReqResultId+"&hrBizReqId="+hrBizReqId+"&tripType="+$("#tripCode").data("kendoRadioGroup").value();
                    }
                    var name = "_self";
                    var option = "width=1700, height=750, scrollbars=no, top=100, left=100, resizable=no, toolbars=no, menubar=no"
                    var popup = window.open(url, name, option);
                    opener.gridReload();
                }
            });
        }
    },

    fn_setCertRep : function (p){
        let message = "승인하시겠습니까?";
        if(p == 30){ message = "반려하시겠습니까?"; }
        if(!confirm(message)){ return; }

        let data = {
            hrBizReqResultId : hrBizReqResultId,
            empSeq : $("#regEmpSeq").val(),
            status : p
        }

        const result = customKendo.fn_customAjax("/bustrip/setReqCert", data);

        if(result.flag){
            if(p == 30){
                alert("반려되었습니다.");
            }else{
                alert("승인되었습니다.");
            }
            opener.gridReload();
            window.close();
        }
    },

    fn_moveCheck: function(){
        /*alert("거리는 최단거리로 입력해야 합니다.");
        window.open('https://map.naver.com/');*/

        $.ajax({
            url : "/common/findMap",
            type : 'POST',
            data : {
                addr : $("#visitLoc").val()
            },
            dataType : "json",
            async : false,
            success : function(rs){
                var dist = rs.route[0].summary.distance;
                var moveDst = dist / 1000;
                var formattedNumber = moveDst * 2;
                formattedNumber = Math.round(formattedNumber);

                $("#moveDst").val(formattedNumber);
            }
        });
    },

    fn_popCamCrmList: function(){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_crmChk : function(){
        if($("#crmYn").is(':checked')){
            $("#visitCrm").data("kendoTextBox").enable(false);
            $("#crmBtn").attr('disabled', false);
        } else {
            $("#visitCrm").data("kendoTextBox").enable(true);
            $("#crmBtn").attr('disabled', true);
        }

        $("#visitCrm").val("");
        $("#crmSn").val("");
        $("#visitLoc").val("");
    },

    bustripExnpPop : function (){

        var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqResultId="+hrBizReqResultId+"&mode=mng&type=upd";

        var name = "bustripExnpPop";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    boardViewPop: function(){
        let url = "/Inside/pop/boardViewPop.do";
        const name = "boardViewPop";
        const option = "width = 1420, height = 730, top = 100, left = 200, location = no";
        window.open(url, name, option);

    },

    addrSearch : function(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#visitLoc").val(roadAddr);

                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        //$("#subAddr").val(extraRoadAddr);
                    } else {
                        //$("#subAddr").val("");
                    }

                    var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시
                    if(data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if(data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else if(guideTextBox != null){
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }

                    $("#visitLoc").focus();
                }
            }).open();
        });
    },

    fn_mapOpen : function (){
        var url = "https://map.kakao.com/";
        var name = "mapOpen";
        var option = "width = 1200, height = 800, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    mapFormDown : function (){
        var protocol = window.location.protocol + "//";
        var locationHost = protocol + window.location.host;

        var filePath = "/upload/templateForm/mapExnpForm.hwp";

        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent('운행거리지출증빙.hwp'),
        });
    },

    exnpPdfViewer : function (){

    },

    makeHtmlToPdf : function(){
        var hostUrl = "";
        if(window.location.host.indexOf("218.158.231.184") > -1 || window.location.host.indexOf("new.camtic.or.kr") > -1){
            hostUrl = "http://218.158.231.184";
        } else {
            hostUrl = "http://218.158.231.186";
        }

        var selCorpType = {
            1 : '유류비',
            2 : '교통비',
            3 : '숙박비',
            4 : '통행료',
            5 : '일비',
            6 : '식비',
            7 : '주차비',
            8 : '기타'
        }

        const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", {hrBizReqResultId: hrBizReqResultId});
        const cardList = cardResult.list;

        var infoData = bustripResultPop.global.data;
        console.log(infoData);
        console.log("infoData");

        const empInfo = customKendo.fn_customAjax("/bustrip/getBustripEmpInfo", {empSeq: infoData.REG_EMP_SEQ}).empInfo;

        console.log(empInfo);

        var emp = empInfo.PARENT_DEPT_NAME + " " + empInfo.DEPT_NAME + " " + empInfo.EMP_NAME_KR;

        if(empInfo.DUTY_NAME != ""){
            emp += " " + empInfo.DUTY_NAME;
        }else{
            emp += " " + empInfo.POSITION_NAME;
        }
        var html = "";

        for(let i=0; i<cardList.length; i++){
            const cardMap = cardList[i];

            var data = {
                hrBizReqResultId: hrBizReqResultId,
                cardNo : cardMap.CARD_NO,
                authDate : cardMap.AUTH_DD,
                authNo : cardMap.AUTH_NO,
                authTime : cardMap.AUTH_HH,
                buySts : cardMap.BUY_STS
            }

            const corpCardHist = customKendo.fn_customAjax("/bustrip/getExnpHistOne", data).map;
            const iBrenchResult = customKendo.fn_customAjax("/cam_mng/companyCard/useCardDetail", data);
            const e = iBrenchResult.cardInfo;

            let useDate = infoData.TRIP_DAY_FR.replace(/-/g, ".") + " ~ " + infoData.TRIP_DAY_TO.replace(/-/g, ".");
            let useType = selCorpType[corpCardHist.EXNP_TYPE];
            let useAmt = e.AUTH_AMT;
            if(useAmt != ""){useAmt = comma(useAmt)}else{useAmt = "0";}
            let usePurpose = "출장기간(" + infoData.TRIP_DAY_FR.replace(/-/g, "/") + " ~ " + infoData.TRIP_DAY_TO.replace(/-/g, "/") + ", "
                                    + e.MER_NM + ")동안에 발생한 여비";

            let corpCardHistFile;
            if(corpCardHist.FILE_NO != "" && corpCardHist.FILE_NO != undefined){
                let data2 = {
                    hrBizReqResultId: hrBizReqResultId,
                    exnpType: corpCardHist.EXNP_TYPE,
                    FILE_NO: corpCardHist.FILE_NO
                };
                corpCardHistFile = customKendo.fn_customAjax("/bustrip/getExnpHistFileOne", data2).data;
            }

            let receiptFile = '<div style="width: 70%; text-align: center; margin: 0 auto;">';
            if(corpCardHist.FILE_NO != "" && corpCardHist.FILE_NO != undefined){
                // for(let i=0; i<corpCardHistFile.length; i++){
                    receiptFile += '<img src="' + hostUrl + corpCardHistFile.file_path + corpCardHistFile.file_uuid + '" />';
                // }
            }
            receiptFile += '</div>';
            
            html += "<form class='pdfForm' style=\"padding: 20px 30px;width:100%;height: 100%;\">" +
                "<h1 style=\"text-align: center;padding-bottom: 5px; font-size: 30px\"><b>여 비 지 출 증 빙 자 료</b></h1>" +
                "<table style=\"margin-top: 10px; padding-left: 5px;width:100%;height:100%;font-size: 16px;background: white;color: black;border: 2px solid black;\">" +
                "<tr>" +
                "<th style=\"width:110px;height: 60px;background-color: #ffe0e0;padding-left: 5px;border: 1px solid black;font-weight: bold;\">사용일</th>" +
                "<td style=\"width:220px;border: 1px solid black;text-align:center;\">"+useDate+"</td>" +
                "<th style=\"width:110px;background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;font-weight: bold;\">카드사용</th>" +
                "<td style=\"width:220px;border: 1px solid black;text-align:center;\">법인</td>" +
                "</tr>" +
                "<tr>" +
                "<th style=\"width:110px;height: 60px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;font-weight: bold;\">사용구분</th>" +
                "<td style=\"width:220px;padding-left: 5px; border: 1px solid black;text-align:center;\">"+useType+"</td>" +
                "<th style=\"width:110px;background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;font-weight: bold;\">사용금액</th>" +
                "<td style=\"width:220px;border: 1px solid black;text-align:center;\">"+useAmt+"원</td>" +
                "</tr>" +
                "<tr>" +
                "<th style=\"width:110px; height: 60px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;font-weight: bold;\">사용자</th>" +
                "<td colspan=\"3\" style=\"padding-left: 5px; border: 1px solid black;\">"+emp+"</td>" +
                "</tr>" +
                "<tr>" +
                "<th style=\"width:110px; height: 60px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;font-weight: bold;\">사용목적</th>" +
                "<td colspan=\"3\" style=\"padding-left: 5px; border: 1px solid black;\">"+usePurpose+"</td>" +
                "</tr>" +
                "<tr>" +
                "<th style=\"width:110px; height: 60px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;font-weight: bold;\">관련사업</th>" +
                "<td colspan=\"3\" style=\"padding-left: 5px; border: 1px solid black;\">"+infoData.BUSN_NAME+"</td>" +
                "</tr>" +
                "<tr>" +
                "<th colspan=\"4\" style=\"background-color: #ffe0e0; height: 40px; padding-left: 5px; text-align: center; border: 1px solid black;font-weight: bold;\">증 빙 서 류</th>" +
                "</tr>" +
                "<tr>" +
                "<td colspan=\"4\" style=\"height: 600px;border: 1px solid black;\">" +
                "<div style=\"display: flex; flex-wrap: wrap;\">"+
                receiptFile+
                "</div></td>" +
                "</tr>" +
                "</table>" +
                "</form>";

            $("#pdfDiv").append(html);
        }

        $.ajax({
            url : "/bustrip/makeHtmlToPdf",
            data: {
                html : html,
                hrBizReqResultId: hrBizReqResultId
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);
            }
        });
    },

    addFileInfoTable : function(){
        let size = 0;
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            bustripResultPop.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        if(bustripResultPop.global.attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < bustripResultPop.global.attFiles.length; i++) {
                size = fCommon.bytesToKB(bustripResultPop.global.attFiles[i].size);
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td>' + bustripResultPop.global.attFiles[i].name.substring(0, bustripResultPop.global.attFiles[i].name.lastIndexOf(".")) + '</td>';
                html += '   <td>' + bustripResultPop.global.attFiles[i].name.substring(bustripResultPop.global.attFiles[i].name.lastIndexOf(".")+1) + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td></td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="bustripResultPop.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }
    },

    fnUploadFile : function(e) {
        let size = 0;
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(bustripResultPop.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        bustripResultPop.global.attFiles = dataTransfer.files;

        if(bustripResultPop.global.attFiles.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <bustripResultPop.global.attFiles.length; i++) {
                size = fCommon.bytesToKB(bustripResultPop.global.attFiles[i].size);
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td>' + bustripResultPop.global.attFiles[i].name.substring(0, bustripResultPop.global.attFiles[i].name.lastIndexOf(".")) + '</td>';
                html += '   <td>' + bustripResultPop.global.attFiles[i].name.substring(bustripResultPop.global.attFiles[i].name.lastIndexOf(".")+1) + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td></td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="bustripResultPop.fnUploadFile(' + i + ')">';
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }else{
            $("#fileGrid").find(".addFile").remove();

            if($("#fileGrid").find("tr").length == 0){
                $("#fileGrid").html('<tr class="defultTr">' +
                    '	<td colspan="5" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }

        if(bustripResultPop.global.attFiles.length == 0){
            bustripResultPop.global.attFiles = new Array();
        }

    },
}

function userDataSet(userArr){
    let userText = "";
    let userSn = "";
    let userDeptText = "";
    let userDeptSn = "";
    for(let i=0; i<userArr.length; i++) {
        if(userText != "") {
            userText += ",";
            userSn += ",";
            userDeptText += ",";
            userDeptSn += ",";
        }
        userText += userArr[i].empName;
        userSn += userArr[i].empSeq;
        userDeptText += userArr[i].deptName;
        userDeptSn += userArr[i].deptSeq;
    }

    $("#popEmpSeq").val(userSn);
    $("#popEmpName").val(userText);
    $("#popDeptSeq").val(userDeptSn);
    $("#popDeptName").val(userDeptText);

    if(bustrip.global.pageName == "bustripResultPop"){
        userArr.unshift({
            empName : $("#regEmpName").val(),
            empSeq : $("#regEmpSeq").val()
        })
        customKendo.fn_dropDownList("realDriver", userArr, "empName", "empSeq", "3");
    }

    $("#companionChangeCheck").val("Y");
}

var renderedImg = new Array;
var contWidth = 190, // 너비(mm) (a4에 맞춤)
    padding = 10; //상하좌우 여백(mm)
const bustripPdfMake = () => {

    $("#pdfDiv").css("display", "");

    // var lists = document.querySelectorAll(".pdfForm"),
    //     deferreds = [],
    //     doc = new jsPDF("p", "mm", "a4"),
    //     listsLeng = lists.length;
    // for (var i = 0; i < listsLeng; i++) { // pdf_page 적용된 태그 개수만큼 이미지 생성
    //     var deferred = $.Deferred();
    //     deferreds.push(deferred.promise());
    //     generateCanvas(i, doc, deferred, lists[i], contWidth);
    // }

    // $.when.apply($, deferreds).then(function () { // 이미지 렌더링이 끝난 후
    //     var sorted = renderedImg.sort(function (a, b) {
    //             return a.num < b.num ? -1 : 1;
    //         }), // 순서대로 정렬
    //         curHeight = 30, //위 여백 (이미지가 들어가기 시작할 y축)
    //         sortedLeng = sorted.length;
    //
    //     for (var i = 0; i < sortedLeng; i++) {
    //         var sortedHeight = sorted[i].height, //이미지 높이
    //             sortedImage = sorted[i].image; //이미지w
    //
    //         // 페이지 추가
    //         if (i > 0) {
    //             doc.addPage();
    //             curHeight = 30;
    //         }
    //
    //         // 이미지 추가
    //         doc.addImage(sortedImage, 'jpeg', padding, curHeight, contWidth, sortedHeight);
    //
    //         var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    //
    //         doc.addFileToVFS('myFont.ttf', fontJs);
    //         doc.addFont('myFont.ttf', 'myFont', 'normal');
    //         doc.setFont('myFont');
    //         doc.text("사단법인캠틱종합기술원", padding + contWidth / 2, pageHeight - 10, { align: 'center', baseline: 'middle' });
    //         /*doc.text("사단법인캠틱종합기술원", 10, pageHeight  - 10, {align: 'left', baseline: 'middle'});*/
    //
    //         curHeight += sortedHeight; // y축 = 여백 + 새로 들어간 이미지 높이
    //     }
    //
    //     doc.save('법인카드 지출증빙.pdf'); //pdf 저장
    //
    //     /*doc.output('blob', function(blob) {
    //         var reader = new FileReader();
    //         reader.onloadend = function() {
    //             var formData = new FormData();
    //             formData.append('bustripPdfFile', reader.result);
    //             formData.append('menuCd', "bustripPdf");
    //
    //             $.ajax({
    //                 url: '/bustrip/setBustripPdfFile',
    //                 data: formData,
    //                 type: "post",
    //                 async: false,
    //                 datatype: "json",
    //                 contentType: false,
    //                 processData: false,
    //                 success: function (response) {
    //                     console.log('파일 업로드 성공:', response);
    //                 },
    //                 error: function (xhr, status, error) {
    //                     console.error('파일 업로드 실패:', error);
    //                 }
    //             });
    //         };
    //         reader.readAsDataURL(blob);
    //     });*/
    //
    //     curHeight = padding; //y축 초기화
    //     renderedImg = new Array; //이미지 배열 초기화
    // });
}

function generateCanvas(i, doc, deferred, curList, contW){ //페이지를 이미지로 만들기
    var pdfWidth = $(curList).outerWidth() * 0.2645, //px -> mm로 변환
        pdfHeight = $(curList).outerHeight() * 0.2645,
        heightCalc = contW * pdfHeight / pdfWidth; //비율에 맞게 높이 조절

    html2canvas( curList,  { logging: true, letterRendering: 1, useCORS: true } ).then(
        function (canvas) {
            var img = canvas.toDataURL('image/jpeg', 1.0); //이미지 형식 지정
            renderedImg.push({num:i, image:img, height:heightCalc}); //renderedImg 배열에 이미지 데이터 저장(뒤죽박죽 방지)
            deferred.resolve(); //결과 보내기
            $("#pdfDiv").css("display", "none");
        }
    );
}