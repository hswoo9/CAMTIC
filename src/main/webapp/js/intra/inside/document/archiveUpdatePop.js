var archiveUpdatePop = {

    global: {
        archiveInfoSn: ""
    },

    init: function () {
        archiveUpdatePop.dataSet();
    },

    dataSet: function () {
        customKendo.fn_datePicker("docYear", 'decade', "yyyy", new Date());
        fn_deptSetting(2);
        customKendo.fn_textBox(["docNum", "empName", "docName", "disYear"]);
        $("#docYear, #empName").attr("readonly", true);

        $.ajax({
            url: "/document/getDocumentPlaceList",
            type: "post",
            async: false,
            dataType: "json",
            success: function (result) {
                var ds = result.list;
                ds.unshift({TEXT: '선택하세요', VALUE: ''});

                $("#visit").kendoDropDownList({
                    dataTextField: "TEXT",
                    dataValueField: "VALUE",
                    dataSource: ds,
                    index: 0
                })
            }
        });

        $("#prePeriod").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "1년", value: "1"},
                {text: "2년", value: "2"},
                {text: "3년", value: "3"},
                {text: "4년", value: "4"},
                {text: "5년", value: "5"}
            ],
            index: 0
        });

        $("#prePeriod").on("change", function () {
            str = parseInt($('#docYear').val());
            str1 = parseInt($('#prePeriod').val());

            $("#disYear").val(str + str1 - 1);
        });

        $("#docYear").on("change", function () {
            str = parseInt($('#docYear').val());
            str1 = parseInt($('#prePeriod').val());

            $("#disYear").val(str + str1 - 1);
        });

        var data = {};
        $.ajax({
            url : '/inside/getArchiveinfoList',
            data : {
                pk : $("#archiveSn").val()
            },
            dataType: "json",
            type : "POST",
            async : false,
            success : function (rs){
                data = rs.data;
            }
        });
console.log(data);
        archiveUpdatePop.settingTempFileDataInit(data);
    },

    settingTempFileDataInit : function(e, p){
        var html = '';

        if(p == "result"){
            if(e.file_no > 0){
                $(".resultTh").hide();
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\'http://218.158.231.186:8080'+e.file_path+e.file_uuid+'\', \''+e.file_org_name+'.'+e.file_ext+'\')">'+ e.file_org_name +'</span></td>';
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
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\'http://218.158.231.186:8080'+e.file_path+e.file_uuid+'\', \''+e.file_org_name+'.'+e.file_ext+'\')">'+ e.file_org_name +'</span></td>';
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

        if (confirm("수정하시겠습니까?")) {
            let pk = $("#archiveSn").val();
            let docYear = $("#docYear").val();
            let docNum = $("#docNum").val();
            let deptSn = $("#dept").val();
            let deptName = $("#dept").data("kendoDropDownList").text();
            let teamSn = $("#team").val();
            let teamName = $("#team").data("kendoDropDownList").text();
            let visit = $("#visit").data("kendoDropDownList").text();
            let managerSn = $("#empSeq").val();
            let managerName = $("#empName").val();
            let prePeriod = $("#prePeriod").val();
            let disYear = $("#disYear").val();
            let docName = $("#docName").val();
            let empSeq = $("#empSeq").val();

            var formData = new FormData();
            formData.append("menuCd", "archive");
            formData.append("pk", pk);
            formData.append("docYear", docYear);
            formData.append("docNum", docNum);
            formData.append("deptSn", deptSn);
            formData.append("deptName", deptName);
            formData.append("teamSn", teamSn);
            formData.append("teamName", teamName);
            formData.append("visit", visit);
            formData.append("managerSn", managerSn);
            formData.append("managerName", managerName);
            formData.append("prePeriod", prePeriod);
            formData.append("disYear", disYear);
            formData.append("docName", docName);
            formData.append("empSeq", empSeq);

            //증빙파일 첨부파일
            if(fCommon.global.attFiles != null){
                for(var i = 0; i < fCommon.global.attFiles.length; i++){
                    formData.append("archiveFile", fCommon.global.attFiles[i]);
                }
            }


            if (docNum == "") {
                alert("문서번호가 선택되지 않았습니다.");
                return;
            }
            if (visit == "") {
                alert("문서위치가 작성되지 않았습니다.");
                return;
            }
            if (docName == "") {
                alert("문서명이 작성되지 않았습니다.");
                return;
            }
            if (managerSn == "") {
                alert("등록자가 작성되지 않았습니다.");
                return;
            }
            if (prePeriod == "") {
                alert("보존년한이 작성되지 않았습니다.");
                return;
            }
            if (disYear == "") {
                alert("폐기년도가 작성되지 않았습니다.");
                return;
            }

            console.log(formData);

            $.ajax({
                url: '/document/setArchiveUpdate',
                data: formData,
                type : "post",
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                async: false,
                success : function(result){
                    console.log(result);
                    alert("수정이 완료되었습니다.");
                    opener.gridReload();
                    window.close();

                },
                error : function() {
                    alert("저장 중 에러가 발생했습니다.");
                    window.close();
                }
            });
        }
    }
}

