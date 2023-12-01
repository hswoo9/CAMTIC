var degreeView = {
    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){

        degreeView.gridReload();

        $('.detailSearch').on('change', function () {
            degreeView.gridReload();
        });

    },

    getTotalDeptChart : function (arr) {
        console.log("ajax arr : ",arr);

        $.ajax({
            type : "POST",
            data: {arr:arr},
            url : "/Inside/getDegreeCount.do",
            dataType:"json",
            success:function (data){
                console.log("js data(degree) :", data);
                const degreeCountList = data.degreeCountList;
                const arr = degreeView.transformedArr(data.arr);

                $("#mainChart *").remove();
                degreeView.mainChart(degreeCountList,arr);

            },
            error:function (error){
                console.error("Error fetching data:", error);
            },
        });

    },

    mainChart : function (degreeCountList,arr){
        var data = degreeCountList;
        console.log("ajax data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            totalEmpCount += data[i].emp_count  || 0;
        }

        var html = "";

        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col><col width="10%"></colgroup><tbody>';


        for(var i =0;i<data.length; i++) {
            var color = degreeView.getColorForIndex(i); //그래프 바의 색깔 함수 호출
            var percentageWidth = (((data[i].emp_count  / totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].emp_count  / totalEmpCount) * 100).toFixed(1)
            console.log("percentage : ",percentage);
            console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ data[i].DEGREE_CODE +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<div style="display: flex; align-items: center;">' +
                '<div style="background-color: ' + color + '; float : left; height: 10px; width: '+percentageWidth+'px; display: inline-block; position: relative; top: 1.5px;">' +
                '</div>' +
                '<span style="display: inline-block; position: relative; top: 1.5px;">'+percentage+'%</span>' +
                '</div>'+
                '</td>' +
                '<td style="background-color: #ffffff;">' + data[i].emp_count  + '명</td>' +
                '</tr>';
        }


        html+='<tr>'+
            '<td style="background-color: #efefef;" align="center" colspan="2">합계</td>'+
            '<td style="background-color: #efefef;">'+totalEmpCount +'명</td>'+
            '</tr>'+
            '</table>';

        $("#mainChart").append(html);

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

        degreeView.getTotalDeptChart(arr);
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
    }



}