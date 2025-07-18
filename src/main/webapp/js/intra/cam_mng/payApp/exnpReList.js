let sum=0;

var exnpReList = {
    global: {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript: function (){
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

        exnpReList.global.dropDownDataSource = [
            { text: "승인", value: "Y" },
            { text: "미결", value: "N" },
        ]
        customKendo.fn_dropDownList("searchStatus", exnpReList.global.dropDownDataSource, "text", "value");
        $("#searchStatus").data("kendoDropDownList").bind("change", exnpReList.gridReload);
        exnpReList.global.dropDownDataSource = [
            { text: "프로젝트", value: "PJT_NM" },
            { text: "예산비목", value: "BUDGET_NM" },
            { text: "거래처", value: "CRM_NM" },
            { text: "제목", value: "EXNP_BRIEFS" },
        ]
        customKendo.fn_dropDownList("searchKeyword", exnpReList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", exnpReList.gridReload);
        customKendo.fn_textBox(["searchValue"]);

        exnpReList.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 50, "ALL"],
                buttonCount: 5,
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="exnpReList.fn_depoReqDownload()">' +
                            '	<span class="k-button-text">입금의뢰명세서</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="exnpReList.fn_exnpApprove()">' +
                            '	<span class="k-button-text">결의서 승인</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="exnpReList.fn_excelDownload()">' +
                            '	<span class="k-icon k-i-file-excel k-button-icon"></span>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="exnpReList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    width: 30,
                    template : function(e){
                        // if(e.TYPE == "반제(지출)"){
                            if(e.RE_STAT == "N"){
                                return '<input type="checkbox" name="check" value="'+e.EXNP_SN+'"/><input type="hidden" name="hidExnpSn" value="'+e.EXNP_SN+'"/><input type="hidden" name="hidExnpDe" value="'+e.R_DT+'">';
                            } else {
                                return '<input type="hidden" name="hidExnpSn" value="'+e.EXNP_SN+'"/><input type="hidden" name="hidExnpDe" value="'+e.R_DT+'">';
                            }
                        // } else {
                        //     return '';
                        // }
                    }
                }, {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    width: 120,
                    field: "DOC_NO"
                }, {
                    title: "지출유형",
                    width: 80,
                    field: "TYPE",
                    template : function(e) {
                        if(e.PAY_APP_TYPE != "1"){
                            if(e.PAY_APP_TYPE == 2){
                                return "여입";
                            } else if(e.PAY_APP_TYPE == 3){
                                return "반납";
                            } else if(e.PAY_APP_TYPE == 4){
                                return "대체";
                            }
                        } else {
                            return e.TYPE;
                        }
                    }
                }, {
                    title: "증빙유형",
                    width: 80,
                    field: "EVID_TYPE_TEXT",
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 200,
                }, {
                    title: "예산비목",
                    field: "BUDGET_NM_EX",
                    width: 200,
                    template: function(e){
                        return e.BUDGET_NM_EX.replaceAll("/", "-");
                    }
                }, {
                    title: "거래처",
                    width: 200,
                    template: function(e){
                        if(e.CRM_CNT > 1){
                            return e.CRM_NM + " 외 " + Number(e.CRM_CNT-1);
                        } else {
                            return e.CRM_NM
                        }
                    }
                }, {
                    title: "적요(제목)",
                    field: "EXNP_BRIEFS",
                    width: 250,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="exnpReList.fn_reqRegPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\')">'+e.EXNP_BRIEFS+'</div>';
                    }
                }, {
                    title: "지출금액",
                    width: 80,
                    template: function(e){
                        var cost = e.TOT_COST;
                        return '<div style="text-align: right">'+comma(cost)+'</div>';

                        // if(e.RE_STAT == "Y"){
                        //     return '<div style="text-align: right">'+comma(cost)+'</div>';
                        // } else {
                        //     return '<div style="text-align: right">'+0+'</div>';
                        // }
                    }
                }, {
                    title: "결의일자",
                    width: 80,
                    field: "R_DT",
                }, {
                    title: "작성자",
                    field: "REG_EMP_NAME",
                    width: 80
                }, {
                    title: "상태",
                    width: 60,
                    template: function(e){
                        if(e.RE_STAT == "N"){
                            return "미승인"
                        } else {
                            return "승인"
                        }
                    }
                }, {
                    title: "첨부",
                    width: 60,
                    template: function(e){
                        let btn = "";
                        if (e.FILE_DEADLINE == "N") {
                            btn = "k-button-solid-base";
                        } else {
                            btn = "k-button-solid-info";
                        }
                        // if(e.RE_STAT == "N"){
                        //     return ""
                        // } else {
                            return '<button type="button" class="k-button '+ btn +'" onclick="exnpReList.fn_regPayAttPop('+e.PAY_APP_SN+', '+e.EXNP_SN+')">첨부</button>';
                        // }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=check]").prop("checked", true);
            else $("input[name=check]").prop("checked", false);
        });

        // $("#mainGrid").data("kendoGrid").one("dataBound", function(e){
        //     var grid = e.sender;
        //     var pageSizesDdl = $(grid.pager.element).find("[data-role='dropdownlist']").data("kendoDropDownList");
        //     pageSizesDdl.bind("change", function(ev){
        //         $("#hiddenGrid").data("kendoGrid").dataSource.pageSize(ev.sender.value());
        //     });
        // });
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

    hiddenDepoGrid: function(url, params){
        $("#hiddenDepoGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params, 99999),
            sortable: true,
            selectable: "row",
            height: 525,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "은행",
                    width: 120,
                    field: "CRM_BNK_NM",

                }, {
                    title: "계좌번호",
                    width: 80,
                    field: "CRM_ACC_NO",
                    footerTemplate : function (e) {
                        return "합계";
                    },
                    attributes: { style: "text-align: right" },
                }, {
                    title: "지출금액(원)",
                    width: 80,
                    field: "TOT_COST",
                    template : function(e){
                        sum += Number(e.TOT_COST);
                        return comma(e.TOT_COST);
                    },
                    footerTemplate : function (e) {
                        return comma(sum);
                    },
                    attributes: { style: "text-align: right" }
                }, {
                    title: "예금주",
                    field: "CRM_ACC_HOLDER",
                    width: 200,
                },{
                    title: "의뢰인",
                    field: "INV",
                    width: 200,
                }
            ],
        }).data("kendoGrid");
    },

    gridReload: function(){
        exnpReList.global.searchAjaxData = {
            empSeq: $("#myEmpSeq").val(),
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchStatus: $("#searchStatus").val(),
            searchKeyword: $("#searchKeyword").val(),
            searchValue: $("#searchValue").val()
        }

        exnpReList.mainGrid("/pay/getExnpReList", exnpReList.global.searchAjaxData);
        // exnpReList.hiddenGrid("/pay/getExnpReListForExcelDown", exnpReList.global.searchAjaxData);
    },

    fn_reqRegPopup: function(key, paySn){
        url = "/payApp/pop/regExnpRePop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    fn_exnpApprove : function (){

        if($("input[name='check']:checked").length == 0){
            alert("선택된 결의서가 없습니다.");
            return;
        }

        if(!confirm("승인하시겠습니까?")){
            return ;
        }

        $("#my-spinner").show();
        $("input[name=check]:checked").each(function(){
            var parameters = {
                exnpSn : this.value,
                regEmpSeq : $("#myEmpSeq").val(),
                empSeq : $("#myEmpSeq").val(),
                exnpG20Stat : 'Y',
            }

            const result = customKendo.fn_customAjax("/pay/resolutionExnpAppr", parameters);
        });

        alert("승인되었습니다.");
        $("#my-spinner").hide();

        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_regPayAttPop : function (key, exnpKey){
        var url = "/payApp/pop/regReListFilePop.do?payAppSn=" + key + "&exnpSn=" + exnpKey;
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },

    fn_excelDownload : function (){
        let data = {
            empSeq: $("#myEmpSeq").val(),
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            searchStatus: $("#searchStatus").val(),
            searchKeyword: $("#searchKeyword").val(),
            searchValue: $("#searchValue").val()
        }
        exnpReList.hiddenGrid("/pay/getExnpReListForExcelDown", data);

        var grid = $("#hiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "지출 반제결의 목록.xlsx";
        });
        grid.saveAsExcel();
    },


    fn_depoReqDownload : function(){
        var data = {
            exnpSnAr : ""
        }

        $("input[name=hidExnpSn]").each(function(){
            if(this.value != undefined && this.value != "" && this.value != null){
                data.exnpSnAr += this.value + ",";
            }
        });

        var exnpDe = "";

        var flag = true;
        $("input[name=hidExnpDe]").each(function(){
            if(flag) exnpDe = this.value;

            flag = false;
        });

        data.exnpSnAr = data.exnpSnAr.substring(0, data.exnpSnAr.length - 1);

        exnpReList.hiddenDepoGrid("/pay/getExnpDepoListExcelDown", data);

        var grid = $("#hiddenDepoGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            var sheet = e.workbook.sheets[0];
            sheet.mergedCells = ["A1:E1", "A2:E2"];
            sheet.name = "계좌명";

            var myHeaders = [{
                value:"입금의뢰명세서",
                fontSize: 13,
                textAlign: "center",
                background:"#7A7A7A",
                color:"#ffffff"
            }];

            var myHeaders2 = [{
                value:"지출일자 : " + exnpDe,
                fontSize: 12,
                textAlign: "right",
                background:"#7A7A7A",
                color:"#ffffff"
            }];

            sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30});
            sheet.rows.splice(1, 0, { cells: myHeaders2, type: "header", height: 30});
            e.workbook.fileName = "입금의뢰명세서.xlsx";
        });
        grid.saveAsExcel();
    }
}