let calcAmSum = 0;
let acctAm2Sum = 0;
let acctAm1Sum = 0;
let acctAm3Sum = 0;
let subAmSum = 0;

let aSum = 0;
let bSum = 0;

var bld = {

    fn_defaultScript: function (){
        $("#carryoverCash, #carryoverPoint").kendoTextBox();

        bld.getCarryoverAmt();
        // bld.getCurrentAmountStatus();
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
                    // data.fromDate = date.getFullYear().toString() + "0101";
                    // data.toDate = date.getFullYear().toString() + "1231";
                    data.fromDate = $("#g20FrDt").val();
                    data.toDate = $("#g20ToDt").val();
                    data.mgtSeq = $("#pjtCd").val();
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
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
            }
        });

        $("#budgetMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: bld.onDataBound,
            columns: [
                {
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
                        if(e.DIV_FG_NM == "장"){
                            calcAmSum  += Number(e.CALC_AM);
                        }
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }, {
                    title: "입금완료",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            acctAm2Sum += Number(e.ACCT_AM_3 - e.RETURN_AMT);
                        }
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_3 - e.RETURN_AMT)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm2Sum)+"</div>";
                    }
                }, {
                    title: "입금대기",
                    width: 150,
                    template: function(e){
                        if(e.FULL_WAIT_CK != null){
                            if(e.DIV_FG_NM == "장"){
                                acctAm1Sum += Number(e.FULL_WAIT_CK);
                            }
                            return "<div style='text-align: right'>"+comma(e.FULL_WAIT_CK)+"</div>";
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
                        if(e.BGT_NM == "연구개발"){
                            console.log("e", e);
                        }
                        var amtTxt = 0;
                        if(e.FULL_WAIT_CK != null){
                            amtTxt = comma(e.ACCT_AM_3 + e.FULL_WAIT_CK - e.RETURN_AMT);
                        } else {
                            return "<div style='text-align: right'>"+comma(e.ACCT_AM_2 + e.WAIT_CK - e.RETURN_AMT)+"</div>";
                            amtTxt = comma(e.ACCT_AM_3 + e.FULL_WAIT_CK);
                        }

                        return '<div style="text-align: right;font-weight: bold;"><a href="javascript:void(0);" style="text-align: right;" onclick="bld.fn_budgetDetailViewPop(\''+e.DIV_FG+'\', \''+e.BGT_CD+'\', \'B\')">'+amtTxt+'</a></div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm2Sum+acctAm1Sum)+"</div>";
                    }
                }, {
                    title: "예산잔액",
                    width: 150,
                    template: function(e){
                        var amtTxt = 0;
                        if(e.FULL_WAIT_CK != null){
                            amtTxt = comma(Number(e.CALC_AM - (e.ACCT_AM_3 + e.FULL_WAIT_CK - e.RETURN_AMT)));
                        } else {
                            amtTxt = comma(Number(e.CALC_AM - (e.ACCT_AM_3 + e.WAIT_CK - e.RETURN_AMT)));
                        }

                        if(e.DIV_FG_NM == "장"){
                            if(e.FULL_WAIT_CK != null){
                                subAmSum += Number(e.CALC_AM - (e.ACCT_AM_3 + e.FULL_WAIT_CK - e.RETURN_AMT));
                            } else {
                                subAmSum += Number(e.CALC_AM - (e.ACCT_AM_3 + e.WAIT_CK - e.RETURN_AMT));
                            }
                        }
                        return "<div style='text-align: right'>"+comma(amtTxt)+"</div>";
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
                    // data.fromDate = date.getFullYear().toString() + "0101";
                    // data.toDate = date.getFullYear().toString() + "1231";
                    data.fromDate = $("#g20FrDt").val();
                    data.toDate = $("#g20ToDt").val();
                    data.mgtSeq = $("#pjtCd").val()
                    data.opt01 = '3';
                    data.opt02 = '1';
                    data.opt03 = '2';
                    data.baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
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
            }
        });

        $("#budgetMainGrid2").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: bld.onDataBound,
            columns: [
                {
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
                        if(e.DIV_FG_NM == "장"){
                            calcAmSum  += Number(e.CALC_AM);
                        }
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }, {
                    title: "지출완료",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            acctAm3Sum += Number(e.ACCT_AM_3);
                            aSum += Number(e.aSum);
                            bSum += Number(e.bSum);
                        }
                        console.log("aSum = ", aSum);
                        console.log("bSum = ", bSum);
                        return "<div style='text-align: right'>"+comma(e.ACCT_AM_3)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm3Sum)+"</div>";
                    }
                }, {
                    title: "지출대기",
                    width: 150,
                    template: function(e){
                        if(e.WAIT_CK != null){
                            if(e.DIV_FG_NM == "장"){
                                acctAm1Sum += Number(e.WAIT_CK);
                            }
                            return "<div style='text-align: right'>"+comma(e.WAIT_CK)+"</div>";
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
                        if(e.DIV_FG_NM == "장"){
                            acctAm2Sum  += Number(e.ACCT_AM_2 + e.WAIT_CK);
                        }
                        return '<div style="text-align: right;font-weight: bold;"><a href="javascript:void(0);" style="text-align: right;" onclick="bld.fn_budgetDetailViewPop(\''+e.DIV_FG+'\', \''+e.BGT_CD+'\', \'A\')">'+comma(e.ACCT_AM_2 + e.WAIT_CK)+'</a></div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(acctAm2Sum)+"</div>";
                    }
                }, {
                    title: "예산잔액",
                    width: 150,
                    template: function(e){
                        if(e.DIV_FG_NM == "장"){
                            subAmSum += Number(e.CALC_AM - (e.ACCT_AM_2 + e.WAIT_CK));
                        }
                        return "<div style='text-align: right'>"+comma(Number(e.CALC_AM - (e.ACCT_AM_2 + e.WAIT_CK)))+"</div>";
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

    // getCurrentAmountStatus : function(){
    //     console.log("getCurrentAmountStatus");
    //     var data = {
    //         bankNB : $("#bankNB").val().replaceAll("-", ""),
    //     }
    //     $.ajax({
    //         url : "/mng/getCurrentAmountStatus",
    //         data : data,
    //         type : "post",
    //         dataType : "json",
    //         success : function(rs){
    //             if(rs.data != null){
    //                 $("#currentAmt").text(comma(rs.data.TX_CUR_BAL));
    //             } else {
    //                 $("#currentAmt").text("-");
    //             }
    //         }
    //     })
    // },

    fn_budgetDetailViewPop : function(type, bgtCd, temp){
        var url = "/mng/pop/budgetDetailView.do?pjtCd=" + $("#pjtCd").val() + "&bgtCd=" + bgtCd + "&type=" + type + "&temp=" + temp + "&strDt=" + $("#g20FrDt").val() + "&endDt=" + $("#g20ToDt").val();
        var name = "_blank";
        var option = "width = 1000, height = 720, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    getCarryoverAmt: function(){
        var data = {
            pjtCd : $("#pjtCd").val()
        }

        $.ajax({
            url : "/mng/getCarryoverAmt",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.data != null){
                    $("#carryoverCash").val(comma(rs.data.CARRYOVER_CASH || 0));
                    $("#carryoverPoint").val(comma(rs.data.CARRYOVER_POINT || 0));
                } else {
                    $("#carryoverCash").val(comma(0));
                    $("#carryoverPoint").val(comma(0));
                }

                bld.fn_getIncpExnpAmt();
            }
        })
    },

    fn_carryoverSave : function(e){
        var data = {
            pjtCd : $("#pjtCd").val()
        }

        if(e == "cash"){
            if(!$("#carryoverCash").val()){
                alert("금액을 입력해주세요.");
                return;
            }

            if(!confirm("이월금액(현금)을 저장 하시겠습니까?")){
                return;
            }

            data.carryoverCash = uncommaN($("#carryoverCash").val());
        } else {
            if(!$("#carryoverPoint").val()){
                alert("금액을 입력해주세요.");
                return;
            }

            if(!confirm("이월금액(포인트)을 저장 하시겠습니까?")){
                return;
            }

            data.carryoverPoint = uncommaN($("#carryoverPoint").val());
        }

        $.ajax({
            url : "/mng/updCarryoverAmt",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                alert("저장되었습니다.");
                window.location.reload();
            }
        })


    },

    onDataBound : function(){
        calcAmSum = 0;
        acctAm2Sum = 0;
        acctAm1Sum = 0;
        acctAm3Sum = 0;
        subAmSum = 0;

        var grid = $("#budgetMainGrid").data("kendoGrid");
        var data = grid.dataSource.data();
        $.each(data, function (i, row) {
            if(row.DIV_FG_NM == "장"){
                $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#FFFCE3");
            }

            if(row.DIV_FG_NM == "관"){
                $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#EAEBFF");
            }

            if(row.DIV_FG_NM == "항"){
                $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#E7FFDD");
            }
        });

        var grid = $("#budgetMainGrid2").data("kendoGrid");
        var data = grid.dataSource.data();
        $.each(data, function (i, row) {
            if(row.DIV_FG_NM == "장"){
                $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#FFFCE3");
            }

            if(row.DIV_FG_NM == "관"){
                $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#EAEBFF");
            }

            if(row.DIV_FG_NM == "항"){
                $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#E7FFDD");
            }
        });
    },

    fn_getIncpExnpAmt: function(){
        var data = {
            pjtCd : $("#pjtCd").val(),
            baNb : $("#bankNB").val().replaceAll("-", "")
        }

        var rs = customKendo.fn_customAjax("/mng/getIncpExnpAmt", data);

        rs = rs.rs;

        var overPay = Number(uncommaN($("#carryoverCash").val())) + Number(uncommaN($("#carryoverPoint").val()));

        var totPay = overPay + Number(rs.incpA) - Number(rs.exnpA) + Number(rs.incpB) - Number(rs.exnpB);
        $("#currentAmt").text(comma(totPay));
    }
}

function inputNumberFormatN (obj){
    obj.value = comma(uncommaN(obj.value));
}

function uncommaN(str) {
    str = String(str);
    return str.replace(/[^\d-]|(?<=\d)-/g, '');
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}