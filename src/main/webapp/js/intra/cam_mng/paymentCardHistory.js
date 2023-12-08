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

        payCardHist.gridReload();
    },

    gridReload: function (){
        payCardHist.global.searchAjaxData = {
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchValue: $("#searchValue").val()
        }
        payCardHist.mainGrid("/card/cardUseList", payCardHist.global.searchAjaxData);
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'cardPk\');"/>',
                    template : "<input type='checkbox' id='cardPk#=AUTH_NO#' name='cardPk' class='cardPk' value='#=AUTH_NO#'/>",
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

        console.log(data);

        if(cnt > 1){
            alert("여러개의 항목이 선택되었습니다. 확인해주세요.");
            return;
        }

        opener.parent.$("#crmNm" + index).val(data.MER_NM);
        opener.parent.$("#trDe" + index).val(data.AUTH_DD.substring(0,4) + "-" + data.AUTH_DD.substring(4,6) + "-" + data.AUTH_DD.substring(6,8));
        opener.parent.$("#trCd" + index).val(data.TR_CD);
        opener.parent.$("#totCost" + index).val(comma(data.AUTH_AMT));
        opener.parent.$("#supCost" + index).val(comma(data.SUPP_PRICE));
        opener.parent.$("#vatCost" + index).val(comma(data.SURTAX));
        opener.parent.$("#cardNo" + index).val(data.CARD_NO.substring(0,4) + "-" + data.CARD_NO.substring(4,8) + "-" + data.CARD_NO.substring(8,12) + "-" + data.CARD_NO.substring(12,16));
        opener.parent.$("#card" + index).val(data.TR_NM);
        opener.parent.$("#buySts" + index).val(data.BUY_STS);
        opener.parent.$("#crmAccHolder" + index).val(data.DEPOSITOR);
        opener.parent.$("#crmAccNo" + index).val(data.BA_NB);
        opener.parent.$("#crmBnkNm" + index).val(data.JIRO_NM);

        console.log(data);
        alert("반영되었습니다.");

        window.close();
    }
}
