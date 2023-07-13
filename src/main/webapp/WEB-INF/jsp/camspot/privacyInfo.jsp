<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/inside/userManage/userPersonList.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 5px;">개인정보</h4>
            <%--<div>직원조회 목록</div>--%>
            <div class="title-road">캠스팟 > 개인정보관리 &gt; 개인정보</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div class="table-responsive" style="width:500px;">
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="msiInfoId" name="msiInfoId" value="${data.MSI_INFO_ID}">
                <div>
                    <table class="searchTable table table-bordered">
                        <colgroup>
                            <col width="30%">
                            <col width="70%">
                        </colgroup>
                        <tr style="height:40px;">
                            <th>사진</th>
                            <td>
                                <img src="/images/photos/loggeduser1.png" alt="testImages">
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>이름</th>
                            <td>
                                김캠틱
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>비밀번호</th>
                            <td>
                                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">	<span class="k-button-text">비밀번호 변경</span></button>
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>회사</th>
                            <td>
                                대륜산업(주)
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>부서</th>
                            <td>
                                마케팅1팀
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>직위</th>
                            <td>
                                선임
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>사원번호</th>
                            <td>
                                2017027
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>직급</th>
                            <td>
                                계장
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>이메일</th>
                            <td>
                                ykyun@drair.co.kr
                            </td>
                        </tr>
                        <tr style="height:40px;">
                            <th>생년월일</th>
                            <td>
                                1988-01-16
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<%--<jsp:include page="/WEB-INF/jsp/popup/approval/popup/approvalService.jsp?v=${today}"></jsp:include>--%>
<script type="text/javascript">
    userPersonList.init();
</script>