var cms = {


    fn_defaultScript : function(){
        cms.fn_popMainGrid();
    },

    gridReload: function(){
        $("#memGrid").data("kendoGrid").dataSource.read();
    },

    fn_popMainGrid : function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/crm/getCrmMemList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.crmSn = $("#crmSn").val();
                    data.crmMemNm = $("#crmMemNm").val();

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
            pageSize: 10,
        });

        $("#memGrid").kendoGrid({
            dataSource: dataSource,
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
            toolbar : [
                {
                    name : 'text',
                    template : function (e){
                        return '<label for="crmMemNm" class="k-label">성명</label> ' +
                            '<input type="text" class="k-input" id="crmMemNm" style="width: 250px; margin-right: 5px;" onkeyup="cms.fn_enterKey();"/>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cms.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "성명",
                    field: "CRM_MEM_NM",
                    width: 100,
                }, {
                    field: "CRM_MEM_DEPT",
                    title: "부서",
                    width: 100
                }, {
                    title: "직위",
                    field: "CRM_MEM_DUTY",
                    width: 100
                }, {
                    title: "핸드폰",
                    field: "CRM_MEM_PHN",
                    width: 100
                }, {
                    title: "이메일",
                    field: "CRM_MEM_EMAIL ",
                    width: 100
                }, {
                    title: "등록자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    width: 100,
                    template : function (e){
                        return "<button type='button' class='k-button k-button-solid-error' onclick='cms.fn_memSel(this)'>선택</button>";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_enterKey: function(){
        $("#crmMemNm").keydown(function(e){
            if(e.keyCode == 13){
                cms.gridReload()
            }
        });
    },

    fn_memSel : function(e){
        var dataItem = $("#memGrid").data("kendoGrid").dataItem($(e).closest("tr"));
        opener.parent.$("#depoManager").val(dataItem.CRM_MEM_NM);
        opener.parent.$("#email").val(dataItem.CRM_MEM_EMAIL);
        window.close()
    }
}