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
        customKendo.fn_textBox(["pjtNm", "budgetNm", "appTitle", "accNm", "accNo", "bnkNm"]);

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
        }
    },

    setData : function (){
        var data = {
            payAppSn : $("#payAppSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;

        console.log(ls);

        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE)
        $("#appDe").val(rs.APP_DE)
        $("#pjtNm").val(rs.PJT_NM)
        $("#pjtSn").val(rs.PJT_SN)
        $("#budgetNm").val(rs.BUDGET_NM)
        $("#budgetSn").val(rs.BUDGET_SN)
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

            regPayDet.global.createHtmlStr = "" +
                '<tr class="payDestInfo newArray" id="pay' + regPayDet.global.itemIndex + '" style="text-align: center;">' +
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
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" value="'+item.ETC+'" class="etc">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="iss' + regPayDet.global.itemIndex + '" value="'+item.ISS+'"  class="iss">' +
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
                ,"card" + regPayDet.global.itemIndex, "etc" + regPayDet.global.itemIndex]);

            customKendo.fn_datePicker("trDe" + regPayDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

            $("#eviType" + i).data("kendoDropDownList").value(item.EVID_TYPE);



            regPayDet.global.itemIndex++;

        }

        if(ls.length > 0){
            regPayDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");
    },

    fn_save : function (){
        var parameters = {
            payAppType : $("#payAppType").data("kendoRadioGroup").value(),
            appDe : $("#appDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            budgetNm : $("#budgetNm").val(),
            budgetSn : $("#budgetSn").val(),
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
                etc : $("#etc" + i).val(),
                iss : $("#iss" + i).val(),
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

    fn_budgetPop: function (){
        if($("#pjtSn").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }


        var url = "/mng/pop/budgetView.do?pjtSn=" + $("#pjtSn").val();

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function (){
        var url = "/mng/pop/bankView.do";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
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
        ,"card0", "etc0", "iss0"]);

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

        regPayDet.global.itemIndex++;

        regPayDet.global.createHtmlStr = "" +
            '<tr class="payDestInfo newArray" id="pay' + regPayDet.global.itemIndex + '" style="text-align: center;">' +
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
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" class="etc">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="iss' + regPayDet.global.itemIndex + '" class="iss">' +
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
                                ,"card" + regPayDet.global.itemIndex, "etc" + regPayDet.global.itemIndex]);

        customKendo.fn_datePicker("trDe" + regPayDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());
    },

    delRow : function (){
        if($(".payDestInfo").length > 1){
            $("#pay" + regPayDet.global.itemIndex).remove();
            regPayDet.global.itemIndex--;
        }
    }
}

