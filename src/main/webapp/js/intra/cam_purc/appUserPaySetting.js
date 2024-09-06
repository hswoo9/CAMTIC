const appUserPaySetting = {

    global : {
        attFiles : [],
        itemIndex : 1,
        createHtmlStr : "",
        reqAmt : 0,
        reqAmtTotal : 0,
    },

    fn_DefaultScript: function() {
        var parameterArray = [];

        var array = opener.parent.purcMngAppList.global.clmList;

        customKendo.fn_textBox(["empName"]);
        appUserPaySetting.fn_setData(array);

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

                appUserPaySetting.fn_eviTypeReset(itemIndex);

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.");
                        $("#totCost" + itemIndex).data("kendoTextBox").enable(true);
                    } else if(value == "1" || value == "2"){
                        appUserPaySetting.fn_paymentEtaxHistory(value, itemIndex);
                    } else if(value == "3"){
                        appUserPaySetting.fn_paymentCardHistory(value, itemIndex);
                    } else{
                        appUserPaySetting.fn_popRegDet(value, itemIndex);
                        if(value == "4"){
                            $("#totCost" + itemIndex).data("kendoTextBox").enable(true);
                        }
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "regNo0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0", "card0", "etc0"]);
        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("reqDe", "month", "yyyy-MM-dd", new Date());

        $(".payDestInfo td input").css("font-size", "10px");
        $(".payDestInfo td").css("padding", "0.35rem");
        $(".payDestInfo td span").css("font-size", "10px");

    },

    fn_setData : function (array){
        console.log(array);
        var data = {}

        data.itemArray = "";
        array.forEach(function(item){
            data.itemArray += item + ",";
        });

        data.itemArray = data.itemArray.substring(0, data.itemArray.length - 1);

        $.ajax({
            url : "/purc/getClaimMngList",
            data: data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs.list);

                var html = "";
                $("#payTableBody").html(html);
                var ls = rs.list;

                if(ls[0].INSPECT_STATUS == 100){
                    $("#etcStatus").text("(검수완료)")
                }
                for (var i = 0; i < ls.length; i++) {
                    html += '<tr id="tr'+ls[i].claimSn+'" value="'+i+'" class="payTr">';
                    html += '   <td style="text-align: center">';
                    html += '       <input type="hidden" id="claimSn'+i+'" name="clm" value="' + ls[i].CLAIM_SN + '">';
                    html += '       ' + (i + 1);
                    html += '   </td>';
                    html += '   <td>';
                    html += '       ' + ls[i].DOC_NO;
                    html += '   </td>';
                    html += '   <td>';
                    html += '       ' + ls[i].CRM_NM;
                    html += '   </td>';
                    html += '   <td>';
                    html += '       <div style="text-align: right;">' + comma(ls[i].TOT_AMT - ls[i].REQ_AMT) + '</div>';
                    html += '       <input type="hidden" id="totAmt'+i+'" name="totAmt" value="' + (Number(ls[i].TOT_AMT) - Number(ls[i].REQ_AMT)) + '">';
                    html += '   </td>';
                    html += '   <td>';
                    html += '       <input type="text" style="text-align: right" index="'+i+'" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" id="reqAmt'+i+'" name="reqAmt" onkeyup="appUserPaySetting.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" value="0">';
                    html += '   </td>';
                    html += '   <td style="text-align: center">';
                    html += '       <button type="button" class="k-button k-button-solid-error" onclick="appUserPaySetting.fn_delRow('+ls[i].CLAIM_SN+')">삭제</button>';
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#payTableBody").html(html);

                $("#empSeq").val(ls[0].PURC_EMP_SEQ);
                $("#empName").val(ls[0].PURC_EMP_NAME);

                $.each($(".payTr"), function(i){
                    appUserPaySetting.global.reqAmtTotal += Number(uncommaN($("#totAmt" + i).val()));
                });
                $("#reqAmtTotal").val(appUserPaySetting.global.reqAmtTotal);
            }
        })


        if(array.length == 1){
            appUserPaySetting.appUserSettingHistGrid(array[0]);
        } else {
            $("#histGridDiv").css("display", "none");
        }

        appUserPaySetting.settingTempFileDataInit(array);
    },

    settingTempFileDataInit : function(array){
        var data = {};
        var html = '';

        array.forEach(function(item){

            data.claimSn = item;

            $.ajax({
                url : "/purc/purcUserPayFileList",
                data: data,
                type : "post",
                dataType : "json",
                success : function(rs){
                    var rs = rs.list;

                    if(rs.length > 0){
                        for(var i = 0; i < rs.length; i++){
                            html += '<tr style="text-align: center">';
                            html += '   <td style="text-align: left;">'+ rs[i].file_org_name +'</td>';
                            html += '   <td>'+ rs[i].file_ext +'</td>';
                            html += '   <td>'+ fCommon.bytesToKB(rs[i].file_size) +'</td>';
                            html += '   <td>';
                            html += '<input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ rs[i].file_path +'\', \''+ rs[i].file_uuid +'\')">';
                            html += '   </td>';
                            html += '   <td>';
                            html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ rs[i].file_no +', this)">' +
                                    '			    <span class="k-button-text">삭제</span>' +
                                    '		</button>';
                            html += '   </td>';
                            html += '</tr>';
                        }
                        $("#fileGrid").html(html);
                    }else{
                        $("#fileGrid").html('<tr class="defultTr">' +
                            '	<td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>' +
                            '</tr>');
                    }
                }
            })
        });
    },

    fn_delRow : function(idx){
        $("#tr"+idx).remove();
    },

    inputNumberFormat : function (obj){
        obj.value = appUserPaySetting.comma(appUserPaySetting.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_regist : function (){

        if($("#empSeq").val() == ""){
            alert("지급신청자를 선택해주세요.");
            return;
        }

        if(!confirm("지출요청 하시겠습니까?")){
            return;
        }

        var flag = true;
        var payFlag = true;
        var itemFlag = true;
        var itemFlag2 = true;
        var chk = false;
        var itemArr = new Array();
        appUserPaySetting.global.reqAmt = 0;

        $('input[name="reqAmt"]').each(function(){
            if(this.value == 0 || this.value == ""){
                flag = false;
            } else {
                var itemParameters = {
                    claimSn : $("#claimSn" + $(this).attr("index")).val(),
                    reqAmt : appUserPaySetting.uncomma(this.value),
                    empSeq : $("#empSeq").val(),
                    mngReqStat : "Y"
                }

                if(Number(appUserPaySetting.uncomma(this.value)) > Number($("#totAmt" + $(this).attr("index")).val())){
                    payFlag = false;
                }

                itemArr.push(itemParameters);
            }
            appUserPaySetting.global.reqAmt += Number(appUserPaySetting.uncomma(this.value));
        });

        if(!flag) {
            alert("지출금액이 입력되지 않았습니다.");
            return;
        }

        if(!payFlag) {
            alert("요청금액이 대상금액보다 큽니다.");
            return;
        }

        // var data = {
        //     itemArray : JSON.stringify(itemArr)
        // }

        var formData = new FormData();
        formData.append("regEmpSeq", $("#regEmpSeq").val());
        formData.append("itemArray", JSON.stringify(itemArr));

        // 증빙유형
        var payItemArr = new Array();
        var reqPayAmt = 0;
        $.each($(".payDestInfo"), function(i, v){
            var index = $(this).attr("id").replace(/[^0-9]/g, '');

            if($("#eviType" + index).val() != "" && (uncommaN($("#totCost0").val()) == "0" || uncommaN($("#totCost0").val()) == "")){
                itemFlag = false;
            }

            if($("#eviType" + index).val() != ""){
                chk = true;
            }

            var data = {
                evidType : $("#eviType" + index).val(),
                authNo : $("#authNo" + index).val(),
                authDd : $("#authDd" + index).val(),
                authHh : $("#authHh" + index).val(),
                issNo : $("#issNo" + index).val(),
                coCd : $("#coCd" + index).val(),
                taxTy : $("#taxTy" + index).val(),
                payAmt : (uncommaN($("#payAmt" + index).val()) || 0),
                crmNm : $("#crmNm" + index).val(),
                regNo : $("#regNo" + index).val(),
                trCd : $("#trCd" + index).val(),
                crmBnkNm : $("#crmBnkNm" + index).val(),
                crmAccNo : $("#crmAccNo" + index).val(),
                crmAccHolder : $("#crmAccHolder" + index).val(),
                trDe : $("#trDe" + index).val(),
                totCost : uncommaN($("#totCost" + index).val()),
                supCost : uncommaN($("#supCost" + index).val()),
                vatCost : uncommaN($("#vatCost" + index).val()),
                buySts : $("#buySts" + index).val(),
                card : $("#card" + index).val(),
                cardNo : $("#cardNo" + index).val(),
                etc : $("#etc" + index).val(),
            }

            if($("#fileNo" + index).val() != ""){
                data.fileNo = $("#fileNo" + index).val();
            }

            reqPayAmt += Number(uncommaN($("#totCost" + index).val()));

            payItemArr.push(data);
        });

        var tempArr = [];
        for(var i = 0; i < payItemArr.length; i++){
            if(tempArr.indexOf(payItemArr[i].evidType) == -1) {
                tempArr.push(payItemArr[i].evidType);
            }
        }

        if(tempArr.length > 1){
            itemFlag2 = false;
        }

        if(!itemFlag) {
            alert("증빙유형을 다시 확인해주세요.");
            return;
        }

        if(!itemFlag2) {
            alert("선택된 증빙유형이 다르므로 지출요청이 불가합니다.\n다시 확인해주세요.");
            return;
        }

        if(chk && reqPayAmt != appUserPaySetting.global.reqAmt) {
            alert("지출금액 합계와 증빙서류 금액의 합계가 다릅니다.");
            return;
        }

        formData.append("payItemArr", JSON.stringify(payItemArr));

        if(appUserPaySetting.global.attFiles != null){
            for(var i = 0; i < appUserPaySetting.global.attFiles.length; i++){
                formData.append("fileList", appUserPaySetting.global.attFiles[i]);
            }
        }

        $.ajax({
            url : "/purc/setPayAppPurcReq",
            data : formData,
            dataType : "json",
            type : "post",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    alert("요청되었습니다.");

                    opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                    window.close();
                }
            }
        });
    },

    fileChange : function (){
        $("#emptyTr").remove();
        let size = 0;
        var fileArray = [];
        for(var i = 0; i < $("input[name='payFileList']")[0].files.length; i++){
            appUserPaySetting.global.attFiles.push($("input[name='payFileList']")[0].files[i]);
        }

        fileArray = appUserPaySetting.global.attFiles;
        if(fileArray.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].size > 0 ? fCommon.bytesToKB(fileArray[i].size) : 0;
                var fileName = "";
                var fileExt = (fileArray[i].file_ext || fileArray[i].name.split(".")[fileArray[i].name.split(".").length - 1]);
                for(var j = 0 ; j < fileArray[i].name.split(".").length - 1 ; j++){
                    fileName += fileArray[i].name.split(".")[j];

                    if(j != fileArray[i].name.split(".").length - 2){
                        fileName += ".";
                    }
                }
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="appUserPaySetting.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="appUserPaySetting.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }
    },

    fnUploadFile : function(e) {
        let size = 0;
        const dataTransfer = new DataTransfer();
        let fileArray2 = Array.from(appUserPaySetting.global.attFiles);
        fileArray2.splice(e, 1);
        fileArray2.forEach(file => {
            dataTransfer.items.add(file);
        });

        appUserPaySetting.global.attFiles = dataTransfer.files;

        var fileArray = [];
        fileArray = appUserPaySetting.global.attFiles;
        if(fileArray.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <fileArray.length; i++) {
                var fileName = "";
                var fileExt = fileArray[i].name.split(".")[fileArray[i].name.split(".").length - 1];
                for(var j = 0 ; j < fileArray[i].name.split(".").length - 1 ; j++){
                    fileName += fileArray[i].name.split(".")[j];

                    if(j != fileArray[i].name.split(".").length - 2){
                        fileName += ".";
                    }
                }

                size = fileArray[i].size > 0 ? fCommon.bytesToKB(fileArray[i].size) : 0;
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="appUserPaySetting.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="appUserPaySetting.fnUploadFile(' + i + ')">';
                    html += '   </td>';
                }
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }else{
            $("#fileGrid").find(".addFile").remove();

            if($("#fileGrid").find("tr").length == 0){
                $("#fileGrid").html('<tr class="defultTr">' +
                    '	<td colspan="5" style="text-align: center;padding-top: 10px;">등록된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }

        if(appUserPaySetting.global.attFiles.length == 0){
            appUserPaySetting.global.attFiles = new Array();
        }

    },

    fn_paymentCardHistory : function (v, i){
        var url = "/mng/pop/paymentCardHistory.do?type=" + v + "&index=" + i + "&paySetting=Y";

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },

    fn_paymentEtaxHistory : function (v, i){
        var url = "/mng/pop/paymentEtaxHistory.do?type=" + v + "&index=" + i + "&paySetting=Y";

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popRegDet : function (v, i, cardVal){
        //개인&법인 구분없이 조회하기 위한 parameter 추가
        if(cardVal == undefined){
            cardVal = "";
        }

        if($("#eviType" + i).val() == 5 || $("#eviType" + i).val() == 9){
            v = $("#eviType" + i).val();
        }

        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i + "&cardVal=" + cardVal;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_eviTypeReset: function(idx) {
        $("#fileNo" + idx).val("");
        $("#authNo" + idx).val("");
        $("#authHh" + idx).val("");
        $("#authDd" + idx).val("");
        $("#issNo" + idx).val("");
        $("#coCd" + idx).val("");
        $("#taxTy" + idx).val("");
        $("#crmNm" + idx).val("");
        $("#buySts" + idx).val("");
        $("#trCd" + idx).val("");
        $("#regNo" + idx).val("");
        $("#crmBnkNm" + idx).val("");
        $("#crmAccNo" + idx).val("");
        $("#crmAccHolder" + idx).val("");
        $("#trDe" + idx).data("kendoDatePicker").value(new Date());
        $("#totCost" + idx).val("");
        $("#supCost" + idx).val("");
        $("#vatCost" + idx).val("");
        $("#card" + idx).val("");
        $("#cardNo" + idx).val("");
        $("#etc" + idx).val("");

    },

    addRow : function () {
        appUserPaySetting.global.createHtmlStr = "";
        var clIdx = appUserPaySetting.global.itemIndex;

        appUserPaySetting.global.createHtmlStr = "" +
            '<tr class="payDestInfo newArray" id="pay' + appUserPaySetting.global.itemIndex + '" style="text-align: center;">' +
            '   <td>' +
            '       <input type="hidden" style="width: 70%" id="payDestSn' + appUserPaySetting.global.itemIndex + '" name="payDestSn" class="payDestSn">' +
            '       <input type="text" id="eviType' + appUserPaySetting.global.itemIndex + '" class="eviType">' +
            '       <input type="hidden" id="fileNo' + appUserPaySetting.global.itemIndex + '" class="fileNo">' +
            '       <input type="hidden" id="authNo' + appUserPaySetting.global.itemIndex + '" class="authNo">' +
            '       <input type="hidden" id="authHh' + appUserPaySetting.global.itemIndex + '" class="authHh">' +
            '       <input type="hidden" id="authDd' + appUserPaySetting.global.itemIndex + '" class="authDd">' +
            '       <input type="hidden" id="issNo' + appUserPaySetting.global.itemIndex + '" class="issNo">' +
            '       <input type="hidden" id="coCd' + appUserPaySetting.global.itemIndex + '" class="coCd">' +
            '       <input type="hidden" id="taxTy' + appUserPaySetting.global.itemIndex + '" class="taxTy">' +
            '       <input type="hidden" id="expRate' + appUserPaySetting.global.itemIndex + '" class="expRate">' +
            '       <input type="hidden" id="taxRate' + appUserPaySetting.global.itemIndex + '" class="taxRate">' +
            '       <input type="hidden" id="payAmt' + appUserPaySetting.global.itemIndex + '" class="payAmt">' +
            '       <input type="hidden" id="incTax' + appUserPaySetting.global.itemIndex + '" class="incTax">' +
            '       <input type="hidden" id="locIncTax' + appUserPaySetting.global.itemIndex + '" class="locIncTax">' +
            '       <input type="hidden" id="subAmt' + appUserPaySetting.global.itemIndex + '" class="subAmt">' +
            '       <input type="hidden" id="actPayAmt' + appUserPaySetting.global.itemIndex + '" class="actPayAmt">' +
            '   </td>' +
            '   <td>' +
            '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="appUserPaySetting.fn_popRegDet(1, '+appUserPaySetting.global.itemIndex+')"></i>' +
            '       <input type="text" style="width: 80%" id="crmNm' + appUserPaySetting.global.itemIndex + '" class="crmNm" readonly >' +
            '       <input type="hidden" id="buySts' + appUserPaySetting.global.itemIndex + '" class="buySts">' +
            '       <input type="hidden" id="trCd' + appUserPaySetting.global.itemIndex + '" class="trCd">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="regNo' + appUserPaySetting.global.itemIndex + '" class="regNo" style="width: 100%" readonly >' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmBnkNm' + appUserPaySetting.global.itemIndex + '" class="crmBnkNm" readonly >' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmAccNo' + appUserPaySetting.global.itemIndex + '" class="crmAccNo" readonly >' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmAccHolder' + appUserPaySetting.global.itemIndex + '" class="crmAccHolder" readonly >' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="trDe' + appUserPaySetting.global.itemIndex + '" class="trDe" readonly >' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="totCost' + appUserPaySetting.global.itemIndex + '" value="0" class="totCost" style="text-align: right" onkeyup="appUserPaySetting.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" readonly >' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="supCost' + appUserPaySetting.global.itemIndex + '" value="0" class="supCost" style="text-align: right" readonly >' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="vatCost' + appUserPaySetting.global.itemIndex + '" value="0" class="vatCost" style="text-align: right" readonly >' +
            '   </td>' +
            '   <td>' +
            '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="appUserPaySetting.fn_popRegDet(3, '+appUserPaySetting.global.itemIndex+')"></i>' +
            '       <input type="text" style="width: 70%" disabled id="card' + appUserPaySetting.global.itemIndex + '" class="card" readonly >' +
            '       <input type="hidden" id="cardNo' + appUserPaySetting.global.itemIndex + '" class="cardNo">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="etc' + appUserPaySetting.global.itemIndex + '" class="etc" >' +
            '   </td>' +
            '   <td>' +
            '       <div style="text-align: center">' +
            '           <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="appUserPaySetting.delRow(' + appUserPaySetting.global.itemIndex + ')">삭제</button>' +
            '       </div>' +
            '   </td>' +
            '</tr>';

        $("#payDestTb").append(appUserPaySetting.global.createHtmlStr);

        var itemIndex = appUserPaySetting.global.itemIndex;
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

                appUserPaySetting.fn_eviTypeReset(itemIndex);

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.");
                        $("#totCost" + itemIndex).data("kendoTextBox").enable(true);
                    } else if(value == "1" || value == "2"){
                        appUserPaySetting.fn_paymentEtaxHistory(value, itemIndex);
                    } else if(value == "3"){
                        appUserPaySetting.fn_paymentCardHistory(value, itemIndex);
                    } else {
                        appUserPaySetting.fn_popRegDet(value, itemIndex);
                        if(value == "4"){
                            $("#totCost" + itemIndex).data("kendoTextBox").enable(true);
                        }
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm" + appUserPaySetting.global.itemIndex, "crmBnkNm"  + appUserPaySetting.global.itemIndex
            , "crmAccHolder" + appUserPaySetting.global.itemIndex, "regNo" + appUserPaySetting.global.itemIndex, "card" + appUserPaySetting.global.itemIndex,
            , "crmAccNo" + appUserPaySetting.global.itemIndex, "totCost" + appUserPaySetting.global.itemIndex
            , "supCost" + appUserPaySetting.global.itemIndex, "vatCost" + appUserPaySetting.global.itemIndex, "etc" + appUserPaySetting.global.itemIndex]);

        customKendo.fn_datePicker("trDe" + appUserPaySetting.global.itemIndex, "month", "yyyy-MM-dd", new Date());

        appUserPaySetting.global.itemIndex++;

        $(".payDestInfo td input").css("font-size", "10px");
        $(".payDestInfo td").css("padding", "0.35rem");
        $(".payDestInfo td span").css("font-size", "10px");
    },

    delRow : function (row){
        if($(".payDestInfo").length > 1){
            $("#pay" + row).remove();
            /*appUserPaySetting.global.itemIndex--;*/
        } else if($(".payDestInfo").length == 1){
            $("#pay" + row).remove();
            appUserPaySetting.global.itemIndex = 0;
            appUserPaySetting.addRow();
        }
    },

    appUserSettingHistGrid:function (key){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/purc/getPurcClaimExnpList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.claimSn = key;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#appUserSettingHistGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            resizable: true,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "",
                    title: "증빙유형",
                    width: 150,
                    template: function (e){
                        if(e.EVID_TYPE == 1){
                            return "세금계산서"
                        } else if (e.EVID_TYPE == 2){
                            return "계산서"
                        } else if(e.EVID_TYPE == 3){
                            return "신용카드"
                        } else if(e.EVID_TYPE == 4){
                            return "직원지급"
                        } else if(e.EVID_TYPE == 5){
                            return "사업소득자"
                        } else if(e.EVID_TYPE == 6){
                            return "기타"
                        } else if(e.EVID_TYPE == 9) {
                            return "기타소득자";
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "EMP_NAME_KR",
                    title: "요청자",
                    width: 100
                }, {
                    field: "BUDGET_NM",
                    title: "예산비목"
                }, {
                    field: "PJT_NM",
                    title: "프로젝트명"
                }, {
                    field: "PJT_CD",
                    title: "프로젝트코드",
                    width: 150
                }, {
                    title: "요청액",
                    width: 100,
                    template : function(e){
                        return '<div style="text-align: right;">'+comma(e.REQ_AMT)+'</div>';
                    }
                }, {
                    title : "기타",
                    width: 100,
                    template: function(e){
                        if(e.PAY_APP_SN != null && e.PAY_APP_SN != undefined && e.PAY_APP_SN != ''){
                            return '';
                        } else {
                            return '<button type="button" class="k-button k-button-solid-error" onclick="appUserPaySetting.fn_histDel('+e.CLAIM_EXNP_SN+')">삭제</button>';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_histDel : function (key){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var data = {
            claimExnpSn : key
        }

        var rs = customKendo.fn_customAjax("/purc/delClaimExnpData", data);


        if(rs.code == 200){
            alert("삭제되었습니다.");

            location.reload();
        }

    },

    fn_calCost: function(obj){
        var index = obj.id.replace(/[^0-9]/g, '');

        if($("#eviType" + index).val() == '4' || $("#eviType" + index).val() == '6'){
            if(obj.id.match("totCost")){
                $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val()))));
                $("#vatCost" + index).val(0);
            } else if(obj.id.match("supCost")){
                $("#totCost" + index).val(comma(Number(uncommaN($("#supCost" + index).val()))));
                $("#vatCost" + index).val(0);
            } else if (obj.id.match("vatCost")){
                $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#vatCost" + index).val()))));
            }
        } else if($("#eviType" + index).val() == '3'){
            if($("#pjtCd").val() != undefined){
                if((("#pjtCd").val().substring(0,1) == "M" || $("#pjtCd").val().substring(0,1) == "Z") && !($("#pjtCd").val() == "Za9g923011" || $("#pjtCd").val() == "Za9g923012")){
                    if($("#card" + index).val().includes("개인카드")){
                        if(obj.id.match("totCost")){
                            $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val()))));
                            $("#vatCost" + index).val(0);
                        } else if(obj.id.match("supCost")){
                            $("#totCost" + index).val(comma(Number(uncommaN($("#supCost" + index).val()))));
                            $("#vatCost" + index).val(0);
                        } else if (obj.id.match("vatCost")){
                            $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#vatCost" + index).val()))));
                        }
                    } else{
                        if(obj.id.match("totCost")){
                            $("#vatCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Math.round(Number(uncommaN($("#totCost" + index).val())) * 100 / 110)));
                            $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#vatCost" + index).val()))));
                        } else if(obj.id.match("supCost")){
                            $("#vatCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#supCost" + index).val()))));
                        } else if (obj.id.match("vatCost")){
                            $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#vatCost" + index).val()))));
                        }
                    }
                }
            } else {
                if(obj.id.match("totCost")){
                    $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val()))));
                    $("#vatCost" + index).val(0);
                } else if(obj.id.match("supCost")){
                    $("#totCost" + index).val(comma(Number(uncommaN($("#supCost" + index).val()))));
                    $("#vatCost" + index).val(0);
                } else if (obj.id.match("vatCost")){
                    $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#vatCost" + index).val()))));
                }
            }
        } else {
            if(obj.id.match("totCost")){
                $("#vatCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Math.round(Number(uncommaN($("#totCost" + index).val())) * 100 / 110)));
                $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#vatCost" + index).val()))));
            } else if(obj.id.match("supCost")){
                $("#vatCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#supCost" + index).val()))));
            } else if (obj.id.match("vatCost")){
                $("#supCost" + index).val(comma(Number(uncommaN($("#totCost" + index).val())) - Number(uncommaN($("#vatCost" + index).val()))));
            }
        }

        inputNumberFormat(obj);

    },
}

