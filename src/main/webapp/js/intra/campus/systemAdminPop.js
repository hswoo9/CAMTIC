const systemAdmin = {
    global: {
        largeCategoryId: "",
        largeCategoryName: "",
        eduCategoryId: "",
        eduCategoryName: ""
    },
    init: function(){
        systemAdmin.dataSet();
        systemAdmin.mainGrid();
    },

    dataSet: function(){
    },

    mainGrid: function(){
        let dataSourceA = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getCodeList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.campusGroupCodeId = "01";
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#categoryGridA").kendoGrid({
            dataSource: dataSourceA,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 541,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar : [
                /*{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.systemAdminReqPop(\'req\', \'A\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, */{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.modBtn(\'A\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.delBtn(\'A\', \'Y\')">' +
                            '	<span class="k-button-text">사용</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.delBtn(\'A\', \'N\')">' +
                            '	<span class="k-button-text">미사용</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function(){
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    systemAdmin.global.largeCategoryId = dataItem.CAMPUS_DT_CODE;
                    systemAdmin.global.largeCategoryName = dataItem.CAMPUS_DT_CODE_NM;
                    gridReload("categoryGridB");
                    systemAdmin.global.eduCategoryId = "";
                    gridReload("categoryGridC");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" onclick="fn_checkAll(\'checkAllA\', \'largeCategoryPk\');"/>',
                    template : "<input type='checkbox' name='largeCategoryPk' class='largeCategoryPk' value='#=CAMPUS_DT_CODE#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "CAMPUS_DT_CODE_NM",
                    title: "분류명"
                }, {
                    title: "사용",
                    width: 70,
                    template: function(row){
                        if(row.ACTIVE == "Y"){
                            return "사용";
                        }else{
                            return "미사용";
                        }
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        let dataSourceB = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getEduCategoryList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.largeCategoryId = systemAdmin.global.largeCategoryId == "" ? -1 : systemAdmin.global.largeCategoryId;
                    data.manageYn = 'Y';
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#categoryGridB").kendoGrid({
            dataSource: dataSourceB,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 541,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.systemAdminReqPop(\'req\', \'B\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.modBtn(\'B\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.delBtn(\'B\', \'Y\')">' +
                            '	<span class="k-button-text">사용</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.delBtn(\'B\', \'N\')">' +
                            '	<span class="k-button-text">미사용</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function(){
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    systemAdmin.global.eduCategoryId = dataItem.EDU_CATEGORY_ID;
                    systemAdmin.global.eduCategoryName = dataItem.EDU_CATEGORY_NAME;
                    gridReload("categoryGridC");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB" onclick="fn_checkAll(\'checkAllB\', \'categoryPk\');"/>',
                    template : "<input type='checkbox' name='categoryPk' class='categoryPk' value='#=EDU_CATEGORY_ID#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "EDU_CATEGORY_NAME",
                    title: "구분명"
                }, {
                    title: "사용",
                    width: 70,
                    template: function(row){
                        if(row.ACTIVE == "Y"){
                            return "사용";
                        }else{
                            return "미사용";
                        }
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        let dataSourceC = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getEduCategoryDetailList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.eduCategoryId = systemAdmin.global.eduCategoryId == "" ? -1 : systemAdmin.global.eduCategoryId;
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#categoryGridC").kendoGrid({
            dataSource: dataSourceC,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 541,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.systemAdminReqPop(\'req\', \'C\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.modBtn(\'C\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.delBtn(\'C\', \'Y\')">' +
                            '	<span class="k-button-text">사용</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.delBtn(\'C\', \'N\')"">' +
                            '	<span class="k-button-text">미사용</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllC" name="checkAllC" onclick="fn_checkAll(\'checkAllC\', \'categoryDetailPk\');"/>',
                    template : "<input type='checkbox' name='categoryDetailPk' class='categoryDetailPk' value='#=EDU_CATEGORY_DETAIL_ID#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "LEVEL_NAME",
                    title: "레벨",
                    width: 100
                }, {
                    field: "EDU_CATEGORY_DETAIL_NAME",
                    title: "항목명"
                }, {
                    title: "사용",
                    width: 70,
                    template: function(row){
                        if(row.ACTIVE == "Y"){
                            return "사용";
                        }else{
                            return "미사용";
                        }
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    modBtn: function(type){
        let checkbox;

        if(type == "A"){
            checkbox = $("input[name=largeCategoryPk]:checked");
        }else if(type == "B"){
            checkbox = $("input[name=categoryPk]:checked");
        }else if(type == "C"){
            checkbox = $("input[name=categoryDetailPk]:checked");
        }

        if(checkbox.length == 0){ alert("수정할 코드를 선택해주세요."); return; }
        if(checkbox.length > 1){ alert("수정은 단건만 가능합니다."); return; }

        systemAdmin.systemAdminReqPop("upd", type, checkbox.val())
    },

    delBtn: function(type, active){
        let checkbox;
        let url;
        let gridId;
        let data = {};

        if(type == "A"){
            checkbox = $("input[name=largeCategoryPk]:checked");
            url = "/campus/setEduCodeDel";
            gridId = "categoryGridA";
            data.groupCode = 1;
        }else if(type == "B"){
            checkbox = $("input[name=categoryPk]:checked");
            url = "/campus/setEduCategoryDel";
            gridId = "categoryGridB";
        }else if(type == "C"){
            checkbox = $("input[name=categoryDetailPk]:checked");
            url = "/campus/setEduCategoryDetailDel";
            gridId = "categoryGridC";
        }

        let checkText = "미사용할 코드를 선택해주세요.";
        let confirmText = "선택한 코드를 미사용 하시겠습니까?";
        let completeText = "미사용 처리가 완료되었습니다.";
        if(active != "N"){
            checkText = "사용할 코드를 선택해주세요.";
            confirmText = "선택한 코드를 사용 하시겠습니까?";
            completeText = "사용 처리가 완료되었습니다.";
        }

        if(checkbox.length == 0){ alert(checkText); return; }
        let checked = "";


        if(!confirm(confirmText)) {
            return;
        }

        $.each(checkbox, function(){
            checked += "," + $(this).val();
        });
        data.pk = checked.substring(1);
        data.active = active;
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert(completeText);
            gridReload(gridId);
        }
    },

    delCanBtn: function(){
        let checkbox;

        if(type == "A"){
            checkbox = $("input[name=largeCategoryPk]:checked");
        }else if(type == "B"){
            checkbox = $("input[name=categoryPk]:checked");
        }else if(type == "C"){
            checkbox = $("input[name=categoryDetailPk]:checked");
        }
        if(checkbox.length == 0){ alert("수정할 코드를 선택해주세요"); return; }
    },

    systemAdminReqPop: function(mode, type, pk){
        let url = "/Campus/pop/systemAdminReqPop.do?mode="+mode+"&type="+type;
        if(type == "A"){
            url += "&campusGroupCodeId=1";
        }
        if(type == "B"){
            url += "&largeCategoryId="+systemAdmin.global.largeCategoryId;
            url += "&largeCategoryName="+systemAdmin.global.largeCategoryName;
        }
        if(type == "C"){
            url += "&eduCategoryId="+systemAdmin.global.eduCategoryId;
            url += "&eduCategoryName="+systemAdmin.global.eduCategoryName;
        }
        if(mode == "upd"){
            url += "&pk="+pk;
        }
        const name = "systemAdminReqPop";
        const option = "width = 800, height = 262, top = 200, left = 400, location = no";
        window.open(url, name, option);
    }
}

function gridReload(str){
    $("#"+str).data("kendoGrid").dataSource.read();
}