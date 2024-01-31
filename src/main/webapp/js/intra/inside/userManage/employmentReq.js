var employmentReq = {
    global : {
        searchAjaxData : "",
    },
    fn_defaultScript : function(){
        employmentReq.gridReload();
    },

    gridReload : function() {
        employmentReq.global.searchAjaxData = {
            empSeq : $("#empSeq").val(),
            sendYn : 'Y'
        }
        employmentReq.mainGrid('/userManage/getEmploymentContList.do', employmentReq.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        var record = 0;
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel: {
                fileName:  '연봉근로계약서 리스트.xlsx',
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='btnCheck' name='btnCheck' value='#=SALARY_CONTRACT_ID#' class='tdCheckBox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "번호",
                    template : function (e) {
                        return ($("#mainGrid").data("kendoGrid").dataSource.total() - record++) + '<input type="hidden" + value="'+e.EMP_SEQ+'"/><input type="hidden" value="'+e.type+'"/><input type="hidden" value="'+e.ID+'"/><input type="hidden" value="'+e.key+'"/>';
                    },
                    width: 50
                }, {
                    field: "DEPT_NAME",
                    title: "근무부서",
                    width : 180
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "팀",
                    width : 180
                }, {
                    field: "POSITION_NAME",
                    title: "직위",
                    width : 180
                }, {
                    field: "EMP_NAME",
                    title: "성명"
                }, {
                    field: "SALARY_CONTRACT_REQ_DT",
                    title: "연봉근로계약서 작성일"
                }, {
                    title : "연봉계약서",
                    template : function(e){
                        var rgb = "";
                        var str = "";
                        if(e.FLAG == "Y"){
                            rgb = "info";
                            str = "연봉계약 체결";
                        }else if(e.FLAG == "N"){
                            rgb = "error";
                            str = "연봉계약서 미확인";
                        }else{
                            rgb = "error";
                            str = "연봉계약서";
                        }

                        return '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-' + rgb + '" onclick=\"employmentReq.employmentPop('+ e.SALARY_CONTRACT_ID + ')\">' +
                            '<span class="k-button-text">' + str + '</span>' +
                            '</button>';
                    },
                    width : 135
                }
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=btnCheck]").prop("checked", true);
            else $("input[name=btnCheck]").prop("checked", false);
        });
    },

    employmentPop : function(salaryContractId) {
        var url = "/inside/pop/employmentPop.do?salaryContractId="+salaryContractId;
        var name = "certifiPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    employmentReq.gridReload();
}
