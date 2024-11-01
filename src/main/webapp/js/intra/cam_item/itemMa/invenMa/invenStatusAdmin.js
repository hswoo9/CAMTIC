var invenStAdmin = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        customKendo.fn_datePicker("searchDt", "depth", "yyyy-MM-dd", new Date());
        $("#searchDt").data("kendoDatePicker").bind("change", invenStAdmin.mainGrid);

        invenStAdmin.mainGrid();
    },

    mainGrid: function(){
        var date = new Date($("#searchDt").val());
        var nowStrDt = new Date(date.getFullYear(), date.getMonth(), 1);
        var nowEndDt = new Date(date.getFullYear(), date.getMonth()+1, 0);

        var befDate = new Date($("#searchDt").val());
        var befStrDt = new Date(befDate.getFullYear(), befDate.getMonth() - 1, 1);
        var befEndDt = new Date(befDate.getFullYear(), befDate.getMonth(), 0);

        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/item/getItemInvenAdminList.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.searchDt = $("#searchDt").val();
                    data.nowStrDt = nowStrDt.getFullYear() + "-" + ('0' + ((nowStrDt.getMonth() + 1))).slice(-2) + "-" + ('0' + (nowStrDt.getDate())).slice(-2); //nowMon firstDay,
                    data.nowEndDt = nowEndDt.getFullYear() + "-" + ('0' + ((nowEndDt.getMonth() + 1))).slice(-2) + "-" + ('0' + (nowEndDt.getDate())).slice(-2); //nowMon lastDay,
                    data.befStrDt = befStrDt.getFullYear() + "-" + ('0' + ((befStrDt.getMonth() + 1))).slice(-2) + "-" + ('0' + (befStrDt.getDate())).slice(-2);   //befMon firstDay,
                    data.befEndDt = befEndDt.getFullYear() + "-" + ('0' + ((befEndDt.getMonth() + 1))).slice(-2) + "-" + ('0' + (befEndDt.getDate())).slice(-2);   //befMon lastDay,

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
            page: 1,
            pageSizes: "ALL",
        });

        $("#mainGrid").kendoGrid({
            /*dataSource: customKendo.fn_gridDataSource2(url, params),*/
            dataSource: dataSource,
            height: 508,
            sortable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-dark" onclick="invenStAdmin.fn_setDeadLine()">' +
                            '	<span class="k-button-text">마감</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenStAdmin.templateExcelFormDown()">' +
                            '	<span class="k-button-text">재고조정 양식 다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="invenStAdmin.fn_crmExcelUploadPop()">' +
                            '	<span class="k-button-text">재고조정 양식 업로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenStAdmin.fn_invenAdjustment()">' +
                            '	<span class="k-button-text">재고조정</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenStAdmin.itemResAppPop()">' +
                            '	<span class="k-button-text">결재</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenStAdmin.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "재고현황.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox" onclick="fn_checkAll(\'checkAll\', \'agiPk\');"/>',
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
                                if(e.BEF_TOT_CNT < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.BEF_TOT_CNT) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.BEF_TOT_CNT);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "입고현황",
                            width: 70,
                            template : function (e){
                                return invenStAdmin.comma(e.IN_CNT);
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        } ,{
                            title: "출고현황",
                            width: 70,
                            template : function (e){
                                return invenStAdmin.comma(e.OUT_CNT);
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "현재고",
                            width: 70,
                            template : function (e){
                                if(e.TOT_CNT < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.TOT_CNT) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.TOT_CNT);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "안전재고",
                            width: 70,
                            template : function (e){
                                if(e.SAFE_CNT < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.SAFE_CNT) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.SAFE_CNT);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "실사재고수량",
                            width: 70,
                            template : function (e){
                                if(e.REAL_CNT < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.REAL_CNT) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.REAL_CNT);
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "차이",
                            width: 70,
                            template : function (e){
                                var diffInven = e.TOT_CNT - e.REAL_CNT;

                                if(e.REAL_CNT == 0){
                                   return "0";
                                } else {
                                    if(diffInven < 0){
                                        return "<span style='color: red'>" + invenStAdmin.comma(diffInven) + "</span>";
                                    }else{
                                        return invenStAdmin.comma(diffInven);
                                    }
                                }
                            },
                            attributes : {
                                style : "text-align : right;"
                            }
                        }, {
                            title: "확정재고",
                            width: 70,
                            field: "ITEM_CONF_CNT",
                            template: function(e){
                                if(e.ITEM_CONF_CNT != undefined && e.ITEM_CONF_CNT != null){
                                    return e.ITEM_CONF_CNT;
                                } else {
                                    return "0"
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
                                if(e.BEF_AMT < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.BEF_AMT) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.BEF_AMT);
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
                                if(e.AMT < 0){
                                    return "<span style='color: red'>" + invenStAdmin.comma(e.AMT) + "</span>";
                                }else{
                                    return invenStAdmin.comma(e.AMT);
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
                                if(e.BEF_AMT > e.AMT){
                                    return "<span style='color: red; font-weight : bold'>" + invenStAdmin.comma(Number(e.BEF_AMT - e.AMT)) + "</span>";
                                } else if(e.BEF_AMT < e.AMT){
                                    return "<span style='color: blue; font-weight : bold'>" + invenStAdmin.comma(Number(e.AMT - e.BEF_AMT)) + "</span>";
                                } else {
                                    return invenStAdmin.comma(Number(e.BEF_AMT - e.AMT));
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
                    width: 100,
                    template: function(e){
                        if(e.INVEN_AJM_NOTE != null){
                            return e.INVEN_AJM_NOTE;
                        }
                        else{
                            return "";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_invenAdjustment : function (){
        if($('input[name="agiPk"]:checked').length == 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }

        var invenSn = "";
        $('input[name="agiPk"]:checked').each(function(){
            invenSn += $(this).val() + ",";
        });

        invenSn = invenSn.substring(0, invenSn.length - 1);

        var url = "/item/pop/invenAdjustmentPop.do?invenSn=" + invenSn;
        var name = "_blank";
        var option = "width = 1680, height = 400, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    /*gridReload: function (){

        var date = new Date($("#searchDt").val());
        var nowStrDt = new Date(date.getFullYear(), date.getMonth(), 1);
        var nowEndDt = new Date(date.getFullYear(), date.getMonth()+1, 0);

        var befDate = new Date($("#searchDt").val());
        var befStrDt = new Date(befDate.getFullYear(), befDate.getMonth() - 1, 1);
        var befEndDt = new Date(befDate.getFullYear(), befDate.getMonth(), 0);

        invenStAdmin.global.searchAjaxData = {
            searchDt : $("#searchDt").val(),
            nowStrDt : nowStrDt.getFullYear() + "-" + ('0' + ((nowStrDt.getMonth() + 1))).slice(-2) + "-" + ('0' + (nowStrDt.getDate())).slice(-2), //nowMon firstDay,
            nowEndDt : nowEndDt.getFullYear() + "-" + ('0' + ((nowEndDt.getMonth() + 1))).slice(-2) + "-" + ('0' + (nowEndDt.getDate())).slice(-2), //nowMon lastDay,
            befStrDt : befStrDt.getFullYear() + "-" + ('0' + ((befStrDt.getMonth() + 1))).slice(-2) + "-" + ('0' + (befStrDt.getDate())).slice(-2),   //befMon firstDay,
            befEndDt : befEndDt.getFullYear() + "-" + ('0' + ((befEndDt.getMonth() + 1))).slice(-2) + "-" + ('0' + (befEndDt.getDate())).slice(-2),   //befMon lastDay,
        };

        invenStAdmin.mainGrid("/item/getItemInvenAdminList.do", invenStAdmin.global.searchAjaxData);
    },*/

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    templateExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/item/itemRegTemplateDown.do"
        });
    },

    fn_crmExcelUploadPop : function (){
        var url = "/item/pop/itemExcelUploadPop.do";
        var name = "_blank";
        var option = "width = 500, height = 230, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_setDeadLine : function (){

        if(!confirm("마감하시겠습니까?")){
            return;
        }
        /*var parameters = {

        }
        var result = customKendo.fn_customAjax("/item/getItemInvenAdminList.do", invenStAdmin.global.searchAjaxData)

        console.log(result);

        var itemArr= result.list;


        parameters.itemArr = JSON.stringify(itemArr);

        $.ajax({
            url : "/item/setDeadLine",
            data : parameters,
            type : "post",
            dataType : "json",
            success:function (rs){
                if(rs.code == 200){
                    alert("마감되었습니다.");

                    invenStAdmin.gridReload();
                }
            }
        });*/
    },

    itemResAppPop : function(){
        var url = "/item/pop/itemAppPop.do";
        var name = "itemAppPop";
        var option = "width = 540, height = 260, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}