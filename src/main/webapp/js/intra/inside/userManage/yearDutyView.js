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
                yearDutyView.getPositionListTable(positionList,arr, data.positionCode);
            },
            error: function (error){
                console.error("Error fetching data:", error);
            }
        });

        $.ajax({
            type : "POST",
            data: {arr : arr},
            url: "/Inside/getCurrentPositionByYear",
            dataType: "json",
            success: function(data) {
                console.log("currentPositionByYear data : ",data);

            },
            error: function (error){
                console.error("Error fetching data:", error);
            }
        });
    },

    getPositionListTable: function (positionList, arr, positionCode) {
        console.log("getPositionListTable arr", arr);
        var html = "";
        html = '<table class="centerTable table table-bordered"><tbody>';

        html += '<tr style="background-color: #d8dce3;">';
        html += '<td>년도</td>';
        html += '<td>합계</td>';
        var uniquePositions = new Set();
        console.log("positionList", positionList);

// 중복 제거 및 Set에 position_name 추가
        for (var i = 0; i < positionList.length; i++) {
            var positionName = positionList[i].position_name;
            uniquePositions.add(positionName);
        }

// Set을 배열로 변환하여 정렬
        var uniquePositionsArray = [
            "수석연구원",
            "수석매니저",
            "수석행정원",
            "책임매니저",
            "책임행정원",
            "책임연구원",
            "선임연구원",
            "선임매니저",
            "선임행정원",
            "주임행정원",
            "행정원",
            "주임매니저",
            "매니저",
            "주임연구원",
            "연구원"
        ];

// 각 position_name 출력
        for (var j = 0; j < uniquePositionsArray.length; j++) {
            var positionName = uniquePositionsArray[j];
            html += '<td style="width: 200px;">' + positionName + '</td>';
        }


        html += '</tr>';
        // 각 position_name에 대한 명수 행 추가
        var uniqueYears = [...new Set(positionList.map(item => item.join_year))];
        var sumArr = {};
        for (var i = 0; i < uniqueYears.length; i++) {
            var currentYear = uniqueYears[i];
            html += '<tr style="background-color: white;">'; // 각 년도마다 새로운 행으로 시작

            html += '<td style="width: 200px;">' + currentYear + '년</td>'; // 년도 표시
            html += '<td style="width: 200px;"><span id="sum' + currentYear + '"></span></td>'; // 합계 표시

            sumArr[currentYear] = 0;
            var yearSum = 0;

            for (var j = 0; j < uniquePositionsArray.length; j++) {
                var positionName = uniquePositionsArray[j];
                var positionCounts = positionList.filter(item => item.join_year === currentYear && item.position_name === positionName);
                var empCount = positionCounts.length > 0 ? positionCounts[0].emp_count : 0;
                html += '<td><a href="javascript:void(0);" onclick="yearDutyView. userViewPop(\'' + currentYear +'\', \'' + positionName + '\', \'' + arr + '\');">' +
                    '<span>' + empCount + '명</span></a></td>';

                for (var k = 0; k < positionCode.length; k++) {
                    if(positionCode[k].count == null){
                        positionCode[k].count = 0;
                    }

                    if(positionCode[k].CM_CODE_NM2 == positionName){
                        positionCode[k].count += Number(empCount)
                    }
                }

                yearSum += empCount;
            }
            sumArr[currentYear] = yearSum;

            html += '</tr>'; // 행 마감
        }

        html += '</tbody></table>';
        $("#mainTable").append(html);

        for (var i = 0; i < uniqueYears.length; i++) {
            $("#sum" + uniqueYears[i]).text(sumArr[uniqueYears[i]] + "명");
        }

        var totalTr = "";
        var totalTd = "";

        for (var i = 0; i < positionCode.length; i++) {
            totalTr += "<td>" + positionCode[i].CM_CODE_NM2 + "</td>";
            totalTd += "<td>" + positionCode[i].count + "명</td>";
        }

        /*$("#totalTr").append(totalTr);
        $("#totalTd").append(totalTd);*/
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
    },

    userViewPop : function(currentYear,positionName,arr) {
        var encodedArr = encodeURIComponent(arr);
        console.log("userViewPop 함수 인코딩arr:"+encodedArr);
        var url = "/Inside/pop/yearDutyViewPop.do?currentYear="+currentYear+ "&positionName=" +positionName+ "&encodedArr="+encodedArr;
        var name = "yearDutyViewPop";
        var option = "width=1800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }

}