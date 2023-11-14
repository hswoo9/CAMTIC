var regPay = {

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
        customKendo.fn_textBox(["pjtNm", "appTitle", "accNm", "accNo", "bnkNm"]);

        $("#appCont").kendoTextArea({
            rows: 5,
        });

        regPay.global.radioGroupData = [
            { label: "지급신청서", value: "1" },
            { label: "여입신청서", value: "2" },
            { label: "반납신청서", value: "3" },
            { label: "대체신청서", value: "4" }
        ]
        customKendo.fn_radioGroup("payAppType", regPay.global.radioGroupData, "horizontal");

        regPay.global.radioGroupData = [
            { label: "없음", value: "N" },
            { label: "의무경비", value: "A" },
            { label: "고정경비", value: "B" },
            { label: "업무추진비", value: "C" }
        ]
        customKendo.fn_radioGroup("payAppStat", regPay.global.radioGroupData, "horizontal");

        $("#payAppType").data("kendoRadioGroup").value(1);
        $("#payAppStat").data("kendoRadioGroup").value("N")

        if($("#payAppSn").val() != ""){
            regPay.setData();

            regPay.fn_viewStat();
        }else{
            regPayDet.global.itemIndex += 1;
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
        let buttonHtml = "";
        if($("#status").val() != "rev"){
            if(data != null){
                if(data.DOC_STATUS == "0"){
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
                    buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.payAppDrafting()">상신</button>';
                }else if(data.DOC_STATUS == "10"){
                    buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
                }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
                    buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \''+data.DOC_MENU_CD+'\', \''+data.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
                }else if(data.DOC_STATUS == "100"){
                    buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', \''+data.DOC_MENU_CD+'\');">열람</button>';
                    $("#addBtn").hide();
                }else{
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
                }
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
            }
        }

        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#payAppBtnDiv").html(buttonHtml);
    },

    payAppDrafting: function(){
        let checked = 0;
        var data = {
            payAppSn : $("#payAppSn").val()
        }
        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var ls = result.list;
        for(var i=0; i < ls.length; i++) {
            var item = ls[i];
            var eviType = item.EVID_TYPE;
            if(item.ADVANCES == "Y"){
                continue;
            }
            if(eviType == "1" || eviType == "2"){
                if(item.FILE1 == null || item.FILE2 == null || item.FILE3 == null || item.FILE4 == null || item.FILE5 == null){
                    alert(item.CRM_NM + "의 필수 첨부파일이 등록되지 않았습니다.");
                    checked = 1;
                    break;
                }
            }else if(eviType == "3"){
                if(item.FILE6 == null || item.FILE7 == null || item.FILE8 == null || item.FILE9 == null){
                    alert(item.CRM_NM + "의 필수 첨부파일이 등록되지 않았습니다.");
                    checked = 1;
                    break;
                }
            }else if(eviType == "5"){
                if(item.FILE10 == null){
                    alert(item.CRM_NM + "의 필수 첨부파일이 등록되지 않았습니다.");
                    checked = 1;
                    break;
                }
            }
        }
        if(checked == 1){
            return;
        }

        $("#payAppDraftFrm").one("submit", function() {
            var url = "/popup/payApp/approvalFormPopup/payAppApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/payApp/approvalFormPopup/payAppApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    setData : function (){
        var data = {
            payAppSn : $("#payAppSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;

        regPay.payAppBtnSet(rs);
        console.log(ls);

        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE)
        $("#appDe").val(rs.APP_DE)
        $("#pjtNm").val(rs.PJT_NM)
        $("#pjtSn").val(rs.PJT_SN)
        // $("#budgetNm").val(rs.BUDGET_NM)
        // $("#budgetSn").val(rs.BUDGET_SN)
        $("#appTitle").val(rs.APP_TITLE)
        $("#appCont").val(rs.APP_CONT)

        $("#bnkSn").val(rs.BNK_SN)
        $("#bnkNm").val(rs.BNK_NM)
        $("#accNm").val(rs.ACC_NM)
        $("#accNo").val(rs.ACC_NO)
        $("#payAppStat").data("kendoRadioGroup").value(rs.PAY_APP_STAT)

        if(ls.length > 0){
            $("#payDestTb").html("");
        }
        for(var i=0; i < ls.length; i++) {
            var item = ls[i];

            regPayDet.global.createHtmlStr = "";

            regPayDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regPayDet.global.itemIndex + '" style="text-align: center;">';
            if($("#status").val() == "rev"){
                if(item.DET_STAT != "N"){
                    regPayDet.global.createHtmlStr += "" +
                        '   <td><input type="checkbox" id="check' + regPayDet.global.itemIndex + '" value='+item.PAY_APP_DET_SN+' style="position: relative; top: 5px;" class="check" /></td>';
                } else {
                    regPayDet.global.createHtmlStr += "" +
                        '   <td></td>';
                }
            }

            var clIdx = regPayDet.global.itemIndex;

            regPayDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" value="'+item.BUDGET_NM+'" onclick="regPay.fn_budgetPop('+clIdx+')" style="width: 100%;">' +
                '       <input type="hidden" id="budgetSn' + regPayDet.global.itemIndex + '" value="'+item.BUDGET_SN+'" />' +
                '   </td>' +
                '   <td>' +
                '       <input type="hidden" id="payDestSn' + regPayDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                '       <input type="text" id="eviType' + regPayDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmNm' + regPayDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                '       <input type="hidden" id="trCd' + regPayDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmBnkNm' + regPayDet.global.itemIndex + '" value="'+item.CRM_BNK_NM+'" class="crmBnkNm">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmAccNo' + regPayDet.global.itemIndex + '" value="'+item.CRM_ACC_NO+'" class="crmAccNo">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmAccHolder' + regPayDet.global.itemIndex + '" value="'+item.CRM_ACC_HOLDER+'" class="crmAccHolder">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="trDe' + regPayDet.global.itemIndex + '" value="'+item.TR_DE+'" class="trDe">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="totCost' + regPayDet.global.itemIndex + '" value="'+regPay.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="supCost' + regPayDet.global.itemIndex + '" value="'+regPay.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="vatCost' + regPayDet.global.itemIndex + '" value="'+regPay.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" disabled id="card' + regPayDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                '       <input type="hidden" id="cardNo' + regPayDet.global.itemIndex + '" value="'+item.CARD_NO+'" class="cardNo">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" value="'+item.ETC+'" class="etc">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="iss' + regPayDet.global.itemIndex + '" value="'+item.ISS+'"  class="iss">' +
                '   </td>' +
                '   <td>' +
                '       <input type="checkbox" id="advances' + regPayDet.global.itemIndex + '" class="advances" style="width: 26px; height: 26px" ';
                if(item.ADVANCES == "Y"){
                    regPayDet.global.createHtmlStr += "checked";
                }
                regPayDet.global.createHtmlStr += '/>' +
                '   </td>' +
                '   <td>' +
                '       <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regPayDet.fn_regPayAttPop(' + regPayDet.global.itemIndex + ')">첨부</button>' +
                '   </td>' +
                '   <td>' +
                '       <div style="text-align: center">';
                if($("#status").val() == "rev"){
                    regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="revertBtn' + regPayDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" onclick="regPayDet.fn_revertDet(this)">반려</button>';
                } else {
                    if(rs.DOC_STATUS == "0"){
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(this)">삭제</button>';
                    } else {
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(this)" disabled>삭제</button>';
                    }
                }
                regPayDet.global.createHtmlStr += '</div>' +
                    '   </td>'
                '</tr>';

            $("#payDestTb").append(regPayDet.global.createHtmlStr);

            if(item.DET_STAT == "N"){
                $("#revertBtn"+ regPayDet.global.itemIndex).css("display", "none");
                $("#pay"+ regPayDet.global.itemIndex).css("background-color", "#afafaf");
            }

            var itemIndex = regPayDet.global.itemIndex;
            $("#eviType" + itemIndex).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "선택", value: "" },
                    { text: "세금계산서", value: "1" },
                    { text: "계산서", value: "2" },
                    { text: "신용카드", value: "3" },
                    { text: "직원지급", value: "4" },
                    { text: "소득신고자", value: "5" },
                    { text: "기타", value: "6" },
                ],
                index: 0,
                change : function (e){
                    var value = $("#eviType" + itemIndex).val();

                    if(value != ""){
                        if(value == "6"){
                            alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                        } else {
                            regPayDet.fn_popRegDet(value, itemIndex);
                        }
                    }
                }
            });

            customKendo.fn_textBox(["crmNm" + regPayDet.global.itemIndex, "crmBnkNm"  + regPayDet.global.itemIndex
                , "crmAccHolder" + regPayDet.global.itemIndex, "iss" + regPayDet.global.itemIndex
                , "crmAccNo" + regPayDet.global.itemIndex, "totCost" + regPayDet.global.itemIndex
                , "supCost" + regPayDet.global.itemIndex, "vatCost" + regPayDet.global.itemIndex
                ,"card" + regPayDet.global.itemIndex, "etc" + regPayDet.global.itemIndex, "budgetNm" + regPayDet.global.itemIndex]);

            customKendo.fn_datePicker("trDe" + regPayDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

            $("#eviType" + itemIndex).data("kendoDropDownList").value(1);



            regPayDet.global.itemIndex++;

        }

        if(ls.length > 0){
            regPayDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");
    },

    fn_viewStat: function (){
        var stat = $("#status").val();

        if(stat == "rev"){
            $("#payAppType").data("kendoRadioGroup").enable(false);
            $("#payAppStat").data("kendoRadioGroup").enable(false);
            $("#appDe").data("kendoDatePicker").enable(false);
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#addBtn").css("display", "none");
            $("#exnpAddBtn").css("display", "");
            $("#titleStat").text("검토")
        }
    },

    fn_save : function (){
        var parameters = {
            payAppType : $("#payAppType").data("kendoRadioGroup").value(),
            appDe : $("#appDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            // budgetNm : $("#budgetNm").val(),
            // budgetSn : $("#budgetSn").val(),
            appTitle : $("#appTitle").val(),
            appCont : $("#appCont").val(),
            bnkSn : $("#bnkSn").val(),
            bnkNm : $("#bnkNm").val(),
            accNm : $("#accNm").val(),
            accNo : $("#accNo").val(),
            payAppStat : $("#payAppStat").data("kendoRadioGroup").value(),

            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#payAppSn").val() != ""){
            parameters.payAppSn = $("#payAppSn").val();
        }

        var itemArr = new Array()
        var flag = true;
        $.each($(".payDestInfo"), function(i, v){
            var data = {
                budgetNm : $("#budgetNm" + i).val(),
                budgetSn : $("#budgetSn" + i).val(),
                evidType : $("#eviType" + i).val(),
                crmNm : $("#crmNm" + i).val(),
                trCd : $("#trCd" + i).val(),
                crmBnkNm : $("#crmBnkNm" + i).val(),
                crmAccNo : $("#crmAccNo" + i).val(),
                crmAccHolder : $("#crmAccHolder" + i).val(),
                trDe : $("#trDe" + i).val(),
                totCost : regPay.uncomma($("#totCost" + i).val()),
                supCost : regPay.uncomma($("#supCost" + i).val()),
                vatCost : regPay.uncomma($("#vatCost" + i).val()),
                card : $("#card" + i).val(),
                cardNo : $("#cardNo" + i).val(),
                etc : $("#etc" + i).val(),
                iss : $("#iss" + i).val(),
                advances : $("#advances" + i).is(':checked') ? "Y" : "N",
            }

            if(data.eviType == ""){
                flag = false;
            }


            itemArr.push(data);
        })

        if(!flag){
            alert("구분값을 선택해주세요.");
            return ;
        }

        parameters.itemArr = JSON.stringify(itemArr);

        console.log(parameters);

        $.ajax({
            url : "/payApp/payAppSetData",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    location.href="/payApp/pop/regPayAppPop.do?payAppSn=" + rs.params.payAppSn;
                }
            }
        });
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId)

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regPay.global.crmSnId = crmSnId;
        regPay.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regPay.global.crmSnId).val($("#crmSn").val())
        $("#" + regPay.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost: function(obj){

        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){
            $("#vatCost" + index).val(regPay.comma(Math.round(Number(regPay.uncomma($("#totCost" + index).val())) / 10)));
            $("#supCost" + index).val(regPay.comma(Number(regPay.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regPay.comma(Number(regPay.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regPay.comma(Number(regPay.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#vatCost" + index).val()))));
        }

        regPay.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = regPay.comma(regPay.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_projectPop : function (){

        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (idx){
        if($("#pjtSn").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        var url = "/mng/pop/budgetView.do?pjtSn=" + $("#pjtSn").val() + "&idx=" + idx;

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


var regPayDet = {

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
                { text: "세금계산서", value: "1" },
                { text: "계산서", value: "2" },
                { text: "신용카드", value: "3" },
                { text: "직원지급", value: "4" },
                { text: "소득신고자", value: "5" },
                { text: "기타", value: "6" },
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType0").val();
                var itemIndex = 0;

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else {
                        regPayDet.fn_popRegDet(value, itemIndex);
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
        regPayDet.global.createHtmlStr = "";
        var clIdx = regPayDet.global.itemIndex;
        alert(regPayDet.global.itemIndex);



        regPayDet.global.createHtmlStr = "" +
            '<tr class="payDestInfo newArray" id="pay' + regPayDet.global.itemIndex + '" style="text-align: center;">' +
            '   <td>' +
            '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" value="" onclick="regPay.fn_budgetPop(' + clIdx + ')" style="width: 100%;">' +
            '       <input type="hidden" id="budgetSn' + regPayDet.global.itemIndex + '" value="" />' +
            '   </td>' +
            '   <td>' +
            '       <input type="hidden" id="payDestSn' + regPayDet.global.itemIndex + '" name="payDestSn" class="payDestSn">' +
            '       <input type="text" id="eviType' + regPayDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmNm' + regPayDet.global.itemIndex + '" class="crmNm">' +
            '       <input type="hidden" id="trCd' + regPayDet.global.itemIndex + '" class="trCd">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmBnkNm' + regPayDet.global.itemIndex + '" class="crmBnkNm">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmAccNo' + regPayDet.global.itemIndex + '" class="crmAccNo">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmAccHolder' + regPayDet.global.itemIndex + '" class="crmAccHolder">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="trDe' + regPayDet.global.itemIndex + '" class="trDe">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="totCost' + regPayDet.global.itemIndex + '" value="0" class="totCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="supCost' + regPayDet.global.itemIndex + '" value="0" class="supCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="vatCost' + regPayDet.global.itemIndex + '" value="0" class="vatCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" disabled id="card' + regPayDet.global.itemIndex + '" class="card">' +
            '       <input type="hidden" id="cardNo' + regPayDet.global.itemIndex + '" class="cardNo">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" class="etc">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="iss' + regPayDet.global.itemIndex + '" class="iss">' +
            '   </td>' +
            '   <td>' +
            '       <input type="checkbox" id="advances' + regPayDet.global.itemIndex + '" class="advances" style="width: 26px; height: 26px">' +
            '   </td>' +
            '   <td>' +
            '       <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regPayDet.fn_regPayAttPop(' + regPayDet.global.itemIndex+1 + ')">첨부</button>' +
            '   </td>' +
            '   <td>' +
            '       <div style="text-align: center">' +
            '           <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(this)">삭제</button>' +
            '       </div>' +
            '   </td>'
            '</tr>';

        $("#payDestTb").append(regPayDet.global.createHtmlStr);

        var itemIndex = regPayDet.global.itemIndex;
        $("#eviType" + regPayDet.global.itemIndex).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "세금계산서", value: "1" },
                { text: "계산서", value: "2" },
                { text: "신용카드", value: "3" },
                { text: "직원지급", value: "4" },
                { text: "소득신고자", value: "5" },
                { text: "기타", value: "6" },
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType" + itemIndex).val();

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else {
                        regPayDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm" + regPayDet.global.itemIndex, "crmBnkNm"  + regPayDet.global.itemIndex
                                , "crmAccHolder" + regPayDet.global.itemIndex, "iss" + regPayDet.global.itemIndex
                                , "crmAccNo" + regPayDet.global.itemIndex, "totCost" + regPayDet.global.itemIndex
                                , "supCost" + regPayDet.global.itemIndex, "vatCost" + regPayDet.global.itemIndex
                                ,"card" + regPayDet.global.itemIndex, "etc" + regPayDet.global.itemIndex, "budgetNm" + regPayDet.global.itemIndex]);

        customKendo.fn_datePicker("trDe" + regPayDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

        regPayDet.global.itemIndex++;
    },

    delRow : function (){
        if($(".payDestInfo").length > 1){
            $("#pay" + regPayDet.global.itemIndex).remove();
            regPayDet.global.itemIndex--;
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
        regPayDet.fn_regExnpPop(keyArr, payAppSn);
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
            alert("지급신청서 최초 1회 저장 후 진행 가능합니다.");
            return;
        }
        let eviType = $("#eviType"+row).data("kendoDropDownList").value();
        var url = "/payApp/pop/regPayAttPop.do?payDestSn=" + key + "&eviType=" + eviType;

        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    }
}

