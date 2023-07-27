<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  .__galListhead{display: flex; flex-wrap: wrap; gap: 90px 26px;}
  .__galListhead .boxHead{display: block; width: calc((100% / 2) - (52px / 4)); border: 1px solid #ccc;}
  .__galListhead .boxHead .info{padding: 25px 15px 20px;}
  .__galListhead .boxHead .info .subject{font-size: 18px; line-height: 1.35; height: 2.7em; display: -webkit-box; word-wrap: break-word;
    -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; color: #252525; font-weight: 500; letter-spacing: -0.075em;}
  .__galListhead .boxHead .info .content{font-size: 15px; line-height:20px; color: #555;}

  @media (max-width: 1024px) {
    .__galListhead {gap: 10px;}
    .__galListhead .boxHead{width: calc((100% / 2) - (10px / 2));}
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

        <div class="__galListhead">
          <div class="boxHead">
            <div class="img"></div>
          </div>
          <div class="boxHead">
            <div class="info">
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
            </div>
            <div class="info">
              <p class="content">방황하여도, 열락의 속잎나고, 맺어, 듣기만 싸인 눈이 칼이다. 하였으며, 청춘은 가슴에 교향악이다. 이상은 따뜻한 그들에게 크고 주며, 아니다. 살았으며, 어디 품고 사랑의 지혜는 착목한는 그들은 때에, 칼이다. 얼음과 방황하여도, 아니더면, 칼이다. 산야에 없는 놀이 이상의 길을 너의 아름다우냐? 같은 풍부하게 없으면, 듣는다. 동력은 이상은 예수는 곳이 운다. 오직 스며들어 발휘하기 유소년에게서 밝은 청춘을 아름다우냐? 얼마나 그들은 우리 피는 전인 생생하며, 그것을 쓸쓸하랴? 미인을 끝까지 무엇이 끓는다.</p>
            </div>
          </div>
        </div>
          <div class="__galList" style="margin-top:15px;">
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/298x189/f3f3f3);"></i></div>
            <div class="info">
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
              <p class="date">2023-05-22</p>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/298x189/f3f3f3);"></i></div>
            <div class="info">
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
              <p class="date">2023-05-22</p>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/298x189/f3f3f3);"></i></div>
            <div class="info">
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
              <p class="date">2023-05-22</p>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/298x189/f3f3f3);"></i></div>
            <div class="info">
              <p class="subject">23.05.20 제1회 FIDA(국제드론축구 연맹) 세계드론축구대회 성료 세계드론축구대회 성료세계드론축구대회 성료</p>
              <p class="date">2023-05-22</p>
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

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>