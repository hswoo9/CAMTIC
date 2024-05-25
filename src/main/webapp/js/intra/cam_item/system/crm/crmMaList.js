var cml = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        cml.global.dropDownDataSource = [
            { text : "기업", value : "1" },
            { text : "기관", value : "2" },
            { text : "기타", value : "3" }
        ]
        customKendo.fn_dropDownList("ctmType", cml.global.dropDownDataSource, "text", "value");
        $("#ctmType").data("kendoDropDownList").bind("change", cml.gridReload);

        cml.global.dropDownDataSource = [
            { text: "회사명", value: "CRM_NM" },
            { text: "사업자번호", value: "CRM_NO" },
            { text: "전화번호", value: "TEL_NUM" },
            { text: "팩스번호", value: "FAX" },
            { text: "대표자", value: "CRM_CEO" }
        ]
        customKendo.fn_dropDownList("searchKeyword", cml.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", function(){
            if(this.value != ""){
                $("#searchValue").removeAttr("disabled");
            } else {
                $("#searchValue").attr("disabled", "");
            }
        });

        customKendo.fn_textBox(["searchValue"]);

        cml.gridReload();
    },

    mainGrid: function(url, params){
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
                /*{
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cml.fn_crmRegPopup()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="cml.setCrmDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },*/ {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cml.gridReload()">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='crm#=CRM_SN#' name='crmSn' value='#=CRM_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                }, {
                    title: "업태",
                    field: "CRM_OCC",
                    width: 100,
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 120,
                    template: function(e){
                        return "<a href='javascript:void(0);' onclick='cml.fn_crmRegPopup(\"" + e.CRM_SN + "\")'>" + e.CRM_NM + "</a>";
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
                }/*, {
                    title: "관계이력",
                    width: 100,
                    template : function (e){
                        return "0 건";
                    }
                }*//*, {
                    title: "품번관리",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cml.fn_popCrmItemReg(' + e.CRM_SN + ')">' +
                            '	<span class="k-button-text">품번관리</span>' +
                            '</button>';
                    }
                }*/
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=crmSn]").prop("checked", true);
            else $("input[name=crmSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        cml.global.searchAjaxData = {
            ctmType : $("#ctmType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        cml.mainGrid("/crm/getCrmList", cml.global.searchAjaxData);
    },

    setCrmDel : function(){
        if($("input[name='crmSn']:checked").length == 0){
            alert("삭제할 고객을 선택해주세요.");
            return
        }

        if(confirm("선택한 고객을 삭제하시겠습니까?")){
            var crmSn = "";

            $.each($("input[name='crmSn']:checked"), function(){
                crmSn += "," + $(this).val()
            })

            cml.global.saveAjaxData = {
                empSeq : $("#myEmpSeq").val(),
                crmSn : crmSn.substring(1)
            }

            var result = customKendo.fn_customAjax("/crm/setCrmDel.do", cml.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                cml.gridReload();
            }
        }
    },

    fn_crmRegPopup : function (key){
        var url = "/crm/pop/regCrmPop.do";
        if(key != null && key != ""){
            url = "/crm/pop/regCrmPop.do?crmSn=" + key;
        }
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popCrmItemReg : function (key){
        var url = "/item/pop/popCrmItemReg.do?crmSn=" + key;
        var name = "_blank";
        var option = "width = 1300, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}