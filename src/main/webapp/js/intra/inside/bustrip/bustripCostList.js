var costList = {

    init : function(){
        costList.dataSet();
        costList.mainGrid();
    },

    dataSet() {
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/bustrip/getBustripCostList',
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="costList.bustripCostReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="costList.delBustripCost();">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'costPk\');"/>',
                    template : "<input type='checkbox' id='costPk#=HR_COST_INFO_SN#' name='costPk' class='costPk' value='#=HR_COST_INFO_SN#'/>",
                    width: 50
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "적용기간",
                    template: function(row){
                        return row.START_DT+" ~ "+row.END_DT;
                    }
                }, {
                    field: "TRIP_TEXT",
                    title: "출장구분",
                    template: function(row){
                        return bustrip.fn_getTripCodeText(row);
                    }
                }, {
                    field: "EXNP_TEXT",
                    title: "여비 종류",
                    template: function(row){
                        var text = "";
                        if(row.EXNP_CODE == "dayCost" && row.TRIP_CODE == "3"){
                            text =  row.EXNP_TEXT + " - " + row.EXNP_DETAIL_TEXT;
                        }else{
                            text =  row.EXNP_TEXT;
                        }

                        return '<a onclick="costList.bustripCostReqPop(' +  row.HR_COST_INFO_SN + ')" style="font-weight: bold; cursor:pointer;">' + text + '</a>';
                    }
                }, {
                    title: "여비지급 금액",
                    template: function(row){
                        return fn_numberWithCommas(row.COST_AMT);
                    }
                }, {
                    field: "REMARK_CN",
                    title: "비고"
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");
    },

    bustripCostReqPop : function(key) {
        let url = "/bustrip/pop/bustripCostReqPop.do";
        const name = "bustripCostReqPop";
        const option = "width=865, height=475, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"

        if(key) {
            url += "?key=" + key;
        }

        window.open(url, name, option);
    },

    delBustripCost: function(){
        let arr = [];
        $("input[name=costPk]:checked").each(function(i){
            arr.push($(this).val());
        })
        let data = {
            arr: arr.join(),
            stat: 'N'
        }
        if($("input[name=costPk]:checked").length == 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }
        let result = customKendo.fn_customAjax("/bustrip/delBustripCost", data);
        if(result.flag){
            alert("삭제완료되었습니다.");
            gridReload();
        }
    }
}

function gridReload(){
    costList.mainGrid();
}