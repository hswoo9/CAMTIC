<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>



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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<meta name="format-detection" content="telephone=no"/>
  <!--meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"/-->
<meta name="viewport" content="width=640px" />
<meta property="og:title" content="캠틱종합기술원"/>
<meta property="og:image" content="http://218.158.231.186/images/camspot_m/logo.png"/>
<meta property="og:url" content="http://218.158.231.186/camspot_m">
<meta property="og:description" content="함께 성장하는 행복한 일터"/>
<meta name="description" content="">
<meta name="author" content="">
<meta name="keywords" content=""/>

<title>캠스팟 모바일</title>

<link rel="stylesheet" type="text/css" href="/css/camspot_m/common.css" />
<link rel="stylesheet" type="text/css" href="/css/camspot_m/contents.css" />

<script src="/js/camspot_m/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=4'/>"></script>

<body>

<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="loginEmpName" value="${loginVO.name}"/>
<input type="hidden" id="loginDeptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="loginDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="loginTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="loginTeamName" value="${loginVO.teamNm}"/>

<div id="wrap">
    
    <!-- header {-->
    <header id="header">	
        <a href="/mobileMain.do" class="logo"><img src="/images/camspot_m/logo.png" /></a>
    </header>
    <!--} header -->

    <!-- notBar {-->
    <div id="notBar">
        <a class="bell" href="/m/alarm.do">
            <i class="on"></i>
            <img src="/images/camspot_m/ico-bell.png" id="alarmImg"/>
        </a>
        <a class="lo-admin" href="/m/admin.do">
            <font class="txt type22">${loginVO.teamNm != '' ? loginVO.teamNm : loginVO.deptNm}<br>${loginVO.name}</font>
            <figure><img src="/images/camspot_m/ico-man.png" /></figure>
        </a>
    </div>
    <!--} notBar -->
    <script>
        getAlarmList();
        function getAlarmList(){
            var result = customKendo.fn_customAjax("/common/getAlarmList.do");
            if(result.flag){
                if(result.rs.length > 0){
                    if(result.rs.filter(e => e.URL.indexOf("/approval/approvalDocView.do") > -1).length == 0){
                        $("#alarmImg").prev().removeClass("on")
                    }
                }else{
                    $("#alarmImg").prev().removeClass("on")
                }
            }
        }
    </script>
    
    

    <!--} manu -->