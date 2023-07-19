<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>

<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>

        <div class="__vidWrap">
          <div class="__vid __mb60">
            <div id="player"></div>
          </div>
        </div>
        <script src="https://www.youtube.com/iframe_api"></script>
        <script>
          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
              videoId: 'tBQ9ewstL9E', //유튭 영상ID
              playerVars: {
                'autoplay': 1, //자동재생
                'rel': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'playsinline': 1,
                'rel': 0,
                'controls': 1,	//youtube 콘트롤 표시
                'color':'white',
                'loop': 1, //반복 여부
              },
              events: {
                'onReady': onPlayerReady,
              }
            });
          }

          function onPlayerReady(event) {
            player.mute();
            player.playVideo();
          }

        </script>

        <div class="__galList">
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/398x242/f3f3f3);"></i></div>
            <div class="info">
              <p class="subject">[23/02/08] 전주기술창업성장지원센터 건립 착공 전주기술창업성장지원센터 건립 착공</p>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/398x242/f3f3f3);"></i></div>
            <div class="info">
              <p class="subject">[23/02/08] 전주기술창업성장지원센터 건립 착공 전주기술창업성장지원센터 건립 착공</p>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/398x242/f3f3f3);"></i></div>
            <div class="info">
              <p class="subject">[23/02/08] 전주기술창업성장지원센터 건립 착공 전주기술창업성장지원센터 건립 착공</p>
            </div>
          </a>
          <a href="./view.do" class="box">
            <div class="img"><i style="background-image:url(https://fakeimg.pl/398x242/f3f3f3);"></i></div>
            <div class="info">
              <p class="subject">[23/02/08] 전주기술창업성장지원센터 건립 착공 전주기술창업성장지원센터 건립 착공</p>
            </div>
          </a>
        </div>

        <div class="__botArea">
          <div class="cen">
            <div class="__paging">
              <a href="#" class="arr prev"><span class="hide">이전 페이지</span></i></a>
              <strong class="num active">1</strong>
              <a href="#" class="num">2</a>
              <a href="#" class="num">3</a>
              <a href="#" class="arr next"><span class="hide">다음 페이지</span></i></a>
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