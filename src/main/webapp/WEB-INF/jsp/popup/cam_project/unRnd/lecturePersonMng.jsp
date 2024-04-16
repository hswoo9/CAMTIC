<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecture.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePersonMng.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>

<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="personSn" value="${params.personSn}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" name="type" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;">수강자 등록</span></h3>
            <button type="button" id="saveBtn" style="float: right; top:5px" class="k-button k-button-solid-info" onclick="lecturePersonMng.fn_save()">저장</button>
        </div>

        <div class="col-md-12 col-sm-12" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                  <%--  <th><span class="red-star">*</span>아이디</th>
                    <td><input id="id" style="width: 150px; margin-right: 5px"><button type="button" id="ckBtn" class="k-button k-button-solid-base" onclick="lecturePersonMng.dupleCk()"><span>중복체크</span></button></td>--%>
                    <th><span class="red-star">*</span>이름</th>
                    <td><input id="name" style="width: 150px"></td>
                    <th><span class="red-star">*</span>휴대폰번호</th>
                    <td><input id="hpNum" style="width: 150px; margin-right: 5px;" oninput="lecturePersonMng.pnChk()"><button class="id_check" onclick="lecturePersonMng.dupleCk();" style="border: none;border-radius: 5px;">중복확인</button></td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>비밀번호</th>
                    <td><input type="password" id="pwd" style="width: 150px"></td>
                    <th><span class="red-star">*</span>비밀번호 확인</th>
                    <td><input type="password" id="pwdCheck" style="width: 150px"></td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>생년월일</th>
                    <td><input id="birth" style="width: 150px; margin-right: 15px" placeholder="예 ) 2000-01-01"></td>
                    <th><span class="red-star">*</span>성별</th>
                    <td><span id="gender"></span></td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>우편번호</th>
                    <td><input type="text" id="zipCode" style="width: 150px; margin-right: 5px;"><button class="id_check" onclick="addrSearch()" style="border: none;border-radius: 5px;">우편번호 찾기</button></td>
                    <th><span class="red-star">*</span>주소</th>
                    <td><input type="text" id="address" style="width: 80%" disabled></td>
                </tr>
                <tr>

                    <th><span class="red-star">*</span>상세주소</th>
                    <td colspan="3"><input type="text" id="addDetail" style="width: 70%"></td>
                </tr>
                <tr>
                    <th>자택 전화번호</th>
                    <td><input id="telNum" style="width: 150px"></td>
                    <th><span class="red-star">*</span>이메일</th>
                    <td><input type="email" id="email" style="width: 150px"></td>
                </tr>
                <tr>
                    <th>구분</th>
                    <td colspan="3">
                        <span id="joinType"></span>
                        <input type="hidden" name="crmSn" id="crmSn" value="">
                    </td>
                </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0" id="crmTable" style="display: none;">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th><span class="red-star">*</span>회사</th>
                    <td colspan="3">
                        <input type="text" id="crmName" style="width: 250px; margin-right: 5px;">
                        <button class="id_check" onclick="conBtn()" style="border: none;border-radius: 5px;">회사 선택</button>
                    </td>
                </tr>
                </thead>
            </table>


            <table class="popTable table table-bordered mb-0" id="schoolTable" style="display: none;">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th><span class="red-star">*</span>학교</th>
                    <td>
                        <input type="text" id="schoolName" style="width: 200px; margin-right: 5px;">
                        <button class="id_check" onclick="schoolBtn()" style="border: none;border-radius: 5px;">대학 선택</button>
                    </td>
                    <th><span class="red-star">*</span>전공</th>
                    <td>
                        <input type="text" id="schoolMajor" style="width: 150px; margin-right: 5px;">
                    </td>
                </tr>
                </thead>
            </table>

             <%--   <tr>
                    <th>회사명</th>
                    <td>
                        <input id="coName" style="width: 150px">
                    </td>
                    <th>부서</th>
                    <td>
                        <input id="part" style="width: 150px">
                    </td>
                </tr>
                <tr>
                    <th>직책</th>
                    <td>
                        <input id="place" style="width: 150px">
                    </td>
                    <th>전화번호</th>
                    <td>
                        <input id="telNum" style="width: 150px">
                    </td>
                </tr>
                <tr>

                    <th>팩스번호</th>
                    <td>
                        <input id="faxNum" style="width: 150px">
                    </td>
                </tr>--%>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    lecturePersonMng.fn_defaultScript();

    $(document).ready(function() {

        $('input[name="joinType"]').change(function() {
            if ($(this).val() === "S") {
                $('#schoolTable').css("display" , "");
                $('#crmTable').css("display" , "none");
            } else if($(this).val() === "C") {
                $('#schoolTable').css("display" , "none");
                $('#crmTable').css("display" , "");
            } else {
                $('#schoolTable').css("display" , "none");
                $('#crmTable').css("display" , "none");
            }
        });
    });

    function addrSearch(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#zipCode").val(data.zonecode);
                    $("#address").val(roadAddr);

                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        $("#subAddr").val(extraRoadAddr);
                    } else {
                        $("#subAddr").val("");
                    }

                    /*var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시
                    if(data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if(data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else {
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }*/

                    $("#addrDetail").focus();
                }
            }).open();
        });
    }

    function conBtn(){
        var url = "/projectUnRnd/popCrmList.do";
        var name = "companyPop";
        var option = "width=1200, height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    }

    function schoolBtn(){
        var url = "/projectUnRnd/popSchoolList.do";
        var name = "companyPop";
        var option = "width=1200, height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    }
</script>
</body>
</html>