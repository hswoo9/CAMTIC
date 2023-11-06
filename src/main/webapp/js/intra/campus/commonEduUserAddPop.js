const commonEduUserAdd = {
    global: {
        commonInfo: {}
    },

    init: function(){
        commonEduUserAdd.mainGrid();
        commonEduUserAdd.dataSet();
    },

    dataSet: function(){
        let commonInfo = customKendo.fn_customAjax("/campus/getCommonEduOne", {
            pk: $("#pk").val()
        }).data;
        commonEduUserAdd.global.commonInfo = commonInfo;
        $("#eduNameTd").text(commonInfo.EDU_NAME);
    },

    mainGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/campus/getCommonEduUserAddList',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.pk = $("#pk").val();
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

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").click(function(e){
            const dataItem = grid.dataItem($(this));
            /*$(this).find('.userPk').trigger('click');*/
        });
    },

    userAddBtn: function(){
        let userArr = [];
        $("input[name=userPk]:checked").each(function(i){
            userArr.push($(this).val());
        })
        let data = {
            pk: $("#pk").val(),
            userList: userArr.join()
        }

        let url = "/campus/setCommonEduAddUserAll";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("선택 직원이 추가 되었습니다.");
            gridReload();
            opener.parent.opener.gridReload();
        }
    }
}