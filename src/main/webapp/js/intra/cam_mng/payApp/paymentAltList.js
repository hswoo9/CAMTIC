var paymentAltList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        paymentAltList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", paymentAltList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", paymentAltList.gridReload);

        paymentAltList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
        ]

        customKendo.fn_dropDownList("searchKeyword", paymentAltList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        paymentAltList.gridReload();
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
                    title: "문서유형",
                    width: 90,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 1){
                            return "세금계산서";
                        } else if (e.PAY_APP_TYPE == 2){
                            return "계산서";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "신용카드";
                        } else if(e.PAY_APP_TYPE == 4){
                            return "직원지급";
                        } else if(e.PAY_APP_TYPE == 5){
                            return "소득신고자";
                        } else {
                            return "기타";
                        }
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 120,
                }, {
                    title: "신청건명",
                    field: "APP_TITLE",
                    width: 400,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="paymentAltList.fn_reqRegPopup('+e.PAY_APP_SN+', \'re\')">'+e.APP_TITLE+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 240,
                    template: function (e){
                        var pjtNm = e.PJT_NM.toString().substring(0, 25);
                        return pjtNm + "...";
                    }
                }, {
                    title: "신청일",
                    width: 80,
                    field: "REG_DT",
                    template: function(e){
                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    title: "지출요청일",
                    width: 80,
                    field: "REQ_DE"
                }, {
                    title: "지출예정일",
                    width: 80,
                    field: "REQ_EXNP_DE"
                }, {
                    title: "지출완료일",
                    width: 80,
                    field: "REQ_END_DE"
                }, {
                    title: "지출금액",
                    width: 120,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "상태",
                    width: 60,
                    template : function(e){
                        if(e.DOC_STATUS == "100"){
                            return "결재완료"
                        } else {
                            return "작성중"
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        paymentAltList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            payAppType : '3',
            docStatus : 100
        }

        paymentAltList.mainGrid("/pay/getPaymentList", paymentAltList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (key, status){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key;
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}