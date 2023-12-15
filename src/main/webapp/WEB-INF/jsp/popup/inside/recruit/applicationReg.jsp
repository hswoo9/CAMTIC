<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/applicationReg.js?v=${today}"></script>
<input type="hidden" id="applicationId" value="${params.applicationId}"/>
<input type="hidden" id="recruitAreaInfoSn" value="${params.recruitAreaInfoSn}"/>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">인사정보 등록</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" style= "margin-right:5px;" onclick=""><span>인사정보 등록</span></button>
            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
        </div>
    </div>
    <div id="mainGrid" style="padding: 20px;">
        <table class="popTable table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
            <colgroup>
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th>
                    성명
                </th>
                <td>
                    <span id="userName" name="userName"></span>
                </td>
            </tr>
            <tr>
                <th>
                    부서
                </th>
                <td>
                    <span id="deptName" name="deptName"></span>
                </td>
            </tr>
            </thead>
        </table>

        <table class="popTable table table-bordered mb-0 mt10" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
            <colgroup>
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th>
                    소속
                </th>
                <td>
                    <span>

                    </span>
                </td>
            </tr>
            <tr>
                <th>
                    아이디
                </th>
                <td>
                    <input type="text" id="userId" name="userId">
                </td>
            </tr>
            <tr>
                <th>
                    주민등록번호
                </th>
                <td>
                    <span>

                    </span>
                </td>
            </tr>
            <tr>
                <th>
                    직원구분
                </th>
                <td>
                    <span id="division" name="division"></span>
                </td>
            </tr>
            <tr>
                <th>
                    직급/등급
                </th>
                <td>
                    <span>

                    </span>
                </td>
            </tr>
            <tr>
                <th>
                    직책
                </th>
                <td>
                    <span>

                    </span>
                </td>
            </tr>
            <tr>
                <th>
                    직군
                </th>
                <td>
                    <span>

                    </span>
                </td>
            </tr>
            <tr>
                <th>
                    입사일자
                </th>
                <td>
                    <input type="text" id="joinDay" name="joinDay" style="width:130px">
                </td>
            </tr>
            <tr>
                <th>
                    전직경력
                </th>
                <td>
                    <input type="text" id="careerPeriod" name="careerPeriod" style="width:80px"> 개월
                </td>
            </tr>
            </thead>
        </table>
    </div><!--mainGrid end-->
    </div> <!--col lg 12 end-->

<script>
    applicationReg.fn_defaultScript();
</script>
</body>

