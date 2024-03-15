var historyAddPop = {
    global : {
        attFiles : new Array()
    },

    init : function(){

    },


    fn_windowClose : function(e){
        window.close();
    },

    fu_saveInfo : function(e){

        var parameters = {
            historyTitle : $("#historyTitle").val(),
            historyContent : $("#historyContent").val(),
            regEmpSeq : $("#empSeq").val(),
            menuCd : $("#menuCd").val()
        }

        var formData = new FormData();
        if($("#historySn").val() != null && $("#historySn").val() != ""){
            formData.append("HISTORY_SN", $("#historySn").val());
        }
        formData.append("historyTitle", parameters.historyTitle);
        // formData.append("mouEndt", parameters.mouEndt);
        formData.append("historyContent", parameters.historyContent);
        // formData.append("mouContent", parameters.mouContent);
        // formData.append("mouManager", parameters.mouManager);
        formData.append("regEmpSeq", parameters.regEmpSeq);
        formData.append("menuCd", parameters.menuCd);

        if(historyAddPop.global.attFiles != null){
            for(var i = 0; i < historyAddPop.global.attFiles.length; i++){
                formData.append("historyFiles", historyAddPop.global.attFiles[i]);
            }
        }

        $.ajax({
            url : "/user/historyAdd",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(){
                alert("저장되었습니다.");
                window.location.href="/user/pop/organizationHistoryPop.do";
            }
        });
    },

    fileChange : function(){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            historyAddPop.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#ulFileName").empty();
        if(historyAddPop.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < historyAddPop.global.attFiles.length; i++) {
                html += '<li>'
                html += historyAddPop.global.attFiles[i].name.substring(0, historyAddPop.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += historyAddPop.global.attFiles[i].name.substring(historyAddPop.global.attFiles[i].name.lastIndexOf("."));
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="historyAddPop.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulSetFileName").css('margin-bottom', 0);
            $("#ulFileName").append(html);
        }
    },
    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(historyAddPop.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        historyAddPop.global.attFiles = dataTransfer.files;

        if(historyAddPop.global.attFiles.length > 0){
            $("#ulFileName").empty();

            var html = '';
            for (var i = 0; i < historyAddPop.global.attFiles.length; i++) {
                html += '<li>'
                html += historyAddPop.global.attFiles[i].name.substring(0, historyAddPop.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += historyAddPop.global.attFiles[i].name.substring(historyAddPop.global.attFiles[i].name.lastIndexOf("."));
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="historyAddPop.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulFileName").append(html);
        } else {
            $("#ulFileName").empty();
        }

        if(historyAddPop.global.attFiles.length == 0){
            historyAddPop.global.attFiles = new Array();
        }

        historyAddPop.global.attFiles = Array.from(historyAddPop.global.attFiles);
    },
    commonFileDel: function(e, v){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            $.ajax({
                url: "/common/commonFileDel",
                data: {
                    fileNo: e
                },
                type: "post",
                datatype: "json",
                success: function (rs) {
                    var rs = rs.rs;
                    alert(rs.message);
                    if(rs.code == "200"){
                        $(v).closest("li").remove();
                    }
                }
            });
        }
    }
}