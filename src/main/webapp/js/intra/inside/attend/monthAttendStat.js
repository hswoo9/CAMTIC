var monthAttendStat = {

    fn_defaultScript: function(){
        monthAttendStat.fn_pageSet();
    },

    fn_pageSet: function(){
        customKendo.fn_datePicker("applyMonth", 'year', "yyyy-MM", new Date());
        $("#applyMonth").attr("readonly", true);
        $("#applyMonth").data("kendoDatePicker").bind("change", function(){
            let applyMonth = $("#applyMonth").val();
            if(applyMonth != null && applyMonth != ""){
                $("#title").text(applyMonth.split("-")[0]+"년 "+applyMonth.split("-")[1]+"월 직원 근태현황");
            }
            monthAttendStat.fn_dataSet();
        })
        $("#applyMonth").data("kendoDatePicker").trigger("change");
    },

    fn_dataSet: function(){
        monthAttendStat.fn_personalStatSet();

        monthAttendStat.fn_deptStatSet();

        monthAttendStat.fn_allStatSet();
    },

    fn_allStatSet: function(){
        let applyMonth = $("#applyMonth").val();

        let url = "/inside/getAttendAllCountMonthly";
        let data = { applyMonth: applyMonth };
        let allCountMonthly = customKendo.fn_customAjax(url, data).data;

        console.log(allCountMonthly);

        let html = "";
        html += '<tr>';
        html += '   <td style="text-align: center;">'+allCountMonthly.HUMAN_COUNT+'</td>';
        html += '   <td style="text-align: center;">'+allCountMonthly.AVG_OFFICE_HOUR+'</td>';
        html += '   <td style="text-align: center;">'+allCountMonthly.HOLIDAY_HUMAN_COUNT+'</td>';
        html += '   <td style="text-align: center;">'+allCountMonthly.HOLIDAY_COUNT+'</td>';
        html += '   <td style="text-align: center;">0</td>';
        html += '   <td style="text-align: center;">0</td>';
        html += '   <td style="text-align: center;">0</td>';
        html += '   <td style="text-align: center;">0</td>';
        html += '   <td style="text-align: center;">'+allCountMonthly.LATE_COUNT+'</td>';
        html += '   <td style="text-align: center;">'+allCountMonthly.LATE+'</td>';
        html += '   <td style="text-align: center;">'+allCountMonthly.FRI_DAY_COUNT+'</td>';
        html += '   <td style="text-align: center;">'+allCountMonthly.FRI_DAY+'</td>';
        html += '</tr>';
        $("#allStatTable").html(html);
    },

    fn_deptStatSet: function(){
        let applyMonth = $("#applyMonth").val();

        let url = "/inside/getAttendDeptCountMonthly";
        let data = { applyMonth: applyMonth };
        let deptCountMonthly = customKendo.fn_customAjax(url, data).list;

        console.log(deptCountMonthly);

        let html = "";
        for(let i=0; i<deptCountMonthly.length; i++){
            const deptMap = deptCountMonthly[i];
            html += '<tr>';
            html += '   <td style="text-align: center;">'+deptMap.DEPT_NAME+'</td>';
            html += '   <td style="text-align: center;">'+deptMap.HUMAN_COUNT+'</td>';
            html += '   <td style="text-align: center;">'+deptMap.AVG_OFFICE_HOUR+'</td>';
            html += '   <td style="text-align: center;">'+deptMap.HOLIDAY_HUMAN_COUNT+'</td>';
            html += '   <td style="text-align: center;">'+deptMap.HOLIDAY_COUNT+'</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">'+deptMap.LATE_COUNT+'</td>';
            html += '   <td style="text-align: center;">'+deptMap.LATE+'</td>';
            html += '   <td style="text-align: center;">'+deptMap.FRI_DAY_COUNT+'</td>';
            html += '   <td style="text-align: center;">'+deptMap.FRI_DAY+'</td>';
            html += '</tr>';
        }
        $("#deptStatTable").html(html);
    },

    fn_personalStatSet: function(){
        let applyMonth = $("#applyMonth").val();

        let url = "/inside/getAttendPersonalCountMonthly";
        let data = { applyMonth: applyMonth };
        let personalCountMonthly = customKendo.fn_customAjax(url, data).list;

        console.log("personalCountMonthly", personalCountMonthly);

        let html = "";
        for(let i=0; i<personalCountMonthly.length; i++){
            const personMap = personalCountMonthly[i];
            html += '<tr>';
            html += '   <td style="text-align: center;">'+personMap.deptNm+'</td>';
            html += '   <td style="text-align: center;">'+personMap.teamNm+'</td>';
            html += '   <td style="text-align: center;">'+personMap.EMP_NAME+'</td>';
            html += '   <td style="text-align: center;">'+personMap.positionNm+'</td>';
            html += '   <td style="text-align: center;">'+personMap.AVG_OFFICE_HOUR+'</td>';
            html += '   <td style="text-align: center;">'+personMap.HOLIDAY_COUNT+'</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">'+personMap.LATE+'</td>';
            html += '   <td style="text-align: center;">'+personMap.FRI_DAY+'</td>';
            html += '</tr>';
        }
        $("#personalStatTable").html(html);
    },

    attendPrintPop : function() {
        const applyMonth = $("#applyMonth").val();
        let url = "/attend/pop/attendPrintPop.do?applyMonth="+applyMonth;
        const name = "attendPrintPop";
        const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open(url, name, option);
    }
}