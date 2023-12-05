var genderAgeView = {
    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){

        genderAgeView.gridReload();

        $('.detailSearch').on('change', function () {
            genderAgeView.gridReload();
        });

    },

    getTotalDeptChart : function (arr) {
        console.log("ajax arr : ",arr);

        $.ajax({
            type : "POST",
            data: {arr:arr},
            url : "/Inside/getGenderCount.do",
            dataType:"json",
            success:function (data){
                console.log("js data(gender) :", data);
                const genderCountList = data.genderCountList;
                const arr = genderAgeView.transformedArr(data.arr);

                $("#mainChart *").remove();
                genderAgeView.mainChart(genderCountList,arr);

            },
            error:function (error){
                console.error("Error fetching data:", error);
            },
        });

        $.ajax({
            type : "POST",
            data: {arr:arr},
            url : "/Inside/getAgeCount.do",
            dataType:"json",
            success:function (data){
                console.log("js data(age) :", data);
                const ageCountList = data.ageCountList;
                const arr = genderAgeView.transformedArr(data.arr);

                $("#ageChart *").remove();
                genderAgeView.ageChart(ageCountList,arr);

            },
            error:function (error){
                console.error("Error fetching data:", error);
            },
        });

    },

    mainChart : function (genderCountList,arr){
        var data = genderCountList;
        console.log("ajax data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            totalEmpCount += data[i].emp_count  || 0;
        }

        var html = "";
        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col><col width="10%"></colgroup><tbody>';
        for(var i =0;i<data.length; i++) {
            var genderName = data[i].gender_code;
            var color =  genderAgeView.getColorForIndex(i); //그래프 바의 색깔 함수 호출
            var percentageWidth = (((data[i].emp_count / totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].emp_count  / totalEmpCount) * 100).toFixed(1)
            console.log("percentage : ",percentage);
            console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ data[i].gender_code
                +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<div style="display: flex; align-items: center;">' +
                '<div style="background-color: ' + color + '; float : left; height: 10px; width: '+percentageWidth+'px; display: inline-block; position: relative; top: 1.5px;">' +
                '</div>' +
                '<span style="display: inline-block; position: relative; top: 1.5px;">'+percentage+'%</span>' +
                '</div>'+
                '</td>' +
                '<td style="background-color: #ffffff;">' +
                '<a href="javascript:void(0);" onclick="genderAgeView.userViewPop(\'' + genderName +'\', \''  + arr + '\');">'+
                '<span>' +data[i].emp_count + '명</span>' +
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

    ageChart : function (ageCountList,arr){
        var data = ageCountList;
        console.log("ajax data : ",data);
        var totalEmpCount = 0;

        for(var i = 0; i<data.length; i++){
            totalEmpCount += data[i].emp_count  || 0;
        }

        var html = "";
        html = '<table class="centerTable table table-bordered"><colgroup><col width="15%"><col><col width="10%"></colgroup><tbody>';
        for(var i =0;i<data.length; i++) {
            var ageName = data[i].age;
            var color =  genderAgeView.getColorForIndex(i); //그래프 바의 색깔 함수 호출
            var percentageWidth = (((data[i].emp_count / totalEmpCount) * 100).toFixed(1))*9;
            var percentage = ((data[i].emp_count  / totalEmpCount) * 100).toFixed(1)
            console.log("percentage : ",percentage);
            console.log("percentageWidth : ",percentageWidth);
            html += '<tr>' +
                '<td style="background-color: #efefef;">'+ data[i].age +'</td>' +
                '<td style="background-color: #ffffff;">' +
                '<div style="display: flex; align-items: center;">' +
                '<div style="background-color: ' + color + '; float : left; height: 10px; width: '+percentageWidth+'px; display: inline-block; position: relative; top: 1.5px;">' +
                '</div>' +
                '<span style="display: inline-block; position: relative; top: 1.5px;">'+percentage+'%</span>' +
                '</div>'+
                '</td>' +
                '<td style="background-color: #ffffff;">' +
                '<a href="javascript:void(0);" onclick="genderAgeView.userViewPop2(\'' + ageName +'\', \''  + arr + '\');">'+
                '<span>' +data[i].emp_count + '명</span>' +
                '</td>' +
                '</tr>';
        }


        html+='<tr>'+
            '<td style="background-color: #efefef;" align="center" colspan="2">합계</td>'+
            '<td style="background-color: #efefef;">'+totalEmpCount +'명</td>'+
            '</tr>'+
            '</table>';

        $("#ageChart").append(html);

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
                    requestArr += "|0&N"
                }else{
                    requestArr += "|" + $(this).attr("division") + '&' + ($(this).attr("divisionSub") == null ? "N" : $(this).attr("divisionSub"));
                }

            })
        }
        console.log("requestArr:", requestArr);
        var arr = requestArr.substring(1);
        console.log("arr :",arr);

        genderAgeView.getTotalDeptChart(arr);
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

    userViewPop : function(genderName,arr) {
        var encodedArr = encodeURIComponent(arr);
        console.log("userViewPop 함수 인코딩arr:"+encodedArr);
        var url = "/Inside/pop/joinLeaveViewPop.do?genderName="+genderName+ "&encodedArr="+encodedArr;
        var name = "joinLeaveViewPop";
        var option = "width=1800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    userViewPop2 : function(ageName,arr) {
        var encodedArr = encodeURIComponent(arr);
        console.log("userViewPop 함수 인코딩arr:"+encodedArr);
        var url = "/Inside/pop/joinLeaveViewPop.do?ageName="+ageName+ "&encodedArr="+encodedArr;
        var name = "joinLeaveViewPop";
        var option = "width=1800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }



}