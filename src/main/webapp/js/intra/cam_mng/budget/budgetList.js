var budgetList = {

    global : {
        dropDownDataSource : []
    },

    fn_defaultScript: function (){

        budgetList.global.dropDownDataSource = [
            { text: "진행", value: "1" },
            { text: "종료", value: "2" }
        ]
        customKendo.fn_dropDownList("searchDept", budgetList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", budgetList.gridReload);

        customKendo.fn_datePicker("strDate", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDate", "depth", "yyyy-MM-dd", new Date());


        budgetList.global.dropDownDataSource = [
            { text: "프로젝트 명", value: "PJT_NM" },
            { text: "프로젝트 코드", value: "PJT_CD" },
        ]

        customKendo.fn_dropDownList("searchKeyword", budgetList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);



        var parameters = {
            searchDept : $("#searchDept").val(),
            strDate : $("#strDate").val(),
            endDate : $("#endDate").val(),
            searchKeyword : $("#searchKeyWord").val(),
            searchValue : $("#searchValue").val()
        }

    },


    mainGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.searchDept = $("#searchDept").val();
                    data.strDate = $("#strDate").val();
                    data.endDate = $("#endDate").val();
                    data.searchKeyword = $("#searchKeyWord").val();
                    data.searchValue = $("#searchValue").val();
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
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: commonEduUserAdd.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'userPk\');"/>',
                    template : "<input type='checkbox' id='userPk#=REG_EMP_SEQ#' name='userPk' class='userPk' value='#=REG_EMP_SEQ#'/>",
                    width: 50
                }, {
                    title: "부서",
                    template: "#=REG_DEPT_NAME# #=REG_TEAM_NAME#"
                }, {
                    title: "직위",
                    width: 100,
                    template: function(row){
                        return row.REG_DUTY_NAME == "" ? row.REG_POSITION_NAME : row.REG_DUTY_NAME;
                    }
                }, {
                    field: "REG_EMP_NAME",
                    title: "이름",
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },
}