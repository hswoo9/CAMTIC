var sum = 0;
var customBudgetPop = {
    global : {
        code : "",
        searchAjaxData : "",
        saveAjaData : "",
        cBudgetA : "",
        cBudgetB : "",
    },

    fnDefaultScript : function(){
        customBudgetPop.gridReload();
        customBudgetPop.tempBudgetGrid("/project/getProjectBudgetList.do", {pjtSn : $("#pjtSn").val()});
    },

    gridReload : function() {
        customBudgetPop.global.searchAjaxData = {
            cbUpperCode : 0
        }

        customBudgetPop.mainGrid('/system/code/getCustomBudgetList', customBudgetPop.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        $("#customBudgetGridA").kendoGrid({
            dataSource: customKendo.fn_gridDataSource3(url,params, 5),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 268,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            dataBound : customBudgetPop.aDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
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
            height: 268,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : customBudgetPop.bDataBound,
            columns: [
                {
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
            height: 268,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="addBudgetC" style="display: none" onclick="customBudgetPop.tempGridSetting();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                },
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
            customBudgetPop.cbAddRow("customBudgetGridA", dataItem.CB_CODE_ID)
            customBudgetPop.global.cBudgetA = $(this);
            customBudgetPop.global.cBudgetB = "";
        });
    },

    bDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this).closest("tr"));
            $(".cBudgetC.addBudgetC").attr("cbUpperCode", dataItem.CB_CODE_ID);
            customBudgetPop.cbAddRow("customBudgetGridB", dataItem.CB_CODE_ID)
            customBudgetPop.global.cBudgetB = $(this);
        });
    },

    cbAddRow : function(grid, cbUpperCode){
        var gridId = "";

        if(grid == "customBudgetGridA"){
            gridId = "customBudgetGridB";
        }else if(grid == "customBudgetGridB"){
            gridId = "customBudgetGridC";
        }

        var result = customKendo.fn_customAjax("/system/code/getCustomBudgetList", {cbUpperCode : cbUpperCode});
        if(result.flag){
            $("#customBudgetGridC").data("kendoGrid").dataSource.data([]);
            $("#addBudgetC").hide();

            if(grid == "customBudgetGridA"){
                $("#customBudgetGridB").data("kendoGrid").dataSource.data([]);
            }else{
                $("#addBudgetC").show();
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

    tempGridSetting : function(){
        var dataItemA = $("#customBudgetGridA").data("kendoGrid").dataItem(customBudgetPop.global.cBudgetA);
        var dataItemB = $("#customBudgetGridB").data("kendoGrid").dataItem(customBudgetPop.global.cBudgetB);

        $.each($("input[name='customBudgetGridCChk']:checked"), function (i, v) {
            var dataItemC = $("#customBudgetGridC").data("kendoGrid").dataItem($(this).closest("tr"));
            $("#tempBudgetGrid").data("kendoGrid").dataSource.add({
                CB_SN : 0,
                NUM : i,
                CB_CODE_ID_1 : dataItemA.CB_CODE,
                CB_CODE_NAME_1 : dataItemA.CB_CODE_NM,
                CB_CODE_ID_2 : dataItemB.CB_CODE,
                CB_CODE_NAME_2 : dataItemB.CB_CODE_NM,
                CB_CODE_ID_3 : dataItemC.CB_CODE,
                CB_CODE_NAME_3 : dataItemC.CB_CODE_NM,
                CB_BUDGET : 0,
            })
        });
    },

    tempBudgetGrid : function(url, params){
        params.account = String($("#ac").val())
        $("#tempBudgetGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 346,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="customBudgetPop.customBudgetSetting();">' +
                            '	<span class="k-button-text">반영</span>' +
                            '</button>';
                    }
                }, /*{
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="customBudgetPop.setCustomBudgetDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }*/
            ],
            editable : function (){
                return true;
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'pCbPk\');"/>',
                    template : "<input type='checkbox' id='pCbPk#=CB_SN#' name='pCbPk' class='pCbPk' value='#=CB_SN#'/>",
                    width: 50
                }, {
                    title: "장",
                    field : "CB_CODE_NAME_1",
                    editable: function(){
                        return false;
                    },
                }, {
                    title: "관",
                    field : "CB_CODE_NAME_2",
                    editable: function(){
                        return false;
                    },
                }, {
                    title: "항",
                    field : "CB_CODE_NAME_3",
                    footerTemplate: "합계",
                    template : function(e){
                        return e.CB_CODE_NAME_3
                    },
                    editable: function(){
                        return false;
                    },
                }, {
                    title: "예산액",
                    field : "CB_BUDGET",
                    template : function(e){
                        sum += Number(e.CB_BUDGET);
                        return fn_numberWithCommas(e.CB_BUDGET);
                    },
                    footerTemplate : function (e) {
                        return "<span id='total'></span>";
                    },
                    attributes: { style: "text-align: right" },
                },

            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
            dataBound: function(){
                $("#total").text(fn_numberWithCommas(sum));
                sum = 0;
            }
        }).data("kendoGrid");

        $('#tempBudgetGrid').on('blur', '[id="CB_BUDGET"]', function(e){
            var total = 0;
            $.each($("#tempBudgetGrid").data("kendoGrid").dataSource.data(), function(){
                total += Number(this.CB_BUDGET);
            })
            $("#total").text(fn_numberWithCommas(total))
        })
    },

    customBudgetSetting : function(){
        var arr = new Array();

        $.each($("#tempBudgetGrid").data("kendoGrid").dataSource.data(), function(){
            console.log(this);
            let data = {
                NUM : this.NUM,
                CB_SN : this.CB_SN,
                CB_CODE_ID_1 : this.CB_CODE_ID_1,
                CB_CODE_NAME_1 : this.CB_CODE_NAME_1,
                CB_CODE_ID_2 : this.CB_CODE_ID_2,
                CB_CODE_NAME_2 : this.CB_CODE_NAME_2,
                CB_CODE_ID_3 : this.CB_CODE_ID_3,
                CB_CODE_NAME_3 : this.CB_CODE_NAME_3,
                CB_BUDGET : this.CB_BUDGET,
            }
            arr.push(data);
        })

        if($("#path").val() == "rndDetail"){
            opener.parent.rndDetail.cbGridAddRow(arr, $("#ac").val());
        }else{
            opener.parent.unRndDetail.cbGridAddRow(arr, $("#ac").val());
        }

        window.close();
    },

    setCustomBudgetDel : function(){
        if($("input[name='pCbPk']:checked").length == 0){ alert("삭제할 예산을 선택해주세요."); return; }
        if(confirm("선택한 코드를 삭제하시겠습니까?")) {
            var grid = $("#tempBudgetGrid").data("kendoGrid");
            $.each($("input[name='pCbPk']:checked"), function(){
                grid.dataSource.remove(grid.dataItem($(this).closest("tr")));
            });
        }
    }
}