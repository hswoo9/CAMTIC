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
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                    /*template : function (e) {
                        return ($("#mainGrid").data("kendoGrid").dataSource.total() - record++) + '<input type="hidden" + value="'+e.EMP_SEQ+'"/><input type="hidden" value="'+e.type+'"/><input type="hidden" value="'+e.ID+'"/><input type="hidden" value="'+e.key+'"/>';
                    },*/
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "parentDeptName",
                    title: "근무부서",
                    width : 180
                }, {
                    field: "DEPT_NAME",
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
                            str = "연봉계약 확인";
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
            ],
            dataBinding: function(){
                record = employmentReq.fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=btnCheck]").prop("checked", true);
            else $("input[name=btnCheck]").prop("checked", false);
        });
    },

    employmentPop : function(salaryContractId) {
        $("#employR").val(salaryContractId);
        $("#employRF").one("submit", function() {
            var url = "/inside/pop/employmentPop.do";
            var name = "employmentPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
            this.action = "/inside/pop/employmentPop.do";
            this.method = 'POST';
            this.target = 'employmentPop';
        }).trigger("submit");
    },

    fn_getRowNum : function(e, type){
        /** type이 1이면 정순, 2면 역순, 3이면 페이징 없을때 역순 */
        let pageSize = e.dataSource.pageSize();
        if(pageSize == null){
            pageSize = 9999;
        }

        if(type == 1){
            return (e.dataSource.page() -1) * pageSize;
        }else if(type == 2){
            return e.dataSource._data.length+1 - ((e.dataSource.page() -1) * pageSize);
        }else if(type == 3){
            return e.dataSource._data.length+1 - ((0 -1) * 0);
        }else{
            return 0;
        }
    }
}