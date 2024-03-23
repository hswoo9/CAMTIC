var cardToHist = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", 'month', "yyyy-MM-dd", new Date());

        var data = {
            cardToSn : $("#cardToSn").val()
        }
        $.ajax({
            url : "/card/getCardToInfo",
            data : data,
            type : "post",
            async : false,
            dataType : "json",
            success : function(rs){
                var rs = rs.cardInfo;
                $("#searchValue").val(rs.CARD_BA_NB);
                $("#startDt").val(rs.CARD_TO_DE);
                if(rs.CARD_FROM_DE == null || rs.CARD_FROM_DE == "" || rs.CARD_FROM_DE == undefined){
                } else {
                    $("#endDt").val(rs.CARD_FROM_DE);
                }
            }
        });

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


        if($("#cardFromDe").val() != null && $("#cardFromDe").val() != ""){
            $("#endDt").val($("#cardFromDe").val());
        }

        cardToHist.gridReload();


        $("#searchValue").on("keyup", function(key){
            if(key.keyCode == 13){
                cardToHist.fn_search();
            }
        });



    },

    gridReload: function (type){
        if(type != "search"){
            $("#mainGrid").css("display", "");
            $("#cardMainGrid").css("display", "none");
        }

        cardToHist.global.searchAjaxData = {
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchValue: $("#searchValue").val(),
            cardToSn : $("#cardToSn").val()
        }
        cardToHist.mainGrid("/card/cardToUseList", cardToHist.global.searchAjaxData);
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardToHist.gridReload()">' +
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
                    template : function (e){
                        if(e.CARD_TO_HIST_SN != undefined && e.CARD_TO_HIST_SN != null && e.CARD_TO_HIST_SN != ""){
                            return "";
                        } else {
                            return "<input type='checkbox' id='cardPk#=AUTH_NO#' name='cardPk' class='cardPk' value='#=AUTH_NO#'/>";
                        }
                    },
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
                },/* {
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
                }, */{
                    title: "사용금액",
                    width: 120,
                    template : function(e){
                        return '<div style="text-align: right;">' + comma(e.AUTH_AMT) + '</div>';
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_selectCard : function (){
        var grid = $("#mainGrid").data("kendoGrid");

        var data = {}
        var itemArr = [];
        grid.tbody.find("tr").each(function(){
            if($(this).find("input[type='checkbox']")[0] != undefined && $(this).find("input[type='checkbox']")[0].checked){
                data = grid.dataItem($(this));
                data.CARD_TO_SN = $("#cardToSn").val();
                itemArr.push(data);
            }
        })

        var parameters = {
            itemArr : JSON.stringify(itemArr),
        }

        $.ajax({
            url : "/card/setUseCardHist",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                alert("사용이력이 추가되었습니다.");
                opener.statementList.onDataBoundSelect($("#cardToSn").val());
                opener.$("#mainGrid").data("kendoGrid").dataSource.read();
                window.close();
            }
        });

    },

    fn_search : function (){
        cardToHist.gridReload("search");
        cardToHist.cardMainGrid("search");
    }
}
