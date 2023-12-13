let sumAmt = 0;
var statementList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },


    fn_defaultScript : function (){
        statementList.mainGrid();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getCardTOData',
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
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : statementList.onDataBound,
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="statementList.fn_regCardToPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="statementList.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "TEAM_NAME",
                    title: "팀",
                    width: 100
                }, {
                    field: "USE_EMP_NAME",
                    title: "이름",
                    width: 100
                }, {
                    field: "TR_NM",
                    title: "카드명",
                    width: 300
                }, {
                    field: "CARD_TO_DE",
                    title: "사용일자",
                    width: 120
                }, {
                    field: "CARD_FROM_DE",
                    title: "반납일자",
                    width: 120
                }, {
                    field: "CARD_BA_NB",
                    title: "카드번호",
                    width: 300,
                }, {
                    title: "반납",
                    width: 120,
                    template: function(e){
                        if(e.RT_YN == 'N'){
                            return '<button type="button" class="k-button k-button-solid k-button-solid-base" onclick="statementList.fn_updCardTi('+e.CARD_TO_SN+', \''+e.CARD_TO_DE+'\')">반납</button>'
                        } else {
                            return '<button type="button" class="k-button k-button-solid k-button-solid-base" disabled>반납</button>'
                        }
                    }
                }, {
                    title: "사용이력등록",
                    width: 120,
                    template: function(e){
                        if(e.RT_YN == 'N'){
                            return '<button type="button" class="k-button k-button-solid k-button-solid-info" onclick="statementList.fn_addCardHist('+e.CARD_TO_SN+')">추가</button>'
                        } else {
                            return '<button type="button" class="k-button k-button-solid k-button-solid-info" disabled>추가</button>'
                        }
                    }
                }, {
                    title: "기타",
                    width: 100,
                    template: function(e){
                        if(e.RT_YN == 'N'){
                            return '<button type="button" class="k-button k-button-solid k-button-solid-error" onclick="statementList.fn_del('+e.CARD_TO_SN+')">삭제</button>'
                        } else {
                            return '<button type="button" class="k-button k-button-solid k-button-solid-error" disabled>삭제</button>'
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainHistGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getCardTOHistList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.cardToSn = $("#cardToSn").val()
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

        $("#mainHistGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="statementList.fn_regCardToPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="statementList.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "승인일시",
                    width: 130,
                    template : function (e){
                        return e.AUTH_DD.substring(0, 4) + "-" + e.AUTH_DD.substring(4, 6) + "-" + e.AUTH_DD.substring(6, 8) + " " + e.AUTH_HH.substring(0, 2) + ":" + e.AUTH_HH.substring(2, 4) + ":" + e.AUTH_HH.substring(4, 6);
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
                    title: "카드번호",
                    field: "CARD_NO",
                    width: 160,
                    template : function (e){
                        return e.CARD_NO.substring(0,4) + "-" + e.CARD_NO.substring(4,8) + "-" + e.CARD_NO.substring(8,12) + "-" + e.CARD_NO.substring(12,16);
                    },
                    footerTemplate: "합계"
                }, {
                    title: "금액",
                    width: 120,
                    template : function(e){
                        sumAmt  += Number(uncomma(e.AUTH_AMT));
                        return '<div style="text-align: right;">' + comma(e.AUTH_AMT) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(sumAmt)+"</div>";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            // const key = dataItem.CARD_TO_SN;
            // statementList.fn_regCardToPop(key);
            sumAmt = 0;
            $("#cardToSn").val(dataItem.CARD_TO_SN);

            grid.tbody.find("tr").each(function (){
                $(this).css("background-color", "");
            });

            $(this).css("background-color", "#a7e1fc");

            statementList.mainHistGrid();
        });
    },

    fn_regCardToPop : function(key){
        var url = "/card/regCardToPop.do";

        if(key != null && key != "" && key != undefined){
            url += "?cardToSn=" + key;
        }
        var name = "_blank";
        var option = "width = 700, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_del : function(key){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var parameters = {
            cardToSn : key,
        }

        $.ajax({
            url : "/card/delCardTo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");
                    statementList.mainGrid();
                }
            }
        });
    },

    fn_addCardHist: function(key){
        var url = "/card/pop/cardToHist.do?cardToSn=" + key;

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },

    fn_updCardTi : function (key, toDe){
        $("#cardFromDe").data("kendoDatePicker").min(toDe);
        $("#cardToSnModal").val(key);
        var dialog = $("#dialog").data("kendoWindow");
        dialog.center();
        dialog.open();
    },

    fn_updFromDe : function (){
        if(!confirm("반납처리 하시겠습니까?")){
            return;
        }

        var data = {
            cardToSn : $("#cardToSnModal").val(),
            cardFromDe : $("#cardFromDe").val()
        }

        $.ajax({
            url : "/card/updCardFromDe",
            data : data,
            type : "post",
            dataType: "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("반납처리 되었습니다.");

                    $("#dialog").data("kendoWindow").close();
                    statementList.mainGrid();
                }
            }
        });
    }
}