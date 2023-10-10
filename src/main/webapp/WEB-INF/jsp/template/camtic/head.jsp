<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<div id="skip">
  <a href="#header" style="font-size: 0">메뉴</a>
  <a href="#content" style="font-size: 0">본문</a>
</div>

<header id="header">
  <div class="top">
    <ul class="link">
      <li><a href="/camtic/about/greetingENG.do"><span>ENG</span></a></li>
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
      <h1 class="logo"><a href="/camtic">캠틱종합기술원</a></h1>
      <ul class="gnb">
        <li class="about">
          <a href="/camtic/about/greeting.do"><span>캠틱소개</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="about_greeting"><a href="/camtic/about/greeting.do">원장 인사말</a></li>
            <li class="about_business"><a href="/camtic/about/business.do">주요사업</a></li>
            <li class="about_vision"><a href="/camtic/about/vision.do">미션ㆍ비젼</a></li>
            <li class="about_history"><a href="/camtic/about/history.do">연혁</a></li>
            <li class="about_organization"><a href="/camtic/about/organization.do">조직ㆍ연락처</a></li>
            <li class="about_location"><a href="/camtic/about/location.do">오시는 길</a></li>
          </ul>
        </li>
        <li class="region">
          <a href="/camtic/region/about.do"><span>지역과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="region_about"><a href="/camtic/region/about.do">전주첨단벤처단지</a></li>
            <li class="region_jvalley"><a href="/camtic/region/jvalley.do">제조창업 플랫폼(J-valley)</a></li>
            <%--<li class="region_list"><a href="http://www.jhitech.or.kr/web/page.php?pcode=BA" target='_blank'>입주기업 및 입주안내</a></li>--%>
            <li class="region_list"><a href="/camtic/region/list.do">시설 및 입주안내</a></li>
            <li style="display: none" class="region_view"><a href="/camtic/region/view.do">게시판</a></li>
          </ul>
        </li>
        <li class="company">
          <a href="/camtic/company/root.do"><span>기업과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="company_root"><a href="/camtic/company/root.do">복합소재뿌리기술센터</a></li>
            <li class="company_drone"><a href="/camtic/company/drone.do">드론기술개발지원센터</a></li>
            <li class="company_space"><a href="/camtic/company/space.do">메이커스페이스</a></li>
            <li class="company_support"><a href="/camtic/company/support.do">창업/기업 성장지원</a></li>
            <li class="company_talent"><a href="/camtic/company/talent.do">인재개발지원</a></li>
            <li class="company_job"><a href="/camtic/company/job.do">일자리혁신지원</a></li>
          </ul>
        </li>
        <li class="tech">
          <a href="/camtic/tech/drone.do"><span>기술과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="tech_drone"><a href="/camtic/tech/drone.do">드론모빌리티</a></li>
            <li class="tech_carbon"><a href="/camtic/tech/carbon.do">탄소복합재</a></li>
            <li class="tech_bio"><a href="/camtic/tech/bio.do">바이오헬스케어</a></li>
            <li class="tech_smart"><a href="/camtic/tech/smart.do">스마트제조·로봇</a></li>
            <li class="tech_space"><a href="/camtic/tech/space.do">우주·항공·방산</a></li>
          </ul>
        </li>
        <li class="member">
          <a href="/camtic/member/cluster.do"><span>직원과 함께</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="member_cluster"><a href="/camtic/member/cluster.do">캠틱 클러스터</a></li>
            <li class="member_campus"><a href="/camtic/member/campus.do">캠 - 퍼스</a></li>
            <li class="member_welfare"><a href="/camtic/member/welfare.do">캠 - 웰페어</a></li>
            <li class="member_job chi">
              <a href="/camtic/member/job.do">캠 - 인크루트</a>
              <ul>
                <li class="member_job"><a href="/camtic/member/job.do">채용공고</a></li>
                <li class="member_step"><a href="/camtic/member/step.do">채용절차</a></li>
              </ul>
            </li>
            <li style="display: none" class="member_view"><a href="/camtic/member/view.do">게시판</a></li>
          </ul>
        </li>
        <li class="news">
          <a href="/camtic/news/commonBoard.do?categoryKey=notice"><span>캠틱소식</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="news_notice"><a href="/camtic/news/commonBoard.do?categoryKey=notice">공지사항</a></li>
            <li class="news_business"><a href="/camtic/news/commonBoard.do?categoryKey=business">사업공고</a></li>
            <li class="news_study"><a href="/camtic/news/commonBoard.do?categoryKey=study">교육/행사</a></li>
            <li class="news_partner"><a href="/camtic/news/commonBoard.do?categoryKey=partner">유관기관소식</a></li>
            <li style="display: none" class="news_view"><a href="/camtic/news/view.do">게시판</a></li>
          </ul>
        </li>
        <li class="pr">
          <a href="/camtic/pr/photo.do"><span>홍보관</span><i aria-hidden="true"></i></a>
          <ul>
            <li class="pr_photo"><a href="/camtic/pr/photo.do">포토뉴스</a></li>
            <li class="pr_report"><a href="/camtic/pr/report.do">보도자료</a></li>
            <li class="pr_news"><a href="/camtic/pr/news.do">뉴스레터</a></li>
            <li class="pr_video"><a href="/camtic/pr/video.do">홍보영상</a></li>
            <li class="pr_ci"><a href="/camtic/pr/ci.do">CI 소개</a></li>
            <li style="display: none" class="pr_view"><a href="/camtic/pr/view.do">게시판</a></li>
          </ul>
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

  const head = {
    init() {
      this.action();
    },
    action() {
      const header = $('#header');

      header
              .on('click', '.mnu', () => $html.toggleClass('navOn'))
              .on('mouseenter focusin', '.gnb', () => {
                if (matchMedia('screen and (min-width:1025px)').matches) $html.addClass('navOn');
              })
              .on('mouseleave focusout', () => {
                if (matchMedia('screen and (min-width:1025px)').matches) {
                  $html.removeClass('navOn');
                }
              })
              .on('click', '.gnb > li > a', function () {
                if (matchMedia('screen and (max-width:1024px)').matches && $(this).next('ul').length > 0) {
                  $(this).closest('li').toggleClass('active').siblings().removeClass('active');
                  return false;
                }
              });

      const handleHeadFix = () => $html.toggleClass('fix', winSh() > 30);

      $win.on('load scroll', handleHeadFix);

      const gotop = $('._gotop');
      gotop.on('click', () => {
        $html.animate({ scrollTop: 0 }, 500);
        return false;
      });
    },
  };
</script>