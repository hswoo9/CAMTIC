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

}