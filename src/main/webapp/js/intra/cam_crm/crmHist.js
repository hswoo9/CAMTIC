var crmHist = {


    fn_defaultScript : function(){

        customKendo.fn_textBox(["crmNm"])
        $("#strDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#endDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#crmNm").on("keyup", function(key){
            if(key.keyCode == 13){
                crm.mainGrid();
            }
        });

        fn_deptSetting();
        crmHist.mainGrid();
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/crm/getCrmHistList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.deptSeq = $("#dept").val();
                    data.teamSeq = $("#team").val();
                    data.strDate = $("#strDate").val();
                    data.endDate = $("#endDate").val();
                    data.crmNm = $("#crmNm").val();

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

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            height: "485",
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="crmHist.fn_crmHistRegPop()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="crmHist.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 120,
                    template: function(e){
                        $(this).closest('tr').append("<tr><td>asdfdfasfdsasdfa</td></tr>");
                        return "<a href='javascript:void(0);' onclick='crmHist.fn_crmHistRegPop(\"" + e.CRM_HIST_SN + "\")'>" + e.CRM_NM + "</a>";
                    },
                }, {
                    title: "팀명",
                    field: "DEPT_NAME",
                    width: 100,
                }, {
                    title: "등록자",
                    field: "EMP_NAME_KR",
                    width: 80
                }, {
                    title: "컨텍포인트",
                    field: "",
                    width: 100,
                    template: function (e){
                        var crmMemNm = "";
                        if(e.CRM_MEM_SN != null && e.CRM_MEM_SN != ""){
                            crmMemNm = e.CRM_MEM_NM;
                        }
                        return crmMemNm
                    }
                }, {
                    title: "상담일시",
                    field: "START_DATETIME",
                    width: 100
                }, {
                    title: "입력구분",
                    width: 100,
                    template : function (e){
                        var crmHistObj = "";

                        if(e.CRM_HIST_OBJ != null && e.CRM_HIST_OBJ != ""){
                            crmHistObj = e.CRM_HIST_OBJ;
                        }
                        return crmHistObj;
                    }
                }
            ],
            detailTemplate: function (e){
                return e.CRM_REL_CONT;
            }
        }).data("kendoGrid");

    },

    fn_crmHistRegPop: function (key){
        var url = "/crm/pop/regCrmHistPop.do";

        if(key != null && key != ""){
            url = "/crm/pop/regCrmHistPop.do?crmHistSn=" + key
        }

        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}