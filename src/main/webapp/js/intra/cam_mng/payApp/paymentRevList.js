var paymentRevList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        paymentRevList.global.dropDownDataSource2 = [
            { text: "신청일", value: "1" },
            { text: "지출요청일", value: "2" },
            { text: "지출예정일", value: "3" }
        ]

        customKendo.fn_dropDownList("searchDate", paymentRevList.global.dropDownDataSource2, "text", "value", 3);
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(new Date().setFullYear(new Date().getFullYear(),0,1)));
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
            { text: "문서번호", value: "A" },
            { text: "신청건명", value: "B" },
            { text: "거래처", value: "D" },
            { text: "프로젝트명", value: "C" },
            { text: "신청자", value: "E" },
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="paymentRevList.fn_excelDownload()">' +
                            '	<span class="k-icon k-i-file-excel k-button-icon"></span>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="paymentRevList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            // excel : {
            //     fileName : "신청서검토 목록.xlsx",
            //     filterable : true
            // },
            // excelExport: exportGrid,
            columns: [
                {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    field: "PAY_APP_TYPE",
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
                    field: "APP_TITLE",
                    title: "신청건명",
                    width: 330,
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
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: 240,
                    template: function (e){
                        var pjtNm = e.PJT_NM.toString().substring(0, 25);
                        return e.PJT_NM;
                    }
                }, {
                    field: "EMP_NAME",
                    title: "신청자",
                    width: 80
                }, {
                    field: "APP_DE",
                    title: "신청일",
                    width: 80,
                    template: function(e){
                        return e.APP_DE;
                    }
                }, {
                    field: "REQ_DE",
                    title: "지출요청일",
                    width: 80
                }, {
                    field: "PAY_EXNP_DE",
                    title: "지출예정일",
                    width: 80
                }, {
                    field: "TOT_COST",
                    title: "지출금액",
                    width: 100,
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

    hiddenGrid: function(url, params){
        $("#hiddenGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params, 99999),
            sortable: true,
            selectable: "row",
            height: 525,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "문서번호",
                    width: 120,
                    field: "DOC_NO"
                }, {
                    title: "문서유형",
                    width: 80,
                    field: "PAY_APP_TYPE"
                }, {
                    title: "증빙유형",
                    width: 80,
                    field: "EVID_TYPE_TEXT",
                }, {
                    title: "프로젝트코드",
                    field: "PJT_CD",
                    width: 200,
                },{
                    title: "프로젝트명",
                    field: "PJT_NM",
                    width: 200,
                }, {
                    title: "출금계좌_계좌명",
                    field: "ACC_NM",
                    width: 200,
                }, {
                    title: "출금계좌_계좌번호",
                    field: "ACC_NO",
                    width: 200,
                }, {
                    title: "출금계좌_은행명",
                    field: "BNK_NM",
                    width: 200,
                }, {
                    title: "예산비목(장)",
                    field: "BUDGET_NM_1",
                    width: 200,
                }, {
                    title: "예산비목(관)",
                    field: "BUDGET_NM_2",
                    width: 200,
                }, {
                    title: "예산비목(항)",
                    field: "BUDGET_NM_3",
                    width: 200,
                }, {
                    title: "지급처_은행명",
                    width: 200,
                    field: "CRM_BNK_NM"
                },{
                    title: "지급처_계좌번호",
                    width: 200,
                    field: "CRM_ACC_NO"
                },{
                    title: "지급처_예금주",
                    width: 200,
                    field: "CRM_ACC_HOLDER"
                },{
                    title: "거래처",
                    width: 200,
                    field: "CRM_NM"
                }, {
                    title: "신청건명",
                    field: "APP_TITLE",
                    width: 250,
                }, {
                    title: "지출금액",
                    width: 80,
                    field: "TOT_COST",
                }, {
                    title: "신청일",
                    width: 80,
                    field: "REG_DT",
                }, {
                    title: "지출요청일",
                    width: 80,
                    field: "REQ_DE",
                }, {
                    title: "지출예정일",
                    width: 80,
                    field: "PAY_EXNP_DE",
                }, {
                    title: "부서명",
                    field: "REG_DEPT_NAME",
                    width: 80
                }, {
                    title: "신청자",
                    field: "REG_EMP_NAME",
                    width: 80
                },
            ],
        }).data("kendoGrid");
    },

    gridReload: function (){
        paymentRevList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : 9,
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            payAppType : $("#payAppType").val(),
            searchDate : $("#searchDate").val(),
            strDe : $("#startDt").val(),
            endDe : $("#endDt").val(),
            docStatus : 100
        }

        paymentRevList.mainGrid("/pay/getPaymentMngList", paymentRevList.global.searchAjaxData);
        // paymentRevList.hiddenGrid("/pay/getPaymentListForExcelDown", paymentRevList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (key, status){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key + "&auth=mng";
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }

        /** 관리자 페이지 일경우 파라미터에 mng 추가*/
        if($("#apprMngStat").val() == "M"){
            url += '&vType='+$("#apprMngStat").val();
        }
        
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_excelDownload : function (){
        let data = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : 9,
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            payAppType : $("#payAppType").val(),
            searchDate : $("#searchDate").val(),
            strDe : $("#startDt").val(),
            endDe : $("#endDt").val(),
            docStatus : 100
        }
        paymentRevList.hiddenGrid("/pay/getPaymentListForExcelDown", data);

        var grid = $("#hiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "신청서검토 목록.xlsx";
        });
        grid.saveAsExcel();
    }
}