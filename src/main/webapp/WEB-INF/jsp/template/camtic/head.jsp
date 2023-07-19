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
      <li><a href="#"><span>통합페이지</span></a></li>
<%--      <li><a href="#"><span>잡매칭센터</span></a></li>--%>
      <li><a href="#"><span>전주첨단벤처단지</span></a></li>
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
          <a href="/camtic/about/greeting.do"><span>캠틱소개</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('1,1');?>"><a href="/camtic/about/greeting.do">원장 인사말</a></li>
            <li class="<?pubGnb('1,2');?>"><a href="/camtic/about/business.do">주요사업</a></li>
            <li class="<?pubGnb('1,3');?>"><a href="/camtic/about/vision.do">미션.비젼</a></li>
            <li class="<?pubGnb('1,4');?>"><a href="/camtic/about/history.do">연혁</a></li>
            <li class="<?pubGnb('1,5');?>"><a href="/camtic/about/organization.do">조직.연락처</a></li>
            <li class="<?pubGnb('1,6');?>"><a href="/camtic/about/location.do">오시는 길</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('2');?>">
          <a href="/camtic/region/about.do"><span>지역과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('2,1');?>"><a href="/camtic/region/about.do">전주첨단벤처단지</a></li>
            <li class="<?pubGnb('2,2');?>"><a href="/camtic/region/jvalley.do">제조창업 플랫폼(J-valley)</a></li>
            <li class="<?pubGnb('2,3');?>"><a href="/camtic/region/list.do">입주기업 및 입주안내</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('3');?>">
          <a href="/camtic/company/root.do"><span>기업과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('3,1');?>"><a href="/camtic/company/root.do">복합소재뿌리기술센터</a></li>
            <li class="<?pubGnb('3,2');?>"><a href="/camtic/company/drone.do">드론산업혁신지원센터</a></li>
            <li class="<?pubGnb('3,3');?>"><a href="/camtic/company/space.do">메이커스페이스</a></li>
            <li class="<?pubGnb('3,4');?>"><a href="/camtic/company/support.do">기업육성지원</a></li>
            <li class="<?pubGnb('3,5');?>"><a href="/camtic/company/talent.do">인재개발센터</a></li>
            <li class="<?pubGnb('3,6');?>"><a href="/camtic/company/job.do">일자리창업지원</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('4');?>">
          <a href="/camtic/tech/drone.do"><span>기술과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('4,1');?>"><a href="/camtic/tech/drone.do">드론모빌리티</a></li>
            <li class="<?pubGnb('4,2');?>"><a href="/camtic/tech/carbon.do">탄소복합재</a></li>
            <li class="<?pubGnb('4,3');?>"><a href="/camtic/tech/bio.do">바이오헬스케어</a></li>
            <li class="<?pubGnb('4,4');?>"><a href="/camtic/tech/smart.do">스마트제조·로봇</a></li>
            <li class="<?pubGnb('4,5');?>"><a href="/camtic/tech/space.do">우주·항공·방산</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('5');?>">
          <a href="/camtic/member/cluster.do"><span>직원과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('5,1');?>"><a href="/camtic/member/cluster.do">캠틱 클러스터</a></li>
            <li class="<?pubGnb('5,2');?>"><a href="/camtic/member/campus.do">캠 - 퍼스</a></li>
            <li class="<?pubGnb('5,3');?>"><a href="/camtic/member/welfare.do">캠 - 웰페어</a></li>
            <li class="<?pubGnb('5,4');?> chi">
              <a href="/camtic/member/job.do">캠 - 인크루트</a>
              <ul>
                <li class="<?pubGnb('5,4,1');?>"><a href="/camtic/member/job.do">채용공고</a></li>
                <li class="<?pubGnb('5,4,2');?>"><a href="/camtic/member/step.do">채용절차</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="<?pubGnb('6');?>">
          <a href="/camtic/news/notice.do"><span>캠틱소식</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('6,1');?>"><a href="/camtic/news/notice.do">공지사항</a></li>
            <li class="<?pubGnb('6,2');?>"><a href="/camtic/news/business.do">사업공고</a></li>
            <li class="<?pubGnb('6,3');?>"><a href="/camtic/news/study.do">교육/행사</a></li>
            <li class="<?pubGnb('6,4');?>"><a href="/camtic/news/partner.do">유관기관소식</a></li>
          </ul>
        </li>
        <li class="<?pubGnb('7');?>">
          <a href="/camtic/pr/photo.do"><span>홍보관</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="<?pubGnb('7,1');?>"><a href="/camtic/pr/photo.do">포토뉴스</a></li>
            <li class="<?pubGnb('7,2');?>"><a href="/camtic/pr/report.do">보도자료</a></li>
            <li class="<?pubGnb('7,3');?>"><a href="/camtic/pr/news.do">뉴스레터</a></li>
            <li class="<?pubGnb('7,4');?>"><a href="/camtic/pr/video.do">홍보영상</a></li>
            <li class="<?pubGnb('7,5');?>"><a href="/camtic/pr/ci.do">CI 소개</a></li>
          </ul>
        </li>
      </ul>
      <button type="button" class="mnu"><span class="hide">메뉴</span><i></i></button>
    </div>
  </div>
</header>

<a href="#" id="alarm">주요 알림 맞춤서비스</a>