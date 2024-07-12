var purcCrmManagement = {
    fn_defaultScript: function(){
        this.pageSet();
        this.dataSet();
    },

    pageSet: function(){
        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());
        $("#year").change(function(){
            purcCrmManagement.dataSet();
        });
    },

    dataSet: function(){
        const year = $("#year").val();
        this.tableASet(year);
        this.tableBSet(year);
        this.tableCSet(year);
        this.tableDEFSet(year);
    },

    tableASet: function(year){
        const map = customKendo.fn_customAjax("/cam_achieve/getPurcCrmAchieveData", {year: year}).data;
        console.log("tableA Map", map);

        $("#tableA").html("");
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">구분</th>';
        html += '   <th class="th-color">1회</th>';
        html += '   <th class="th-color">5회미만</th>';
        html += '   <th class="th-color">10회미만</th>';
        html += '   <th class="th-color">20회미만</th>';
        html += '   <th class="th-color">50회미만</th>';
        html += '   <th class="th-color">100회미만</th>';
        html += '   <th class="th-color">100회이상</th>';
        html += '   <th class="th-color">합계</th>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td>1백만원 미만</td>';
        html += '   <td>'+map.A1+'건</td>';
        html += '   <td>'+map.A2+'건</td>';
        html += '   <td>'+map.A3+'건</td>';
        html += '   <td>'+map.A4+'건</td>';
        html += '   <td>'+map.A5+'건</td>';
        html += '   <td>'+map.A6+'건</td>';
        html += '   <td>'+map.A7+'건</td>';
        let sumA = Number(map.A1) + Number(map.A2) + Number(map.A3) + Number(map.A4) + Number(map.A5) + Number(map.A6) + Number(map.A7);
        html += '   <td>'+sumA+'건</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td>1천만원 미만</td>';
        html += '   <td>'+map.B1+'건</td>';
        html += '   <td>'+map.B2+'건</td>';
        html += '   <td>'+map.B3+'건</td>';
        html += '   <td>'+map.B4+'건</td>';
        html += '   <td>'+map.B5+'건</td>';
        html += '   <td>'+map.B6+'건</td>';
        html += '   <td>'+map.B7+'건</td>';
        let sumB = Number(map.B1) + Number(map.B2) + Number(map.B3) + Number(map.B4) + Number(map.B5) + Number(map.B6) + Number(map.B7);
        html += '   <td>'+sumB+'건</td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td>1천만원 이상</td>';
        html += '   <td>'+map.C1+'건</td>';
        html += '   <td>'+map.C2+'건</td>';
        html += '   <td>'+map.C3+'건</td>';
        html += '   <td>'+map.C4+'건</td>';
        html += '   <td>'+map.C5+'건</td>';
        html += '   <td>'+map.C6+'건</td>';
        html += '   <td>'+map.C7+'건</td>';
        let sumC = Number(map.C1) + Number(map.C2) + Number(map.C3) + Number(map.C4) + Number(map.C5) + Number(map.C6) + Number(map.C7);
        html += '   <td>'+sumC+'건</td>';
        html += '</tr>';
        let sum1 = Number(map.A1) + Number(map.B1) + Number(map.C1);
        let sum2 = Number(map.A2) + Number(map.B2) + Number(map.C2);
        let sum3 = Number(map.A3) + Number(map.B3) + Number(map.C3);
        let sum4 = Number(map.A4) + Number(map.B4) + Number(map.C4);
        let sum5 = Number(map.A5) + Number(map.B5) + Number(map.C5);
        let sum6 = Number(map.A6) + Number(map.B6) + Number(map.C6);
        let sum7 = Number(map.A7) + Number(map.B7) + Number(map.C7);
        let totSum = Number(sum1) + Number(sum2) + Number(sum3) + Number(sum4) + Number(sum5) + Number(sum6) + Number(sum7);
        html += '<tr>';
        html += '   <th class="th-color">합 계</th>';
        html += '   <th class="th-color" style="text-align:left">'+sum1+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+sum2+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+sum3+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+sum4+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+sum5+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+sum6+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+sum7+'건</th>';
        html += '   <th class="th-color" style="text-align:left">'+totSum+'건</th>';
        html += '</tr>';
        let per2 = (Number(sum2) / Number(totSum) * 100).toFixed(1);
        let per3 = (Number(sum3) / Number(totSum) * 100).toFixed(1);
        let per4 = (Number(sum4) / Number(totSum) * 100).toFixed(1);
        let per5 = (Number(sum5) / Number(totSum) * 100).toFixed(1);
        let per6 = (Number(sum6) / Number(totSum) * 100).toFixed(1);
        let per7 = (Number(sum7) / Number(totSum) * 100).toFixed(1);
        let per1 = (100 - Number(per2) - Number(per3) - Number(per4) - Number(per5) - Number(per6) - Number(per7)).toFixed(1);
        html += '<tr>';
        html += '   <td>비중(%)</td>';
        html += '   <td>'+per1+'%</td>';
        html += '   <td>'+per2+'%</td>';
        html += '   <td>'+per3+'%</td>';
        html += '   <td>'+per4+'%</td>';
        html += '   <td>'+per5+'%</td>';
        html += '   <td>'+per6+'%</td>';
        html += '   <td>'+per7+'%</td>';
        html += '   <td>100%</td>';
        html += '</tr>';
        $("#tableA").html(html);
    },

    tableBSet: function(year){
        const map = customKendo.fn_customAjax("/cam_achieve/getPurcCrmLocAchieveData", {year: year}).data;
        console.log("tableB Map", map);

        $("#tableB").html("");
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">거래횟수별</th>';
        html += '   <th class="th-color">도내</th>';
        html += '   <th class="th-color">비율</th>';
        html += '   <th class="th-color">도외</th>';
        html += '   <th class="th-color">비율</th>';
        html += '   <th class="th-color">해외</th>';
        html += '   <th class="th-color">비율</th>';
        html += '   <th class="th-color">합계</th>';
        html += '   <th class="th-color">비율</th>';
        html += '</tr>';
        let sum1 = Number(map.A1) + Number(map.B1) + Number(map.C1);
        let perA1 = sum1 == 0 ? 0 : (Number(map.A1) / Number(sum1) * 100).toFixed(1);
        let perB1 = sum1 == 0 ? 0 : (Number(map.B1) / Number(sum1) * 100).toFixed(1);
        let perC1 = sum1 == 0 ? 0 : (Number(map.C1) / Number(sum1) * 100).toFixed(1);
        let per1 = 0;
        if(Number(sum1) != 0){
            per1 = 100;
        }
        html += '<tr>';
        html += '   <td>50회 이상 거래</td>';
        html += '   <td>'+map.A1+'</td>';
        html += '   <td>'+perA1+'%</td>';
        html += '   <td>'+map.B1+'</td>';
        html += '   <td>'+perB1+'%</td>';
        html += '   <td>'+map.C1+'</td>';
        html += '   <td>'+perC1+'%</td>';
        html += '   <td>'+sum1+'</td>';
        html += '   <td>'+per1+'%</td>';
        html += '</tr>';
        let sum2 = Number(map.A2) + Number(map.B2) + Number(map.C2);
        let perA2 = sum2 == 0 ? 0 : (Number(map.A2) / Number(sum2) * 100).toFixed(1);
        let perB2 = sum2 == 0 ? 0 : (Number(map.B2) / Number(sum2) * 100).toFixed(1);
        let perC2 = sum2 == 0 ? 0 : (Number(map.C2) / Number(sum2) * 100).toFixed(1);
        let per2 = 0;
        if(Number(sum2) != 0){
            per2 = 100;
        }
        html += '<tr>';
        html += '   <td>1천만원 이상 거래</td>';
        html += '   <td>'+map.A2+'</td>';
        html += '   <td>'+perA2+'%</td>';
        html += '   <td>'+map.B2+'</td>';
        html += '   <td>'+perB2+'%</td>';
        html += '   <td>'+map.C2+'</td>';
        html += '   <td>'+perC2+'%</td>';
        html += '   <td>'+sum2+'</td>';
        html += '   <td>'+per2+'%</td>';
        html += '</tr>';
        let sumA = Number(map.A1) + Number(map.A2);
        let sumB = Number(map.B1) + Number(map.B2);
        let sumC = Number(map.C1) + Number(map.C2);
        let totSum = Number(sumA) + Number(sumB) + Number(sumC);
        let perA = totSum == 0 ? 0 : (Number(sumA) / Number(totSum) * 100).toFixed(1);
        let perB = totSum == 0 ? 0 : (Number(sumB) / Number(totSum) * 100).toFixed(1);
        let perC = totSum == 0 ? 0 : (Number(sumC) / Number(totSum) * 100).toFixed(1);
        let perTot = 0;
        if(Number(totSum) != 0){
            perTot = 100;
        }
        html += '<tr>';
        html += '   <th class="th-color">협력사 합계</th>';
        html += '   <th class="th-color" style="text-align:left">'+sumA+'</th>';
        html += '   <th class="th-color" style="text-align:left">'+perA+'%</th>';
        html += '   <th class="th-color" style="text-align:left">'+sumB+'</th>';
        html += '   <th class="th-color" style="text-align:left">'+perB+'%</th>';
        html += '   <th class="th-color" style="text-align:left">'+sumC+'</th>';
        html += '   <th class="th-color" style="text-align:left">'+perC+'%</th>';
        html += '   <th class="th-color" style="text-align:left">'+totSum+'</th>';
        html += '   <th class="th-color" style="text-align:left">'+perTot+'%</th>';
        html += '</tr>';
        $("#tableB").html(html);
    },

    tableCSet: function(year){
        const list = customKendo.fn_customAjax("/cam_achieve/getPurcCrmCKAchieveData", {year: year}).list;
        console.log("tableC List", list);
        $("#tableC").html("");
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">연번</th>';
        html += '   <th class="th-color">협력사명</th>';
        html += '   <th class="th-color">거래횟수 50회이상</th>';
        html += '   <th class="th-color">거래금액 1억원이상</th>';
        html += '</tr>';
        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '<tr>';
            html += '   <td>'+(i+1)+'</td>';
            html += '   <td>'+map.CRM_NM+'</td>';
            html += '   <td>'+map.A_CK+'</td>';
            html += '   <td>'+map.B_CK+'</td>';
            html += '</tr>';
        }
        $("#tableC").html(html);
    },

    tableDEFSet: function(year){
        const list = customKendo.fn_customAjax("/cam_achieve/getPurcCrmCKAchieveDataDet", {year: year, type: "amt"}).list;
        console.log("tableD List", list);
        $("#tableD").html("");
        let html = purcCrmManagement.tableDEFMake(list);
        $("#tableD").html(html);

        const list2 = customKendo.fn_customAjax("/cam_achieve/getPurcCrmCKAchieveDataDet", {year: year, type: "count"}).list;
        console.log("tableF List", list2);
        $("#tableF").html("");
        let html2 = purcCrmManagement.tableDEFMake(list2);
        $("#tableF").html(html2);
    },

    tableDEFMake: function(list){
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">연번</th>';
        html += '   <th class="th-color">협력사명</th>';
        html += '   <th class="th-color">거래금액 (백만원)</th>';
        html += '   <th class="th-color">업종세부</th>';
        html += '   <th class="th-color">소재지</th>';
        html += '</tr>';
        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '<tr>';
            html += '   <td>'+(i+1)+'</td>';
            html += '   <td>'+map.CRM_NM+'</td>';
            html += '   <td>'+Math.floor(Number(map.TOT_AMT) / 1000000)+'백만원</td>';
            html += '   <td>'+map.CRM_EVENT+'</td>';
            html += '   <td>'+map.CRM_LOC+'</td>';
            html += '</tr>';
        }
        if(list.length == 0){
            html += '<tr>';
            html += '   <td cospan="5">해당하는 데이터가 없습니다.</td>';
            html += '</tr>';
        }
        return html;
    }
}