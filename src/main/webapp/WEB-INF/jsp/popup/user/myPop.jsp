<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/intra/user/org.css?${toDate}">
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/user/user.js?${toDate}"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/organizationChart.js?v=${toDate}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/userPersonList.js?v=${toDate}'/>"></script>
<style>
	div.left {
		margin-top: 30px;
		width: 30%;
		float: left;
		box-sizing: border-box;
		text-align: center;
	}
	div.right {
		width: 60%;
		height: 350px;
		float: right;
		box-sizing: border-box;
		/*background: #dee4ed;*/
		background: #f7f7f7;
		border-radius: 5px;
	}
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">직원정보</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                </div>
            </div>
		<div style="padding: 30px 30px;">
			<div class="left">
				<c:choose>
					<c:when test="${idPhoto.file_path ne null}">
						<img src="${idPhoto.file_path}${idPhoto.file_uuid}" height="150px;"  alt="" class="media-object img-circle" style="display : block; margin : auto; border-radius: 24%;">
					</c:when>
					<c:otherwise>
						<img src="/images/photos/loggeduser1.png" height="150px;" alt="" class="media-object img-circle" style="display : block; margin : auto; border-radius: 24%;">
					</c:otherwise>
				</c:choose>
				<h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px; margin-top: 20px;">${uprinfList.EMP_NAME_KR} ${uprinfList.POSITION_NAME}</h4>
				<span style="color:#919191; font-size:13px;line-height:20px;">
					<%--${uprinfList.DEPT_NAME} ${uprinfList.DEPT_TEAM_NAME} ${uprinfList.DUTY_NAME}--%>
					<c:if test="${uprinfList.DEPT_PARENT_SEQ == '1000'}">
						${uprinfList.DEPT_NAME}
					</c:if>
					<c:if test="${uprinfList.DEPT_PARENT_SEQ != '1000'}">
						${uprinfList.PARENT_DEPT_NAME}
					</c:if>
					<c:if test="${uprinfList.DEPT_PARENT_SEQ != '1000'}">
						${uprinfList.DEPT_TEAM_NAME}
					</c:if>
					${uprinfList.DUTY_NAME}
				</span><br>
				<span style="color:#919191; font-size:13px;line-height:20px;">${uprinfList.EMAIL_ADDR}</span>
				<%--<div style="margin-top: 30px;">
					<img class="leftEmail" src="/images/mail-2x.png" alt="#" style="width: 30px; height: 30px; margin-right: 40px;">
					<img class="rightCalendar" src="/images/mail-2x.png" alt="#" style="width: 30px; height: 30px;">
				</div>
				<div class="media-heading" style="margin-top: 10px;">
					<a style="list-style: none; color:#919191; display: inline; margin-right: 22px;">이메일</a>
					<a style="list-style: none; color:#919191; display: inline;">일정 보기</a>
				</div>--%>
				<div style="margin-top: 35px; display: none">
					<ul style="font-size:13px; font-weight:600;letter-spacing: -2px; margin-top: 10px; padding:0px;">
						<li style="list-style: none; display: inline; margin-right: 28px;">
							<img class="leftEmail" src="/images/mail-2x.png" alt="#" style="width: 32px; height: 30px;">
						</li>
						<li style="list-style: none; display: inline; margin-left: 5px;">
							<img class="rightCalendar" src="/images/mail-2x.png" alt="#" style="width: 32px; height: 30px;">
						</li>
						<br>
						<li style="list-style: none; display: inline; /*margin-right: 15px;*/"><a style="font-size: 8px; color: white">@</a>이메일</li>
						<li style="list-style: none; display: inline; margin-left: 25px;">일정 보기</li>
					</ul>
<%--					<ul style="font-size:13px; font-weight:600;letter-spacing: -2px; margin-top: 10px; padding:0px;">
						<li style="list-style: none; display: inline; /*margin-right: 15px;*/">이메일</li>
						<li style="list-style: none; display: inline; margin-left: 20px;">일정 보기</li>
					</ul>--%>
				</div>

			</div>
			<div class="right">
				<ul class="media-heading" style="font-size:15px; font-weight:600;letter-spacing: -2px; margin-top: 45px;">
					<li style="list-style: none; color:#919191; display: inline; margin-right: 46px;">회사명</li>
					<li style="list-style: none; color:#333333; font-weight: bold; display: inline;">캠틱종합기술원</li>
				</ul>
				<ul class="media-heading" style="font-size:15px; font-weight:600;letter-spacing: -2px; margin-top: 20px;">
					<li style="list-style: none; color:#919191; display: inline; margin-right: 60px;">부서</li>
					<li style="word-spacing:5px; list-style: none; color:#333333; font-weight: bold; display: inline;">
						<c:if test="${uprinfList.DEPT_PARENT_SEQ == '1000'}">
							${uprinfList.DEPT_NAME}
						</c:if>
						<c:if test="${uprinfList.DEPT_PARENT_SEQ != '1000'}">
							${uprinfList.PARENT_DEPT_NAME}
						</c:if>
						<c:if test="${uprinfList.DEPT_PARENT_SEQ == '1000'}">
						</c:if>
						<c:if test="${uprinfList.DEPT_PARENT_SEQ != '1000'}">
							${uprinfList.DEPT_TEAM_NAME}
						</c:if>

					</li>
				</ul>
				<ul class="media-heading" style="font-size:15px; font-weight:600;letter-spacing: -2px; margin-top: 20px;">
					<li style="list-style: none; color:#919191; display: inline; margin-right: 60px;">직위</li>
					<li style="word-spacing:5px; list-style: none; color:#333333; font-weight: bold; display: inline;">
						<c:if test="${not empty uprinfList.DUTY_NAME}">
							${uprinfList.DUTY_NAME}
						</c:if>
						<c:if test="${empty uprinfList.DUTY_NAME}">
							${uprinfList.POSITION_NAME}
						</c:if>
					</li>
				</ul>
				<ul class="media-heading" style="font-size:15px; font-weight:600;letter-spacing: -2px; margin-top: 20px;">
					<li style="list-style: none; color:#919191; display: inline; margin-right: 60px;">직무</li>
					<li style="list-style: none; color:#333333; font-weight: bold; display: inline;">${uprinfList.JOB_DETAIL}</li>
				</ul>
				<ul class="media-heading" style="font-size:15px; font-weight:600;letter-spacing: -2px; margin-top: 20px;">
					<li style="list-style: none; color:#919191; display: inline; margin-right: 35px;">휴대전화</li>
					<li style="letter-spacing:0.5px; list-style: none; color:#333333; font-weight: bold; display: inline;">${uprinfList.MOBILE_TEL_NUM}</li>
				</ul>
				<ul class="media-heading" style="font-size:15px; font-weight:600;letter-spacing: -2px; margin-top: 20px;">
					<li style="list-style: none; color:#919191; display: inline; margin-right: 37px;">내선번호</li>
					<li style="list-style: none; color:#333333; font-weight: bold; display: inline;">${uprinfList.OFFICE_TEL_NUM}</li>
				</ul>
				<ul class="media-heading" style="font-size:15px; font-weight:600;letter-spacing: -2px; margin-top: 20px;">
					<li style="list-style: none; color:#919191; display: inline; margin-right: 35px;">사원번호</li>
					<li style="letter-spacing:0.5px; list-style: none; color:#333333; font-weight: bold; display: inline;">${uprinfList.ERP_EMP_SEQ}</li>
				</ul>
			</div>
		</div>
	</div>
</div>


<script>
</script>
</body>
</html>