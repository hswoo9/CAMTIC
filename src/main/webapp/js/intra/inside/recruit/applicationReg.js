var applicationReg = {

    global : {
        saveAjaxData: "",
        dropDownDataSource : ""
    },

    fn_defaultScript : function (){
        var applicationId = $("#applicationId").val();
        console.log("applicationId : ", applicationId);
        var recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        console.log("recruitAreaInfoSn : ",recruitAreaInfoSn);

        applicationReg.dataSet();
    },

    dataSet : function (){

        $("#loginId, #resRegisNum1, #resRegisNum2, #beforCareer").kendoTextBox();

        var bDay = $("#bDay").val();
        var resRegisNum = bDay.replace(/-/g, '').substring(2, 8);
        document.getElementById('resRegisNum1').value = resRegisNum;

        var yr = bDay.replace(/-/g, '').substring(0, 4);
        var gender = $("#gender").val();
        if (parseInt(yr, 10) < 2000 && gender === 'M') {
            document.getElementById('resRegisNum2').value = '1';
        }else if(parseInt(yr, 10) >= 2000 && gender === 'M'){
            document.getElementById('resRegisNum2').value = '3';
        }else if(parseInt(yr, 10) < 2000 && gender === 'F'){
            document.getElementById('resRegisNum2').value = '2';
        }else if(parseInt(yr, 10) >= 2000 && gender === 'F'){
            document.getElementById('resRegisNum2').value = '4';
        }


        applicationReg.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "4"});
        customKendo.fn_dropDownList("position", applicationReg.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);

        applicationReg.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        customKendo.fn_dropDownList("duty", applicationReg.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);

        applicationReg.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "9"});
        customKendo.fn_dropDownList("occupationCode", applicationReg.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);


        applicationReg.fn_setRegDateForm("joinDay");

        $("joinDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        var applicationId = $("#applicationId").val();
        $.ajax({
            type: "POST",
            url: "/inside/applicationCareer",
            data: { applicationId: applicationId },
            success: function(response) {
                var ds = response.career;
                var totalMonths = 0;
                console.log("ds:",ds);
                for (var i =0; i < ds.length; i++){
                    var workStDt = ds[i].WORK_ST_DT;
                    var workEnDt = ds[i].WORK_EN_DT;

                    console.log("workStDt "+i+": ",workStDt);
                    console.log("workEnDt "+i+": ",workEnDt);

                    var startDate = new Date(workStDt);
                    var endDate = new Date(workEnDt);

                    // 개월 수 계산
                    var monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12;
                    monthsDiff += endDate.getMonth() - startDate.getMonth();
                    totalMonths += monthsDiff;
                }
                console.log("totalMonths : ", totalMonths + " 개월");
                document.getElementById('beforCareer').value = totalMonths;

            },
            error: function(error) {
                console.log("경력 ajax요청 실패");
                console.error(error);
            }
        });

        },

    fn_setRegDateForm: function(id){
        $("#" + id).kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    userSave : function () {
        /*var degreeCode;
        if ($("#schoolType").val() == "1") {
            degreeCode = "고졸";
        }else if ($("#schoolType").val() == "2") {
            degreeCode = "전문학사";
        }else if($("#schoolType").val() == "3"){
            degreeCode = "학사";
        }else if($("#schoolType").val() == "4"){
            degreeCode = "학사";
        }else if($("#schoolType").val() == "5"){
            if($("#graduateType").val() == "3"){
                degreeCode = "석사수료";
            }else{
                degreeCode = "석사";
            }
        }else if($("#schoolType").val() == "6"){
            if($("#graduateType").val() == "3"){
                degreeCode = "박사수료";
            }else{
                degreeCode = "박사";
            }
        }else{
            degreeCode = "기타";
        }*/


        if(!confirm("신청내용을 저장하시겠습니까?")){
            return ;
        }
            var data = {

                applicationId : $("#applicationId").val(),
                DEPT_NAME : $("#deptName").val(),
                DEPT_TEAM_NAME : $("#teamName").val(),

                LOGIN_ID : $("#loginId").val(),
                RES_REGIS_NUM: $("#resRegisNum1").val() + '-' + $("#resRegisNum2").val(),
                POSITION_CODE : $("#position").val(), // 직급 / 등급
                DUTY_CODE : $("#duty").val(), // 직책
                DUTY_NAME : $("#duty").val() == "" ? "" : $("#duty").data("kendoDropDownList").text(), // 직책
                OCCUPATION_CODE : $("#occupationCode").val(),
                BEFOR_CAREER : $("#beforCareer").val(), //전직경력
                JOIN_DAY : $("#joinDay").val(), // 입사일자
                TEMP_DIVISION : 'Y',
                /*DEGREE_CODE : degreeCode,*/
                JOB_DETAIL : $("#job").val()
            }

        if($("#teamName").val() != '' && $("#teamName").val() != null){
            data.DEPT_SEQ = $("#teamSeq").val();
        }

        /*
        if($("#dsA").is("checked")){
            data.division = "0";
        }else if($("#dsB").is("checked")){
            data.division = "4"
            data.divisionSub = "1";
        }else if($("#dsC").is("checked")){
            data.division = "4"
            data.divisionSub = "2";
        }
         */
        data.division = "0";

        if ($("#dsB").is(":checked")) {
            data.division = "4";
            data.divisionSub = "1";
        } else if ($("#dsC").is(":checked")) {
            data.division = "4";
            data.divisionSub = "2";
        }

        if($("#position").val() != ""){
            var positionName = "";
            var gradeName = $("#position").data("kendoDropDownList").text();
            if($("#position").data("kendoDropDownList").text().indexOf("/") > -1){
                positionName = $("#position").data("kendoDropDownList").text().split("/")[0].trim();
                gradeName = $("#position").data("kendoDropDownList").text().split("/")[1].trim();

            }else{
                positionName = gradeName;
            }
            data.GRADE_NAME = gradeName;
            data.POSITION_NAME = positionName;
        }else{
            data.GRADE_NAME = "";
            data.POSITION_NAME = "";
        }

        if(data.LOGIN_ID == "" || data.LOGIN_ID == null){
            alert("아이디를 입력해주세요.");
            return;
        }
        if(data.division == "" || data.division == null) {
            alert("직원구분을 선택해주세요.");
            return;
        }


        $.ajax({
            url : "/inside/setApplicationtoUser.do",
            data : data,
            dataType : "json",
            type : "POST",
            async : false,
            success : function(result){
                console.log("인사등록 ajax요청 성공");
                alert("인사등록이 완료되었습니다.");
                window.close();
            },
            error: function(error) {
                console.log("인사등록 ajax요청 실패");
                console.error(error);
            }

        })

    }

}