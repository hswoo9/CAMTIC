var regExnpRe = {

    global : {
        radioGroupData : "",
        createHtmlStr : "",
        itemIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        crmSnId : "",
        crmNmId : "",
        saveAjaxData : "",
        fileArray : [],
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["pjtNm", "budgetNm", "appTitle", "accNm", "accNo", "bnkNm"
                                ,"exnpEmpNm", "exnpDeptNm", "exnpBriefs"]);

        $("#addExnpBriefs").kendoTextArea({
            rows: 5,
        });

        regExnpRe.global.radioGroupData = [
            { label: "지급신청서", value: "1" },
            { label: "여입신청서", value: "2" },
            { label: "반납신청서", value: "3" },
            { label: "대체신청서", value: "4" }
        ];
        customKendo.fn_radioGroup("payAppType", regExnpRe.global.radioGroupData, "horizontal");

        regExnpRe.global.radioGroupData = [
            { label: "없음", value: "N" },
            { label: "의무경비", value: "A" },
            { label: "고정경비", value: "B" },
            { label: "업무추진비", value: "C" }
        ];

        $("#busnCd").kendoDropDownList({
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

        $("#payAppType").data("kendoRadioGroup").value(1);

        if($("#exnpSn").val() == ""){
            if($("#payAppSn").val() != ""){
                regExnpRe.setData();

                regExnpRe.fn_viewStat();
            }
        } else {
            regExnpRe.dataSet();
        }


        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[type='checkbox']").prop("checked", true);
            }else{
                $("input[type='checkbox']").prop("checked", false);
            }
        });

        $("#payAppType").data("kendoRadioGroup").enable(false);

        if($("#payAppType").data("kendoRadioGroup").value() == "1"){
            $("#cardTitle").text("지출");
        } else if($("#payAppType").data("kendoRadioGroup").value() == "2"){
            $("#cardTitle").text("여입");
        } else if($("#payAppType").data("kendoRadioGroup").value() == "3"){
            $("#cardTitle").text("반납");
        } else if($("#payAppType").data("kendoRadioGroup").value() == "4"){
            $("#cardTitle").text("대체");
        }
    },

    payAppBtnSet: function (data){
        let buttonHtml = "";
        if(data.RE_STAT == "N"){
            if((data.EVID_TYPE == "1" || data.EVID_TYPE == "2" || data.EVID_TYPE == "3")){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnpRe.fn_save()">반제결의서 승인</button>';
            }
        } else{
            buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnpRe.fn_regExnpInPop('+data.PAY_APP_SN+', '+data.EXNP_SN+')">여입결의서 작성</button>';
        }

        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#payAppBtnDiv").html(buttonHtml);
    },

    fn_regExnpInPop : function(payAppSn, exnpSn){
        var url = "/payApp/pop/regExnpPop.do?payAppSn=" + payAppSn + "&exnpSn=" + exnpSn + "&status=in&docMode=new";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    dataSet : function (){
        console.log("dataSet");
        var data = {
            exnpSn : $("#exnpSn").val(),
            payAppSn : $("#payAppSn").val(),
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getExnpData", data);
        var rs = result.map;
        var ls = result.list;
        var fileList = result.fileList;
        regExnpRe.global.fileArray = fileList;

        var fileThumbText = "";
        for(let i=0; i<fileList.length; i++){
            if(fileThumbText != ""){
                fileThumbText += " | ";
            }
            fileThumbText += fileList[i].file_org_name;
            fileThumbText += "." + fileList[i].file_ext;
        }

        // 지급/지출 양식 첨부 추가
        var result2 = customKendo.fn_customAjax("/payApp/pop/getExnpDocData", data);
        var fileList2 = result2.fileList;
        for(let i=0; i<fileList2.length; i++){
            if(fileThumbText != ""){
                fileThumbText += " | ";
            }
            fileThumbText += fileList2[i].file_org_name;
            fileThumbText += "." + fileList2[i].file_ext;

            regExnpRe.global.fileArray.push(fileList2[i]);
        }
        $("#fileText").text(fileThumbText);

        if($("#exnpSn").val() != ""){
            rs.EVID_TYPE = ls[0].EVID_TYPE;
            regExnpRe.payAppBtnSet(rs);
        }

        $("#busnCd").data("kendoDropDownList").value(rs.BUSN_CD);
        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE);

        if(ls[0].EVID_TYPE == "1" || ls[0].EVID_TYPE == "2" || ls[0].EVID_TYPE == "3"){
            $("#exnpDe").text(rs.DT1);
        } else {
            $("#exnpDe").text(rs.DT3);
        }

        $("#pjtNm").val(rs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN);
        $("#budgetNm").val(rs.BUDGET_NM);
        $("#budgetSn").val(rs.BUDGET_SN);
        $("#exnpBriefs").val(rs.EXNP_BRIEFS);
        $("#addExnpBriefs").val(rs.ADD_EXNP_BRIEFS);
        $("#addExnpBriefs").data("kendoTextArea").enable(false);

        $("#bnkSn").val(rs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM);
        $("#accNm").val(rs.ACC_NM);
        $("#accNo").val(rs.ACC_NO);

        if(ls.length > 0){
            $("#payDestTb").html("");
        }
        for(var i=0; i < ls.length; i++) {
            var item = ls[i];

            regExnpDet.global.createHtmlStr = "";
            var clIdx = regExnpDet.global.itemIndex;

            regExnpDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regExnpDet.global.itemIndex + '" style="text-align: center;">';
            if(item.DET_STAT != "N"){
                regExnpDet.global.createHtmlStr += "" +
                    '   <td>' +
                    '       <input type="text" id="budgetNm' + regExnpDet.global.itemIndex + '" value="'+item.BUDGET_NM+'" disabled>' +
                    '       <input type="hidden" id="budgetSn' + regExnpDet.global.itemIndex + '" value="'+item.BUDGET_SN+'" />' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="hidden" id="payDestSn' + regExnpDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="text" id="eviType' + regExnpDet.global.itemIndex + '" class="eviType" style="width: 100%" disabled>' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm" disabled>' +
                    '       <input type="hidden" id="trCd' + regExnpDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmBnkNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_BNK_NM+'" class="crmBnkNm" disabled>' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccNo' + regExnpDet.global.itemIndex + '" value="'+item.CRM_ACC_NO+'" class="crmAccNo" disabled>' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccHolder' + regExnpDet.global.itemIndex + '" value="'+item.CRM_ACC_HOLDER+'" class="crmAccHolder" disabled>' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="trDe' + regExnpDet.global.itemIndex + '" value="'+item.TR_DE+'" class="trDe" disabled>' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="totCost' + regExnpDet.global.itemIndex + '" value="'+regExnpRe.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" disabled>' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regExnpDet.global.itemIndex + '" value="'+regExnpRe.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" disabled>' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regExnpDet.global.itemIndex + '" value="'+regExnpRe.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" disabled>' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" disabled id="card' + regExnpDet.global.itemIndex + '" value="'+item.CARD+'" class="card" disabled>' +
                    '       <input type="hidden" id="cardNo'+regExnpDet.global.itemIndex+'" value="'+item.CARD_NO+'" className="cardNo" />' +
                    '   </td>' +
                    '</tr>';

                $("#payDestTb").append(regExnpDet.global.createHtmlStr);

                if(item.DET_STAT == "N"){
                    $("#revertBtn"+ regExnpDet.global.itemIndex).css("display", "none");
                    $("#pay"+ regExnpDet.global.itemIndex).css("background-color", "#afafaf");
                }

                var itemIndex = regExnpDet.global.itemIndex;
                $("#eviType" + regExnpDet.global.itemIndex).kendoDropDownList({
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
                                regExnpDet.fn_popRegDet(value, itemIndex);
                            }
                        }
                    }
                });

                customKendo.fn_textBox(["crmNm" + regExnpDet.global.itemIndex, "crmBnkNm"  + regExnpDet.global.itemIndex
                    , "crmAccHolder" + regExnpDet.global.itemIndex
                    , "crmAccNo" + regExnpDet.global.itemIndex, "totCost" + regExnpDet.global.itemIndex
                    , "supCost" + regExnpDet.global.itemIndex, "vatCost" + regExnpDet.global.itemIndex
                    ,"card" + regExnpDet.global.itemIndex, "budgetNm" + regExnpDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regExnpDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);



                regExnpDet.global.itemIndex++;
            }

        }

        if(ls.length > 0){
            regExnpDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");
    },

    payAppDrafting: function() {
        $("#payAppDraftFrm").one("submit", function() {
            var url = "/popup/exnp/approvalFormPopup/exnpApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/exnp/approvalFormPopup/exnpApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    setData : function (){
        console.log("setData");

        var data = {
            payAppSn : $("#payAppSn").val()
        }
        if($("#item").val() != "" && $("#item").val() != null){
            data.payAppDetSn = $("#item").val();
        }
        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;


        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE);
        $("#exnpDe").val(rs.APP_DE);
        $("#pjtNm").val(rs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN);
        $("#budgetNm").val(rs.BUDGET_NM);
        $("#budgetSn").val(rs.BUDGET_SN);
        $("#exnpBriefs").val(rs.APP_TITLE);
        $("#addExnpBriefs").val(rs.APP_CONT);

        $("#bnkSn").val(rs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM);
        $("#accNm").val(rs.ACC_NM);
        $("#accNo").val(rs.ACC_NO);

        if(ls.length > 0){
            $("#payDestTb").html("");
        }
        for(var i=0; i < ls.length; i++) {
            var item = ls[i];

            regExnpDet.global.createHtmlStr = "";

            var clIdx = regExnpDet.global.itemIndex;
            regExnpDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regExnpDet.global.itemIndex + '" style="text-align: center;">';
            if(item.DET_STAT != "N"){
                regExnpDet.global.createHtmlStr += "" +
                    '   <td>' +
                    '       <input type="text" id="budgetNm' + regExnpDet.global.itemIndex + '" value="'+item.BUDGET_NM+'" onclick="regExnpRe.fn_budgetPop('+clIdx+')" style="width: 100%;">' +
                    '       <input type="hidden" id="budgetSn' + regExnpDet.global.itemIndex + '" value="'+item.BUDGET_SN+'" />' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="hidden" id="payDestSn' + regExnpDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="text" id="eviType' + regExnpDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                    '       <input type="hidden" id="trCd' + regExnpDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmBnkNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_BNK_NM+'" class="crmBnkNm">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccNo' + regExnpDet.global.itemIndex + '" value="'+item.CRM_ACC_NO+'" class="crmAccNo">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccHolder' + regExnpDet.global.itemIndex + '" value="'+item.CRM_ACC_HOLDER+'" class="crmAccHolder">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="trDe' + regExnpDet.global.itemIndex + '" value="'+item.TR_DE+'" class="trDe">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="totCost' + regExnpDet.global.itemIndex + '" value="'+regExnpRe.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regExnpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regExnpDet.global.itemIndex + '" value="'+regExnpRe.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regExnpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regExnpDet.global.itemIndex + '" value="'+regExnpRe.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regExnpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" disabled id="card' + regExnpDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                    '       <input type="hidden" id="cardNo' + regExnpDet.global.itemIndex + '" className="cardNo" />' +
                    '   </td>' +
                    '</tr>';

                $("#payDestTb").append(regExnpDet.global.createHtmlStr);

                if(item.DET_STAT == "N"){
                    $("#revertBtn"+ regExnpDet.global.itemIndex).css("display", "none");
                    $("#pay"+ regExnpDet.global.itemIndex).css("background-color", "#afafaf");
                }

                var itemIndex = regExnpDet.global.itemIndex;
                $("#eviType" + regExnpDet.global.itemIndex).kendoDropDownList({
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
                                regExnpDet.fn_popRegDet(value, itemIndex);
                            }
                        }
                    }
                });

                customKendo.fn_textBox(["crmNm" + regExnpDet.global.itemIndex, "crmBnkNm"  + regExnpDet.global.itemIndex
                    , "crmAccHolder" + regExnpDet.global.itemIndex
                    , "crmAccNo" + regExnpDet.global.itemIndex, "totCost" + regExnpDet.global.itemIndex
                    , "supCost" + regExnpDet.global.itemIndex, "vatCost" + regExnpDet.global.itemIndex
                    ,"card" + regExnpDet.global.itemIndex, "budgetNm" + regExnpDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regExnpDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);



                regExnpDet.global.itemIndex++;
            }

        }

        if(ls.length > 0){
            regExnpDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");
    },

    fn_viewStat: function (){
        var stat = $("#status").val();

        if(stat == "rev"){
            $("#payAppType").data("kendoRadioGroup").enable(false);
            $("#appDe").data("kendoDatePicker").enable(false);
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#exnpAddBtn").css("display", "");
            $("#titleStat").text("검토")
        }
    },

    fn_save : function (){
        var parameters = {
            exnpSn : $("#exnpSn").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            empSeq : $("#regEmpSeq").val(),
            exnpG20Stat : 'Y',
        }

        if(!confirm("승인하시겠습니까?")){
            return ;
        }

        const result = customKendo.fn_customAjax("/pay/resolutionExnpAppr", parameters);
        if(result.flag){
            if(result.code == 200){
                alert("승인이 완료되었습니다.");
                try {
                    opener.exnpReList.gridReload();
                }catch{
                    // alert("새로 고침중 오류가 발생하였습니다.");
                }
                window.close();
            }else{
                alert("ERP 연동 중 오류가 발생하였습니다.");
            }
        }
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId);

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regExnpRe.global.crmSnId = crmSnId;
        regExnpRe.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regExnpRe.global.crmSnId).val($("#crmSn").val())
        $("#" + regExnpRe.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost: function(obj){

        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){
            $("#vatCost" + index).val(regExnpRe.comma(Math.round(Number(regExnpRe.uncomma($("#totCost" + index).val())) / 10)));
            $("#supCost" + index).val(regExnpRe.comma(Number(regExnpRe.uncomma($("#totCost" + index).val())) - Number(regExnpRe.uncomma($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regExnpRe.comma(Number(regExnpRe.uncomma($("#totCost" + index).val())) - Number(regExnpRe.uncomma($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regExnpRe.comma(Number(regExnpRe.uncomma($("#totCost" + index).val())) - Number(regExnpRe.uncomma($("#vatCost" + index).val()))));
        }

        regExnpRe.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = regExnpRe.comma(regExnpRe.uncomma(obj.value));
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
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (idx){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }


        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&idx=" + idx;

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

    fn_regPayAttPop : function (){
        var url = "/payApp/pop/regReListFilePop.do?payAppSn=" + $("#payAppSn").val() + "&exnpSn=" + $("#exnpSn").val() + "&type=exnp";
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    }
}


var regExnpDet = {

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
                        regExnpDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
        ,"card0"]);

        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

    },

    fn_popRegDet : function (v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
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

        var data= {
            arr : keyArr,
            payAppSn : $("#payAppSn").val()
        }
        var result = customKendo.fn_customAjax("/mng/checkExnpDetData", data);
        var exnpSaveFlag = false;
        for(var i = 0; i < result.list.length; i++){
            if(result.list[i].EXNP_SAVE == "Y"){
                exnpSaveFlag = true;
                break;
            }
        }

        if(exnpSaveFlag){
            alert("현재 해당건으로 작성된 지출결의서가 있습니다.");
            return ;
        }

        regExnpDet.fn_regExnpPop(keyArr);


    },

    fn_regExnpPop : function (keyArr){

        var url = "/payApp/pop/reqExnpPop.do?item=" + keyArr;

        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

