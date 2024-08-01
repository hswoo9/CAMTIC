var commBgCode = {
    global: {
        largeCategoryId: "",
        largeCategoryName: "",
        mediumCategoryId: "",
        mediumCategoryName: ""
    },

    fn_defaultScript : function (){
        commBgCode.mainGrid();
    },

    fn_dataSet: function(){

    },

    mainGrid: function(){

        var jangGrid = $("#jangGrid").data("kendoGrid");
        var gwanGrid = $("#gwanGrid").data("kendoGrid");
        var hangGrid = $("#hangGrid").data("kendoGrid");

        if(jangGrid != null){
            jangGrid.destroy();
        }
        if(gwanGrid != null){
            gwanGrid.destroy();
        }
        if(hangGrid != null){
            hangGrid.destroy();
        }

        let dataSourceA = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/common/getJangCodeList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.budgetVal = $("#budgetVal").val();
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

        $("#jangGrid").kendoGrid({
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
                {
                    name: 'search'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_addPop(\'jang\', \'A\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_modBtn(\'jang\', \'A\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_delBtn(\'A\')">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" onclick="fn_checkAll(\'checkAllA\', \'jangPk\');"/>',
                    template : "<input type='checkbox' name='jangPk' class='jangPk' value='#=JANG_SN#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "JANG_CD",
                    title: "코드",
                    width: 70
                }, {
                    field: "JANG_NM",
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
                    url: "/common/getGwanCodeList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.budgetVal = $("#budgetVal").val();

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

        $("#gwanGrid").kendoGrid({
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
                    name: 'search'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_addPop(\'gwan\', \'B\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_modBtn(\'gwan\', \'B\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_delBtn(\'B\')">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB" onclick="fn_checkAll(\'checkAllA\', \'gwanPk\');"/>',
                    template : "<input type='checkbox' name='gwanPk' class='gwanPk' value='#=GWAN_SN#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "GWAN_CD",
                    title: "코드",
                    width: 70
                }, {
                    field: "GWAN_NM",
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
                    url: "/common/getHangCodeList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.budgetVal = $("#budgetVal").val();
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

        $("#hangGrid").kendoGrid({
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
                    name: 'search'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_addPop(\'hang\', \'C\');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_modBtn(\'hang\', \'C\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commBgCode.fn_delBtn(\'C\')">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAllC" name="checkAllC" onclick="fn_checkAll(\'checkAllC\', \'hangPk\');"/>',
                    template : "<input type='checkbox' name='hangPk' class='hangPk' value='#=HANG_SN#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "HANG_CD",
                    title: "코드",
                    width: 70
                }, {
                    field: "HANG_NM",
                    title: "분류명"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    fn_modBtn: function(mode, type){
        let checkbox;

        if(type == "A"){
            checkbox = $("input[name=jangPk]:checked");
        }else if(type == "B"){
            checkbox = $("input[name=gwanPk]:checked");
        }else if(type == "C"){
            checkbox = $("input[name=hangPk]:checked");
        }

        if(checkbox.length == 0){ alert("수정할 코드를 선택해주세요."); return; }
        if(checkbox.length > 1){ alert("수정은 단건만 가능합니다."); return; }

        commBgCode.fn_addPop(mode, type, checkbox.val())
    },

    fn_delBtn: function(type){
        let checkbox;
        let url;
        let gridId;
        let data = {};

        if(type == "A"){
            checkbox = $("input[name=jangPk]:checked");
            gridId = "jangGrid";
        }else if(type == "B"){
            checkbox = $("input[name=gwanPk]:checked");
            gridId = "gwanGrid";
        }else if(type == "C"){
            checkbox = $("input[name=hangPk]:checked");
            gridId = "hangGrid";
        }
        url = "/common/delBudgetCode";

        if(checkbox.length == 0){ alert("삭제할 코드를 선택해주세요."); return; }
        let checked = "";
        if(confirm("선택한 코드를 삭제하시겠습니까?")) {
            $.each(checkbox, function(){
                checked += $(this).val() + ",";
            });
        }
        data.pk = checked.substring(0, checked.length - 1);
        data.type = type;
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("삭제가 완료되었습니다.");
            commBgCode.mainGrid();
        }
    },

    fn_addPop : function (mode, type, pk){
        let url = "/common/pop/" + mode + "ReqPop.do?type="+type+"&bgVal="+$("#budgetVal").val();

        if(pk != undefined && pk != null && pk != "") {
            url += "&pk=" + pk;
        }

        const name = "budgetCodeReqPop";
        var option = "width=800, height=150, top=200, left=400, location=no";

        if(mode == "hang"){
            option = "width=800, height=350, top=200, left=400, location=no";
        }
        window.open(url, name, option);
    },
}