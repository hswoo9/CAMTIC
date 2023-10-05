<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<div id="skip">
  <a href="#header" style="font-size: 0">메뉴</a>
  <a href="#content" style="font-size: 0">본문</a>
</div>

<header id="header">
  <div class="top">
    <ul class="link">
      <li><a href="/camtic"><span>KOR</span></a></li>
      <li><a href="#"><span>통합페이지</span></a></li>
      <%--<li><a href="#"><span>잡매칭센터</span></a></li>--%>
      <li><a href="#"><span>전주첨단벤처단지</span></a></li>
    </ul>
    <div class="sns">
      <a href="https://www.instagram.com/camtic4u/?utm_medium=copy_link" target='_blank' class="insta">인스타그램</a>
      <a href="https://www.facebook.com/CAMTIC4U" target='_blank' class="face">페이스북</a>
      <%--<a href="https://pf.kakao.com/_Txmjps" target='_blank' class="kakao">카카오톡</a>--%>
    </div>
  </div>
  <div class="bot">
    <div class="inner">
      <h1 class="logoENG"><a href="/camtic">캠틱종합기술원</a></h1>
      <ul class="gnb">
        <li class="about_greeting">
          <a href="/camtic/about/greetingENG.do"><span>Introduce</span><i aria-hidden="true"></i></a>
        </li>
        <li class="about_history">
          <a href="/camtic/about/historyENG.do"><span>History</span><i aria-hidden="true"></i></a>
        </li>
        <li class="about_business">
          <a href="/camtic/about/businessENG.do"><span>Major Business Areas</span><i aria-hidden="true"></i></a>
        </li>
        <li class="about_vision">
          <a href="/camtic/about/visionENG.do"><span>CAMTIC Mission & Vision 2030</span><i aria-hidden="true"></i></a>
        </li>
        <li class="about_location">
          <a href="/camtic/about/locationENG.do"><span>Contect</span><i aria-hidden="true"></i></a>
        </li>
      </ul>
      <button type="button" class="mnu"><span class="hide">메뉴</span><i></i></button>
    </div>
  </div>
</header>

<jsp:include page="/WEB-INF/jsp/template/camtic/alarm.jsp" flush="false"/>
<jsp:include page="/WEB-INF/jsp/template/camtic/aside.jsp" flush="false"/>


<script>
  const pathname = $(location).attr('pathname');
  const middleCategory = pathname.split("/")[2];
  let smallCategory = pathname.split("/")[3];
  if(smallCategory != undefined){
    smallCategory = smallCategory.split(".")[0];
  };
  $("."+middleCategory+"_"+smallCategory).addClass('active');
</script>