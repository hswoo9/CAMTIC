let calcAmSum = 0;
let acctAm2Sum = 0;
let acctAm1Sum = 0;
let acctAm3Sum = 0;
let subAmSum = 0;

var bld = {

    fn_defaultScript: function (){
        bld.budgetMainGrid();
        bld.budgetMainGrid2();
    },

    budgetMainGrid : function(){
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
                    data.stat = "project";
                    data.gisu = year;
                    data.fromDate = date.getFullYear().toString() + "0101";
                    data.toDate = date.getFullYear().toString() + "1231";
                    data.mgtSeq = $("#pjtCd").val()
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.baseDate = date.getFullYear().toString() + date.getMonth().toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
                    data.pjtSn = $("#pjtSn").val();
                    data.temp = '1'; /*수입예산 1 , 지출예산 2*/
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
            height: 600,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: bld.onDataBound,
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 80
                }, {
                    title: "장",
                    width: 250,
                    template: function (e){
                        if(e.DIV_FG_NM == "장"){
                            return "<div style='font-weight: bold'>"+e.BGT_NM+"</div>";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "관",
                    width: 250,
                    template: function (e){
                        if(e.DIV_FG_NM == "관"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    }
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
                        calcAmSum  += Number(e.CALC_AM);
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }, {
                    title: "지출완료",
                    width: 150,
                    template: function(e){
                        acctAm2Sum  += Number(e.ACCT_AM_2);
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_2)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm2Sum)+"</div>";
                    }
                }, {
                    title: "지출대기",
                    width: 150,
                    template: function(e){
                        if(e.ACCT_AM_1 != null){
                            acctAm1Sum += Number(e.ACCT_AM_1);
                            return "<div style='text-align: right'>"+comma(e.ACCT_AM_1)+"</div>";
                        } else {
                            return "<div style='text-align: right'>0</div>";
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm1Sum)+"</div>";
                    }
                }, {
                    title: "승인",
                    width: 150,
                    template: function(e){
                        acctAm3Sum += Number(e.ACCT_AM_3);
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_3)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm3Sum)+"</div>";
                    }
                }, {
                    title: "예산잔액",
                    width: 150,
                    template: function(e){
                        subAmSum += Number(e.SUB_AM);
                        return "<div style='text-align: right'>"+comma(e.SUB_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(subAmSum)+"</div>";
                    }
                }
            ],

            dataBinding: function(){
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    budgetMainGrid2 : function(){
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
                    data.stat = "project";
                    data.gisu = year;
                    data.fromDate = date.getFullYear().toString() + "0101";
                    data.toDate = date.getFullYear().toString() + "1231";
                    data.mgtSeq = $("#pjtCd").val()
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.baseDate = date.getFullYear().toString() + date.getMonth().toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
                    data.pjtSn = $("#pjtSn").val();
                    data.temp = '2'; /*수입예산 1 , 지출예산 2*/
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

        $("#budgetMainGrid2").kendoGrid({
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
            dataBound: bld.onDataBound,
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 80
                }, {
                    title: "장",
                    width: 250,
                    template: function (e){
                        if(e.DIV_FG_NM == "장"){
                            return "<div style='font-weight: bold'>"+e.BGT_NM+"</div>";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "관",
                    width: 250,
                    template: function (e){
                        if(e.DIV_FG_NM == "관"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    }
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
                        calcAmSum  += Number(e.CALC_AM);
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }, {
                    title: "지출완료",
                    width: 150,
                    template: function(e){
                        acctAm2Sum  += Number(e.ACCT_AM_2);
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_2)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm2Sum)+"</div>";
                    }
                }, {
                    title: "지출대기",
                    width: 150,
                    template: function(e){
                        if(e.ACCT_AM_1 != null){
                            acctAm1Sum += Number(e.ACCT_AM_1);
                            return "<div style='text-align: right'>"+comma(e.ACCT_AM_1)+"</div>";
                        } else {
                            return "<div style='text-align: right'>0</div>";
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm1Sum)+"</div>";
                    }
                }, {
                    title: "승인",
                    width: 150,
                    template: function(e){
                        acctAm3Sum += Number(e.ACCT_AM_3);
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_3)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm3Sum)+"</div>";
                    }
                }, {
                    title: "예산잔액",
                    width: 150,
                    template: function(e){
                        subAmSum += Number(e.SUB_AM);
                        return "<div style='text-align: right'>"+comma(e.SUB_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(subAmSum)+"</div>";
                    }
                }
            ],

            dataBinding: function(){
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    onDataBound : function(){
        calcAmSum = 0;
        acctAm2Sum = 0;
        acctAm1Sum = 0;
        acctAm3Sum = 0;
        subAmSum = 0;
    }
}