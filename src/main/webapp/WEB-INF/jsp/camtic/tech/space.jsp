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

        <div class="__drone3 m0">
          <div class="head">
            <%--<h4>우주·항공·방산의 고도화 및 글로벌 경쟁력 강화</h4>--%>
            <dl>
              <dl class="head">
                <dt><span class="__nm">“</span><span class="mainCapyTitle">창의적인 기술력으로 신개념의 기술개발</span><span class="__nm">”</span></dt>
                <dd><span class="subCapyTitle">우주/항공/방산/에너지 분야의 다양한 개발 경험과 노하우를 바탕으로 한 최고의 기술력</span></dd>
              </dl>
              <%--<dt><span class="__nm">“</span><span class="m">AS9100 rev:D 인증보유 (ISO:9001)</span><span class="__nm">”</span></dt>
              <dd>항공우주산업(KAI), 한화시스템 협력업체 등록.</dd>--%>
            </dl>
          </div>

          <div class="__icoBox">
            <ul class="img" style="display:flex !important;">
              <li><img src="/images/camtic/img-air2-1.jpg" alt=""></li>
              <li><img src="/images/camtic/img-air2-20.jpg" alt=""></li>
              <li><img src="/images/camtic/img-air2-2.jpg" alt=""></li>
            </ul>
          </div>




        <!--<div class="__tit1 __mt100 __mb20">
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
        </div>-->

        <div class="__tit1 __mt50 __mb20">
          <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>우주산업</strong></h3>
        </div>
        <div class="__bio3">

          <div class="__icoBox">
            <%--<div class="ico"><span><img src="/images/camtic/ico-space2-2.png" alt=""></span></div>--%>
            <h5 style="font-size:20px; color: #666;">지상지원장비(MGSE - Mechanical Ground Support Equipment)</h5>
            <div class="__fz18 __black __mt0">
              인공위성, 안테나등 우주산업에 필요한 조립/시험 장비의 설계/해석/제작/시험
            </div>
            <div class="__fz18 __black __mt5 fws">
              -  Lifting Device : 부품/위성체 이동 및 현수를 위한 장비<br>
              -  Adapter : 타 장비와 조립/호환성 확보<br>
              -  Platform : 부품/위성체 거치 및 이동 장비<br>
              -  Dolly : 패널/태양전지 패널 회전용 장비<br>
              -  MPT(Multi-Purpose Trolley) : 위성체 수직/수평/회전등 방향 전환 장비<br>
              -  Zero G Device : 역중력 보상 장비. 무중력 환경 모사<br>
              -  Shipping Container : 위성/부품 운송용 컨테이너(진동저감, 항온항습)<br>
              -  기타 Bracket, Support 등
            </div>
          </div>

          <div class="area __mt60">
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new01.png" alt=""></div><div class="txt">리프팅 디바이스</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new02.png" alt=""></div><div class="txt">운송 컨테이너</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new03.png" alt=""></div><div class="txt">운송 컨테이너</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new04.png" alt=""></div><div class="txt">운송 컨테이너</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new05.png" alt=""></div><div class="txt">운송 컨테이너 시험(하중, 충격, 접지 저항 등)</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new06.png" alt=""></div><div class="txt">컨테이너</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new07.png" alt=""></div><div class="txt">안테나 조립 치구</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new08.png" alt=""></div><div class="txt">달탐사선 운송 컨테이너</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new09.png" alt=""></div><div class="txt">추진체 시험 장비-짐벌마운트</div></div>
          </div>


          <div class="__icoBox __mt60">
            <%--<div class="ico"><span><img src="/images/camtic/ico-air1-1.png" alt=""></span></div>--%>
            <h5 style="font-size:20px; color: #666;">참여사업</h5>
            <ul class="__dotList bar __fz18 __black fwm">
              <li>KOMPSAT-3(아리랑 3호), KOMPSAT-5(아리랑 5호), COMS-1(천리안 1호), </li>
              <li>CAS500(차세대 중형위성1,2단계), KPLO(다누리), EOIR, K7, 425.달착륙선 랜딩기어, 큐브위성. 스페이스 챌린지(접이식 안테나 개발)</li>
            </ul>
          </div>
        </div>

        <div class="__tit1 __mt50 __mb20">
          <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>항공산업</strong></h3>
        </div>
        <div class="__bio3">

          <div class="__icoBox">
            <%--<div class="ico"><span><img src="/images/camtic/ico-space2-2.png" alt=""></span></div>--%>

            <div class="__fz18 __black __mt0">
              인공위성, 안테나등 우주산업에 필요한 조립/시험 장비의 설계/해석/제작/시험
            </div>
            <div class="__fz18 __black __mt5 fws">
              -  Wing 조립치구<br>
              -  풍동시험용 축소 모형 제작<br>
              -  무인기 모니터링 시스템
            </div>
            <div class="__fz18 __black __mt40">
              항공기 부품 내구성 시험장비 제작
            </div>
            <div class="__fz18 __black __mt5 fws">
              -  항공기 부품 내구성 시험장비 제작<br>
              -  피로시험 치구<br>
              -  DAS(Data Aquisition System)
            </div>
          </div>

          <div class="area __mt60">
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new10.png" alt=""></div><div class="txt">시뮬레이터 부품 제작</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new11.png" alt=""></div><div class="txt">질량특성 측정 시험 치구</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new12.png" alt=""></div><div class="txt">시뮬레이터 부품 제작</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new13.png" alt=""></div><div class="txt">질량특성 측정 시험 치구</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new14.png" alt=""></div><div class="txt">시험 설비 이전 1</div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new15.png" alt=""></div><div class="txt">시험 설비 이전 1E</div></div>
          </div>


          <div class="__icoBox __mt60">
            <%--<div class="ico"><span><img src="/images/camtic/ico-air1-1.png" alt=""></span></div>--%>
            <h5 style="font-size:20px; color: #666;">참여사업</h5>
            <ul class="__dotList bar __fz18 __black fwm">
              <li>KUH(수리온), 스마트 무인기 개발, 복합재 팬블레이드 시험 장치 개발. 100lbf급 엔진 개발.</li>
            </ul>
          </div>
        </div>

        <div class="__tit1 __mt50 __mb20">
          <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>방산</strong></h3>
        </div>
        <div class="__bio3">

          <div class="__icoBox">
            <%--<div class="ico"><span><img src="/images/camtic/ico-space2-2.png" alt=""></span></div>--%>

            <div class="__fz18 __black __mt0">
              추진(연소)기관 관련 System 시험 Rig 제작 및 시험용역
            </div>
            <div class="__fz18 __black __mt5 fws">
              -  초소형 터보제트엔진 연소기 시험 Rig<br>
              -  편향노즐 추력 측정시스템<br>
              -  Oil Cooler Ejector 시험 Rig<br>
              -  소형 냉각기계 시험 Rig<br>
              -  엔진 제어장치<br>
              -  DAS(Data Aquisition System)
            </div>
          </div>

          <div class="area __mt60">
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new17.png" alt=""></div><div class="txt"></div></div>
            <div class="box"><div class="img"><img src="/images/camtic/img-sp_new18.png" alt=""></div><div class="txt"></div></div>
          </div>


          <div class="__icoBox __mt60">
            <%--<div class="ico"><span><img src="/images/camtic/ico-air1-1.png" alt=""></span></div>--%>
            <h5 style="font-size:20px; color: #666;">참여사업</h5>
            <ul class="__dotList bar __fz18 __black fwm">
              <li>군용 지상훈련장비(Simulator) 개발, KO-1, UH-60(조종석), 6축 모션(Payload 4톤</li>
            </ul>
          </div>
        </div>


          <div class="__tit1 __mt50 __mb20">
            <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>에너지, 환경</strong></h3>
          </div>
          <div class="__bio3">

            <div class="__icoBox">
              <%--<div class="ico"><span><img src="/images/camtic/ico-space2-2.png" alt=""></span></div>--%>

              <div class="__fz18 __black __mt0">
                신재생/그린 에너지 기술 개발을 위한 시험 장치 제작
              </div>
              <div class="__fz18 __black __mt5 fws">
                -  시험설비 및 조립/측정 장비 개발<br>
                -  연소기 제작 및 시험 Rig<br>
                -  Battery Management System HILS Simulator<br>
                -  태양전지 Cell 조립/검사 장비
              </div>
            </div>

            <div class="area __mt60">
        <%--      <div class="box"><div class="img"><img src="/images/camtic/img-sp_new17.png" alt=""></div><div class="txt"></div></div>
              <div class="box"><div class="img"><img src="/images/camtic/img-sp_new18.png" alt=""></div><div class="txt"></div></div>--%>
            </div>


            <div class="__icoBox __mt60">
              <%--<div class="ico"><span><img src="/images/camtic/ico-air1-1.png" alt=""></span></div>--%>
              <h5 style="font-size:20px; color: #666;">참여사업</h5>
              <ul class="__dotList bar __fz18 __black fwm">
                <li>전북대학교 풍동시험 설비 이전, 도로안개 제거 시스템 시험 설비 제장 및 설치</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
    <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</body>
</html>