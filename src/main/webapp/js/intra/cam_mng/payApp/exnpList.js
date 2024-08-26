var exnpList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        exnpList.global.dropDownDataSource2 = [
            { text: "결의일자", value: "1" },
            { text: "지출요청일", value: "" },
            { text: "지출완료일", value: "3" },
            { text: "지출예정일", value: "4" }
        ]

        exnpList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", exnpList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", exnpList.gridReload);

        exnpList.global.dropDownDataSource = [
            { text: "승인", value: "1" },
            { text: "미결", value: "2" },
        ]
        customKendo.fn_dropDownList("searchDept2", exnpList.global.dropDownDataSource, "text", "value");
        $("#searchDept2").data("kendoDropDownList").bind("change", exnpList.gridReload);

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 2)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2)


        customKendo.fn_dropDownList("searchDate", exnpList.global.dropDownDataSource2, "text", "value", 3);
        $("#searchDate").data("kendoDropDownList").value("");
        customKendo.fn_datePicker("exnpStrDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("exnpEndDe", "depth", "yyyy-MM-dd", new Date());

        exnpList.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "적요", value: "B" },
            { text: "거래처", value: "D" },
            { text: "프로젝트명", value: "C" },
            { text: "작성자", value: "E" },
            { text: "세출과목(장,관,항)", value: "F" },
        ]
        customKendo.fn_dropDownList("searchKeyword", exnpList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", exnpList.gridReload);

        customKendo.fn_textBox(["searchValue"]);
        exnpList.gridReload();
    },

    mainGrid: function(url, params){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 10,
            transport: {
                read : {
                    url : url,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    for(var key in params){
                        data[key] = params[key];
                    }

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
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="exnpList.fn_excelDownload()">' +
                            '	<span class="k-icon k-i-file-excel k-button-icon"></span>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="exnpList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            // excel : {
            //     fileName : "지출결의서 목록.xlsx",
            //     filterable : true
            // },
            // excelExport: exportGrid,
            columns: [
                {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    field: "EVI_TYPE",
                    title: "문서유형",
                    width: 70,
                    template: function(e){
                        if(e.EVI_TYPE == 1){
                            return "세금계산서";
                        } else if (e.EVI_TYPE == 2){
                            return "계산서";
                        } else if(e.EVI_TYPE == 3){
                            return "신용카드";
                        } else if(e.EVI_TYPE == 4){
                            return "직원지급";
                        } else if(e.EVI_TYPE == 5){
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
                    field: "EXNP_BRIEFS",
                    title: "적요",
                    width: 200,
                    template: function(e){
                        return '<div style="cursor: pointer; font-weight: bold" onclick="exnpList.fn_reqRegPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\', \'rev\')">'+e.EXNP_BRIEFS+'</div>';
                    }
                }, {
                    field: "PJT_NM",
                    title: "프로젝트 명",
                    width: 180,
                    template: function (e){
                        return e.PJT_NM;
                    }
                }, {
                    field: "BUDGET_NM_EX",
                    title: "세출과목",
                    width: 160
                }, {
                    field: "REG_EMP_NAME",
                    title: "작성자",
                    width: 60
                }, {
                    field: "REG_DT",
                    title: "신청일",
                    width: 70,
                    template: function(e){
                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    field: "EXNP_DE",
                    title: "결의일자",
                    width: 70
                }, {
                    field: "REQ_DE",
                    title: "지출요청일",
                    width: 70
                }, {
                    field: "DT3",
                    title: "지출예정일",
                    width: 70
                }, {
                    field: "REQ_END_DE",
                    title: "지출완료일",
                    width: 70,
                    template: function(e){
                        if(e.RE_STAT == "Y"){
                            return e.REQ_END_DE;
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "TOT_COST",
                    title: "지출금액",
                    width: 70,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    field: "DOC_STATUS",
                    title: "결의상태",
                    width: 60,
                    template: function(e){
                        var status = "";
                        if(e.DOC_STATUS == "100"){
                            status = "결재완료";
                        } else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "50"){
                            status = "결재중"
                        } else {
                            status = "작성중"
                        }

                        return status;
                    }
                }, {
                    field: "DOC_STATUS",
                    title: "승인상태",
                    width: 60,
                    template: function(e){
                        var status = "";
                        if(e.DOC_STATUS == "100"){
                            status = "승인";
                        } else {
                            status = "미결";
                        }

                        return status;
                    }
                }
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
                    title: "지출유형",
                    width: 80,
                    field: "TYPE"
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
                    title: "적요(제목)",
                    field: "EXNP_BRIEFS",
                    width: 250,
                }, {
                    title: "지출금액",
                    width: 80,
                    field: "TOT_COST",
                }, {
                    title: "결의일자",
                    width: 80,
                    field: "R_DT",
                }, {
                    title: "예정일",
                    width: 80,
                    field: "REQ_EXNP_DE",
                }, {
                    title: "부서명",
                    field: "REG_DEPT_NAME",
                    width: 80
                }, {
                    title: "작성자",
                    field: "REG_EMP_NAME",
                    width: 80
                }, {
                    title: "상태",
                    field: "RE_STAT_TXT",
                    width: 80
                }, {
                    title: "예산정보",
                    field: "BUDGET_TEXT",
                    width: 80
                }
            ],
        }).data("kendoGrid");
    },

    gridReload: function (){
        exnpList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDate : $("#searchDate").val(),
            searchDept : $("#searchDept").val(),
            searchDept2 : $("#searchDept2").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            strDe : $("#exnpStrDe").val(),
            endDe : $("#exnpEndDe").val(),
            payAppType : 1
        }

        exnpList.mainGrid("/pay/getExnpList", exnpList.global.searchAjaxData);
        // exnpList.hiddenGrid("/pay/getExnpListForExcelDown", exnpList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (key, paySn, status){
        var url = "/payApp/pop/regExnpPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regExnpPop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_excelDownload : function (){
        let data = {
            empSeq : $("#myEmpSeq").val(),
            searchDate : $("#searchDate").val(),
            searchDept : $("#searchDept").val(),
            searchDept2 : $("#searchDept2").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            strDe : $("#exnpStrDe").val(),
            endDe : $("#exnpEndDe").val(),
            payAppType : 1
        }
        exnpList.hiddenGrid("/pay/getExnpListForExcelDown", data);

        var grid = $("#hiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "지출결의서 목록.xlsx";
        });
        grid.saveAsExcel();
    }
}