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
            <%--<h4>중·대형 드론산업의 고도화 및 글로벌 경쟁력 강화</h4>--%>
            <dl>
              <dt><span class="__nm">“</span><span class="mainCapyTitle">중·대형 드론산업의 고도화 및 글로벌 경쟁력 강화</span><span class="__nm">”</span></dt>
              <dd><span class="subCapyTitle">국내 드론산업의 활성화, 드론기업의 글로벌 시장경쟁력 강화를 위한 혁신성장 플랫폼</span></dd>
            </dl>
          </div>
          <div class="foot">
            <div class="__icoBox1">
              <%-- <div class="ico"><span><img src="/images/camtic/ico-drone2-1.png" alt=""></span></div> --%>
              <div class="__fz18 __black">
                <div class="img"><img src="/images/camtic/img-ndrone3-1.jpg" alt=""></div>
                <div class="foot __fz18 __black" style= "margin-top:30px">
                  우수한 기술력을 보유한 드론 관련기업, 연구소 및 지원기관 입주를 통한 드론산업 클러스터 환경 마련
                  <br class="__p">
                  드론 하드웨어/소프트웨어, 제어, 서비스 관련 우수기업 발굴 및 스케일-업을 위한 인프라 구축
                </div>
              </div>
            </div>
            <%--<div class="img"><img src="/images/camtic/img-ndrone3-1.jpg" alt=""></div>--%>
          </div>
        </div>

        <div class="__tit1 __mt100 __mb20">
          <%--캠틱 아이콘 이미지 추가--%>
          <h3><%--<a class="img"><img style="vertical-align: 0 !important;" src="/images/camtic/camtic_sub_favicon.png" alt=""></a>--%><strong>드론 첨단장비 공동활용 지원</strong></h3>
        </div>
        <div class="__drone4">
          <div class="head">
            <div class="box">
              <h4><%--<a class="img"><img style="vertical-align: 0 !important;" src="/images/camtic/camtic_favicon.png" alt=""></a>--%>시제품제작 지원장비</h4>
              <div class="img"><img src="/images/camtic/img-ndrone4-1.jpg" alt=""></div>
            </div>
            <div class="box">
              <h4><%--<a class="img"><img style="vertical-align: 0 !important;" src="/images/camtic/camtic_favicon.png" alt=""></a>--%>성능평가 지원장비</h4>
              <div class="img"><img src="/images/camtic/img-ndrone4-2.jpg" alt=""></div>
            </div>
            <div class="box">
              <h4><%--<a class="img"><img style="vertical-align: 0 !important;" src="/images/camtic/camtic_favicon.png" alt=""></a>--%>AI 항공관제 지원장비</h4>
              <div class="img"><img src="/images/camtic/img-ndrone4-3.jpg" alt=""></div>
            </div>
          </div>
          <div class="foot __fz18 __black">
            시제품제작, 성능평가, AI 및 항공관제 등 드론의 기술혁신과 제품고도화를 위한 첨단장비 15종 구축<br class="__p">
            공동활용 장비의 지원체계를 확립하고 제품개발을 위한 맞춤형 컨설팅과 함께 드론기술의<br class="__p">
            성능개선, 신제품 개발, 제품 고급화를 위한 애로기술 지원
          </div>
        </div>

        <div class="__tit1 __mt100 __mb20">
          <h3><strong>드론기업 경쟁력 강화 지원</strong></h3>
        </div>
        <div class="__drone5">
          <div class="__icoBox pt0">
            <%-- <div class="ico"><span><img src="/images/camtic/ico-drone2-1.png" alt=""></span></div> --%>
            <ul class="__dotList bar __fz20 __black">
              <li>
                국내 드론기업의 자체생산력 강화와 외산 의존도 감소를 위해 제품개발을 위한 기업  지원사업 및 개발과제 발굴
              </li>
              <li class="__mt20">
                드론산업 활성화를 위해 지역대학-연구기관-혁신기관-기업이 함께 참여하는 선행 연구개발 과제 발굴
              </li>
            </ul>
          </div>
          <div class="img"><img src="/images/camtic/img-ndrone5-1.jpg" alt=""></div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>