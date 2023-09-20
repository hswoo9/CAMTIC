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
            <%--<dt>“함께 성장하는 행복한 일터 조성”을 위하여</dt>
            <dd>구성원간 상호 협력.연대 ⇒ 동반성장 도모!!</dd>--%>
            <dt><span class="__nm">“</span><span class="mainCapyTitle">함께 성장하는 행복한 일터 조성</span><span class="__nm">”</span>을 위하여</dt>
            <dd><span class="subCapyTitle">구성원간 상호 협력.연대 ⇒ 동반성장 도모!!</span></dd>
          </dl>
          <div class="img">
            <%--<img src="/images/camtic/img-clu1-1.jpg" alt="">--%>
            <img src="/images/camtic/img-clu1-1.png" alt="">
          </div>
        </div>

        <div class="__tit1 __mt100">
          <h3><strong>캠틱 클러스터 구성원</strong></h3>
        </div>
        <div class="__clu2">
          <%--<img src="/images/camtic/img-clu2-1.jpg" alt="">--%>
          <img src="/images/camtic/img-clu1-1.png" alt="">
        </div>

        <div class="__tit1 __mt100">
          <h3><strong>캠틱 클러스터 기본원칙</strong></h3>
        </div>
        <div class="__clu3">
          <div class="area">
            <div class="box">
              <div class="img"><img src="/images/camtic/img-clu3-1.jpg" alt=""></div>
              <div class="txt">연대와 협력, 복리증진</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-clu3-2.jpg" alt=""></div>
              <div class="txt">분사창업사 성장 조력</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-clu3-3.jpg" alt=""></div>
              <div class="txt">개인투자조합 활성화</div>
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