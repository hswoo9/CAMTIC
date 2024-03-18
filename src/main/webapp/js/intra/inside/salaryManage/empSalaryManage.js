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
                pageSizes: [10, 20, 50, "ALL"],
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
                            '	<span class="k-button-text">고객등록양식 다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="esm.fn_crmExcelUploadPop()">' +
                            '	<span class="k-button-text">고객등록양식 업로드</span>' +
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
                        /** 국민연금 = (기본급 + 상여금)/ 국민연금요율(%) */
                        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
                        var nationalPension = Math.floor(Math.floor(cnt * (e.NATIONAL_PENSION / 100))/10)*10;

                        if(nationalPension > Number(e.LIMIT_AMT)){
                            return e.LIMIT_AMT.toString().toMoney()
                        }else{
                            return nationalPension.toString().toMoney()
                        }
                    }
                }, {
                    title : "건강보험",
                    width: 50,
                    template : function(e){
                        /** 건강보험 = (기본급 + 상여금) / 건강보험요율(%)*/
                        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
                        return (Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10).toString().toMoney()
                    }
                }, {
                    title : "장기요양<br>보험",
                    width: 50,
                    template : function(e){
                        /** 장기요양보험 = (건강보험합계 / 장기요양보험요율(%))*/
                        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
                        var healthInsuranceCnt = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100))/10) * 10;

                        return (Math.floor(Math.floor(healthInsuranceCnt * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10).toString().toMoney()
                    }
                }, {
                    title : "고용보험",
                    width: 50,
                    template : function(e){
                        /** 고용보험 = (기본급 + 상여금) / 고용보험요율(%)*/
                        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
                        return (Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100))/10) * 10).toString().toMoney()
                    }
                }, {
                    field : "",
                    title : "산재보험",
                    width: 50,
                    template : function(e){
                        /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
                        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
                        return (Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100))/10) * 10).toString().toMoney()
                    }
                }, {
                    title : "사대보험<br>사업자부담분",
                    width: 70,
                    template : function(e){
                        /** 사대보험 사업자부담분 = 국민연금 + 건강보험 + 장기요양보험 +고용보험 + 산재보험 */

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
                }, {
                    title : "퇴직금<br>추계액",
                    width: 50,
                    template : function(e){
                        /** 퇴직금 추계액 = (기본급 + 수당 + 상여)/12 */
                        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);
                        return (Math.floor((cnt/12)/10) * 10).toString().toMoney();
                    }
                }, {
                    title : "기준급여",
                    width: 60,
                    template : function(e){
                        /** 기준급여 = (기본급 + 수당 + 상여 + 사업자부담분 + 퇴직금추계액) */
                        /** 기본급 */
                        var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);

                        /** 국민연금 */
                        var nationalPension = cnt * (e.NATIONAL_PENSION / 100);
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

                        var sum = cnt + nationalPension + healthInsurance + longCareInsurance + employInsurance + accidentInsurance + (Math.floor((cnt/12)/10) * 10);

                        return (Math.floor(sum/10) * 10).toString().toMoney();
                    }
                }],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=docId]").prop("checked", true);
            else $("input[name=docId]").prop("checked", false);
        });
    },



    gridReload : function() {
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
}


function userSearch() {
    window.open("/common/deptListPop.do?type=cardMng", "조직도", "width=750, height=650");
}