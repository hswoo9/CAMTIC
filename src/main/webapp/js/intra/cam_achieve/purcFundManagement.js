var purcFundManagement = {
    fn_defaultScript: function(){
        this.pageSet();
        this.dataSet();
        this.mainGrid();
    },

    pageSet: function(){
        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());
        $("#year").change(function(){
            purcFundManagement.dataSet();
        });
    },

    dataSet: function(){
        const year = $("#year").val();
        const tableAList = this.tableASet(year);
        this.tableBSet(year, tableAList);
    },

    tableASet: function(year){
        const list = customKendo.fn_customAjax("/cam_achieve/getPurcFundAchieveData", {year: year}).list;
        console.log("tableA List", list);
        $("#tableA").html("");
        let html = '';
        html += '<tr>';
        html += '   <th class="th-color">사업구분</th>';
        html += '   <th class="th-color">구매거래 건 수</th>';
        html += '   <th class="th-color">거래금액</th>';
        html += '   <th class="th-color">지급완료액</th>';
        html += '   <th class="th-color">미지급액</th>';
        html += '</tr>';
        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '<tr>';
            let purcText = "법인운영";
            if(map.PURC_TYPE == "R"){
                purcText = "R&D";
            }else if(map.PURC_TYPE == "S"){
                purcText = "비R&D";
            }else if(map.PURC_TYPE == "D"){
                purcText = "엔지니어링";
            }else if(map.PURC_TYPE == "V"){
                purcText = "용역/기타";
            }
            html += '   <td style="text-align: center">'+purcText+'</td>';
            html += '   <td style="text-align:right">'+comma(map.COUNT)+'</td>';
            html += '   <td style="text-align:right">'+comma(map.TOT_AMT)+'</td>';
            html += '   <td style="text-align:right">'+comma(map.EXNP_AMT)+'</td>';
            html += '   <td style="text-align:right">'+comma(map.BALANCE_AMT)+'</td>';
            html += '</tr>';
        }
        $("#tableA").html(html);

        return list;
    },

    tableBSet: function(year, tableAList){
        const list = customKendo.fn_customAjax("/cam_achieve/getPurcFund2AchieveData", {year: year}).list;
        console.log("tableB List", list);
        const dates = [...new Set(list.map(item => item.EXP_DE))];
        console.log("dates", dates);
        const totals = new Array(dates.length).fill(0);
        $("#tableB").html("");
        let html = '';
        html += '<colgroup>';
        html += '   <col width="150px">';
        html += '   <col width="150px">';
        for(let i=0; i<dates.length; i++){
            html += '   <col width="150px">';
        }
        html += '   <col width="150px">';
        html += '</colgroup>';
        html += '<tr>';
        html += '   <th class="th-color">사업구분</th>';
        html += '   <th class="th-color">지급완료액</th>';
        for(let i=0; i<dates.length; i++){
            html += '   <th class="th-color">'+dates[i]+'</th>';
        }
        html += '   <th class="th-color">합계</th>';
        html += '</tr>';
        const purcArr = [{name: "R&D", val: "R"}, {name: "비R&D", val: "S"}, {name: "엔지니어링", val: "D"}, {name: "용역/기타", val: "V"}, {name: "법인운영", val: ""}];
        for(let purcCnt=0; purcCnt<purcArr.length; purcCnt++){
            html += '<tr>';
            html += '   <td style="text-align: center">'+purcArr[purcCnt].name+'</td>';
            html += '   <td style="text-align:right">'+comma(tableAList[purcCnt].EXNP_AMT)+'</td>';
            let rowSum = 0;
            for(let i=0; i<dates.length; i++){
                let flag = false;
                for(let j=0; j<list.length; j++){
                    const jMap = list[j];
                    if(jMap.PURC_TYPE == purcArr[purcCnt].val && jMap.EXP_DE == dates[i]){
                        html += '   <td style="text-align:right">'+comma(jMap.EXNP_AMT)+'</td>';
                        flag = true;
                        rowSum += Number(jMap.EXNP_AMT);
                        totals[i] += Number(jMap.EXNP_AMT);
                        break;
                    }
                }
                if(!flag){
                    html += '   <td style="text-align:right">-</td>';
                }
            }
            html += '   <td style="text-align:right">'+comma(rowSum)+'</td>';
            html += '</tr>';
        }
        html += '<tr>';
        html += '   <th class="th-color" style="text-align:center">합계</th>';
        html += '   <th class="th-color" style="text-align:right">'+comma(tableAList.reduce((total, item) => total + Number(item.EXNP_AMT), 0))+'</th>';
        let totAmt = 0;
        for(let i=0; i<totals.length; i++){
            html += '   <th class="th-color" style="text-align:right">'+comma(totals[i])+'</th>';
            totAmt += Number(totals[i]);
        }
        html += '   <th class="th-color" style="text-align:right">'+comma(totAmt)+'</th>';
        html += '</tr>';
        $("#tableB").html(html);
    },

    mainGrid: function(){
        const year = $("#year").val();
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/cam_achieve/getPurcAchieveMngList", {year: year}),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            resizable : true,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    width: 60,
                    template: "#= --record #"
                }, {
                    field: "ITEM_TYPE_TEXT",
                    title: "구매구분",
                    width: 120
                }, {
                    field: "DOC_NO2",
                    title: "구매요청문서번호",
                    width: 240
                }, {
                    field: "DOC_NO",
                    title: "구매청구문서번호",
                    width: 240
                }, {
                    title: "사업구분",
                    width: 120,
                    template: function(e){
                        var result = "";

                        if(e.PURC_TYPE == 'D'){
                            result = "엔지니어링";
                        } else if(e.PURC_TYPE == 'R'){
                            result = "R&D";
                        } else if(e.PURC_TYPE == 'S'){
                            result = "비R&D";
                        } else if(e.PURC_TYPE == 'V'){
                            result = "기타/용역";
                        } else {
                            result = "법인운영";
                        }

                        return result
                    }
                }, {
                    field: "PJT_NM",
                    title: "관련 프로젝트",
                    width: 400,
                }, {
                    field: "CRM_NM",
                    title: "수주업체명",
                    width: 200
                }, {
                    field: "CLAIM_DE",
                    title: "청구일시",
                    width: 120,
                }, {
                    field: "GOODS_DT",
                    title: "납품예정일",
                    width: 120,
                }, {
                    title: "제목",
                    field: "CLAIM_TITLE",
                    width: 400,
                    template : function (e) {
                        return '<div style="font-weight: bold; text-align: left; cursor: pointer" onclick="purcMngAppList.fn_reqClaiming(' + e.CLAIM_SN + ', '+e.PURC_SN+')">' + e.CLAIM_TITLE + '</div>'
                    }
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 200
                }, {
                    field: "DEPT_NAME",
                    title: "요청부서",
                    width: 200,
                }, {
                    field: "EMP_NAME_KR2",
                    title: "요청자",
                    width: 70
                }, {
                    field: "EMP_NAME_KR",
                    title: "청구자",
                    width: 70
                }, {
                    title: "공급가액",
                    width: 90,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.EST_AMT)+'</div>';
                    }
                }, {
                    title: "세액",
                    width: 90,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.VAT_AMT)+'</div>';
                    }
                }, {
                    title: "합계",
                    width: 90,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.TOT_AMT)+'</div>';
                    }
                }, {
                    title: "지출액",
                    width: 90,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.EXNP_AMT)+'</div>';
                    }
                }, {
                    title: "미지급액",
                    width: 90,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(Number(e.TOT_AMT) - Number(e.EXNP_AMT))+'</div>';
                    }
                }, {
                    field: "EXP_DE",
                    title: "지급예정일",
                    width: 120
                }, {
                    title: "비용지급방식",
                    width: 150,
                    template: function(e){
                        let paymentMethod = "";
                        if(e.PAYMENT_METHOD == "A"){
                            paymentMethod = "계좌이체";
                        }else if(e.PAYMENT_METHOD == "I"){
                            paymentMethod = "인터넷구매";
                        }else if(e.PAYMENT_METHOD == "C"){
                            paymentMethod = "현장결제";
                        }
                        return paymentMethod;
                    }
                }, {
                    title: "선지급여부",
                    width: 120,
                    template: function (e) {
                        var returnText = "해당";
                        if(e.PRI_PAY == "Y"){
                            returnText = "미해당";
                        }
                        return returnText;
                    }
                }, {
                    title: "선지급여부",
                    width: 120,
                    template: function (e) {
                        var returnText = "해당";
                        if(e.CONT_YN == "Y"){
                            returnText = "미해당";
                        }
                        return returnText;
                    }
                }, {
                    title: "상태",
                    width: 180,
                    template: function (e) {
                        var stat = "지급설정대기";

                        if(e.SETTING != 0){
                            stat = "지급설정완료";
                        }
                        if(e.REQ_AMT != 0){
                            stat = "지출요청중";
                        }
                        if(e.TOT_AMT == e.EXNP_AMT){
                            stat = "지출완료";
                        }

                        return stat;
                    }
                }
            ],
            dataBinding: function () {
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    }
}