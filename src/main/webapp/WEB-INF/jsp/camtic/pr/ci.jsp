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

        <div class="__ci1 m0">
          <div class="one">
            <div class="lef">
              캠틱종합기술원’을<br class="__p">
              상징하는 <strong>이니셜 ‘C’를 <br class="__p">
              시각화한 심볼</strong>이다.
            </div>
            <div class="rig">
              <img src="/images/camtic/img-ci.jpg" alt="">
            </div>
          </div>
          <div class="two">
            이니셜 C와 융합하는 이미지는 기술의 집약과 자연과의 융합·상생이라는 캠틱 정신을 상징적으로 보여 주며, 이러한 키워드를 통한 변화와 다양성을 캠틱의<br>
            본질로 설명하고 캠틱의 무한한 가능성을 보여 주고자 한다. 대표색상인 다크블루는 기술의 미래 도약, 스카이블루는 인력 성장, 그린은 자연과의 융화를 상징한다.
          </div>
          <div class="__mt40 tar">
            <a href="/downloadFile/GuideLogoCAMTIC.pdf" download="GuideLogoCAMTIC.pdf" class="__btn1 blue"><span>가이드라인 다운로드</span></a>
            <a href="/downloadFile/GuideLogoCAMTIC.zip" download="GuideLogoCAMTIC.zip" class="__btn1 grayLine"><span>로고 다운로드</span></a>
          </div>
        </div>

        <div class="__tit1 __mt80 __mb15">
          <h3><strong>Keyword</strong></h3>
        </div>
        <div class="__ci2">
          <ul>
            <li><strong>Courage 용기 :</strong> 가지 않은 길을 나아가고자 하는 용기를 상징</li>
            <li><strong>Convergence 융합 :</strong> 융합을 통해 캠틱이 제시하는 기술의 미래를 표현</li>
            <li><strong>Co-work 협업 :</strong> 협력과 소통은 캠틱의 가장 큰 자산이자 가치이며, 내부 직원의 결집 및 외부 고객과의 협력을 나타냄</li>
            <li><strong>Change 변화 :</strong> 능동적으로 변화를 주도하고자 하는 캠틱의 정신을 상징</li>
            <li><strong>Challenge 도전 :</strong> 새로운 일에 대한 도전정신과 의지는 캠틱이 지금까지 추구해왔던 길이며, 앞으로도 지속적으로 도전하고자 함</li>
            <li><strong>Creativity 창의 :</strong> 어떠한 일을 할 때 기존의 것을 뛰어넘는 창의성을 추구</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>