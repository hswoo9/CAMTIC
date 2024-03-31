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
        fileArray : [],
        attFiles : [],
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

        if($("#payAppType").data("kendoRadioGroup").value() == "2"){
            $("#trBank").text("입금계좌");
        } else {
            $("#trBank").text("출금계좌");
        }


        customKendo.fn_datePicker("reqDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("reqExDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("reqEndDe", 'month', "yyyy-MM-dd", new Date());
        /** 회계발의일, 등기일자, 지출부기재 일자 폼 추가 */
        if($("#status").val() == "rev" || $("#status").val() == "in" || $("#status").val() == "re" || $("#status").val() == "alt"){
            $("#dtTr").show();
            customKendo.fn_datePicker("DT1", 'month', "yyyy-MM-dd", new Date());
            customKendo.fn_datePicker("DT2", 'month', "yyyy-MM-dd", new Date());
            customKendo.fn_datePicker("DT3", 'month', "yyyy-MM-dd", new Date());
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

    payAppBtnSet : function(data, evidType){
        let buttonHtml = "";
        if($("#status").val() == "rev" || $("#status").val() == "in" || $("#status").val() == "re" || $("#status").val() == "alt"){
            if(data != null){
                if(data.DOC_STATUS == "0" || $("#docMode").val() == "new"){
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_save()">저장</button>';
                    if($("#docMode").val() != "new"){
                        buttonHtml += '<button type="button" id="delBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="regExnp.fn_delete()">삭제</button>';
                    }
                    buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.payAppDrafting()">상신</button>';
                }else if(data.DOC_STATUS == "10" || data.DOC_STATUS == "50"){
                    $("#mode").val("view");
                    buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \'camticExnp_'+data.EXNP_SN+'\', 1, \'retrieve\');">회수</button>';
                }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
                    buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_save()">저장</button>';
                    if($("#docMode").val() != "new"){
                        buttonHtml += '<button type="button" id="delBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="regExnp.fn_delete()">삭제</button>';
                    }
                    buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \'exnp\', \'camticExnp_'+data.EXNP_SN+'\', 2, \'reDrafting\');">재상신</button>';
                }else if(data.DOC_STATUS == "100"){
                    $("#mode").val("view");
                    if($("#status").val() == "rev" && evidType != "1" && evidType != "2" && evidType != "3"){
                        if(data.RE_STAT == "N") {
                            buttonHtml += '<button type="button" id="approveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_approve()">지출결의서 승인</button>';
                        } else {
                            buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regExnp.fn_regExnpInPop('+data.PAY_APP_SN+', '+data.EXNP_SN+')">여입결의서 작성</button>';
                        }
                    }
                    buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \'camticExnp_'+data.EXNP_SN+'\', \'exnp\');">열람</button>';
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
        console.log("dataSet");

        var data = {
            exnpSn : $("#exnpSn").val(),
            payAppSn : $("#payAppSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getExnpData", data);
        var rs = result.map;
        var ls = result.list;
        var fileList = result.fileList;
        regExnp.global.fileArray = fileList;

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

            regExnp.global.fileArray.push(fileList2[i]);
        }
        $("#fileText").text(fileThumbText);

        if($("#exnpSn").val() != ""){
            regExnp.payAppBtnSet(rs, ls[0].EVID_TYPE);
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
        $("#pjtCd").val(rs.PJT_CD);
        $("#exnpBriefs").val(rs.EXNP_BRIEFS);
        $("#addExnpBriefs").val(rs.ADD_EXNP_BRIEFS);

        $("#bnkSn").val(rs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM);
        $("#accNm").val(rs.ACC_NM);
        $("#accNo").val(rs.ACC_NO);

        $("#DT1").val(rs.DT1);
        $("#DT2").val(rs.DT2);
        $("#DT3").val(rs.DT3);

        $("#reqDe").val(rs.REQ_DE);
        $("#reqExDe").val(rs.REQ_EXNP_DE);
        $("#reqEndDe").val(rs.REQ_END_DE);

        if(ls.length > 0){
            $("#payDestTb").html("");
            $("#budgetNm").val(ls[0].BUDGET_NM);
            $("#budgetSn").val(ls[0].BUDGET_SN);
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
                    '       <input type="hidden" id="fileNo' + regExnpDet.global.itemIndex + '" value="'+item.FILE_NO+'" class="fileNo" style="width: 100%">' +
                    '       <input type="hidden" id="authNo' + regExnpDet.global.itemIndex + '" value="'+item.AUTH_NO+'" class="authNo" style="width: 100%">' +
                    '       <input type="hidden" id="authHh' + regExnpDet.global.itemIndex + '" value="'+item.AUTH_HH+'" class="authHh" style="width: 100%">' +
                    '       <input type="hidden" id="authDd' + regExnpDet.global.itemIndex + '" value="'+item.AUTH_DD+'" class="authDd" style="width: 100%">' +
                    '       <input type="hidden" id="buySts' + regExnpDet.global.itemIndex + '" value="'+item.BUY_STS+'" class="buySts">' +
                    '   </td>';
                regExnpDet.global.createHtmlStr += '' +
                    '   <td>' +
                    '       <input style="width: 100%" id="appTeam' + regExnpDet.global.itemIndex + '" name="appTeam" class="appTeam">' +
                    '   </td>' +
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
                    '       <input type="text" id="regNo' + regExnpDet.global.itemIndex + '" value="'+item.REG_NO+'" class="regNo">' +
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
                    '       <input type="text" id="totCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(3, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="text" disabled style="width: 70%" id="card' + regExnpDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                    '       <input type="hidden" id="cardNo'+regExnpDet.global.itemIndex+'" value="'+item.CARD_NO+'" className="cardNo" />' +
                    '   </td>';
                if($("#payAppSn").val() == "undefined" && ($("#status").val() == "in" || $("#status").val() == "re" || $("#status").val() == "alt") && (rs.DOC_STATUS == 0 || rs.DOC_STATUS == 30 || rs.DOC_STATUS == 40)){
                    regExnpDet.global.createHtmlStr += '' +
                        '   <td id="newInTd">' +
                        '       <div style="text-align: center">' +
                        '           <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regExnpDet.delRow(' + clIdx + ')">삭제</button>' +
                        '       </div>' +
                        '   </td>' +
                        '</tr>';
                    $("#newInCol").css("display", "");
                    $("#newInTh").css("display", "");
                    $("#addBtnDiv").css("display", "");
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
                    , "crmAccHolder" + regExnpDet.global.itemIndex, "regNo" + regExnpDet.global.itemIndex
                    , "crmAccNo" + regExnpDet.global.itemIndex, "totCost" + regExnpDet.global.itemIndex
                    , "supCost" + regExnpDet.global.itemIndex, "vatCost" + regExnpDet.global.itemIndex
                    ,"card" + regExnpDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regExnpDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());
                $("#trDe" + regExnpDet.global.itemIndex).val(item.TR_DE);

                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);
                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").enable(false)

                var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
                    deptLevel : 2
                });
                customKendo.fn_dropDownList("appTeam" + regExnpDet.global.itemIndex, ds.rs, "dept_name", "dept_seq","5");
                $("#appTeam" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.TEAM_SEQ);

                regExnpDet.global.itemIndex++;
            }

        }

        if(ls.length > 0){
            regExnpDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");

        if($("#docMode").val() == "new"){
            $("#DT1").data("kendoDatePicker").value(new Date());
            $("#DT2").data("kendoDatePicker").value(new Date());
            $("#DT3").data("kendoDatePicker").value(new Date());

            $("#reqDe").data("kendoDatePicker").value(new Date());
            $("#reqExDe").data("kendoDatePicker").value(new Date());
            $("#reqEndDe").data("kendoDatePicker").value(new Date());

            $("#exnpDe").val($("#DT3").val())
        }
    },

    payAppDrafting: function() {
        let checked = 0;
        var data = {
            exnpSn : $("#exnpSn").val()
        }
        var result = customKendo.fn_customAjax("/payApp/pop/getExnpData", data);
        var ls = result.list;

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
        console.log("setData");
        var data = {
            payAppSn : $("#payAppSn").val(),

        }

        if($("#detArr").val() != ""){
            data.detArr = $("#detArr").val()
        }

        $(".fileNo").each(function(){
            console.log(this.value);
        });
        
        if($("#item").val() != "" && $("#item").val() != null){
            data.payAppDetSn = $("#item").val();
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;
        var fileList = result.fileList;
        regExnp.global.fileArray = fileList;

        var fileThumbText = "";
        for(let i=0; i<fileList.length; i++){
            if(fileThumbText != ""){
                fileThumbText += " | ";
            }
            fileThumbText += fileList[i].file_org_name;
            fileThumbText += "." + fileList[i].file_ext;
        }

        // 지급/지출 양식 첨부 추가
        var result2 = customKendo.fn_customAjax("/payApp/pop/getExnpDocData", {exnpSn: $("#exnpSn").val(), payAppSn : $("#payAppSn").val()});
        var fileList2 = result2.fileList;
        for(let i=0; i<fileList2.length; i++){
            if(fileThumbText != ""){
                fileThumbText += " | ";
            }
            fileThumbText += fileList2[i].file_org_name;
            fileThumbText += "." + fileList2[i].file_ext;

            regExnp.global.fileArray.push(fileList2[i]);
        }

        $("#fileText").text(fileThumbText);

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

        $("#reqDe").val(rs.REQ_DE);
        $("#DT3").val(rs.REQ_DE);
        $("#reqExDe").val(rs.PAY_EXNP_DE);
        $("#DT2").val(rs.APP_DE);
        // $("#reqEndDe").val(rs.REQ_END_DE);
        $("#DT1").val(ls[0].TR_DE);

        if(ls[0].EVID_TYPE == "1" || ls[0].EVID_TYPE == "2" || ls[0].EVID_TYPE == "3"){
            $("#exnpDe").val(ls[0].TR_DE);
        } else {
            $("#exnpDe").val(rs.REQ_DE);
        }
        $("#pjtNm").val(rs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN);
        $("#pjtCd").val(rs.PJT_CD);
        $("#exnpBriefs").val(rs.APP_TITLE);
        $("#addExnpBriefs").val(rs.APP_CONT);

        $("#bnkSn").val(rs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM);
        $("#accNm").val(rs.ACC_NM);
        $("#accNo").val(rs.ACC_NO);

        if(rs.DIV_CD != ""){
            $("#busnCd").data("kendoDropDownList").value(rs.DIV_CD);
        }else{
            $("#busnCd").data("kendoDropDownList").value("1000");
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
                    '       <input type="hidden" id="fileNo' + regExnpDet.global.itemIndex + '" class="fileNo" value="'+item.FILE_NO+'" style="width: 100%">' +
                    '       <input type="hidden" id="authNo' + regExnpDet.global.itemIndex + '" class="authNo" value="'+item.AUTH_NO+'" style="width: 100%">' +
                    '       <input type="hidden" id="authHh' + regExnpDet.global.itemIndex + '" class="authHh" value="'+item.AUTH_HH+'" style="width: 100%">' +
                    '       <input type="hidden" id="authDd' + regExnpDet.global.itemIndex + '" class="authDd" value="'+item.AUTH_DD+'" style="width: 100%">' +
                    '       <input type="hidden" id="buySts' + regExnpDet.global.itemIndex + '" class="buySts" value="'+item.BUY_STS+'">' +
                    '   </td>';

                regExnpDet.global.createHtmlStr += '' +
                    '   <td>' +
                    '       <input type="text" id="appTeam' + regExnpDet.global.itemIndex + '" class="appTeam" style="width: 100%">' +
                    '   </td>' +
                    '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(1, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="hidden" id="payDestSn' + regExnpDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="text" style="width: 80%;" id="crmNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                    '       <input type="hidden" id="trCd' + regExnpDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmBnkNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_BNK_NM+'" class="crmBnkNm">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="regNo' + regExnpDet.global.itemIndex + '" value="'+item.REG_NO+'" class="regNo">' +
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
                            '       <input id="busnCd' + regExnpDet.global.itemIndex + '" value="1000" class="busnCd">' +
                            '   </td>';
                    }
                regExnpDet.global.createHtmlStr += "" +
                    '   <td>' +
                    '       <input type="text" id="totCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.TOT_COST)+'" class="totCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="supCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="vatCost' + regExnpDet.global.itemIndex + '" value="'+regExnp.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '   </td>' +
                    '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(3, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="text" disabled style="width: 70%" id="card' + regExnpDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                    '       <input type="hidden" id="cardNo' + regExnpDet.global.itemIndex + '"  value="'+item.CARD_NO+'"  class="cardNo" />' +
                    '   </td>';

                    // regExnpDet.global.createHtmlStr += '/>' +
                    //     '   </td>' +
                    //     '   <td>' +
                    //     '       <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regExnpDet.fn_regPayAttPop(' + regExnpDet.global.itemIndex + ')">첨부</button>' +
                    //     '   </td>' +
                    //     '</tr>';

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
                        { text: "사업소득자", value: "5" },
                        { text: "기타소득자", value: "9" },
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
                    , "crmAccHolder" + regExnpDet.global.itemIndex, "regNo" + regExnpDet.global.itemIndex
                    , "crmAccNo" + regExnpDet.global.itemIndex, "totCost" + regExnpDet.global.itemIndex
                    , "supCost" + regExnpDet.global.itemIndex, "vatCost" + regExnpDet.global.itemIndex
                    ,"card" + regExnpDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regExnpDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());
                $("#trDe" + itemIndex).val(item.TR_DE);


                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);
                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").enable(false)

                var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
                    deptLevel : 2
                });
                customKendo.fn_dropDownList("appTeam" + regExnpDet.global.itemIndex, ds.rs, "dept_name", "dept_seq","5");
                $("#appTeam" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.TEAM_SEQ);

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

        $("#exnpDe").val(rs.APP_DE);
        $("#pjtNm").val(rs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN);
        $("#pjtCd").val(rs.PJT_CD);
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
                    '       <input type="hidden" id="fileNo' + regExnpDet.global.itemIndex + '" class="fileNo" value="'+item.FILE_NO+'" style="width: 100%">' +
                    '       <input type="hidden" id="authNo' + regExnpDet.global.itemIndex + '" class="authNo" value="'+item.AUTH_NO+'" style="width: 100%">' +
                    '       <input type="hidden" id="authHh' + regExnpDet.global.itemIndex + '" class="authHh" value="'+item.AUTH_HH+'" style="width: 100%">' +
                    '       <input type="hidden" id="authDd' + regExnpDet.global.itemIndex + '" class="authDd" value="'+item.AUTH_DD+'" style="width: 100%">' +
                    '       <input type="hidden" id="buySts' + regExnpDet.global.itemIndex + '" class="buySts" value="'+item.BUY_STS+'">' +
                    '   </td>';

                regExnpDet.global.createHtmlStr += '   ' +
                    '   <td>' +
                    '       <input type="text" id="appTeam' + regExnpDet.global.itemIndex + '" class="appTeam" style="width: 100%">' +
                    '   </td>' +
                    '   <td>' +
                    '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(1, '+regExnpDet.global.itemIndex+')"></i>' +
                    '       <input type="hidden" id="payDestSn' + regExnpDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                    '       <input type="text" style="width: 80%;" id="crmNm' + regExnpDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                    '       <input type="hidden" id="trCd' + regExnpDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="crmBnkNm' + regExnpDet.global.itemIndex + '" value="" class="crmBnkNm">' +
                    '   </td>' +
                    '   <td>' +
                    '       <input type="text" id="regNo' + regExnpDet.global.itemIndex + '" value="" class="regNo">' +
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
                    '       <input type="hidden" id="cardNo' + regExnpDet.global.itemIndex + '"  value="'+item.CARD_NO+'"  class="cardNo" />' +
                    '   </td>';

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
                        { text: "사업소득자", value: "5" },
                        { text: "기타소득자", value: "9" },
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
                    , "crmAccHolder" + regExnpDet.global.itemIndex, "regNo" + regExnpDet.global.itemIndex
                    , "crmAccNo" + regExnpDet.global.itemIndex, "totCost" + regExnpDet.global.itemIndex
                    , "supCost" + regExnpDet.global.itemIndex, "vatCost" + regExnpDet.global.itemIndex
                    ,"card" + regExnpDet.global.itemIndex]);

                customKendo.fn_datePicker("trDe" + regExnpDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);
                $("#eviType" + regExnpDet.global.itemIndex).data("kendoDropDownList").enable(false)

                var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
                    deptLevel : 2
                });
                customKendo.fn_dropDownList("appTeam" + regExnpDet.global.itemIndex, ds.rs, "dept_name", "dept_seq","5");
                $("#appTeam" + regExnpDet.global.itemIndex).data("kendoDropDownList").value(item.TEAM_SEQ);

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
            pjtCd : $("#pjtCd").val(),
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
            reqDe : $("#reqDe").val(),
            reqExDe : $("#reqExDe").val(),
            reqEndDe: $("#reqEndDe").val(),

            regEmpSeq : $("#regEmpSeq").val(),
        }

        if($("#item").val() != "" && $("#item").val() != null){
            parameters.payAppDetSn = $("#item").val();
        }

        if($("#docMode").val() != "new"){
            if($("#exnpSn").val() != ""){
                parameters.exnpSn = $("#exnpSn").val();
            }
        }

        if($("#busnCd").val() == ""){
            alert("사업장을 선택해주세요.");
            return;
        }

        if(parameters.payAppSn == 'undefined'){
            parameters.payAppSn = null;
        }

        var itemArr = new Array()
        var flag = true;
        $.each($(".payDestInfo"), function(i, v){
            var data = {
                payDestSn : $("#payDestSn" + i).val(),
                evidType : $("#eviType" + i).val(),
                teamSeq : $("#appTeam" + i).data("kendoDropDownList").value(),
                teamName : $("#appTeam" + i).data("kendoDropDownList").text(),
                authNo : $("#authNo" + i).val(),
                authDd : $("#authDd" + i).val(),
                authHh : $("#authHh" + i).val(),
                buySts : $("#buySts" + i).val(),
                budgetNm : $("#budgetNm").val(),
                budgetSn : $("#budgetSn").val(),
                crmNm : $("#crmNm" + i).val(),
                trCd : $("#trCd" + i).val(),
                crmBnkNm : $("#crmBnkNm" + i).val(),
                regNo : $("#regNo" + i).val(),
                crmAccNo : $("#crmAccNo" + i).val(),
                crmAccHolder : $("#crmAccHolder" + i).val(),
                trDe : $("#trDe" + i).val(),
                totCost : regExnp.uncommaN($("#totCost" + i).val()),
                supCost : regExnp.uncommaN($("#supCost" + i).val()),
                vatCost : regExnp.uncommaN($("#vatCost" + i).val()),
                card : $("#card" + i).val(),
                cardNo : $("#cardNo" + i).val(),
                busnCd : $("#busnCd" + i).data("kendoDropDownList").value()
            }

            if($("#fileNo" + i).val() != "" && $("#fileNo" + i).val() != null && $("#fileNo" + i).val() != "undefined"){
                data.fileNo = $("#fileNo" + i).val();
            }

            if(data.eviType == ""){
                flag = false;
            }
            if(data.buySts == undefined || data.buySts == null || data.buySts == "" || data.buySts == "undefined"){
                data.buySts = "";
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

    fn_approve : function (){
        var parameters = {
            exnpSn : $("#exnpSn").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            empSeq : $("#regEmpSeq").val()
        }

        if(!confirm("승인하시겠습니까?")){
            return ;
        }

        const result = customKendo.fn_customAjax("/pay/resolutionExnpAppr", parameters);
        if(result.flag){
            if(result.code == 200){
                alert("승인이 완료되었습니다.");
                try {
                    opener.regExnp.gridReload();
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
            $("#vatCost" + index).val(regExnp.comma(Math.round(Number(regExnp.uncommaN($("#totCost" + index).val())) / 10)));
            $("#supCost" + index).val(regExnp.comma(Number(regExnp.uncommaN($("#totCost" + index).val())) - Number(regExnp.uncommaN($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regExnp.comma(Number(regExnp.uncommaN($("#totCost" + index).val())) - Number(regExnp.uncommaN($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regExnp.comma(Number(regExnp.uncommaN($("#totCost" + index).val())) - Number(regExnp.uncommaN($("#vatCost" + index).val()))));
        }
        regExnp.inputNumberFormat(obj);
    },

    inputNumberFormat : function(obj){
        obj.value = regExnp.comma(regExnp.uncommaN(obj.value));
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    uncommaN : function(str){
        str = String(str);
        return str.replace(/[^\d-]|(?<=\d)-/g, '');
    },

    fn_projectPop : function(){
        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_budgetPop : function(idx){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&status="+$("#status").val()+"&idx=" + idx;
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

        var detArr = "";
        $(".exnpDestSn").each(function(){
            detArr += this.value + ",";
        });

        detArr = detArr.substring(0, detArr.length - 1);

        var url = "/payApp/pop/regExnpPop.do?payAppSn=" + payAppSn + "&status=in&detArr=" + detArr;

        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_delete : function(){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var params = {
            exnpSn : $("#exnpSn").val(),
            payAppSn : $("#payAppSn").val(),
            status : $("#status").val()
        }

        $.ajax({
            url : "/payApp/delExnpData",
            data : params,
            type : "post",
            dataType : "json",
            success: function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");
                    window.close();
                } else {
                    alert("오류가 발생하였습니다.\n담당자에게 문의하세요.")
                }
            }
        });
    }
}


var regExnpDet = {

    global : {
        itemIndex : 0,
        createHtmlStr : "",
    },
    
    fn_defaultScript : function(){

        customKendo.fn_textBox(["crmNm0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
        ,"card0", "regNo0"]);

        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

        if($("#regFlag").val() == "new"){
            $("#addBtnDiv").css("display", "");

            $("#newInCol").css("display", "");
            $("#newInTh").css("display", "");
            $("#newInTd0").css("display", "");

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
                change : function(){
                    var value = $("#eviType0").val();

                    if(value != ""){
                        if(value == "6"){
                            alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.");
                        } else {
                            regExnpDet.fn_popRegDet(value, 0);
                        }
                    }
                }
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

            var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
                deptLevel : 2
            });

            customKendo.fn_dropDownList("appTeam0", ds.rs, "dept_name", "dept_seq","5");
            $("#appTeam0").data("kendoDropDownList").value($("#teamSeq").val());
        }

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
                '       <input type="hidden" id="fileNo' + clIdx + '" class="fileNo" style="width: 100%">' +
                '       <input type="hidden" id="authNo' + clIdx + '" class="authNo" style="width: 100%">' +
                '       <input type="hidden" id="authHh' + clIdx + '" class="authHh" style="width: 100%">' +
                '       <input type="hidden" id="authDd' + clIdx + '" class="authDd" style="width: 100%">' +
                '       <input type="hidden" id="buySts' + clIdx + '" class="buySts">' +
                '   </td>';
            regExnpDet.global.createHtmlStr += '' +
                '   <td>' +
                '       <input type="text" id="appTeam' + clIdx + '" class="appTeam" style="width: 100%">' +
                '   </td>' +
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
                '       <input type="text" id="regNo' + clIdx + '" class="regNo">' +
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
                '       <input type="text" id="totCost' + clIdx + '" class="totCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="supCost' + clIdx + '" class="supCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="vatCost' + clIdx + '" class="vatCost" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(3, '+clIdx+')"></i>' +
                '       <input type="text" disabled style="width: 70%" id="card' + clIdx + '" class="card">' +
                '       <input type="hidden" id="cardNo'+clIdx+'" class="cardNo" />' +
                '   </td>';


            regExnpDet.global.createHtmlStr += "" +
                '   <td id="newInTd'+clIdx+'" style="display: none;">' +
                '       <div style="text-align: center">' +
                '           <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regExnpDet.delRow(' + clIdx + ')">삭제</button>' +
                '       </div>' +
                '   </td>' +
            '</tr>';



            $("#payDestTb").append(regExnpDet.global.createHtmlStr);

            if($("#regFlag").val() == "new" || ($("#payAppSn").val() == "undefined" && $("#status").val() == "in")){
                $("#newInTd" + clIdx).css("display", "");
            }
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
                    { text: "사업소득자", value: "5" },
                    { text: "기타소득자", value: "9" },
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

            customKendo.fn_textBox(["crmNm" + clIdx, "crmBnkNm"  + clIdx, "regNo" + clIdx
                , "crmAccHolder" + clIdx
                , "crmAccNo" + clIdx, "totCost" + clIdx
                , "supCost" + clIdx, "vatCost" + clIdx
                ,"card" + clIdx]);

            customKendo.fn_datePicker("trDe" + clIdx, "month", "yyyy-MM-dd", new Date());
            $("#trDe" + clIdx).val();

            $("#eviType" + clIdx).data("kendoDropDownList").value();

            var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
                deptLevel : 2
            });

            customKendo.fn_dropDownList("appTeam" + clIdx, ds.rs, "dept_name", "dept_seq","5");
            $("#appTeam" + clIdx).data("kendoDropDownList").value($("#teamSeq").val());

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

    fn_regPayAttPop : function (){
        var url = "/payApp/pop/regPayAttPop.do?payAppSn=" + $("#payAppSn").val() + "&type=exnp";
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },
}

