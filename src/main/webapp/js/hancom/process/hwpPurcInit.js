var purcInit = {

    global: {
        purcInfo : new Array(),
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
        purcInit.global.purcInfo = result;

        const purcItemResult = customKendo.fn_customAjax("/purc/getPurcItemList", data);
        purcInit.global.purcItemList = purcItemResult.list;

        const amtTotalResult = customKendo.fn_customAjax("/purc/getPurcItemAmtTotal", data);
        purcInit.global.amtTotal = amtTotalResult.data;

        /** 1. 구매요청서 데이터 */
        hwpDocCtrl.putFieldText('DOC_NUM', "");
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(2));
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

        if(result.purcSn != null){
            const purcInfo = customKendo.fn_customAjax("/purc/getPurcReq.do", {purcSn: result.purcSn}).data;
            purcInit.global.purcInfo = purcInfo;
        }

        /** 1. 구매청구서 데이터 */
        if(purcInit.global.purcInfo != null){
            hwpDocCtrl.putFieldText('PURC_DOC_NUM', purcInit.global.purcInfo.DOC_NO);
        }
        hwpDocCtrl.putFieldText('DOC_NUM', "");
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));
        hwpDocCtrl.putFieldText('TO_DEPT_NAME', result.CLAIM_DEPT_NAME);

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
        var page = Math.ceil(Number(list.length / 13)) ;

        var index = 0;
        var itemCnt = list.length;
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 40px;"><p style="font-size:12px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 100px;"><p style="font-size:12px;"><b>품 명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 40px;"><p style="font-size:12px;"><b>규 격</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 70px;"><p style="font-size:12px;"><b>단 가</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 40px;"><p style="font-size:12px;"><b>수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 40px;"><p style="font-size:12px;"><b>단위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 70px;"><p style="font-size:12px;"><b>공급가액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 70px;"><p style="font-size:12px;"><b>세액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 70px;"><p style="font-size:12px;"><b>금액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>업체명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 58px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';
        for(var cnt = 0 ; cnt < page ; cnt++){
            var tIdx = list.length;
            if(13 < itemCnt){
                tIdx = 13;
            } else if(cnt == 0){
                tIdx = 13;
            }

            for(let i=0; i < tIdx; i++){
                const map = list[index];
                var absFlag = true;

                if(index < list.length){
                    if(map.PURC_ITEM_AMT < 0){
                        absFlag = false;
                    }

                    let amt = uncomma(map.PURC_ITEM_UNIT_PRICE * uncomma(map.PURC_ITEM_QTY));
                    let sum2 = Math.round(amt/10);
                    let sum3 = Math.round(amt / 1.1);
                    let sum4 = amt - sum3;

                    let supAmt = 0;
                    let vatAmt = 0;
                    let itemAmt = 0;

                    if(purcInit.global.purcInfo.VAT == "N"){
                        supAmt = comma(amt);
                        vatAmt = comma(sum2);
                        itemAmt = comma(Number(amt)+Number(sum2));
                    }else if(purcInit.global.purcInfo.VAT == "Y"){
                        supAmt = comma(sum3);
                        vatAmt = comma(sum4);
                        itemAmt = comma(amt);
                    }else if(purcInit.global.purcInfo.VAT == "D"){
                        supAmt = comma(amt);
                        vatAmt = "0";
                        itemAmt = comma(amt);
                    }

                    if(!absFlag){
                        if(supAmt != 0){
                            supAmt = "-" + supAmt;
                        }

                        if(vatAmt != 0){
                            vatAmt = "-" + vatAmt;
                        }

                        if(itemAmt != 0){
                            itemAmt = "-" + itemAmt;
                        }
                    }
                    var productA = "";
                    if(map.PURC_ITEM_TYPE == "P"){
                        productA = "구매";
                    } else if (map.PURC_ITEM_TYPE == "O"){
                        productA = "외주";
                    } else if (map.PURC_ITEM_TYPE == "C"){
                        productA = "시설/공사";
                    } else if(map.PURC_ITEM_TYPE == "L"){
                        productA = "리스";
                    }
                    html += '   <tr>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+productA+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"><b>'+map.PURC_ITEM_NAME+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.PURC_ITEM_STD+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b>'+map.PURC_ITEM_UNIT_PRICE_COMMA+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b>'+map.PURC_ITEM_QTY+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.PURC_ITEM_UNIT+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b>'+supAmt+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b>'+vatAmt+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b>'+itemAmt+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"><b>'+map.CRM_NM+'</b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"><b>'+map.RMK+'</b></p></td>';
                    html += '   </tr>';
                }
                else {
                    html += '   <tr>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"><b></b></p></td>';
                    html += '   </tr>';
                }


                index++;
            }
            // if(list.length < 8){
            //     for(let i=0; i<8-list.length; i++){
            //         html += '   <tr>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
            //         html += '   </tr>';
            //     }
            // }

            if(13 < itemCnt){
                itemCnt -= 13;
            }

        }

        // html += '   <tr>';
        // html += '       <td colspan="9" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>가격조정</b></p></td>';
        // // html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>&#8361; '+comma(totMap.DISCOUNT_AMT)+'</b></p></td>';
        // html += '   </tr>';

        var popIndex = [];

        var listArr = [];
        for(let i=0; i<list.length; i++){
            var listItem = {
                CRM_SN : list[i].CRM_SN,
                CRM_NM : list[i].CRM_NM,
                DISCOUNT_AMT : 0,
                TOT_AMT : 0
            }

            if(!popIndex.includes(list[i].CRM_SN)){
                listArr.push(listItem);
                popIndex.push(list[i].CRM_SN);
            }
        }

        for(let i=0; i<listArr.length; i++){
            for( let j=0; j < list.length; j++){
                console.log(listArr)
                if(listArr[i].CRM_SN == list[j].CRM_SN){
                    listArr[i].DISCOUNT_AMT += Number(list[j].DISCOUNT_AMT);
                    listArr[i].TOT_AMT += Number(list[j].PURC_ITEM_AMT);
                }
            }
        }

        for(let i=0; i<listArr.length; i++){
            const map = listArr[i];
            html += '   <tr>';
            html += '       <td colspan="8" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>'+map.CRM_NM+'</b></p></td>';
            html += '       <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>&#8361; '+comma(map.TOT_AMT)+'</b></p></td>';
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
        html += '       <td colspan="8" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>합계</b></p></td>';

        html += '       <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;"><b>&#8361; '+comma(totMap.TOTAL_SUM_UNCOMMA)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colSpan="11" style="height:50px;background-color:#FFFFFF; text-align:center;"></td>';
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
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left;line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="font-family:굴림; border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 40px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 120px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>품 명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>규 격</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>단가</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 35px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 45px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>단위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 75px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>공급가액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 70px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>세액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>금액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 58px;"><p style="font-weight: bold; font-family:굴림; font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            const map = list[i];

            var absFlag = true;

            if(map.ITEM_AMT < 0){
                absFlag = false;
            }

            let amt = uncomma(Number(map.ITEM_UNIT_AMT) * Number(map.ITEM_EA));
            let sum2 = Math.round(amt/10);
            let sum3 = Math.round(amt / 1.1);
            let sum4 = amt - sum3;

            let supAmt = 0;
            let vatAmt = 0;
            let itemAmt = 0;

            if(purcInit.global.claimInfo.VAT == "N"){
                supAmt = comma(amt);
                vatAmt = comma(sum2);
                itemAmt = comma(Number(amt)+Number(sum2));
            }else if(purcInit.global.claimInfo.VAT == "Y"){
                supAmt = comma(sum3);
                vatAmt = comma(sum4);
                itemAmt = comma(amt);
            }else if(purcInit.global.claimInfo.VAT == "D"){
                supAmt = comma(amt);
                vatAmt = "0";
                itemAmt = comma(amt);
            }

            if(absFlag == false){
                if(supAmt != 0){
                    supAmt = "-" + supAmt;
                }

                if(vatAmt != 0){
                    vatAmt = "-" + vatAmt;
                }

                if(itemAmt != 0){
                    itemAmt = "-" + itemAmt;
                }
            }

            var productA = "";
            if(map.PURC_ITEM_TYPE == "P"){
                productA = "구매";
            } else if (map.PURC_ITEM_TYPE == "O"){
                productA = "외주";
            } else if (map.PURC_ITEM_TYPE == "C"){
                productA = "시설/공사";
            } else if(map.PURC_ITEM_TYPE == "L"){
                productA = "리스";
            }

            html += '   <tr>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림; font-weight: bold; font-size:12px;">'+productA+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-weight: bold; font-size:12px;">'+map.ITEM_NM+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림; font-weight: bold; font-size:12px;">'+map.ITEM_STD+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-family:굴림; font-weight: bold; font-size:12px;  margin-right:5px;">'+map.ITEM_UNIT_AMT_COMMA+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림; font-weight: bold; font-size:12px;  margin-right:5px;">'+map.ITEM_EA+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림; font-weight: bold; font-size:12px;">'+map.ITEM_UNIT+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-family:굴림; font-weight: bold; font-size:12px;  margin-right:5px;">'+map.PURC_SUP_AMT_COMMA+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-family:굴림; font-weight: bold; font-size:12px;  margin-right:5px;">'+map.PURC_VAT_AMT_COMMA+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-family:굴림; font-weight: bold; font-size:12px;  margin-right:5px;">'+map.ITEM_AMT_COMMA+'</p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림; font-weight: bold; font-size:12px;">'+map.ITEM_ETC+'</p></td>';
            html += '   </tr>';

            dcPay += Number(map.DIF_AMT);
        }
        if(list.length < 8){
            for(let i=0; i<8-list.length; i++){
                html += '   <tr>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림; font-size:12px;"></p></td>';
                html += '   </tr>';
            }
        }

        dcPay = dcPay * -1;
        // html += '   <tr>';
        // html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>가 격 조 정</b></p></td>';
        // html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(dcPay)+'</b></p></td>';
        // html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="7" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-weight:bold; font-family:굴림; font-size:12px;"><b>공 급 가 액</b></p></td>';
        html += '       <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-weight:bold; font-family:굴림; font-size:12px; margin-right:10px;"><b>&#8361; '+comma(purcInit.global.claimInfo.EST_AMT)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="7" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-weight:bold; font-family:굴림; font-size:12px;"><b>세       액</b></p></td>';
        html += '       <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-weight:bold; font-family:굴림; font-size:12px; margin-right:10px;"><b>&#8361; '+comma(purcInit.global.claimInfo.VAT_AMT)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="7" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-weight:bold; font-family:굴림; font-size:12px;"><b>합       계</b></p></td>';
        html += '       <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-weight:bold; font-family:굴림; font-size:12px; margin-right:10px;"><b>&#8361; '+comma(purcInit.global.claimInfo.TOT_AMT)+'</b></p></td>';
        html += '   </tr>';
        var priPay = ""
        if(claimInfo.PRI_PAY == 'N'){
            priPay = "미해당"
        } else {
            priPay = "해당"
        }

        var contYn = ""
        if(claimInfo.CONT_YN == 'N'){
            contYn = "미해당"
        } else {
            contYn = "해당"
        }

        html += '   <tr>';
        html += '       <td colspan="10" style="background-color:#FFFFFF; text-align:left;">';
        html += '       <div style="margin-top: 20px; font-size : 12px; font-family:굴림;">';
        html += '       &nbsp;&nbsp;&nbsp;&nbsp;    구 입 목 적 : '+claimInfo.PURC_REQ_PURPOSE+'<br>';
        html += '       &nbsp;&nbsp;&nbsp;&nbsp;    거 래 업 체 : '+claimInfo.CRM_NM+'<br>';
        html += '       &nbsp;&nbsp;&nbsp;&nbsp;    관 련 사 업 : '+(claimInfo.PJT_NM || '법인운영')+'<br>';
        html += '       &nbsp;&nbsp;&nbsp;&nbsp;    선 지 급 여 부 : '+priPay+'<br>';
        html += '       &nbsp;&nbsp;&nbsp;&nbsp;    계 약 진 행 여 부 : '+contYn+'<br>';
        html += '       &nbsp;&nbsp;&nbsp;&nbsp;    납 품 예 정 일 : '+(claimInfo.GOODS_DT.split("-")[0] + "년 " + claimInfo.GOODS_DT.split("-")[1] + "월 " + claimInfo.GOODS_DT.split("-")[2] + "일" || '')+'<br>';
        html += '       &nbsp;&nbsp;&nbsp;&nbsp;    비     고  : '+(claimInfo.CLAIM_ETC == null ? '' : claimInfo.CLAIM_ETC)+'<br>';
        html += '       </div>';
        html += '       <div style="margin-bottom: 5px"></div>';
        html += '   </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        console.log(html);
        return html.replaceAll("\n", "<br>");
    },

    htmlOrderItem: function(){
        let ip = "";
        if(serverName == "218.158.231.184" || serverName == "new.camtic.or.kr"){
            ip = "http://218.158.231.184";
        }else{
            ip = "http://218.158.231.184";
        }

        const orderInfo = purcInit.global.orderInfo;
        const list = purcInit.global.orderItemList;
        const totMap = purcInit.global.claimAmtTotal;

        var dcPay = 0;
        var html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 185px;"><p style="font-size:12px;"><b>품 명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 175px;"><p style="font-size:12px;"><b>규 격</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 60px;"><p style="font-size:12px;"><b>단가</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 40px;"><p style="font-size:12px;"><b>수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 60px;"><p style="font-size:12px;"><b>단위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>금액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 78px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            const map = list[i];

            var absFlag = true;

            if(map.ITEM_AMT < 0){
                absFlag = false;
            }

            html += '   <tr>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"><b>'+map.ITEM_NM+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.ITEM_STD+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b>'+comma(map.ITEM_UNIT_AMT)+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b>'+map.ITEM_EA+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.ITEM_UNIT+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:10px;"><b>'+comma(list[i].ITEM_AMT)+'</b></p></td>';
            html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"><b>'+map.ITEM_ETC+'</b></p></td>';
            html += '   </tr>';

            dcPay += Number(map.DIF_AMT);
        }
        if(list.length < 8){
            for(let i=0; i<8-list.length; i++){
                html += '   <tr>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '       <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-size:10px;"></p></td>';
                html += '   </tr>';
            }
        }

        dcPay = dcPay * -1;
        // html += '   <tr>';
        // html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>가 격 조 정</b></p></td>';
        // html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(dcPay)+'</b></p></td>';
        // html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>소&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;계</b></p></td>';
        html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(orderInfo.EST_AMT)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>세&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;액</b></p></td>';
        html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(orderInfo.VAT_AMT)+'</b></p></td>';
        html += '   </tr>';

        html += '   <tr>';
        html += '       <td colspan="5" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>합&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;계</b></p></td>';
        html += '       <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; '+comma(orderInfo.TOT_AMT)+'</b></p></td>';
        html += '   </tr>';
        var priPay = ""
        if(orderInfo.PRI_PAY == 'N'){
            priPay = "미해당"
        } else {
            priPay = "해당"
        }

        var contYn = ""
        if(orderInfo.CONT_YN == 'N'){
            contYn = "미해당"
        } else {
            contYn = "해당"
        }

        html += '   <tr>';
        html += '       <td colspan="7" style="background-color:#FFFFFF; text-align:left;">';
        html += '       <div style="margin-top: 5px; font-size: 10px">';
        html += '       '+orderInfo.SIGNIFICANT == "" || orderInfo.SIGNIFICANT == null ? "" : orderInfo.SIGNIFICANT.replaceAll("\n", "<br>")+'';
        html += '       </div>';
        html += '   </tr>';
        html += '   <tr style="border-bottom: white">';
        html += '       <td colspan="7" style="background-color:#FFFFFF; text-align:left;">';
        html += '       <div style="margin-top: 5px; font-size: 8px">';
        html += '       &nbsp;[물품의 검수] 판매자는 상품을 인도할 때 내부 수입검사원으로부터 상품 검수를 받아야하고, 상품의 인도는 이 검수에 합격함과 동시에 이루어지는 것으로 한다.';
        html += '       <br><br>&nbsp;[하자담보책임] 판매자는 상품에 대해 인도 후 1년간 인도 전의 원인으로 발생한 물품의 품질불량, 수량부족, 변질 등에 대해서는 책임을 진다.';
        html += '       <br><br>&nbsp;[대금의 지급] 당 법인는 상품 대금을 인도일부터 당 법인 지급 기준에 의해 판매자에게 지급하고, 선금이 필요한 경우에는 선금 지급 보증서를 발행하여, 세금계산서, 거래명세표와 함께당법인에 청구하여야 한다.';
        html += '       </div>';
        html += '   </tr>';

        const userInfo = getUser(orderInfo.CLAIM_EMP_SEQ);
        html += '   <tr style="border-spacing: 0px; border: white">';
        html += '       <td colspan="4" style="height:45px;background-color:#FFFFFF; text-align:center;"></td>';
        html += '       <td style="height:45px;background-color:#FFFFFF; text-align:center; border: 1px solid black"><p style="font-size:12px;">확 인</p></td>';
        html += '       <td style="height:45px;background-color:#FFFFFF; text-align:center; border-top: 1px solid black"><p style="font-size:12px;"><b>'+orderInfo.CLAIM_EMP_NAME+'</b></p></td>';
        if(userInfo.FILE_PATH != null){
            html += '       <td style="height:45px;background-color:#FFFFFF; text-align:center; border-top: 1px solid black">';
            html += '<img id=\"signPhotoView\" style=\"position:relative;\" width=\"70px;\" src=\"'+ip+userInfo.FILE_PATH+'\">';
            html += '</td>';
        }else{
            html += '       <td style="height:45px;background-color:#FFFFFF; text-align:center; border-top: 1px solid black"><p style="font-size:12px;"><b>'+orderInfo.CLAIM_EMP_NAME+'</b></p></td>';
        }
        html += '   </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        console.log(html)
        return html.replaceAll("\n", "<br>");
    }
}