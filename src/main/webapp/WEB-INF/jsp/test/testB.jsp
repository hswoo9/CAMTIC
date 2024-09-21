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

<html>
<head>
    <title>Title</title>
</head>

<body>
    <h2>Hello, Hanker~!</h2>

    <div id="grid"></div>


</body>

<script>
    let data = [
        {ID: 1, Name: "Hanker", Date: "2024-06-21"},
        {ID: 2, Name: "김하나", Date: "2024-02-01"},
        {ID: 3, Name: "진호정", Date: "2024-01-31"},
        {ID: 4, Name: "강윤기", Date: "2024-04-22"},
        {ID: 5, Name: "진현강", Date: "2024-06-03"},
        {ID: 6, Name: "신정영", Date: "2024-02-13"},
        {ID: 7, Name: "마수리", Date: "2024-07-25"},
        {ID: 8, Name: "김강구", Date: "2024-01-17"},
        {ID: 9, Name: "국태환", Date: "2024-03-06"},
        {ID: 10, Name: "한석중", Date: "2024-05-21"},
        {ID: 11, Name: "하나로", Date: "2024-06-01"},
    ];


    var dataSource = new kendo.data.DataSource({
        data : data
    })

    $("#grid").kendoGrid({
        dataSource : dataSource,
        columns: [
            { field: "ID", title: "ID" },
            { field: "Name", title: "이름" },
            { field: "Date", title: "가입일" }
        ]
    })
</script>
</html>
