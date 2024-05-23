var taxList = {

    fn_defaultScript : function (){

        taxList.mainGrid();
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/tax/getTaxList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
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
            height: 508,
            pageable: {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="outUseList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "거래일자",
                    width: 100,
                    template : function (e){
                        return e.ACCT_TXDAY.substring(0, 4) + "-" + e.ACCT_TXDAY.substring(4, 6) + "-" + e.ACCT_TXDAY.substring(6, 8);
                    }
                }, {
                    title: "계좌번호",
                    width: 150,
                    template : function (e){
                        return e.ACCT_NO;
                    }
                }, {
                    title: "입/출금",
                    width: 80,
                    template: function(e){
                        if(e.INOUT_GUBUN == 1){
                            return "출금";
                        }else if(e.INOUT_GUBUN == 2){
                            return "입금";
                        }
                    }
                }, {
                    title: "입/출금액",
                    width: 100,
                    template: function (e){
                        if(e.INOUT_GUBUN == 1){
                            return '<div style="text-align: right;">'+comma(e.OUT_AMOUNT)+'</div>';
                        }else if(e.INOUT_GUBUN == 2){
                            return '<div style="text-align: right;">'+comma(e.INCOM_AMOUNT)+'</div>';
                        }
                    }
                }, {
                    title: "적요",
                    width: 200,
                    template : function(e){
                        return e.JEOKYO;
                    }
                }, {
                    title: "계좌명",
                    width: 120,
                    field: "BRANCH"
                }
            ]
        }).data("kendoGrid");
    },

    inputNumberFormat : function(obj){
        obj.value = taxList.comma(taxList.uncomma(obj.value));
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

}