var codeM = {
    global : {
        searchAjaxData : "",
        gridDataItem : "",
    },

    fn_defaultScript : function() {
        customKendo.fn_textBox(["cmGroupCodeNm"]);
        codeM.gridReload();
        codeM.cSearchCode();
    },

    gridReload : function(){
        codeM.global.searchAjaxData = {
            cmGroupCode : $("#cmGroupCode").val(),
            cmGroupCodeNm : $("#cmGroupCodeNm").val(),
        }

        codeM.mainGrid("/system/commonCodeManagement/getCmGroupCodeList.do", codeM.global.searchAjaxData);
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 360,
            sortable: true,
            scrollable: true,
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="codeM.gridReload(\'mainGrid\')">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeM.cmGroupCodeRegist()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>'+
                            '	<span class="k-button-text">그룹코드 등록</span>' +
                            '</button>';
                    }
                }
            ],
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
            dataBound: codeM.onDataBound,
            columns: [
                {
                    field: "CM_GROUP_CODE",
                    title: "그룹코드",
                }, {
                    field: "CM_GROUP_CODE_NM",
                    title: "그룹코드명",
                }, {
                    field: "CM_GROUP_CODE_DESC",
                    title: "그룹코드 설명",
                }]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');
        /* TODO. 2022.07.17  코드 모달 생성 */
        grid.tbody.find("tr").click(function (e) {
            var dataItem = grid.dataItem($(this));
            codeM.global.gridDataItem = dataItem;
            codeM.cmDetailCodeList(dataItem.CM_GROUP_CODE_ID);
        });

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            $("#cmGroupCodeRegistM").data("kendoWindow").open();
            searchCmGCodeDataCRM(dataItem.CM_GROUP_CODE_ID);
        });
    },

    cmDetailCodeList : function(cmGroupCodeId){
        var dataSource2 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : getContextPath() + '/system/commonCodeManagement/getCmCodeList.do',
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    data.cmGroupCodeId = cmGroupCodeId;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                },
                model: {
                    id: "CM_CODE",
                    fields: {
                        "CM_CODE": { type: "text" }
                    }
                }
            }
        });

        var mainGrid2 = $("#mainGrid2").kendoGrid({
            dataSource: dataSource2,
            height: 315,
            sortable: true,
            scrollable: true,
            toolbar : [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                },
                {
                    name : 'create',
                    template : function (e){
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeM.cmCodeRegist()">' +
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
            dataBound : codeM.onGrid2DataBound,
            columns: [
                {
                    field: "CM_CODE",
                    title: "코드",
                }, {
                    field: "CM_CODE_NM",
                    title: "코드명",
                }, {
                    field: "CM_CODE_DESC",
                    title: "코드설명",
                }]
        }).data("kendoGrid");
    },

    cSearchCode : function(){
        codeM.global.searchAjaxData = {
            dropDown : "Y"
        }

        var result = customKendo.fn_customAjax("/system/commonCodeManagement/getCmGroupCodeList.do", codeM.global.searchAjaxData);
        if(result.flag){
            var itemType = result.list;
            var defaultType = {
                "CM_GROUP_CODE" : "",
                "CM_GROUP_CODE_TEXT" : "선택"
            }
            itemType.unshift(defaultType);
            $("#cmGroupCode").kendoDropDownList({
                dataSource : itemType,
                dataValueField : "CM_GROUP_CODE",
                dataTextField : "CM_GROUP_CODE_TEXT",
                index : 0
            });
        }
    },

    cmGroupCodeRegist : function(){
        $("#cmGroupCodeRegistM").data("kendoWindow").title(" 그룹코드 등록");
        $("#cmGroupCodeRegistM").data("kendoWindow").open();
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