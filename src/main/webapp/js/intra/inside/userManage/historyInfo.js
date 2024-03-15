var historyInfo = {
    global : {
        attFiles : new Array()
    },


    fn_windowClose : function(e){
        window.close();
    },

    fn_historyInfo : function (key){
        location.href = "/user/pop/historyInfo.do?historySn="+key;

    },

    fileChange : function(){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            historyInfo.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#ulFileName").empty();
        if(historyInfo.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < historyInfo.global.attFiles.length; i++) {
                html += '<li>'
                html += historyInfo.global.attFiles[i].name.substring(0, historyInfo.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += historyInfo.global.attFiles[i].name.substring(historyInfo.global.attFiles[i].name.lastIndexOf("."));
                html += '</li>';
            }

            $("#ulSetFileName").css('margin-bottom', 0);
            $("#ulFileName").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(historyInfo.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        historyInfo.global.attFiles = dataTransfer.files;

        if(historyInfo.global.attFiles.length > 0){
            $("#ulFileName").empty();

            var html = '';
            for (var i = 0; i < historyInfo.global.attFiles.length; i++) {
                html += '<li>'
                html += historyInfo.global.attFiles[i].name.substring(0, historyInfo.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += historyInfo.global.attFiles[i].name.substring(historyInfo.global.attFiles[i].name.lastIndexOf("."));
                html += '</li>';
            }

            $("#ulFileName").append(html);
        } else {
            $("#ulFileName").empty();
        }

        if(historyInfo.global.attFiles.length == 0){
            historyInfo.global.attFiles = new Array();
        }

        historyInfo.global.attFiles = Array.from(historyInfo.global.attFiles);
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