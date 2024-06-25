let calcAmSum = 0;
let acctAm2Sum = 0;
let acctAm1Sum = 0;
let acctAm3Sum = 0;
let subAmSum = 0;


var bgView = {

    fn_defaultScript : function (setParameters){
        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);

        if($("#pjtCd").val() != ""){
            var data = {
                gisu : year,
                fromDate : $("#g20FrDt").val(),
                toDate : $("#g20ToDt").val(),
                mgtSeq : $("#pjtCd").val(),
                opt01 : '3',
                opt02 : '1',
                opt03 : '2',
            }

            if(opener.parent.$("#baseYear").val() != null && opener.parent.$("#baseYear").val() != undefined && opener.parent.$("#baseYear").val() != "") {
                data.baseDate = opener.parent.$("#baseYear").val() + "0101";
            } else {
                data.baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
            }

            bgView.budgetMainGrid(data);
        }

        customKendo.fn_textBox(["searchValue"]);

    },

    gridReload : function (){
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
                    data.fromDate = $("#g20FrDt").val();
                    data.toDate = $("#g20ToDt").val();
                    data.mgtSeq = $("#pjtCd").val();
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.pjtSn = $("#pjtSn").val();
                    data.searchValue = $("#searchValue").val();

                    if(opener.parent.$("#baseYear").val() != null && opener.parent.$("#baseYear").val() != undefined && opener.parent.$("#baseYear").val() != "") {
                        data.baseDate = opener.parent.$("#baseYear").val() + "0101";
                    } else {
                        data.baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
                    }

                    if($("#status").val() != "incp" && $("#status").val() != "re"){
                        data.temp = 2;

                        if($("#payAppType").val() == "4" || $("#payAppType").val() == "3"){
                            data.temp = 1;
                        }
                    }else{
                        data.temp = 1;
                    }
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
            dataBound: bgView.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '항 검색 : <input type="text" id="searchValue" onkeypress="if(window.event.keyCode==13){bgView.gridReload();}" />' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button k-button-solid-base" onclick="bgView.gridReload()">' +
                            '<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
                columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 80
                }, {
                    title: "장",
                    width: 150,
                    field : "BGT1_NM",

                }, {
                    title: "관",
                    width: 150,
                    field : "BGT2_NM"
                }, {
                    title: "항",
                    width: 150,
                    template: function (e){
                        console.log(e)

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
                },
                // , {
                //     title: "지출완료",
                //     width: 150,
                //     template: function(e){
                //         acctAm2Sum  += Number(e.ACCT_AM_2);
                //         return "<div style='text-align: right'>"+comma(e.ACCT_AM_2)+"</div>";
                //     },
                //     footerTemplate: function(){
                //         return "<div style='text-align: right'>"+comma(acctAm2Sum)+"</div>";
                //     }
                // }, {
                //     title: "지출대기",
                //     width: 150,
                //     template: function(e){
                //         if(e.ACCT_AM_1 != null){
                //             acctAm1Sum += Number(e.ACCT_AM_1);
                //             return "<div style='text-align: right'>"+comma(e.ACCT_AM_1)+"</div>";
                //         } else {
                //             return "<div style='text-align: right'>0</div>";
                //         }
                //     },
                //     footerTemplate: function(){
                //         return "<div style='text-align: right'>"+comma(acctAm1Sum)+"</div>";
                //     }
                // }, {
                //     title: "승인",
                //     width: 150,
                //     template: function(e){
                //         acctAm3Sum += Number(e.ACCT_AM_3);
                //         return "<div style='text-align: right'>"+comma(e.ACCT_AM_3)+"</div>";
                //     },
                //     footerTemplate: function(){
                //         return "<div style='text-align: right'>"+comma(acctAm3Sum)+"</div>";
                //     }
                // },
                {
                    title: "예산잔액",
                    width: 150,
                    template: function(e){
                        var subAm = "";
                        if(e.DIV_FG_NM == "항"){
                            if($("#status").val() != "incp"){
                                if($("#payAppType").val() == "4"){
                                    subAm += Number(e.SUB_AM);
                                    subAmSum += Number(e.SUB_AM);
                                } else {
                                    subAm = Number(e.CALC_AM - (e.ACCT_AM_2 + (e.WAIT_CK || 0)));
                                    subAmSum += Number(e.CALC_AM - (e.ACCT_AM_2 + (e.WAIT_CK||0)));
                                }
                            } else {
                                subAmSum += Number(e.SUB_AM);
                                subAm = Number(e.SUB_AM);
                            }
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
                            if($("#status").val() != "incp"){
                                if($("#payAppType").val() == "4"){
                                    subAm += Number(e.SUB_AM);
                                } else {
                                    subAm = Number(e.CALC_AM - (e.ACCT_AM_2 + (e.WAIT_CK || 0)));
                                }
                            } else {
                                subAm = Number(e.SUB_AM);
                            }
                        }
                        console.log(e.SUB_AM);
                        console.log(e.CALC_AM);
                        console.log(e.WAIT_CK);
                        console.log(subAm);

                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bgView.fn_selBudgetInfo(\'' + e.BGT_CD + '\', \'' + bgtNm + '\', \'' + idx + '\', \'' + subAm + '\')">선택</button>';
                    }
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");


    },


    fn_popBudgetAdd : function (){
        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var url = "/projectRnd/pop/popBudget.do?pjtSn="+data.pjtSn;

        var name = "_blank";
        var option = "width = 900, height = 420, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
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
            if($("#status").val() != "incp"){
                if(subAm <= 0) {
                    alert("예산잔액이 부족합니다.");
                    return;
                }
            }
        }

        if(idx == 'all'){
            if(!confirm("선택하신 예산비목으로 전체변경 하시겠습니까?")) {
                return;
            }
        }

        opener.parent.fn_selBudgetInfo(name, cd, idx, subAm);

        window.close();
    }
}