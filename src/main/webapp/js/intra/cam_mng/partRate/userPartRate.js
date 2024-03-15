var userPartRate = {


    fn_defaultScript : function (){
        var currentYear = new Date().getFullYear();
        var startYear = $("#pjtStrDt").val();
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

        var adminYn = $("#adminYn").val();

        $("#year").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: yearList,
            index: startIndex,
            change: function (e) {
                if(adminYn != ""){
                    userPartRate.fn_setDataAdmin();
                }else{
                    userPartRate.fn_setData();
                }
            }
        });

        if(adminYn != ""){
            userPartRate.fn_setDataAdmin();
        }else{
            userPartRate.fn_setData();
        }

        //주민번호
        if($("#resRegisNum").text().length >= 12) {
            $("#resRegisNum").text($("#resRegisNum").text().replace(/(\d{5}-\d{1})(\d{6})/, "$1******"));
        }else{
            $("#resRegisNum").text($("#resRegisNum").text() + "******");
        }
    },


    fn_setData : function (type){
        console.log("projectRate");
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
        hdHtml += '<th scope="row" class="text-center th-color">과제구분</th>';
        hdHtml += '<th scope="row" class="text-center th-color">지원부처</th>';
        hdHtml += '<th scope="row" class="text-center th-color">과제명</th>';
        hdHtml += '<th scope="row" class="text-center th-color">참여시작</th>';
        hdHtml += '<th scope="row" class="text-center th-color">참여종료</th>';
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
                    var pjtStatus = "예정";

                    var today = new Date();
                    var endDay = new Date(rs[i].PART_DET_END_DT);

                    if(rs[i].MNG_STAT == 'C'){
                        pjtStatus = "진행";

                        if(endDay < today){
                            pjtStatus = "기간종료";
                        }
                    }
                    /*var checkIngArr = ['Y', 'E', 'E1', 'E2', 'R', 'S'];
                    if(checkIngArr.indexOf(rs[i].PJT_STEP) > -1){
                        pjtStatus = "예정";
                    }
                    var checkEndArr = ['E6', 'E7', 'R3', 'S3'];
                    if(checkEndArr.indexOf(rs[i].PJT_STEP) > -1){
                        pjtStatus = "종료";
                    }*/

                    var pm = "";
                    if(parameters.empSeq == rs[i].PM_EMP_SEQ){
                        pm = "책임자";
                    } else {
                        pm = "참여자";
                    }

                    var sbjStat = "";
                    if(rs[i].SBJ_STAT_YN == "Y"){
                        if(parameters.empSeq == rs[i].PM_EMP_SEQ){
                            pmCnt++;
                        }

                        sbjStat = "적용";
                        sbjStatCnt++;
                    }else{
                        sbjStat = "미적용";
                    }

                    var subClassText = "";
                    if(rs[i].subClassText != null){
                        subClassText = rs[i].subClassText;
                    }

                    bodyHtml += '<tr style="text-align: center;">';
                    bodyHtml += '   <td>'+subClassText+'</td>';
                    bodyHtml += '   <td>'+rs[i].SBJ_DEP_NM+'</td>';
                    bodyHtml += '   <td>'+rs[i].PJT_NM+'</td>';
                    bodyHtml += '   <td>'+rs[i].PART_DET_STR_DT+'</td>';
                    bodyHtml += '   <td>'+rs[i].PART_DET_END_DT+'</td>';
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
                bodyHtml += '<tr>';
                bodyHtml += '   <td colspan="8" class="text-center" style="background-color: #8fa1c04a;">참여율 총합</td>';
                for(var j = 0 ; j< diffMonth; j++){
                    var userTotRate = 0;
                    for(var i = 0 ; i < rs.length; i++){
                        userTotRate += Number(userTotRateArr[i][j]);
                    }
                    bodyHtml += '<td style="text-align: right; font-weight: bold">'+userTotRate.toFixed(1)+'%</td>';
                }
                bodyHtml += '</tr>';

                bodyHtml += '<tr>';
                bodyHtml += '   <td colspan="8" class="text-center" style="background-color: #8fa1c04a;"></td>';
                for(var j = 0 ; j< diffMonth; j++){
                    bodyHtml += '<td style="text-align: right; font-weight: bold">'+sbjStatCnt+'공 '+ pmCnt + '책</td>';
                }
                bodyHtml += '</tr>';

                $("#userPartRateBody").html(bodyHtml);
            }
        });
    },

    fn_setDataAdmin : function (type){
        console.log("insideRate");
        var selStartDate = $("#year").data("kendoDropDownList").value() + "-01-01";
        var selEndDate = $("#year").data("kendoDropDownList").value() + "-12-31";

        $("#rateFlag").val(type);

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


        diffMonth = 12;

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

                var monYn = "";
                var monPayStr = "MON_PAY_";
                var monItemStr = "MON_ITEM_";

                for (var i = 0; i < rs.length; i++) {
                    var itemMonMap;
                    $.ajax({
                        url : "/inside/getBusnPartRatePayData",
                        data : {empSeq: $("#userEmpSeq").val(), pjtSn: rs[i].PJT_SN},
                        type : "post",
                        dataType : "json",
                        async : false,
                        success : function(rs2) {
                            if(rs2.map !== "" && rs2.map !== null && rs2.map !== undefined){
                                monYn = 'Y';
                                itemMonMap = rs2.map;
                            }else{
                                monYn = 'N';
                            }
                        }
                    });

                    var pjtStatus = "예정";

                    var today = new Date();
                    var endDay = new Date(rs[i].PART_DET_END_DT);

                    if(rs[i].MNG_STAT == 'C'){
                        pjtStatus = "진행";

                        if(endDay < today){
                            pjtStatus = "기간종료";
                        }
                    }

                    /*var checkIngArr = ['Y', 'E', 'E1', 'E2', 'R', 'S'];
                    if(checkIngArr.indexOf(rs[i].PJT_STEP) > -1){
                        pjtStatus = "예정";
                    }
                    var checkEndArr = ['E6', 'E7', 'R3', 'S3'];
                    if(checkEndArr.indexOf(rs[i].PJT_STEP) > -1){
                        pjtStatus = "종료";
                    }*/

                    var pm = "";
                    if(parameters.empSeq == rs[i].PM_EMP_SEQ){
                        pm = "책임자";
                    } else {
                        pm = "참여자";
                    }

                    var sbjStat = "";
                    if(rs[i].SBJ_STAT_YN == "Y"){
                        if(parameters.empSeq == rs[i].PM_EMP_SEQ){
                            pmCnt++;
                        }
                        sbjStat = "적용";
                        sbjStatCnt++;
                    }else{
                        sbjStat = "미적용";
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

                    var colMonth = date.getMonth() + 1; //월 컬럼 선택
                    var colYear = date.getFullYear(); //년 컬럼 선택
                    for(var j = 0 ; j < diffMonth ; j++){
                        var dt = date.getFullYear() + "-" + (date.getMonth() + 1);
                        var userDt = userDate.getFullYear() + "-" + (userDate.getMonth() + 1);

                        userChangeSalaryArr[i][j] = 0;
                        userMonthSalaryArr[i][j] = 0;
                        userTotRateArr[i][j] = 0;

                        if(dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])){
                            if($("#rateFlag").val() == "B"){
                                if(monYn == 'Y'){
                                    var itemMon = itemMonMap[colYear]; // 년 선택
                                    bodyHtml += '<td style="text-align: right">' + comma(itemMon[monPayStr + (date.getMonth() + 1)]) + '</td>';
                                    //bodyHtml += '<td style="text-align: right">' + comma(itemMonMap[monItemStr + (date.getMonth() + 1)]) + '</td>';
                                }else {
                                    bodyHtml += '<td style="text-align: right">' + comma(rs[i].MON_SAL) + '</td>';
                                }
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