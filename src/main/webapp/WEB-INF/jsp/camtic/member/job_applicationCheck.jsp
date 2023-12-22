<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<% pageContext.setAttribute("br", "\n"); %>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>
    .txt_zone {padding: 50px 50px 160px 50px; font-size: 17px; color: #252525;}

    /*.__boardView .head {
      border-top: 1px solid #ccc;
    }*/

    .__boardView .con {
        padding: 0px;
    }

    /* 버튼 수정 2023-10-30 김병수 */
    .__btn1 {
        min-width: 85px;
        height: 38px;
        font-size: 15px;
    }
    table th{border-bottom: 1px solid #ddd; background-color: #ddd;}

    .recruitText {
        display: block;
        width: 97%;
        height: 28px;
        border : 1px solid #ddd;
        margin-left: 10px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #262b36;
        background-color: #fcfcfd;
        background-image: none;
        border-radius: 2px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }

    input[type=checkbox] {box-sizing:  border-box; padding: 0;}
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
                    <li class=""><span>입사지원 조회</span></li>
                </ul>
                <div id="title">
                    <h3><span>입사지원 조회</span></h3>
                </div>

                <div class="__boardView">
                    <div class="con" >
                        <div class="txt_zone pr_view_content" style="line-height:35px;">
                            <div id="con1" style="margin-top:50px;">
                                <h2>E-MAIL / PW</h2>
                                <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${params.recruitInfoSn}">
                                <table class="table table-bordered mb-0" style="border:1px solid #ddd; text-align:center;margin-top:20px;">
                                    <colgroup>
                                        <col style="width:40%;"/>
                                        <col style="width:60%;"/>
                                    </colgroup>

                                    <tr>
                                        <th>이메일</th>
                                        <td>
                                            <input type="text" class="recruitText" id="userEmail" name="userEmail" onkeypress="if(window.event.keyCode==13){setApplicationLogin()}" value="deer@naver.com">
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>비밀번호</th>
                                        <td><input type="password" class="recruitText" id="userPassword" name="userPassword" onkeypress="if(window.event.keyCode==13){setApplicationLogin()}" value="Jiat2300@@"></td>
                                    </tr>

                                    <tr>
                                        <th>비밀번호 확인</th>
                                        <td><input type="password" class="recruitText" id="userPassword2" name="userPassword2" onkeypress="if(window.event.keyCode==13){setApplicationLogin()}" value="Jiat2300@@"></td>
                                    </tr>
                                </table>
                                <input type="hidden" id="userEmailSub1" name="id_sub1" value="">
                                <input type="hidden" id="userEmailSub2" name="id_sub2" value="">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="__botArea">
                    <div style="text-align: center;">
                        <a href="javascript:void(0);" class="__btn1 blue" style="width:200px;" onclick="setApplicationCheck();"><span>입사지원 조회</span></a>
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
<script src="/js/intra/common/securityEncUtil.js?v=1"></script>
<script src="/js/intra/common/aes.js?v=1"></script>
<script>

    var strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    function fn_goList(){
        location.href = '/camtic/member/job.do';
    }

    //상세보기 이동
    function fn_detailBoard(key) {
        location.href = "/camtic/pr/pr_view.do?boardArticleId=" + key + "&category=" + categoryId;
    }

    function setApplicationCheck(){
        /** 이메일 정규식 체크 */
        if(!$("#userEmail").val()){
            alert("이메일을 입력해주세요.");
            $("#userEmail").focus();
            return false;
        }else if(validEmailCheck(document.getElementById("userEmail")) == false){
            alert('이메일 형식을 올바르게 입력해주세요. ex) xxx@000.000');
            $("#userEmail").focus();
            return;
        }else if(!$("#userPassword").val()){
            alert("비밀번호를 입력해주세요.");
            $("#userPassword").focus();
            return false;
        }else if(!strongPassword.test($("#userPassword").val())){
            alert("비밀번호 형식이 올바르지 않습니다.\n[8자리 이상, 숫자, 특수문자, 하나이상 대소문자 혼합]");
            $("#userPassword").focus();
            return
        }else if(!$("#userPassword2").val()){
            alert("비밀번호 확인을 입력해주세요.");
            $("#userPassword2").focus();
            return;
        }else if($("#userPassword").val() !== $("#userPassword2").val()){
            alert("비밀번호가 일치하지 않습니다.\n다시 입력해주세요.");
            $("#userPassword2").focus();
            return;
        }

        if(confirm("입사지원 조회 하시겠습니까?")) {

            var chk = customKendo.fn_customAjax("/join/userChk.do", data);
            if (result.flag) {
                /** 신규 사용자 */
                location.href = '/camtic/member/job_userAgree.do';
            } else {
                if (chk.rs.code == "200") {
                    if (!chk.rs.applicationChk) {
                        /** 이미 있는 사용자 */
                        if (chk.rs.chk) {
                            if (chk.rs.applicationId) {
                                location.href = "/camtic/member/job_applicationForm1.do?applicationId=" + chk.rs.applicationId;
                            } else {
                                location.href = '/camtic/member/job_applicationForm1.do';
                            }
                        } else {
                            location.href = '/camtic/member/job_applicationList.do'; // 변경된 부분
                        }
                    } else {
                        alert("이미 응시한 공고입니다.");
                    }
                }
            }
        }
    }

    function validEmailCheck(obj){
        var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return (obj.value.match(pattern) != null)
    }

    function securityEncrypt(inputStr){
        return securityEncUtil.securityEncrypt(inputStr, "0");
    }


</script>