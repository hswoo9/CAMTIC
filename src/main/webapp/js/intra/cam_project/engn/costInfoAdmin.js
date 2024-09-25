var costInfo = {

    global : {
        searchAjaxData2 : "",
        searchAjaxData3 : "",
        searchAjaxData4 : ""
    },

    fn_defaultScript: function(){
        /** 탭별 프로젝트 global 데이터 세팅 */
        commonProject.setPjtStat();

        /** UI 세팅 */
        costInfo.pageSet();

        /** 켄도그리드 세팅 */
        costInfoGrid.mainGrid();
        
        /** 데이터 세팅 */
        costInfo.dataSet();
    },

    pageSet: function(){
        if(commonProject.global.teamYn == null || commonProject.global.teamYn != "N"){
            return;
        }

        const pjtSn = $("#pjtSn").val();
        const result = customKendo.fn_customAjax("/project/getTeamPjtList", {pjtSn: pjtSn});
        const list = result.list;
        console.log(list);

        if(list.length > 1){
            const arr = [];
            for(let i=0; i<list.length; i++){
                const map = list[i];
                const data = {
                    label: map.DEPT_NAME,
                    value: map.PJT_SN
                };
                arr.push(data);
            }

            $("#costInfoDiv").show();

            customKendo.fn_radioGroup("costPjtClass", arr, "horizontal");
            $("#costPjtClass").data("kendoRadioGroup").value(pjtSn);

            $("#costPjtClass").data("kendoRadioGroup").bind("change", function(){
                costInfo.dataSet($("#costPjtClass").data("kendoRadioGroup").value());
                $("#searchPjtSn").val($("#costPjtClass").data("kendoRadioGroup").value());
                costInfoGrid.gridReload();
            })
        }
    },

    dataSet: function(){
        const pjtSn = $("#pjtSn").val();
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        const pjtMap = result.map;
        console.log("pjtMap", pjtMap);

        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            const e = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn}).rs;
            if(e.YEAR_CLASS == "M" && e.PJT_CD != null && e.PARENT_PJT_SN == null){
                $(".multiUi").show();
            }
            $("#taxGubun").val(e.TAX_GUBUN);
        }

        /** 사업정보 */
        costInfo.step1(pjtMap);

        /** 재무실적내역 */
        costInfo.step2(pjtMap);
    },

    step1(pjtMap){
        const pjtSn = $("#pjtSn").val();

        $("#busnNm").val(pjtMap.BUSN_NM);
        $("#PJT_CD").text(pjtMap.PJT_CD);
        $("#PJT_NM").text(pjtMap.PJT_NM);
        $("#PM").text(pjtMap.PM);
        $("#PJT_STR_DT").text(pjtMap.PJT_START_DT);
        $("#PJT_END_DT").text(pjtMap.PJT_EXP_END_DT);
        $("#PJT_AMT").text(fn_numberWithCommas(pjtMap.PJT_AMT));

        let sbjText = "미사용";
        if(pjtMap.SBJ_SEP != undefined){
            if(pjtMap.SBJ_SEP == "Y"){
                sbjText = "사용 / ";
                var data = {
                    pjtSn: pjtSn
                }
                let result = customKendo.fn_customAjax("/projectRnd/getAccountInfo", data);
                $("#checkboxDiv").show();
                for(let i=0; i<result.list.length; i++){
                    sbjText += result.list[i].IS_TYPE;
                }
            }
        }
        $("#SBJ_SEP").text(sbjText);
    },

    step2(pjtMap){
        const pjtSn = $("#pjtSn").val();


        let html = '';
        html += '<table id="pjtInfoRow" class="popTable table table-bordered mb-0">' +
            '            <colgroup>' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '                <col width="%">' +
            '            </colgroup>' +
            '            <thead >' +
            '            <tr>' +
            '                <th style="text-align: center">구분</th>' +
            '                <th style="text-align: center">프로젝트 코드</th>' +
            '                <th style="text-align: center">부서</th>' +
            '                <th style="text-align: center">팀</th>' +
            '                <th style="text-align: center">기준년도</th>' +
            '                <th style="text-align: center">수주금액</th>' +
            '                <th style="text-align: center">당해년도 사업비</th>' +
            '                <th style="text-align: center">달성 매출액</th>' +
            '                <th style="text-align: center">달성 운영수익</th>' +
            '                <th style="text-align: center">예상 매출액</th>' +
            '                <th style="text-align: center">예상 운영수익</th>' +
            '            </tr>';

        /** 수행계획, 결과보고 체크해서 정산서에 뿌려줄내용 체크 */
        const result = customKendo.fn_customAjax("/project/getPjtCostData", {pjtSn: pjtSn});
        const list = result.list;
        let count = list.length;
        console.log("재무실적 list", list);
        html +=
            '            <tr>' +
            '                <td id="PJT_TYPE" rowspan="'+count+'" style="text-align: center"></td>' +
            '                <td id="PJT_CD2" rowspan="'+count+'" style="text-align: center"></td>' +
            '                <td id="PM_DEPT" rowspan="'+count+'" style="text-align: center"></td>' +
            '                <td id="PM_TEAM" rowspan="'+count+'" style="text-align: center"></td>';

        for(let i=0; i<count; i++){
            const e = list[i];
            
            if(i != 0){
                html +=
                    '            <tr>';
            }
            html +=
                '                <td id="PJT_YEAR'+(i)+'" style="text-align: center">'+e.YEAR+'년</td>' +
                '                <td id="PJT_AMT2'+(i)+'" class="pjtAmt2" style="text-align: right"></td>' +
                '                <td id="PJT_AMT3'+(i)+'" class="pjtAmt3" style="text-align: right"></td>' +
                '                <td id="RES_AMT'+(i)+'" class="resAmt" style="text-align: right"></td>' +
                '                <td id="RES_NOT_INV_AMT'+(i)+'" class="resNotInvAmt" style="text-align: right"></td>' +
                '                <td id="DEV_AMT'+(i)+'" class="devAmt" style="text-align: right"></td>' +
                '                <td id="DEV_NOT_INV_AMT'+(i)+'" class="devNotInvAmt" style="text-align: right"></td>' +
                '            </tr>';
        }

        if(count > 1) {
            html +=
                '            <tr>' +
                '                <th colspan="5" style="text-align: right">합계</th>' +
                '                <td id="PJT_AMT2_SUM" style="text-align: right"></td>' +
                '                <td id="PJT_AMT3_SUM" style="text-align: right"></td>' +
                '                <td id="RES_AMT_SUM" style="text-align: right"></td>' +
                '                <td id="RES_NOT_INV_AMT_SUM" style="text-align: right"></td>' +
                '                <td id="DEV_AMT_SUM" style="text-align: right"></td>' +
                '                <td id="DEV_NOT_INV_AMT_SUM" style="text-align: right"></td>' +
                '            </tr>';
        }
        html +=
            '            </thead>' +
            '        </table>';
        $("#pjtInfoRow").html(html);

        /** 기본정보 */
        const tmYn = pjtMap.TM_YN;
        if(tmYn != "Y"){
            $("#PJT_TYPE").text("수주");
        }else{
            $("#PJT_TYPE").text("협업");
        }
        $("#PJT_CD2").text(pjtMap.PJT_CD);
        if(pjtMap.PM_EMP_SEQ != null){
            const pmInfo = getUser(pjtMap.PM_EMP_SEQ);
            if(pmInfo != null){
                $("#PM_DEPT").text(pmInfo.deptNm);
                $("#PM_TEAM").text(pmInfo.teamNm);
            }
        }

        for(let i=0; i<count; i++){
            const e = list[i];
            console.log("eeee", e);

            if(pjtMap.BUSN_CLASS == "D" || pjtMap.BUSN_CLASS == "V"){
                /** 수주금액 */
                $("#PJT_AMT2"+i).text(comma(e.REAL_PJT_AMT));
                $("#PJT_AMT3"+i).text(comma(e.REAL_PJT_AMT));

                /** 달성매출액 */
                $("#RES_AMT"+i).text(comma(Number(e.exnpCompAmt || 0)));
                /** - Number(e.befExpSaleAmt || 0) - Number(e.nowExpSaleAmt || 0) */

                /** 달성운영수익 */
                $("#RES_NOT_INV_AMT"+i).text(comma(Number(e.incpCompAmt || 0)));

                /** 예상매출액 */
                $("#DEV_AMT"+i).text(comma(Number(Number(e.REAL_PJT_AMT || 0) - Number(e.exnpCompAmt || 0))));

                /** 예상운영수익 */
                $("#DEV_NOT_INV_AMT"+i).text(comma(Number(e.REAL_PJT_AMT || 0) - Number(e.INV_AMT || 0) - Number(e.incpCompAmt || 0)));
                /** - Number(e.befExpProfitAmt || 0) - Number(e.befExpSaleAmt || 0) */

            }else{
                /**
                 * ** 달성 매출액 = 지출완료금액(과세일시 나누기 1.1)
                 * ** 달성 운영수익 = 수익설정 지출완료금액 + (비용설정 지출완료금액 - 비용총합계)
                 * ** 예상매출 = 당해년도 사업비 - 달성 매출액
                 * ** 예상수익 = 수익설정 예산액 - 수익설정 지출완료금액
                 * */

                /** 수주금액 */
                if(e.YEAR_CLASS == "M" && e.LIST_STR_DE != null && e.LIST_STR_DE.substring(0, 4) == e.YEAR){
                    $("#PJT_AMT2"+i).text(comma(e.ALL_PJT_AMT));
                } else {
                    $("#PJT_AMT2"+i).text(0);
                }
                $("#PJT_AMT3"+i).text(comma(e.REAL_PJT_AMT + Number(e.befExpSaleAmt || 0) - Number(e.nowExpSaleAmt || 0)));

                /** 달성 매출액 */
                let asrAmt = 0;
                if($("#taxGubun").val() == "1"){
                    asrAmt = Number((e.exnpCompAmt * 10 / 11).toString().split(".")[0]);
                }else{
                    asrAmt = e.exnpCompAmt;
                }
                $("#RES_AMT"+i).text(comma(asrAmt + e.pjtAmtSetData.AMT0));

                /** 달성운영수익 */
                let aopAmt = 0;
                let invSum = Number(uncomma($("#invSum").text())) || 0;
                if($("#taxGubun").val() == "1"){
                    let tmpAmt = Number(((e.incpCompAmt2 - e.realUseAmt - e.realUseAmt2 - e.realUseAmt3) * 10 / 11).toString().split(".")[0]);
                    aopAmt = e.incpCompAmt1 + tmpAmt;
                }else{
                    aopAmt = e.incpCompAmt1 + (e.incpCompAmt2 - e.realUseAmt - e.realUseAmt2 - e.realUseAmt3);
                }
                console.log("incpCompAmt1", e.incpCompAmt1);
                console.log("incpCompAmt2", e.incpCompAmt2);
                console.log("realUseAmt", e.realUseAmt);
                console.log("realUseAmt2", e.realUseAmt2);
                console.log("realUseAmt3", e.realUseAmt3);
                console.log("aopAmt", aopAmt);
                console.log("pjtAmtSetData", e.pjtAmtSetData);
                $("#RES_NOT_INV_AMT"+i).text(comma(aopAmt + e.pjtAmtSetData.AMT1));

                /** 예상매출액 */
                let devAmt = 0;
                devAmt = Number(e.REAL_PJT_AMT || 0) + Number(e.befExpSaleAmt || 0) - Number(e.nowExpSaleAmt || 0) - asrAmt;
                $("#DEV_AMT"+i).text(comma(devAmt + e.pjtAmtSetData.AMT2));

                /** 예상운영수익 */
                let eopAmt = 0;
                if(e.REAL_PJT_AMT != null && e.REAL_PJT_AMT != 0){
                    eopAmt = e.planAmt;
                }
                eopAmt = eopAmt - e.incpCompAmt1;
                $("#DEV_NOT_INV_AMT"+i).text(comma(eopAmt + e.pjtAmtSetData.AMT3 + Number(e.befExpProfitAmt || 0) - Number(e.nowExpProfitAmt || 0)));

                console.log("eopAmt", eopAmt);
                console.log("e.pjtAmtSetData.AMT3", e.pjtAmtSetData.AMT3);
            }

            console.log(Number(e.INV_AMT || 0));
            console.log(Number(e.incpCompAmt || 0));

            console.log("befExpSaleAmt", Number(e.befExpSaleAmt || 0));
            console.log("nowExpSaleAmt", Number(e.nowExpSaleAmt || 0));
            console.log("befExpProfitAmt", Number(e.befExpProfitAmt || 0));
            console.log("nowExpProfitAmt", Number(e.nowExpProfitAmt || 0));
        }

        /** 합계 */
        let sumE = 0;
        $('td.pjtAmt2').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumE += value;
                console.log()
            }
        });
        $("#PJT_AMT2_SUM").text(comma(sumE));

        let sumF = 0;
        $('td.pjtAmt3').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumF += value;
            }
        });
        $("#PJT_AMT3_SUM").text(comma(sumF));

        let sumA = 0;
        $('td.resAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumA += value;
            }
        });
        $("#RES_AMT_SUM").text(comma(sumA));

        let sumB = 0;
        $('td.resNotInvAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumB += value;
            }
        });
        $("#RES_NOT_INV_AMT_SUM").text(comma(sumB));

        let sumC = 0;
        $('td.devAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumC += value;
            }
        });
        $("#DEV_AMT_SUM").text(comma(sumC));

        let sumD = 0;
        $('td.devNotInvAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumD += value;
            }
        });
        $("#DEV_NOT_INV_AMT_SUM").text(comma(sumD));
    }
}