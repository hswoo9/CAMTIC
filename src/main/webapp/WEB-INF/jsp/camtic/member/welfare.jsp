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

        <div class="__tit1">
          <h3><strong>복리후생</strong></h3>
        </div>
        <div class="__welfare">
          <div class="box">
            <div class="img"><img src="/images/camtic/img-welfare1.jpg" alt=""></div>
            <dl class="info">
              <dt>선택적 복지제도</dt>
              <dd>
                연간 복지포인트 부여,<br class="__p">
                임직원 전용 온라인 복지몰 운영
              </dd>
            </dl>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-welfare2.jpg" alt=""></div>
            <dl class="info">
              <dt>직원 건강관리</dt>
              <dd>
                연1회 종합건강검진 및 독감접종 실시,<br class="__p">
                단체 상해보험 가입, 체력단력실 운영 등
              </dd>
            </dl>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-welfare3.jpg" alt=""></div>
            <dl class="info">
              <dt>식비 지원</dt>
              <dd>중식 제공, 야근식비 및 간식비 지원</dd>
            </dl>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-welfare4.jpg" alt=""></div>
            <dl class="info">
              <dt>기숙사 운영</dt>
              <dd>원거리 거주 남·여 기숙사 지원</dd>
            </dl>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-welfare5.jpg" alt=""></div>
            <dl class="info">
              <dt>자기개발 적극 지원</dt>
              <dd>
                캠-퍼스 공통/리더십/직무교육, 외부기관 교육, 세미나/포럼/학술<br class="__p">
                대회 참가, 온라인·도서학습 등
              </dd>
            </dl>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-welfare6.jpg" alt=""></div>
            <dl class="info">
              <dt>장기근속자 포상</dt>
              <dd>
                근속표창, 근속포상휴가, 부상 등 수여
                <%--장기근속 직원 기념패, 기념품 증정--%>
              </dd>
            </dl>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-welfare7.jpg" alt=""></div>
            <dl class="info">
              <dt>경조사 지원</dt>
              <dd>
                경조사 화환 및 경조비 지급,<br class="__p">
                경조휴가 부여
              </dd>
            </dl>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-welfare8.jpg" alt=""></div>
            <dl class="info">
              <dt>사내동호회 운영</dt>
              <dd>
                여가, 취미, 체력증진 등을 위한 사내<br class="__p">
                동호회 활동비 지원
              </dd>
            </dl>
          </div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>