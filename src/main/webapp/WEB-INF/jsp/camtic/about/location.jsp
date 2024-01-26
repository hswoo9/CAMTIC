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

        <div class="__loc">
          <div class="inner">
            <div class="loc">
              <div id="daumRoughmapContainer1681192098538" class="root_daum_roughmap root_daum_roughmap_landing"></div>
              <script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
              <script charset="UTF-8">
                new daum.roughmap.Lander({
                  "timestamp" : "1681192098538",
                  "key" : "2eec3",
                  "mapWidth" : "640",
                  "mapHeight" : "360"
                }).render();
              </script>
            </div>
            <div class="add">
              <div class="box">
                <dl>
                  <dt>주소</dt>
                  <dd>(54852) 전북특별자치도 전주시 덕진구 유상로 67 전주첨단벤처단지</dd>
                </dl>
              </div>
              <div class="box">
                <dl>
                  <dt>전화</dt>
                  <dd>063-219-0300</dd>
                </dl>
              </div>
              <div class="box">
                <dl>
                  <dt>팩스</dt>
                  <dd>063-219-0303</dd>
                </dl>
              </div>
            </div>

            <div class="__tit2 __mt100">
              <h3><strong>오시는 길</strong></h3>
            </div>
            <div class="tbl">
              <dl class="box">
                <dt>네비게이션</dt>
                <dd>
                  명칭 검색 : 전주첨단벤처단지 입력
                </dd>
              </dl>
              <dl class="box">
                <dt>규모</dt>
                <dd>
                  전주IC (도청, 군산방향) → 팔달로(시청, 완주군 방향) → 호남제일문 통과 → 전주첨단벤처 단지,
                  전북테크노파크 방향으로 우회전 → 로터리에서 동아제약 끼고 우회전 (한국산업인력 공단,
                  전주첨단벤처단지 방향) → 전주첨단벤처단지 내 캠틱종합기술원 위치
                </dd>
              </dl>
              <dl class="box">
                <dt>기차</dt>
                <dd>
                  <strong>전주역 하차 후 택시 또는 버스 이용</strong>
                  <dl>
                    <dt>택시 :</dt>
                    <dd> 팔복동 전주첨단벤처단지 또는 산업인력공단 방향으로 운행 요청(20~30분 소요)</dd>
                  </dl>
                  <dl>
                    <dt>버스 :</dt>
                    <dd>337번 버스 탑승 → 도시첨단산업단지 하차(40분 소요) → 도보이동 (10분 소요)</dd>
                  </dl>
                </dd>
              </dl>
              <dl class="box">
                <dt>고속버스</dt>
                <dd>
                  <strong>터미널 하차 후 택시 또는 버스 이용</strong>
                  <dl>
                    <dt>택시 :</dt>
                    <dd>팔복동 전주첨단벤처단지 또는 산업인력공단 방향으로 운행 요청(20~30분 소요)</dd>
                  </dl>

                  <dl>
                    <dt>버스 :</dt>
                    <dd>
                      (10분 소요)<br>
                      전북일보 빌딩 버스정류장으로 이동 → 버스 탑승<br>
                      <em>(1, 69, 70. 310, 315, 373, 374, 375, 378, 380, 383, 385, 411, 413, 414, 416, 423, 424, 428, 429, 470, 472, 474, 475, 479, 486, 487)</em><br>
                      → 도시첨단산업단지 하차(30분 소요) → 도보이동
                    </dd>
                  </dl>

                </dd>
              </dl>
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