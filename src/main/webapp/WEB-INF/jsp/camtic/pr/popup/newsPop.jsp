<%--
  Created by IntelliJ IDEA.
  User: 정호진
  Date: 2023-10-08(008)
  Time: 11:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
	<title>${map.TITLE}</title>
</head>
<style>
	body, html {
		height: 100%;
		margin: 0;
	}
	.container {
		display: flex;
		justify-content: center;
	}
	.content {
		max-width: 100%;
		max-height: 100%;
		padding: 10px;
		box-sizing: border-box; /* 여백을 포함한 전체 너비와 높이 계산 */
	}
	.content img {
		max-width: 100%;
		height: auto;
	}
</style>


<body>
	<div class="container">
		<div class="content" id="content">
			${map.CONTENT}
		</div>
	</div>
<script>
	window.onload = function() {
		var content = document.getElementById('content');
		var windowHeight = window.innerHeight;
		var contentHeight = content.scrollHeight;
		if (contentHeight > windowHeight) {
			content.style.height = windowHeight + 'px';
		}
	};
</script>
</body>
</html>
