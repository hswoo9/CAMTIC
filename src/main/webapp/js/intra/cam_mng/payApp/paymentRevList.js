var paymentRevList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() - 2)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        $("#startDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#endDt").val($("#startDt").val());
            }
        });
        $("#endDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#startDt").val($("#endDt").val());
            }
        });

        paymentRevList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재중", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", paymentRevList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", paymentRevList.gridReload);

        paymentRevList.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "신청건명", value: "B" },
            { text: "프로젝트명", value: "C" },
        ]

        $("#payAppType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: ""},
                { text: "지급신청서", value: "1" },
                { text: "여입신청서", value: "2" },
                { text: "반납신청서", value: "3" },
                { text: "대체신청서", value: "4" },
            ]
        });
        $("#payAppType").data("kendoDropDownList").bind("change", paymentRevList.gridReload);

        customKendo.fn_dropDownList("searchKeyword", paymentRevList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", paymentRevList.gridReload);

        customKendo.fn_textBox(["searchValue"]);
        paymentRevList.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="paymentRevList.gridReload()">' +
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
                    width: 100,
                    template: function(e){
                        if(e.PAY_APP_TYPE == 1){
                            return "지급신청서";
                        } else if (e.PAY_APP_TYPE == 2){
                            return "여입신청서";
                        } else if(e.PAY_APP_TYPE == 3){
                            return "반납신청서";
                        } else if(e.PAY_APP_TYPE == 4){
                            return "대체신청서";
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
                        var type = "rev";

                        if (e.PAY_APP_TYPE == 2){
                            type = "in";
                        } else if(e.PAY_APP_TYPE == 3){
                            type = "re";
                        } else if(e.PAY_APP_TYPE == 4){
                            type = "alt";
                        }
                        return '<div style="cursor: pointer; font-weight: bold" onclick="paymentRevList.fn_reqRegPopup('+e.PAY_APP_SN+', \''+type+'\')">'+e.APP_TITLE+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 240,
                    template: function (e){
                        var pjtNm = e.PJT_NM.toString().substring(0, 25);
                        return e.PJT_NM;
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
                    field: "PAY_EXNP_DE"
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
                }
                // , {
                //     title: "상태",
                //     width: 60,
                //     template : function(e){
                //         if(e.DOC_STATUS == "100"){
                //             return "결재완료"
                //         } else {
                //             return "작성중"
                //         }
                //     }
                // }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        paymentRevList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            payAppType : $("#payAppType").val(),
            strDe : $("#startDt").val(),
            endDe : $("#endDt").val(),
            docStatus : 100
        }

        paymentRevList.mainGrid("/pay/getPaymentList", paymentRevList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (key, status){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key + "&auth=mng";
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}