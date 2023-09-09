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

        <div class="__job3 m0">
          <div class="head">
            <dl>
              <dt>“창업-혁신-성장으로 이어지는 혁신-제조창업 플랫폼!!”</dt>
              <dd>Level-Up 맞춤 기업육성 지원!!</dd>
            </dl>
          </div>

          <div class="mid">
            <h4>창업 지원 수행</h4>
            <div class="area">
              <div class="box">
                <div class="__mt30 __black">
                  <div class="__fz18">
                    <strong>Start-up to Scale-up<br>(혁신성장을 위한 기술/사업화 지원)</strong>
                  </div>
                  <ul class="__dotList bar __fz16">
                    <li>제조창업 기술/사업화 지원</li>
                    <li>기업성장 지원사업 연계</li>
                    <li>장비활용, 시설입주 연계</li>
                  </ul>
                </div>
              </div>
              <div class="box">
                <div class="__mt30 __black">
                  <div class="__fz18">
                    <strong>cale-up Accelerating<br>(성장가속화 및 글로벌 성장 지원)</strong>
                  </div>
                  <ul class="__dotList bar __fz16">
                    <li>시제품 제작 지원</li>
                    <li>제품 양산 지원</li>
                    <li>글로벌 성장 지원</li>
                  </ul>
                </div>
              </div>
              <div class="box">
                <div class="__mt30 __black">
                  <div class="__fz18">
                    <strong>정부지원 창업사업 수행</strong>
                  </div>
                  <ul class="__dotList bar __fz16">
                    <li>[과기부] 기술사업화 협업플랫폼 구축(R&D 혁신밸리) 사업</li>
                    <li>[고용부] 지역·산업맞춤형 일자리창출 지원사업(J-밸리 신산업 창업지원)</li>
                    <li>[산업부] 탄소창업지원사업</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="__support1 ">
          <div class="bot">
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new01.png" alt=""></div>
              <div class="txt">2022 도전! 생활혁신 아이디어리그</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new02.png" alt=""></div>
              <div class="txt">2022 캠틱 스타트업 페스티벌</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new03.png" alt=""></div>
              <div class="txt">2023 카본 스타트업 해커로드 대회</div>
            </div>
          </div>
        </div>

        <div class="__tit1 __mt60 __mb20">
          <h3><strong>전라북도 성장사다리기업 지원</h3>
        </div>
        <div class="__space20">
          <ul class="__flx flx2 gap30">
            <li>
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-space2-1.png" alt=""></span></div>
                <h5>선도기업 육성사업</h5>
                <ul class="__dotList bar __fz16">
                  <li>최고경영자 혁신포럼 운영</li>
                  <li>최고경영자 글로벌 혁신역량강화 지원</li>
                  <li>중간관리자 역량플러스 교육 운영</li>
                </ul>
              </div>
            </li>
            <li>
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-space2-2.png" alt=""></span></div>
                <h5>돋움기업 육성사업</h5>
                <ul class="__dotList bar __fz16">
                  <li>중장기 성장전략 수립지원</li>
                  <li>ESG 경영 활성화 지원</li>
                  <li>성장동력 창출을 위한 맞춤형 컨설팅 지원</li>
                  <li>성장사다리기업 역량강화 교육</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="__tit1 __mt60 __mb20">
          <h3><strong>지역산업육성 지원</h3>
        </div>
        <div class="__space20">
          <ul class="__flx flx2 gap30">
            <li>
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-space2-1.png" alt=""></span></div>
                <h5>지역특화산업육성(농생명바이오소재)</h5>
                <ul class="__dotList bar __fz16">
                  <li>구매연계형 시제품제작 지원</li>
                  <li>기술성장형 농업시스템 고급화 지원</li>
                  <li>성과창출형 기술닥터 매칭 기술애로해소 지원</li>
                </ul>
              </div>
            </li>
            <li>
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-space2-2.png" alt=""></span></div>
                <h5>스마트특성화 기반구축사업(특수목적 모빌리티)</h5>
                <ul class="__dotList bar __fz16">
                  <li>제조공정 고도화 지원</li>
                  <li>수요맞춤형 기술컨설팅 지원</li>
                  <li>장비활용 인력 고도화 교육</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div class="__tit1 __mt60 __mb20">
          <h3><strong>국제개발협력지원(ODA)</h3>
        </div>
        <div class="__space20">
          <ul class="__flx flx2 gap30">
            <li>
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-space2-1.png" alt=""></span></div>
                <h5>산업통상협력개발지원사업</h5>
                <ul class="__dotList bar __fz16">
                  <li>에티오피아 농기계 R&D센터 조성사업</li>
                  <li>우즈베키스탄 스마트팜 산업기술혁신센터 조성지원사업</li>
                </ul>
              </div>
            </li>
            <li>
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-space2-2.png" alt=""></span></div>
                <h5>EIPP우즈베키스탄 치르칙 농기계 클러스터 육성 R&D센터 설립 F/S</h5>

              </div>
            </li>
          </ul>
        </div>



        <div class="__support1">
          <div class="bot">
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new04.png" alt=""></div>
              <div class="txt">전라북도 돋움기업 육성사업</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new05.png" alt=""></div>
              <div class="txt">지역특화산업육성사업(비R&D)</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new06.png" alt=""></div>
              <div class="txt">스마트특성화 기반구축사업</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new07.png" alt=""></div>
              <div class="txt">에티오피아 농기계 R&D센터 조성사업</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new08.png" alt=""></div>
              <div class="txt">우즈베키스탄 스마트팜 산업기술혁신센터 조성 지원사업</div>
            </div>
            <div class="box">
              <div class="img"><img src="/images/camtic/img-support_new09.png" alt=""></div>
              <div class="txt">치르칙 농기계 클러스터 육성을 위한 R&D센터 설립 F/S</div>
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