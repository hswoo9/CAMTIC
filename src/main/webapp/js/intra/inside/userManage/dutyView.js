var dutyView = {
    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){

        dutyView.gridReload();

        $('.detailSearch').on('change', function () {
            dutyView.gridReload();
        });

    },

    getTotalDutyChart : function (arr) {
        console.log("ajax arr : ",arr);

        $.ajax({
           type : "POST",
           data: {arr:arr},
           url : "Inside/getEmpCountsByPosition",
           dataType:"json",
           success:function (data){
               console.log("js data :", data);
               const empPositionList = data.empPositionList;

               const arr = dutyView.transformedArr(data.arr);

               $("#mainChart *").remove();
               dutyView.mainChart(empPositionList,arr);

           },
           error:function (error){
               console.error("Error fetching data:", error);
           },
        });

    },

    mainChart : function (empPositionList,arr){
        var data = empPositionList;
        console.log("ajax data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            totalEmpCount += data[i].TotalPositionEmpCount  || 0;
        }

        var html = "";

        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col width="5%"><col></colgroup><tbody>';

        for(var i =0;i<data.length; i++) {
            var positionName = data[i].POSITION_NAME;
            var color = dutyView.getColorForIndex(i); //그래프 바의 색깔 함수 호출
            var percentageWidth = (((data[i].TotalPositionEmpCount/ totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].TotalPositionEmpCount / totalEmpCount) * 100).toFixed(1)
            console.log("percentage : ",percentage);
            console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ positionName +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<a href="javascript:void(0);" onclick="dutyView.userViewPop(\'' + positionName +'\', \''  + arr + '\');">'+
                '<span>' +data[i].TotalPositionEmpCount + '명</span>' +
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

        $("#mainChart").append(html);

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


    getColorForIndex : function (index){
        var colors = ["#DC7C7C", "#7C8ADC", "#A77CDC", "#DCB57C", "#B7DC7C"]; //배열에 따라 해당 색이 반복
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

        dutyView.getTotalDutyChart(arr);
    },

    userViewPop : function(positionName,arr) {
        var encodedArr = encodeURIComponent(arr);
        console.log("userViewPop 함수 인코딩arr:"+encodedArr);
        var url = "/Inside/pop/joinLeaveViewPop.do?positionName="+positionName+ "&encodedArr="+encodedArr;
        var name = "joinLeaveViewPop";
        var option = "width=1800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }



}