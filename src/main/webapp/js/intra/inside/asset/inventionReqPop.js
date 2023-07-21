const inventionReq = {
    init: function(){
        inventionReq.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["userText", "title"]);
        $("#detailCn").kendoTextArea();
        let typeDataSource = [
            { text: "특허", value: "1" },
            { text: "실용신안", value: "2" },
            { text: "상표권", value: "3" },
            { text: "논문", value: "4" },
            { text: "도서", value: "5" },
            { text: "디자인권", value: "6" },
            { text: "저작권", value: "7" }
        ]
        customKendo.fn_dropDownList("iprClass", typeDataSource, "text", "value", 1);
        customKendo.fn_datePicker("regDate", "month", "yyyy-MM-dd", new Date());
        $("#userText, #regDate").attr("readonly", true);
    },

    saveBtn: function(){
        let flag = true;
        let userSn = $("#userSn").val();
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
                inventionReq.setInventionInsert(data);
            }else {
                if(!confirm("문서를 수정하시겠습니까?")){
                    return;
                }
                inventionReq.setInventionUpdate(data);
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
