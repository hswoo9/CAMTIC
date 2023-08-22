<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-07-18
  Time: 오전 10:30
  캠틱홈페이지 템플릿
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<ul id="navigation">
  <li><a href="/camtic">홈으로</a></li>
  <li class="mdCategory">캠틱소개</li>
  <li class="smCategory">원장 인사말</li>
</ul>
<div id="title">
  <h3>원장 인사말</h3>
</div>
<script>
  $("#navigation .mdCategory").text($("#header .gnb > ."+middleCategory+" span").text());
  $("#navigation .smCategory").text($("#header .gnb ."+middleCategory+"_"+smallCategory+" a").text());
  $("#title h3").text($("#header .gnb ."+middleCategory+"_"+smallCategory+" a").text());
  //TODO 홈페이지 메뉴명 DB화 전까지 캠-인크루트의 채용공고와 채용절차 타이틀/네비게이션은 하드코딩함.
  if(middleCategory == "member" && smallCategory == "job"){
    $("#title h3").text("채용공고");
    $("#navigation .smCategory").text("채용공고");
  }
</script>