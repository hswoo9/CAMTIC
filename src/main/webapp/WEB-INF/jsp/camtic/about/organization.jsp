<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  /*타이틀 위치 네비위치와 비슷하게 수정 width 수정*/
  .img{width:1230px; height:1000px;}
  .imgMobile {display: none;}
  .imgMobileList{display:none;}
  @media screen and (max-width: 1024px) {
    .img {width:750px; height:650px;}
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
            <dt>조직체계</dt>
            <dd>3본부 3사업부 1실 4센터 11팀, 현원 <strong>114</strong>명</dd>
          </dl>
          <div class="__organization m0">
            <dl class="tit">
              <dt>조직체계</dt>
              <dd>3본부 3사업부 1실 4센터 11팀, 현원 <strong>114</strong>명</dd>
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
                        <h4 style="background:#41ace0;"><span>미래전략기획본부</span></h4>
                        <div class="info _row" style="border-color:#41ace0;">
                          <ul>
                            <li>미래전략기획팀</li>
                            <li>J-밸리혁신팀</li>
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
                      <div class="box">
                        <h4 style="background:#fff;border:1px solid #305c9a;border-radius:5px;color:#305c9a;"><strong>전북조선업도약센터</strong></h4>
                      </div>
                      <div class="box">
                        <h4 style="background:#fff;border:1px solid #305c9a;border-radius:5px;color:#305c9a;"><strong>익산고용 안정일자리센터</strong></h4>
                      </div>
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
                        <h4 style="background:#fff;border:1px solid #22ca55;border-radius:5px;color:#22ca55;"><strong>드론산업 혁신지원센터</strong></h4>
                      </div>
                    </div>
                    <div class="cer">
                      <div class="box">
                        <h4 style="background:#22cab8;"><span>스마트제조사업부</span></h4>
                      </div>
                    </div>
                  </div>
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