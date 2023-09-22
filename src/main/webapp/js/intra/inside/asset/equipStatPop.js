var equipStat = {

    init: function(){
        equipStat.dataSet();
        equipStat.searchData();
        equipStat.mainChart();
    },

    dataSet: function(){
        customKendo.fn_datePicker("applyYear", 'decade', "yyyy", new Date());
        $("#applyYear").attr("readonly", true);
        $("#applyYear").data("kendoDatePicker").bind("change", equipStat.mainChart);

        let searchTypeSource = [
            {text: "복합소재", value: "1"},
            {text: "드론산업", value: "2"},
            {text: "메이커스페이스", value: "3"}
        ]
        customKendo.fn_dropDownTree("searchType", searchTypeSource, "text", "value", 1);

        let typeArr = [];
        for(let i=0; i<searchTypeSource.length; i++){
            typeArr.push(searchTypeSource[i].value);
        }
        $("#searchType").data("kendoDropDownTree").value(typeArr);
        $("#searchType").data("kendoDropDownTree").bind("change", equipStat.searchData);
    },

    searchData: function(){
        $("#test").html('<input type="text" name="searchEquip" id="searchEquip" style="width: 1200px;">');
        let url = "/asset/getEqipmnRegList";
        let data = {eqipmnGbnCmmnCdSnArr : $("#searchType").data("kendoDropDownTree").value().toString()};
        const list = customKendo.fn_customAjax(url, data).rs;
        customKendo.fn_dropDownTree("searchEquip", list, "EQIPMN_NAME", "EQIPMN_MST_SN", 1);
        let arr = [];
        for(let i=0; i<list.length; i++){
            arr.push(list[i].EQIPMN_MST_SN);
        }
        $("#searchEquip").data("kendoDropDownTree").value(arr);
        $("#searchEquip").data("kendoDropDownTree").bind("change", equipStat.mainChart);
        equipStat.mainChart();
    },

    mainChart: function(){
        let year = $("#applyYear").val();
        let data = {
            year: year,
            searchType: $("#searchEquip").data("kendoDropDownTree").value().toString()
        }
        const result = customKendo.fn_customAjax('/inside/getEquipStatRear', data).list;

        /** series : 차트 데이터 */
        let series = [];

        /** categories : 차트 항목명 배열 */
        let categories = [year+"-01", year+"-02", year+"-03", year+"-04", year+"-05", year+"-06", year+"-07", year+"-08", year+"-09", year+"-10", year+"-11", year+"-12"];
        
        /** seriesColors : 항목별 색깔 */
        let seriesColors = ["#dc7c7c", "#7c8adc", "#a77cdc", "#dcb57c", "#b7dc7c"];

        /** series 설정 */
        for(let i=0; i<result.length; i++){
            let dataArr = [];
            dataArr[0] = result[i].JAN;
            dataArr[1] = result[i].FEB;
            dataArr[2] = result[i].MAR;
            dataArr[3] = result[i].APR;
            dataArr[4] = result[i].MAY;
            dataArr[5] = result[i].JUN;
            dataArr[6] = result[i].JUL;
            dataArr[7] = result[i].AUG;
            dataArr[8] = result[i].SEP;
            dataArr[9] = result[i].OCT;
            dataArr[10] = result[i].NOV;
            dataArr[11] = result[i].DECE;
            let data = {
                name: result[i].EQIPMN_NAME,
                data: dataArr
            }
            series.push(data);
        }

        $("#mainChart").kendoChart({
            title: {
                text: "장비 증감률 통계"
            },
            legend: {
                visible: false
            },
            chartArea: {
                background: ""
            },
            seriesDefaults: {
                type: "line",
                style: "smooth"
            },
            series: series,
            valueAxis: {
                labels: {
                    format: "{0}%"
                },
                line: {
                    visible: false
                },
                axisCrossingValue: -10
            },
            categoryAxis: {
                categories: categories,
                majorGridLines: {
                    visible: false
                },
                labels: {
                    rotation: "auto"
                }
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value #"
            }
        });
    },

    mainChartBack: function(){
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