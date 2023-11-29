var depView = {
    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){

        depView.gridReload();

        $('.detailSearch').on('change', function () {
            depView.gridReload();
        });

    },

    getTotalDeptChart : function(arr){
        console.log("ajax arr : ",arr);

        //이곳에 ajax 요청을 할 거임.
        $.ajax({
           type : "POST",
           data: {arr:arr},
           url : "Inside/getDeptTeamEmpCount",
           dataType: "json",
           success: function (data){
               console.log("js data : ",data);
               const empDeptList = data.empDeptTeamList.filter(function (item) {
                   return !item.hasOwnProperty("TeamName");
               });
               const empTeamList = data.empDeptTeamList.filter(function (item) {
                   return !item.hasOwnProperty("DeptName");
               });
               console.log("empDeptList",empDeptList);
               console.log("empTeamList",empTeamList);
               //ajax 요청 후 서버로부터 응답이 온 data를 mainChart 함수로 보내줄 것
               depView.mainChart(empDeptList);
               depView.teamChart(empTeamList);

           },
            error: function(error) {
                console.error("Error fetching data:", error);
            },
        });


    },

    mainChart : function (e){
        var data = e; //이곳에서 ajax 요청으로 온 데이터(e)확인 및 가공이 필요하면 가공
        console.log("ajax data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            totalEmpCount += data[i].DeptEmployeesCount || 0;
        }
        var chartData = data
            .map(function (item,index) {
                return {
                    category: item.DeptName,//부서명(item.부서명)
                    value: Math.round((item.DeptEmployeesCount / totalEmpCount) * 100),//(item.부서 인원 수 / item.총 재직 인원 수) * 100,
                    color: depView.getColorForIndex(index)
            };
        });
        $("#mainChart").kendoChart({
            chartArea: { height: 350,
                        width : 1000,
                        margin: {
                        left: 100, // 왼쪽 여백 크기 조절
                        right: 10,
                        top: 10,
                        bottom: 10
                    }

            },
            seriesDefaults: {
                type: "bar",
                labels: {
                    visible: true,
                    format: "{0}%"
                }
            },
            legend: {
                position: "top"
            },
            series: [{
                data: chartData,
                field: "value",
                name: "부서 인원 비율",
                colorField: "color"
            }],
            categoryAxis: {
                categories : chartData.map(function(item) {
                    console.log("chartitem category" ,item.category)
                    return item.category;
                }),
                majorGridLines: {
                    visible: false
                }
            },
            valueAxis: {
                labels: { format: "{0}%" },
                line: { visible: false },
                max: 110
            },
            tooltip: {
                visible: true,
                format: "{0}%"
            },
            seriesColors: chartData.map(function (item, index) {
            return depView.getColorForIndex(index);
            })
        });


    },
    teamChart : function (e){
        var data = e; //이곳에서 ajax 요청으로 온 데이터(e)확인 및 가공이 필요하면 가공
        console.log("ajax team data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            totalEmpCount += data[i].TeamEmployeesCount || 0;
        }
        var chartData = data
            .map(function (item,index) {
                return {
                    category: item.TeamName,//부서명(item.부서명)
                    value: Math.round((item.TeamEmployeesCount / totalEmpCount) * 100),//(item.부서 인원 수 / item.총 재직 인원 수) * 100,
                    color: depView.getColorForIndex(index)
                };
            });
        $("#teamChart").kendoChart({
            chartArea: { height: 700,
                width : 1000,
                margin: {
                    left: 100, // 왼쪽 여백 크기 조절
                    right: 10,
                    top: 10,
                    bottom: 10
                }

            },
            seriesDefaults: {
                type: "bar",
                labels: {
                    visible: true,
                    format: "{0}%"
                }
            },
            legend: {
                position: "top"
            },
            series: [{
                data: chartData,
                field: "value",
                name: "팀 인원 비율",
                colorField: "color"
            }],
            categoryAxis: {
                categories : chartData.map(function(item) {
                    console.log("chartitem category" ,item.category)
                    return item.category;
                }),
                majorGridLines: {
                    visible: false
                }
            },
            valueAxis: {
                labels: { format: "{0}%" },
                line: { visible: false },
                max: 110
            },
            tooltip: {
                visible: true,
                format: "{0}%"
            },
            seriesColors: chartData.map(function (item, index) {
                return depView.getColorForIndex(index);
            })
        });


    },

    getColorForIndex : function (index){
        var colors = ["#DC7C7C", "#7C8ADC", "#A77CDC", "#DCB57C", "#B7DC7C"];
        return colors[index % colors.length];
    },




    gridReload : function(){
        var requestArr = "";
        if($(".detailSearch:checked").length == 0){
            requestArr += "|999&N"
        }else{
            $(".detailSearch:checked").each(function(){
                if($(this).attr("id") == "dsA"){
                    requestArr += "|0&N|4&1,2"
                }else{
                    requestArr += "|" + $(this).attr("division") + '&' + ($(this).attr("divisionSub") == null ? "N" : $(this).attr("divisionSub"));
                }

            })
        }
        console.log("requestArr:", requestArr);
        var arr = requestArr.substring(1);
        console.log("arr :",arr);

        depView.getTotalDeptChart(arr);
    }

}