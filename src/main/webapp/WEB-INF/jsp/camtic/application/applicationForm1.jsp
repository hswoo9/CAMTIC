<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/camtic/application/applicationForm1.js?v=${today}"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/postcode.v2.js?autoload=false'/>"></script>
<style>
    .__inp {
        padding-left: 10px;
        display: inline-block;
        width: 100%;
        height: 40px;
        border: 1px solid #ddd;
        font-size: 14px;
    }
</style>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:1050px; height: 850px; padding:0;">
    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
    <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
    <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${params.regEmpSeq}">
    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">입사지원 수정</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-primary" onclick="applicationForm.setApplicationMod('next')">수정</button>
            <button type="button" class="k-button k-button-solid-info" onclick="applicationForm.setApplicationNext()">다음단계</button>
            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div style="padding: 20px">
        <table class="popTable table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
            <colgroup>
                <col width="14%">
            </colgroup>
            <thead>
            <tr>
                <th>
                    지원분야
                </th>
                <td>
                    <div id="careerType">
                        <select id="recruitAreaInfoSn" class="__inp" name="recruitAreaInfoSn" onchange="applicationForm.careerType()">
                        </select>
                    </div>
                </td>
            </tr>
            </thead>
        </table>
        <div>
            <table class="popTable table table-bordered mb-0 mt10">
                <colgroup>
                    <col width="14%">
                    <col width="28%">
                    <col width="14%">
                    <col width="28%">
                    <col width="16%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="5" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">인적사항</th>
                </tr>
                <tr>
                    <th>
                        이름
                    </th>
                    <td colspan="3">
                        한글: <input type="text" id="userName" class="__inp" style="width: 25%" name="userPassword">
                        영문: <input type="text" id="userNameEn" class="__inp" style="width: 25%" name="userPassword">
                        한자: <input type="text" id="userNameCn" class="__inp" style="width: 25%" name="userPassword">
                    </td>
                    <td rowspan="3">
                        <div>
                            <img id="photoView" width="85px;" height="110px;" style="display:block; margin: 0 auto; cursor:pointer;">
                        </div>
                        <input type="hidden" id="photoFileNo" name="photoFileNo">
                        <label for="photoFile" class="k-button k-button-clear-info k-rounded" style="display:block; vertical-align: bottom; margin:0 auto; margin-top:13px; text-align: center;">파일첨부</label>
                        <input type="file" id="photoFile" name="photoFile" onchange="applicationForm.viewPhoto(this)" style="display: none">
                    </td>
                </tr>
                <tr>
                    <th>
                        생년월일
                    </th>
                    <td>
                        <input type="text" id="bDay" name="bDay" style="width: 60%">
                        음력<input type="checkbox" id="lunarYn" name="lunarYn" style="vertical-align: middle; margin-left: 3px;">
                    </td>
                    <th>
                        성별
                    </th>
                    <td>
                        <span id="gender" name="gender"></span>
                    </td>

                </tr>
                <tr>
                    <th>연락처</th>
                    <td>
                        <input type="text" class="__inp" id="telNum" name="telNum" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event); formatPhoneNumber(this);" maxlength="13" placeholder="숫자만 기입 (일반전화)" onblur="formatPhoneNumber(this)">
                    </td>
                    <th>휴대폰</th>
                    <td>
                        <input type="text" class="__inp" id="mobileTelNum" name="mobileTelNum" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event); formatMobilePhoneNumber(this);" maxlength="14" placeholder="숫자만 기입 (휴대폰)" onblur="formatPhoneNumber(this)">
                    </td>
                </tr>
                <tr>
                    <th>현주소</th>
                    <td class="tal" colspan="4">
                        <div>
                            <input type="text" class="__inp" id="zipCode" readonly name="zipCode" style="width:10em;" onclick="applicationForm.addrSearch()">
                            <button type="button" class="__btn3 black k-button" onclick="applicationForm.addrSearch()">
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
                        <input type="text" class="__inp" id="userEmail2" name="userEmail2" value="${userEmail}">
                    </td>
                </tr>
                <tr>
                    <th>취미/특기</th>
                    <td colspan="4">
                        취미 <input type="text" class="__inp" style="width: 40%" id="hobby" name="hobby">
                        특기 <input type="text" class="__inp" style="width: 40%" id="specialty" name="specialty">
                    </td>
                </tr>
                <tr>
                    <th>보훈대상</th>
                    <td colspan="4">
                        <span id="veterans" name="veterans" style="float:left; margin-right: 30px;"></span>
                        <div style="margin-left: 30px;">
                            보훈번호 <input type="text" id="veteransNum" name="veteransNum">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        인적성검사문서
                    </th>
                    <td colspan="4">
                        <input type="hidden" id="fileChange" name="fileChange" value="N">
                        <span id="fileName" style="position: relative; top: -5px; left: 5px;"></span>
                        <label for="file" class="k-button k-button-clear-info k-rounded mngBtn" style="margin-left:10px; vertical-align: bottom;">파일첨부</label>
                        <input type="file" id="file" name="file" style="display: none;" onchange="applicationForm.getFileName123(this)">
                        <%--<button type="button" class="k-button k-button-solid-info mngBtn" style="margin-left:10px;" onclick="applicationForm.fileSave(this)">저장</button>--%>
                    </td>
                </tr>
            </table>
        </div>


        <input type="checkbox" id="armiYn" name="armiYn" onclick="applicationForm.checkBoxChk(this)">
        <span style="padding-left: 5px; font-size: 12px">병역사항 미대상 (여성 및 외국인 등)</span>

        <div id="armiDiv" style="display: none">
            <table class="popTable table table-bordered mb-0 mt10 text-center">
                <colgroup>
                    <col width="15%">
                    <col>
                    <col width="15%">
                </colgroup>
                <thead>

                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                        병역사항
                    </th>
                </tr>

                <tr>
                    <th>군별</th>
                    <td>
                        <select id="clsftCode" class="__inp" name="clsftCode" style="float:left;">
                            <option value="">군별선택</option>
                            <option value="1">미필</option>
                            <option value="2">면제</option>
                            <option value="3">군필</option>
                            <option value="4">특례</option>
                        </select>
                    </td>
                    <th>병역구분</th>
                    <td>
                        <select name="militarySvcType" class="__inp" id="militarySvcType" style="float:left;">
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
                        <input type="text" id="mEnlistDay" name="mEnlistDay" style="float:left;">
                    </td>
                    <th>제대일</th>
                    <td>
                        <input type="text" id="mDishargeDay" name="mDishargeDay" style="float:left;">
                    </td>
                </tr>
                <tr>
                    <th>계급</th>
                    <td>
                        <input type="text" class="__inp" id="rank" name="rank" style="float:left;">
                    </td>
                    <th>병과</th>
                    <td>
                        <input type="text" class="__inp" id="etc" name="etc" style="float:left;">
                    </td>
                </tr>
                <tr>
                    <th>면제사유</th>
                    <td colspan="4">
                        <input type="text" class="__inp" id="mUnfulReason" name="mUnfulReason" style="float:left;">
                    </td>
                </tr>
                <tr>
                    <th>증빙파일</th>
                    <td colspan="4">
                        <input type="hidden" id="armiFileNo" name="armiFileNo">
                        <span id="armiFileName"></span>
                        <label for="armiFile" class="k-button k-button-clear-info k-rounded" style="float:left; vertical-align: bottom;margin:0;">파일첨부</label>
                        <input type="file" id="armiFile" name="armiFile" style="display: none" onchange="applicationForm.getFileName(this)">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
        <!--
        <div style="text-align: right">
            <button class="__btn1 gray" onclick="window.close()"><span>취소</span></button>
            <button class="__btn1 black" onclick="applicationForm.setApplicationTempSave('temp')"><span>임시저장</span></button>
            <button class="__btn1 blue" onclick="applicationForm.setApplicationTempSave('next')"><span>다음단계</span></button>
        </div>
        -->
    </div>
