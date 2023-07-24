<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<style>
  .txt_zone {padding: 50px 50px 160px 50px; font-size: 17px; color: #252525;}
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
            <h2>${map.BOARD_ARTICLE_TITLE}</h2>
            <ul class="info">
              <li>작성자 : ${map.REG_EMP_NAME}</li>
              <li>작성일 : <fmt:formatDate value="${map.REG_DATE}" pattern="yyyy-MM-dd" type="date"/></li>
              <li>조회수 : ${map.BOARD_ARTICLE_VIEW_COUNT}</li>
            </ul>
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
            <div class="txt_zone" style="line-height:25px;">
              ${map.BOARD_ARTICLE_CONTENT}
            </div>
          </div>


          <div class="con">
            <table style="width: 50%;">

              <c:if test="${map.beforeKey ne '' && map.beforeKey ne null}">
                <tr>
                  <th style="text-align: center; width: 50%;">이전글</th>
                  <td style="cursor: pointer;" onclick="fn_detailBoard('${map.beforeKey}')">
                    <a href="#" onclick="fn_detailBoard('${map.beforeKey}')">${map.beforeName}</a></td>
                </tr>
              </c:if>
              <c:if test="${map.afterKey ne '' && map.afterKey ne null}">
                <tr>
                  <th style="text-align: center; width: 50%;">다음글</th>
                  <td style="cursor: pointer;" onclick="fn_detailBoard('${map.afterKey}')">
                    <a href="#" onclick="fn_detailBoard('${map.afterKey}')">${map.afterName}</a></td>
                </tr>
              </c:if>
            </table>
          </div>

        </div>

        <div class="__botArea">
          <div class="rig">
            <%--            <a href="#" class="__btn1 blue"><span>온라인 입사지원하기</span></a>--%>
            <a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 grayLine"><span>목록보기</span></a>
            <a href="javascript:void(0);" onclick="fn_regist('${map.BOARD_ARTICLE_ID}');" class="__btn1 grayLine"><span>수정</span></a>
            <a href="javascript:void(0);" onclick="fn_delNotice('${map.BOARD_ARTICLE_ID}');" class="__btn1 grayLine"><span>삭제</span></a>

          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>

<input type="hidden" id="boardArticleId" value="${map.BOARD_ARTICLE_ID}"/>
<input type="hidden" id="category" value="${categoryId}" />
<script>
  var categoryId = $("#category").val();

  function fn_goList(){

    location.href = '/camtic/news/'+categoryId+'.do';
  }

  //상세보기 이동
  function fn_detailBoard(key){

    location.href="/camtic/news/view.do?boardArticleId=" + key + "&category=" + categoryId;
  }

  function fn_regist(key){

    location.href="/camtic/news/register.do?boardArticleId=" + key + "&category=" + categoryId;
  }

  function fn_delNotice(){
    var data = {
      boardArticleId : $("#boardArticleId").val(),
      boardId : categoryId,
      category :categoryId,
    }

    if(!confirm("해당 게시글을 삭제하시겠습니까?")) {return false;}

    $.ajax({
      url : '/camtic/news/deleteBoard.do',
      type : 'POST',
      data: data,
      dataType : "json",
      async: false,
      success: function() {
        alert("삭제가 완료되었습니다.");

        location.href = '/camtic/news/'+categoryId+'.do';
      }
    });
  }
</script>