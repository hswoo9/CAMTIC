const inventionReq = {
    init: function(){
        inventionReq.dataSet();

        if($("#inventionInfoSn").val()){
            inventionReq.setData();
        }
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
        customKendo.fn_dropDownList("iprClass", typeDataSource, "text", "value", 2);
        customKendo.fn_datePicker("regDate", "month", "yyyy-MM-dd", new Date());
        $("#userText, #regDate").attr("readonly", true);
    },

    setData : function(){
        var result = customKendo.fn_customAjax("/inside/getInventionInfo", { inventionInfoSn : $("#inventionInfoSn").val() });
        if(result.flag){
            let rsInfo = result.rs.info;
            let shareList = result.rs.shareList;
            let shareSnArr = rsInfo.SHARE_SN.split(",");
            let shareNameArr = rsInfo.SHARE_NAME.split(",");
            let userArr = [];

            for(let i=0; i<shareSnArr.length; i++){
                userArr.push({ empSeq : shareSnArr[i], empName : shareNameArr[i] });
            }

            userDataSet(userArr);

            $("#iprClass").data("kendoDropDownList").value(rsInfo.IPR_CLASS);
            $("#title").val(rsInfo.TITLE);
            $("#detailCn").val(rsInfo.DETAIL_CN);
            $("#regDate").val(rsInfo.REG_DATE);

            for(let i=0; i<userArr.length; i++){
                for(let j=0; j<shareList.length; j++){
                    if(userArr[i].empSeq == shareList[j].EMP_SEQ){
                        $("#share" + shareList[j].EMP_SEQ).val(shareList[j].SHARE);
                    }
                }
            }

            if(result.rs.relatedFile){
                $("#relatedFileTr").empty();
                let fileInfo = result.rs.relatedFile;
                let html = '';

                html += '' +
                    '<label for="relatedFile" class="k-button k-button-solid-base">파일첨부</label>' +
                    '<input type="file" id="relatedFile" name="relatedFile" onchange="inventionReq.fileChange(this)" style="display: none">' +
                    '<span id="relatedFileName" style="cursor:pointer;" onclick="fileDown(\'' +fileInfo.file_path + fileInfo.file_uuid + '\', \''+ fileInfo.file_org_name + '.' + fileInfo.file_ext + '\');">' +
                        fileInfo.file_org_name + '.' + fileInfo.file_ext +
                    '</span>';

                $("#relatedFileTr").append(html);
            }

            if(result.rs.relatedFile1){
                $("#relatedFile1Tr").empty();
                let fileInfo = result.rs.relatedFile1;
                let html = '';

                html += '' +
                    '<label for="relatedFile1" class="k-button k-button-solid-base">파일첨부</label>' +
                    '<input type="file" id="relatedFile1" name="relatedFile1" onchange="inventionReq.fileChange(this)" style="display: none">' +
                    '<span id="relatedFileName1" style="cursor:pointer;" onclick="fileDown(\'' +fileInfo.file_path + fileInfo.file_uuid + '\', \''+ fileInfo.file_org_name + '.' + fileInfo.file_ext + '\');">' +
                        fileInfo.file_org_name + '.' + fileInfo.file_ext +
                    '</span>';

                $("#relatedFile1Tr").append(html);
            }

            if(result.rs.relatedFile1){
                $("#quoFileTr").empty();
                let fileInfo = result.rs.quoFile;
                let html = '';

                html += '' +
                    '<label for="quoFile" class="k-button k-button-solid-base">파일첨부</label>' +
                    '<input type="file" id="quoFile" name="quoFile" onchange="inventionReq.fileChange(this)" style="display: none">' +
                    '<span id="quoFile" style="cursor:pointer;" onclick="fileDown(\'' +fileInfo.file_path + fileInfo.file_uuid + '\', \''+ fileInfo.file_org_name + '.' + fileInfo.file_ext + '\');">' +
                        fileInfo.file_org_name + '.' + fileInfo.file_ext +
                    '</span>';

                $("#quoFileTr").append(html);
            }
        }
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
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

        var formData = new FormData();
        formData.append("shareSn", data.shareSn);
        formData.append("shareName", data.shareName);
        formData.append("iprClass", data.iprClass);
        formData.append("iprName", data.iprName);
        formData.append("title", data.title);
        formData.append("detailCn", data.detailCn);
        formData.append("regDate", data.regDate);
        formData.append("regEmpSeq", data.regEmpSeq);
        formData.append("regEmpName", data.regEmpName);
        formData.append("shareUser", data.shareUser);
        formData.append("menuCd", "normal");


        if($("#relatedFile")[0].files.length == 1){
            formData.append("relatedFile", $("#relatedFile")[0].files[0]);
        }

        if($("#relatedFile1")[0].files.length == 1){
            formData.append("relatedFile1", $("#relatedFile1")[0].files[0]);
        }

        if($("#quoFile")[0].files.length == 1){
            formData.append("quoFile", $("#quoFile")[0].files[0]);
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
                inventionReq.setInventionInsert(formData);
            }else {
                if(!confirm("문서를 수정하시겠습니까?")){
                    return;
                }
                formData.append("inventionInfoSn", $("#inventionInfoSn").val());
                inventionReq.setInventionInsert(formData);
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
            processData: false,
            contentType: false,
            enctype : 'multipart/form-data',
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
            userText += ",";
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
