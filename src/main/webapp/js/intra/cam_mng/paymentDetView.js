var payDetView = {

    fn_defaultScript : function (){

        customKendo.fn_textBox(["searchValue"]);


        if($("#type").val() == 1 ){
            payDetView.clientMainGrid();
        } else if($("#type").val() == 2) {
            payDetView.clientMainGrid();
        } else if ($("#type").val() == 3){
            payDetView.cardMainGrid();
        } else if ($("#type").val() == 4){
            payDetView.empMainGrid();
        } else if ($("#type").val() == 5){
            payDetView.otherMainGrid();
        } else if ($("#type").val() == 8){
            payDetView.cardMainGrid();
        } else if ($("#type").val() == 9){
            payDetView.otherMainGrid();
        }
    },

    fn_search: function (type){

        if($("#type").val() == 1){
            $("#clientMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 2){
            $("#clientMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 3){
            $("#cardMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 4){
            $("#empMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 5){
            $("#otherMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 8){
            $("#cardMainGrid").data("kendoGrid").dataSource.read();
        } else if ($("#type").val() == 9){
            $("#otherMainGrid").data("kendoGrid").dataSource.read();
        }
    },

    etaxMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getEtaxList",
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

        $("#etaxMainGrid").kendoGrid({
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
            dataBound: payDetView.onDataBound,
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 50
                }, {
                    title: "사업장",
                    width: 120,
                    template: function (e){
                        return e.DIV_NM;
                    }
                }, {
                    title: "발급일자",
                    width: 120,
                    template: function (e){
                        return e.ISU_DT;
                    }
                }, {
                    title: "거래처명",
                    width: 200,
                    template: function (e){
                        return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/>' + e.TR_NM;
                    }
                }, {
                    title: "사업자번호",
                    width: 100,
                    template: function (e){
                        if(e.TRREG_NB != null){
                            return e.TRREG_NB;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "공급가액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: center;">'+comma(e.SUP_AM)+'</div>';
                    }
                }, {
                    title: "세액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: center;">'+comma(e.VAT_AM)+'</div>';
                    }
                }, {
                    title: "합계금액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: center;">'+comma(e.SUM_AM)+'</div>';
                    }
                }, {
                    title: "",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base" ' +
                            'onclick="payDetView.fn_selEtaxInfo(\'' + e.TR_CD + '\', \'' + e.TR_NM + '\', \'' + e.ISU_DT + '\', \'' + e.TRREG_NB + '\', \'' + e.SUP_AM + '\', \'' + e.VAT_AM +  '\', \'' + e.SUM_AM + '\')" style="font-size: 12px);">' +
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
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                        console.log(e);
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
                    data.searchType = $("#type").val();
                    data.cardVal = $("#cardVal").val();
                    if($("#type").val() == "8" && $("#index").val() == "9999"){
                        data.privateYn = "Y";
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
            pageSize: 10
        });

        $("#cardMainGrid").kendoGrid({
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

    empMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/mng/getMemList",
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

        $("#empMainGrid").kendoGrid({
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
            dataBound: payDetView.onDataBound,
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 50
                }, {
                    title: "이름",
                    width: 100,
                    template: function (e){
                        return '<input type="hidden" id="trCd" value="' + e.ERP_EMP_SEQ + '"/>' + e.EMP_NAME_KR;
                    }
                }, {
                    title: "주민번호",
                    width: 200,
                    field : "RES_REGIS_NUM"
                }, {
                    title: "지급계좌",
                    width: 200,
                    field : "ACCOUNT_NUM"
                }, {
                    title: "예금주",
                    width: 100,
                    field : "ACCOUNT_HOLDER"
                }, {
                    title: "",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base" ' +
                            'onclick="payDetView.fn_selEmpInfo(\'' + e.ERP_EMP_SEQ + '\', \'' + e.BANK_NAME + '\', \'' + e.ACCOUNT_NUM + '\', \'' + e.ACCOUNT_HOLDER + '\', \'' + e.EMP_NAME_KR + '\', \'' + e.RES_REGIS_NUM + '\')" style="font-size: 12px);">' +
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

    otherMainGrid : function (params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getOtherList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.searchValue = $("#searchValue").val();
                    data.type = $("#type").val();
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

        $("#otherMainGrid").kendoGrid({
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
            dataBound: payDetView.onDataBound,
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 50
                }, {
                    title: "이름",
                    width: 200,
                    template: function (e){
                        return '<input type="hidden" id="trCd" value="' + e.PER_CD + '"/>' + e.PER_NM;
                    }
                }, {
                    title: "주민번호",
                    width: 80,
                    template: function (e){
                        if(e.REG_NO != null){
                            return e.REG_NO;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "지급계좌",
                    width: 100,
                    template: function (e){
                        if(e.ACCT_NO != null){
                            return e.ACCT_NO;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "은행",
                    width: 80,
                    template: function (e){
                        if(e.BANK_NM != null){
                            return e.BANK_NM;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "예금주",
                    width: 150,
                    template: function (e){
                        if(e.ACCT_NM != null){
                            return e.ACCT_NM;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base" ' +
                            'onclick="payDetView.fn_selOtherInfo(\'' + e.PER_CD + '\', \'' + e.PER_NM + '\', \'' + e.ACCT_NO + '\', \'' + e.ACCT_NM + '\', \'' + e.BANK_NM + '\', \'' + e.REG_NO2 + '\')" style="font-size: 12px);">' +
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

    fn_selOtherInfo: function (trCd, perNm, acctNo, acctNm, bankNm, regNo){
        var idx = $("#index").val();
        var type = $("#type").val();
        opener.parent.fn_selOtherInfo(trCd, bankNm, acctNm, acctNo, perNm, idx, type, regNo);

        window.close();
    },

    fn_selEmpInfo : function (trCd, bankName, accountNum, accountHolder, empNameKr, regNo) {
        console.log(accountHolder)
        var idx = $("#index").val();
        opener.parent.fn_selEmpInfo(trCd, bankName, accountNum, accountHolder, empNameKr, idx, regNo);

        window.close();
    },

    fn_selBankInfo: function (cd, nm, baNb, depositor, jiro){
        opener.parent.fn_selBankInfo(cd, nm, baNb, depositor, jiro);

        window.close();
    },

    fn_popAddData : function (type){
        var url = "";

        if(type == "1" || type == "2"){
            url = "/mng/pop/addClientView.do?type=" + type;
        } else if(type == "9" || type == "5"){
            url = "/mng/pop/addEmpView.do?type=" + type;
        }

        var name = "_blank";
        var option = "width = 900, height = 470, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_selClientInfo: function (trCd, trNm, baNb, depositor, jiro, ceoNm, regNb){
        var idx = $("#index").val();

        if(opener.parent.regPay) {
            opener.parent.fn_selClientInfoForRegPay(trCd, trNm, baNb, depositor, jiro, ceoNm, regNb, idx);
        } else {
            opener.parent.fn_selClientInfo(trCd, trNm, baNb, depositor, jiro, ceoNm, regNb, idx);
        }

        window.close();
    },

    fn_selCardInfo: function (trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor){
        var idx = $("#index").val();

        if(idx == "9999"){
            $.ajax({
                url: "/card/getCardAuthList",
                data: {
                    cardNo: cardBaNb
                },
                dataType: "json",
                type: "POST",
                success: function(rs){
                    if(rs.list.length > 0){
                        alert("이미 등록된 카드입니다.");
                        return;
                    } else {
                        opener.parent.cardAuthMng.fn_selCardInfo(trCd, trNm, cardBaNb);
                        window.close();
                    }
                }
            });
        } else {
            opener.parent.fn_selCardInfo(trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor, idx);
            window.close();
        }
    },

    fn_selEtaxInfo : function (trCd, trNm, isuDt, trregNb, supAm, vatAm, sumAm) {
        var idx = $("#index").val();
        opener.parent.fn_selEtaxInfo(trCd, trNm, isuDt, trregNb, supAm, vatAm, sumAm, idx);

        window.close();
    }
}
