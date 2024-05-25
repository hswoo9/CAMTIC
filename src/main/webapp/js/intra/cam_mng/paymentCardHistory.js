var payCardHist = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", 'month', "yyyy-MM-dd", new Date());
        $("#startDt, #endDt").attr("readonly", true);
        $("#startDt").on("change", function(){
            if($(this).val() > $("#endDt").val()){
                $("#endDt").val($(this).val());
            }
        });
        $("#endDt").on("change", function(){
            if($(this).val() < $("#startDt").val()){
                $("#startDt").val($(this).val());
            }
        });
        customKendo.fn_textBox(["searchValue"]);

        const requestType = $("#requestType").val();

        //payCardHist.gridReload();
        payCardHist.cardMainGridReload('M');


        $("#searchValue").on("keyup", function(key){
            if(key.keyCode == 13){
                payCardHist.fn_search($("#requestType").val());
            }
        });

        const reqType = $("#reqType").val();

        /** 출장, 식대 */
        if(reqType == "bustrip" || reqType == "snack"){
            $("#saveBtn").hide();
            $("#saveBtnBustrip").show();

        }

        if(reqType == "bustrip"){
            if(opener.parent.$("#tripDayFr").val() != "" && opener.parent.$("#tripDayTo").val() != ""
                && opener.parent.$("#tripDayFr").val() != null && opener.parent.$("#tripDayTo").val() != null){
                $("#startDt").val(opener.parent.$("#tripDayFr").val());
                $("#endDt").val(opener.parent.$("#tripDayTo").val());

                // $("#startDt").data("kendoDatePicker").enable(false);
                // $("#endDt").data("kendoDatePicker").enable(false);
            }
        } else if(reqType == "snack"){
            if(opener.parent.$("#useDt").val() != "" && opener.parent.$("#useDt").val() != null){
                $("#startDt").val(opener.parent.$("#useDt").val());
            }
        }

        if(requestType != "" && requestType != null && requestType != undefined){
            // $("#startDt").val(opener.parent.$("#tripDayFr").val());
            // $("#endDt").val(opener.parent.$("#tripDayTo").val());

            if(requestType == 1){
                $("#cardM").attr("class", "k-button k-button-solid-base");
                $("#cardP").attr("class", "k-button k-button-solid-info");
                payCardHist.cardMainGridReload('P');
            }else if(requestType == 2){
                $("#cardM").attr("class", "k-button k-button-solid-info");
                $("#cardP").attr("class", "k-button k-button-solid-base");
                payCardHist.cardMainGridReload('M');
            }else if(requestType == 3){
                if($("#cardBaNb").val() != ''){
                    $("#searchValue").prop("disabled", true);
                    $("#searchValue").val($("#cardBaNb").val());
                }

                payCardHist.gridReload();
            }
        }
    },

    gridReload: function (type){
        if(type != "search"){
            $("#mainGrid").css("display", "");
            $("#cardMainGrid").css("display", "none");
            $("#cardMainGrid2").css("display", "none");
        }

        payCardHist.global.searchAjaxData = {
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchValue: $("#searchValue").val()
        }
        payCardHist.mainGrid("/card/cardUseList", payCardHist.global.searchAjaxData);
    },

    cardMainGridReload: function(value){
        if(value == "M"){
            $("#cardM").attr("class", "k-button k-button-solid-info");
            $("#cardP").attr("class", "k-button k-button-solid-base");
            $("#requestType").val(1);
            payCardHist.cardMainGrid(value);
        } else {
            $("#cardM").attr("class", "k-button k-button-solid-base");
            $("#cardP").attr("class", "k-button k-button-solid-info");
            $("#requestType").val(2);
            payCardHist.cardMainGrid2(value);
        }
        $("#searchValue").val('');

    },

    cardMainGrid : function (type) {
        if(type != "search"){
            $("#mainGrid").css("display", "none");
            $("#cardMainGrid").css("display", "");
            $("#cardMainGrid2").css("display", "none");
        }

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
                    data.cardVal = type;
                    data.auth = 'user';
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
                            'onclick="payCardHist.fn_customSelectCard(\'' + e.TR_CD + '\', \'' + e.TR_NM + '\', \'' + e.CARD_BA_NB + '\', \'' + e.JIRO_NM + '\', \'' + e.CLTTR_CD + '\', \'' + e.BA_NB + '\', \'' + e.DEPOSITOR + '\')" style="font-size: 12px);">' +
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

    cardMainGrid2 : function (type) {
        if(type != "search"){
            $("#mainGrid").css("display", "none");
            $("#cardMainGrid").css("display", "none");
            $("#cardMainGrid2").css("display", "");
        }

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
                    data.cardVal = type
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

        $("#cardMainGrid2").kendoGrid({
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
                            'onclick="payCardHist.fn_selCardInfo(\'' + e.TR_CD + '\', \'' + e.TR_NM + '\', \'' + e.CARD_BA_NB + '\', \'' + e.JIRO_NM + '\', \'' + e.CLTTR_CD + '\', \'' + e.BA_NB + '\', \'' + e.DEPOSITOR + '\')" style="font-size: 12px);">' +
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

    mainGrid : function (url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payCardHist.gridReload()">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'cardPk\');"/>',
                    template : "<input type='checkbox' id='cardPk#=AUTH_NO#' name='cardPk' class='cardPk' value='#=AUTH_NO#'/>",
                    width: 50
                }, {
                    title: "승인일자",
                    width: 130,
                    template : function (e){
                        return e.AUTH_DD.substring(0, 4) + "-" + e.AUTH_DD.substring(4, 6) + "-" + e.AUTH_DD.substring(6, 8); // + " " + e.AUTH_HH.substring(0, 2) + ":" + e.AUTH_HH.substring(2, 4) + ":" + e.AUTH_HH.substring(4, 6);
                    }
                }, {
                    title: "승인번호",
                    width: 80,
                    template : function (e){
                        return e.AUTH_NO;
                    }
                }, {
                    title: "사용처",
                    field: "MER_NM",
                    width: 250
                }, {
                    title: "사업자번호",
                    field : "MER_BIZNO",
                    width: 120,
                    template : function(e){
                        return e.MER_BIZNO.substring(0, 3) + "-" + e.MER_BIZNO.substring(3, 5) + "-" + e.MER_BIZNO.substring(5, 11);
                    }
                }, {
                    title: "카드명",
                    field: "TR_NM"
                }, {
                    title: "카드번호",
                    field: "CARD_NO",
                    width: 160,
                    template : function (e){
                        return e.CARD_NO.substring(0,4) + "-" + e.CARD_NO.substring(4,8) + "-" + e.CARD_NO.substring(8,12) + "-" + e.CARD_NO.substring(12,16);
                    }
                }, {
                    title: "금액",
                    width: 120,
                    template : function(e){
                        return '<div style="text-align: right;">' + comma(e.AUTH_AMT) + '</div>';
                    }
                }
            ]
        }).data("kendoGrid");
    },

    //카드선택 방식 변경
    fn_customSelectCard : function(trCd,trNm,cardBaNb,jiroNm,clttrCd,baNb,depositor) {
        //식대일 경우에는 기존 방식으로 진행
        const reqType = $("#reqType").val();
        if(reqType == "snack"){
            payDetView.fn_selCardInfo(trCd,trNm,cardBaNb,jiroNm,clttrCd,baNb,depositor);
        } else {
            $("#searchValue").val(cardBaNb);
            payCardHist.gridReload();
        }
    },

    fn_selectCard : function (){
        var grid = $("#mainGrid").data("kendoGrid");
        var cnt = 0;
        var index = $("#index").val();

        var data = {}
        grid.tbody.find("tr").each(function(){

            if($(this).find("input")[0].checked){
                data = grid.dataItem($(this));
                cnt++;
            }
        })


        if(cnt > 1){
            alert("여러개의 항목이 선택되었습니다. 확인해주세요.");
            return;
        }

        if($("#paySetting").val() == "Y"){
            if(uncommaN(data.AUTH_AMT) > Number(opener.parent.$("#reqAmtTotal").val())){
                alert("지출금액을 초과하였습니다.");
                return;
            }
        }

        console.log(data);

        var trParams = {}

        trParams.REG_NO = data.MER_BIZNO;
        var result = customKendo.fn_customAjax("/g20/getClientInfoOne", trParams);


        var g20TrCd = "";
        if(result.data != null){
            g20TrCd = result.data.TR_CD;
        }

        var pjtParams = {
            pjtCd : opener.parent.$("#pjtCd").val()
        }

        var taxInfo = customKendo.fn_customAjax("/payApp/getDepoInfo", pjtParams);

        var taxData = taxInfo.data;

        opener.parent.$("#crmNm" + index).val(data.MER_NM);
        opener.parent.$("#trDe" + index).val(data.AUTH_DD.substring(0,4) + "-" + data.AUTH_DD.substring(4,6) + "-" + data.AUTH_DD.substring(6,8));
        opener.parent.$("#trCd" + index).val(g20TrCd);

        if(taxData != null){
            if(taxData.TAX_GUBUN == 1){
                opener.parent.$("#totCost" + index).val(comma(data.AUTH_AMT));
                opener.parent.$("#supCost" + index).val(comma(data.SUPP_PRICE));
                opener.parent.$("#vatCost" + index).val(comma(data.SURTAX));
            } else {
                opener.parent.$("#totCost" + index).val(comma(data.AUTH_AMT));
                opener.parent.$("#supCost" + index).val(comma(data.AUTH_AMT));
                opener.parent.$("#vatCost" + index).val(comma(0));
            }
        } else {
            opener.parent.$("#totCost" + index).val(comma(data.AUTH_AMT));
            opener.parent.$("#supCost" + index).val(comma(data.SUPP_PRICE));
            opener.parent.$("#vatCost" + index).val(comma(data.SURTAX));
        }
        opener.parent.$("#cardNo" + index).val(data.CARD_NO.substring(0,4) + "-" + data.CARD_NO.substring(4,8) + "-" + data.CARD_NO.substring(8,12) + "-" + data.CARD_NO.substring(12,16));
        opener.parent.$("#card" + index).val(data.TR_NM);
        opener.parent.$("#buySts" + index).val(data.BUY_STS);
        opener.parent.$("#crmAccHolder" + index).val(data.DEPOSITOR);
        opener.parent.$("#crmAccNo" + index).val(data.BA_NB);
        opener.parent.$("#crmBnkNm" + index).val(data.JIRO_NM);
        opener.parent.$("#regNo" + index).val(data.MER_BIZNO);
        opener.parent.$("#authNo" + index).val(data.AUTH_NO);
        opener.parent.$("#authDd" + index).val(data.AUTH_DD);
        opener.parent.$("#authHh" + index).val(data.AUTH_HH);


        if(opener.parent.regPay){
            opener.parent.regPay.fn_changeAllCost();
            opener.parent.regPay.fn_g20ClientCheck();

            if(opener.parent.$("#busnNm").val().indexOf("R&D") > -1){
                opener.parent.$("#totCost" + index).val(comma(data.AUTH_AMT));
                opener.parent.$("#supCost" + index).val(comma(data.AUTH_AMT));
                opener.parent.$("#vatCost" + index).val(comma(0));
            }
        }
        fn_setCardInfo(data.AUTH_NO, data.AUTH_DD, data.AUTH_HH, data.CARD_NO, data.BUY_STS, index);


    },

    fn_selectCardBustrip : function (){
        var grid = $("#mainGrid").data("kendoGrid");

        var list = [];
        var data = {};
        grid.tbody.find("tr").each(function(){
            if($(this).find("input")[0].checked){
                data = grid.dataItem($(this));
                list.push(data);
            }
        });

        console.log(list);
        if($("#reqType").val() == "snack"){
            opener.parent.fn_setCardInfo(list);
        } else if ($("#reqType").val() == "bustrip" && $("#corpType").val() == "eat"){
            if(opener.parent.bustripExnpReq){
                opener.parent.bustripExnpReq.fn_eatCostCheck();
                var ingAmt = opener.parent.bustripExnpReq.global.ingEatCost;
                var maxAmt = opener.parent.bustripExnpReq.global.maxEatCost;

                var authAmt = 0;

                for(var i = 0; i < list.length; i++){
                    authAmt += list[i].AUTH_AMT
                }

                if(Number(authAmt) > (maxAmt - ingAmt)){
                    alert("식비 한도금액이 초과되었습니다.");

                    return;
                } /*else if (Number(authAmt) > 30000){
                    alert("1일당 한도를 초과하였습니다.");

                    return;
                }*/ else {
                    // 중복 체크 후 함수 실행
                    if (opener.parent.bustrip.global.corpCardList) {
                        if (opener.parent.bustrip.global.corpCardList.length === 0) {
                            for (var k = 0; k < list.length; k++) {
                                opener.parent.bustrip.global.corpCardList.push(list[k]);
                            }
                        } else {
                            var isDuplicate = false;
                            for (var i = 0; i < opener.parent.bustrip.global.corpCardList.length; i++) {
                                // 중복 체크
                                for(var j=0; j < list.length; j++){
                                    if (opener.parent.bustrip.global.corpCardList[i].CARD_NO === list[j].CARD_NO &&
                                        opener.parent.bustrip.global.corpCardList[i].AUTH_DD === list[j].AUTH_DD &&
                                        opener.parent.bustrip.global.corpCardList[i].AUTH_HH === list[j].AUTH_HH &&
                                        opener.parent.bustrip.global.corpCardList[i].AUTH_NO === list[j].AUTH_NO &&
                                        opener.parent.bustrip.global.corpCardList[i].BUY_STS === list[j].BUY_STS &&
                                        opener.parent.bustrip.global.corpCardList[i].AUTH_AMT === list[j].AUTH_AMT
                                    ) {
                                        alert("이미 선택된 내역입니다.");
                                        isDuplicate = true;
                                        return;
                                    }
                                }
                            }

                            if (!isDuplicate) {
                                for (var k = 0; k < list.length; k++) {
                                    opener.parent.bustrip.global.corpCardList.push(list[k]);
                                }
                            }
                        }
                    }

                    opener.parent.cardHistSet(list, $("#exnpType").val(), $("#corpType").val());
                }
            }
        } else {
            if($("#requestType").val() == 3){
                opener.parent.fn_setCardInfo(list);
            }else{
                // 중복 체크 후 함수 실행
                if (opener.parent.bustrip.global.corpCardList) {
                    if (opener.parent.bustrip.global.corpCardList.length === 0) {
                        for (var k = 0; k < list.length; k++) {
                            opener.parent.bustrip.global.corpCardList.push(list[k]);
                        }
                    } else {
                        var isDuplicate = false;
                        for (var i = 0; i < opener.parent.bustrip.global.corpCardList.length; i++) {
                            // 중복 체크
                            for(var j=0; j < list.length; j++){
                                if (opener.parent.bustrip.global.corpCardList[i].CARD_NO === list[j].CARD_NO &&
                                    opener.parent.bustrip.global.corpCardList[i].AUTH_DD === list[j].AUTH_DD &&
                                    opener.parent.bustrip.global.corpCardList[i].AUTH_HH === list[j].AUTH_HH &&
                                    opener.parent.bustrip.global.corpCardList[i].AUTH_NO === list[j].AUTH_NO &&
                                    opener.parent.bustrip.global.corpCardList[i].BUY_STS === list[j].BUY_STS &&
                                    opener.parent.bustrip.global.corpCardList[i].AUTH_AMT === list[j].AUTH_AMT
                                ) {
                                    alert("이미 선택된 내역입니다.");
                                    isDuplicate = true;
                                    return;
                                }
                            }
                        }

                        if (!isDuplicate) {
                            for (var k = 0; k < list.length; k++) {
                                opener.parent.bustrip.global.corpCardList.push(list[k]);
                            }
                        }
                    }
                }

                opener.parent.cardHistSet(list, $("#exnpType").val(), $("#corpType").val());
            }
        }

        window.close();
    },

    fn_search : function (type){
        if(type == 2){
            payCardHist.cardMainGridReload('P');
        }else if(type == 1 || type == ''){
            payCardHist.cardMainGridReload('M');
        }else{
            payCardHist.gridReload("search");
        }
        /*payCardHist.gridReload("search");
        payCardHist.cardMainGrid("search");
        payCardHist.cardMainGrid2("search");*/
    },

    fn_selCardInfo: function(trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor){
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
    }
}
