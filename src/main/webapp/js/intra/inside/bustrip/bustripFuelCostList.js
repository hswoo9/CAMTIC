var fuelCostList = {

    init : function(){
        fuelCostList.dataSet();
        fuelCostList.mainGrid();
    },

    dataSet() {
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/bustrip/getBustripFuelCostList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
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
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fuelCostList.bustripExchangeMngPop();">' +
                            '	<span class="k-button-text">환율</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="fuelCostList.bustripFuelCostReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="fuelCostList.fn_delFuelCost();">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='fcSn#=HR_FUEL_COST_INFO_SN#' name='fcSn' value='#=HR_FUEL_COST_INFO_SN#' style=\"top: 3px; position: relative\" />",
                    width: 60,
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 60
                }, {
                    title: "기준일",
                    template: function(row){
                        return row.START_DT+" ~ "+(row.END_DT == undefined ? "" : row.END_DT);
                    }
                }, {
                    title: "적용금액",
                    template: function(row){
                        var text = fn_numberWithCommas(row.COST_AMT)+" 원";
                        return '<a onclick="fuelCostList.bustripFuelCostReqPop(' +  row.HR_FUEL_COST_INFO_SN + ')" style="font-weight: bold; cursor:pointer;">' + text + '</a>';
                    }
                }, {
                    title: "기준거리",
                    template: function(row){
                        return fn_numberWithCommas(row.DISTANCE) +" KM";
                    }
                }, {
                    title: "적용 프로젝트",
                    template: function(row){
                        return row.PROJECT_NM;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=fcSn]").prop("checked", true);
            else $("input[name=fcSn]").prop("checked", false);
        });
    },

    bustripFuelCostReqPop: function(key){
        let url = "/bustrip/pop/bustripFuelCostReqPop.do";
        const name = "bustripCostReqPop";
        const option = "width=555, height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        if(key){
            url += "?key=" + key;
        }
        window.open(url, name, option);
    },

    bustripExchangeMngPop: function(){
        const url = "/bustrip/pop/bustripExchangeMngPop.do";
        const name = "bustripExchangeMngPop";
        const option = "width=555, height=160, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);

    },

    fn_delFuelCost : function(){
        if($("input[name='fcSn']:checked").length == 0){
            alert("삭제할 데이터를 선택해주세요.");
            return
        }

        if(!confirm("삭제하시겠습니까?\n삭제 후 복구가 불가능합니다.")){
            return;
        }

        var fcSn = "";

        $.each($("input[name='fcSn']:checked"), function(){
            fcSn += "," + $(this).val()
        })

        var data = {
            fcSnArr : fcSn.substring(1)
        }

        var result = customKendo.fn_customAjax("/bustrip/setFuelCostDelete", data);
        if(result.flag){
            alert("삭제되었습니다.");
            fuelCostList.mainGrid();
        }
    }
}
