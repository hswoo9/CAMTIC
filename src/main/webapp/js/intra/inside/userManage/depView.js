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
               const arr = depView.transformedArr(data.arr);
               const totalEmployeeCount = data.totalEmployeeCount;
               const empDeptList = data.empDeptTeamList.filter(function (item) {
                   return !item.hasOwnProperty("TeamName");
               });
               const empTeamList = data.empDeptTeamList.filter(function (item) {
                   return !item.hasOwnProperty("DeptName");
               });
               console.log("totalEmployeeCount :",totalEmployeeCount);
               console.log("empDeptList",empDeptList);
               console.log("empTeamList",empTeamList);
               $("#mainChart *").remove();
               $("#teamChart *").remove();
               //ajax 요청 후 서버로부터 응답이 온 data를 mainChart 함수로 보내줄 것
               depView.mainChart(empDeptList, totalEmployeeCount, arr);
               depView.teamChart(empTeamList, arr);

           },
            error: function(error) {
                console.error("Error fetching data:", error);
            },
        });


    },

    mainChart : function (empDeptList, totalEmployeeCount, arr){
        var data = empDeptList; //이곳에서 ajax 요청으로 온 데이터(e)확인 및 가공이 필요하면 가공
        console.log("ajax data : ",data);
        var totalEmpCount = totalEmployeeCount.EmployeeCount;

        var totalDeptEmpCount = 0;
        for(var i = 0; i<data.length; i++){
            totalDeptEmpCount += data[i].DeptEmployeesCount || 0;
        }


        var html = "";
        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col width="5%"><col></colgroup><tbody>'+
            '<tr>'+
            '<td style="background-color: #efefef;">CAMTIC </td>'+
            '<td style="background-color: #ffffff;">'+totalEmpCount +'명</td>'+
            '<td style="background-color: #ffffff;">'+
            '<div style="display: flex; align-items: center;">' +
            '<div style="background-color: #DC7C7C; float : left; height: 10px; width: 900px; display: inline-block; position: relative; top: 1.5px;">'+
            '</div>' +
            '<span style="display: inline-block; position: relative; top: 1.5px;">100%</span>' +
            '</div>'+
            '</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="background-color: #efefef;" align="center" colspan="2">합계</td>'+
            '<td style="background-color: #efefef;">'+totalEmpCount +'명</td>'+
            '</tr>'+
            '</table>'+
            '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col width="5%"><col></colgroup><tbody>';
        for(var i =0;i<data.length; i++) {
            var deptId = data[i].DeptID;
            var color = depView.getColorForIndex(i);
            var percentageWidth = (((data[i].DeptEmployeesCount / totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].DeptEmployeesCount / totalEmpCount) * 100).toFixed(1)
            if(isNaN(percentage)){
                percentage = 0;
            }
            //console.log("percentage : ",percentage);
            //console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ data[i].DeptName +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<a href="javascript:void(0);" onclick="depView.userViewPop(\'' + deptId +'\', \''  + arr + '\');">'+
                '<span>' +data[i].DeptEmployeesCount + '명</span>' +
                '</td>' +
                '<td style="background-color: #ffffff;">' +
                '<div style="display: flex; align-items: center;">' +
                '<div style="background-color: ' + color + '; float : left; height: 10px; width: '+percentageWidth+'px; display: inline-block; position: relative; top: 1.5px;">' +
                '</div>' +
                '<span style="display: inline-block; position: relative; top: 1.5px;">'+percentage+'%</span>' +
                '</div>' +
                '</td>' +
                '</tr>';
        }
             html+='<tr>'+
                '<td style="background-color: #efefef;" align="center" colspan="2">합계</td>'+
                '<td style="background-color: #efefef;">'+totalDeptEmpCount +'명</td>'+
                '</tr>'+
                '</table>';




        $("#mainChart").append(html);
    },

    teamChart : function (empTeamList, arr){
        var data = empTeamList; //이곳에서 ajax 요청으로 온 데이터(e)확인 및 가공이 필요하면 가공
        console.log("ajax team data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            totalEmpCount += data[i].TeamEmployeesCount || 0;
        }
        var html = "";
        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col width="5%"><col></colgroup><tbody>';
        for(var i =0;i<data.length; i++) {
            var teamID = data[i].TeamID;
            var color = depView.getColorForIndex(i);
            var percentageWidth = (((data[i].TeamEmployeesCount / totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].TeamEmployeesCount / totalEmpCount) * 100).toFixed(1);
            if(isNaN(percentage)){
                percentage = 0;
            }
            //console.log("percentage : ",percentage);
            //console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ data[i].TeamName +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<a href="javascript:void(0);" onclick="depView.userViewPop2(\'' + teamID +'\', \''  + arr + '\');">'+
                '<span>' +data[i].TeamEmployeesCount + '명</span>' +
                '</td>' +
                '<td style="background-color: #ffffff;">' +
                '<div style="display: flex; align-items: center;">' +
                '<div style="background-color: ' + color + '; float : left; height: 10px; width: '+percentageWidth+'px; display: inline-block; position: relative; top: 1.5px;">' +
                '</div>' +
                '<span style="display: inline-block; position: relative; top: 1.5px;">'+percentage+'%</span>' +
                '</div>'+
                '</td>' +
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
    },

    transformedArr : function (e){
        console.log("transformedArr input arr:", e.arr);
        var transformedArr = [];

        for (var i = 0; i < e.arr.length; i++) {
            var item = e.arr[i];
            console.log("arr item",item);

            var divisionMatch = item.match(/DIVISION\s*IN\((\d+)\)/);
            var divisionSubMatch = item.match(/DIVISION_SUB\s*IN\(([^)]+)\)/);

            var division = divisionMatch ? divisionMatch[1] : "";
            var divisionSub = divisionSubMatch ? divisionSubMatch[1].replace(/\s/g, '').split(',') : [];

            // DIVISION_SUB가 없으면 "N"으로 표현
            var divisionSubString = divisionSub.length > 0 ? '&' + divisionSub.join(',') : '&N';

            var transformedItem = division + divisionSubString;

            transformedArr.push(transformedItem);
        }

        var resultString = transformedArr.join('|');
        console.log("Transformed arr:", resultString);

        return resultString;
    },

    userViewPop : function(deptID,arr) {
        var encodedArr = encodeURIComponent(arr);
        console.log("userViewPop 함수 인코딩arr:"+encodedArr);
        var url = "/Inside/pop/joinLeaveViewPop.do?deptID="+deptID+ "&encodedArr="+encodedArr;
        var name = "joinLeaveViewPop";
        var option = "width=1800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    userViewPop2 : function(teamID,arr) {
        var encodedArr = encodeURIComponent(arr);
        console.log("userViewPop 함수 인코딩arr:"+encodedArr);
        var url = "/Inside/pop/joinLeaveViewPop.do?teamID="+teamID+ "&encodedArr="+encodedArr;
        var name = "joinLeaveViewPop";
        var option = "width=1800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }

}