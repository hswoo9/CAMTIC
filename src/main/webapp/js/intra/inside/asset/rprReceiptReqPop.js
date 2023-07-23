const rprReceiptReq = {
    init: function(){
        rprReceiptReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["userText", "title", "tech", "applicant", "applicantNum", "applicantNation", "regNum"]);
        $("#detailCn, #remarkCn").kendoTextArea();
        let iprDataSource = [
            { text: "특허", value: "1" },
            { text: "실용신안", value: "2" },
            { text: "상표권", value: "3" },
            { text: "논문", value: "4" },
            { text: "도서", value: "5" },
            { text: "디자인권", value: "6" },
            { text: "저작권", value: "7" }
        ]
        customKendo.fn_dropDownList("iprClass", iprDataSource, "text", "value", 2);
        let stateDataSource = [
            { text: "등록", value: "1" },
            { text: "출원", value: "2" },
            { text: "거절", value: "3" },
            { text: "소멸", value: "4" }
        ]
        customKendo.fn_dropDownList("state", stateDataSource, "text", "value", 2);
        let tainDataSource = [
            { text: "유지", value: "1" },
            { text: "소멸예정", value: "2" },
            { text: "소멸", value: "3" },
            { text: "유지여부 확인요망", value: "4" }
        ]
        customKendo.fn_dropDownList("tain", tainDataSource, "text", "value", 2);
        let techDataSource = [
            { text: "해당없음", value: "1" },
            { text: "이전완료", value: "2" },
            { text: "이전가능", value: "3" }
        ]
        customKendo.fn_dropDownList("tain", techDataSource, "text", "value", 2);
        let confidentialityDataSource = [
            { text: "공개", value: "1" },
            { text: "비공개", value: "2" }
        ]
        customKendo.fn_dropDownList("confidentiality", confidentialityDataSource, "text", "value", 2);
        let singleDataSource = [
            { text: "단독", value: "1" },
            { text: "공동", value: "2" }
        ]
        customKendo.fn_dropDownList("single", singleDataSource, "text", "value", 2);
        customKendo.fn_datePicker("applicantDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("regDate", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("expirationDt", "month", "yyyy-MM-dd", new Date());
        $("#userText, #regDate").attr("readonly", true);
        
        const result = customKendo.fn_customAjax("/inside/getInventionInfo", {
            inventionInfoSn: $("#inventionInfoSn").val()
        });
        const invenInfo = result.rs.info;
        const shareList = result.rs.shareList;

        $("#userSn").val(invenInfo.SHARE_SN);
        $("#userText").val(invenInfo.SHARE_NAME);
        rprReceiptReq.useDataChange(shareList);
        $("#iprClass").data("kendoDropDownList").value(invenInfo.IPR_CLASS);
        $("#title").val(invenInfo.TITLE);
        $("#detailCn").val(invenInfo.DETAIL_CN);
    },

    saveBtn: function(){
        let flag = true;
        let userSn = $("#userSn").val();
        let userText = $("#userText").val();
        let iprClass = $("#iprClass").val();
        let iprName = $("#iprClass").data("kendoDropDownList").text();
        let title = $("#title").val();
        let detailCn = $("#detailCn").val();
        let regDate = $("#regDate").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        let shareUserArr = new Array();
        $.each($('.addData'), function(i, v){
            let empSeq = $(v).find('.shareEmpSeq').val();
            let shareInfo = {
                shareEmpSeq					: $(v).find('.shareEmpSeq').val(),
                shareEmpName				: $(v).find('.shareEmpName').text(),
                share         				: $(v).find('#share'+empSeq).val()
            }
            if($(v).find('#share'+empSeq).val() == ""){
                alert("지분을 입력해 주세요.");
                flag = false;
                return false;
            }
            shareUserArr.push(shareInfo);
        });
        if (!flag) {
            return;
        }

        let data = {
            shareSn: userSn,
            shareName: userText,
            iprClass: iprClass,
            iprName: iprName,
            title: title,
            detailCn: detailCn,
            regDate: regDate,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName,
            shareUser: JSON.stringify(shareUserArr)
        }

        if(userSn == "") { alert("발명자(저자)가 선택되지 않았습니다."); return; }
        if(iprClass == "") { alert("지식재산권 종류가 선택되지 않았습니다."); return; }
        if(title == "") { alert("지식재산권 명칭이 작성되지 않았습니다."); return; }
        if(detailCn == "") { alert("주요내용이 작성되지 않았습니다."); return; }
        if(flag) {
            if($("#inventionInfoSn").val() == "") {
                if(!confirm("직무발명을 신고하시겠습니까?")){
                    return;
                }
                rprReceiptReq.setInventionInsert(data);
            }else {
                if(!confirm("문서를 수정하시겠습니까?")){
                    return;
                }
                rprReceiptReq.setInventionUpdate(data);
            }
        }

    },

    setInventionInsert: function(data){
        $.ajax({
            url : "/inside/setInventionInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                $("#inventionInfoSn").val(result.inventionInfoSn);
                $("#inventionDraftFrm").one("submit", function() {
                    const url = "/popup/inside/approvalFormPopup/inventionApprovalPop.do";
                    const name = "_self";
                    const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                    window.open(url, name, option);
                    this.action = "/popup/inside/approvalFormPopup/inventionApprovalPop.do";
                    this.method = 'POST';
                    this.target = '_self';
                }).trigger("submit");
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setInventionUpdate: function(data){
        console.log(data);
    },

    useDataChange: function(shareList){
        let html = "";
        html += "<table>";
        for(let i=0; i<shareList.length; i++){
            html += "<tr class='addData'>";
            html += "<input type='hidden' class='shareEmpSeq' value='"+shareList[i].EMP_SEQ+"'/>";
            html += "<th class='shareEmpName'>"+shareList[i].EMP_NAME+"</th>";
            html += "<td><input type='text' id='share"+shareList[i].EMP_SEQ+"' style='width: 80%; text-align: right' class='share' oninput='onlyNumber(this);' value='"+shareList[i].SHARE+"'/> %</td>";
            html += "</tr>";
        }
        html += "</table>";
        $("#shareTd").html(html);
        $("#shareTd .share").kendoTextBox();
        $("#shareTr").show();
    }
}

function userDataSet(userArr) {
    let userText = "";
    let userSn = "";
    for(let i=0; i<userArr.length; i++) {
        if(userText != "") {
            userText += ", ";
            userSn += ",";
        }
        userText += userArr[i].empName;
        userSn += userArr[i].empSeq;
    }
    $("#userText").val(userText);
    $("#userSn").val(userSn);

    let html = "";
    html += "<table>";
    for(let i=0; i<userArr.length; i++){
        html += "<tr class='addData'>";
        html += "<input type='hidden' class='shareEmpSeq' value='"+userArr[i].empSeq+"'/>";
        html += "<th class='shareEmpName'>"+userArr[i].empName+"</th>";
        html += "<td><input type='text' id='share"+userArr[i].empSeq+"' style='width: 80%; text-align: right' class='share' oninput='onlyNumber(this);'/> %</td>";
        html += "</tr>";
    }
    html += "</table>";
    $("#shareTd").html(html);
    $("#shareTd .share").kendoTextBox();
    $("#shareTr").show();
}
