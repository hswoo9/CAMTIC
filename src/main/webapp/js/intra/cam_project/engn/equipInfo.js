let useTimeSum = 0;
let useAmtSum = 0;
var equipInfo = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function (){
        commonProject.setPjtStat();
        this.gridReload();
    },

    gridReload : function (){
        equipInfo.global.searchAjaxData = {
            pjtSn : $("#pjtSn").val()
        }

        this.grid("/asset/getEqipmnUseListByPjt", equipInfo.global.searchAjaxData);
    },

    grid : function (url, params){
        $("#equipGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            dataBound: function(){
                useAmtSum = 0;
                useTimeSum = 0;
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: '',
                    text: '장비사용 등록',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="equipmentList.equipmentUsePopup('+$("#pjtSn").val()+');">' +
                            '   <span class="k-button-text">장비사용 등록</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "EQIPMN_GBN_NAME",
                    title: "구분"
                }, {
                    field: "EQIPMN_NAME",
                    title: "장비명"
                }, {
                    field : "USE_PD_STR_DE",
                    title : "사용일자",
                    template : function(e){
                        return e.USE_PD_STR_DE.substring(0,4) + "년 " + e.USE_PD_STR_DE.substring(4,6) + "월 " + e.USE_PD_STR_DE.substring(6,8) + "일";
                    }
                }, {
                    field: "USER_NAME",
                    title: "사용자"
                }, {
                    field: "OPER_CN",
                    title: "작업내용",
                    footerTemplate: "합계"
                }, {
                    field: "USE_TIME",
                    title: "총 사용시간",
                    template: function(e){
                        useTimeSum += e.USE_TIME;
                        return e.USE_TIME;
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(useTimeSum)+"</div>";
                    }
                }, {
                    field: "USE_AMT",
                    title: "사용대금",
                    template :function(e){
                        useAmtSum += e.USE_AMT;
                        return "<div style='text-align: right'>"+comma(e.USE_AMT)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(useAmtSum)+"</div>";
                    }
                }, {
                    field: "CLIENT_PRTPCO_NAME",
                    title: "의뢰업체"
                }, {
                    field: "PRTPCO_GBN_NAME",
                    title: "업체구분"
                },{
                    //나중에 필드 바꿔야 함
                    field: "END_STAT",
                    title: "마감상태",
                    template: function (dataItem) {
                        // END_STAT 값이 "Y"인 경우 "마감완료", 그 외의 경우 "-"
                        return dataItem.END_STAT === "Y" ? "마감완료" : "-";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    }
}