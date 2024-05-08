var icr = {
    
    global : {
        duplicateFlag : "N",
        saveAjaxData : "",
        dropDownDataSource : "",
        searchAjaxData : ""
    },
    
    fn_defaultScript : function(){
        icr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", icr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        icr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "UN", lgCd : "UNIT"});
        customKendo.fn_dropDownList("itemUnitCd", icr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        icr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "PT", lgCd : "IT"});
        customKendo.fn_dropDownList("itemType", icr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        icr.global.dropDownDataSource = [
            {text : "사용", value : "Y"},
            {text : "미사용", value : "N"}
        ]
        customKendo.fn_dropDownList("active", icr.global.dropDownDataSource, "text", "value", 2);

        $("#safetyInven").keyup(function(){
            $(this).val(icr.comma(icr.uncomma($(this).val())));
        });

        customKendo.fn_textBox(["cgCode"])

        if($("#itemCgSn").val()){
            icr.getItemMaster();
        }
    },

    getCgDuplicateChk : function(){
        if(!$("#cgCode").val()){
            alert("코드를 입력해주세요.");
            return;
        }

        icr.global.saveAjaxData = {
            cgType : $("#cgType").val(),
            cgCode : $("#cgCode").val(),
            parentCode : $("#parentCode").val()
        }
        var result = customKendo.fn_customAjax("/item/getCgDuplicateChk", icr.global.saveAjaxData)
        if(result.flag){
            icr.global.duplicateFlag = result.rs;
            if(result.rs){
                alert("이미 등록된 코드입니다.");
            }else {
                alert("등록 가능한 코드입니다.");
            }
        }
    },

    setCategoryCodeReg : function(){
        if(icr.global.duplicateFlag == "N"){
            alert("코드 중복확인을 체크해주세요.");
            return;
        }else if(icr.global.duplicateFlag){
            alert("이미 등록된 품번입니다.");
            return;
        }else if(!$("#cgCode").val()){
            alert("코드를 입력해주세요.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            icr.global.saveAjaxData = {
                itemCgSn : $("#itemCgSn").val(),
                cgCode : $("#cgCode").val(),
                cgType : $("#cgType").val(),
                parentCode : $("#parentCode").val(),
                parentCodeNm : $("#parentCodeNm").val(),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/item/setItemCategoryReg", icr.global.saveAjaxData)
            if(result.flag){
                alert("등록되었습니다.");
                opener.gridReload("categoryGrid" + $("#cgType").val());
                window.close();
            }
        }
    },

    getItemMaster : function(){
        icr.global.searchAjaxData = {
            itemCgSn : $("#itemCgSn").val()
        }
        var result = customKendo.fn_customAjax("/item/getItemCategoryOne", icr.global.searchAjaxData);
        if(result.flag){
            icr.global.duplicateFlag = false;
            $("#cgCode").val(result.rs.CATEGORY_CODE);
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
