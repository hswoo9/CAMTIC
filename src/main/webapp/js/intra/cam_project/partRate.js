var partRate = {


    fn_defaultScript : function (){
        $("#mngComment").kendoTextArea({
            rows : 5,
        });

        partRate.fn_setData();
    },

    fn_setData : function (){
        var data = {
            partRateVerSn : $("#partRateVerSn").val(),
            pjtSn: $("#pjtSn").val()
        }
        var result = customKendo.fn_customAjax("/project/getPartRateVerData", data);
        var pf = result.fileList
        var rs = result.map;
        var mng = result.result.projectManagerInfo;
        var mem = result.result.projectMemberInfo;



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
            var mngHtml = "";

            mngHtml += '<tr style="text-align: center" class="bodyTr">';
            mngHtml += '   <td>책임자<input type="hidden" name="partEmpSeq" value="'+mng.MNG_EMP_SEQ+'" /></td>';
            mngHtml += '   <td>' + mng.MNG_EMP_NAME + '<input type="hidden" name="partEmpName" value="'+mng.MNG_EMP_NAME+'" /></td>';
            mngHtml += '   <td style="text-align: right"><input type="hidden" id="basicSalary" name="basicSalary" value="'+mng.BASIC_SALARY+'" />' + comma(mng.BASIC_SALARY) + '</td>';
            mngHtml += '   <td>';
            mngHtml += '        <input type="text" id="mngChngSal" name="chngSal" value="'+comma(mng.BASIC_SALARY)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />';
            mngHtml += '   </td>';
            mngHtml += '   <td><input type="text" id="mngStrDt" name="strDt" /></td>';
            mngHtml += '   <td><input type="text" id="mngEndDt" name="endDt" /></td>';
            mngHtml += '   <td><input type="text" id="mngMon" name="mon" style="text-align: right" disabled value="'+partRate.fn_monDiff(mng.PJT_STR_DT, mng.PJT_END_DT)+'"></td>';
            mngHtml += '   <td><input type="text" id="mngPayRate" name="payRate" style="text-align: right" disabled value="0"></td>';      // 참여율 현금(%)
            mngHtml += '   <td><input type="text" id="mngTotPayBudget" name="totPayBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현금 총액
            mngHtml += '   <td><input type="text" id="mngItemRate" name="itemRate" value="0" style="text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
            mngHtml += '   <td><input type="text" id="mngTotItemBudget" name="totItemBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현물 총액
            mngHtml += '   <td><input type="text" id="mngTotRate" name="totRate" style="text-align: right" disabled value="0"></td>';      // 총 참여율(%)
            mngHtml += '   <td><input type="text" id="mngPayTotal" name="payTotal" style="text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
            mngHtml += '   <td><input type="text" id="mngMonSal" name="monSal" style="text-align: right" disabled value="0"></td>';      // 월 인건비
            mngHtml += '   <td><button type="button" class="k-button k-button-solid-info" onclick="partRate.fn_userPartRatePop('+mng.MNG_EMP_SEQ+', '+data.pjtSn+')">참여율</button></td>';      // 참여율 조회

            if(rs.MNG_STAT == "R"){
                mngHtml += '   <td><button type="button" class="k-button k-button-solid-error">삭제</button></td>';      // 삭제
            } else {
                memHtml += '   <td></td>';
            }
            mngHtml += '</tr>';

            $("#partRateMember").append(mngHtml);

            customKendo.fn_textBox(["mngChngSal", "mngItemRate", "mngPayTotal", "mngMon", "mngPayRate", "mngTotPayBudget", "mngTotItemBudget", "mngTotRate", "mngMonSal"]);
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

            if(mng.CHNG_SAL != null){
                $("#mngChngSal").val(comma(mng.CHNG_SAL));
            }

            if(mng.PART_DET_STR_DT != null){
                $("#mngStrDt").val(mng.PART_DET_STR_DT);
            }

            if(mng.PART_DET_END_DT != null){
                $("#mngEndDt").val(mng.PART_DET_END_DT);
            }

            if(mng.MON_DIFF != null){
                $("#mngMon").val(mng.MON_DIFF);
            }

            if(mng.PAY_RATE != null){
                $("#mngPayRate").val(mng.PAY_RATE);
            }

            if(mng.TOT_PAY_BUDG != null){
                $("#mngTotPayBudget").val(comma(mng.TOT_PAY_BUDG));
            }

            if(mng.ITEM_RATE != null){
                $("#mngItemRate").val(mng.ITEM_RATE);
            }

            if(mng.TOT_ITEM_BUDG != null){
                $("#mngTotItemBudget").val(comma(mng.TOT_ITEM_BUDG));
            }

            if(mng.TOT_RATE != null){
                $("#mngTotRate").val(mng.TOT_RATE);
            }

            if(mng.PAY_TOTAL != null){
                $("#mngPayTotal").val(comma(mng.PAY_TOTAL));
            }

            if(mng.MON_SAL != null){
                $("#mngMonSal").val(comma(mng.MON_SAL));
            }

        }
        
        if(mem != null){
            var memHtml = '';
            
            for(var i = 0 ; i < mem.length ; i++){
                console.log(mng)
                memHtml += '<tr style="text-align: center" class="bodyTr">';
                memHtml += '   <td>참여자<input type="hidden" name="partEmpSeq" value="'+mem[i].EMP_SEQ+'" /></td>';
                memHtml += '   <td>' + mem[i].EMP_NAME + '<input type="hidden" name="partEmpName" value="'+mem[i].EMP_NAME+'" /></td>';
                memHtml += '   <td style="text-align: right"><input type="hidden" id="basicSalary" name="basicSalary" value="'+mem[i].BASIC_SALARY+'" /> ' + comma(mem[i].BASIC_SALARY) + '</td>';
                memHtml += '   <td>';
                memHtml += '        <input type="text" id="memChngSal'+i+'" name="chngSal" value="'+comma(mem[i].BASIC_SALARY)+'" style="text-align: right" onkeyup="partRate.fn_memCalc('+mem[i].BASIC_SALARY+','+rs.PAY_BUDGET+','+ i +', this);" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />';
                memHtml += '   </td>';
                memHtml += '   <td><input type="text" id="memStrDt'+i+'" onkeyup="partRate.fn_memCalc('+mng.BASIC_SALARY+','+rs.PAY_BUDGET+','+ i +'); onchange="partRate.fn_memCalc('+mng.BASIC_SALARY+','+rs.PAY_BUDGET+','+ i +');" name="strDt" /></td>';
                memHtml += '   <td><input type="text" id="memEndDt'+i+'" onkeyup="partRate.fn_memCalc('+mng.BASIC_SALARY+','+rs.PAY_BUDGET+','+ i +');" onchange="partRate.fn_memCalc('+mng.BASIC_SALARY+','+rs.PAY_BUDGET+','+ i +');"  name="endDt" /></td>';
                memHtml += '   <td><input type="text" id="memMon'+i+'" name="mon" style="text-align: right" disabled value="'+partRate.fn_monDiff(mem[i].PJT_STR_DT, mem[i].PJT_END_DT)+'"></td>';
                memHtml += '   <td><input type="text" id="memPayRate'+i+'" name="payRate" style="text-align: right" disabled value="0"></td>';      // 참여율 현금(%)
                memHtml += '   <td><input type="text" id="memTotPayBudget'+i+'" name="totPayBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현금 총액
                memHtml += '   <td><input type="text" id="memItemRate'+i+'" name="itemRate" value="0" style="text-align: right" onkeyup="partRate.fn_memCalc('+mng.BASIC_SALARY+','+rs.PAY_BUDGET+','+ i +');" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
                memHtml += '   <td><input type="text" id="memTotItemBudget'+i+'" name="totItemBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현물 총액
                memHtml += '   <td><input type="text" id="memTotRate'+i+'" name="totRate" style="text-align: right" disabled value="0"></td>';      // 총 참여율(%)
                memHtml += '   <td><input type="text" id="memPayTotal'+i+'" name="payTotal" style="text-align: right" value="0" onkeyup="partRate.fn_memCalc('+mng.BASIC_SALARY+','+rs.PAY_BUDGET+','+ i +', this);" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
                memHtml += '   <td><input type="text" id="memMonSal'+i+'" name="monSal" style="text-align: right" disabled value="0"></td>';      // 월 인건비
                memHtml += '   <td><button type="button" class="k-button k-button-solid-info" onclick="partRate.fn_userPartRatePop('+mem[i].EMP_SEQ+', '+data.pjtSn+')">참여율</button></td>';      // 참여율 조회
                if(rs.MNG_STAT == "R"){
                    memHtml += '   <td><button type="button" class="k-button k-button-solid-error">삭제</button></td>';      // 삭제
                } else {
                    memHtml += '   <td></td>';
                }
                memHtml += '</tr>';
            }

            $("#partRateMember").append(memHtml);

            var item = 0;
            for(var i = 0 ; i < mem.length ; i++){
                customKendo.fn_textBox(["memChngSal" + i, "memItemRate" + i, "memPayTotal" + i, "memMon" + i, "memPayRate" + i, "memTotPayBudget" + i, "memTotItemBudget" + i, "memTotRate" + i, "memMonSal" + i]);
                customKendo.fn_datePicker("memStrDt" + i, "depth", "yyyy-MM-dd", new Date(mng.PJT_STR_DT));
                customKendo.fn_datePicker("memEndDt" + i, "depth", "yyyy-MM-dd", new Date(mng.PJT_END_DT));

                if(mem[i].CHNG_SAL != null){
                    $("#memChngSal" + i).val(comma(mem[i].CHNG_SAL));
                }

                if(mem[i].PART_DET_STR_DT != null){
                    $("#memStrDt" + i).val(mem[i].PART_DET_STR_DT);
                }

                if(mem[i].PART_DET_END_DT != null){
                    $("#memEndDt" + i).val(mem[i].PART_DET_END_DT);
                }

                if(mem[i].MON_DIFF != null){
                    $("#memMon" + i).val(mem[i].MON_DIFF);
                }

                if(mem[i].PAY_RATE != null){
                    $("#memPayRate" + i).val(mem[i].PAY_RATE);
                }

                if(mem[i].TOT_PAY_BUDG != null){
                    $("#memTotPayBudget" + i).val(comma(mem[i].TOT_PAY_BUDG));
                }

                if(mem[i].ITEM_RATE != null){
                    $("#memItemRate" + i).val(mem[i].ITEM_RATE);
                }

                if(mem[i].TOT_ITEM_BUDG != null){
                    $("#memTotItemBudget" + i).val(comma(mem[i].TOT_ITEM_BUDG));
                }

                if(mem[i].TOT_RATE != null){
                    $("#memTotRate" + i).val(mem[i].TOT_RATE);
                }

                if(mem[i].PAY_TOTAL != null){
                    $("#memPayTotal" + i).val(comma(mem[i].PAY_TOTAL));
                }

                if(mem[i].MON_SAL != null){
                    $("#memMonSal" + i).val(comma(mem[i].MON_SAL));
                }
            }
        }

        var lastHtml = ''
        lastHtml += '<tr style="text-align: center">';
        lastHtml += '    <td colspan="12" style="background-color: #8fa1c04a;">합계</td>';
        lastHtml += '    <td><input type="text" style="text-align: right" disabled value="0" id="allPayTotal" /></td>';
        lastHtml += '    <td colspan="3" style="background-color: #8fa1c04a;"></td>';
        lastHtml += '</tr>';

        $("#partRateMember").append(lastHtml);


        customKendo.fn_textBox(["allPayTotal"]);

        partRate.fn_mngCalc(mng.BASIC_SALARY, rs.PAY_BUDGET);
    },

    fn_mngCalc : function (bsSal, payBudget){
        if(Number(uncomma($("#mngChngSal").val())) > Number(bsSal)){
            alert("기준급여보다 클 수 없습니다.");
            $("#mngChngSal").val(comma(bsSal));
            return;
        }


        $("#mngMon").val(partRate.fn_monDiff($("#mngStrDt").val(), $("#mngEndDt").val()));                                  // 참여개월 계산

        $("#mngMonSal").val(comma(Math.floor((Number(uncomma($("#mngPayTotal").val())) / ($("#mngMon").val()))/10) *10));         // 월 인건비 계산 (인건비 총액 / 참여개월)

        var mngTotRate = Math.ceil(Number(uncomma($("#mngPayTotal").val())) / (Number(uncomma($("#mngChngSal").val())) * $("#mngMon").val()) * 100 * 10) / 10;
        if(!isNaN(mngTotRate)){
            $("#mngTotRate").val(mngTotRate);    // 총 참여율(%) (인건비 총액 / (기준급여 변경 * 참여개월)) * 100
        }

        var mngPayRate = Math.round(($("#mngTotRate").val() - $("#mngItemRate").val()) * 10) / 10;
        if(!isNaN(mngPayRate)){
            $("#mngPayRate").val(mngPayRate);
        }

        // var mngTotPayBudget = comma(Math.round(Number(uncomma($("#mngPayTotal").val())) / ($("#mngTotRate").val() / $("#mngPayRate").val())));
        var mngTotPayBudget = comma(Math.round(Number(uncomma($("#mngPayTotal").val())) / ($("#mngTotRate").val() / $("#mngPayRate").val())));
        if($("#mngItemRate").val() == 0){
            $("#mngTotPayBudget").val(comma($("#mngPayTotal").val()));
        } else {
            console.log(mngTotPayBudget);
            if(!isNaN(uncomma(mngTotPayBudget))){
                $("#mngTotPayBudget").val(mngTotPayBudget);
            }
        }

        $("#mngTotItemBudget").val(comma(Math.round(Number(uncomma($("#mngPayTotal").val())) - Number(uncomma($("#mngTotPayBudget").val())))));


        var totPay = 0;
        $("input[name='payTotal']").each(function(){
            totPay += Number(uncomma(this.value));

            $("#allPayTotal").val(comma(totPay));
        });

        if(Number(uncomma($("#allPayTotal").val())) > payBudget){
            alert("인건비 총액이 인건비 예산보다 큽니다.");
            return;
        }
    },

    fn_memCalc : function (bsSal, payBudget, i, e){

        if(e != null && e != "" && e != undefined){
            inputNumberFormat(e);
        }

        if(Number(uncomma($("#memChngSal" + i).val())) > Number(bsSal)){
            alert("기준급여보다 클 수 없습니다.");
            $("#memChngSal" + i).val(comma(bsSal));
            return;
        }


        $("#memMon" + i).val(partRate.fn_monDiff($("#memStrDt" + i).val(), $("#memEndDt" + i).val()));                                  // 참여개월 계산

        $("#memMonSal" + i).val(comma(Math.floor((Number(uncomma($("#memPayTotal" + i).val())) / ($("#memMon" + i).val()))/10) * 10));         // 월 인건비 계산 (인건비 총액 / 참여개월)

        var memTotRate = Math.ceil(Number(uncomma($("#memPayTotal" + i).val())) / (Number(uncomma($("#memChngSal" + i).val())) * $("#memMon" + i).val()) * 100 * 10) / 10;
        if(!isNaN(memTotRate)){
            $("#memTotRate" + i).val(memTotRate);    // 총 참여율(%) (인건비 총액 / (기준급여 변경 * 참여개월)) * 100
        }

        var memPayRate = Math.round(($("#memTotRate" + i).val() - $("#memItemRate" + i).val()) * 10) / 10;
        if(!isNaN(memPayRate)){
            $("#memPayRate" + i).val(memPayRate);
        }

        var memTotPayBudget = comma(Math.round(Number(uncomma($("#memPayTotal" + i).val())) / ($("#memTotRate" + i).val() / $("#memPayRate" + i).val())));
        if($("#memItemRate" + i).val() == 0){
            $("#memTotPayBudget" + i).val(comma($("#memPayTotal" + i).val()));
        } else {
            if(!isNaN(uncomma(memTotPayBudget))){
                $("#memTotPayBudget" + i).val(memTotPayBudget);
            }
        }


        $("#memTotItemBudget" + i).val(comma(Math.round(Number(uncomma($("#memPayTotal" + i).val())) - Number(uncomma($("#memTotPayBudget" + i).val())))));

        var totPay = 0;
        $("input[name='payTotal']").each(function(){
            totPay += Number(uncomma(this.value));

            $("#allPayTotal").val(comma(totPay));
        });

        if(Number(uncomma($("#allPayTotal").val())) > payBudget){
            alert("인건비 총액이 인건비 예산보다 큽니다.");
            return;
        }
    },

    fn_monDiff : function (_date1, _date2){
        var pSDate = _date1; //참여 시작일
        var pEDate = _date2; //참여 종료일

        var pSDateArray = pSDate.split("-");
        var pEDateArray = pEDate.split("-");

        var pSDateSet = new Date(pSDateArray[0], pSDateArray[1], pSDateArray[2]);
        var pEDateSet = new Date(pEDateArray[0], pEDateArray[1], pEDateArray[2]);

        var pSDateLastSet = (new Date(pSDateArray[0], pSDateArray[1], 0)).getDate();
        var pEDateLastSet = (new Date(pEDateArray[0], pEDateArray[1], 0)).getDate();

        var pSDateYear = pSDateSet.getFullYear();
        var pSDateMonth = pSDateSet.getMonth();
        var pSDateDay = pSDateSet.getDate();

        var pEDateYear = pEDateSet.getFullYear();
        var pEDateMonth = pEDateSet.getMonth();
        var pEDateDay = pEDateSet.getDate();

        var pMonthSet = ((pEDateYear - pSDateYear) * 12) + (pEDateMonth - pSDateMonth + 1) - 2;

        var pSDateDaySet = pSDateLastSet - pSDateDay + 1;
        var pEDateDaySet = pEDateDay;

        var pSDateDayPerSet = (pSDateDaySet / pSDateLastSet).toFixed(1);
        var pEDateDayPerSet = (pEDateDaySet / pEDateLastSet).toFixed(1);

        var pDateMonth = Number(pMonthSet) + Number(pSDateDayPerSet) + Number(pEDateDayPerSet);


        // return Math.round((diffDays / 30).toFixed(2) * 10) / 10;
        return pDateMonth;
    },

    fn_save: function(){



        var parameterList = new Array();
        var body = $("#partRateMember").find(".bodyTr");
        for(var i = 0 ; i < body.length ; i++){
            var parameters = {
                pjtSn : $("#pjtSn").val(),
                partRateVerSn : $("#partRateVerSn").val(),
                mngComm : $("#mngComment").val()
            }

            $(body.get(i)).find("input").each(function(){
                if($(this).attr("name") == "basicSalary" || $(this).attr("name") == "partEmpName" || $(this).attr("name") == "strDt" || $(this).attr("name") == "endDt"
                  || $(this).attr("name") == "payRate" || $(this).attr("name") == "itemRate" || $(this).attr("name") == "mon"
                    || $(this).attr("name") == "totRate"){
                    parameters[$(this).attr("name")] = $(this).val();
                } else {
                    parameters[$(this).attr("name")] = uncomma($(this).val());
                }
            });
            parameterList[i] = parameters;
        }

        if(parameterList.length != 0){
            customKendo.fn_customAjax("/projectRnd/checkPartRateDetail", parameterList[0]);
        }

        for(var i = 0 ; i < parameterList.length ; i++){
            customKendo.fn_customAjax("/projectRnd/setPartRateDetail", parameterList[i]);

            if(i == parameterList.length - 1){
                var rs = customKendo.fn_customAjax("/projectRnd/setReqPartRateStatus", parameterList[i]);

                if(rs.code == 200){

                    alert("저장되었습니다.");
                    location.reload();
                    opener.parent.gridReload();
                }
            }
        }


    },

    fn_confirm: function(){
        if(!confirm("참여율을 확정하시겠습니까?")){
            return;
        }

        var data = {
            partRateVerSn : $("#partRateVerSn").val(),
            pjtSn : $("#pjtSn").val()
        }

        $.ajax({
            url : "/project/confirmPartRate",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("참여율이 확정되었습니다.");
                    location.reload();
                }
            }
        });
    },

    /**
     * 개인별 참여율 현황 팝업 페이지 VIEW
     * @param sn
     */
    fn_userPartRatePop : function(sn, key){

        var url = "/mng/pop/userPartRate.do?sn=" + sn + "&pjtSn=" + key;

        var name = "_blank";
        var option = "width = 1800, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    }
}