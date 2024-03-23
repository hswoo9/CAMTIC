var purcInit = {

    global: {
        purcItemList : new Array(),
        amtTotal : new Object(),

        claimInfo : new Object(),
        claimItemList : new Array(),
        claimAmtTotal : new Object(),
    },

    purcInit: function(purcSn){
        const data = {
            purcSn: purcSn
        }

        const result = customKendo.fn_customAjax("/purc/getPurcReq.do", data).data;

        const purcItemResult = customKendo.fn_customAjax("/purc/getPurcItemList", data);
        purcInit.global.purcItemList = purcItemResult.list;

        const amtTotalResult = customKendo.fn_customAjax("/purc/getPurcItemAmtTotal", data);
        purcInit.global.amtTotal = amtTotalResult.data;

        /** 1. 구매요청서 데이터 */
        hwpDocCtrl.putFieldText('DOC_NUM', "");
        hwpDocCtrl.putFieldText('TO_DATE', result.PURC_REQ_DATE);
        hwpDocCtrl.putFieldText('DEPT_NAME', result.DEPT_NAME);
        hwpDocCtrl.putFieldText('EMP_NAME', result.EMP_NAME_KR);
        hwpDocCtrl.putFieldText('PURC_REQ_PURPOSE', result.PURC_REQ_PURPOSE);
        let purcTypeText = "법인운영";
        if(result.PURC_TYPE == "R"){
            purcTypeText = "R&D";
        }else if(result.PURC_TYPE == "S"){
            purcTypeText = "비R&D";
        }else if(result.PURC_TYPE == "D"){
            purcTypeText = "엔지니어링";
        }else if(result.PURC_TYPE == "V"){
            purcTypeText = "용역/기타";
        }
        if(result.PJT_NM != null){
            purcTypeText += " "+result.PJT_NM;
        }
        hwpDocCtrl.putFieldText('PURC_TYPE', purcTypeText);

        /** 2. 구매요청서 아이템 리스트*/
        hwpDocCtrl.putFieldText("PURC_ITEM_HTML", " ");
        let htmlData = '';
        htmlData = purcInit.htmlPurcItem(result.VAT);
        hwpDocCtrl.moveToField("PURC_ITEM_HTML", true, true, false);
        hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
    },

    claimInit: function(claimSn){
        const data = {
            claimSn: claimSn
        }

        const result = customKendo.fn_customAjax("/purc/getPurcClaimData", data).data;
        purcInit.global.claimInfo = result;

        const claimItemResult = customKendo.fn_customAjax("/purc/getClaimItemList", data);
        purcInit.global.claimItemList = claimItemResult.list;

        const amtTotalResult = customKendo.fn_customAjax("/purc/getPurcClaimItemAmtTotal", data);
        purcInit.global.claimAmtTotal = amtTotalResult.data;

        /** 1. 구매청구서 데이터 */
        hwpDocCtrl.putFieldText('DOC_NUM', "");
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));
        hwpDocCtrl.putFieldText('TO_DEPT_NAME', result.DEPT_NAME);

        /** 2. 구매청구서 아이템 리스트*/
        hwpDocCtrl.putFieldText("PURC_ITEM_HTML", " ");
        let htmlData = '';
        htmlData = purcInit.htmlClaimItem();
        hwpDocCtrl.moveToField("PURC_ITEM_HTML", true, true, false);
        hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
    },

    htmlPurcItem: function(vatFlag){
        const list = purcInit.global.purcItemList;
        const totMap = purcInit.global.amtTotal;

        var dcPay = 0;
        var html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 50px;"><p style="font-size:12px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 120px;"><p style="font-size:12px;"><b>품 명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 120px;"><p style="font-size:12px;"><b>규격</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>단 가</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 45px;"><p style="font-size:12px;"><b>수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 45px;"><p style="font-size:12px;"><b>단위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>금 액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>업체명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 58px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '   <tr>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>구매</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"><b>'+map.PURC_ITEM_NAME+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>'+map.PURC_ITEM_STD+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>'+map.PURC_ITEM_UNIT_PRICE_COMMA+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>'+map.PURC_ITEM_QTY+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>'+map.PURC_ITEM_UNIT+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>'+map.PURC_ITEM_AMT_COMMA+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"><b>'+map.CRM_NM+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"><b>'+map.RMK+'</b></p></td>';
            html += '   </tr>';
        }
        if(list.length < 8){
            for(let i=0; i<8-list.length; i++){
                html += '   <tr>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '   </tr>';
            }
        }
        html += '   <tr>';
        html += '       <td colspan="9" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>가격조정</b></p></td>';
        // html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>&#8361; '+comma(totMap.DISCOUNT_AMT)+'</b></p></td>';
        html += '   </tr>';

        var discountList = [];
        var popIndex = [];
        for(let i=0; i<list.length; i++){
            var dcFlag = false;
            
            const map = list[i];
            if(!popIndex.includes(i)){
                for(let j = 0 ; j < list.length ; j++){
                    var data = {
                        CRM_SN : map.CRM_SN,
                        CRM_NM : map.CRM_NM,
                        DISCOUNT_AMT : map.DISCOUNT_AMT
                    }
                    if(i != j){
                        if(map.CRM_SN == list[j].CRM_SN){
                            data.DISCOUNT_AMT = Number(data.DISCOUNT_AMT) + Number(list[j].DISCOUNT_AMT);
                            popIndex.push(j);

                            discountList.push(data);

                            //
                        } else {
                            dcFlag = true;
                        }

                    }
                }
                if(dcFlag){

                    var data = {
                        CRM_SN : map.CRM_SN,
                        CRM_NM : map.CRM_NM,
                        DISCOUNT_AMT : map.DISCOUNT_AMT
                    }

                    discountList.push(data);
                }
            }
        }

        for(let i=0; i<discountList.length; i++){
            const map = discountList[i];
            html += '   <tr>';
            html += '       <td colspan="7" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>'+map.CRM_NM+'</b></p></td>';
            html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>&#8361; -'+comma(map.DISCOUNT_AMT)+'</b></p></td>';
            html += '   </tr>';

            dcPay += Number(map.DISCOUNT_AMT);
        }

        var sum = 0;
        if(vatFlag == "N"){
            sum = (Number(totMap.TOTAL_SUM_UNCOMMA) + Number(totMap.TOTAL_SUM_UNCOMMA / 10)) - Number(dcPay);

        } else {
            sum = Number(totMap.TOTAL_SUM_UNCOMMA) - Number(dcPay);
        }


        html += '   <tr>';
        html += '       <td colspan="7" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>합계 (VAT포함)</b></p></td>';

        html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>&#8361; '+comma(sum)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colSpan="9" style="height:50px;background-color:#FFFFFF; text-align:center;"></td>';
        html += '   </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlClaimItem: function(){
        const claimInfo = purcInit.global.claimInfo;
        const list = purcInit.global.claimItemList;
        const totMap = purcInit.global.claimAmtTotal;

        var dcPay = 0;
        var html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 145px;"><p style="font-size:12px;"><b>품 명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 145px;"><p style="font-size:12px;"><b>규격</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>단 가</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 45px;"><p style="font-size:12px;"><b>수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 45px;"><p style="font-size:12px;"><b>단위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 120px;"><p style="font-size:12px;"><b>금 액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 98px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '   <tr>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"><b>'+map.ITEM_NM+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>'+map.ITEM_STD+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>'+map.ITEM_UNIT_AMT_COMMA+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>'+map.ITEM_EA+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>'+map.ITEM_UNIT+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>'+map.ITEM_AMT_COMMA+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>'+map.ITEM_ETC+'</b></p></td>';
            html += '   </tr>';

            dcPay += Number(map.DIF_AMT);
        }
        if(list.length < 8){
            for(let i=0; i<8-list.length; i++){
                html += '   <tr>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:12px;"></p></td>';
                html += '   </tr>';
            }
        }

        dcPay = dcPay * -1;
        html += '   <tr>';
        html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>가 격 조 정</b></p></td>';
        html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(dcPay)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>소       계</b></p></td>';
        html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(totMap.TOTAL_SUM_COMMA_C)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>세       액</b></p></td>';
        html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(totMap.TOTAL_SUM_COMMA_B)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>합       계</b></p></td>';
        html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(totMap.TOTAL_SUM_COMMA_A)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="7" style="height:50px;background-color:#FFFFFF; text-align:left;">';
        html += '       <div style="margin-top: 20px"></div>';
        html += '       <p>&nbsp;&nbsp;&nbsp;&nbsp;    구 매 목 적 : '+claimInfo.PURC_REQ_PURPOSE+'</p>';
        html += '       <p>&nbsp;&nbsp;&nbsp;&nbsp;    구 매 업 체 : '+claimInfo.CRM_NM+'</p>';
        html += '       <p>&nbsp;&nbsp;&nbsp;&nbsp;    프 로 젝 트 : '+claimInfo.PJT_NM+'</p>';
        html += '       <p>&nbsp;&nbsp;&nbsp;&nbsp;     비     고 : '+(claimInfo.ETC == null ? '' : claimInfo.ETC)+'</p>';
        html += '       <div style="margin-bottom: 5px"></div>';
        html += '   </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}