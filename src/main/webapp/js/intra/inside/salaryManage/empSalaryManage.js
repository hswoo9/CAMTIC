var record = 0;
var esm = {
    
    global : {
        rateIndex : 0,
        now : new Date(),
        saveAjaxData : "",
    },
    
    fn_defaultScript : function(){
        $("#workStatusCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "재직여부", value: "" },
                { text: "재직", value: "Y" },
                { text: "퇴직", value: "N" }
            ],
            index: 0,
            change : function(){
                esm.gridReload();
            }
        });

        $("#searchDateType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "입사일", value: "j" },
                { text: "퇴사일", value: "q" },
                { text: "기준급여 적용일", value: "a" }
            ],
            index: 0,
            change : function(){
                esm.gridReload();
            }
        });

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date('1999-01-01'));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        customKendo.fn_datePicker("year", 'decade', "yyyy", new Date());
        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "직원유형", value: "" },
                { text: "정규직원", value: "r" },
                { text: "계약직원", value: "c" },
                { text: "인턴사원", value: "i" }
            ],
            index: 0,
            change : function(){
                esm.gridReload();
            }
        });

        $("#searchKeyWord").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "성명", value: "userName" },
                { text: "부서명", value: "deptName" },
                { text: "팀명", value: "teamName" },
                { text: "사업참여", value: "projectCnt" }
            ],
            index: 0,
            change : function(){
                esm.gridReload();
            }
        });

        customKendo.fn_textBox(["searchText"]);

        esm.gridReload();
    },

    mainGrid : function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 555,
            dataSource: customKendo.fn_gridDataSource2(url, params, 10),
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="esm.templateExcelFormDown()">' +
                            '	<span class="k-button-text">급여관리 등록양식 다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="esm.fn_crmExcelUploadPop()">' +
                            '	<span class="k-button-text">급여관리 등록양식 업로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="userSearch()">' +
                            '	<span class="k-button-text">급여관리</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="esm.gridReload()">' +
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
                    width: 30,
                    template: "#= --record #",
                }, {
                    field : "EMP_NAME_KR",
                    title : "이름",
                    width: 50,
                }, {
                    field : "RES_REGIS_NUM",
                    title : "주민등록번호",
                    width: 65,
                }, {
                    field : "JOIN_DAY",
                    title : "입사일",
                    width: 60,
                }, {
                    field : "DIVISION",
                    title : "직원유형",
                    width: 50,
                }, {
                    field : "DEPT_NAME",
                    title : "부서/팀",
                    width: 100,
                }, {
                    title : "기본급여 적용기간",
                    columns : [
                        {
                            field: "START_DT",
                            title: "시작일",
                            width: 60,
                        }, {
                            field: "END_DT",
                            title: "종료일",
                            width: 60,
                        }
                    ]
                }, {
                    title : "기본급여",
                    columns : [
                        {
                            field: "BASIC_SALARY",
                            title: "기본급",
                            width: 60,
                            template : function(e){
                                return e.BASIC_SALARY.toString().toMoney();
                            }
                        }, {
                            field: "FOOD_PAY",
                            title: "식대",
                            width: 50,
                            template : function(e){
                                return e.FOOD_PAY.toString().toMoney();
                            }
                        }, {
                            field: "EXTRA_PAY",
                            title: "수당",
                            width: 50,
                            template : function(e){
                                return e.EXTRA_PAY.toString().toMoney();
                            }
                        }, {
                            field: "BONUS",
                            title: "상여",
                            width: 60,
                            template : function(e){
                                return e.BONUS.toString().toMoney();
                            }
                        }
                    ]
                }, {
                    title : "국민연금",
                    width: 50,
                    template : function(e){
                        return annuities(e)
                    }
                }, {
                    title : "건강보험",
                    width: 50,
                    template : function(e){
                        return insurance1(e);
                    }
                }, {
                    title : "장기요양<br>보험",
                    width: 50,
                    template : function(e){
                        return insurance2(e);
                    }
                }, {
                    title : "고용보험",
                    width: 50,
                    template : function(e){
                        return insurance3(e)
                    }
                }, {
                    field : "",
                    title : "산재보험",
                    width: 50,
                    template : function(e){
                        return insurance4(e)
                    }
                }, {
                    title : "사대보험<br>사업자부담분",
                    width: 70,
                    template : function(e){
                        return insuranceComp(e);
                    }
                }, {
                    title : "퇴직금<br>추계액",
                    width: 50,
                    template : function(e){
                        return retirePay(e)
                    }
                }, {
                    title : "기준급여",
                    width: 60,
                    template : function(e){
                        return baseSalary(e);
                    }
                }],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
            excelExport : function (e){
                e.workbook.sheets[0] = esm.fn_excelDataSet(e);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=docId]").prop("checked", true);
            else $("input[name=docId]").prop("checked", false);
        });
    },



    gridReload : function() {
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }

        esm.global.searchAjaxData = {
            workStatusCode : $("#workStatusCode").val(),
            searchDateType : $("#searchDateType").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            division : $("#division").val(),
            searchKeyWord : $("#searchKeyWord").val(),
            searchText : $("#searchText").val(),
            year : $("#year").val()
        }

        esm.mainGrid("/salaryManage/getEmpSalaryManageList.do", esm.global.searchAjaxData);
    },

    templateExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/esm/esmRegTemplateDown.do"
        });
    },

    fn_crmExcelUploadPop : function (){
        var url = "/inside/pop/esmExcelUploadPop.do";
        var name = "_blank";
        var option = "width = 500, height = 230, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_excelDataSet : function(e) {
        var sheet = e.workbook.sheets[0];
        sheet.rows[0].cells.push({
            background: "#7a7a7a",
            color: "#fff",
            firstCell: false,
            rowSpan: 2,
            value: "국민연금"
        }, {
            background: "#7a7a7a",
            color: "#fff",
            firstCell: false,
            rowSpan: 2,
            value: "건강보험"
        }, {
            background: "#7a7a7a",
            color: "#fff",
            firstCell: false,
            rowSpan: 2,
            value: "장기요양 보험"
        }, {
            background: "#7a7a7a",
            color: "#fff",
            firstCell: false,
            rowSpan: 2,
            value: "고용보험"
        }, {
            background: "#7a7a7a",
            color: "#fff",
            firstCell: false,
            rowSpan: 2,
            value: "산재보험"
        }, {
            background: "#7a7a7a",
            color: "#fff",
            firstCell: false,
            rowSpan: 2,
            value: "사대보험 사업자부담분"
        }, {
            background: "#7a7a7a",
            color: "#fff",
            firstCell: false,
            rowSpan: 2,
            value: "퇴직금 추계액"
        }, {
            background: "#7a7a7a",
            color: "#fff",
            firstCell: false,
            rowSpan: 2,
            value: "기준급여"
        });

        sheet.rows = sheet.rows.filter(h => h.type == "header");

        for (var i = 0; i < e.sender.dataSource._data.length; i++) {
            var data = {
                type: "data",
                cells: new Array(),
            }
            for (var j = 0; j < 19; j++) {
                var cellsData = {};
                if (j == 0) {
                    cellsData.value = e.sender.dataSource._data[i].EMP_NAME_KR;
                } else if (j == 1) {
                    cellsData.value = e.sender.dataSource._data[i].RES_REGIS_NUM;
                } else if (j == 2) {
                    cellsData.value = e.sender.dataSource._data[i].JOIN_DAY;
                } else if (j == 3) {
                    cellsData.value = e.sender.dataSource._data[i].DIVISION;
                } else if (j == 4) {
                    cellsData.value = e.sender.dataSource._data[i].DEPT_NAME;
                } else if (j == 5) {
                    cellsData.value = e.sender.dataSource._data[i].START_DT;
                } else if (j == 6) {
                    cellsData.value = e.sender.dataSource._data[i].END_DT;
                } else if (j == 7) {
                    cellsData.value = e.sender.dataSource._data[i].BASIC_SALARY;
                } else if (j == 8) {
                    cellsData.value = e.sender.dataSource._data[i].FOOD_PAY;
                } else if (j == 9) {
                    cellsData.value = e.sender.dataSource._data[i].EXTRA_PAY;
                } else if (j == 10) {
                    cellsData.value = e.sender.dataSource._data[i].BONUS;
                } else if (j == 11) {
                    /** 국민연금 */
                    cellsData.value = annuities(e.sender.dataSource._data[i]);
                } else if (j == 12) {
                    /** 건강보험 */
                    cellsData.value = insurance1(e.sender.dataSource._data[i]);
                } else if (j == 13) {
                    /** 장기요양 보험 */
                    cellsData.value = insurance2(e.sender.dataSource._data[i]);
                } else if (j == 14) {
                    /** 고용보험 */
                    cellsData.value = insurance3(e.sender.dataSource._data[i]);
                } else if (j == 15) {
                    /** 산재보험 */
                    cellsData.value = insurance4(e.sender.dataSource._data[i]);
                } else if (j == 16) {
                    /** 사대보험 사업자부담분 */
                    cellsData.value = insuranceComp(e.sender.dataSource._data[i]);
                } else if (j == 17) {
                    /** 퇴직금 추계액 */
                    cellsData.value = retirePay(e.sender.dataSource._data[i]);
                } else if (j == 18) {
                    /** 기준급여 */
                    cellsData.value = baseSalary(e.sender.dataSource._data[i]);
                }
                data.cells.push(cellsData);
            }
            sheet.rows.push(data);
        }

        return sheet;
    },
}


