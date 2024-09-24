var codeC = {
    global : {
        searchAjaxData : "",
        gridDataItem : "",
    },

    fn_defaultScript : function() {
        customKendo.fn_textBox(["cmGroupCodeNm"]);
        codeC.gridReload();
        codeC.cSearchCode();
    },

    gridReload : function(){
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }
        
        codeC.global.searchAjaxData = {
            cmGroupCode : $("#cmGroupCode").val(),
            cmGroupCodeNm : $("#cmGroupCodeNm").val(),
        }

        codeC.mainGrid("/crm/codeList", codeC.global.searchAjaxData);
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="codeC.gridReload(\'mainGrid\')">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeC.grpCodeRegist()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>'+
                            '	<span class="k-button-text">그룹코드 등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeC.cmGroupCodeRegist()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>'+
                            '	<span class="k-button-text">대분류 코드 등록</span>' +
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
                pageSizes : [10, 20, 50, "ALL"],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                }
            },
            dataBound: codeC.onDataBound,
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
            codeC.global.gridDataItem = dataItem;
            codeC.cmDetailCodeList(dataItem.GRP_SN, dataItem.LG_CD);
        });

    },

    grpCodeRegist:function (){
        $("#grpCodeModal").data("kendoWindow").open();
    },

    cmDetailCodeList : function(grpSn, lgCd){
        var dataSource2 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : getContextPath() + '/crm/smCodeList',
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
                    return data;
                },
                total: function (data) {
                    return data.length;
                },
                model: {
                    id: "CRM_CD",
                    fields: {
                        "CRM_CD": { type: "text" }
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
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeC.cmCodeRegist()">' +
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
            dataBound : codeC.onGrid2DataBound,
            columns: [
                {
                    field: "LG_CD_NM",
                    title: "대분류코드",
                }, {
                    field: "CRM_CD",
                    title: "코드명",
                }, {
                    field: "CRM_CD_NM",
                    title: "코드설명",
                }]
        }).data("kendoGrid");
    },

    cSearchCode : function(){
        codeC.global.searchAjaxData = {
            dropDown : "Y"
        }

        var result = customKendo.fn_customAjax("/crm/groupCodeList", codeC.global.searchAjaxData);
        if(result.flag){
            var itemType = result.list;
            var defaultType = {
                "GRP_SN" : "",
                "GRP_NM" : "선택"
            }
            itemType.unshift(defaultType);
            $("#cmGroupCode").kendoDropDownList({
                dataSource : itemType,
                dataValueField : "GRP_SN",
                dataTextField : "GRP_NM",
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