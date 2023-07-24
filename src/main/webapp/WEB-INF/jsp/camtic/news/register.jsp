<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
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
              <table style="">
                <tr>
                  <th>제목</th>
                  <td>
                    <input type="text" id="noticeTitle" class="" value="${map.BOARD_ARTICLE_TITLE}"/>
                  </td>
                </tr>
                <tr>
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
            <textarea class="txt_area_01" id="contents"></textarea>
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
        filebrowserUploadUrl:'/ckeditor/fileupload.do',
        uploadUrl:'/ckeditor/fileupload.do'
      });


    CKEDITOR.instances.contents.setData($("#prevContent").val());

    });

  function fn_move(){
    location.href= referrer;
  }

  function fn_updNotice(){

    var content = CKEDITOR.instances.contents.getData();

    console.log(content);

    var data = {
      boardArticleId : $("#boardArticleId").val(),
      boardId : categoryId,
      category : categoryId,
      noticeTitle : $("#noticeTitle").val(),
      content : content
    }

    if(!confirm("게시글을 수정하시겠습니까?")) {return false;}

    $.ajax({
      url : '/camtic/news/updNotice.do',
      type : 'POST',
      data: data,
      dataType : "json",
      async: false,
      success: function() {
        alert("수정이 완료되었습니다.");

        location.href = referrer;
      }
    });


  }

</script>
</body>
</html>
