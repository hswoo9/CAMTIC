<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-03-06
  Time: 오전 10:54
  캠틱홈페이지 템플릿
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<div id="skip">
  <a href="#header">메뉴</a>
  <a href="#content">본문</a>
</div>

<header id="header">
  <div class="top">
    <ul class="link">
      <%--<li><a href="#"><span>인재개발센터</span></a></li>
      <li><a href="#"><span>잡매칭센터</span></a></li>
      <li><a href="#"><span>전주첨단벤처단지</span></a></li>--%>
      <li><a href="#"><span>성장개발센터</span></a></li>
    </ul>
    <div class="sns">
      <a href="#" class="insta">인스타그램</a>
      <a href="#" class="face">페이스북</a>
      <a href="#" class="kakao">카카오톡</a>
    </div>
  </div>
  <div class="bot">
    <div class="inner">
      <h1 class="logo"><a href="/camtic">캠틱종합기술원</a></h1>
      <ul class="gnb">
        <li class="<?pubGnb('1');?>">
          <a href="#"><span>캠틱소개</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('1,1');?>"><a href="#">원장 인사말</a></li>
            <li class="<?pubGnb('1,2');?>"><a href="#">주요사업</a></li>
            <li class="<?pubGnb('1,3');?>"><a href="#">비전 및 전략</a></li>
            <li class="<?pubGnb('1,4');?>"><a href="#">연혁</a></li>
            <li class="<?pubGnb('1,5');?>"><a href="#">조직소개</a></li>
            <li class="<?pubGnb('1,6');?>"><a href="#">CI 소개</a></li>
            <li class="<?pubGnb('1,7');?>"><a href="#">오시는 길</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('2');?>">
          <a href="#"><span>지역과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('2,1');?>"><a href="#">소개</a></li>
            <li class="<?pubGnb('2,2');?>"><a href="#">전주첨단벤처단지 <span>(J-밸리)</span></a></li>
            <li class="<?pubGnb('2,3');?>"><a href="#">전주혁신창업허브 (창업동)</a></li>
            <li class="<?pubGnb('2,4');?>"><a href="#">기술창업성장지원센터 (성장동)</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('3');?>">
          <a href="#"><span>기업과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('3,1');?>"><a href="#">R&amp;BD</a></li>
            <li class="<?pubGnb('3,2');?>"><a href="#">복합소재뿌리기술센터</a></li>
            <li class="<?pubGnb('3,3');?>"><a href="#">신기술융합</a></li>
            <li class="<?pubGnb('3,4');?>"><a href="#">제조혁신</a></li>
            <li class="<?pubGnb('3,5');?>"><a href="#">교육훈련인프라</a></li>
            <li class="<?pubGnb('3,6');?>"><a href="#">지역산업육성지원</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('4');?>">
          <a href="#"><span>기술과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('4,1');?>"><a href="#">핵심기술의 사업화</a></li>
            <li class="<?pubGnb('4,2');?>"><a href="#">우주항공</a></li>
            <li class="<?pubGnb('4,3');?>"><a href="#">드론산업</a></li>
            <li class="<?pubGnb('4,4');?>"><a href="#">스마트제조</a></li>
            <li class="<?pubGnb('4,5');?>"><a href="#">장비구축현황</a></li>
            <li class="<?pubGnb('4,6');?>"><a href="#">보유지식재산</a></li>
            <li class="<?pubGnb('4,7');?>"><a href="#">기술이전안내</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('5');?>">
          <a href="#"><span>직원과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('5,1');?>"><a href="#">캠틱 클러스터 비전 2030</a></li>
            <li class="<?pubGnb('5,2');?>"><a href="#">캠 - 퍼스</a></li>
            <li class="<?pubGnb('5,3');?>"><a href="#">캠틱클러스터</a></li>
            <li class="<?pubGnb('5,4');?>"><a href="#">채용정보</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('6');?>">
          <a href="#"><span>캠틱소식</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('6,1');?>"><a href="#">공지사항</a></li>
            <li class="<?pubGnb('6,2');?>"><a href="#">사업공고</a></li>
            <li class="<?pubGnb('6,3');?>"><a href="#">교육/행사</a></li>
            <li class="<?pubGnb('6,4');?>"><a href="#">유관기관소식</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('7');?>">
          <a href="#"><span>홍보관</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('7,1');?>"><a href="#">포토뉴스</a></li>
            <li class="<?pubGnb('7,2');?>"><a href="#">보도자료</a></li>
            <li class="<?pubGnb('7,3');?>"><a href="#">뉴스레터</a></li>
            <li class="<?pubGnb('7,4');?>"><a href="#">홍보영상</a></li>
          </ul>
        </li>
      </ul>
      <button type="button" class="mnu"><span class="hide">메뉴</span><i></i></button>
    </div>
  </div>
</header>