let calcAmSum = 0;
let acctAm2Sum = 0;
let acctAm1Sum = 0;
let acctAm3Sum = 0;
let subAmSum = 0;


var depoBgtMng = {

    fn_defaultScript : function (setParameters){

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);

        if($("#pjtCd").val() != ""){
            var data = {
                gisu : year,
                fromDate : date.getFullYear().toString() + "0101",
                toDate : date.getFullYear().toString() + "1231",
                startDt : date.getFullYear().toString() + "-01-01",
                endDt : date.getFullYear().toString() + "-12-31",
                mgtSeq : $("#pjtCd").val(),
                opt01 : '3',
                opt02 : '1',
                opt03 : '2',
                baseDate : date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'),
                temp : $("input[name='budgetType']:checked").val()
            };

            depoBgtMng.budgetMainGrid(data);
        }
    },

    gridReload : function (e){
        $("#budgetMainGrid").data("kendoGrid").dataSource.read();
    },

    budgetMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getBudgetListDuplDel",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    var date = new Date();
                    var year = date.getFullYear().toString().substring(2,4);

                    data.gisu = year;
                    data.fromDate = date.getFullYear().toString() + "0101";
                    data.toDate = date.getFullYear().toString() + "1231";
                    data.startDt = date.getFullYear().toString() + "-01-01";
                    data.endDt = date.getFullYear().toString() + "-12-31";
                    data.mgtSeq = $("#pjtCd").val();
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.pjtSn = $("#pjtSn").val();
                    data.searchValue = $("#searchValue").val();
                    data.baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
                    data.temp = $("input[name='budgetType']:checked").val();

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
            pageSize: 100
        });

        $("#budgetMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: depoBgtMng.onDataBound,
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 80
                }, {
                    title: "장",
                    width: 150,
                    field : "BGT1_NM"
                }, {
                    title: "관",
                    width: 150,
                    field : "BGT2_NM"
                }, {
                    title: "항",
                    width: 150,
                    template: function (e){
                        if(e.DIV_FG_NM == "항"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    },
                    footerTemplate: "합계"
                }, {
                    title: "예산액",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "항"){
                            calcAmSum  += Number(e.CALC_AM);
                        }
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }, {
                    title: "예산잔액",
                    width: 150,
                    template: function(e){
                        var subAm = "";
                        if(e.DIV_FG_NM == "항"){
                            subAmSum += Number(e.CALC_AM - e.APPROVAL_AMT);
                            subAm = Number(e.CALC_AM - e.APPROVAL_AMT);
                        }
                        return "<div style='text-align: right'>"+comma(subAm)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(subAmSum)+"</div>";
                    }
                }, {
                    title: "기타",
                    width: 80,
                    template: function(e){
                        var bgtNm = e.BGT1_NM + " / " + e.BGT2_NM + " / " + e.BGT_NM;
                        var idx = $("#idx").val();
                        var subAm = 0;

                        if(e.DIV_FG_NM == "항"){
                            subAm = Number(e.CALC_AM - e.APPROVAL_AMT);
                        }

                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="depoBgtMng.fn_selBudgetInfo(\'' + e.BGT_CD + '\', \'' + bgtNm + '\', \'' + idx + '\', \'' + subAm + '\')">선택</button>';
                    }
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        calcAmSum = 0;
        acctAm2Sum = 0;
        acctAm1Sum = 0;
        acctAm3Sum = 0;
        subAmSum = 0;

        $('#budgetMainGrid >.k-grid-content>table').each(function (index, item) {
            var dimension_col = 1;
            // First, scan first row of headers for the "Dimensions" column.
            $('#budgetMainGrid >.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
                var _this = $(this);
                if (_this.text() == "장") {
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
                        dimension_td.css('background-color', 'white').css('color', 'black').css('border-bottom-color', 'transparent');
                    });
                    arrCells = ChangeMergedCells(arrCells, cellText, true);
                    return;
                }
                dimension_col++;
            });
        });

        $('#budgetMainGrid >.k-grid-content>table').each(function (index, item) {
            var dimension_col = 1;
            // First, scan first row of headers for the "Dimensions" column.
            $('#budgetMainGrid >.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
                var _this = $(this);
                if (_this.text() == "관") {
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
                        dimension_td.css('background-color', 'white').css('color', 'black').css('border-bottom-color', 'transparent');
                    });
                    arrCells = ChangeMergedCells(arrCells, cellText, true);
                    return;
                }
                dimension_col++;
            });
        });

        function ChangeMergedCells(arrCells, cellText, addBorderToCell) {
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

    fn_selBudgetInfo: function (cd, name, idx, subAm){
        if(name != "기타 / 기타 / 기타"){
            if(subAm <= 0) {
                alert("예산잔액이 부족합니다.");
                return;
            }
        }

        opener.parent.fn_selBudgetInfo(name, cd, idx, subAm);

        window.close();
    },

    changeGrid : function (e){
        if(e == 1){
            $("#budgetMainGrid").css("display", "");
            $("#budgetMainGrid2").css("display", "none");
        }else{
            $("#budgetMainGrid").css("display", "none");
            $("#budgetMainGrid2").css("display", "");
        }
    }
}