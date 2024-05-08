var inr = {
    
    global : {
        duplicateFlag : "N",
        saveAjaxData : "",
        dropDownDataSource : "",
        searchAjaxData : ""
    },
    
    fn_defaultScript : function(){
        inr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", inr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        inr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "UN", lgCd : "UNIT"});
        customKendo.fn_dropDownList("itemUnitCd", inr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        inr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "PT", lgCd : "IT"});
        customKendo.fn_dropDownList("itemType", inr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        inr.global.dropDownDataSource = [
            {text : "사용", value : "Y"},
            {text : "미사용", value : "N"}
        ]
        customKendo.fn_dropDownList("active", inr.global.dropDownDataSource, "text", "value", 2);

        $("#safetyInven").keyup(function(){
            $(this).val(inr.comma(inr.uncomma($(this).val())));
        });

        customKendo.fn_textBox(["itemNo", "itemName", "safetyInven", "standard", "unitPrice", "costPrice", "b2bPrice", "consumerPrice"]);

        $(".numberInput").keyup(function(){
            $(this).val(comma(uncomma($(this).val())));
        });

        inr.global.dropDownDataSource = customKendo.fn_customAjax("/item/getItemCategoryList", {cgType : "A"}).list;
        inr.global.dropDownDataSource.unshift({CATEGORY_CODE : "선택하세요", ITEM_CATEGORY_SN : ""});
        $("#categoryA").kendoDropDownList({
            dataSource : inr.global.dropDownDataSource,
            dataTextField: "CATEGORY_CODE",
            dataValueField: "ITEM_CATEGORY_SN",
            change : function(){
                inr.global.dropDownDataSource = customKendo.fn_customAjax("/item/getItemCategoryList", {cgType : "B", parentCode: $("#categoryA").val()}).list;
                inr.global.dropDownDataSource.unshift({CATEGORY_CODE : "선택하세요", ITEM_CATEGORY_SN : ""});

                if($("#categoryA").val() != ""){
                    $("#categoryC").kendoDropDownList({
                        dataTextField: "TEXT",
                        dataValueField: "VALUE",
                        dataSource: [
                            {TEXT: '선택하세요', VALUE: ''}
                        ],
                        index: 0,
                    });

                    $("#categoryB").kendoDropDownList({
                        dataSource : inr.global.dropDownDataSource,
                        dataTextField: "CATEGORY_CODE",
                        dataValueField: "ITEM_CATEGORY_SN",
                        change : function(){
                            inr.global.dropDownDataSource = customKendo.fn_customAjax("/item/getItemCategoryList", {cgType : "C", parentCode: $("#categoryB").val()}).list;
                            inr.global.dropDownDataSource.unshift({CATEGORY_CODE : "선택하세요", ITEM_CATEGORY_SN : ""});

                            if($("#categoryA").val() != "" && $("#categoryB").val() != ""){
                                $("#categoryC").kendoDropDownList({
                                    dataSource : inr.global.dropDownDataSource,
                                    dataTextField: "CATEGORY_CODE",
                                    dataValueField: "ITEM_CATEGORY_SN",
                                });
                            }
                        }
                    });
                } else {
                    $("#categoryB").kendoDropDownList({
                        dataTextField: "TEXT",
                        dataValueField: "VALUE",
                        dataSource: [
                            {TEXT: '선택하세요', VALUE: ''}
                        ],
                        index: 0,
                    });
                    $("#categoryC").kendoDropDownList({
                        dataTextField: "TEXT",
                        dataValueField: "VALUE",
                        dataSource: [
                            {TEXT: '선택하세요', VALUE: ''}
                        ],
                        index: 0,
                    });
                }
            }
        });

        $("#categoryB").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: ''}
            ],
            index: 0,
        });

        $("#categoryC").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: ''}
            ],
            index: 0,
        });

        if($("#masterSn").val()){
            inr.getItemMaster();
        }
    },

    getItemNoDuplicate : function(){
        if($("#categoryA").val() == ""){
            alert("품번 대분류를 선택해주세요");
            $("#categoryA").data("kendoDropDownList").focus();
            return;
        } else if($("#categoryB").val() == ""){
            alert("품번 중분류를 선택해주세요");
            $("#categoryB").data("kendoDropDownList").focus();
            return;
        } else if($("#categoryC").val() == ""){
            alert("품번 소분류를 선택해주세요");
            $("#categoryC").data("kendoDropDownList").focus();
            return;
        }

        let itemNo = $("#categoryA").data("kendoDropDownList").text() + $("#categoryB").data("kendoDropDownList").text() + $("#categoryC").data("kendoDropDownList").text();

        inr.global.saveAjaxData = {
            itemNo : itemNo
        }
        var result = customKendo.fn_customAjax("/item/getItemNoDuplicate.do", inr.global.saveAjaxData)
        if(result.flag){
            inr.global.duplicateFlag = result.rs;
            if(result.rs){
                if($("#masterSn").val()){
                    if($("#itemNo").val() == itemNo){
                        alert("등록 가능한 품번입니다.");
                        inr.global.duplicateFlag = false;
                    } else {
                        alert("이미 등록된 품번입니다.");
                    }
                } else {
                    alert("이미 등록된 품번입니다.");
                }
            }else {
                alert("등록 가능한 품번입니다.");
            }
        }
    },

    setReceivingReg : function(){
        if(inr.global.duplicateFlag == "N"){
            alert("품번 중복확인을 체크해주세요.");
            return;
        }else if(inr.global.duplicateFlag){
            alert("이미 등록된 품번입니다.");
            return;
        }else if(!$("#itemName").val()){
            alert("품명을 입력해주세요.");
            return;
        }else if(!$("#itemUnitCd").val()){
            alert("단위를 선택해주세요.");
            return;
        }/*else if(!$("#standard").val()){
            alert("규격을 입력해주세요.");
            return;
        }*/else if(!$("#active").val()){
            alert("사용여부를 선택해주세요.");
            return;
        }else if(!$("#unitPrice").val()){
            alert("단가를 입력해주세요.");
            return;
        }else if(!$("#costPrice").val()){
            alert("원가를 입력해주세요.");
            return;
        }else if(!$("#b2bPrice").val()){
            alert("판매가(B2B)를 입력해주세요.");
            return;
        }else if(!$("#consumerPrice").val()){
            alert("판매가(소비자가) 입력해주세요.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            inr.global.saveAjaxData = {
                masterSn : $("#masterSn").val(),
                itemNo : $("#categoryA").data("kendoDropDownList").text() + $("#categoryB").data("kendoDropDownList").text() + $("#categoryC").data("kendoDropDownList").text(),
                categoryA : $("#categoryA").data("kendoDropDownList").value(),
                categoryB : $("#categoryB").data("kendoDropDownList").value(),
                categoryC : $("#categoryC").data("kendoDropDownList").value(),
                itemName : $("#itemName").val(),
                itemUnitCd : $("#itemUnitCd").val(),
                standard : $("#standard").val(),
                itemType : $("#itemType").val(),
                active : $("#active").val(),
                empSeq : $("#empSeq").val(),
                unitPrice : uncomma($("#unitPrice").val()),
                costPrice : uncomma($("#costPrice").val()),
                b2bPrice : uncomma($("#b2bPrice").val()),
                consumerPrice : uncomma($("#consumerPrice").val())
            }

            if($("#whCd").val()){
                inr.global.saveAjaxData.whCd = $("#whCd").val()
            }

            if($("#safetyInven").val()){
                inr.global.saveAjaxData.safetyInven = $("#safetyInven").val()
            }

            var result = customKendo.fn_customAjax("/item/setItemMasterReg.do", inr.global.saveAjaxData)
            if(result.flag){
                alert("등록되었습니다.");
                opener.itemM.gridReload();
                window.close();
            }
        }
    },

    getItemMaster : function(){
        console.log("getItemMaster");
        inr.global.searchAjaxData = {
            masterSn : $("#masterSn").val()
        }
        var result = customKendo.fn_customAjax("/item/getItemMaster.do", inr.global.searchAjaxData);
        console.log(result.rs)
        if(result.flag){
            inr.global.duplicateFlag = false;
            $("#itemNo").val(result.rs.ITEM_NO);
            $("#itemName").val(result.rs.ITEM_NAME);
            $("#itemUnitCd").data("kendoDropDownList").value(result.rs.ITEM_UNIT_CD);
            $("#standard").val(result.rs.STANDARD)
            $("#itemType").data("kendoDropDownList").value(result.rs.ITEM_TYPE);
            $("#safetyInven").val(result.rs.SAFETY_INVEN)
            $("#whCd").data("kendoDropDownList").value(result.rs.WH_CD)
            $("#active").data("kendoDropDownList").value(result.rs.ACTIVE)

            $("#categoryA").data("kendoDropDownList").value(result.rs.CATEGORY_A_SN);
            $("#categoryA").data("kendoDropDownList").trigger("change")
            $("#categoryB").data("kendoDropDownList").value(result.rs.CATEGORY_B_SN);
            $("#categoryB").data("kendoDropDownList").trigger("change")
            $("#categoryC").data("kendoDropDownList").value(result.rs.CATEGORY_C_SN);

            $("#unitPrice").val(comma(result.rs.UNIT_PRICE || 0));
            $("#costPrice").val(comma(result.rs.COST_PRICE || 0));
            $("#b2bPrice").val(comma(result.rs.B2B_PRICE || 0));
            $("#consumerPrice").val(comma(result.rs.CONSUMER_PRICE || 0));
        }
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}
