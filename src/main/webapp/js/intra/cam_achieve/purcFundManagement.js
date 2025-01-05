var purcFundManagement = {
    fn_defaultScript: function(){
        this.pageSet();
        this.dataSet();
        this.mainGrid();
        purcFundManagement.hiddenGridSet();
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
    },

    hiddenGridSet : function() {
        var arr = []
        var columns = []
        $("#tableA tr").each(function (i, v) {
            if (i != 0) {
                var data = {
                    COLUMN1: $(v).children().eq(0).text(),
                    COLUMN2: $(v).children().eq(1).text(),
                    COLUMN3: $(v).children().eq(2).text(),
                    COLUMN4: $(v).children().eq(3).text(),
                    COLUMN5: $(v).children().eq(4).text(),
                }

                arr.push(data);
            }
        })
        columns = [
            {
                title: "사업구분",
                field: "COLUMN1"
            }, {
                title: "구매거래 건 수",
                field: "COLUMN2"
            }, {
                title: "거래금액",
                field: "COLUMN3"
            }, {
                title: "지급완료액",
                field: "COLUMN4"
            }, {
                title: "미지급액",
                field: "COLUMN5"
            }
        ]
        purcFundManagement.hiddenGrid("hiddenGrid1", columns, arr)

        arr = [];
        columns = [];
        $("#tableB tr").each(function (i, v) {
            if (i != 0) {
                var data = {}
                $(v).children().each(function(ii, vv){
                    data["COLUMN" + (ii+1)] = $(vv).text()
                })

                arr.push(data);
            }
        })
        $("#tableB tr").each(function (i, v) {
            if (i == 0) {
                $(v).children().each(function(ii, vv){
                    var data = {
                        title: $(vv).text(),
                        field: "COLUMN" + (ii+1)
                    }

                    columns.push(data);
                })
            }
        })
        purcFundManagement.hiddenGrid("hiddenGrid2", columns, arr)

        arr = [];
        columns = [];
        var grid = $("#mainGrid").data("kendoGrid"); // Kendo Grid 객체 가져오기
        var dataArr = grid.dataSource.data(); // 현재 표시된 데이터 가져오기
        var dataArray = dataArr.map(function(item) {
            return item.toJSON(); // 각 데이터를 JSON 형식으로 변환하여 배열에 담기
        });
        $.each(dataArray, function(i, v){
            var data = {}
            data.COLUMN1 = (dataArray.length - i);
            data.COLUMN2 = v.ITEM_TYPE_TEXT;
            data.COLUMN3 = v.DOC_NO2;
            data.COLUMN4 = v.DOC_NO;
            if(v.PURC_TYPE == 'D'){
                data.COLUMN5 = "엔지니어링";
            } else if(v.PURC_TYPE == 'R'){
                data.COLUMN5 = "R&D";
            } else if(v.PURC_TYPE == 'S'){
                data.COLUMN5 = "비R&D";
            } else if(v.PURC_TYPE == 'V'){
                data.COLUMN5 = "기타/용역";
            } else {
                data.COLUMN5 = "법인운영";
            }
            data.COLUMN6 = v.PJT_NM
            data.COLUMN7 = v.CRM_NM
            data.COLUMN8 = v.CLAIM_DE
            data.COLUMN9 = v.GOODS_DT
            data.COLUMN10 = v.CLAIM_TITLE
            data.COLUMN11 = v.CRM_NM
            data.COLUMN12 = v.DEPT_NAME
            data.COLUMN13 = v.EMP_NAME_KR2
            data.COLUMN14 = v.EMP_NAME_KR
            data.COLUMN15 = comma(v.EST_AMT)
            data.COLUMN16 = comma(v.VAT_AMT)
            data.COLUMN17 = comma(v.TOT_AMT)
            data.COLUMN18 = comma(v.EXNP_AMT)
            data.COLUMN19 = comma(Number(v.TOT_AMT) - Number(v.EXNP_AMT))
            data.COLUMN20 = v.EXP_DE;
            if(v.PAYMENT_METHOD == "A"){
                data.COLUMN21 = "계좌이체";
            }else if(v.PAYMENT_METHOD == "I"){
                data.COLUMN21 = "인터넷구매";
            }else if(v.PAYMENT_METHOD == "C"){
                data.COLUMN21 = "현장결제";
            }else{
                data.COLUMN21 = "";
            }

            if(v.PRI_PAY == "Y"){
                data.COLUMN22 = "미해당";
            }else{
                data.COLUMN22 = "해당";
            }

            data.COLUMN23 = "해당";
            if(v.CONT_YN == "Y"){
                data.COLUMN23 = "미해당";
            }

            data.COLUMN24 = "지급설정대기";
            if(v.SETTING != 0){
                data.COLUMN24 = "지급설정완료";
            }
            if(v.REQ_AMT != 0){
                data.COLUMN24 = "지출요청중";
            }
            if(v.TOT_AMT == v.EXNP_AMT){
                data.COLUMN24 = "지출완료";
            }

            arr.push(data)
        })
        columns = [
            {
                title: "연번",
                field: "COLUMN1"
            }, {
                title: "구매구분",
                field: "COLUMN2"
            }, {
                title: "구매요청문서번호",
                field: "COLUMN3"
            }, {
                title: "구매청구문서번호",
                field: "COLUMN4"
            }, {
                title: "사업구분",
                field: "COLUMN5"
            }, {
                title: "관련 프로젝트",
                field: "COLUMN6"
            }, {
                title: "수주업체명",
                field: "COLUMN7"
            }, {
                title: "청구일시",
                field: "COLUMN8"
            }, {
                title: "납품예정일",
                field: "COLUMN9"
            }, {
                title: "제목",
                field: "COLUMN10"
            }, {
                title: "업체명",
                field: "COLUMN11"
            }, {
                title: "요청부서",
                field: "COLUMN12"
            }, {
                title: "요청자",
                field: "COLUMN13"
            }, {
                title: "청구자",
                field: "COLUMN14"
            }, {
                title: "공급가액",
                field: "COLUMN15"
            }, {
                title: "세액",
                field: "COLUMN16"
            }, {
                title: "합계",
                field: "COLUMN17"
            }, {
                title: "지출액",
                field: "COLUMN18"
            }, {
                title: "미지급액",
                field: "COLUMN19"
            }, {
                title: "지급예정일",
                field: "COLUMN20"
            }, {
                title: "비용지급방식",
                field: "COLUMN21"
            }, {
                title: "선지급여부",
                field: "COLUMN22"
            }, {
                title: "선지급여부",
                field: "COLUMN23"
            }, {
                title: "상태",
                field: "COLUMN24"
            }
        ]
        purcFundManagement.hiddenGrid("hiddenGrid3", columns, arr)
    },

    hiddenGrid : function(id, columns, arr) {
        var dataSource= new kendo.data.DataSource({
            data : arr
        });

        $("#" + id).kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            height: 525,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: columns,
        }).data("kendoGrid");
    },

    fn_excelDownload : function(index, excelName){
        var grid = $("#hiddenGrid" + index).data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = excelName + ".xlsx";
        });
        grid.saveAsExcel();
    },
}