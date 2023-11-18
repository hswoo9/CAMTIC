var empPartRate = {

    fn_defaultScript: function () {
        var data = {}
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq");
        $("#deptComp").data("kendoDropDownList").bind("change", empPartRate.fn_chngDeptComp)
        $("#deptComp").data("kendoDropDownList").select(0);
        $("#deptComp").data("kendoDropDownList").trigger("change");

        $("#userKind").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "성명", value: "EMP_NAME_KR"},
                {text: "직급", value: "POSITION_NAME"},
                {text: "등급", value: "GRADE"},
                {text: "직책", value: "DUTY_NAME"},
                {text: "메일주소", value: "EMAIL_ADDR"},
                {text: "전화번호", value: "OFFICE_TEL_NUM"},
                {text: "핸드폰", value: "MOBILE_TEL_NUM"}
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

        $("#workStatusCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "입/퇴사현황", value: ""},
                {text: "입사현황", value: "Y"},
                {text: "퇴사현황", value: "N"}
            ],
            index: 0
        });

        empPartRate.mainGrid();
    },

    fn_gridReload: function () {
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
                    data.userKind = $('#userKind').val(),
                        data.empNameKr = $("#kindContent").val(),
                        data.bsYear = $("#bsYear").val(),
                        data.kindContent = $("#kindContent").val(),
                        data.deptComp = $("#deptComp").val(),
                        data.deptTeam = $("#deptTeam").val()
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
            pageSize: 10
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList2.gridReload()">' +
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
                        return '<div><input type="hidden" id="gridEmpSeq" value="'+e.EMP_SEQ+'" />' + e.EMP_NAME_KR + '</div>'
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
                        if (e.PJT_STEP == 'S3' || e.PJT_STEP == 'R3' || e.PJT_STEP == 'E6') {
                            return "완료";
                        } else {
                            return "진행";
                        }
                    }
                }, {
                    field: "DEPT_NAME",
                    title: "3책5공"
                }, {
                    field: "PJT_NM",
                    title: "프로젝트명"
                }, {
                    field: "PART_DET_STR_DT",
                    title: "참여시작"
                }, {
                    field: "PART_DET_END_DT",
                    title: "참요종료"
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
        const grid = this;
        grid.tbody.find("tr").each(function (e) {
            const dataItem = grid.dataItem($(this));
            var cnt = 0;
            $(this).find("td").each(function(e){
                cnt++;
                if(cnt == 1){
                    $(this).attr("onclick","empPartRate.fn_userPartRatePop("+dataItem.EMP_SEQ+", "+dataItem.PJT_SN+")");
                    $(this).attr("dt",dataItem.EMP_SEQ);
                }
            });
        });

        $('#mainGrid >.k-grid-content>table').each(function (index, item) {
            var dimension_col = 1;
            // First, scan first row of headers for the "Dimensions" column.
            $('#mainGrid >.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
                var _this = $(this);
                if (_this.text() == "성명") {
                    var bgColor = _this.css('background-color');
                    var foreColor = _this.css('color');
                    var rightBorderColor = _this.css('border-right-color');

                    // first_instance holds the first instance of identical td
                    var first_instance = null;
                    var cellText = '';
                    var arrCells = [];
                    $(item).find('tr').each(function (e, v) {
                        console.log(e, v);
                        // find the td of the correct column (determined by the colTitle)
                        var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

                        if (first_instance == null) {
                            first_instance = dimension_td;
                            cellText = first_instance.text();
                        } else if (dimension_td.text() == cellText) {
                            // if current td is identical to the previous
                            dimension_td.css('border-top', '0px');
                        } else {
                            // this cell is different from the last
                            arrCells = ChangeMergedCells(arrCells, cellText, true);
                            //first_instance = dimension_td;
                            cellText = dimension_td.text();
                        }
                        arrCells.push(dimension_td);
                        dimension_td.text("");
                        dimension_td.css('background-color', '#e3e4e6').css('color', 'black').css('border-bottom-color', 'transparent');
                    });
                    arrCells = ChangeMergedCells(arrCells, cellText, true, true);
                    return;
                }
                dimension_col++;
            });
        });

        function ChangeMergedCells(arrCells, cellText, addBorderToCell, flag) {
            var cellsCount = arrCells.length;
            if (cellsCount > 1) {
                var index = parseInt(cellsCount / 2);
                var cell = null;
                if (cellsCount % 2 == 0) { // even number
                    cell = arrCells[index - 1];
                    arrCells[index - 1].css('vertical-align', 'bottom');
                }
                else { // odd number
                    cell = arrCells[index];
                }
                cell.text(cellText);

                cell.css("cursor", "pointer");
                cell.css("font-weight", "bold");

                if (addBorderToCell) {
                    arrCells[cellsCount - 1].css('border-bottom', 'solid 1px #ddd');

                }

                arrCells = []; // clear array for next item
            }
            if (cellsCount == 1) {
                cell = arrCells[0];
                cell.text(cellText);
                arrCells[0].css('border-bottom', 'solid 1px #ddd');
                arrCells = [];
            }
            return arrCells;
        }
    },

    /**
     * 개인별 참여율 현황 팝업 페이지 VIEW
     * @param sn
     */
    fn_userPartRatePop : function(sn, key){

        var url = "/mng/pop/userPartRate.do?sn=" + sn + "&year=" + $("#bsYear").val();

        var name = "_blank";
        var option = "width = 1800, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    }
}

function inputNumberFormat (obj){
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