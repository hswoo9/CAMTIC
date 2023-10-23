var payDetView = {

    fn_defaultScript : function (){

        customKendo.fn_textBox(["searchValue"]);


        if($("#type").val() == 1 || $("#type").val() == 2){
            payDetView.clientMainGrid();
        } else if ($("#type").val() == 3){
            payDetView.cardMainGrid();
        } else if ($("#type").val() == 4){
            payDetView.empMainGrid();
        } else if ($("#type").val() == 5){
            payDetView.otherMainGrid();
        }
    },

    fn_search: function (type){

        if($("#type").val() == 1 || $("#type").val() == 2){
            $("#clientMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 3){
            $("#cardMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 4){
            $("#empMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 5){
            $("#otherMainGrid").data("kendoGrid").dataSource.read();
        }
    },

    clientMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getClientList",
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

        $("#clientMainGrid").kendoGrid({
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
                    title: "업체명",
                    width: 200,
                    template: function (e){
                        return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/>' + e.TR_NM;
                    }
                }, {
                    title: "대표자",
                    width: 80,
                    template: function (e){
                        if(e.CEO_NM != null){
                            return e.CEO_NM;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "사업자번호",
                    width: 100,
                    template: function (e){
                        if(e.REG_NB != null){
                            return e.REG_NB;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "은행명",
                    width: 80,
                    template: function (e){
                        if(e.JIRO_NM != null){
                            return e.JIRO_NM;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "지급계좌",
                    width: 150,
                    template: function (e){
                        if(e.BA_NB != null){
                            return e.BA_NB;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "예금주",
                    width: 150,
                    template: function (e){
                        if(e.DEPOSITOR != null){
                            return e.DEPOSITOR;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base" ' +
                            'onclick="payDetView.fn_selClientInfo(\'' + e.TR_CD + '\', \'' + e.TR_NM + '\', \'' + e.BA_NB + '\', \'' + e.DEPOSITOR + '\', \'' + e.JIRO_NM + '\', \'' + e.CEO_NM + '\', \'' + e.REG_NB + '\')" style="font-size: 12px);">' +
                            '   선택' +
                            '</button>';
                    }
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    cardMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getCardList",
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

        $("#cardMainGrid").kendoGrid({
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
                    title: "카드명",
                    width: 300,
                    template: function (e){
                        return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/><input type="hidden" id="clttrCd" value="e.CLTTR_CD" />' + e.TR_NM;
                    }
                }, {
                    title: "카드번호",
                    width: 250,
                    template: function (e){
                        if(e.CARD_BA_NB != null){
                            return e.CARD_BA_NB;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base" ' +
                            'onclick="payDetView.fn_selCardInfo(\'' + e.TR_CD + '\', \'' + e.TR_NM + '\', \'' + e.CARD_BA_NB + '\', \'' + e.JIRO_NM + '\', \'' + e.CLTTR_CD + '\', \'' + e.BA_NB + '\', \'' + e.DEPOSITOR + '\')" style="font-size: 12px);">' +
                            '   선택' +
                            '</button>';
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
    },

    fn_selClientInfo: function (trCd, trNm, baNb, depositor, jiro, ceoNm, regNb){
        var idx = $("#index").val();
        opener.parent.fn_selClientInfo(trCd, trNm, baNb, depositor, jiro, ceoNm, regNb, idx);

        window.close();
    },

    fn_selCardInfo: function (trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor){
        var idx = $("#index").val();
        opener.parent.fn_selCardInfo(trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor, idx);

        window.close();
    }
}
