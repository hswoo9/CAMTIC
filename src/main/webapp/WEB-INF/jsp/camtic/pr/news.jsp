<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  .__newsListhead{display: flex; flex-wrap: wrap; gap: 55px 26px;}
  .__newsListhead .newboxHead{display: block; width: calc((100% / 3) - (52px / 3));}
  .__newsListhead .newboxHead .info{margin-top: 35px;}
  .__newsListhead .newboxHead .info .subject{font-size: 22px; line-height: 1.35; height: 2.7em; display: -webkit-box;
    word-wrap: break-word; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;
    color: #252525; font-weight: 500; letter-spacing: -0.05em;}
  .__newsListhead .newboxHead .logoimg{height:150px;border: 1px solid #ccc;}
  .__newsListhead .newboxHead .img{border: 1px solid #ccc;}
  .__newsListhead .newboxHead .img i{display: block; padding-top: calc(238 / 408 * 100%); background-repeat: no-repeat;
    background-position: 50% 50%; background-size: cover; background-image: url(https://fakeimg.pl/408x238/f3f3f3);}

  @media (max-width: 1024px) {
    .__newsListhead .newboxHead {width: calc((100% / 2) - (10px / 2));}
    .__newsListhead .newboxHead .info .subject {font-size: 14px; line-height: 1.2; height: 2.4em;}
    .__newsListhead {gap: 25px 10px;}
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

        <div class="__newsListhead">
          <div class="newboxHead">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/408x238/f3f3f3);"></i></div>
          </div>
          <div class="newboxHead">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/408x238/f3f3f3);"></i></div>
          </div>
          <div class="newboxHead">
            <div class="logoimg"></div>
            <div class="info" style="margin-top:10px;">
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
            </div>
          </div>
        </div>
        <div class="__newsList" style="margin-top:15px;">
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/408x238/f3f3f3);"></i></div>
            <div class="info">
              <p class="cate">부모님을 향한 사랑이야기</p>
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
              <p class="hash">
                <span># G-Parents Day</span>
                <span>#부모님을 향한</span>
                <span>#특별한</span>
                <span>#초청권</span>
              </p>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/408x238/f3f3f3);"></i></div>
            <div class="info">
              <p class="cate">부모님을 향한 사랑이야기</p>
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
              <p class="hash">
                <span># G-Parents Day</span>
                <span>#부모님을 향한</span>
                <span>#특별한</span>
                <span>#초청권</span>
              </p>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/408x238/f3f3f3);"></i></div>
            <div class="info">
              <p class="cate">부모님을 향한 사랑이야기</p>
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
              <p class="hash">
                <span># G-Parents Day</span>
                <span>#부모님을 향한</span>
                <span>#특별한</span>
                <span>#초청권</span>
              </p>
            </div>
          </a>
        </div>

        <div class="__botArea">
          <div class="cen">
            <div class="__paging">
              <a href="#" class="arr first"><i class="axi axi-angle-double-left" aria-hidden="true"><span class="hide">첫 페이지</span></i></a>
              <a href="#" class="arr prev"><i class="axi axi-angle-left" aria-hidden="true"><span class="hide">이전 페이지</span></i></a>
              <strong class="num active">1</strong>
              <a href="#" class="num">2</a>
              <a href="#" class="num">3</a>
              <a href="#" class="arr next"><i class="axi axi-angle-right" aria-hidden="true"><span class="hide">다음 페이지</span></i></a>
              <a href="#" class="arr last"><i class="axi axi-angle-double-right" aria-hidden="true"><span class="hide">마지막 페이지</span></i></a>
            </div>
          </div>
        </div>

        <div class="__botArea __mt20">
          <div class="rig">
            <a href="#" class="__btn1 blue"><span>구독 신청하기</span></a>
            <a href="#" class="__btn1 grayLine"><span>이전 소식지보기</span></a>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>