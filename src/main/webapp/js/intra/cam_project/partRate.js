var partRate = {


    fn_defaultScript : function (){
        $("#mngComment").kendoTextArea({
            rows : 5,
        });

        partRate.fn_setData();
    },

    fn_setData : function (){
        var data = {
            partRateVerSn : $("#partRateVerSn").val()
        }
        var result = customKendo.fn_customAjax("/project/getPartRateVerData", data);
        var pf = result.fileList
        var rs = result.map;
        var mng = result.result.projectManagerInfo;

        if(rs != null){
            $("#budget").text(comma(Number(rs.PAY_BUDGET) + Number(rs.ITEM_BUDGET)) + "원");
        }


        if(pf.length != 0){
            var html = '';

            for(var i = 0; i < pf.length; i++){
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+pf[i].file_path+pf[i].file_uuid+'\', \''+pf[i].file_org_name+'.'+pf[i].file_ext+'\')">'+pf[i].file_org_name+'</span></td>';
                html += '   <td>'+ pf[i].file_ext +'</td>';
                html += '   <td>'+ pf[i].file_size +'</td>';
                html += '</tr>';
            }
            $("#fileGrid").html(html);
        } else {
            $("#fileGrid").html('<tr>' +
                '	<td colspan="3" style="text-align: center">첨부된 파일이 없습니다.</td>' +
                '</tr>');
        }

        if(mng != null){
            var memHtml = "";

            memHtml += '<tr style="text-align: center">';
            memHtml += '   <td>책임자</td>';
            memHtml += '   <td>' + mng.MNG_EMP_NAME + '</td>';
            memHtml += '   <td style="text-align: right">' + comma(mng.BASIC_SALARY) + '</td>';
            memHtml += '   <td>';
            memHtml += '        <input type="text" id="mngChngSal" name="chngSal" value="'+comma(mng.BASIC_SALARY)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />';
            memHtml += '   </td>';
            memHtml += '   <td><input type="text" id="mngStrDt" name="strDt" /></td>';
            memHtml += '   <td><input type="text" id="mngEndDt" name="endDt" /></td>';
            memHtml += '   <td><input type="text" id="mngMon" name="mon" style="text-align: right" disabled value="'+partRate.fn_monDiff(mng.PJT_STR_DT, mng.PJT_END_DT)+'"></td>';
            memHtml += '   <td><input type="text" id="mngPayRate" name="payRate" style="text-align: right" disabled value="0"></td>';      // 참여율 현금(%)
            memHtml += '   <td><input type="text" id="mngTotPayBudget" name="totPayBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현금 총액
            memHtml += '   <td><input type="text" id="mngItemRate" name="itemRate" value="0" style="text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
            memHtml += '   <td><input type="text" id="mngTotItemBudget" name="totItemBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현물 총액
            memHtml += '   <td><input type="text" id="mngTotRate" name="totRate" style="text-align: right" disabled value="0"></td>';      // 총 참여율(%)
            memHtml += '   <td><input type="text" id="mngPayTotal" name="payTotal" style="text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
            memHtml += '   <td><input type="text" id="mngMonSal" name="monSal" style="text-align: right" disabled value="0"></td>';      // 월 인건비
            memHtml += '   <td><button type="button" class="k-button k-button-solid-info">참여율</button></td>';      // 참여율 조회
            memHtml += '   <td><button type="button" class="k-button k-button-solid-error">삭제</button></td>';      // 삭제
            memHtml += '</tr>';

            memHtml += '<tr style="text-align: center">';
            memHtml += '    <td colspan="12" style="background-color: #8fa1c04a;">합계</td>';
            memHtml += '    <td><input type="text" style="text-align: right" disabled value="0" id="allPayTotal" /></td>';
            memHtml += '    <td colspan="3" style="background-color: #8fa1c04a;"></td>';
            memHtml += '</tr>';

            $("#partRateMember").append(memHtml);

            customKendo.fn_textBox(["mngChngSal", "mngItemRate", "mngPayTotal", "mngMon", "mngPayRate", "mngTotPayBudget", "mngTotItemBudget", "mngTotRate", "mngMonSal", "allPayTotal"]);
            customKendo.fn_datePicker("mngStrDt", "depth", "yyyy-MM-dd", new Date(mng.PJT_STR_DT));
            customKendo.fn_datePicker("mngEndDt", "depth", "yyyy-MM-dd", new Date(mng.PJT_END_DT));

            $("#mngStrDt").data("kendoDatePicker").bind("change", function(){
                partRate.fn_mngCalc(mng.BASIC_SALARY, rs.PAY_BUDGET);
            });

            $("#mngEndDt").data("kendoDatePicker").bind("change", function(){
                partRate.fn_mngCalc(mng.BASIC_SALARY, rs.PAY_BUDGET);
            });

            $("#mngPayTotal, #mngItemRate, #mngChngSal").on("keyup", function(){
                partRate.fn_mngCalc(mng.BASIC_SALARY, rs.PAY_BUDGET);
            });

        }
    },

    fn_mngCalc : function (bsSal, payBudget){

        if(Number(uncomma($("#mngChngSal").val())) > Number(bsSal)){
            alert("기준급여보다 클 수 없습니다.");
            $("#mngChngSal").val(comma(bsSal));
            return;
        }

        var mngTotRate = Math.round(Number(uncomma($("#mngPayTotal").val())) / (Number(uncomma($("#mngChngSal").val())) * $("#mngMon").val()) * 100 * 10) / 10;
        var mngPayRate = Math.round(($("#mngTotRate").val() - $("#mngItemRate").val()) * 10) / 10;
        var mngTotPayBudget = comma(Math.round(Number(uncomma($("#mngPayTotal").val())) / ($("#mngTotRate").val() / $("#mngPayRate").val())));

        $("#mngMon").val(partRate.fn_monDiff($("#mngStrDt").val(), $("#mngEndDt").val()));                                  // 참여개월 계산
        $("#mngMon").val(partRate.fn_monDiff($("#mngStrDt").val(), $("#mngEndDt").val()));                                  // 참여개월 계산

        $("#mngMonSal").val(comma(Math.round(Number(uncomma($("#mngPayTotal").val())) / ($("#mngMon").val()))));         // 월 인건비 계산 (인건비 총액 / 참여개월)


        if(!isNaN(mngTotRate)){
            $("#mngTotRate").val(mngTotRate);    // 총 참여율(%) (인건비 총액 / (기준급여 변경 * 참여개월)) * 100
        }

        if(!isNaN(mngPayRate)){
            $("#mngPayRate").val(mngPayRate);
        }

        if(!isNaN(mngTotPayBudget)){
            $("#mngTotPayBudget").val(mngTotPayBudget);
        }

        $("#mngTotItemBudget").val(comma(Math.round(Number(uncomma($("#mngPayTotal").val())) - Number(uncomma($("#mngTotPayBudget").val())))));

        $("input[name='payTotal']").each(function(){
            var totPay = 0;
            totPay += Number(uncomma(this.value));

            $("#allPayTotal").val(totPay);
        });
        
        if(Number(uncomma($("#allPayTotal").val())) > payBudget){
            alert("인건비 총액이 인건비 예산보다 큽니다.");
            return;
        }


    },

    fn_monDiff : function (strDt, endDt){
        const date1 = new Date(strDt);
        const date2 = new Date(endDt);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return Math.round((diffDays / 30).toFixed(2) * 10) / 10;
    }
}