const appUserPaySetting = {

    global : {
        attFiles : [],
        itemIndex : 1,
        createHtmlStr : "",
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
                // { text: "계산서", value: "2" },
                { text: "신용카드", value: "3" },
                // { text: "직원지급", value: "4" },
                // { text: "사업소득자", value: "5" },
                // { text: "기타소득자", value: "9" },
                // { text: "기타", value: "6" }
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType0").val();
                var itemIndex = 0;

                appUserPaySetting.fn_eviTypeReset(itemIndex);

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else if(value == "1" || value == "2"){
                        appUserPaySetting.fn_paymentEtaxHistory(value, itemIndex);
                    } else if(value == "3"){
                        appUserPaySetting.fn_paymentCardHistory(value, itemIndex);
                    } else{
                        appUserPaySetting.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "regNo0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"]);
        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

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

                for (var i = 0; i < ls.length; i++) {
                    html += '<tr id="tr'+ls[i].claimSn+'" value="'+i+'">';
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
                    html += '       <input type="text" style="text-align: right" index="'+i+'" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" id="reqAmt'+i+'" name="reqAmt" onkeyup="appUserPaySetting.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" value="' + comma((Number(ls[i].TOT_AMT) - Number(ls[i].REQ_AMT))) + '">';
                    html += '   </td>';
                    html += '   <td style="text-align: center">';
                    html += '       <button type="button" class="k-button k-button-solid-error" onclick="appUserPaySetting.fn_delRow('+ls[i].CLAIM_SN+')">삭제</button>';
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#payTableBody").html(html);

                $("#empSeq").val(ls[0].PURC_EMP_SEQ);
                $("#empName").val(ls[0].PURC_EMP_NAME);
            }
        })


        if(array.length == 1){
            appUserPaySetting.appUserSettingHistGrid(array[0]);
        } else {
            $("#histGridDiv").css("display", "none");
        }
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
        var itemArr = new Array();
        $('input[name="reqAmt"]').each(function(){
            if(this.value == 0 || this.value == ""){
                flag = false;
            } else {
                var itemParameters = {
                    claimSn : $("#claimSn" + $(this).attr("index")).val(),
                    reqAmt : appUserPaySetting.uncomma(this.value),
                    empSeq : $("#empSeq").val()
                }

                if(Number(appUserPaySetting.uncomma(this.value)) > Number($("#totAmt" + $(this).attr("index")).val())){
                    payFlag = false;
                }

                itemArr.push(itemParameters);
            }
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
        formData.append("evidType", $("#eviType0").val());
        formData.append("authNo", $("#authNo0").val());
        formData.append("authDd", $("#authDd0").val());
        formData.append("authHh", $("#authHh0").val());
        formData.append("issNo", $("#issNo0").val());
        formData.append("coCd", $("#coCd0").val());
        formData.append("taxTy", $("#taxTy0").val());
        formData.append("crmNm", $("#crmNm0").val());
        formData.append("regNo", $("#regNo0").val());
        formData.append("trCd", $("#trCd0").val());
        formData.append("crmBnkNm", $("#crmBnkNm0").val());
        formData.append("crmAccNo", $("#crmAccNo0").val());
        formData.append("trDe", $("#trDe0").val());
        formData.append("totCost", appUserPaySetting.uncomma($("#totCost0").val()));
        formData.append("supCost", appUserPaySetting.uncomma($("#supCost0").val()));
        formData.append("vatCost", appUserPaySetting.uncomma($("#vatCost0").val()));
        formData.append("buySts", $("#buySts0").val());
        formData.append("cardNo", $("#cardNo0").val());
        formData.append("fileNo", $("#fileNo0").val());

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
            '       <input type="text" id="eviType' + appUserPaySetting.global.itemIndex + '" class="eviType" style="width: 100%">' +
            '       <input type="hidden" id="fileNo' + appUserPaySetting.global.itemIndex + '" class="fileNo" style="width: 100%">' +
            '       <input type="hidden" id="authNo' + appUserPaySetting.global.itemIndex + '" class="authNo" style="width: 100%">' +
            '       <input type="hidden" id="authHh' + appUserPaySetting.global.itemIndex + '" class="authHh" style="width: 100%">' +
            '       <input type="hidden" id="authDd' + appUserPaySetting.global.itemIndex + '" class="authDd" style="width: 100%">' +
            '       <input type="hidden" id="issNo' + appUserPaySetting.global.itemIndex + '" class="issNo" style="width: 100%">' +
            '       <input type="hidden" id="coCd' + appUserPaySetting.global.itemIndex + '" class="coCd" style="width: 100%">' +
            '       <input type="hidden" id="taxTy' + appUserPaySetting.global.itemIndex + '" class="taxTy" style="width: 100%">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" style="width: 100%" id="crmNm' + appUserPaySetting.global.itemIndex + '" class="crmNm" disabled>' +
            '       <input type="hidden" id="buySts' + appUserPaySetting.global.itemIndex + '" class="buySts">' +
            '       <input type="hidden" id="trCd' + appUserPaySetting.global.itemIndex + '" class="trCd">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="regNo' + appUserPaySetting.global.itemIndex + '" class="regNo" style="width: 100%" disabled>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmBnkNm' + appUserPaySetting.global.itemIndex + '" class="crmBnkNm" disabled>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmAccNo' + appUserPaySetting.global.itemIndex + '" class="crmAccNo" disabled>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmAccHolder' + appUserPaySetting.global.itemIndex + '" class="crmAccHolder" disabled>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="trDe' + appUserPaySetting.global.itemIndex + '" class="trDe" disabled>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="totCost' + appUserPaySetting.global.itemIndex + '" value="0" class="totCost" style="text-align: right" disabled>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="supCost' + appUserPaySetting.global.itemIndex + '" value="0" class="supCost" style="text-align: right" disabled>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="vatCost' + appUserPaySetting.global.itemIndex + '" value="0" class="vatCost" style="text-align: right" disabled>' +
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
                // { text: "계산서", value: "2" },
                { text: "신용카드", value: "3" },
                // { text: "직원지급", value: "4" },
                // { text: "사업소득자", value: "5" },
                // { text: "기타소득자", value: "9" },
                // { text: "기타", value: "6" },
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType" + itemIndex).val();

                appUserPaySetting.fn_eviTypeReset(itemIndex);

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else if(value == "1" || value == "2"){
                        appUserPaySetting.fn_paymentEtaxHistory(value, itemIndex);
                    } else if(value == "3"){
                        appUserPaySetting.fn_paymentCardHistory(value, itemIndex);
                    } else {
                        appUserPaySetting.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm" + appUserPaySetting.global.itemIndex, "crmBnkNm"  + appUserPaySetting.global.itemIndex
            , "crmAccHolder" + appUserPaySetting.global.itemIndex, "regNo" + appUserPaySetting.global.itemIndex
            , "crmAccNo" + appUserPaySetting.global.itemIndex, "totCost" + appUserPaySetting.global.itemIndex
            , "supCost" + appUserPaySetting.global.itemIndex, "vatCost" + appUserPaySetting.global.itemIndex]);

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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
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
                    width: 80,
                    template: function (e){
                        if(e.EVID_TYPE == 1){
                            return "세금계산서";
                        } else if (e.EVID_TYPE == 3){
                            return "신용카드";
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "PJT_NM",
                    title: "프로젝트명",
                    width: 70
                }, {
                    field: "PJT_CD",
                    title: "프로젝트코드",
                    width: 70
                }, {
                    title: "요청액",
                    width: 70,
                    template : function(e){
                        return '<div style="text-align: right;">'+comma(e.REQ_AMT)+'</div>';
                    }
                }, {
                    title : "기타",
                    width: 60,
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

    }
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
        $("#crmNm" + idx).css("border", "1px solid red");
        $("#regNo" + idx).css("border", "1px solid red");
    } else {
        $("#crmNm" + idx).css("border", 0);
        $("#regNo" + idx).css("border", 0);
    }

    if(bankNm == null || bankNm == "" || bankNm == "undefined"){
        bankNm = "";
        $("#crmNm" + idx).css("border", "1px solid red");
        $("#regNo" + idx).css("border", "1px solid red");
    }else {
        $("#crmNm" + idx).css("border", 0);
        $("#regNo" + idx).css("border", 0);
    }

    if(depositor == null || depositor == "" || depositor == "undefined"){
        depositor = "";
        $("#crmNm" + idx).css("border", "1px solid red");
        $("#regNo" + idx).css("border", "1px solid red");
    } else {
        $("#crmNm" + idx).css("border", 0);
        $("#regNo" + idx).css("border", 0);
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