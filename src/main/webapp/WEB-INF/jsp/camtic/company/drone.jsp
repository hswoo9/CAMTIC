<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
	.use3 a {
		display: inline-block;
		max-width: 100%;
		padding: 12px 15px;
		width: 540px;
		border-radius: 10px;
		color: #fff;
		font-size: 20px;
		font-weight: 300;
		letter-spacing: -0.05em;
		background: #111;
		text-align: center;
		margin: 0 auto;
	}
	.use3 a strong {
		font-weight: 600;
	}
	.item {
		text-align: center;
	}
	.box{
		width: 315px;
	}
	.drbox{
		height: 120px;
	}

	.drimg{
		height: 95px;
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

				<div class="__drone3 m0">
					<div class="head">
						<dl class="tit">
							<dt><span class="__nm">“</span><span class="mainCapyTitle">중·대형 드론산업의 고도화 및 글로벌 경쟁력 강화</span><span class="__nm">”</span></dt>
							<dd><span class="subCapyTitle">국내 드론산업의 활성화, 드론기업의 글로벌 시장경쟁력 강화를 위한 혁신성장 플랫폼</span></dd>
						</dl>
					</div>

					<div class="foot" style="margin-top: 70px;">
						<div class="__icoBox1">
							<%-- <div class="ico"><span><img src="/images/camtic/ico-drone2-1.png" alt=""></span></div> --%>
							<div class="__fz24 __black">
								<div class="img"><img src="/images/camtic/img-ndrone3-1-1.png" alt="" style="border-radius: 10px;"></div>
								<div class="foot __fz24 __black" style= "margin-top:30px">
									우수한 기술력을 보유한 드론 관련기업, 연구소 및 지원기관 입주를 통한 드론산업 클러스터 환경 마련
									<br class="__p">
									드론 하드웨어/소프트웨어, 제어, 서비스 관련 우수기업 발굴 및 스케일-업을 위한 인프라 구축
								</div>
							</div>
						</div>
						<%--<div class="img"><img src="/images/camtic/img-ndrone3-1.jpg" alt=""></div>--%>
					</div>


					<div class="__tit1 __mt50 __mb20">
						<%--캠틱 아이콘 이미지 추가--%>
						<h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><%--<a class="img"><img style="vertical-align: 0 !important;" src="/images/camtic/camtic_sub_favicon.png" alt=""></a>--%><strong>드론 첨단장비 공동활용 지원</strong></h3>
					</div>
					<div class="__drone4" style="padding: 60px 40px 10px 40px;">
						<div class="head">
							<div class="box">
								<h4><%--<a class="img"><img style="vertical-align: 0 !important;" src="/images/camtic/camtic_favicon.png" alt=""></a>--%>시제품제작 지원장비</h4>
								<div class="img">
									<!-- <img src="/images/camtic/img-ndrone4-1.jpg" alt=""> -->
									<div class="__drbox _row">
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr1-1-1.jpg" alt=""></div>
											<div class="drtxt"><span>SMT제조시설</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr1-1-2.jpg" alt=""></div>
											<div class="drtxt"><span>탄소복합재료가공기</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr1-1-3.jpg" alt=""></div>
											<div class="drtxt"><span>중고급형3D프린터</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr1-1-4.jpg" alt=""></div>
											<div class="drtxt"><span>고급형3D프린터</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr1-5.png" alt=""></div>
											<div class="drtxt"><span>전자설계소프트웨어</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr1-6.png" alt=""></div>
											<div class="drtxt"><span>엔지니어링 SW 및 HW</span></div>
										</div>
									</div>
								</div>
							</div>
							<div class="box">
								<h4><%--<a class="img"><img style="vertical-align: 0 !important;" src="/images/camtic/camtic_favicon.png" alt=""></a>--%>성능평가 지원장비</h4>
								<div class="img">
									<!-- <img src="/images/camtic/img-ndrone4-2.jpg" alt=""> -->
									<div class="__drbox _row">
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr2-1-1.png" alt=""></div>
											<div class="drtxt"><span>실내 구동 시뮬레이터</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr2-1-2.jpg" alt=""></div>
											<div class="drtxt"><span>등록성 측정분석장비</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr2-1-3.jpg" alt=""></div>
											<div class="drtxt"><span>모토추진체계 성능평가</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr2-1-4.jpg" alt=""></div>
											<div class="drtxt"><span>사전비행 안정성 평가</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr2-1-5.jpg" alt=""></div>
											<div class="drtxt"><span>구조안정성 평가장비</span></div>
										</div>
									</div>
								</div>
							</div>
							<div class="box">
								<h4><%--<a class="img"><img style="vertical-align: 0 !important;" src="/images/camtic/camtic_favicon.png" alt=""></a>--%>AI 항공관제 지원장비</h4>
								<div class="img">
									<!-- <img src="/images/camtic/img-ndrone4-3.jpg" alt=""> -->
									<div class="__drbox _row">
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr3-1-1.jpg" alt=""></div>
											<div class="drtxt"><span>워크스테이션</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr3-1-2.jpg" alt=""></div>
											<div class="drtxt"><span>AI데이터 처리 시스템</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr3-1-3.jpg" alt=""></div>
											<div class="drtxt"><span>드론조종시뮬레이터</span></div>
										</div>
										<div class="drbox">
											<div class="drimg"><img src="/images/camtic/img-dr3-1-4.png" alt=""></div>
											<div class="drtxt"><span>현장지원지상 통제시스템</span></div>
										</div>
										<div class="drbox" <%--style="padding-top: 60px;"--%>>
											<div class="drimg" style="padding-top: 40px;"><img src="/images/camtic/img-dr3-5.png" alt=""></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="foot __fz20 __black" style="margin-top: 30px;">
							시제품제작, 성능평가, AI 및 항공관제 등 드론의 기술혁신과 제품고도화를 위한 첨단장비 15종 구축 공동활용 장비의 지원체계를 <br class="__p">확립하고 제품개발을 위한 맞춤형 컨설팅과 함께 드론기술의
							성능개선, 신제품 개발, 제품 고급화를 위한 애로기술 지원
						</div>
					</div>

					<div class="__tit1 __mt50 __mb20">
						<h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0;"><strong>드론기업 경쟁력 강화 지원</strong></h3>
					</div>
					<div class="__drone5" style="padding-bottom: 50px;">
						<div class="__icoBox pt0">
							<%-- <div class="ico"><span><img src="/images/camtic/ico-drone2-1.png" alt=""></span></div> --%>
							<ul class="__dotList bar __fz20 __black">
								<li>
									국내 드론기업의 자체생산력 강화와 외산 의존도 감소를 위해 제품개발을 위한 기업  지원사업 및 개발과제 발굴
								</li>
								<li class="__mt20">
									드론산업 활성화를 위해 지역대학-연구기관-혁신기관-기업이 함께 참여하는 선행 연구개발 과제 발굴
								</li>
							</ul>
						</div>
						<div class="img"><img src="/images/camtic/img-ndrone5-1.jpg" alt=""></div>
					</div>
					<div class="item">
					<div class="use3">
						<a href="http://drone.camtic.or.kr/main" target="_blank"><strong>드론기술개발지원센터</strong> 바로가기</a>
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