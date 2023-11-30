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
               $("#mainChart *").remove();
               $("#teamChart *").remove();
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
        var html = "";
        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col><col width="10%"></colgroup><tbody>'+
            '<tr>'+
            '<td style="background-color: #efefef;">CAMTIC </td>'+
            '<td style="background-color: #ffffff;">'+
            '<div style="display: flex; align-items: center;">' +
            '<div style="background-color: #DC7C7C; float : left; height: 10px; width: 900px; display: inline-block; position: relative; top: 1.5px;">'+
            '</div>' +
            '<span style="display: inline-block; position: relative; top: 1.5px;">100%</span>' +
            '</div>'+
            '</td>'+
            '<td style="background-color: #ffffff;">'+totalEmpCount +'명</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="background-color: #efefef;" align="center" colspan="2">합계</td>'+
            '<td style="background-color: #efefef;">'+totalEmpCount +'명</td>'+
            '</tr>'+
            '</table>'+
            '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col><col width="10%"></colgroup><tbody>';
        for(var i =0;i<data.length; i++) {
            var color = depView.getColorForIndex(i);
            var percentageWidth = (((data[i].DeptEmployeesCount / totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].DeptEmployeesCount / totalEmpCount) * 100).toFixed(1)
            console.log("percentage : ",percentage);
            console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ data[i].DeptName +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<div style="display: flex; align-items: center;">' +
                '<div style="background-color: ' + color + '; float : left; height: 10px; width: '+percentageWidth+'px; display: inline-block; position: relative; top: 1.5px;">' +
                '</div>' +
                '<span style="display: inline-block; position: relative; top: 1.5px;">'+percentage+'%</span>' +
                '</div>' +
                '</td>' +
                '<td style="background-color: #ffffff;">' + data[i].DeptEmployeesCount + '명</td>' +
                '</tr>';
        }
             html+='<tr>'+
                '<td style="background-color: #efefef;" align="center" colspan="2">합계</td>'+
                '<td style="background-color: #efefef;">'+totalEmpCount +'명</td>'+
                '</tr>'+
                '</table>';




        $("#mainChart").append(html);
    },

    teamChart : function (e){
        var data = e; //이곳에서 ajax 요청으로 온 데이터(e)확인 및 가공이 필요하면 가공
        console.log("ajax team data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            totalEmpCount += data[i].TeamEmployeesCount || 0;
        }
        var html = "";
        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col><col width="10%"></colgroup><tbody>';
        for(var i =0;i<data.length; i++) {
            var color = depView.getColorForIndex(i);
            var percentageWidth = (((data[i].TeamEmployeesCount / totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].TeamEmployeesCount / totalEmpCount) * 100).toFixed(1)
            console.log("percentage : ",percentage);
            console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ data[i].TeamName +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<div style="display: flex; align-items: center;">' +
                '<div style="background-color: ' + color + '; float : left; height: 10px; width: '+percentageWidth+'px; display: inline-block; position: relative; top: 1.5px;">' +
                '</div>' +
                '<span style="display: inline-block; position: relative; top: 1.5px;">'+percentage+'%</span>' +
                '</div>'+
                '</td>' +
                '<td style="background-color: #ffffff;">' + data[i].TeamEmployeesCount + '명</td>' +
                '</tr>';
        }
        html+='<tr>'+
            '<td style="background-color: #efefef;" align="center" colspan="2">합계</td>'+
            '<td style="background-color: #efefef;">'+totalEmpCount +'명</td>'+
            '</tr>'+
            '</table>';

        $("#teamChart").append(html);

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