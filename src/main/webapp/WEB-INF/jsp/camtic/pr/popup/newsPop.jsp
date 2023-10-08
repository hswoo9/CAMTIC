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
    #content {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }
    #content img {
        max-width: 90%;
        max-height: 90%;
        height: auto;
    }
</style>


<body>
	<div id="content">
		${map.CONTENT}
	</div>

<script>
</script>
</body>
</html>
