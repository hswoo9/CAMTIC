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
                    <h3>개인정보 수집 및 이용안내</h3>
                </div>
                <div class="__agree">
                    <div class="area">
                        ■ 개인정보의 수집ㆍ이용 목적<br>
                        (사)캠틱종합기술원(이하 캠틱)은 입사지원 및 선발전형, 자격증빙 확인, 지원자의 시험성적 확인, 인성검사 등 채용절차 진행을 위하여 필요한 최소한의 범위 내에서 <br>
                        개인정보를 수집하고 있습니다.
                        <br>
                        ■ 수집하려는 개인정보의 항목<br>
                        &nbsp&nbsp- 필수항목 : 증명사진, 성명(한글,한문,영문), 생년월일, 성별, 주소, 전화번호, 휴대폰번호, 이메일, 취미, 특기, 보훈여부, 학력사항, 자격사항, 경력사항, 병역사항
                        <br>
                        &nbsp&nbsp- 수집방법 : 웹사이트에 지원자가 직접 입력 및 서류제출
                        <br>
                        ■ 개인정보의 보유 및 이용기간<br>
                        채용과정에 수집된 개인정보는 인사관리 및 업무추진 상 필요에 의해 영구보관 합니다.
                        <br>
                        ■ 부동의(동의하지 않음)에 따른 고지사항<br>
                        채용을 위한 개인정보 제공에 대해서는 부동의(동의하지 않음)할 수 있으나, 이 경우 내용 입력을 할 수 없어 채용 지원이 불가능합니다.
                    </div>

                    <div class="lab">
                        <label class="__lab">
                            <span>위 사항에 동의합니다</span>
                            <input type="checkbox" id="chk1" name="chk" required><i></i>
                        </label>
                    </div>
                </div>

                <div class="__tit1 __mt60">
                    <h3>개인정보의 제3자 제공 안내</h3>
                </div>
                <div class="__agree">
                    <div class="area">
                        캠틱은 채용에 필요한 인성역량검사를 위하여 귀하의 개인정보를 아래와 같이 제공할 수 있으며, 검사 이외의 목적으로 활용하거나 외부에 개인정보를 제공하지 않습니다.
                        <div class="__mt10" style="text-align: center;">
                            <table class="table table-bordered mb-0" style="width:60%; padding:0 20px; border:1px solid #ddd; text-align:center;margin:20px auto; background-color: #fff;">
                                <colgroup>
                                    <col width="15%">
                                    <col width="15%" style="border-left:1px solid #ddd; border-right:1px solid #ddd;">
                                    <col width="15%">
                                </colgroup>
                                <thead style="background-color: #999999; color: #fff;">
                                <th>제공 내용</th>
                                <th>제공 회사</th>
                                <th>제공 항목</th>
                                </thead>
                                <tbody>
                                <td>인성역량검사</td>
                                <td>
                                    잡코리아(유)<br>
                                    JAT기업용인적성검사<br>
                                    (http://jat.jobkorea.co.kr)
                                </td>
                                <td>이름, 이메일, 휴대전화번호</td>
                                </tbody>
                            </table>
                        </div>
                        <strong>1. 제공하는 개인정보의 보유 및 이용기간</strong><br>
                        검사 종료 후 3개월이 지난 검사에 대하여 해당 응시자의 이메일/휴대전화번호는 자동 삭제됩니다.<br>
                        <strong>2. 부동의(동의하지 않음)에 따른 고지사항</strong><br>
                        채용을 위한 개인정보 제3자 제공에 대해서 부동의(동의하지 않음)할 수 있으나, 이 경우 관련 기관(사)에 대상통보를 할 수 없어 채용 지원이 불가능합니다.
                    </div>

                    <div class="lab">
                        <label class="__lab">
                            <span>위 사항에 동의합니다</span>
                            <input type="checkbox" id="chk2" name="chk" required><i></i>
                        </label>
                    </div>
                </div>

                <div>
                    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
                    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
                </div>

                <div class="__botArea">
                    <div style="text-align: center;">
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplicanUserAgree()"><span>입사지원</span></a>
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

    /*function updateApplyButtonState() {
        var chk1 = document.getElementById('chk1');
        var chk2 = document.getElementById('chk2');
        var applyButton = document.getElementById('applyButton');

        applyButton.disabled = !(chk1.checked && chk2.checked);
    }

    function setApplicanUserAgree(){
        var data = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            userEmail : $("#userEmail").val()
        }
        var result = customKendo.fn_customAjax("/application/setUserAgree.do", data);
        if(result.flag){
            /!*
            var url = "/application/applicationForm1.do";
            var name = "applicationForm1";
            var option = "width=1000,height=1200,scrollbars=no,top=100,left=200,resizable=no,toolbars=no,menubar=no";
            var popup = window.open(url,name,option);
             *!/
            location.href = "/camtic/member/job_applicationForm1.do";
        }
    }*/

    function setApplicanUserAgree() {

        if($("input[name='chk']:checked").length != 2){
            alert('개인정보 수집 및 이용 방침에 동의하세요.');
            return;
        }

        var data = {
            recruitInfoSn: $("#recruitInfoSn").val(),
            userEmail: $("#userEmail").val()
        }

        var result = customKendo.fn_customAjax("/application/setUserAgree.do", data);

        if (result.flag) {
            location.href = "/camtic/member/job_applicationForm1.do";
        }
    }
</script>