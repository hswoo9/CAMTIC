/**
 * 2023.01.14 by. deer
 * 전체관리 > 결재관리 > 양식폴더관리
 *
 */

var formFolderM = {
    global : {
        dropDownData : "",
        dropDownDataSource : "",
        gridParamData : "",
        flag : true,
        saveAjaxData : ""
    },

    fnDefaultScript : function(){
        formFolderM.global.dropDownDataSource = [{
            text : "사용",
            value : "Y"
        },{
            text : "미사용",
            value : "N"
        }];

        customKendo.fn_textBox(['searchKeyWord', 'formFolderName', 'sort']);
        customKendo.fn_dropDownList("searchActive", formFolderM.global.dropDownDataSource, "text", "value");

        formFolderM.gridReload();

        $("#remark").kendoTextArea({
            rows:5,
            cols:20,
            resizable: "vertical",
        });

        $("#visible").kendoRadioGroup({
            items: [
                { label : "노출", value : "Y" },
                { label : "미노출", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "Y",
        });

        $("#active").kendoRadioGroup({
            items: [
                { label : "사용", value : "Y" },
                { label : "미사용", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "Y",
        });
    },

    mainGrid : function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 595,
            scrollable: true,
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
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="newFormFolderBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="formFolderM.resetDataInput()">' +
                                '   <span class="k-button-text">신규</span>' +
                                '</button>';
                    }
                },{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="formFolderM.setFormFolderDel()">' +
                            '   <span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "양식폴더 목록.xlsx",
                filterable : true,
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : formFolderM.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='formF#=FORM_FOLDER_ID#' name='formF' value='#=FORM_FOLDER_ID#' class='k-checkbox checkbox'/>",
                    width: 40
                }, {
                    field : "FORM_COMP_NAME",
                    title : "회사",
                    width: 180
                }, {
                    field : "FORM_FOLDER_NAME",
                    title : "양식폴더명",
                    attributes: { style: "text-align: left" },
                }, {
                    field : "VISIBLE_CODE",
                    title : "노출여부",
                    width: 100,
                    template : function(e){
                        if(e.VISIBLE == "Y"){
                            return "노출"
                        }else{
                            return "미노출"
                        }
                    }
                }, {
                    field : "ACTIVE_CODE",
                    title : "사용여부",
                    width: 100,
                    template : function(e){
                        if(e.ACTIVE == "Y"){
                            return "사용"
                        }else{
                            return "미사용"
                        }
                    }
                }
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=formF]").prop("checked", true);
            else $("input[name=formF]").prop("checked", false);
        });
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            formFolderM.modDataSetting(dataItem);
        });
    },

    gridReload : function() {
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }
        
        formFolderM.global.gridParamData = {
            searchCompSeq : $("#searchCompSeq").val(),
            searchKeyWord : $("#searchKeyWord").val(),
            searchActive : $("#searchActive").val()
        }

        formFolderM.mainGrid("/formManagement/getFormFolderList.do", formFolderM.global.gridParamData);
    },

    modDataSetting : function (e){
        $("#formFolderId").val(e.FORM_FOLDER_ID);
        $("#formCompSeq").val(e.FORM_COMP_SEQ);
        $("#formCompName").val(e.FORM_COMP_NAME);
        $("#formFolderName").val(e.FORM_FOLDER_NAME);
        $("#visible").data("kendoRadioGroup").value(e.VISIBLE);
        $("#active").data("kendoRadioGroup").value(e.ACTIVE);
        $("#sort").val(e.SORT);
        $("#remark").val(e.REMARK);
    },

    setFormFolder : function(){
        if(!$("#formFolderName").val()){
            alert("양식폴더명을 입력해주세요.");
            formFolderM.global.flag = false;
            return;
        }else if(!$("#sort").val()){
            alert("정렬순서를 입력해주세요.");
            formFolderM.global.flag = false;
            return;
        }
        if(formFolderM.global.flag){
            if(confirm("저장 하시겠습니까?")){
                formFolderM.global.saveAjaxData = {
                    formFolderId : $("#formFolderId").val(),
                    formCompSeq : $("#formCompSeq").val(),
                    formCompName : $("#formCompName").val(),
                    formFolderName : $("#formFolderName").val(),
                    sort : $("#sort").val(),
                    visible : $("#visible").getKendoRadioGroup().value(),
                    active : $("#active").getKendoRadioGroup().value(),
                    remark : $("#remark").val(),
                    empSeq : $("#empSeq").val()
                }

                var result = customKendo.fn_customAjax("/formManagement/setFormFolder.do", formFolderM.global.saveAjaxData);

                if(result.flag){
                    alert("저장 되었습니다.");
                    formFolderM.resetDataInput();
                    formFolderM.gridReload();
                }else{
                    alert("저장에 실패하였습니다.");
                }
            }
        }else{
            alert("필수 값을 다시 확인해 주세요.");
        }
    },

    setFormFolderDel : function(){
        if($('input[name="formF"]:checked').length == 0){
            alert("삭제할 양식폴더를 선택해주세요.");
            return;
        }

        if(confirm("양식폴더 삭제시 폴더 내 양식도 사용할 수 없습니다.\n삭제하시겠습니까?")) {
            var formFolderId = "";
            $.each($('input[name="formF"]:checked'), function () {
                formFolderId += "," + $(this).val();
            });

            var result = customKendo.fn_customAjax('/formManagement/setFormFolderDel.do', {formFolderId : formFolderId.substring(1)});
            if(result.flag){
                alert("삭제가 완료되었습니다.");
                formFolderM.resetDataInput();
                formFolderM.gridReload();
            }
        }
    },

    resetDataInput : function(){
        $("#formFolderId").val("");
        $("#formFolderName").val("");
        $("#visible").getKendoRadioGroup().value("Y");
        $("#active").getKendoRadioGroup().value("Y");
        $("#sort").val("");
        $("#remark").val("");
    },
}