var popCrmMemList = {


    global : {

    },


    fn_deafultScript: function (){

        popCrmMemList.popMainGrid();

    },


    popGridReload: function (){
        $("#popMainGrid").data("kendoGrid").dataSource.read();
    },

    popMainGrid : function () {
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

        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="popCrmMemList.fn_setCrmPop('+$("#crmSn").val()+')">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }
            ],
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
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
                    title: "선택",
                    width: 100,
                    template : function (e){
                        return "<button type='button' class='k-button k-button-solid-base' onclick='popCrmMemList.fn_select(\""+ e.CRM_MEM_SN +"\")'>선택</button>";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_select: function (e){
        var data= {
            crmMemSn : e
        }
        var rs = customKendo.fn_customAjax("/crm/getCrmMemInfo", data);

        var rs = rs.data;
        opener.parent.$("#crmMemSn").val(rs.CRM_MEM_SN);
        opener.parent.$("#crmMemNm").val(rs.CRM_MEM_NM);
        opener.parent.$("#crmMemPhn").val(rs.CRM_MEM_PHN);
        opener.parent.$("#crmMail").val(rs.CRM_MEM_EMAIL);

        opener.parent.$("#crmReqMem").val(rs.CRM_MEM_NM);
        opener.parent.$("#crmPhNum").val(rs.CRM_MEM_PHN);

        try {
            opener.parent.$("#crmMem").val(rs.CRM_MEM_NM);
        }catch{

        }

        window.close();
    },


    fn_setCrmPop: function (key){
        var url = "/crm/pop/regCrmPop.do";
        if(key != null && key != ""){
            url = "/crm/pop/regCrmPop.do?crmSn=" + key + "&type=set";
        }
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

}