function userSearch() {
    window.open("/common/deptListPop.do?type=cardMng", "조직도", "width=750, height=650");
}

function annuities(e){
    /** 국민연금 = (기본급 + 상여금)/ 국민연금요율(%) */
    var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
    var nationalPension = Math.floor(Math.floor(cnt * (e.NATIONAL_PENSION / 100))/10)*10;

    if(nationalPension > Number(e.LIMIT_AMT)){
        return e.LIMIT_AMT.toString().toMoney()
    }else{
        return nationalPension.toString().toMoney()
    }
}

function insurance1(e){
    /** 건강보험 = (기본급 + 상여금) / 건강보험요율(%)*/
    var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
    return (Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10).toString().toMoney()
}

function insurance2(e){
    /** 장기요양보험 = (건강보험합계 / 장기요양보험요율(%))*/
    var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
    var healthInsuranceCnt = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10;
    return (Math.floor(Math.floor(healthInsuranceCnt * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10).toString().toMoney()
}

function insurance3(e){
    /** 고용보험 = (기본급 + 상여금) / 고용보험요율(%)*/
    var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
    return (Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10).toString().toMoney()
}

function insurance4(e){
    /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
    var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
    return (Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10).toString().toMoney()
}

function insuranceComp(e){
    if(e.BUSN_PAY != null && e.BUSN_PAY != "") {
        return e.BUSN_PAY.toString().toMoney();
    }else{
        /** 기본급 */
        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);

        /** 국민연금 */
        var nationalPension = Math.floor(cnt * (e.NATIONAL_PENSION / 100));
        if(nationalPension > Number(e.LIMIT_AMT)){
            nationalPension = Number(e.LIMIT_AMT);
        }
        /** 건강보험 */
        var healthInsurance = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10
        /** 장기요양보험 */
        var longCareInsurance =  Math.floor(Math.floor(healthInsurance * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10
        /** 고용보험 */
        var employInsurance = Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10;
        /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
        var accidentInsurance = Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10;

        return (nationalPension + healthInsurance + longCareInsurance + employInsurance + accidentInsurance).toString().toMoney();
    }
}

function retirePay(e){
    if(e.RETIRE_PAY != null && e.RETIRE_PAY != ""){
        return  Number(e.RETIRE_PAY).toString().toMoney();
    }else{
        /** 퇴직금 추계액 = (기본급 + 수당 + 상여)/12 */
        var joinDay = new Date(e.JOIN_DAY);
        if(isLessOneYear(joinDay)){
            return 0;
        }else{
            var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
            return (Math.floor((cnt/12)/10) * 10).toString().toMoney();
        }
    }
}

function baseSalary(e){
    /** 기준급여 = (기본급 + 수당 + 상여 + 사업자부담분 + 퇴직금추계액) */
    /** 기본급 */
    var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);

    /** 국민연금 */
    var nationalPension = annuities(e).toString().toMoney2();
    /** 건강보험 */
    var healthInsurance = insurance1(e).toString().toMoney2();
    /** 장기요양보험 */
    var longCareInsurance = insurance2(e).toString().toMoney2();
    /** 고용보험 */
    var employInsurance = insurance3(e).toString().toMoney2();
    /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
    var accidentInsurance = insurance4(e).toString().toMoney2();

    var sum = Number(cnt);
    if(e.BUSN_PAY != null && e.BUSN_PAY != ""){
        sum += Number(e.BUSN_PAY);
    }else{
        sum += Number(nationalPension) + Number(healthInsurance) + Number(longCareInsurance) + Number(employInsurance) + Number(accidentInsurance);
    }

    if(e.RETIRE_PAY != null && e.RETIRE_PAY != ""){
        sum += Number(e.RETIRE_PAY);
    }else{
        var joinDay = new Date(e.JOIN_DAY);
        if(!isLessOneYear(joinDay)){
            sum += (Math.floor((cnt/12)/10) * 10);
        }
    }

    return (Math.floor(sum/10) * 10).toString().toMoney();
}

function isLessOneYear(j){
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    return j >= oneYearAgo;
}