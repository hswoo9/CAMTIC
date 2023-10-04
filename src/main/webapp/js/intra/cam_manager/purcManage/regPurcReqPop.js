var prp = {

    global : {
        radioGroupData : "",
        createHtmlStr : "",
        itemIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        crmSnId : "",
        crmNmId : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("purcReqDate", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["purcReqPurpose", "purcItemName0", "purcItemStd0", "purcItemUnitPrice0",
            "purcItemQty0", "purcItemUnit0", "purcItemAmt0", "crmNm0", "rmk0"]);

        prp.global.radioGroupData = [
            { label: "법인운영", value: "1" },
            { label: "교육사업", value: "2" },
            { label: "일자리사업", value: "3" },
            { label: "기능보간", value: "4" },
            { label: "지원사업", value: "5" },
            { label: "협의회", value: "6" },
        ]
        customKendo.fn_radioGroup("purcType", prp.global.radioGroupData, "horizontal");

        prp.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]

        customKendo.fn_dropDownList("purcItemType0", prp.global.dropDownDataSource, "text", "value", 2);

        if($("#purcSn").val()){
            prp.purcDataSet();
        }
    },

    setPurcReq : function(e){
        var formData = new FormData()
        formData.append("purcSn", $("#purcSn").val());
        formData.append("menuCd", "manage");
        formData.append("purcReqDate", $("#purcReqDate").val());
        formData.append("purcReqEmpSeq", $("#purcReqEmpSeq").val());
        formData.append("purcReqDeptSeq", $("#purcReqDeptSeq").val());
        formData.append("purcReqPurpose", $("#purcReqPurpose").val());
        formData.append("purcType", $("#purcType").data("kendoRadioGroup").value());
        formData.append("status", e);
        formData.append("empSeq", $("#purcReqEmpSeq").val());

        if($("#file1")[0].files.length == 1){
            formData.append("file1", $("#file1")[0].files[0]);
        }

        if($("#file2")[0].files.length == 1){
            formData.append("file2", $("#file2")[0].files[0]);
        }

        var itemArr = new Array()
        $.each($(".purcItemInfo"), function(i, v){
            var data = {
                purcItemSn : $(this).find("#purcItemSn" + i).val(),
                purcItemType : $("#purcItemType" + i).val(),
                purcItemName : $("#purcItemName" + i).val(),
                purcItemStd : $("#purcItemStd" + i).val(),
                purcItemUnitPrice : $("#purcItemUnitPrice" + i).val(),
                purcItemQty : $("#purcItemQty" + i).val(),
                purcItemUnit : $("#purcItemUnit" + i).val(),
                purcItemAmt : prp.uncomma($("#purcItemAmt" + i).val()),
                crmSn : $("#crmSn" + i).val(),
                rmk : $("#rmk" + i).val(),
                status : e,
                empSeq : $("#purcReqEmpSeq").val(),
            }

            itemArr.push(data);
        })

        formData.append("itemArr", JSON.stringify(itemArr))

        var result = customKendo.fn_customFormDataAjax("/manage/setPurcReq.do", formData);
        if(result.flag){
            alert("저장되었습니다.");
            opener.parent.prm.gridReload();
            window.close();
        }
    },

    setPurcReqStatusUpd : function(e){
        prp.global.saveAjaxData = {
            purcSn : $("#purcSn").val(),
            status : e
        }

        var result = customKendo.fn_customFormDataAjax("/manage/setPurcReqStatusUpd.do", prp.global.saveAjaxData);
        if(result.flag){
            alert("처리되었습니다.");
            opener.parent.prm.gridReload();
            window.close();
        }
    },

    addRow : function(){
        prp.global.createHtmlStr = "";

        prp.global.itemIndex++

        prp.global.createHtmlStr = "" +
            '<tr class="purcItemInfo newArray" id="item' + prp.global.itemIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="purcItemSn' + prp.global.itemIndex + '" class="purcItemSn">' +
                    '<input type="text" id="purcItemType' + prp.global.itemIndex + '" class="purcItemType">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemName' + prp.global.itemIndex + '" class="purcItemName">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemStd' + prp.global.itemIndex + '" class="purcItemStd">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemUnitPrice' + prp.global.itemIndex + '" class="purcItemUnitPrice" onkeydown="return onlyNumber(this)" onkeyup="removeChar(this);">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemQty' + prp.global.itemIndex + '" class="purcItemQty" onkeydown="return onlyNumber(this)" onkeyup="removeChar(this);">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemUnit' + prp.global.itemIndex + '" class="purcItemUnit">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemAmt' + prp.global.itemIndex + '" class="purcItemAmt"  onkeyup="prp.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="crmSn' + prp.global.itemIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + prp.global.itemIndex + '" class="crmNm" style="width: 70%"> ' +
                    '<button type="button" id="crmSelBtn' + prp.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" class="crmSelBtn" onclick="prp.fn_popCamCrmList(\'crmSn' + prp.global.itemIndex + '\',\'crmNm' + prp.global.itemIndex + '\');">업체 선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + prp.global.itemIndex + '" class="rmk">' +
                '</td>' +
                '<td></td>' +
                '<td>' +
                    '<button type="button" id="delRowBtn' + prp.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.delRow(this)">삭제</button>' +
                '</td>' +
            '</tr>';

        $("#purcItemTb").append(prp.global.createHtmlStr);

        prp.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]
        customKendo.fn_dropDownList("purcItemType" + prp.global.itemIndex, prp.global.dropDownDataSource, "text", "value", 2);

        customKendo.fn_textBox(["purcItemName" + prp.global.itemIndex, "purcItemStd" + prp.global.itemIndex,
                                "purcItemUnitPrice" + prp.global.itemIndex, "purcItemQty" + prp.global.itemIndex,
                                "purcItemUnit" + prp.global.itemIndex, "purcItemAmt" + prp.global.itemIndex,
                                "crmNm" + prp.global.itemIndex, "rmk" + prp.global.itemIndex])

    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?")){
            if($("." + $(e).closest("tr").attr("class")).length > 1){
                $(e).closest("tr").remove();
                prp.global.itemIndex--;
            }
        }
    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        prp.global.crmSnId = crmSnId;
        prp.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + prp.global.crmSnId).val($("#crmSn").val())
        $("#" + prp.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    purcDataSet : function(){
        prp.global.searchAjaxData = {
            purcSn : $("#purcSn").val()
        }

        var result = customKendo.fn_customAjax("/manage/getPurcReq.do", prp.global.searchAjaxData);
        if(result.flag){
            console.log(result);
            var data = result.data;
            $("#purcReqDate").val(data.PURC_REQ_DATE);
            $("#purcReqEmpSeq").val(data.PURC_REQ_EMP_SEQ);
            $("#purcReqEmpName").text(data.EMP_NAME_KR);
            $("#purcReqDeptSeq").val(data.DEPT_SEQ);
            $("#purcReqDeptName").text(data.DEPT_NAME);
            $("#purcReqPurpose").val(data.PURC_REQ_PURPOSE);
            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);

            $("#file1Sn").val(data.estFile.file_no);
            $("#file1Name").text(data.estFile.file_org_name + "." + data.estFile.file_ext);
            $("#file2Sn").val(data.reqFile.file_no);
            $("#file2Name").text(data.reqFile.file_org_name + "." + data.reqFile.file_ext);

            prp.purcItemDataSet(data.itemList);

            prp.purcBtnSet(data);
        }
    },

    purcItemDataSet : function(e){
        for(var i = 0; i < e.length; i++){
            if(i != 0){
                prp.addRow();
            }

            $("#item" + i).find("#purcItemSn" + i).val(e[i].PURC_ITEM_SN);
            $("#item" + i).find("#purcItemType" + i).data("kendoDropDownList").value(e[i].PURC_ITEM_TYPE);
            $("#item" + i).find("#purcItemName" + i).val(e[i].PURC_ITEM_NAME);
            $("#item" + i).find("#purcItemStd" + i).val(e[i].PURC_ITEM_STD);
            $("#item" + i).find("#purcItemUnitPrice" + i).val(e[i].PURC_ITEM_UNIT_PRICE);
            $("#item" + i).find("#purcItemQty" + i).val(e[i].PURC_ITEM_QTY);
            $("#item" + i).find("#purcItemUnit" + i).val(e[i].PURC_ITEM_UNIT);
            $("#item" + i).find("#purcItemAmt" + i).val(prp.comma(e[i].PURC_ITEM_AMT));
            $("#item" + i).find("#crmSn" + i).val(e[i].CRM_SN);
            $("#item" + i).find("#crmNm" + i).val(e[i].CRM_NM);
            $("#item" + i).find("#rmk" + i).val(e[i].CERT_CONTENT);
        }
    },

    purcBtnSet : function(data){
        if(data.STATUS == "C"){
            $("#reqBtn").hide();
            $("#saveBtn").hide();
            $("#reqCancelBtn").show();
        }
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    inputNumberFormat : function (obj){
        obj.value = prp.comma(prp.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    purcDrafting: function() {
        $("#purcDraftFrm").one("submit", function() {
            var url = "/popup/cam_manager/approvalFormPopup/purcApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_manager/approvalFormPopup/purcApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },
}