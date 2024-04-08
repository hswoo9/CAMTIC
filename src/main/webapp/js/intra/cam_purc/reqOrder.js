const reqOr = {

    global : {
        faxNum : "",
        telNum : "",
    },

    fn_defaultScript : function(){
        reqOr.fn_pageSet();
        reqOr.fn_dataSet();
    },

    fn_pageSet : function(){
        customKendo.fn_textBox(["crmNm" ,"estAmt", "vatAmt", "totAmt", "itemNm", "itemStd"
            ,"itemEa", "itemUnitAmt", "itemUnit", "itemAmt", "itemEtc", "discountAmt"]);

        var radioDataSource = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]

        var radioExpDataSource = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
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
        // customKendo.fn_radioGroup("expType", radioExpDataSource, "horizontal");
        customKendo.fn_radioGroup("vat", radioVatDataSource, "horizontal");
        // customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");

        $("#vat").data("kendoRadioGroup").bind("select", function(e){
            var len = $("#claimTbody > tr").length;
            var vatAmt = 0;
            var itemAmt = 0;
            var totAmt = 0;
            var disAmt = uncommaN($("#discountAmt").val()) ? uncommaN($("#discountAmt").val()) : 0;
            for(var i = 0 ; i < len ; i++){
                if(i == 0){
                    totAmt += Number(uncomma($("#itemAmt").val()));
                } else {
                    totAmt += Number(uncomma($("#itemAmt" + i).val()));
                }
            }

            totAmt = Number(totAmt) - Number(disAmt);
            console.log(totAmt);

            if(e.target.val() == "N"){
                vatAmt = (totAmt / 10);
                $("#estAmt").val(comma(totAmt - vatAmt));
                $("#vatAmt").val(comma(vatAmt));
            } else {
                $("#estAmt").val(comma(totAmt));
                $("#vatAmt").val(0);
            }
            $("#totAmt").val(comma(totAmt));
        });

        reqOr.fn_kendoUIEnableSet();

        let html = ''
        html += '<tr>';
        html += '   <th scope="row" class="text-center th-color">발주일</th>';
        html += '   <td>';
        html += '       <input id="orderDt" style="width: 150px"/>';
        html += '   </td>';
        html += '   <th scope="row" class="text-center th-color">납품 요청일</th>';
        html += '   <td>';
        html += '       <input id="goodsDt" style="width: 150px"/>';
        html += '   </td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <th scope="row" class="text-center th-color">전화번호</th>';
        html += '   <td>';
        html += '       <input id="PHNum" style="width: 300px"/>';
        html += '   </td>';
        html += '   <th scope="row" class="text-center th-color">팩스번호</th>';
        html += '   <td>';
        html += '       <input id="FaxNum" style="width: 300px"/>';
        html += '   </td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <th scope="row" class="text-center th-color">특이사항</th>';
        html += '   <td colspan="3">';
        html += '       <textarea id="significant" style="width: 1080px; height: 100px"></textarea>';
        html += '   </td>';
        html += '</tr>';
        $("#order").append(html);

        customKendo.fn_datePicker("orderDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("goodsDt", '', "yyyy-MM-dd", new Date());
        $("#orderDt, #goodsDt").attr("readonly", true);
        customKendo.fn_textBox(["PHNum", "FaxNum"]);
        customKendo.fn_textArea(["significant"]);

        var significantValue = "";
        significantValue += "* 도번(최종승인일) : \n";
        significantValue += "* 필요성적서 : \n";
        significantValue += " (성적서에 기본 정보를 잘 기재하여 주시기 바랍니다.) \n";
        significantValue += "* 납품장소 : \n";
        significantValue += "* 담당자 : \n";
        significantValue += "* 특이사항 : \n";

       $("#significant").val(significantValue);
    },

    fn_dataSet : function(){
        console.log("fn_dataSet");
        const result = customKendo.fn_customAjax("/purc/getPurcClaimData", {
            claimSn : $("#claimSn").val(),
            purcSn : $("#purcSn").val()
        });
        const orderMap = result.data;

        $("#purcDeptName").text(orderMap.DEPT_NAME);
        $("#purcEmpName").text(orderMap.EMP_NAME_KR);

        $("#estAmt").val(comma(orderMap.EST_AMT));
        $("#vatAmt").val(comma(orderMap.VAT_AMT));
        $("#totAmt").val(comma(orderMap.TOT_AMT));

        $("#vat").data("kendoRadioGroup").value(orderMap.VAT);
        $("#discountAmt").val(comma(orderMap.DISCOUNT_AMT))

        // $("#expType").data("kendoRadioGroup").value(orderMap.EXP_TYPE);

        $("#purcType").data("kendoRadioGroup").value(orderMap.PURC_TYPE);
        if($("input[name='purcType']:checked").val() != ""){
            $("#project").css("display", "");
            $("#pjtNm").text(orderMap.PJT_NM);
        } else {
            $("#project").css("display", "none");
        }

        this.fn_setClaimItem(orderMap);
        reqOr.fn_OrderBtnSet(orderMap);

        $("#PHNum").val(orderMap.CRM_TEL_NUM);
        $("#FaxNum").val(orderMap.CRM_FAX_NUM);

        if(orderMap.ORDER_CK == "Y"){
            $("#orderDt").val(orderMap.ORDER_DT);
            $("#goodsDt").val(orderMap.GOODS_DT);
            $("#significant").val(orderMap.SIGNIFICANT);
        }

        if(orderMap.ORDER_YN == "Y"){
            reqOr.fn_kendoUIEnableSet2(false);
        } else {
            reqOr.fn_kendoUIEnableSet2(true);
        }
    },

    fn_orderSave : function(type){
        const data = {
            claimSn: $("#claimSn").val(),
            orderDt: $("#orderDt").val(),
            goodsDt: $("#goodsDt").val(),
            PHNum: $("#PHNum").val(),
            FaxNum: $("#FaxNum").val(),
            significant: $("#significant").val()
        }

        if(data.orderDt == ""){alert("발주일을 입력해주세요"); return;}
        if(data.goodsDt == ""){alert("납품요청일를 입력해주세요"); return;}

        if(type == "save"){
            if(!confirm("저장하시겠습니까?")){
                return;
            }

            var result = customKendo.fn_customAjax("/purc/setOrderInfo", data);
            if(result.flag){
                alert("데이터 저장이 완료되었습니다.");
                location.reload();
                opener.purcClaim.gridReload();
            }else{
                alert("저장 중 오류가 발생하였습니다.");
            }
        } else if(type == "complete") {
            if(!confirm("발주 완료처리 하시겠습니까?")){
                return;
            }

            data.orderYn = "Y";

            var result = customKendo.fn_customAjax("/purc/setOrderYnInfo", data);
            if(result.flag){
                alert("완료되었습니다.");
                location.reload();
                opener.purcClaim.gridReload();
                reqOr.fn_kendoUIEnableSet2(false);
            }else{
                alert("저장 중 오류가 발생하였습니다.");
            }
        } else if(type == "cancel"){
            if(!confirm("발주 취소처리 하시겠습니까?")){
                return;
            }

            data.orderYn = "N";

            var result = customKendo.fn_customAjax("/purc/setOrderYnInfo", data);
            if(result.flag){
                alert("완료되었습니다.");
                location.reload();
                opener.purcClaim.gridReload();
                reqOr.fn_kendoUIEnableSet2(true);
            }else{
                alert("저장 중 오류가 발생하였습니다.");
            }
        }
    },

    fn_amtCalculator : function(){

        var len = $("#claimTbody > tr").length;
        var vatAmt = 0;
        var itemAmt = 0;
        var totAmt = 0;
        var disAmt = uncommaN($("#discountAmt").val()) ? uncommaN($("#discountAmt").val()) : 0;
        for(var i = 0 ; i < len ; i++){
            if(i == 0){
                totAmt += Number(uncomma($("#itemAmt").val()));
            } else {
                totAmt += Number(uncomma($("#itemAmt" + i).val()));
            }
        }

        totAmt = Number(totAmt);

        if($("#vat").data("kendoRadioGroup").value() == "N"){
            vatAmt = (totAmt / 10);
            $("#estAmt").val(comma(totAmt));
            $("#vatAmt").val(comma(vatAmt));
            totAmt = totAmt + vatAmt;
        } else {
            $("#estAmt").val(comma(totAmt));
            $("#vatAmt").val(0);
        }
        $("#totAmt").val(comma(totAmt));
        $("#discountAmt").val()
    },

    fn_popCamCrmList : function(){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_calc : function (idx, e){
        $("#itemAmt" + idx).val(comma(uncomma($("#itemUnitAmt" + idx).val()) * uncomma($("#itemEa" + idx).val())));

        reqOr.fn_amtCalculator();


        return inputNumberFormat(e);
    },

    fn_delete : function(e){
        var len = $("#claimTbody > tr").length

        if(len > 1){
            $(e).closest("tr").remove()
        }
    },

    fn_save : function(){
        var parameters = {
            purcSn : $("#purcSn").val(),
            purcType : $("#purcType").data("kendoRadioGroup").value(),
            // expType : $("#expType").data("kendoRadioGroup").value(),
            loginEmpSeq : $("#loginEmpSeq").val(),
            crmSn : $("#crmSn").val(),
            crmNm : $("#crmNm").val(),
            vat : $("#vat").data("kendoRadioGroup").value(),
            loginEmpSeq : $("#loginEmpSeq").val(),
            estAmt : uncomma($("#estAmt").val()),
            vatAmt : uncomma($("#vatAmt").val()),
            totAmt : uncomma($("#totAmt").val())
        }

        if($("#claimSn").val() != ""){
            parameters.claimSn = $("#claimSn").val();
        }

        if(parameters.loginEmpSeq == ""){
            alert("오류가 발생하였습니다. \n관리자에게 문의하세요.");
            return;
        }

        if(parameters.purcEmpSeq == ""){
            alert("구매요청자를 선택해주세요.");
            return;
        }

        if(parameters.crmSn == ""){
            alert("구매업체를 선택해주세요.");
            return;
        }
        if(parameters.vat == ""){
            alert("부가세 방식을 선택해주세요.");
            return;
        }



        var len = $("#claimTbody > tr").length;

        var itemArr = new Array()
        for(var i = 0 ; i < len ; i++){
            var itemParameters = {};
            if(i == 0){
                if($("#claimItemSn").val() != ""){
                    itemParameters.claimItemSn = $("#claimItemSn").val();
                }
                itemParameters.itemNm = $("#itemNm").val();
                itemParameters.itemStd = $("#itemStd").val();
                itemParameters.itemEa = uncomma($("#itemEa").val());
                itemParameters.itemUnitAmt = uncomma($("#itemUnitAmt").val());
                itemParameters.itemUnit = $("#itemUnit").val();
                itemParameters.itemAmt = uncomma($("#itemAmt").val());
                itemParameters.itemEtc = $("#itemEtc").val();
                // itemParameters.prodCd = $("#prodCd").data("kendoRadioGroup").value();
            } else {
                if($("#claimItemSn").val() != ""){
                    itemParameters.claimItemSn = $("#claimItemSn" + i).val();
                }
                itemParameters.itemNm = $("#itemNm" + i).val();
                itemParameters.itemStd = $("#itemStd" + i).val();
                itemParameters.itemEa = uncomma($("#itemEa" + i).val());
                itemParameters.itemUnitAmt = uncomma($("#itemUnitAmt" + i).val());
                itemParameters.itemUnit = $("#itemUnit" + i).val();
                itemParameters.itemAmt = uncomma($("#itemAmt" + i).val());
                itemParameters.itemEtc = $("#itemEtc" + i).val();
                // itemParameters.prodCd = $("#prodCd" + i).data("kendoRadioGroup").value();
            }

            if(itemParameters.itemNm != ""){
                itemArr.push(itemParameters);
            }
        }

        parameters.itemArr = JSON.stringify(itemArr);

        $.ajax({
            url : "/purc/setPurcClaimData",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");

                    location.href = "/purc/pop/reqClaiming.do?claimSn=" + rs.params.claimSn;
                }
            }
        });
    },

    fn_projectPop : function(){

        var url = "/project/pop/projectView.do?busnClass="+ $("input[name='purcType']:checked").val();

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_setClaimItem : function(e){
        var len = e.itemList.length;
        var index = 0;
        var html = '';
        $("#claimTbody").html("");
        console.log("eeeeeeeeeeeeeeeee", e.itemList);
        for(var i = 0 ; i < len ; i++){
            if(index == 0){
                html += '<tr class="claimItem newArray" id="item">';
                html += '   <td style="text-align: center">' +
                    '           <div id="claimIndex">'+(index+1)+'</div>' +
                    '           <input type="hidden" id="claimItemSn" value="'+e.itemList[i].CLAIM_ITEM_SN+'" />' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemNm" class="itemNm" value="'+e.itemList[i].ITEM_NM+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemStd" class="itemStd" value="'+e.itemList[i].ITEM_STD+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemEa" style="text-align: right" value="'+comma(e.itemList[i].ITEM_EA)+'" class="itemEa" onkeyup="reqOr.fn_calc(\'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnitAmt" style="text-align: right" value="'+comma(e.itemList[i].ITEM_UNIT_AMT)+'" class="itemUnitAmt" onkeyup="reqOr.fn_calc(\'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnit" class="itemUnit" value="'+e.itemList[i].ITEM_UNIT+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemAmt" class="itemAmt" value="'+comma(e.itemList[i].ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <label for="itemEtc"></label><input type="text" id="itemEtc" value="'+e.itemList[i].ITEM_ETC+'" class="itemEtc">' +
                    '       </td>' +
                    // '       <td>' +
                    // '           <input type="text" id="discountAmt" class="discountAmt" value="'+comma(e.itemList[i].DIF_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    // '       </td>' +
                    '       <td style="text-align: center" class="listDelBtn">' +
                    '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqOr.fn_delete(this)">' +
                    '               <span class="k-button-text">삭제</span>' +
                    '           </button>' +
                    '       </td>';
                html += '</tr>';
            } else {
                html += '<tr class="claimItem newArray" id="item'+len+'">';
                html += '   <td style="text-align: center">' +
                    '           <div id="claimIndex">'+(index+1)+'</div>' +
                    '           <input type="hidden" id="claimItemSn'+index+'" value="'+e.itemList[i].CLAIM_ITEM_SN+'" />' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemNm'+index+'" class="itemNm" value="'+e.itemList[i].ITEM_NM+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemStd'+index+'" class="itemStd" value="'+e.itemList[i].ITEM_STD+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemEa'+index+'" style="text-align: right" class="itemEa" value="'+comma(e.itemList[i].ITEM_EA)+'" onkeyup="reqOr.fn_calc(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnitAmt'+index+'" style="text-align: right" class="itemUnitAmt" value="'+comma(e.itemList[i].ITEM_UNIT_AMT)+'" onkeyup="reqOr.fn_calc(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnit'+index+'" class="itemUnit" value="'+e.itemList[i].ITEM_UNIT+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemAmt'+index+'" class="itemAmt" value="'+comma(e.itemList[i].ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <label for="itemEtc'+index+'"></label><input type="text" id="itemEtc'+index+'" value="'+e.itemList[i].ITEM_ETC+'" class="itemEtc">' +
                    '       </td>' +
                    // '       <td>' +
                    // '           <input type="text" id="discountAmt'+index+'" class="discountAmt" value="'+comma(e.itemList[i].DIF_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    // '       </td>' +
                    '       <td style="text-align: center" class="listDelBtn">' +
                    '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqOr.fn_delete(this)">' +
                    '               <span class="k-button-text">삭제</span>' +
                    '           </button>' +
                    '       </td>';
                html += '</tr>';
            }

            index++;
        }


        $("#claimTbody").append(html);


        var tLen = $("#claimTbody > tr").length;
        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]
        for(var i = 0 ; i < tLen ; i++){
            if(i == 0){
                customKendo.fn_textBox(["itemNm", "itemStd", "itemEa", "itemUnitAmt", "itemUnit", "itemAmt", "itemEtc", "discountAmt"]);
                // customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");

                // $("#prodCd").data("kendoRadioGroup").value(e.itemList[i].PROD_CD);
            } else {
                customKendo.fn_textBox(["itemNm" + i, "itemStd" + i
                    ,"itemEa" + i, "itemUnitAmt" + i, "itemUnit" + i, "itemAmt" + i, "itemEtc" + i, "discountAmt" + i])

                // customKendo.fn_radioGroup("prodCd" + i, radioProdDataSource, "horizontal");
                // $("#prodCd" + i).data("kendoRadioGroup").value(e.itemList[i].PROD_CD);
            }
        }

        this.fn_amtCalculator();
    },

    fn_kendoUIEnableSet : function(){
        $(':radio').attr('disabled', true);
        $('.k-input-inner').attr('disabled', true);
        $("#pjtSelBtn").css("display", "none");
        $("#crmSelBtn").css("display", "none");
        $(".listDelBtn").text("-");
    },

    fn_kendoUIEnableSet2 : function(e){
        $("#orderDt").data("kendoDatePicker").enable(e);
        $("#goodsDt").data("kendoDatePicker").enable(e);

        if(e){
            $(".k-textbox").removeClass("k-disabled");
            $(".k-textarea").removeClass("k-disabled");
            $(".listDelBtn").removeClass("k-disabled");
        } else {
            $(".k-textbox").addClass("k-disabled");
            $(".k-textarea").addClass("k-disabled");
            $(".listDelBtn").addClass("k-disabled");
        }
    },

    fn_OrderBtnSet : function(orderMap){

        let buttonHtml = "";
        if(orderMap.ORDER_YN != "Y"){
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px; font-size: 12px;" class="k-button k-button-solid-info" onclick="reqOr.fn_orderSave(\'save\')">발주 저장</button>';
        }
        if(orderMap.ORDER_CK != "Y"){
        }else{
            buttonHtml += '<button type="button" id="sendBtn" style="margin-right: 5px; font-size: 12px;" class="k-button k-button-solid-base" onclick="reqOr.fn_sendMailPop()">메일 전송</button>';
            buttonHtml += '<button type="button" id="printBtn" style="margin-right: 5px; font-size: 12px;" class="k-button k-button-solid-base" onclick="reqOr.fn_orderPrint()">인쇄</button>';
        }
        if(orderMap.ORDER_CK == "Y" && orderMap.ORDER_YN != "Y"){
            buttonHtml += '<button type="button" id="sendBtn" style="margin-right: 5px; font-size: 12px;" class="k-button k-button-solid-info" onclick="reqOr.fn_orderSave(\'complete\')">발주 완료</button>';
        } else if(orderMap.ORDER_CK == "Y" && orderMap.ORDER_YN == "Y") {
            buttonHtml += '<button type="button" id="sendBtn" style="margin-right: 5px; font-size: 12px;" class="k-button k-button-solid-info" onclick="reqOr.fn_orderSave(\'cancel\')">발주 취소</button>';
        }
        buttonHtml += '<button type="button" class="k-button k-button-solid-error" style="font-size: 12px;" onclick="window.close()">닫기</button>';

        $("#reqPurcBtnDiv").html(buttonHtml);
    },

    fn_orderPrint : function(){
        let claimSn = $("#claimSn").val();
        var url = "/purc/pop/orderPrintPop.do?claimSn="+claimSn;
        var name = "orderPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    fn_sendMailPop : function(){
        let claimSn = $("#claimSn").val();
        var url = "/purc/pop/orderSendMailPop.do?claimSn="+claimSn;
        var name = "sendMailPop";
        var option = "width=960, height=620, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    }
}