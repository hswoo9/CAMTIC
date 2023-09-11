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
            <dt style="text-align: center"><span class="__nm" style="color:#155996 !important;">“</span><span class="mainCapyTitle" style="color:#155996 !important;">함께 성장하는 행복한 일터</span><span class="__nm" style="color:#155996 !important;">”</span></dt>
            <%--<dd style="text-align: center"><span class="subCapyTitle">캠틱종합기술원 홈페이지 방문을 진심으로 환영합니다.</span></dd>--%>
            <%--<div class="img" style="position:relative; margin: 80px 0 65px; max-width: 994px;">
              <i style="display: block; height: 217px; background: url(/images/camtic/bg-greeting.jpg) no-repeat 50% 50% / cover; border-radius: 10px; position: relative;"></i>
              &lt;%&ndash;원장님 이미지 변경&ndash;%&gt;
              <img src="/images/camtic/img-greeting1.png" alt="원장 노상흡" style="display: block; position: absolute; right: 76px; bottom: 0px;">
              <dl style="text-align: right; position: absolute; top: 100px; right: 305px;">
                <dt style="color: #fff; font-size: 20px; letter-spacing: -0.045em; font-family: 'Nanum Myeongjo',serif;">꿈과 미래, 캠틱이 함께 합니다</dt>
                <dd style="color: #fff; margin-top: 10px; display: flex; align-items: center; justify-content: flex-end;">
                  <span style="display: block; font-size: 16px;">원장</span>
                  <strong style="display:block; font-size: 10px; position: relative; padding-left: 10px; margin-left: 5px;">|</strong>
                  <strong style="display:block; font-size: 24px; position: relative; padding-left: 5px; margin-left: 9px; font-weight: 500;">노 상 흡</strong>
                </dd>
              </dl>
            </div>--%>
            <%--<dt>꿈과 미래, 캠틱이 함께 합니다</dt>--%>
            <%--<dt style="color: #155996; font-size:45px;">함께 성장하는 행복한 일터</dt>
            <dd style="color: #111; font-size:35px;">캠틱종합기술원 홈페이지 방문을 진심으로 환영합니다.</dd>--%>
          </dl>
          <%--<div class="area">
            <div class="txt">
              1999년 12월, 기술혁신을 통한 지역산업 발전을 추구하기 위해 설립된 캠틱종합기술원은 그간 연구개발, 기술지원, 인재양성,
              일자리 창출 등 여러 분야에서 지역기업과 같이 성장해왔습니다. 그리고 쌓아온 다양한 기술과 경험을 바탕으로 스마트매뉴팩처링
              기술, 항공우주,헬스케어, 드론, 자동화, 나노섬유, 복합소재, 산업통상협력개발(ODA) 지원사업 등 신사업을 적극 추진하고 있습니다.
            </div>
            &lt;%&ndash;<div class="img">
              <i></i>
              &lt;%&ndash;원장님 이미지 변경&ndash;%&gt;
              <img src="/images/camtic/img-greeting1.png" alt="원장 노상흡">
              <dl>
                <dt>꿈과 미래, 캠틱이 함께 합니다</dt>
                <dd>
                  <span>원장</span>
                  <strong>노 상 흡</strong>
                </dd>
              </dl>
            </div>&ndash;%&gt;
            <div class="txt">
              그리고 전주첨단벤처단지 내에 조성된 전주혁신창업허브 창업동과 건립 예정인 성장동을 통해 지역기업의 창업성장과 기업육성을 지원할 수 있는 제조혁신의 기틀을 마련하였습니다.<br>
              <br>
              앞으로도 우리 캠틱종합기술원은 지역기업의 시작과 성장의 동반자가 되겠습니다.<br>
              <br>
              감사합니다.
            </div>
            <div class="sign" style="margin-top: 30px; text-align: right; font-size: 20px; color: #0d0d0d;">
              <strong style="margin-right: 5px;">원장</strong>
              <strong>노 상 흡</strong>
            </div>
          </div>--%>
          <div class="mainAbou">
            <div class="lef" style=" width: 600px;">
              <div class="area">
                <div class="txt">
                  <img src="/images/camtic/greetingTest2.png" class="is-m1" style="max-width: 100%; width: auto; border-radius: 70px 0px 0px 0px;" alt="원장 노상흡">
                  캠틱종합기술원 홈페이지 방문을 진심으로 환영합니다.
                  <br><br>
                  1999년 12월, 기술혁신을 통한 지역산업 발전을 위하여 설립된 캠틱종합기술원은 연구개발, 기술지원, 인재양성,
                  일자리 창출 등 여러 분야에서 고객과 함께 성장해왔습니다.
                  <br><br>
                  1999년 12월부터 시작된 여정에서 캠틱종합기술원은 연구개발, 기술지원, 인재양성, 그리고 일자리 창출 등 다양한 영역에서 국내외 고객과 협력하며 지속적으로 성장해 왔습니다.
                  <br><br>
                  현재까지 축적된 전문성과 노하우를 바탕으로, 드론모빌리티에서부터 탄소복합소재, 바이오헬스케어, 스마트제조로봇, 그리고 우주항공까지, 다양한 신기술과 신산업 분야에서 혁신적인 도약을 위한 노력을 지속하고 있습니다.
                  <br><br>
                </div>
                <%--<div class="img">
                  <i></i>
                  &lt;%&ndash;원장님 이미지 변경&ndash;%&gt;
                  <img src="/images/camtic/img-greeting1.png" alt="원장 노상흡">
                  <dl>
                    <dt>꿈과 미래, 캠틱이 함께 합니다</dt>
                    <dd>
                      <span>원장</span>
                      <strong>노 상 흡</strong>
                    </dd>
                  </dl>
                </div>--%>
                <div class="txt">
                  또한, 2002년에 조성된 전주첨단벤처단지 내에 위치한 전주혁신창업허브와 2024년 8월에 준공을 앞둔 성장동을 통해, 첨단 및 디지털 산업을 진행할 수 있는 창의적인 플랫폼인 “J-Valley”를 구축하고 확장해 나가고 있습니다.<br>
                  <br>
                  앞으로도 캠틱종합기술원은 여러분과 늘 함께하며, 서로의 성장과 발전을 위해 미래를 함께 만들어가는 동반자가 되겠습니다.<br>
                  <br>
                  감사합니다.
                </div>
                <div class="sign" style="margin-top: 30px; text-align: right; font-size: 20px; color: #0d0d0d;">
                  <strong style="margin-right: 5px;">원장</strong>
                  <strong>노 상 흡</strong>
                </div>
              </div>
            </div>
            <div class="rig" style="width: 400px; padding-top: 50px;">
              <%--<img src="/images/camtic/img-greeting1.png" style="max-width: 100%; width: auto;" alt="원장 노상흡">--%>
              <img src="/images/camtic/greetingTest2.png" class="is-m" style="max-width: 118%; width: auto; border-radius: 70px 0px 0px 0px; height: 800px;" alt="원장 노상흡">
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