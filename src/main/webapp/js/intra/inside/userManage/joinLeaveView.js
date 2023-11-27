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


    getTotalEmpCount: function(arr) {
        console.log("ajax arr : ",arr);

        $.ajax({
            type: "GET",
            data: { arr : arr },
            url: "/Inside/getTotalEmpCount.do",
            dataType: "json",
            success: function(data) {
                console.log("js data : ",data);
                const empTotalList = data.empTotalList;
                console.log("empTotalList : "+ JSON.stringify(empTotalList));
                $("#countTable *").remove();
                $("#mainTable *").remove();
                joinLeaveView.global.test = empTotalList;
                joinLeaveView.getTotalEmpCountTable1(empTotalList);
                joinLeaveView.getTotalEmpCountTable2(empTotalList);
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


    getTotalEmpCountTable2 : function(e){
        var html = "";
        html = '<table class="centerTable table table-bordered"><tbody>';

        for (var i = 0; i < e.length; i += 7) {
            html += '<tr style="background-color: #d8dce3;"><td>년 도 </td>';
            // 년도 반복 부분
            for (var j = 0; j < 7 && (i + j) < e.length; j++) {
                var currentYear = e[i + j].join_year;
                html += '<td style="width: 200px;">' + currentYear + '년</td>';
            }
            html += '</tr>';

            // 섹션 반복 부분 (입사, 퇴사)
            var sections = [
                { title: '입 사', dataKey: 'employees_joined', color: '#e1ecff' },
                { title: '퇴 사', dataKey: 'employees_resigned', color: '#ffddd8' }
            ];

            for (var s = 0; s < sections.length; s++) {
                html += '<tr style="background-color: ' + sections[s].color + ';"><td>' + sections[s].title + '</td>';

                for (var j = 0; j < 7 && (i + j) < e.length; j++) {
                    var sectionValue = e[i + j][sections[s].dataKey];
                        sectionValue = (sectionValue !== undefined) ? sectionValue : 0;
                    html +=
                        '<td style="width: 200px;">' +
                        '<a href="javascript:void(0);" onclick="joinLeaveView.userViewPop(' + currentYear +');">' +
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

        joinLeaveView.getTotalEmpCount(arr);
    },





    userViewPop : function(year) {
        var url = "/Inside/pop/joinLeaveViewPop.do?year="+year;
        var name = "joinLeaveViewPop";
        var option = "width=1000, height=420, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }
}