var paymentNotDoneList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        paymentNotDoneList.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="paymentAltList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "결의일자",
                    field: "GISU_DT",
                    width: 90,
                }, {
                    title: "처리자",
                    field: "EMP_NM",
                    width: 60,
                }, {
                    title: "사업장",
                    field: "DIV_CD",
                    width: 60,
                }, {
                    title: "결의번호",
                    field: "GISU_SQ",
                    width: 50,
                }, {
                    title: "구분",
                    field: "DOCU_FG",
                    width: 50,
                }, {
                    title: "프로젝트 명",
                    width: 400,
                    field: "MGT_NM"
                }, {
                    title: "적요",
                    field: "RMK_DC"
                }, {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        var cost = e.TOTAL_AM;
                        if(e.TOTAL_AM != null && e.TOTAL_AM != "" && e.TOTAL_AM != undefined){
                            return '<div style="text-align: right">'+comma(e.TOTAL_AM)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "삭제",
                    width: 60,
                    template : function(e){
                        return '<button type="button" class="k-button k-button-solid-error" onclick="paymentNotDoneList.fn_delG20Error('+e.GISU_DT+','+e.GISU_SQ+')">삭제</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        paymentNotDoneList.global.searchAjaxData = {
            year : "2024"
        }

        paymentNotDoneList.mainGrid("/pay/getPaymentNotDoneList", paymentNotDoneList.global.searchAjaxData);
    },


    fn_delG20Error : function(isuDt, isuSq){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var data = {
            isuDt : isuDt,
            isuSq : isuSq
        }
        $.ajax({
            url : "/payApp/delG20Error",
            data: data,
            type : "post",
            dataType : "json",
            success: function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");

                    paymentNotDoneList.gridReload();
                }
            }
        });
    }
}