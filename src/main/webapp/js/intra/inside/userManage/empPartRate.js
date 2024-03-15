var empPartRate = {

    fn_defaultScript: function () {

        $("#rowNum").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "10개", value: "10"},
                {text: "30개", value: "30"},
                {text: "50개", value: "50"},
                {text: "100개", value: "100"},
                {text: "전체", value: "9999"}
            ],
            index: 0,
            change: function () {
                empPartRate.mainGrid();
            }
        });
        
        //재직여부
        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "재직", value: "Y"},
                {text: "퇴직", value: "N"}
            ],
            index: 0
        });

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "직원유형", value: "" },
                { text: "정규직원", value: "r" },
                { text: "계약직원", value: "c" },
                { text: "인턴사원", value: "i" }
            ],
            index: 0
        });

        $("#userKind").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "성명", value: "AA.EMP_NAME_KR"},
                {text: "부서명", value: "AA.DEPT_NAME"},
                {text: "팀명", value: "AA.DEPT_TEAM_NAME"},
                {text: "사업참여", value: "ATTEND"}
            ],
            index: 0
        });

        $("#kindContent").kendoTextBox();

        $("#bsYear").kendoDatePicker({
            depth: "decade",
            start: "decade",
            culture: "ko-KR",
            format: "yyyy",
            value: new Date()
        });

        $("#clickTable").css("display", "none");

        empPartRate.mainGrid();
    },

    fn_gridReload: function () {
        $("#clickTable").css("display", "none");
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_chngDeptComp: function () {
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("deptTeam", ds.rs, "dept_name", "dept_seq")
    },

    mainGrid: function (url, params) {
        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/inside/userPartRateList",
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function (data) {
                    data.status = $('#status').val();
                    data.division = $('#division').val();
                    data.bsYear = $("#bsYear").val();
                    data.userKind = $('#userKind').val();
                    data.kindContent = $("#kindContent").val();
                    return data;
                }
            },
            schema: {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: $("#rowNum").val()
        });

        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [10, 20, "ALL"],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="empPartRate.fn_gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            dataBound: empPartRate.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    template: function (e) {
                        return '<div><input type="hidden" id="gridEmpSeq" value="'+e.EMP_SEQ+'" />' + e.EMP_NAME_KR + '</div>';
                    },
                    width: 100
                }, {
                    field: "DEPT_NAME",
                    title: "부서/팀"
                }, {
                    field: "POSITION_NAME",
                    title: "직위"
                }, {
                    title: "상태",
                    width: 50,
                    template: function (e) {
                        var pjtStatus = "예정";

                        var today = new Date();
                        var endDay = new Date(e.PART_DET_END_DT);

                        if(e.MNG_STAT == 'C'){
                            pjtStatus = "진행";

                            if(endDay < today){
                                pjtStatus = "기간종료";
                            }
                        }
                        return pjtStatus;
                    }
                }, /*{
                    field: "DEPT_NAME",
                    title: "3책5공"
                }, */{
                    field: "PJT_NM",
                    title: "프로젝트명"
                }, {
                    field: "PART_DET_STR_DT",
                    title: "참여시작"
                }, {
                    field: "PART_DET_END_DT",
                    title: "참여종료"
                }, {
                    title: "참여구분",
                    width: 70,
                    template: function (e) {
                        if (e.PART_EMP_SEQ == null || e.PART_EMP_SEQ == "" || e.PART_EMP_SEQ == undefined) {
                            return "-";
                        } else {
                            if (e.PM_EMP_SEQ == e.PART_EMP_SEQ) {
                                return "책임자";
                            } else {
                                return "참여자";
                            }
                        }
                    }
                }, {
                    title: "기준급여",
                    width: 80,
                    template: function (e) {
                        if (e.EMP_SAL == null || e.EMP_SAL == "" || e.EMP_SAL == undefined) {
                            return "-";
                        } else {
                            return '<div style="text-align: right;">' + comma(e.EMP_SAL) + '</div>';
                        }
                    }
                }, {
                    title: "총참여율",
                    width: 70,
                    template: function (e) {
                        if (e.TOT_RATE == null || e.TOT_RATE == "" || e.TOT_RATE == undefined) {
                            return "-";
                        } else {
                            return '<div style="text-align: right;">' + comma(e.TOT_RATE) + '</div>';
                        }
                    }
                }, {
                    title: "월지급액",
                    width: 70,
                    template: function (e) {
                        if (e.MON_SAL == null || e.MON_SAL == "" || e.MON_SAL == undefined) {
                            return "-";
                        } else {
                            return '<div style="text-align: right;">' + comma(e.MON_SAL) + '</div>';
                        }
                    }
                }, {
                    field: "PAY_TOTAL",
                    title: "지급총액",
                    template: function (e) {
                        if (e.PAY_TOTAL == null || e.PAY_TOTAL == "" || e.PAY_TOTAL == undefined) {
                            return '-';
                        } else {
                            return '<div style="text-align: right;">' + comma(e.PAY_TOTAL) + '</div>';
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function() {
        calcAmSum = 0;
        acctAm2Sum = 0;
        acctAm1Sum = 0;
        acctAm3Sum = 0;
        subAmSum = 0;

        var projectSn = "";
        var grid = this;


        function setRowSpanForColumn(colIndex, backgroundColor, color, borderRightColor) {
            var dimension_col = colIndex;
            var first_instance = null;
            var cellText = '';
            var arrCells = [];

            grid.tbody.find("tr").each(function () {
                var dataItem = grid.dataItem($(this));
                var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

                if (first_instance == null) {
                    first_instance = dimension_td;
                    cellText = first_instance.text();
                } else if (dimension_td.text() == cellText) {
                    dimension_td.css('border-top', '0px');
                } else {
                    arrCells = changeMergedCells(arrCells, cellText, true);
                    cellText = dimension_td.text();
                }

                arrCells.push(dimension_td);
                dimension_td.text("");
                dimension_td.css('background-color', backgroundColor).css('color', color).css('border-bottom-color', 'transparent');
            });

            changeMergedCells(arrCells, cellText, true, true);
        }

        setRowSpanForColumn(1, '#e3e4e6', 'black', 'transparent');
        /*setRowSpanForColumn(2, '#e3e4e6', 'black', 'transparent');
        setRowSpanForColumn(3, '#e3e4e6', 'black', 'transparent');*/

        grid.tbody.find("tr").each(function () {
            var dataItem = grid.dataItem($(this));
            var firstColumn = $(this).find('td:nth-child(1)');

            firstColumn.attr("onclick", "empPartRate.fn_setData('B'," + dataItem.EMP_SEQ + ", '" + dataItem.EMP_NAME_KR + "', '" + dataItem.JOIN_DAY + "', "+ dataItem.EMP_SAL + ", " + dataItem.CHNG_SAL + ")");
            firstColumn.attr("dt", dataItem.EMP_SEQ);
            firstColumn.css("cursor", "pointer");
            firstColumn.css("font-weight", "bold");
        });

        function changeMergedCells(arrCells, cellText, addBorderToCell) {
            var cellsCount = arrCells.length;
            if (cellsCount > 1) {
                var index = parseInt(cellsCount / 2);
                var cell = null;
                if (cellsCount % 2 == 0) {
                    cell = arrCells[index - 1];
                    arrCells[index - 1].css('vertical-align', 'bottom');
                } else {
                    cell = arrCells[index];
                }

                cell.text(cell);
                cell.text(cellText);

                if (addBorderToCell) {
                    arrCells[cellsCount - 1].css('border-bottom', 'solid 1px #ddd');
                }

                arrCells = [];
            }

            if (cellsCount == 1) {
                var cell = arrCells[0];
                cell.text(cellText);
                arrCells[0].css('border-bottom', 'solid 1px #ddd');
                arrCells = [];
            }

            return arrCells;
        }
    },

    fn_setData : function (type, empSeq, empName ,joinDay, empSal, chngSal) {

        if (chngSal == "" || chngSal == undefined || chngSal == null) {
            empSal = chngSal;
        }

        $("#clickTable").css("display", "");

        var selStartDate = $("#bsYear").val() + "-01-01";
        var selEndDate = $("#bsYear").val() + "-12-31";

        $("#rateFlag").val(type);

        var strDe = selStartDate.split("-");
        var endDe = selEndDate.split("-");
        var diffMonth = (endDe[0] - strDe[0]) * 12 + (endDe[1] - strDe[1]) + 1;

        const projectStartMonth = strDe[0] + "-01";
        var date = new Date(projectStartMonth);

        $("#divBtn").html("");
        var btnHtml = "";
        btnHtml += '<button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin: 0 5px 5px 0;" onClick="empPartRate.fn_setData(\'A\', '+empSeq+', \''+empName+'\', \''+joinDay+'\', '+empSal+', '+chngSal+')">참여율</button>';
        btnHtml += '<button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin:0 5px 5px 0;" onClick="empPartRate.fn_setData(\'B\', '+empSeq+', \''+empName+'\', \''+joinDay+'\', '+empSal+', '+chngSal+')">월지급액</button>';
        btnHtml += '<button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin:0 5px 5px 0;" onClick="empPartRate.closeDiv()">접기</button>';
        $("#divBtn").html(btnHtml);

        $("#userPartRateHeader").html("");
        var hdHtml = "";
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">성명</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">입사일자</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">과제구분</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">지원부처</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">과제명</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">참여<br>시작</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">참여<br>종료</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">상태</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">참여<br>구분</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">기준<br>급여</th>';
        hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 8.5px;padding: 0;">3책5공</th>';

        diffMonth = 12;

        for (var i = 0; i < diffMonth; i++) {
            var dtMonth = date.getMonth() + 1;
            if (dtMonth.toString().length == 1) {
                dtMonth = "0" + dtMonth;
            }
            hdHtml += '<th scope="row" class="text-center th-color" style="font-size: 9px;padding: 0;">' + date.getFullYear() + '-<br>' + dtMonth + '</th>';

            date.setMonth(date.getMonth() + 1);

        }

        $("#userPartRateHeader").html(hdHtml);

        var parameters = {
            empSeq: empSeq,
            strDe: selStartDate,
            diffMon: diffMonth,
            strMonth: projectStartMonth + "-01"
        };


        $.ajax({
            url: "/mng/userPartRateInfo",
            data: parameters,
            type: "post",
            dataType: "json",
            success: function (rs) {
                var salList = rs.userSalList;
                var rs = rs.list;

                $("#userPartRateBody").html("");
                var bodyHtml = "";

                var userChangeSalaryArr = fn_create2DArray(rs.length, diffMonth);
                var userMonthSalaryArr = fn_create2DArray(rs.length, diffMonth);
                var userTotRateArr = fn_create2DArray(rs.length, diffMonth);
                var pmCnt = 0;
                var sbjStatCnt = 0;

                var monYn = "";
                var monPayStr = "MON_PAY_";
                var monItemStr = "MON_ITEM_";

                for (var i = 0; i < rs.length; i++) {
                    var itemMonMap;
                    $.ajax({
                        url : "/inside/getBusnPartRatePayData",
                        data : {empSeq: empSeq, pjtSn: rs[i].PJT_SN},
                        type : "post",
                        dataType : "json",
                        async : false,
                        success : function(rs2) {
                            if(rs2.map !== "" && rs2.map !== null && rs2.map !== undefined){
                                monYn = 'Y';
                                itemMonMap = rs2.map;
                            }else{
                                monYn = 'N';
                            }
                        }
                    });

                    var pjtStatus = "예정";

                    var today = new Date();
                    var endDay = new Date(rs[i].PART_DET_END_DT);

                    if(rs[i].MNG_STAT == 'C'){
                        pjtStatus = "진행";

                        if(endDay < today){
                            pjtStatus = "기간종료";
                        }
                    }

                    /*var checkIngArr = ['Y', 'E', 'E1', 'E2', 'R', 'S'];
                    if (checkIngArr.indexOf(rs[i].PJT_STEP) > -1) {
                        pjtStatus = "예정";
                    }
                    var checkEndArr = ['E6', 'E7', 'R3', 'S3'];
                    if (checkEndArr.indexOf(rs[i].PJT_STEP) > -1) {
                        pjtStatus = "종료";
                    }*/

                    var pm = "";
                    if (parameters.empSeq == rs[i].PM_EMP_SEQ) {
                        pm = "책임자";
                    } else {
                        pm = "참여자";
                    }

                    var sbjStat = "";
                    if (rs[i].SBJ_STAT_YN == "Y") {
                        if (parameters.empSeq == rs[i].PM_EMP_SEQ) {
                            pmCnt++;
                        }
                        sbjStat = "적용";
                        sbjStatCnt++;
                    } else {
                        sbjStat = "미적용";
                    }

                    var subClassText = "";
                    if (rs[i].subClassText != null) {
                        subClassText = rs[i].subClassText;
                    }

                    bodyHtml += '<tr style="text-align: center;">';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + empName + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + joinDay + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + subClassText + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + rs[i].SBJ_DEP_NM + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + rs[i].PJT_NM + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + rs[i].PART_DET_STR_DT + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + rs[i].PART_DET_END_DT + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + pjtStatus + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + pm + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + comma(empSal) + '</td>';
                    bodyHtml += '   <td style="font-size:10px;padding: 0;">' + sbjStat + '</td>';

                    var date = new Date(projectStartMonth);

                    var userStrDeArr = rs[i].PART_DET_STR_DT.split("-");
                    var userEndDeArr = rs[i].PART_DET_END_DT.split("-");
                    var userStartMonth = userStrDeArr[0] + "-" + userStrDeArr[1];

                    var userDate = new Date(userStartMonth);

                    var colMonth = date.getMonth() + 1; //월 컬럼 선택
                    var colYear = date.getFullYear(); //년 컬럼 선택
                    for (var j = 0; j < diffMonth; j++) {
                        var dt = date.getFullYear() + "-" + (date.getMonth() + 1);
                        var userDt = userDate.getFullYear() + "-" + (userDate.getMonth() + 1);

                        userChangeSalaryArr[i][j] = 0;
                        userMonthSalaryArr[i][j] = 0;
                        userTotRateArr[i][j] = 0;
                        if (dt == userDt && new Date(dt) <= new Date(userEndDeArr[0] + "-" + userEndDeArr[1])) {
                            if ($("#rateFlag").val() == "B") {
                                if(monYn == 'Y'){
                                    var itemMon = itemMonMap[colYear]; // 년 선택
                                    bodyHtml += '<td style="text-align: right">' + comma(itemMon[monPayStr + (date.getMonth() + 1)]) + '</td>';
                                }else {
                                    bodyHtml += '<td style="text-align: right;font-size: 10px;padding: 5px;">' + comma(rs[i].MON_SAL) + '</td>';
                                }
                            } else {
                                bodyHtml += '<td style="text-align: right;font-size: 10px;padding: 5px;">' + rs[i].TOT_RATE + '%</td>';
                            }

                            userDate.setMonth(userDate.getMonth() + 1);

                            userChangeSalaryArr[i][j] = rs[i].CHNG_SAL;
                            userMonthSalaryArr[i][j] = rs[i].MON_SAL;
                            userTotRateArr[i][j] = rs[i].TOT_RATE;
                        } else {
                            bodyHtml += '<td></td>';
                        }

                        date.setMonth(date.getMonth() + 1);
                    }

                    bodyHtml += '</tr>';
                }

                var userChangeSalary = 0;

                bodyHtml += "<tr>";
                if($("#rateFlag").val() == 'A'){
                    bodyHtml += "   <td colspan='11' class='text-center' style='background-color: #8fa1c04a;'>사업 참여율 계</td>";
                    for (var j = 0; j < diffMonth; j++) {
                        var userMonthSalary = 0;
                        for (var i = 0; i < rs.length; i++) {
                            userMonthSalary += parseFloat(userTotRateArr[i][j]);
                        }

                        bodyHtml += '<td style="text-align: right;font-weight: bold;font-size: 10px;padding: 5px;">' + userMonthSalary.toFixed(1) + '%</td>';
                    }
                }else {
                    bodyHtml += "   <td colspan='11' class='text-center' style='background-color: #8fa1c04a;'>사업비지급액 계</td>";
                    for (var j = 0; j < diffMonth; j++) {
                        var userMonthSalary = 0;
                        for (var i = 0; i < rs.length; i++) {
                            userMonthSalary += userMonthSalaryArr[i][j];
                        }

                        bodyHtml += '<td style="text-align: right;font-weight: bold;font-size: 10px;padding: 5px;">' + comma(userMonthSalary) + '</td>';
                    }
                }
                bodyHtml += '</tr>';
                bodyHtml += "<tr>";
                bodyHtml += "   <td colspan='11' class='text-center' style='background-color: #8fa1c04a;'>기준급여</td>";
                for (var j = 0; j < diffMonth; j++) {
                    if (salList[j] == null) {
                        bodyHtml += '<td style="text-align: right;font-weight: bold;font-size: 10px;padding: 5px;">0</td>';
                    } else {
                        bodyHtml += '<td style="text-align: right;font-weight: bold;font-size: 10px;padding: 5px;">' + fn_monBasicSalary(salList[j]) + '</td>';
                    }
                }
                bodyHtml += '</tr>';
                bodyHtml += '<tr>';
                bodyHtml += '   <td colspan="11" class="text-center" style="background-color: #8fa1c04a;">기준급여대비 사업비 지급액 비율</td>';
                for (var j = 0; j < diffMonth; j++) {
                    var userTotRate = 0;
                    for (var i = 0; i < rs.length; i++) {
                        userTotRate += Number(userTotRateArr[i][j]);
                    }
                    bodyHtml += '<td style="text-align: center;font-weight: bold;font-size: 10px;padding: 0;">' + userTotRate.toFixed(1) + '%</td>';
                }
                bodyHtml += '</tr>';

                bodyHtml += '<tr>';
                bodyHtml += '   <td colspan="11" class="text-center" style="background-color: #8fa1c04a;">3책5공</td>';
                for (var j = 0; j < diffMonth; j++) {
                    bodyHtml += '<td style="text-align: center;font-weight: bold;font-size: 10px;padding: 0;">' + pmCnt + '책' + sbjStatCnt + '공</td>';
                }
                bodyHtml += '</tr>';

                $("#userPartRateBody").html(bodyHtml);
            }
        });
    },

    closeDiv: function () {
        $("#clickTable").css("display", "none");
    },

    /**
     * 개인별 참여율 현황 팝업 페이지 VIEW
     * @param sn
     */
    fn_userPartRatePop: function (sn, key) {

        var url = "/mng/pop/userPartRate.do?sn=" + sn + "&year=" + $("#bsYear").val();

        var name = "_blank";
        var option = "width = 1800, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    }
}

function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}