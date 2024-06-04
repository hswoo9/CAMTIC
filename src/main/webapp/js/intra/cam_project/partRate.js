var partRate = {

    global : {
        flag : true
    },

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
            $("#budget").text("현금 : " + comma(Number(rs.PAY_BUDGET)) + ", 현물 : " + comma(Number(rs.ITEM_BUDGET)) + "원");
            $("#budgetAmt").val(Number(rs.PAY_BUDGET) + Number(rs.ITEM_BUDGET));
            $("#payAmt").val(Number(rs.PAY_BUDGET));
            $("#itemAmt").val(Number(rs.ITEM_BUDGET));
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
            // var mngHtml = "";
            //
            // mngHtml += '<tr style="text-align: center" class="bodyTr">';
            // mngHtml += '   <td>책임자<input type="hidden" name="partEmpSeq" value="'+mng.MNG_EMP_SEQ+'" /></td>';
            // mngHtml += '   <td>' + mng.MNG_EMP_NAME + '<input type="hidden" name="partEmpName" value="'+mng.MNG_EMP_NAME+'" /></td>';
            // mngHtml += '   <td style="text-align: right"><input type="hidden" id="basicSalary" name="basicSalary" value="'+mng.BASIC_SALARY+'" />' + comma(mng.BASIC_SALARY) + '</td>';
            // mngHtml += '   <td>';
            // mngHtml += '        <input type="text" id="mngChngSal" name="chngSal" value="'+comma(mng.BASIC_SALARY)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />';
            // mngHtml += '   </td>';
            // mngHtml += '   <td><input type="text" id="mngStrDt" name="strDt" /></td>';
            // mngHtml += '   <td><input type="text" id="mngEndDt" name="endDt" /></td>';
            // mngHtml += '   <td><input type="text" id="mngMon" name="mon" style="text-align: right" disabled value="'+partRate.fn_monDiff(mng.PJT_STR_DT, mng.PJT_END_DT)+'"></td>';
            // mngHtml += '   <td><input type="text" id="mngPayRate" name="payRate" style="text-align: right" disabled value="0"></td>';      // 참여율 현금(%)
            // mngHtml += '   <td><input type="text" id="mngTotPayBudget" name="totPayBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현금 총액
            // mngHtml += '   <td><input type="text" id="mngItemRate" name="itemRate" value="0" style="text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
            // mngHtml += '   <td><input type="text" id="mngTotItemBudget" name="totItemBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현물 총액
            // mngHtml += '   <td><input type="text" id="mngTotRate" name="totRate" style="text-align: right" disabled value="0"></td>';      // 총 참여율(%)
            // mngHtml += '   <td><input type="text" id="mngPayTotal" name="payTotal" style="text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
            // mngHtml += '   <td><input type="text" id="mngMonSal" name="monSal" style="text-align: right" disabled value="0"></td>';      // 월 인건비
            // mngHtml += '   <td><button type="button" class="k-button k-button-solid-info" onclick="partRate.fn_userPartRatePop('+mng.MNG_EMP_SEQ+', '+data.pjtSn+')">참여율</button></td>';      // 참여율 조회
            //
            // if(rs.MNG_STAT == "R"){
            //     mngHtml += '   <td><button type="button" class="k-button k-button-solid-error">삭제</button></td>';      // 삭제
            // } else {
            //     memHtml += '   <td></td>';
            // }
            // mngHtml += '</tr>';
            //
            // $("#partRateMember").append(mngHtml);
            //
            // customKendo.fn_textBox(["mngChngSal", "mngItemRate", "mngPayTotal", "mngMon", "mngPayRate", "mngTotPayBudget", "mngTotItemBudget", "mngTotRate", "mngMonSal"]);
            // customKendo.fn_datePicker("mngStrDt", "depth", "yyyy-MM-dd", new Date(mng.PJT_STR_DT));
            // customKendo.fn_datePicker("mngEndDt", "depth", "yyyy-MM-dd", new Date(mng.PJT_END_DT));
            //
            // $("#mngStrDt").data("kendoDatePicker").bind("change", function(){
            //     partRate.fn_mngCalc(mng.BASIC_SALARY, rs.PAY_BUDGET);
            // });
            //
            // $("#mngEndDt").data("kendoDatePicker").bind("change", function(){
            //     partRate.fn_mngCalc(mng.BASIC_SALARY, rs.PAY_BUDGET);
            // });
            //
            // $("#mngPayTotal, #mngItemRate, #mngChngSal").on("keyup", function(){
            //     partRate.fn_mngCalc(mng.BASIC_SALARY, rs.PAY_BUDGET);
            // });
            //
            // if(mng.CHNG_SAL != null){
            //     $("#mngChngSal").val(comma(mng.CHNG_SAL));
            // }
            //
            // if(mng.PART_DET_STR_DT != null){
            //     $("#mngStrDt").val(mng.PART_DET_STR_DT);
            // }
            //
            // if(mng.PART_DET_END_DT != null){
            //     $("#mngEndDt").val(mng.PART_DET_END_DT);
            // }
            //
            // if(mng.MON_DIFF != null){
            //     $("#mngMon").val(mng.MON_DIFF);
            // }
            //
            // if(mng.PAY_RATE != null){
            //     $("#mngPayRate").val(mng.PAY_RATE);
            // }
            //
            // if(mng.TOT_PAY_BUDG != null){
            //     $("#mngTotPayBudget").val(comma(mng.TOT_PAY_BUDG));
            // }
            //
            // if(mng.ITEM_RATE != null){
            //     $("#mngItemRate").val(mng.ITEM_RATE);
            // }
            //
            // if(mng.TOT_ITEM_BUDG != null){
            //     $("#mngTotItemBudget").val(comma(mng.TOT_ITEM_BUDG));
            // }
            //
            // if(mng.TOT_RATE != null){
            //     $("#mngTotRate").val(mng.TOT_RATE);
            // }
            //
            // if(mng.PAY_TOTAL != null){
            //     $("#mngPayTotal").val(comma(mng.PAY_TOTAL));
            // }
            //
            // if(mng.MON_SAL != null){
            //     $("#mngMonSal").val(comma(mng.MON_SAL));
            // }

        }
        
        if(mem != null){
            var item = 0;
            for(var i = 0 ; i < mem.length ; i++){
                var memHtml = '';
                var e = mem[i];

                var sum = partRate.getBsPayCal(e);

                var totAmt = (Math.floor(sum/10) * 10).toString().toMoney();
                var bsSal = totAmt;

                if(mem[i].CHNG_SAL != undefined && mem[i].CHNG_SAL != null){
                    totAmt = mem[i].CHNG_SAL;
                }

                var partRateDet = "";
                if(mem[i].PART_RATE_DET == undefined || mem[i].PART_RATE_DET == "" || mem[i].PART_RATE_DET == null){
                    partRateDet = "";
                } else {
                    partRateDet = mem[i].PART_RATE_DET;
                }

                if(bsSal == '' || bsSal == null) {
                    totAmt = 0;
                }

                memHtml += '<tr style="text-align: center" class="bodyTr">';
                memHtml += '   <td>';
                memHtml += '       <input type="hidden" id="totAmt' + i + '" value="' + totAmt + '" />';
                memHtml += '       <input type="hidden" id="partEmpSeq' + i + '" name="partEmpSeq" value="'+mem[i].EMP_SEQ+'" />';
                memHtml += '       <input type="text" id="gubun'+i+'" name="gubun" value="'+mem[i].GUBUN+'" />';
                memHtml += '   </td>';
                memHtml += '   <td>' + (mem[i].EMP_NAME || mem[i].JOIN_MEM_NM) + '<input type="hidden" name="partEmpName" value="'+(mem[i].EMP_NAME || mem[i].JOIN_MEM_NM)+'" /></td>';
                if(bsSal == '' || bsSal == null) {
                    memHtml += '   <td style="text-align: center"><input type="hidden" id="basicSalary' + i + '" name="basicSalary" value="0"/><span style="color: red;text-align:center;"></span></td>';
                }else{
                    memHtml += '   <td style="text-align: right"><input type="hidden" id="basicSalary' + i +'" name="basicSalary" value="' + uncomma(bsSal) + '"/><span id="basicSalaryTxt' + i + '">' + comma(bsSal) + '</span></td>';
                }
                memHtml += '   <td>';
                memHtml += '        <input type="text" id="memChngSal'+i+'" name="chngSal" value="'+comma(totAmt)+'" style="text-align: right" onkeyup="partRate.fn_memCalc('+(rs.PAY_BUDGET + rs.ITEM_BUDGET)+','+ i +', this);" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />';
                memHtml += '   </td>';
                memHtml += '   <td><input type="text" id="memStrDt'+i+'" onkeyup="partRate.fn_memCalc('+rs.PAY_BUDGET+','+ i +');" onchange="partRate.getPartStartBs(' + rs.PAY_BUDGET + ', this,' + i + ');" name="strDt" /></td>';
                memHtml += '   <td><input type="text" id="memEndDt'+i+'" onkeyup="partRate.fn_memCalc('+rs.PAY_BUDGET+','+ i +');" onchange="partRate.fn_memCalc('+rs.PAY_BUDGET+','+ i +');"  name="endDt" /></td>';
                memHtml += '   <td><input type="text" id="memMon'+i+'" name="mon" style="text-align: right" value="'+partRate.fn_monDiff(mem[i].PJT_STR_DT, mem[i].PJT_END_DT)+'"  onkeyup="partRate.fn_memMonChange(' + rs.PAY_BUDGET + ', this,' + i + ')"></td>';
                memHtml += '   <td><input type="text" id="memPayRate'+i+'" name="payRate" style="text-align: right" disabled value="0"></td>';      // 참여율 현금(%)
                memHtml += '   <td><input type="text" id="memTotPayBudget'+i+'" name="totPayBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현금 총액
                memHtml += '   <td><input type="text" id="memItemRate'+i+'" name="itemRate" value="0" style="text-align: right" onkeyup="partRate.fn_memCalc('+rs.PAY_BUDGET+','+ i +', this, true);" oninput="this.value = this.value.replace(/[^\\d.]/g, \'\').replace(/(\\..*?)\\./g, \'$1\');"></td>';
                memHtml += '   <td><input type="text" id="memTotItemBudget'+i+'" name="totItemBudget" style="text-align: right" value="0" onkeyup="partRate.fn_memCalc('+rs.PAY_BUDGET+','+ i +', this, false);" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';      // 인건비 현물 총액
                memHtml += '   <td><input type="text" id="memTotRate'+i+'" name="totRate" style="text-align: right" disabled value="0"></td>';      // 총 참여율(%)
                memHtml += '   <td><input type="text" id="memPayTotal'+i+'" name="payTotal" style="text-align: right" value="0" onkeyup="partRate.fn_memCalc('+rs.PAY_BUDGET+','+ i +', this);" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
                memHtml += '   <td><input type="text" id="memMonSal'+i+'" name="monSal" style="text-align: right" disabled value="0"></td>';      // 월 인건비
                memHtml += '   <td><button type="button" class="k-button k-button-solid-info" onclick="partRate.fn_userPartRatePop('+mem[i].EMP_SEQ+', '+data.pjtSn+')">참여율</button></td>';      // 참여율 조회
                if(rs.MNG_STAT == "R"){
                    memHtml += '   <td><button type="button" class="k-button k-button-solid-error" onclick="partRate.fn_delPartMem(\''+partRateDet+'\', '+mem[i].EMP_SEQ+', \''+mem[i].EMP_NAME+'\')">삭제</button></td>';      // 삭제
                } else {
                    memHtml += '   <td></td>';
                }
                memHtml += '</tr>';

                $("#partRateMember").append(memHtml);
            }



            for(var i = 0 ; i < mem.length ; i++){
                customKendo.fn_textBox(["memChngSal" + i, "memItemRate" + i, "memPayTotal" + i, "memMon" + i, "memPayRate" + i, "memTotPayBudget" + i, "memTotItemBudget" + i, "memTotRate" + i, "memMonSal" + i]);
                customKendo.fn_datePicker("memStrDt" + i, "depth", "yyyy-MM-dd", new Date(mem[i].PJT_STR_DT));
                customKendo.fn_datePicker("memEndDt" + i, "depth", "yyyy-MM-dd", new Date(mem[i].PJT_END_DT));

                $("#gubun" + i).kendoDropDownList({
                    dataSource : [
                        {text : "참여자", value : "참여자"},
                        {text : "책임자", value : "책임자"}
                    ],
                    dataTextField : "text",
                    dataValueField : "value"
                });

                $("#gubun" + i).data("kendoDropDownList").value(mem[i].GUBUN);

                if(mem[i].CHNG_SAL != null){
                    $("#memChngSal" + i).val(comma(mem[i].CHNG_SAL));
                }

                if(mem[i].PART_DET_STR_DT != null){
                    $("#memStrDt" + i).val(mem[i].PART_DET_STR_DT);
                }else{
                    if(rs.YEAR_CLASS == "M"){
                        if(rs.busnClass == "R"){
                            $("#memStrDt" + i).val(rs.NOW_STR_DE_RND);
                        }else if (rs.busnClass == "S"){
                            $("#memStrDt" + i).val(rs.NOW_STR_DE_UNRND);
                        }
                    }
                }

                if(mem[i].PART_DET_END_DT != null){
                    $("#memEndDt" + i).val(mem[i].PART_DET_END_DT);
                }else{
                    if(rs.YEAR_CLASS == "M"){
                        if(rs.busnClass == "R"){
                            $("#memEndDt" + i).val(rs.NOW_END_DE_RND);
                        }else if (rs.busnClass == "S"){
                            $("#memEndDt" + i).val(rs.NOW_END_DE_UNRND);
                        }
                    }
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

                partRate.getPartStartBs(rs.PAY_BUDGET, $("#memStrDt" + i), i);
            }
        }

        var lastHtml = ''
        lastHtml += '<tr style="text-align: center">';
        lastHtml += '    <td colspan="8" style="background-color: #8fa1c04a;">합계</td>';
        lastHtml += '    <td><input type="text" style="text-align: right" disabled value="0" id="payTotal" /></td>';
        lastHtml += '    <td style="background-color: #8fa1c04a;"></td>';
        lastHtml += '    <td><input type="text" style="text-align: right" disabled value="0" id="itemTotal" /></td>';
        lastHtml += '    <td style="background-color: #8fa1c04a;"></td>';
        lastHtml += '    <td><input type="text" style="text-align: right" disabled value="0" id="allPayTotal" /></td>';
        lastHtml += '    <td colspan="3" style="background-color: #8fa1c04a;"></td>';
        lastHtml += '</tr>';

        $("#partRateMember").append(lastHtml);

        customKendo.fn_textBox(["allPayTotal", "payTotal", "itemTotal"]);

        var itemBdgt = 0;
        $("input[name='totItemBudget']").each(function(){
            itemBdgt += Number(uncomma(this.value));
        });

        var payBdgt = 0;
        $("input[name='totPayBudget']").each(function(){
            payBdgt += Number(uncomma(this.value));
        });

        $("#payTotal").val(comma(payBdgt));
        $("#itemTotal").val(comma(itemBdgt));

        var total = 0;
        $("input[name='payTotal']").each(function(){
            total += Number(uncomma(this.value));

        });
        $("#allPayTotal").val(comma(total));


        //partRate.fn_memCalc(uncomma(totAmt), rs.PAY_BUDGET, item);
        item++;
    },

    fn_memCalc : function (payBudget, i, e, x){
        var customFlag = true;

        if(!x){
            customFlag = false;
        }

        if(e != null && e != "" && e != undefined && !x){
            inputNumberFormat(e);
        }

        /*if(Number(uncomma($("#memChngSal" + i).val())) > Number(uncomma($("#totAmt" + i).val())) && partRate.global.flag){
            alert("기준급여보다 클 수 없습니다.");
            //$("#memChngSal" + i).val(comma(bsSal));
            partRate.global.flag = false;
            return;
        }*/

        if($.inArray($(e).attr("name"), ["itemRate", "totItemBudget", "payTotal"]) == -1){
            $("#memMon" + i).val(partRate.fn_monDiff($("#memStrDt" + i).val(), $("#memEndDt" + i).val()));                                  // 참여개월 계산
        }

        var memMonSal = Math.floor((Number(uncomma($("#memPayTotal" + i).val())) / ($("#memMon" + i).val()))/10) * 10;
        if(isNaN(memMonSal)){
            memMonSal = 0;
        }
        $("#memMonSal" + i).val(comma(memMonSal));         // 월 인건비 계산 (인건비 총액 / 참여개월)

        var memTotRate = Math.round(Number(uncomma($("#memPayTotal" + i).val())) / (Number(uncomma($("#memChngSal" + i).val())) * $("#memMon" + i).val()) * 100 * 10) / 10;
        if(!isNaN(memTotRate)){
            $("#memTotRate" + i).val(memTotRate);    // 총 참여율(%) (인건비 총액 / (기준급여 변경 * 참여개월)) * 100
        }

        if(!customFlag) {
            //$("#memItemRate" + i).val(Math.round(Number(uncomma($("#memTotItemBudget" + i).val())) / Number(uncomma($("#memPayTotal" + i).val())) * memTotRate));
            $("#memItemRate" + i).val(Number(uncomma($("#memTotItemBudget" + i).val())) / Number(uncomma($("#memPayTotal" + i).val())) * memTotRate);
        }

        var memPayRate = Math.round(($("#memTotRate" + i).val() - $("#memItemRate" + i).val()) * 10) / 10;
        if(!isNaN(memPayRate)){
            $("#memPayRate" + i).val(memPayRate);
        }

        var memTotPayBudget = comma(Math.round(Number(uncomma($("#memPayTotal" + i).val())) / ($("#memTotRate" + i).val() / $("#memPayRate" + i).val())));
        var memTotItemBudget = comma(Math.round(Number(uncomma($("#memPayTotal" + i).val())) / ($("#memTotRate" + i).val() / $("#memItemRate" + i).val())));
        if($("#memItemRate" + i).val() == 0){
            $("#memTotPayBudget" + i).val(comma($("#memPayTotal" + i).val()));
        } else {
            if(!isNaN(uncomma(memTotPayBudget))){
                $("#memTotPayBudget" + i).val(memTotPayBudget);
            }
        }
        
        //$("#memTotItemBudget" + i).val(comma(Math.round(Number(uncomma($("#memPayTotal" + i).val())) - Number(uncomma($("#memTotPayBudget" + i).val())))));
        $("#memTotItemBudget" + i).val(memTotItemBudget);

        var calData = $("#memTotPayBudget" + i);
        calData.val(comma(Math.round( Number(uncomma($("#memPayTotal" + i).val())) - Number(uncomma($("#memTotItemBudget" + i).val())) )));

        //여기서부터 합계 계산
        var totPay = 0;
        $("input[name='payTotal']").each(function(){
            totPay += Number(uncomma(this.value));

            $("#allPayTotal").val(comma(totPay));
        });

        if(Number(uncomma($("#allPayTotal").val())) > Number($("#budgetAmt").val())){
            alert("인건비 총액이 인건비 예산보다 큽니다.");
        }

        var itemBdgt = 0;
        $("input[name='totItemBudget']").each(function(){
            itemBdgt += Number(uncomma(this.value));
        });

        var payBdgt = 0;
        $("input[name='totPayBudget']").each(function(){
            payBdgt += Number(uncomma(this.value));
        });

        $("#payTotal").val(comma(payBdgt));
        $("#itemTotal").val(comma(itemBdgt));
    },

    fn_monDiff : function (_date1, _date2){
        var pSDate = _date1; // 참여 시작일
        var pEDate = _date2; // 참여 종료일

        var pSDateArray = pSDate.split("-");
        var pEDateArray = pEDate.split("-");

        var pSDateSet = new Date(pSDateArray[0], pSDateArray[1] - 1, pSDateArray[2]);
        var pEDateSet = new Date(pEDateArray[0], pEDateArray[1] - 1, pEDateArray[2]);

        var pSDateLastSet = new Date(pSDateArray[0], pSDateArray[1], 0).getDate();
        var pEDateLastSet = new Date(pEDateArray[0], pEDateArray[1], 0).getDate();

        var pSDateYear = pSDateSet.getFullYear();
        var pSDateMonth = pSDateSet.getMonth();
        var pSDateDay = pSDateSet.getDate();

        var pEDateYear = pEDateSet.getFullYear();
        var pEDateMonth = pEDateSet.getMonth();
        var pEDateDay = pEDateSet.getDate();

        var pMonthSet = ((pEDateYear - pSDateYear) * 12) + (pEDateMonth - pSDateMonth) - 1;

        var pSDateDaySet = pSDateLastSet - pSDateDay + 1;
        var pEDateDaySet = pEDateDay;

        var pSDateDayPerSet = pSDateDaySet / pSDateLastSet;
        var pEDateDayPerSet = pEDateDaySet / pEDateLastSet;

        var pDateMonth = pMonthSet + pSDateDayPerSet + pEDateDayPerSet;

        var finalReturn = partRate.truncateStringToOneDecimal(pDateMonth.toString());

        if(finalReturn == 0){
            finalReturn = 0.1;
        }
        return finalReturn;
    },

    truncateStringToOneDecimal : function (str) {
        return (Math.floor(Number(str) * 10) / 10).toString();
    },

    fn_save: function(){

        /*var saveFlag = true;
        $("input[name='basicSalary']").each(function(e){
            if(this.value == 0 || this.value == "0"){
                saveFlag = false;
            }
        });
        if(!saveFlag){
            alert("기준급여 설정이 안된인원이 존재합니다.");
            return false;
        }*/

        if(Number(uncomma($("#allPayTotal").val())) > $("#budgetAmt").val()){
            alert("인건비 총액이 인건비 예산보다 큽니다.");
            return;
        }


        var parameterList = new Array();
        var body = $("#partRateMember").find(".bodyTr");

        var itemBdgt = 0;
        $("input[name='totItemBudget']").each(function(){
            itemBdgt += Number(uncomma(this.value));
        });

        if(itemBdgt > $("#itemAmt").val()){
            alert("인건비 현물 총액을 초과하였습니다.");
            return;
        }

        var payBdgt = 0;
        $("input[name='totPayBudget']").each(function(){
            payBdgt += Number(uncomma(this.value));
        });

        if(payBdgt > $("#payAmt").val()){
            alert("인건비 현금 총액을 초과하였습니다.");
            return;
        }



        for(var i = 0 ; i < body.length ; i++){
            var parameters = {
                pjtSn : $("#pjtSn").val(),
                partRateVerSn : $("#partRateVerSn").val(),
                mngComm : $("#mngComment").val()
            }

            $(body.get(i)).find("input").each(function(){
                if($(this).attr("name") == "basicSalary" || $(this).attr("name") == "partEmpName" || $(this).attr("name") == "strDt" || $(this).attr("name") == "endDt"
                  || $(this).attr("name") == "payRate" || $(this).attr("name") == "itemRate" || $(this).attr("name") == "mon"
                    || $(this).attr("name") == "totRate" || $(this).attr("name") == "gubun"){
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
            var rs = customKendo.fn_customAjax("/projectRnd/setPartRateDetail", parameterList[i]);

            // var rs = customKendo.fn_customAjax("/projectRnd/setReqPartRateStatus", parameterList[i]);
        }

        if(rs.code == 200){

            alert("저장되었습니다.");
            location.reload();
            opener.parent.gridReload();
        }


    },

    fn_confirm: function(){
        /*var saveFlag = true;
        $("input[name='basicSalary']").each(function(e){
            if(this.value == 0 || this.value == "0"){
                saveFlag = false;
            }
        });
        if(!saveFlag){
            alert("기준급여 설정이 안된인원이 존재합니다.");
            return false;
        }*/

        if(Number(uncomma($("#allPayTotal").val())) > $("#budgetAmt").val()){
            alert("인건비 총액이 인건비 예산보다 큽니다.");
            return;
        }


        var parameters = {
            pjtSn : $("#pjtSn").val(),
            partRateVerSn : $("#partRateVerSn").val()
        }

        var rs = customKendo.fn_customAjax("/projectRnd/setReqPartRateStatus", parameters);

        if(rs.code == 200){
            alert("설정이 완료되었습니다.");
            // location.reload();
            opener.parent.mngPartRate.gridReload2();
            window.close();
        }

    },

    fn_delPartMem : function (key, empSn, empNm){

        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var data = {

        }

        var memNmAr = [];
        var memSnAr = [];
        var joinMemNm = "";
        var joinMemSn = "";
        $("input[name='partEmpName']").each(function(idx){
            memNmAr.push(this.value);
        });

        $("input[name='partEmpSeq']").each(function(idx){
            memSnAr.push(this.value);
        });

        for(let i = 0; i < memNmAr.length; i++) {
            if(memNmAr[i] == empNm)  {
                memNmAr.splice(i, 1);
                break;
            }
        }

        /*for(let i = 0; i < memNmAr.length; i++) {
            joinMemNm += memNmAr[i] + ",";
        }*/

        for(let i = 0; i < memSnAr.length; i++) {
            if(memSnAr[i] == empSn)  {
                memSnAr.splice(i, 1);
                break;
            }
        }

        for(let i = 0; i < memSnAr.length; i++) {
            joinMemSn += memSnAr[i] + ",";
        }

        /*data.joinMem = joinMemNm.slice(0, -1);*/
        data.joinMemSn = joinMemSn.slice(0, -1);
        data.partRateVerSn = $("#partRateVerSn").val();

        if(key != undefined && key != "" && key != null){
            data.partRateDet = key;
        }

        $.ajax({
            url : "/project/delJoinMember",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");

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
        var url = "/mng/pop/userPartRate.do?sn=" + sn + "&pjtSn=" + key + "&adminYn=Y";

        var name = "_blank";
        var option = "width = 1800, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    getPartStartBs : function(p, e, i){
        var data = {
            startDt : $(e).val(),
            empSeq : $("#partEmpSeq" + i).val()
        }
        var result = customKendo.fn_customAjax("/project/getPartStartBs", data);
        if(result.rs != null){
            var sum = partRate.getBsPayCal(result.rs);
            var totAmt = (Math.floor(sum/10) * 10).toString().toMoney();

            $("#totAmt" + i).val(totAmt);
            $("#basicSalary" + i).val(uncomma(totAmt));
            $("#basicSalaryTxt" + i).text(comma(totAmt));
            // $("#memChngSal" + i).val(comma(totAmt));

            // partRate.fn_memMonChange(p, $("#memMon" + i), i);
            partRate.fn_memCalc(p, i);
            // partRate.fn_memCalc('+rs.PAY_BUDGET+','+ i +');
        }else{
            // alert("기준급여 데이터가 존재하지 않습니다.");
            $("#totAmt" + i).val("0");
            $("#basicSalary" + i).val("0");
            $("#basicSalaryTxt" + i).text("0");
            // $("#memChngSal" + i).val("0");
        }
    },

    fn_memMonChange : function(p, e, i){
        var memMon = $(e).val();
        /** 월 인건비 계산 (인건비 총액 / 참여개월) */
        var memMonSal = Math.floor((Number(uncomma($("#memPayTotal" + i).val())) / (memMon))/10) * 10;
        if(isNaN(memMonSal)){
            memMonSal = 0;
        }
        $("#memMonSal" + i).val(comma(memMonSal));

        /** 총 참여율(%) (인건비 총액 / (기준급여 변경 * 참여개월)) * 100 */
        var memTotRate = Math.round(Number(uncomma($("#memPayTotal" + i).val())) / (Number(uncomma($("#memChngSal" + i).val())) * memMon) * 100 * 10) / 10;
        if(!isNaN(memTotRate)){
            $("#memTotRate" + i).val(memTotRate);
        }

        /** 참여율 현물(%) */
        $("#memItemRate" + i).val(Number(uncomma($("#memTotItemBudget" + i).val())) / Number(uncomma($("#memPayTotal" + i).val())) * memTotRate);

        /** 참여율 현금(%) */
        var memPayRate = Math.round(($("#memTotRate" + i).val() - $("#memItemRate" + i).val()) * 10) / 10;
        if(!isNaN(memPayRate)){
            $("#memPayRate" + i).val(memPayRate);
        }

        var memTotPayBudget = comma(Math.round(Number(uncomma($("#memPayTotal" + i).val())) / ($("#memTotRate" + i).val() / $("#memPayRate" + i).val())));
        var memTotItemBudget = comma(Math.round(Number(uncomma($("#memPayTotal" + i).val())) / ($("#memTotRate" + i).val() / $("#memItemRate" + i).val())));
        if($("#memItemRate" + i).val() == 0){
            $("#memTotPayBudget" + i).val(comma($("#memPayTotal" + i).val()));
        } else {
            if(!isNaN(uncomma(memTotPayBudget))){
                $("#memTotPayBudget" + i).val(memTotPayBudget);
            }
        }

        $("#memTotItemBudget" + i).val(memTotItemBudget);

        var calData = $("#memTotPayBudget" + i);
        calData.val(comma(Math.round( Number(uncomma($("#memPayTotal" + i).val())) - Number(uncomma($("#memTotItemBudget" + i).val())))));

        //여기서부터 합계 계산
        var totPay = 0;
        $("input[name='payTotal']").each(function(){
            totPay += Number(uncomma(this.value));

            $("#allPayTotal").val(comma(totPay));
        });

        if(Number(uncomma($("#allPayTotal").val())) > Number($("#budgetAmt").val())){
            alert("인건비 총액이 인건비 예산보다 큽니다.");
        }

        var itemBdgt = 0;
        $("input[name='totItemBudget']").each(function(){
            itemBdgt += Number(uncomma(this.value));
        });

        var payBdgt = 0;
        $("input[name='totPayBudget']").each(function(){
            payBdgt += Number(uncomma(this.value));
        });

        $("#payTotal").val(comma(payBdgt));
        $("#itemTotal").val(comma(itemBdgt));
    },

    getBsPayCal : function(e){
        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);

        /** 국민연금 */
        var nationalPension = cnt * (e.NATIONAL_PENSION / 100);
        if(nationalPension > Number(e.LIMIT_AMT)){
            nationalPension = Number(e.LIMIT_AMT);
        }
        /** 건강보험 */
        var healthInsurance = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10;
        /** 장기요양보험 */
        var longCareInsurance =  Math.floor(Math.floor(healthInsurance * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10;
        /** 고용보험 */
        var employInsurance = Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10;
        /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
        var accidentInsurance = Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10;

        var sum = cnt;
        if(e.BUSN_PAY != null && e.BUSN_PAY != ""){
            sum += Number(e.BUSN_PAY);
        }else{
            sum += Number(nationalPension) + Number(healthInsurance) + Number(longCareInsurance) + Number(employInsurance) + Number(accidentInsurance);
        }
        if(e.RETIRE_PAY != null && e.RETIRE_PAY != ""){
            sum += Number(e.RETIRE_PAY);
        }else{
            var joinDay = new Date(e.JOIN_DAY);
            if(!isLessOneYear(joinDay)){
                sum += (Math.floor((cnt/12)/10) * 10);
            }
        }
        return sum;
    }
}

function isLessOneYear(j){
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    return j >= oneYearAgo;
}