var snackStat = {

    init: function(){
        snackStat.dataSet();
        snackStat.mainChart();
    },

        dataSet: function(){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", 'month', "yyyy-MM-dd", new Date());
        $("#startDt, #endDt").attr("readonly", true);
        let searchDeptSource = [
            {text: "부서 단위", value: "1"},
            {text: "팀 단위", value: "2"}
        ]
        customKendo.fn_dropDownList("searchDept", searchDeptSource, "text", "value", 3);
        let searchTypeSource = [
            {text: "야간식대", value: "1"},
            {text: "평일식대", value: "2"},
            {text: "휴일식대", value: "3"}
        ]
        customKendo.fn_dropDownTree("searchType", searchTypeSource, "text", "value", 1);
        $("#searchType").data("kendoDropDownTree").value(["1", "2", "3"]);
        $("#searchTypeText").val($("#searchType").data("kendoDropDownTree").value().toString());
        $("#startDt").data("kendoDatePicker").bind("change", snackStat.mainChart)
        $("#endDt").data("kendoDatePicker").bind("change", snackStat.mainChart)
        $("#searchDept").data("kendoDropDownList").bind("change", snackStat.mainChart)
        $("#searchType").data("kendoDropDownTree").bind("change", snackStat.mainChart)
    },

    mainChart: function(){
        $("#searchTypeText").val($("#searchType").data("kendoDropDownTree").value().toString());

        let data = {
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchDept: $("#searchDept").val(),
            searchType: $("#searchType").data("kendoDropDownTree").value().toString()
        }
        const result = customKendo.fn_customAjax('/inside/getSnackStat', data);

        let colorArr = ["#dc7c7c", "#7c8adc", "#a77cdc", "#dcb57c", "#b7dc7c"];
        let resultDept = result.dept;
        let deptArr = [];
        let totalArr = result.total;
        let maxNum = 0;

        for(let i=0; i<resultDept.length; i++){
            deptArr[i] = resultDept[i].dept;
        }
        let colorText = "";
        for(let i=0; i<resultDept.length; i++){
            colorText = colorArr[i % colorArr.length];
            console.log(colorText);
            totalArr[i].color = colorText;
            if(maxNum < Number(totalArr[i].value)) {
                maxNum = Number(totalArr[i].value);
            }
        }
        maxNum = Math.ceil(maxNum) * 1.2
        console.log(totalArr);

        $("#mainChart").kendoChart({
            title: {
                text: "식대 통계"
            },
            subtitle: {
                text: "/thousands/"
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "bar"
            },
            seriesColors: colorArr,
            series: [
                {
                    name: "Total",
                    labels: {
                        visible: true,
                        format: "{0:N0}원"
                    },
                    data: totalArr
                }
            ],
            valueAxis: {
                max: maxNum,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: true
                },
                labels: {
                    rotation: "auto",
                    format: "{0:N0}"
                }
            },
            categoryAxis: {
                categories: deptArr
            }
        });
    }
}