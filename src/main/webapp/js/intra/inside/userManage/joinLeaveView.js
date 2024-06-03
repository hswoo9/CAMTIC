var joinLeaveView = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
        careerType : "",
        test : ""
    },

    fn_defaultScript : function (){
        joinLeaveView.gridReload();

        $('.detailSearch').on('change', function () {
            joinLeaveView.gridReload();
        });
    },

    gridReload : function(){
        var requestArr = "";
        if($(".detailSearch:checked").length == 0){
            $("#countTable *").remove();
            $("#mainTable *").remove();
            joinLeaveView.getTotalEmpCountTable1([]);
            joinLeaveView.getTotalEmpCountTable2([], []);
            return;
        }else{
            $(".detailSearch:checked").each(function(){
                if($(this).attr("id") == "dsA"){
                    requestArr += "|0&N|4&1,2";
                }else{
                    requestArr += "|" + $(this).attr("division") + '&' + ($(this).attr("divisionSub") == null ? "N" : $(this).attr("divisionSub"));
                }

            })
        }

        var arr = requestArr.substring(1);
        console.log("arr :", arr);

        joinLeaveView.getTotalEmpCount(arr);
    },

    getTotalEmpCount: function(arr) {
        $.ajax({
            type: "GET",
            data: { arr : arr },
            url: "/Inside/getTotalEmpCount.do",
            dataType: "json",
            success: function(data) {
                console.log("js data : ", data);
                const empTotalList = data.empTotalList;
                const arr = joinLeaveView.transformedArr(data.arr);

                console.log("empTotalList : "+ JSON.stringify(empTotalList));
                console.log("ajax arr:",arr);

                $("#countTable *").remove();
                $("#mainTable *").remove();
                joinLeaveView.global.test = empTotalList;
                joinLeaveView.getTotalEmpCountTable1(empTotalList);
                joinLeaveView.getTotalEmpCountTable2(empTotalList,arr);
            },
            error: function(error) {
                console.error("Error fetching data:", error);
            },
        });
    },

    getTotalEmpCountTable1: function(e) {
        var totalJoined = 0;
        var totalResigned = 0;
        var totalEmpCount = 0;

        // employees_joined의 총 합 계산
        for (var i = 0; i < e.length; i++) {
            totalJoined += e[i].employees_joined || 0; 
        }
        for (var i = 0; i < e.length; i++) {
            totalResigned += e[i].employees_resigned || 0; 
        }
        for (var i = 0; i < e.length; i++) {
            totalEmpCount += e[i].active_emp_count || 0;
        }

        var html = "";
        html = '<table class="centerTable table table-bordered"><colgroup><col width="35%"><col width="35%"><col width="30%"></colgroup><tbody>'+
            '<tr>'+
            '<td style="background-color: #e1ecff;">입사인원</td>'+
            '<td style="background-color: #ffddd8;">퇴사인원</td>'+
            '<td style="background-color: #d8dce3;">현재인원</td>'+
            '</tr>'+
            '<tr>'+
            '<td style="background-color: #e1ecff;">' + totalJoined + '명</td>' +
            '<td style="background-color: #ffddd8;">' + totalResigned + '명</td>' +
            '<td style="background-color: #d8dce3;">' + totalEmpCount + '명</td>' +
            '</tr>'+
            '</tbody>' +
            '</table>';

        $("#countTable").append(html);
    },

    getTotalEmpCountTable2: function(empTotalList, arr) {
        console.log("getTotalEmpCountTable2 arr", arr);
        var html = "";
        html = '<table class="centerTable table table-bordered"><tbody>';

        for (var i = 0; i < empTotalList.length; i += 7) {
            html += '<tr style="background-color: #d8dce3;"><td>년 도 </td>';
            // 년도 반복 부분
            for (var j = 0; j < 7 && (i + j) < empTotalList.length; j++) {
                var currentYear = empTotalList[i + j].join_year;
                html += '<td style="width: 200px;">' + currentYear + '년</td>';
            }
            html += '</tr>';

            // 섹션 반복 부분 (입사, 퇴사)
            var sections = [
                { title: '입 사', dataKey: 'employees_joined', source: 'empTotalList', color: '#e1ecff' },
                { title: '퇴 사', dataKey: 'employees_resigned', source: 'empTotalList', color: '#ffddd8' }
            ];

            for (var s = 0; s < sections.length; s++) {
                html += '<tr style="background-color: ' + sections[s].color + ';"><td>' + sections[s].title + '</td>';

                for (var j = 0; j < 7 && (i + j) < empTotalList.length; j++) {
                    var sectionTitle = sections[s].dataKey;
                    var currentYear = empTotalList[i + j].join_year;
                    var sectionValue = empTotalList[i + j][sections[s].dataKey];
                    sectionValue = (sectionValue !== undefined) ? sectionValue : 0;
                    html +=
                        '<td style="width: 200px;">' +
                        '<a href="javascript:void(0);" onclick="joinLeaveView.userViewPop(\'' + currentYear + '\', \'' + sectionTitle + '\', \'' + arr + '\');">' +
                        '<span>' + sectionValue + '명</span>' +
                        '</a>' +
                        '</td>';
                }

                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        $("#mainTable").append(html);
    },

    transformedArr : function (e){
        console.log("transformedArr input arr:", e.arr);
        var transformedArr = [];

        for (var i = 0; i < e.arr.length; i++) {
            var item = e.arr[i];
            console.log("arr item",item);

            var divisionMatch = item.match(/DIVISION\s*IN\(([^)]+)\)/);
            var divisionSubMatch = item.match(/DIVISION_SUB\s*IN\(([^)]+)\)/);

            var division = divisionMatch ? divisionMatch[1].replace(/\s/g, '').split(',') : "";
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

    userViewPop : function(currentYear,sectionTitle,arr) {
        var encodedArr = encodeURIComponent(arr);
        console.log("userViewPop 함수 인코딩 arr: ", encodedArr);
        var url = "/Inside/pop/joinLeaveViewPop.do?currentYear="+currentYear+ "&sectionTitle=" +sectionTitle+ "&encodedArr="+encodedArr;
        var name = "joinLeaveViewPop";
        var option = "width=1800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }
}