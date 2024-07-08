var purcManagement = {

    fn_defaultScript: function(){
        this.pageSet();
        this.dataSet();
    },

    pageSet: function(){
        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());
        $("#year").change(function(){
            purcManagement.dataSet();
        });
    },

    dataSet: function(){
        const year = $("#year").val();

        const today = new Date();
        const nowYear = today.getFullYear();

        let countMonth = 12;
        if(year == nowYear){
            countMonth = today.getMonth() + 1;
        }

        const claimList = customKendo.fn_customAjax("/cam_achieve/getPurcClaimList", {year}).list;
        console.log("claimList", claimList);

        const claimDetList = customKendo.fn_customAjax("/cam_achieve/getPurcClaimDetList", {year}).list;
        console.log("claimDetList", claimDetList);

        let totAmt = 0;
        let purcCountR = 0;
        let totAmtR = 0;
        let purcCountS = 0;
        let totAmtS = 0;
        let purcCountD = 0;
        let totAmtD = 0;
        let purcCountV = 0;
        let totAmtV = 0;
        let purcCountC = 0;
        let totAmtC = 0;
        let contCnt = 0;
        for(let i=0; i<claimList.length; i++){
            const map = claimList[i];
            totAmt += Number(map.TOT_PURC_ITEM_AMT || 0);

            if(map.PURC_TYPE == "R"){
                purcCountR ++;
                totAmtR += Number(map.TOT_PURC_ITEM_AMT || 0);
            }else if(map.PURC_TYPE == "S"){
                purcCountS ++;
                totAmtS += Number(map.TOT_PURC_ITEM_AMT || 0);
            }else if(map.PURC_TYPE == "D"){
                purcCountD ++;
                totAmtD += Number(map.TOT_PURC_ITEM_AMT || 0);
            }else if(map.PURC_TYPE == "V"){
                purcCountV ++;
                totAmtV += Number(map.TOT_PURC_ITEM_AMT || 0);
            }else if(map.PURC_TYPE == ""){
                purcCountC ++;
                totAmtC += Number(map.TOT_PURC_ITEM_AMT || 0);
            }

            if(map.CONT_YN == "Y"){
                contCnt ++;
            }
        }
        const paramsA = {
            purcCountR: purcCountR,
            totAmtR: totAmtR,
            purcCountS: purcCountS,
            totAmtS: totAmtS,
            purcCountD: purcCountD,
            totAmtD: totAmtD,
            purcCountV: purcCountV,
            totAmtV: totAmtV,
            purcCountC: purcCountC,
            totAmtC: totAmtC
        }

        let productCountP = 0;
        let productCountO = 0;
        let productCountC = 0;
        let productCountL = 0;
        let productCountPA1 = 0;
        let productCountPA2 = 0;
        let productCountPA3 = 0;
        let productCountOA1 = 0;
        let productCountOA2 = 0;
        let productCountOA3 = 0;
        let productCountCA1 = 0;
        let productCountCA2 = 0;
        let productCountCA3 = 0;
        let productCountLA1 = 0;
        let productCountLA2 = 0;
        let productCountLA3 = 0;
        for(let i=0; i<claimDetList.length; i++){
            const map = claimDetList[i];

            if(map.PURC_ITEM_TYPE == "P"){
                productCountP++;
                if(map.PRODUCT_A == "1"){
                    productCountPA1++;
                }else if(map.PRODUCT_A == "2"){
                    productCountPA2++;
                }else if(map.PRODUCT_A == "3"){
                    productCountPA3++;
                }
            }else if(map.PURC_ITEM_TYPE == "O"){
                productCountO++;
                if(map.PRODUCT_A == "1"){
                    productCountOA1++;
                }else if(map.PRODUCT_A == "2"){
                    productCountOA2++;
                }else if(map.PRODUCT_A == "3"){
                    productCountOA3++;
                }
            }else if(map.PURC_ITEM_TYPE == "C"){
                productCountC++;
                if(map.PRODUCT_A == "1"){
                    productCountCA1++;
                }else if(map.PRODUCT_A == "2"){
                    productCountCA2++;
                }else if(map.PRODUCT_A == "3"){
                    productCountCA3++;
                }
            }else if(map.PURC_ITEM_TYPE == "L"){
                productCountL++;
                if(map.PRODUCT_A == "1"){
                    productCountLA1++;
                }else if(map.PRODUCT_A == "2"){
                    productCountLA2++;
                }else if(map.PRODUCT_A == "3"){
                    productCountLA3++;
                }
            }
        }

        const paramsB = {
            productCountP: productCountP,
            productCountO: productCountO,
            productCountC: productCountC,
            productCountL: productCountL,
            productCountPA1: productCountPA1,
            productCountPA2: productCountPA2,
            productCountPA3: productCountPA3,
            productCountOA1: productCountOA1,
            productCountOA2: productCountOA2,
            productCountOA3: productCountOA3,
            productCountCA1: productCountCA1,
            productCountCA2: productCountCA2,
            productCountCA3: productCountCA3,
            productCountLA1: productCountLA1,
            productCountLA2: productCountLA2,
            productCountLA3: productCountLA3
        }

        this.tableASet(year, countMonth, claimList, totAmt, contCnt);
        this.tableBSet(year, countMonth, claimList, totAmt, paramsA);
        this.tableCSet(claimDetList, paramsB);
        this.tableDSet(claimDetList, paramsB);
    },

    tableASet: function(year, countMonth, list, amt, contCnt){
        $("#tableA").html("");
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">구분</th>';
        html += '   <th class="th-color">구매거래건수</th>';
        html += '   <th class="th-color">구매거래금액</th>';
        html += '   <th class="th-color">(월평균) 구매거래 건 수</th>';
        html += '   <th class="th-color">계약건수</th>';
        html += '</tr>';

        html += '<tr>';
        html += '   <th class="th-color">'+year+'년</th>';
        html += '   <td>'+list.length+'건</td>';
        html += '   <td>'+Math.floor(amt / 1000000)+'백만원</td>';
        html += '   <td>'+Math.floor(list.length / Number(countMonth))+'건</td>';
        html += '   <td>'+contCnt+'건</td>';
        html += '</tr>';
        $("#tableA").html(html);
    },

    tableBSet(year, countMonth, list, amt, params){
        $("#tableB").html("");
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">사업구분</th>';
        html += '   <th class="th-color">거래금액</th>';
        html += '   <th class="th-color">거래 건 수</th>';
        html += '   <th class="th-color">(월평균) 거래 건 수</th>';
        html += '</tr>';

        let sum =
            Math.floor(params.totAmtR / 1000000) +
            Math.floor(params.totAmtS / 1000000) +
            Math.floor(params.totAmtD / 1000000) +
            Math.floor(params.totAmtV / 1000000) +
            Math.floor(params.totAmtC / 1000000);

        let count =
            Math.floor(params.purcCountR / Number(countMonth)) +
            Math.floor(params.purcCountS / Number(countMonth)) +
            Math.floor(params.purcCountD / Number(countMonth)) +
            Math.floor(params.purcCountV / Number(countMonth)) +
            Math.floor(params.purcCountC / Number(countMonth))

        html += '<tr>';
        html += '   <td style="text-align: center">R&D</td>';
        html += '   <td>'+Math.floor(params.totAmtR / 1000000)+'백만원</td>';
        html += '   <td>'+params.purcCountR+'건</td>';
        html += '   <td>'+Math.floor(params.purcCountR / Number(countMonth))+'건</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td style="text-align: center">비R&D</td>';
        html += '   <td>'+Math.floor(params.totAmtS / 1000000)+'백만원</td>';
        html += '   <td>'+params.purcCountS+'건</td>';
        html += '   <td>'+Math.floor(params.purcCountS / Number(countMonth))+'건</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td style="text-align: center">엔지니어링</td>';
        html += '   <td>'+Math.floor(params.totAmtD / 1000000)+'백만원</td>';
        html += '   <td>'+params.purcCountD+'건</td>';
        html += '   <td>'+Math.floor(params.purcCountD / Number(countMonth))+'건</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td style="text-align: center">용역/기타</td>';
        html += '   <td>'+Math.floor(params.totAmtV / 1000000)+'백만원</td>';
        html += '   <td>'+params.purcCountV+'건</td>';
        html += '   <td>'+Math.floor(params.purcCountV / Number(countMonth))+'건</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td style="text-align: center">법인운영</td>';
        html += '   <td>'+Math.floor(params.totAmtC / 1000000)+'백만원</td>';
        html += '   <td>'+params.purcCountC+'건</td>';
        html += '   <td>'+Math.floor(params.purcCountC / Number(countMonth))+'건</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <th class="th-color">합계</th>';
        html += '   <th class="th-color" style="text-align:left">'+sum+'백만원</th>';
        html += '   <th class="th-color" style="text-align:left">'+list.length+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+count+'건</th>';
        html += '</tr>';
        $("#tableB").html(html);
    },

    tableCSet: function(list, params){
        $("#tableC").html("");
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">구분</th>';
        html += '   <th class="th-color">구매</th>';
        html += '   <th class="th-color">외주</th>';
        html += '   <th class="th-color">시설공사</th>';
        html += '   <th class="th-color">리스</th>';
        html += '   <th class="th-color">합계</th>';
        html += '</tr>';

        let totCount = list.length;
        let productCountP = params.productCountP;
        let productCountO = params.productCountO;
        let productCountC = params.productCountC;
        let productCountL = params.productCountL;

        let perP = (Number(productCountP) / Number(totCount) * 100).toFixed(1);
        let perO = (Number(productCountO) / Number(totCount) * 100).toFixed(1);
        let perC = (Number(productCountC) / Number(totCount) * 100).toFixed(1);
        let perL = (100 - Number(perP) - Number(perO) - Number(perC)).toFixed(1);

        html += '<tr>';
        html += '   <th class="th-color">품목 건 수</th>';
        html += '   <td>'+productCountP+'건</td>';
        html += '   <td>'+productCountO+'건</td>';
        html += '   <td>'+productCountC+'건</td>';
        html += '   <td>'+productCountL+'건</td>';
        html += '   <td>'+list.length+'건</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <th class="th-color">비중(%)</th>';
        html += '   <td>'+perP+'%</td>';
        html += '   <td>'+perO+'%</td>';
        html += '   <td>'+perC+'%</td>';
        html += '   <td>'+perL+'%</td>';
        html += '   <td>100%</td>';
        html += '</tr>';
        $("#tableC").html(html);
    },

    tableDSet: function(list, params){
        $("#tableD").html("");
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">구분</th>';
        html += '   <th class="th-color">구매</th>';
        html += '   <th class="th-color">외주</th>';
        html += '   <th class="th-color">시설공사</th>';
        html += '   <th class="th-color">리스</th>';
        html += '   <th class="th-color">합계</th>';
        html += '</tr>';

        html += '<tr>';
        html += '   <th class="th-color">자산</th>';
        html += '   <td>'+params.productCountPA1+'건</td>';
        html += '   <td>'+params.productCountOA1+'건</td>';
        html += '   <td>'+params.productCountCA1+'건</td>';
        html += '   <td>'+params.productCountLA1+'건</td>';
        html += '   <td>0</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <th class="th-color">非 자산</th>';
        html += '   <td>'+params.productCountPA2+'건</td>';
        html += '   <td>'+params.productCountOA2+'건</td>';
        html += '   <td>'+params.productCountCA2+'건</td>';
        html += '   <td>'+params.productCountLA2+'건</td>';
        html += '   <td>0</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <th class="th-color">캠아이템</th>';
        html += '   <td>'+params.productCountPA3+'건</td>';
        html += '   <td>'+params.productCountOA3+'건</td>';
        html += '   <td>'+params.productCountCA3+'건</td>';
        html += '   <td>'+params.productCountLA3+'건</td>';
        html += '   <td>0</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <th class="th-color">합계</th>';
        html += '   <th class="th-color" style="text-align:left">'+params.productCountP+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+params.productCountO+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+params.productCountC+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+params.productCountL+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+list.length+'건</th>';
        html += '</tr>';
        $("#tableD").html(html);
    },
}