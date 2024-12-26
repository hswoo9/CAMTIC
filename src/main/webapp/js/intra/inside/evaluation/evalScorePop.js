var evalScorePop = {


    fn_defaultScript : function (){
        evalScorePop.evalContent();
    },

    saveData : function(){
        var flag = true;
        var percentType = ['order', 'sales', 'revenue'];
        var sum = 0;

        if($("#evalList tr[pjtSn]").length == 0){
            alert("저장할 프로젝트 데이터가 없습니다.");
            return;
        }

        $.each($("#evalList tr"), function(i, v){
            $.each(percentType, function(ii, vv){
                var sum = 0;

                $("." + vv + "Percent[pjtSn='" + $(v).attr("pjtSn") + "']").each(function(i, v){
                    sum += Number($(this).val())
                })

                if(sum > 100){
                    alert("실적률이 100%를 초과하였습니다.");
                    flag = false;
                    return;
                }
            })
        })

        if(!flag){
            return;
        }


        var achieveArr = new Array();
        $.each($("#evalList tr"), function(i, v){
            $.each($("#evalListDiv td.targetEmp"), function(ii, vv){
                var data = {
                    pjtSn : $(v).attr("pjtSn"),
                    empSeq :  $(vv).attr("id"),
                    orderAchieve : $(v).find("input[percentType='order'][targetEmpSeq='" + $(vv).attr("id") + "']").val(),
                    salesAchieve : $(v).find("input[percentType='sales'][targetEmpSeq='" + $(vv).attr("id") + "']").val(),
                    revenueAchieve : $(v).find("input[percentType='revenue'][targetEmpSeq='" + $(vv).attr("id") + "']").val(),
                    regEmpSeq : $("#regEmpSeq").val()
                }

                achieveArr.push(data);
            })
        })

        if(confirm("저장하시겠습니까?")){
            $.ajax({
                url: "/evaluation/setEvalAchieve",
                data: {
                    achieveArr : JSON.stringify(achieveArr)
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function(rs){
                    alert("저장되었습니다.");

                    if(opener.parent.evaluationPerReq != null) {
                        opener.parent.evaluationPerReq.getEvaluationList()
                    }

                    location.reload()
                }
            });
        }
    },

    evalContent: function(){
        $.ajax({
            url: "/evaluation/getEvalAchieveScoreList",
            type: "post",
            data: {
                year : $("#searchYear").val(),
                deptSeq : $("#regDeptSeq").val(),
                teamSeq : $("#regTeamSeq").val(),
                dutyCode : $("#regDutyCode").val(),
                empSeq : $("#regEmpSeq").val()
            },
            dataType: "json",
            async: false,
            success: function (rs) {
                evalScorePop.evalScoreTableMake(rs.rs);
            },
            error: function (e) {
                console.log(e);
            }
        });
    },

    evalScoreTableMake: function (rs) {
        var pjtList = rs.pjtList;
        var evalAchieveList = rs.evalAchieveList;

        var col = evalAchieveList.length + 1;

        var html = "";
        html += '<div class=\"fixed-table\">';
        html += '<table class="searchTable table table-bordered mb-0" id="achieveTb">';
        html += '   <tbody id="evalThead">';
        html += '   <tr>';
        html += '       <th colSpan="4" class="text-center th-color sticky">구분</th>';
        html += '       <th colSpan="3" class="text-center th-color sticky">팀 실적 (단위 : 원)</th>';
        html += '   </tr>';
        html += '   <tr>';
        html += '       <td class="sticky">번호</td>';
        html += '       <td class="sticky">프로젝트명</td>';
        html += '       <td class="sticky">업체</td>';
        html += '       <td class="sticky">구분</td>';
        html += '       <td class="sticky">수추</td>';
        html += '       <td class="sticky">매출</td>';
        html += '       <td class="sticky">수익</td>';
        html += '   </tr>';
        html += '   <tr>';
        html += '   <tr id="sumTr">';
        html += '       <td colspan="4" class="sticky" id="pjtBusnClassStatus" style="font-weight: bold"></td>';
        html += '       <td id="pjtOrderSum" style="font-weight: bold" class="sticky"></td>';
        html += '       <td id="pjtSalesSum" style="font-weight: bold" class="sticky"></td>';
        html += '       <td id="pjtRevenueSum" style="font-weight: bold" class="sticky"></td>';
        html += '   </tr>';
        html += '   </tbody>';
        html += '   <tbody id="evalTheadList">';
        html += '   </tbody>';
        html += '</table>';
        html += '</div>';

        /** 사용자 */
        html += '<div class="scrollable-table">';
        html += '   <table class="searchTable table table-bordered mb-0" id="achieveTb2">';
        html += '   <tr>';
        html += '       <th colSpan="'+col+'" class="text-center th-color green">수주(기준: 수주금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color yellow">매출(기준: 매출금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color blue">운영수익(기준: 수익금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color">합계</th>';
        html += '   </tr>';
        html += '   <tr>';
        for (var i = 0; i < evalAchieveList.length; i++) {
        html += '       <td class="green targetEmp" id="' + evalAchieveList[i].EMP_SEQ + '">'+ evalAchieveList[i].EMP_NAME +'</td>';
        }
        html += '       <td class="green">소계</td>';

        for (var i = 0; i < evalAchieveList.length; i++) {
        html += '       <td class="yellow">'+ evalAchieveList[i].EMP_NAME +'</td>';
        }
        html += '       <td class="yellow">소계</td>';

        for (var i = 0; i < evalAchieveList.length; i++) {
        html += '       <td class="blue">'+ evalAchieveList[i].EMP_NAME +'</td>';
        }
        html += '       <td class="blue">소계</td>';

        for (var i = 0; i < evalAchieveList.length; i++) {
        html += '       <td>'+ evalAchieveList[i].EMP_NAME +'</td>';
        }
        html += '       <td>소계</td>';
        html += '   </tr>';

        for (var i = 0; i < evalAchieveList.length; i++) {
            html += '       <td class="green empOrderSum" id="empOrderSum_' + evalAchieveList[i].EMP_SEQ + '">0</td>';
        }
        html += '       <td class="green" id="pjtEmpOrderSum">0</td>';

        for (var i = 0; i < evalAchieveList.length; i++) {
            html += '       <td class="yellow empSalesSum" id="empSalesSum_' + evalAchieveList[i].EMP_SEQ + '">0</td>';
        }
        html += '       <td class="yellow" id="pjtEmpSalesSum">0</td>';

        for (var i = 0; i < evalAchieveList.length; i++) {
            html += '       <td class="blue empRevenueSum" id="empRevenueSum_' + evalAchieveList[i].EMP_SEQ + '">0</td>';
        }
        html += '       <td class="blue" id="pjtEmpRevenueSum">0</td>';

        for (var i = 0; i < evalAchieveList.length; i++) {
            html += '       <td style="font-weight: bold;text-align: center;" class="empTotalSum" empSeq="' + evalAchieveList[i].EMP_SEQ + '">0</td>';
        }
        html += '       <td style="font-weight: bold;text-align: center;" id="empAllTotal">0</td>';

        html += '   </tr>';
        html += '   </tbody>';
        html += '   <tbody id="evalList">';
        html += '   </tbody>';
        html += '</table>';
        $('#evalListDiv').append(html);

        evalScorePop.evalScoreTBodyMake(pjtList, evalAchieveList);
    },

    evalScoreTBodyMake :function (pjtList, evalAchieveList){
        var html = "";
        var evalTheadHtml = "";
        var pjtBusnClass = {
            rnd : 0,
            unRnd : 0,
            engn : 0,
            other : 0,
        }

        if(pjtList != null){

            var pjtOrderSum = 0;
            var pjtSalesSum = 0;
            var pjtRevenueSum = 0;

            for (var j = 0; j < pjtList.length; j++) {

                if(pjtList[j].BUSN_CLASS == "R"){
                    pjtBusnClass.rnd++;
                }else if(pjtList[j].BUSN_CLASS == "S"){
                    pjtBusnClass.unRnd++;
                }else if(pjtList[j].BUSN_CLASS == "D"){
                    pjtBusnClass.engn++;
                }else{
                    pjtBusnClass.other++;
                }


                var pjtPerformance = pjtList[j].pjtPerformanceList;
                var evalAchieve = pjtList[j].evalAchieveList;

                var orderPercentSum = 0;
                var salesPercentSum = 0;
                var revenuePercentSum = 0;

                pjtOrderSum += Number(evalScorePop.uncomma(pjtList[j].PJT_AMT));
                pjtSalesSum += Number(evalScorePop.uncomma(pjtList[j].PJT_AMT));
                pjtRevenueSum += Number(evalScorePop.uncomma(evalScorePop.uncomma(pjtList[j].PJT_AMT) - evalScorePop.pjtPerformance(pjtList[j].PJT_SN)));

                evalTheadHtml += '' +
                    '<tr pjtSn="' + pjtList[j].PJT_SN + '">' +
                        '<td style="text-align: center">' + (j+1) + '</td>' +
                        '<td>' +
                            '<div style="text-align: left; font-weight: bold; cursor: pointer" onclick="evalScorePop.fn_projectPopView('+pjtList[j].PJT_SN+', \'' + pjtList[j].BUSN_CLASS + '\')">' + pjtList[j].PJT_NM + '</div>' +
                        '</td>' +
                        '<td>' + pjtList[j].CRM_NM + '</td>' +
                        '<td>' + pjtList[j].BUSN_NM + '</td>' +
                        '<td style="text-align: right" id="pjtOrder_' + pjtList[j].PJT_SN + '">' + evalScorePop.comma(pjtList[j].PJT_AMT) + '</td>' +
                        '<td style="text-align: right" id="pjtSales_' + pjtList[j].PJT_SN + '">' + evalScorePop.comma(pjtList[j].PJT_AMT) + '</td>' +
                        '<td style="text-align: right" id="pjtRevenue_' + pjtList[j].PJT_SN + '">' + evalScorePop.comma(pjtList[j].PJT_AMT - evalScorePop.pjtPerformance(pjtList[j].PJT_SN)) + '</td>' +
                    '</tr>';

                /** 프로젝트 공정 포함 여부에 따라 배경색  */
                var noParticipants = ""
                /** 최초 실적률에서 수정된 인원  */
                var modChk = ""

                html += '<tr pjtSn="' + pjtList[j].PJT_SN + '">';

                for (var k = 0; k < evalAchieveList.length; k++) {
                    var empEvalAchieve = evalAchieve.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                    var empPerformance = pjtPerformance.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                    var orderValue =
                        empEvalAchieve && empEvalAchieve.ORDER_ACHIEVE != null ? Number(empEvalAchieve.ORDER_ACHIEVE) :
                            empPerformance && empPerformance.ORDER_PERCENT != null ?
                                empPerformance.PER_CLOSING == "Y" ? Number(empPerformance.ORDER_PERCENT) : 0 : 0;

                    orderPercentSum += orderValue;

                    noParticipants = empPerformance == null ? "noParticipants" : ""
                    modChk = empEvalAchieve != null && empEvalAchieve.FIRST_ORDER_ACHIEVE != orderValue ? "modChk" : "";


                    html += '' +
                        '<td class="green">' +
                            '<input type="text" class="orderPercent ' + noParticipants + ' ' + modChk + '" percentType="order" pjtSn="' + pjtList[j].PJT_SN + '" targetEmpSeq="' + evalAchieveList[k].EMP_SEQ + '" ' +
                                'oninput="evalScorePop.onlyNumber(this)" onkeyup="evalScorePop.sumPercent(this)" value="' + orderValue + '" style="width: 40px">' + ' %' +
                        '</td>';
                }
                html += '<td class="green"><span id="orderPercentSum_' + pjtList[j].PJT_SN + '">' + orderPercentSum + '</span>%</td>';

                for (var k = 0; k < evalAchieveList.length; k++) {
                    var empEvalAchieve = evalAchieve.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                    var empPerformance = pjtPerformance.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);

                    var salesValue =
                        empEvalAchieve && empEvalAchieve.SALES_ACHIEVE != null ? Number(empEvalAchieve.SALES_ACHIEVE) :
                            empPerformance && empPerformance.SALES_PERCENT != null ?
                                empPerformance.PER_CLOSING == "Y" ? Number(empPerformance.SALES_PERCENT) : 0 : 0;
                    salesPercentSum += salesValue;

                    noParticipants = empPerformance == null ? "noParticipants" : ""
                    modChk = empEvalAchieve != null && empEvalAchieve.FIRST_SALES_ACHIEVE != salesValue ? "modChk" : "";

                    html += '' +
                        '<td class="yellow">' +
                            '<input type="text" class="salesPercent ' + noParticipants + ' ' + modChk + '" percentType="sales" pjtSn="' + pjtList[j].PJT_SN + '" targetEmpSeq="' + evalAchieveList[k].EMP_SEQ + '" ' +
                                'oninput="evalScorePop.onlyNumber(this)" onkeyup="evalScorePop.sumPercent(this)" value="' + salesValue + '" style="width: 40px">' + ' %' +
                        '</td>';

                }
                html += '<td class="yellow"><span id="salesPercentSum_' + pjtList[j].PJT_SN + '">' + salesPercentSum + '</span>%</td>';

                for (var k = 0; k < evalAchieveList.length; k++) {
                    var empEvalAchieve = evalAchieve.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                    var empPerformance = pjtPerformance.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                    var revenueValue =
                        empEvalAchieve && empEvalAchieve.REVENUE_ACHIEVE != null ? Number(empEvalAchieve.REVENUE_ACHIEVE) :
                            empPerformance && empPerformance.REVENUE_PERCENT != null ?
                                empPerformance.PER_CLOSING == "Y" ? Number(empPerformance.REVENUE_PERCENT) : 0 : 0;

                    revenuePercentSum += revenueValue;

                    noParticipants = empPerformance == null ? "noParticipants" : ""
                    modChk = empEvalAchieve != null && empEvalAchieve.FIRST_REVENUE_ACHIEVE != revenueValue ? "modChk" : "";

                    html += '' +
                        '<td class="blue">' +
                            '<input type="text" class="revenuePercent ' + noParticipants + ' ' + modChk + '" percentType="revenue" pjtSn="' + pjtList[j].PJT_SN + '" targetEmpSeq="' + evalAchieveList[k].EMP_SEQ + '" ' +
                                'oninput="evalScorePop.onlyNumber(this)" onkeyup="evalScorePop.sumPercent(this)" value="' + revenueValue + '" style="width: 40px">' + ' %' +
                        '</td>';
                }
                html += '<td class="blue"><span id="revenuePercentSum_' + pjtList[j].PJT_SN + '">' + revenuePercentSum + '</span>%</td>';

                for (var k = 0; k < evalAchieveList.length; k++) {
                    var empSum = 0;
                    var empEvalAchieve = evalAchieve.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                    var empPerformance = pjtPerformance.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);

                    if (empEvalAchieve || empPerformance) {
                        empSum =
                            (Number(empEvalAchieve?.ORDER_ACHIEVE ||
                                (empPerformance?.PER_CLOSING == "Y" ? empPerformance?.ORDER_PERCENT : 0)) || 0) +
                            (Number(empEvalAchieve?.SALES_ACHIEVE ||
                                (empPerformance?.PER_CLOSING == "Y" ? empPerformance?.SALES_PERCENT : 0)) || 0) +
                            (Number(empEvalAchieve?.REVENUE_ACHIEVE ||
                                (empPerformance?.PER_CLOSING == "Y" ? empPerformance?.REVENUE_PERCENT : 0)) || 0);
                    }

                    html += '' +
                        '<td class="normal">' +
                            '<span id="empSum_' + pjtList[j].PJT_SN + '" targetEmpSeq="' + evalAchieveList[k].EMP_SEQ + '" class="empSum">' + empSum + '</span>' + '%' +
                        '</td>';
                }
                html += '<td class="normal">' +
                            '<span id="totalSum_' + pjtList[j].PJT_SN + '" >' + (orderPercentSum + salesPercentSum + revenuePercentSum) + '</span>%' +
                        '</td>' +
                    '</tr>';
            }

            $("#pjtOrderSum").text(evalScorePop.comma(pjtOrderSum))
            $("#pjtSalesSum").text(evalScorePop.comma(pjtSalesSum))
            $("#pjtRevenueSum").text(evalScorePop.comma(pjtRevenueSum))
        }else{
            html += '' +
                '<tr>' +
                    '<td style="text-align: center" colspan="' + $($("#achieveTb tr")[1]).find("td").length + '">데이터가 없습니다.</td>'
                '</tr>'
        }

        $('#evalTheadList').append(evalTheadHtml);
        $('#evalList').append(html);
        $(".orderPercent, .salesPercent, .revenuePercent").kendoTextBox();
        $('.noParticipants').closest("td").css('background-color', 'rgb(255 190 190)');
        $('.modChk').closest("td").css('background-color', 'rgb(198 159 239)');
        $("#pjtBusnClassStatus").text("R&D : " + pjtBusnClass.rnd + "건 | 비R&D : " + pjtBusnClass.unRnd + "건 | 엔지니어링 : " + pjtBusnClass.engn + "건 | 용역/기타 : " + pjtBusnClass.other + "건")

        evalScorePop.empTotalCal()
    },

    empTotalCal : function(){
        var pjtEmpOrderSum = 0;
        var pjtEmpSalesSum = 0;
        var pjtEmpRevenueSum = 0;

        $.each($("#evalList tr"), function(i, v){
            var pjtOrder = Number(evalScorePop.uncomma($("#pjtOrder_" + $(v).attr("pjtSn")).text()))
            var pjtSales = Number(evalScorePop.uncomma($("#pjtSales_" + $(v).attr("pjtSn")).text()))
            var pjtRevenue = Number(evalScorePop.uncomma($("#pjtRevenue_" + $(v).attr("pjtSn")).text()))

            var empOrderSum = 0;
            var empSalesSum = 0;
            var empRevenueSum = 0;

            $.each($("#evalListDiv td.targetEmp"), function(ii, vv){
                if(i != 0){
                    empOrderSum = Number(evalScorePop.uncomma($("#empOrderSum_" + $(vv).attr("id")).text()));
                    empSalesSum = Number(evalScorePop.uncomma($("#empSalesSum_" + $(vv).attr("id")).text()));
                    empRevenueSum = Number(evalScorePop.uncomma($("#empRevenueSum_" + $(vv).attr("id")).text()));
                }

                if(isNaN(empOrderSum)){
                    empOrderSum = 0
                }

                if(isNaN(empSalesSum)){
                    empSalesSum = 0
                }

                if(isNaN(empRevenueSum)){
                    empRevenueSum = 0
                }

                $("#empOrderSum_" + $(vv).attr("id")).text(comma(empOrderSum + Number(pjtOrder * ($(v).find("input[percentType='order'][targetEmpSeq='" + $(vv).attr("id") + "']").val() / 100) || 0)))
                $("#empSalesSum_" + $(vv).attr("id")).text(comma(empSalesSum + Number(pjtOrder * ($(v).find("input[percentType='sales'][targetEmpSeq='" + $(vv).attr("id") + "']").val() / 100)) || 0))
                $("#empRevenueSum_" + $(vv).attr("id")).text(comma(empRevenueSum + Number(pjtOrder * ($(v).find("input[percentType='revenue'][targetEmpSeq='" + $(vv).attr("id") + "']").val() / 100)) || 0))
            })
        })

        var empOrderSum = 0;
        var empSalesSum = 0;
        var empRevenueSum = 0;

        $(".empOrderSum").each(function() {
            empOrderSum += Number(evalScorePop.uncomma($(this).text())) || 0;
        });
        $(".empSalesSum").each(function() {
            empSalesSum += Number(evalScorePop.uncomma($(this).text())) || 0;
        });
        $(".empRevenueSum").each(function() {
            empRevenueSum += Number(evalScorePop.uncomma($(this).text())) || 0;
        });

        $("#pjtEmpOrderSum").text(evalScorePop.comma(empOrderSum))
        $("#pjtEmpSalesSum").text(evalScorePop.comma(empSalesSum))
        $("#pjtEmpRevenueSum").text(evalScorePop.comma(empRevenueSum))


        var empAllTotal = 0;
        $.each($("#sumTr .empTotalSum"), function(ii, vv){
            var empTotalSum = Number(evalScorePop.uncomma($("#empOrderSum_" + $(this).attr("empSeq")).text())) +
                Number(evalScorePop.uncomma($("#empSalesSum_" + $(this).attr("empSeq")).text())) +
                Number(evalScorePop.uncomma($("#empRevenueSum_" + $(this).attr("empSeq")).text()));

            $(this).text(comma(empTotalSum))
            empAllTotal += empTotalSum
        })

        $("#empAllTotal").text(evalScorePop.comma(empAllTotal));
    },

    sumPercent : function(e){
        var pjtSn = $(e).attr("pjtSn");
        var percentType = $(e).attr("percentType");
        var targetEmpSeq = [];
        var sum = 0;

        $("." + percentType + "Percent[pjtSn='" + pjtSn + "']").each(function(i, v){
            targetEmpSeq.push($(this).attr("targetEmpSeq"))
            sum += Number($(this).val())
        })

        if(sum > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#" + percentType + "Sum_" + pjtSn).text(sum);
        evalScorePop.empPercentSum(targetEmpSeq, pjtSn)
        evalScorePop.empTotalCal()

        return evalScorePop.inputNumberFormat(e)
    },

    empPercentSum : function(targetEmpSeq, pjtSn){
        for(var i = 0; i < targetEmpSeq.length; i++){
            var empSum = 0;
            $("input[targetEmpSeq='" + targetEmpSeq[i] + "'][pjtSn='" + pjtSn + "']").each(function(i, v){
                empSum += Number($(this).val())
            })

            $("#empSum_" + pjtSn + "[targetEmpSeq='" + targetEmpSeq[i] + "']").text(empSum)
        }

        var totalSum = 0;
        $(".empSum").each(function(i, v){
            totalSum += Number($(this).text())
        })
        $("#totalSum_" + pjtSn).text(totalSum)
    },

    pjtPerformance : function(pjtSn){
        const purcResult = customKendo.fn_customAjax("/purc/getProjectPurcList", {pjtSn: pjtSn});
        const purcList = purcResult.list;
        let revenueSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            revenueSum += Number(map.ITEM_AMT);
        }
        const tripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: pjtSn});
        const trip = tripResult.map;
        if(trip.COUNT != 0){
            revenueSum += trip.BUSTRIP_EXNP_SUM;
        }

        return revenueSum;
    },

    inputNumberFormat : function(obj){
        obj.value = evalScorePop.comma(evalScorePop.uncomma(obj.value));
    },

    onlyNumber : function(e){
        e.value = evalScorePop.uncomma(e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return Number(str.replace(/[^\d]+/g, ''));
    },

    fn_projectPopView : function (key, cs, page){
        var uid = $("#myEmpSeq").val()
        var rs = customKendo.fn_customAjax("/project/getProjectData", { pjtSn: key });
        var mem = customKendo.fn_customAjax("/project/projectEnterMemberList", { pjtSn: key });

        var pral = mem.list.partRateAdminList;
        var prml = mem.list.partRateMemberList;
        var pml = mem.list.psMemberList;
        var aml = mem.list.aceMemberList;
        var trl = mem.list.teamReaderList;
        var flag = false;

        if(rs.data.PM_EMP_SEQ == uid || rs.data.REG_EMP_SEQ == uid || rs.data.EMP_SEQ == uid){
            flag = true;
        }

        for(var i = 0; i < prml.length; i++){
            if(prml[i].PART_EMP_SEQ == uid){
                flag = true;
            }
        }

        for(var i = 0; i < pral.length; i++){
            if(pral[i].EMP_SEQ == uid){
                flag = true;
            }
        }

        for(var i = 0 ; i < pml.length ; i++){
            if(pml[i].PS_EMP_SEQ == uid){
                flag = true;
            }
        }

        for(var i = 0 ; i < aml.length ; i++){
            if(aml[i].EMP_SEQ == uid){
                flag = true;
            }
        }

        for(var i = 0 ; i < trl.length ; i++){
            if(trl[i].EMP_SEQ == uid){
                flag = true;
            }
        }

        /** 마스터 체크 */
        if($("#regEmpSeq").val() == "1"){
            flag = true;
        }

        /** 팀장, 부서장 체크 */
        if($("#regDutyCode").val() != ""){
            flag = true;
        }

        if(flag){
            var url = "/project/pop/viewRegProject.do?pjtSn=" + key;
            if(page == "achieve"){
                url += "&tab=12";
            }

            if(cs == "R"){
                url = "/projectRnd/pop/regProject.do?pjtSn=" + key;
                if(page == "achieve"){
                    url += "&tab=13";
                }
            } else if (cs == "S"){
                url = "/projectUnRnd/pop/regProject.do?pjtSn=" + key;
                if(page == "achieve"){
                    url += "&tab=13";
                }
            }
            var name = "_blank";
            var option = "width = 1680, height = 850, top = 100, left = 200, location = no";

            var popup = window.open(url, name, option);
        } else {
            alert("참여중인 프로젝트가 아닙니다.");
            return;
        }

    }
}