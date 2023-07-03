<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>

<tiles:insertAttribute name="common" />
</head>

<body class="font-opensans">

<!-- Start main html -->
<div id="main_content">
    <tiles:insertAttribute name="nav" />
    <div class="page">
        <tiles:insertAttribute name="header" />

        <div id="tilesBody">
            <tiles:insertAttribute name="content"/>
        </div>
    </div>
</div>
<div class="col-md-3 col-lg-2 dash-right" style="position:relative;">
    <tiles:insertAttribute name="aside"/>
</div>
<tiles:insertAttribute name="footer" />


</body>
</html>
