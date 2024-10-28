var costInfoAdmin = {

    global : {
        searchAjaxData2 : "",
        searchAjaxData3 : "",
        searchAjaxData4 : ""
    },

    fn_defaultScript: function(){
        /** 탭별 프로젝트 global 데이터 세팅 */
        commonProject.setPjtStat();

        /** UI 세팅 */
        costInfoAdmin.pageSet();

        /** 켄도그리드 세팅 */
        costInfoGrid.mainGrid();
        
        /** 데이터 세팅 */
        costInfoAdmin.dataSet();
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
            $("#searchTeamPjtSn").val(list[1].PJT_SN);
            $(".team").show();
            costInfoTeamGrid.teamGrid(list[1].PJT_SN);
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
        costInfoAdmin.step1(pjtMap);

        /** 전체년도 재무실적내역 */
        costInfoAdmin.step2(pjtMap);

        /** 재무실적내역 */
        costInfoAdmin.step3(pjtMap);
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
            '            </colgroup>' +
            '            <thead >' +
            '            <tr>' +
            '                <th style="text-align: center">구분</th>' +
            '                <th style="text-align: center">프로젝트 코드</th>' +
            '                <th style="text-align: center">부서</th>' +
            '                <th style="text-align: center">팀</th>' +
            '                <th style="text-align: center">수주금액</th>' +
            '                <th style="text-align: center">수행계획</th>' +
            '                <th style="text-align: center">달성 매출액</th>' +
            '                <th style="text-align: center">달성 운영수익</th>' +
            '                <th style="text-align: center">예상 매출액</th>' +
            '                <th style="text-align: center">예상 운영수익</th>' +
            '            </tr>';

        /** 수행계획, 결과보고 체크해서 정산서에 뿌려줄내용 체크 */
        const result = customKendo.fn_customAjax("/cam_achieve/getProjectList", {pjtSn: pjtSn, type: "group"});
        const list = result.list;
        let count = list.length;
        console.log("전체재무실적 list", list);
        html +=
            '            <tr>' +
            '                <td id="ALL_PJT_TYPE" rowspan="'+count+'" style="text-align: center"></td>' +
            '                <td id="ALL_PJT_CD2" rowspan="'+count+'" style="text-align: center"></td>' +
            '                <td id="ALL_PM_DEPT" rowspan="'+count+'" style="text-align: center"></td>' +
            '                <td id="ALL_PM_TEAM" rowspan="'+count+'" style="text-align: center"></td>';

        html +=
            '                <td id="ALL_PJT_AMT3_SUM" style="text-align: right"></td>' +
            '                <td id="ALL_INV_AMT_SUM" style="text-align: right"></td>' +
            '                <td id="ALL_RES_AMT_SUM" style="text-align: right"></td>' +
            '                <td id="ALL_RES_NOT_INV_AMT_SUM" style="text-align: right"></td>' +
            '                <td id="ALL_DEV_AMT_SUM" style="text-align: right"></td>' +
            '                <td id="ALL_DEV_NOT_INV_AMT_SUM" style="text-align: right"></td>' +
            '            </tr>';
            '            </thead>' +
            '        </table>';
        $("#allPjtRow").html(html);

        /** 기본정보 */
        const tmYn = pjtMap.TM_YN;
        if(tmYn != "Y"){
            $("#ALL_PJT_TYPE").text("수주");
        }else{
            $("#ALL_PJT_TYPE").text("협업");
        }
        $("#ALL_PJT_CD2").text(pjtMap.PJT_CD);
        if(pjtMap.PM_EMP_SEQ != null){
            const pmInfo = getUser(pjtMap.PM_EMP_SEQ);
            if(pmInfo != null){
                $("#ALL_PM_DEPT").text(pmInfo.deptNm);
                $("#ALL_PM_TEAM").text(pmInfo.teamNm);
            }
        }

        /** 수주금액 */
        let sumA = 0;
        /** 수행계획 */
        let sumB = 0;

        /** 달성매출액 */
        let sumC = 0;
        /** 달성운영수익 */
        let sumD = 0;
        /** 예상매출액 */
        let sumE = 0;
        /** 예상운영수익 */
        let sumF = 0;

        for(let i=0; i<list.length; i++){
            const e = list[i];
            console.log("전체 재무실적 list", list);

            /** 수주금액(당해년도 사업비 합계) */
            sumA += costCalc.nowPjtAmt(e);

            /** 수행계획 */
            if(i==0){
                sumB += e.DEV_INV_AMT || 0;
            }
            //sumB += costCalc.nowInvAmt(e);

            /** 달성 매출액 */
            sumC += costCalc.resSaleAmt(e);

            /** 달성운영수익 */
            sumD += costCalc.resProfitAmt(e);

            /** 예상매출액 */
            sumE += costCalc.devSaleAmt(e);

            /** 예상운영수익 */
            sumF += costCalc.devProfitAmt(e);
        }
        $("#ALL_PJT_AMT3_SUM").text(comma(sumA));
        $("#ALL_INV_AMT_SUM").text(comma(sumB));
        $("#ALL_RES_AMT_SUM").text(comma(sumC));
        $("#ALL_RES_NOT_INV_AMT_SUM").text(comma(sumD));
        $("#ALL_DEV_AMT_SUM").text(comma(sumE));
        $("#ALL_DEV_NOT_INV_AMT_SUM").text(comma(sumF));
    },

    step3(pjtMap){
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
            '                <th style="text-align: center">수행계획</th>' +
            '                <th style="text-align: center">달성 매출액</th>' +
            '                <th style="text-align: center">달성 운영수익</th>' +
            '                <th style="text-align: center">예상 매출액</th>' +
            '                <th style="text-align: center">예상 운영수익</th>' +
            '            </tr>';

        /** 수행계획, 결과보고 체크해서 정산서에 뿌려줄내용 체크 */
        const result = customKendo.fn_customAjax("/cam_achieve/getProjectList", {pjtSn: pjtSn});
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
                '                <td id="INV_AMT'+(i)+'" class="invAmt" style="text-align: right"></td>' +
                '                <td id="RES_AMT'+(i)+'" class="resAmt" style="text-align: right"></td>' +
                '                <td id="RES_NOT_INV_AMT'+(i)+'" class="resNotInvAmt" style="text-align: right"></td>' +
                '                <td id="DEV_AMT'+(i)+'" class="devAmt" style="text-align: right"></td>' +
                '                <td id="DEV_NOT_INV_AMT'+(i)+'" class="devNotInvAmt" style="text-align: right"></td>' +
                '            </tr>';
        }

        let list2 = [];
        let teamEmpSeq = 0;
        if(commonProject.global.teamCk == "Y"){
            const result = customKendo.fn_customAjax("/cam_achieve/getProjectList", {pjtSn: pjtSn, type: "team"});
            const list = result.list;
            list2 = list;
            let count = list.length;
            console.log("협업재무실적 list", list);
            html +=
                '            <tr>' +
                '                <td rowspan="'+count+'" style="text-align: center">협업</td>' +
                '                <td id="TEAM_PJT_CD2" rowspan="'+count+'" style="text-align: center"></td>' +
                '                <td id="TEAM_PM_DEPT" rowspan="'+count+'" style="text-align: center"></td>' +
                '                <td id="TEAM_PM_TEAM" rowspan="'+count+'" style="text-align: center"></td>';

            for(let i=0; i<count; i++){
                const e = list[i];

                if(i != 0){
                    html +=
                        '            <tr>';
                }else{
                    teamEmpSeq = e.PM_EMP_SEQ;
                }
                html +=
                    '                <td id="TEAM_PJT_YEAR'+(i)+'" style="text-align: center">'+e.YEAR+'년</td>' +
                    '                <td id="TEAM_PJT_AMT2'+(i)+'" class="pjtAmt2" style="text-align: right">' +
                    '                </td>' +
                    '                <td id="TEAM_PJT_AMT3'+(i)+'" class="pjtAmt3" style="text-align: right">' +
                    '                </td>' +
                    '                <td id="TEAM_INV_AMT'+(i)+'" class="invAmt" style="text-align: right">' +
                    '                </td>' +
                    '                <td id="TEAM_RES_AMT'+(i)+'" class="resAmt" style="text-align: right">' +
                    '                </td>' +
                    '                <td id="TEAM_RES_NOT_INV_AMT'+(i)+'" class="resNotInvAmt" style="text-align: right">' +
                    '                </td>' +
                    '                <td id="TEAM_DEV_AMT'+(i)+'" class="devAmt" style="text-align: right">' +
                    '                </td>' +
                    '                <td id="TEAM_DEV_NOT_INV_AMT'+(i)+'" class="devNotInvAmt" style="text-align: right">' +
                    '                </td>' +
                    '            </tr>';
            }
        }

        if(count > 1) {
            html +=
                '            <tr>' +
                '                <th colspan="5" style="text-align: right">합계</th>' +
                '                <td id="PJT_AMT2_SUM" style="text-align: right"></td>' +
                '                <td id="PJT_AMT3_SUM" style="text-align: right"></td>' +
                '                <td id="INV_AMT_SUM" style="text-align: right"></td>' +
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
        $("#TEAM_PJT_CD2").text(pjtMap.PJT_CD);
        if(pjtMap.PM_EMP_SEQ != null){
            const pmInfo = getUser(pjtMap.PM_EMP_SEQ);
            if(pmInfo != null){
                $("#PM_DEPT").text(pmInfo.deptNm);
                $("#PM_TEAM").text(pmInfo.teamNm);
            }
        }

        if(teamEmpSeq != 0){
            const pmInfo = getUser(teamEmpSeq);
            if(pmInfo != null){
                $("#TEAM_PM_DEPT").text(pmInfo.deptNm);
                $("#TEAM_PM_TEAM").text(pmInfo.teamNm);
            }
        }

        for(let i=0; i<count; i++){
            const e = list[i];
            console.log("재무실적 상세 데이터 : ", e);

            /** 수주금액 */
            $("#PJT_AMT2"+i).text(comma(costCalc.allPjtAmt(e)));

            /** 당해년도 사업비 */
            $("#PJT_AMT3"+i).text(comma(costCalc.nowPjtAmt(e)));

            /** 수행계획 */
            $("#INV_AMT"+i).text(comma(costCalc.nowInvAmt(e)));

            /** 달성 매출액 */
            $("#RES_AMT"+i).text(comma(costCalc.resSaleAmt(e)));

            /** 달성 운영수익 */
            $("#RES_NOT_INV_AMT"+i).text(comma(costCalc.resProfitAmt(e)));

            /** 예상 매출액 */
            $("#DEV_AMT"+i).text(comma(costCalc.devSaleAmt(e)));

            /** 예상 운영수익 */
            $("#DEV_NOT_INV_AMT"+i).text(comma(costCalc.devProfitAmt(e)));

            /*
            console.log("INV_AMT", Number(e.INV_AMT || 0));
            console.log("incpCompAmt", Number(e.incpCompAmt || 0));
            console.log("befExpSaleAmt", Number(e.befExpSaleAmt || 0));
            console.log("nowExpSaleAmt", Number(e.nowExpSaleAmt || 0));
            console.log("befExpProfitAmt", Number(e.befExpProfitAmt || 0));
            console.log("nowExpProfitAmt", Number(e.nowExpProfitAmt || 0));
            */
        }

        for(let i=0; i<list2.length; i++){
            const e = list2[i];
            console.log("협업 재무실적 상세 데이터 : ", e);

            /** 수주금액 */
            $("#TEAM_PJT_AMT2"+i).text(comma(costCalc.allPjtAmt(e)));

            /** 당해년도 사업비 */
            $("#TEAM_PJT_AMT3"+i).text(comma(costCalc.nowPjtAmt(e)));

            /** 수행계획 */
            $("#TEAM_INV_AMT"+i).text(comma(costCalc.nowInvAmt(e)));

            /** 달성 매출액 */
            $("#TEAM_RES_AMT"+i).text(comma(costCalc.resSaleAmt(e)));

            /** 달성 운영수익 */
            $("#TEAM_RES_NOT_INV_AMT"+i).text(comma(costCalc.resProfitAmt(e)));

            /** 예상 매출액 */
            $("#TEAM_DEV_AMT"+i).text(comma(costCalc.devSaleAmt(e)));

            /** 예상 운영수익 */
            $("#TEAM_DEV_NOT_INV_AMT"+i).text(comma(costCalc.devProfitAmt(e)));
        }

        /** 수주금액 합계 */
        let sumE = 0;
        $('td.pjtAmt2').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumE += value;
                console.log()
            }
        });
        $("#PJT_AMT2_SUM").text(comma(sumE));

        /** 당해년도 사업비 합계 */
        let sumF = 0;
        $('td.pjtAmt3').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumF += value;
            }
        });
        $("#PJT_AMT3_SUM").text(comma(sumF))

        /** 수행계획 합계 */
        let sumInvAmt = 0;
        $('td.invAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumInvAmt += value;
            }
        });
        $("#INV_AMT_SUM").text(comma(sumInvAmt));

        /** 달성 매출액 합계 */
        let sumA = 0;
        $('td.resAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumA += value;
            }
        });
        $("#RES_AMT_SUM").text(comma(sumA));

        /** 달성 운영수익 합계 */
        let sumB = 0;
        $('td.resNotInvAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumB += value;
            }
        });
        $("#RES_NOT_INV_AMT_SUM").text(comma(sumB));

        /** 예상 매출액 합계 */
        let sumC = 0;
        $('td.devAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumC += value;
            }
        });
        $("#DEV_AMT_SUM").text(comma(sumC));

        /** 예상 운영수익 합계 */
        let sumD = 0;
        $('td.devNotInvAmt').each(function() {
            const value = Number(uncommaN($(this).text()));
            if (!isNaN(value)) {
                sumD += value;
            }
        });
        $("#DEV_NOT_INV_AMT_SUM").text(comma(sumD));
    },

    fn_costInfoClose : function(){

        if(!confirm("정산서를 마감하시겠습니까?")) {
            return;
        }

        $.ajax({
            url: "/project/setCostInfoClose",
            data : {
                pjtSn : $("#pjtSn").val()
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == "200") {
                    alert("마감되었습니다.");
                    location.reload();
                }
            }
        })
    }
}