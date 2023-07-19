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

        <div class="__air1 mo">

          <div class="__icoBox">
            <div class="ico"><span><img src="/images/camtic/ico-air1-1.png" alt=""></span></div>
            <h5>특화기술</h5>
            <ul class="__dotList bar __fz16 __black fwm">
              <li>위성 지원장비(GSE) 개발 : KOM PSAT-3, KOMPSAT-5, COMS-1, GK-2, CAS500, KPLO, KOMPSAT-7</li>
              <li>위성부품연구 : 달 착륙선 랜딩기어 모델, 동가식 S/P 전개장치, RWA 진동저강장치, S/P&광구조체 지지구조물 해석</li>
              <li>큐브/마이크로 위성 플랫폼 전개장치</li>
              <li>발사체 엔진부품 시험장비 : Gimbul Mount Test</li>
              <li>DAS, LabView, 제어 System, CAE 등</li>
            </ul>
          </div>
          <div class="__icoBox">
            <div class="ico"><span><img src="/images/camtic/ico-air1-2.png" alt=""></span></div>
            <h5>인력현황</h5>
            <div class="__fz16 __black fwm">
              헬스케어 융합연구 및 메카트로닉스 시스템 개발 담당 등 8명
            </div>
            <ul class="img">
              <li><img src="/images/camtic/img-air2-1.jpg" alt=""></li>
              <li><img src="/images/camtic/img-air2-2.jpg" alt=""></li>
            </ul>
          </div>

        </div>

        <div class="__tit1 __mt100 __mb20">
          <h3><strong>주요고객</strong></h3>
          <div class="rig __fz16 __black">* 항공, 우주, 에너지 연구개발 기업 등</div>
        </div>
        <div class="__bio2">
          <ul class="__logos">
            <li><img src="/images/camtic/img-air3-1.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-2.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-3.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-4.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-5.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-6.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-7.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-8.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-9.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-10.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-11.jpg" alt=""></li>
            <li><img src="/images/camtic/img-air3-12.jpg" alt=""></li>
          </ul>
        </div>

        <div class="__tit1 __mt100 __mb20">
          <h3><strong>개발사례</strong></h3>
        </div>
        <div class="__bio3">
          <div class="area">
            <div class="box"><div class="img"><img src="/images/camtic/img-air4-1.jpg" alt=""></div><div class="txt">한화에어로스페이스 복합재 팬 블레이드 내구 시험장치</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-air4-2.jpg" alt=""></div><div class="txt">한화에어로스페이스 KSLV-2 짐벌마운트 시험장치</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-air4-3.jpg" alt=""></div><div class="txt">국방과학연구소 엔진 연소시험설비</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-air4-4.jpg" alt=""></div><div class="txt">국방과학연구소 엔진 연소시험리그</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-air4-5.jpg" alt=""></div><div class="txt">한국항공우주연구원 정지궤도용 접이식 광 구조체</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-air4-6.jpg" alt=""></div><div class="txt">한국항공우주연구원 위성 MGSE</div></div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>