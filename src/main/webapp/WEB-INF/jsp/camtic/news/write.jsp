<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

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
                    <input type="text" id="noticeTitle" class="" value="" />
                  </td>
                </tr>
                <tr>
                  <th>작성자</th>
                  <td>
                    <input type="text" id="writer" class="" value="관리자" disabled/>
                  </td>
                </tr>
                <tr>
                  <th>작성일자</th>
                  <td>
                    <input type="text" id="writeDate" class="" value="" disabled/>
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
              <a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 grayLine"><span>목록보기</span></a>
              <a href="javascript:void(0);" onclick="fn_saveNotice();" class="__btn1 grayLine"><span>등록하기</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>

<input type="hidden" id="category" value="${categoryId}" />
<script>
  var categoryId = $("#category").val();

  $(function () {
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    $("#writeDate").val(year + "년 " + month + "월 " + date + "일")

    CKEDITOR.replace('contents', {
      filebrowserUploadUrl:'/ckeditor/fileupload.do',
      uploadUrl:'/ckeditor/fileupload.do'
    });
  });

  function fn_goList(){

    location.href = '/camtic/news/'+categoryId+'.do';
  }

  function fn_saveNotice(){

    var content = CKEDITOR.instances.contents.getData();

    console.log(categoryId);
    var data = {
      boardId : categoryId,
      boardCategoryId : categoryId,
      noticeTitle : $("#noticeTitle").val(),
      writer : $("#writer").val().toString(),
      content : content
    }

    if($("#noticeTitle").val() == ""){
      alert("제목을 입력해주세요.");
      return false;
    }

    if(content == ""){
      alert("내용을 입력해주세요.");
      return false;
    }

    if(!confirm("게시글을 등록하시겠습니까?")) {return false;}

    $.ajax({
      url : '/camtic/news/insNotice.do',
      type : 'POST',
      data: data,
      dataType : "json",
      async: false,
      success: function() {
        alert("등록");

        location.href = '/camtic/news/'+categoryId+'.do';
      }
    });


  }

</script>
</body>
</html>
