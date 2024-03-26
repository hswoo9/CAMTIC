var busnPartList = {


    fn_defaultScript : function (){

        customKendo.fn_datePicker("pjtYear", 'decade', "yyyy", new Date());

        $("#busnClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "R&D", value: "R"},
                {text: "비R&D", value: "S"},
                {text: "엔지니어링", value: "D"},
                {text: "기타/용역", value: "N"},
            ],
        });

        $("#payGubun").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "현금", value: "PAY"},
                {text: "현물", value: "ITEM"},
            ],
        });

        $("#pjtStep").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "진행", value: "I"},
                {text: "완료", value: "C"},
            ],
        });

        customKendo.fn_textBox(["pjtNm"])

        busnPartList.mainGrid();
    },

    gridReload: function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },


    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/inside/getBusinessParticipationList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtYear = $("#pjtYear").val();
                    data.payGubun = $("#payGubun").val();
                    data.busnClass = $("#busnClass").val();
                    data.pjtStep = $("#pjtStep").val();
                    data.pjtNm = $("#pjtNm").val();

                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 500,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button k-button-solid-base" onclick="busnPartList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    },
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            dataBound: busnPartList.onDataBound,
            columns: [
                {
                    title : "상태",
                    width: 50,
                    template: function (e){
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
                }, {
                    title: "프로젝트명",
                    width: 200,
                    template : function(e){
                        return '<div style="cursor: pointer; font-weight: bold;" onclick="busnPartList.fn_projectPartRatePop('+e.PJT_SN+')">'+e.PJT_NM+'</div>';
                    }
                }, {
                    title: "지원부처",
                    width : 130,
                    template : function(e){
                        return e.SBJ_DEP_NM;
                    }
                }, {
                    title: "유형",
                    width : 100,
                    template : function (e){
                        if(e.SBJ_CLASS == "1"){
                            return "법인위탁과제";
                        } else if(e.SBJ_CLASS == "2"){
                            return "법인주관과제";
                        } else if(e.SBJ_CLASS == "3"){
                            return "법인참여과제";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "시작일",
                    width: 80,
                    field: "PJT_STR_DE",
                }, {
                    title: "종료일",
                    width: 80,
                    field: "PJT_END_DE",
                }, {
                    title: "구분",
                    width: 70,
                    template : function(e){
                        if(e.PM_EMP_SEQ == e.PART_EMP_SEQ){
                            return "책임자";
                        } else {
                            return "참여자";
                        }
                    }
                }, {
                    title: "성명",
                    width: 70,
                    template : function(e){
                        return e.PART_EMP_NM;
                    }
                }, {
                    title: "부서/팀",
                    field: "DEPT_NAME",
                    width: 150,
                }, {
                    title: "참여시작",
                    field: "PART_DET_STR_DT",
                    width: 80,
                }, {
                    title: "참여종료",
                    field: "PART_DET_END_DT",
                    width: 80,
                }, {
                    title: "인건비총액",
                    width: 80,
                    template : function (e){
                        var totPayBudg = 0;
                        var totItemBudg = 0;
                        var total = 0;

                        if(e.TOT_PAY_BUDG != undefined && e.TOT_PAY_BUDG > 0){
                            totPayBudg = Number(e.TOT_PAY_BUDG);
                        }
                        if(e.TOT_ITEM_BUDG != undefined && e.TOT_ITEM_BUDG > 0){
                            totItemBudg = Number(e.TOT_ITEM_BUDG);
                        }

                        total = totPayBudg + totItemBudg;

                        return '<div style="text-align: right;">'+comma(total)+'</div>';
                        //return '<div style="text-align: right;">'+comma(e.EMP_SAL)+'</div>';
                    }
                }, {
                    title: "총참여율",
                    width: 70,
                    template:function(e){
                        return e.TOT_RATE + '%';
                    }
                }
                // , {
                //     title: "1월",
                //     width: 60,
                //     template : function (e){
                //         console.log(e);
                //         if(e.MON_PAY_01 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_01) + Number(e.MON_ITEM_01))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "2월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_02 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_02) + Number(e.MON_ITEM_02))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "3월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_03 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_03) + Number(e.MON_ITEM_03))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "4월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_04 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_04) + Number(e.MON_ITEM_04))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "5월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_05 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_05) + Number(e.MON_ITEM_05))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "6월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_06 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_06) + Number(e.MON_ITEM_06))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "7월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_07 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_07) + Number(e.MON_ITEM_07))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "8월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_08 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_08) + Number(e.MON_ITEM_08))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "9월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_09 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_09) + Number(e.MON_ITEM_09))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "10월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_10 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_10) + Number(e.MON_ITEM_10))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "11월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_11 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_11) + Number(e.MON_ITEM_11))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }, {
                //     title: "12월",
                //     width: 60,
                //     template : function (e){
                //         if(e.MON_PAY_12 != undefined){
                //             return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_12) + Number(e.MON_ITEM_12))+'%</div>';
                //         } else {
                //             return '<div style="text-align: right;">0%</div>';
                //         }
                //     }
                // }
                // , {
                //     title: "지급총액",
                //     width: 80,
                //     template : function(e){
                //         return '<div style="text-align: right;">'+comma(e.EMP_SAL)+'</div>';
                //     }
                // }
            ],
        }).data("kendoGrid");
    },


    onDataBound: function() {
        calcAmSum = 0;
        acctAm2Sum = 0;
        acctAm1Sum = 0;
        acctAm3Sum = 0;
        subAmSum = 0;

        /*var grid = this;

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

            /!*grid.tbody.find("tr").each(function () {
                var dataItem = grid.dataItem($(this));
                var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

                var projectName = dataItem.PJT_NM;
                var projectNameColumn = $(this).find('td:nth-child(2)');
                if (dimension_td.text() == cellText && projectNameColumn.text() == projectName) {
                    dimension_td.css('border-top', '0px');
                } else {
                    arrCells = changeMergedCells(arrCells, cellText, true);
                    cellText = dimension_td.text();
                }

                arrCells.push(dimension_td);
                dimension_td.text("");
                dimension_td.css('background-color', backgroundColor).css('color', color).css('border-bottom-color', 'transparent');
            });

            changeMergedCells(arrCells, cellText, true, true);*!/

        }

        //setRowSpanForColumn(1, '#e3e4e6', 'black', 'transparent');
        setRowSpanForColumn(2, '#e3e4e6', 'black', 'transparent');
        /!*setRowSpanForColumn(3, '#e3e4e6', 'black', 'transparent');
        setRowSpanForColumn(4, '#e3e4e6', 'black', 'transparent');
        setRowSpanForColumn(5, '#e3e4e6', 'black', 'transparent');
        setRowSpanForColumn(6, '#e3e4e6', 'black', 'transparent');*!/

        grid.tbody.find("tr").each(function () {
            var dataItem = grid.dataItem($(this));
            var firstColumn = $(this).find('td:nth-child(2)');

            firstColumn.attr("onclick","busnPartList.fn_projectPartRatePop("+dataItem.PJT_SN+")");
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
        }*/

        $('#mainGrid >.k-grid-content>table').each(function (index, item) {
            var dimension_col = 1;
            // First, scan first row of headers for the "Dimensions" column.
            $('#mainGrid >.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
                var _this = $(this);
                if (_this.text() == "프로젝트명") {
                    var bgColor = _this.css('background-color');
                    var foreColor = _this.css('color');
                    var rightBorderColor = _this.css('border-right-color');

                    // first_instance holds the first instance of identical td
                    var first_instance = null;
                    var cellText = '';
                    var arrCells = [];
                    $(item).find('tr').each(function (e, v) {
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

        var projectSn = "";
        const grid = this;
        grid.tbody.find("tr").each(function (e) {
            const dataItem = grid.dataItem($(this));

            var cnt = 0;
            $(this).find("td").each(function(e){
                cnt++;
                if(cnt == 2 && $(this).text() != ""){
                    $(this).attr("onclick","busnPartList.fn_projectPartRatePop("+dataItem.PJT_SN+")");
                    $(this).css("font-weight","bold");
                    $(this).css("cursor","pointer");
                }
            });
        });


        //지원부처 row 통합 해제 요청으로 주석처리
        /*$('#mainGrid >.k-grid-content>table').each(function (index, item) {
            var dimension_col = 1;
            // First, scan first row of headers for the "Dimensions" column.
            $('#mainGrid >.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
                var _this = $(this);

                if (_this.text() == "지원부처") {
                    var bgColor = _this.css('background-color');
                    var foreColor = _this.css('color');
                    var rightBorderColor = _this.css('border-right-color');

                    // first_instance holds the first instance of identical td
                    var first_instance = null;
                    var cellText = '';
                    var arrCells = [];
                    $(item).find('tr').each(function () {
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
                        dimension_td.css('background-color', '#f0f1f4').css('color', 'black').css('border-bottom-color', 'transparent');
                    });
                    arrCells = ChangeMergedCells(arrCells, cellText, true , false);
                    return;
                }
                dimension_col++;
            });
        });*/

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

    fn_projectPartRatePop : function (key){

        var url = "/inside/pop/busnPartRate.do?pjtSn="+key;

        var name = "_blank";
        var option = "width = 1800, height = 900, top = 200, left = 400, location = no"
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