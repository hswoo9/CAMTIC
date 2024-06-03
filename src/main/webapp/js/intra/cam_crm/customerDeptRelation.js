var deptCondition = {

    global : {
        now : new Date(),
        searchAjaxData : "",
        dropDownDataSource : "",
    },

    fn_defaultScript : function (){

        deptCondition.fn_setCustomerCondition();
    },

    fn_setCustomerCondition : function(){
        var parameters = {
            year : "2024"
        }
        var rs = customKendo.fn_customAjax("/crm/getDeptRelationList", parameters);
        var deptList = rs.deptList;
        var rs = rs.rs;
        var deptHtml = "";

        console.log(deptList);

        var arr = [];

        for(var i = 0 ; i < deptList.length; i++){
            var chartData = {};

            var dept = deptList[i];

            deptHtml += '<tr>';
            deptHtml += '   <td>'+dept.deptName+'</td>';
            chartData.name = dept.deptName;
            chartData.data = [];
            for(var j = 1 ; j <= 12; j++){
                deptHtml += '<td id="mon'+j+'_'+dept.deptSeq+'" style="background-color: white">'+dept["mon"+j]+'</td>';
                chartData.data.push(dept["mon"+j]);
            }
            deptHtml += '</tr>';

            arr.push(chartData);
        }


        $("#deptRelation").html(deptHtml);

        console.log(arr);

        $("#deptRelationChart").kendoChart({
            title: {
                text: "부서별 관계이력 현황"
            },
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "line"
            },
            series: arr,
            valueAxis: {
                labels: {
                    format: "{0}"
                }
            },
            categoryAxis: {
                categories: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            }
        });

    }


}