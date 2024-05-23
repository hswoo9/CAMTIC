var cardToBus = {

    global : {
        year: new Date().getFullYear(),
        month: new Date().getMonth()-1,
        afMonth: new Date().getMonth()+1,
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("start_date", 'month', "yyyy-MM-dd", new Date(cardToBus.global.year, cardToBus.global.month, 1));
        customKendo.fn_datePicker("end_date", 'month', "yyyy-MM-dd", new Date(cardToBus.global.year, cardToBus.global.afMonth, 0));

        cardToBus.gridReload();
    },

    gridReload : function(){
        var data = {
            startDate : $("#start_date").val(),
            endDate : $("#end_date").val(),
            empSeq : $("#empSeq").val(),
            cardToBustrip : "Y",
        }
        cardToBus.mainGrid("/bustrip/getBustripPopList", data);
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 289,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="cardToBus.gridReload();">' +
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
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "출장구분",
                    width: 50,
                    template: function (e) {
                        const tripCode = e.TRIP_CODE;
                        let tripCodeText = "";
                        if(tripCode == 1){
                            tripCodeText = "도내(시내)";
                        }else if(tripCode == 2){
                            tripCodeText = "도내(시외)";
                        }else if(tripCode == 3){
                            tripCodeText = "도외";
                        }else if(tripCode == 4){
                            tripCodeText = "해외";
                        }
                        return tripCodeText;
                    }
                }, {
                    title: "출장지(경유지)",
                    width: 100,
                    template: function(e){
                        if(e.VISIT_LOC_SUB != ""){
                            return e.VISIT_CRM + " (" + e.VISIT_LOC_SUB+")";
                        }else{
                            return e.VISIT_CRM;
                        }
                    },
                }, {
                    title: "출발일시",
                    width: 100,
                    template: function(e){
                        return e.TRIP_DAY_FR + " " + e.TRIP_TIME_FR;
                    }
                }, {
                    title: "복귀일시",
                    width: 100,
                    template: function(e){
                        return e.TRIP_DAY_TO + " " + e.TRIP_TIME_TO;
                    }
                }, {
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="cardToBus.fn_selBustrip(this)">' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_selBustrip : function (e) {
        var dataItem =  $("#mainGrid").data("kendoGrid").dataItem($(e).closest("tr"));
        opener.parent.regCardToPop.fn_selBustrip(dataItem);
        window.close();
    }
}