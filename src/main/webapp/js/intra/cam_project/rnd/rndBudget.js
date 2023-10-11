var rndBg = {


    fn_defaultScript : function (setParameters){

        console.log(setParameters);

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);

        if(setParameters != null){
            var data = {
                gisu : year,
                fromDate : date.getFullYear().toString() + "0101",
                toDate : date.getFullYear().toString() + "1231",
                mgtSeq : setParameters.PJT_CD,
                opt01 : '3',
                opt02 : '1',
                opt03 : '2',
                baseDate : date.getFullYear().toString() + date.getMonth().toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
            }

            rndBg.budgetMainGrid(data);
        }

        // $.ajax({
        //     url : "/g20/getSubjectList",
        //     data : data,
        //     type : "post",
        //     dataType : "json",
        //     success : function (rs){
        //         console.log(rs);
        //     }
        // })

    },

    gridReload : function (){
        $("#budgetMainGrid").data("kendoGrid").dataSource.read();
    },

    budgetMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getSubjectList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    var date = new Date();
                    var year = date.getFullYear().toString().substring(2,4);

                    data.gisu = year;
                    data.fromDate = date.getFullYear().toString() + "0101";
                    data.toDate = date.getFullYear().toString() + "1231";
                    data.mgtSeq = $("#mgtCd").val();
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.baseDate = date.getFullYear().toString() + date.getMonth().toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
                    data.pjtSn = $("#pjtSn").val();
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
            pageSize: 100,
        });

        $("#budgetMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 600,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function (e){
                $('#budgetMainGrid > .k-grid-content > table').each(function (index, item) {
                    var dimension_col = 1;
                    var dimension_col2 = 1;

                    // First, scan first row of headers for the "Dimensions" column.
                    $('#budgetMainGrid>.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
                        if ($(this).text() == '장') {

                            // first_instance holds the first instance of identical td
                            var first_instance = null;

                            $(item).find('tr').each(function () {

                                // find the td of the correct column (determined by the colTitle)
                                var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

                                if (first_instance == null) {
                                    first_instance = dimension_td;
                                } else if (dimension_td.text() == first_instance.text()) {
                                    // if current td is identical to the previous
                                    // then remove the current td
                                    dimension_td.remove();
                                    // increment the rowspan attribute of the first instance
                                    first_instance.attr('rowspan', typeof first_instance.attr('rowspan') == "undefined" ? 2 : Number(first_instance.attr('rowspan')) + 1);
                                } else {
                                    // this cell is different from the last
                                    first_instance = dimension_td;
                                }
                            });
                            return;
                        }
                        dimension_col++;


                        if ($(this).text() == '관') {

                            // first_instance holds the first instance of identical td
                            var first_instance = null;

                            $(item).find('tr').each(function () {

                                // find the td of the correct column (determined by the colTitle)
                                var dimension_td = $(this).find('td:nth-child(' + dimension_col2 + ')');

                                if (first_instance == null) {
                                    first_instance = dimension_td;
                                } else if (dimension_td.text() == first_instance.text()) {
                                    // if current td is identical to the previous
                                    // then remove the current td
                                    dimension_td.remove();
                                    // increment the rowspan attribute of the first instance
                                    first_instance.attr('rowspan', typeof first_instance.attr('rowspan') == "undefined" ? 2 : Number(first_instance.attr('rowspan')) + 1);
                                } else {
                                    // this cell is different from the last
                                    first_instance = dimension_td;
                                }
                            });
                            return;
                        }
                        dimension_col2++;

                    });

                });
            },
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 80
                }, {
                    field: "",
                    title: "구분",
                    width: 100
                }, {
                    title: "계정코드",
                    field: "",
                    width: 150
                }, {
                    title: "장",
                    width: 250,
                    field: "BGT01_NM"
                }, {
                    title: "관",
                    field: "BGT02_NM",
                    width: 250
                }, {
                    title: "항",
                    field: "BGT03_NM",
                    width: 150
                }, {
                    title: "예산액(현물)",
                    field: "",
                    width: 150,
                    template: function(e){
                        console.log(e);
                    }
                }, {
                    title: "예산액 합계",
                    field: "",
                    footerTemplate: function (e){
                        return "합계 : 0";
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


}