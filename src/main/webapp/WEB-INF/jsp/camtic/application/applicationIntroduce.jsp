<%--
  Created by IntelliJ IDEA.
  User: deer
  Date: 2023-08-30
  Time: 오후 3:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/camtic/application/applicationIntroduce.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-md-12 col-lg-12 dash-left pop_sign_wrap" style="width:930px;padding: 50px;">
    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
    <input type="hidden" id="introduceId" name="introduceId" value="">
    <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
    <input type="hidden" id="recruitAreaInfoSn" name="recruitAreaInfoSn" value="${params.recruitAreaInfoSn}">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">캠틱 온라인 입사지원</h4>
        </div>

        <div class="panel-body">
            <div>
                <h4>자기소개서</h4>

                <h5>성장과정 및 장단점</h5>
                <div>
                    <textarea id="introduce1"></textarea>
                </div>

                <h5>입사 후 포부 및 업무추진계획</h5>
                <div>
                    <textarea id="introduce2"></textarea>
                </div>

                <h5>기타사항</h5>
                <div>
                    <textarea id="introduce3"></textarea>
                </div>
            </div>

            <div style="text-align: right">
                <button class="__btn1 blue" onclick="applicationIntroduce.setApplicationTempSave('prev')"><span>이전단계</span></button>
                <button class="__btn1 black" onclick="applicationIntroduce.setApplicationTempSave('temp')"><span>임시저장</span></button>
                <button class="__btn1 blue" onclick="applicationIntroduce.setApplicationTempSave('final')"><span>최종제출하기</span></button>
                <button class="__btn1 gray" onclick="window.close()"><span>취소</span></button>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    applicationIntroduce.fn_defaultScript();
</script>
</body>
