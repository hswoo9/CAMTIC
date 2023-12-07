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
<script type="text/javascript" src="/js/camtic/application/applicationIntroduce.js?v=${today}"></script>
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
                <input type="hidden" id="introduceId" name="introduceId" value="">
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
                    <h3>자기소개서</h3>
                </div>

                <table class="__tbl respond2 fix" >
                    <tbody id="certTb">
                    <tr>
                        <th class="tal">
                            <span class="__red">*</span>성장과정 및 장단점
                        </th>
                    </tr>

                    <tr>
                        <td class="tac">
                            <textarea id="introduce1" style="width:100%; height:100px; border: 1px solid #ddd; display:inline-block; padding-left:10px;" <%--onkeyup="adjustHeight(this);" --%>placeholder="필수사항, 200자 ~ 600자 이내"></textarea>
                            <%--<div class="k-counter-introduce1" style="text-align: right">(<span class="k-counter-value">0</span>/600자)</div>--%>
                        </td>
                    </tr>

                    <tr>
                        <th class="tal">
                            <span class="__red">*</span>입사 후 포부 및 업무추진계획
                        </th>
                    </tr>

                    <tr>
                        <td class="tac">
                            <textarea id="introduce2" style="width:100%; height:100px; border: 1px solid #ddd; display:inline-block; padding-left:10px;" <%--onkeyup="adjustHeight(this);"--%> placeholder="필수사항, 200자 ~ 600자 이내"></textarea>
                            <%--<div class="k-counter-introduce2" style="text-align: right">(<span class="k-counter-value">0</span>/600자)</div>--%>
                        </td>
                    </tr>

                    <tr>
                        <th class="tal">
                            <span class="__red">*</span>기타사항
                        </th>
                    </tr>

                    <tr>
                        <td class="tac">
                            <textarea id="introduce3" style="width:100%; height:100px; border: 1px solid #ddd; display:inline-block; padding-left:10px;" <%--onkeyup="adjustHeight(this);"--%> placeholder="선택사항"></textarea>
                            <%--<div class="k-counter-introduce3" style="text-align: right">(<span class="k-counter-value">0</span>/600자)</div>--%>
                        </td>
                    </tr>
                    </tbody>
                </table>


                <div class="__botArea">
                    <div style="text-align: center;">
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplicationTempSave('prev')"><span>이전단계</span></a>
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplicationTempSave('temp')"><span>임시저장</span></a>
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplicationTempSave('final')"><span>최종제출하기</span></a>
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
    applicationIntroduce.fn_defaultScript();

    function setApplicationTempSave(type){
        if(type == "prev"){
            location.href = "/camtic/member/job_applicationForm3.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
        }else{
            if(type == "next"){
                if(!$("#introduce2").val()){
                    alert("입사 후 포부 및 업무추진계획은 필수 입력 항목입니다.");
                    return;
                }
            }

            var confirmText = "";
            if(type == "temp"){
                confirmText = "임시저장 하시겠습니까?";
            }else{
                confirmText = "최종 제출하시겠습니까?\n제출 후에는 수정 할 수 없습니다.";
            }

            if(confirm(confirmText)){
                var formData = new FormData();
                formData.append("introduceId", $("#introduceId").val());
                formData.append("applicationId", $("#applicationId").val());
                formData.append("introduce1", $("#introduce1").val());
                formData.append("introduce2", $("#introduce2").val());
                formData.append("introduce3", $("#introduce3").val());
                formData.append("userEmail", $("#userEmail").val());
                if(type == "final"){
                    formData.append("saveType", "S");
                }

                var result = customKendo.fn_customFormDataAjax("/application/setApplicationIntroduce.do", formData);
                if(result.flag){
                    if(type == "temp"){
                        alert("임시저장 되었습니다.");
                        location.reload();
                    }else{
                        alert("최종제출 되었습니다.");
                        location.href = "/camtic/member/job.do";
                    }
                }
            }
        }
    }
</script>