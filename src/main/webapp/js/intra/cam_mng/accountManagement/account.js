var account = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function(){
        var data = {};
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq");

        $("#deptComp").data("kendoDropDownList").bind("change", account.fn_chngDeptComp);
        $("#deptComp").data("kendoDropDownList").select(0);
        $("#deptComp").data("kendoDropDownList").trigger("change");

        $("#userGender").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "남", value: "M"},
                {text: "여", value: "F"}
            ],
            index: 0
        });

        $("#userKind").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "성명", value: "EMP_NAME_KR"},
                {text: "직급", value: "POSITION_NAME"},
                {text: "등급", value: "등급"},
                {text: "직책", value: "직책"},
                {text: "메일주소", value: "EMAIL_ADDR"},
                {text: "전화번호", value: "OFFICE_TEL_NUM"},
                {text: "핸드폰", value: "MOBILE_TEL_NUM"}
            ],
            index: 0
        });

        $("#kindContent").kendoTextBox();

        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });


        account.mainGrid();
    },

    fn_chngDeptComp : function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("deptTeam", ds.rs, "dept_name", "dept_seq");
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/mng/userAccountManagementList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.userKind = $('#userKind').val();
                    data.empNameKr = $("#kindContent").val();
                    data.kindContent = $("#kindContent").val();
                    data.userGender = $("#userGender").val();
                    data.deptComp = $("#deptComp").val();
                    data.deptTeam = $("#deptTeam").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 472,
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
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="account.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll"  onclick="account.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template: "<input type='checkbox' id='' name='checkUser' value=''/>",
                    width: 50
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width : 100
                }, {
                    field: "DEPT_NAME1",
                    title: "부서(실)"
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "부서(팀)"
                }, {
                    title: "직위",
                    template: function(row){
                        return fn_getSpot(row.DUTY_NAME, row.POSITION_NAME);
                    }
                }, {
                    title: "작업현황"
                }

            ]
        }).data("kendoGrid");
    },

    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },
    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='checkUser']").prop("checked", true);
        }else{
            $("input[name='checkUser']").prop("checked", false);
        }
    },
}