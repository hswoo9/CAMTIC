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
        </div>

        <div class="__botArea">
          <div class="rig">
            <%--            <a href="#" class="__btn1 blue"><span>온라인 입사지원하기</span></a>--%>
            <a href="javascript:fn_regist();" class="__btn1 grayLine"><span>수정</span></a>
            <a href="/camtic/news/notice.do" class="__btn1 grayLine"><span>목록보기</span></a>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>

<script>
  function fn_regist(){

  }
</script>