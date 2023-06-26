var now = new Date();

var classManage = {

    init : function(){
        classManage.dataSet();
        classManage.mainGrid();
        classManage.gridReload();
        classManage.gridReload2();
        classManage.gridReload3();
        classManage.gridReload4();
    },

    dataSet() {
        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "카테고리(대)", value: "1" },
                { text: "카테고리(중)", value: "2" },
                { text: "카테고리(소)", value: "3" }
            ],
            index: 0
        });

        $("#drop2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "소속코드(대)", value: "1" },
                { text: "소속코드(중)", value: "2" },
                { text: "소속코드(소)", value: "3" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
    },
    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url,params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="classManage.belongManagePopup();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(1)">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    //template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox checkbox1'/>",
                    template : function (e){
                        return "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox checkbox1'/><input type='hidden' value='"+e.INSIDE_CODE_ID+"'/>";
                    },
                    width: 50
                }, {
                    title: "순번",
                    template: "#= ++record #",
                }, {
                    field: "INSIDE_DT_CODE_NM",
                    title: "소속"
                }, {
                    field: "INSIDE_DT_CODE",
                    title: "소속코드"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    mainGrid2 : function(url, params) {
        $("#mainGrid2").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url,params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="classManage.divisionManagePopup();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(2)">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : function (e){
                        return "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox checkbox2'/><input type='hidden' value='"+e.INSIDE_CODE_ID+"'/>";
                    },
                    width: 50
                }, {
                    title: "순번",
                    template: "#= ++record #",
                }, {
                    field: "INSIDE_DT_CODE_NM",
                    title: "소속"
                }, {
                    field: "INSIDE_DT_CODE",
                    title: "소속코드"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    mainGrid3 : function(url, params) {
        $("#mainGrid3").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url,params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="classManage.locationManagePopup();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(3)">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : function (e){
                        return "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox checkbox3'/><input type='hidden' value='"+e.AST_PLACE_SN+"'/>";
                    },
                    width: 50
                }, {
                    title: "순번",
                    template: "#= ++record #",
                }, {
                    field: "AST_PLACE_NAME",
                    title: "위치"
                }, {
                    field: "AST_MANAGE_DEPT",
                    title: "관리그룹"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    mainGrid4 : function(url, params) {
        $("#mainGrid4").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url,params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="classManage.categoriesManagePopup();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "순번"
                }, {
                    field: "",
                    title: "카테고리(대)"
                }, {
                    field: "",
                    title: "소속코드(대)"
                }, {
                    field: "",
                    title: "카테고리(중)"
                }, {
                    field: "",
                    title: "소속코드(중)"
                }, {
                    field: "",
                    title: "카테고리(소)"
                }, {
                    field: "",
                    title: "소속코드(소)"
                }, {
                    field: "",
                    title: "상각법"
                }, {
                    field: "",
                    title: "상각률"
                }, {
                    field: "",
                    title: "내용년한"
                }
            ]
        }).data("kendoGrid");
    },

    belongManagePopup : function() {
        var url = "/Inside/Pop/belongManagePop.do";
        var name = "belongManagePop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    divisionManagePopup : function() {
        var url = "/Inside/Pop/divisionManagePop.do";
        var name = "divisionManagePop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    locationManagePopup : function() {
        var url = "/Inside/Pop/locationManagePop.do";
        var name = "locationManagePop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    categoriesManagePopup : function() {
        var url = "/Inside/Pop/categoriesManagePop.do";
        var name = "categoriesManagePop";
        var option = "width = 500, height = 400, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    gridReload : function() {
        var data = {
            INSIDE_MD_CODE : '01',
        }
        classManage.mainGrid('/inside/getClassManageList',data);
    },
    gridReload2 : function() {
        var data = {
            INSIDE_MD_CODE : '02',
        }
        classManage.mainGrid2('/inside/getClassManageList',data);
    },
    gridReload3 : function() {
        var data = {
            TEST : 'TEST',
        }
        classManage.mainGrid3('/asset/getAssetPlaceList',data);
    },
    gridReload4 : function() {
        var data = {
            INSIDE_MD_CODE : '',
        }
        classManage.mainGrid4('/inside/getClassManageList',data);
    },
    fn_delBtn : function(e) {
        var checkbox = 'checkbox'+e;
        var tmp = [];
        if(e == 3) {
            console.log('위치관리 삭제');
            if(confirm("삭제하시겠습니까?")) {
                $.each($('.'+checkbox+':checked'), function (index, item) {
                    tmp.push($(item).next().val());
                });
                var data = {
                    AST_PLACE_SN: JSON.stringify(tmp)
                }
                var result = customKendo.fn_customAjax('/asset/delAssetPlace', data);
                if(result.rs == 'SUCCESS') {
                    alert('삭제 완료');
                    classManage.gridReload3();
                }else if (result.rs == 'NOTCKECK'){
                    alert('삭제할 데이터를 선택하지 않았습니다.');
                }else{
                    alert('삭제 실패');
                }
            }
        }else {
            if(confirm("삭제하시겠습니까?")) {
                $.each($('.'+checkbox+':checked'), function (index, item) {
                    tmp.push($(item).next().val());
                });
                var data = {
                    INSIDE_CODE_ID: JSON.stringify(tmp)
                }
                var result = customKendo.fn_customAjax('/asset/delAssetCode', data);
                if(result.rs == 'SUCCESS') {
                    alert('삭제 완료');
                    classManage.gridReload();
                    classManage.gridReload2();
                }else if (result.rs == 'NOTCKECK'){
                    alert('삭제할 데이터를 선택하지 않았습니다.');
                }else{
                    alert('삭제 실패');
                }
            }
        }
    }
}
