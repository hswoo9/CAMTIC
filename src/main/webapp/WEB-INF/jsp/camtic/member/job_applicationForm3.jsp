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
<script type="text/javascript" src="/js/camtic/application/applicationForm3.js?v=${today}"></script>
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

               <%-- <div class="__btWrap rig __mt10" style="text-align: right; margin-right: 10px; margin-top: 10px; margin-bottom:10px;">
                    <button type="button"  class="k-button k-button-solid-info" onclick="applicationForm3.addCertRow()"><span>추가</span></button>
                </div>--%>

                <div class="__tit1" style="margin-top:20px;">
                    <h3>자격/면허</h3>
                </div>

                <table class="__tbl respond2 fix" >
                    <colgroup>
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                        <col width="30%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>명칭</th>
                        <th>등급</th>
                        <th>검정기관</th>
                        <th>증빙</th>
                        <th><button type="button"  class="k-button k-button-solid-info" onclick="applicationForm3.addCertRow()"><span>추가</span></button></th>
                    </tr>
                    </thead>
                    <tbody id="certTb">
                    <tr class="cert" id="cert0">
                        <td class="tac">
                            <input type="hidden" id="certBaseId0" name="certBaseId0" class="certBaseId">
                            <input type="text" id="certName0" class="certName" style="width: 100%; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                        </td>
                        <td class="tac">
                            <input type="text" id="certClass0" class="certClass" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                        </td>
                        <td class="tac">
                            <input type="text" id="certIssuer0" class="certIssuer" style="width: 100%; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                        </td>
                        <td class="tac">
                            <input type="hidden" id="certFileNo0" name="certFileNo0" class="certFileNo">
                            <label for="certFile0" class="certFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                            <input type="text" id="certFileName0" class="certFileName" style="width: 147px ;font-size:15px; color:#337ab7;">
                            <input type="file" id="certFile0" name="certFile0" class="certFile" style="display: none" onchange="applicationForm3.getFileName(this)">
                        </td>
                        <td class="tac">
                            <button type="button" class="k-button k-button-solid-error" onclick="applicationForm3.delRow('cert', this)"><span>삭제</span></button>
                        </td>
                    </tr>

                    <tr id="cert0_1" class="cert_1">
                        <th class="tac">활용능력</th>
                        <td colspan="8">
                            <textarea id="certContent0" class="certContent" style="width:100%; height:40px; border: 1px solid #ddd; display:inline-block; padding-left:10px;"></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>


                <div id="careerDiv" style="width:1270px;">
                   <%-- <div class="__btWrap rig __mt10" style="text-align: right; margin-right: 10px; margin-top: 10px;">
                        <button type="button"  class="k-button k-button-solid-info" onclick="applicationForm3.addLangRow()"><span>추가</span></button>
                    </div>--%>

                    <div class="__tit1" style="margin-top:20px;">
                        <h3>외국어</h3>
                    </div>
                    <table class="__tbl respond2 fix" id="careerInfo0">
                        <colgroup>
                            <col width="20%">
                            <col width="20%">
                            <col width="20%">
                            <col width="30%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>명칭</th>
                            <th>취득시기</th>
                            <th>취득점수</th>
                            <th>증빙</th>
                            <th><button type="button"  class="k-button k-button-solid-info" onclick="applicationForm3.addLangRow()"><span>추가</span></button></th>
                        </tr>
                        </thead>
                        <tbody id="langTb">
                        <tr class="lang" id="lang0">
                            <td>
                                <input type="hidden" id="langBaseId0" name="langBaseId0" class="langBaseId">
                                <input type="text" id="langName0" class="langName" style="width: 100%; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                            </td>
                            <td>
                                <input type="text" id="acquisitionDate0" class="acquisitionDate period" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                            </td>
                            <td>
                                <input type="text" id="acquisitionScore0" class="acquisitionScore" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">
                            </td>
                            <td>
                                <input type="hidden" id="langFileNo0" name="langFileNo0" class="langFileNo">
                                <input type="text" id="langFileName0" class="langFileName" style="width: 147px ;font-size:15px; color:#337ab7;">
                                <label for="langFile0" class="langFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                                <input type="file" id="langFile0" name="langFile0" class="langFile" style="display: none" onchange="applicationForm3.getFileName(this)">
                            </td>
                            <td>
                                <button type="button" class="k-button k-button-solid-error" onclick="applicationForm3.delRow('lang', this)"><span>삭제</span></button>
                            </td>
                        </tr>
                        <tr id="lang0_1" class="lang_1">
                            <th style="text-align: center;">활용능력</th>
                            <td colspan="6">
                                <textarea id="langContent0" class="langContent" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

               <%-- <div style="margin-bottom: 10px">
                    <span style="padding-right: 5px; font-size: 12px"></span>
                    <input type="checkbox" id="otherYn" name="otherYn" onclick="applicationForm3.checkBoxChk(this)">
                </div>--%>

                <div class="lab" style="margin:20px 0;">
                    <label class="__lab">
                        <span style="font-size: 15px">기타 외국어 능력 입력</span>
                        <input type="checkbox"  id="otherYn" name="otherYn" onclick="applicationForm3.checkBoxChk(this)"><i></i>
                    </label>
                </div>

                <div id="otherDiv" style="display: none">
                    <table class="popTable table table-bordered mb-0 mt10 text-center">
                        <tr>
                            <textarea id="otherLang" style="width: 100%; height: 75px; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                        </tr>
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
    applicationForm3.fn_defaultScript();

    function setApplicationTempSave(type){
        if(type == "prev"){
            location.href = "/camtic/member/job_applicationForm2.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
        }else{
            if(type == "next"){
                var flag = true;
                $.each($(".cert"), function(i, v){
                    if($(this).find("#certName" + i).val() != ""){
                        if(!$(this).find("#certFileNo" + i).val() && $("#certFile" + i)[0].files.length == 0 && type == "next") {
                            flag = false;
                        }

                        if(!flag){
                            alert("자격/면허 증빙파일은 필수사항입니다.");
                            return flag;
                        }
                    }
                })

                if(!flag){
                    return;
                }

                $.each($(".lang"), function(i, v){
                    if($(this).find("#langName" + i).val() != ""){
                        if(!$(this).find("#langFileNo" + i).val() && $("#langFile" + i)[0].files.length == 0 && type == "next") {
                            flag = false;
                        }

                        if(!flag){
                            alert("외국어 증빙파일은 필수사항입니다.");
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
                var certArr = new Array();
                $.each($(".cert"), function(i, v){
                    if($(this).find("#certName" + i).val() != ""){
                        var arrData = {
                            certBaseId : $(this).find("#certBaseId" + i).val(),
                            applicationId : $("#applicationId").val(),
                            certName : $(this).find("#certName" + i).val(),
                            certClass : $(this).find("#certClass" + i).val(),
                            certIssuer : $(this).find("#certIssuer" + i).val(),
                            certContent : $("#certContent" + i).val(),
                            userEmail : $("#userEmail").val(),
                            certFileNo : $(this).find("#certFileNo" + i).val(),
                        }

                        if($(this).find("#certFile" + i)[0].files.length != 0){
                            formData.append("certFile" + i, $(this).find("#certFile" + i)[0].files[0]);
                        }

                        certArr.push(arrData);
                    }
                })

                var langArr = new Array();
                $.each($(".lang"), function(i, v){
                    if($(this).find("#langName" + i).val() != ""){
                        var arrData = {
                            langBaseId : $(this).find("#langBaseId" + i).val(),
                            applicationId : $("#applicationId").val(),
                            langName : $(this).find("#langName" + i).val(),
                            acquisitionDate : $(this).find("#acquisitionDate" + i).val(),
                            acquisitionScore : $(this).find("#acquisitionScore" + i).val(),
                            langContent : $("#langContent" + i).val(),
                            userEmail : $("#userEmail").val(),
                            langFileNo : $(this).find("#langFileNo" + i).val(),
                        }

                        if($(this).find("#langFile" + i)[0].files.length != 0){
                            formData.append("langFile" + i, $(this).find("#langFile" + i)[0].files[0]);
                        }

                        langArr.push(arrData);
                    }
                })

                formData.append("applicationId", $("#applicationId").val());
                formData.append("certArr", JSON.stringify(certArr));
                formData.append("langArr", JSON.stringify(langArr));
                formData.append("otherYn", $("#otherYn").is(":checked") ? "Y" : "N");
                if($("#otherYn").is(":checked")){
                    formData.append("otherLang", $("#otherLang").val());
                }
                formData.append("userEmail", $("#userEmail").val());

                var result = customKendo.fn_customFormDataAjax("/application/setApplicationForm3.do", formData);
                if(result.flag){
                    if(type == "temp"){
                        alert("임시저장 되었습니다.");
                        location.reload();
                    }else{
                        location.href = "/camtic/member/job_applicationIntroduce.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
                    }
                }
            }
        }
    }
</script>