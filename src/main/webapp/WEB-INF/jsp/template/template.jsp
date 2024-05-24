<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>

<tiles:insertAttribute name="common" />
</head>
<style>
    .shadowOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        display: none;
    }
</style>
<%--<div id="shadowOverlay"></div>--%>

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
<div class="dash-right" style="position:relative;">
    <tiles:insertAttribute name="aside"/>
</div>
<tiles:insertAttribute name="footer" />
<!-- End main html -->

</body>
</html>
