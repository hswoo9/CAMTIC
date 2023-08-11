var docuContractReq = {

    global : {
        hwpCtrl : "",
        params : "",
    },

    init: function(parameters){
        docuContractReq.global.params = parameters;
        docuContractReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["suretyInsurance", "dlvLoc", "payment", "rentalInfo", "rentalEa", "projectName", "coName", "contractAmount", "remarkCn", "projectNumber", "zipCode", "addr", "addrDetail", "representative", "businessNumber"]);
        customKendo.fn_datePicker("docuDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("startDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDe", 'month', "yyyy-MM-dd", new Date());
        let mainClassArr = [
            {text: "CAMTIC", value: "1"},
            {text: "JVADA", value: "2"}
        ]
        customKendo.fn_dropDownList("mainClass", mainClassArr, "text", "value", 2);

        $("#mainClass").data("kendoDropDownList").value(1);

        let classArr = [
            {text: "외주", value: "1"},
            {text: "용역", value: "2"},
            {text: "구매", value: "3"},
            {text: "임대차", value: "4"}
        ]

        customKendo.fn_dropDownList("class", classArr, "text", "value", 2);
        $("#docuDe, #startDe, #endDe").attr("readonly", true);
        $("#productTable").css("display", "none");

        var html = ""
        html += '<tr rowIndexNumber="0" class="productItem">';
        html += '    <td>';
        html += '       <input type="text" id="productName0">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productCount0" style="text-align: right" onkeyup="docuContractReq.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productOneMoney0" style="text-align: right" onkeyup="docuContractReq.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productTotalMoney0" style="text-align: right" onkeyup="docuContractReq.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
        html += '    </td>';
        html += '    <td>';
        html += '       <textarea id="bmk0" style="width: 100%;"></textarea>';
        html += '    </td>';
        html += '</tr>';
        $("#product").append(html);
        customKendo.fn_textBox(["productName0", "productCount0", "productOneMoney0", "productTotalMoney0"]);
        $("#bmk0").kendoTextArea({ rows: 2, maxLength:50, placeholder: "" });


        $("#class").change(function (){
            if(this.value == 3){
                $("#productTable").css("display", "");
            } else {
                $("#productTable").css("display", "none");
            }

            if(this.value == 4){
                $("#rentalAmtInfo").css("display", "");
            } else {
                $("#rentalAmtInfo").css("display", "none");
                $("#rentalInfo, #rentalEa, #contractAmount").val("");
            }

            if(this.value == 1 || this.value == 2){
                $("#outsourcingInfo, #outsourcingInfo2").css("display", "");
            } else {
                $("#outsourcingInfo, #outsourcingInfo2").css("display", "none");
            }

            if(this.value == 2){
                $("#validText").text("결과 보고");
                $("#dlvLoc").val(" *기타 세부적인 사항은 과업지시서에 따름.");
                $("#payment").val("최종 결과보고서 제출 후 30일이내 100% 현금 결제");
            } else {
                $("#validText").text("납품 장소");
                $("#dlvLoc").val('"갑"의 지정장소');
                $("#payment").val("납품/검수 완료 후 45일 이내 100% 현금 지급");
            }
        });

        var dp = $("#startDe").data("kendoDatePicker");
        var dp2 = $("#endDe").data("kendoDatePicker");
        dp.bind("change", function(){
            if($("#startDe").val() > $("#endDe").val()){
                $("#endDe").val($("#startDe").val());
            }

            var startDe = $("#startDe").val().replaceAll("-", "");
            var endDe = $("#endDe").val().replaceAll("-", "");

            var date1 = new Date(startDe.substr(0,4),startDe.substr(4,2)-1,startDe.substr(6,2));
            var date2 = new Date(endDe.substr(0,4),endDe.substr(4,2)-1,endDe.substr(6,2));

            var interval = date2 - date1;
            var day = 1000*60*60*24;
            var month = day*30;
            var year = month*12;

            var monthData = parseInt(interval/month);
            $("#totalMonth").val(monthData);

            docuContractReq.fn_rentalTotalAmt();
        });

        dp2.bind("change", function(){
            if($("#startDe").val() > $("#endDe").val()){
                $("#startDe").val($("#endDe").val());
            }

            var startDe = $("#startDe").val().replaceAll("-", "");
            var endDe = $("#endDe").val().replaceAll("-", "");

            var date1 = new Date(startDe.substr(0,4),startDe.substr(4,2)-1,startDe.substr(6,2));
            var date2 = new Date(endDe.substr(0,4),endDe.substr(4,2)-1,endDe.substr(6,2));

            var interval = date2 - date1;
            var day = 1000*60*60*24;
            var month = day*30;
            var year = month*12;

            var monthData = parseInt(interval/month);
            $("#totalMonth").val(monthData);

            docuContractReq.fn_rentalTotalAmt();
        });

        $("#rentalInfo, #rentalEa").on("keyup", function(){
            docuContractReq.fn_rentalTotalAmt();
        });
    },

    fn_rentalTotalAmt : function(){
        if($("#class").val() == 4){
            var rentalInfo = docuContractReq.uncomma($("#rentalInfo").val());
            var rentalEa = docuContractReq.uncomma($("#rentalEa").val());
            $("#contractAmount").val(docuContractReq.comma(rentalInfo * rentalEa * $("#totalMonth").val()));
        }
    },

    inputNumberFormat : function (obj){
        obj.value = docuContractReq.comma(docuContractReq.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    loading: function(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    },

    saveBtn: function(){
        let mainClassSn = $("#mainClass").val();
        let mainClassName = $("#mainClass").data("kendoDropDownList").text();
        let classSn = $("#class").val();
        let className = $("#class").data("kendoDropDownList").text();
        let docuName = mainClassSn == 1 ? "TIC" : "JVADA";
        let docuDe = $("#docuDe").val();
        let projectName = $("#projectName").val();
        let projectMoney = $("#projectMoney").val();
        let startDe = $("#startDe").val();
        let endDe = $("#endDe").val();
        let coSn = $("#coSn").val();
        let coName = $("#coName").val();
        let remarkCn = $("#remarkCn").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        let projectNumber = $("#projectNumber").val();
        let representative = $("#representative").val();
        let fullAddr = $("#addr").val() + " " + $("#addrDetail").val();
        let businessNumber = $("#businessNumber").val();
        let areaArr = new Array();
        let zipCode = $("#zipCode").val();
        let addr = $("#addr").val();
        let addrDetail = $("#addrDetail").val();
        let empSeq = $("#regEmpSeq").val();
        let menuCd = "contract";
        let docFileName = "외주 계약서.hwp";
        let docId = "contractHwp";
        let contractAmount = docuContractReq.uncomma($("#contractAmount").val());
        let rentalEa = docuContractReq.uncomma($("#rentalEa").val());
        let rentalInfo = docuContractReq.uncomma($("#rentalInfo").val());
        let totalMonth = $("#totalMonth").val();
        let payment = $("#payment").val();
        let suretyInsurance = $("#suretyInsurance").val();
        let dlvLoc = $("#dlvLoc").val();

        $.each($('.productItem'), function(i, v){
            let areaInfo = {
                productName   		: $(v).find('#productName'+i).val(),
                productCount   		: docuContractReq.uncomma($(v).find('#productCount'+i).val()),
                productOneMoney   	: docuContractReq.uncomma($(v).find('#productOneMoney'+i).val()),
                productTotalMoney   : docuContractReq.uncomma($(v).find('#productTotalMoney'+i).val()),
                bmk   		        : $(v).find('#bmk'+i).val(),
            }
            areaArr.push(areaInfo);
        });

        let data = {
            mainClassSn : mainClassSn,
            mainClassName : mainClassName,
            classSn : classSn,
            className : className,
            docuName : docuName,
            docuDe : docuDe,
            projectName : projectName,
            projectMoney : projectMoney,
            startDe : startDe,
            endDe : endDe,
            coSn : coSn,
            coName : coName,
            remarkCn : remarkCn,
            regEmpSeq : regEmpSeq,
            regEmpName : regEmpName,
            projectNumber : projectNumber,
            representative : representative,
            fullAddr : fullAddr,
            businessNumber : businessNumber,
            areaArr : areaArr,
            zipCode : zipCode,
            addr : addr,
            addrDetail : addrDetail,
            empSeq : empSeq,
            menuCd : menuCd,
            docFileName : docFileName,
            docId : docId,
            contractAmount : contractAmount,
            rentalEa : rentalEa,
            rentalInfo : rentalInfo,
            totalMonth : totalMonth,
            payment : payment,
            surtInsr : suretyInsurance,
            dlvLoc : dlvLoc
        }

        if(data.surtInsr == "" || data.surtInsr == null){
            data.surtInsr = 0;
        }

        if(data.rentalInfo == "" || data.rentalInfo == null){
            data.rentalInfo = 0;
        }


        if(data.classSn == 1){
            data.docFileName = "외주 계약서.hwp";
        } else if (data.classSn == 2){
            data.docFileName = "용역 계약서.hwp";
        } else if (data.classSn == 3){
            data.docFileName = "구매 계약서.hwp";
        } else if (data.classSn == 4){
            data.docFileName = "임대차 계약서.hwp";
        }





        if(classSn == "") { alert("구분이 선택되지 않았습니다."); return; }
        if(docuDe == "") { alert("계약일시가 작성되지 않았습니다."); return; }
        if(projectName == "") { alert("계약건명이 작성되지 않았습니다."); return; }


        $("#docEditor").show();
        if($("#documentSn").val() == "") {
            if(!confirm("문서를 등록하시겠습니까?")){
                return;
            }
            docuContractReq.loading();
            docuContractReq.fn_SetHtml(data, "insert");
            //docuContractReq.setDocuContractInsert(data);
        }else {
            if(!confirm("문서를 수정하시겠습니까?")){
                return;
            }
            docuContractReq.loading();
            docuContractReq.fn_SetHtml(data, "update");
            //docuContractReq.setDocuContractUpdate(data);
        }
    },

    setDocuContractInsert: function(data){
        let result = customKendo.fn_customAjax("/inside/setDocuContractInsert", data);
        if(result.flag) {
            alert("문서 등록이 완료되었습니다.");
            opener.docuContractList.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },

    setDocuContractUpdate: function(data){

    },

    fn_SetHtml : function(data, type){
        docuContractReq.global.hwpCtrl = BuildWebHwpCtrl("docEditor", docuContractReq.global.params.hwpUrl, function () {docuContractReq.editorComplete(data, type);});
    },

    editorComplete : function(data, type){
        var filePath = docuContractReq.global.params.hwpTemplateFile;

        if(data.classSn == 1){
            filePath += "outsourcingTmp.hwp";
        } else if (data.classSn == 2){
            filePath += "serviceTmp.hwp";
        } else if (data.classSn == 3){
            filePath += "purchaseContractTmp.hwp";
        } else if (data.classSn == 4){
            filePath += "rentalCarTmp.hwp";
        }

        console.log(filePath);
        docuContractReq.global.hwpCtrl.Open(filePath, "HWP", "", function () {
        }, {"userData" : "success"});
        docuContractReq.resize();
        setTimeout(function() {
            var reg_date = new Date().getFullYear() + ". " + (new Date().getMonth() + 1) + ". " + new Date().getDate();
            docuContractReq.global.hwpCtrl.PutFieldText("reg_date", reg_date);

            docuContractReq.global.hwpCtrl.PutFieldText("co_name", data.coName);
            docuContractReq.global.hwpCtrl.PutFieldText("co_name_table", data.coName);
            docuContractReq.global.hwpCtrl.PutFieldText("project_name", data.projectName);
            docuContractReq.global.hwpCtrl.PutFieldText("project_number", data.projectNumber);
            docuContractReq.global.hwpCtrl.PutFieldText("addr", data.fullAddr);
            docuContractReq.global.hwpCtrl.PutFieldText("representative", data.representative);
            docuContractReq.global.hwpCtrl.PutFieldText("business_number", data.businessNumber);


            var totalDate = data.startDe.split("-")[0] + "년 " +data.startDe.split("-")[1] + "월 " + data.startDe.split("-")[2] + "일 ~ " + data.endDe.split("-")[0] + "년 " +data.endDe.split("-")[1] + "월 " + data.endDe.split("-")[2] + "일";
            docuContractReq.global.hwpCtrl.PutFieldText("total_date", totalDate);
            docuContractReq.global.hwpCtrl.PutFieldText("start_de", data.startDe.split("-")[0] + "년 " +data.startDe.split("-")[1] + "월 " + data.startDe.split("-")[2] + "일");
            docuContractReq.global.hwpCtrl.PutFieldText("end_de", data.endDe.split("-")[0] + "년 " +data.endDe.split("-")[1] + "월 " + data.endDe.split("-")[2] + "일");

            docuContractReq.global.hwpCtrl.PutFieldText("docu_de", data.docuDe.split("-")[0] + "년 " +data.endDe.split("-")[1] + "월 " + data.endDe.split("-")[2] + "일");
            var moneyToHan = "금" + docuContractReq.fn_convertToKoreanNumber(data.contractAmount) + "정(금"+ $("#contractAmount").val()+"원, VAT별도)";
            docuContractReq.global.hwpCtrl.PutFieldText("money_to_han", moneyToHan);
            var monthRentalAmt = docuContractReq.comma(data.rentalInfo * data.rentalEa) + "원 (" + docuContractReq.comma(data.rentalInfo) + "원 x " + docuContractReq.comma(data.rentalEa) + "대)";
            var totRentalAmt = docuContractReq.comma(data.rentalInfo * data.rentalEa * data.totalMonth) + "원 (" + docuContractReq.comma(data.rentalInfo * data.rentalEa) + "원 x " + data.totalMonth + "개월)";
            docuContractReq.global.hwpCtrl.PutFieldText("month_rental_amt", monthRentalAmt);
            docuContractReq.global.hwpCtrl.PutFieldText("total_rental_amt", totRentalAmt);

            docuContractReq.global.hwpCtrl.PutFieldText("payment", data.payment);
            docuContractReq.global.hwpCtrl.PutFieldText("surt_insr", data.surtInsr);
            docuContractReq.global.hwpCtrl.PutFieldText("dlv_loc", data.dlvLoc);


            var surt_amt = "일금" + docuContractReq.fn_convertToKoreanNumber(data.contractAmount / data.surtInsr) + "원정(\\" + docuContractReq.comma(data.contractAmount / data.surtInsr) + ")";
            var sub_amt = "일금" + docuContractReq.fn_convertToKoreanNumber(data.contractAmount) + "원정(\\" + docuContractReq.comma(data.contractAmount) + ")";
            docuContractReq.global.hwpCtrl.PutFieldText("surt_amt", surt_amt);
            docuContractReq.global.hwpCtrl.PutFieldText("sub_amt", sub_amt);


            if(data.areaArr != null){
                for(var i = 0 ; i < data.areaArr.length; i++){
                    docuContractReq.global.hwpCtrl.PutFieldText("product_name" + i, data.areaArr[i].productName);
                    docuContractReq.global.hwpCtrl.PutFieldText("product_count" + i, data.areaArr[i].productCount);
                    docuContractReq.global.hwpCtrl.PutFieldText("product_one_money" + i, data.areaArr[i].productOneMoney);
                    docuContractReq.global.hwpCtrl.PutFieldText("product_total_money" + i, data.areaArr[i].productTotalMoney);
                    docuContractReq.global.hwpCtrl.PutFieldText("bmk" + i, data.areaArr[i].bmk);
                }
            }

        }, 1000);

        docuContractReq.global.hwpCtrl.EditMode = 0;
        docuContractReq.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
        docuContractReq.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
        docuContractReq.global.hwpCtrl.ShowRibbon(false);
        docuContractReq.global.hwpCtrl.ShowCaret(false);
        docuContractReq.global.hwpCtrl.ShowStatusBar(false);
        docuContractReq.global.hwpCtrl.SetFieldViewOption(1);



        setTimeout(function() {
            docuContractReq.fn_fileSave(data, type);
        }, 2000);
        
    },

    fn_fileSave : function(data, type){
        docuContractReq.global.hwpCtrl.GetTextFile("HWPML2X", "", function (e){
            docuContractReq.fn_getHwpToStr(e, data, type)
        });
    },

    fn_convertToKoreanNumber : function (val) {
        var numKor = new Array("", "일", "이", "삼", "사","오","육","칠","팔","구","십");                                  // 숫자 문자
        var danKor = new Array("", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천");    // 만위 문자열
        var result = "";

        if(val && !isNaN(val)){
            // CASE: 금액이 공란/NULL/문자가 포함된 경우가 아닌 경우에만 처리

            for(var i = 0; i < val.length; i++) {
                var str = "";
                var num = numKor[val.charAt(val.length - (i+1))];
                if(num != "")   str += num + danKor[i];    // 숫자가 0인 경우 텍스트를 표현하지 않음
                switch(i){
                    case 4:str += "만";break;     // 4자리인 경우 '만'을 붙여줌 ex) 10000 -> 일만
                    case 8:str += "억";break;     // 8자리인 경우 '억'을 붙여줌 ex) 100000000 -> 일억
                    case 12:str += "조";break;    // 12자리인 경우 '조'를 붙여줌 ex) 1000000000000 -> 일조
                }

                result = str + result;
            }

            // Step. 불필요 단위 제거
            if(result.indexOf("억만") > 0)    result = result.replace("억만", "억");
            if(result.indexOf("조만") > 0)    result = result.replace("조만", "조");
            if(result.indexOf("조억") > 0)    result = result.replace("조억", "조");



            result = result + "원";
        }

        return result ;
    },

    fn_getHwpToStr : function(e, data, type){

        data.docFileStr = e;
        data.productArr = JSON.stringify(data.areaArr);
        if(type == "insert"){
            docuContractReq.setDocuContractInsert(data);
        }else if(type == "update"){
            docuContractReq.setDocuContractUpdate(data);
        }
    },

    addrSearch : function(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#zipCode").val(data.zonecode);
                    $("#addr").val(roadAddr);
                    $("#oldAddr").val(data.jibunAddress);

                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        $("#subAddr").val(extraRoadAddr);
                    } else {
                        $("#subAddr").val("");
                    }

                    var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시
                    if(data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if(data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else {
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }

                    $("#addrDetail").focus();
                }
            }).open();
        });
    },

    resize : function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    fn_areaTrRemove : function(rowNumber){
        $.each($(".productItem"), function(i, v){
            if($(v).attr("rowIndexNumber") == rowNumber){
                $(v).remove();
            }
        });
    },

    fn_areaTrAdd : function() {

        var rowNumber = 0;
        $.each($(".productItem"), function (i, v) {
            if (rowNumber = 0 || rowNumber < parseInt($(v).attr("rowIndexNumber"))) {
                rowNumber = parseInt($(v).attr("rowIndexNumber"));
            }
        });

        rowNumber++;

        var html = "";
        html += '<tr rowIndexNumber="'+rowNumber+'" class="productItem">';
        html += '    <td>';
        html += '       <input type="text" id="productName'+rowNumber+'">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productCount'+rowNumber+'">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productOneMoney'+rowNumber+'">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productTotalMoney'+rowNumber+'">';
        html += '    </td>';
        html += '    <td>';
        html += '       <textarea id="bmk'+rowNumber+'" style="width : 80%;"></textarea>';
        html += '       <a href="javascript:docuContractReq.fn_areaTrRemove('+rowNumber+');">삭제</a>';
        html += '    </td>';
        html += '</tr>';
        $("#product").append(html);
        customKendo.fn_textBox(["productName" + rowNumber, "productCount" + rowNumber, "productOneMoney" + rowNumber, "productTotalMoney" + rowNumber]);
        $("#bmk" + rowNumber).kendoTextArea({ rows: 2, maxLength:50, placeholder: "" });
    },

}