function inputNumberFormat(obj){
    obj.value = comma(uncommaN(obj.value));
}

function fn_selEtaxInfo(trCd, trNm, isuDt, trregNb, supAm, vatAm, sumAm, issNo, coCd, taxTy, idx, fileNo, baNb, bankNm, depositor, tradeDe){
    if(trNm == null || trNm == "" || trNm == "undefined"){
        trNm = "";
    }
    if(isuDt == null || isuDt == "" || isuDt == "undefined"){
        isuDt = "";
    }
    if(trregNb == null || trregNb == "" || trregNb == "undefined"){
        trregNb = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }
    if(baNb == null || baNb == "" || baNb == "undefined"){
        baNb = "";
    }

    if(bankNm == null || bankNm == "" || bankNm == "undefined"){
        bankNm = "";
    }

    if(depositor == null || depositor == "" || depositor == "undefined"){
        depositor = "";
    }

    if(tradeDe != null && tradeDe != "" && tradeDe != "undefined"){
        $("#trDe" + idx).val(tradeDe);
    } else {
        $("#trDe" + idx).val(isuDt.substring(0, 4) + "-" + isuDt.substring(4, 6) + "-" + isuDt.substring(6, 8));
    }

    $("#regNo" + idx).val(trregNb);
    $("#crmNm" + idx).val(trNm);
    $("#trCd" + idx).val(trCd);
    $("#totCost" + idx).val(comma(sumAm.toString().split(".")[0]));
    $("#supCost" + idx).val(comma(supAm.toString().split(".")[0]));
    $("#vatCost" + idx).val(comma(vatAm.toString().split(".")[0]));
    $("#issNo" + idx).val(issNo);
    $("#coCd" + idx).val(coCd);
    $("#taxTy" + idx).val(taxTy);
    $("#fileNo" + idx).val(fileNo);
    $("#crmBnkNm" + idx).val(bankNm);
    $("#crmAccNo" + idx).val(baNb);
    $("#crmAccHolder" + idx).val(depositor);
}

