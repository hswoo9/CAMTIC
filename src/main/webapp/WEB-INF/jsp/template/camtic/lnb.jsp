<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<div id="lnb">
  <h2></h2>
  <ul class="lnb">
    <li class="about about_greeting"><a href="/camtic/about/greeting.do">원장 인사말</a></li>
    <li class="about about_business"><a href="/camtic/about/business.do">주요사업</a></li>
    <li class="about about_vision"><a href="/camtic/about/vision.do">미션ㆍ비젼</a></li>
    <li class="about about_history"><a href="/camtic/about/history.do">연혁</a></li>
    <li class="about about_organization"><a href="/camtic/about/organization.do">조직ㆍ연락처</a></li>
    <li class="about about_location"><a href="/camtic/about/location.do">오시는 길</a></li>

    <li class="region region_about"><a href="/camtic/region/about.do">전주첨단벤처단지</a></li>
    <li class="region region_jvalley"><a href="/camtic/region/jvalley.do">제조창업 플랫폼(J-valley)</a></li>
    <%--<li class="region region_list"><a href="http://www.jhitech.or.kr/web/page.php?pcode=BA" target='_blank'>입주기업 및 입주안내</a></li>--%>
    <li class="region region_list"><a href="/camtic/region/list.do">시설 및 입주안내</a></li>
    <li style="display: none" class="region_view"><a href="/camtic/region/view.do">게시판</a></li>

    <li class="company company_root"><a href="/camtic/company/root.do">복합소재뿌리기술센터</a></li>
    <li class="company company_drone"><a href="/camtic/company/drone.do">드론기술개발지원센터</a></li>
    <li class="company company_space"><a href="/camtic/company/space.do">메이커스페이스</a></li>
    <li class="company company_support"><a href="/camtic/company/support.do">창업/기업 성장지원</a></li>
    <li class="company company_talent"><a href="/camtic/company/talent.do">인재개발지원</a></li>
    <li class="company company_job"><a href="/camtic/company/job.do">일자리혁신지원</a></li>

    <li class="tech tech_drone"><a href="/camtic/tech/drone.do">드론모빌리티</a></li>
    <li class="tech tech_carbon"><a href="/camtic/tech/carbon.do">탄소복합재</a></li>
    <li class="tech tech_bio"><a href="/camtic/tech/bio.do">바이오헬스케어</a></li>
    <li class="tech tech_smart"><a href="/camtic/tech/smart.do">스마트제조·로봇</a></li>
    <li class="tech tech_space"><a href="/camtic/tech/space.do">우주·항공·방산</a></li>

    <li class="member member_cluster"><a href="/camtic/member/cluster.do">캠틱 클러스터</a></li>
    <li class="member member_campus"><a href="/camtic/member/campus.do">캠 - 퍼스</a></li>
    <li class="member member_welfare"><a href="/camtic/member/welfare.do">캠 - 웰페어</a></li>
    <li class="member member_job member_step chi">
      <a href="/camtic/member/job.do">캠 - 인크루트</a>
      <ul>
        <li class="member member_job"><a href="/camtic/member/job.do">채용공고</a></li>
        <li class="member member_step"><a href="/camtic/member/step.do">채용절차</a></li>
      </ul>
    </li>
    <li style="display: none" class="member_view"><a href="/camtic/member/view.do">게시판</a></li>

    <li class="news news_notice"><a href="/camtic/news/commonBoard.do?categoryKey=notice">공지사항</a></li>
    <li class="news news_business"><a href="/camtic/news/commonBoard.do?categoryKey=business">사업공고</a></li>
    <li class="news news_study"><a href="/camtic/news/commonBoard.do?categoryKey=study">교육/행사</a></li>
    <li class="news news_partner"><a href="/camtic/news/commonBoard.do?categoryKey=partner">유관기관소식</a></li>
    <li style="display: none" class="news_view"><a href="/camtic/news/view.do">게시판</a></li>

    <li class="pr pr_photo"><a href="/camtic/pr/photo.do">포토뉴스</a></li>
    <li class="pr pr_report"><a href="/camtic/pr/report.do">보도자료</a></li>
    <li class="pr pr_news"><a href="/camtic/pr/news.do">뉴스레터</a></li>
    <li class="pr pr_video"><a href="/camtic/pr/video.do">홍보영상</a></li>
    <li class="pr pr_ci"><a href="/camtic/pr/ci.do">CI 소개</a></li>
    <li class="pr pr_sns"><a href="/camtic/pr/sns.do">SNS</a></li>
    <li style="display: none" class="pr pr_view"><a href="/camtic/pr/view.do">게시판</a></li>
  </ul>
</div>

<script>
  $("."+middleCategory+"_"+smallCategory).addClass('active');
  $("#lnb .lnb > li").not("."+middleCategory).hide();
  $("#lnb h2").text($("#header .gnb > ."+middleCategory+" span").text());


  $(function () {
    const categoryInb = $("#category").val();

    if(categoryInb != ""){
      if(categoryInb == "notice" || categoryInb == "business" || categoryInb == "study" || categoryInb == "partner"){
        $(".news"+"_"+categoryInb).addClass('active');

      }else{
        $(".pr"+"_"+categoryInb).addClass('active');
      }
    }
    /*else{
      const boardPathName = $(location).attr('search');
      const boardGub = boardPathName.split("=")[1];
      $(".news"+"_"+boardGub).addClass('active');
    }*/
  });
</script>