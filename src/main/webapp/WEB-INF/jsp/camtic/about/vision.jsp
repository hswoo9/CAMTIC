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

        <div class="__vision1 m0">
          <dl class="head">
            <dt>직원과 함께 성장하는 행복한 일터</dt>
            <dd>캠틱 클러스터 비전 2030</dd>
          </dl>
          <div class="area">
            <dl class="box box1">
              <dt><span>미션</span></dt>
              <dd>함께 성장하는 행복한 일터</dd>
            </dl>
            <dl class="box box2">
              <dt><span>핵심가치</span></dt>
              <dd>
                <ul>
                  <li><span>창의적 인재 양성</span></li>
                  <li><span>협력과 연대</span></li>
                  <li><span>수익 창출</span></li>
                </ul>
              </dd>
            </dl>
            <dl class="box box3">
              <dt><span>인재상</span></dt>
              <dd>
                <ul>
                  <li><span>창의</span></li>
                  <li><span>도전</span></li>
                  <li><span>소통</span></li>
                </ul>
              </dd>
            </dl>
            <dl class="box box4">
              <dt><span>2030비젼</span></dt>
              <dd>
                <ul>
                  <li>
                    <h4>1단계</h4>
                    <dl>
                      <dt>
                        분사창업 3개<br>
                        가족기업 20개
                      </dt>
                      <dd>2020년</dd>
                    </dl>
                  </li>
                  <li>
                    <h4>2단계</h4>
                    <dl>
                      <dt>
                        분사창업 6개<br>
                        가족기업 50개
                      </dt>
                      <dd>2025년</dd>
                    </dl>
                  </li>
                  <li>
                    <h4>3단계</h4>
                    <dl>
                      <dt>
                        분사창업 10개<br>
                        가족기업 100개
                      </dt>
                      <dd>2030년</dd>
                    </dl>
                  </li>
                  <li>
                    <p>
                      분사창업 10개 이상<br>
                      가족기업 100개 이상<br>
                      총 매출액 1조원 이상<br>
                      고용인원: 5,000명 이상
                    </p>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>

        <div class="__tit1 __mt100">
          <h3><strong>캠-퍼스</strong>(Camtic+campus) <strong>추진</strong></h3>
          <p>캠틱 + 캠퍼스의 약칭으로 학습하고, 만나며, 나누고, 성장하는 “학습과 소통의 장” 의미</p>
        </div>

        <div class="__vision2">

          <div class="box">
            <dl class="top">
              <dt>직무 역량</dt>
              <dd>
                <ul>
                  <li>미션,비전,인재상,조직문화</li>
                  <li>캠틱클러스터 철학,공통원칙</li>
                  <li>신입직원,승진자 교육</li>
                </ul>
                <p>비전,핵심가치 기반</p>
              </dd>
            </dl>
            <dl class="bot">
              <dt>공통교육</dt>
              <dd>
                <p>공통학습(캠.화.지)</p>
              </dd>
              <dd>
                <p>신입직원 교육</p>
              </dd>
              <dd>
                <p>승진자 교육</p>
              </dd>
            </dl>
          </div>

          <div class="box">
            <dl class="top">
              <dt>리더십 역량</dt>
              <dd>
                <ul>
                  <li>계층별 리더십,코칭 역량</li>
                  <li>기업가 정신 함양</li>
                  <li>핵심 리더 양성</li>
                </ul>
                <p>리더십 역량 기반</p>
              </dd>
            </dl>
            <dl class="bot">
              <dt>리더십교육</dt>
              <dd>
                <p>마스터 리더 교육<span>(부서장/CEO)</span></p>
              </dd>
              <dd>
                <p>프로 리더 교육 <span>(책임/팀장/수석)</span></p>
              </dd>
              <dd>
                <p>셀프 리더 교육 <span>(원/선입금)</span></p>
              </dd>
            </dl>
          </div>

          <div class="box">
            <dl class="top">
              <dt>직무 역량</dt>
              <dd>
                <ul>
                  <li>직무별 공통 교육</li>
                  <li>직무 Level별 학습 추진</li>
                  <li>직무별 최고 전문가 양성</li>
                </ul>
                <p>직무 역량 기반</p>
              </dd>
            </dl>
            <dl class="bot">
              <dt>직무교육</dt>
              <dd>
                <p>OJT/직무 공통 교육</p>
              </dd>
              <dd>
                <p>부서/개인별 직무 교육</p>
              </dd>
            </dl>
          </div>

        </div>

        <div class="__vision3 __mt50">
          <div class="box">
            <div class="img"><img src="/images/camtic/img-vision1-1.jpg" alt=""></div>
            <div class="txt">공통학습(캠.화.지)</div>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-vision1-2.jpg" alt=""></div>
            <div class="txt">책임급 리더십 교육</div>
          </div>
          <div class="box">
            <div class="img"><img src="/images/camtic/img-vision1-3.jpg" alt=""></div>
            <div class="txt">설계 디자인 직무공통 교육</div>
          </div>
        </div>

        <div class="__tit1 __mt100">
          <h3>캠틱클러스터 <strong>개인투자조합 제1호 설립</strong></h3>
        </div>
        <div class="__vision4">
          <div class="top">
            <div class="lef">
              <dl class="txt">
                <dt>설립목적</dt>
                <dd>
                  캠틱클러스터 분사창업기업에 투자함으로써 <strong>함께 성장하는<br class="__p">
                  행복한 일터</strong>를 만들기 위함
                </dd>
              </dl>
            </div>
            <div class="rig">
              <dl class="txt">
                <dt>설립의의</dt>
                <dd>
                  <ul>
                    <li>① 분사창업기업의 성장을 직원들과 함께 조력</li>
                    <li>② 성과 공유 및 캠틱클러스터 금융플랫폼 역할</li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
          <div class="bot">
            <div class="lef">
              <dl class="txt">
                <dt>설립일자</dt>
                <dd>
                  <dl>
                    <dt>중소벤처기업부 승인/등록</dt>
                    <dd>2021.11.02</dd>
                  </dl>
                </dd>
              </dl>
              <dl class="txt">
                <dt>참여직원</dt>
                <dd>
                  <dl>
                    <dt>총 인원 (명)</dt>
                    <dd>26</dd>
                  </dl>
                  <p>
                    향후 추가 참여직원<br>
                    모집예정
                  </p>
                </dd>
              </dl>
              <dl class="txt">
                <dt>출자금액</dt>
                <dd>
                  <dl>
                    <dt>총금액 (백만원)</dt>
                    <dd>113</dd>
                  </dl>
                  <p>
                    출자금액 1인당<br>
                    200만원 이상
                  </p>
                </dd>
              </dl>
            </div>
            <div class="rig">
              <img src="/images/camtic/img-vision2-1.jpg" alt="">
            </div>
          </div>
        </div>

        <div class="__tit1 __mt100">
          <h3>캠틱클러스터 <strong>Mission</strong></h3>
        </div>
        <div class="__vision5">
          <img src="/images/camtic/img-vision3-1.jpg" alt="">
        </div>

        <div class="__tit1 __mt100">
          <h3><strong>제조창업 플랫폼 구축</strong></h3>
        </div>
        <div class="__vision6">
          <div class="top">
            <dl>
              <dt><span>01</span></dt>
              <dd>
                최고 수준의 <strong>하드웨어 엑셀러레이터</strong><br class="__p">
                장비·시설 및 <strong>전문인력 인프라</strong> 보유
              </dd>
            </dl>
            <dl>
              <dt><span>02</span></dt>
              <dd>
                아이디어만 있으면 <strong>누구나<br class="__p">
                참여</strong>할 수 있는 <strong>개방형 플랫폼</strong>
              </dd>
            </dl>
            <dl>
              <dt><span>03</span></dt>
              <dd>
                성공 창업을 위해 <strong>하드웨어<br class="__p">
                엑셀러레이팅 플랫폼</strong> 구축
              </dd>
            </dl>
          </div>
          <div class="bot">
            <div class="box">
              <div class="img"><img src="/images/camtic/img-vision4-1.jpg" alt=""></div>
              <dl>
                <dt>설계 디자인</dt>
                <dd>
                  CAD(2D)<br>
                  CATIA(3D) 등
                </dd>
              </dl>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-vision4-2.jpg" alt=""></div>
              <dl>
                <dt>시제품 제작</dt>
                <dd>
                  3D프린터(소~대형)<br>
                  SMT 제조시설 등
                </dd>
              </dl>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-vision4-3.jpg" alt=""></div>
              <dl>
                <dt>하드웨어 엑셀러레이터 공간</dt>
                <dd>
                  상품화지원동<br>
                  복합소재뿌리기술센터<br>
                  드론기술개발지원센터
                </dd>
              </dl>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-vision4-4.jpg" alt=""></div>
              <dl>
                <dt>창업보육공간</dt>
                <dd>
                  메이커스페이스<br>
                  전주혁신창업허브<br>
                  초기창업실<br>
                  기술창업성장지원센터
                </dd>
              </dl>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-vision4-5.jpg" alt=""></div>
              <dl>
                <dt>양산지원</dt>
                <dd>
                  고속·대형 사출성형기<br>
                  워터젯 가공기<br>
                  고속가공기<br>
                  프레스·열성형기<br>
                  목형·방전가공기 등
                </dd>
              </dl>
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