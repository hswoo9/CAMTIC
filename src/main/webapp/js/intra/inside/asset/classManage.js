var now = new Date();

var classManage = {

    global : {
        code : "",
        searchAjaxData : "",
    },

    init : function(){
        // classManage.dataSet();
        classManage.positionGridReload();
        classManage.divisionGridReload();
        classManage.placeGridReload();
        classManage.categoryGridReload();
    },

    // dataSet : function() {
    //     $("#drop1").kendoDropDownList({
    //         dataTextField: "text",
    //         dataValueField: "value",
    //         dataSource: [
    //             { text: "전체", value: "" },
    //             { text: "카테고리(대)", value: "1" },
    //             { text: "카테고리(중)", value: "2" },
    //             { text: "카테고리(소)", value: "3" }
    //         ],
    //         index: 0
    //     });
    //
    //     $("#drop2").kendoDropDownList({
    //         dataTextField: "text",
    //         dataValueField: "value",
    //         dataSource: [
    //             { text: "전체", value: "" },
    //             { text: "소속코드(대)", value: "1" },
    //             { text: "소속코드(중)", value: "2" },
    //             { text: "소속코드(소)", value: "3" }
    //         ],
    //         index: 0
    //     });
    //
    //     $("#searchVal").kendoTextBox();
    // },

    positionGridReload : function() {
        classManage.positionGrid('/inside/getClassPositionList', {});
    },

    positionGrid : function(url, params) {
        $("#positionGrid").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.belongManagePopup();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    //template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox checkbox1'/>",
                    template : function (e){
                        return "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox checkbox1'/><input type='hidden' value='"+e.INSIDE_CODE_ID+"'/>";
                    },
                    width: 50
                }, {
                    title: "순번",
                    template: "#= ++record #",
                    width: 50
                }, {
                    field: "AST_CP_CODE_NM",
                    title: "소속"
                }, {
                    field: "AST_CP_CODE",
                    title: "소속코드",
                    width: 100
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    belongManagePopup : function() {
        var url = "/Inside/Pop/belongManagePop.do";
        var name = "belongManagePop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    divisionGridReload : function() {
        classManage.divisionGrid('/inside/getClassDivisionList', {});
    },

    divisionGrid : function(url, params) {
        $("#divisionGrid").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.divisionManagePopup();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(2)">' +
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
                    width: 50
                }, {
                    field: "AST_TYPE_CODE_NM",
                    title: "소속"
                }, {
                    field: "AST_TYPE_CODE",
                    title: "소속코드",
                    width: 100
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    divisionManagePopup : function() {
        var url = "/Inside/Pop/divisionManagePop.do";
        var name = "divisionManagePop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    placeGridReload : function() {
        classManage.placeGrid('/asset/getAssetPlaceList', {});
    },

    placeGrid : function(url, params) {
        $("#placeGrid").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.placeManagePopup();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(3)">' +
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
                    width: 50
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

    placeManagePopup : function() {
        var url = "/inside/Pop/placeManagePopup.do";
        var name = "locationManagePop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    categoryGridReload : function() {
        classManage.global.searchAjaxData = {
            astUpperCode : 0
        }

        classManage.categoryGrid('/asset/getAstCategoryList', classManage.global.searchAjaxData);
    },

    categoryGrid : function(url, params) {
        $("#categoryGridA").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" astUpperCode="0" onclick="classManage.categoriesManagePopup(\'categoryA\', this);">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.modChk(\'categoryA\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : classManage.aDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='categoryGridAChk#=AST_CODE_ID#' name='categoryGridAChk' value='#=AST_CODE_ID#' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "AST_CODE_NM",
                    title: "카테고리"
                }, {
                    field: "AST_CODE",
                    title: "코드",
                    width: 80
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        $("#checkAllA").click(function(){
            if($(this).is(":checked")) $("input[name=categoryGridAChk]").prop("checked", true);
            else $("input[name=categoryGridAChk]").prop("checked", false);
        });

        $("#categoryGridB").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base categoryB addCategoryB" onclick="classManage.categoriesManagePopup(\'categoryB\', this);" style="display: none">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base categoryB" style="display: none" onclick="classManage.modChk(\'categoryB\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base categoryB" style="display: none" onclick="">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : classManage.bDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='categoryGridBChk#=AST_CODE_ID#' name='categoryGridBChk' value='#=AST_CODE_ID#' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "RECORD",
                    title: "순번",
                    width: 50
                }, {
                    field: "AST_CODE_NM",
                    title: "카테고리(중)",
                }, {
                    field: "AST_CODE",
                    title: "코드",
                    width: 80
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        $("#checkAllB").click(function(){
            if($(this).is(":checked")) $("input[name=categoryGridBChk]").prop("checked", true);
            else $("input[name=categoryGridBChk]").prop("checked", false);
        });

        $("#categoryGridC").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base categoryC addCategoryC" style="display: none" onclick="classManage.categoriesManagePopup(\'categoryC\', this);">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base categoryC" style="display: none" onclick="classManage.modChk(\'categoryC\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base categoryC" style="display: none" onclick="">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAllC" name="checkAllC" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='categoryGridCChk#=AST_CODE_ID#' name='categoryGridCChk' value='#=AST_CODE_ID#' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field : "RECORD",
                    title: "순번",
                    width : 50
                }, {
                    field: "AST_CODE_NM",
                    title: "카테고리(소)",
                    width : 150
                }, {
                    field: "AST_CODE",
                    title: "코드",
                    width : 80
                }, {
                    field: "AST_DEPRE_TYPE",
                    title: "상각법",
                    width : 80,
                    template : function(e){
                        if(e.AST_DEPRE_TYPE == "1"){
                            return "정액법"
                        }else if(e.AST_DEPRE_TYPE == "2"){
                            return "정률법"
                        }else if(e.AST_DEPRE_TYPE == "3"){
                            return "연부금"
                        }else {
                            return "-";
                        }
                    }
                }, {
                    title: "상각률",
                    width : 80,
                    template : function(e){
                        if(e.AST_DEPRE_PERCENT != null){
                            return e.AST_DEPRE_PERCENT + "%";
                        }else{
                            return "-";
                        }
                    }
                }, {
                    title: "내용년한",
                    width : 80,
                    template : function(e){
                        if(e.AST_USE_YEAR != null){
                            return e.AST_USE_YEAR + "년";
                        }else{
                            return "-";
                        }
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        $("#checkAllC").click(function(){
            if($(this).is(":checked")) $("input[name=categoryGridCChk]").prop("checked", true);
            else $("input[name=categoryGridCChk]").prop("checked", false);
        });
    },

    aDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this).closest("tr"));
            $(".categoryB.addCategoryB").attr("astUpperCode", dataItem.AST_CODE_ID);
            classManage.categoryAddRow("categoryGridA", dataItem.AST_CODE_ID)
        });
    },

    bDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this).closest("tr"));
            $(".categoryC.addCategoryC").attr("astUpperCode", dataItem.AST_CODE_ID);
            classManage.categoryAddRow("categoryGridB", dataItem.AST_CODE_ID)
        });
    },

    categoryAddRow : function(grid, astUpperCode){
        var gridId = "";
        var btnClass = "";

        if(grid == "categoryGridA"){
            gridId = "categoryGridB";
            btnClass = "categoryB";
        }else if(grid == "categoryGridB"){
            gridId = "categoryGridC";
            btnClass = "categoryC";
        }

        var result = customKendo.fn_customAjax("/asset/getAstCategoryList", {astUpperCode : astUpperCode});
        if(result.flag){
            $("#categoryGridC").data("kendoGrid").dataSource.data([]);
            $(".categoryB, .categoryC").hide();

            if(grid == "categoryGridA"){
                $("#categoryGridB").data("kendoGrid").dataSource.data([]);
                $("." + btnClass).show();
            }else{
                $(".categoryB, .categoryC").show();
            }

            for(var i = 0; i < result.rs.length; i++){
                $("#" + gridId).data("kendoGrid").dataSource.add({
                    RECORD : (i+1),
                    ACTIVE : result.rs[i].ACTIVE,
                    AST_CODE : result.rs[i].AST_CODE,
                    AST_CODE_ID : result.rs[i].AST_CODE_ID,
                    AST_CODE_NM : result.rs[i].AST_CODE_NM,
                    AST_UPPER_CODE : result.rs[i].AST_UPPER_CODE,
                    REG_DATE : result.rs[i].REG_DATE,
                    REG_EMP_SEQ : result.rs[i].REG_EMP_SEQ,
                });
            }
        }
    },

    modChk : function(category){
        var gridChkboxId = "";
        if(category == "categoryA"){
            gridChkboxId = "categoryGridAChk"
        }else if(category == "categoryB"){
            gridChkboxId = "categoryGridBChk"
        }else{
            gridChkboxId = "categoryGridCChk"
        }

        if($("input[name=" + gridChkboxId +"]:checked").length == 0){
            alert("수정할 코드를 선택해주세요.");
            return;
        }else if($("input[name=" + gridChkboxId +"]:checked").length > 1){
            alert("수정은 단건만 가능합니다.");
            return;
        }

        var url = "/inside/Pop/categoriesManagePop.do?categoryType=" + category + "&astCodeId=" + $("input[name=" + gridChkboxId +"]:checked").val() + "&modity=Y";
        var name = "categoriesManagePop";
        var option = "width = 500, height = 400, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    categoriesManagePopup : function(category, e) {
        var url = "/inside/Pop/categoriesManagePop.do?categoryType=" + category + "&astUpperCode=" + $(e).attr("astUpperCode");
        var name = "categoriesManagePop";
        var option = "width = 500, height = 400, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
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
    },

    fn_schBtn : function () {
        var data = {
            SEARCH_DATA : $('#searchVal').val(),
            AST_MC_CODE : "",
            AST_MD_CODE : "",
            AST_DT_CODE : "",
        }
        classManage.mainGrid4('/asset/getAstCodeList',data);
    }
}
