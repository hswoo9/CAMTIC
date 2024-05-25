var crmHist = {

    global : {
        now : new Date(),
        searchAjaxData : "",
        dropDownDataSource : "",
    },

    fn_defaultScript : function(){
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
            { text: "대표자", value: "CRM_CEO" },
            { text: "관계이력(등록자)", value: "CRM_HIST_REG_EMP" },
            { text: "관계이력(내용)", value: "CRM_HIST_REL_CONT" },
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
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "CRM 고객목록.xlsx",
                filterable : true
            },
            columns: [
                {
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
                }/*, {
                    title: "관계이력",
                    width: 100,
                    template : function (e){
                        return "0 건";
                    }
                }*/, {
                    field: "CRM_LOC",
                    title: "소재지",
                    width: 100
                }, {
                    title: "최근수정일",
                    width: 100,
                    field : "MOD_DATE",
                    template:function(e){
                        if(e.MOD_DATE == null || e.MOD_DATE == ''){
                            return "";
                        } else {
                            return e.MOD_DATE;
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    gridReload : function(){
        crmHist.global.searchAjaxData = {
            ctmType : $("#ctmType").val(),
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
        var option = "width = 1200, height = 905, top = 0, left = 400, location = no"
        var popup = window.open("/crm/pop/crmHistViewPop.do?crmSn=" + e, name, option);
    },
}