<%--
  Created by IntelliJ IDEA.
  User: deer
  Date: 2022-07-15
  Time: 오후 9:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style>
    .fileUpload {
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        /* border-radius: 0.25rem; */
        color: #1A5089;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        border-color: #1A5089;
        vertical-align: middle;
        background-color: #fff;
        font-size: 14px;
    }
</style>
<div id="fileAppendM" style="width: 100%; height: 100%">

</div>

<script>
  var attFiles = new Array();
  kendoSetting();

  function kendoSetting(){
    $("#fileAppendM").kendoWindow({
      width : "700px",
      height : "350px",
      visible: false,
      modal: true,
      position : {
        top : 1200,
        left : 650
      },
      open : function () {
        var htmlStr = '<div class="card-header" style="margin-left:8px;">' +
                '<h3 class="card-title" style="font-size:18px;">파일업로드</h3>' +
                '</div>' +
                '<div class="table-responsive">' +
                '    <table class="table subbtnBox">' +
                '        <tbody>' +
                '            <tr>' +
                '                <th class="bgfont-color text-center">파일첨부</th>' +
                '                <td style="display: flex; border-top:0;">' +
                '                    <input type="text" id="inputFile" style="width: 80%; border: 1px solid #bbb;">' +
                '                        <div class="filebox" style="width: 20%;">' +
                '                            <label for="fileList" class="fileUpload" style="margin:0 0 0 5px; height:auto">파일첨부</label>' +
                '                            <input type="file" id="fileList" name="fileList" class="hidden" onchange="getFileNm(\'Mopen\');" multiple />' +
                '                        </div>' +
                '                </td>' +
                '            </tr>' +
                '        </tbody>' +
                '    </table>' +
                '    <div class="spanft">' +
                '        <span class="red-star" style="margin-left:30px;">10MB이하</span>의 파일만 등록할 수 있습니다.' +
                '    </div>' +
                '    <div class="btn-st" style="margin:30px 24px 0 0;">' +
                '        <input type="reset" style="margin-right:5px;" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="uploadCancle" value="취소" onclick="$(\'#fileAppendM\').data(\'kendoWindow\').close();" />' +
                '        <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="uploadSave" value="확인" onclick="" />' +
                '    </div>' +
                '</div>';

        $('#fileAppendM').html(htmlStr);

        getFileNm();

        $('#fileAppendM').parent().find('.k-window-titlebar').css('background-color', '#333948')
        $('#fileAppendM').parent().find('.k-window-actions').css('color', 'white');
      },
      close: function () {
        $("#fileAppendM").empty();
      }
    });
  }

  function addFileInfoTable(){
    if(attFiles == '' || attFiles == null){
      alert("업로드할 파일을 선택해주세요.");

      return;
    } else {
      $("#fileAppendM").data("kendoWindow").close();
    }

    $("#fileGrid").find(".addFile").remove();

    var html = '';
    for(var i = 0 ; i < attFiles.length ; i++){
      html += '<tr style="text-align: center" class="addFile">';
      html += '   <td>'+ attFiles[i].name.split(".")[0]+'</td>';
      html += '   <td>'+ attFiles[i].name.split(".")[1]+'</td>';
      html += '   <td>'+ attFiles[i].size+'</td>';
      html += '   <td>';
      html += '       <input type="button" onclick="fnUploadFile('+i+')" value="삭제">'
      html += '   </td>';
      html += '</tr>';
    }

    $("#fileGrid").append(html);
  }

  function getFileNm(type){
    if(type != null){
      for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
        attFiles.push($("input[name='fileList']")[0].files[i]);
      }
    }
    var filesLength = attFiles.length;

    if(filesLength > 1){
      $("#inputFile").val(attFiles[0].name + " 등 " + filesLength + "개")
    } else if(filesLength == 1){
      $("#inputFile").val(attFiles[0].name)
    }
  }

  function fnUploadFile(e) {
    const dataTransfer = new DataTransfer();
    let fileArray = Array.from(attFiles);
    fileArray.splice(e, 1);
    fileArray.forEach(file => {
      dataTransfer.items.add(file);
    });

    attFiles = dataTransfer.files;

    if(attFiles.length > 0){
      $("#fileGrid").find(".addFile").remove();

      var html = '';
      for (var i = 0; i < attFiles.length; i++) {
        html += '<tr style="text-align: center" class="addFile">';
        html += '   <td>' + attFiles[i].name.split(".")[0] + '</td>';
        html += '   <td>' + attFiles[i].name.split(".")[1] + '</td>';
        html += '   <td>' + attFiles[i].size + '</td>';
        html += '   <td>';
        html += '       <input type="button" onclick="fnUploadFile(' + i + ')" value="삭제">'
        html += '   </td>';
        html += '</tr>';
      }

      $("#fileGrid").append(html);
    }else{
      $("#fileGrid").find(".addFile").remove();

      if($("#fileGrid").find("tr").length == 0){
        $("#fileGrid").html('<tr>' +
                '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                '</tr>');
      }
    }

    if(attFiles.length == 0){
      attFiles = new Array();
    }

  }

</script>
</body>
</html>