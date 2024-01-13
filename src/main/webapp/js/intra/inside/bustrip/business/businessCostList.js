var costList = {

    global : {
        searchAjaxData : "",
    },

    fn_defaultScript : function(){
        this.gridReload();
    },

    gridReload : function (){
        costList.global.searchAjaxData = {
        }

        costList.mainGrid("/bustrip/getBusinessCostList", costList.global.searchAjaxData);
    },

    mainGrid : function(url, params) {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : url,
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data) {
                    for(var key in params){
                        data[key] = params[key];
                    }

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
            }
        });

        $("#busiCostGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="costList.businessCostReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "등급",
                    template: function(row){
                        let returnText = "";
                        if(row.TRIP_CODE == "1"){
                            returnText = "가";
                        }else if(row.TRIP_CODE == "2"){
                            returnText = "나";
                        }else if(row.TRIP_CODE == "3"){
                            returnText = "다";
                        }else if(row.TRIP_CODE == "4"){
                            returnText = "라";
                        }
                        return returnText;
                    }
                }, {
                    title: "구분",
                    template: function(row){
                        let returnText = "";
                        if(row.EXNP_CODE == "1"){
                            returnText = "<div style='text-align:left;'>일비(정액)</div>";
                        }else if(row.EXNP_CODE == "2"){
                            returnText = "<div style='text-align:left;'>숙박비(최대한도)</div>";
                        }else if(row.EXNP_CODE == "3"){
                            returnText = "<div style='text-align:left;'>식비(정액)</div>";
                        }
                        return returnText;
                    }
                }, {
                    title : "금액($)",
                    columns : [
                        {
                            title : "부서장이상<br>(동행자도 같은기준)",
                            template : function(e){
                                return "<div style='text-align:right;'>" + comma(e.COST_AMT) + "</div>";
                            }
                        }, {
                            title : "팀장이하",
                            template : function(e){
                                return "<div style='text-align:right;'>" + comma(e.TEAM_COST_AMT) + "</div>";
                            }
                        }
                    ]
                }, {
                    title : "원화(원)",
                    columns : [
                        {
                            title : "부서장이상<br>(동행자도 같은기준)",
                            template : function(e){
                                return "<div style='text-align:right;'>" + comma(e.COST_AMT*1400) + "</div>";
                            }
                        }, {
                            title : "팀장이하",
                            template : function(e){
                                return "<div style='text-align:right;'>" + comma(e.TEAM_COST_AMT*1400) + "</div>";
                            }
                        }
                    ]
                }
            ]
        }).data("kendoGrid");
    },

    businessCostReqPop : function() {
        const url = "/bustrip/pop/businessCostReqPop.do";
        const name = "businessCostReqPop";
        const option = "width=865, height=350, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
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