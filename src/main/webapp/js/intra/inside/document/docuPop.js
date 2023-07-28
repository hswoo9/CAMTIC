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
        customKendo.fn_textBox(["projectName", "coName", "contractAmount", "remarkCn", "projectNumber", "zipCode", "addr", "addrDetail", "representative", "businessNumber"]);
        customKendo.fn_datePicker("docuDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("startDe", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDe", 'month', "yyyy-MM-dd", new Date());
        let mainClassArr = [
            {text: "CAMTIC", value: "1"},
            {text: "JVADA", value: "2"}
        ]
        customKendo.fn_dropDownList("mainClass", mainClassArr, "text", "value", 2);
        let classArr = [
            {text: "제작", value: "1"},
            {text: "가공", value: "2"},
            {text: "구매", value: "3"},
            {text: "공사", value: "4"},
            {text: "전담인력", value: "5"},
            {text: "시간제", value: "6"},
            {text: "위촉연구원", value: "7"},
            {text: "현장연수생", value: "8"},
            {text: "입주", value: "9"},
            {text: "장비사용", value: "10"},
            {text: "용역", value: "11"},
            {text: "기타", value: "12"}
        ]
        customKendo.fn_dropDownList("class", classArr, "text", "value", 2);
        $("#docuDe, #startDe, #endDe").attr("readonly", true);

        var html = ""
        html += '<tr rowIndexNumber="0" class="productItem">';
        html += '    <td>';
        html += '       <input type="text" id="productName0">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productCount0">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productOneMoney0">';
        html += '    </td>';
        html += '    <td>';
        html += '       <input type="text" id="productTotalMoney0">';
        html += '    </td>';
        html += '    <td>';
        html += '       <textarea id="bmk0" style="width: 80%;"></textarea>';
        html += '    </td>';
        html += '</tr>';
        $("#product").append(html);
        customKendo.fn_textBox(["productName0", "productCount0", "productOneMoney0", "productTotalMoney0"]);
        $("#bmk0").kendoTextArea({ rows: 2, maxLength:50, placeholder: "" });
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
        let docFileName = "구매 계약서.hwp";
        let docId = "contractHwp";


        $.each($('.productItem'), function(i, v){
            let areaInfo = {
                productName   		        		: $(v).find('#productName'+i).val(),
                productCount   		        	: $(v).find('#productCount'+i).val(),
                productOneMoney   		        	: $(v).find('#productOneMoney'+i).val(),
                productTotalMoney   		    : $(v).find('#productTotalMoney'+i).val(),
                bmk   		    : $(v).find('#bmk'+i).val(),
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
            docId : docId
        }





        if(classSn == "") { alert("구분이 선택되지 않았습니다."); return; }
        if(docuDe == "") { alert("계약일시가 작성되지 않았습니다."); return; }
        if(projectName == "") { alert("계약건명이 작성되지 않았습니다."); return; }


        $("#docEditor").show();
        if($("#documentSn").val() == "") {
            if(!confirm("문서를 등록하시겠습니까?")){
                return;
            }
            docuContractReq.fn_SetHtml(data, "insert");
            //docuContractReq.setDocuContractInsert(data);
        }else {
            if(!confirm("문서를 수정하시겠습니까?")){
                return;
            }
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
            docuContractReq.global.hwpCtrl.PutFieldText("end_de", data.endDe.split("-")[0] + "년 " +data.endDe.split("-")[1] + "월 " + data.endDe.split("-")[2] + "일");

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