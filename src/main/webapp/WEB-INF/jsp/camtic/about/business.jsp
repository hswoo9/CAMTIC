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

				<div class="__busi m0">
					<%--<dl class="head">
						<dt>캠틱종합기술원</dt>
						<dd>
							다양한 기술과 경험을 바탕으로<br>
							<strong><u>스마트매뉴팩처링 기술, 항공우주,헬스케어, 드론, 자동화, 나노섬유, 복합소재, 산업통상협력개발(ODA) 지원사업</u></strong> 등<br>
							신사업을 적극 추진하고 있습니다.
						</dd>
					</dl>--%>
							<dl class="head">
								<dt><span class="__nm">“</span><span class="mainCapyTitle">지역전략산업 및 기업의 혁신/성장을 위한 시설, 공간, 장비 등</span><span class="__nm">”</span></dt>
								<dd><span class="subCapyTitle">인프라를 기반으로 중소·벤처기업의 성장 지원</span></dd>
							</dl>
						<%--<img src="/images/camtic/img-busi.jpg" alt="다음 내용 참조">--%>
						<h3><strong></strong></h3>
						<div class="hide">
							<ul>
								<li>
									<h4>01</h4>
									<dl>
										<dt>기업성장지원 분야</dt>
										<dd>BUSINESS GROWTH SUPPORT</dd>
									</dl>
									<ul>
										<li>- 지역산업육성</li>
										<li>- 국제개발협력(ODA)</li>
										<li>- 인재개발/인재양성</li>
										<li>- 일자리·창업지원</li>
									</ul>
								</li>
								<li>
									<h4>02</h4>
									<dl>
										<dt>R&BD 분야</dt>
										<dd>Research & Business Development</dd>
									</dl>
									<ul>
										<li>- 스마트팩토리 / 로봇</li>
										<li>- 스마트헬스케어 / 스마트팜</li>
										<li>- 탄소 복합재 개발</li>
									</ul>
								</li>
								<li>
									<h4>03</h4>
									<dl>
										<dt>사업부 분야</dt>
										<dd>Business for Commercialization</dd>
									</dl>
									<ul>
										<li>- 항공우주</li>
										<li>- 드론사업</li>
										<li>- 스마트제조</li>
									</ul>
								</li>
							</ul>
						</div>
				</div>


				<div class="__tit1 __mt0">
					<h3><strong>R&BD</strong> 분야</h3>
				</div>
				<div class="__vision50">
					<div class="__imgW __imgW1">
						<div class="wrap">
							<img src="/images/camtic/img-busi_01.png" alt="">
							<div class="iw iw1"><span>수요기업</span></div>
							<div class="iw iw2"><span>R<br>&<br>B<br>D</span></div>
							<div class="iw iw3"><span>연구개발</span></div>
							<div class="iw iw4"><span>시제품제작</span></div>
							<div class="iw iw5"><span>제품개발</span></div>
							<div class="iw iw6"><span>시험/인증</span></div>

							<div class="iw iw7"><span>매출, 고용성장<br>생산선 향상<br>제품/기술개발</span></div>
							<div class="iw iw8"><span>비<br>R<br>&<br>D</span></div>
							<div class="iw iw9"><span>엔지니어링</span></div>
							<div class="iw iw10"><span>제품양산</span></div>
							<div class="iw iw11"><span>장비활용</span></div>
							<div class="iw iw12"><span>지원사업</span></div>

							<div class="iw iw13"><span>특화기술</span></div>
							<div class="iw iw14 dot tal">
								<ul>
									<li>사출금형</li>
									<li>다공정금형</li>
									<li>친환경차 경량화 기술</li>
									<li>탄소복합재 새산자동화</li>
								</ul>
							</div>

							<div class="iw iw15"><span>특화기술</span></div>
							<div class="iw iw16 dot tal">
								<ul>
									<li>스마트 헬스케어</li>
									<li>지능형 제조로봇</li>
									<li>스마트팝 & 에어로팜</li>
									<li>나노섬유</li>
								</ul>
							</div>

							<div class="iw iw17"><span>특화기술</span></div>
							<div class="iw iw18 dot tal">
								<ul>
									<li>스마트팩토리</li>
									<li>공정자동화</li>
									<li>
										System Integration<br>(Mechatronics Automatives)
									</li>
								</ul>
							</div>
							<div class="iw iw19"><span>복합소재</span></div>
							<div class="iw iw20"><span>신기술융합</span></div>
							<div class="iw iw21"><span>제조혁신</span></div>
						</div>
					</div>
				</div>

				<div class="__tit1 __mt50">
					<h3><strong>기업성장지원</strong> 분야</h3>
				</div>
				<div class="__vision50">

					<div class="__imgW __imgW2">
						<div class="wrap">
							<img src="/images/camtic/img-busi_02.png" alt="">
							<div class="iw iw1"><span>기업성장단계별<br>창업/혁신/성장</span></div>
							<div class="iw iw2"><span>창업/기술/경영<br>분야별 기업성장</span></div>
							<div class="iw iw3"><span>인재개발</span></div>
							<div class="iw iw4"><span>지역산업육성</span></div>
							<div class="iw iw5"><span>일자리</span></div>
							<div class="iw iw6"><span>창업</span></div>

							<div class="iw iw7"><span>인재개발</span></div>
							<div class="iw iw8 dot tal">
								<ul>
									<li>인력양성</li>
									<li>일학습병행/유급휴가</li>
									<li>사업주훈련</li>
									<li>재직자직무역량강화</li>
									<li>대학생기술인력양성</li>
								</ul>
							</div>

							<div class="iw iw9"><span>지역산업육성</span></div>
							<div class="iw iw10 dot tal">
								<ul>
									<li>기술사업화지원</li>
									<li>성장사다리지원</li>
									<li>AI인공지능 데이터사업</li>
									<li>ODA(국제개발협력)</li>
								</ul>
							</div>

							<div class="iw iw11"><span>일자리</span></div>
							<div class="iw iw12 dot tal">
								<ul>
									<li>청년취업지원프로그램</li>
									<li>인력채용지원</li>
									<li>고용위기종합지원센터</li>
									<li>고용안정선제대응</li>
								</ul>
							</div>

							<div class="iw iw13"><span>지역산업육성</span></div>
							<div class="iw iw14 dot tal">
								<ul>
									<li>기술사업화지원</li>
									<li>성장사다리지원</li>
									<li>AI인공지능 데이터사업</li>
									<li>ODA(국제개발협력)</li>
								</ul>
							</div>
							<div class="iw iw15"><span>성<br>장<br>지<br>원</span></div>
							<div class="iw iw16"><span>연<br>계<br>협<br>력</span></div>
							<div class="iw iw17"><span>재직자교육</span></div>
							<div class="iw iw18"><span>창업지원</span></div>
							<div class="iw iw19"><span>사업화지원</span></div>
							<div class="iw iw20"><span>채용지원</span></div>
							<div class="iw iw21"><span>마케팅</span></div>
							<div class="iw iw22"><span>기술지원</span></div>
							<div class="iw iw23"><span>컨설팅</span></div>

						</div>
					</div>
				</div>


				<div class="__tit1 __mt50">
					<h3><strong>사업부</strong> 분야</h3>
				</div>
				<div class="__vision50">
					<!-- <img src="/images/camtic/img-busi_03.jpg" alt=""> -->

					<div class="__imgW __imgW3">
						<div class="wrap">
							<img src="/images/camtic/img-busi_03.png" alt="">
							<div class="iw iw1"><span>핵심기술<br>노하우/경험</span></div>
							<div class="iw iw2"><span>수익창출</span></div>
							<div class="iw iw3"><span>핵<br>심<br>기<br>술</span></div>
							<div class="iw iw4"><span>사<br>업<br>화</span></div>
							<div class="iw iw5"><span>드론(Drone)</span></div>
							<div class="iw iw6"><span>스마트제조</span></div>
							<div class="iw iw7"><span>우주항공</span></div>

							<div class="iw iw8"><span>핵심기술</span></div>
							<div class="iw iw9 dot tal">
								<ul>
									<li>드론산업혁신지원센터</li>
									<li>산업용플랫폼드론</li>
									<li>드론R&D/제품발굴</li>
									<li>드론축구 및 콘텐츠</li>
								</ul>
							</div>

							<div class="iw iw10"><span>핵심기술</span></div>
							<div class="iw iw11 dot tal">
								<ul>
									<li>생산/품질혁신</li>
									<li>스마트팩토리</li>
									<li>데이터실시간모니터링</li>
									<li>최적적응제어</li>
								</ul>
							</div>

							<div class="iw iw12"><span>핵심기술</span></div>
							<div class="iw iw13 dot tal">
								<ul>
									<li>생산/품질혁신</li>
									<li>스마트팩토리</li>
									<li>데이터실시간모니터링</li>
									<li>최적적응제어</li>
								</ul>
							</div>

							<div class="iw iw14"><span>드론</span></div>
							<div class="iw iw15"><span>스마트제조</span></div>
							<div class="iw iw16"><span>우주항공</span></div>
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