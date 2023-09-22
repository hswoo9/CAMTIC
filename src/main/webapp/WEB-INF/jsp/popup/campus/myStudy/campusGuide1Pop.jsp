<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/myStudy/campusGuide1Pop.js?v=${toDate}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-12" style="margin:0 auto;">
      <img src="/images/campus/campusGuide1_1.png">
      <div class="mt10"></div>
      <img src="/images/campus/campusGuide1_2.png">
      <div class="mt10"></div>
      <img src="/images/campus/campusGuide1_3.png">
      <div class="mt10"></div>
      <img src="/images/campus/campusGuide1_4.png">
    </div>
  </div>
</div>
<script>
  eduGui1.init();
</script>
</body>
