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
        //ajax 요청 후 서버로부터 응답이 온 data를 mainChart 함수로 보내줄 것

    },

    mainChart : function (e){
        var data = e; //이곳에서 ajax 요청으로 온 데이터(e)확인 및 가공이 필요하면 가공
        console.log("ajax data : ",data);

        var chartData = data.map(function (item,index) {
            return {  //뒤에 내용을 "" 대신 넣을 것
                category: "",//부서명(item.부서명)
                value: "",//(item.부서 인원 수 / item.총 재직 인원 수) * 100,
                color: depView.getColorForIndex(index)
            };
        });
        $("#mainChart").kendoChart({
            chartArea: { height: 400 },
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
                field: "category",
                majorGridLines: {  visible: true,
                                    template: "#= dataItem.category #"  // 각 그래프 바에 표시될 내용 설정
                                }
            },
            valueAxis: {
                labels: { format: "{0}%" },
                line: { visible: false }
            },
            tooltip: {
                visible: true,
                format: "{0}%"
            }
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

        joinLeaveView.getTotalDeptChart(arr);
    }

}