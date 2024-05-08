var monthAttendStat = {

    fn_defaultScript: function(){
        monthAttendStat.fn_pageSet();
    },

    fn_pageSet: function(){
        /** 조회기간 및 제목 설정 */
        monthAttendStat.fn_datePickerSet();
    },

    fn_dataSet: function(){
        /** 전체 현황 표 */
        monthAttendStat.fn_allStatSet();
        monthAttendStat.fn_deptStatSet();
        monthAttendStat.fn_personalStatSet();
    },

    fn_datePickerSet: function(){
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
        html += '   <td style="text-align: center;">0</td>';
        html += '   <td style="text-align: center;">0</td>';
        html += '   <td style="text-align: center;">0</td>';
        html += '   <td style="text-align: center;">0</td>';
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
            html += '<tr>';
            html += '   <td style="text-align: center;">'+deptCountMonthly[i].DEPT_NAME+'</td>';
            html += '   <td style="text-align: center;">'+deptCountMonthly[i].HUMAN_COUNT+'</td>';
            html += '   <td style="text-align: center;">'+deptCountMonthly[i].AVG_OFFICE_HOUR+'</td>';
            html += '   <td style="text-align: center;">'+deptCountMonthly[i].HOLIDAY_HUMAN_COUNT+'</td>';
            html += '   <td style="text-align: center;">'+deptCountMonthly[i].HOLIDAY_COUNT+'</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '</tr>';
        }
        $("#deptStatTable").html(html);
    },

    fn_personalStatSet: function(){
        let applyMonth = $("#applyMonth").val();

        let url = "/inside/getAttendPersonalCountMonthly";
        let data = { applyMonth: applyMonth };
        let personalCountMonthly = customKendo.fn_customAjax(url, data).list;

        console.log(personalCountMonthly);

        let html = "";
        for(let i=0; i<personalCountMonthly.length; i++){
            html += '<tr>';
            html += '   <td style="text-align: center;">'+personalCountMonthly[i].deptNm+'</td>';
            html += '   <td style="text-align: center;">'+personalCountMonthly[i].teamNm+'</td>';
            html += '   <td style="text-align: center;">'+personalCountMonthly[i].EMP_NAME+'</td>';
            html += '   <td style="text-align: center;">'+personalCountMonthly[i].positionNm+'</td>';
            html += '   <td style="text-align: center;">'+personalCountMonthly[i].AVG_OFFICE_HOUR+'</td>';
            html += '   <td style="text-align: center;">'+personalCountMonthly[i].HOLIDAY_COUNT+'</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '   <td style="text-align: center;">0</td>';
            html += '</tr>';
        }
        $("#personalStatTable").html(html);
    }
}