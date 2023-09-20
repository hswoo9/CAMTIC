var crmHist = {

    global : {
        now : new Date(),
        searchAjaxData : "",
    },

    fn_defaultScript : function(){

        customKendo.fn_textBox(["crmNm"])
        customKendo.fn_datePicker("endDate", '', "yyyy-MM-dd", crmHist.global.now);
        customKendo.fn_datePicker("strDate", '', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 1)));

        fn_deptSetting();
        crmHist.gridReload();
    },

    mainGrid: function (url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            height: 515,
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
                        return "<a href='javascript:void(0);' onclick='crmHist.fn_crmHistViewPop(\"" + e.CRM_HIST_SN + "\")'>" + e.CRM_NM + "</a>";
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
                if(e.CRM_REL_CONT != null && e.CRM_REL_CONT != ""){
                    return e.CRM_REL_CONT;
                }else{
                    return "관계내용 미입력";
                }
            }
        }).data("kendoGrid");

    },

    gridReload : function(){
        crmHist.global.searchAjaxData = {
            deptSeq : $("#dept").val(),
            teamSeq : $("#team").val(),
            strDate : $("#strDate").val(),
            endDate : $("#endDate").val(),
            crmNm : $("#crmNm").val()
        }
        
        crmHist.mainGrid("/crm/getCrmHistList", crmHist.global.searchAjaxData);
    },

    fn_crmHistRegPop: function (){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var popup = window.open("/crm/pop/regCrmHistPop.do", name, option);
    },

    fn_crmHistViewPop: function (e){
        var name = "_blank";
        var option = "width = 880, height = 750, top = 100, left = 400, location = no"
        var popup = window.open("/crm/pop/regCrmHistViewPop.do?crmHistSn=" + e, name, option);
    },
}