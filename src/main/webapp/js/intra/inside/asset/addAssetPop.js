var addAssetPop = {

    global: {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript: function () {
        addAssetPop.kendoSetting();

        $("#purcPrice").keyup(function(){
            if($(this).val().toString().toMoney().charAt(0) == "0"){
                $(this).val($(this).val().toString().substring(1).toMoney());
            }else{
                $(this).val($(this).val().toString().toMoney());
            }
        });

        if($("#mod").val() == "Y"){
            addAssetPop.modDataInit()
        }
    },

    rdTaskPopup : function() {
        var url = "/Inside/Pop/rdTaskPop.do";
        var name = "rdTaskPop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    fn_saveAstInfo : function() {
        if(!$("#astCodeId1").val()){
            alert("카테고리(대)를 선택해주세요.");
            return;
        }else if(!$("#astCodeId2").val()){
            alert("카테고리(중)를 선택해주세요.");
            return;
        }else if(!$("#astCodeId3").val()){
            alert("카테고리(소)를 선택해주세요.");
            return;
        }else if(!$("#astName").val()){
            alert("자산명을 입력해주세요.");
            $("#astName").focus();
            return;
        }else if(!$("#purcPrice").val()){
            alert("구입금액을 입력해주세요.");
            $("#purcPrice").focus();
            return;
        }else if(!$("#modelSize").val()){
            alert("규격을 입력해주세요.");
            $("#modelSize").focus();
            return;
        }else if(!$("#modelName").val()){
            alert("모델명을 입력해주세요.");
            $("#modelName").focus();
            return;
        }else if(!$("#purcCompanyId").val()){
            alert("구입업체를 선택해주세요.");
            return;
        }else if(!$("#mfCompany").val()){
            alert("제조사를 입력해주세요.");
            $("#mfCompany").focus();
            return;
        }else if(!$("#orgCountry").val()){
            alert("생산국가를 입력해주세요.");
            $("#orgCountry").focus();
            return;
        }else if(!$("#qty").val()){
            alert("구입 수량을 입력해주세요.");
            $("#qty").focus();
            return;
        }else if(!$("#unitText").val()){
            alert("구입 단위를 입력해주세요.");
            $("#unitText").focus();
            return;
        }else if(!$("#barcodeType").val()){
            alert("바코드 타입을 선택해주세요.");
            return;
        }else if(!$("#fundingSource").data("kendoRadioGroup").value()){
            alert("자금출처를 선택해주세요.");
            return;
        }else if(!$("#expAccount").val()){
            alert("지출계좌를 선택해주세요.");
            return;
        }else if(!$("#astPlaceSn").val()){
            alert("설치장소를 선택해주세요.");
            return;
        }else if(!$("#empName").val()){
            alert("사용자를 입력해주세요.");
            $("#empName").focus();
            return;
        }else if(!$("#purpose").val()){
            alert("용도를 입력해주세요.");
            $("#purpose").focus();
            return;
        }

        if(confirm("자산을 등록하시겠습니까?")){
            var formData = new FormData();
            formData.append("menuCd", $("#menuCd").val());
            formData.append("astInfoSn", $("#astInfoSn").val());
            formData.append("astCodeCompanyId", $("#astCodeCompanyId").val());
            formData.append("astCodeTypeId", $("#astCodeTypeId").val());
            formData.append("astCodeId1", $("#astCodeId1").val());
            formData.append("astCodeId2", $("#astCodeId2").val());
            formData.append("astCodeId3", $("#astCodeId3").val());
            formData.append("astStsCode", $("#astStsCode").val());
            formData.append("astPlaceSn", $("#astPlaceSn").val());
            formData.append("astNo", $("#astCodeCompanyId").val() + $("#astCodeTypeId").val() + $("#astCodeId1").val() + $("#astCodeId2").val() + $("#astCodeId3").val());
            formData.append("astName", $("#astName").val());
            formData.append("purcDate", $("#purcDate").val());
            formData.append("purcPrice", $("#purcPrice").val().toString().toMoney2());
            formData.append("purcCompanyId", $("#purcCompanyId").val());
            formData.append("modelSize", $("#modelSize").val());
            formData.append("modelName", $("#modelName").val());
            formData.append("mfCompany", $("#mfCompany").val());
            formData.append("orgCountry", $("#orgCountry").val());
            formData.append("qty", $("#qty").val());
            formData.append("unit", $("#unitText").val());
            formData.append("regType", $("#regType").val());
            formData.append("barcodeType", $("#barcodeType").val());
            formData.append("fundingSource", $("#fundingSource").data("kendoRadioGroup").value());
            formData.append("fundingSourceText", '[' + $("#fundingSource").data("kendoRadioGroup")._items.find(element => element.value === $("#fundingSource").data("kendoRadioGroup").value()).label + ']');
            formData.append("expAccount", $("#expAccount").val());
            formData.append("empName", $("#empName").val());
            formData.append("purpose", $("#purpose").val());
            formData.append("remark", $("#remark").val());
            formData.append("empSeq", $("#empSeq").val());

            formData.append("regEmpSeq", $("#empSeq").val());
            formData.append("regEmpName", $("#regEmpName").val());


            if($("#relatedFile")[0].files.length == 1){
                formData.append("relatedFile", $("#relatedFile")[0].files[0]);
            }

            if($("#astFile")[0].files.length == 1){
                formData.append("astFile", $("#astFile")[0].files[0]);
            }


            var result = customKendo.fn_customFormDataAjax('/inside/setAssetInfo.do', formData);
            if(result.flag){
                alert("자산이 등록되었습니다.");
                opener.parent.assetList.gridReload();
                window.close();
            }
        }
    },

    kendoSetting : function() {
        $("#purcDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        addAssetPop.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getClassPositionList", {});
        $("#astCodeCompanyId").kendoDropDownList({
            dataTextField: "AST_CP_CODE_NM",
            dataValueField: "AST_CP_CODE",
            dataSource: addAssetPop.global.dropDownDataSource.rs,
            index: 0
        });

        addAssetPop.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getClassDivisionList", {});
        $("#astCodeTypeId").kendoDropDownList({
            dataTextField: "AST_TYPE_CODE_NM",
            dataValueField: "AST_TYPE_CODE",
            dataSource: addAssetPop.global.dropDownDataSource.rs
        });

        /** 카테고리 드롭다운 */
        addAssetPop.global.searchAjaxData = {
            astUpperCode : 0
        }
        addAssetPop.global.dropDownDataSource = customKendo.fn_customAjax("/asset/getAstCategoryList", addAssetPop.global.searchAjaxData);
        addAssetPop.global.dropDownDataSource.rs.unshift({
            AST_CODE_NM : "카테고리(대)",
            AST_CODE : "",
        })
        $("#astCodeId1").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: addAssetPop.global.dropDownDataSource.rs,
            change : function(e){
                addAssetPop.categoryAddRow('astCodeId1', this.dataItem().AST_CODE_ID)
            }
        });

        addAssetPop.global.dropDownDataSource = [{
            AST_CODE_NM : "카테고리(중)",
            AST_CODE : "",
        }]
        $("#astCodeId2").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: addAssetPop.global.dropDownDataSource
        });

        addAssetPop.global.dropDownDataSource = [{
            AST_CODE_NM : "카테고리(소)",
            AST_CODE : "",
        }]
        $("#astCodeId3").kendoDropDownList({
            dataTextField: "AST_CODE_NM",
            dataValueField: "AST_CODE",
            dataSource: addAssetPop.global.dropDownDataSource
        });
        /** 카테고리 드롭다운 종료 */

        addAssetPop.global.searchAjaxData = {
            insideMdCode : "03"
        }
        addAssetPop.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getInsideCodeList.do", addAssetPop.global.searchAjaxData);
        $("#astStsCode").kendoDropDownList({
            dataTextField: "INSIDE_DT_CODE_NM",
            dataValueField: "INSIDE_DT_CODE",
            dataSource: addAssetPop.global.dropDownDataSource.rs,
        });

        addAssetPop.global.dropDownDataSource = customKendo.fn_customAjax("/asset/getAssetPlaceList", {});
        customKendo.fn_dropDownList('astPlaceSn', addAssetPop.global.dropDownDataSource.rs, "AST_PLACE_NAME", "AST_PLACE_SN" ,"2")

        $("#barcodeType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "대", value: "1" },
                { text: "소", value: "2" }
            ],
            index: 0
        });

        $("#unit").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "EA", value: "EA" },
                { text: "Copy", value: "COPY" },
                { text: "Set", value: "SET" },
                { text: "입력", value: "" },
            ],
            select : 0,
            change : function(e){
                $("#unitText").val(this.value());
            }
        })

        $("#regType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "개별등록", value: "1" },
                { text: "일괄등록", value: "2" },
            ],
            index: 0
        });

        $("#fundingSource").kendoRadioGroup({
            items: [
                {label : "법인운영" , value : "0"},
                {label : "연구개발" , value : "1"},
                {label : "교육사업" , value : "2"},
                {label : "개발사업" , value : "4"},
                {label : "기능보강" , value : "5"},
                {label : "지원사업" , value : "6"},
                {label : "협의회" , value : "7"},
                {label : "기타사업" , value : "3"},
            ],
            layout : "horizontal",
            labelPosition : "after",
            change : function(){
                if(this.value() != ""){
                    $("#expAccount").val(this._items.find(element => element.value === this.value()).label);
                    $("#bizSearchBtn").show();
                }
            }
        }).data("kendoRadioGroup");

        customKendo.fn_textBox(["astName", "purcPrice", "modelSize", "modelName", "purcCompanyName",
            "mfCompany", "orgCountry", "qty", "unitText", "expAccount", "empName"])

        $("#purpose, #remark").kendoTextArea({
            rows : 2,
        });
    },

    categoryAddRow : function(id, astUpperCode){
        var changeId = "";
        var defaultName = ""
        if(id == "astCodeId1"){
            changeId = "astCodeId2";
            defaultName = "카테고리(중)";
        }else if(id == "astCodeId2"){
            changeId = "astCodeId3";
            defaultName = "카테고리(소)";
        }

        if($("#" + id).val() != ""){
            var result = customKendo.fn_customAjax("/asset/getAstCategoryList", {astUpperCode : astUpperCode});
            if(result.flag){
                $("#astCodeId3").data("kendoDropDownList").dataSource.data([{
                    AST_CODE_NM : "카테고리(소)",
                    AST_CODE    : "",
                }]);

                if(id == "astCodeId1"){
                    $("#astCodeId2").data("kendoDropDownList").dataSource.data([{
                        AST_CODE_NM : "카테고리(중)",
                        AST_CODE    : "",
                    }]);
                }

                addAssetPop.global.dropDownDataSource = result.rs;
                addAssetPop.global.dropDownDataSource.unshift({
                    AST_CODE_NM : defaultName,
                    AST_CODE    : "",
                })

                $("#" + changeId).data("kendoDropDownList").dataSource.data(addAssetPop.global.dropDownDataSource)
                $("#" + changeId).data("kendoDropDownList").select(0);
                if(id == "astCodeId1"){
                    $("#" + changeId).data("kendoDropDownList").bind("change", function(){addAssetPop.categoryAddRow("astCodeId2", this.dataItem().AST_CODE_ID)});
                }
            }
        }
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    modDataInit : function(){
        window.resizeTo(1100, 788);

        var result = customKendo.fn_customAjax("/inside/getAssetInfo.do", {astInfoSn : $("#astInfoSn").val()})
        if(result.flag){
            $("#astCodeCompanyId").data("kendoDropDownList").value(result.data.AST_CODE_COMPANY_ID);
            $("#astCodeTypeId").data("kendoDropDownList").value(result.data.AST_CODE_TYPE_ID);
            $("#astCodeId1").data("kendoDropDownList").value(result.data.AST_CODE_ID_1);
            $("#astCodeId1").data("kendoDropDownList").trigger("change");
            $("#astCodeId2").data("kendoDropDownList").value(result.data.AST_CODE_ID_2);
            $("#astCodeId2").data("kendoDropDownList").trigger("change");
            $("#astCodeId3").data("kendoDropDownList").value(result.data.AST_CODE_ID_3);
            $("#astName").val(result.data.AST_NAME);
            $("#purcDate").val(result.data.PURC_DATE);
            $("#purcPrice").val(result.data.PURC_PRICE);
            $("#modelSize").val(result.data.MODEL_SIZE);
            $("#modelName").val(result.data.MODEL_NAME);
            $("#purcCompanyId").val(result.data.PURC_COMPANY_ID);
            $("#purcCompanyName").val();
            $("#mfCompany").val(result.data.MF_COMPANY);
            $("#astStsCode").data("kendoDropDownList").value(result.data.AST_STS_CODE);
            $("#orgCountry").val(result.data.ORG_COUNTRY);

            $("#qty").val(result.data.ORG_COUNTRY);
            if(result.data.UNIT == "SET" || result.data.UNIT == "EA" || result.data.UNIT == "COPY"){
                $("#unit").data("kendoDropDownList").value(result.data.UNIT);
                $("#unit").data("kendoDropDownList").trigger("change");
            }else{
                $("#unit").data("kendoDropDownList").value("");
                $("#unitText").val(result.data.UNIT);
            }
            $("#regType").data("kendoDropDownList").value(result.data.REG_TYPE);
            $("#barcodeType").data("kendoDropDownList").value(result.data.BARCODE_TYPE);
            $("#fundingSource").data("kendoRadioGroup").value(result.data.FUNDING_SOURCE);
            $("#expAccount").val(result.data.EXP_ACCOUNT);
            $("#astPlaceSn").data("kendoDropDownList").value(result.data.AST_PLACE_SN);
            $("#empName").val(result.data.EMP_NAME);
            $("#purpose").val(result.data.PURPOSE);
            $("#remark").val(result.data.REMARK);

            if(result.data.astFile != null){
                $("#astFileName").text(result.data.astFile.file_org_name + "." + result.data.astFile.file_ext);
            }

            if(result.data.relatedFile != null){
                $("#relatedFileName").text(result.data.relatedFile.file_org_name + "." + result.data.relatedFile.file_ext);
            }
        }
    },
}


