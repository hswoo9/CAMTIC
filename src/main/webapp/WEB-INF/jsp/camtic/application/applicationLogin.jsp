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
<script type="text/javascript" src="/js/camtic/application/applicationLogin.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-md-12 col-lg-12 dash-left" style="padding: 50px;">
    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${params.recruitInfoSn}">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">입사지원</h4>
        </div>

        <div class="panel-body">
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <th style="border-bottom:0; background-color: white">
                            이메일
                        </th>
                        <td>
                            <input type="text" id="userEmail" name="userEmail" onkeypress="if(window.event.keyCode==13){applicationLogin.setApplicationLogin()}" value="deer@naver.com">
                        </td>
                    </tr>
                    <tr>
                        <th style="border-bottom:0; background-color: white">
                            비밀번호
                        </th>
                        <td>
                            <input type="password" id="userPassword" name="userPassword" onkeypress="if(window.event.keyCode==13){applicationLogin.setApplicationLogin()}" value="Jiat2300@@">
                        </td>
                    </tr>
                    <tr>
                        <th style="border-bottom:0; background-color: white">
                            비밀번호 확인
                        </th>
                        <td>
                            <input type="password" id="userPassword2" name="userPassword2" onkeypress="if(window.event.keyCode==13){applicationLogin.setApplicationLogin()}" value="Jiat2300@@">
                        </td>
                    </tr>
                </table>
                <input type="hidden" id="userEmailSub1" name="id_sub1" value="">
                <input type="hidden" id="userEmailSub2" name="id_sub2" value="">
                <div style="text-align: right">
                    <button type="button" onclick="applicationLogin.setApplicationLogin()">입사지원</button>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script src="/js/intra/common/securityEncUtil.js?v=1"></script>
<script src="/js/intra/common/aes.js?v=1"></script>
</body>