function fn_selClientInfo(trCd, trNm, baNb, depositor, jiro, ceoNm, regNb, idx){
    if(trNm == null || trNm == "" || trNm == "undefined"){
        trNm = "";
    }
    if(baNb == null || baNb == "" || baNb == "undefined"){
        baNb = "";
    }
    if(depositor == null || depositor == "" || depositor == "undefined"){
        depositor = "";
    }
    if(jiro == null || jiro == "" || jiro == "undefined"){
        jiro = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }
    if(ceoNm == null || ceoNm == "" || ceoNm == "undefined"){
        ceoNm = "";
    }
    if(regNb == null || regNb == "" || regNb == "undefined"){
        regNb = "";
    }

    $("#crmNm" + idx).val(trNm);
    $("#trCd" + idx).val(trCd);
    $("#crmBnkNm" + idx).val(jiro);
    $("#crmAccNo" + idx).val(baNb);
    $("#crmAccHolder" + idx).val(depositor);
    $("#regNo" + idx).val(regNb);
    $("#ceoNm" + idx).val(ceoNm);
}

function fn_selCardInfo(trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor, idx){
    if(trNm == null || trNm == "" || trNm == "undefined"){
        trNm = "";
    }
    if(cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined"){
        cardBaNb = "";
    }
    if(baNb == null || baNb == "" || baNb == "undefined"){
        baNb = "";
    }
    if(jiro == null || jiro == "" || jiro == "undefined"){
        jiro = "";
    }
    if(depositor == null || depositor == "" || depositor == "undefined"){
        depositor = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }

    // 개인카드일 경우 총액 입력가능하게 수정
    $("#totCost" + idx).data("kendoTextBox").enable(true);

    $("#totCost" + idx).on('keyup', function() {
        $("#reqAmt" + idx).val($("#totCost" + idx).val());
    });

    $("#card" + idx).val(trNm);
    $("#cardNo" + idx).val(cardBaNb);
    $("#trCd" + idx).val(trCd);
    $("#crmBnkNm" + idx).val(jiro);
    $("#crmAccNo" + idx).val(baNb);
    $("#crmAccHolder" + idx).val(depositor);

    if(idx == 0){
        $("#trNm").val(trNm);
        $("#cardBaNb").val(cardBaNb);
        $("#trCd").val(trCd);
        $("#jiroNm").val(jiro);
        $("#baNb").val(baNb);
        $("#depositor").val(depositor);
    }
}

