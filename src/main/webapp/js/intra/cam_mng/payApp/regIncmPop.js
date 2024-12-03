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
        fileArray : [],
        attFiles : [],
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("payIncpDe", "month", "yyyy-MM-dd", new Date());

        customKendo.fn_textBox(["pjtNm", "accNm", "accNo", "bnkNm", "budgetNm", "exnpEmpNm", "exnpDeptNm"]);

        $("#appCont").kendoTextArea({
            rows: 5,
        });

        regIncm.global.radioGroupData = [
            { label: "없음", value: "N" },
            { label: "의무경비", value: "A" },
            { label: "고정경비", value: "B" },
            { label: "업무추진비", value: "C" }
        ]
        // customKendo.fn_radioGroup("payAppStat", regIncm.global.radioGroupData, "horizontal");

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
            regIncm.setData();

            regIncm.fn_viewStat();
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

        if($("#payDepoSn").val() != ""){
            regIncm.setData2();
        }
    },

    payAppBtnSet: function (data){
        let buttonHtml = "";
        console.log(data)
        if($("#status").val() != "rev"){
            if(data != null){
                if(data.DOC_STATUS == "0"){
                    buttonHtml += '<button type="button" id="delBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="regIncm.fn_delBtn()">삭제</button>';
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.fn_save()">저장</button>';
                    buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.payIncpDrafting()">상신</button>';
                }else if(data.DOC_STATUS == "10" || data.DOC_STATUS == "50"){
                    buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
                }else if(data.DOC_STATUS == "20"){
                    buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', \''+data.DOC_MENU_CD+'\');">결재중</button>';
                }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
                    buttonHtml += '<button type="button" id="delBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="regIncm.fn_delBtn()">삭제</button>';
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.fn_save()">저장</button>';
                    buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \''+data.DOC_MENU_CD+'\', \''+data.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
                }else if(data.DOC_STATUS == "100"){
                    buttonHtml += '<button type="button" id="viewIncpReBtn" style="margin-right: 5px; display:none" class="k-button k-button-solid-info" onclick="regIncm.fn_regIncpRePop('+data.PAY_INCP_SN+')">반제결의서 작성</button>';
                    buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.fn_regExnpRePop('+data.PAY_INCP_SN+')">반납결의서 작성</button>';
                    buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncm.fn_regExnpAltPop('+data.PAY_INCP_SN+')">대체결의서 작성</button>';
                    buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', \''+data.DOC_MENU_CD+'\');">열람</button>';
                    $("#addBtn").hide();
                }else if(data.DOC_STATUS == "111"){
                    buttonHtml += "<button type=\"button\" id=\"tempBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+data.DOC_ID+"', '"+data.DOC_MENU_CD+"', '"+data.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
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

    tempOrReDraftingPop : function(docId, menuCd, approKey, linkageType, type, target){
        $("#docId").val(docId);
        $("#approKey").val(approKey);
        $("#type").val(type);

        $("#payIncpDraftFrm").one("submit", function() {
            var url = "/popup/exnp/approvalFormPopup/payIncpApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top-=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/exnp/approvalFormPopup/payIncpApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    setData : function (){
        console.log("setData");
        var data = {
            payIncpSn : $("#payIncpSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayIncpData", data);
        var rs = result.map;
        var ls = result.list;
        var fileList = result.fileList;

        regIncm.global.fileArray = fileList;

        var fileText = "";
        for(var i = 0 ; i < fileList.length; i++){
            fileText += fileList[i].file_org_name + "." + fileList[i].file_ext + " | ";
        }

        $("#fileText").text(fileText.substring(0, fileText.length - 2));

        regIncm.payAppBtnSet(rs);

        if(rs.DOC_STATUS == 100 && (ls[0].EVID_TYPE == "1" || ls[0].EVID_TYPE == "3" || ls[0].EVID_TYPE == "5" || ls[0].EVID_TYPE == "6")){
            $("#reIncpTable").css("display", "");
            $("#viewIncpReBtn").css("display", "");
            var totAmt = 0; // 총금액
            var dgAmt = 0;  // 대기금액
            var scAmt = 0;  // 완료금액
            var baAmt = 0;  // 잔액
            for(var i = 0; i < ls.length; i++){
                totAmt += parseInt(ls[i].TOT_COST);
            }

            var reIncpList = customKendo.fn_customAjax("/pay/regIncmReData", data);
            reIncpList = reIncpList.list;
            for(var i = 0; i < reIncpList.length; i++){
                if(reIncpList[i].RE_STAT == "Y"){
                    scAmt += parseInt(reIncpList[i].TOT_COST);
                } else {
                    dgAmt += parseInt(reIncpList[i].TOT_COST);
                }
            }
            baAmt = totAmt - (scAmt + dgAmt);

            var html = "";
            $("#reIncpBody").html(html);
            html += '<tr style="text-align: right; font-weight: bold;">';
            html += '   <td style="font-size: 13px">'+comma(totAmt)+'</td>';
            html += '   <td style="font-size: 13px">'+comma(scAmt)+'</td>';
            html += '   <td style="font-size: 13px">'+comma(dgAmt)+'</td>';
            html += '   <td style="font-size: 13px">'+comma(baAmt)+'</td>';
            html += '</tr>';

            $("#reIncpBody").html(html);
        }


        $("#appDe").val(rs.APP_DE);
        $("#payIncpDe").val(rs.PAY_EXNP_DE);
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

        $("#g20EmpCd").val(rs.G20_EMP_CD);
        $("#g20DeptCd").val(rs.G20_DEPT_CD);
        $("#exnpEmpNm").val(rs.REG_EMP_NAME);
        $("#exnpEmpSeq").val(rs.REG_EMP_SEQ);
        $("#exnpDeptNm").val(rs.REG_DEPT_NAME);
        $("#exnpDeptSeq").val(rs.REG_DEPT_SEQ);

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
                '       <i class="k-i-plus k-icon" style="cursor: pointer" id="plusIcon' + regIncmDet.global.itemIndex + '"  onclick="regIncmDet.fn_popRegDet(1, '+regIncmDet.global.itemIndex+')"></i>' +
                '       <input type="text" style="width: 70%" id="crmNm' + regIncmDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                '       <input type="hidden" id="trCd' + regIncmDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="regNo' + regIncmDet.global.itemIndex + '" value="'+item.REG_NO+'" class="regNo">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="ceoNm' + regIncmDet.global.itemIndex + '" value="'+item.CEO_NM+'" class="ceoNm">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="etc' + regIncmDet.global.itemIndex + '" value="'+item.ETC+'" class="etc">' +
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
                '       <i class="k-i-plus k-icon" style="cursor: pointer" id="pIcon' + regIncmDet.global.itemIndex + '"  onclick="regIncmDet.fn_popRegDet(7, ' + regIncmDet.global.itemIndex + ')"></i>' +
                '       <input type="text" style="width: 80%;" disabled id="card' + regIncmDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                '       <input type="hidden" id="cardNo' + regIncmDet.global.itemIndex + '" value="'+item.CARD_NO+'" class="cardNo">' +
                '   </td>' +

                '   <td style="display: none;">' +
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
                                value = 7;
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
                ,"card" + regIncmDet.global.itemIndex, "etc" + regIncmDet.global.itemIndex, "budgetNm" + regIncmDet.global.itemIndex
                , "regNo" + regIncmDet.global.itemIndex, "ceoNm" + regIncmDet.global.itemIndex]);

            customKendo.fn_datePicker("trDe" + regIncmDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

            $("#trDe" + regIncmDet.global.itemIndex).val(item.TR_DE);
            $("#eviType" + itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);

            regIncmDet.global.itemIndex++;
        }

        if(ls.length > 0){
            //regIncmDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");
    },

    setData2 : function (){
        var data = {
            payDepoSn : $("#payDepoSn").val(),
        }

        $.ajax({
            url: "/pay/getPayDepoData",
            data: data,
            type: "post",
            dataType: "json",
            success: function (result) {
                var rs = result.data;
                var fileList = result.fileList;

                regIncm.global.fileArray = fileList;

                var fileText = "";
                for(var i = 0 ; i < fileList.length; i++){
                    fileText += fileList[i].file_org_name + "." + fileList[i].file_ext + " | ";
                }

                $("#fileText").text(fileText.substring(0, fileText.length - 2));

                rs.crmNo = rs.REG_NO.toString().replace(/-/g, "");
                var g20Result = customKendo.fn_customAjax("/g20/getCrmInfo", rs);

                if(g20Result.map) {
                    $("#crmNm0").val(g20Result.map.TR_NM);
                    $("#trCd0").val(g20Result.map.TR_CD);
                } else {
                    $("#crmNm0").val("");
                    $("#trCd0").val("");
                }
                // $("#crmNm0").val(g20Result.map.TR_NM ? g20Result.map.TR_NM : "");
                // $("#trCd0").val(g20Result.map.TR_CD ? g20Result.map.TR_CD : "");
                $("#regNo0").val(rs.REG_NO.toString().replace(/-/g, ""));
                $("#ceoNm0").val(rs.CEO_NM ? rs.CEO_NM : "");
                $("#trDe0").val(rs.APP_DE);
                $("#payIncpDe").val(rs.PAY_INCP_DE);

                $("#pjtNm").val(rs.AFT_PJT_NM);
                $("#pjtSn").val(rs.AFT_PJT_SN);
                $("#pjtCd").val(rs.PJT_CD);
                $("#budgetNm").val(rs.BUDGET_NM);
                $("#budgetSn").val(rs.BUDGET_SN);
                $("#appCont").val(rs.DEPO_TITLE);
                $("#appDe").val(rs.APP_DE);

                $("#accNm").val(rs.ACC_NM);
                $("#bnkSn").val(rs.BNK_SN);
                $("#accNo").val(rs.ACC_NO);
                $("#bnkNm").val(rs.BNK_NM);

                $("#taxType").val(rs.TAX_CH_GUBUN);
                if(rs.TAX_CH_GUBUN == "1" || rs.TAX_CH_GUBUN == "") {
                    $("#supCost0").val(regIncm.comma(Math.round(Number(rs.DEPO_AMT) / 1.1)));
                    $("#vatAmt0").val(regIncm.comma(Number(rs.DEPO_AMT) - Math.round(Number(rs.DEPO_AMT) / 1.1)));
                } else {
                    $("#supCost0").val(regIncm.comma(rs.DEPO_AMT));
                    $("#vatAmt0").val("0");
                }
                $("#totCost0").val(regIncm.comma(rs.DEPO_AMT));
                $("#supCost0").trigger("keyup");

                rs.PROFIT_CODE ? $("#busnCd").data("kendoDropDownList").value(rs.PROFIT_CODE) : $("#busnCd").data("kendoDropDownList").value("");
                rs.PROFIT_CODE ? $("#busnExCd").data("kendoDropDownList").value(rs.PROFIT_CODE) : $("#busnExCd").data("kendoDropDownList").value("");

                console.log(rs);

                if(rs.TAX_CH_GUBUN == "1"){             // 과세
                    if(rs.EVI_TYPE == 1){               // 세금계산서
                        if(rs.GUBUN == "a"){            // 청구
                            $("#eviType0").data("kendoDropDownList").value(1);
                        } else if(rs.GUBUN == "b"){     // 영수
                            $("#eviType0").data("kendoDropDownList").value(2);
                        }
                    } else if (rs.EVI_TYPE == 3){       // 신용카드
                        $("#eviType0").data("kendoDropDownList").value(5);
                    }
                } else if(rs.TAX_CH_GUBUN == "2"){      // 면세
                    if (rs.EVI_TYPE == 2){              // 계산서
                        if(rs.GUBUN == "a"){            // 청구
                            $("#eviType0").data("kendoDropDownList").value(3);
                        } else if(rs.GUBUN == "b"){     // 영수
                            $("#eviType0").data("kendoDropDownList").value(4);
                        }
                    } else if (rs.EVI_TYPE == 3){       // 신용카드
                        $("#eviType0").data("kendoDropDownList").value(6);
                    }
                } else if(rs.TAX_CH_GUBUN == "3"){      // 비과세
                    $("#eviType0").data("kendoDropDownList").value(7);
                }
            }
        });
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

    fn_save : function (){
        var parameters = {
            appDe : $("#appDe").val(),
            payExnpDe : $("#payIncpDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            pjtCd : $("#pjtCd").val(),
            budgetNm : $("#budgetNm").val(),
            budgetSn : $("#budgetSn").val(),
            busnCd : $("#busnCd").val(),
            busnExCd : $("#busnExCd").val(),
            exnpEmpSeq : $("#exnpEmpSeq").val(),
            g20EmpCd : $("#g20EmpCd").val(),
            g20DeptCd : $("#g20DeptCd").val(),
            appCont : $("#appCont").val(),
            bnkSn : $("#bnkSn").val(),
            bnkNm : $("#bnkNm").val(),
            accNm : $("#accNm").val(),
            accNo : $("#accNo").val(),
            // payAppStat : $("#payAppStat").data("kendoRadioGroup").value(),
            regEmpSeq : $("#regEmpSeq").val(),
            empSeq : $("#regEmpSeq").val()
        }

        if(parameters.pjtCd == ""){
            alert("사업을 선택해주세요.");
            return;
        }

        if(parameters.budgetSn == ""){
            alert("비목을 선택해주세요.");
            return;
        }

        if(parameters.appCont == ""){
            alert("적요가 입력되지 않았습니다.");
            return;
        }

        if(parameters.accNm == ""){
            alert("입금계좌를 선택해주세요.");
            return;
        }

        if($("#payIncpSn").val() != ""){
            parameters.payIncpSn = $("#payIncpSn").val();
        }

        if($("#payDepoSn").val() != ""){
            parameters.payDepoSn = $("#payDepoSn").val();
        }

        var itemArr = new Array()
        var flag = true;
        $.each($(".payDestInfo"), function(i, v){
            var index = $(this).find(".payDestSn").attr("id").slice(-1);

            var data = {
                evidType : $("#eviType" + index).val(),
                crmNm : $("#crmNm" + index).val(),
                trCd : $("#trCd" + index).val(),
                trDe : $("#trDe" + index).val(),
                totCost : regIncm.uncomma($("#totCost" + index).val()),
                supCost : regIncm.uncomma($("#supCost" + index).val()),
                vatCost : regIncm.uncomma($("#vatCost" + index).val()),
                card : $("#card" + index).val(),
                cardNo : $("#cardNo" + index).val(),
                etc : $("#etc" + index).val(),
                regNo: $("#regNo" + index).val(),
                ceoNm: $("#ceoNm" + index).val(),
                iss : $("#iss" + index).val(),
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

        var flag2 = true;
        var tempArr = [];
        for(var i = 0; i < itemArr.length; i++){
            if(tempArr.indexOf(itemArr[i].evidType) == -1) {
                tempArr.push(itemArr[i].evidType);
            }
        }

        if(tempArr.length > 1){
            flag2 = false;
        }

        if(!flag2) {
            alert("선택된 증빙유형이 다르므로 저장할 수 없습니다.\n다시 확인해주세요.");
            return;
        }

        parameters.itemArr = JSON.stringify(itemArr);

        console.log(parameters);

        var fd = new FormData();

        for(var key in parameters){
            fd.append(key, parameters[key]);
        }

        regIncm.global.fileArray = regIncm.global.fileArray.concat(regIncm.global.attFiles);
        if(regIncm.global.fileArray != null){
            for(var i = 0; i < regIncm.global.fileArray.length; i++){
                fd.append("fileList", regIncm.global.fileArray[i]);
            }
        }

        $.ajax({
            url : "/payApp/payIncpSetData",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    location.href="/payApp/pop/regIncmPop.do?payIncpSn=" + rs.params.payIncpSn;
                    opener.gridReload();
                } else if(rs.code == 404){
                    location.href = '/error/page?code=' + rs.code;
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
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regIncm.global.crmSnId).val($("#crmSn").val())
        $("#" + regIncm.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost: function(obj){

        var index = obj.id.replace(/[^0-9]/g, '');
        if(obj.id.match("totCost")){

            $("#vatCost" + index).val(regIncm.comma(Number(regIncm.uncomma($("#totCost" + index).val())) - Math.round(Number(regIncm.uncomma($("#totCost" + index).val())) * 100 / 110)));
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

    fn_projectPop : function (type){

        var url = "/project/pop/g20ProjectView.do?type=" + type;

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        /** 추후 temp변수명 수정 예정 */
        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&idx=N&temp=2&status=incp";

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

    fn_regExnpRePop : function(payAppSn){
        var url = "/payApp/pop/regExnpPop.do?payIncpSn=" + payAppSn + "&status=re";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regExnpAltPop : function(payAppSn){
        var url = "/payApp/pop/regExnpPop.do?payIncpSn=" + payAppSn + "&status=alt";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regIncmAttPop : function (){
        var url = "/payApp/pop/regIncmAttPop.do";

        if($("#payIncpSn").val() != ""){
            url += "?payIncpSn=" + $("#payIncpSn").val();
        } else if ($("#payDepoSn").val() != ""){
            url += "?payDepoSn=" + $("#payDepoSn").val();
        }

        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regIncpRePop : function(key){
        var url = "/payApp/pop/regIncpRePop.do?payIncpSn=" + key + "&type=new";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_delBtn : function(){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        var data = {
            payIncpSn : $("#payIncpSn").val()
        }


        $.ajax({
            url : "/payApp/delIncpData",
            data : data,
            type : "post",
            dataType : "json",
            success:function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");

                    opener.parent.incomeList.gridReload()
                    window.close();
                }
            }
        });
    }
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
                            value = 7;
                        }
                        regIncmDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
            ,"card0", "etc0", "iss0", "budgetNm0", "regNo0", "ceoNm0"]);

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
            '       <i class="k-i-plus k-icon" style="cursor: pointer" id="plusIcon' + regIncmDet.global.itemIndex + '"  onclick="regIncmDet.fn_popRegDet(1, '+regIncmDet.global.itemIndex+')"></i>' +
            '       <input type="text" style="width: 70%" id="crmNm' + regIncmDet.global.itemIndex + '" class="crmNm">' +
            '       <input type="hidden" id="trCd' + regIncmDet.global.itemIndex + '" class="trCd">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="regNo' + regIncmDet.global.itemIndex + '" class="regNo">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="ceoNm' + regIncmDet.global.itemIndex + '" class="ceoNm">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="etc' + regIncmDet.global.itemIndex + '" class="etc">' +
            '   </td>' +

            '   <td>' +
            '       <input type="text" id="trDe' + regIncmDet.global.itemIndex + '" class="trDe">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="totCost' + regIncmDet.global.itemIndex + '" value="0" class="totCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="supCost' + regIncmDet.global.itemIndex + '" value="0" class="supCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="vatCost' + regIncmDet.global.itemIndex + '" value="0" class="vatCost" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <i class="k-i-plus k-icon" style="cursor: pointer" id="pIcon' + regIncmDet.global.itemIndex + '"  onclick="regIncmDet.fn_popRegDet(7, ' + regIncmDet.global.itemIndex + ')"></i>' +
            '       <input type="text" disabled id="card' + regIncmDet.global.itemIndex + '" class="card">' +
            '       <input type="hidden" id="cardNo' + regIncmDet.global.itemIndex + '" class="cardNo">' +
            '   </td>' +

            '   <td style="display: none;">' +
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
                            value = 7;
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
            ,"card" + regIncmDet.global.itemIndex, "etc" + regIncmDet.global.itemIndex, "budgetNm" + regIncmDet.global.itemIndex
            , "regNo" + regIncmDet.global.itemIndex, "ceoNm" + regIncmDet.global.itemIndex]);

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

