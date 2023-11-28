var regExnp = {

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

    fn_defaultScript : function(){
        customKendo.fn_datePicker("exnpDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["pjtNm", "budgetNm", "appTitle", "accNm", "accNo", "bnkNm"
                                ,"exnpEmpNm", "exnpDeptNm", "exnpBriefs"]);

        $("#addExnpBriefs").kendoTextArea({
            rows: 5,
        });

        regExnp.global.radioGroupData = [
            { label: "지급신청서", value: "1" },
            { label: "여입신청서", value: "2" },
            { label: "반납신청서", value: "3" },
            { label: "대체신청서", value: "4" }
        ]
        customKendo.fn_radioGroup("payAppType", regExnp.global.radioGroupData, "horizontal");

        regExnp.global.radioGroupData = [
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
        });

        $("#busnCd0").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "1000-(사)캠틱종합기술원", value: "1000" },
                { text: "2000-(사)캠틱종합기술원", value: "2000" },
                { text: "3000-(사)캠틱종합기술원", value: "3000" },
                { text: "4000-(사)캠틱종합기술원", value: "4000" },
                { text: "5000-(사)캠틱종합기술원", value: "5000" },
                { text: "6000-(사)캠틱종합기술원", value: "6000" },
                { text: "7000-(사)캠틱종합기술원", value: "7000" }
            ]
        });

        $("#payAppType").data("kendoRadioGroup").value(1);

        if($("#status").val() != "" && $("#status").val() != null){
            if($("#status").val() == "rev"){
                $("#payAppType").data("kendoRadioGroup").value(1);
            } else if($("#status").val() == "in"){
                $("#payAppType").data("kendoRadioGroup").value(2);
            } else if($("#status").val() == "re"){
                $("#payAppType").data("kendoRadioGroup").value(3);
            } else if($("#status").val() == "alt"){
                $("#payAppType").data("kendoRadioGroup").value(4);
            }
        }


        /** 회계발의일, 등기일자, 지출부기재 일자 폼 추가 */
        if($("#status").val() == "rev" || $("#status").val() == "in"){
            $("#dtTr").show();
            customKendo.fn_datePicker("DT1", 'month', "yyyy-MM-dd", new Date());
            customKendo.fn_datePicker("DT2", 'month', "yyyy-MM-dd", new Date());
            customKendo.fn_datePicker("DT3", 'month', "yyyy-MM-dd", new Date());
            $("#DT1, #DT2, #DT3").attr("readonly", true);
        }



        if($("#exnpSn").val() == ""){
            if($("#payAppSn").val() != ""){
                /** 지급신청서에서 지결 작성시 데이터 세팅 */
                regExnp.setData();
                regExnp.fn_viewStat();
            }
            
            if($("#payIncpSn").val() != ""){
                /** 수입 결의서에서 반납결의서 작성시 데이터 세팅 */
                regExnp.setIncpData();
            }
        } else {
            /** 지결 최초 작성 후 데이터 세팅 */
            regExnp.dataSet();
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

    payAppBtnSet : function(data){
        let buttonHtml = "";
        console.log(data);
        if($("#status").val() == "rev" || $("#status").val() == "in" || $("#status").val() == "re" || $("#status").val() == "alt"){
            if(data != null){
                if(data.DOC_STATUS == "0"){
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_save()">저장</button>';
                    buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.payAppDrafting()">상신</button>';
                }else if(data.DOC_STATUS == "10"){
                    $("#mode").val("view");
                    buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
                }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_save()">저장</button>';
                    buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \''+data.DOC_MENU_CD+'\', \''+data.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
                }else if(data.DOC_STATUS == "100"){
                    $("#mode").val("view");
                    if($("#status").val() == "rev"){
                        buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_regExnpInPop('+data.PAY_APP_SN+', '+data.EXNP_SN+')">여입결의서 작성</button>';
                    }
                    buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', \''+data.DOC_MENU_CD+'\');">열람</button>';
                    $("#addBtn").hide();
                }else{
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_save()">저장</button>';
                }
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="regExnp.fn_save()">저장</button>';
            }
        } else {
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_save()">저장</button>';
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
            regExnp.payAppBtnSet(rs);
        }

        $("#busnCd").data("kendoDropDownList").value(rs.BUSN_CD);
        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE);

        if($("#status").val() != "" && $("#status").val() != null){
            if($("#status").val() == "rev"){
                $("#payAppType").data("kendoRadioGroup").value(1);
            } else if($("#status").val() == "in"){
                $("#payAppType").data("kendoRadioGroup").value(2);
            } else if($("#status").val() == "re"){
                $("#payAppType").data("kendoRadioGroup").value(3);
            } else if($("#status").val() == "alt"){
                $("#payAppType").data("kendoRadioGroup").value(4);
            }
        }

        $("#exnpDe").val(rs.EXNP_DE);
        $("#pjtNm").val(rs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN);
        $("#exnpBriefs").val(rs.EXNP_BRIEFS);
        $("#addExnpBriefs").val(rs.ADD_EXNP_BRIEFS);

        $("#bnkSn").val(rs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM);
        $("#accNm").val(rs.ACC_NM);
        $("#accNo").val(rs.ACC_NO);

        if(rs.DT_CK == "Y"){
            $("#DT1").val(rs.DT1);
            $("#DT2").val(rs.DT2);
            $("#DT3").val(rs.DT3);
        }

        if(ls.length > 0){
            $("#payDestTb").html("");
            $("#budgetNm").val(ls[0].BUDGET_NM);
            $("#budgetSn").val(ls[0].BUDGET_SN);
            if(rs.DT_CK == "N"){
                $("#DT1").val(ls[0].TR_DE);
                $("#DT2").val(fn_stringToDate(ls[0].TR_DE, 5));
                $("#DT3").val(fn_stringToDate(ls[0].TR_DE, 6));
            }
        }
        for(var i=0; i < ls.length; i++) {
            var item = ls[i];

            regExnpDet.global.createHtmlStr = "";
            var clIdx = regExnpDet.global.itemIndex;

            regExnpDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regExnpDet.global.itemIndex + '" style="text-align: center;">';
            if(item.DET_STAT != "N"){
                regExnpDet.global.createHtmlStr += "";
                regExnpDet.global.createHtmlStr += '   <td>' +
                    '       <input type="text" id="eviType' + regExnpDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                    '   </td>';
                regExnpDet.global.createHtmlStr += '' +
                    '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regExnpDet.fn_popRegDet(1, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="hidden" id="payDestSn' + regExnpDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="hidden" id="exnpDestSn' + regExnpDet.global.itemIndex + '" value="'+item.EXNP_DET_SN+'" name="exnpDestSn" class="exnpDestSn">' +
                    '       <input type="text" style="width: 80%;" id="crmNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
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
                    '       <input type="text" id="trDe' + regExnpDet.global.itemIndex + '" class="trDe">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="busnCd' + regExnpDet.global.itemIndex + '" value="'+item.BUSN_CD+'" class="busnCd">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="totCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(3, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="text" disabled style="width: 70%" id="card' + regExnpDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                    '       <input type="hidden" id="cardNo'+regExnpDet.global.itemIndex+'" value="'+item.CARD_NO+'" className="cardNo" />' +
                    '   </td>';

                if($("#status").val() == "rev") {
                    regExnpDet.global.createHtmlStr += "" +
                        '   <td>' +
                        '       <input type="checkbox" id="advances' + regExnpDet.global.itemIndex + '" class="advances" style="width: 26px; height: 26px" ';
                    if (item.ADVANCES == "Y") {
                        regExnpDet.global.createHtmlStr += "checked";
                    }
                    regExnpDet.global.createHtmlStr += '/>' +
                        '   </td>' +
                        '   <td>' +
                        '       <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regExnpDet.fn_regExnpAttPop(' + regExnpDet.global.itemIndex + ')">첨부</button>' +
                        '   </td>';
                }

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

                $("#busnCd" + regExnpDet.global.itemIndex).kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        { text: "1000-(사)캠틱종합기술원", value: "1000" },
                        { text: "2000-(사)캠틱종합기술원", value: "2000" },
                        { text: "3000-(사)캠틱종합기술원", value: "3000" },
                        { text: "4000-(사)캠틱종합기술원", value: "4000" },
                        { text: "5000-(사)캠틱종합기술원", value: "5000" },
                        { text: "6000-(사)캠틱종합기술원", value: "6000" },
                        { text: "7000-(사)캠틱종합기술원", value: "7000" }
                    ]
                });

                customKendo.fn_textBox(["crmNm" + regExnpDet.global.itemIndex, "crmBnkNm"  + regExnpDet.global.itemIndex
                    , "crmAccHolder" + regExnpDet.global.itemIndex
                    , "crmAccNo" + regExnpDet.global.itemIndex, "totCost" + regExnpDet.global.itemIndex
                    , "supCost" + regExnpDet.global.itemIndex, "vatCost" + regExnpDet.global.itemIndex
                    ,"card" + regExnpDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regExnpDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());
                $("#trDe" + regExnpDet.global.itemIndex).val(item.TR_DE);

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
        let checked = 0;
        var data = {
            exnpSn : $("#exnpSn").val()
        }
        var result = customKendo.fn_customAjax("/payApp/pop/getExnpData", data);
        var ls = result.list;
        if($("#status").val() == "rev"){
            for(var i=0; i < ls.length; i++) {
                var item = ls[i];
                var eviType = item.EVID_TYPE;
                if(item.ADVANCES == "Y"){
                    continue;
                }
                if(eviType == "1" || eviType == "2"){
                    if(item.FILE2 == null || item.FILE3 == null || item.FILE4 == null || item.FILE5 == null){
                        alert(item.CRM_NM + "의 필수 첨부파일이 등록되지 않았습니다.");
                        checked = 1;
                        break;
                    }
                }else if(eviType == "3"){
                    if(item.FILE7 == null || item.FILE8 == null || item.FILE9 == null){
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
        }

        if(checked == 1){
            return;
        }

        $("#payAppDraftFrm").one("submit", function(){
            var url = "/popup/exnp/approvalFormPopup/exnpApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/exnp/approvalFormPopup/exnpApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    setData : function(){
        var data = {
            payAppSn : $("#payAppSn").val(),
        }
        
        if($("#item").val() != "" && $("#item").val() != null){
            data.payAppDetSn = $("#item").val();
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;

        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE);

        if($("#status").val() != "" && $("#status").val() != null){
            if($("#status").val() == "rev"){
                $("#payAppType").data("kendoRadioGroup").value(1);
            } else if($("#status").val() == "in"){
                $("#payAppType").data("kendoRadioGroup").value(2);
            } else if($("#status").val() == "re"){
                $("#payAppType").data("kendoRadioGroup").value(3);
            } else if($("#status").val() == "alt"){
                $("#payAppType").data("kendoRadioGroup").value(4);
            }
        }

        $("#exnpDe").val(rs.APP_DE);
        $("#pjtNm").val(rs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN);
        $("#exnpBriefs").val(rs.APP_TITLE);
        $("#addExnpBriefs").val(rs.APP_CONT);

        $("#bnkSn").val(rs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM);
        $("#accNm").val(rs.ACC_NM);
        $("#accNo").val(rs.ACC_NO);

        if(rs.DIV_CD != ""){
            $("#busnCd").data("kendoDropDownList").value(rs.DIV_CD);
        }else{
            $("#busnCd").data("kendoDropDownList").value("2000");
        }

        if(ls.length > 0){
            $("#payDestTb").html("");
            $("#budgetNm").val(ls[0].BUDGET_NM);
            $("#budgetSn").val(ls[0].BUDGET_SN);
        }
        for(var i=0; i < ls.length; i++){
            var item = ls[i];

            regExnpDet.global.createHtmlStr = "";

            var clIdx = regExnpDet.global.itemIndex;
            regExnpDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regExnpDet.global.itemIndex + '" style="text-align: center;">';
            if(item.DET_STAT != "N"){
                regExnpDet.global.createHtmlStr += "";

                regExnpDet.global.createHtmlStr += '   <td>' +
                    '       <input type="text" id="eviType' + regExnpDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                    '   </td>';

                regExnpDet.global.createHtmlStr += '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(1, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="hidden" id="payDestSn' + regExnpDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="text" style="width: 80%;" id="crmNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
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
                    '   </td>';
                    if(rs.DIV_CD != ""){
                        regExnpDet.global.createHtmlStr += "" +
                        '   <td>' +
                        '       <input id="busnCd' + regExnpDet.global.itemIndex + '" value="'+rs.DIV_CD+'" class="busnCd">' +
                        '   </td>';
                    }else{
                        regExnpDet.global.createHtmlStr += "" +
                            '   <td>' +
                            '       <input id="busnCd' + regExnpDet.global.itemIndex + '" value="2000" class="busnCd">' +
                            '   </td>';
                    }
                regExnpDet.global.createHtmlStr += "" +
                    '   <td>' +
                    '       <input type="text" id="totCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(3, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="text" disabled style="width: 70%" id="card' + regExnpDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                    '       <input type="hidden" id="cardNo' + regExnpDet.global.itemIndex + '" className="cardNo" />' +
                    '   </td>';

                if($("#status").val() == "rev") {
                    regExnpDet.global.createHtmlStr += "" +
                        '   <td>' +
                        '       <input type="checkbox" id="advances' + regExnpDet.global.itemIndex + '" class="advances" style="width: 26px; height: 26px" ';
                    if (item.ADVANCES == "Y") {
                        regExnpDet.global.createHtmlStr += "checked";
                    }
                    regExnpDet.global.createHtmlStr += '/>' +
                        '   </td>' +
                        '   <td>' +
                        '       <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regExnpDet.fn_regPayAttPop(' + regExnpDet.global.itemIndex + ')">첨부</button>' +
                        '   </td>' +
                        '</tr>';
                }

                $("#payDestTb").append(regExnpDet.global.createHtmlStr);

                if(item.DET_STAT == "N"){
                    $("#revertBtn"+ regExnpDet.global.itemIndex).css("display", "none");
                    $("#pay"+ regExnpDet.global.itemIndex).css("background-color", "#afafaf");
                }


                var itemIndex = 0 ;
                itemIndex = regExnpDet.global.itemIndex;

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
                    change : function(e){
                        var value = this.value();

                        if(value != ""){
                            if(value == "6"){
                                alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                            } else {
                                regExnpDet.fn_popRegDet(value, e.sender.element[0].id.replace("eviType", ""));
                            }
                        }
                    },
                });


                $("#busnCd" + regExnpDet.global.itemIndex).kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        { text: "1000-(사)캠틱종합기술원", value: "1000" },
                        { text: "2000-(사)캠틱종합기술원", value: "2000" },
                        { text: "3000-(사)캠틱종합기술원", value: "3000" },
                        { text: "4000-(사)캠틱종합기술원", value: "4000" },
                        { text: "5000-(사)캠틱종합기술원", value: "5000" },
                        { text: "6000-(사)캠틱종합기술원", value: "6000" },
                        { text: "7000-(사)캠틱종합기술원", value: "7000" }
                    ]
                })

                customKendo.fn_textBox(["crmNm" + regExnpDet.global.itemIndex, "crmBnkNm"  + regExnpDet.global.itemIndex
                    , "crmAccHolder" + regExnpDet.global.itemIndex
                    , "crmAccNo" + regExnpDet.global.itemIndex, "totCost" + regExnpDet.global.itemIndex
                    , "supCost" + regExnpDet.global.itemIndex, "vatCost" + regExnpDet.global.itemIndex
                    ,"card" + regExnpDet.global.itemIndex]);

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

    setIncpData : function(){
        var data = {
            payIncpSn : $("#payIncpSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayIncpData", data);
        var rs = result.map;
        var ls = result.list;

        console.log(rs);
        console.log(ls);

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

        if(rs.DIV_CD != ""){
            $("#busnCd").data("kendoDropDownList").value(rs.DIV_CD);
        }else{
            $("#busnCd").data("kendoDropDownList").value("2000");
        }

        if(ls.length > 0){
            $("#payDestTb").html("");
            $("#budgetNm").val(ls[0].BUDGET_NM);
            $("#budgetSn").val(ls[0].BUDGET_SN);
        }
        for(var i=0; i < ls.length; i++){
            var item = ls[i];

            regExnpDet.global.createHtmlStr = "";

            var clIdx = regExnpDet.global.itemIndex;
            regExnpDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regExnpDet.global.itemIndex + '" style="text-align: center;">';
            if(item.DET_STAT != "N"){
                regExnpDet.global.createHtmlStr += "";

                regExnpDet.global.createHtmlStr += '   <td>' +
                    '       <input type="text" id="eviType' + regExnpDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                    '   </td>';

                regExnpDet.global.createHtmlStr += '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(1, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="hidden" id="payDestSn' + regExnpDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="text" style="width: 80%;" id="crmNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                    '       <input type="hidden" id="trCd' + regExnpDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmBnkNm' + regExnpDet.global.itemIndex + '" value="" class="crmBnkNm">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccNo' + regExnpDet.global.itemIndex + '" value="" class="crmAccNo">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmAccHolder' + regExnpDet.global.itemIndex + '" value="" class="crmAccHolder">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="trDe' + regExnpDet.global.itemIndex + '" value="'+item.TR_DE+'" class="trDe">' +
                    '   </td>';
                if(rs.DIV_CD != ""){
                    regExnpDet.global.createHtmlStr += "" +
                        '   <td>' +
                        '       <input id="busnCd' + regExnpDet.global.itemIndex + '" value="'+rs.DIV_CD+'" class="busnCd">' +
                        '   </td>';
                }else{
                    regExnpDet.global.createHtmlStr += "" +
                        '   <td>' +
                        '       <input id="busnCd' + regExnpDet.global.itemIndex + '" value="2000" class="busnCd">' +
                        '   </td>';
                }
                regExnpDet.global.createHtmlStr += "" +
                    '   <td>' +
                    '       <input type="text" id="totCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(3, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="text" disabled style="width: 70%" id="card' + regExnpDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                    '       <input type="hidden" id="cardNo' + regExnpDet.global.itemIndex + '" className="cardNo" />' +
                    '   </td>';

                if($("#status").val() == "rev") {
                    regExnpDet.global.createHtmlStr += "" +
                        '   <td>' +
                        '       <input type="checkbox" id="advances' + regExnpDet.global.itemIndex + '" class="advances" style="width: 26px; height: 26px" ';
                    if (item.ADVANCES == "Y") {
                        regExnpDet.global.createHtmlStr += "checked";
                    }
                    regExnpDet.global.createHtmlStr += '/>' +
                        '   </td>' +
                        '   <td>' +
                        '       <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regExnpDet.fn_regPayAttPop(' + regExnpDet.global.itemIndex + ')">첨부</button>' +
                        '   </td>' +
                        '</tr>';
                }

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
                    change : function(){
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


                $("#busnCd" + regExnpDet.global.itemIndex).kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        { text: "1000-(사)캠틱종합기술원", value: "1000" },
                        { text: "2000-(사)캠틱종합기술원", value: "2000" },
                        { text: "3000-(사)캠틱종합기술원", value: "3000" },
                        { text: "4000-(사)캠틱종합기술원", value: "4000" },
                        { text: "5000-(사)캠틱종합기술원", value: "5000" },
                        { text: "6000-(사)캠틱종합기술원", value: "6000" },
                        { text: "7000-(사)캠틱종합기술원", value: "7000" }
                    ]
                })

                customKendo.fn_textBox(["crmNm" + regExnpDet.global.itemIndex, "crmBnkNm"  + regExnpDet.global.itemIndex
                    , "crmAccHolder" + regExnpDet.global.itemIndex
                    , "crmAccNo" + regExnpDet.global.itemIndex, "totCost" + regExnpDet.global.itemIndex
                    , "supCost" + regExnpDet.global.itemIndex, "vatCost" + regExnpDet.global.itemIndex
                    ,"card" + regExnpDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regExnpDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);
                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").enable(false)
                regExnpDet.global.itemIndex++;
            }

        }

        if(ls.length > 0){
            regExnpDet.global.itemIndex--;
        }
    },

    fn_viewStat : function(){
        var stat = $("#status").val();

        if(stat == "rev"){
            $("#payAppType").data("kendoRadioGroup").enable(false);
            // $("#appDe").data("kendoDatePicker").enable(false);
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#exnpAddBtn").css("display", "");
            $("#titleStat").text("검토")
        }
    },

    fn_save : function(){
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
            DT1 : $("#DT1").val(),
            DT2 : $("#DT2").val(),
            DT3: $("#DT3").val(),

            regEmpSeq : $("#regEmpSeq").val(),
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
                payDestSn : $("#payDestSn" + i).val(),
                evidType : $("#eviType" + i).val(),
                budgetNm : $("#budgetNm").val(),
                budgetSn : $("#budgetSn").val(),
                crmNm : $("#crmNm" + i).val(),
                trCd : $("#trCd" + i).val(),
                crmBnkNm : $("#crmBnkNm" + i).val(),
                crmAccNo : $("#crmAccNo" + i).val(),
                crmAccHolder : $("#crmAccHolder" + i).val(),
                trDe : $("#trDe" + i).val(),
                totCost : regExnp.uncomma($("#totCost" + i).val()),
                supCost : regExnp.uncomma($("#supCost" + i).val()),
                vatCost : regExnp.uncomma($("#vatCost" + i).val()),
                card : $("#card" + i).val(),
                cardNo : $("#cardNo" + i).val(),
                advances : $("#advances" + i).is(':checked') ? "Y" : "N",
                busnCd : $("#busnCd" + i).data("kendoDropDownList").value()
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

        $.ajax({
            url : "/payApp/setExnpData",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    var url = "";
                    if($("#status").val() == "rev"){
                        url = "/payApp/pop/regExnpPop.do?payAppSn=" + rs.params.payAppSn + "&exnpSn=" + rs.params.exnpSn + "&status=rev";
                    } else if ($("#status").val() == "in") {
                        url = "/payApp/pop/regExnpPop.do?payAppSn=" + rs.params.payAppSn + "&exnpSn=" + rs.params.exnpSn + "&status=in";
                    } else if ($("#status").val() == "re") {
                        url = "/payApp/pop/regExnpPop.do?exnpSn=" + rs.params.exnpSn + "&status=re";
                    } else if ($("#status").val() == "alt") {
                        url = "/payApp/pop/regExnpPop.do?exnpSn=" + rs.params.exnpSn + "&status=alt";
                    } else {
                        url = "/payApp/pop/regExnpPop.do?payAppSn=" + rs.params.payAppSn + "&exnpSn=" + rs.params.exnpSn;
                    }

                    location.href = url;
                }
            }
        });
    },

    crmInfoChange : function(){
        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")
    },

    fn_popCamCrmList : function(crmSnId, crmNmId){
        regExnp.global.crmSnId = crmSnId;
        regExnp.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regExnp.global.crmSnId).val($("#crmSn").val())
        $("#" + regExnp.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost : function(obj){
        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){
            $("#vatCost" + index).val(regExnp.comma(Math.round(Number(regExnp.uncomma($("#totCost" + index).val())) / 10)));
            $("#supCost" + index).val(regExnp.comma(Number(regExnp.uncomma($("#totCost" + index).val())) - Number(regExnp.uncomma($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regExnp.comma(Number(regExnp.uncomma($("#totCost" + index).val())) - Number(regExnp.uncomma($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regExnp.comma(Number(regExnp.uncomma($("#totCost" + index).val())) - Number(regExnp.uncomma($("#vatCost" + index).val()))));
        }
        regExnp.inputNumberFormat(obj);
    },

    inputNumberFormat : function(obj){
        obj.value = regExnp.comma(regExnp.uncomma(obj.value));
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_projectPop : function(){
        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_budgetPop : function(idx){
        if($("#pjtSn").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        var url = "/mng/pop/budgetView.do?pjtSn=" + $("#pjtSn").val() + "&status="+$("#status").val()+"&idx=" + idx;
        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function(){
        var url = "/mng/pop/bankView.do";
        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_regExnpInPop : function(payAppSn){
        var url = "/payApp/pop/regExnpPop.do?payAppSn=" + payAppSn + "&status=in";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
}


var regExnpDet = {

    global : {
        itemIndex : 0,
        createHtmlStr : "",
    },
    
    fn_defaultScript : function(){

        customKendo.fn_textBox(["crmNm0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
        ,"card0"]);

        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

    },

    addRow : function (){

        regExnpDet.global.createHtmlStr = "";
        var clIdx = regExnpDet.global.itemIndex + 1;

        regExnpDet.global.createHtmlStr += "" +
            '<tr class="payDestInfo newArray" id="pay' + clIdx + '" style="text-align: center;">';
        if(item.DET_STAT != "N"){
            regExnpDet.global.createHtmlStr += "";
            regExnpDet.global.createHtmlStr += '   <td>' +
                '       <input type="text" id="eviType' + clIdx + '" class="eviType" style="width: 100%">' +
                '   </td>';
            regExnpDet.global.createHtmlStr += '' +
                '   <td>' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer" onclick="regExnpDet.fn_popRegDet(1, '+clIdx+')"></i>' +
                '       <input type="hidden" id="payDestSn' + clIdx + '" name="payDestSn" class="payDestSn">' +
                '       <input type="hidden" id="exnpDestSn' + clIdx + '" name="exnpDestSn" class="exnpDestSn">' +
                '       <input type="text" style="width: 80%;" id="crmNm' + clIdx + '" class="crmNm">' +
                '       <input type="hidden" id="trCd' + clIdx + '" class="trCd">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmBnkNm' + clIdx + '" class="crmBnkNm">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmAccNo' + clIdx + '" class="crmAccNo">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmAccHolder' + clIdx + '" class="crmAccHolder">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="trDe' + clIdx + '" class="trDe">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="busnCd' + clIdx + '" class="busnCd">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="totCost' + clIdx + '" class="totCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="supCost' + clIdx + '" class="supCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="vatCost' + clIdx + '" class="vatCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(3, '+clIdx+')"></i>' +
                '       <input type="text" disabled style="width: 70%" id="card' + clIdx + '" class="card">' +
                '       <input type="hidden" id="cardNo'+clIdx+'" className="cardNo" />' +
                '   </td>';

            if($("#status").val() == "rev") {
                regExnpDet.global.createHtmlStr += "" +
                    '   <td>' +
                    '       <input type="checkbox" id="advances' + clIdx + '" class="advances" style="width: 26px; height: 26px" ';
                if (item.ADVANCES == "Y") {
                    regExnpDet.global.createHtmlStr += "checked";
                }
                regExnpDet.global.createHtmlStr += '/>' +
                    '   </td>' +
                    '   <td>' +
                    '       <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regExnpDet.fn_regExnpAttPop(' + clIdx + ')">첨부</button>' +
                    '   </td>';
            }

            regExnpDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <div style="text-align: center">' +
                '           <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regExnpDet.delRow(' + clIdx + ')">삭제</button>' +
                '       </div>' +
                '   </td>' +
            '</tr>';

            $("#payDestTb").append(regExnpDet.global.createHtmlStr);

            if(item.DET_STAT == "N"){
                $("#revertBtn"+ clIdx).css("display", "none");
                $("#pay"+ clIdx).css("background-color", "#afafaf");
            }

            var itemIndex = clIdx;

            $("#eviType" + clIdx).kendoDropDownList({
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
                change : function(){
                    var value = $("#eviType" + clIdx).val();

                    if(value != ""){
                        if(value == "6"){
                            alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.");
                        } else {
                            regExnpDet.fn_popRegDet(value, itemIndex);
                        }
                    }
                }
            });

            $("#busnCd" + clIdx).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "1000-(사)캠틱종합기술원", value: "1000" },
                    { text: "2000-(사)캠틱종합기술원", value: "2000" },
                    { text: "3000-(사)캠틱종합기술원", value: "3000" },
                    { text: "4000-(사)캠틱종합기술원", value: "4000" },
                    { text: "5000-(사)캠틱종합기술원", value: "5000" },
                    { text: "6000-(사)캠틱종합기술원", value: "6000" },
                    { text: "7000-(사)캠틱종합기술원", value: "7000" }
                ]
            });

            customKendo.fn_textBox(["crmNm" + clIdx, "crmBnkNm"  + clIdx
                , "crmAccHolder" + clIdx
                , "crmAccNo" + clIdx, "totCost" + clIdx
                , "supCost" + clIdx, "vatCost" + clIdx
                ,"card" + clIdx]);

            customKendo.fn_datePicker("trDe" + clIdx, "month", "yyyy-MM-dd", new Date());
            $("#trDe" + clIdx).val();

            $("#eviType" + clIdx).data("kendoDropDownList").value();

            regExnpDet.global.itemIndex++;
        }
    },

    delRow : function(row){
        if($(".payDestInfo").length > 1){
            $("#pay" + row).remove();
            /*regPayDet.global.itemIndex--;*/
        }
    },

    fn_popRegDet : function(v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_exnpAdd : function(){

        if(!confirm("지출결의를 작성하시겠습니까?")){
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


        regExnpDet.fn_regExnpPop(keyArr);


    },

    fn_regExnpPop : function(keyArr){

        var url = "/payApp/pop/reqExnpPop.do?item=" + keyArr;

        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regPayAttPop : function(row){
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
    },

    fn_regExnpAttPop : function(row){
        let key = $("#exnpDestSn"+row).val();
        if(key == "" || key == null){
            alert("첨부파일 조회중 오류가 발생하였습니다. 새로고침 후 진행 바랍니다.");
            return;
        }
        let eviType = $("#eviType"+row).data("kendoDropDownList").value();
        var url = "/payApp/pop/regExnpAttPop.do?exnpDestSn=" + key + "&eviType=" + eviType;
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },
}

