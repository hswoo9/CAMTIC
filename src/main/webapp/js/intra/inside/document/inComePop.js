var regisReq = {

    global: {
        documentSn: ""
    },

    init: function () {
        regisReq.dataSet();
    },

    dataSet: function () {
        customKendo.fn_textBox(["documentPart", "receiveName", "empName", "documentTitleName", "userText", "remarkCn"]);
        customKendo.fn_datePicker("effectiveDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("shipmentDt", 'month', "yyyy-MM-dd", new Date());

        var data = {};
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("deptPart", deptDsA.rs, "dept_name", "dept_seq", 2);

        $("#deptPart").data("kendoDropDownList").bind("change", regisReq.fn_toggleManger);
        $("#deptPart").data("kendoDropDownList").trigger("change");
        $("#documentPartName, #documentPart, #empName, #effectiveDt, #shipmentDt").attr("readonly", true);

            var data = {};
            $.ajax({
                /*url : '/inside/getInComeUpdateFileList',*/
                url : '/inside/getInComeUpdateList',
                data : {
                    documentSn : $("#documentSn").val()
                },
                dataType: "json",
                type : "POST",
                async : false,
                success : function (rs){
                    data = rs.data;
                }
            });
            console.log("data", data);
            regisReq.settingTempFileDataInit(data);
            regisReq.btnSet(data);
    },

    btnSet : function(inComeMap){
        let html = makeApprBtnHtml(inComeMap, 'regisReq.inComeDrafting()');
        $("#inComeApprBtnBox").html(html);

        if(inComeMap != null && inComeMap.DOC_ID != null){
            reDraftOnlyOne(inComeMap.DOC_ID, $("#regEmpSeq").val(), "reBtn");
        }
    },

    inComeDrafting : function(){
        $("#inComeDraftFrm").one("submit", function() {
            var url = "/popup/inside/approvalFormPopup/inComeApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            window.open(url, name, option);
            this.action = "/popup/inside/approvalFormPopup/inComeApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    settingTempFileDataInit : function(e, p){
        var html = '';

        if(p == "result"){
            if(e.file_no > 0){
                $(".resultTh").hide();
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e.file_path+e.file_uuid+'\', \''+e.file_org_name+'.'+e.file_ext+'\')">'+ e.file_org_name +'</span></td>';
                html += '   <td>'+ e.file_ext +'</td>';
                html += '   <td>'+ e.file_size +'</td>';
                html += '</tr>';
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="3" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        } else {
            if(e.file_no > 0){
                $(".resultTh").show();
                html += '<tr style="text-align: center"  class="addFile">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e.file_path+e.file_uuid+'\', \''+e.file_org_name+'.'+e.file_ext+'\')">'+ e.file_org_name +'</span></td>';
                html += '   <td>'+ e.file_ext +'</td>';
                html += '   <td>'+ e.file_size +'</td>';
                html += '   <td>';
                html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e.file_no +', this)">' +
                    '			<span class="k-button-text">삭제</span>' +
                    '		</button>';
                html += '   </td>';
                html += '</tr>';
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }
    },

    saveBtn: function () {
        let docuType = 2;
        let documentSn = $("#documentSn").val();
        let documentPartType = $("#documentPartType").val();
        let documentPartName = $("#documentPartName").val();
        let effectiveDt = $("#effectiveDt").val().replace(/-/g, "");
        let shipmentDt = $("#shipmentDt").val().replace(/-/g, "");
        let receiveName = $("#receiveName").val();
        let managerSn = $("#empSeq").val();
        let managerName = $("#empName").val();
        let documentTitleName = $("#documentTitleName").val();
        let deptPartType = $("#deptPart").val();
        let deptPartText = $("#deptPart").data("kendoDropDownList").text();
        /*let deptPartText;
        if (deptPartType != 6) {
            deptPartText = $("#deptPart").data("kendoDropDownList").text();
        }*/
        let userSn = $("#userSn").val();
        let userText = $("#userText").val();
        let remarkCn = $("#remarkCn").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        var formData = new FormData();
        formData.append("menuCd", "inCome");
        formData.append("docuType", docuType);
        formData.append("documentSn", documentSn);
        formData.append("documentPartType", documentPartType);
        formData.append("documentPartName", documentPartName);
        formData.append("effectiveDt", effectiveDt);
        formData.append("shipmentDt", shipmentDt);
        formData.append("receiveName", receiveName);
        formData.append("managerSn", managerSn);
        formData.append("managerName", managerName);
        formData.append("documentTitleName", documentTitleName);
        formData.append("deptPartType", deptPartType);
        formData.append("deptPartText", deptPartText);
        formData.append("userSn", userSn);
        formData.append("userText", userText);
        formData.append("remarkCn", remarkCn);
        formData.append("regEmpSeq", regEmpSeq);
        formData.append("regEmpName", regEmpName);
        formData.append("empSeq", empSeq);

        if (documentPartType == "") {
            alert("구분이 선택되지 않았습니다.");
            return;
        }
        if (effectiveDt == "") {
            alert("시행일자가 선택되지 않았습니다.");
            return;
        }
        if (shipmentDt == "") {
            alert("접수일자가 선택되지 않았습니다.");
            return;
        }
        if (receiveName == "") {
            alert("발신기관이 작성되지 않았습니다.");
            return;
        }
        if (managerSn == "") {
            alert("접수자가 선택되지 않았습니다.");
            return;
        }
        if (documentTitleName == "") {
            alert("제목이 작성되지 않았습니다.");
            return;
        }
        if (deptPartType == "") {
            alert("담당부서를 선택되지 않았습니다.");
            return;
        }
        if (deptPartType == 6 && userSn == "") {
            alert("담당자가 선택되지 않았습니다.");
            return;
        }
        if (receiveName == "") {
            alert("수신처가 작성되지 않았습니다.");
            return;
        }

        //증빙파일 첨부파일
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("inComeFile", fCommon.global.attFiles[i]);
            }
        }

        console.log(fCommon.global.attFiles.length + "파일크기");
        if(fCommon.global.attFiles.length != 0){
            if(fCommon.global.attFiles.length > 1){
                alert("첨부파일은 1개만 업로드 가능합니다.");
                return false;
            }
            console.log(fCommon.global.attFiles);
        }


        if (documentSn === "") {
            if (!confirm("문서를 등록하시겠습니까?")) {
                return;
            }
            regisReq.setInComeInsert(formData);
        } else {
            if (!confirm("문서를 수정하시겠습니까?")) {
                return;
            }
            regisReq.setInComeUpdate(formData);
        }
    },

    setInComeInsert: function(formData){
        $.ajax({
            url : "/inside/setInComeInsert",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(result){
                console.log(result);
                alert("문서 등록이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setInComeUpdate: function (formData) {
        $.ajax({
            url : "/inside/setInComeUpdate",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(result){
                console.log(result);
                alert("문서 수정이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    fn_toggleManger: function () {
        if ($("#deptPart").val() == 6) {
            $(".managerTd").show();
            $(".colTd").show(); //담당 부서 담당자 선택
            $(".colTd1").hide();
        } else {
            $(".managerTd").hide();
        }
    }
}

function userDataSet(userArr) {
    let userText = "";
    let userSn = "";
    for (let i = 0; i < userArr.length; i++) {
        if (userText != "") {
            userText += ", ";
            userSn += ",";
        }
        userText += userArr[i].empName;
        userSn += userArr[i].empSeq;
    }
    $("#userText").val(userText);
    $("#userSn").val(userSn);
}