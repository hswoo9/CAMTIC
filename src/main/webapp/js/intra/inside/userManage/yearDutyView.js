var yearDutyView = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
        careerType : "",
        test : ""
    },

    fn_defaultScript : function () {
        yearDutyView.gridReload();

        $('.detailSearch').on('change', function () {
            yearDutyView.gridReload();
        });

    },

    getPositionNameByYear: function (arr) {
        console.log("ajax arr : ",arr);

        $.ajax({
            type : "GET",
            data: {arr : arr},
            url: "/Inside/getPositionNameByYear.do",
            dataType: "json",
            success: function(data) {
                console.log("data : ",data);
                const positionList = data.positionList;
                const arr = yearDutyView.transformedArr(data.arr);

                console.log("positionList : "+ JSON.stringify(positionList));
                console.log("ajax arr:",arr);


                $("#mainTable *").remove();
                yearDutyView.global.test = positionList;
                yearDutyView.getPositionListTable(positionList,arr);
            },
            error: function (error){
                console.error("Error fetching data:", error);
            }
        });
    },

    getPositionListTable: function (positionList, arr) {
        console.log("getPositionListTable arr", arr);
        var html = "";
        html = '<table class="centerTable table table-bordered"><tbody>';

        html += '<tr style="background-color: #d8dce3;">';
        html += '<td>년도</td>';
        for (var i = 0; i < positionList.length; i++) {
            var positionName = positionList[i].POSITION_NAME;
            html += '<td style="width: 200px;">' + positionName + '</td>';
        }


        html += '</tr>';

        // 각 position_name에 대한 명수 행 추가
            // var uniqueYears = [...new Set(positionList.map(item => item.join_year))];
            //
            // for (var i = 0; i < uniqueYears.length; i++) {
            //     var currentYear = uniqueYears[i];
            //     html += '<td style="width: 200px;">' + currentYear + '년</td>';
            // }


            // for (var j = 0; j < uniqueYears.length; j++) {
            //     var currentYear = uniqueYears[j];
            //     var positionCounts = positionList.filter(item => item.join_year === currentYear && item.POSITION_NAME === positionName);
            //     var empCount = positionCounts.length > 0 ? positionCounts[0].emp_count : 0;
            //     html += '<td><a href="javascript:void(0);" onclick="yearDutyView.userViewPop(\'' + positionName +'\', \'' + currentYear + '\', \'' + arr + '\');">' +
            //         '<span>' + empCount + '명</span></a></td>';
            // }

            // html += '</tr>';

        html += '</tbody></table>';
        $("#mainTable").append(html);
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

    gridReload: function (){
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

        yearDutyView.getPositionNameByYear(arr);
    }



}