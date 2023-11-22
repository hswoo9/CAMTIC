<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<style>
  .__loc .add{margin-top:0px;display: flex; flex-direction: column; align-items: flex-start;}
  .__loc .add .box{margin-top: 20px; border-right: none;}
</style>
</head>

<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/headENG.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnbENG.jsp" flush="false"/>
      <div id="content">
        <ul id="navigation">
          <li><a href="/camtic/about/greetingENG.do"><img src="/images/camtic/home_1.png" class="homeImage">HOME</a></li>
          <li class="mdCategory">Contect</li>
          <li class="smCategory" style="display: none;">Contect</li>
        </ul>
        <div id="title">
          <h3>Contect</h3>
        </div>

        <div class="__busi m0" style="padding: 0px 52px">
         <%-- <div class="__tit1 __mt0" style="display: flex;">
            <h4 style="font-size: 45px; font-weight: bold; color: #000;"><strong>Contect</strong></h4>
          </div>--%>
        </div>

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
                  <dt>Adress</dt>
                  <dd style="font-size: 24px;">#67, Yusang-ro, Dukjin-gu, Jeonju, Jeollabuk-do. 54852, Republic of Korea</dd>
                </dl>
              </div>
              <div class="box">
                <dl>
                  <dt>Tel</dt>
                  <dd>063-219-0300</dd>
                </dl>
              </div>
              <div class="box">
                <dl>
                  <dt>Fax</dt>
                  <dd>063-219-0303</dd>
                </dl>
              </div>
              <div class="box">
                <dl>
                  <dt>E-mail</dt>
                  <dd>camtic@camtic.or.kr</dd>
                </dl>
              </div>
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