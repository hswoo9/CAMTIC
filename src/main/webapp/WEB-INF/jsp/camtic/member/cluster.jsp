<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
	.__clu3 .area .box .txt{
		font-size: 24px;
		line-height: 1.27;
		padding: 10px 30px;
		color:#fff;
		border-radius: 10px;
		margin-top: 7px;
		position: relative;
	}
	.__imgW .wrap{
		margin: 0px 100px;
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

				<div class="__clu1 mo">
					<dl class="tit">
						<%--<dt>“함께 성장하는 행복한 일터 조성”을 위하여</dt>
						<dd>구성원간 상호 협력.연대 ⇒ 동반성장 도모!!</dd>--%>
						<dt><span class="__nm">“</span><span class="mainCapyTitle">함께 성장하는 행복한 일터 조성</span><span class="__nm">”</span>을 위하여</dt>
						<dd><span class="subCapyTitle">구성원간 상호 협력.연대 ⇒ 동반성장 도모!!</span></dd>
					</dl>
					<div class="img">
						<%--<img src="/images/camtic/img-clu1-1.jpg" alt="">--%>

						<div class="__imgW __imgW4">
							<div class="wrap">
								<img src="/images/camtic/img-clu1-2.png" alt="">
								<div class="iw iw1"><span>캠틱클러스터</span></div>
								<div class="iw iw2"><span>수익창출</span></div>
								<div class="iw iw3"><div><span>캠틱클러스터</span> <strong>금융플랫폼</strong></div></div>
								<div class="iw iw4"><div><dl><dt>캠틱클러스터</dt><dd>개인투자조합 제1호</dd></dl></div></div>
								<div class="iw iw5"><div><dl><dt>캠틱클러스터</dt><dd>개인투자조합 제2호</dd></dl></div></div>
								<div class="iw iw6"><div><dl><dt>본사창업 제1호</dt><dd>(팔복인더스트리)</dd></dl></div></div>
								<div class="iw iw7"><div><dl><dt>본사창업 제2호</dt><dd>(애드아임)</dd></dl></div></div>
								<div class="iw iw8"><div><dl><dt>본사창업 제3호</dt><dd>&nbsp;</dd></dl></div></div>
								<div class="iw iw9"><div><dl><dt>본사창업 제4호</dt><dd>&nbsp;</dd></dl></div></div>
								<div class="iw iw10"><span>가족회사 제1호</span></div>
								<div class="iw iw11"><span>가족회사 제2호</span></div>
								<div class="iw iw12"><span>가족회사 제3호</span></div>
								<div class="iw iw13"><span>가족회사 제4호</span></div>
								<div class="iw iw14"><span>가족회사 제5호</span></div>
							</div>
						</div>
					</div>


					<div class="__tit1 __mt100">
						<h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0; text-align: left;"><strong>캠틱 클러스터 구성원</strong></h3>
					</div>
					<div class="__clu2">
						<%--<img src="/images/camtic/img-clu2-1.jpg" alt="">--%>
						<!-- <img src="/images/camtic/img-clu2-1.jpg" alt=""> -->
						<div class="__imgW __imgW5">
							<div class="wrap">
								<img src="/images/camtic/img-clu2-1.png" alt="">
								<div class="iw iw1"><span>CAMTIC</span></div>
								<div class="iw iw2"><span>분사창업사</span></div>
								<div class="iw iw3"><span>사우회/<br>개인투자조합</span></div>
								<div class="iw iw4"><span>가족기업</span></div>
								<div class="iw iw5">
									<div>
										<p>캠틱클러스터</p>
										<dl>
											<dt>구성원</dt>
											<dd>캠틱클러스터의 구심점</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>


				<div class="__tit1 __mt100">
					<h3 style="border-bottom: 1px dashed #b7b7b7; padding:30px 0; text-align: left;"><strong>캠틱 클러스터 기본원칙</strong></h3>
				</div>
				<div class="__clu3">
					<div class="area">
						<%--<div class="box">
							<div class="img"><img src="/images/camtic/img-clu3-1.jpg" alt=""></div>
							<div class="txt">연대와 협력, 복리증진</div>
						</div>--%>
						<%--<div class="box">
							<div class="img"><img src="/images/camtic/img-clu3-2.jpg" alt=""></div>
							<div class="txt">분사창업사 성장 조력</div>
						</div>--%>
						<%--<div class="box">
							<div class="img"><img src="/images/camtic/img-clu3-3.jpg" alt=""></div>
							<div class="txt">개인투자조합 활성화</div>
						</div>--%>
						<div class="box" style="display: flex; margin: 0 auto; gap: 80px;">
							<div class="txt" style="background-color: #234d88;">연대와 협력, 복리증진</div>
							<div class="txt" style="background-color: #41ace0;">분사창업사 성장 조력</div>
							<div class="txt" style="background-color: #22ca55;">개인투자조합 활성화</div>
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