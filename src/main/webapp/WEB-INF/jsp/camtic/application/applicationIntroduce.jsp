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
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/camtic/application/applicationIntroduce.js?v=${today}"></script>

<body  class="col-lg-12 pop_sign_wrap" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:1000px; padding:0;">
    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
    <input type="hidden" id="introduceId" name="introduceId" value="">
    <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
    <input type="hidden" id="recruitAreaInfoSn" name="recruitAreaInfoSn" value="${params.recruitAreaInfoSn}">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">입사지원 수정</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="applicationIntroduce.setApplicationPrev()"><span>이전단계</span></button>
            <button type="button" class="k-button k-button-solid-info" onclick="applicationIntroduce.setApplicationTempSave()"><span>수정</span></button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()"><span>닫기</span></button>
        </div>
    </div>
    <div style="padding: 20px">
        <div>
            <table class="popTable table table-bordered mb-0 mt10 text-center">
                <thead>
                <tr>
                    <th style="font-size: 14px; font-weight: 600; background-color: #00397f96; color: #fff;">
                        자기소개서
                    </th>
                </tr>
                <tr>
                    <th>
                        성장과정 및 장단점
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <textarea id="introduce1" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0 mt10 text-center">
                <thead>
                <tr>
                    <th>
                        입사 후 포부 및 업무추진계획
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <textarea id="introduce2" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0 mt10 text-center">
                <thead>
                <tr>
                    <th>
                        기타사항
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <textarea id="introduce3" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--
        <h5>성장과정 및 장단점</h5>
        <div>
            <textarea id="introduce1"></textarea>
        </div>
        -->
        <!--
            <h5>입사 후 포부 및 업무추진계획</h5>
            <div>
                <textarea id="introduce2"></textarea>
            </div>

            <h5>기타사항</h5>
            <div>
                <textarea id="introduce3"></textarea>
            </div>
            -->
    </div>
    <!--
    <div style="text-align: right">
        <button class="__btn1 blue" onclick="applicationIntroduce.setApplicationTempSave('prev')"><span>이전단계</span></button>
        <button class="__btn1 black" onclick="applicationIntroduce.setApplicationTempSave('temp')"><span>임시저장</span></button>
        <button class="__btn1 blue" onclick="applicationIntroduce.setApplicationTempSave('final')"><span>최종제출하기</span></button>
        <button class="__btn1 gray" onclick="window.close()"><span>취소</span></button>
    </div>
    -->
</div><!-- col-md-9 -->
<script>
    applicationIntroduce.fn_defaultScript();
</script>
</body>
