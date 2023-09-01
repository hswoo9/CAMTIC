<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-01-10
  Time: 오후 6:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<div id="sub">
	<input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
	<input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
	<div class="inner">
		위 사항에 동의합니다. <input type="checkbox" id="chk1" name="chk"><br>
		위 사항에 동의합니다. <input type="checkbox" name="chk">
	</div>
	<div>
		<button type="button" onclick="setApplicanUserAgree()">온라인 입사지원하기</button>
	</div>
</div>
<script>
	function setApplicanUserAgree(){
		var data = {
			recruitInfoSn : $("#recruitInfoSn").val(),
			userEmail : $("#userEmail").val()
		}

		var result = customKendo.fn_customAjax("/application/setUserAgree.do", data);
		if(result.flag){
			/** */
			location.href = "/application/applicationForm1.do";
		}
	}
</script>