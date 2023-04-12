<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-03-06
  Time: 오전 10:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
  <!--<link rel="shortcut icon" href="/images/favicon.png" type="image/png">-->

  <title>CAM's Pot - CAMTIC</title>

  <link rel="stylesheet" href="/lib/Hover/hover.css">
  <link rel="stylesheet" href="/lib/fontawesome/css/font-awesome.css">
  <link rel="stylesheet" href="/lib/weather-icons/css/weather-icons.css">
  <link rel="stylesheet" href="/lib/ionicons/css/ionicons.css">
  <link rel="stylesheet" href="/lib/jquery-toggles/toggles-full.css">
  <link rel="stylesheet" href="/lib/morrisjs/morris.css">
  <link rel="stylesheet" href="../lib/timepicker/jquery.timepicker.css">
  <link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css">

  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/main.css">


  <script src="/lib/modernizr/modernizr.js"></script>

  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
  <script src="/lib/html5shiv/html5shiv.js"></script>
  <script src="/lib/respond/respond.src.js"></script>
  <![endif]-->

  <script src="/lib/jquery/jquery.js"></script>
  <script src="/lib/jquery-ui/jquery-ui.js"></script>
  <script src="/lib/bootstrap/js/bootstrap.js"></script>
  <script src="/lib/jquery-toggles/toggles.js"></script>

  <script src="/lib/raphael/raphael.js"></script>

  <script src="/lib/flot/jquery.flot.js"></script>
  <script src="/lib/flot/jquery.flot.resize.js"></script>
  <script src="/lib/flot-spline/jquery.flot.spline.js"></script>

  <script src="/lib/jquery-knob/jquery.knob.js"></script>

  <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>


  <!--Kendo ui js-->
  <script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
  <link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
  <link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
  <link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>
  <link rel="stylesheet" href="/css/style.css"/>

  <script type="text/javascript" src="<c:url value='/js/intra/common/common.js?${toDate}'/>"></script>
  <script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${toDate}'/>"></script>
  <script type="text/javascript" src="<c:url value='/js/intra/common/linkageProcessUtil.js?${toDate}'/>"></script>
</head>