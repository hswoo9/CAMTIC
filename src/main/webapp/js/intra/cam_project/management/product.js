var product = {
    global: {
        largeCategoryId: "",
        largeCategoryName: "",
        mediumCategoryId: "",
        mediumCategoryName: ""
    },

    fn_defaultScript : function (){
        product.mainGrid();
    },

    fn_dataSet: function(){

    },

    mainGrid: function(){
        let dataSourceA = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/projectMng/getProductCodeInfo",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.productGroupCodeId = "01";
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.productReqPop(\'req\', \'A\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.fn_modBtn(\'A\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.fn_delBtn(\'A\')">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(){
                const grid = this;
                /** 대분류 더블클릭시 중분류 그리드 리로드 및 소분류 초기화 */
                grid.tbody.find("tr").click(function(){
                    const dataItem = grid.dataItem($(this));
                    product.global.largeCategoryId = dataItem.PRODUCT_DT_CODE;
                    product.global.largeCategoryName = dataItem.PRODUCT_DT_CODE_NM;
                    product.global.mediumCategoryId = "";
                    gridReload("categoryGridB");
                    gridReload("categoryGridC");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" onclick="fn_checkAll(\'checkAllA\', \'largeCategoryPk\');"/>',
                    template : "<input type='checkbox' name='largeCategoryPk' class='largeCategoryPk' value='#=PRODUCT_DT_CODE#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "PRODUCT_DT_CODE_NM",
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
                    url: "/projectMng/getProductCodeInfo",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.productGroupCodeId = "02";
                    data.parentCodeId = product.global.largeCategoryId == "" ? 0 : product.global.largeCategoryId;
                    data.parentCodeName = product.global.largeCategoryName == "" ? 0 : product.global.largeCategoryName;
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.productReqPop(\'req\', \'B\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.fn_modBtn(\'B\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.fn_delBtn(\'B\')">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(){
                const grid = this;
                /** 중분류 더블클릭시 소분류 그리드 리로드 */
                grid.tbody.find("tr").click(function(){
                    const dataItem = grid.dataItem($(this));
                    product.global.mediumCategoryId = dataItem.PRODUCT_DT_CODE;
                    product.global.mediumCategoryName = dataItem.PRODUCT_DT_CODE_NM;
                    gridReload("categoryGridC");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB" onclick="fn_checkAll(\'checkAllA\', \'mediumCategoryPk\');"/>',
                    template : "<input type='checkbox' name='mediumCategoryPk' class='mediumCategoryPk' value='#=PRODUCT_DT_CODE#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "PRODUCT_DT_CODE_NM",
                    title: "분류명"
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
                    url: "/projectMng/getProductCodeInfo",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.productGroupCodeId = "03";
                    data.parentCodeId = product.global.mediumCategoryId == "" ? 0 : product.global.mediumCategoryId;
                    data.parentCodeName = product.global.mediumCategoryName == "" ? 0 : product.global.mediumCategoryName;
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.productReqPop(\'req\', \'C\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.fn_modBtn(\'C\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="product.fn_delBtn(\'C\')">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAllC" name="checkAllC" onclick="fn_checkAll(\'checkAllC\', \'smallCategoryPk\');"/>',
                    template : "<input type='checkbox' name='smallCategoryPk' class='smallCategoryPk' value='#=PRODUCT_DT_CODE#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "PRODUCT_DT_CODE_NM",
                    title: "분류명"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    productReqPop: function(mode, type, pk){
        let url = "/projectMng/pop/productReqPop.do?mode="+mode+"&type="+type;
        if(mode == "upd"){
            url += "&pk="+pk;
        }
        if(type == "B"){
            if(product.global.largeCategoryId == null || product.global.largeCategoryId == ""){
                alert("대분류가 선택되지 않았습니다"); return;
            }
            url += "&parentCodeId="+product.global.largeCategoryId;
            url += "&parentCodeName="+product.global.largeCategoryName;
        }
        if(type == "C"){
            if(product.global.largeCategoryId == null || product.global.largeCategoryId == ""){
                alert("대분류가 선택되지 않았습니다"); return;
            }
            if(product.global.mediumCategoryId == null || product.global.mediumCategoryId == ""){
                alert("중분류가 선택되지 않았습니다"); return;
            }
            url += "&parentCodeId="+product.global.mediumCategoryId;
            url += "&parentCodeName="+product.global.mediumCategoryName;
        }
        const name = "productReqPop";
        const option = "width=800, height=150, top=200, left=400, location=no";
        window.open(url, name, option);
    }
}

function gridReload(str){
    $("#"+str).data("kendoGrid").dataSource.read();
}