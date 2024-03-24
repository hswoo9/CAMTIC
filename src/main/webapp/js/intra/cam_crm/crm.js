var crm = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        crm.global.dropDownDataSource = [
            { text : "기업", value : "1" },
            { text : "기관", value : "2" },
            { text : "기타", value : "3" }
        ]
        customKendo.fn_dropDownList("ctmType", crm.global.dropDownDataSource, "text", "value");
        $("#ctmType").data("kendoDropDownList").bind("change", crm.gridReload);

        crm.global.dropDownDataSource = [
            { text: "회사명", value: "CRM_NM" },
            { text: "사업자번호", value: "CRM_NO" },
            { text: "전화번호", value: "TEL_NUM" },
            { text: "팩스번호", value: "FAX" },
            { text: "대표자", value: "CRM_CEO" },
            { text: "담당자", value: "CRM_MEM" }
        ]
        customKendo.fn_dropDownList("searchKeyword", crm.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", function(){
            if(this.value != ""){
                $("#searchValue").removeAttr("disabled");
            } else {
                $("#searchValue").attr("disabled", "");
            }
        });

        customKendo.fn_textBox(["searchValue"]);

        crm.gridReload();

        regEmpSeq
        var rs = customKendo.fn_customAjax("/system/getAuthorityGroupUserList.do", {authorityGroupId: 1});

        for(var i = 0 ; i < rs.rs.length ; i++){
            if(rs.rs[i].EMP_SEQ == $("#regEmpSeq").val()){
                $("#crmDelBtn").css("display", "");
                break;
            }
        }

        console.log(rs);
    },

    mainGrid: function(url, params){
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="crm.fn_crmRegPopup()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){

                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" style="display:none;" id="crmDelBtn" onclick="crm.setCrmDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="crm.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="crm.templateExcelFormDown()">' +
                            '	<span class="k-button-text">고객등록양식 다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="crm.fn_crmExcelUploadPop()">' +
                            '	<span class="k-button-text">고객등록양식 업로드</span>' +
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
                    title: "순번",
                    template: "#= --record #",
                    width: 35
                }, {
                    field: "CRM_NM",
                    title: "업체명",
                    width: 120,
                    template: function(e){
                        return "<a href='javascript:void(0);' onclick='crm.fn_crmRegPopup(\"" + e.CRM_SN + "\")'>" + e.CRM_NM + "</a>";
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
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=crmSn]").prop("checked", true);
            else $("input[name=crmSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        crm.global.searchAjaxData = {
            ctmType : $("#ctmType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        crm.mainGrid("/crm/getCrmList", crm.global.searchAjaxData);
    },

    templateExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/crm/crmRegTemplateDown.do"
        });
    },

    fn_crmExcelUploadPop : function (){
        var url = "/crm/pop/mfExcelUploadPop.do?popType=crm";
        var name = "_blank";
        var option = "width = 500, height = 230, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
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

            crm.global.saveAjaxData = {
                empSeq : $("#myEmpSeq").val(),
                crmSn : crmSn.substring(1)
            }

            var result = customKendo.fn_customAjax("/crm/setCrmDel.do", crm.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                crm.gridReload();
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
    }
}

function gridReload(){
    crm.gridReload();
}