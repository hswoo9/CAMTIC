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

        <div class="__smart1 m0">
          <dl class="head">
            <dt>디지털제조시대 성장 파트너</dt>
            <dd>인재양성 및 개발.보급</dd>
          </dl>
          <table class="__tblList tdfz14 auto bd1 bg3 respond2 __mt60">
            <caption>파트너 업무 및 인력 표</caption>
            <tbody>
            <tr>
              <th scope="col">주요업무</th>
              <th scope="col">인력현황</th>
            </tr>
            <tr>
              <td class="tal pl40" style="background:none;">
                <ul class="__dotList bar fz18 __black">
                  <li>스마트제조분야의 데이터 기반 시스템 R&D 및 사업화</li>
                  <li>
                    스마트팩토리(MES,FEMS),스마트팜 관련 계측/검사 기술, 공정시스템기술<br>
                    (Robot,Automation등),AI기술
                  </li>
                </ul>
              </td>
              <td class="tal pl40" style="background:none;">
                <ul class="__dotList bar fz18 __black">
                  <li> LabVIEW, 머신러닝, 빅데이터, 등 활용인력 4명</li>
                </ul>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="bot">
            <div class="box">
              <div class="img"><img src="/images/camtic/ico-smart1-1.png" alt=""></div>
              <div class="txt">제조혁신</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/ico-smart1-2.png" alt=""></div>
              <div class="txt">스마트제품서비스</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/ico-smart1-3.png" alt=""></div>
              <div class="txt">디지털 비지니스모델</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/ico-smart1-4.png" alt=""></div>
              <div class="txt">제도 빅데이터 서비스</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/ico-smart1-5.png" alt=""></div>
              <div class="txt">스마트 팩토리</div>
            </div>
          </div>

        </div>

        <div class="__tit1 __mt100 __mb20">
          <h3><strong>스마트체조</strong></h3>
          <p>주요고객 및 파트너</p>
        </div>
        <div class="__bio2">
          <ul class="__logos">
            <li><img src="/images/camtic/img-smart2-1.jpg" alt=""></li>
            <li><img src="/images/camtic/img-smart2-2.jpg" alt=""></li>
            <li><img src="/images/camtic/img-smart2-3.jpg" alt=""></li>
            <li><img src="/images/camtic/img-smart2-4.jpg" alt=""></li>
            <li><img src="/images/camtic/img-smart2-5.jpg" alt=""></li>
            <li><img src="/images/camtic/img-smart2-6.jpg" alt=""></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>