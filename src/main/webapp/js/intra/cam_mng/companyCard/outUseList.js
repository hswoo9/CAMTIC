var outUseList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        outUseList.mainGrid();
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/cardUseList',
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
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
                    title: "구분",
                    width: 50,
                    template: function (){
                        return "승인"
                    }
                }, {
                    title: "승인일시",
                    width: 200,
                    template : function (e){
                        return e.AUTH_DD.substring(0, 4) + "-" + e.AUTH_DD.substring(4, 6) + "-" + e.AUTH_DD.substring(6, 8) + " " + e.AUTH_HH.substring(0, 2) + ":" + e.AUTH_HH.substring(2, 4) + ":" + e.AUTH_HH.substring(4, 6);
                    }
                }, {
                    title: "승인번호",
                    width: 100,
                    template : function (e){
                        return e.AUTH_NO;
                    }
                }, {
                    title: "사용처",
                    width: 200,
                    template: function(e){
                        return '<div style="cursor: pointer; font-weight: bold" onclick="outUseList.fn_useCardDetailPop(\''+e.AUTH_NO+'\', \''+e.AUTH_DD+'\', \''+e.AUTH_HH+'\', \''+e.CARD_NO+'\', \''+e.BUY_STS+'\')">'+e.MER_NM+'</div>'
                    }
                }, {
                    title: "사업자번호",
                    field : "MER_BIZNO",
                    width: 100,
                    template : function(e){
                        return e.MER_BIZNO.substring(0, 3) + "-" + e.MER_BIZNO.substring(3, 5) + "-" + e.MER_BIZNO.substring(5, 11);
                    }
                }, {
                    title: "카드명",
                    field: "TR_NM",
                }, {
                    title: "카드번호",
                    field: "CARD_NO",
                    width: 180,
                    template : function (e){
                        return e.CARD_NO.substring(0,4) + "-" + e.CARD_NO.substring(4,8) + "-" + e.CARD_NO.substring(8,12) + "-" + e.CARD_NO.substring(12,16);
                    }
                }, {
                    title: "금액",
                    width: 120,
                    template : function(e){
                        return '<div style="text-align: right;">' + comma(e.AUTH_AMT) + '</div>';
                    }
                }, {
                    title: "공급가액",
                    width: 100,
                    template : function(e){
                        return '<div style="text-align: right;">' + comma(e.SUPP_PRICE) + '</div>';
                    }
                }, {
                    title: "부가세",
                    width: 80,
                    template : function(e){
                        return '<div style="text-align: right;">' + comma(e.SURTAX) + '</div>';
                    }
                }, {
                    title: "결의상태",
                    width: 80,
                    template : function(e){
                        return "미결의"
                    }
                }, {
                    title : "사용자",
                    field: "USE_MEM",
                }
            ]
        }).data("kendoGrid");
    },

    inputNumberFormat : function(obj){
        obj.value = outUseList.comma(outUseList.uncomma(obj.value));
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_useCardDetailPop : function (authNo, authDate, authTime, cardNo, buySts){
        var params = {
            authNo : authNo,
            authDate : authDate,
            authTime : authTime,
            cardNo : cardNo,
            buySts : buySts
        };

        var url = "/cam_mng/companyCard/useCardDetailPop.do?authNo=" + authNo + "&authDate=" + authDate + "&authTime=" + authTime + "&cardNo=" + cardNo + "&buySts=" + buySts;
        var name = "_blank";
        var option = "width = 600, height = 700, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);

    }

}