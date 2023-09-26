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

        <div class="__tit1" style="padding: 0px 100px;">
          <h3><strong>복리후생</strong></h3>
          <p>
            조직과 직무에 적합한 인재를 채용하고자 아래와 같이 채용절차가 진행됩니다.
          </p>
        </div>
        <div class="__jobStep">
          <div class="top">
            <div class="box">
              <div class="img"><img src="/images/camtic/ico-jobstep1.png" alt=""></div>
              <div class="txt">서류전형</div>
            </div>
          </div>
          <div class="bot">
            <div class="box">
              <div class="item">
                <div class="img"><img src="/images/camtic/ico-jobstep2.png" alt=""></div>
                <div class="txt">기본 자격심사</div>
              </div>
              <p>기본 자격심사</p>
            </div>
            <div class="box">
              <div class="item">
                <div class="img"><img src="/images/camtic/ico-jobstep3.png" alt=""></div>
                <div class="txt">온라인 <br>인성역량 검사</div>
              </div>
              <p>온라인 인성역량 검사 </p>
            </div>
            <div class="box">
              <div class="item">
                <div class="img"><img src="/images/camtic/ico-jobstep4.png" alt=""></div>
                <div class="txt">면접전형</div>
              </div>
              <p>
                직무수행능력 및<br>
                조직부합도 심사
              </p>
            </div>
            <div class="box">
              <div class="item">
                <div class="img"><img src="/images/camtic/ico-jobstep5.png" alt=""></div>
                <div class="txt">최종합격</div>
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