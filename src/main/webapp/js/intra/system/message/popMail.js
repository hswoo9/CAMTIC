const popMail = {

    global : {
        attFiles : [],
    },

    fn_defaultScript: function(){
        popMail.fn_pageSet();
        popMail.fn_dataSet();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["name", "email"]);
    },

    fn_saveBtn: function(){
        const name = $("#name").val();
        const email = $("#email").val();

        if(name == ""){ alert("성명을 작성해주세요."); return;}
        if(email == ""){ alert("메일주소를 작성해주세요."); return;}

        if(!confirm("저장하시겠습니까?")){
            return;
        }

        const formData = new FormData();
        const itemArr = [{
            name : name,
            email : email
        }]
        formData.append("mailHistSn", $("#mailHistSn").val());
        formData.append("itemArr", JSON.stringify(itemArr));
        const result = customKendo.fn_customFormDataAjax("/system/setMailDet", formData);
        if(result.params.code == "200"){
            alert("저장되었습니다.");
            opener.mailDetPop.gridReload();
            window.close();
        }
    },

    fileChange : function(){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            fCommon.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#fileName").empty();
        if(fCommon.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < fCommon.global.attFiles.length; i++) {
                if(i>0){
                    html += ' | ';
                }
                html += fCommon.global.attFiles[i].name.substring(0, fCommon.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += fCommon.global.attFiles[i].name.substring(fCommon.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="border: none; background-color: transparent; color: red; font-weight: bold;" onclick="">';
                html += '';
            }

            $("#fileName").append(html);
        }
    },

    deleteFile : function(key, e) {
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
                    if(rs.code == "200"){
                        alert("파일이 삭제되었습니다.");
                        $(e).closest('div').remove();
                    }
                }
            });
        }
    }
}