<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
  .vision_list {
    text-align: center;
  }

  .vision_list .vi_dlist {
    word-break: keep-all;
  }

  .vision_list .lt_tit {
    margin: 6px;
    float: left;
    width: 18%;
    font-size: 1.4em;
    font-weight: 500;
    color: #fff;
    background: #2c4d92;
    border-radius: 50px;
    padding: 3%;
  }

  .vision_list .rt_txt {
    position: relative;
    margin: 0 0 1% 24%;
    padding: 15px;
    width: 71%;
    height: 89px;
    font-size: 1.3em;
    border: 2px solid #dfdfdf;
    border-radius: 10px;
  }

  .vision_list .rt_txt span {
    font-size: 20px;
  }

  .vision_list .vision_title {
    position: relative;
    font-size: 1.2em;
    letter-spacing: -1px;
    line-height: 1.3em;
    color: #2e5abc;
    font-weight: 600;
  }

  .vision_list .rt_txt:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: -10%;
    width: 10%;
    height: 3px;
    background: #ddd;
    z-index: -1;
  }

  .bg_arrow {
    margin-top: -5px;
    overflow: hidden;
    padding: 40px 0 0 0;
    background: url(/images/camtic/vision_arr.png) no-repeat 66% 0;
    background-size: 33%;
  }

  .__tit1 p {
    margin-top: 5px;
    font-size: 22px;
    color: #000;
    line-height: 1.5;
  }

  .vision_list .vision_title:before {
    display: block;
    position: absolute;
    content: '';
    top: 0;
    left: 30%;
    border: 2px solid #2e5abc;
    padding: 3px 7px 5px 1px;
    border-width: 5px 5px 0 0;
    transform: rotate(-90deg);
  }

  .vision_list .vision_title:after {
    display: block;
    position: absolute;
    content: '';
    bottom: 0;
    right: 30%;
    border: 2px solid #2e5abc;
    padding: 3px 7px 5px 1px;
    border-width: 5px 5px 0 0;
    transform: rotate(90deg);
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

        <div class="__jvalley2 __mt50" style="padding: 0px 100px;">
          <div class="tit">
            <%--<h3 style="font-size: 40px;"><strong>비전 및 목표</strong></h3>--%>
              <dt class="mainCapyTitle"><span class="__nm">“</span>제조창업 플랫폼 J-valley<span class="__nm">”</span></dt>
            <p>
              <span class="subCapyTitle">뿌리에서 첨단ㆍ디지털 산업 육성 공간으로 변화</span>
            </p>
              <p style="margin-top: 5px;">
                <span class="subCapyTitle">(기업 100개사, 고용 1,000명)</span>
              </p>
          </div>
          <%--<div class="area">
            <div class="box">
              <div class="img"><img src="/images/camtic/img-jvalley2-1.jpg" alt="" style="width: 324px; height: 223px; border-radius: 10px;"></div>
              <div class="info _row">
                <h4>2000 ~ 과거</h4>
                <dl>
                  <dt>전주첨단벤처단지 조성</dt>
                  <dd>
                    <ul>
                      <li>뿌리산업 (금형, 정밀가공, 열처리 등) 중심</li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-jvalley1-1-2.jpg" alt="" style="width: 324px; height: 223px; border-radius: 10px;"></div>
              <div class="info _row">
                <h4>2016 ~ 2022  현재</h4>
                <dl>
                  <dt>지식산업센터 전주혁신창업허브 건립</dt>
                  <dd>
                    <ul>
                      <li>전주혁신창업허브 준공(‘20)</li>
                      <li>기술창업성장지원센터 유치(‘19)</li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-jvalley1-1-3.jpg" alt="" style="width: 324px; height: 223px; border-radius: 10px;"></div>
              <div class="info _row">
                <h4>~ 2025</h4>
                <dl>
                  <dt>2차 지식산업센터 기술창업성장지원센터</dt>
                  <dd>
                    <ul>
                      <li>24년 8월 준공예정</li>
                      <li>성장기업 40개 입주예정</li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </div>--%>

          <div class="__jvalley4 __mt100">
            <div class="__tit1 line mb0">
              <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>비전 및 목표</strong></h3>
              <div class="vision_list __mt50">
                <dl class="vi_dlist">
                  <dt class="lt_tit">비전</dt>
                  <dd class="rt_txt vt">
                    <span><strong>창업 →혁신→성장</strong>까지 <strong>단계적 맞춤지원</strong></span>
                    <p class="vision_title"><strong>전주형 강소기업 육성의 산실</strong></p>
                  </dd>
                </dl>
                <div class="bg_arrow">
                  <dl class="vi_dlist">
                    <dt class="lt_tit">추진목표</dt>
                    <dd class="rt_txt vt"><span class="vision_txt01 ">청년창업을 위한 플랫폼(전주형 혁신창업허브) 구축</span><p class="vision_txt02"><strong>성장이 필요한 기업에 Scale-UP 기술서비스 지원체계 구축</strong></p></dd>
                  </dl>
                </div>
                <div class="bg_arrow">
                  <dl class="vi_dlist">
                    <dt class="lt_tit">추진전략</dt>
                    <dd class="rt_txt" style="display: flex;justify-content: center;align-items: center;"><p class="vision_txt02 pt13"><span style="font-size:22px;"><b>우수창업자 발굴 및 육성 / 초기기업 보육 및 지원 /&nbsp;제조양산 기반 지원</b></span></p></dd>
                  </dl>
                </div>
              </div>
            </div>



            <%--<div class="area">
              <img src="/images/camtic/img-jvalley-vison.png" alt="">
            </div>--%>
              <%--<div class="__jvalley5" style="padding: 20px 0 55px;">
              <div class="one">
                <div class="box box1">
                  <div class="cir">
                    <h4>추진전략</h4>
                    <div class="txt">
                      <ul>
                        <li>우수창업자 발굴 및 육성</li>
                        <li>초기기업 보육 및 지원</li>
                        <li>제조양산 기반 지원</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="arr"><i></i></div>
                <div class="box box2">
                  <div class="cir">
                    <h4>추진목표</h4>
                    <div class="txt">
                      <dl>
                        <dt>
                          청년창업을 위한 플랫폼<br>
                          (전주형 혁신창업허브)구축
                        </dt>
                        <dd>
                          성장이 필요한 기업에 <br class="__m">Scale-UP<br class="__p">
                          기술서비스 지원체계 구축
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="arr"><i></i></div>
                <div class="box box3">
                  <div class="cir">
                    <h4>비전</h4>
                    <div class="txt">
                      <dl>
                        <dt>
                          창업 -&gt; 혁신 -&gt; 성장까지<br>
                          단계적 맞춤 지원
                        </dt>
                        <dd style="color: yellow;">
                          전주형 강소기업<br>
                          육성의 산실
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>--%>
          </div>

        <div class="__jvalley3 __mt100">
          <div class="__tit1 line __mb20">
            <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>단계적 맞춤지원 (청년ㆍ기술ㆍ디지털 창업플랫폼)</strong></h3>
          </div>
          <h4>청년ㆍ기술ㆍ디지털 <strong>창업 플랫폼</strong></h4>
          <h5><span>H/W</span></h5>
          <div class="hw">
            <div class="box">
              <dl class="info">
                <dt>설계 디자인</dt>
                <dd>
                  CAD(2D)<br>
                  CATIA(3D) 등
                </dd>
              </dl>
              <div class="img"><img src="/images/camtic/img-jvalley3-1.jpg" alt=""></div>
            </div>
            <div class="box">
              <dl class="info">
                <dt>시제품 제작</dt>
                <dd>
                  3D프린터(소~대형)<br>
                  SMT 제조시설 등
                </dd>
              </dl>
              <div class="img"><img src="/images/camtic/img-jvalley3-2.jpg" alt=""></div>
            </div>
            <div class="box">
              <dl class="info">
                <dt>H/W 엑셀러레이터 공간</dt>
                <dd>
                  상품화지원동<br>
                  복합소재뿌리기술센터<br>
                  드론산업혁신지원센터
                </dd>
              </dl>
              <div class="img"><img src="/images/camtic/img-jvalley3-3.jpg" alt=""></div>
            </div>
            <div class="box">
              <dl class="info">
                <dt>창업.성장공간</dt>
                <dd>
                  메이커스페이스<br>
                  전주혁신창업허브<br>
                  초기창업실<br>
                  기술창업성장지원센터
                </dd>
              </dl>
              <div class="img"><img src="/images/camtic/img-jvalley3-4.jpg" alt=""></div>
            </div>
            <div class="box">
              <dl class="info">
                <dt>시장출시제품 지원</dt>
                <dd>
                  고속·대형 사출성형기<br>
                  워터젯 가공기<br>
                  고속가공기<br>
                  프레스·열성형기<br>
                  목형·방전가공기 등
                </dd>
              </dl>
              <div class="img"><img src="/images/camtic/img-jvalley3-5.jpg" alt=""></div>
            </div>
          </div>
          <h5><span>S/W</span></h5>
          <div class="sw">
            <div class="box">
              <h6>기술사업화</h6>
              <div class="cont">
                <dl>
                  <dt><strong>장비구축</strong></dt>
                  <dd><p>첨단장비,전문기술인력</p></dd>
                </dl>
                <dl>
                  <dt><strong style="letter-spacing:0.04em;">사  업  화</strong></dt>
                  <dd>
                    <p>판로다각화,인종,특허,시장개척 등 지원</p>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="box">
              <h6>연구개발(R&amp;BD)</h6>
              <div class="cont">
                <dl>
                  <dt><strong>공동연구</strong></dt>
                  <dd>
                    <p>석.박사 인력연계 신제품.신공정 개발을 위한 정부과제 공동 수주</p>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="box">
              <h6>휴먼웨어강화</h6>
              <div class="cont">
                <dl>
                  <dt><strong>채용연계</strong></dt>
                  <dd>
                    <p>필요인력양성/공급 Job Real Matching</p>
                  </dd>
                </dl>
                <dl>
                  <dt><strong>교육훈련</strong></dt>
                  <dd>
                    <p>직급별, 직무별 재직자 직무능력 향상 교육 지원</p>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="box">
              <h6>창업.성장지원</h6>
              <div class="cont">
                <dl>
                  <dt>
                    <strong>예비/초기창업자의 성장을</strong> 위한 다양한
                    프로그램 발굴 및 지원
                  </dt>
                  <dd>
                    <p>크라우드 펀딩 및 엔젤.벤처캐피탈 투자연계등</p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="__jvalley4 __mt100">
          <div class="__tit1 line mb0">
            <h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>제조창업 플랫폼</strong>(J-Valley) <strong>로드맵</strong></h3>
          </div>
          <div class="area">
            <img src="/images/camtic/img-jvalley4-1-1-1.png" alt="">
          </div>
        </div>


        <%--<div class="__tit1 line __mt100 mb0">
          <h3><strong>전주첨단벤처단지</strong></h3>
        </div>

        <div class="__jvalley5">
          <div class="__tit2 __mb50">
            <h3><strong>비전과 목표</strong></h3>
          </div>
          <div class="one">
            <div class="box box1">
              <div class="cir">
                <h4>추진전략</h4>
                <div class="txt">
                  <ul>
                    <li>우수창업자 발굴 및 육성</li>
                    <li>초기기업 보육 및 지원</li>
                    <li>제조양산 기반 지원</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="arr"><i></i></div>
            <div class="box box2">
              <div class="cir">
                <h4>추진목표</h4>
                <div class="txt">
                  <dl>
                    <dt>
                      청년창업을 위한 플랫폼<br>
                      (전주형 혁신창업허브)구축
                    </dt>
                    <dd>
                      성장이 필요한 기업에 <br class="__m">Scale-UP<br class="__p">
                      기술서비스 지원체계 구축
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="arr"><i></i></div>
            <div class="box box3">
              <div class="cir">
                <h4>비전</h4>
                <div class="txt">
                  <dl>
                    <dt>
                      창업 -&gt; 혁신 -&gt; 성장까지<br>
                      단계적 맞춤 지원
                    </dt>
                    <dd>
                      전주형 강소기업<br>
                      육성의 산실
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="__tit2 __mt70">
            <h3><strong>주요 연혁</strong></h3>
          </div>
          <div class="two">
            <div class="tab _tab1">
              <button type="button" class="active">1999  -  2010</button>
              <button type="button">2011  -  2020</button>
              <button type="button">2021  -  2023</button>
            </div>
            <div class="area">
              <div class="sec _box1 active">
                <div class="box">
                  <h4>2010</h4>
                  <dl>
                    <dt>12</dt>
                    <dd>입주업체(주)엔아이비 전주시 팔복동 공장설립(60억원 규모)</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2009</h4>
                  <dl>
                    <dt>11</dt>
                    <dd>지식경제부, 「전국지역혁신센터(RIC)성공사례」 최우수기관 선정</dd>
                  </dl>
                  <dl>
                    <dt>09</dt>
                    <dd>국방기술품질원 전주국방벤처센터 개소식</dd>
                  </dl>
                  <dl>
                    <dt>03</dt>
                    <dd>국방기술품질원, 전주국방벤처센터 유치</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2008</h4>
                  <dl>
                    <dt>11</dt>
                    <dd>국방기술품질원, 전주시, 전북대TIC 국방벤처센터 MOU 체결</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2006</h4>
                  <dl>
                    <dt>09</dt>
                    <dd>산자부, 지역혁신센터 성과활용사업 평가 전국 1위 달성</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2005</h4>
                  <dl>
                    <dt>06</dt>
                    <dd>산자부, TIC최종평가 전국 1위 차지</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2004</h4>
                  <dl>
                    <dt>11</dt>
                    <dd>균형위, 제1회 지역혁신박람회 참가, 지역혁신우수사례 선정</dd>
                  </dl>
                  <dl>
                    <dt>06</dt>
                    <dd>전주첨단벤처단지 내 자동차부품•금형 장비구축 완료(49종, 전북대TIC)</dd>
                  </dl>
                  <dl>
                    <dt>01</dt>
                    <dd>전주첨단기계벤처단지「국가균형발전위」의 “지역혁신성공사례”로 선정</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2003</h4>
                  <dl>
                    <dt>12</dt>
                    <dd>전북테크노파크(TP) 유치</dd>
                  </dl>
                  <dl>
                    <dt>10</dt>
                    <dd>(故)노무현 대통령 방문 「 첨단기계산업 혁신전략보고회 」</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2002</h4>
                  <dl>
                    <dt>10</dt>
                    <dd>산자부, 지역특화센터, 전주기계산업리서치센터 유치/입주</dd>
                  </dl>
                  <dl>
                    <dt>10</dt>
                    <dd>한국탄소융합기술원 (舊, 전주기계산업리서치센터) 유치</dd>
                  </dl>
                  <dl>
                    <dt>06</dt>
                    <dd>전주첨단벤처단지 개소 및 입주, 단지운영</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2001</h4>
                  <dl>
                    <dt>11</dt>
                    <dd>사단법인 전북대학교 자동차부품•금형 기술혁신센터 설립(전북대 TIC)</dd>
                  </dl>
                  <dl>
                    <dt>06</dt>
                    <dd>전주첨단기계벤처단지 조성협약 체결(전북대학교, 전주시)</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>1999</h4>
                  <dl>
                    <dt>11</dt>
                    <dd>사단법인 전북대학교 자동차부품•금형 기술혁신센터 설립(전북대 TIC)</dd>
                  </dl>
                  <dl>
                    <dt>12</dt>
                    <dd>전북지역 자동차부품•금형 기술혁신센터 구축사업 선정 및 협약체결(산자부•전북대 간)</dd>
                  </dl>
                </div>
              </div>
              <div class="sec _box1">
                <div class="box">
                  <h4>2020</h4>
                  <dl>
                    <dt>11</dt>
                    <dd>전주시 민간위탁사업 운영평가 결과 우수(1위)시설 선정</dd>
                  </dl>
                  <dl>
                    <dt>10</dt>
                    <dd>전주시 "엄마의 밥상" 전주첨단벤처단지 성금 1,500만원 기탁</dd>
                  </dl>
                  <dl>
                    <dt>10</dt>
                    <dd>전주첨단벤처단지 내 탄소복합재 생산기술 지원장비구축(13종)</dd>
                  </dl>
                  <dl>
                    <dt>08</dt>
                    <dd>전주혁신창업허브(창업동, 지식산업센터) 준공</dd>
                  </dl>
                  <dl>
                    <dt>03</dt>
                    <dd>전주첨단벤처단지 전북연구개발특구 지정</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2019</h4>
                  <dl>
                    <dt>08</dt>
                    <dd>전주첨단벤처단지 민간 위탁 재협약체결(전주시, 캠틱종합기술원)</dd>
                  </dl>
                  <dl>
                    <dt>05</dt>
                    <dd>중소벤처기업진흥공단 “스마트공장 배움터” 유치</dd>
                  </dl>
                  <dl>
                    <dt>03</dt>
                    <dd>전주첨단벤처단지 내 스마트공장 배움터 건립지역 선정(중소벤처기업진흥공단)</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2018</h4>
                  <dl>
                    <dt>12</dt>
                    <dd>벤처단지 창업보육36개사(입주13, 졸업25), 누적매출액 8,575억 달성</dd>
                  </dl>
                  <dl>
                    <dt>11</dt>
                    <dd>(사)대한드론축구협회 설립(산업통상자원부 산하)</dd>
                  </dl>
                  <dl>
                    <dt>09</dt>
                    <dd>전주첨단벤처단지 지식산업센터 기공식 개최</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2017</h4>
                  <dl>
                    <dt>02</dt>
                    <dd>전주첨단벤처단지 대표자회의 초록우산 어린이재단 기부금 전달</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2016</h4>
                  <dl>
                    <dt>09</dt>
                    <dd>전주첨단벤처단지 민간 위탁 협약체결(전주시, 캠틱종합기술원)</dd>
                  </dl>
                  <dl>
                    <dt>07</dt>
                    <dd>전주시, 전주첨단벤처단지 민간위탁기관 선정</dd>
                  </dl>
                  <dl>
                    <dt>05</dt>
                    <dd>전주첨단벤처단지 운영 조례 제정</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2015</h4>
                  <dl>
                    <dt>12</dt>
                    <dd>전주첨단벤처단지, 지식산업센처 건립지역 선정(중기청)</dd>
                  </dl>
                </div>
              </div>
              <div class="sec _box1">
                <div class="box">
                  <h4>2023</h4>
                  <dl>
                    <dt>03</dt>
                    <dd>중소벤처기업부 이영 장관 전주첨단벤처단지 현장방문 및 입주기업 간담회 개최</dd>
                  </dl>
                  <dl>
                    <dt>02</dt>
                    <dd>전주혁신창업허브(성장동, 지식산업센터) 착공식 개최</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2022</h4>
                  <dl>
                    <dt>12</dt>
                    <dd>전주첨단벤처단지 입주기업 송년교류회 개최(58개사 참석)</dd>
                  </dl>
                  <dl>
                    <dt>10</dt>
                    <dd>전주혁신창업허브(성장동, 지식산업센터) 착공(2024.8월 준공예정)</dd>
                  </dl>
                  <dl>
                    <dt>09</dt>
                    <dd>중기부, 전주드론제작소 윙윙-스테이션(메이커스페이스) 개소식</dd>
                  </dl>
                  <dl>
                    <dt>08</dt>
                    <dd>우범기 전주시장, 전주첨단벤처단지 현장방문</dd>
                  </dl>
                  <dl>
                    <dt>03</dt>
                    <dd>국토교통부 지정 드론산업혁신지원센터 개소</dd>
                  </dl>
                </div>
                <div class="box">
                  <h4>2021</h4>
                  <dl>
                    <dt>12</dt>
                    <dd>전주첨단벤처단지 입주기업 누적 매출액 4,822억 달성(50개사 입주)</dd>
                  </dl>
                  <dl>
                    <dt>12</dt>
                    <dd>캠틱종합기술원, 전주첨단벤처단지 민간위탁 협약체결(3년, 22~24년)</dd>
                  </dl>
                  <dl>
                    <dt>05</dt>
                    <dd>전주첨단벤처단지 전주혁신창업허브(창업동) 입주율 100%(55실) 달성</dd>
                  </dl>
                  <dl>
                    <dt>02</dt>
                    <dd>국토부, 드론산업혁신지원센터 장비 구축 및 운영 시작</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="__tit2 __mt70">
            <h3><strong>추진체계</strong></h3>
          </div>
          <div class="thr">
            <h4>전주첨단벤처단지</h4>
            <div class="area">
              <div class="box">
                <h5><span>지원</span></h5>
                <dl class="_row">
                  <dt>전주시</dt>
                  <dd>
                    <ul>
                      <li>건물/부지 지원</li>
                      <li>행/재정 지원</li>
                      <li>제도개선 지원</li>
                      <li>세재 지원</li>
                    </ul>
                  </dd>
                </dl>
              </div>
              <div class="box">
                <h5><span>운영</span></h5>
                <dl class="_row">
                  <dt>캠틱 종합기술원</dt>
                  <dd>
                    <ul>
                      <li>단지관리</li>
                      <li>인력양성사업</li>
                      <li>연구개발지원</li>
                      <li>기술혁신지원</li>
                      <li>창업보육지원</li>
                    </ul>
                  </dd>
                </dl>
              </div>
              <div class="box">
                <h5><span>육성</span></h5>
                <dl class="_row">
                  <dt>산업체</dt>
                  <dd>
                    <ul>
                      <li>특성화.전문화</li>
                      <li>생산성 증대</li>
                      <li>고부가가치화</li>
                      <li>R&amp;D 역량증대</li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>--%>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>