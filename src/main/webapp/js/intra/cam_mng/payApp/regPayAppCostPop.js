/**
 * rev : 지급신청서
 * in  : 여입신청서
 * out : 반납신청서
 * alt : 대체신청서
 */

var costProcess = {

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
        costProcess.setPage();
        costProcess.setData();
        costProcess.fn_viewStat();
    },

    setPage : function(){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("reqDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["pjtNm", "appTitle", "accNm", "accNo", "bnkNm", "reasonPopText"]);

        $("#appCont").kendoTextArea({
            rows: 5,
        });

        costProcess.global.radioGroupData = [
            { label: "지급신청서", value: "1" },
            { label: "여입신청서", value: "2" },
            { label: "반납신청서", value: "3" },
            { label: "대체신청서", value: "4" }
        ]
        customKendo.fn_radioGroup("payAppType", costProcess.global.radioGroupData, "horizontal");

        costProcess.global.radioGroupData = [
            { label: "없음", value: "N" },
            { label: "의무경비", value: "A" },
            { label: "고정경비", value: "B" },
            { label: "업무추진비", value: "C" }
        ]
        customKendo.fn_radioGroup("payAppStat", costProcess.global.radioGroupData, "horizontal");

        $("#payAppType").data("kendoRadioGroup").value(1);
        $("#payAppStat").data("kendoRadioGroup").value("N")

        $("#payAppType").data("kendoRadioGroup").bind("change", function (e){
            if($("#payAppType").data("kendoRadioGroup").value() == "2"){
                $("#trBank").text("입금계좌");
            } else {
                $("#trBank").text("출금계좌");
            }
        })

        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $(".check").prop("checked", true);
            }else{
                $(".check").prop("checked", false);
            }
        });

        $(".payDestInfo td input").css("font-size", "10px");
        $(".payDestInfo td").css("padding", "0.35rem");
        $(".payDestInfo td span").css("font-size", "10px");
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

        costProcess.global.fileArray = fileList;

        costProcess.payAppBtnSet(rs);

        $("#docStatus").val(rs.DOC_STATUS)
        if(rs.DOC_STATUS != 0 && rs.DOC_STATUS != 30){
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

            var clIdx = regPayDet.global.itemIndex;

            regPayDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" value="'+item.BUDGET_NM+'" onclick="costProcess.fn_budgetPop('+clIdx+')" style="width: 100%;">' +
                '   </td>' +
                '   <td class="reasonTr" style="display: none;">' +
                '       <button type="button" id="reasonBtn' + regPayDet.global.itemIndex + '" value="'+regPayDet.global.itemIndex+'" onclick="costProcess.fn_reasonClickModal('+regPayDet.global.itemIndex+')" class="k-button k-button-solid-base reasonBtn">내용</button>' +
                '       <input type="hidden" id="reason' + regPayDet.global.itemIndex + '" value="'+item.REASON+'" style="width: 100%;">' +
                '   </td>' +
                '   <td style="display:none;">' +
                '       <input type="text" id="appTeam' + regPayDet.global.itemIndex + '" class="appTeam" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="eviType' + regPayDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmNm' + regPayDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                '       <input type="hidden" id="buySts' + regPayDet.global.itemIndex + '" value="'+item.BUY_STS+'" class="buySts">' +
                '       <input type="hidden" id="trCd' + regPayDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="regNo' + regPayDet.global.itemIndex + '" class="regNo" value="'+(item.REG_NO || "")+'" style="width: 100%">' +
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
                '       <input type="text" id="totCost' + regPayDet.global.itemIndex + '" value="'+costProcess.comma(item.TOT_COST)+'" class="totCost" style="text-align: right">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="supCost' + regPayDet.global.itemIndex + '" value="'+costProcess.comma(item.SUP_COST)+'" class="supCost" style="text-align: right">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="vatCost' + regPayDet.global.itemIndex + '" value="'+costProcess.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" disabled id="card' + regPayDet.global.itemIndex + '" value="'+(item.CARD || "")+'" class="card">' +
                '       <input type="hidden" id="cardNo' + regPayDet.global.itemIndex + '" value="'+item.CARD_NO+'" class="cardNo">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" value="'+(item.ETC || "")+'" class="etc">' +
                '   </td>';

            regPayDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <div style="text-align: center">';
            
                if(item.COST_STAT != "Y"){
                    regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-info" value="'+item.PAY_APP_DET_SN+'" onclick="regPayDet.fn_revertDet(this, \'Y\')">비용처리</button>';
                } else {
                    regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" value="'+item.PAY_APP_DET_SN+'" onclick="regPayDet.fn_revertDet(this, \'N\')">비용처리 취소</button>';
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
                        } else if(value == "1" || value == "2"){
                            regPayDet.fn_paymentEtaxHistory(value, e.sender.element[0].id.replace("eviType", ""));
                        } else if(value == "3"){
                            regPayDet.fn_paymentCardHistory(value, e.sender.element[0].id.replace("eviType", ""));
                        } else {
                            regPayDet.fn_popRegDet(value, e.sender.element[0].id.replace("eviType", ""));
                        }
                    }
                }
            });

            customKendo.fn_textBox(["crmNm" + regPayDet.global.itemIndex, "crmBnkNm"  + regPayDet.global.itemIndex
                , "crmAccHolder" + regPayDet.global.itemIndex, "regNo" + regPayDet.global.itemIndex
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

        if($("#pjtCd").val().substring(0,1) != "M" && $("#pjtCd").val().substring(0,1) != ""){
            $(".reasonTr").css("display", "");
            $("#reasonCol").css("display", "");
            $("#reasonTh").css("display", "");
        }
    },

    payAppBtnSet: function(){
        let buttonHtml = "";
        buttonHtml += '<button type="button" style="margin-right: 5px" class="k-button k-button-solid-info" onclick="regPayDet.fn_successDet()">비용처리 완료</button>';
        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';
        $("#payAppBtnDiv").html(buttonHtml);
    },

    fn_viewStat: function (){

    },

    fn_reasonClickModal : function(e){
        $("#reasonIdx").val(e);
        if($("#reason" + e).val() == null || $("#reason" + e).val() == "" || $("#reason" + e).val() == "undefined"){
            $("#reason" + e).val($("#appTitle").val())
        }
        $("#reasonPopText").val($("#reason" + e).val());


        var dialog = $("#dialog").data("kendoWindow");
        dialog.center();
        dialog.open();
    },

    fn_updReason : function(){
        var dialog = $("#dialog").data("kendoWindow");
        $("#reason" + $("#reasonIdx").val()).val($("#reasonPopText").val());
        dialog.close();
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
            empSeq : $("#empSeq").val(),
            type : type
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

    inputNumberFormat : function (obj){
        obj.value = costProcess.comma(costProcess.uncomma(obj.value));
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
                { text: "기타", value: "6" }
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType0").val();
                var itemIndex = 0;

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else if(value == "1" || value == "2"){
                        regPayDet.fn_paymentEtaxHistory(value, itemIndex);
                    } else if(value == "3"){
                        regPayDet.fn_paymentCardHistory(value, itemIndex);
                    } else{
                        regPayDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "regNo0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
        ,"card0", "etc0", "budgetNm0"]);

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
            deptLevel : 2
        });
        customKendo.fn_dropDownList("appTeam0", ds.rs, "dept_name", "dept_seq","5")

        $("#appTeam0").data("kendoDropDownList").value($("#loginDeptSeq").val());
        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

        $(".payDestInfo td input").css("font-size", "10px");
        $(".payDestInfo td").css("padding", "0.35rem");
        $(".payDestInfo td span").css("font-size", "10px");

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

    fn_paymentEtaxHistory : function (v, i){
        var url = "/mng/pop/paymentEtaxHistory.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },

    fn_successDet : function(){
        let confirmText = "비용처리 완료시 정산서에 처리완료 표시가 뜨게 됩니다. 완료처리 하시겠습니까?";
        let successText = "처리완료되었습니다.";
        if(!confirm(confirmText)){
            return ;
        }

        var data = {
            payAppSn : $("#payAppSn").val()
        }

        $.ajax({
            url : "/payApp/setPayAppCostApp",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert(successText);
                    try{
                        opener.window.costInfoGrid.gridReload();
                    }catch{

                    }
                    window.close();
                }
            }
        })
    },

    fn_revertDet : function(obj, stat){
        let confirmText = "비용처리 하시겠습니까?";
        let successText = "비용처리되었습니다.";
        if(stat != "Y"){
            confirmText = "비용처리를 취소 하시겠습니까?";
            successText = "비용처리가 취소 되었습니다.";
        }

        if(!confirm(confirmText)){
            return ;
        }

        var data = {
            payAppDetSn : obj.value,
            stat : stat
        }

        $.ajax({
            url : "/payApp/setPayAppDetCostApp",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert(successText);
                    try{
                        opener.window.costInfoGrid.gridReload();
                    }catch{

                    }
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
        var flag = true;
        var budgetArr = [];
        var eviTypeArr = [];
        $(".check:checked").each(function(){
            keyArr += $(this).val() + ",";
            var rowIdx = $(this).attr("id").charAt($(this).attr("id").length - 1);

            budgetArr.push($("#budgetSn" + rowIdx).val());
            eviTypeArr.push($("#eviType" + rowIdx).val());
        });

        keyArr = keyArr.substring(0, keyArr.length - 1);

        const setBudgetArr = new Set(budgetArr);
        const setEviTypeArr = new Set(eviTypeArr);

        if(setBudgetArr.size > 1) {
            alert("예산비목이 다릅니다. 확인해주세요.");
            return;
        }

        if(setEviTypeArr.size > 1) {
            alert("증빙유형이 다릅니다. 확인해주세요.");
            return;
        }
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

