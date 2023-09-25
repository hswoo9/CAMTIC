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

        <div class="__busi m0">
          <%--<dl class="head">
            <dt>캠틱종합기술원</dt>
            <dd>
              다양한 기술과 경험을 바탕으로<br>
              <strong><u>스마트매뉴팩처링 기술, 항공우주,헬스케어, 드론, 자동화, 나노섬유, 복합소재, 산업통상협력개발(ODA) 지원사업</u></strong> 등<br>
              신사업을 적극 추진하고 있습니다.
            </dd>
          </dl>--%>
              <dl class="head">
                <dt><span class="__nm">“</span><span class="mainCapyTitle">지역전략산업 및 기업의 혁신/성장을 위한 시설, 공간, 장비 등</span><span class="__nm">”</span></dt>
                <dd><span class="subCapyTitle">인프라를 기반으로 중소·벤처기업의 성장 지원</span></dd>
              </dl>
            <%--<img src="/images/camtic/img-busi.jpg" alt="다음 내용 참조">--%>
            <h3><strong></strong></h3>
            <div class="hide">
              <ul>
                <li>
                  <h4>01</h4>
                  <dl>
                    <dt>기업성장지원 분야</dt>
                    <dd>BUSINESS GROWTH SUPPORT</dd>
                  </dl>
                  <ul>
                    <li>- 지역산업육성</li>
                    <li>- 국제개발협력(ODA)</li>
                    <li>- 인재개발/인재양성</li>
                    <li>- 일자리·창업지원</li>
                  </ul>
                </li>
                <li>
                  <h4>02</h4>
                  <dl>
                    <dt>R&BD 분야</dt>
                    <dd>Research & Business Development</dd>
                  </dl>
                  <ul>
                    <li>- 스마트팩토리 / 로봇</li>
                    <li>- 스마트헬스케어 / 스마트팜</li>
                    <li>- 탄소 복합재 개발</li>
                  </ul>
                </li>
                <li>
                  <h4>03</h4>
                  <dl>
                    <dt>사업부 분야</dt>
                    <dd>Business for Commercialization</dd>
                  </dl>
                  <ul>
                    <li>- 항공우주</li>
                    <li>- 드론사업</li>
                    <li>- 스마트제조</li>
                  </ul>
                </li>
              </ul>
            </div>
        </div>


        <div class="__tit1 __mt0">
          <h3><strong>R&BD</strong> 분야</h3>
        </div>
        <div class="__vision50">
          <img src="/images/camtic/img-busi_01.jpg" alt="">
        </div>

        <div class="__tit1 __mt50">
          <h3><strong>기업성장지원</strong> 분야</h3>
        </div>
        <div class="__vision50">
          <img src="/images/camtic/img-busi_02.jpg" alt="">
        </div>


        <div class="__tit1 __mt50">
          <h3><strong>사업부</strong> 분야</h3>
        </div>
        <div class="__vision50">
          <img src="/images/camtic/img-busi_03.jpg" alt="">
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>