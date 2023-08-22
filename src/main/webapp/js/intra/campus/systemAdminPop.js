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
        customKendo.fn_textBox(["searchText"])
        customKendo.fn_datePicker("recruitYear", "decade", "yyyy", new Date());
        let searchTypeDataSource = [
            {text: "모집분야", value: "1"},
            {text: "공고명", value: "2"},
            {text: "공고번호", value: "3"},
            {text: "지원자", value: "4"}
        ]
        customKendo.fn_dropDownList("searchType", searchTypeDataSource, "text", "value", 3);
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
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemAdmin.systemAdminReqPop(\'req\', \'A\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionModChk()">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(1)">' +
                            '	<span class="k-button-text">삭제</span>' +
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
                    console.log(systemAdmin.global.largeCategoryId);
                    console.log(systemAdmin.global.largeCategoryName);
                    gridReload("categoryGridB");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" onclick="fn_checkAll(\'checkAllA\', \'largeCategoryPk\');"/>',
                    template : "<input type='checkbox' name='largeCategoryPk' class='largeCategoryPk'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "CAMPUS_DT_CODE_NM",
                    title: "분류명"
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
                pageSizes: [ 10, 20, 30, 50, 100 ],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionModChk()">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(1)">' +
                            '	<span class="k-button-text">삭제</span>' +
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
                    console.log(systemAdmin.global.eduCategoryId);
                    console.log(systemAdmin.global.eduCategoryName);
                    gridReload("categoryGridC");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB" onclick="fn_checkAll(\'checkAllB\', \'categoryPk\');"/>',
                    template : "<input type='checkbox' name='categoryPk' class='categoryPk'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "EDU_CATEGORY_NAME",
                    title: "구분명"
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
                pageSizes: [ 10, 20, 30, 50, 100 ],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionModChk()">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(1)">' +
                            '	<span class="k-button-text">삭제</span>' +
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
                    template : "<input type='checkbox' name='categoryDetailPk' class='categoryDetailPk'/>",
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
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    systemAdminReqPop: function(mode, type){
        let url = "/Campus/pop/systemAdminReqPop.do?mode="+mode+"&type="+type;
        if(type == "B"){
            url += "&largeCategoryId="+systemAdmin.global.largeCategoryId;
            url += "&largeCategoryName="+systemAdmin.global.largeCategoryName;
        }
        if(type == "C"){
            url += "&eduCategoryId="+systemAdmin.global.eduCategoryId;
            url += "&eduCategoryName="+systemAdmin.global.eduCategoryName;
        }
        const name = "systemAdminReqPop";
        const option = "width = 800, height = 262, top = 200, left = 400, location = no";
        window.open(url, name, option);
    }
}

function gridReload(str){
    $("#"+str).data("kendoGrid").dataSource.read();
}