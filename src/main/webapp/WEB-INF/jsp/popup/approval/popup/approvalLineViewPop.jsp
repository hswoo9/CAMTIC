<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalLineSettingPop.js?v=${today}'/>"></script>
<style>
	.pop_head{height: 32px; position: relative; background: #1385db;}
	.pop_head h1 {font-size: 12px; color: #fff; line-height: 32px; padding-left: 16px;}
	.sign{line-height: 11px; height: 17px; margin: 6px 6px 0 0; padding: 3px; color: #fff; font-size: 11px; border-radius: 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px; width: 50px; text-align: center; display: inline-block; background: #bcbcbc;=}
</style>

<body>
<div class="pop_head">
	<h1>결재라인 보기</h1>
	<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
</div>
<div style="padding: 20px;">
	<div style="padding: 20px;border: 1px solid lightgray">
		<table>
			<tbody>
			<tr>
				<c:forEach items="${approvalLineList}" var="item" varStatus="st">
				<td>
					<table style="font-size: 12px;width: 164px;" id="approveInfo${item.APPROVE_EMP_SEQ}${item.APPROVE_STAT_CODE}">
						<tbody>
						<tr style="border-bottom: 1px solid lightgray;">
							<c:choose>
								<c:when test="${item.APPROVE_STAT_CODE eq '10' or item.APPROVE_STAT_CODE eq '50'}">
									<th style="height: 36px;text-align: center;background: #ffece0;">
											${item.APPROVE_STAT_CODE_DESC}
									</th>
								</c:when>
								<c:when test="${item.APPROVE_STAT_CODE eq '30'}">
									<th style="height: 36px;text-align: center;background: #ffd6d6;">
											${item.APPROVE_STAT_CODE_DESC}
									</th>
								</c:when>
								<c:otherwise>
									<th style="height: 36px;text-align: center;background: #f0f6fd;">
										<c:choose>
											<c:when test="${item.APPROVE_STAT_CODE_DESC eq null}">
												<c:choose>
													<c:when test="${item.APPROVE_TYPE eq '1'}">
														협조대기
													</c:when>
													<c:otherwise>
														결재대기
													</c:otherwise>
												</c:choose>
											</c:when>
											<c:when test="${item.APPROVE_STAT_CODE_DESC ne null}">
												<c:choose>
													<c:when test="${item.APPROVE_TYPE eq '1'}">
														협조
													</c:when>
													<c:otherwise>
														${item.APPROVE_STAT_CODE_DESC}
													</c:otherwise>
												</c:choose>
											</c:when>
										</c:choose>

									</th>
								</c:otherwise>
							</c:choose>
						</tr>
						<tr>
							<td style="height: 100px; text-align: center;
							<c:if test="${item.ORIGIN_APPROVE_EMP_NAME ne ''}">
									display: flex;
									justify-content: space-between;
									align-items: center;
									flex-direction: column;
							</c:if>
									">
								<c:choose>
									<c:when test="${item.ORIGIN_APPROVE_EMP_NAME ne ''}">
										${item.ORIGIN_APPROVE_EMP_NAME}
										<div class="box_sign" style="margin-top: 25px;">
											<span class="doc_sign">${item.PROXY_APPROVE_EMP_NAME}</span>
										</div>
										<span class="sign" style="margin:0;margin-bottom: 5px;width: 43px;height: 19px;background-color: #54b1f7">대결</span>
									</c:when>
									<c:otherwise>
										<div class="box_sign" style="margin-top: 19px;">
											<span class="doc_sign">${item.APPROVE_EMP_NAME}</span>
										</div>
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
						<tr class="txt_tr">
							<td>
								<table style="height: 44px;width: 100%">
									<tbody>
									<c:choose>
										<c:when test="${item.ORIGIN_APPROVE_EMP_NAME ne ''}">
											<tr>
												<td style="height: 20px;text-align: center;font-weight: bold;">[${item.PROXY_APPROVE_POSITION_NAME}]${item.PROXY_APPROVE_EMP_NAME}</td>
											</tr>
											<tr>
												<td style="height: 20px;text-align: center;">${item.PROXY_APPROVE_DEPT_NAME}</td>
											</tr>
										</c:when>
										<c:otherwise>
											<tr>
												<td style="height: 20px;text-align: center;font-weight: bold;">[${item.APPROVE_POSITION_NAME}]${item.APPROVE_EMP_NAME}</td>
											</tr>
											<tr>
												<td style="height: 20px;text-align: center;">${item.APPROVE_DEPT_NAME}</td>
											</tr>
										</c:otherwise>
									</c:choose>
									</tbody>
								</table>
							</td>
						</tr>
						</tbody>
					</table>
					<ul style="list-style: none;padding: 0;font-size: 11px;margin: 0;">
						<li class="txt">
							<div style="display: inline-block" class="sign">열람</div>
							<span style="display: inline-block">
										<c:choose>
											<c:when test="${item.DRAFT_EMP_SEQ eq item.APPROVE_EMP_SEQ}">
												${item.APPROVE_DT2}
											</c:when>
											<c:otherwise>
												${item.DOC_READ_DT}
											</c:otherwise>
										</c:choose>
									</span>
						</li>
						<li class="txt">
							<c:choose>
								<c:when test="${item.APPROVE_DT eq null}">
									<c:choose>
										<c:when test="${item.APPROVE_TYPE eq '1'}">
											<div class="sign bg_orange" style="display: inline-block;">협조대기</div>
										</c:when>
										<c:otherwise>
											<div class="sign bg_orange" style="display: inline-block;">결재대기</div>
										</c:otherwise>
									</c:choose>
								</c:when>
								<c:when test="${item.APPROVE_STAT_CODE eq 30}">
									<div class="sign bg_orange" style="display: inline-block;background:#ed3232 !important">반려</div>
								</c:when>
								<c:otherwise>
									<c:choose>
										<c:when test="${item.APPROVE_TYPE eq '1'}">
											<div class="sign bg_orange" style="display: inline-block;background: #ff9b59 !important;">협조</div>
										</c:when>
										<c:otherwise>
											<div class="sign bg_orange" style="display: inline-block;background: #ff9b59 !important;">결재</div>
										</c:otherwise>
									</c:choose>

								</c:otherwise>
							</c:choose>
							<span style="display: inline-block">${item.APPROVE_DT2}</span>
						</li>
					</ul>
				</td>
				<c:if test="${fn:length(approvalLineList) ne st.count}">
				<td class="arrow">
					<span class="k-icon k-i-chevron-right k-button-icon"></span>
				</td>
				</c:if>
				<script>
					<c:choose>
					<c:when test="${item.APPROVE_STAT_CODE eq '10' or item.APPROVE_STAT_CODE eq '50'}">
					$("#approveInfo${item.APPROVE_EMP_SEQ}${item.APPROVE_STAT_CODE}").css("border", "1px solid #f3904e")
					</c:when>
					<c:when test="${item.APPROVE_STAT_CODE eq '30'}">
					$("#approveInfo${item.APPROVE_EMP_SEQ}${item.APPROVE_STAT_CODE}").css("border", "1px solid #ed3232")
					</c:when>
					<c:otherwise>
					$("#approveInfo${item.APPROVE_EMP_SEQ}${item.APPROVE_STAT_CODE}").css("border", "1px solid #56a8f4")
					</c:otherwise>
					</c:choose>
				</script>
				</c:forEach>
			</tbody>
		</table>
	</div>
</div>

<script type="text/x-kendo-template" id="template">
	<div style="width: 100%">
		<table>
			<tr>

			</tr>
			<tr>

			</tr>
			<tr>

			</tr>
		</table>

	</div>
</script>

<script>
	var selectedItems = ${approvalLineList2};

	var dataSource = new kendo.data.DataSource({
		data : selectedItems
	});

	$("#listView").kendoListBox({
		dataSource: dataSource,
		dataTextField: "APPROVE_EMP_NAME",
		dataValueField: "APPROVE_EMP_SEQ",
		template: kendo.template($("#template").html())
	});
</script>
</body>
</html>