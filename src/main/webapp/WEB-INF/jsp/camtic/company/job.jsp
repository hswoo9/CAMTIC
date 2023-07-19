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

        <div class="__job1 m0">
          <div class="__tit2">
            <h3>최근실적</h3>
          </div>
          <div class="top">
            <div class="box">
              <p>3년간</p>
              <dl>
                <dt>5</dt>
                <dd>개 사업</dd>
              </dl>
            </div>
            <div class="box">
              <dl>
                <dt>137</dt>
                <dd>명 창업교육</dd>
              </dl>
            </div>
            <div class="box">
              <dl>
                <dt>103</dt>
                <dd>개사 창업.성장 지원</dd>
              </dl>
            </div>
          </div>
          <div class="bot __mt80">
            <div class="__ovx">
              <table class="__tblList auto tdfz14 bd1 bg2 respond2 __mt20">
                <caption>사업개요 표</caption>
                <tbody>
                <tr>
                  <th scope="col">지원사업명</th>
                  <th scope="col">지원 기간</th>
                  <th scope="col">지원 부처</th>
                  <th scope="col">지원예산(백만원)</th>
                  <th scope="col">지원예산(백만원)</th>
                  <th scope="col">지원 수(명)</th>
                  <th scope="col">창업기업(개사)</th>
                </tr>
                <tr>
                  <td class="tal">
                    <dl>
                      <dt>군산 고용위기종합지원센터 운영</dt>
                      <dd>창업(재창업)지원사업</dd>
                    </dl>
                  </td>
                  <td>
                    2019<br>
                    -<br>
                    2020
                  </td>
                  <td>고용노동부</td>
                  <td>680</td>
                  <td>일반인</td>
                  <td>30</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td class="tal">
                    <dl>
                      <dt>전라북도 선도기업 육성사업</dt>
                      <dd>사내벤처 육성</dd>
                    </dl>
                  </td>
                  <td>
                    2019<br>
                    -<br>
                    2021
                  </td>
                  <td>사내벤처 육성</td>
                  <td>345</td>
                  <td>
                    예비ㆍ초기창업자<br>
                    <span class="tdu __blue">(Spin-off 특화)</span>
                  </td>
                  <td>9</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td class="tal">
                    <dl>
                      <dt>지역주도형 청년일자리 창출지원</dt>
                      <dd>전북 우수기업 청년창업 연계</dd>
                    </dl>
                  </td>
                  <td>
                    2020<br>
                    -<br>
                    2021
                  </td>
                  <td>행정안전부/전라북도</td>
                  <td>1,128</td>
                  <td>
                    예비ㆍ초기창업자<br>
                    <span class="tdu __blue">(청년 특화)</span>
                  </td>
                  <td>30</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td class="tal">
                    <dl>
                      <dt>기술사업화 협업플랫폼 구축사업</dt>
                      <dd>
                        전지소재부품 실증<br>
                        Open Lab ㆍ창업
                      </dd>
                    </dl>
                  </td>
                  <td>
                    2021<br>
                    -<br>
                    2022
                  </td>
                  <td>과학기술정보통신부</td>
                  <td>628</td>
                  <td>
                    예비ㆍ초기창업자<br>
                    <span class="tdu __blue">(전지산업 특화)</span>
                  </td>
                  <td>14</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td class="tal">
                    <dl>
                      <dt>탄소 창업지원사업</dt>
                      <dd>탄소 창업아이템 개발지원</dd>
                    </dl>
                  </td>
                  <td>
                    2021<br>
                    -<br>
                    2022
                  </td>
                  <td>산업통상자원부</td>
                  <td>
                    <div class="flt">
                      569
                      <div class="count">3,350</div>
                    </div>
                  </td>
                  <td>
                    예비ㆍ초기창업자<br>
                    <span class="tdu __blue">(탄소 특화)</span>
                  </td>
                  <td>
                    <div class="flt">
                      23
                      <div class="count">137</div>
                    </div>
                  </td>
                  <td>
                    <div class="flt">
                      6
                      <div class="count">108</div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="__tit1 line __mt100">
          <h3><strong>수행성과</strong></h3>
        </div>
        <div class="__job2">
          <dl class="box">
            <dt><span>창업교육</span></dt>
            <dd>
              <strong>137</strong>
              <span>명</span>
            </dd>
          </dl>
          <dl class="box">
            <dt><span>창업.성장지원</span></dt>
            <dd>
              <strong>103</strong>
              <span>개사</span>
            </dd>
          </dl>
          <dl class="box">
            <dt><span>매출성과</span></dt>
            <dd>
              <strong>95.3</strong>
              <span>억원</span>
            </dd>
          </dl>
          <dl class="box">
            <dt><span>고용창출</span></dt>
            <dd>
              <strong>106</strong>
              <span>명</span>
            </dd>
          </dl>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>