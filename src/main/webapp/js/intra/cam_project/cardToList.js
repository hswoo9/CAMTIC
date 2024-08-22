var cardToList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        cardToList.mainGrid();
        cardToList.kendoSetting();
    },

    kendoSetting : function() {
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date().getFullYear()+"-01-01");
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date().getFullYear()+"-12-31");

        cardToList.global.dropDownDataSource = [
            { text : "카드번호", value : "CARD_NUM" },
            { text : "반출자", value : "USER_NAME" },
        ]
        customKendo.fn_dropDownList("searchKeyword", cardToList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", cardToList.gridReload());

        $("#regHistYn").kendoDropDownList({
            dataSource : [
                {text : "선택하세요", value : ""},
                {text : "등록", value : "Y"},
                {text : "미등록", value : "N"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid : function(url, params) {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/card/getCardTOData2',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.regHistYn = $("#regHistYn").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.pjtCd = $("#pjtCd").val();
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
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cardToList.gridReload()">' +
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
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, /*{
                    field: "",
                    title: "카드구분",
                    width: 100
                },*/ {
                    field: "LAST_CARD_NUM",
                    title: "카드번호",
                    width: 80
                }, {
                    field: "CARD_TO_DE",
                    title: "반출일자",
                    width: 80,
                    template: function(e){
                        return e.CARD_TO_DE;
                    }
                }, {
                    field: "USE_EMP_NAME",
                    title: "반출자",
                    width: 80
                }, {
                    field: "CARD_TO_PURPOSE",
                    title: "반출목적",
                    width: 100
                }, {
                    field: "",
                    title: "사용내역등록",
                    width: 100,
                    template: function(e){
                        if(e.REG_HISTORY > 0){
                            return "등록";
                        } else {
                            return "미등록";
                        }
                    }
                }, {
                    field: "",
                    title: "사용내역",
                    width: 300,
                    template: function(e){
                        if(e.REG_HISTORY > 0){
                            if(e.REG_HISTORY == 1){
                                return e.LAST_MER_NM;
                            } else {
                                return e.LAST_MER_NM + "외 " + Number(e.REG_HISTORY - 1) + "건";
                            }
                        } else {
                            return "미등록";
                        }
                    }
                }, {
                    field: "",
                    title: "사용금액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: right;">' + comma(e.SUM_AMT) + '</div>';
                    }
                }, {
                    title: "",
                    width: "5%",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base" onclick="cardToList.fn_selectCard('+e.CARD_TO_SN+', \''+e.TR_NM+'\');" style=\'color: rgb(0, 51, 255);\'>선택</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_selectCard: function(key, trNm) {
        opener.parent.selectCard(key, trNm);

        window.close();
    }
}

function dateValidationCheck(id, val){
    var sDt = new Date($("#startDay").val());
    var nDt = new Date($("#endDay").val());

    if(id == "startDay"){
        if(sDt > nDt){
            $("#endDay").val(val);
        }
    }else{
        if(sDt > nDt){
            $("#startDay").val(val);
        }
    }
}