</div><!-- col-md-9 -->
<script>
    applicationForm.fn_defaultScript();
    $("#armiDiv").show();

    function formatPhoneNumber(input) {
        let digits = input.value.replace(/\D/g, '');
        var tmp = digits.substring(0,2);

        if (digits.length === 9) {
            let formattedNumber = digits.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }else if(digits.length === 10 && tmp === '02'){
            let formattedNumber = digits.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        } else if (digits.length === 10) {
            let formattedNumber = digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }else if(digits.length === 11){
            let formattedNumber = digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }

        if (digits.length >= 12) {
            input.value = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
        }
    };

    function  formatMobilePhoneNumber(input) {
        let digits = input.value.replace(/\D/g, '');
        if(digits.length === 10){
            let formattedNumber = digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }else if (digits.length === 11) {
            let formattedNumber = digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            input.value = formattedNumber;
        }

        if (digits.length >= 12) {
            input.value = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
        }
    };

    function onlyNumber(event) {
        const key = event.keyCode;
        return (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 8 || key == 9 || key == 37 || key == 39 || key == 46;
    };

    function removeChar(event) {
        const key = event.keyCode;
        if (key == 8 || key == 46) {
            return;
        }
        const input = event.target;
        let value = input.value;
        value = value.replace(/-/g, '');
        input.value = value;
    };

</script>
</body>
