var regIncmRe = {

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
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["pjtNm", "accNm", "accNo", "bnkNm", "budgetNm", "exnpEmpNm", "exnpDeptNm"]);

        $("#appCont").kendoTextArea({
            rows: 5,
        });

        regIncmRe.global.radioGroupData = [
            { label: "없음", value: "N" },
            { label: "의무경비", value: "A" },
            { label: "고정경비", value: "B" },
            { label: "업무추진비", value: "C" }
        ]
        // customKendo.fn_radioGroup("payAppStat", regIncmRe.global.radioGroupData, "horizontal");

        $("#busnCd, #busnExCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: ""},
                { text: "1000", value: "1000" },
                { text: "2000", value: "2000" },
                { text: "3000", value: "3000" },
                { text: "4000", value: "4000" },
                { text: "5000", value: "5000" },
                { text: "6000", value: "6000" },
                { text: "7000", value: "7000" },
            ]
        });

        $("#g20DeptCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "부서선택", value: ""},
                { text: "1000 - 임원 (임원)", value: "1000" },
                { text: "2000 - 목적사업 (목적사업)", value: "2000" },
                { text: "3000 - 연구개발 (연구개발)", value: "3000" },
                { text: "4000 - 개발사업 (개발사업)", value: "4000" },
                { text: "5000 - 운영사업 (운영사업)", value: "5000" },
                { text: "6000 - 경비실 (경비실)", value: "6000" },
                { text: "7000 - 특수사업 (특수사업)", value: "7000" },
            ]
        });

        // $("#payAppStat").data("kendoRadioGroup").value("N")

        if($("#payIncpSn").val() != ""){
            regIncmRe.setData();

            regIncmRe.fn_viewStat();
        }else{
            regIncmDet.global.itemIndex += 1;
        }

        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[type='checkbox']").prop("checked", true);
            }else{
                $("input[type='checkbox']").prop("checked", false);
            }
        })
    },

    payAppBtnSet: function (data){
        console.log(data);
        let buttonHtml = "";
        if(data.RE_STAT == "N"){
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncmRe.fn_save()">반제결의서 승인</button>';
        } else {
            buttonHtml += '<button type="button" id="cancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="regIncmRe.fn_regExnpCancel('+data.PAY_INCP_SN+')">반제결의서 승인 취소</button>';
        }

        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#payAppBtnDiv").html(buttonHtml);
    },

    fn_save : function (){
        var parameters = {
            payIncpSn : $("#payIncpSn").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            empSeq : $("#regEmpSeq").val()
        }

        if(!confirm("승인하시겠습니까?")){
            return ;
        }

        const result = customKendo.fn_customAjax("/pay/resolutionIncpAppr", parameters);
        if(result.flag){
            if(result.code == 200){
                alert("승인이 완료되었습니다.");
                try {
                    opener.incomeReList.gridReload();
                }catch{
                    // alert("새로 고침중 오류가 발생하였습니다.");
                }
                window.close();
            }else{
                alert("ERP 연동 중 오류가 발생하였습니다.");
            }
        }
    },

    fn_regExnpCancel : function (payIncpSn) {

        if(!confirm("수입 반제결의서 승인을 취소하시겠습니까?")){
            return;
        }

        var data = {
            payIncpSn : payIncpSn,
        }

        $.ajax({
            url : "/payApp/regIncpCancel",
            type : "POST",
            data: data,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("승인이 취소되었습니다.");
                    location.reload()
                }
            }
        });
    },

    payIncpDrafting: function(){
        $("#payIncpDraftFrm").one("submit", function() {
            var url = "/popup/exnp/approvalFormPopup/payIncpApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/exnp/approvalFormPopup/payIncpApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    setData : function (){
        var data = {
            payIncpSn : $("#payIncpSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayIncpData", data);
        var rs = result.map;
        var ls = result.list;

        // debugger
        // if($("#payIncpReSn").val() != ""){
        //     regIncmRe.payAppBtnSet(rs);
        // }
        console.log(ls);

        $("#appDe").val(rs.APP_DE);
        $("#pjtNm").val(rs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN);
        $("#pjtCd").val(rs.PJT_CD);
        $("#budgetNm").val(rs.BUDGET_NM);
        $("#budgetSn").val(rs.BUDGET_SN);
        $("#appCont").val(rs.APP_CONT);
        $("#busnCd").data("kendoDropDownList").value(rs.BUSN_CD);
        $("#busnExCd").data("kendoDropDownList").value(rs.BUSN_EX_CD);

        $("#bnkSn").val(rs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM);
        $("#accNm").val(rs.ACC_NM);
        $("#accNo").val(rs.ACC_NO);
        // $("#payAppStat").data("kendoRadioGroup").value(rs.PAY_APP_STAT);

        if(ls.length > 0){
            $("#payDestTb").html("");
        }
        for(var i=0; i < ls.length; i++) {
            var item = ls[i];

            regIncmDet.global.createHtmlStr = "";

            regIncmDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regIncmDet.global.itemIndex + '" style="text-align: center;">';
            if($("#status").val() == "rev"){
                if(item.DET_STAT != "N"){
                    regIncmDet.global.createHtmlStr += "" +
                        '   <td><input type="checkbox" id="check' + regIncmDet.global.itemIndex + '" value='+item.PAY_APP_DET_SN+' style="position: relative; top: 5px;" class="check" /></td>';
                } else {
                    regIncmDet.global.createHtmlStr += "" +
                        '   <td></td>';
                }
            }

            var clIdx = regIncmDet.global.itemIndex;

            regIncmDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <input type="hidden" id="payDestSn' + regIncmDet.global.itemIndex + '" value="'+item.PAY_INCP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                '       <input type="text" id="eviType' + regIncmDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmNm' + regIncmDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                '       <input type="hidden" id="trCd' + regIncmDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="etc' + regIncmDet.global.itemIndex + '" value="'+item.ETC+'" class="etc">' +
                '   </td>' +

                '   <td>' +
                '       <input type="text" id="trDe' + regIncmDet.global.itemIndex + '" value="'+item.TR_DE+'" class="trDe">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="totCost' + regIncmDet.global.itemIndex + '" value="'+regIncmRe.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regIncmRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="supCost' + regIncmDet.global.itemIndex + '" value="'+regIncmRe.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regIncmRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="vatCost' + regIncmDet.global.itemIndex + '" value="'+regIncmRe.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regIncmRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" disabled id="card' + regIncmDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                '       <input type="hidden" id="cardNo' + regIncmDet.global.itemIndex + '" value="'+item.CARD_NO+'" class="cardNo">' +
                '   </td>' +

                '   <td>' +
                '       <input type="text" id="iss' + regIncmDet.global.itemIndex + '" value="'+item.ISS+'"  class="iss" style="display: none;">' +
                '   </td>' +

                '   <td>' +
                '       <div style="text-align: center">';
            if($("#status").val() == "rev"){
                regIncmDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="revertBtn' + regIncmDet.global.itemIndex + '" value="'+item.PAY_INCP_DET_SN+'" onclick="regIncmDet.fn_revertDet(this)">반려</button>';
            } else {
                if(rs.DOC_STATUS == "0"){
                    regIncmDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regIncmDet.delRow(' + regIncmDet.global.itemIndex + ')">삭제</button>';
                } else {
                    regIncmDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regIncmDet.delRow(' + regIncmDet.global.itemIndex + ')" disabled>삭제</button>';
                }
            }
            regIncmDet.global.createHtmlStr += '</div>' +
                '   </td>'+
                '</tr>';

            $("#payDestTb").append(regIncmDet.global.createHtmlStr);

            if(item.DET_STAT == "N"){
                $("#revertBtn"+ regIncmDet.global.itemIndex).css("display", "none");
                $("#pay"+ regIncmDet.global.itemIndex).css("background-color", "#afafaf");
            }

            var itemIndex = regIncmDet.global.itemIndex;
            $("#eviType" + itemIndex).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "선택", value: "" },
                    { text: "세금계산서(청구)", value: "1" },
                    { text: "세금계산서(영수)", value: "2" },
                    { text: "계산서(청구)", value: "3" },
                    { text: "계산서(영수)", value: "4" },
                    { text: "신용카드(과세)", value: "5" },
                    { text: "신용카드(면세)", value: "6" },
                    { text: "증빙없음", value: "7" },
                ],
                index: 0,
                change : function (e){
                    var value = $("#eviType" + itemIndex).val();

                    if(value != ""){
                        if(value == "7"){
                            alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                        } else {
                            if(value == "1" || value == "2"){
                                value = 1;
                            } else if(value == "3" || value == "4") {
                                value = 2;
                            } else if(value == "5" || value == "6"){
                                value = 3;
                            }
                            regIncmDet.fn_popRegDet(value, itemIndex);
                        }
                    }
                }
            });

            customKendo.fn_textBox(["crmNm" + regIncmDet.global.itemIndex, "crmBnkNm"  + regIncmDet.global.itemIndex
                , "crmAccHolder" + regIncmDet.global.itemIndex, "iss" + regIncmDet.global.itemIndex
                , "crmAccNo" + regIncmDet.global.itemIndex, "totCost" + regIncmDet.global.itemIndex
                , "supCost" + regIncmDet.global.itemIndex, "vatCost" + regIncmDet.global.itemIndex
                ,"card" + regIncmDet.global.itemIndex, "etc" + regIncmDet.global.itemIndex, "budgetNm" + regIncmDet.global.itemIndex]);

            customKendo.fn_datePicker("trDe" + regIncmDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

            $("#eviType" + itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);

            regIncmDet.global.itemIndex++;
        }

        if(ls.length > 0){
            //regIncmDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");
    },

    fn_viewStat: function (){
        var stat = $("#status").val();

        if(stat == "rev"){
            // $("#payAppStat").data("kendoRadioGroup").enable(false);
            $("#appDe").data("kendoDatePicker").enable(false);
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#addBtn").css("display", "none");
            $("#exnpAddBtn").css("display", "");
            $("#titleStat").text("검토")
        }
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId)

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regIncmRe.global.crmSnId = crmSnId;
        regIncmRe.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regIncmRe.global.crmSnId).val($("#crmSn").val())
        $("#" + regIncmRe.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost: function(obj){

        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){

            $("#vatCost" + index).val(regIncmRe.comma(Number(regIncmRe.uncomma($("#totCost" + index).val())) - Math.round(Number(regIncmRe.uncomma($("#totCost" + index).val())) * 100 / 110)));
            $("#supCost" + index).val(regIncmRe.comma(Number(regIncmRe.uncomma($("#totCost" + index).val())) - Number(regIncmRe.uncomma($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regIncmRe.comma(Number(regIncmRe.uncomma($("#totCost" + index).val())) - Number(regIncmRe.uncomma($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regIncmRe.comma(Number(regIncmRe.uncomma($("#totCost" + index).val())) - Number(regIncmRe.uncomma($("#vatCost" + index).val()))));
        }

        regIncmRe.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = regIncmRe.comma(regIncmRe.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_projectPop : function (type){

        var url = "/project/pop/projectView.do?type=" + type;

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        /** 추후 temp변수명 수정 예정 */
        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&idx=N&status=incp";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function (){
        var url = "/mng/pop/bankView.do";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


}


var regIncmDet = {

    global : {
        itemIndex : 0,
        createHtmlStr : "",
    },

    fn_defaultScript : function (){
        $("#eviType0").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "세금계산서(청구)", value: "1" },
                { text: "세금계산서(영수)", value: "2" },
                { text: "계산서(청구)", value: "3" },
                { text: "계산서(영수)", value: "4" },
                { text: "신용카드(과세)", value: "5" },
                { text: "신용카드(면세)", value: "6" },
                { text: "증빙없음", value: "7" },
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType0").val();
                var itemIndex = 0;

                if(value != ""){
                    if(value == "7"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else {
                        if(value == "1" || value == "2"){
                            value = 1;
                        } else if(value == "3" || value == "4") {
                            value = 2;
                        } else if(value == "5" || value == "6"){
                            value = 3;
                        }
                        regIncmDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
            ,"card0", "etc0", "iss0", "budgetNm0"]);

        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

    },

    fn_popRegDet : function (v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


    addRow : function () {
        regIncmDet.global.createHtmlStr = "";
        var clIdx = regIncmDet.global.itemIndex;

        regIncmDet.global.createHtmlStr = "" +
            '<tr class="payDestInfo newArray" id="pay' + regIncmDet.global.itemIndex + '" style="text-align: center;">' +

            '   <td>' +
            '       <input type="hidden" id="payDestSn' + regIncmDet.global.itemIndex + '" name="payDestSn" class="payDestSn">' +
            '       <input type="text" id="eviType' + regIncmDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmNm' + regIncmDet.global.itemIndex + '" class="crmNm">' +
            '       <input type="hidden" id="trCd' + regIncmDet.global.itemIndex + '" class="trCd">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="etc' + regIncmDet.global.itemIndex + '" class="etc">' +
            '   </td>' +

            '   <td>' +
            '       <input type="text" id="trDe' + regIncmDet.global.itemIndex + '" class="trDe">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="totCost' + regIncmDet.global.itemIndex + '" value="0" class="totCost" style="text-align: right" onkeyup="regIncmRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="supCost' + regIncmDet.global.itemIndex + '" value="0" class="supCost" style="text-align: right" onkeyup="regIncmRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="vatCost' + regIncmDet.global.itemIndex + '" value="0" class="vatCost" style="text-align: right" onkeyup="regIncmRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" disabled id="card' + regIncmDet.global.itemIndex + '" class="card">' +
            '       <input type="hidden" id="cardNo' + regIncmDet.global.itemIndex + '" class="cardNo">' +
            '   </td>' +

            '   <td>' +
            '       <input type="text" id="iss' + regIncmDet.global.itemIndex + '" class="iss">' +
            '   </td>' +

            '   <td>' +
            '       <div style="text-align: center">' +
            '           <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regIncmDet.delRow(' + regIncmDet.global.itemIndex + ')">삭제</button>' +
            '       </div>' +
            '   </td>'
        '</tr>';

        $("#payDestTb").append(regIncmDet.global.createHtmlStr);

        var itemIndex = regIncmDet.global.itemIndex;
        $("#eviType" + regIncmDet.global.itemIndex).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "세금계산서(청구)", value: "1" },
                { text: "세금계산서(영수)", value: "2" },
                { text: "계산서(청구)", value: "3" },
                { text: "계산서(영수)", value: "4" },
                { text: "신용카드(과세)", value: "5" },
                { text: "신용카드(면세)", value: "6" },
                { text: "증빙없음", value: "7" },
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType" + itemIndex).val();

                if(value != ""){
                    if(value == "7"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else {
                        if(value == "1" || value == "2"){
                            value = 1;
                        } else if(value == "3" || value == "4") {
                            value = 2;
                        } else if(value == "5" || value == "6"){
                            value = 3;
                        }
                        regIncmDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm" + regIncmDet.global.itemIndex, "crmBnkNm"  + regIncmDet.global.itemIndex
            , "crmAccHolder" + regIncmDet.global.itemIndex, "iss" + regIncmDet.global.itemIndex
            , "crmAccNo" + regIncmDet.global.itemIndex, "totCost" + regIncmDet.global.itemIndex
            , "supCost" + regIncmDet.global.itemIndex, "vatCost" + regIncmDet.global.itemIndex
            ,"card" + regIncmDet.global.itemIndex, "etc" + regIncmDet.global.itemIndex, "budgetNm" + regIncmDet.global.itemIndex]);

        customKendo.fn_datePicker("trDe" + regIncmDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

        regIncmDet.global.itemIndex++;
    },

    delRow : function (row){
        if($(".payDestInfo").length > 1){
            $("#pay" + row).remove();
            /*regIncmDet.global.itemIndex--;*/
        }
    },

    fn_revertDet : function(obj){
        if(!confirm("반려하시겠습니까?")){
            return ;
        }

        var data = {
            payAppDetSn : obj.value
        }

        $.ajax({
            url : "/payApp/setPayAppDetData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("반려되었습니다.");

                    location.reload();
                }
            }
        })
    },

    fn_exnpAdd : function (){

        if(!confirm("지출결의를 작성하시겠습니까?")) {
            return;
        }

        if($(".check:checked").length == 0){
            alert("선택된 값이 없습니다.");
            return ;
        }

        var keyArr = "";
        $(".check:checked").each(function(){
            keyArr += $(this).val() + ",";
        });

        keyArr = keyArr.substring(0, keyArr.length - 1);

        var payAppSn = $("#payAppSn").val();

        if($("#payAppSn").val() == ""){
            alert("시스템 오류가 발생하였습니다.");
            return;
        }
        regIncmDet.fn_regExnpPop(keyArr, payAppSn);
        window.close();
    },

    fn_regExnpPop : function (keyArr, key){

        var url = "/payApp/pop/regExnpPop.do?item=" + keyArr + "&payAppSn=" + key;

        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regPayAttPop : function (row){
        let key = $("#payDestSn"+row).val();
        if(key == "" || key == null){
            alert("상호 최초 1회 저장 후 진행 가능합니다.");
            return;
        }
        let eviType = $("#eviType"+row).data("kendoDropDownList").value();
        var url = "/payApp/pop/regPayAttPop.do?payDestSn=" + key + "&eviType=" + eviType;

        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    }
}

