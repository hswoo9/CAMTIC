var budgetConfigView = {

    global: {

    },

    fn_defaultScript: function () {
        budgetConfigView.mainGrid();
    },

    gridReload : function(){
        $("#budgetConfigViewGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getBudgetGroupList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.groupCd = 'T000'
                    data.grFg = '2'
                    return data;
                }

            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#budgetConfigViewGrid").kendoGrid({
            dataSource: dataSource,
            scrollable: true,
            resizable: true,
            height : 525,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="budgetConfigView.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            persistSelection : true,
            columns: [
                {
                    field : "BGT_CD",
                    title : "예산코드",
                    width : 80
                },
                {
                    field : "BGT01_NM",
                    title : "장",
                    width : 100
                },
                {
                    field : "BGT02_NM",
                    title : "관",
                    width : 100
                },
                {
                    field : "BGT03_NM",
                    title : "항",
                    width : 100
                },
                {
                    field : "",
                    title : "보조비목세목코드",
                    width : 100,
                    template : function(dataItem) {
                        return "<input type='button' id='btnChoice' class='k-input' style='text-align: center' key='"+dataItem.BGT_CD+"' value='"+(dataItem.ASSTN_EXPITM_TAXITM_CODE || "")+"' onclick='budgetConfigView.fn_budgetChoice(this)' class='btnChoice' width='100' />";
                    }
                },
                {
                    title : "설정취소",
                    width : 50,
                    template : function(dataItem) {
                        return "<input type='button' class='btnChoice k-button k-button-solid-base' value='설정취소' onclick='budgetConfigView.fn_cnclSetting("+(dataItem.BG_SN || "")+");'>";
                    },
                },
                {
                    field : "ASSTN_EXPITM_NM",
                    title : "보조비목명",
                    width : 100
                },
                {
                    field : "ASSTN_TAXITM_NM",
                    title : "보조세목명",
                    width : 100
                }]
        }).data("kendoGrid");
    },

    fn_reqPopOnen : function(){
        var url = "/mng/budgetConfigViewPop.do";
        var name = "budgetConfigViewPop";
        var option = "width=520, height=650, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    fn_budgetChoice : function(e){
        var url = "/mng/budgetChoicePop.do?budgetSn=" + $(e).attr("key");
        var name = "budgetChoicePop";
        var option = "width=1200, height=800, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    fn_cnclSetting : function (e){
        if(!confirm("설정취소하시겠습니까?")){
            return;
        }

        if(e != "" && e != undefined && e != null){
            var data = {
                bgSn : e
            }
            $.ajax({
                url : "/kukgoh/delBudgetCodeMatch",
                data : data,
                type : "post",
                dataType:"json",
                success : function (rs){
                    if(rs.code == 200){
                        alert(rs.message);

                        budgetConfigView.gridReload();
                    }
                }
            });
        } else {
            alert("설정된 값이 없습니다.");
        }
    }

}