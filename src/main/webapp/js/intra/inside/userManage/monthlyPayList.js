var monPayList = {

    global: {
        partRateList : "",
        payrollList : "",
        deptList : "",
    },

    fn_defaultScript: function(){
        customKendo.fn_datePicker("baseYear", "year", "yyyy-MM", new Date());

        $("#baseYear").change(function (){
            monPayList.fn_calcReset();
        });

        monPayList.fn_calcReset();
    },

    fn_calcReset : function(){
        $("#statusTb").empty();

        monPayList.fn_makeTable();
    },

    fn_makeTable : function(){
        var data = {
            baseYear : $("#baseYear").val().split("-")[0],
            searchYear : $("#baseYear").val()
        }

        var result = customKendo.fn_customAjax("/inside/getMonthlyCalcPartRate", data);
        var ls = result.list;
        var ls2 = result.list2;
        var deptList = result.deptList;
        monPayList.global.partRateList = ls;
        monPayList.global.payrollList = ls2;
        monPayList.global.deptList = deptList;

        var html = '';
        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">구분</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: center;"><span>' + deptList[i].dept_name + '</span></td>';
        }
        html += '   <td class="text-center">합계</td>';
        html += '   <td class="text-center">사업별 차지율</td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">R&D</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: right; background-color: #fff;"><span id="r'+ deptList[i].dept_seq +'" class="rndPay">0</span></td>';
        }
        html += '   <td style="text-align: right; background-color: #fff;"><span id="rSum">0</span></td>';
        html += '   <td style="text-align: right; background-color: #fff;"><span id="rRate" class="payRate">0</span></td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">비R&D</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: right; background-color: #fff;"><span id="s'+ deptList[i].dept_seq +'" class="unRndPay">0</span></td>';
        }
        html += '   <td style="text-align: right; background-color: #fff;"><span id="sSum">0</span></td>';
        html += '   <td style="text-align: right; background-color: #fff;"><span id="sRate" class="payRate">0</span></td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">엔지니어링</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: right; background-color: #fff;"><span id="d'+ deptList[i].dept_seq +'">0</span></td>';
        }
        html += '   <td style="text-align: right; background-color: #fff;"><span id="dSum">0</span></td>';
        html += '   <td style="text-align: right; background-color: #fff;"><span id="dRate" class="payRate">0%</span></td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">용역/기타</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: right; background-color: #fff;"><span id="v'+ deptList[i].dept_seq +'">0</span></td>';
        }
        html += '   <td style="text-align: right; background-color: #fff;"><span id="vSum">0</span></td>';
        html += '   <td style="text-align: right; background-color: #fff;"><span id="vRate" class="payRate">0%</span></td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">사업비 계</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: right;"><span id="busn'+ deptList[i].dept_seq +'">0</span></td>';
        }
        html += '   <td style="text-align: right;"><span id="busnSum">0</span></td>';
        html += '   <td style="text-align: right;"><span id="busnRate" class="payRate">0</span></td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">법인운영</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: right; background-color: #fff;"><span id="m'+ deptList[i].dept_seq +'" class="mPay">0</span></td>';
        }
        html += '   <td style="text-align: right; background-color: #fff;"><span id="mSum">0</span></td>';
        html += '   <td style="text-align: right; background-color: #fff;"><span id="mRate" class="payRate">0</span></td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">합계</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: right; background-color: #fff;"><span id="tot'+ deptList[i].dept_seq +'">0</span></td>';
        }
        html += '   <td style="text-align: right; background-color: #fff;"><span id="totSum">0</span></td>';
        html += '   <td style="text-align: right; background-color: #fff;"><span id="totRate">100%</span></td>';
        html += '</tr>';

        html += '<tr>';
        html += '   <td class="text-center" style="padding: 10px;">차지율</td>';
        for(var i=0; i<deptList.length; i++){
            html += '   <td style="text-align: right;"><span id="rate'+ deptList[i].dept_seq +'">0</span></td>';
        }
        html += '   <td style="text-align: right;"><span>100%</span></td>';
        html += '   <td style="text-align: right;"><span>100%</span></td>';
        html += '</tr>';

        $("#statusTb").append(html);

        monPayList.fn_calcPartRate();
    },

    fn_calcPartRate : function(){
        var ls = monPayList.global.partRateList;
        var ls2 = monPayList.global.payrollList;
        var deptList = monPayList.global.deptList;
        var month = $("#baseYear").val().split("-")[1] > 9 ? $("#baseYear").val().split("-")[1] : $("#baseYear").val().split("-")[1].substring(1);

        console.log("ls", ls);

        var rSum = 0;
        var sSum = 0;
        var busnSum = 0;
        var mSum = 0;
        var totSum = 0;

        for(var i = 0 ; i < ls.length; i++){
            if(ls[i].BUSN_CLASS == 'R'){
                $("#r"+ls[i].DEPT_SEQ).text(comma(ls[i]["SUM_MON_PAY_" + month]));
            } else if(ls[i].BUSN_CLASS == 'S'){
                $("#s"+ls[i].DEPT_SEQ).text(comma(ls[i]["SUM_MON_PAY_" + month]));
            }
        }

        $.each($(".rndPay"), function(){
            rSum += Number(uncomma($(this).text()));
            busnSum += Number(uncomma($(this).text()));
        });
        $.each($(".unRndPay"), function(){
            sSum += Number(uncomma($(this).text()));
            busnSum += Number(uncomma($(this).text()));
        });

        $("#rSum").text(comma(rSum));
        $("#sSum").text(comma(sSum));
        $("#busnSum").text(comma(busnSum));

        for(var i=0; i<deptList.length; i++){
            // 부서별 사업비 계
            $("#busn" + deptList[i].dept_seq).text(comma(Number(uncomma($("#r" + deptList[i].dept_seq).text())) + Number(uncomma($("#s" + deptList[i].dept_seq).text()))));

            for(var j=0; j<ls2.length; j++){
                if(ls2[j].DEPT_SEQ == deptList[i].dept_seq){
                    // 부서별 법인운영 및 합계
                    $("#tot" + deptList[i].dept_seq).text(comma(ls2[j].TOT_PAY));
                    $("#m" + deptList[i].dept_seq).text(comma(Number(ls2[j].TOT_PAY) - Number(uncomma($("#busn" + deptList[i].dept_seq).text()))));
                    totSum += Number(ls2[j].TOT_PAY);
                }
            }
        }

        $("#totSum").text(comma(totSum));
        $("#mSum").text(comma(Number(totSum - Number(uncomma($("#busnSum").text())))));

        monPayList.fn_calcTotRate();
    },

    fn_calcTotRate : function(){
        var deptList = monPayList.global.deptList;

        for(var i=0; i<deptList.length; i++){
            if($("#totSum").text() == 0){
                $("#rate" + deptList[i].dept_seq).text("0%");
            } else {
                // 부서별 차지율
                $("#rate" + deptList[i].dept_seq).text((Number(uncomma($("#tot" + deptList[i].dept_seq).text())) / Number(uncomma($("#totSum").text())) * 100).toFixed(2) + "%");
            }
        }

        if($("#totSum").text() == 0){
            $("#rRate").text("0%");
            $("#sRate").text("0%");
            $("#busnRate").text("0%");
            $("#mRate").text("0%");
        } else {
            // 사업별 차지율 = 사업구분별합계 / 총합계 * 100
            $("#rRate").text((Number(uncomma($("#rSum").text())) / Number(uncomma($("#totSum").text())) * 100).toFixed(2) + "%");
            $("#sRate").text((Number(uncomma($("#sSum").text())) / Number(uncomma($("#totSum").text())) * 100).toFixed(2) + "%");
            $("#busnRate").text((Number(uncomma($("#busnSum").text())) / Number(uncomma($("#totSum").text())) * 100).toFixed(2) + "%");
            $("#mRate").text((Number(uncomma($("#mSum").text())) / Number(uncomma($("#totSum").text())) * 100).toFixed(2) + "%");
        }

        // monPayList.gridReload();
    },

    gridReload : function() {
        monPayList.global.searchAjaxData = {
            baseYear : $("#baseYear").val(),
            searchValue : ""
        }
        monPayList.mainGrid('/salaryManage/getPayRollLedgerList.do', monPayList.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            resizable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="monPayList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel: {
                fileName:  '급여대장.xlsx',
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "번호",
                    template: "#= ++record #",
                    width: 50
                }, {
                    field: "DEPT_NAME",
                    title: "부서/팀",
                    width : 180
                }, {
                    field: "EMP_NAME",
                    title: "이름",
                    width : 100,
                },{
                    title: "지급내역",
                    columns: [
                        {
                            field: "BASIC_SALARY",
                            title: "기본급",
                            attributes : {
                                style : "text-align: right;"
                            },
                            template: function (e) {
                                return comma(e.BASIC_SALARY);
                            },
                            width : 100,
                        }, {
                            field: "FOOD_PAY",
                            title: "식대",
                            attributes : {
                                style : "text-align: right;"
                            },
                            template: function (e) {
                                return comma(e.FOOD_PAY);
                            },
                            width : 100,
                        }, {
                            field: "EXTRA_PAY",
                            title: "수당",
                            attributes : {
                                style : "text-align: right;"
                            },
                            template: function (e) {
                                return comma(e.EXTRA_PAY);
                            },
                            width : 100,
                        }, {
                            field: "TOTAL_PAY2",
                            title: "지급합계",
                            attributes : {
                                style : "text-align: right;"
                            },
                            template: function (e) {
                                return comma(e.TOTAL_PAY2);
                            },
                            width : 100,
                        },
                    ]
                }, {
                    title: "사업별 지급내역",
                    columns: [
                        {
                            field: "",
                            title: "R&D",
                            width : 120,
                        }, {
                            field: "",
                            title: "비R&D",
                            width : 120,
                        }, {
                            field: "",
                            title: "엔지니어링",
                            width : 120,
                        }, {
                            field: "",
                            title: "용역/기타",
                            width : 120,
                        }, {
                            field: "",
                            title: "법인운영 ",
                            width : 120,
                        },
                    ]
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 1);
            }
        }).data("kendoGrid");
    },
}