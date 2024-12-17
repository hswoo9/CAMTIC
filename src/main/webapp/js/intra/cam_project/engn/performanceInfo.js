var performanceInfo = {

    fn_defaultScript: function(){
        commonProject.setPjtStat();
        performanceInfo.fn_setData();
    },

    fn_setData: function(){
        const resultMap = customKendo.fn_customAjax("/project/engn/getResultInfo", {
            pjtSn: $("#pjtSn").val(),
        });
        performanceInfo.fn_makeRowEngn(resultMap);
    },

    fn_makeRowEngn : function(rs){
        const pjtSn = $("#pjtSn").val()
        const result = customKendo.fn_customAjax("/project/engn/getResultPsMember", {
            pjtSn: pjtSn
        });
        const ls = result.list;
        var html = "";
        /** 첫 행 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed"></td>';
        html += '   <td style="text-align: center; background-color: #dee4ed">총금액</td>';
        for(var i=0; i<ls.length; i++){
            html += '' +
                    '<td colspan="2" style="text-align: center; background-color: #dee4ed">' +
                        '<input type="hidden" id="psSn_' + i + '" class="psSn" value="' + ls[i].PS_SN + '">' +
                        '<input type="hidden" id="psEmpSeq_' + ls[i].PS_SN + '" class="psEmpSeq" value="' + ls[i].PS_EMP_SEQ + '">' + ls[i].PS_EMP_NM +
                    '</td>';
        }
        html += '</tr>';


        /** 매출 금액 계산 */
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
        var revenueTotalAmt = rs.pjtInfo.PJT_AMT;
        /** 매출 금액 계산 종료 */




        /** 수주 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">수주</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultDelvTotAmt" value="0" style="text-align: right" onkeyup="performanceInfo.inputNumberFormat(this)" oninput="performanceInfo.onlyNumber(this)" />' +
            '       </td>';
        for(var i=0; i < ls.length; i++){
            var percent = rs.result.performanceList.find(e => e.PS_EMP_SEQ == ls[i].PS_EMP_SEQ).ORDER_PERCENT || 0;
            var calcAmt = Math.round(rs.pjtInfo.PJT_AMT * (percent * 0.01)) || 0;
            html += '<td>' +
                        '<input type="text" id="orderAmt' + i + '" onkeyup="performanceInfo.inputNumberFormat(this)" oninput="performanceInfo.onlyNumber(this)" disabled class="orderAmt amt" value="'+ performanceInfo.comma(calcAmt) +'" style="text-align: right" />' +
                    '</td>' +
                    '<td style="text-align: right">' +
                        '<input type="text" id="orderPercent_' + ls[i].PS_SN + '" onkeyup="performanceInfo.fn_orderPercent(this , \'' + i + '\');" oninput="performanceInfo.onlyNumber(this)" class="orderPercent percent" value="' + percent + '" style="width: 80%; text-align: right" /> %' +
                    '</td>';
        }
        html += '</tr>';

        /** 매출 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">매출</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultInvTotAmt" value="0" style="text-align: right" onkeyup="performanceInfo.inputNumberFormat(this)" oninput="performanceInfo.onlyNumber(this)" />' +
            '       </td>';
        for(var i=0; i < ls.length; i++){
            var percent = rs.result.performanceList.find(e => e.PS_EMP_SEQ == ls[i].PS_EMP_SEQ).SALES_PERCENT || 0;
            var calcAmt = Math.round(revenueTotalAmt * (percent * 0.01)) || 0;
            html += '   <td>';
            html += '       <input type="text" id="salesAmt' + i + '" onkeyup="performanceInfo.inputNumberFormat(this)" oninput="performanceInfo.onlyNumber(this)" disabled class="salesAmt amt" value="'+ performanceInfo.comma(calcAmt) +'" style="text-align: right" />';
            html += '   </td>';
            html += '   <td style="text-align: right">';
            html += '       <input type="text" id="salesPercent_' + ls[i].PS_SN + '" onkeyup="performanceInfo.fn_salesPercent(this , \'' + i + '\');" oninput="performanceInfo.onlyNumber(this)" class="salesPercent percent" value="' + percent + '" style="width: 80%; text-align: right" /> %';
            html += '   </td>';
        }
        html += '</tr>';

        /** 수익 */
        html += '<tr>';
        html += '   <td style="text-align: center; background-color: #dee4ed">수익</td>';
        html += '   <td>' +
            '           <input type="text" disabled id="resultTotAmt" value="0" style="text-align: right" onkeyup="performanceInfo.inputNumberFormat(this)" oninput="performanceInfo.onlyNumber(this)" />' +
            '       </td>';
        for(var i=0; i < ls.length; i++){
            var percent = rs.result.performanceList.find(e => e.PS_EMP_SEQ == ls[i].PS_EMP_SEQ).REVENUE_PERCENT || 0;
            var calcAmt = Math.round((rs.pjtInfo.PJT_AMT - revenueSum) * (percent * 0.01)) || 0;
            html += '   <td>';
            html += '       <input type="text" id="revenueAmt' + i + '" onkeyup="performanceInfo.inputNumberFormat(this)" oninput="performanceInfo.onlyNumber(this)" disabled class="revenueAmt amt" value="'+ performanceInfo.comma(calcAmt) +'" style="text-align: right" />';
            html += '   </td>';
            html += '   <td style="text-align: right">';
            html += '       <input type="text" id="revenuePercent_' + ls[i].PS_SN + '" onkeyup="performanceInfo.fn_revenuePercent(this , \'' + i + '\');" oninput="performanceInfo.onlyNumber(this)" class="revenuePercent percent" value="' + percent + '" style="width: 80%; text-align: right" /> %';
            html += '   </td>';
        }
        html += '</tr>';

        $("#psRsTable").append(html);
        $(".amt, .percent, #resultDelvTotAmt, #resultInvTotAmt, #resultTotAmt").kendoTextBox();

        $("#resultDelvTotAmt").val(performanceInfo.comma(rs.pjtInfo.PJT_AMT));
        $("#resultInvTotAmt").val(performanceInfo.comma(rs.pjtInfo.PJT_AMT));
        $("#resultTotAmt").val(performanceInfo.comma(rs.pjtInfo.PJT_AMT - revenueSum));

        if(rs.result.map.PER_CLOSING == "Y"){
            $("#resultBtnDiv #saveBtn").hide();
            $("#resultBtnDiv #closingBtn").hide();
            // $("#closingCancelBtn").show();

            $.each($("input.percent"), function(i, v){
                $(this).data("kendoTextBox").enable(false);
            });
        }/*else{
            $("#closingCancelBtn").hide();
        }*/
    },

    fn_orderPercent : function (obj, index){
        var orderPercentSum = 0
        $(".orderPercent").each(function(i, v){
            orderPercentSum += Number($(this).val())
        })

        if(orderPercentSum > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#orderAmt" + index).val(performanceInfo.comma(Math.round(performanceInfo.uncomma($("#resultDelvTotAmt").val()) * (performanceInfo.uncomma(obj.value) * 0.01))));

        return performanceInfo.inputNumberFormat(obj);
    },

    fn_salesPercent : function (obj, index){
        var salesPercentSum = 0
        $(".salesPercent").each(function(i, v){
            salesPercentSum += Number($(this).val())
        })

        if(salesPercentSum > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#salesAmt" + index).val(performanceInfo.comma(Math.round(performanceInfo.uncomma($("#resultInvTotAmt").val()) * (performanceInfo.uncomma(obj.value) * 0.01))));

        return performanceInfo.inputNumberFormat(obj);
    },

    fn_revenuePercent : function (obj, index){
        var revenuePercentSum = 0
        $(".revenuePercent").each(function(i, v){
            revenuePercentSum += Number($(this).val())
        })

        if(revenuePercentSum > 100){
            alert("실적률이 100%를 초과하였습니다.");
            return;
        }

        $("#revenueAmt" + index).val(performanceInfo.comma(Math.round(performanceInfo.uncomma($("#resultTotAmt").val()) * (performanceInfo.uncomma(obj.value) * 0.01))));

        return performanceInfo.inputNumberFormat(obj);
    },

    fn_save : function (e){
        var orderPercentSum = 0;
        var salesPercentSum = 0;
        var revenuePercentSum = 0;
        $("input.orderPercent").each(function(i, v){
            orderPercentSum += Number($(this).val())
        })
        $("input.salesPercent").each(function(i, v){
            salesPercentSum += Number($(this).val())
        })
        $("input.revenuePercent").each(function(i, v){
            revenuePercentSum += Number($(this).val())
        })

        if(orderPercentSum > 100){
            alert("수주 실적률이 100%를 초과하였습니다.");
            return;
        }

        if(salesPercentSum > 100){
            alert("매출 실적률이 100%를 초과하였습니다.");
            return;
        }

        if(revenuePercentSum > 100){
            alert("수익 실적률이 100%를 초과하였습니다.");
            return;
        }
        if(orderPercentSum < 100){
            alert("수주 실적률이 100% 미만입니다.");
            return;
        }

        if(salesPercentSum < 100){
            alert("매출 실적률이 100% 미만입니다.");
            return;
        }

        if(revenuePercentSum < 100){
            alert("수익 실적률이 100% 미만입니다.");
            return;
        }

        var confirmTxt = "";
        if(e == "s"){
            confirmTxt = "저장하시겠습니까?";
        }else{
            confirmTxt = "마감하시겠습니까?";
        }

        if(confirm(confirmTxt)){
            var performaneceArr = new Array();
            $.each($(".psSn"), function(i, v){
                var data = {
                    psSn : $(this).val(),
                    empSeq : $("#psEmpSeq_" + $(this).val()).val(),
                    orderPercent : $("#orderPercent_" + $(this).val()).val(),
                    salesPercent : $("#salesPercent_" + $(this).val()).val(),
                    revenuePercent : $("#revenuePercent_" + $(this).val()).val(),
                    regEmpSeq : $("#regEmpSeq").val()
                }

                performaneceArr.push(data);
            })

            $.ajax({
                url: "/project/setPerformanceInfo",
                data: {
                    pjtSn : $("#pjtSn").val(),
                    performaneceArr : JSON.stringify(performaneceArr),
                    saveType : e,
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function(rs){
                    if(e == "s"){
                        alert("저장되었습니다.");
                    }else{
                        alert("마감되었습니다.");
                    }

                    if(rs.code == 200){
                        commonProject.getReloadPage(8, 8, 8, 4, 2, 2);
                    }
                }
            });
        }
    },

    setPerClosingCancel : function(){
        if(confirm("마감취소하시겠습니까?")){
            $.ajax({
                url: "/project/setPerClosingUpd",
                data: {
                    pjtSn : $("#pjtSn").val(),
                    saveType : "s"
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function(rs){
                    alert("마감 취소되었습니다.");
                    if(rs.code == 200){
                        commonProject.getReloadPage(8, 8, 8, 4, 2, 2);
                    }
                }
            });
        }
    },

    inputNumberFormat : function(obj){
        obj.value = performanceInfo.comma(performanceInfo.uncomma(obj.value));
    },

    onlyNumber : function(e){
        e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }
}