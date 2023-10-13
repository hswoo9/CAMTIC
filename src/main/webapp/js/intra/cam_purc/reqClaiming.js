var reqCl = {




    fn_defaultScript: function (){

        customKendo.fn_textBox(["pjtNm", "purcDeptName", "purcEmpName", "claimEtc"
                                ,"claimTitle", "purcReqPurpose", "crmNm"
                                ,"estAmt", "vatAmt", "totAmt", "itemNm", "itemStd"
                                ,"itemEa", "itemUnitAmt", "itemUnit", "itemAmt", "itemEtc"])

        var radioDataSource = [
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
            { label: "기타", value: "" },
        ]

        var radioExpDataSource = [
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
            { label: "기타", value: "" },
        ]

        var radioVatDataSource = [
            { label: "부가세 포함", value: "Y" },
            { label: "부가세 미포함", value: "N" },
            { label: "면세", value: "D" },
        ]

        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]

        customKendo.fn_radioGroup("purcType", radioDataSource, "horizontal");
        customKendo.fn_radioGroup("expType", radioExpDataSource, "horizontal");
        customKendo.fn_radioGroup("vat", radioVatDataSource, "horizontal");
        customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");

        $("input[name='purcType']").click(function(){
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
            } else {
                $("#project").css("display", "none");
                $("#pjtSn").val("");
                $("#pjtNm").val("");
            }
        });

        customKendo.fn_datePicker("claimDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("expDe", "month", "yyyy-MM-dd", new Date());

        var parameters = {
            purcEmpSeq : $("#purcEmpSeq").val(),
            purcDeptSeq : $("#purcDeptSeq").val(),
            purcEmpName : $("#purcEmpName").val(),
            purcDeptName : $("#purcDeptName").val(),
            claimDe : $("#claimDe").val(),
            expDe : $("#expDe").val(),
            purcType : $("#purcType").data("kendoRadioGroup").value(),
            pjtSn : $("#pjtSn").val(),
            pjtNm : $("#pjtNm").val(),
            expType : $("#expType").data("kendoRadioGroup").value(),
            claimEtc : $("#claimEtc").val(),
            loginEmpSeq : $("#loginEmpSeq").val(),
            claimTitle : $("#claimTitle").val(),
            purcReqPurpose : $("#purcReqPurpose").val(),
            crmSn : $("#crmSn").val(),
            crmNm : $("#crmNm").val(),
            vat : $("#vat").data("kendoRadioGroup").val(),

            itemNm : $("#itemNm").val(),
            itemStd : $("#itemStd").val(),
            itemEa : $("#itemEa").val(),
            itemUnitAmt : $("#itemUnitAmt").val(),
            itemUnit : $("#itemUnit").val(),
            itemAmt : $("#itemAmt").val(),
            itemEtc : $("#itemEtc").val(),
            prodCd : $("#prodCd").data("kendoRadioGroup").val(),
        }
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_calc : function (idx, e){
        $("#itemAmt" + idx).val(comma(uncomma($("#itemUnitAmt" + idx).val()) * uncomma($("#itemEa" + idx).val())));

        return inputNumberFormat(e);
    },

    addRow: function (){
        var len = $("#claimTbody > tr").length;
        var html = '';

        html += '<tr class="claimItem newArray" id="item'+len+'">';
        html += '   <td style="text-align: center">' +
            '           <div id="claimIndex">'+(len + 1)+'</div>' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemNm'+len+'" class="itemNm">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemStd'+len+'" class="itemStd">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemEa'+len+'" style="text-align: right" class="itemEa" onkeyup="reqCl.fn_calc(\''+len+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemUnitAmt'+len+'" style="text-align: right" class="itemUnitAmt" onkeyup="reqCl.fn_calc(\''+len+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemUnit'+len+'" class="itemUnit">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemAmt'+len+'" class="itemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <label for="itemEtc'+len+'"></label><input type="text" id="itemEtc'+len+'" class="itemEtc">' +
            '       </td>' +
            '       <td>' +
            '           <span id="prodCd'+len+'"></span>' +
            '       </td>' +
            '       <td style="text-align: center">' +
            '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
            '               <span class="k-button-text">삭제</span>' +
            '           </button>' +
            '       </td>';
        html += '</tr>';

        $("#claimTbody").append(html);

        customKendo.fn_textBox(["itemNm" + len, "itemStd" + len
            ,"itemEa" + len, "itemUnitAmt" + len, "itemUnit" + len, "itemAmt" + len, "itemEtc" + len])

        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]

        customKendo.fn_radioGroup("prodCd" + len, radioProdDataSource, "horizontal");
    },

    fn_delete: function (e){

    }
}