var fCommon = {

    global : {
        attFiles : new Array(),
        attFiles1 : new Array(),
        attFiles2 : new Array(),
        attFiles3 : new Array(),
    },

    addFileInfoTable : function(){
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            fCommon.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < fCommon.global.attFiles.length; i++) {
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[0] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[1] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(fCommon.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        fCommon.global.attFiles = dataTransfer.files;

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <fCommon.global.attFiles.length; i++) {
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[0] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[1] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">';
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }else{
            $("#fileGrid").find(".addFile").remove();

            if($("#fileGrid").find("tr").length == 0){
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="4" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }

        if(fCommon.global.attFiles.length == 0){
            fCommon.global.attFiles = new Array();
        }

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
                        $(v).closest("tr").remove();
                        if($("#fileGrid").find("tr").length == 0){
                            $("#fileGrid").html('<tr>' +
                                '	<td colspan="4" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>' +
                                '</tr>');
                        }
                    }
                }
            });
        }
    }
}