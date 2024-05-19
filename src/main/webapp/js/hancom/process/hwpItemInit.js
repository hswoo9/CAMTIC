var itemInit = {

    global: {
        pjtInfo: new Object(),
        rndInfo: new Object()
    },

    itemInit: function(itemApprovalSn){

        const result = customKendo.fn_customAjax("/item/getItemApprovalInfoByPk", {itemApprovalSn: itemApprovalSn});
        const data = result.data;
        const applyMonth = data.APPLY_MONTH;
        const nowDate = new Date((applyMonth+"-01"));

        const applyArr = applyMonth.split("-");
        const befMonth = applyArr[0]+"-"+(nowDate.getMonth()).toString().padStart(2, '0');
        const result2 = customKendo.fn_customAjax("/item/getItemInvenAdminListByMonth.do", {applyMonth: applyMonth, befMonth: befMonth});
        const list = result2.list;

        const userInfo = getUser(data.REG_EMP_SEQ);

        hwpDocCtrl.putFieldText("DOC_TITLE", applyArr[1]+"월 특화아이템 재고관리 현황보고");
        hwpDocCtrl.putFieldText("DEPT_NAME", userInfo.deptNm);
        hwpDocCtrl.putFieldText("DT1", fn_getNowDate(4));
        hwpDocCtrl.putFieldText("DT2", fn_getNowDate(4));
        hwpDocCtrl.putFieldText("EMP_NAME", userInfo.EMP_NAME_KR);

        const htmlCustomG20 = itemInit.htmlCustomG20(list);
        hwpDocCtrl.putFieldText("ITEM_HTML", "");
        hwpDocCtrl.moveToField("ITEM_HTML", true, true, false);
        hwpDocCtrl.setTextFile(htmlCustomG20, "html","insertfile");
    },

    htmlCustomG20: function(list){
        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:10px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td rowspan="2" style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:10px;"><b>품목</b></p></td>';
        html += '                   <td rowspan="2" style="height:30px;background-color:#E5E5E5; text-align:center; width: 45px;"><p style="font-size:10px;"><b>단위</b></p></td>';
        html += '                   <td colspan="7" style="height:30px;background-color:#E5E5E5; text-align:center; width: 315px;"><p style="font-size:10px;"><b>수량기준</b></p></td>';
        html += '                   <td colspan="3" style="height:30px;background-color:#E5E5E5; text-align:center; width: 165px;"><p style="font-size:10px;"><b>금액기준(VAT 별도)</b></p></td>';
        html += '                   <td rowspan="2" style="height:30px;background-color:#E5E5E5; text-align:center; width: 86px;"><p style="font-size:10px;"><b>비고</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 45px;"><p style="font-size:10px;"><b>전월<br>재고수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 45px;"><p style="font-size:10px;"><b>입고현황</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 45px;"><p style="font-size:10px;"><b>출고현황</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 45px;"><p style="font-size:10px;"><b>현재고</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 45px;"><p style="font-size:10px;"><b>실사<br>재고수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 45px;"><p style="font-size:10px;"><b>차이</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 45px;"><p style="font-size:10px;"><b>확정재고</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 55px;"><p style="font-size:10px;"><b>전월<br>재고자산</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 55px;"><p style="font-size:10px;"><b>당월<br>재고자산</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 55px;"><p style="font-size:10px;"><b>재고자산<br>증감액</b></p></td>';
        html += '               </tr>';
        let sum0 = 0;
        let sum1 = 0;
        let sum2 = 0;

        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;">'+ map.ITEM_NAME +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;">'+ map.STANDARD +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(map.BEF_TOT_CNT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(map.IN_CNT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(map.OUT_CNT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(map.TOT_CNT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(map.REAL_CNT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(Number(map.TOT_CNT) - Number(map.REAL_CNT)) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(map.ITEM_CONF_CNT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(map.BEF_AMT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ commaN(map.AMT) +'</p></td>';
            let diff = 0;
            if(map.BEF_AMT > map.AMT){
                diff = Number(map.BEF_AMT) - Number(map.AMT);
            } else if(map.BEF_AMT < map.AMT){
                diff = Number(map.AMT) - Number(map.BEF_AMT);
            } else {
                diff = Number(map.BEF_AMT) - Number(map.AMT);
            }

            sum0 += Number(map.BEF_AMT);
            sum1 += Number(map.AMT);
            sum2 += Number(diff);

            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ commaN(diff) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;">'+ map.INVEN_AJM_NOTE_TEXT +'</p></td>';
            html += '               </tr>';
        }
        html += '               <tr>';
        html += '                   <td colspan="9" style="height:30px;background-color:#E5E5E5; text-align:center;"><p style="font-size:10px;">합계</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(sum0) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ comma(sum1) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:10px;">'+ commaN(sum2) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"></p></td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}