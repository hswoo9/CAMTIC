var payDetView = {

    fn_defaultScript : function (){

        customKendo.fn_textBox(["searchValue"]);
        this.fn_search();

        $("#searchValue").on("keyup", function(key){
            if(key.keyCode == 13){
                payDetView.payDetMainGrid();
            }
        })
    },

    fn_search: function (){
        this.payDetMainGrid();
    },

    gridReload : function (){
        $("#payDetMainGrid").data("kendoGrid").dataSource.read();
    },

    payDetMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getBankList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.searchValue = $("#searchValue").val();
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
            pageSize: 10
        });

        $("#payDetMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: payDetView.onDataBound,
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 50
                }, {
                    title: "계좌명",
                    width: 150,
                    field : "TR_NM"
                }, {
                    title: "계좌번호",
                    width: 150,
                    template: function(e){
                        if(e.JIRO_NM != null){
                            return "[" + e.JIRO_NM + "] " + e.BA_NB;
                        } else {
                            return e.BA_NB;
                        }
                    }
                }, {
                    title: "예금주",
                    width: 100,
                    field : "DEPOSITOR"
                }, {
                    title: "기타",
                    width: 50,
                    template: function(e){
                        var bgtNm = e.BGT1_NM + " / " + e.BGT2_NM + " / " + e.BGT_NM;
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="payDetView.fn_selBankInfo(' + e.TR_CD + ', \'' + e.TR_NM + '\', \'' + e.BA_NB + '\', \'' + e.DEPOSITOR + '\', \'' + e.JIRO_NM + '\')">선택</button>';
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
    },

    fn_selBankInfo: function (cd, nm, baNb, depositor, jiro){
        opener.parent.fn_selBankInfo(cd, nm, baNb, depositor, jiro);

        window.close();
    },

    fn_popAddData : function (type){
        var url = "";

        if(type == "1" || type == "2"){
            url = "/mng/pop/addClientView.do?type=" + type;
        }

        var name = "_blank";
        var option = "width = 900, height = 470, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}
