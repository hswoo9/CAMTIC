<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<style>
  input[type="text"] {
    width: 50%;
    height: 34px;
    display: inline-block;
    background: none;
    border: 1px solid #c9c9c9;
    padding-left: 5px;
    margin-bottom: 5px;
    font-size: 14px;
  }
  .txt_area_01 {display: inline-block; width: 100%; height: 170px; border: 1px solid #c9c9c9; }

  table th{
    width : 10%;
    text-align: left;
  }
  .file-and-table-container {
    display: flex;
    margin-top: 30px;
  }
  .fileTable {
    width: 80%;
    border-collapse: collapse;
    margin : 0 0 0 20px;
  }
  .fileTable .fileTr .fileTh {
    border: 1px solid #ccc;
    padding: 5px;
  }
  .fileTable .fileTr .fileTh {
    background-color: #f2f2f2;
    text-align: center;
  }

  .__btn1 {
    min-width: 120px;
    height: 40px;
  }

  #title{
    margin-bottom: 0;
  }
</style>


<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>
        <div class="__boardView">
          <div class="head">
            <div>
              <table style="line-height: 60px;">
                <tr style="border-bottom: 1px solid #ccc;">
                  <th>제목</th>
                  <td>
                    <input type="text" id="noticeTitle" class="" value="${map.BOARD_ARTICLE_TITLE}"/>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #ccc;">
                  <th>작성자</th>
                  <td>
                    <input type="text" id="writer" class="" value="${map.REG_EMP_NAME}" disabled/>
                  </td>
                </tr>
                <tr>
                  <th>작성일자</th>
                  <td>
                    <input type="text" id="writeDate" class="" value="<fmt:formatDate value="${map.REG_DATE}" pattern="yyyy-MM-dd" type="date"/>" disabled/>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!-- <dl class="file">
              <dt><span>첨부파일</span></dt>
              <dd>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
                  <p><a href="#">파일명이 노출됩니다.hwp</a></p>
              </dd>
          </dl> -->
          <div class="con">
            <textarea class="txt_area_01" id="contents">
              ${map.BOARD_ARTICLE_CONTENT}
            </textarea>

            <form>
              <div class="file-and-table-container">
                <div>
                  <div class="filebox">
                    <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                      <span class="__btn1 grayLine">파일첨부</span>
                    </button>
                    <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" multiple style="display: none"/>
                  </div>
                </div>

                <table class="fileTable" style="width: 50%;">
                  <colgroup>
                    <col width="50%">
                    <col width="10%">
                    <col width="30%">
                    <col width="10%">
                  </colgroup>
                  <thead>
                  <tr class="fileTr">
                    <th class="fileTh">파일명</th>
                    <th class="fileTh">확장자</th>
                    <th class="fileTh">용량</th>
                    <th class="fileTh">기타</th>
                  </tr>
                  </thead>
                  <tbody id="fileGrid">
                  <tr class="defultTr">
                    <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>


          <div class="__botArea">
            <div class="rig">
              <a href="javascript:void(0);" onclick="fn_move();" class="__btn1 grayLine"><span>뒤로가기</span></a>
              <a href="javascript:void(0);" onclick="fn_updNotice();" class="__btn1 grayLine"><span>수정하기</span></a>
            </div>
          </div>
      </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<input type="hidden" id="boardArticleId" value="${map.BOARD_ARTICLE_ID}"/>
<input type="hidden" id="boardCategoryId" value="${map.BOARD_CATEGORY_ID}"/>
<input type="hidden" id="prevContent" value="${map.BOARD_ARTICLE_CONTENT}"/>
<script>
  var referrer = document.referrer;
  var categoryId = $("#boardCategoryId").val();

  $(function () {

    CKEDITOR.replace('contents', {
        height: 500
      });

    /*CKEDITOR.instances.contents.setData($("#prevContent").val());*/

    fnDefaultScript();




    });

  function fnDefaultScript() {
    var data = {
      boardArticleId : $("#boardArticleId").val(),
      category : categoryId
    }

    $.ajax({
      url: "/camtic/news/getFileListInfo.do",
      data: data,
      dataType : "json",
      async: false,
      success: function(rs){
        console.log(rs.fileMap);
        if(rs.fileMap.length > 0){
          $("#fileGrid").find(".defultTr").remove();
          $("#fileGrid").find(".addFile").remove();

          var html = '';
          for (var i = 0; i < rs.fileMap.length; i++) {
            html += '<tr style="text-align: center" class="addFile">';
            html += '   <td>' + rs.fileMap[i].file_org_name + '</td>';
            html += '   <td>' + rs.fileMap[i].file_ext + '</td>';
            html += '   <td>' + rs.fileMap[i].file_size + '</td>';
            html += '   <td>';
            html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="commonFileDel(' + rs.fileMap[i].file_no + ')">'
            html += '   </td>';
            html += '</tr>';
          }

          $("#fileGrid").append(html);
        }
      },

    });
  }

  function commonFileDel(e, v){
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
                      '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                      '</tr>');
            }

            fnDefaultScript();
          }
        }
      });
    }
  }

  function fn_move(){
    location.href= referrer;
  }

  function fn_updNotice(){

    var content = CKEDITOR.instances.contents.getData();

    /*var data = {
      boardArticleId : $("#boardArticleId").val(),
      boardId : categoryId,
      category : categoryId,
      noticeTitle : $("#noticeTitle").val(),
      content : content
    }*/

    var formData = new FormData();

    formData.append("boardId", categoryId);
    formData.append("category", categoryId);
    formData.append("boardArticleId", $("#boardArticleId").val());
    formData.append("menuCd", categoryId);
    formData.append("noticeTitle", $("#noticeTitle").val());
    formData.append("writer", $("#writer").val().toString());
    formData.append("content", content);

    //첨부파일
    if(fCommon.global.attFiles != null){
      for(var i = 0; i < fCommon.global.attFiles.length; i++){
        formData.append("boardFile", fCommon.global.attFiles[i]);
      }
    }

    if(!confirm("게시글을 수정하시겠습니까?")) {return false;}

    $.ajax({
      url : '/camtic/news/updNotice.do',
      type : 'POST',
      data: formData,
      dataType : "json",
      contentType: false,
      processData: false,
      enctype : 'multipart/form-data',
      async : false,
      success: function() {
        alert("수정이 완료되었습니다.");

        location.href = referrer;
      }
    });


  }

</script>
</body>
</html>
