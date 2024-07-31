var now = new Date();

var classManage = {

    global : {
        code : "",
        searchAjaxData : "",
        saveAjaData : "",
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
            scrollable: true,
            height: 508,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionManagePop();">' +
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
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.positionGridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllCp" name="checkAllCp"/>',
                    template : "<input type='checkbox' id='cPGridChk#=AST_CODE_COMPANY_ID#' name='cPGridChk' value='#=AST_CODE_COMPANY_ID#'/>",
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

        $("#checkAllCp").click(function(){
            if($(this).is(":checked")) $("input[name=cPGridChk]").prop("checked", true);
            else $("input[name=cPGridChk]").prop("checked", false);
        });
    },

    assetCodePositionModChk : function(){
        if($("input[name=cPGridChk]:checked").length == 0){
            alert("수정할 코드를 선택해주세요.");
            return;
        }else if($("input[name=cPGridChk]:checked").length > 1){
            alert("수정은 단건만 가능합니다.");
            return;
        }

        var url = "/inside/assetCodePositionManagePop.do?astCodeCompanyId=" + $("input[name=cPGridChk]:checked").val() + "&modify=Y";
        var name = "assetCodePositionManagePop";
        var option = "width = 550, height = 160, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    assetCodePositionManagePop : function() {
        var url = "/inside/assetCodePositionManagePop.do";
        var name = "assetCodePositionManagePop";
        var option = "width = 550, height = 160, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    divisionGridReload : function() {
        classManage.divisionGrid('/inside/getClassDivisionList', {});
    },

    divisionGrid : function(url, params) {
        $("#divisionGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url,params),
            scrollable: true,
            height: 508,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.divisionModChk()">' +
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
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.divisionGridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllCd" name="checkAllCd"/>',
                    template : "<input type='checkbox' id='cDGridChk#=AST_CODE_TYPE_ID#' name='cDGridChk' value='#=AST_CODE_TYPE_ID#'/>",
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

        $("#checkAllCd").click(function(){
            if($(this).is(":checked")) $("input[name=cDGridChk]").prop("checked", true);
            else $("input[name=cDGridChk]").prop("checked", false);
        });
    },

    divisionModChk : function(){
        if($("input[name=cDGridChk]:checked").length == 0){
            alert("수정할 코드를 선택해주세요.");
            return;
        }else if($("input[name=cDGridChk]:checked").length > 1){
            alert("수정은 단건만 가능합니다.");
            return;
        }

        var url = "/inside/divisionManagePop.do?astCodeTypeId=" + $("input[name=cDGridChk]:checked").val() + "&modify=Y";
        var name = "divisionManagePop";
        var option = "width = 550, height = 160, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    divisionManagePopup : function() {
        var url = "/inside/divisionManagePop.do";
        var name = "divisionManagePop";
        var option = "width = 550, height = 160, top = 100, left = 200, location = no, _blank"
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.placeManagePop();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.placeModChk()">' +
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
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.placeGridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllP" name="checkAllP"/>',
                    template : "<input type='checkbox' id='pGridChk#=AST_PLACE_SN#' name='pGridChk' value='#=AST_PLACE_SN#'/>",
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

        $("#checkAllP").click(function(){
            if($(this).is(":checked")) $("input[name=pGridChk]").prop("checked", true);
            else $("input[name=pGridChk]").prop("checked", false);
        });
    },

    placeModChk : function(){
        if($("input[name=pGridChk]:checked").length == 0){
            alert("수정할 코드를 선택해주세요.");
            return;
        }else if($("input[name=pGridChk]:checked").length > 1){
            alert("수정은 단건만 가능합니다.");
            return;
        }

        var url = "/inside/placeManagePop.do?astPlaceSn=" + $("input[name=pGridChk]:checked").val() + "&modify=Y";
        var name = "placeManagePop";
        var option = "width = 550, height = 160, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    placeManagePop : function() {
        var url = "/inside/placeManagePop.do";
        var name = "placeManagePop";
        var option = "width = 550, height = 160, top = 100, left = 200, location = no, _blank"
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.categoryDel(\'categoryA\')">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA"/>',
                    template : "<input type='checkbox' id='categoryGridAChk#=AST_CODE_ID#' name='categoryGridAChk' value='#=AST_CODE_ID#'/>",
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base categoryB" style="display: none" onclick="classManage.categoryDel(\'categoryB\')">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB"/>',
                    template : "<input type='checkbox' id='categoryGridBChk#=AST_CODE_ID#' name='categoryGridBChk' value='#=AST_CODE_ID#'/>",
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base categoryC" style="display: none" onclick="classManage.categoryDel(\'categoryC\')">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAllC" name="checkAllC"/>',
                    template : "<input type='checkbox' id='categoryGridCChk#=AST_CODE_ID#' name='categoryGridCChk' value='#=AST_CODE_ID#'/>",
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

        var heightSize = 160;
        var widthSize = 600;
        if(category == "categoryC"){
            heightSize = 240;
            widthSize = 715
        }

        var url = "/inside/categoriesManagePop.do?categoryType=" + category + "&astCodeId=" + $("input[name=" + gridChkboxId +"]:checked").val() + "&modify=Y";
        var name = "categoriesManagePop";
        var option = "width = " + widthSize + ", height = " + heightSize + ", top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    categoriesManagePopup : function(category, e) {
        var heightSize = 160;
        var widthSize = 600;
        if(category == "categoryC"){
            heightSize = 240;
            widthSize = 715
        }

        var url = "/inside/categoriesManagePop.do?categoryType=" + category + "&astUpperCode=" + $(e).attr("astUpperCode");
        var name = "categoriesManagePop";
        var option = "width = " + widthSize + ", height = " + heightSize + ", top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    categoryDel : function(category){
        var gridChkboxId = "";
        if(category == "categoryA"){
            gridChkboxId = "categoryGridAChk"
        }else if(category == "categoryB"){
            gridChkboxId = "categoryGridBChk"
        }else{
            gridChkboxId = "categoryGridCChk"
        }

        if($("input[name=" + gridChkboxId +"]:checked").length == 0){
            alert("삭제할 코드를 선택해주세요.");
            return;
        }

        if(confirm("선택한 코드를 삭제하시겠습니까?")) {
            var tmp = "";
            $.each($('input[name=' + gridChkboxId +']:checked'), function () {
                tmp += "," + $(this).val();
            });

            var result = customKendo.fn_customAjax('/asset/getAstCategoryDel.do', {astCodeId : tmp.substring(1)});
            if(result.flag){
                alert("삭제가 완료되었습니다.");

                if(category == "categoryA"){
                    classManage.categoryGridReload();
                }else if(category == "categoryB") {
                    classManage.categoryAddRow("categoryGridA", $("#astUpperCode").val());
                }else{
                    classManage.categoryAddRow("categoryGridB", $("#astUpperCode").val());
                }
            }
        }
    },

    fn_delBtn : function(e) {
        var gridChkboxId = "";
        var url = "";

        if(e == 1){
            gridChkboxId = "cPGridChk"
            url = "/asset/setAssetCodePositionDel.do";
        }else if(e == 2){
            gridChkboxId = "cDGridChk";
            url = "/asset/setClassDivisionDel.do";
        }else{
            gridChkboxId = "pGridChk"
            url = "/asset/setAssetPlaceDel.do"
        }

        if($("input[name=" + gridChkboxId +"]:checked").length == 0){
            alert("삭제할 코드를 선택해주세요.");
            return;
        }

        if(confirm("선택한 코드를 삭제하시겠습니까?")) {
            var tmp = "";
            $.each($('input[name=' + gridChkboxId +']:checked'), function () {
                tmp += "," + $(this).val();
            });

            if(e == 1){
                classManage.global.saveAjaData = {astCodeCompanyId : tmp.substring(1)}
            }else if(e == 2){
                classManage.global.saveAjaData = {astCodeTypeId : tmp.substring(1)}
            }else{
                classManage.global.saveAjaData = {astPlaceSn : tmp.substring(1)}
            }

            var result = customKendo.fn_customAjax(url, classManage.global.saveAjaData);
            if(result.flag){
                alert("삭제가 완료되었습니다.");

                if(e == 1){
                    classManage.positionGridReload();
                }else if(e == 2){
                    classManage.divisionGridReload();
                }else{
                    classManage.placeGridReload();
                }
            }
        }
    },
}