function fn_selCardCompanyInfo(trCd, trNm, idx){
    if(trNm == null || trNm == "" || trNm == "undefined"){
        trNm = "";
    }

    $("#card" + idx).val(trNm);
}

function fn_selEmpInfo(trCd, bankName, accountNum, accountHolder, empNameKr, idx, regNo){
    if(accountHolder == null || accountHolder == "" || accountHolder == "undefined"){
        accountHolder = "";
    }
    if(accountNum == null || accountNum == "" || accountNum == "undefined"){
        accountNum = "";
    }
    if(empNameKr == null || empNameKr == "" || empNameKr == "undefined"){
        empNameKr = "";
    }
    if(bankName == null || bankName == "" || bankName == "undefined"){
        bankName = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }

    $("#trCd" + idx).val(trCd);
    $("#crmNm" + idx).val(empNameKr);
    $("#crmBnkNm" + idx).val(bankName);
    $("#crmAccNo" + idx).val(accountNum);
    $("#crmAccHolder" + idx).val(accountHolder);
    $("#regNo" + idx).val(regNo);
}

function fn_selOtherInfo(trCd, bankName,  accountHolder, accountNum, empNameKr, idx, type, regNo){
    if(accountHolder == null || accountHolder == "" || accountHolder == "undefined"){
        accountHolder = "";
    }
    if(accountNum == null || accountNum == "" || accountNum == "undefined"){
        accountNum = "";
    }
    if(empNameKr == null || empNameKr == "" || empNameKr == "undefined"){
        empNameKr = "";
    }
    if(bankName == null || bankName == "" || bankName == "undefined"){
        bankName = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }
    if(regNo == null || regNo == "" || regNo == "undefined"){
        regNo = "";
    }

    $("#trCd" + idx).val(trCd);
    $("#crmNm" + idx).val(empNameKr);
    $("#crmBnkNm" + idx).val(bankName);
    $("#crmAccNo" + idx).val(accountNum);
    $("#crmAccHolder" + idx).val(accountHolder);
    $("#regNo" + idx).val(regNo);

    if(type != null && type != "" && type != "undefined"){
        if(type == "5"){
            $("#etc" + idx).val("사업소득자");
        } else if(type == "9"){
            $("#etc" + idx).val("기타소득자");
        }
    }

    var url = "/payApp/pop/setPayRequest.do?idx=" + idx + "&type=" + type + "&trCd=" + trCd + "&empNameKr=" + empNameKr + "&bankName=" + bankName + "&accountNum=" + accountNum + "&accountHolder=" + accountHolder + "&regNo=" + regNo;

    var name = "_blank";
    var option = "width = 800, height = 500, top = 100, left = 400, location = no"
    var popup = window.open(url, name, option);
}