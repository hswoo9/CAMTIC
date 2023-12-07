/**
 * rev : 지급신청서
 * in  : 여입신청서
 * out : 반납신청서
 * alt : 대체신청서
 * @type {{payAppDrafting: regPay.payAppDrafting, setData: regPay.setData, fn_viewStat: regPay.fn_viewStat, uncomma: (function(*): string), global: {searchAjaxData: string, saveAjaxData: string, radioGroupData: string, itemIndex: number, createHtmlStr: string, crmSnId: string, dropDownDataSource: string, crmNmId: string}, comma: (function(*): string), fn_projectPop: regPay.fn_projectPop, fn_budgetPop: regPay.fn_budgetPop, payAppBtnSet: regPay.payAppBtnSet, fn_save: regPay.fn_save, fn_popCamCrmList: regPay.fn_popCamCrmList, inputNumberFormat: regPay.inputNumberFormat, fn_defaultScript: regPay.fn_defaultScript, crmInfoChange: regPay.crmInfoChange, fn_bankPop: regPay.fn_bankPop, fn_calCost: regPay.fn_calCost}}
 */

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
        fileArray : []
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("reqDe", "month", "yyyy-MM-dd", new Date());
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

        $("#payAppType").data("kendoRadioGroup").bind("change", function (e){
            if($("#payAppType").data("kendoRadioGroup").value() == "2"){
                $("#trBank").text("입금계좌");
            } else {
                $("#trBank").text("출금계좌");
            }
        })

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
        });


        if($("#reqType").val() == "partRate"){
            const data = {
                pjtSn : $("#partRatePjtSn").val(),
                bsYm : $("#bsYm").val()
            }

            $.ajax({
                url : "/payApp/getPartRatePay",
                data : data,
                type : "POST",
                dataType : "json",
                success : function (rs){
                    var rs = rs.data;
                    console.log(rs);
                    $("#pjtSn").val(rs[0].PJT_SN);
                    $("#pjtNm").val(rs[0].PJT_NM);
                    $("#appTitle").val(rs[0].PJT_NM + " 참여인력 인건비")

                    for(let i = 1; i < rs.length; i++) {
                        regPayDet.addRow()
                    }

                    for(let i = 0; i < rs.length; i++) {
                        $("#crmNm" + i).val(rs[i].EMP_NAME_KR);
                        $("#trCd" + i).val(rs[i].ERP_ERP_CD);
                        $("#crmBnkNm" + i).val(rs[i].BANK_NAME);
                        $("#crmAccNo" + i).val(rs[i].ACCOUNT_NUM);
                        $("#crmAccHolder" + i).val(rs[i].ACCOUNT_HOLDER);
                        $("#totCost" + i).val(regPay.comma(rs[i].MON_SAL));
                        $("#supCost" + i).val(regPay.comma(rs[i].MON_SAL));
                    }

                    selectProject(rs[0].PJT_SN, rs[0].PJT_NM, rs[0].PJT_CD)

                }
            });
        }

        if($("#reqType").val() == "purc"){
            const data = {
                purcSn : $("#purcSn").val()
            }

            var result = customKendo.fn_customAjax("/purc/getPurcAndClaimData", data);
            var rs = result.data;
            $("#pjtSn").val(rs.PJT_SN);
            $("#pjtNm").val(rs.PJT_NM);
            if($("#pjtSn").val() != ""){
                selectProject(rs.PJT_SN, rs.PJT_NM, rs.PJT_CD)
            }
            $("#appTitle").val(rs.PURC_REQ_PURPOSE);

            var ls = rs.itemList;
            for(let i = 1; i < ls.length; i++) {
                regPayDet.addRow();
            }
            for(let i = 0; i < ls.length; i++) {
                $("#eviType" + i).data("kendoDropDownList").value(1)
                $("#crmNm" + i).val(ls[i].CRM_NM);
                $("#crmSn" + i).val(ls[i].CRM_SN);
                $("#totCost" + i).val(regPay.comma(ls[i].PURC_ITEM_AMT));
                $("#supCost" + i).val(regPay.comma(ls[i].PURC_ITEM_AMT));
            }
        }

    },

    payAppBtnSet: function (data){
        let buttonHtml = "";

        if(data != null){
            if(data.DOC_STATUS == "0"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save(\'user\')">저장</button>';
                buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.payAppDrafting()">상신</button>';
            }else if(data.DOC_STATUS == "10"){
                buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
            }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save(\'user\')">저장</button>';
                buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \''+data.DOC_MENU_CD+'\', \''+data.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(data.DOC_STATUS == "100"){
                buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \'payApp'+data.PAY_APP_SN+'\', \'payApp\');">열람</button>';
                $("#addBtn").hide();
                $("#exnpAddBtn").show();
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save(\'user\')">저장</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="regPay.fn_save(\'user\')">저장</button>';
        }

        // if($("#status").val() != "in"){
        //     if(data != null){
        //         if(data.DOC_STATUS == "0"){
        //             buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
        //             buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.payAppDrafting()">상신</button>';
        //         }else if(data.DOC_STATUS == "10"){
        //             buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
        //         }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
        //             buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
        //             buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \''+data.DOC_MENU_CD+'\', \''+data.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
        //         }else if(data.DOC_STATUS == "100"){
        //             buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', \''+data.DOC_MENU_CD+'\');">열람</button>';
        //             $("#addBtn").hide();
        //         }else{
        //             buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
        //         }
        //     }else{
        //         buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
        //     }
        // }

        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#payAppBtnDiv").html(buttonHtml);
    },

    payAppDrafting: function(){
        regPay.fn_save("", "drafting");

        var data = {
            payAppSn : $("#payAppSn").val(),
            pjtCd : $("#pjtCd").val()
        }
        $.ajax({
            url : "/payApp/getCheckBudget",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                var list = rs.list;
                var flag = true;
                for(var i = 0 ; i  < list.length ; i++){
                    if(list[i].TOT_COST > list[i].BUDGET_AMT) {
                        alert("예산잔액을 초과했습니다.");
                        flag = false;
                        return;
                    }
                }

                if(flag){
                    $("#payAppDraftFrm").one("submit", function() {
                        var url = "/popup/payApp/approvalFormPopup/payAppApprovalPop.do";
                        var name = "_self";
                        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                        var popup = window.open(url, name, option);
                        this.action = "/popup/payApp/approvalFormPopup/payAppApprovalPop.do";
                        this.method = 'POST';
                        this.target = '_self';
                    }).trigger("submit");
                }
            }
        });
    },

    setData : function (){
        var data = {
            payAppSn : $("#payAppSn").val()
        }
        if($("#item").val() != "" && $("#item").val() != null){
            data.payAppDetSn = $("#item").val();
        }
        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;
        var fileList = result.fileList;

        regPay.global.fileArray = fileList;

        regPay.payAppBtnSet(rs);

        if(rs.ADVANCES != 'Y'){
            $("#advances").prop("checked", false);
        } else {
            $("#advances").prop("checked", true);
        }

        $("#docStatus").val(rs.DOC_STATUS)
        if(rs.DOC_STATUS != 0){
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
        }

        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE)

        if(rs.PAY_APP_TYPE == "2"){
            $("#trBank").text("입금계좌");
        } else {
            $("#trBank").text("출금계좌");
        }
        $("#appDe").val(rs.APP_DE)
        $("#reqDe").val(rs.REQ_DE)
        $("#pjtNm").val(rs.PJT_NM)
        $("#pjtSn").val(rs.PJT_SN)
        $("#pjtCd").val(rs.PJT_CD)
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

        for(var i= 0; i < ls.length; i++) {
            var item = ls[i];


            regPayDet.global.createHtmlStr = "";

            regPayDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regPayDet.global.itemIndex + '" style="text-align: center;">';
            if($("#auth").val() != "user"){
                if($("#status").val() == "rev" || $("#status").val() == "in" || $("#status").val() == "re" || $("#status").val() == "alt"){
                    if(item.DET_STAT != "N"){
                        regPayDet.global.createHtmlStr += "" +
                            '   <td><input type="checkbox" id="check' + regPayDet.global.itemIndex + '" value='+item.PAY_APP_DET_SN+' style="position: relative; top: 5px;" class="check" /></td>';
                    } else {
                        regPayDet.global.createHtmlStr += "" +
                            '   <td></td>';
                    }
                }
            }

            var clIdx = regPayDet.global.itemIndex;

            regPayDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" value="'+item.BUDGET_NM+'" onclick="regPay.fn_budgetPop('+clIdx+')" style="width: 100%;">' +
                '       <input type="hidden" id="budgetSn' + regPayDet.global.itemIndex + '" value="'+item.BUDGET_SN+'" class="budgetSn"/>' +
                '       <input type="hidden" id="budgetAmt' + regPayDet.global.itemIndex + '" value="'+item.BUDGET_AMT+'" class="budgetAmt"/>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="appTeam' + regPayDet.global.itemIndex + '" class="appTeam" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <input type="hidden" id="payDestSn' + regPayDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                '       <input type="text" id="eviType' + regPayDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(1, '+regPayDet.global.itemIndex+')"></i>' +
                '       <input type="text" style="width: 70%" id="crmNm' + regPayDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                '       <input type="hidden" id="buySts' + regPayDet.global.itemIndex + '" value="'+item.BUY_STS+'" class="buySts">' +
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
                '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(3, '+regPayDet.global.itemIndex+')"></i>' +
                '       <input type="text" style="width: 70%;" disabled id="card' + regPayDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                '       <input type="hidden" id="cardNo' + regPayDet.global.itemIndex + '" value="'+item.CARD_NO+'" class="cardNo">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" value="'+item.ETC+'" class="etc">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="iss' + regPayDet.global.itemIndex + '" value="'+item.ISS+'"  class="iss">' +
                '   </td>';

            regPayDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <div style="text-align: center">';

                if($("#status").val() == "rev" || $("#status").val() == "in" || $("#status").val() == "re" || $("#status").val() == "alt"){
                    if($("#auth").val() != "user"){
                        if(item.EXNP_SAVE == "Y"){
                            // regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" disabled id="revertBtn' + regPayDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" onclick="regPayDet.fn_revertDet(this)">반려</button>';
                        } else {
                            // regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="revertBtn' + regPayDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" onclick="regPayDet.fn_revertDet(this)">반려</button>';
                        }
                    } else if(rs.DOC_STATUS == "0"){
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')">삭제</button>';
                    } else {
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')" disabled>삭제</button>';
                    }
                } else {
                    if(rs.DOC_STATUS == "0"){
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')">삭제</button>';
                    } else {
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')" disabled>삭제</button>';
                    }
                }
                regPayDet.global.createHtmlStr += '</div>' +
                    '   </td>'+
                '</tr>';

            $("#payDestTb").append(regPayDet.global.createHtmlStr);

            if(item.DET_STAT == "N"){
                $("#revertBtn"+ regPayDet.global.itemIndex).css("display", "none");
                $("#pay"+ regPayDet.global.itemIndex).css("background-color", "#afafaf");
            }

            var itemIndex = 0 ;
            itemIndex = regPayDet.global.itemIndex;

            $("#eviType" + itemIndex).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "선택", value: "" },
                    { text: "세금계산서", value: "1" },
                    { text: "계산서", value: "2" },
                    { text: "신용카드", value: "3" },
                    { text: "직원지급", value: "4" },
                    { text: "사업소득자", value: "5" },
                    { text: "기타소득자", value: "9" },
                    { text: "기타", value: "6" },
                ],
                index: 0,
                change : function (e){

                    var value = this.value();

                    if(value != ""){
                        if(value == "6"){
                            alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                        } else if(value == "3"){
                            regPayDet.fn_paymentCardHistory(value, e.sender.element[0].id.replace("eviType", ""));
                        } else {
                            regPayDet.fn_popRegDet(value, e.sender.element[0].id.replace("eviType", ""));
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

            var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
                deptLevel : 2
            });
            customKendo.fn_dropDownList("appTeam" + regPayDet.global.itemIndex, ds.rs, "dept_name", "dept_seq","5");


            $("#appTeam" + itemIndex).data("kendoDropDownList").value(item.TEAM_SEQ);
            $("#eviType" + itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);


            regPayDet.global.itemIndex++;
        }

        if(ls.length > 0){
            //regPayDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");


        if(rs.DOC_STATUS == 100 || rs.DOC_STATUS == 10){
            var item = 0;
            $("#payDestTb tr").each(function(){
                $(this).find("#budgetNm" + item).data("kendoTextBox").enable(false);
                $(this).find("#eviType" + item).data("kendoDropDownList").enable(false);

                item++;
            })
        }
    },

    fn_viewStat: function (){
        var stat = $("#status").val();

        if(stat == "rev"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
            } else {
                $("#titleStat").text("확인");
            }
            // $("#addBtn").css("display", "none");
            // $("#exnpAddBtn").css("display", "");
        }

        if(stat == "in"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
                $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
                $("#exnpAddBtn").text("여입결의서 작성");
                $("#addBtn").css("display", "none");
                $("#exnpAddBtn").css("display", "");
            } else {
                $("#titleStat").text("확인");
            }

        }

        if(stat == "re"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
            } else {
                $("#titleStat").text("확인");
            }
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#exnpAddBtn").text("반납결의서 작성");
            $("#addBtn").css("display", "none");
            $("#exnpAddBtn").css("display", "");
        }

        if(stat == "alt"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
            } else {
                $("#titleStat").text("확인");
            }
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#exnpAddBtn").text("대체결의서 작성");
            $("#addBtn").css("display", "none");
            $("#exnpAddBtn").css("display", "");
        }
    },

    fn_save : function (auth, type){
        var parameters = {
            payAppType : $("#payAppType").data("kendoRadioGroup").value(),
            appDe : $("#appDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            pjtCd : $("#pjtCd").val(),
            reqDe : $("#reqDe").val(),
            // budgetNm : $("#budgetNm").val(),
            // budgetSn : $("#budgetSn").val(),
            appTitle : $("#appTitle").val(),
            appCont : $("#appCont").val(),
            bnkSn : $("#bnkSn").val(),
            bnkNm : $("#bnkNm").val(),
            accNm : $("#accNm").val(),
            accNo : $("#accNo").val(),
            payAppStat : $("#payAppStat").data("kendoRadioGroup").value(),


            regEmpSeq : $("#regEmpSeq").val(),
            empSeq : $("#empSeq").val()
        }

        if($("#advances").is(":checked")){
            parameters.advances = 'Y';
        } else {
            parameters.advances = 'N';
        }

        if($("#claimSn").val() != ""){
            parameters.claimSn = $("#claimSn").val();
        }

        if($("#payAppSn").val() != ""){
            parameters.payAppSn = $("#payAppSn").val();
        }

        if(parameters.pjtCd == ""){
            alert("사업을 선택해주세요.");
            return;
        }

        if(parameters.appTitle == ""){
            alert("신청건명을 입력해주세요.");
            return;
        }

        if(parameters.bnkSn == ""){
            alert("출금계좌를 선택해주세요.");
            return;
        }


        var itemArr = new Array()
        var flag = true;
        var befAdvances = "";
        $.each($(".payDestInfo"), function(i, v){
            var index = $(this).find(".budgetSn").attr("id").slice(-1);

            var data = {
                budgetNm : $("#budgetNm" + index).val(),
                budgetSn : $("#budgetSn" + index).val(),
                budgetAmt : $("#budgetAmt" + index).val(),
                teamSeq : $("#appTeam" + index).val(),
                teamName : $("#appTeam" + index).data("kendoDropDownList").text(),
                evidType : $("#eviType" + index).val(),
                crmNm : $("#crmNm" + index).val(),
                trCd : $("#trCd" + index).val(),
                crmBnkNm : $("#crmBnkNm" + index).val(),
                crmAccNo : $("#crmAccNo" + index).val(),
                crmAccHolder : $("#crmAccHolder" + index).val(),
                trDe : $("#trDe" + index).val(),
                totCost : regPay.uncomma($("#totCost" + index).val()),
                supCost : regPay.uncomma($("#supCost" + index).val()),
                vatCost : regPay.uncomma($("#vatCost" + index).val()),
                buySts : $("#buySts" + index).val(),
                card : $("#card" + index).val(),
                cardNo : $("#cardNo" + index).val(),
                etc : $("#etc" + index).val(),
                iss : $("#iss" + index).val(),
            }

            if(data.buySts == undefined || data.buySts == null || data.buySts == "" || data.buySts == "undefined"){
                data.buySts = "";
            }


            befAdvances = $("#advances" + index).is(':checked') ? "Y" : "N";

            if(data.eviType == ""){
                flag = false;
            }


            itemArr.push(data);
        });


        if(!flag){
            alert("구분값을 선택해주세요.");
            return ;
        }

        parameters.itemArr = JSON.stringify(itemArr);

        var fd = new FormData();

        for(var key in parameters){
            fd.append(key, parameters[key]);
        }

        if(regPay.global.fileArray != null){
            for(var i = 0; i < regPay.global.fileArray.length; i++){
                fd.append("fileList", regPay.global.fileArray[i]);
            }
        }

        $.ajax({
            url : "/payApp/payAppSetData",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    if(type != 'x' && type != 'drafting'){
                        alert("저장되었습니다.");
                    }
                    if(type != "drafting"){
                        let status = "";
                        if($("#payAppType").data("kendoRadioGroup").value() == 1){
                            status = "rev";
                        }else if($("#payAppType").data("kendoRadioGroup").value() == 2){
                            status = "in";
                        }else if($("#payAppType").data("kendoRadioGroup").value() == 3){
                            status = "re";
                        }else{
                            status = "alt";
                        }

                        var url = "/payApp/pop/regPayAppPop.do?payAppSn=" + rs.params.payAppSn + "&status=" + status;
                        if(auth != "" && auth != null && auth != undefined){
                            url += "&auth=" + auth;
                        }
                        location.href = url;

                        opener.parent.paymentList.gridReload();
                    }
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

            $("#vatCost" + index).val(regPay.comma(Number(regPay.uncomma($("#totCost" + index).val())) - Math.round(Number(regPay.uncomma($("#totCost" + index).val())) * 100 / 110)));
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

    fn_projectPop : function (type){

        var url = "/project/pop/g20ProjectView.do?type=" + type;

        var name = "_blank";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
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
                { text: "사업소득자", value: "5" },
                { text: "기타소득자", value: "9" },
                { text: "기타", value: "6" },
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType0").val();
                var itemIndex = 0;

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else if(value == "3"){
                        regPayDet.fn_paymentCardHistory(value, itemIndex);
                    } else{
                        regPayDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
        ,"card0", "etc0", "iss0", "budgetNm0"]);

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
            deptLevel : 2
        });
        customKendo.fn_dropDownList("appTeam0", ds.rs, "dept_name", "dept_seq","5")

        $("#appTeam0").data("kendoDropDownList").value($("#loginDeptSeq").val());
        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

    },

    fn_popRegDet : function (v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_paymentCardHistory : function (v, i){
        var url = "/mng/pop/paymentCardHistory.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },
    
    
    addRow : function () {
        regPayDet.global.createHtmlStr = "";
        var clIdx = regPayDet.global.itemIndex;

        regPayDet.global.createHtmlStr = "" +
            '<tr class="payDestInfo newArray" id="pay' + regPayDet.global.itemIndex + '" style="text-align: center;">' +
            '   <td>' +
            '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" value="" onclick="regPay.fn_budgetPop(' + clIdx + ')" style="width: 100%;">' +
            '       <input type="hidden" id="budgetSn' + regPayDet.global.itemIndex + '" value="" class="budgetSn"/>' +
            '       <input type="hidden" id="budgetAmt' + regPayDet.global.itemIndex + '" value="" class="budgetAmt"/>' +
            '   </td>' +
            '   <td>' +
            '       <input style="width: 100%" id="appTeam' + regPayDet.global.itemIndex + '" name="appTeam" class="appTeam">' +
            '   </td>' +
            '   <td>' +
            '       <input type="hidden" style="width: 70%" id="payDestSn' + regPayDet.global.itemIndex + '" name="payDestSn" class="payDestSn">' +            '       <input type="text" id="eviType' + regPayDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
            '   </td>' +
            '   <td>' +
            '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(1, '+regPayDet.global.itemIndex+')"></i>' +
            '       <input type="text" style="width: 70%" id="crmNm' + regPayDet.global.itemIndex + '" class="crmNm">' +
            '       <input type="hidden" id="buySts' + regPayDet.global.itemIndex + '" class="buySts">' +
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
            '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(3, '+regPayDet.global.itemIndex+')"></i>' +
            '       <input type="text" style="width: 70%" disabled id="card' + regPayDet.global.itemIndex + '" class="card">' +
            '       <input type="hidden" id="cardNo' + regPayDet.global.itemIndex + '" class="cardNo">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" class="etc">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="iss' + regPayDet.global.itemIndex + '" class="iss">' +
            '   </td>' ;
        regPayDet.global.createHtmlStr += "" +
            '   <td>' +
            '       <div style="text-align: center">' +
            '           <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')">삭제</button>' +
            '       </div>' +
            '   </td>' +
            '</tr>';

        $("#payDestTb").append(regPayDet.global.createHtmlStr);

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
                { text: "사업소득자", value: "5" },
                { text: "기타소득자", value: "9" },
                { text: "기타", value: "6" },
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType" + itemIndex).val();

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else if(value == "3"){
                        regPayDet.fn_paymentCardHistory(value, itemIndex);
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

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
            deptLevel : 2
        });
        customKendo.fn_dropDownList("appTeam" + regPayDet.global.itemIndex, ds.rs, "dept_name", "dept_seq","5");

        $("#appTeam" + regPayDet.global.itemIndex).data("kendoDropDownList").value($("#loginDeptSeq").val());

        regPayDet.global.itemIndex++;
    },

    delRow : function (row){
        if($(".payDestInfo").length > 1){
            $("#pay" + row).remove();
            /*regPayDet.global.itemIndex--;*/
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

        var subject = "";
        if($("#status").val() == "rev"){
            subject = "지출결의";
            if(!confirm("지출결의를 작성하시겠습니까?")) {
                return;
            }
        } else if($("#status").val() == "in"){
            subject = "여입결의";
            if(!confirm("여입결의를 작성하시겠습니까?")) {
                return;
            }
        } else if($("#status").val() == "re"){
            subject = "여입결의";
            if(!confirm("반납결의를 작성하시겠습니까?")) {
                return;
            }
        } else if($("#status").val() == "alt"){
            subject = "여입결의";
            if(!confirm("대체결의를 작성하시겠습니까?")) {
                return;
            }
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
            alert("현재 해당건으로 작성된 "+subject+"서가 있습니다.");
            return ;
        }

        var payAppSn = $("#payAppSn").val();

        if($("#payAppSn").val() == ""){
            alert("시스템 오류가 발생하였습니다.");
            return;
        }
        regPayDet.fn_regExnpPop(keyArr, payAppSn);
        window.close();
    },

    fn_regExnpPop : function (keyArr, key){

        var url = "/payApp/pop/regExnpPop.do?item=" + keyArr + "&payAppSn=" + key;

        if($("#status").val() == "rev"){
            url += "&status=" + $("#status").val();
        } else if($("#status").val() == "in"){
            url += "&status=" + $("#status").val();
        } else if($("#status").val() == "re"){
            url += "&status=" + $("#status").val();
        } else if($("#status").val() == "alt"){
            url += "&status=" + $("#status").val();
        }
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regPayAttPop : function (){

        var url = "/payApp/pop/regPayAttPop.do?payAppSn=" + $("#payAppSn").val();
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    }
}

