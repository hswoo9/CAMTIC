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
<script type="text/javascript" src="/js/camtic/application/applicationLogin.js?v=${today}"></script>
<style>
    .k-grid-norecords{
        justify-content: space-around;
    }
</style>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding: 0;">

    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">입사지원</h3>
            <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${params.recruitInfoSn}">
            <div class="btn-st popButton" style="display: flex;gap: 5px;">
                <button type="button" class="k-button k-button-solid-info" onclick="applicationLogin.setApplicationLogin()">입사지원</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>

        <div class="panel-body">
            <div>
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="15%">
                        <col width="28%">
                        <col width="28%">
                        <col width="28%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th style="text-align: center">
                            이메일
                        </th>
                        <td colspan="3">
                            <input type="text" id="userEmail" style="width: 30%" name="userEmail" onkeypress="if(window.event.keyCode==13){applicationLogin.setApplicationLogin()}" value="deer@naver.com">
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">
                            비밀번호
                        </th>
                        <td colspan="3">
                            <input type="password" id="userPassword" style="width: 30%" name="userPassword" onkeypress="if(window.event.keyCode==13){applicationLogin.setApplicationLogin()}" value="Jiat2300@@">
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center">
                            비밀번호 확인
                        </th>
                        <td colspan="3">
                            <input type="password" id="userPassword2" style="width: 30%" name="userPassword2" onkeypress="if(window.event.keyCode==13){applicationLogin.setApplicationLogin()}" value="Jiat2300@@">
                        </td>
                    </tr>
                </table>
                <input type="hidden" id="userEmailSub1" name="id_sub1" value="">
                <input type="hidden" id="userEmailSub2" name="id_sub2" value="">

            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script src="/js/intra/common/securityEncUtil.js?v=1"></script>
<script src="/js/intra/common/aes.js?v=1"></script>
</body>
