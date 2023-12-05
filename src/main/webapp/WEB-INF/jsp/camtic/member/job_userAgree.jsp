<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<jsp:useBean id="today" class="java.util.Date" />

<% pageContext.setAttribute("br", "\n"); %>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="/js/camtic/application/applicationLogin.js?v=${today}"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<!--Kendo ui js-->
<script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>
<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/common/common.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/fCommon.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/linkageProcessUtil.js?${today}'/>"></script>

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

    .__agree .area {border:0.1rem solid #ccc;font-size:1.1rem;line-height:1.8;padding:2rem;letter-spacing:-0.05em;background:#f3f3f3;}
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
</style>

<body>
<div id="wrap">
    <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
    <div id="sub">
        <div class="inner">
            <jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
            <div id="content">
                <ul id="navigation">
                    <li><a href="/camtic"><img src="/images/camtic/home_3.png" class="homeImage">홈으로</a></li>
                    <li class="">직원과 함께</li>
                    <li class=""><span>채용공고</span></li>
                </ul>
                <div id="title">
                    <h3><span>채용공고</span></h3>
                </div>

                <div class="__tit1">
                    <h3>개인정보 수집 및 이용에 관한 사항</h3>
                </div>
                <div class="__agree">
                    <div class="area">
                        ■ 개인정보의 수집ㆍ이용 목적<br>
                        캠틱종합기술원 직원 채용시 이용자 확인을 위한 목적으로 귀하의 개인정보를 수집, 이용하고 있습니다.수집방법에 따른 구체적인 수집목적 및 이용목적은 다음과 같습니다.<br>
                        - 온라인접수 본인 확인 및 심사진행을 위한 정보 수집<br>
                        <br>
                        ■ 수집하려는 개인정보의 항목<br>
                        캠틱종합기술원 직원 채용의 서비스 제공을 위하여 필요한 최소한의 범위 내에서 아래와 같이 개인정보를 수집하고 있습니다.<br>
                        - 성명, 휴대전화번호, 생년월일, 이메일<br>
                        - 자격증, 경력사항 등 입사지원서 등에 제공한 정보<br>
                        <br>
                        ■ 개인정보의 보유 및 이용기간<br>
                        캠틱종합기술원은 개인정보 수집 및 이용목적이 달성된 후에는 채용절차의 공정화에 관한 법률에 따라 해당정보를 지체 없이 파기합니다.<br>
                        - 채용절차의 공정화에 관한 법률에 따름<br>
                        <br>
                        ■ 동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익이있는 경우에는 그 불이익의 내용<br>
                        개인정보의 수집, 이용, 제공 등과 관련한 위 사항에 대하여 원하지 않는 경우 동의를 거부할 수 있습니다.다만, 동의를 거부하는 경우 접수가 불가함을 알려드립니다.
                    </div>
                    <div class="txt">
                        본인은 캠틱종합기술원 채용 공고의 개인정보 수집 및 이용에 관한 사항을 확인 하였으며, 이번 ‘온라인 접수’를 신청합니다.
                    </div>
                    <div class="lab">
                        <label class="__lab">
                            <span>동의합니다</span>
                            <input type="checkbox" name="agreeChk" required><i></i>
                        </label>
                    </div>
                </div>

                <div class="__tit1 __mt60">
                    <h3>직원 채용에 대한 필수동의사항</h3>
                </div>
                <div class="__agree">
                    <div class="area">
                        ✽ 아래 □에 동의여부를 반드시 체크(✓)해 주시기 바랍니다.
                        <div class="__mt10">
                            1. 채용관련 지원서류 상의 개인정보(성명, 주민등록번호, 주소, 연락처, 자격 및 경력사항, 병역사항 등)를 캠틱종합기술원에서 채용전형 시 활용하는데 동의합니다. &nbsp;
                            <label class="__lab">
                                <input type="checkbox" name="agreeChk"><i></i>
                            </label>
                            <br>
                            2. 미채용 지원자의 채용관련 서류를 예비합격 유보기간 후 즉시 파기하는데 동의합니다. &nbsp;
                            <label class="__lab">
                                <input type="checkbox" name="agreeChk"><i></i>
                            </label>
                            <br>
                            3. 채용관련 서류는『인사관리 규정』에 따라 보존 및 캠틱종합기술원 업무에 활용하는데 동의합니다. &nbsp;
                            <label class="__lab">
                                <input type="checkbox" name="agreeChk"><i></i>
                            </label>
                        </div>
                    </div>
                    <div class="txt">
                        위 기재 사항은 사실과 다름이 없음을 확인하며, 상기 내용이 사실과 다를 시 어떠한 불이익도 감수할 것을 약속합니다.
                        <dl>
                            <dt>${now}</dt>
                            <dd>지원자 : <input type="text" class="__inp" id="userName" name="userName" style="width: 9rem; height:26px; padding-left:10px;" onKeyPress="hangul();" autocomplete="off"> </dd>
                        </dl>
                    </div>
                    <div class="lab">
                        <label class="__lab">
                            <span>동의합니다</span>
                            <input type="checkbox" name="agreeChk" required><i></i>
                        </label>
                    </div>
                </div>

                <div>
                    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
                    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
                </div>

                <div class="__botArea">
                    <div style="text-align: center;">
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplication();"><span>입사지원</span></a>
                        <a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 blue" style="width:200px;"><span>뒤로가기</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
</body>
</html>

<script src="/js/intra/common/aes.js?v=1"></script>
<script>

    function setApplication() {
        const regex = /^[ㄱ-ㅎ|가-힣]+$/;

        if(!$("#userName").val()){
            alert("성명을 입력해주세요.");
            $("#userName").focus()
            return;
        }else if(!regex.test($("#userName").val())){
            alert("한글만 입력해주세요.");
            $("#userName").focus()
            return;
        }

        if($("input[name='agreeChk']:checked").length != 5){
            alert('체크박스를 모두 체크해주세요.');
            return;
        }

        var data = {
            recruitInfoSn: $("#recruitInfoSn").val(),
            userEmail: $("#userEmail").val(),
            userName : $("#userName").val()
        }

        var result = customKendo.fn_customAjax("/application/setUserAgree.do", data);

        if (result.flag) {
            location.href = "/camtic/member/job_applicationForm1.do";
        }
    }
</script>