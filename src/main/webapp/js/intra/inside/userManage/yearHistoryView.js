var yearHistoryView = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
        careerType : "",
        test : ""
    },

    fn_defaultScript : function () {
        yearHistoryView.gridReload();

        $('.detailSearch').on('change', function () {
            yearHistoryView.gridReload();
        });

    },

    getApntNameByYear: function (arr) {
        console.log("ajax arr : ",arr);

        $.ajax({
            type : "GET",
            data: {arr : arr},
            url: "/Inside/getApntNameByYear.do",
            dataType: "json",
            success: function(data) {
                console.log("data : ",data);
                const apntList = data.apntList;
                const arr = yearHistoryView.transformedArr(data.arr);

                console.log("apntList : "+ JSON.stringify(apntList));
                console.log("ajax arr:",arr);


                $("#mainTable *").remove();
                yearHistoryView.global.test = apntList;
                yearHistoryView.getApntListTable(apntList,arr);
            },
            error: function (error){
                console.error("Error fetching data:", error);
            }
        });
    },

    getApntListTable: function (apntList, arr) {
        console.log("getApntListTable arr", arr);
        var html = "";
        html = '<table class="centerTable table table-bordered"><tbody>';

        html += '<tr style="background-color: #d8dce3;">';
        html += '<td>년도</td>';
        html += '<td>합계</td>';
        var uniqueApnts = new Set();

// 중복 제거 및 Set에 position_name 추가
        for (var i = 0; i < apntList.length; i++) {
            var apntName = apntList[i].apnt_name;
            uniqueApnts.add(apntName);
        }

// Set을 배열로 변환하여 정렬
        var uniqueApntsArray = [
            "임용 (정규직)",
            "승진 (직급)",
            "전보",
            "겸직",
            "직무 대리",
            "파견",
            "면직",
            "강등",
            "조직 개편",
            "호칭 변경",
            "기타",
            "임용 (계약직)",
            "임용 (인턴 사원)",
            "임용 (단기 직원)",
            "임용 (위촉 직원)",
            "임용 (경비 / 환경)",
            "임용 (직위)",
        ];


// 각 position_name 출력
        for (var j = 0; j < uniqueApntsArray.length; j++) {
            var apntName = uniqueApntsArray[j];
            html += '<td style="width: 200px;">' + apntName + '</td>';
        }


        html += '</tr>';
        // 각 position_name에 대한 명수 행 추가
        var uniqueYears = [...new Set(apntList.map(item => item.his_year))];
        var sumArr = {};
        for (var i = 0; i < uniqueYears.length; i++) {
            var currentYear = uniqueYears[i];
            html += '<tr style="background-color: white;">'; // 각 년도마다 새로운 행으로 시작

            html += '<td style="width: 200px;">' + currentYear + '년</td>'; // 년도 표시
            html += '<td style="width: 200px;"><span id="sum' + currentYear + '"></span></td>'; // 합계 표시

            sumArr[currentYear] = 0;
            var yearSum = 0;

            for (var j = 0; j < uniqueApntsArray.length; j++) {
                var apntName = uniqueApntsArray[j];
                var apntCounts = apntList.filter(item => item.his_year === currentYear && item.apnt_name === apntName);
                var empCount = apntCounts.length > 0 ? apntCounts[0].emp_count : 0;
                html += '<td><a href="javascript:void(0);" onclick="yearHistoryView. userViewPop(\'' + currentYear +'\', \'' + apntName + '\', \'' + arr + '\');">' +
                    '<span>' + empCount + '명</span></a></td>';
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

        yearHistoryView.getApntNameByYear(arr);
    },

    userViewPop : function(currentYear,apntName,arr) {
        var encodedArr = encodeURIComponent(arr);
        console.log("userViewPop 함수 인코딩arr:"+encodedArr);
        var url = "/Inside/pop/yearHistoryViewPop.do?currentYear="+currentYear+ "&apntName=" +apntName+ "&encodedArr="+encodedArr;
        var name = "yearDutyViewPop";
        var option = "width=1800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }

}