var crmHist = {

    global : {
        now : new Date(),
        searchAjaxData : "",
        dropDownDataSource : "",
    },

    fn_defaultScript : function(){

        crmHist.global.dropDownDataSource = [
            { text: "우량고객", value: "1" },
            { text: "일반고객", value: "2" },
            { text: "휴면고객", value: "3" },
            { text: "잠재고객", value: "4" },
            { text: "신규고객", value: "5" }
        ]
        customKendo.fn_dropDownList("ctmGrade", crmHist.global.dropDownDataSource, "text", "value");
        $("#ctmGrade").data("kendoDropDownList").bind("change", crmHist.gridReload);

        crmHist.global.dropDownDataSource = [
            { text: "기업", value: "1" },
            { text: "기관", value: "2" }
        ]
        customKendo.fn_dropDownList("ctmType", crmHist.global.dropDownDataSource, "text", "value");
        $("#ctmType").data("kendoDropDownList").bind("change", crmHist.gridReload);

        crmHist.global.dropDownDataSource = [
            { text: "회사명", value: "CRM_NM" },
            { text: "사업자번호", value: "CRM_NO" },
            { text: "전화번호", value: "TEL_NUM" },
            { text: "팩스번호", value: "FAX" },
            { text: "대표자", value: "CRM_CEO" }
        ]
        customKendo.fn_dropDownList("searchKeyword", crmHist.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", function(){
            if(this.value != ""){
                $("#searchValue").removeAttr("disabled");
            } else {
                $("#searchValue").attr("disabled", "");
            }
        });

        customKendo.fn_textBox(["searchValue"]);

        crmHist.gridReload();
    },

    mainGrid: function (url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="crmHist.fn_crmHistRegPop">' +
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
                    title: "업태",
                    field: "CRM_OCC",
                    width: 100,
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 120,
                    template: function(e){
                        return "<a href='javascript:void(0);' onclick='crmHist.fn_crmHistViewPop(\"" + e.CRM_SN + "\")'>" + e.CRM_NM + "</a>";
                    }
                }, {
                    title: "사업자번호",
                    field: "CRM_NO",
                    width: 100
                }, {
                    title: "대표자",
                    field: "CRM_CEO",
                    width: 80
                }, {
                    title: "전화번호",
                    field: "TEL_NUM",
                    width: 100
                }, {
                    title: "팩스번호",
                    field: "FAX",
                    width: 100
                }, {
                    title: "관계이력",
                    width: 100,
                    template : function (e){
                        return "0 건";
                    }
                }, {
                    title: "고객등급",
                    width: 100,
                    template: function(e){
                        return "";
                    }
                }, {
                    title: "최근수정일",
                    width: 100,
                    template:function(e){
                        if(e.MOD_DT == null || e.MOD_DT == ''){
                            return "";
                        } else {
                            return e.MOD_DT;
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    gridReload : function(){
        crmHist.global.searchAjaxData = {
            ctmType : $("#ctmType").val(),
            ctmGrade : $("#ctmGrade").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }
        
        crmHist.mainGrid("/crm/getCrmList", crmHist.global.searchAjaxData);
    },

    fn_crmHistRegPop: function (){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var popup = window.open("/crm/pop/regCrmHistPop.do", name, option);
    },

    fn_crmHistViewPop: function (e){
        var name = "_blank";
        var option = "width = 880, height = 750, top = 100, left = 400, location = no"
        var popup = window.open("/crm/pop/crmHistViewPop.do?crmSn=" + e, name, option);
    },
}