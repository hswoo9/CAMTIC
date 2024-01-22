var roomStat = {

    init: function(){
        roomStat.dataSet();
        roomStat.mainChart();
    },

        dataSet: function(){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 6)));
        customKendo.fn_datePicker("endDt", 'month', "yyyy-MM-dd", new Date());
        $("#startDt, #endDt").attr("readonly", true);
        $("#startDt").data("kendoDatePicker").bind("change", roomStat.mainChart)
        $("#endDt").data("kendoDatePicker").bind("change", roomStat.mainChart)
    },

    mainChart: function(){
        let data = {
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val()
        }
        const result = customKendo.fn_customAjax('/inside/getRoomStat', data);

        let colorArr = ["#dc7c7c", "#7c8adc", "#a77cdc", "#dcb57c", "#b7dc7c"];
        let resultDept = result.type;
        let deptArr = [];
        let totalArr = result.total;
        let maxNum = 0;

        for(let i=0; i<resultDept.length; i++){
            deptArr[i] = resultDept[i].type;
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
                text: "회의실 통계"
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
                        visible: true
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
                    rotation: "auto"
                }
            },
            categoryAxis: {
                categories: deptArr
            }
        });
    }
}