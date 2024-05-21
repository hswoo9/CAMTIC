var invoicePage = {

    global: {

    },

    fn_defaultScript: function () {
        invoicePage.invoiceMainGrid();
    },

    // 세금계산서 그리드
    invoiceMainGrid : function(){

        var kukgohInvoiceInsertGridDataSource = new kendo.data.DataSource({
            serverPaging : true,
            pageSize : 10,
            transport : {
                read : {
                    url : "/kukgoh/kukgohInvoiceInsertGrid2",
                    dataType : "json",
                    type : 'post'
                },
                parameterMap : function(data) {
                    data.CO_CD =  $('#CO_CD').val().replace(/\-/g,''); //특정문자 제거
                    data.GISU_DT = $('#GISU_DT').val().replace(/\-/g,''); //특정문자 제거
                    data.GISU_SQ = $('#GISU_SQ').val().replace(/\-/g,''); //특정문자 제거
                    data.BG_SQ = $("#BG_SQ").val();
                    data.LN_SQ = $('#LN_SQ').val();
                    return data;
                }
            },
            schema : {
                data : function(response) {
                    return response.list;
                },
                total : function(response) {
                    return response.total;
                },
                model : {
                    fields : {
                        ANNV_HOLI_STEP_NAME : {
                            type : "string"
                        },
                        code_kr : {
                            type : "string"
                        }
                    }
                }
            }
        });

        var kukgohInvoiceInsertGrid = $("#kukgohInvoiceInsertGrid").kendoGrid({
            dataSource : kukgohInvoiceInsertGridDataSource,
            dataBound : gridDataBound,
            height : 250,
            sortable : true,
            persistSelection : true,
            selectable : "multiple",
            columns: [
                { field : "TR_NM", title : "거래처명", width : 100 },
                { field : "BCNC_LSFT_NO", title : "사업자번호", width : 80 },
                {
                    template : function(dataItem){
                        return enaralink.fn_formatMoney(dataItem.UNIT_AM);
                    }, title : "합계금액", width : 80
                },{
                    template : function(dataItem){
                        return enaralink.fn_formatMoney(dataItem.SUP_AM);
                    }, title : "공급가", width : 80
                },{
                    template : function(dataItem){
                        return enaralink.fn_formatMoney(dataItem.VAT_AM);
                    }, title : "부가세", width : 80
                },{
                    template : function  (dataItem){
                        var result = '<input type="text" id="';
                        result += 'txtInvoice'+dataItem.LN_SQ;
                        result += '" class="" style="width:180px;"';

                        if (typeof selData.PRUF_SE_NO === 'undefined') {
                            result += ' />';
                            result +=	'<input type="button" id="btn'+dataItem.LN_SQ+'" class="text_blue"  style="width:30px;" onclick="fn_validInvoice(this)" value="전송"/>';
                            return result;
                        } else {
                            result += 'value="' +  ( typeof dataItem.ETXBL_CONFM_NO === null ? dataItem.ETXBL_CONFM_NO : selData.PRUF_SE_NO ) + '" style="background-color : #c7c5c5;" ';
                            result += '/>';
                            if (dataItem.KUKGO_STATE_YN == "Y") {
                                result +=	'<input type="button" id="btn'+dataItem.LN_SQ+'" class="text_blue"  style="width:30px;" onclick="fn_validInvoice(this)" value="전송" disabled/>';
                            } else {
                                result +=	'<input type="button" id="btn'+dataItem.LN_SQ+'" class="text_blue"  style="width:30px;" onclick="fn_validInvoice(this)" value="전송" />';
                            }

                            return result;
                        }
                    }, title : "전자(세금)계산서 번호", width : 200
                },
                { field : "PROCESS_RESULT_MSSAGE", title : "전송결과", width : 80 }
            ],
            change: function (e){
                invoiceGridClick(e);
            }
        }).data("kendoGrid");

        kukgohInvoiceInsertGrid.table.on("click", ".checkbox", selectRow);

        var checkedIds = {};
        function selectRow(){
            var checked = this.checked,
                row = $(this).closest("tr"),
                grid = $('#invoiceGrid').data("kendoGrid"),
                dataItem = grid.dataItem(row);

            checkedIds[dataItem.ANNV_USE_ID] = checked;
            if (checked) {
                //-select the row
                row.addClass("k-state-selected");
            } else {
                //-remove selection
                row.removeClass("k-state-selected");
            }
        }
        function invoiceGridClick(e){
            var dataItem = e.sender;
            console.log(dataItem);
        }
        function gridDataBound(){
            //$('#btn1').attr("disabled", true);
        }
    },



}