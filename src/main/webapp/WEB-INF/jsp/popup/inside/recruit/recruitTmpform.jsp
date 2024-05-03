<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/recruitTmpForm.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/common/solarToLunar.js?v=${today}"></script>

<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<%--<style>
    table { background-color: #00000008; }
</style>--%>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">단기간 근무직원 인사정보 등록</h3>
            <div>
                <input type="hidden" id="chkType" value="${params.chkType}"/>
                <button type="button" class="k-button k-button-solid-info" style="margin-top: 8px;" onclick="recruitTmp.userReqSave();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;margin-top: 8px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <form id="subHolidayReqPop" style="padding: 20px 30px;">

            <table class="popTable table table-bordered mb-0" id="userReqPop">
                <colgroup>
                    <col width="13%">
                    <col width="37%">
                    <col width="13%">
                    <col width="37%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">기본정보</th>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>이름</th>
                    <td>
                        <input type="text" id="empNameKr" style="width: 50%;">
                    </td>
                    <th><span class="red-star">*</span>직원구분</th>
                    <td>
                        <input type="text" id="divis" style="width: 40%;">
                        <input type="text" id="divisDet" style="width: 35%; display: none">
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>아이디</th>
                    <td>
                        <input type="text" id="loginId" style="width: 50%;">
                        <button type="button" class="k-button k-button-solid-base" id="idCheck">중복확인</button>
                        <br>*전담인력 필수
                    </td>
                    <th><span class="red-star">*</span>주민등록번호</th>
                    <td>
                        <input type="text" id="resRegisNum1" style="width: 30%;" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="6"> - <input type="text" id="resRegisNum2" value="${fn:split(uprinfList.RES_REGIS_NUM, "-")[1]}" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="7" style="width: 30%;">
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>비밀번호</th>
                    <td>
                        <input type="password" id="loginPasswd" style="width: 50%;"> 미입력시 변경 안됨
                    </td>
                    <th><span class="red-star">*</span>비밀번호 확인</th>
                    <td>
                        <input type="password" id="checkPasswd" style="width: 50%;">
                    </td>
                </tr>
                <tr>
                    <th>부서</th>
                    <td>
                        <input type="text" id="deptName" style="width: 50%;">
                    </td>
                    <th>팀</th>
                    <td>
                        <input type="text" id="deptTeamName" style="width: 50%;">
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseA defaultCaseB defaultCaseC defaultCaseD">
                    <th>직급/등급</th>
                    <td>
                        <input type="text" id="position" style="width: 50%;">
                    </td>
                    <th>CAPS 번호</th>
                    <td>
                        <input type="text" id="capsNum" style="width: 50%;">
                    </td>
                </tr>
                <tr class="caseB" style="display: none">
                    <th>CAPS 번호</th>
                    <td>
                        <input type="text" id="capsNumCaseB" style="width: 50%;">
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseA defaultCaseB defaultCaseC defaultCaseD">
                    <th>직군</th>
                    <td>
                        <input type="text" id="occupationCode" style="width: 50%;">
                    </td>
                    <th>직책</th>
                    <td>
                        <input type="text" id="duty" style="width: 50%;">
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseA defaultCaseB defaultCaseC defaultCaseD">
                    <th>직무사항</th>
                    <td>
                        <input type="text" id="jobDetail" style="width: 95%;">
                    </td>
                    <th>학위</th>
                    <td>
                        <input type="text" id="degreeCode" style="width: 50%;">
                    </td>
                </tr>
                <tr class="caseA caseB" style="display: none">
                    <th>직무사항</th>
                    <td>
                        <input type="text" id="jobDetailCaseB" style="width: 95%;">
                    </td>
                    <th>학위</th>
                    <td>
                        <input type="text" id="degreeCodeA" style="width: 50%;">
                    </td>
                </tr>
                <tr  class="caseD caseE" style="display: none">
                    <th>직무사항</th>
                    <td>
                        <input type="text" id="jobDetailCaseA" style="width: 95%;">
                    </td>
                    <th>CAPS 번호</th>
                    <td>
                        <input type="text" id="capsNumCaseC" style="width: 50%;">
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseC defaultCaseD">
                    <th>입사 일자</th>
                    <td <%--colspan="3"--%>>
                        <input type="text" id="regDate" style="width: 50%;">
                    </td>
                </tr>
                <tr class="caseA" style="display: none">
                    <th>입사 일자</th>
                    <td>
                        <input type="text" id="regDateCaseA" style="width: 50%;">
                    </td>
                    <th>CAPS 번호</th>
                    <td>
                        <input type="text" id="capsNumCaseA" style="width: 50%;">
                    </td>
                </tr>
                <tr class="caseD" style="display: none">
                    <th>입사 일자</th>
                    <td>
                        <input type="text" id="regDateCaseB" style="width: 50%;">
                    </td>
                    <th>호칭</th>
                    <td>
                        <input type="text" id="nicknameCaseA" style="width: 50%;"/>
                    </td>
                </tr>
                <tr class="caseC" style="display: none">
                    <th>호칭</th>
                    <td>
                        <input type="text" id="nickname" style="width: 50%;"/>
                    </td>
                    <th>생년월일</th>
                    <td>
                        <input type="text" id="birthDay" style="width: 50%;"/>
                        <input type="checkbox" id="lunarYn1" style="position : relative ; top: 3px; margin-left: 5px;"/>
                        <label for="lunarYn1" style="position : relative ; top: 1px;">음력</label>
                        <span id="lunarBirthDay"></span>
                    </td>
                </tr>
                <tr>
                    <th>계좌정보</th>
                    <td colspan="3">
                        예금주 <input type="text" id="accountHolder" style="width: 20%; margin-right:10px;"> 은행명 <input type="text" id="bankName" style="width: 20%; margin-right:10px;"> 계좌번호  <input type="text" id="accountNum" style="width: 30%;">
                    </td>
                </tr>
                <tr style="display:none;">
                    <th>증명사진</th>
                    <td colspan="3">
                        <input type="file">
                    </td>
                </tr>
                <tr>
                    <th>거주지</th>
                    <td colspan="3">
                        <div style="display: flex">
                            <input type="text" id="zipCode" style="width: 15%; margin-right:10px;">
                            <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick="recruitTmp.addrSearch();"/>
                        </div>
                        <div style="display: flex" class="mt5">
                            <input id="addr" style="width: 95%;">
                            <span id="guide" style="color:#999;display:none"></span>
                            <input type="hidden" id="addrDetail">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td>
                        <input type="text" id="officeTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;">
                    </td>
                    <th>휴대폰</th>
                    <td>
                        <input type="text" id="mobileTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;">
                    </td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td colspan="3">
                            <input type="text" id="emailAddr" style="width: 30%;">
                    </td>
                </tr>
                <tr>
                    <th>차량소유</th>
                    <td colspan="3">
                        <input type="checkbox" id="carActive" onclick="onDisplay()"> 차량을 소유하고 있음
                    </td>
                </tr>
                <tr class="carNum" style="display: none">
                    <th>차량번호</th>
                    <td colspan="3">
                        <input type="text" id="carNum1" style="width: 30%;">
                        ex) 22 가 1111
                    </td>
                </tr>
                </thead>
            </table>

            <table class="caseA caseB caseD caseE popTable table table-bordered mb-0" style="border-left:none;">
                <colgroup>
                    <col width="13%">
                    <col width="37%">
                    <col width="13%">
                    <col width="37%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">직원 부가정보</th>
                </tr>
                <tr>
                    <th>계약/협약 기간</th>
                    <td>
                        <input type="text" id="sDate" style="width: 40%;"> ~
                        <input type="text" id="eDate" style="width: 40%;">
                    </td>
                    <th>근무시간 /일</th>
                    <td>
                        <input type="text" id="workTime" style="width: 15%;">
                        시간
                    </td>
                </tr>
                <tr>
                    <th>근로계약/협약 조건</th>
                    <td colspan="3">
                        <textarea type="text" id="contract" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr class="caseD" style="display: none">
                    <th>학교</th>
                    <td>
                        <input type="text" id="school" style="width: 50%;">
                    </td>
                    <th>학위</th>
                    <td>
                        <input type="text" id="degree" style="width: 50%;">
                    </td>
                </tr>
                <tr class="caseD" style="display: none">
                    <th>학과</th>
                    <td>
                        <input type="text" id="department" style="width: 50%;">
                    </td>
                    <th>학년/학번</th>
                    <td>
                        <input type="text" id="grade" style="width: 10%;">학년 / <input type="text" id="studentId" style="width: 40%;">
                    </td>
                </tr>
                <tr>
                    <th>기능 및 자격</th>
                    <td colspan="3">
                        <textarea type="text" id="qualification" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr class="defaultCaseC defaultCaseD">
                    <th>최종학력</th>
                    <td colspan="3">
                        <textarea type="text" id="degreeT" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr class="defaultCaseC defaultCaseD">
                    <th>경력</th>
                    <td colspan="3">
                        <textarea type="text" id="career" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr class="defaultCase caseF defaultCaseB defaultCaseC defaultCaseD" style="display: none;">
                    <th>병역</th>
                    <td colspan="3">
                        <textarea type="text" id="military" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th>특이사항</th>
                    <td colspan="3">
                        <textarea type="text" id="significant" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div><!--table-responsive-->
</div><!--col-lg-12-->
<script>
    recruitTmp.defaultScript();
    var idFlag = false;
    var code = $("#chkType").val();

        $(function(){
            if(code =='1'){
                $("#divis").data("kendoDropDownList").value('1');
                $("#divis").data("kendoDropDownList").trigger("change");
                $("#divisDet").data("kendoDropDownList").value('6');
                $("#divisDet").data("kendoDropDownList").trigger("change");
            }else if(code == '2'){
                $("#divis").data("kendoDropDownList").value('3');
                $("#divis").data("kendoDropDownList").trigger("change");
            }else if(code =='3'){
                $("#divis").data("kendoDropDownList").value('2');
                $("#divis").data("kendoDropDownList").trigger("change");
            }

        });

    function onDisplay() {

        if($("#carActive").is(":checked")){
            $('.carNum').css("display","");
        } else {
            $('.carNum').css("display","none");

        }
    }

</script>

</body>

