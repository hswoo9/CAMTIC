var codeB = {
    global : {
        searchAjaxData : "",
        gridDataItem : "",
    },

    fn_defaultScript : function() {
        customKendo.fn_textBox(["cmGroupCodeNm"]);
        codeB.gridReload();
    },

    gridReload : function(){
        codeB.global.searchAjaxData = {
            cmGroupCode : $("#cmGroupCode").val(),
            cmGroupCodeNm : $("#cmGroupCodeNm").val(),
        }

        codeB.mainGrid("/bustrip/nationCodeList", codeB.global.searchAjaxData);
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 360,
            sortable: true,
            scrollable: true,
            excel: {
                fileName: " 코드 목록.xlsx",
                filterable: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            pageable: {
                refresh: true,
                pageSize: 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                }
            },
            dataBound: codeB.onDataBound,
            columns: [
                {
                    field: "GRP_NM",
                    title: "그룹코드",
                }, {
                    field: "LG_CD",
                    title: "대분류코드",
                }, {
                    field: "LG_CD_NM",
                    title: "대분류코드명",
                }]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');
        /* TODO. 2022.07.17  코드 모달 생성 */
        grid.tbody.find("tr").click(function (e) {
            var dataItem = grid.dataItem($(this));
            codeB.global.gridDataItem = dataItem;
            codeB.cmDetailCodeList(dataItem.GRP_SN, dataItem.LG_CD);
        });

    },

    cmDetailCodeList : function(grpSn, lgCd){
        var dataSource2 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : getContextPath() + '/bustrip/nationSmCodeList',
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    data.grpSn = grpSn;
                    data.lgCd = lgCd;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            }
        });

        $("#mainGrid2").kendoGrid({
            dataSource: dataSource2,
            height: 315,
            sortable: true,
            scrollable: true,
            toolbar : [
                {
                    name : 'create',
                    template : function (e){
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeB.cmCodeRegist()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>'+
                            '	<span class="k-button-text">코드 등록</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "코드 목록.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : codeB.onGrid2DataBound,
            columns: [
                {
                    field: "LG_CD_NM",
                    title: "대분류코드",
                }, {
                    field: "NATION_CD",
                    title: "코드명",
                }, {
                    field: "NATION_CD_NM",
                    title: "코드설명",
                }]
        }).data("kendoGrid");
    },

    cmCodeRegist : function(){
        $("#cmCodeRegistM").data("kendoWindow").title("코드 등록");
        $("#cmCodeRegistM").data("kendoWindow").open();
        setInputData();
    },

    onGrid2DataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            $("#cmCodeRegistM").data("kendoWindow").open();
            searchCmCodeDataCRM(dataItem.CM_CODE_ID);
        });
    },
}