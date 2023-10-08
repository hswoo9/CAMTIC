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
            const date1 = new Date(mng.PJT_STR_DT);
            const date2 = new Date(mng.PJT_END_DT);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            memHtml += '<tr style="text-align: center">';
            memHtml += '   <td>책임자</td>';
            memHtml += '   <td>' + mng.MNG_EMP_NAME + '</td>';
            memHtml += '   <td style="text-align: right">' + comma(mng.BASIC_SALARY) + '</td>';
            memHtml += '   <td>';
            memHtml += '        <input type="text" id="mngChngSal" value="'+comma(mng.BASIC_SALARY)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />';
            memHtml += '   </td>';
            memHtml += '   <td><input type="text" id="mngStrDt"/></td>';
            memHtml += '   <td><input type="text" id="mngEndDt"/></td>';
            memHtml += '   <td><input type="text" id="mngMon" style="text-align: right" disabled value="'+Math.round((diffDays / 30).toFixed(2) * 10) / 10+'"></td>';
            memHtml += '   <td><input type="text" id="mngPayRate" style="text-align: right" disabled value="0"></td>';      // 참여율 현금(%)
            memHtml += '   <td><input type="text" id="mngTotPayBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현금 총액
            memHtml += '   <td><input type="text" id="mngItemRate" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
            memHtml += '   <td><input type="text" id="mngTotItemBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현물 총액
            memHtml += '   <td><input type="text" id="mngTotRate" style="text-align: right" disabled value="0"></td>';      // 총 참여율(%)
            memHtml += '   <td><input type="text" id="mngPayTotal" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
            memHtml += '   <td><input type="text" id="mngMonSal" style="text-align: right" disabled value="0"></td>';      // 월 인건비
            memHtml += '   <td><button type="button" class="k-button k-button-solid-info">참여율</button></td>';      // 참여율 조회
            memHtml += '   <td><button type="button" class="k-button k-button-solid-error">삭제</button></td>';      // 삭제
            memHtml += '</tr>'
            
            $("#partRateMember").append(memHtml);

            customKendo.fn_textBox(["mngChngSal", "mngItemRate", "mngPayTotal", "mngMon", "mngPayRate", "mngTotPayBudget", "mngTotItemBudget", "mngTotRate", "mngMonSal"]);
            customKendo.fn_datePicker("mngStrDt", "depth", "yyyy-MM-dd", new Date(mng.PJT_STR_DT));
            customKendo.fn_datePicker("mngEndDt", "depth", "yyyy-MM-dd", new Date(mng.PJT_END_DT));

        }
        
        

    },
}