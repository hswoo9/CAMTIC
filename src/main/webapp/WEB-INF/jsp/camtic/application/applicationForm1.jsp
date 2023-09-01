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
<script type="text/javascript" src="/js/camtic/application/applicationForm1.js?v=${today}"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/postcode.v2.js?autoload=false'/>"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-md-12 col-lg-12 dash-left pop_sign_wrap" style="width:950px;padding: 50px;">
    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
    <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">캠틱 온라인 입사지원</h4>
        </div>

        <div class="panel-body">
            <div>
                <h4>인적사항</h4>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <th style="border-bottom:0; background-color: white">
                            지원분야
                        </th>
                        <td colspan="4">
                            <select id="recruitAreaInfoSn" name="recruitAreaInfoSn">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th style="border-bottom:0; background-color: white">이름</th>
                        <td>
                            한글 <input type="text" id="userName" name="userPassword">
                        </td>
                        <td>
                            영문 <input type="text" id="userNameEn" name="userPassword">
                        </td>
                        <td>
                            한자 <input type="text" id="userNameCn" name="userPassword">
                        </td>
                        <th>증명사진</th>
                    </tr>
                    <tr>
                        <th style="border-bottom:0; background-color: white">생년월일</th>
                        <td>
                            <input type="text" id="bDay" name="bDay">
                            <input type="checkbox" id="lunarYn" name="lunarYn">
                        </td>
                        <th style="border-bottom:0; background-color: white">성별</th>
                        <td>
                            <span id="gender" name="gender"></span>
                        </td>
                        <td rowspan="3">
                            <div>
                                <img id="photoView" width="100px;" height="120px;" style="cursor:pointer;">
                            </div>
                            <input type="hidden" id="photoFileNo" name="photoFileNo">
                            <label for="photoFile" class="k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0; margin-top:13px;">파일첨부</label>
                            <input type="file" id="photoFile" name="photoFile" onchange="applicationForm.viewPhoto(this)" style="display: none">
                        </td>
                    </tr>
                    <tr>
                        <th style="border-bottom:0; background-color: white">연락처</th>
                        <td>
                            <input type="text" id="telNum" name="telNum"  onkeydown="return onlyNumber(event)" onkeyup="removeChar(event);telFilter(this)" maxlength="13" placeholder="숫자만 기입 (일반전화)">
                        </td>
                        <th style="border-bottom:0; background-color: white">휴대폰</th>
                        <td>
                            <input type="text" id="mobileTelNum" name="mobileTelNum" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event);telFilter(this)" maxlength="14" placeholder="숫자만 기입 (휴대폰)">
                        </td>
                    </tr>
                    <tr>
                        <th>현주소</th>
                        <td class="tal" colspan="3">
                            <div>
                                <input type="text" class="__inp" id="zipCode" readonly name="zipCode" style="width:10em;" onclick="applicationForm.addrSearch()">
                                <button type="button" class="__btn3 black" onclick="applicationForm.addrSearch()">
                                    <span>주소찾기</span>
                                </button>
                            </div>
                            <div class="__mt10">
                                <input type="text" class="__inp" id="addr" readonly name="addr"  onclick="applicationForm.addrSearch()" placeholder="도로명 주소">
                            </div>
                            <div class="__mt10">
                                <input type="text" class="__inp" id="addrDetail" name="addrDetail" placeholder="상세주소">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td colspan="4">
                            <input type="text" id="userEmail2" name="userEmail2" value="${userEmail}">
                        </td>
                    </tr>
                    <tr>
                        <th>취미/특기</th>
                        <td colspan="4">
                            취미 <input type="text" id="hobby" name="hobby">
                            특기 <input type="text" id="specialty" name="specialty">
                        </td>
                    </tr>
                    <tr>
                        <th>보훈대상</th>
                        <td colspan="4">
                            <span id="veterans" name="veterans" style="float:left;"></span>
                            <div>
                                보훈번호 <input type="text" id="veteransNum" name="veteransNum">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <h4>
                병역사항
                <input type="checkbox" id="armiYn" name="armiYn" onclick="applicationForm.checkBoxChk(this)"><span style="font-size: 12px">미대상 (여성 및 외국인 등)</span>
            </h4>

            <div id="armiDiv" style="display: none">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <th>군별</th>
                        <td>
                            <select id="clsftCode" name="clsftCode">
                                <option value="">군별선택</option>
                                <option value="1">미필</option>
                                <option value="2">면제</option>
                                <option value="3">군필</option>
                                <option value="4">특례</option>
                            </select>
                        </td>
                        <th>병역구분</th>
                        <td>
                            <select name="militarySvcType" id="militarySvcType">
                                <option value="">병역구분 선택</option>
                                <option value="1">육군</option>
                                <option value="2">공군</option>
                                <option value="3">해군</option>
                                <option value="4">해병대</option>
                                <option value="5">전/의경</option>
                                <option value="6">공익</option>
                                <option value="7">상근</option>
                                <option value="8">카투사</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>입대일</th>
                        <td>
                            <input type="text" id="mEnlistDay" name="mEnlistDay">
                        </td>
                        <th>제대일</th>
                        <td>
                            <input type="text" id="mDishargeDay" name="mDishargeDay">
                        </td>
                    </tr>
                    <tr>
                        <th>계급</th>
                        <td>
                            <input type="text" id="rank" name="rank">
                        </td>
                        <th>병과</th>
                        <td>
                            <input type="text" id="etc" name="etc">
                        </td>
                    </tr>
                    <tr>
                        <th>면제사유</th>
                        <td colspan="4">
                            <input type="text" id="mUnfulReason" name="mUnfulReason">
                        </td>
                    </tr>
                    <tr>
                        <th>증빙파일</th>
                        <td colspan="4">
                            <input type="hidden" id="armiFileNo" name="armiFileNo">
                            <span id="armiFileName"></span>
                            <label for="armiFile" class="k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                            <input type="file" id="armiFile" name="armiFile" style="display: none" onchange="applicationForm.getFileName(this)">
                        </td>
                    </tr>
                </table>
            </div>
            <div style="text-align: right">
                <button class="__btn1 gray" onclick="window.close()"><span>취소</span></button>
                <button class="__btn1 black" onclick="applicationForm.setApplicationTempSave('temp')"><span>임시저장</span></button>
                <button class="__btn1 blue" onclick="applicationForm.setApplicationTempSave('next')"><span>다음단계</span></button>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    applicationForm.fn_defaultScript();
</script>
</body>
