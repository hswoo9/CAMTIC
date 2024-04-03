var rndPR = {
    global : {
        tempArr : ""
    },

    fn_defaultScript : function (){
        $("#mngComment").kendoTextArea({
            rows : 5,
        });

        rndPR.fn_setData();


        $("#viewSubBtn").on("click", function(){
            if($("#viewSubStat").val() == "Y"){
                $("#viewSubStat").val("N");
                $("#partRateMainGrid").css("display", "none");
                $("#viewSubText").html("참여인력 정보&#9660;");
            }else{
                $("#viewSubStat").val("Y");
                $("#partRateMainGrid").css("display", "");
                $("#viewSubText").html("&#9650;");
            }
        });

        // rndPR.partRateMainGrid();
    },

    partRateMainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/project/partRateEmpInfo",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empList = $("#empList").val()
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#partRateMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "성명",
                    field: "EMP_NAME_KR",
                    width: 100,
                }, {
                    field: "DEPT_NAME",
                    title: "부서",
                    width: 100,
                    template : function(e){
                        var status = "";
                        if(e.DEPT_NAME == "캠틱종합기술원"){
                            status = e.DEPT_TEAM_NAME;
                        } else {
                            status = e.DEPT_NAME;
                        }

                        return status;
                    }
                }, {
                    title: "팀",
                    field: "DEPT_TEAM_NAME",
                    width: 100,
                    template : function(e){
                        var status = "";
                        if(e.DEPT_NAME == "캠틱종합기술원"){
                            status = "";
                        } else {
                            status = e.DEPT_TEAM_NAME;
                        }

                        return status;
                    }
                }, {
                    title: "직위",
                    field: "POSITION_NAME",
                    width: 100
                }, {
                    title: "입사일자",
                    field: "JOIN_DAY",
                    width: 100,
                    template : function (e){
                        var date = new Date(e.JOIN_DAY);
                        var yyyy = date.getFullYear();
                        var mm = date.getMonth()+1;
                        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
                        var dd = date.getDate();
                        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
                        return yyyy+'-'+mm+'-'+dd;
                    }
                }, {
                    title: "주민등록번호",
                    field: "RES_REGIS_NUM",
                    width: 100
                }, {
                    title: "과학기술인번호",
                    field: "SCIENCE_NO",
                    width: 100
                }, {
                    title: "최종학력",
                    field: "GUBUN_CODE_NM",
                    width: 100
                }, {
                    title: "졸업연도",
                    field: "GRADE",
                    width: 100
                }, {
                    title: "학위",
                    field: "DEGREE_CODE_NM",
                    width: 100,
                    template : function (e){

                    }
                }, {
                    title: "출신학교/전공",
                    field: "SCHOOL",
                    width: 100
                }, {
                    title: "메일",
                    field: "EMAIL_ADDR",
                    width: 100
                }, {
                    title: "휴대폰",
                    field: "MOBILE_TEL_NUM",
                    width: 100
                }
            ]
        }).data("kendoGrid");

        $("#partRateMainGrid").css("display", "none");
    },


    fn_setData : function (){
        var data = {
            pjtSn : $("#pjtSn").val(),
            partRateVerSn : $("#partRateVerSn").val()
        }
        var bsResult = customKendo.fn_customAjax("/projectRnd/getReqPartRateData", data);
        var bsRs = bsResult.map;
        if(bsRs != null){
            $("#partRateSn").val(bsRs.PART_RATE_SN);
        }
    },

    fn_getPartRateDetail : function (){
        var data = {
            pjtSn : $("#pjtSn").val(),
            partRateVerSn : $("#partRateVerSn").val()
        }

        var result = customKendo.fn_customAjax("/project/getPartRateVerData", data);
        var rs = result.map;
        // rndPR.fn_buttonSet(rs);
        var mng = result.result.projectManagerInfo;
        var mem = result.result.projectMemberInfo;

        rndPR.global.tempArr = result.result.projectMemberInfo;

        var empList = "";
        // if(mng != null){
        //     $("#partRateMember").html("");
        //     var mngHtml = "";
        //     empList += mng.MNG_EMP_SEQ
        //     mngHtml += '<tr style="text-align: center" class="bodyTr">';
        //     mngHtml += '   <td>책임자<input type="hidden" name="partEmpSeq" value="'+mng.MNG_EMP_SEQ+'" /></td>';
        //     mngHtml += '   <td>' + mng.MNG_EMP_NAME + '<input type="hidden" name="partEmpName" value="'+mng.MNG_EMP_NAME+'" /></td>';
        //     mngHtml += '   <td style="text-align: right">' + comma(mng.BASIC_SALARY) + '</td>';
        //     mngHtml += '   <td>';
        //     mngHtml += '        <input type="text" id="mngChngSal" name="chngSal" value="'+comma(mng.BASIC_SALARY)+'" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />';
        //     mngHtml += '   </td>';
        //     mngHtml += '   <td><input type="text" id="mngStrDt" name="strDt" /></td>';
        //     mngHtml += '   <td><input type="text" id="mngEndDt" name="endDt" /></td>';
        //     mngHtml += '   <td><input type="text" id="mngMon" name="mon" style="text-align: right" disabled value="'+rndPR.fn_monDiff(mng.PJT_STR_DT, mng.PJT_END_DT)+'"></td>';
        //     mngHtml += '   <td><input type="text" id="mngPayRate" name="payRate" style="text-align: right" disabled value="0"></td>';      // 참여율 현금(%)
        //     mngHtml += '   <td><input type="text" id="mngTotPayBudget" name="totPayBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현금 총액
        //     mngHtml += '   <td><input type="text" id="mngItemRate" name="itemRate" value="0" style="text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
        //     mngHtml += '   <td><input type="text" id="mngTotItemBudget" name="totItemBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현물 총액
        //     mngHtml += '   <td><input type="text" id="mngTotRate" name="totRate" style="text-align: right" disabled value="0"></td>';      // 총 참여율(%)
        //     mngHtml += '   <td><input type="text" id="mngPayTotal" name="payTotal" style="text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');"></td>';
        //     mngHtml += '   <td><input type="text" id="mngMonSal" name="monSal" style="text-align: right" disabled value="0"></td>';      // 월 인건비
        //     mngHtml += '</tr>';
        //
        //     $("#partRateMember").append(mngHtml);
        //
        //     customKendo.fn_textBox(["mngChngSal", "mngItemRate", "mngPayTotal", "mngMon", "mngPayRate", "mngTotPayBudget", "mngTotItemBudget", "mngTotRate", "mngMonSal"]);
        //     customKendo.fn_datePicker("mngStrDt", "depth", "yyyy-MM-dd", new Date(mng.PJT_STR_DT));
        //     customKendo.fn_datePicker("mngEndDt", "depth", "yyyy-MM-dd", new Date(mng.PJT_END_DT));
        //
        //     if(mng.CHNG_SAL != null){
        //         $("#mngChngSal").val(comma(mng.CHNG_SAL));
        //     }
        //
        //     if(mng.PART_DET_STR_DT != null){
        //         $("#mngStrDt").val(mng.PART_DET_STR_DT);
        //     }
        //
        //     if(mng.PART_DET_END_DT != null){
        //         $("#mngEndDt").val(mng.PART_DET_END_DT);
        //     }
        //
        //     if(mng.MON_DIFF != null){
        //         $("#mngMon").val(mng.MON_DIFF);
        //     }
        //
        //     if(mng.PAY_RATE != null){
        //         $("#mngPayRate").val(mng.PAY_RATE);
        //     }
        //
        //     if(mng.TOT_PAY_BUDG != null){
        //         $("#mngTotPayBudget").val(comma(mng.TOT_PAY_BUDG));
        //     }
        //
        //     if(mng.ITEM_RATE != null){
        //         $("#mngItemRate").val(mng.ITEM_RATE);
        //     }
        //
        //     if(mng.TOT_ITEM_BUDG != null){
        //         $("#mngTotItemBudget").val(comma(mng.TOT_ITEM_BUDG));
        //     }
        //
        //     if(mng.TOT_RATE != null){
        //         $("#mngTotRate").val(mng.TOT_RATE);
        //     }
        //
        //     if(mng.PAY_TOTAL != null){
        //         $("#mngPayTotal").val(comma(mng.PAY_TOTAL));
        //     }
        //
        //     if(mng.MON_SAL != null){
        //         $("#mngMonSal").val(comma(mng.MON_SAL));
        //     }
        //
        // }
        if(mem != null){
            var memHtml = '';

            for(var i = 0 ; i < mem.length ; i++){
                var e = mem[i];
                var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);


                /** 국민연금 */
                var nationalPension = cnt * (e.NATIONAL_PENSION / 100);
                if(nationalPension > Number(e.LIMIT_AMT)){
                    nationalPension = Number(e.LIMIT_AMT);
                }
                /** 건강보험 */
                var healthInsurance = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10
                /** 장기요양보험 */
                var longCareInsurance =  Math.floor(Math.floor(healthInsurance * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10
                /** 고용보험 */
                var employInsurance = Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10;
                /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
                var accidentInsurance = Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10;

                var sum = cnt + nationalPension + healthInsurance + longCareInsurance + employInsurance + accidentInsurance + (Math.floor((cnt/12)/10) * 10);

                var totAmt = (Math.floor(sum/10) * 10).toString().toMoney();
                var bsSal = totAmt;
                if(mem[i].CHNG_SAL != undefined && mem[i].CHNG_SAL != null){
                    bsSal = mem[i].CHNG_SAL;
                    totAmt = mem[i].CHNG_SAL;
                }
                var gubun = "";
                if(mem[i].GUBUN == undefined || mem[i].GUBUN == null || mem[i].GUBUN == ""){
                    gubun = "";
                } else {
                    gubun = mem[i].GUBUN;
                }

                empList += mem[i].EMP_SEQ + ",";
                memHtml += '<tr style="text-align: center" class="bodyTr">';
                memHtml += '   <td>'+gubun+'<input type="hidden" name="partEmpSeq" value="'+mem[i].EMP_SEQ+'" /></td>';
                memHtml += '   <td>' + mem[i].EMP_NAME + '<input type="hidden" name="partEmpName" value="'+mem[i].EMP_NAME+'" /></td>';
                memHtml += '   <td style="text-align: right">' + comma(bsSal) + '</td>';
                memHtml += '   <td>';
                memHtml += '        <input type="text" id="memChngSal'+i+'" name="chngSal" value="'+comma(totAmt)+'" style="text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" disabled />';
                memHtml += '   </td>';
                memHtml += '   <td><input type="text" id="memStrDt'+i+'" name="strDt" disabled /></td>';
                memHtml += '   <td><input type="text" id="memEndDt'+i+'" name="endDt" disabled /></td>';
                memHtml += '   <td><input type="text" id="memMon'+i+'" name="mon" style="text-align: right" disabled value="'+rndPR.fn_monDiff(mem[i].PJT_STR_DT, mem[i].PJT_END_DT)+'"></td>';
                memHtml += '   <td><input type="text" id="memPayRate'+i+'" name="payRate" style="text-align: right" disabled value="0"></td>';      // 참여율 현금(%)
                memHtml += '   <td><input type="text" id="memTotPayBudget'+i+'" name="totPayBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현금 총액
                memHtml += '   <td><input type="text" id="memItemRate'+i+'" name="itemRate" value="0" style="text-align: right" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" disabled></td>';
                memHtml += '   <td><input type="text" id="memTotItemBudget'+i+'" name="totItemBudget" style="text-align: right" disabled value="0"></td>';      // 인건비 현물 총액
                memHtml += '   <td><input type="text" id="memTotRate'+i+'" name="totRate" style="text-align: right" disabled value="0"></td>';      // 총 참여율(%)
                memHtml += '   <td><input type="text" id="memPayTotal'+i+'" name="payTotal" style="text-align: right" value="0" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" disabled></td>';
                memHtml += '   <td><input type="text" id="memMonSal'+i+'" name="monSal" style="text-align: right" disabled value="0"></td>';      // 월 인건비
                memHtml += '   <td><button type="button" class="k-button k-button-solid-info" onclick="rndPR.fn_userPartRatePop('+mem[i].EMP_SEQ+', '+data.pjtSn+')">조회</button></td>';      // 참여율 조회
                memHtml += '</tr>';
            }

            $("#partRateMember").html(memHtml);

            for(var i = 0 ; i < mem.length ; i++){
                customKendo.fn_textBox(["memChngSal" + i, "memItemRate" + i, "memPayTotal" + i, "memMon" + i, "memPayRate" + i, "memTotPayBudget" + i, "memTotItemBudget" + i, "memTotRate" + i, "memMonSal" + i]);
                customKendo.fn_datePicker("memStrDt" + i, "depth", "yyyy-MM-dd", new Date(mem[i].PJT_STR_DT));
                customKendo.fn_datePicker("memEndDt" + i, "depth", "yyyy-MM-dd", new Date(mem[i].PJT_END_DT));

                if(mem[i].CHNG_SAL != null){
                    $("#memChngSal" + i).val(comma(mem[i].CHNG_SAL * 12));
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

        var lastHtml = '';
        lastHtml += '<tr style="text-align: center">';
        lastHtml += '    <td colspan="8" style="background-color: #8fa1c04a;">합계</td>';
        lastHtml += '    <td><input type="text" style="text-align: right; width: 100px;" disabled value="0" id="total" /></td>';
        lastHtml += '    <td style="background-color: #8fa1c04a;"></td>';
        lastHtml += '    <td><input type="text" style="text-align: right;width: 100px;" disabled value="0" id="itemTotPay" /></td>';
        lastHtml += '    <td style="background-color: #8fa1c04a;"></td>';
        lastHtml += '    <td><input type="text" style="text-align: right" disabled value="0" id="allPayTotal" /></td>';
        lastHtml += '    <td><input type="text" style="text-align: right; width: 100px;" disabled value="0" id="monthTotPay" /></td>';
        lastHtml += '    <td style="background-color: #8fa1c04a;"></td>';
        lastHtml += '</tr>';

        $("#partRateMember").append(lastHtml);

        $("#empList").val(empList);

        customKendo.fn_textBox(["allPayTotal", "total", "itemTotPay", "monthTotPay"]);

        /*var allPayTotal = 0;
        $("input[name='payTotal']").each(function(){
            allPayTotal += Number(uncomma(this.value));
        });
        $("#allPayTotal").val(comma(allPayTotal));*/

        rndPR.sumValues("input[name='payTotal']", "#allPayTotal");
        rndPR.sumValues("input[name='totPayBudget']", "#total"); // 현금-인건비(원)
        rndPR.sumValues("input[name='totItemBudget']", "#itemTotPay"); // 현물-인건비(원)
        rndPR.sumValues("input[name='monSal']", "#monthTotPay"); // 월인건비(원)


        $("#viewSubBtn").css("display", "");
    },

    sumValues : function (selector, targetId){
        var total = $(selector).get().reduce(function (acc, element) {
            return acc + Number(uncomma(element.value));
        }, 0);
        $(targetId).val(comma(total));
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

        var finalReturn = rndPR.truncateStringToOneDecimal(pDateMonth.toString());

        if(finalReturn == 0){
            finalReturn = 0.1;
        }

        return finalReturn;
    },

    truncateStringToOneDecimal : function (str) {
    return (Math.floor(Number(str) * 10) / 10).toString();
    },

    fn_buttonSet : function(rateMap){
        var buttonHtml = "";
        if(rateMap != null){
            if(rateMap.PART_RATE_VER > 1 && rateMap.MNG_STAT == "C"){
                var status = rateMap.STATUS;
                if(status == "0"){
                    buttonHtml += "<button type=\"button\" id=\"rateAppBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"rndPR.rateDrafting()\">참여율 변경 공문 작성</button>";
                }else if(status == "10"){
                    buttonHtml += "<button type=\"button\" id=\"rateCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+rateMap.DOC_ID+"', '"+rateMap.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                }else if(status == "30" || status == "40"){
                    buttonHtml += "<button type=\"button\" id=\"rateCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"tempOrReDraftingPop('"+rateMap.DOC_ID+"', '"+rateMap.DOC_MENU_CD+"', '"+rateMap.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
                }else if(status == "100"){
                    buttonHtml += "<button type=\"button\" id=\"rateCanBtn\" style=\"float: right; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+rateMap.DOC_ID+"', '"+rateMap.APPRO_KEY+"', '"+rateMap.DOC_MENU_CD+"');\">열람</button>";
                }
            }
        }
        $("#rateBtnDiv").html(buttonHtml);
    },

    rateDrafting: function(key) {
        $("#partRateVerSn").val(key);
        $("#rateDraftFrm").one("submit", function() {
            var url = "/popup/cam_project/approvalFormPopup/rateChangeApprovalPop.do";
            var name = "참여율 변경 공문 작성";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_project/approvalFormPopup/rateChangeApprovalPop.do";
            this.method = 'POST';
            this.target = '참여율 변경 공문 작성';
        }).trigger("submit");
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
    },

    fn_getPartRateDetailPdf : function (){
        var mem = rndPR.global.tempArr;

        var empList = "";

        if(mem != null){
            var memHtml = '';

            for(var i = 0 ; i < mem.length ; i++){
                var e = mem[i];
                var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);


                /** 국민연금 */
                var nationalPension = cnt * (e.NATIONAL_PENSION / 100);
                if(nationalPension > Number(e.LIMIT_AMT)){
                    nationalPension = Number(e.LIMIT_AMT);
                }
                /** 건강보험 */
                var healthInsurance = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10
                /** 장기요양보험 */
                var longCareInsurance =  Math.floor(Math.floor(healthInsurance * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10
                /** 고용보험 */
                var employInsurance = Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10;
                /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
                var accidentInsurance = Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10;

                var sum = cnt + nationalPension + healthInsurance + longCareInsurance + employInsurance + accidentInsurance + (Math.floor((cnt/12)/10) * 10);

                var totAmt = (Math.floor(sum/10) * 10).toString().toMoney();
                var bsSal = totAmt;
                if(mem[i].CHNG_SAL != undefined && mem[i].CHNG_SAL != null){
                    bsSal = mem[i].CHNG_SAL;
                    totAmt = mem[i].CHNG_SAL;
                }
                var gubun = "";
                if(mem[i].GUBUN == undefined || mem[i].GUBUN == null || mem[i].GUBUN == ""){
                    gubun = "";
                } else {
                    gubun = mem[i].GUBUN;
                }

                empList += mem[i].EMP_SEQ + ",";
                memHtml += '<tr style="text-align: center" class="bodyTr">';
                memHtml += '   <td style="font-size: 18px;">'+ gubun +'</td>';
                memHtml += '   <td style="font-size: 18px;">'+ mem[i].EMP_NAME +'</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + comma(bsSal) + '</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">'+ comma(totAmt) +'</td>';
                memHtml += '   <td style="font-size: 18px;">'+ mem[i].PJT_STR_DT +'</td>';
                memHtml += '   <td style="font-size: 18px;">'+ mem[i].PJT_END_DT +'</td>';
                memHtml += '   <td style="font-size: 18px;">'+rndPR.fn_monDiff(mem[i].PJT_STR_DT, mem[i].PJT_END_DT)+'</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">'+ mem[i].PAY_RATE +'</td>';      // 참여율 현금(%)
                memHtml += '   <td style="text-align: right;font-size: 18px;">'+ comma(mem[i].TOT_PAY_BUDG) +'</td>';      // 인건비 현금 총액
                memHtml += '   <td style="text-align: right;font-size: 18px;">'+ mem[i].ITEM_RATE +'</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">'+ comma(mem[i].TOT_ITEM_BUDG) +'</td>';      // 인건비 현물 총액
                memHtml += '   <td style="text-align: right;font-size: 18px;">'+ mem[i].TOT_RATE +'</td>';      // 총 참여율(%)
                memHtml += '   <td style="text-align: right;font-size: 18px;">'+ comma(mem[i].PAY_TOTAL) +'</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">'+ comma(mem[i].MON_SAL) +'</td>';      // 월 인건비
                memHtml += '</tr>';
            }

            $("#partRateMemberPdf").html(memHtml);

            $("#bsTitlePdf").text($("#bsTitle").val());
            $("#pjtNmPdf").text($("#pjtNm").val());

            $("#sbjDatePdf").text($("#sbjStrDe").val() + " ~ " + $("#sbjEndDe").val());
        }

        var allPayTotal = $("input[name='payTotal']").get().reduce(function (acc, element) {
            return acc + Number(uncomma(element.value));
        }, 0);
        var total = $("input[name='totPayBudget']").get().reduce(function (acc, element) {
            return acc + Number(uncomma(element.value)); // 현금-인건비(원)
        }, 0);
        var itemTotPay = $("input[name='totItemBudget']").get().reduce(function (acc, element) {
            return acc + Number(uncomma(element.value)); // 현물-인건비(원)
        }, 0);
        var monthTotPay = $("input[name='monSal']").get().reduce(function (acc, element) {
            return acc + Number(uncomma(element.value)); // 월인건비(원)
        }, 0);

        var lastHtml = '';
        lastHtml += '<tr style="text-align: center">';
        lastHtml += '    <td colspan="8" style="background-color: #8fa1c04a;font-size: 18px;">합계</td>';
        lastHtml += '    <td style="font-size: 18px;">'+ comma(total) +'</td>';
        lastHtml += '    <td style="background-color: #8fa1c04a;font-size: 18px;"></td>';
        lastHtml += '    <td style="font-size: 18px;">'+ comma(itemTotPay) +'</td>';
        lastHtml += '    <td style="background-color: #8fa1c04a;font-size: 18px;"></td>';
        lastHtml += '    <td style="font-size: 18px;">'+ comma(allPayTotal) +'</td>';
        lastHtml += '    <td style="font-size: 18px;">'+ comma(monthTotPay) +'</td>';
        lastHtml += '</tr>';

        $("#partRateMemberPdf").append(lastHtml);
    },
}