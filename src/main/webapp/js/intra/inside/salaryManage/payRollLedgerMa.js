let basicSum = 0, foodSum = 0, extraSum = 0, salTotSum = 0, natSum = 0, hethSum = 0, careSum = 0,
    emplSum = 0, incSum = 0, locIncSum = 0, etcSum = 0, insTotSum = 0, supSum = 0;
let cNatSum = 0, cCareSum = 0, cHethSum = 0, cEmplSum = 0, eEmplSum = 0, cIndtSum = 0, retireSum = 0, cTotSum = 0, eTotSum = 0;
var payRollLedgerMa = {

    global: {
        searchAjaxData : "",
        yearFlag : false,
        yearFlag2 : false
    },

    fn_defaultScript : function(){
        customKendo.fn_datePicker("searchYear", "year", "yyyy-MM", new Date());

        $("#searchKeyWord").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "이름", value: "empName" },
                { text: "부서/팀", value: "deptName" },
            ],
            index: 0,
        });
        customKendo.fn_textBox(["searchValue"])

        payRollLedgerMa.gridReload();
    },

    gridReload : function() {
        payRollLedgerMa.global.searchAjaxData = {
            searchKeyWord : $("#searchKeyWord").val(),
            searchValue : $("#searchValue").val(),
            baseYear : $("#searchYear").val()
        }
        payRollLedgerMa.mainGrid('/salaryManage/getPayRollLedgerList.do', payRollLedgerMa.global.searchAjaxData);
        payRollLedgerMa.mainGrid2('/salaryManage/getPayRollCompanyPay', payRollLedgerMa.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            resizable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'text',
                    template : function (e){
                        return '<span>급여대장</span>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (){
                        return '' +
                            '<input type="text" id="baseYearMonth"/>' +
                            '<input type="file" id="file" style="display: none" onchange="payRollLedgerMa.fileChange(this)"/>' +
                            '<input type="text" id="fileName" readonly class="k-input k-textbox k-input-solid k-input-md k-rounded-md" onclick="$(\'#file\').click()"/>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="$(\'#file\').click()">' +
                            '	<span class="k-button-text">파일선택</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.templateDownload()">' +
                            '	<span class="k-button-text">양식다운로드</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.fileUpload()">' +
                            '	<span class="k-button-text">업로드</span>' +
                            '</button>';
                    }
                }
            ],
            excel: {
                fileName:  '급여대장.xlsx',
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "ERP_EMP_CD",
                    title: "사번",
                    width : 80
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width : 100,
                    footerTemplate: "합계"
                }, {
                    field: "",
                    title: "기본급여 및 제수당",
                    columns: [
                        {
                            field: "BASIC_SALARY",
                            title: "기본급여",
                            width : 100,
                            template: function (e) {
                                basicSum += Number(e.BASIC_SALARY);
                                return '<div style="text-align: right">' + comma(e.BASIC_SALARY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(basicSum)+"</div>";
                            }
                        }, {
                            field: "FOOD_PAY",
                            title: "식대",
                            width : 100,
                            template: function (e) {
                                foodSum += Number(e.FOOD_PAY);
                                return '<div style="text-align: right">' + comma(e.FOOD_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(foodSum)+"</div>";
                            }
                        }, {
                            field: "EXTRA_PAY",
                            title: "수당",
                            width : 100,
                            template: function (e) {
                                extraSum += Number(e.EXTRA_PAY);
                                return '<div style="text-align: right">' + comma(e.EXTRA_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(extraSum)+"</div>";
                            }
                        }, {
                            field: "SAL_TOT_PAY",
                            title: "지급합계",
                            width : 100,
                            template: function (e) {
                                salTotSum += Number(e.SAL_TOT_PAY);
                                return '<div style="text-align: right">' + comma(e.SAL_TOT_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(salTotSum)+"</div>";
                            }
                        }
                    ]
                }, {
                    field: "",
                    title: "기본급여 및 제수당",
                    columns: [
                        {
                            field: "NAT_PAY",
                            title: "국민연금",
                            width : 100,
                            template: function (e) {
                                natSum += Number(e.NAT_PAY);
                                return '<div style="text-align: right">' + comma(e.NAT_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(natSum)+"</div>";
                            }
                        }, {
                            field: "HETH_PAY",
                            title: "건강보험",
                            width : 100,
                            template: function (e) {
                                hethSum += Number(e.HETH_PAY);
                                return '<div style="text-align: right">' + comma(e.HETH_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(hethSum)+"</div>";
                            }
                        }, {
                            field: "CARE_PAY",
                            title: "장기요양",
                            width : 100,
                            template: function (e) {
                                careSum += Number(e.CARE_PAY);
                                return '<div style="text-align: right">' + comma(e.CARE_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(careSum)+"</div>";
                            }
                        }, {
                            field: "EMPL_PAY",
                            title: "고용보험",
                            width : 100,
                            template: function (e) {
                                emplSum += Number(e.EMPL_PAY);
                                return '<div style="text-align: right">' + comma(e.EMPL_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(emplSum)+"</div>";
                            }
                        },  {
                            field: "INC_PAY",
                            title: "소득세",
                            width : 100,
                            template: function (e) {
                                incSum += Number(e.INC_PAY);
                                return '<div style="text-align: right">' + comma(e.INC_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(incSum)+"</div>";
                            }
                        }, {
                            field: "LOC_INC_PAY",
                            title: "주민세",
                            width : 100,
                            template: function (e) {
                                locIncSum += Number(e.LOC_INC_PAY);
                                return '<div style="text-align: right">' + comma(e.LOC_INC_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(locIncSum)+"</div>";
                            }
                        }, {
                            field: "ETC_PAY",
                            title: "기타",
                            width : 100,
                            template: function (e) {
                                etcSum += Number(e.ETC_PAY);
                                return '<div style="text-align: right">' + comma(e.ETC_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(etcSum)+"</div>";
                            }
                        }, {
                            field: "INS_TOT_PAY",
                            title: "공제합계",
                            width : 100,
                            template: function (e) {
                                insTotSum += Number(e.INS_TOT_PAY);
                                return '<div style="text-align: right">' + comma(e.INS_TOT_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(insTotSum)+"</div>";
                            }
                        }
                    ]
                }, {
                    field: "",
                    title: "차인지급액",
                    columns: [
                        {
                            field: "SUP_PAY",
                            title: "실수령액",
                            width : 100,
                            template: function (e) {
                                supSum += Number(e.SUP_PAY);
                                return '<div style="text-align: right">' + comma(e.SUP_PAY) + '</div>';
                            },
                            footerTemplate: function(){
                                return "<div style='text-align: right'>"+comma(supSum)+"</div>";
                            }
                        },
                    ]
                },
            ],
            dataBound: function(){
                basicSum = 0, foodSum = 0, extraSum = 0, salTotSum =0, natSum = 0; hethSum = 0, careSum = 0;
                emplSum = 0, incSum = 0, locIncSum = 0, etcSum = 0, insTotSum = 0, supSum = 0;
            },
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        if(!payRollLedgerMa.global.yearFlag){
            customKendo.fn_datePicker("baseYearMonth", "year", "yyyy-MM", new Date());
            payRollLedgerMa.global.yearFlag = true;
        }
    },

    mainGrid2 : function(url, params) {
        $("#mainGrid2").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            resizable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'text',
                    template : function (e){
                        return '<span>사대보험 및 퇴직연금</span>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (){
                        return '' +
                            '<input type="text" id="baseYearMonth2"/>' +
                            '<input type="file" id="file2" style="display: none" onchange="payRollLedgerMa.fileChange2(this)"/>' +
                            '<input type="text" id="fileName2" readonly class="k-input k-textbox k-input-solid k-input-md k-rounded-md" onclick="$(\'#file2\').click()"/>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="$(\'#file2\').click()">' +
                            '	<span class="k-button-text">파일선택</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.templateDownload2()">' +
                            '	<span class="k-button-text">양식다운로드</span>' +
                            '</button>' +
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="payRollLedgerMa.fileUpload2()">' +
                            '	<span class="k-button-text">업로드</span>' +
                            '</button>';
                    }
                }
            ],
            excel: {
                fileName:  '급여대장.xlsx',
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "ERP_EMP_CD",
                    title: "사번",
                    width : 80
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width : 100,
                }, {
                    field: "PAY_TYPE",
                    title: "비용구분",
                    width : 100,
                    footerTemplate: "합계"
                }, {
                    field: "C_NAT_PAY",
                    title: "국민연금",
                    width : 100,
                    template: function (e) {
                        cNatSum += Number(e.C_NAT_PAY);
                        return '<div style="text-align: right">' + comma(e.C_NAT_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(cNatSum)+"</div>";
                    }
                }, {
                    field: "C_HETH_PAY",
                    title: "건강보험료",
                    width : 100,
                    template: function (e) {
                        cHethSum += Number(e.C_HETH_PAY);
                        return '<div style="text-align: right">' + comma(e.C_HETH_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(cHethSum)+"</div>";
                    }
                }, {
                    field: "C_EMPL_PAY",
                    title: "고용보험<br>(사업자부담)",
                    width : 100,
                    template: function (e) {
                        cEmplSum += Number(e.C_EMPL_PAY);
                        return '<div style="text-align: right">' + comma(e.C_EMPL_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(cEmplSum)+"</div>";
                    }
                }, {
                    field: "E_EMPL_PAY",
                    title: "고용보험<br>(근로자)",
                    width : 100,
                    template: function (e) {
                        eEmplSum += Number(e.E_EMPL_PAY);
                        return '<div style="text-align: right">' + comma(e.E_EMPL_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(eEmplSum)+"</div>";
                    }
                }, {
                    field: "C_CARE_PAY",
                    title: "장기요양",
                    width : 100,
                    template: function (e) {
                        cCareSum += Number(e.C_CARE_PAY);
                        return '<div style="text-align: right">' + comma(e.C_CARE_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(cCareSum)+"</div>";
                    }
                }, {
                    field: "C_INDT_PAY",
                    title: "산재보험",
                    width : 100,
                    template: function (e) {
                        cIndtSum += Number(e.C_INDT_PAY);
                        return '<div style="text-align: right">' + comma(e.C_INDT_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(cIndtSum)+"</div>";
                    }
                }, {
                    field: "RETIRE_PAY",
                    title: "퇴직연금",
                    width : 100,
                    template: function (e) {
                        retireSum += Number(e.RETIRE_PAY);
                        return '<div style="text-align: right">' + comma(e.RETIRE_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(retireSum)+"</div>";
                    }
                }, {
                    field: "C_TOT_PAY",
                    title: "사대보험 합계<br>(사업자)",
                    width : 100,
                    template: function (e) {
                        cTotSum += Number(e.C_TOT_PAY);
                        return '<div style="text-align: right">' + comma(e.C_TOT_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(cTotSum)+"</div>";
                    }
                }, {
                    field: "E_TOT_PAY",
                    title: "사대보험 합계<br>(근로자)",
                    width : 100,
                    template: function (e) {
                        eTotSum += Number(e.E_TOT_PAY);
                        return '<div style="text-align: right">' + comma(e.E_TOT_PAY) + '</div>';
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(eTotSum)+"</div>";
                    }
                }
            ],
            dataBound : function(){
                cNatSum = 0, cCareSum = 0, cHethSum = 0, cEmplSum = 0, eEmplSum = 0, cIndtSum = 0, retireSum = 0, cTotSum = 0, eTotSum = 0;
            },
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        if(!payRollLedgerMa.global.yearFlag2){
            customKendo.fn_datePicker("baseYearMonth2", "year", "yyyy-MM", new Date());
            payRollLedgerMa.global.yearFlag2 = true;
        }
    },

    fileChange : function(e){
        var file = $(e)[0].files[0];
        var fileExt = file.name.split(".")[file.name.split(".").length - 1];

        if($.inArray(fileExt, ['xls']) == -1){
            alert("xls 확장자만 업로드할 수 있습니다.");
            $(e).val("");
            return;
        }

        $("#fileName").val($(e)[0].files[0].name);
    },

    fileChange2 : function(e){
        var file = $(e)[0].files[0];
        var fileExt = file.name.split(".")[file.name.split(".").length - 1];

        if($.inArray(fileExt, ['xls']) == -1){
            alert("xls 확장자만 업로드할 수 있습니다.");
            $(e).val("");
            return;
        }

        $("#fileName2").val($(e)[0].files[0].name);
    },

    fileUpload : function(){
        if($("#baseYearMonth").val() == ""){
            alert("업로드 년월을 선택해주세요.");
            return;
        }

        if($("#file")[0].files.length == 0){
            alert("파일을 선택해주세요.");
            return;
        }

        if(confirm("등록하시겠습니까?")){
            var formData = new FormData();
            formData.append("file", $("#file")[0].files[0]);
            formData.append("baseYearMonth", $("#baseYearMonth").val());
            formData.append("loginEmpSeq", $("#empSeq").val());
            $.ajax({
                url : '/inside/salaryManage/setExcelUpload.do',
                type : 'POST',
                data: formData,
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                beforeSend : function(){
                    var maskHeight = $(document).height();
                    var maskWidth  = $(document).width();
                    var mask       = "<div id='mask' style='position:absolute; z-index:9999999999; background-color:#000000; display:none; left:0; top:0;'></div>";
                    var loadingDiv       = "<div id=\"loadingImg\" style=\"display: none;\"></div>";
                    var loadingImg = "<img src='/css/kendoui/Black/loading_2x.gif' id='imgTag' style='display: block; margin: 0px auto;'/>";
                    $('body').append(mask)
                    $('body').append(loadingDiv)

                    $('#loadingImg').css({
                        "position": "absolute",
                        "display": "block",
                        "margin": "0px auto",
                        "top": "50%",
                        "left": "50%",
                        "z-index": "10000000000",
                    });

                    $('#mask').css({
                        'width' : maskWidth,
                        'height': maskHeight,
                        'opacity' : '0.3'
                    });
                    $('#mask').show();
                    $('#loadingImg').append(loadingImg);
                    $('#loadingImg').show();
                },
                success : function(rs) {
                    if(rs.rs.errorRow != ""){
                        alert("[ " + rs.rs.errorRow + " ]사용자를 찾을 수 없습니다.\n" +
                            "[ " + rs.rs.errorRow + " ]사용자를 제외한 데이터가 저장되었습니다.");
                    }

                    if(rs.rs.error != ""){
                        alert(rs.rs.error);
                    }

                    $('#mask').remove();
                    $('#loadingImg').remove();
                    payRollLedgerMa.gridReload();
                },
            })
        }
    },

    fileUpload2 : function(){
        if($("#baseYearMonth2").val() == ""){
            alert("업로드 년월을 선택해주세요.");
            return;
        }

        if($("#file2")[0].files.length == 0){
            alert("파일을 선택해주세요.");
            return;
        }

        if(confirm("등록하시겠습니까?")){
            var formData = new FormData();
            formData.append("file", $("#file2")[0].files[0]);
            formData.append("baseYearMonth", $("#baseYearMonth2").val());
            formData.append("loginEmpSeq", $("#empSeq").val());
            $.ajax({
                url : '/inside/salaryManage/setExcelUpload2',
                type : 'POST',
                data: formData,
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                beforeSend : function(){
                    var maskHeight = $(document).height();
                    var maskWidth  = $(document).width();
                    var mask       = "<div id='mask' style='position:absolute; z-index:9999999999; background-color:#000000; display:none; left:0; top:0;'></div>";
                    var loadingDiv       = "<div id=\"loadingImg\" style=\"display: none;\"></div>";
                    var loadingImg = "<img src='/css/kendoui/Black/loading_2x.gif' id='imgTag' style='display: block; margin: 0px auto;'/>";
                    $('body').append(mask)
                    $('body').append(loadingDiv)

                    $('#loadingImg').css({
                        "position": "absolute",
                        "display": "block",
                        "margin": "0px auto",
                        "top": "50%",
                        "left": "50%",
                        "z-index": "10000000000",
                    });

                    $('#mask').css({
                        'width' : maskWidth,
                        'height': maskHeight,
                        'opacity' : '0.3'
                    });
                    $('#mask').show();
                    $('#loadingImg').append(loadingImg);
                    $('#loadingImg').show();
                },
                success : function(rs) {
                    if(rs.rs.errorRow != ""){
                        alert("[ " + rs.rs.errorRow + " ]사용자를 찾을 수 없습니다.\n" +
                            "[ " + rs.rs.errorRow + " ]사용자를 제외한 데이터가 저장되었습니다.");
                    }

                    if(rs.rs.error != ""){
                        alert(rs.rs.error);
                    }

                    $('#mask').remove();
                    $('#loadingImg').remove();
                    payRollLedgerMa.gridReload();
                },
            })
        }
    },

    templateDownload : function(){
        let filePath = "/upload/templateForm/payrollRegister.xls"
        let fileName = "급여대장업로드양식.xls";
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
        });
    },

    templateDownload2 : function(){
        let filePath = "/upload/templateForm/payrollRegister2.xls"
        let fileName = "사대보험 및 퇴직연금.xls";
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
        });
    }

}