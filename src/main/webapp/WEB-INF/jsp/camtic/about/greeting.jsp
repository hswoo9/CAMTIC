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

        <div class="__greeting">
          <dl class="head">
            <dt>꿈과 미래, 캠틱이 함께 합니다</dt>
            <dd>캠틱종합기술원 홈페이지 방문을 진심으로 환영합니다.</dd>
          </dl>
          <div class="area">
            <div class="txt">
              1999년 12월, 기술혁신을 통한 지역산업 발전을 추구하기 위해 설립된 캠틱종합기술원은 22년 동안 연구개발, 기술지원, 인재양성,
              일자리 창출 등 여러 분야에서 지역기업과 같이 성장해왔습니다. 그리고 쌓아온 다양한 기술과 경험을 바탕으로 스마트매뉴팩처링
              기술, 항공우주,헬스케어, 드론, 자동화, 나노섬유, 복합소재, 산업통상협력개발(ODA) 지원사업 등 신사업을 적극 추진하고 있습니다.
            </div>
            <div class="img">
              <i></i>
              <img src="/images/camtic/img-greeting.png" alt="원장 노상흡">
              <dl>
                <dt>꿈과 미래, 캠틱이 함께 합니다</dt>
                <dd>
                  <span>원장</span>
                  <strong>노 상 흡</strong>
                </dd>
              </dl>
            </div>
            <div class="txt">
              그리고 전주첨단벤처단지 내에 조성된 전주혁신창업허브 창업동과 건립 예정인 성장동을 통해 지역기업의 창업성장과 기업육성을 지원할 수 있는 제조혁신의 기틀을 마련하였습니다.<br>
              <br>
              앞으로도 우리 캠틱종합기술원은 지역기업의 시작과 성장의 동반자가 되겠습니다.<br>
              <br>
              감사합니다.
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