let personSum = 0;
let corpSum = 0;
let carSum = 0;
let totalSum = 0;

var bustripSettleList = {

    init: function(){
        bustripSettleList.pageSet();
        bustripSettleList.mainGrid();
    },

    pageSet: function(){
        customKendo.fn_datePicker("applyDt", 'year', "yyyy-MM", new Date());
        fn_onlyDeptSetting();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getBustripSettleList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.applyDt = $("#applyDt").val();
                    data.deptSeq = $("#dept").val();
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
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [10, 20, "ALL"],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bustripSettleList.bustripReqPop()">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bustripSettleList.fn_delBtn()">' +
                            '	<span class="k-button-text">신청취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: bustripSettleList.onDataBound,
            columns: [
                {
                    field: "PROJECT",
                    title: "사업구분",
                    width: 60
                }, {
                    field: "BUSN_NAME",
                    title: "사업명",
                    width: 100
                }, {
                    title: "구분",
                    template: function(row){
                        if(row.TRIP_CODE == "1"){
                            return "도내출장(시내)";
                        }else if(row.TRIP_CODE == "2"){
                            return "도내출장(시외)";
                        }else if(row.TRIP_CODE == "3"){
                            return "도외출장";
                        }else if(row.TRIP_CODE == "4"){
                            return "해외출장";
                        }else {
                            return "데이터 오류";
                        }
                    },
                    width: 80
                }, {
                    title: "출장자",
                    template: function(row){
                        if(row.COMPANION != 0){
                            return row.EMP_NAME + " 외 "+row.COMPANION+"명";
                        }else{
                            return row.EMP_NAME;
                        }
                    },
                    width: 80
                }, {
                    field: "VISIT_CRM",
                    title: "출장지",
                    width: 160,
                    footerTemplate: "합계"
                }, {
                    title: "출발일",
                    template: function(row){
                        return row.TRIP_DAY_FR;
                    },
                    width: 70
                }, {
                    title: "출발시간",
                    template: function(row){
                        return row.TRIP_TIME_FR;
                    },
                    width: 50
                }, {
                    title: "복귀일",
                    template: function(row){
                        return row.TRIP_DAY_TO;
                    },
                    width: 70
                }, {
                    title: "복귀시간",
                    template: function(row){
                        return row.TRIP_TIME_TO;
                    },
                    width: 50
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 50
                }, {
                    title: "개인여비",
                    template: function(row){
                        personSum  += Number(row.PERSON_TOTAL);
                        return "<div style='text-align: right'>"+fn_comma(row.PERSON_TOTAL)+"</div>";
                    },
                    width: 50,
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+fn_numberWithCommas(personSum)+"</div>";
                    }
                }, {
                    title: "법인카드",
                    template: function(row){
                        corpSum  += Number(row.CORP_TOTAL);
                        return "<div style='text-align: right'>"+fn_comma(row.CORP_TOTAL)+"</div>";
                    },
                    width: 50,
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+fn_numberWithCommas(corpSum)+"</div>";
                    }
                }, {
                    title: "법인차량",
                    template: function(row){
                        return "<div style='text-align: right'>"+"0"+"</div>";
                    },
                    width: 50,
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+fn_numberWithCommas(carSum)+"</div>";
                    }
                }, {
                    title: "",
                    template: function(row){
                        totalSum  += Number(row.PERSON_TOTAL) + Number(row.CORP_TOTAL);
                        return "<div style='text-align: right'>"+fn_comma(row.PERSON_TOTAL+row.CORP_TOTAL)+"</div>";
                    },
                    width: 50,
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+fn_numberWithCommas(totalSum)+"</div>";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        personSum = 0;
        corpSum = 0;
        carSum = 0;
        totalSum = 0;
    },
}
