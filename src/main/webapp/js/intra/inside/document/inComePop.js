var regisReq = {

    global: {
        documentSn: "",
        fileArray: [],
        attFiles: [],
        status : "",
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
            regisReq.global.status = data.STATUS;
            regisReq.settingTempFileDataInit(data.fileList);
            regisReq.btnSet(data);
    },

    btnSet : function(inComeMap){
        let html = makeApprBtnHtml(inComeMap, 'regisReq.inComeDrafting()');
        $("#inComeApprBtnBox").html(html);

        if(inComeMap != null && inComeMap.DOC_ID != null){
            reDraftOnlyOne(inComeMap.DOC_ID, $("#regEmpSeq").val(), "reBtn");
        }

        if(inComeMap.APPRO_KEY != null && inComeMap.APPROVE_STAT_CODE != "40"){
            $("#saveBtn").hide();
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
        formData.append("empSeq", regEmpSeq);

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
        if(regisReq.global.attFiles != null){
            for(var i = 0; i < regisReq.global.attFiles.length; i++){
                formData.append("inComeFile", regisReq.global.attFiles[i]);
            }
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
                if(result.code == 200){
                    alert("문서 등록이 완료되었습니다.");
                    opener.gridReload();

                    var url = "/Inside/Pop/inComeUpdatePop.do?documentSn=" + result.params.documentSn;
                    location.href = url;
                }
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
                location.reload();
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
    },

    fnUploadFile : function(e) {
        let size = 0;
        const dataTransfer = new DataTransfer();
        let fileArray2 = Array.from(regisReq.global.attFiles);
        fileArray2.splice(e, 1);
        fileArray2.forEach(file => {
            dataTransfer.items.add(file);
        });

        regisReq.global.attFiles = dataTransfer.files;

        var fileArray = [];
        fileArray = regisReq.global.attFiles;
        if(fileArray.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <fileArray.length; i++) {
                var fileName = fileArray[i].name.substring(0, fileArray[i].name.lastIndexOf("."));
                var fileExt = fileArray[i].name.substring(fileArray[i].name.lastIndexOf(".") + 1);

                size = fCommon.bytesToKB(fileArray[i].size);
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td>' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regisReq.fnUploadFile(' + i + ')">';
                html += '   </td>';
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

        if(regisReq.global.attFiles.length == 0){
            regisReq.global.attFiles = new Array();
        }
    },

    addFileInfoTable : function (){
        $("#emptyTr").remove();
        let size = 0;
        let fileName = "";
        let fileExt = "";

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            regisReq.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        if(regisReq.global.attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < regisReq.global.attFiles.length; i++) {
                size = fCommon.bytesToKB(regisReq.global.attFiles[i].size);
                fileName = regisReq.global.attFiles[i].name.substring(0, regisReq.global.attFiles[i].name.lastIndexOf("."));
                fileExt = regisReq.global.attFiles[i].name.substring(regisReq.global.attFiles[i].name.lastIndexOf(".")+1);

                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td>' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regisReq.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }
    },

    /** 첨부파일 데이터 세팅 */
    settingTempFileDataInit: function(e){
        var e = e;
        var html = '';
        if(e.length > 0){
            for(var i = 0; i < e.length; i++){
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e[i].file_path+e[i].file_uuid+'\', \''+e[i].file_org_name+'.'+e[i].file_ext+'\')">'+e[i].file_org_name+'</span></td>';
                html += '   <td>'+ e[i].file_ext +'</td>';
                html += '   <td>'+ e[i].file_size +'</td>';
                html += '   <td>';
                if(regisReq.global.status == "0" || regisReq.global.status == "30" || regisReq.global.status == "40") {
                    html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                        '			    <span class="k-button-text">삭제</span>' +
                        '		    </button>';
                }
                html += '   </td>';
                html += '   <td>';
                html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ e[i].file_path +'\', \''+ e[i].file_uuid +'\')">'
                html += '   </td>';
                html += '</tr>';
            }
            $("#fileGrid").html(html);
        }else{
            $("#fileGrid").html('<tr>' +
                '	<td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>' +
                '</tr>');
        }
    },

    fileViewer : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var hostUrl = "";
        if($(location).attr("host").split(":")[0].indexOf("218.158.231.184") > -1 || $(location).attr("host").split(":")[0].indexOf("new.camtic.or.kr") > -1){
            hostUrl = "http://218.158.231.184";
        } else {
            hostUrl = "http://218.158.231.186";
        }
        var popup = window.open(hostUrl + path, name, option);
    },

    fn_multiDownload : function (){
        var fileArray = regisReq.global.fileArray;

        if(fileArray.length > 0){
            for(let i=0; i<fileArray.length; i++){
                fileDown(fileArray[i].file_path+fileArray[i].file_uuid, fileArray[i].file_org_name+'.'+fileArray[i].file_ext);
            }
        }
    },
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