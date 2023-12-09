<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<jsp:useBean id="today" class="java.util.Date" />

<% pageContext.setAttribute("br", "\n"); %>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<%--<script src="/js/intra/common/aes.js?v=1"></script>--%>
<script type="text/javascript" src="<c:url value='/js/intra/common/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>

<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/camtic/application/applicationForm1.js?v=${today}"></script>
<style>
    .__lab {display:inline-flex;gap:0.5rem;align-items:center;margin-right:1.5rem;position:relative;}
    .__lab:last-child {margin-right:0;}
    .__lab input {position:absolute;left:-9999px;top:0;}
    .__lab i {display:block;width:1.2rem;height:1.2rem;border:1px solid #ccc;position:relative;font-style:normal;background-color:#fff;}
    .__lab input[type='radio'] ~ i {border-radius:50%;}
    .__lab input[type='radio'] ~ i:before {content:"";opacity:0;width:1rem;height:1rem;background:#0078ff;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;}
    .__lab input[type='radio']:checked ~ i {border-color:#0078ff;}
    .__lab input[type='radio']:checked ~ i:before {opacity:1;}

    .__lab input[type='checkbox'] ~ i:before {content:"\f2d5";font-family:axicon;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);opacity:0;color:#0078ff;font-size:1.0rem;}
    .__lab input[type='checkbox']:checked ~ i {border-color:#0078ff;}
    .__lab input[type='checkbox']:checked ~ i:before {opacity:1;}
    .__lab span{font-weight: normal; font-size:1.2rem;}

    .__tit1 {margin-bottom:1rem;position:relative;}
    .__tit1 h3 {font-size:1.7rem;font-weight:500;color:#000;letter-spacing:-0.05em;line-height:1.3;}
    .__tit1 > p {font-size:1.5rem;line-height:1.4;margin-top:0.5rem;letter-spacing:-0.03em;}
    .__tit1 .rig {position:absolute;right:0;bottom:0;}

    .__agree .area {border:0.1rem solid #ccc;font-size:1.2rem;line-height:1.8;padding:2rem;letter-spacing:-0.05em;background:#f3f3f3;}
    .__agree .txt {margin-top:2rem;font-size:1.2rem;text-align:center;letter-spacing:-0.05em;line-height:1.5;}
    .__agree .lab {margin-top:1.5rem;font-size:1.6rem;text-align:center;}

    .__sign {text-align:center;}
    .__sign p {font-size:1.6rem;letter-spacing:-0.05em;}
    .__sign dl dt {font-size:2.4rem;letter-spacing:-0.05em;color:#000;margin-top:2rem;}
    .__sign dl dd {font-size:2rem;letter-spacing:-0.05em;margin-top:1.5rem;color:#000;font-weight:500;}
    .__sign .lab {margin-top:1.5rem;font-size:1.6rem;}

    @media all and (max-width:1024px){
        .__agree .area {font-size:1.4rem;line-height:1.6;padding:1.5rem;}
        .__agree .txt {margin-top:1.2rem;font-size:1.3rem;}
        .__agree .lab {margin-top:1rem;font-size:1.4rem;}
    }

    .__tbl {width:100%;border-top:0.2rem solid #2a3278;}
    .__tbl tr > * {padding:1rem;text-align:center;border-bottom:1px solid #ccc;font-size:1.3rem;letter-spacing:-0.03em;line-height:1.3;}
    .__tbl small {font-size:0.9em;color:#aaa;letter-spacing:-0.05em;}
    .__tbl thead tr th {background:#f3f3f3;color:#000;font-weight:normal;}
    .__tbl tbody tr th {background:#f3f3f3;color:#000;font-weight:normal;}
    .__tbl tbody tr td {height:2.9rem;}
    .__tbl .subject {text-align:left;}
    .__tbl .subject a {display:inline-block;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color:#000;}
    .__tbl h2 {font-size:1.8rem;color:#000;font-weight:bold;letter-spacing:-0.05em;}
    .__tbl.fix {table-layout:fixed;}
    .__tbl.line tr > * {border-right:1px solid #ccc;}
    .__tbl.line tr > *:last-child {border-right:none;}

    .__inp{font-size:16px; padding-left:10px;}

    #careerType1 {margin-left:10px;}
    #careerType2 {margin-left:20px;}
    #gender {gap:0px;}
    .k-radio {border-color: #C5C5C5; color:#1A5089 !important;}
    #veterans {gap:0px;}

</style>

<body>
<div id="wrap">
    <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
    <div id="sub">
        <div class="inner">
            <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
            <div id="content">
                <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
                <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
                <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
                <ul id="navigation">
                    <li><a href="/camtic"><img src="/images/camtic/home_3.png" class="homeImage">홈으로</a></li>
                    <li class="">직원과 함께</li>
                    <li class=""><span>채용공고</span></li>
                </ul>
                <div id="title">
                    <h3><span>채용공고</span></h3>
                </div>

                <div class="__tit1">
                    <h3>지원분야</h3>
                    <div class="rig">
                        <p class="__fz15">지원분야 선택은 채용 공고문을 자세히 확인 후 선택 바랍니다.</p>
                    </div>
                </div>

                <table class="__tbl respond2 fix" id="categoryTb">
                    <caption>TABLE</caption>
                    <colgroup>
                        <col width="14%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <%--<th>직무형태 <span class="__red">*</span></th>
                        <td class="tal">
                            <select id="recruitAreaInfoSn" name="recruitAreaInfoSn" class="__inp" onchange="applicationForm.careerType()">
                                <option value="">선택</option>
                            </select>
                        </td>
                        <th>직종별 <span class="__red">*</span></th>
                        <td class="tal">
                            <select name="occupationCode" id="occupationCode" class="__inp">
                                <option value="">선택</option>
                            </select>
                        </td>
                        <th>직급별 <span class="__red">*</span></th>
                        <td class="tal">
                            <select name="positionCode" id="positionCode" class="__inp">
                                <option value="">선택</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>직무분야 <span class="__red">*</span></th>
                        <td colspan="5" class="tal">
                            <select name="workFieldCode" id="workFieldCode" class="__inp">
                                <option value="">선택</option>
                            </select>
                        </td>
                    </tr>--%>
                        <th>지원분야 <span class="__red">*</span></th>
                        <td class="tal">
                            <div id="careerType">
                                <select class="__inp" id="recruitAreaInfoSn" name="recruitAreaInfoSn" style="width:70%;" onchange="applicationForm.careerType()">
                                </select>
                            </div>
                        </td>
                    </tbody>
                </table>

                <div class="__fz15 __mt15">
                    지원분야는 접수 이후 변경 할 수 없습니다.<br>
                    지원분야 선택 오류로 인한 불이익은 캠틱종합기술원에서는 책임지지 않습니다.
                </div>

                <div class="__tit1 __mt60">
                    <h3>인적사항</h3>
                </div>
                <table class="__tbl respond2 fix" style="border-right:1px solid #ddd;">
                    <caption>TABLE</caption>
                    <colgroup>
                        <col width="15%">
                        <col>
                        <col width="17%">
                        <col>
                        <col width="15%">
                        <col>
                        <col width="15%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>성명<span class="__red">*</span></th>
                        <td class="tal" colspan="5">
                            <div>
                                <span>한글: </span><input type="text" class="__inp" id="userName" name="userName" style="width:25%;">
                                <span style="margin-left:20px;">영문: </span><input type="text" class="__inp" id="userNameEn" name="userNameEn" style="width:25%;">
                                <span style="margin-left:20px;">한자: </span><input type="text" class="__inp" id="userNameCn" name="userNameCn" style="width:25%;">
                            </div>
                        </td>
                        <td rowspan="3" style="border-left:1px solid #ddd;">
                            <div>
                                <img id="photoView" width="85px;" height="110px;" style="display:block; margin: 0 auto; cursor:pointer;">
                            </div>
                            <input type="hidden" id="photoFileNo" name="photoFileNo">
                            <label for="photoFile" class="k-button k-button-clear-info k-rounded" style="display:block; vertical-align: bottom; margin:0 auto; margin-top:13px; text-align: center;">파일첨부</label>
                            <input type="file" id="photoFile" name="photoFile" onchange="applicationForm.viewPhoto(this)" style="display: none">
                        </td>
                    </tr>

                    <tr>
                        <th>생년월일<span class="__red">*</span></th>
                        <td class="tal" colspan="2">
                            <input type="text" id="bDay" name="bDay" style="width:276px;">
                                <label class="__lab">
                                    <span style="margin-left:6px;">음력</span>
                                    <input type="checkbox" id="lunarYn" name="lunarYn"><i></i>
                                </label>
                        </td>
                        <th>성별<span class="__red">*</span></th>
                        <td class="tal" colspan="2">
                            <span id="gender" name="gender"></span>
                        </td>
                    </tr>
                    <tr>
                        <th>연락처<span class="__red">*</span></th>
                        <td class="tal" colspan="2">
                            <input type="text" class="__inp" id="telNum" name="telNum" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event); formatPhoneNumber(this);" maxlength="13" placeholder="숫자만 기입 (일반전화)" onblur="formatPhoneNumber(this)">
                        </td>
                        <th>휴대폰<span class="__red">*</span></th>
                        <td class="tal" colspan="2">
                            <input type="text" class="__inp" id="mobileTelNum" name="mobileTelNum" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event); formatMobilePhoneNumber(this);" maxlength="14" placeholder="숫자만 기입 (휴대폰)" onblur="formatPhoneNumber(this)">
                        </td>
                    </tr>

                    <tr>
                        <th>현주소 <span class="__red">*</span></th>
                        <td class="tal" colspan="6">
                            <div>
                                <input type="text" class="__inp" id="zipCode" readonly name="zipCode" style="width:10em;" onclick="applicationForm.addrSearch()">
                                <button type="button" class="k-button k-button-clear-info k-rounded" onclick="applicationForm.addrSearch()">
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
                        <th>이메일 <span class="__red">*</span></th>
                        <td class="tal" colspan="6">
                            <input type="text" class="__inp" id="userEmail2" name="userEmail2" value="${userEmail}">
                        </td>
                    </tr>

                    <tr>
                        <th>취미/특기<span class="__red">*</span></th>
                        <td class="tal" colspan="6">
                            <span>취미 : </span><input type="text" class="__inp" id="hobby" name="hobby" style="width:30%">
                            <span style="margin-left:20px;">특기 : </span><input type="text" class="__inp" id="specialty" name="specialty" style="width:30%">
                        </td>
                    </tr>

                    <tr>
                        <th>보훈대상<span class="__red">*</span></th>
                        <td class="tal" colspan="6" style="line-height: 1.5;">
                            <span id="veterans" name="veterans" style="float:left; margin-right: 30px;"></span>
                            <span>보훈번호 : </span><input type="text" class="__inp" id="veteransNum" name="veteransNum" style="width:60%;">
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="lab" style="margin:20px 0;">
                    <label class="__lab">
                        <input type="checkbox"  id="armiYn" name="armiYn" onclick="applicationForm.checkBoxChk(this)"><i></i>
                        <span style="font-size: 15px">병력사항 미대상 (여성 및 외국인 등)</span>
                    </label>
                </div>

                <div id="armiDiv" style="display: none">
                    <table class="__tbl respond2 fix" style="border-right:1px solid #ddd;">
                        <colgroup>
                            <col width="15%">
                            <col>
                            <col width="15%">
                            <col>
                            <col width="15%">
                            <col>
                        </colgroup>
                        <thead>

                        <tr>
                            <th colspan="6" style="font-size: 14px; font-weight:600;">
                                병력사항
                            </th>
                        </tr>

                        <tr>
                            <th>군별</th>
                            <td colspan="2">
                                <select class="__inp" id="clsftCode" name="clsftCode" style="float:left;">
                                    <option value="">군별선택</option>
                                    <option value="1">미필</option>
                                    <option value="2">면제</option>
                                    <option value="3">군필</option>
                                    <option value="4">특례</option>
                                </select>
                            </td>
                            <th>병역구분</th>
                            <td colspan="2">
                                <select class="__inp" name="militarySvcType" id="militarySvcType" style="float:left;">
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
                            <td colspan="2">
                                <input type="text" id="mEnlistDay" name="mEnlistDay" style="float:left; width:276px;">
                            </td>
                            <th>제대일</th>
                            <td colspan="2">
                                <input type="text" id="mDishargeDay" name="mDishargeDay" style="float:left; width:276px;">
                            </td>
                        </tr>
                        <tr>
                            <th>계급</th>
                            <td colspan="2">
                                <input type="text" class="__inp" id="rank" name="rank" style="float:left;">
                            </td>
                            <th>병과</th>
                            <td colspan="2">
                                <input type="text" class="__inp" id="etc" name="etc" style="float:left;">
                            </td>
                        </tr>
                        <tr>
                            <th>면제사유</th>
                            <td colspan="5">
                                <input type="text" class="__inp" id="mUnfulReason" name="mUnfulReason" style="float:left;">
                            </td>
                        </tr>
                        <tr>
                            <th>증빙파일</th>
                            <td colspan="5">
                                <input type="hidden" id="armiFileNo" name="armiFileNo">
                                <span id="armiFileName"></span>
                                <label for="armiFile" class="k-button k-button-clear-info k-rounded" style="float:left; vertical-align: bottom;margin:0;">파일첨부</label>
                                <input type="file" id="armiFile" name="armiFile" style="display: none" onchange="applicationForm.getFileName(this)">
                            </td>
                        </tr>
                        </thead>
                    </table>
                </div>

                <div class="__botArea">
                    <div style="text-align: center;">
                        <a href="/camtic/member/job.do" class="__btn1 blue" style="width:200px;"><span>취소</span></a>
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplicationTempSave('temp')"><span>임시저장</span></a>
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplicationTempSave('next')"><span>다음단계</span></a>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>

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
    }

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
    }

    function onlyNumber(event) {
        const key = event.keyCode;
        return (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 8 || key == 9 || key == 37 || key == 39 || key == 46;
    }

    function removeChar(event) {
        const key = event.keyCode;
        if (key == 8 || key == 46) {
            return;
        }
        const input = event.target;
        let value = input.value;
        value = value.replace(/-/g, '');
        input.value = value;
    }

    function setApplicationTempSave(type){
        if(type == "next"){
            if($("input[name='careerType']:checked").val() == null){
                alert("지원분야를 선택해주세요.");
                return;
            }else if(!$("#userName").val()){
                alert("이름(한글)을 입력해주세요.");
                $("#userName").focus();
                return;
            }else if(!$("#userNameEn").val()){
                alert("이름(영문)을 입력해주세요.");
                $("#userNameEn").focus();
                return;
            }else if(!$("#userNameCn").val()){
                alert("이름(한자)을 입력해주세요.");
                $("#userNameCn").focus();
                return;
            }else if(!$("#gender").data("kendoRadioGroup").value()){
                alert("성별을 선택해주세요.");
                return;
            }else if(!$("#telNum").val()){
                alert("연락처를 입력해주세요.");
                $("#telNum").focus();
                return;
            }else if(!$("#mobileTelNum").val()){
                alert("휴대폰을 입력해주세요.");
                $("#mobileTelNum").focus();
                return;
            }else if(!$("#zipCode").val()){
                alert("우편번호를 입력해주세요.");
                $("#zipCode").click();
                return;
            }else if(!$("#addr").val()){
                alert("주소를 입력해주세요.");
                $("#addr").click();
                return;
            }else if(!$("#userEmail2").val()){
                alert("이메일을 입력해주세요.");
                $("#userEmail2").focus();
                return;
            }else if(!$("#hobby").val()){
                alert("취미를 입력해주세요.");
                $("#hobby").focus();
                return;
            }else if(!$("#specialty").val()) {
                alert("특기를 입력해주세요.");
                $("#specialty").focus();
                return;
            }else if(!$("#gender").data("kendoRadioGroup").value()) {
                alert("보훈대상여부를 선택해주세요.");
                return;
            }

            if(!$("#photoFileNo").val() && $("#photoFile")[0].files.length == 0){
                alert("증명사진을 선택해주세요.");
                return;
            }

            if($("#gender").data("kendoRadioGroup").value() == "Y"){
                if(!$("#veteransNum").val()){
                    alert("보훈번호를 입력해주세요");
                    $("#veteransNum").focus();
                    return;
                }
            }

            if(!$("#armiYn").is(":checked")){
                if(!$("#clsftCode").val()){
                    alert("군별을 선택해주세요");
                    return;
                }

                if($("#clsftCode").val() != "2" && $("#clsftCode").val() !== "1"){
                    if(!$("#militarySvcType").val()){
                        alert("병역구분을 선택해주세요");
                        return;
                    }else if(!$("#rank").val()){
                        alert("계급을 입력해주세요");
                        $("#rank").focus();
                        return;
                    }else if(!$("#etc").val()){
                        alert("병과를 입력해주세요");
                        $("#etc").focus();
                        return;
                    }
                }else if($("#clsftCode").val() == "2"){
                    if(!$("#mUnfulReason").val()){
                        alert("면제사유를 입력해주세요.");
                        $("#mUnfulReason").focus();
                        return;
                    }
                }

                if((!$("#armiFileNo").val() && $("#armiFile")[0].files.length == 0)&& $("#clsftCode").val() !== "1"){
                    alert("증빙파일을 선택해주세요.");
                    return;
                }


            }
            if (!$("#telNum").val() || $("#telNum").val().replace(/\D/g, '').length < 9) {
                alert("연락처의 양식이 잘못되었습니다.");
                $("#telNum").focus();
                return;
            }
            if (!$("#mobileTelNum").val() || $("#mobileTelNum").val().replace(/\D/g, '').length < 10) {
                alert("휴대폰 번호의 양식이 잘못되었습니다.");
                $("#mobileTelNum").focus();
                return;
            }
        }

        var confirmText = "";
        if(type == "temp"){
            confirmText = "임시저장 하시겠습니까?";
        }else{
            confirmText = "다음 단계로 이동 하시겠습니까?";
        }

        if(confirm(confirmText)){
            var formData = new FormData();
            var genderValue = $("#gender").data("kendoRadioGroup").value();
            var veteransValue = $("#veterans").data("kendoRadioGroup").value();

            formData.append("applicationId", $("#applicationId").val());
            formData.append("recruitInfoSn", $("#recruitInfoSn").val());
            formData.append("recruitAreaInfoSn", $("#recruitAreaInfoSn").val());
            formData.append("careerType", $("input[name='careerType']:checked").val());

            formData.append("userEmail", $("#userEmail2").val());
            formData.append("userName", $("#userName").val());
            formData.append("userNameEn", $("#userNameEn").val());
            formData.append("userNameCn", $("#userNameCn").val());
            formData.append("bDay", $("#bDay").val());
            formData.append("lunarYn", $("#lunarYn").is(":checked") ? "Y" : "N");
            //formData.append("gender", $("#gender").data("kendoRadioGroup").value());
            formData.append("gender", genderValue !== undefined ? genderValue : "");
            formData.append("photoFile", $("#photoFile")[0].files[0]);
            formData.append("telNum", $("#telNum").val());
            formData.append("mobileTelNum", $("#mobileTelNum").val());
            formData.append("zipCode", $("#zipCode").val());
            formData.append("addr", $("#addr").val());
            formData.append("addrDetail", $("#addrDetail").val());


            formData.append("hobby", $("#hobby").val());
            formData.append("specialty", $("#specialty").val());
            //formData.append("veterans", $("#veterans").data("kendoRadioGroup").value());
            formData.append("veterans", veteransValue !== undefined ? veteransValue : "");

            formData.append("armiYn", !$("#armiYn").is(":checked") ? "Y" : "N");
            if(!$("#armiYn").is(":checked")){
                formData.append("clsftCode", $("#clsftCode").val());
                if($("#clsftCode").val() != "2"){
                    formData.append("militarySvcType", $("#militarySvcType").val());
                    formData.append("mEnlistDay", $("#mEnlistDay").val());
                    formData.append("mDishargeDay", $("#mDishargeDay").val());
                    formData.append("rank", $("#rank").val());
                    formData.append("etc", $("#etc").val());
                }else if($("#clsftCode").val() == "2"){
                    formData.append("mUnfulReason", $("#mUnfulReason").val());
                }

                formData.append("armiFile", $("#armiFile")[0].files[0]);
            }
            console.log("userName : "+formData.get("userName"));
            console.log("gender : "+formData.get("gender"));
            var result = customKendo.fn_customFormDataAjax("/application/setApplicationForm1.do", formData);
            if(result.flag){
                if(type == "temp"){
                    alert("임시저장 되었습니다.");
                    location.href = "/camtic/member/job_applicationForm1.do?applicationId=" + result.params.applicationId;
                }else{
                    location.href = "/camtic/member/job_applicationForm2.do?applicationId=" + result.params.applicationId + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
                }
            }
        }
    }
</script>