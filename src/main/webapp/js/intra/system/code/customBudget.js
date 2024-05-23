var customBudget = {
    global : {
        code : "",
        searchAjaxData : "",
        saveAjaData : "",
        cBudgetA : "",
        cBudgetB : "",
    },

    fnDefaultScript : function(){
        customBudget.gridReload();
    },

    gridReload : function() {
        customBudget.global.searchAjaxData = {
            cbUpperCode : 0
        }

        customBudget.mainGrid('/system/code/getCustomBudgetList', customBudget.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        $("#customBudgetGridA").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" cbUpperCode="0" onclick="customBudget.cbManagePopup(\'cBudgetA\', this);">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="customBudget.modChk(\'cBudgetA\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="customBudget.customBudgetDel(\'cBudgetA\')">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : customBudget.aDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA"/>',
                    template : "<input type='checkbox' id='customBudgetGridAChk#=CB_CODE_ID#' name='customBudgetGridAChk' value='#=CB_CODE_ID#'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "CB_CODE_NM",
                    title: "장"
                }, {
                    field: "CB_CODE",
                    title: "코드",
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        $("#checkAllA").click(function(){
            if($(this).is(":checked")) $("input[name=customBudgetGridAChk]").prop("checked", true);
            else $("input[name=customBudgetGridAChk]").prop("checked", false);
        });

        $("#customBudgetGridB").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base cBudgetB addBudgetB" onclick="customBudget.cbManagePopup(\'cBudgetB\', this);" style="display: none">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base cBudgetB" style="display: none" onclick="customBudget.modChk(\'cBudgetB\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base cBudgetB" style="display: none" onclick="customBudget.customBudgetDel(\'cBudgetB\')">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : customBudget.bDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB"/>',
                    template : "<input type='checkbox' id='customBudgetGridBChk#=CB_CODE_ID#' name='customBudgetGridBChk' value='#=CB_CODE_ID#'/>",
                    width: 50
                }, {
                    field: "RECORD",
                    title: "순번",
                }, {
                    field: "CB_CODE_NM",
                    title: "관"
                }, {
                    field: "CB_CODE",
                    title: "코드",
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        $("#checkAllB").click(function(){
            if($(this).is(":checked")) $("input[name=customBudgetGridBChk]").prop("checked", true);
            else $("input[name=customBudgetGridBChk]").prop("checked", false);
        });

        $("#customBudgetGridC").kendoGrid({
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
                /*{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base cBudgetC addBudgetC" style="display: none" onclick="customBudget.customBudgetSetting();">' +
                            '	<span class="k-button-text">반영</span>' +
                            '</button>';
                    }
                },*/ {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base cBudgetC addBudgetC" style="display: none" onclick="customBudget.cbManagePopup(\'cBudgetC\', this);">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base cBudgetC" style="display: none" onclick="customBudget.modChk(\'cBudgetC\')">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base cBudgetC" style="display: none" onclick="customBudget.customBudgetDel(\'cBudgetC\')">' +
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
                    template : "<input type='checkbox' id='customBudgetGridCChk#=CB_CODE_ID#' name='customBudgetGridCChk' value='#=CB_CODE_ID#'/>",
                    width: 50
                }, {
                    field : "RECORD",
                    title: "순번",
                    width : 50
                }, {
                    field: "CB_CODE_NM",
                    title: "항"
                }, {
                    field: "CB_CODE",
                    title: "코드",
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        $("#checkAllC").click(function(){
            if($(this).is(":checked")) $("input[name=customBudgetGridCChk]").prop("checked", true);
            else $("input[name=customBudgetGridCChk]").prop("checked", false);
        });
    },

    aDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this).closest("tr"));
            $(".cBudgetB.addBudgetB").attr("cbUpperCode", dataItem.CB_CODE_ID);
            customBudget.cbAddRow("customBudgetGridA", dataItem.CB_CODE_ID)
            customBudget.global.cBudgetA = $(this);
            customBudget.global.cBudgetB = "";
        });
    },

    bDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this).closest("tr"));
            $(".cBudgetC.addBudgetC").attr("cbUpperCode", dataItem.CB_CODE_ID);
            customBudget.cbAddRow("customBudgetGridB", dataItem.CB_CODE_ID)
            customBudget.global.cBudgetB = $(this);
        });
    },

    cbAddRow : function(grid, cbUpperCode){
        var gridId = "";
        var btnClass = "";

        if(grid == "customBudgetGridA"){
            gridId = "customBudgetGridB";
            btnClass = "cBudgetB";
        }else if(grid == "customBudgetGridB"){
            gridId = "customBudgetGridC";
            btnClass = "cBudgetC";
        }

        var result = customKendo.fn_customAjax("/system/code/getCustomBudgetList", {cbUpperCode : cbUpperCode});
        if(result.flag){
            $("#customBudgetGridC").data("kendoGrid").dataSource.data([]);
            $(".cBudgetB, .cBudgetC").hide();

            if(grid == "customBudgetGridA"){
                $("#customBudgetGridB").data("kendoGrid").dataSource.data([]);
                $("." + btnClass).show();
            }else{
                $(".cBudgetB, .cBudgetC").show();
            }

            for(var i = 0; i < result.rs.length; i++){
                $("#" + gridId).data("kendoGrid").dataSource.add({
                    RECORD : (i+1),
                    ACTIVE : result.rs[i].ACTIVE,
                    CB_CODE : result.rs[i].CB_CODE,
                    CB_CODE_ID : result.rs[i].CB_CODE_ID,
                    CB_CODE_NM : result.rs[i].CB_CODE_NM,
                    CB_UPPER_CODE : result.rs[i].CB_UPPER_CODE,
                    REG_DATE : result.rs[i].REG_DATE,
                    REG_EMP_SEQ : result.rs[i].REG_EMP_SEQ,
                });
            }
        }
    },

    modChk : function(budget){
        var gridChkboxId = "";
        if(budget == "cBudgetA"){
            gridChkboxId = "customBudgetGridAChk"
        }else if(budget == "cBudgetB"){
            gridChkboxId = "customBudgetGridBChk"
        }else{
            gridChkboxId = "customBudgetGridCChk"
        }

        if($("input[name=" + gridChkboxId +"]:checked").length == 0){
            alert("수정할 코드를 선택해주세요.");
            return;
        }else if($("input[name=" + gridChkboxId +"]:checked").length > 1){
            alert("수정은 단건만 가능합니다.");
            return;
        }

        var heightSize = 160;
        var widthSize = 645;

        var url = "/system/code/customBudgetManagePop.do?budgetType=" + budget + "&cbCodeId=" + $("input[name=" + gridChkboxId +"]:checked").val() + "&modify=Y";
        var name = "customBudgetManagePop";
        var option = "width = " + widthSize + ", height = " + heightSize + ", top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    cbManagePopup : function(budget, e) {
        var heightSize = 160;
        var widthSize = 645;

        var url = "/system/code/customBudgetManagePop.do?budgetType=" + budget + "&cbUpperCode=" + $(e).attr("cbUpperCode");
        var name = "customBudgetManagePop";
        var option = "width = " + widthSize + ", height = " + heightSize + ", top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    customBudgetDel : function(budget){
        var gridChkboxId = "";
        if(budget == "cBudgetA"){
            gridChkboxId = "customBudgetGridAChk"
        }else if(budget == "cBudgetB"){
            gridChkboxId = "customBudgetGridBChk"
        }else{
            gridChkboxId = "customBudgetGridCChk"
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

            var result = customKendo.fn_customAjax('/system/code/setCustomBudgetDel.do', {cbCodeId : tmp.substring(1)});
            if(result.flag){
                alert("삭제가 완료되었습니다.");

                if(budget == "cBudgetA"){
                    customBudget.gridReload();
                }else if(budget == "cBudgetB") {
                    customBudget.cbAddRow("customBudgetGridA", $("#cbUpperCode").val());
                }else{
                    customBudget.cbAddRow("customBudgetGridB", $("#cbUpperCode").val());
                }
            }
        }
    },

    // customBudgetSetting : function(){
    //     let arr = [];
    //     var dataItemA = $("#customBudgetGridA").data("kendoGrid").dataItem(customBudget.global.cBudgetA);
    //     var dataItemB = $("#customBudgetGridB").data("kendoGrid").dataItem(customBudget.global.cBudgetB);
    //
    //     $.each($("input[name='customBudgetGridCChk']:checked"), function (i, v) {
    //         var dataItemC = $("#customBudgetGridC").data("kendoGrid").dataItem($(this).closest("tr"));
    //         let data = {
    //             NUM : i,
    //             CB_CODE_ID_1 : dataItemA.CB_CODE,
    //             CB_CODE_NAME_1 : dataItemA.CB_CODE_NM,
    //             CB_CODE_ID_2 : dataItemB.CB_CODE,
    //             CB_CODE_NAME_2 : dataItemB.CB_CODE_NM,
    //             CB_CODE_ID_3 : dataItemC.CB_CODE,
    //             CB_CODE_NAME_3 : dataItemC.CB_CODE_NM,
    //             CB_BUDGET : 0,
    //         }
    //
    //         arr.push(data);
    //     });
    //
    //     if($("#path").val() == "rndDetail"){
    //         opener.parent.rndDetail.cbGridAddRow(arr);
    //     }else{
    //         opener.parent.unRndDetail.cbGridAddRow(arr);
    //     }
    //
    //     window.close();
    // }
}