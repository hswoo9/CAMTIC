var busnPartRate = {

    global : {
        diffMonth : 0,
        memCnt : 0,
        partRateAr : {
            payInfo : [],
        },
        onData : {
            partEmpSeq : "",
            empSal : "",
            monSal : "",
        },
    },

    fn_defaultScript : function (){

        customKendo.fn_textBox(["pjtCd", "pjtNm", "busnClass"]);

        customKendo.fn_datePicker("strDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());


        busnPartRate.fn_setData();
    },

    fn_setData: function (){
        var data = {
            pjtSn : $("#pjtSn").val()
        }

        $.ajax({
            url : "/project/getProjectData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.data;

                $("#pjtCd").val(rs.PJT_CD);
                $("#pjtNm").val(rs.PJT_NM);
                $("#busnClass").val(rs.BUSN_NM);
                $("#strDt").val(rs.PJT_START_DT);
                $("#endDt").val(rs.PJT_END_DT);

                $.ajax({
                    url : "/inside/getBusinessParticipationData",
                    data : data,
                    type : "post",
                    dataType : "json",
                    success : function(rs){
                        var monYn = "";
                        var monPayStr = "MON_PAY_";
                        var monItemStr = "MON_ITEM_";

                        var resultData = {};
                        var strDe = "";
                        if(rs.list[0].MIN_DT != null){
                            strDe = rs.list[0].MIN_DT.split("-");
                        }else{
                            strDe = $("#strDt").val().split("-");
                        }

                        var endDe = $("#endDt").val().split("-");
                        var diffMonth = (endDe[0] - strDe[0]) * 12 + (endDe[1] - strDe[1]) + 1;
                        const projectStartMonth = strDe[0] + "-" + strDe[1];
                        var date = new Date(projectStartMonth);

                        var thHtml = "";
                        $("#thHtml").html(thHtml);
                        thHtml += '<th scope="row" class="text-center th-color">구분</th>';
                        thHtml += '<th scope="row" class="text-center th-color">성명</th>';
                        thHtml += '<th scope="row" class="text-center th-color">현금/현물</th>';
                        for(var i = 0 ; i < diffMonth ; i++){
                            var dtMonth = date.getMonth() + 1;
                            if(dtMonth.toString().length == 1){
                                dtMonth = "0" + dtMonth;
                            }
                            thHtml += '<th scope="row" class="text-center th-color">' +
                                '<input type="radio" name="ymRadio" id="ym'+date.getFullYear() + '-' + dtMonth +'" style="position: relative; top: 3px; margin-right: 3px;" value="'+i+'" />' +
                                '<label for="ym'+date.getFullYear() + '-' + dtMonth +'" style="position: relative; top: 1px; margin-bottom: 0px;">'+date.getFullYear() + '-' + dtMonth +'</label></th>';

                            date.setMonth(date.getMonth() + 1);
                        }
                        thHtml += '<th scope="row" class="text-center th-color">합계</th>';
                        thHtml += '<th scope="row" class="text-center th-color">예산합계</th>';
                        $("#thHtml").html(thHtml);


                        var tdHtml = "";
                        $("#tdHtml").html(tdHtml);
                        busnPartRate.global.memCnt = rs.list.length;

                        var checkItem = "";
                        $.ajax({
                            url : "/payApp/getPartRatePayBsYm",
                            data : data,
                            type : "post",
                            dataType : "json",
                            async : false,
                            success : function(rd) {
                                if(rd.map != null && rd.map != "" && rd.map != undefined){
                                    var bsYm = rd.map.bsYm;
                                    var tempArr = [];

                                    if(bsYm !== "" && bsYm && bsYm !== undefined) {
                                        if (bsYm.indexOf(",") > -1) {
                                            tempArr = bsYm.split(",");
                                            checkItem = tempArr;
                                        } else {
                                            tempArr.push(bsYm);
                                            checkItem = tempArr;
                                        }

                                    }
                                }
                            }
                        });

                        for(var i = 0 ; i < rs.list.length ; i++){
                            var itemMonMap;
                            data.empSeq = rs.list[i].PART_EMP_SEQ;

                            $.ajax({
                                url : "/inside/getBusnPartRatePayData",
                                data : data,
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

                            var item = rs.list[i];

                            busnPartRate.global.onData.partEmpSeq = item.PART_EMP_SEQ;
                            busnPartRate.global.onData.empSal = item.EMP_SAL;
                            busnPartRate.global.onData.monSal =  item.MON_SAL;
                            busnPartRate.global.onData.pay = {};
                            busnPartRate.global.onData.pay.type = [];
                            busnPartRate.global.onData.item = {};
                            busnPartRate.global.onData.item.type = [];
                            busnPartRate.global.onData.tot = {};
                            busnPartRate.global.onData.tot.type = [];
                            busnPartRate.global.onData.empName = item.PART_EMP_NM;

                            tdHtml += '<tr>';
                            if(item.PART_EMP_SEQ == item.PM_EMP_SEQ){
                                tdHtml += '<td rowspan="4">책임자</td>';
                            } else {
                                tdHtml += '<td rowspan="4">참여자</td>';
                            }
                            tdHtml += '    <td rowspan="4">'+item.PART_EMP_NM+'</td>';
                            tdHtml += '</tr>';

                            //input부분 반복
                            for(var j = 0 ; j < 3 ; j++){
                                tdHtml += '<tr>';
                                if(j == 0){
                                    tdHtml += '    <td>현금</td>';
                                } else if(j == 1){
                                    tdHtml += '    <td>현물</td>';
                                } else {
                                    tdHtml += '    <td>계</td>';
                                }

                                var date = new Date(projectStartMonth);

                                var userStrDeArr = item.PART_DET_STR_DT.split("-");
                                var userEndDeArr = item.PART_DET_END_DT.split("-");
                                var userStartMonth = userStrDeArr[0] + "-" + userStrDeArr[1];

                                var userDate = new Date(userStartMonth);

                                var aTot = 0;
                                var bTot = 0;

                                var a, b, c = 0;

                                for (var x = 0 ; x < diffMonth ; x++){
                                    var dt = date.getFullYear() + "-" + (date.getMonth() + 1);

                                    var kDt = "pay" + date.getFullYear() + "-" + (date.getMonth() + 1);
                                    var iDt = "item" + date.getFullYear() + "-" + (date.getMonth() + 1);
                                    var tDt = "tot" + date.getFullYear() + "-" + (date.getMonth() + 1);

                                    var userDt = userDate.getFullYear() + "-" + (userDate.getMonth() + 1);
                                    var rate = Number(item.PAY_RATE) / Number(item.TOT_RATE) * 100;
                                    var tot = Math.round((Number(item.MON_SAL) * Number(rate)) / 100);

                                    var colMonth = date.getMonth() + 1; //월 컬럼 선택
                                    var colYear = date.getFullYear(); //년 컬럼 선택

                                    var disabledText = "";

                                    if(monYn == 'Y'){
                                        if(checkItem != "") {
                                            if (checkItem.indexOf(colYear + "-" + colMonth) > -1) {
                                                disabledText = "disabled";
                                            }
                                        }

                                        var itemMon = itemMonMap[colYear]; // 년 선택
                                        if (j == 0) {
                                            if (dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])) {
                                                tdHtml += '<td style="text-align: right">';
                                                tdHtml += '    <input type="text" name="l' + x + j + i + '" class="a' + x + ' form-control" onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(itemMon[monPayStr+(colMonth)]) + '" '+disabledText+' />';
                                                tdHtml += '</td>';
                                                aTot += tot;
                                                bTot += itemMon[monPayStr+(colMonth)];
                                            } else {
                                                tdHtml += '<td style="text-align: right">';
                                                tdHtml += '    <input type="text" name="l' + x + j + i + '" class="a' + x + ' form-control" onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="0" '+disabledText+' />';
                                                tdHtml += '</td>';
                                                tot = 0;
                                            }
                                            var yearPayData = {[kDt]: itemMon[monPayStr+(colMonth)]};
                                            busnPartRate.global.onData.pay.type.push(yearPayData);
                                        } else if (j == 1) {
                                            if (dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])) {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="l' + x + j + i + '" class="b' + x + ' form-control" onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(itemMon[monItemStr+(colMonth)]) + '" '+disabledText+' />';
                                                tdHtml += '</td>';
                                                aTot += (Number(item.MON_SAL) - Number(tot));
                                                bTot += itemMon[monItemStr+(colMonth)];
                                            } else {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="l' + x + j + i + '" class="b' + x + ' form-control" onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="0" '+disabledText+' />';
                                                tdHtml += '</td>';
                                            }
                                            var yearItemData = {[iDt]: (Number(itemMon[monItemStr+(colMonth)]))};
                                            busnPartRate.global.onData.item.type.push(yearItemData);
                                        } else {
                                            if (dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])) {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="t' + x + j + i + '" class="c' + x + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(Number(Number(itemMon[monPayStr+(colMonth)])+Number(itemMon[monItemStr+(colMonth)]))) + '"/>';
                                                tdHtml += '</td>';
                                                aTot += Number(item.MON_SAL);
                                                bTot += Number(itemMon[monPayStr+(colMonth)]) + Number(itemMon[monItemStr+(colMonth)]);
                                            } else {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="t' + x + j + i + '" class="c' + x + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="0"/>';
                                                tdHtml += '</td>';
                                            }
                                            var yearTotData = {[tDt]: Number(item.MON_SAL)};
                                            busnPartRate.global.onData.tot.type.push(yearTotData);
                                        }
                                    }else {
                                        if(checkItem != "") {
                                            if (checkItem.indexOf(colYear + "-" + colMonth) > -1) {
                                                disabledText = "disabled";
                                            }
                                        }

                                        if (j == 0) {
                                            if (dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])) {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="l' + x + j + i + '" class="a' + x + ' form-control" onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(tot) + '" '+disabledText+' />';
                                                tdHtml += '</td>';
                                                aTot += tot;
                                                bTot += tot;
                                            } else {
                                                tdHtml += '<td style="text-align: right">';
                                                tdHtml += '    <input type="text" name="l' + x + j + i + '" class="a' + x + ' form-control" onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="0" '+disabledText+' />';
                                                tdHtml += '</td>';
                                                tot = 0;
                                            }
                                            var yearPayData = {[kDt]: tot};
                                            busnPartRate.global.onData.pay.type.push(yearPayData);
                                        } else if (j == 1) {
                                            if (dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])) {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="l' + x + j + i + '" class="b' + x + ' form-control" onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(Number(item.MON_SAL) - Number(tot)) + '" '+disabledText+' />';
                                                tdHtml += '</td>';
                                                aTot += (Number(item.MON_SAL) - Number(tot));
                                                bTot += (Number(item.MON_SAL) - Number(tot));
                                            } else {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="l' + x + j + i + '" class="b' + x + ' form-control" onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="0" '+disabledText+' />';
                                                tdHtml += '</td>';
                                            }
                                            var yearItemData = {[iDt]: (Number(item.MON_SAL) - Number(tot))};
                                            busnPartRate.global.onData.item.type.push(yearItemData);
                                        } else {
                                            if (dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])) {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="t' + x + j + i + '" class="c' + x + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(item.MON_SAL) + '"/>';
                                                tdHtml += '</td>';
                                                aTot += Number(item.MON_SAL);
                                                bTot += Number(item.MON_SAL);
                                            } else {
                                                tdHtml += '<td style="text-align: right">'
                                                tdHtml += '    <input type="text" name="t' + x + j + i + '" class="c' + x + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="0"/>';
                                                tdHtml += '</td>';
                                            }
                                            var yearTotData = {[tDt]: Number(item.MON_SAL)};
                                            busnPartRate.global.onData.tot.type.push(yearTotData);
                                        }
                                    }

                                    if(dt == userDt){
                                        userDate.setMonth(userDate.getMonth() + 1);
                                    }

                                    date.setMonth(date.getMonth() + 1);

                                }

                                var payTotal = 0;
                                var itemTotal = 0;
                                var totTotal = 0;

                                if(item.TOT_PAY_BUDG >= 0 && item.TOT_PAY_BUDG >= 0) {
                                    totTotal += (Number(item.TOT_PAY_BUDG) + Number(item.TOT_ITEM_BUDG));
                                }

                                tdHtml += '<td style="text-align: right">';
                                if(j == 0) {
                                    if (item.TOT_PAY_BUDG >= 0) {
                                        payTotal = Number(item.TOT_PAY_BUDG);
                                        tdHtml += '    <input type="text" name="d' + i + j + '" class="d' + i + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(payTotal) + '"/>';
                                    } else {
                                        tdHtml += '    <input type="text" name="d' + i + j + '" class="d' + i + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(bTot) + '"/>';
                                    }
                                }else if(j == 1) {
                                    if (item.TOT_ITEM_BUDG >= 0) {
                                        itemTotal = Number(item.TOT_ITEM_BUDG);
                                        tdHtml += '    <input type="text" name="d' + i + j + '" class="d' + i + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(itemTotal) + '"/>';
                                    } else {
                                        tdHtml += '    <input type="text" name="d' + i + j + '" class="d' + i + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(bTot) + '"/>';
                                    }
                                }else{
                                    if(totTotal >= 0) {
                                        tdHtml += '    <input type="text" name="d' + i + j + '" class="d' + i + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(totTotal) + '"/>';
                                    }else{
                                        tdHtml += '    <input type="text" name="d' + i + j + '" class="d' + i + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(aTot) + '"/>';
                                    }
                                }
                                tdHtml += '</td>';
                                tdHtml += '<td style="text-align: right">';
                                if(j == 0) {
                                    if(payTotal >= 0) {
                                        tdHtml += '    <input type="text" class="e' + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(payTotal) + '"/>';
                                    }else{
                                        tdHtml += '    <input type="text" class="e' + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(aTot) + '"/>';
                                    }
                                }else if(j == 1) {
                                    if(itemTotal >= 0) {
                                        tdHtml += '    <input type="text" class="e' + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(itemTotal) + '"/>';
                                    }else{
                                        tdHtml += '    <input type="text" class="e' + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(aTot) + '"/>';
                                    }
                                }else{
                                    if(totTotal >= 0) {
                                        tdHtml += '    <input type="text" class="e' + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(totTotal) + '"/>';
                                    }else{
                                        tdHtml += '    <input type="text" class="e' + j + ' form-control" readonly onkeyup="busnPartRate.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right; width: 90%" value="' + busnPartRate.comma(aTot) + '"/>';
                                    }
                                }
                                tdHtml += '</td>';
                                tdHtml += '</tr>';
                            }
                            var empSeq = item.PART_EMP_SEQ;
                            resultData = busnPartRate.global.onData;

                            busnPartRate.global.onData = {
                                empSal : "",
                                monSal : "",
                                partEmpSeq : "",
                            };

                            busnPartRate.global.partRateAr.payInfo[i] = resultData;

                            // busnPartRate.global.partRateAr.push(result);

                        }

                        $("#tdHtml").html(tdHtml);

                        $("#tdHtml input").kendoTextBox();

                        busnPartRate.global.diffMonth = diffMonth;

                        busnPartRate.fn_footerHtml(diffMonth);
                    }
                });
            }
        });

    },
    fn_footerHtml : function (diffMonth){
        $("#lastTr").html("");

        var tdHtml = "<tr>";
        tdHtml += '<td rowspan="4" colspan="2" style="background-color: #dee4ed">총계</td></tr>';
        tdHtml += '<tr>';
        tdHtml += '   <td style="background-color: #dee4ed">현금</td>';
        for (var x = 0 ; x < diffMonth ; x++){
            var sum = 0;
            $(".a" + x).each(function(){
                sum += Number(busnPartRate.uncomma($(this).val()));
            });
            tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        }
        var sum = 0;
        $(".d0").each(function(){
            sum += Number(busnPartRate.uncomma($(this).val()));
        });
        tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        var sum = 0;
        $(".e0").each(function(){
            sum += Number(busnPartRate.uncomma($(this).val()));
        });
        tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        tdHtml += '</tr>';
        tdHtml += '<tr>';
        tdHtml += '   <td style="background-color: #dee4ed">현물</td>';
        for (var x = 0 ; x < diffMonth ; x++){
            var sum = 0;
            $(".b" + x).each(function(){
                sum += Number(busnPartRate.uncomma($(this).val()));
            });
            tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        }
        var sum = 0;
        $(".d1").each(function(){
            sum += Number(busnPartRate.uncomma($(this).val()));
        });
        tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        var sum = 0;
        $(".e1").each(function(){
            sum += Number(busnPartRate.uncomma($(this).val()));
        });
        tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        tdHtml += '</tr>';
        tdHtml += '<tr>';
        tdHtml += '   <td style="background-color: #dee4ed">계</td>';
        for (var x = 0 ; x < diffMonth ; x++){
            var sum = 0;
            $(".c" + x).each(function(){
                sum += Number(busnPartRate.uncomma($(this).val()));
            });
            tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        }
        var sum = 0;
        $(".d2").each(function(){
            sum += Number(busnPartRate.uncomma($(this).val()));
        });
        tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        var sum = 0;
        $(".e2").each(function(){
            sum += Number(busnPartRate.uncomma($(this).val()));
        });
        tdHtml += '<td style="text-align: right;background-color: #dee4ed">'+busnPartRate.comma(sum)+'</td>';
        tdHtml += '</tr>';
        $("#lastTr").html(tdHtml);
    },

    inputNumberFormat : function (obj){
        obj.value = busnPartRate.comma(busnPartRate.uncomma(obj.value));

        var item = $(obj).parents("tr").find("input");
        var item3 = $(obj).parents("tr").next().next().find("input");


        var sum = 0;
        var len = 0;
        item.each(function(){
            if(len == item.length-2){
                return;
            }
            sum += Number(busnPartRate.uncomma($(this).val()));
            len++;
        });
        $(item).eq(item.length-2).val(busnPartRate.comma(sum));
        $(item3).eq(item3.length-2).val(busnPartRate.comma(sum));

        var name = $(obj).attr("name");
        var nameX = name.substring(2, 1);   // (1월 ~ 12월)
        var nameLoc = name.substring(3, 2); // (현금/현물/계)
        var nameY = name.substring(4, 3);   // 사용자

        var monA = $("#thHtml th input")[nameX].getAttribute("id").replace("ym", "").split("-")[1];
        if(monA == "11" || monA == "12"){
            monA = monA;
        } else {
            monA = monA.substring(2,1);
        }
        if(nameLoc == 0){
            var payName = "pay" + $("#thHtml th input")[nameX].getAttribute("id").replace("ym", "").split("-")[0] + "-" + monA;
            busnPartRate.global.partRateAr.payInfo[Number(nameY)].pay.type[nameX][payName] = Number(busnPartRate.uncomma($(obj).val()));
        } else if(nameLoc == 1){
            var payName = "item" + $("#thHtml th input")[nameX].getAttribute("id").replace("ym", "").split("-")[0] + "-" + monA;
            busnPartRate.global.partRateAr.payInfo[Number(nameY)].item.type[nameX][payName] = Number(busnPartRate.uncomma($(obj).val()));
        }

        var unitSum = 0;
        if(nameLoc == 0 || nameLoc == 1){
            unitSum += Number(busnPartRate.uncomma($('input[name="l'+nameX+'0'+nameY+'"]').val())) + Number(busnPartRate.uncomma($('input[name="l'+nameX+'1'+nameY+'"]').val()));
            $('input[name="t'+nameX+'2'+nameY+'"]').val(busnPartRate.comma(unitSum));
            //$('input[name="d'+nameY+'2"]').val(busnPartRate.comma(unitSum));
        }

        busnPartRate.fn_footerHtml(busnPartRate.global.diffMonth);
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_reqRegPopup : function (key){

        if($("#pjtCd").val() == ""){
            alert("프로젝트 코드가 생성되지 않았습니다.");
            return;
        }

        if($("input[name='ymRadio']:checked").attr("id") == undefined){
            alert("지급신청할 날짜를 선택해주세요.");
            return;
        }

        var url = "/mng/pop/accountList.do";
        if(key != null && key != ""){
            url = url + "?pjtSn=" + key + "&bsYm=" + $("input[name='ymRadio']:checked").attr("id").replace("ym", "") + "&reqType=partRate";
        }
        var name = "blank";
        var option = "width = 1100, height = 580, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);


    },

    fn_save : function (){
        var payInfo= busnPartRate.global.partRateAr.payInfo;

        var groupArr = [];
        var monSalFlag = true;

        // 사용자 분리 --> 년도 분리
        for (var x = 0; x < payInfo.length; x++) {
            var itemX = payInfo[x];
            var salArr = [];

            var preBsYearX = "";
            var cnt = -1;
            
            var monSal = itemX.monSal * itemX.pay.type.length; // 월인건비 * 참여개월

            var tot = 0;
            for (var y = 0; y < itemX.pay.type.length; y++) {
                var mapX_pay = {};
                var mapX_item = {};

                var keyX = Object.keys(itemX.pay.type[y])[0];
                var bsYearX = keyX.split("pay")[1].split("-")[0];
                var bsMonX = keyX.split("pay")[1].split("-")[1];

                tot += parseInt(Object.values(itemX.pay.type[y])[0]);
                tot += parseInt(Object.values(itemX.item.type[y])[0]);

                if (bsYearX !== preBsYearX) {
                    cnt++;
                    preBsYearX = bsYearX;
                    salArr[cnt] = [];
                }

                mapX_pay["monPay" + (bsMonX)] = parseInt(Object.values(itemX.pay.type[y])[0]);
                mapX_item["monItem" + (bsMonX)] = parseInt(Object.values(itemX.item.type[y])[0]);

                var type = {
                    "pay" : mapX_pay,
                    "item" : mapX_item
                };

                salArr[cnt].push(type);

                salArr[cnt].monYear = bsYearX;
            }

            if(monSal != tot){monSalFlag = false;}

            if(!monSalFlag){alert("[" + itemX.empName + "] 인건비 예산합계와 맞지않습니다."); break;}

            groupArr.push(salArr);
        }

        if(!monSalFlag){return false;}

        var paramArr = [];

        for (var i = 0; i < payInfo.length; i++) { //사용자 분리
            var itemI = payInfo[i];
            var groupI = groupArr[i];
            var map = {};
            var salArr = [];

            for(var j = 0; j < groupI.length; j++) { //년도 분리
                var bsYear = "";
                var mapI = {};

                for(var k = 0; k < groupI[j].length; k++) { //input value 삽입
                    bsYear = groupI[j].monYear;

                    mapI[Object.keys(groupI[j][k].pay)[0]] = Object.values(Object.values(groupI[j][k])[0])[0];
                    mapI[Object.keys(groupI[j][k].item)[0]] = Object.values(Object.values(groupI[j][k])[1])[0];
                }

                mapI.bsYear = bsYear;

                salArr.push(mapI);
            }

            map.empSeq = itemI.partEmpSeq;
            map.empSal = itemI.empSal;
            map.monSal = itemI.monSal;
            map.salArr = salArr;

            paramArr.push(map);
        }
        var data = {
            pjtSn : $("#pjtSn").val(),
            busnPartRateAr : JSON.stringify(busnPartRate.global.partRateAr),
            paramArr : JSON.stringify(paramArr)
        };

        $.ajax({
            url : "/inside/setBusnPartRatePay",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    location.reload();
                }
            }
        });
    }
}

function fn_create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
    }
    return arr;
}