<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  /*타이틀 위치 네비위치와 비슷하게 수정 width 수정*/
  .img{width:1230px; height:740px;}
  .imgMobile {display: none;}
  .imgMobileList{display:none;}
  @media screen and (max-width: 1024px) {
    .img {width:750px; height:460px;}
    .imgMobileList{display: inline;}
    .imgList{display: none;}
  }
  @media screen and (max-width: 600px) {
    .img {display: none;}
    .imgList{display: none;}
    .imgMobile {display: inline;}
    .imgMobileList{display: inline;}
  }
</style>
<body>
<div id="wrap">
  <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
  <div id="sub">
    <div class="inner">
      <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
      <div id="content">
        <jsp:include page="/WEB-INF/jsp/template/camtic/navi_title.jsp" flush="false"/>
        <div class="__organization m0">
          <dl class="tit">
            <%--<dt>조직체계</dt>--%>
            <%--<dd>3본부 3사업부 1실 4센터 11팀, 현원 <strong>114</strong>명</dd>--%>
          </dl>
          <div class="img">
            <div class="__orga">
              <div class="head">
                <div class="line cen">
                  <div class="box">
                    <h3><span>이사장</span></h3>
                  </div>
                </div>
                <div class="line bar">
                  <div class="box">
                    <h4 style="background:#252525;"><span>이사회</span></h4>
                  </div>
                  <div class="box">
                    <h4 style="background:#252525;"><span>감사</span></h4>
                  </div>
                </div>
                <div class="line cen">
                  <div class="box">
                    <h3><span>원 장</span></h3>
                  </div>
                </div>
                <div class="line bar">
                  <div class="box">
                    <h4 style="background:#002157;"><span>운영위원회</span></h4>
                  </div>
                  <div class="box">
                    <h4 style="background:#252525;"><span>인사위원회</span></h4>
                  </div>
                </div>
                <div class="line line2 bar bar2">
                  <div class="box">
                    <h4 style="background:#234d88;"><span>미래전략기획본부</span></h4>
                    <div class="info">
                      <ul>
                        <li>미래전략기획팀</li>
                        <li>J-밸리혁신팀</li>
                      </ul>
                    </div>
                  </div>
                  <div class="box">
                    <h4 style="background:#234d88;"><span>경영지원실</span></h4>
                    <div class="info">
                      <ul>
                        <li>사업지원팀</li>
                        <li>경영지원팀</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bot">
                <div class="line">
                  <div class="cer">
                    <div class="box">
                      <h4 style="background:#41ace0;"><span>R&BD 사업본부</span></h4>
                      <div class="info _row" style="border-color:#41ace0;">
                        <ul>
                          <li>신기술융합팀</li>
                          <li>제조혁신팀</li>
                        </ul>
                      </div>
                    </div>
                    <div class="box">
                      <h4 style="background:#fff;border:1px solid #41ace0;border-radius:5px;color:#41ace0;"><strong>복합소재뿌리기술센터</strong></h4>
                    </div>
                  </div>
                  <div class="cer">
                    <div class="box">
                      <h4 style="background:#305c9a;"><span>기업성장지원본부</span></h4>
                      <div class="info _row" style="border-color:#305c9a;">
                        <ul>
                          <li>지역산업육성팀</li>
                          <li>인재개발팀</li>
                          <li>일자리창업허브팀</li>
                        </ul>
                      </div>
                    </div>
                    <%--<div class="box">
                      <h4 style="background:#fff;border:1px solid #305c9a;border-radius:5px;color:#305c9a;"><strong>전북조선업도약센터</strong></h4>
                    </div>
                    <div class="box">
                      <h4 style="background:#fff;border:1px solid #305c9a;border-radius:5px;color:#305c9a;"><strong>익산고용 안정일자리센터</strong></h4>
                    </div>--%>
                  </div>
                  <div class="cer">
                    <div class="box">
                      <h4 style="background:#0054a6;"><span>우주항공사업부</span></h4>
                      <div class="info _row" style="border-color:#0054a6;">
                        <ul>
                          <li>우주항공개발팀</li>
                          <li>우주항공기술팀</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="cer">
                    <div class="box">
                      <h4 style="background:#22ca55;"><span>드론사업부</span></h4>
                    </div>
                    <div class="box">
                      <h4 style="background:#fff;border:1px solid #22ca55;border-radius:5px;color:#22ca55;"><strong>드론개발기술지원센터</strong></h4>
                    </div>
                  </div>
                  <div class="cer">
                    <div class="box">
                      <h4 style="background:#22cab8;"><span>스마트제조사업부</span></h4>
                    </div>
                  </div>

                  <div class="cer">
                    <div class="box">
                      <h4 style="background:#997000;"><span>일자리혁신지원센터</span></h4>
                      <div class="info _row" style="border-color:#997000;">
                        <ul>
                          <li>일자리사업팀</li>
                          <li>전북조선업도약팀</li>
                          <li>익산고용안정팀</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="imgList">
          <p style="font-size: 24px; font-weight: 600; color: #000;">부서 / 팀 연락처</p>
          <table class="__tblList respond1" style="margin-top:10px;">
            <caption>조직도 사원리스트</caption>
            <colgroup>
              <col style="width:33%;"/>
              <col style="width:33%;"/>
              <col style="width:33%;"/>
              <%--<col style="width:100px;"/>--%>
            </colgroup>
            <thead>
            <tr>
              <th scope="col">부서</th>
              <th scope="col">팀</th>
              <th scope="col">연락처</th>
            </tr>
            </thead>
            <tr>
              <td rowspan="2" scope="col">미래전략기획본부</td>
              <td scope="col">미래전략기획팀</td>
              <td scope="col">063)219-0422</td>
            </tr>
            <tr>
              <td scope="col">J-밸리혁신팀</td>
              <td scope="col">063)219-0325</td>
            </tr>
            <tr>
              <td rowspan="3" scope="col">R&BD사업본부</td>
              <td scope="col">신기술융합팀</td>
              <td scope="col">063)219-0322</td>
            </tr>
            <tr>
              <td scope="col">제조혁신팀</td>
              <td scope="col">063)219-0371</td>
            </tr>
            <tr>
              <td scope="col">복합소재뿌리기술센터</td>
              <td scope="col">063)219-0329</td>
            </tr>
            <tr>
              <td rowspan="2" scope="col">기업성장지원본부</td>
              <td scope="col">창업/기업성장지원팀</td>
              <td scope="col">063)219-0341</td>
            </tr>
            <tr>
              <td scope="col">인재개발팀</td>
              <td scope="col">063)219-0426</td>
            </tr>
            <tr>
              <td rowspan="3" scope="col">일자리혁신지원센터</td>
              <td scope="col">일자리사업팀</td>
              <td scope="col">063)219-0385</td>
            </tr>
            <tr>
              <td scope="col">전북조선업도약팀</td>
              <td scope="col">063)450-1304</td>
            </tr>
            <tr>
              <td scope="col">익산고용안정팀</td>
              <td scope="col">063)837-0401</td>
            </tr>
            <tr>
              <td rowspan="2" scope="col">우주항공사업부</td>
              <td scope="col">우주개발팀</td>
              <td scope="col">063)219-0354</td>
            </tr>
            <tr>
              <td scope="col">항공개발팀</td>
              <td scope="col">063)219-0358</td>
            </tr>
            <tr>
              <td scope="col">드론사업부</td>
              <td scope="col"></td>
              <td scope="col">063)219-0420</td>
            </tr>
            <tr>
              <td scope="col">스마트제조사업부</td>
              <td scope="col"></td>
              <td scope="col">063)219-0432</td>
            </tr>
            <tr>
              <td rowspan="2" scope="col">경영지원실</td>
              <td scope="col">사업지원팀</td>
              <td scope="col">063)219-0418</td>
            </tr>
            <tr>
              <td scope="col">경영지원팀</td>
              <td scope="col">063)219-0309</td>
            </tr>
            <tbody>
            </tbody>
          </table>
        </div>
        <div class="imgMobileList">
          <div class="__tit2 __mt80">
            <h3><strong>부서 연락처</strong></h3>
          </div>
          <table class="__tblList tdfz14 bd1 bg3 respond2 __mt20">
            <caption>주요업무 표</caption>
            <tbody>
            <tr>
              <th scope="col">부서</th>
              <th scope="col">팀</th>
              <th scope="col">연락처</th>
            </tr>
            <tr>
              <td rowspan="2"><strong class="__black __fz18 fwm">미래전략기획본부</strong></td>
              <td><strong class="__black __fz18 fwm">미래전략기획팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0394</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">J-밸리혁신팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0383</strong></td>
            </tr>
            <tr>
              <td rowspan="3"><strong class="__black __fz18 fwm">R&BD사업본부</strong></td>
              <td><strong class="__black __fz18 fwm">신기술융합팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0322</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">제조혁신팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0371</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">복합소재뿌리기술센터</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0329</strong></td>
            </tr>
            <tr>
              <td rowspan="2"><strong class="__black __fz18 fwm">기업성장지원본부</strong></td>
              <td><strong class="__black __fz18 fwm">창업/기업성장지원팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0341</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">인재개발팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0426</strong></td>
            </tr>
            <tr>
              <td rowspan="3"><strong class="__black __fz18 fwm">일자리혁신지원센터</strong></td>
              <td><strong class="__black __fz18 fwm">일자리사업팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0396</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">전북조선업도약팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)450-1304</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">익산고용안정팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)837-0401</strong></td>
            </tr>
            <tr>
              <td rowspan="2"><strong class="__black __fz18 fwm">우주항공사업부</strong></td>
              <td><strong class="__black __fz18 fwm">우주개발팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0354</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">항공개발팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0358</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">드론사업부</strong></td>
              <td><strong class="__black __fz18 fwm"></strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0420</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">스마트제조사업부</strong></td>
              <td><strong class="__black __fz18 fwm"></strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0432</strong></td>
            </tr>
            <tr>
              <td rowspan="2"><strong class="__black __fz18 fwm">경영지원실</strong></td>
              <td><strong class="__black __fz18 fwm">사업지원팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0415</strong></td>
            </tr>
            <tr>
              <td><strong class="__black __fz18 fwm">경영지원팀</strong></td>
              <td><strong class="__black __fz18 fwm">063)219-0309</strong></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>