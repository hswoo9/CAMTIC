var regIncm = {

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
        customKendo.fn_datePicker("exnpDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["pjtNm", "budgetNm", "appTitle", "accNm", "accNo", "bnkNm"
                                ,"exnpEmpNm", "exnpDeptNm", "exnpBriefs"]);

        $("#addExnpBriefs").kendoTextArea({
            rows: 5,
        });

        regIncm.global.radioGroupData = [
            { label: "없음", value: "N" },
            { label: "의무경비", value: "A" },
            { label: "고정경비", value: "B" },
            { label: "업무추진비", value: "C" }
        ]

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
        })

        if($("#exnpSn").val() == ""){
            if($("#payAppSn").val() != ""){
                regIncm.setData();

                regIncm.fn_viewStat();
            }
        } else {
            regIncm.dataSet();
        }


        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[type='checkbox']").prop("checked", true);
            }else{
                $("input[type='checkbox']").prop("checked", false);
            }
        })

        $("#payAppType").data("kendoRadioGroup").enable(false);
    },

    payAppBtnSet: function (data){
        let buttonHtml = "";
        if($("#status").val() != "rev"){
            if(data != null){
                if(data.DOC_STATUS == "0"){
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.fn_save()">저장</button>';
                    buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.payAppDrafting()">상신</button>';
                }else if(data.DOC_STATUS == "10"){
                    buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
                }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.fn_save()">저장</button>';
                    buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \''+data.DOC_MENU_CD+'\', \''+data.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
                }else if(data.DOC_STATUS == "100"){
                    buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', \''+data.DOC_MENU_CD+'\');">열람</button>';
                }else{
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.fn_save()">저장</button>';
                }
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="regIncm.fn_save()">저장</button>';
            }
        }

        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#payAppBtnDiv").html(buttonHtml);
    },

    dataSet : function (){
        var data = {
            exnpSn : $("#exnpSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getExnpData", data);
        var rs = result.map;
        var ls = result.list;

        if($("#exnpSn").val() != ""){
            regIncm.payAppBtnSet(rs);
        }

        $("#busnCd").data("kendoDropDownList").value(rs.BUSN_CD);
        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE)
        $("#exnpDe").val(rs.EXNP_DE)
        $("#pjtNm").val(rs.PJT_NM)
        $("#pjtSn").val(rs.PJT_SN)
        $("#budgetNm").val(rs.BUDGET_NM)
        $("#budgetSn").val(rs.BUDGET_SN)
        $("#exnpBriefs").val(rs.EXNP_BRIEFS)
        $("#addExnpBriefs").val(rs.ADD_EXNP_BRIEFS)

        $("#bnkSn").val(rs.BNK_SN)
        $("#bnkNm").val(rs.BNK_NM)
        $("#accNm").val(rs.ACC_NM)
        $("#accNo").val(rs.ACC_NO)

        if(ls.length > 0){
            $("#payDestTb").html("");
        }
        for(var i=0; i < ls.length; i++) {
            var item = ls[i];

            regIncmDet.global.createHtmlStr = "";
            var clIdx = regIncmDet.global.itemIndex;

            regIncmDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regIncmDet.global.itemIndex + '" style="text-align: center;">';
            if(item.DET_STAT != "N"){
                regIncmDet.global.createHtmlStr += "" +
                    '   <td>' +
                    '       <input type="text" id="budgetNm' + regIncmDet.global.itemIndex + '" value="'+item.BUDGET_NM+'" onclick="regIncm.fn_budgetPop('+clIdx+')" style="width: 100%;">' +
                    '       <input type="hidden" id="budgetSn' + regIncmDet.global.itemIndex + '" value="'+item.BUDGET_SN+'" />' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="hidden" id="payDestSn' + regIncmDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="text" id="eviType' + regIncmDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmNm' + regIncmDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                    '       <input type="hidden" id="trCd' + regIncmDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmBnkNm' + regIncmDet.global.itemIndex + '" value="'+item.CRM_BNK_NM+'" class="crmBnkNm">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccNo' + regIncmDet.global.itemIndex + '" value="'+item.CRM_ACC_NO+'" class="crmAccNo">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccHolder' + regIncmDet.global.itemIndex + '" value="'+item.CRM_ACC_HOLDER+'" class="crmAccHolder">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="trDe' + regIncmDet.global.itemIndex + '" value="'+item.TR_DE+'" class="trDe">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="totCost' + regIncmDet.global.itemIndex + '" value="'+regIncm.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regIncmDet.global.itemIndex + '" value="'+regIncm.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regIncmDet.global.itemIndex + '" value="'+regIncm.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" disabled id="card' + regIncmDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                    '       <input type="hidden" id="cardNo'+regIncmDet.global.itemIndex+'" value="'+item.CARD_NO+'" className="cardNo" />' +
                    '   </td>' +
                    '</tr>';

                $("#payDestTb").append(regIncmDet.global.createHtmlStr);

                if(item.DET_STAT == "N"){
                    $("#revertBtn"+ regIncmDet.global.itemIndex).css("display", "none");
                    $("#pay"+ regIncmDet.global.itemIndex).css("background-color", "#afafaf");
                }

                var itemIndex = regIncmDet.global.itemIndex;
                $("#eviType" + regIncmDet.global.itemIndex).kendoDropDownList({
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
                                regIncmDet.fn_popRegDet(value, itemIndex);
                            }
                        }
                    }
                });

                customKendo.fn_textBox(["crmNm" + regIncmDet.global.itemIndex, "crmBnkNm"  + regIncmDet.global.itemIndex
                    , "crmAccHolder" + regIncmDet.global.itemIndex
                    , "crmAccNo" + regIncmDet.global.itemIndex, "totCost" + regIncmDet.global.itemIndex
                    , "supCost" + regIncmDet.global.itemIndex, "vatCost" + regIncmDet.global.itemIndex
                    ,"card" + regIncmDet.global.itemIndex, "budgetNm" + regIncmDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regIncmDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

                $("#eviType" + regIncmDet.global.itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);



                regIncmDet.global.itemIndex++;
            }

        }

        if(ls.length > 0){
            regIncmDet.global.itemIndex--;
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
        var data = {
            payAppSn : $("#payAppSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;


        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE)
        $("#exnpDe").val(rs.APP_DE)
        $("#pjtNm").val(rs.PJT_NM)
        $("#pjtSn").val(rs.PJT_SN)
        $("#budgetNm").val(rs.BUDGET_NM)
        $("#budgetSn").val(rs.BUDGET_SN)
        $("#exnpBriefs").val(rs.APP_TITLE)
        $("#addExnpBriefs").val(rs.APP_CONT)

        $("#bnkSn").val(rs.BNK_SN)
        $("#bnkNm").val(rs.BNK_NM)
        $("#accNm").val(rs.ACC_NM)
        $("#accNo").val(rs.ACC_NO)

        if(ls.length > 0){
            $("#payDestTb").html("");
        }
        for(var i=0; i < ls.length; i++) {
            var item = ls[i];

            regIncmDet.global.createHtmlStr = "";

            var clIdx = regIncmDet.global.itemIndex;
            regIncmDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regIncmDet.global.itemIndex + '" style="text-align: center;">';
            if(item.DET_STAT != "N"){
                regIncmDet.global.createHtmlStr += "" +
                    '   <td>' +
                    '       <input type="text" id="budgetNm' + regIncmDet.global.itemIndex + '" value="'+item.BUDGET_NM+'" onclick="regIncmDet.fn_budgetPop('+clIdx+')" style="width: 100%;">' +
                    '       <input type="hidden" id="budgetSn' + regIncmDet.global.itemIndex + '" value="'+item.BUDGET_SN+'" />' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="hidden" id="payDestSn' + regIncmDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="text" id="eviType' + regIncmDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmNm' + regIncmDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                    '       <input type="hidden" id="trCd' + regIncmDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmBnkNm' + regIncmDet.global.itemIndex + '" value="'+item.CRM_BNK_NM+'" class="crmBnkNm">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccNo' + regIncmDet.global.itemIndex + '" value="'+item.CRM_ACC_NO+'" class="crmAccNo">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccHolder' + regIncmDet.global.itemIndex + '" value="'+item.CRM_ACC_HOLDER+'" class="crmAccHolder">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="trDe' + regIncmDet.global.itemIndex + '" value="'+item.TR_DE+'" class="trDe">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="totCost' + regIncmDet.global.itemIndex + '" value="'+regIncm.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regIncmDet.global.itemIndex + '" value="'+regIncm.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regIncmDet.global.itemIndex + '" value="'+regIncm.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" disabled id="card' + regIncmDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                    '       <input type="hidden" id="cardNo' + regIncmDet.global.itemIndex + '" className="cardNo" />' +
                    '   </td>' +
                    '</tr>';

                $("#payDestTb").append(regIncmDet.global.createHtmlStr);

                if(item.DET_STAT == "N"){
                    $("#revertBtn"+ regIncmDet.global.itemIndex).css("display", "none");
                    $("#pay"+ regIncmDet.global.itemIndex).css("background-color", "#afafaf");
                }

                var itemIndex = regIncmDet.global.itemIndex;
                $("#eviType" + regIncmDet.global.itemIndex).kendoDropDownList({
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
                                regIncmDet.fn_popRegDet(value, itemIndex);
                            }
                        }
                    }
                });

                customKendo.fn_textBox(["crmNm" + regIncmDet.global.itemIndex, "crmBnkNm"  + regIncmDet.global.itemIndex
                    , "crmAccHolder" + regIncmDet.global.itemIndex
                    , "crmAccNo" + regIncmDet.global.itemIndex, "totCost" + regIncmDet.global.itemIndex
                    , "supCost" + regIncmDet.global.itemIndex, "vatCost" + regIncmDet.global.itemIndex
                    ,"card" + regIncmDet.global.itemIndex, "budgetNm" + regIncmDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regIncmDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

                $("#eviType" + regIncmDet.global.itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);



                regIncmDet.global.itemIndex++;
            }

        }

        if(ls.length > 0){
            regIncmDet.global.itemIndex--;
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
            payAppType : $("#payAppType").data("kendoRadioGroup").value(),
            exnpDe : $("#exnpDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            exnpBriefs : $("#exnpBriefs").val(),
            addExnpBriefs : $("#addExnpBriefs").val(),
            exnpEmpSeq : $("#exnpEmpSeq").val(),
            g20EmpCd : $("#g20EmpCd").val(),
            g20DeptCd : $("#g20DeptCd").val(),
            bnkSn : $("#bnkSn").val(),
            bnkNm : $("#bnkNm").val(),
            accNm : $("#accNm").val(),
            accNo : $("#accNo").val(),
            busnCd : $("#busnCd").val(),
            payAppSn : $("#payAppSn").val(),
            item: $("#item").val(),

            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#exnpSn").val() != ""){
            parameters.exnpSn = $("#exnpSn").val();
        }

        if($("#busnCd").val() == ""){
            alert("사업장을 선택해주세요.");
            return;
        }

        var itemArr = new Array()
        var flag = true;
        $.each($(".payDestInfo"), function(i, v){
            var data = {
                evidType : $("#eviType" + i).val(),
                budgetNm : $("#budgetNm" + i).val(),
                budgetSn : $("#budgetSn" + i).val(),
                crmNm : $("#crmNm" + i).val(),
                trCd : $("#trCd" + i).val(),
                crmBnkNm : $("#crmBnkNm" + i).val(),
                crmAccNo : $("#crmAccNo" + i).val(),
                crmAccHolder : $("#crmAccHolder" + i).val(),
                trDe : $("#trDe" + i).val(),
                totCost : regIncm.uncomma($("#totCost" + i).val()),
                supCost : regIncm.uncomma($("#supCost" + i).val()),
                vatCost : regIncm.uncomma($("#vatCost" + i).val()),
                card : $("#card" + i).val(),
                cardNo : $("#cardNo" + i).val()
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
            url : "/payApp/setExnpData",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    location.href="/payApp/pop/regExnpPop.do?payAppSn=" + rs.params.payAppSn + "&exnpSn=" + rs.params.exnpSn;
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
        regIncm.global.crmSnId = crmSnId;
        regIncm.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regIncm.global.crmSnId).val($("#crmSn").val())
        $("#" + regIncm.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost: function(obj){

        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){
            $("#vatCost" + index).val(regIncm.comma(Math.round(Number(regIncm.uncomma($("#totCost" + index).val())) / 10)));
            $("#supCost" + index).val(regIncm.comma(Number(regIncm.uncomma($("#totCost" + index).val())) - Number(regIncm.uncomma($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regIncm.comma(Number(regIncm.uncomma($("#totCost" + index).val())) - Number(regIncm.uncomma($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regIncm.comma(Number(regIncm.uncomma($("#totCost" + index).val())) - Number(regIncm.uncomma($("#vatCost" + index).val()))));
        }

        regIncm.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = regIncm.comma(regIncm.uncomma(obj.value));
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
                        regIncmDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
        ,"card0", "budgetNm0"]);

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


        regIncmDet.fn_regExnpPop(keyArr);


    },

    fn_regExnpPop : function (keyArr){

        var url = "/payApp/pop/reqExnpPop.do?item=" + keyArr;

        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

