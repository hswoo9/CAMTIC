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
    },

    htmlObtainOrderItem: function(){
        const list = itemInit.global.obtainOrderItemList;
        const data = itemInit.global.obtainOrderData;

        var itemAmtSum = 0;

        var html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:25px;background-color:#BFBFFF; text-align:center; width: 340px;"><p style="font-size:12px;"><b>품 명 및 규 격</b></p></td>';
        html += '                   <td style="height:25px;background-color:#BFBFFF; text-align:center; width: 70px;"><p style="font-size:12px;"><b>단 가</b></p></td>';
        html += '                   <td style="height:25px;background-color:#BFBFFF; text-align:center; width: 57px;"><p style="font-size:12px;"><b>수 량</b></p></td>';
        html += '                   <td style="height:25px;background-color:#BFBFFF; text-align:center; width: 60px;"><p style="font-size:12px;"><b>단 위</b></p></td>';
        html += '                   <td style="height:25px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>금 액</b></p></td>';
        html += '                   <td style="height:25px;background-color:#BFBFFF; text-align:center; width: 78px;"><p style="font-size:12px;"><b>비 고</b></p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            const map = list[i];

            html += '   <tr>';
            html += '       <td style="height:20px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px; margin-left:5px;"><b>'+map.ITEM_NAME+'</b></p></td>';
            html += '       <td style="height:20px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;  margin-right:5px;"><b>'+comma(map.UNIT_PRICE)+'</b></p></td>';
            html += '       <td style="height:20px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;  margin-right:5px;"><b>'+map.ORDER_VOLUME+'</b></p></td>';
            html += '       <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>'+map.UNIT+'</b></p></td>';
            html += '       <td style="height:20px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;  margin-right:5px;"><b>'+comma(list[i].AMT)+'</b></p></td>';
            html += '       <td style="height:20px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;  margin-left:5px;"><b>'+map.RMK+'</b></p></td>';
            html += '   </tr>';

            itemAmtSum += Number(map.AMT);
        }

        if(list.length < 10){
            for(let i=0; i<10-list.length; i++){
                html += '   <tr>';
                html += '       <td style="height:20px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:20px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:20px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:20px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:20px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:20px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '   </tr>';
            }
        }

        const supAmtSum2 = Math.floor(itemAmtSum/10);
        const supAmtSum1 = itemAmtSum - supAmtSum2;

        html += '   <tr>';
        html += '       <td colspan="4" style="height:20px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>견&nbsp;&nbsp;적&nbsp;&nbsp;가&nbsp;&nbsp;합&nbsp;&nbsp;계</b></p></td>';
        html += '       <td colspan="2" style="height:20px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px; margin-right: 5px;"><b>&#8361; '+ comma(supAmtSum1)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="4" style="height:20px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>세&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;액</b></p></td>';
        html += '       <td colspan="2" style="height:20px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px; margin-right: 5px;"><b>&#8361; '+ comma(supAmtSum2)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="4" style="height:20px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>총&nbsp;&nbsp;&nbsp;견&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;가</b></p></td>';
        html += '       <td colspan="2" style="height:20px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px; margin-right: 5px;"><b>&#8361; '+ comma(itemAmtSum)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="6" style="height:20px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>**********견&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;사&nbsp;&nbsp;&nbsp;항**********</b></p></td>';
        html += '   </tr>';

        html += '   <tr style="border-bottom: white;">';
        html += '       <td colspan="6" style="background-color:#FFFFFF; text-align:left;">';
        html += '           <div style="margin-top: 5px;font-size: 11px;">' + data.RMK + '</div>';
        html += '       </td>';
        html += '   </tr>';

        html += '</table>';

        console.log(html);

        return html.replaceAll("\n", "<br>");
    }
}