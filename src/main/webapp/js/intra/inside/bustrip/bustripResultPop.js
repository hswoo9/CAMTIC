var bustripResultPop = {

    init : function(){
        bustripResultPop.pageSet();
        bustripResultPop.dataSet();
    },

    pageSet: function(){
        let url;
        let data = {

        }
        if(hrBizReqResultId == ""){
            bustripReq.init();
            url = "/bustrip/getBustripTotInfo";
            data.hrBizReqId = hrBizReqId;
        }else{
            bustripReq.pageSet();
            url = "/bustrip/getBustripResTotInfo";
            data.hrBizReqResultId = hrBizReqResultId;
        }
        let ds = customKendo.fn_customAjax(url, data);
        customKendo.fn_dropDownList("realDriver", ds.list, "EMP_NAME", "EMP_SEQ", "3");
        customKendo.fn_textArea(["result"]);
    },

    dataSet : function() {
        if(hrBizReqResultId != ""){
            let result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
                hrBizReqId: hrBizReqId,
                hrBizReqResultId: hrBizReqResultId
            });

            let resInfo = result.rs.rsRes;
            let resList = result.rs.resList;
            var fileInfo = result.rs.fileInfo;

            $("#tripCode").data("kendoDropDownList").value(resInfo.TRIP_CODE);
            var prjCd = resInfo.PROJECT_CD;
            var bcDsData = {
                cmGroupCode : "BUSN_CLASS",
            }
            var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
            if(prjCd == "R" || prjCd == "S"){
                $("#busnLgClass").data("kendoDropDownList").value(1);
                $("#project").css("display", "");
                customKendo.fn_dropDownList("project", bcDs.rs.splice(0, 2), "CM_CODE_NM", "CM_CODE",1);
                $("#project").data("kendoDropDownList").value(resInfo.PROJECT_CD);
                $("#busnName").val(resInfo.BUSN_NAME);
            }else if(prjCd == "R" || prjCd == "S" || prjCd == "S"){
                $("#busnLgClass").data("kendoDropDownList").value(2);
                $("#project").css("display", "");
                customKendo.fn_dropDownList("project", bcDs.rs.splice(2, 3), "CM_CODE_NM", "CM_CODE",1);
                $("#project").data("kendoDropDownList").value(resInfo.PROJECT_CD);
                $("#busnName").val(resInfo.BUSN_NAME);
            }

            if($("#project").val() == 0 || $("#project").val() == ""){
                $("#busnLine").css("display", "none");
            } else {
                $("#busnLine").css("display", "");
            }

            $("#crmSn").val(resInfo.CRM_SN);
            $("#visitCrm").val(resInfo.VISIT_CRM);
            $("#visitLoc").val(resInfo.VISIT_LOC);
            $("#visitLocCode").data("kendoDropDownList").value(resInfo.VISIT_LOC_CODE);
            if($("#visitLocCode").val() == "999"){
                $(".visitMove").hide();
                $(".visitLocSub").show();
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", false);
                    $("#moveBtn").attr("disabled", false);
                }
            }else if($("#visitLocCode").val() == ""){
                $(".visitLocSub").hide();
                $(".visitMove").show();
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", false);
                    $("#moveBtn").attr("disabled", false);
                }
            }else{
                $(".visitLocSub").hide();
                $(".visitMove").show();
                let code = $("#visitLocCode").data("kendoDropDownList").value();
                let distance = 0;
                for(let i=0; i<bustripReq.global.waypointArr.length; i++){
                    let pk = bustripReq.global.waypointArr[i].HR_WAYPOINT_INFO_SN;
                    if(pk == code){
                        distance = bustripReq.global.waypointArr[i].DISTANCE;
                    }
                }
                $(".visitMoveSpan").text(distance+" km");
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", true);
                    $("#moveBtn").attr("disabled", true);
                }
            }
            $("#visitLocSub").val(resInfo.VISIT_LOC_SUB);
            $("#date1").val(resInfo.TRIP_DAY_FR);
            $("#date2").val(resInfo.TRIP_DAY_TO);
            $("#time1").val(resInfo.TRIP_TIME_FR);
            $("#time2").val(resInfo.TRIP_TIME_TO);
            $("#bustObj").val(resInfo.TITLE);
            $("#carList").data("kendoDropDownList").value(resInfo.USE_TRSPT);
            if(resInfo.USE_CAR == "Y"){
                $("#car2").prop("checked", true);
            } else {
                $("#car1").prop("checked", true);
            }

            var popEmpSeq = "" ;
            var popEmpName = "";
            var popDeptSeq = "";
            var popDeptName = "";
            for(var i = 0; i < resList.length; i++){
                if(i!=0){
                    popEmpSeq += ",";
                    popEmpName += ",";
                    popDeptSeq += ",";
                    popDeptName += ",";
                }
                popEmpSeq += resList[i].EMP_SEQ;
                popEmpName += resList[i].EMP_NAME;
                popDeptSeq += resList[i].DEPT_SEQ;
                popDeptName += resList[i].DEPT_NAME;
            }
            $("#popEmpSeq").val(popEmpSeq);
            $("#popEmpName").val(popEmpName);
            $("#popDeptSeq").val(popDeptSeq);
            $("#popDeptName").val(popDeptName);

            bustripReq.settingTempFileDataInit(fileInfo, 'result');

            $("#empSeq").val(resInfo.EMP_SEQ);
            $("#empName").val(resInfo.EMP_NAME);
            $("#deptName").val(resInfo.DEPT_NAME);
            $("#reqDate").val(resInfo.REG_DATE);
            $("#moveDst").val(resInfo.MOVE_DST);
            $("#result").val(resInfo.RESULT);

            $("#visitLocCode").data("kendoDropDownList").bind("change", function(){
                if($("#visitLocCode").val() == "999"){
                    $(".visitMove").hide();
                    $(".visitLocSub").show();
                    if(pageName == "bustripResReq"){
                        $("#moveDst").attr("disabled", false);
                        $("#moveBtn").attr("disabled", false);
                    }
                }else if($("#visitLocCode").val() == ""){
                    $(".visitLocSub").hide();
                    $(".visitMove").show();
                    if(pageName == "bustripResReq"){
                        $("#moveDst").attr("disabled", false);
                        $("#moveBtn").attr("disabled", false);
                    }
                }else{
                    $(".visitLocSub").hide();
                    $(".visitMove").show();
                    let code = $("#visitLocCode").data("kendoDropDownList").value();
                    let distance = 0;
                    for(let i=0; i<bustripReq.global.waypointArr.length; i++){
                        let pk = bustripReq.global.waypointArr[i].HR_WAYPOINT_INFO_SN;
                        if(pk == code){
                            distance = bustripReq.global.waypointArr[i].DISTANCE;
                        }
                    }
                    $(".visitMoveSpan").text(distance+" km");
                    $("#moveDst").val(distance);
                    if(pageName == "bustripResReq"){
                        $("#moveDst").attr("disabled", true);
                        $("#moveBtn").attr("disabled", true);
                    }
                }
            });

            if(resInfo.STATUS == 100 || $("#mod").val() == "mng"){
                $("#popEmpName").data("kendoTextBox").enable(false);
                $("#tripCode").data("kendoDropDownList").enable(false);
                $("#visitCrm").data("kendoTextBox").enable(false);
                $("#visitLoc").data("kendoTextBox").enable(false);
                $("#visitLocSub").data("kendoTextBox").enable(false);
                $("#visitLocCode").data("kendoDropDownList").enable(false);
                $("#bustObj").data("kendoTextArea").enable(false);
                $("#date1").data("kendoDatePicker").enable(false);
                $("#date2").data("kendoDatePicker").enable(false);
                $("#time1").data("kendoTimePicker").enable(false);
                $("#time2").data("kendoTimePicker").enable(false);
                $("#carList").data("kendoDropDownList").enable(false);
                $("input[name='useCar']").attr("disabled", true);
                $("#popEmpSeq").val(popEmpSeq.slice(0, -1));
                $("#modBtn").css("display", "none");
                $("#fileUpload").css("display", "none");
                $("#addMemberBtn").attr("disabled", true);
                $("#projectAddBtn").attr("disabled", true);
                $("#carBtn").css("display", "none");
                $("#result").data("kendoTextArea").enable(false);
                if($("#mod").val() == "mng"){
                    $("#saveBtn").css("display", "none");
                    var map = result.rs.map;
                    console.log("여깁니다");
                    console.log(map);
                    var html = "";
                    let oilCostTotal = 0;
                    let trafCostTotal = 0;
                    let trafDayTotal = 0;
                    let tollCostTotal = 0;
                    let dayCostTotal = 0;
                    let eatCostTotal = 0;
                    let parkingCostTotal = 0;
                    let etcCostTotal = 0;
                    let totalCostTotal = 0;

                    let oilCorpCostTotal = 0;
                    let trafCorpCostTotal = 0;
                    let trafDayCorpotal = 0;
                    let tollCorpCostTotal = 0;
                    let dayCorpCostTotal = 0;
                    let eatCorpCostTotal = 0;
                    let parkingCorpCostTotal = 0;
                    let etcCorpCostTotal = 0;
                    let totalCorpCostTotal = 0;

                    for(var i = 0 ; i < map.length ; i++){

                        if(map[i].DRIVER == "Y"){
                            $("#realDriver").data("kendoDropDownList").value(map[i].EMP_SEQ)
                        }

                        oilCostTotal += Number(map[i].OIL_COST.replace(",", ""));
                        trafCostTotal += Number(map[i].TRAF_COST.replace(",", ""));
                        trafDayTotal += Number(map[i].TRAF_DAY_COST.replace(",", ""));
                        tollCostTotal += Number(map[i].TOLL_COST.replace(",", ""));
                        dayCostTotal += Number(map[i].DAY_COST.replace(",", ""));
                        eatCostTotal += Number(map[i].EAT_COST.replace(",", ""));
                        parkingCostTotal += Number(map[i].PARKING_COST.replace(",", ""));
                        etcCostTotal += Number(map[i].ETC_COST.replace(",", ""));
                        totalCostTotal += Number(map[i].TOT_COST.replace(",", ""));


                        html += "<tr style='text-align: right'>";
                        html += "   <td style='text-align: center'>"+map[i].EMP_NAME+"</td>";
                        if(map[i].OIL_CORP_YN != "Y"){
                            html += "   <td>"+map[i].OIL_COST+"</td>";
                        }else{
                            oilCorpCostTotal += Number(map[i].OIL_COST.replace(",", ""));
                            html += "   <td></td>";
                        }

                        if(map[i].TRAF_CORP_YN != "Y"){
                            html += "   <td>"+map[i].TRAF_COST+"</td>";
                        }else{
                            trafCorpCostTotal += Number(map[i].TRAF_COST.replace(",", ""));
                            html += "   <td></td>";
                        }

                        if(map[i].TRAF_CORP_YN != "Y"){
                            html += "   <td>"+map[i].TRAF_DAY_COST+"</td>"
                        }else{
                            trafDayCorpotal += Number(map[i].TRAF_DAY_COST.replace(",", ""));
                            html += "   <td></td>";
                        }

                        if(map[i].TOLL_CORP_YN != "Y"){
                            html += "   <td>"+map[i].TOLL_COST+"</td>";
                        }else{
                            tollCorpCostTotal += Number(map[i].TOLL_COST.replace(",", ""));
                            html += "   <td></td>";
                        }

                        html += "   <td>"+map[i].DAY_COST+"</td>";

                        if(map[i].EAT_CORP_YN != "Y"){
                            html += "   <td>"+map[i].EAT_COST+"</td>";
                        }else{
                            eatCorpCostTotal += Number(map[i].EAT_COST.replace(",", ""));
                            html += "   <td></td>";
                        }

                        if(map[i].PARKING_CORP_YN != "Y"){
                            html += "   <td>"+map[i].PARKING_COST+"</td>";
                        }else{
                            parkingCorpCostTotal += Number(map[i].PARKING_COST.replace(",", ""));
                            html += "   <td></td>";
                        }

                        if(map[i].ETC_CORP_YN != "Y"){
                            html += "   <td>"+map[i].ETC_COST+"</td>";
                        }else{
                            etcCorpCostTotal += Number(map[i].ETC_COST.replace(",", ""));
                            html += "   <td></td>";
                        }

                        if(map[i].TOLL_CORP_YN != "Y"){
                            html += "   <td>"+map[i].TOT_COST+"</td>";
                            html += "   <td></td>";
                        }else{
                            totalCorpCostTotal += Number(map[i].TOT_COST.replace(",", ""));
                            html += "   <td></td>";
                        }


                        html += "</tr>";
                    }
                    
                    html += "<tr style='text-align: right'>";
                    html += "   <td style='text-align: center'>법인카드</td>";
                    html += "   <td>0</td>";
                    html += "   <td>"+fn_comma(trafCorpCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(trafDayCorpotal)+"</td>";
                    html += "   <td>"+fn_comma(tollCorpCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(dayCorpCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(eatCorpCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(parkingCorpCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(etcCorpCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(trafCorpCostTotal+trafDayCorpotal+tollCorpCostTotal+dayCorpCostTotal+eatCorpCostTotal+parkingCorpCostTotal+etcCorpCostTotal+etcCorpCostTotal)+"</td>";
                    html += "</tr>";

                    html += "<tr style='text-align: right'>";
                    html += "   <td style='text-align: center'>법인차량</td>";
                    html += "   <td>"+fn_comma(oilCorpCostTotal)+"</td>";
                    html += "   <td>0</td>";
                    html += "   <td>0</td>";
                    html += "   <td>0</td>";
                    html += "   <td>0</td>";
                    html += "   <td>0</td>";
                    html += "   <td>0</td>";
                    html += "   <td>0</td>";
                    html += "   <td>"+fn_comma(oilCorpCostTotal)+"</td>";
                    html += "</tr>";

                    html += "<tr style='text-align: right'>";
                    html += "   <td style='text-align: center'>합계</td>";
                    html += "   <td>"+fn_comma(oilCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(trafCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(trafDayTotal)+"</td>";
                    html += "   <td>"+fn_comma(tollCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(dayCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(eatCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(parkingCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(etcCostTotal)+"</td>";
                    html += "   <td>"+fn_comma(totalCostTotal)+"</td>";
                    html += "</tr>";
                    $("#bustExnpBody").html(html);
                    $("#bustExnpTb").show();
                }
                $("#realDriver").data("kendoDropDownList").enable(false);
                $("#moveDst").data("kendoTextBox").enable(false);
            }
            $("#busnLgClass").data("kendoDropDownList").enable(false);

            if(resInfo.PROJECT_CD != 0){
                $("#busnName").data("kendoTextBox").enable(false);
                $("#project").data("kendoDropDownList").enable(false);
            }
        }
    },

    fn_saveBtn : function(e){
        if($("#tripCode").val() == ""){ alert("출장 구분을 선택해주세요."); return;}
        if($("#busnLgClass").val() != "" && $("#project").val() == ""){ alert("관련사업을 선택해주세요."); return;}
        if($("#project").val() != 0 && $("#busnName").val() == ""){ alert("사업명을 입력해주세요."); return;}
        if($("#visitCrm").val() == ""){ alert("방문지를 입력해주세요."); return; }
        if($("#visitLoc").val() == ""){ alert("출장지역을 입력해주세요."); return; }
        if($("#visitLocCode").val() == "999" && $("#visitLocSub").val() == ""){ alert("경유지명을 입력해주세요."); return;}
        if($("#bustObj").val() == ""){ alert("출장목적을 입력해주세요."); return; }
        if($("#carList").val() == ""){ alert("차량을 선택해주세요."); return; }
        if($("#realDriver").val() == ""){ alert("운행자를 선택해주세요."); return; }
        if($("#result").val() == ""){ alert("출장결과를 입력해주세요."); return; }
        if($("#moveDst").val() == ""){ alert("운행거리를 입력해주세요."); return; }

        var formData = new FormData();
        formData.append("menuCd", "bustripResReq");
        formData.append("hrBizReqId", hrBizReqId);
        formData.append("empSeq", $("#regEmpSeq").val());
        formData.append("empName", $("#regEmpName").val());
        formData.append("deptSeq", $("#regDeptSeq").val());
        formData.append("deptName", $("#regDeptName").val());
        formData.append("tripCode", $("#tripCode").val());
        formData.append("projectCd", $("#project").val());
        formData.append("project", $("#project").data("kendoDropDownList").text());
        formData.append("compEmpSeq", $("#popEmpSeq").val());
        formData.append("compEmpName", $("#popEmpName").val());
        formData.append("compDeptSeq", $("#popDeptSeq").val());
        formData.append("compDeptName", $("#popDeptName").val());
        formData.append("crmSn", $("#crmSn").val());
        formData.append("visitCrm", $("#visitCrm").val());
        formData.append("visitLoc", $("#visitLoc").val());
        formData.append("visitLocSub", $("#visitLocCode").val() == "999" || $("#visitLocCode").val() == "" ? $("#visitLocSub").val() : $("#visitLocCode").data("kendoDropDownList").text());
        formData.append("visitLocCode", $("#visitLocCode").val());
        formData.append("tripDayFr", $("#date1").val());
        formData.append("tripDayTo", $("#date2").val());
        formData.append("tripTimeFr", $("#time1").val());
        formData.append("tripTimeTo", $("#time2").val());
        formData.append("useCar", "Y");
        formData.append("useTrspt", $("#carList").val());
        formData.append("busnName", $("#busnName").val());
        formData.append("title", $("#bustObj").val());
        formData.append("positionCode", $("#regPositionCode").val());
        formData.append("dutyCode", $("#regDutyCode").val());

        formData.append("driverEmpSeq", $("#realDriver").val());
        formData.append("realDriver", $("#realDriver").val());
        formData.append("result", $("#result").val());
        formData.append("moveDst", $("#moveDst").val());

        if(hrBizReqResultId == ""){
            if(!confirm("출장 결과보고를 저장하고 다음단계로 넘어가시겠습니까?")){ return; }
        }else{
            if(!confirm("결과보고 데이터를 수정할 시, 여비정산 승인을 다시 받아야합니다. 수정하시겠습니까?")){ return; }
            formData.append("hrBizReqResultId", hrBizReqResultId);
        }

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
                console.log(result);
                if(hrBizReqResultId == ""){
                    alert("출장 결과보고 저장이 완료되었습니다.");
                    var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqResultId="+result.params.hrBizReqResultId;
                }else{
                    alert("출장 결과보고 수정이 완료되었습니다.");
                    var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqResultId="+hrBizReqResultId;
                }
                var name = "_self";
                var option = "width=1700, height=750, scrollbars=no, top=100, left=100, resizable=no, toolbars=no, menubar=no"
                var popup = window.open(url, name, option);
                opener.gridReload();
            }
        });
    },

    fn_setCertRep : function (p){
        var message = "승인하시겠습니까?"
        if(p == 30){
            message = "반려하시겠습니까?"
        }
        if(!confirm(message)){
            return;
        }
        var data = {
            hrBizReqResultId : hrBizReqResultId,
            empSeq : $("#regEmpSeq").val(),
            status : p
        }

        var result = customKendo.fn_customAjax("/bustrip/setReqCert", data);

        if(result.flag){
            if(p == 30){
                alert("반려되었습니다.");
            }else{
                alert("승인되었습니다..");
            }
            opener.gridReload();
            window.close();
        }

    },

    fn_moveCheck: function(){
        alert("거리는 최단거리로 입력해야 합니다.");
        window.open('https://map.naver.com/');
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}

