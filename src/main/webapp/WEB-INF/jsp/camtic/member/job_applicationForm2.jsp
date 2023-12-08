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
<script type="text/javascript" src="/js/camtic/application/applicationForm2.js?v=${today}"></script>
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

    /*input[type="text"] {
        width: 50%;
        height: 34px;
        display: inline-block;
        background: none;
        border: 1px solid #ddd; text-align:center; display: inline-block;
        padding-left: 10px;
        font-size: 16px;
    }*/

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
                <input type="hidden" id="recruitAreaInfoSn" name="recruitAreaInfoSn" value="${params.recruitAreaInfoSn}">
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
                        <th>지원분야</th>
                        <td class="tal">
                            <span id="recruitAreaInfoSnTxt"></span>
                        </td>
                    </tbody>
                </table>

                <%--<div class="__btWrap rig __mt10" style="text-align: right; margin-right: 10px; margin-top: 10px; margin-bottom:10px;">
                    <button type="button"  class="k-button k-button-solid-info" onclick="applicationForm2.addSchoolRow()"><span>추가</span></button>
                </div>--%>

                <div class="__tit1">
                    <h3>학력사항</h3>
                    <button type="button" class="k-button k-button-solid-info" style="float:right; margin-bottom:10px;" onclick="applicationForm2.addSchoolRow()"><span>추가</span></button>
                </div>

                <table class="__tbl respond2 fix" >
                    <colgroup>
                        <col width="12%">
                        <col width="35%">
                        <col width="11%">
                        <col width="12%">
                        <col width="12%">
                        <col width="10%">
                        <col width="7%">
                        <col width="10%">
                        <col width="10%">
                        <col width="8%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>구분</th>
                        <th>기간</th>
                        <th>학교명</th>
                        <th>학과</th>
                        <th>전공</th>
                        <th>졸업</th>
                        <th>평점</th>
                        <th>학위 증빙</th>
                        <th>성적 증빙</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody id="schoolTb">
                    <tr class="schoolInfo" id="school0">
                        <td class="tac">
                            <input type="hidden" id="schoolBaseId0" name="schoolBaseId0" class="schoolBaseId">
                            <select id="schoolType" class="schoolType" style="width:100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                                <option value="">선택</option>
                                <option value="1">고등학교</option>
                                <option value="2">전문대학</option>
                                <option value="3">대학교1</option>
                                <option value="4">대학교2</option>
                                <option value="5">대학원(석사)</option>
                                <option value="6">대학원(박사)</option>
                            </select>
                        </td>
                        <td class="tac">
                            <input type="text" id="admissionDt0" class="admissionDt" style="width: 150px"> ~
                            <input type="text" id="graduationDt0" class="graduationDt" style="width: 150px">
                        </td>
                        <td class="tac">
                            <input type="text" id="schoolName0" class="schoolName" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                        </td>
                        <td class="tac">
                            <input type="text" id="dept0" class="dept" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                        </td>
                        <td class="tac">
                            <input type="text" id="major0" class="major" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                        </td>
                        <td class="tac">
                            <select id="graduateType0" class="graduateType" style="width:70px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                                <option value="">선택</option>
                                <option value="1">졸업</option>
                                <option value="2">졸업예정</option>
                                <option value="3">수료</option>
                            </select>
                        </td>
                        <td class="tac">
                            <input type="text" id="grade0" class="grade" style="width:50px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block; ">
                        </td>
                        <td class="tac" style="line-height: 0.1;">
                            <input type="hidden" id="degreeFileNo0" class="degreeFileNo" name="degreeFileNo0">
                            <label for="degreeFile0" class="degreeFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                            <input type="text" id="degreeFileName0" class="degreeFileName" style="width: 80px; height:10px; font-size:12px; margin-bottom:-14px; color:#337ab7;">
                            <input type="file" id="degreeFile0" name="degreeFile0" class="degreeFile" style="display: none" onchange="applicationForm2.getFileName(this)">
                        </td>
                        <td class="tac" style="line-height: 0.1;">
                            <input type="hidden" id="sexualFileNo0" class="sexualFileNo" name="sexualFileNo0">
                            <label for="sexualFile0" class="sexualFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                            <input type="text" id="sexualFileName0" class="sexualFileName" style="width: 80px; height:10px; font-size:12px; margin-bottom:-14px; color:#337ab7;">
                            <input type="file" id="sexualFile0" class="sexualFile" name="sexualFile0" style="display: none" onchange="applicationForm2.getFileName(this)">
                        </td>
                        <td class="tac">
                            <button type="button" class="k-button k-button-solid-error" onClick="applicationForm2.delRow('schoolInfo', this)"><span>삭제</span></button>
                        </td>
                    </tr>
                    </tbody>
                </table>


                <div id="careerDiv" style="width:1270px;">
                    <%--<div class="__btWrap rig __mt10" style="text-align: right; margin-right: 10px; margin-top: 10px;">
                        <button type="button"  class="k-button k-button-solid-info" onclick="applicationForm2.addCareerRow()"><span>추가</span></button>
                    </div>--%>

                    <div class="__tit1">
                        <h3>경력사항</h3>
                        <button type="button"  class="k-button k-button-solid-info" style="float:right; margin-bottom:10px;" onclick="applicationForm2.addCareerRow()"><span>추가</span></button>
                    </div>
                    <table class="__tbl respond2 fix" id="careerInfo0">
                        <colgroup>
                            <col width="12%">
                            <col width="35%">
                            <col width="12%">
                            <col width="12%">
                            <col width="11%">
                            <col width="20%">
                            <col width="10%">
                            <col width="8%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>근무처</th>
                            <th>근무기간</th>
                            <th>직위</th>
                            <th>담당업무</th>
                            <th>퇴직시연봉</th>
                            <th>퇴직사유</th>
                            <th>경력 증빙</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody id="careerTb">
                        <tr class="careerInfo" id="career0">
                            <td class="tac">
                                <input type="hidden" id="careerBaseId0" name="careerBaseId0" class="careerBaseId">
                                <input type="text" id="careerOrgName0" class="careerOrgName" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                            </td>
                            <td class="tac">
                                <input type="text" id="workStDt0" class="workStDt period" style="width: 150px"> ~
                                <input type="text" id="workEnDt0" class="workEnDt period" style="width: 150px">
                            </td>
                            <td class="tac">
                                <input type="text" id="position0" class="position" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                            </td>
                            <td class="tac">
                                <input type="text" id="chargeWork0" class="chargeWork" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                            </td>
                            <td class="tac">
                                <input type="text" id="retireSalary0" class="retireSalary" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                            </td>
                            <td class="tac">
                                <input type="text" id="retireReason0" class="retireReason" style="width: 150px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block; ">
                            </td>
                            <td style="line-height: 0.01;">
                                <input type="hidden" id="careerFileNo0" name="careerFileNo0" class="careerFileNo">
                                <label for="careerFile0" class="careerFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                                <input type="text" id="careerFileName0" class="careerFileName" style="width: 80px; height:10px; font-size:12px; margin-bottom:-14px; color:#337ab7;">
                                <input type="file" id="careerFile0" class="careerFile" name="careerFile0" style="display: none" onchange="applicationForm2.getFileName(this)">
                            </td>
                            <td class="tac">
                                <button type="button" class="k-button k-button-solid-error" onclick="applicationForm2.delRow('careerInfo', this)"><span>삭제</span></button>
                            </td>
                        </tr>
                        <tr id="career0_1" class="careerInfo_1">
                            <th>담당업무 세부사항</th>
                            <td class="tal" colspan="7">
                                <textarea id="careerContent0" class="careerContent" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="__botArea">
                    <div style="text-align: center;">
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplicationTempSave('prev')"><span>이전단계</span></a>
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
    applicationForm2.fn_defaultScript();

    function setApplicationTempSave(type){
        if(type == "prev"){
            location.href = "/camtic/member/job_applicationForm1.do?applicationId=" + $("#applicationId").val() ;
        }else{
            if(type == "next"){
                var flag = true;
                var highSchoolFlag = false;
                $.each($(".schoolInfo"), function(i, v){
                    if($(this).find("#schoolType").val() != "" && $(this).find("#schoolType").val() != "1"){
                        if(!$(this).find("#degreeFileNo" + i).val() && $("#degreeFile" + i)[0].files.length == 0 && type == "next") {
                            flag = false;
                        }else if(!$(this).find("#sexualFileNo" + i).val() && $("#sexualFile" + i)[0].files.length == 0 && type == "next") {
                            flag = false;
                        }

                        if(!flag){
                            alert("증빙파일은 필수사항입니다.");
                            return flag;
                        }
                    }

                    if($(this).find("#schoolType").val() == "1"){
                        highSchoolFlag = true;
                    }
                })

                if(!highSchoolFlag){
                    alert("고등학교 학력은 필수사항입니다.");
                    return highSchoolFlag;
                }

                if(!flag){
                    return;
                }


                $.each($(".careerInfo"), function(i, v){
                    if($(this).find("#careerOrgName" + i).val() != ""){
                        if(!$(this).find("#careerFileNo" + i).val() && $("#careerFile" + i)[0].files.length == 0 && type == "next") {
                            flag = false;
                        }

                        if(!flag){
                            alert("경력 증빙파일은 필수사항입니다.");
                            return flag;
                        }
                    }
                })

                if(!flag){
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
                var schoolArr = new Array();
                $.each($(".schoolInfo"), function(i, v){
                    if($(this).find("#schoolType").val() != ""){
                        var arrData = {
                            schoolBaseId : $(this).find("#schoolBaseId" + i).val(),
                            applicationId : $("#applicationId").val(),
                            schoolType : $(this).find("#schoolType").val(),
                            admissionDt : $(this).find("#admissionDt" + i).val(),
                            graduationDt : $(this).find("#graduationDt" + i).val(),
                            schoolName : $(this).find("#schoolName" + i).val(),
                            dept : $(this).find("#dept" + i).val(),
                            major : $(this).find("#major" + i).val(),
                            graduateType : $(this).find("#graduateType" + i).val(),
                            grade : $(this).find("#grade" + i).val(),
                            userEmail : $("#userEmail").val(),
                            degreeFileNo : $(this).find("#degreeFileNo" + i).val(),
                            sexualFileNo : $(this).find("#sexualFileNo" + i).val(),
                        }

                        if($(this).find("#degreeFile" + i)[0].files.length != 0){
                            formData.append("degreeFile" + i, $(this).find("#degreeFile" + i)[0].files[0]);
                        }

                        if($(this).find("#sexualFile" + i)[0].files.length != 0){
                            formData.append("sexualFile" + i, $(this).find("#sexualFile" + i)[0].files[0]);
                        }

                        schoolArr.push(arrData);
                    }
                })

                var careerArr = new Array();
                $.each($(".careerInfo"), function(i, v){
                    if($(this).find("#careerOrgName" + i).val() != ""){
                        var arrData = {
                            careerBaseId : $(this).find("#careerBaseId" + i).val(),
                            applicationId : $("#applicationId").val(),
                            careerOrgName : $(this).find("#careerOrgName" + i).val(),
                            workStDt : $(this).find("#workStDt" + i).val(),
                            workEnDt : $(this).find("#workEnDt" + i).val(),
                            position : $(this).find("#position" + i).val(),
                            chargeWork : $(this).find("#chargeWork" + i).val(),
                            retireSalary : $(this).find("#retireSalary" + i).val(),
                            retireReason : $(this).find("#retireReason" + i).val(),
                            careerContent : $("#careerContent" + i).val(),
                            userEmail : $("#userEmail").val(),
                            careerFileNo : $(this).find("#careerFileNo" + i).val(),
                        }

                        if($(this).find("#careerFile" + i)[0].files.length != 0){
                            formData.append("careerFile" + i, $(this).find("#careerFile" + i)[0].files[0]);
                        }

                        careerArr.push(arrData);
                    }
                })

                formData.append("applicationId", $("#applicationId").val());
                formData.append("schoolArr", JSON.stringify(schoolArr));
                formData.append("careerArr", JSON.stringify(careerArr));
                formData.append("userEmail", $("#userEmail").val());

                var result = customKendo.fn_customFormDataAjax("/application/setApplicationForm2.do", formData);
                if(result.flag){
                    if(type == "temp"){
                        alert("임시저장 되었습니다.");
                        location.reload();
                    }else{
                        location.href = "/camtic/member/job_applicationForm3.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
                    }
                }
            }
        }
    }

</script>