var now = new Date();
var docContent = "";

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

        $("#carList").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "카니발", value: "1"},
                {text: "아반떼", value: "5"},
                {text: "트럭", value: "3"},
                {text: "자가", value: "10"},
                {text: "대중교통", value: "0"},
                {text: "솔라티", value: "13"},
                {text: "드론관제차량", value: "14"},
                {text: "기타", value: "11"}
            ],
            index : 0,
            enable : true
        });

        $("#project, #busnName, #popEmpName, #visitLoc, #visitLocSub, #userName, #moveDst, #bustObj").kendoTextBox();
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
                formData.append("purcFile", fCommon.global.attFiles[i]);
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

    setData : function (d, p){

        var data = {
            hrBizReqId: d,
        }
        var result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", data);
        console.log(result);

        var rs = result.rs.rs;
        var list = result.rs.list;
        var fileInfo = result.rs.fileInfo;
        $("#tripCode").data("kendoDropDownList").value(rs.trip_code);
        $("#project").data("kendoDropDownList").value(rs.project_cd);
        if(rs.project_cd != "" && rs.project_cd != 0){
            $("#busnLine").css("display", "");
        }
        $("#visitLoc").val(rs.visit_loc);
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

