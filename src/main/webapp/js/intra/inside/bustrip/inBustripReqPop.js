var inBustripReqPop = {

    init : function(){
        inBustripReqPop.dataSet();
    },

    dataSet : function() {
        $("#date1").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#date2").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#reqDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#time1").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00"
        });

        $("#time2").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "18:00"
        });

        $("#empSeq, #empName, #deptName, #dutyName").kendoTextBox({
            enable: false
        });

        $("#tripCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "도내(시내)", value: "1" },
                { text: "도내(시외)", value: "2" },
                { text: "도외", value: "3" },
                { text: "해외", value: "4" }
            ],
            index : 0,
            change : function (){
                if($("#tripCode").val() == 4){
                    $("#carLine").css("display", "none");
                    $("#carList").data("kendoDropDownList").select(0);
                    $("#car1").prop("checked", true);
                } else {
                    $("#carLine").css("display", "");
                }
            }
        });

        $("#project").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "해당없음", value: "0" },
                { text: "연구개발", value: "1" },
                { text: "개발사업", value: "2" },
                { text: "교육사업", value: "3" },
                { text: "일자리사업", value: "4" },
                { text: "지원사업", value: "5" },
                { text: "평생학습", value: "6" },
                { text: "캠스타트업", value: "7" }
            ],
            index : 0,
            change: function (){
                if($("#project").val() == 0 || $("#project").val() == ""){
                    $("#busnLine").css("display", "none");
                } else {
                    $("#busnLine").css("display", "");
                }
            }
        });

        const carArr = customKendo.fn_customAjax('/inside/getCarCode').list;
        carArr.push({text: "자가", value: "10"});
        carArr.push({text: "대중교통", value: "0"});
        customKendo.fn_dropDownList("carList", carArr, "text", "value", 2);

        $("#project, #busnName, #popEmpName, #visitLoc, #visitLocSub, #userName, #moveDst, #bustObj").kendoTextBox();

        const waypointArr = customKendo.fn_customAjax('/bustrip/getWaypointCostList').list;
        waypointArr.push({WAYPOINT_NAME: "직접입력", HR_WAYPOINT_INFO_SN: "999"});
        customKendo.fn_dropDownList("visitLocCode", waypointArr, "WAYPOINT_NAME", "HR_WAYPOINT_INFO_SN", 2);
        $("#visitLocCode").data("kendoDropDownList").bind("change", function(){
            if($("#visitLocCode").val() == "999"){
                $(".visitLocSub").show();
            }else{
                $(".visitLocSub").hide();
            }
        })

    },

    fn_saveBtn: function(){
        if($("#tripCode").val() == ""){
            alert("출장 구분을 선택해주세요.");
            return;
        } else if($("#project").val() == ""){
            alert("관련사업을 선택해주세요.");
            return;
        } else if($("#project").val() != 0 && $("#busnName").val() == ""){
            alert("사업명을 입력해주세요.");
            return;
        } else if($("#visitLoc").val() == ""){
            alert("방문지를 입력해주세요.");
            return;
        } else if($("#bustObj").val() == ""){
            alert("출장목적을 입력해주세요.");
            return;
        } else if($("#carList").val() == ""){
            alert("차량을 선택해주세요.");
            return;
        }


        var formData = new FormData();

        formData.append("menuCd", "bustripReq");
        formData.append("empSeq", $("#empSeq").val());
        formData.append("empName", $("#empName").val());
        formData.append("deptSeq", $("#deptSeq").val());
        formData.append("deptName", $("#deptName").val());
        formData.append("tripCode", $("#tripCode").val());
        formData.append("projectCd", $("#project").val());
        formData.append("project", $("#project").data("kendoDropDownList").text());
        formData.append("compEmpSeq", $("#popEmpSeq").val());
        formData.append("compEmpName", $("#popEmpName").val());
        formData.append("compDeptSeq", $("#popDeptSeq").val());
        formData.append("compDeptName", $("#popDeptName").val());
        formData.append("visitLoc", $("#visitLoc").val());
        formData.append("visitLocSub", $("#visitLocCode").val() == "999" ? $("#visitLocSub").val() : $("#visitLocCode").data("kendoDropDownList").text());
        formData.append("visitLocCode", $("#visitLocCode").val());
        formData.append("tripDayFr", $("#date1").val());
        formData.append("tripDayTo", $("#date2").val());
        formData.append("tripTimeFr", $("#time1").val());
        formData.append("tripTimeTo", $("#time2").val());
        formData.append("useCar", "Y");
        formData.append("useTrspt", $("#carList").val());
        formData.append("busnName", $("#busnName").val());
        formData.append("title", $("#bustObj").val());
        formData.append("tripTimeTo", $("#time2").val());
        formData.append("positionCode", $("#positionCode").val());
        formData.append("dutyCode", $("#dutyCode").val());
        formData.append("applyDate", $("#reqDate").val());


        //증빙파일 첨부파일
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("purcFile", fCommon.global.attFiles[i]);
            }
        }

        if($("#carList").val() != "10" && $("#carList").val() != "0"){
            let data = {
                startDt : $("#date1").val(),
                endDt : $("#date2").val(),
                startTime : $("#time1").val(),
                endTime : $("#time2").val(),
                useDeptSeq : $("#regDeptSeq").val(),
                useDeptName : $("#regDeptName").val(),
                carClassSn : $("#carList").val(),
                carClassText : $("#carList").data("kendoDropDownList").text(),
                carTypeSn : 1,
                carTypeText : "업무용",
                carTitleName : $("#bustObj").val(),
                visitName : $("#visitLoc").val(),
                waypointName : $("#visitLocSub").val(),
                empSeq : $("#regEmpSeq").val(),
                empName : $("#regEmpName").val(),
                regEmpSeq : $("#regEmpSeq").val(),
                regEmpName : $("#regEmpName").val(),
                type: "bustripReq"
            }
            carReq.searchDuplicateCar(data);

            if(flag && carType == "A") {
                carReq.setCarRequestInsert(data);
            }
        }else {
            flag = true;
        }

        $.ajax({
            url : "/bustrip/setBustripReq",
            type : 'POST',
            data : formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(result){

                opener.parent.inBustripList.mainGrid();
                window.close();
            }
        });

    },

    test: function(){
        //A
        var child = window.open('/indexB.do', 'popupB_blank');
        child.open_in_frame('/Inside/carReq.do');

        //B
        //opener.open_in_frame('/Inside/carReq.do');
    },

    setData : function (d, p, rsKey){

        var data = {
            hrBizReqId: d,
            hrBizReqResultId : rsKey
        }
        var result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", data);

        var res = result.rs.rsRes;
        var map = result.rs.map;

        var html = "";
        for(var i = 0 ; i < map.length ; i++){
            if(map[i].DRIVER == "Y"){
                $("#realDriver").data("kendoDropDownList").value(map[i].EMP_SEQ)
            }

            html += "<tr style='text-align: right'>";
            html += "   <td style='text-align: center'>"+map[i].EMP_NAME+"</td>";
            html += "   <td>"+map[i].OIL_COST+"</td>";
            html += "   <td>"+map[i].TRAF_COST+"</td>";
            html += "   <td>"+map[i].TRAF_DAY_COST+"</td>";
            html += "   <td>"+map[i].TOLL_COST+"</td>";
            html += "   <td>"+map[i].DAY_COST+"</td>";
            html += "   <td>"+map[i].EAT_COST+"</td>";
            html += "   <td>"+map[i].PARKING_COST+"</td>";
            html += "   <td>"+map[i].ETC_COST+"</td>";
            html += "   <td>"+map[i].TOT_COST+"</td>";
            html += "</tr>";

        }
        console.log(map);
        $("#bustExnpBody").html(html);


        var rs = result.rs.rs;
        var list = result.rs.list;
        var fileInfo = result.rs.fileInfo;

        $("#moveDst").val(rs.distance);
        $("#moveDst").val(res.MOVE_DST);
        $("#result").val(res.RESULT);
        $("#tripCode").data("kendoDropDownList").value(rs.trip_code);
        $("#project").data("kendoDropDownList").value(rs.project_cd);
        if(rs.project_cd != "" && rs.project_cd != 0){
            $("#busnLine").css("display", "");
        }
        $("#visitLoc").val(rs.visit_loc);
        $("#visitLocCode").data("kendoDropDownList").value(rs.visit_loc_code);
        if($("#visitLocCode").val() == "999"){
            $(".visitLocSub").show();
        }else{
            $("#moveDst").data("kendoTextBox").enable(false);
            $(".visitLocSub").hide();
        }
        $("#visitLocSub").val(rs.visit_loc_sub);
        $("#date1").val(rs.trip_day_fr);
        $("#date2").val(rs.trip_day_to);
        $("#time1").val(rs.trip_time_fr);
        $("#time2").val(rs.trip_time_to);
        $("#bustObj").val(rs.title);
        $("#carList").val(rs.use_trspt);
        if(rs.use_car == "Y"){
            $("#car2").prop("checked", true);
        } else {
            $("#car1").prop("checked", true);
        }

        var popEmpSeq = "" ;
        var popEmpName = "";
        var popDeptSeq = "";
        var popDeptName = "";
        for(var i = 0; i < list.length; i++){
            popEmpSeq += list[i].EMP_SEQ + ",";
            popEmpName += list[i].EMP_NAME + ",";
            popDeptSeq += list[i].DEPT_SEQ + ",";
            popDeptName += list[i].DEPT_NAME + ",";
        }

        inBustripReqPop.settingTempFileDataInit(fileInfo, p);

        $("#popEmpSeq").val(popEmpSeq.slice(0, -1));
        $("#popEmpName").val(popEmpName.slice(0, -1));
        $("#popDeptSeq").val(popDeptSeq.slice(0, -1));
        $("#popDeptName").val(popDeptName.slice(0, -1));

        if(rs.status != 0 && rs.status != 30){
            $("#tripCode").data("kendoDropDownList").enable(false);
            $("#project").data("kendoDropDownList").enable(false);
            $("#visitLoc").data("kendoTextBox").enable(false);
            $("#visitLocSub").data("kendoTextBox").enable(false);
            $("#bustObj").data("kendoTextBox").enable(false);
            $("#date1").data("kendoDatePicker").enable(false);
            $("#date2").data("kendoDatePicker").enable(false);
            $("#time1").data("kendoTimePicker").enable(false);
            $("#time2").data("kendoTimePicker").enable(false);
            $("#carList").data("kendoDropDownList").enable(false);
            $("input[name='useCar']").attr("disabled", true);
            $("#popEmpSeq").val(popEmpSeq.slice(0, -1));
            $("#realDriver").data("kendoDropDownList").enable(false);
            $("#modBtn").css("display", "none");
            $("#fileUpload").css("display", "none");
            $("#addMemberBtn").attr("disabled", true);
            $("#projectAddBtn").attr("disabled", true);
        }
    },

    fn_updBtn:function (key){
        if($("#tripCode").val() == ""){
            alert("출장 구분을 선택해주세요.");
            return;
        } else if($("#project").val() == ""){
            alert("관련사업을 선택해주세요.");
            return;
        } /*else if($("#project").val() != 0 && $("#busnName").val() == ""){
            alert("사업명을 입력해주세요.");
            return;
        }*/ else if($("#visitLoc").val() == ""){
            alert("방문지를 입력해주세요.");
            return;
        } else if($("#bustObj").val() == ""){
            alert("출장목적을 입력해주세요.");
            return;
        }


        var formData = new FormData();

        formData.append("hrBizReqId", key);
        formData.append("menuCd", "bustripReq");
        formData.append("empSeq", $("#empSeq").val());
        formData.append("empName", $("#empName").val());
        formData.append("deptSeq", $("#deptSeq").val());
        formData.append("deptName", $("#deptName").val());
        formData.append("tripCode", $("#tripCode").val());
        formData.append("projectCd", $("#project").val());
        formData.append("project", $("#project").data("kendoDropDownList").text());
        formData.append("compEmpSeq", $("#popEmpSeq").val());
        formData.append("compEmpName", $("#popEmpName").val());
        formData.append("compDeptSeq", $("#popDeptSeq").val());
        formData.append("compDeptName", $("#popDeptName").val());
        formData.append("visitLoc", $("#visitLoc").val());
        formData.append("visitLocSub", $("#visitLocSub").val());
        formData.append("tripDayFr", $("#date1").val());
        formData.append("tripDayTo", $("#date2").val());
        formData.append("tripTimeFr", $("#time1").val());
        formData.append("tripTimeTo", $("#time2").val());
        formData.append("useCar", $("input[name='useCar']:checked").val());
        formData.append("useTrspt", $("#carList").val());
        formData.append("busnName", $("#busnName").val());
        formData.append("title", $("#bustObj").val());
        formData.append("tripTimeTo", $("#time2").val());
        formData.append("positionCode", $("#positionCode").val());
        formData.append("dutyCode", $("#dutyCode").val());
        formData.append("applyDate", $("#reqDate").val());


        //증빙파일 첨부파일
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("bustripFile", fCommon.global.attFiles[i]);
            }
        }

        $.ajax({
            url : "/bustrip/setBustripReq",
            type : 'POST',
            data : formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(result){

                opener.parent.inBustripList.mainGrid();
                window.close();
            }
        });
    },

    settingTempFileDataInit : function(e, p){
        var html = '';

        if(p == "result"){
            if(e.length > 0){
                for(var i = 0; i < e.length; i++){
                    html += '<tr style="text-align: center">';
                    html += '   <td>'+ e[i].file_org_name +'</td>';
                    html += '   <td>'+ e[i].file_ext +'</td>';
                    html += '   <td>'+ e[i].file_size +'</td>';
                    html += '</tr>';
                }
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="3" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        } else {
            if(e.length > 0){
                for(var i = 0; i < e.length; i++){
                    html += '<tr style="text-align: center">';
                    html += '   <td>'+ e[i].file_org_name +'</td>';
                    html += '   <td>'+ e[i].file_ext +'</td>';
                    html += '   <td>'+ e[i].file_size +'</td>';
                    html += '   <td>';
                    html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                        '			<span class="k-button-text">삭제</span>' +
                        '		</button>';
                    html += '   </td>';
                    html += '</tr>';
                }
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }



    }

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
}