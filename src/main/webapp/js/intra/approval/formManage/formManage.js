/**
 * 2022.06.28 by. deer
 * 전체관리 > 결재관리 > 양식관리
 *
 */
var draft = {
    global :{
        readersArr : new Array(),
    },

    readerSelectPopClose : function(e, readerNameStr){
        $("#readerName").val(readerNameStr);
        draft.global.readersArr = e;
        formM.global.readerArr = e;
    },
}

var formM = {
    global : {
        readerArr : new Array(),
        customFieldArr : new Array(),
        dropDownData : "",
        dropDownDataSource : "",
        radioGroupData : "",
        gridParamData : "",
        flag : true,
        searchAjaxData : "",
        saveAjaxData : "",

        windowPopUrl : "",
        popName : "",
        popStyle : ""
    },

    fnDefaultScript : function () {

        $("#formEditorTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        customKendo.fn_textBox(['searchKeyWord']);
        customKendo.fn_textBox(['formName', 'sort', 'headerCampaign', 'footerCampaign']);
        customKendo.fn_textBox(['formFileName', 'formLogoFileName', 'formSymbolFileName']);


        this.global.dropDownDataSource = [{
            text : "사용",
            value : "Y"
        },{
            text : "미사용",
            value : "N"
        }];
        customKendo.fn_dropDownList("searchActive", this.global.dropDownDataSource, "text", "value");

        formM.gridReload();

        this.global.dropDownData = {
            searchActive : "Y"
        }

        this.global.dropDownDataSource = customKendo.fn_customAjax("/formManagement/getFormFolderList.do", this.global.dropDownData);
        customKendo.fn_dropDownList("formFolderId", this.global.dropDownDataSource.list, "FORM_FOLDER_NAME", "FORM_FOLDER_ID", '2');

        $("#active").kendoRadioGroup({
            items: [
                { label : "사용", value : "Y" },
                { label : "미사용", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "Y",
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

        $("#emailAddress").kendoRadioGroup({
            items: [
                { label : "사용", value : "Y" },
                { label : "미사용", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "Y",
        });

        $("#approverMark").kendoRadioGroup({
            items: [
                { label : "직책", value : "D" },
                { label : "직급", value : "P" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "D",
        });

        this.global.dropDownDataSource = [{
            text : "일반",
            value : "1"
        },{
            text : "시스템연동",
            value : "2"
        }];
        customKendo.fn_dropDownList("linkageType", this.global.dropDownDataSource, "text", "value", '2');
        $("#linkageType").data("kendoDropDownList").bind("change", this.linkageTypeChange);

        this.global.dropDownData = {
            searchCompSeq : $("#searchCompSeq").val()
        }

        this.global.dropDownDataSource = customKendo.fn_customAjax("/formManagement/getLinkageProcessList.do", this.global.dropDownData);
        customKendo.fn_dropDownList("linkageProcessId", this.global.dropDownDataSource.list, "LINKAGE_PROCESS_NAME", "LINKAGE_PROCESS_ID", '2');

        $("#linkagePopActive").kendoRadioGroup({
            items: [
                { label : "사용", value : "Y" },
                { label : "미사용", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "Y",
        });

        $("#linkageType").data("kendoDropDownList").trigger("change");

        /************* 필수 기본항목 설정 *************/

        $("#formType").kendoRadioGroup({
            items: [
                { label : "hwp", value : "HWP" },
                { label : "html", value : "HTML" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "HWP",
            enabled : false,
        });

        $("#preservePeriod").kendoRadioGroup({
            items: [
                { label : "1년", value : "1" },
                { label : "2년", value : "2" },
                { label : "3년", value : "3" },
                { label : "4년", value : "4" },
                { label : "5년", value : "5" },
                { label : "10년", value : "10" },
                { label : "영구", value : "99" },
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1",
        });

        $("#securityType").kendoRadioGroup({
            items: this.kendoRadioGroupDataSource(29),
            layout : "horizontal",
            labelPosition : "after",
            value : "000",
            change : function(e){
                if(this.value() == "009"){
                    $("#readerTr").show();
                }else{
                    formM.global.readerArr = [];
                    $("#readerName").val("");
                    $("#readerTr").hide();
                }
            }
        });

        $("#docGbn").kendoRadioGroup({
            items: this.kendoRadioGroupDataSource(30),
            layout : "horizontal",
            labelPosition : "after",
            value : "000",
        });
    },

    mainGrid : function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params, 15),
            height: 595,
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 15,
                pageSizes: [15, 30, 45, "ALL"],
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
                        return '<button type="button" id="newFormFolderBtn" class="k-grid-button k-button k-button-md  k-button-solid k-button-solid-base" onclick="formM.resetDataInput()">' +
                                '   <span class="k-button-text">신규</span>' +
                                '</button>';
                    }
                },{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="formM.setFormDel()">' +
                            '   <span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "양식 목록.xlsx",
                filterable : true,
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : this.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='form#=FORM_ID#' name='form' value='#=FORM_ID#' class='k-checkbox checkbox'/>",
                    width: 40
                }, {
                    field : "FORM_COMP_NAME",
                    title : "회사",
                    width: 150
                }, {
                    field : "FORM_FOLDER_NAME",
                    title : "양식폴더",
                    attributes: { style: "text-align: left" },
                    width: 150
                }, {
                    field : "FORM_NAME",
                    title : "양식명",
                    attributes: { style: "text-align: left" },
                    width: 180
                }, {
                    field : "ACTIVE_CODE",
                    title : "사용여부",
                    width: 60,
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
            if($(this).is(":checked")) $("input[name=form]").prop("checked", true);
            else $("input[name=form]").prop("checked", false);
        });
    },

    gridReload : function () {
        formM.global.gridParamData = {
            searchCompSeq : $("#searchCompSeq").val(),
            searchKeyWord : $("#searchKeyWord").val(),
            searchActive : $("#searchActive").val(),
        }

        formM.mainGrid("/formManagement/getFormList.do", formM.global.gridParamData);
    },

    kendoRadioGroupDataSource : function(cmGroupCodeId){
        this.global.radioGroupData = {
            cmGroupCodeId : cmGroupCodeId
        }

        var radioArr = new Array();

        var result = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList.do", this.global.radioGroupData);

        if(result.flag){
            var data = result;
            for(var i = 0; i < data.length; i++){
                    radioArr.push({label : data[i].CM_CODE_NM, value : data[i].CM_CODE});
            }
        }

        return radioArr;
    },

    onDataBound : function () {
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            formM.modDataSetting(dataItem);
        });
    },

    modDataSetting : function(e){
        this.resetDataInput();

        $("#formId").val(e.FORM_ID);
        $("#formFolderId").data("kendoDropDownList").value(e.FORM_FOLDER_ID);
        $("#formName").val(e.FORM_NAME);
        $("#active").getKendoRadioGroup().value(e.ACTIVE);
        $("#visible").getKendoRadioGroup().value(e.VISIBLE);
        $("#emailAddress").getKendoRadioGroup().value(e.EMAIL_ADDRESS);
        $("#approverMark").getKendoRadioGroup().value(e.APPROVER_MARK);
        $("#sort").val(e.SORT);
        $("#headerCampaign").val(e.HEADER_CAMPAIGN);
        $("#footerCampaign").val(e.FOOTER_CAMPAIGN);
        $("#linkageType").data("kendoDropDownList").value(e.LINKAGE_TYPE);
        $("#linkageType").data("kendoDropDownList").trigger("change");
        $("#linkageProcessId").data("kendoDropDownList").value(e.LINKAGE_PROCESS_ID);
        $("#linkagePopActive").getKendoRadioGroup().value(e.LINKAGE_POP_ACTIVE);
        $("#linkagePopWidth").val(e.LINKAGE_POP_WIDTH);
        $("#linkagePopHeight").val(e.LINKAGE_POP_HEIGHT);

        formM.global.searchAjaxData = {
            formId : e.FORM_ID,
        }
        
        $("#fileFormName, #fileLogoName, #fileSymbolName").remove();

        var result = customKendo.fn_customAjax("/formManagement/getTemplateFormFile.do", formM.global.searchAjaxData );
        if(result.flag){
            /** 다운로드 링크 */
            for(var i = 0; i < result.formFile.length; i++){
                var filePath = "";
                /** TODO. 배포 시 필수 변경 */
                if(result.formFile[i].FILE_PATH.indexOf("121.186.165.80") > -1 || result.formFile[i].FILE_PATH.indexOf("10.10.10.114") > -1 || result.formFile[i].FILE_PATH.indexOf("one.epis.or.kr") > -1){
                    var splitFilePath = result.formFile[i].FILE_PATH.split("/");
                    filePath = "/" + splitFilePath[3] + "/" + splitFilePath[4] + "/" + splitFilePath[5] + "/" + result.formFile[i].FILE_UUID
                }else{
                    filePath = result.formFile[i].FILE_PATH + result.formFile[i].FILE_UUID
                }

                var fileInfo = $("<span class=\"doc_file_nm\">" +
                        "<a href=\"/common/fileDownload.do?filePath=" + filePath + "&fileName=" + result.formFile[i].FILE_ORG_NAME + "." + result.formFile[i].FILE_EXT + "&fileType=form\">" +
                            result.formFile[i].FILE_ORG_NAME + "." + result.formFile[i].FILE_EXT +
                        "</a>" +
                    "</span>");

                if(result.formFile[i].FORM_FILE_TYPE == "form"){
                    $(fileInfo).attr("id", "fileFormName");
                    $("#formFileName").closest("td").append(fileInfo);
                }else if(result.formFile[i].FORM_FILE_TYPE == "logo"){
                    $(fileInfo).attr("id", "fileLogoName");
                    $("#formLogoFileName").closest("td").append(fileInfo);
                }else{
                    $(fileInfo).attr("id", "fileSymbolName");
                    $("#formSymbolFileName").closest("td").append(fileInfo);
                }
            }
        }

        $("#formReqOptId").val(e.FORM_REQ_OPT_ID);
        $("#preservePeriod").getKendoRadioGroup().value(e.PRESERVE_PERIOD);
        $("#securityType").getKendoRadioGroup().value(e.SECURITY_TYPE);
        $("#securityType").data("kendoRadioGroup").trigger("change");
        $("#docGbn").getKendoRadioGroup().value(e.DOC_GBN);

        formM.global.searchAjaxData.docGbn = e.DOC_GBN;

        var result = customKendo.fn_customAjax("/formManagement/getFormRdCfList.do", formM.global.searchAjaxData);
        if(result.flag){
            var rs = result.list;
            for(var i = 0; i < rs.readerList.length; i++){
                var readerData = {
                    formId : rs.readerList[i].FORM_ID,
                    seqType : rs.readerList[i].SEQ_TYPE,
                    readerEmpSeq : rs.readerList[i].READER_EMP_SEQ,
                    readerEmpName : rs.readerList[i].READER_EMP_NAME,
                    readerDeptSeq : rs.readerList[i].READER_DEPT_SEQ,
                    readerDeptName : rs.readerList[i].READER_DEPT_NAME,
                    readerDutyCode : rs.readerList[i].READER_DUTY_CODE,
                    readerDutyName : rs.readerList[i].READER_DUTY_NAME,
                    readerPositionName : rs.readerList[i].READER_POSITION_NAME,
                    readerPositionCode : rs.readerList[i].READER_POSITION_CODE,
                    empSeq : $("#empSeq").val()
                }

                formM.global.readerArr.push(readerData);
            }

            $("#readerName").val(rs.readerName);

            formM.setRowCustomField(rs.formCustomFieldList);
        }
    },

    setRowCustomField : function(rs){
        var customFieldTr = "";

        for(var i = 0; i < rs.length; i++){
            customFieldTr += "<tr>";
            customFieldTr += "	<td class=\"text-center\">";
            customFieldTr += "		<input type='text' id='fieldName' name='fieldName' class='k-input k-textbox k-input-solid k-input-md ' value='" + rs[i].FIELD_NAME + "'>";
            customFieldTr += "	</td>";
            customFieldTr += "	<td class=\"text-center\">"
            customFieldTr += "		<input type='text' id='fieldExp' name='fieldExp' class='k-input k-textbox k-input-solid k-input-md ' value='" + rs[i].FIELD_EXP + "'>";
            customFieldTr += "  </td>";
            customFieldTr += "	<td class=\"text-center\">" + rs[i].EMP_NAME_KR + "</td>";
            customFieldTr += "	<td class=\"text-center\">";
            customFieldTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md  k-button-solid k-button-solid-base\" onclick=\"formM.setRowCustomFieldDel(this)\">";
            customFieldTr += "			<span class=\"k-icon k-i-cancel k-button-icon\"></span>";
            customFieldTr += "			<span class=\"k-button-text\">삭제</span>";
            customFieldTr += "		</button>";
            customFieldTr += "	</td>"
            customFieldTr += "</tr>";
        }
        $("#customFieldTbody tr:not(:eq(0))").remove();
        $("#customFieldTbody").append(customFieldTr);
    },

    linkageTypeChange : function(){
        if(this.value() != "2"){
            $(".linkageType2InfoTr").hide();
            $("#linkageProcessId").data("kendoDropDownList").value("");
            $("#popWidth").val("");
            $("#popHeight").val("");
        }else{
            $(".linkageType2InfoTr").show();
            $("#linkageProcessId").data("kendoDropDownList").value("");
        }
    },

    privateTargetInfoPop : function(){
        formM.global.windowPopUrl = "/approval/approvalPrivateTargetInfoPop.do";
        formM.global.popName = "privateTargetInfoPop";
        formM.global.popStyle ="width=785, height=870, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(formM.global.windowPopUrl, formM.global.popName, formM.global.popStyle);
    },

    readerSelectPopup : function(){
        formM.global.windowPopUrl = "/approval/approvalReaderSelectPopup.do";
        formM.global.popName = "readerSelectPopup";
        formM.global.popStyle ="width=1170, height=612, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(formM.global.windowPopUrl, formM.global.popName, formM.global.popStyle);
    },

    readerSelectPopClose : function(e, readerNameStr){
        $("#readerName").val(readerNameStr);
        formM.global.readerArr = e;
    },

    fileInputChange : function(e, i) {
        $(e)[0].files[0].fileTypeName = i;
        $("#" + i + "FileName").val($(e)[0].files[0].name);
    },

    addRowCustomFieldTr : function(){
        var customFieldTr = "";

        customFieldTr += "<tr>";
        customFieldTr += "	<td>";
        customFieldTr += "		<input type='text' id='fieldName' name='fieldName' class='k-input k-textbox k-input-solid k-input-md '>";
        customFieldTr += "	</td>";
        customFieldTr += "	<td>";
        customFieldTr += "		<input type='text' id='fieldExp' name='fieldExp' class='k-input k-textbox k-input-solid k-input-md '>";
        customFieldTr += "	</td>";
        customFieldTr += "	<td class=\"text-center\"> - </td>";
        customFieldTr += "	<td class=\"text-center\">";
        customFieldTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md  k-button-solid k-button-solid-base\" onclick=\"formM.setRowCustomFieldDel(this)\">";
        customFieldTr += "			<span class=\"k-icon k-i-cancel k-button-icon\"></span>";
        customFieldTr += "			<span class=\"k-button-text\">삭제</span>";
        customFieldTr += "		</button>";
        customFieldTr += "	</td>"
        customFieldTr += "</tr>";

        $("#customFieldTbody").append(customFieldTr);
    },

    setRowCustomFieldDel : function(e){
        $(e).closest("tr").remove();
    },

    setForm : function(){
        this.global.flag = true;

        if(!$("#formFolderId").val()){
            alert("양식폴더를 선택해주세요.");
            this.global.flag = false;
            return;
        }else if(!$("#formName").val()){
            alert("양식명을 입력해주세요.");
            this.global.flag = false;
            return;
        }else if(!$("#sort").val()){
            alert("정렬순서를 입력해주세요.");
            this.global.flag = false;
            return;
        }else if(!$("#linkageType").val()){
            alert("연동종류를 선택해주세요.");
            this.global.flag = false;
            return;
        }else if($("#linkageType").val() == "2"){
            if(!$("#linkageProcessId").val()){
                alert("연동상세구분을 선택해주세요.");
                this.global.flag = false;
                return;
            }
        }

        if(this.global.flag){
            if(confirm("저장 하시겠습니까?")){

                this.global.saveAjaxData = formM.makeFormData();

                var result = customKendo.fn_customFormDataAjax("/formManagement/setForm.do", this.global.saveAjaxData);

                if(result.flag){
                    alert("저장 되었습니다.");
                    this.resetDataInput();
                    this.gridReload();
                }else{
                    alert("저장에 실패하였습니다.");
                }
            }
        }else{
            alert("필수 값을 다시 확인해 주세요.");
        }
    },

    makeFormData : function(){
        var formData = new FormData();

        formData.append("formId", $("#formId").val());
        formData.append("formCompSeq", $("#formCompSeq").val());
        formData.append("formCompName", $("#formCompName").val());
        formData.append("formFolderId", $("#formFolderId").val(),);
        formData.append("formName", $("#formName").val());
        formData.append("active", $("#active").getKendoRadioGroup().value());
        formData.append("visible", $("#visible").getKendoRadioGroup().value());
        formData.append("emailAddress", $("#emailAddress").getKendoRadioGroup().value());
        formData.append("approverMark", $("#approverMark").getKendoRadioGroup().value());
        formData.append("sort", $("#sort").val());
        formData.append("headerCampaign", $("#headerCampaign").val());
        formData.append("footerCampaign", $("#footerCampaign").val());
        formData.append("linkageType", $("#linkageType").val());
        formData.append("empSeq", $("#empSeq").val());

        formData.append("formReqOptId", $("#formReqOptId").val());
        formData.append("preservePeriod", $("#preservePeriod").getKendoRadioGroup().value());
        formData.append("securityType", $("#securityType").getKendoRadioGroup().value());
        formData.append("docGbn", $("#docGbn").getKendoRadioGroup().value());
        formData.append("readerArr", JSON.stringify(formM.global.readerArr));

        if($("#linkageType").val() == "2"){
            formData.append("linkageProcessId", $("#linkageProcessId").val());
            formData.append("linkagePopActive", $("#linkagePopActive").getKendoRadioGroup().value());
            if($("#linkagePopActive").getKendoRadioGroup().value() == "Y"){
                formData.append("linkagePopWidth", $("#linkagePopWidth").val());
                formData.append("linkagePopHeight", $("#linkagePopHeight").val());
            }
        }

        /** 양식 파일 정보 */
        if($("#formFileInput")[0].files.length == 1){
            formData.append("form", $("#formFileInput")[0].files[0]);
        }

        if($("#formLogoFileInput")[0].files.length == 1){
            formData.append("logo", $("#formLogoFileInput")[0].files[0]);
        }

        if($("#formSymbolFileInput")[0].files.length == 1){
            formData.append("symbol", $("#formSymbolFileInput")[0].files[0]);
        }

        /** 추가 항목 */
        $.each($("#customFieldTbody tr:not(:eq(0))"), function(){
            var data = {
                formId : $("#formId").val(),
                fieldName : $(this).find("#fieldName").val(),
                fieldExp : $(this).find("#fieldExp").val(),
                empSeq : $("#empSeq").val(),
            }

            formM.global.customFieldArr.push(data);
        })

        formData.append("customFieldArr", JSON.stringify(formM.global.customFieldArr));

        return formData;
    },

    setFormDel : function(){
        if($('input[name="form"]:checked').length == 0){
            alert("삭제할 양식을 선택해주세요.");
            return;
        }

        if(confirm("삭제한 양식은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")) {
            var formId = "";
            $.each($('input[name="form"]:checked'), function () {
                formId += "," + $(this).val();
            });

            var result = customKendo.fn_customAjax('/formManagement/setFormDel.do', {formId : formId.substring(1)});
            if(result.flag){
                alert("삭제가 완료되었습니다.");
                formM.resetDataInput();
                formM.gridReload();
            }
        }
    },

    resetDataInput : function(){
        $("#formId").val("");
        $("#formFolderId").data("kendoDropDownList").value("");
        $("#formName").val("");
        $("#active").getKendoRadioGroup().value("Y");
        $("#visible").getKendoRadioGroup().value("Y");
        $("#emailAddress").getKendoRadioGroup().value("Y");
        $("#approverMark").getKendoRadioGroup().value("D");
        $("#sort").val("");
        $("#headerCampaign").val("");
        $("#footerCampaign").val("");

        $("#linkageType").data("kendoDropDownList").value("");
        $("#linkageType").data("kendoDropDownList").trigger("change");
        $("#linkageProcessId").data("kendoDropDownList").value("");
        $("#linkagePopActive").getKendoRadioGroup().value("Y");
        $("#linkagePopWidth").val("");
        $("#linkagePopHeight").val("");

        /************* 필수 기본항목 설정 *************/

        $("#preservePeriod").data("kendoRadioGroup").value("1");
        $("#securityType").data("kendoRadioGroup").value("000");
        $("#securityType").data("kendoRadioGroup").trigger("change");
        $("#docGbn").data("kendoRadioGroup").value("000");

        $("#formReqOptId").val("");
        $("#readerName").val("");

        formM.global.readerArr = [];

        /** 추가항목 */
        $("#customFieldTbody tr:not(:eq(0))").remove();

        formM.global.customFieldArr = [];
    }
}