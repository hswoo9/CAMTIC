var equipStat = {

    init: function(){
        equipStat.dataSet();
        equipStat.mainChart();
    },

        dataSet: function(){
        customKendo.fn_datePicker("applyMonth", 'year', "yyyy-MM", new Date());
        $("#applyMonth").attr("readonly", true);
        $("#applyMonth").data("kendoDatePicker").bind("change", equipStat.mainChart)
    },

    mainChart: function(){
        let data = {
            applyMonth: $("#applyMonth").val()
        }
        const result = customKendo.fn_customAjax('/inside/getEquipStat', data);

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
                text: "장비 증감률 통계"
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