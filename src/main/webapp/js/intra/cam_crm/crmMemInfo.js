var crmMi = {


    fn_defaultScript : function (){

        customKendo.fn_textBox(["crmMemNm", "crmMemDuty", "crmMemDept", "crmMemPhn","crmMemEmail", "crmMemEtc"]);

        crmMi.memGrid();

    },

    memGrid : function(){
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
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    const crmMemSn = dataItem.CRM_MEM_SN;
                    crmMi.fn_setCrmMemInfo(crmMemSn);
                });
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
                    title: "처리명령",
                    width: 100,
                    template : function (e){
                        return "<button type='button' class='k-button k-button-solid-error' onclick='crmMi.fn_del(\""+ e.CRM_MEM_SN +"\")'>삭제</button>";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_save : function (){

        var parameters = {
            crmMemNm : $("#crmMemNm").val(),
            crmMemDuty : $("#crmMemDuty").val(),
            crmMemDept : $("#crmMemDept").val(),
            crmMemPhn : $("#crmMemPhn").val(),
            crmMemEmail : $("#crmMemEmail").val(),
            crmMemEtc : $("#crmMemEtc").val(),
            crmSn : $("#crmSn").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#crmMemSn").val() != null && $("#crmMemSn").val() != ""){
            parameters.crmMemSn = $("#crmMemSn").val();
        }

        var crmMemClass = "";

        $("input[name='crmMemClass']:checked").each(function(){
            crmMemClass += $(this).val() + ",";
        });

        if(crmMemClass == ""){
            crmMemClass.substring(0, crmMemClass.length - 1);
        }

        parameters.crmMemClass = crmMemClass;


        $.ajax({
            url : "/crm/setCrmMemInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.params;

                alert("저장되었습니다.");
                location.reload();
            }
        })
    },

    fn_del: function(key){

        var data ={
            crmMemSn : key
        }

        $.ajax({
            url : "/crm/delCrmMemInfo",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs) {
                alert("삭제되었습니다.");

                $("#memGrid").data("kendoGrid").dataSource.read();
            }
        })
    },

    fn_setCrmMemInfo: function(key){
        crmMi.fn_init();
        var data ={
            crmMemSn : key
        }

        $.ajax({
            url : "/crm/getCrmMemInfo",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs) {
                var rs = rs.data;
                $("#crmMemSn").val(rs.CRM_MEM_SN);
                $("#crmMemNm").val(rs.CRM_MEM_NM);
                $("#crmMemDuty").val(rs.CRM_MEM_DUTY);
                $("#crmMemDept").val(rs.CRM_MEM_DEPT);
                $("#crmMemPhn").val(rs.CRM_MEM_PHN);
                $("#crmMemEmail").val(rs.CRM_MEM_EMAIL);
                $("#crmMemEtc").val(rs.CRM_MEM_ETC);

                var crmMemClass = rs.CRM_MEM_CLASS.split(",");
                for(var i = 0; i < crmMemClass.length; i++){
                    $("input[name='crmMemClass'][value='"+ crmMemClass[i] +"']").prop("checked", true);
                }
            }
        })
    },

    fn_init: function(){
        $("#crmMemSn").val("");
        $("#crmMemNm").val("");
        $("#crmMemDuty").val("");
        $("#crmMemDept").val("");
        $("#crmMemPhn").val("");
        $("#crmMemEmail").val("");
        $("#crmMemEtc").val("");

        $("input[name='crmMemClass']").prop("checked", false);
    }

}