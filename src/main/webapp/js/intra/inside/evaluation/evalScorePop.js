var evalScorePop = {


    fn_defaultScript : function (){
        evalScorePop.evalContent();
    },

    saveData : function(){
        var flag = true;
        var percentType = ['order', 'sales', 'revenue'];
        var sum = 0;

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
                location.reload()
            }
        });
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
        html += '<table class="searchTable table table-bordered mb-0">';
        html += '   <tr>';
        html += '       <th colSpan="3" class="text-center th-color">구분</th>';
        html += '       <th colSpan="3" class="text-center th-color">팀 실적 (단위 : 원)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color green">수주(기준: 수주금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color yellow">매출(기준: 매출금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color blue">운영수익(기준: 수익금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color">합계</th>';
        html += '   </tr>';
        html += '   <tr>';
        html += '       <td>프로젝트명</td>';
        html += '       <td>업체</td>';
        html += '       <td>구분</td>';
        html += '       <td>수추</td>';
        html += '       <td>매출</td>';
        html += '       <td>수익</td>';

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
        html += '   <tbody id="evalList">';
        html += '   </tbody>';
        html += '</table>';

        $('#evalListDiv').append(html);
        evalScorePop.evalScoreTBodyMake(pjtList, evalAchieveList);
    },

    evalScoreTBodyMake :function (pjtList, evalAchieveList){
        var html = "";

        for (var j = 0; j < pjtList.length; j++) {
            var pjtPerformance = pjtList[j].pjtPerformanceList;
            var evalAchieve = pjtList[j].evalAchieveList;
            var orderSum = 0;
            var salesSum = 0;
            var revenueSum = 0;

            html += '' +
                '<tr pjtSn="' + pjtList[j].PJT_SN + '">' +
                    '<td>' + pjtList[j].PJT_NM + '</td>' +
                    '<td>' + pjtList[j].CRM_NM + '</td>' +
                    '<td></td>' +
                    '<td style="text-align: right">' + evalScorePop.comma(pjtList[j].PJT_AMT) + '</td>' +
                    '<td style="text-align: right">' + evalScorePop.comma(pjtList[j].PJT_AMT) + '</td>' +
                    '<td style="text-align: right">' + evalScorePop.comma(pjtList[j].PJT_AMT - evalScorePop.pjtPerformance(pjtList[j].PJT_SN)) + '</td>';
            for (var k = 0; k < evalAchieveList.length; k++) {
                var empEvalAchieve = evalAchieve.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                var empPerformance = pjtPerformance.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                var orderValue =
                    empEvalAchieve && empEvalAchieve.ORDER_ACHIEVE != null ? Number(empEvalAchieve.ORDER_ACHIEVE) :
                        empPerformance && empPerformance.ORDER_PERCENT != null ? Number(empPerformance.ORDER_PERCENT) : 0;
                orderSum += orderValue;

                html += '' +
                    '<td class="green">' +
                        '<input type="text" class="orderPercent" percentType="order" pjtSn="' + pjtList[j].PJT_SN + '" targetEmpSeq="' + evalAchieveList[k].EMP_SEQ + '" ' +
                            'oninput="evalScorePop.onlyNumber(this)" onkeyup="evalScorePop.sumPercent(this)" value="' + orderValue + '" style="width: 40px">' + ' %' +
                    '</td>';
            }
            html += '<td class="green"><span id="orderSum_' + pjtList[j].PJT_SN + '">' + orderSum + '</span>%</td>';

            for (var k = 0; k < evalAchieveList.length; k++) {
                var empEvalAchieve = evalAchieve.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                var empPerformance = pjtPerformance.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);

                var salesValue =
                    empEvalAchieve && empEvalAchieve.SALES_ACHIEVE != null ? Number(empEvalAchieve.SALES_ACHIEVE) :
                        empPerformance && empPerformance.SALES_PERCENT != null ? Number(empPerformance.SALES_PERCENT) : 0;

                salesSum += salesValue;

                html += '' +
                    '<td class="yellow">' +
                        '<input type="text" class="salesPercent" percentType="sales" pjtSn="' + pjtList[j].PJT_SN + '" targetEmpSeq="' + evalAchieveList[k].EMP_SEQ + '" ' +
                            'oninput="evalScorePop.onlyNumber(this)" onkeyup="evalScorePop.sumPercent(this)" value="' + salesValue + '" style="width: 40px">' + ' %' +
                    '</td>';

            }
            html += '<td class="yellow"><span id="salesSum_' + pjtList[j].PJT_SN + '">' + salesSum + '</span>%</td>';

            for (var k = 0; k < evalAchieveList.length; k++) {
                var empEvalAchieve = evalAchieve.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                var empPerformance = pjtPerformance.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                var revenueValue =
                    empEvalAchieve && empEvalAchieve.REVENUE_ACHIEVE != null ? Number(empEvalAchieve.REVENUE_ACHIEVE) :
                        empPerformance && empPerformance.REVENUE_PERCENT != null ? Number(empPerformance.REVENUE_PERCENT) : 0;

                revenueSum += revenueValue;

                html += '' +
                    '<td class="blue">' +
                        '<input type="text" class="revenuePercent" percentType="revenue" pjtSn="' + pjtList[j].PJT_SN + '" targetEmpSeq="' + evalAchieveList[k].EMP_SEQ + '" ' +
                            'oninput="evalScorePop.onlyNumber(this)" onkeyup="evalScorePop.sumPercent(this)" value="' + revenueValue + '" style="width: 40px">' + ' %' +
                    '</td>';
            }
            html += '<td class="blue"><span id="revenueSum_' + pjtList[j].PJT_SN + '">' + revenueSum + '</span>%</td>';

            for (var k = 0; k < evalAchieveList.length; k++) {
                var empSum = 0;
                var empEvalAchieve = evalAchieve.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);
                var empPerformance = pjtPerformance.find(e => e.EMP_SEQ == evalAchieveList[k].EMP_SEQ);

                if (empEvalAchieve || empPerformance) {
                    empSum =
                        (Number(empEvalAchieve?.ORDER_ACHIEVE || empPerformance?.ORDER_PERCENT) || 0) +
                        (Number(empEvalAchieve?.SALES_ACHIEVE || empPerformance?.SALES_PERCENT) || 0) +
                        (Number(empEvalAchieve?.REVENUE_ACHIEVE || empPerformance?.REVENUE_PERCENT) || 0);
                }

                html += '' +
                    '<td class="normal">' +
                        '<span id="empSum_' + pjtList[j].PJT_SN + '" targetEmpSeq="' + evalAchieveList[k].EMP_SEQ + '" class="empSum">' + empSum + '</span>' + '%' +
                    '</td>';
            }
            html += '<td class="normal">' +
                        '<span id="totalSum_' + pjtList[j].PJT_SN + '" >' + (orderSum + salesSum + revenueSum) + '</span>%' +
                    '</td>' +
                '</tr>';
        }

        $('#evalList').append(html);
        $(".orderPercent, .salesPercent, .revenuePercent").kendoTextBox();
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
        return str.replace(/[^\d]+/g, '');
    },
}