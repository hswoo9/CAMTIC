<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- 1990년 이후 이 페이지의 캐시를 만료시킴. -->
    <meta http-equiv="Expires" content="Mon, 06 Jan 1990 00:00:01 GMT" />
    <!-- 캐시를 바로 만료시킴. -->
    <meta http-equiv="Expires" content="-1" />
    <!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.0) -->
    <meta http-equiv="Pragma" content="no-cache" />
    <!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.1) -->
    <meta http-equiv="Cache-Control" content="no-cache" />
    <!--<link rel="shortcut icon" href="/images/favicon.png" type="image/png">-->

    <title>CAM's Pot - CAMTIC</title>



    <link rel="stylesheet" href="/lib/Hover/hover.css">
    <link rel="stylesheet" href="/lib/fontawesome/css/font-awesome.css">
    <link rel="stylesheet" href="/lib/weather-icons/css/weather-icons.css">
    <link rel="stylesheet" href="/lib/ionicons/css/ionicons.css">
    <link rel="stylesheet" href="/lib/jquery-toggles/toggles-full.css">
    <link rel="stylesheet" href="/lib/morrisjs/morris.css">
    <link rel="stylesheet" href="/lib/timepicker/jquery.timepicker.css">
    <link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css">

    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/main.css">
    <style>
        .k-editor-toolbar {display: flex; flex-direction: row; justify-content: flex-end;}
        .k-grid .k-cell-inner>.k-link {justify-content: center;}
    </style>


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
    <script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>


    <script type="text/javascript" src="<c:url value='/js/intra/common/common.js?${today}'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js?${today}'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/intra/common/linkageProcessUtil.js?${today}'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/kendoui/jszip.min.js'/>"></script>

    <style>
        .k-state-active>.k-link {
            background-color: #406b8b;
            color : white;
        }

        .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item.k-state-active {
            border: 0px solid white !important;
        }
    </style>
    <script>
        $(document).ready(function() {
            // 더블 클릭 방지 기능을 추가할 요소를 선택합니다.
            // 예를 들어, 버튼에 대한 더블 클릭 방지 기능을 추가하려면 아래와 같이 작성할 수 있습니다.
            $("button").on("dblclick", function(e) {
                // 더블 클릭 이벤트를 취소합니다.
                e.preventDefault();
            });
        });

        var socket =  new WebSocket("wss://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/websocket.do");;
    </script>
</head>