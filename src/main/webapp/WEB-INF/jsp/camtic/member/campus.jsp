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

				<div class="__campus1 m0">
					<dl class="head">
						<dt><span class="__nm">“</span><span class="mainCapyTitle" style="font-size: 43px !important; word-spacing: -0.3rem;">창의적으로 사고하고, 용기있게 도전하며, 즐겁게 소통하는 인재</span><span class="__nm">”</span></dt>
						<%--<dt>캠 + 퍼스 <img src="/images/camtic/img-campus1-1.jpg" alt=""></dt>
						<dd>캠틱 + 캠퍼스의 약칭으로 학습하고,만나며,나누고,성장하는 <strong> "학습과 소통의 장"</strong> 의미</dd>--%>
					</dl>

					<dl class="mid">
						<%--<dt>인재상</dt>
						<dd>창의적으로 사고하는,용기있게 도전하며,즐겁게 소통하는 인재</dd>--%>
					</dl>
					<div class="img">
						<!-- <img src="/images/camtic/img-campus1-2.jpg" alt=""> -->

						<div class="__imgW __imgW6">
							<div class="wrap">
								<img src="/images/camtic/img-campus1-2.png" alt="">
								<div class="iw iw1"><span>창의</span></div>
								<div class="iw iw2"><span>창의적인 사고로 새롭게 <br>변화를 주도하는 인재</span></div>
								<div class="iw iw3"><span>도전</span></div>
								<div class="iw iw4"><span>기업가 정신으로 용기있게<br>도전하는 인재</span></div>
								<div class="iw iw5"><span>소통</span></div>
								<div class="iw iw6"><span>긍정적인 마인드를 즐겁게<br>소통하는 인재</span></div>
							</div>
						</div>
					</div>


				<div class="__tit1 __mt100">
					<h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>역량별 학습 추진체계</strong></h3>
				</div>

				<div class="__vision2">

					<div class="box">
						<dl class="top">
							<dt>공통 역량</dt>
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
							<dt>공통학습(캠.화.지)</dt>
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
							<dt>마스터 리더 교육(부서장/CEO)</dt>
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

				<div class="__campus2">교육을 통한 소통 강화!</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>