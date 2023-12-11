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

        <div class="__clu1 mo">
          <dl class="tit">
            <dt><span class="__nm">“</span><span class="mainCapyTitle">탄소 복합재 활용 공정기술 연구 및 개발 추진</span><span class="__nm">”</span></dt>
            <dd><span class="subCapyTitle">기업 연계 협력, 차세대 핵심 공정기술 개발</span></dd>
          </dl>
        </div>

        <div class="__root3 m0">
          <div class="__tit1 __mt70 __mb20">
            <h3 style="border-bottom: 1px dashed #b7b7b7; padding-bottom:30px;"><strong>기술개발</strong></h3>
          </div>

          <div class="__icoBox pt0 __mt50">
            <%--<div class="ico"><span><img src="/images/camtic/ico-bio1-1.png" alt=""></span></div>--%>
            <h5 style="font-size: 20px; color: #666;">탄소섬유 테이프 자동적층 장치 개발(ATL)</h5>
            <ul class="__dotList bar __fz18 __black">
              <li>탄소섬유 테이프를 평편상에 다양한 각도로 다층 적층하기 위한 생산시스템 개발</li>
              <li>테이프 공급헤드개발을 통해 로봇에 적용 시 자유 곡면 형상 성형 가능
            </ul>
          </div>
          <ul class="__flximg __mt30" style="width:800px; height: 223px; margin: 0 auto;">
            <li><img src="/images/camtic/img-ncarbon1-1.jpg" alt=""><div class="__mt10">탄소섬유 테이프 자동 적층 장치</div></li>
            <li><img src="/images/camtic/img-ncarbon1-2.jpg" alt=""><div class="__mt10">탄소섬유 테이프 자동 적층 사례</div></li>
          </ul>

          <div class="__icoBox pt0 __mt100">
            <%--<div class="ico"><span><img src="/images/camtic/ico-bio1-1.png" alt=""></span></div>--%>
            <h5 style="font-size: 20px; color: #666;">탄소 복합재 고속 가열 및 Consolidation 시스템 개발</h5>
            <ul class="__dotList bar __fz18 __black">
              <li>NIR(근적외선 히터)를 이용하여 열가소성 및 열경화성 탄소섬유 프리프레그의 고속 가열하여 제품의 성형 및 고속경화하는 기술 연구</li>
            </ul>
          </div>
          <ul class="__flximg __mt30" style="width:800px; height: 223px; margin: 0 auto;">
            <li><img src="/images/camtic/img-ncarbon1-3.jpg" alt=""><div class="__mt10">CCFRTP 고속 가열 시스템</div></li>
            <li><img src="/images/camtic/img-ncarbon1-4.jpg" alt=""><div class="__mt10">CCFRTP 적층 Consolidation 사례</div></li>
          </ul>
        </div>

        <div class="__root3 __mb100">
          <div class="__tit1 __mt100 __mb20">
            <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>기업지원</strong></h3>
          </div>
          <div class="__icoBox pt0 __mt50">
            <h5 style="font-size: 19px; color: #666;">탄소 복합재를 활용하는 공정기술과 탄소 복합재 제조업의 미래 성장 발전에 핵심적인 기업과의 연계 협력</h5>
            <ul class="__dotList bar __fz18 __black">
              <li>고강도 초경량 복합재 및 응용 부품 개발</li>
              <li>성형, 가공, 설계, 해석에 이르는 토탈 솔루션 제공</li>
              <li>기업과 연구소 공동으로 시제품 개발을 수행, 사업화 아이템 발굴 및 신기술 개발</li>
            </ul>
          </div>
          <ul class="__flximg __mt30" style="width:800px; height: 223px; margin: 0 auto;">
            <%--<li><img src="/images/camtic/img-ncarbon1-5.jpg" alt=""></li>--%>
            <li><img src="/images/camtic/img-ncarbon1-5.jpg" alt=""><div class="__fz15 __black __mt10" style="text-align: center;">쿼터 필라 Reinf 탄소복합소재 개발</div></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>