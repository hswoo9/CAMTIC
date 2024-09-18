<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-08-30
  Time: 오후 5:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="toDate" class="java.util.Date" />
<script src="/lib/jquery/jquery.js"></script>
<!--Kendo ui js-->
<script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/jszip.min.js'/>"></script>

<link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>

<style>
    .k-textbox .k-input-inner::placeholder {
        color: #4287f5;
        font-size: 12px;
    }
</style>
<html>
<head>
    <title>Title</title>
</head>

<body>
    <h2>Hello, Hanker~!</h2>

    <input type="password" name="name" id="textbox" class="textbox" style="width: 300px;" value=""/>
    <input type="text" name="name" id="textboxB" class="textbox" style="width: 300px;" value=""/>

</body>

<script>
    $(".textbox").kendoTextBox({
        placeholder : "필수값입니다."
    });
</script>
</html>
