<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  .__tblList tr td {font-size:16px;padding:5px 5px;border-bottom:1px solid #ccc;}
  .__tblList tr > * {text-align:center;padding:10px 10px;line-height:1.6;}
</style>
<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>

        <div class="__support2 m0">
          <!--<div class="top">-->

            <div class="top">
              <div class="head">
                <dl>
                  <dt><span class="__nm">“</span><span class="mainCapyTitle">지역기업  및 산업의 인력수요 기반</span><span class="__nm">”</span></dt>
                  <dd><span class="subCapyTitle">재직자 직무능력 향상, 예비 취업자 양성 훈련 실시</span></dd>
                </dl>
              </div>
              <div class="inf">
                <div class="img"><img src="/images/camtic/img-ntalent1-1.jpg" alt=""></div>
                <div class="info">
                  <dl>
                    <dt>재직자 직무능력 향상</dt>
                    <dd>
                      산업체 재직자를 대상으로 기업 및 산업의 수요에 부합한 교육훈련을 진행하여,<br class="__p">
                      재직자 직무능력 향상과 기술력 강화로 기업의 핵심인재<br class="__p">
                      양성 및 경쟁력 제고를 목표로 함.
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div class="__fz18 __black fwb __mt50">추진 사업</div>
            <table class="__tblList bd1 bg3 respond2 __mt10" style="word-spacing: 0px;">
              <caption></caption>
              <colgroup class="__p">
                <col style="width:335px;">
                <col>
              </colgroup>
              <colgroup class="__m">
                <col style="width:100px;">
                <col>
              </colgroup>
              <thead>
              <tr>
                <th scope="col">사업명</th>
                <th scope="col">사업 소개</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="fz18 __black">지역산업 맞춤형 인력양성사업</td>
                <td class="tal">
                  지역 및 산업의 인력수요 기반 맞춤형 교육훈련을 제공하고,훈련수요를 충실히 반영하여 기업의 기술력 향상 및 경쟁력 제고<br>
                  (주요분야 : 경영, 회계, 기계, 스마트팩토리, 생산품질, 드론 등)
                </td>
              </tr>
              <tr>
                <td class="fz18 __black">일학습병행사업</td>
                <td class="tal">
                  1년 미만 신규 입사자의 장기근속과 업무역량강화를 위한 NCS기반 과정개발 및 교육지원(1년 과정)<br>
                  (주요 분야 : 경영회계사무, 보건의료, 기계, 화학, 전기전자 등)
                </td>
              </tr>
              <tr>
                <td class="fz18 __black">
                  사업주 직업능력개발훈련(위탁훈련)<br>
                  기업맞춤형 훈련지원
                </td>
                <td class="tal">
                  사업주가 직업능력개발훈련시설에 위탁하여 근로자 대상으로 훈련을 실시하여 근로자 역량을 강화하기 위한 훈련<br>
                  (주요분야 : 경영, 생산, 품질, 식품 등)
                </td>
              </tr>
              <tr>
                <td class="fz18 __black">유급휴가훈련</td>
                <td class="tal">
                  사업주가 재직근로자에게 유급휴가(5일이상)를 부여하여 직무역량 향상 훈련을 실시할 수 있도록 지원하고, 훈련실시 기간 임금 지급<br class="__m">
                  (주요분야 : 생산, 품질, 식품, 드론 등)
                </td>
              </tr>
              <tr>
                <td class="fz18 __black">산업전문인력 AI역량강화 지원사업</td>
                <td class="tal">
                  제조, 의료, 서비스 등 기본 기반 사업과 AI융합을 통해 디지털 혁신을 선도할 수 있는 산업계 리더 및 전문인력 육성<br>
                  (주요분야 : 시설장비 유지관리, 도시환경, 교통, 안전, 생활복지)
                </td>
              </tr>
              <tr>
                <td class="fz18 __black">산업맞춤형 전문기술인력<br class="__m">양성상업</td>
                <td class="tal">
                  탄소복합재 설계‧공정‧제조 분야 전북 특화단지 재직자 전문인력 양성<br>
                  (주요 분야 : 설계, 빅데이터, 스마트팩토리 등)
                </td>
              </tr>
              </tbody>
            </table>

            <ul class="__flx flx3 wrap gap30 __mt40">
              <li>
                <img src="/images/camtic/img-ntalent2-1.jpg" alt="">
                <p class="__fz18 __balck __mt10">지역산업맞춤형<br class="__m">인력양성사업</p>
              </li>
              <li>
                <img src="/images/camtic/img-ntalent2-2.jpg" alt="">
                <p class="__fz18 __balck __mt10">일학습병행</p>
              </li>
              <li>
                <img src="/images/camtic/img-ntalent2-3.jpg" alt="">
                <p class="__fz18 __balck __mt10">사업주위탁훈련 (기업맞춤형훈련)</p>
              </li>
              <li>
                <img src="/images/camtic/img-ntalent2-4.jpg" alt="">
                <p class="__fz18 __balck __mt10">유급휴가훈련</p>
              </li>
              <li>
                <img src="/images/camtic/img-ntalent2-5.jpg" alt="">
                <p class="__fz18 __balck __mt10">산업전문인력 AI역량강화 지원사업</p>
              </li>
              <li>
                <img src="/images/camtic/img-ntalent2-6.jpg" alt="">
                <p class="__fz18 __balck __mt10">산업맞춤형 전문기술인력양성상업</p>
              </li>
            </ul>
          <!--</div>-->



        <div class="__tit1 __mt100 __mb20">
          <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>예비 취업자 양성 훈련</strong></h3>
        </div>

        <div class="__support3">
          <div class="head">
            <%--<h4><span class="__nm"></span><span class="m">지역산업과 구직자, 기업을 연결하는 훈련으로 도내 기업과 구직자의 수요에 맞춰 훈련과정을</span><span class="__nm"></span></h4>--%>
            <dl>
              <dt style="line-height:24px;" >지역산업과 구직자, 기업을 연결하는 훈련으로 도내 기업과 구직자의 수요에 맞춰 훈련과정을 개발하고 현장 실무형 인력을 양성하여 지역 내 기업에 연계를 목표로 함</dt>
              <dd>※ 주요 추진분야 : 기계/자동차, 스마트팩토리, 생산품질관리, 연구개발, 생산기술, 화학 등</dd>
            </dl>
          </div>
          <div class="__fz18 __black fwb __mt50">추진 사업</div>
          <table class="__tblList bd1 bg3 respond2 __mt10">
            <caption></caption>
            <colgroup class="__p">
              <col style="width:350px;">
              <col>
            </colgroup>
            <colgroup class="__m">
              <col style="width:100px;">
              <col>
            </colgroup>
            <thead>
            <tr>
              <th scope="col">사업명</th>
              <th scope="col">사업 소개</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="fz18 __black">지역산업맞춤형<br class="__m">인력양성사업</td>
              <td class="tal">
                지역 기업 및 산업의 인력 수요를 기반으로 맞춤형 교육훈련을 제공하여 중소기업의 인력난 해소 및 고용률 제고
              </td>
            </tr>
            <tr>
              <td class="fz18 __black">이공계 전문기술<br class="__m">인력양성사업</td>
              <td class="tal">
                이공계 전문대졸 이상 미취업자에게 산업현장에 특화된 연수(전문연수 및 기업연수)를 제공하고 기업 맞춤형 인력으로
                양성함으로써 청년실업 문제 및 이공계 인력수급 불균형 해소
              </td>
            </tr>
            <tr>
              <td class="fz18 __black">산업구조<br class="__m">변화대응등 특화훈련</td>
              <td class="tal">
                지역별로 산업변화 흐름이 상이하고 급변하는 산업구조에 대응하여 차별화 된 훈련을 적시에 제공하기 위한 훈련
              </td>
            </tr>
            </tbody>
          </table>
          <ul class="__flx flx3 wrap gap30 __mt40">
            <li>
              <img src="/images/camtic/img-ntalent3-1.jpg" alt="">
              <p class="__fz18 __balck __mt10">지역산업맞춤형<br class="__m">인력양성사업</p>
            </li>
            <li>
              <img src="/images/camtic/img-ntalent3-2.jpg" alt="">
              <p class="__fz18 __balck __mt10">전문기술인력<br class="__m">양성사업</p>
            </li>
            <li>
              <img src="/images/camtic/img-ntalent3-3.jpg" alt="">
              <p class="__fz18 __balck __mt10">산업구조<br class="__m">변화대응등<br class="__m">특화훈련</p>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>