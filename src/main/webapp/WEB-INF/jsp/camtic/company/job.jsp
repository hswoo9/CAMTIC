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
              <dt><span class="__nm">“</span><span class="m">구인기업과 구직자 상호 Win-Win 할 수 있는</span><span class="__nm">”</span></dt>
              <dd>일자리 Real-Match</dd>
            </dl>
            <p>기업지원을 통한 고용활성화, 구인-구직자간 양질의 정보제공</p>
          </div>

          <div class="mid">
            <h4>Real Job Matching 안내</h4>
            <div class="area">
              <div class="box">
                <div class="img"><span><img src="/images/camtic/img-njob1-1.png" alt=""></span></div>
                <div class="__mt30 __black">
                  <div class="__fz18">
                    <strong>대상 : </strong><span class="__blue2 fwb">취업교육 훈련생 및 일반구직자<br>
											구직신청서 작성 신청(온/오프라인)</span>
                  </div>
                  <ul class="__dotList bar __fz16">
                    <li>구체적인 구직희망사항 사전 접수로 구직자 희망 취업처 분류</li>
                    <li>구직자 취업처 연계</li>
                  </ul>
                </div>
              </div>
              <div class="box">
                <div class="img"><span><img src="/images/camtic/img-njob1-2.png" alt=""></span></div>
                <div class="__mt30 __black">
                  <div class="__fz18">
                    <span class="__blue2 fwb">잡코칭(Job Coaching)</span>
                  </div>
                  <ul class="__dotList bar __fz16">
                    <li>취업소양 교육</li>
                    <li>자소서.면접기법.이미지메이킹.etc</li>
                    <li>구직자 상담 및 일자리 정보 제공</li>
                  </ul>
                  <div class="__fz18 __mt20">
                    <span class="__blue2 fwb">잡매칭(Job Matching)</span>
                  </div>
                  <ul class="__dotList bar __fz16">
                    <li>취업박람회 , 구인구직 , 동행면접</li>
                    <li>기업 맞춤형 구인 프로그램 운영</li>
                  </ul>
                  <div class="__fz18 __mt20">
                    <span class="__blue2 fwb">잡 OJT(Job OJT)</span>
                  </div>
                  <ul class="__dotList bar __fz16">
                    <li>신입사원 마인드 및 OJT교육</li>
                    <li>신입사원의 자세 , 기초 역량</li>
                    <li>기본 마인드 교육</li>
                  </ul>
                  <div class="__fz18 __mt20">
                    <span class="__blue2 fwb">잡 네크워크(Job Networking)</span>
                  </div>
                  <ul class="__dotList bar __fz16">
                    <li>인사담당자 의견수렴/시장동향 파악</li>
                    <li>유관기관 협력체제 및 정보교류</li>
                  </ul>
                </div>
              </div>
              <div class="box">
                <div class="img"><span><img src="/images/camtic/img-njob1-3.png" alt=""></span></div>
                <div class="__mt30 __black">
                  <ul class="__dotList bar __fz16">
                    <li>대상 : 지역 내 채용수요 발생 기업 및 사업장</li>
                    <li>구인신청서 작성 발송(온/오프라인)</li>
                    <li>채용지원 형태 결정(채용박람회,구인구직,동행면접)</li>
                    <li>채용정보에 대한 검증 후 채용공고 등록<br>(직/업종 , 직무 , 인재상 , 급여 , 복리후생 등)</li>
                    <li>기업맞춤형 채용지원 진행</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="__fz24 __black fwb __mt80">일자리창출을 위한 지원사업 수행이력</div>
          <table class="__tblList type3 bd2 bg2 respond2 __mt10">
            <caption></caption>
            <colgroup class="__p">
              <col style="width:150px;">
              <col style="width:200px;">
              <col>
            </colgroup>
            <colgroup class="__m">
              <col style="width:80px;">
              <col style="width:80px;">
              <col>
            </colgroup>
            <thead>
            <tr>
              <th scope="col">년도</th>
              <th scope="col">주관부서</th>
              <th scope="col">사업명</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>2020~현재</td>
              <td class="tal">고용노동부</td>
              <td class="tal">고용안정 선제대응 패키지 지원사업</td>
            </tr>
            <tr>
              <td>2014-현재</td>
              <td class="tal">과학기술<br class="__m">정보통신부</td>
              <td class="tal">이공계 전문기술 연수사업</td>
            </tr>
            <tr>
              <td>2015~현재</td>
              <td class="tal">고용노동부</td>
              <td class="tal">지역맞춤형 인력양성사업</td>
            </tr>
            <tr>
              <td>2018~2022</td>
              <td class="tal">고용노동부<br class="__m">/전주시</td>
              <td class="tal">청년 취업동아리 및 컨설팅 지원사업</td>
            </tr>
            <tr>
              <td>2016~2022</td>
              <td class="tal">전라북도</td>
              <td class="tal">전라북도 선도기업 육성사업( 선도기업 분석대회 / 구인구직 면접의 날 )</td>
            </tr>
            <tr>
              <td>2018~2021</td>
              <td class="tal">전라북도</td>
              <td class="tal">중소기업 맞춤형 전문인력 지원사업</td>
            </tr>
            <tr>
              <td>2019~2021</td>
              <td class="tal">산업통상<br class="__m">자원부</td>
              <td class="tal">호남-제주권 청년 희망이음 지원사업</td>
            </tr>
            <tr>
              <td>2020~2021</td>
              <td class="tal">전라북도</td>
              <td class="tal">젊은 뿌리기술인 양성교육</td>
            </tr>
            <tr>
              <td>2016~2018</td>
              <td class="tal">고용노동부</td>
              <td class="tal">전북지역 일자리 목표 공시제 컨설팅</td>
            </tr>
            <tr>
              <td>2016~2017</td>
              <td class="tal">고용노동부</td>
              <td class="tal">전라북도 고용창출 지원사업</td>
            </tr>
            <tr>
              <td>2015~2016</td>
              <td class="tal">고용노동부</td>
              <td class="tal">전라북도 우수기업 인재유치 지원사업</td>
            </tr>
            </tbody>
          </table>

        </div>



        <div class="__tit1 __mt100 __mb20">
          <h3><strong>예비 취업자 양성 훈련</strong> <span class="fwl" style="font-size:0.85em;">(www.jumpjbjob.or.kr)</span></h3>
        </div>
        <div class="__job4">
          <div class="head"><span class="__nm">“</span><span class="m">조선업 취업, 군산 주력산업(전기차.이차전지 등) <strong style="font-weight:600;">취업 원스톱 지원</strong></span><span class="__nm">”</span></div>
          <div class="tac"><img src="/images/camtic/img-njob2-1.jpg" alt=""></div>
          <div class="tac __mt70"><img src="/images/camtic/img-njob3-1.jpg" alt=""></div>
        </div>



        <div class="__tit1 __mt100 __mb20">
          <h3><strong>익산고용안정일자리센터</strong> <span class="fwl" style="font-size:0.85em;">(www.jobiksan.or.kr)</span></h3>
        </div>
        <div class="__job4">
          <div class="head type2"><span class="__nm">“</span><span class="m">지역기업과 (위기)근로자를 연결하는 <strong>일자리 디딤돌</strong></span><span class="__nm">”</span></div>
          <div class="area">
            <div class="box">
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-drone2-1.png" alt=""></span></div>
                <h5>구직자 고용서비스</h5>
                <ul class="__dotList bar __fz20 __black">
                  <li>
                    근로자 맞춤형 고용서비스 : 구직자 발굴 및 상담을 통해 구직자의 희망조건을 확인하고 취업을 하기 위한 고용서비스 지원
                    <p class="__fz16">* 면접패키지, 면접비, 취업역량캠프, 구인기업 현장면접 등</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="box">
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-root2-2.png" alt=""></span></div>
                <h5>기업지원</h5>
                <ul class="__dotList bar __fz20 __black">
                  <li>기업홍보지원 : 구인난을 겪고 있는 기업의 채용 및 홍보지원</li>
                  <li>기업애로 해소의 날 : 위기근로자의 성공취업을 축하하고 빠른 적응지원</li>
                </ul>
              </div>
            </div>
            <div class="box">
              <div class="__icoBox">
                <div class="ico"><span><img src="/images/camtic/ico-root2-3.png" alt=""></span></div>
                <h5>취업장려금</h5>
                <ul class="__dotList bar __fz20 __black">
                  <li>지역 내 위기산업의 우수인적자원 확보 및 위기근로자의 취업 가능성 확대와 장기근속 독려를 위한 장려금 지원<span style="font-size:0.85em;">(구직자 대상)</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="tac __mt70"><img src="/images/camtic/img-njob4-1.jpg" alt=""></div>
        </div>

      </div>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>