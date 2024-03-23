<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:useBean id="toDate" class="java.util.Date" />

<!DOCTYPE html>
<html lang="ko">

<head>
    <!-- 1990년 이후 이 페이지의 캐시를 만료시킴. -->
    <meta http-equiv="Expires" content="Mon, 06 Jan 1990 00:00:01 GMT" />
    <!-- 캐시를 바로 만료시킴. -->
    <meta http-equiv="Expires" content="-1" />
    <!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.0) -->
    <meta http-equiv="Pragma" content="no-cache" />
    <!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.1) -->
    <meta http-equiv="Cache-Control" content="no-cache" />
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
    <link rel="stylesheet" href="/lib/timepicker/jquery.timepicker.css">

    <link rel="stylesheet" href="/css/quirk.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/media.css">

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

    <script src="/lib/morrisjs/morris.js"></script>
    <script src="/lib/raphael/raphael.js"></script>

    <script src="/lib/flot/jquery.flot.js"></script>
    <script src="/lib/flot/jquery.flot.resize.js"></script>
    <script src="/lib/flot-spline/jquery.flot.spline.js"></script>

    <script src="/lib/jquery-knob/jquery.knob.js"></script>

    <script src="/js/quirk.js"></script>
    <script src="/js/dashboard.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <!-- Theme -->
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/kendoui/kendo.silver.min.css' />" />

    <!--Kendo ui js-->
    <script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/kendoui/jszip.min.js'/>"></script>

    <link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
    <link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
    <link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>
    <link rel="stylesheet" href="/css/style.css"/>

    <script type="text/javascript" src="<c:url value='/js/intra/common/common.js?${toDate}'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js?${toDate}'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${toDate}'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/intra/common/linkageProcessUtil.js?${today}'/>"></script>
</head>

<body>
<jsp:include page="/WEB-INF/jsp/popup/common/fileAppendModal.jsp"></jsp:include>
<script>
    /* 전역 변수 */
    var initMinute;  // 최초 설정할 시간(min)
    var remainSecond;  // 남은시간(sec)

    $(document).ready(function(){
        clearTime(30); // 세션 만료 적용 시간
        setTimer();    // 문서 로드시 타이머 시작
    });

    function clearTime(min){ // 타이머 초기화 함수
        initMinute = min;
        remainSecond = min * 60;
    }
    function setTimer(){ // 1초 간격으로 호출할 타이머 함수
        // hh : mm 으로 남은시간 표기하기 위한 변수
        remainMinute_ = parseInt(remainSecond/60);
        remainSecond_ = remainSecond%60;

        if(remainSecond > 0){
            $("#timer").empty();
            $("#timer").append(Lpad(remainMinute_,2) + ":" + Lpad(remainSecond_,2));    // hh:mm 표기
            remainSecond--;
            setTimeout("setTimer()",1000); //1초간격으로 재귀호출!
        }
        // else{
        //     alert('장시간 미사용으로 로그아웃 되었습니다.');
        //     /*세션 종료시 작동할 이벤트*/
        //     location.href="/logoutAction";
        // }
    }

    function Lpad(str,len){  // hh mm형식으로 표기하기 위한 함수
        str = str+"";
        while(str.length<len){
            str = "0"+str;
        }
        return str;
    }
</script>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="regJobDetailName" value="${loginVO.jobDetailNm}"/>

<input type="hidden" id="regId" value="${loginVO.id}"/>
<div class="mainpanel">
    <div class="contentpanel">
        <div class="row">