var codeI = {
    global : {
        searchAjaxData : "",
        gridDataItem : "",
    },

    fn_defaultScript : function() {
        customKendo.fn_textBox(["cmGroupCodeNm"]);
        codeI.gridReload();
        codeI.cSearchCode();
    },

    gridReload : function(){
        codeI.global.searchAjaxData = {
            cmGroupCode : $("#cmGroupCode").val(),
            cmGroupCodeNm : $("#cmGroupCodeNm").val(),
        }

        codeI.mainGrid("/item/codeList", codeI.global.searchAjaxData);
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
                        return  '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="codeI.gridReload(\'mainGrid\')">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeI.grpCodeRegist()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>'+
                            '	<span class="k-button-text">그룹코드 등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeI.cmGroupCodeRegist()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>'+
                            '	<span class="k-button-text">대분류 코드 등록</span>' +
                            '</button>';
                    }
                }
            ],
            excel: {
                fileName: "기초코드 목록.xlsx",
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
            dataBound: codeI.onDataBound,
            columns: [
                {
                    field: "GRP_NM",
                    title: "그룹코드",
                }
                // , {
                //     field: "LG_CD",
                //     title: "대분류코드",
                // }
                , {
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
            codeI.global.gridDataItem = dataItem;
            codeI.cmDetailCodeList(dataItem.GRP_SN, dataItem.LG_CD);
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
                    url : getContextPath() + '/item/smCodeList',
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
                    id: "ITEM_CD",
                    fields: {
                        "ITEM_CD": { type: "text" }
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
                        return  '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="codeI.cmCodeRegist()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>'+
                            '	<span class="k-button-text">코드 등록</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "상세코드 목록.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : codeI.onGrid2DataBound,
            columns: [
                {
                    field: "LG_CD_NM",
                    title: "대분류코드",
                }, {
                    field: "ITEM_CD",
                    title: "코드명",
                }, {
                    field: "ITEM_CD_NM",
                    title: "코드설명",
                }, {
                    title: "기타",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="codeI.fn_delDetCode('+e.ITEM_CD_SN+')">삭제</button>';

                    }

                }]
        }).data("kendoGrid");
    },

    cSearchCode : function(){
        codeI.global.searchAjaxData = {
            dropDown : "Y"
        }

        var result = customKendo.fn_customAjax("/item/groupCodeList", codeI.global.searchAjaxData);
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
            $("#cmCodeNewBtnCR").hide();
            setInputData(dataItem);
        });
    },

    fn_delDetCode : function(e){

        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var data = {
            itemCdSn : e
        }

        $.ajax({
            url : "/item/delDetCode",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");

                    $("#mainGrid2").data("kendoGrid").dataSource.read();
                }
            }
        })
    }
}