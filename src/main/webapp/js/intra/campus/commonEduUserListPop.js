const commonEduUser = {
    global: {
        commonInfo: {}
    },

    init: function(){
        commonEduUser.mainGrid();
        commonEduUser.dataSet();
    },

    dataSet: function(){
        let commonInfo = customKendo.fn_customAjax("/campus/getCommonEduOne", {
            pk: $("#pk").val()
        }).data;
        commonEduUser.global.commonInfo = commonInfo;
        $("#eduNameTd").text(commonInfo.EDU_NAME);
    },

    mainGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/campus/getCommonEduUserList',
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
            dataBound: commonEduUser.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'userPk\');"/>',
                    template : "<input type='checkbox' id='userPk#=COMMON_EDU_USER_SN#' name='userPk' class='userPk' value='#=COMMON_EDU_USER_SN#'/>",
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
                }, {
                    title: "이수상태",
                    width: 100,
                    template: function(row){
                        return row.PART_YN == "Y" ? "수료" : "미수료";
                    }
                }, {
                    field: "REAR_EDU_TIME",
                    title: "이수시간",
                    width: 100,
                    template: function(row){
                        if(row.PART_YN == "Y"){
                            return "<input type='text' style='text-align: right; width: 50px' class='eduTime' oninput='onlyNumber(this)' onkeyup='fn_inputNumberFormat(this)' id='eduTime"+row.COMMON_EDU_USER_SN+"' value='"+row.REAR_EDU_TIME+"'>시간"
                        } else {
                            return "<input type='text' style='text-align: right; width: 50px' class='eduTime' oninput='onlyNumber(this)' onkeyup='fn_inputNumberFormat(this)' id='eduTime"+row.COMMON_EDU_USER_SN+"' value='0'>시간"
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").click(function(e){
            const dataItem = grid.dataItem($(this));
            const empSeq = dataItem.REG_EMP_SEQ;
            /*$(this).find('.userPk').trigger('click');*/
        });
        $(".eduTime").kendoTextBox();
    },

    userMngBtn: function(type){
        let userArr = [];
        $("input[name=userPk]:checked").each(function(i){
            userArr.push($(this).val());
        })
        let data = {
            pk: $("#pk").val(),
            type: type,
            userList: userArr.join()
        }
        if(type == "A"){
            data.partYn = "Y";
        }else if(type == "B"){
            data.partYn = "N";
        }else if(type == "D"){
            data.active = "N";
        }


        let url = "/campus/setCommonEduUserUpd";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            if(type == "A"){
                alert("선택 직원이 이수처리 되었습니다.");
            }else if(type == "B"){
                alert("선택 직원이 미이수처리 되었습니다.");
            }else if(type == "D"){
                alert("선택 직원이 삭제되었습니다.");
            }
            gridReload();
            opener.parent.opener.gridReload();
        }
    },

    userEduTimeBtn: function(){
        let userArr = [];
        $("input[name=userPk]:checked").each(function(i){
            let userData = {
                pk: $(this).val(),
                eduTime: $("#eduTime"+$(this).val()).val()
            }
            userArr.push(userData);
        })

        let data = {
            userData: JSON.stringify(userArr)
        }

        let url = "/campus/setCommonEduUserTimeUpd";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("선택 직원 이수시간이 변경되었습니다.");
            gridReload();
            opener.parent.opener.gridReload();
        }
    }
}