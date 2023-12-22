var userPartRate = {


    fn_defaultScript : function (){
        var currentYear = new Date().getFullYear();
        var startYear = $("#startYear").val();
        var startIndex = 10;

        var yearList = [];
        for (var i = currentYear - 10; i <= currentYear + 10; i++) {
            yearList.push({ text: i.toString(), value: i.toString() });
        }

        if(startYear != null){
            startYear = startYear.substring(0,4);
            startYear = Number(startYear) - currentYear;
            startIndex = startIndex + startYear;
        }

        $("#year").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: yearList,
            index: startIndex,
            change: function (e) {
                userPartRate.fn_setData();
            }
        });

        userPartRate.fn_setData();
    },


    fn_setData : function (type){
        var adminYn = $("#adminYn").val();
        var selStartDate = $("#year").data("kendoDropDownList").value() + "-01-01";
        var selEndDate = $("#year").data("kendoDropDownList").value() + "-12-31";

        $("#rateFlag").val(type);

        /*if($("#pjtStrDt").val() == ""){
            var strDe = $("#bsStrDt").val().split("-");
            var endDe = $("#bsEndDt").val().split("-");
        } else {
            var strDe = $("#pjtStrDt").val().split("-");
            var endDe = $("#pjtEndDt").val().split("-");
        }*/

        var strDe = selStartDate.split("-");
        var endDe = selEndDate.split("-");

        var diffMonth = (endDe[0] - strDe[0]) * 12 + (endDe[1] - strDe[1]) + 1;

        const projectStartMonth = strDe[0] + "-01";
        var date = new Date(projectStartMonth);
        $("#userPartRateHeader").html("");
        var hdHtml = "";
        hdHtml += '<th scope="row" class="text-center th-color">지원부처</th>';
        hdHtml += '<th scope="row" class="text-center th-color">사업명</th>';
        hdHtml += '<th scope="row" class="text-center th-color">상태</th>';
        hdHtml += '<th scope="row" class="text-center th-color">참여구분</th>';
        hdHtml += '<th scope="row" class="text-center th-color">5공3책</th>';

        // if(diffMonth > 12){
            diffMonth = 12;
        // }
        for(var i = 0 ; i < diffMonth ; i++){
            var dtMonth = date.getMonth() + 1;
            if(dtMonth.toString().length == 1){
                dtMonth = "0" + dtMonth;
            }
            hdHtml += '<th scope="row" class="text-center th-color">'+date.getFullYear() + '-' + dtMonth +'</th>';

            date.setMonth(date.getMonth() + 1);

        }

        $("#userPartRateHeader").html(hdHtml);

        var parameters = {
            empSeq : $("#userEmpSeq").val(),
            strDe : selStartDate,
            diffMon : diffMonth,
            strMonth : projectStartMonth + "-01",
        }

        if(parameters.strDe == ""){
            parameters.strDe = $("#bsStrDt").val();
        }

        $.ajax({
            url : "/mng/userPartRateInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){
                var salList = rs.userSalList;
                var rs = rs.list;

                $("#userPartRateBody").html("");
                var bodyHtml = "";



                var userChangeSalaryArr = fn_create2DArray(rs.length, diffMonth);
                var userMonthSalaryArr = fn_create2DArray(rs.length, diffMonth);
                var userTotRateArr = fn_create2DArray(rs.length, diffMonth);
                var pmCnt = 0;
                var sbjStatCnt = 0;
                for (var i = 0; i < rs.length; i++) {
                    var pjtStatus = "진행";

                    var checkArr = ['Y', 'E', 'E1', 'E2', 'R', 'S'];
                    if(checkArr.indexOf(rs[i].PJT_STEP) > -1){
                        pjtStatus = "예정";
                    }

                    var pm = "";
                    if(parameters.empSeq == rs[i].PM_EMP_SEQ){
                        pm = "책임자";
                        pmCnt++;
                    } else {
                        pm = "참여자";
                    }

                    var sbjStat = "";
                    if(rs[i].SBJ_STAT_YN == "Y"){
                        sbjStat = "적용";
                        sbjStatCnt++;
                    }

                    bodyHtml += '<tr style="text-align: center;">';
                    bodyHtml += '   <td>'+rs[i].SBJ_DEP_NM+'</td>';
                    bodyHtml += '   <td>'+rs[i].PJT_NM+'</td>';
                    bodyHtml += '   <td>'+pjtStatus+'</td>';
                    bodyHtml += '   <td>'+pm+'</td>';
                    bodyHtml += '   <td>'+sbjStat+'</td>';


                    var date = new Date(projectStartMonth);


                    var userStrDeArr = rs[i].PART_DET_STR_DT.split("-");
                    var userEndDeArr = rs[i].PART_DET_END_DT.split("-");
                    var userStartMonth = userStrDeArr[0] + "-" + userStrDeArr[1];

                    var userDate = new Date(userStartMonth);



                    for(var j = 0 ; j < diffMonth ; j++){
                        var dt = date.getFullYear() + "-" + (date.getMonth() + 1);
                        var userDt = userDate.getFullYear() + "-" + (userDate.getMonth() + 1);

                        userChangeSalaryArr[i][j] = 0;
                        userMonthSalaryArr[i][j] = 0;
                        userTotRateArr[i][j] = 0;
                        if(dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])){
                            if($("#rateFlag").val() == "B"){
                                bodyHtml += '<td style="text-align: right">'+comma(rs[i].MON_SAL)+'</td>';
                            } else {
                                bodyHtml += '<td>'+rs[i].TOT_RATE+'%</td>';
                            }

                            userDate.setMonth(userDate.getMonth() + 1);

                            userChangeSalaryArr[i][j] = rs[i].CHNG_SAL;
                            userMonthSalaryArr[i][j] = rs[i].MON_SAL;
                            userTotRateArr[i][j] = rs[i].TOT_RATE;
                        } else {
                            bodyHtml += '<td></td>';
                        }

                        date.setMonth(date.getMonth() + 1);
                    }

                    bodyHtml += '</tr>';
                }

                var userChangeSalary = 0;

                if(adminYn != "") {
                    bodyHtml += "<tr>";
                    bodyHtml += "   <td colspan='5' class='text-center' style='background-color: #8fa1c04a;'>월지급액</td>";

                    for (var j = 0; j < diffMonth; j++) {
                        var userMonthSalary = 0;
                        for (var i = 0; i < rs.length; i++) {
                            userMonthSalary += userMonthSalaryArr[i][j];
                        }

                        bodyHtml += '<td style="text-align: right; font-weight: bold">' + comma(userMonthSalary) + '</td>';
                    }
                    bodyHtml += '</tr>';
                    bodyHtml += "<tr>";
                    bodyHtml += "   <td colspan='5' class='text-center' style='background-color: #8fa1c04a;'>기준급여</td>";
                    for (var j = 0; j < diffMonth; j++) {
                        if (salList[j] == null) {
                            bodyHtml += '<td style="text-align: right; font-weight: bold">0</td>';
                        } else {
                            bodyHtml += '<td style="text-align: right; font-weight: bold">' + fn_monBasicSalary(salList[j]) + '</td>';
                        }
                    }
                    bodyHtml += '</tr>';
                }
                bodyHtml += '<tr>';
                bodyHtml += '   <td colspan="5" class="text-center" style="background-color: #8fa1c04a;">사업참여율</td>';
                for(var j = 0 ; j< diffMonth; j++){
                    var userTotRate = 0;
                    for(var i = 0 ; i < rs.length; i++){
                        userTotRate += Number(userTotRateArr[i][j]);
                    }
                    bodyHtml += '<td style="text-align: right; font-weight: bold">'+userTotRate.toFixed(1)+'%</td>';
                }
                bodyHtml += '</tr>';

                bodyHtml += '<tr>';
                bodyHtml += '   <td colspan="5" class="text-center" style="background-color: #8fa1c04a;">5공3책</td>';
                for(var j = 0 ; j< diffMonth; j++){
                    bodyHtml += '<td style="text-align: right; font-weight: bold">'+sbjStatCnt+'공 '+ pmCnt + '책</td>';
                }
                bodyHtml += '</tr>';




                $("#userPartRateBody").html(bodyHtml);
            }
        });
    }
}