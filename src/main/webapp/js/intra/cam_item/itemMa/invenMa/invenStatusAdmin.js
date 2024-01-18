var invenStAdmin = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        customKendo.fn_datePicker("searchDt", "depth", "yyyy-MM-dd", new Date());
        $("#searchDt").data("kendoDatePicker").bind("change", invenStAdmin.gridReload);

        invenStAdmin.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 508,
            sortable: true,
            selectable: "row",
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenStAdmin.gridReload()">' +
                            '	<span class="k-button-text">재고조정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenStAdmin.gridReload()">' +
                            '	<span class="k-button-text">결재</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenStAdmin.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "재고현황.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='agiPk#=MASTER_SN#' name='agiPk' value='#=MASTER_SN#' class='k-checkbox checkbox'/>",
                    width : 35
                }, {
                    title: "창고",
                    field: "WH_CD_NM",
                    width: 80
                }, /*{
                    title: "품번",
                    field: "ITEM_NO",
                    width: 150
                }, */{
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 100
                }, {
                    title: "단위",
                    field: "STANDARD",
                    width: 50
                }, {
                    title: "수량기준",
                    columns: [
                        {
                            title: "전월 재고수량",
                            width: 70,
                            template : function (e){
                                if(e.CURRENT_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.CURRENT_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.CURRENT_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "입고현황",
                            width: 70,
                            template : function (e){
                                return invenStAdmin.comma(e.RECEIVING_INVEN);
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        } ,{
                            title: "출고현황",
                            width: 70,
                            template : function (e){
                                return invenStAdmin.comma(e.FORWARDING_INVEN);
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "현재고",
                            width: 70,
                            template : function (e){
                                if(e.CURRENT_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.CURRENT_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.CURRENT_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "안전재고",
                            width: 70,
                            template : function (e){
                                if(e.SAFETY_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.SAFETY_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.SAFETY_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "실사재고수량",
                            width: 70,
                            template : function (e){
                                if(e.CURRENT_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.CURRENT_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.CURRENT_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "차이",
                            width: 70,
                            template : function (e){
                                if(e.CURRENT_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.CURRENT_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.CURRENT_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "확정재고",
                            width: 70,
                            template : function (e){
                                if(e.CURRENT_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.CURRENT_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.CURRENT_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }
                    ]
                }, {
                    title: "금액기준 (VAT 별도)",
                    columns: [
                        {
                            title: "전월재고자산",
                            field: "STANDARD",
                            width: 80,
                            template : function (e){
                                if(e.CURRENT_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.CURRENT_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.CURRENT_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "당월재고자산",
                            field: "STANDARD",
                            width: 80,
                            template : function (e){
                                if(e.CURRENT_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.CURRENT_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.CURRENT_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        } ,{
                            title: "재고자산 증감액",
                            field: "STANDARD",
                            width: 80,
                            template : function (e){
                                if(e.CURRENT_INVEN < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.CURRENT_INVEN) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.CURRENT_INVEN);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }
                    ]
                }, /*{
                    title: "재고조정",
                    width: 100,
                    field: "INVEN_AJM",
                    template : function (e){
                        return invenStAdmin.comma(e.INVEN_AJM);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    width: 100,
                    field: "UNIT_PRICE",
                    template: function(e){
                        return invenStAdmin.comma(e.UNIT_PRICE) + "원";
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "재고금액",
                    width: 100,
                    field: "INVEN_AMT",
                    template: function(e){
                        if(e.INVEN_AMT < 0){
                            return "<span style='color: red'>" + invenStAdmin.comma(e.INVEN_AMT) + "원</span>";
                        }else{
                            return invenStAdmin.comma(e.INVEN_AMT) + "원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                } */{
                    title: "비고",
                    width: 100
                }
            ]
        }).data("kendoGrid");
    },

    gridReload: function (){
        invenStAdmin.global.searchAjaxData = {
            searchDt : $("#searchDt").val()
        };

        invenStAdmin.mainGrid("/item/getItemInvenAdminList.do", invenStAdmin.global.searchAjaxData);
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}