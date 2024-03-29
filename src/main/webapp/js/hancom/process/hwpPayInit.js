var payInit = {

    payAppInit: function(payAppSn){
        const result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", {
            payAppSn: payAppSn
        });
        const rs = result.map;
        const ls = result.list;

        /** 1. 지급신청서 데이터 */
        hwpDocCtrl.putFieldText("DOC_NO", rs.DOC_NO);
        hwpDocCtrl.putFieldText("REG_DATE", rs.REG_DATE);
        hwpDocCtrl.putFieldText("REQ_DE", rs.REQ_DE.split("-")[0] + "년 " + rs.REQ_DE.split("-")[1] + "월 " + rs.REQ_DE.split("-")[2] + "일");
        hwpDocCtrl.putFieldText("TO_DATE", rs.REQ_DE.split("-")[0] + "년 " + rs.REQ_DE.split("-")[1] + "월 " + rs.REQ_DE.split("-")[2] + "일");

        // hwpDocCtrl.putFieldText("TO_DATE", fn_getNowDate(1));
        hwpDocCtrl.putFieldText("REASON", rs.REASON);
        hwpDocCtrl.putFieldText("APP_TITLE", rs.APP_TITLE);
        hwpDocCtrl.putFieldText("APP_CONT", rs.APP_CONT);
        hwpDocCtrl.putFieldText("ACC_NO", "("+rs.BNK_NM+") "+rs.ACC_NO+" "+rs.ACC_NM);
        let budgetArr = ls[0].BUDGET_NM.split(" / ");
        hwpDocCtrl.putFieldText("BUDGET_NM1", budgetArr[0]);
        hwpDocCtrl.putFieldText("BUDGET_NM2", budgetArr[1]);
        hwpDocCtrl.putFieldText("BUDGET_NM3", budgetArr[2]);

        if(rs.PAY_APP_TYPE == 1){
            hwpDocCtrl.putFieldText("DOC_TITLE", "지 급 신 청 서");
            hwpDocCtrl.putFieldText("DOC_DETAIL", "아래와 같이 지급신청 합니다.");
            hwpDocCtrl.putFieldText("ACCOUNT_TYPE_TEXT", "출금계좌");
        }else if(rs.PAY_APP_TYPE == 2){
            hwpDocCtrl.putFieldText("DOC_TITLE", "여 입 신 청 서");
            hwpDocCtrl.putFieldText("DOC_DETAIL", "아래와 같이 여입신청 합니다.");
            hwpDocCtrl.putFieldText("ACCOUNT_TYPE_TEXT", "입금계좌");
        }else if(rs.PAY_APP_TYPE == 3){
            hwpDocCtrl.putFieldText("DOC_TITLE", "반 납 신 청 서");
            hwpDocCtrl.putFieldText("DOC_DETAIL", "아래와 같이 반납신청 합니다.");
            hwpDocCtrl.putFieldText("ACCOUNT_TYPE_TEXT", "출금계좌");
            hwpDocCtrl.putFieldText("budgetTitle", "세 입 과 목");
        }else if(rs.PAY_APP_TYPE == 4){
            hwpDocCtrl.putFieldText("DOC_TITLE", "대 체 신 청 서");
            hwpDocCtrl.putFieldText("DOC_DETAIL", "아래와 같이 대체신청 합니다.");
            hwpDocCtrl.putFieldText("ACCOUNT_TYPE_TEXT", "출금계좌");
            hwpDocCtrl.putFieldText("budgetTitle", "세 입 과 목");
        }

        console.log("pjtCd" , rs);

        if(rs.PJT_CD.substring(0,1) != "M"){
            /** 사업 데이터 */

            const pjtResult = customKendo.fn_customAjax("/project/getProjectByPjtCd", {
                pjtCd: rs.PJT_CD
            });
            const pjtMap = pjtResult.map;
            console.log(pjtMap);

            if(pjtMap == null){
                alert("캠스팟 2.0에 등록되지 않은 사업정보입니다."); return;
            }

            /** 사업명 */
            hwpDocCtrl.putFieldText("BS_TITLE", (pjtMap.BS_TITLE || ""));
            /** 과제명 */
            hwpDocCtrl.putFieldText("PJT_NM", pjtMap.PJT_NM);
            /** 연구기간 */
            hwpDocCtrl.putFieldText("PJT_DT", pjtMap.PJT_START_DT+" ~ "+pjtMap.PJT_END_DT);

            /**PM 데이터 */
            const userInfo = customKendo.fn_customAjax("/user/getUserInfo", {
                empSeq: pjtMap.PM_EMP_SEQ
            });
            let spot = "";
            if(userInfo != null){
                if(userInfo.DUTY_NAME != null && userInfo.DUTY_NAME != ""){
                    spot = userInfo.DUTY_NAME;
                }else{
                    spot = userInfo.POSITION_NAME;
                }
                /** 연구책임자 소속 */
                if(userInfo.teamNm == "" || userInfo.teamNm == null){
                    hwpDocCtrl.putFieldText("DEPT_NAME", userInfo.deptNm);
                }else{
                    hwpDocCtrl.putFieldText("DEPT_NAME", userInfo.teamNm);
                }
            }
            /** 연구책임자 직급 */
            hwpDocCtrl.putFieldText("POSITION_NAME", spot);
            /** 연구책임자 성명 */
            hwpDocCtrl.putFieldText("EMP_NAME", pjtMap.PM);

            /** 2. 지급신청서 데이터 */
            const htmlPay = payInit.htmlPay(ls, rs);
            hwpDocCtrl.moveToField('PAY_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlPay, "html","insertfile");




            /** 연구비지원기관 */
            var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", {
                grpSn: "SUP_DEP"
            }).list;
            let supDepTxt = "";
            for(let i=0; i<lgCodeDs.length; i++){
                if(lgCodeDs[i].LG_CD == pjtMap.SBJ_DEP){
                    supDepTxt = lgCodeDs[i].LG_CD_NM;
                }
            }
            hwpDocCtrl.putFieldText("SUP_DEP", supDepTxt);

            /** 연구비 구분 */
            var sbjDs = customKendo.fn_customAjax("/common/commonCodeList", {
                cmGroupCode: "RND_SUBJECT"
            }).rs;
            let sbjClassTxt = "";
            console.log(pjtMap.SBJ_CLASS);
            console.log(sbjDs);
            for(let i=0; i<sbjDs.length; i++){
                if(sbjDs[i].CM_CODE == String(pjtMap.SBJ_CLASS)){
                    sbjClassTxt = sbjDs[i].CM_CODE_NM;
                }
            }
            hwpDocCtrl.putFieldText("SBJ_CLASS", sbjClassTxt);
            hwpDocCtrl.putFieldText("TR_DT", ls[0].TR_DE.split("-")[0]+"년 "+ls[0].TR_DE.split("-")[1]+"월 "+ls[0].TR_DE.split("-")[2]+"일");
        }
    },

    htmlPay: function(list, rs){
        let html = '';
        html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="5" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td rowspan="2" style="height:30px;background-color:#FFFFDD; text-align:center; width: 151px;"><p style="font-size:13px;"><b>항 목</b></p></td>';
        html += '                   <td colspan="5" style="height:30px;background-color:#FFFFDD; text-align:center; width: 565px;"><p style="font-size:13px;"><b>금 회 신 청 내 역</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFFFDD; text-align:center; width: 113px;"><p style="font-size:12px;"><b>신청내용</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFDD; text-align:center; width: 113px;"><p style="font-size:12px;"><b>지 급 처</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFDD; text-align:center; width: 103px;"><p style="font-size:12px;"><b>신청금액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFDD; text-align:center; width: 125px;"><p style="font-size:12px;"><b>입금계좌/예금주</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFDD; text-align:center; width: 113px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;">'+ map.BUDGET_NM.replace(/ \/ /g, ' - <br>') +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.REASON +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.CRM_NM +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;">'+ fn_numberWithCommas(map.TOT_COST) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.CRM_BNK_NM +'<br>'+ map.CRM_ACC_NO +'<br>'+ map.CRM_ACC_HOLDER +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.ETC +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}