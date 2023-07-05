<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>
<style>
  .removeDay{
    text-decoration:line-through;
    font-weight:700;
    color:red
  }
  .k-grid-toolbar{
    justify-content: flex-end !important;
  }
  .k-grid-norecords{
    justify-content: space-around;
  }
  .k-grid tbody tr{
    height: 38px;
  }
  #wptDiv{
    margin: 0 auto;
    width: 100px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
  }
  #wptDiv > label {
    margin : 0
  }
  #timeDiff{
    height: 255px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-header {padding: 0px 0px 40px 0px;}
  table { background-color: white; }
  .table > thead > tr > th, .table > tfoot > tr > th{ background-color: #8fa1c04a;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
      <div class="table-responsive">
        <div style="background-color: #00397f;">
          <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
            <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">직원추가</h3>
            <div style="margin-top:10px;">
              <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">이미지 관리</button>
              <button type="button" class="k-button k-button-solid-info" onclick="userReqPop.userReqSave();">저장</button>
              <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
          </div>
        </div>
        <%--<div class="popupTitleSt">직원추가</div>--%>
        <form id="subHolidayReqPop" style="padding: 10px 30px;">
          <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
          <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
          <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
          <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
          <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
          <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
          <table class="table table-bordered mb-0" id="userReqPop" style="margin-top: 10px;">
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
                <input type="text" id="dutyCode" style="width: 50%;">
                <input type="checkbox" id="check1"> 임시직원
              </td>
            </tr>
            <tr>
              <th><span class="red-star">*</span>아이디</th>
              <td>
                <input type="text" id="loginId" style="width: 50%;"> *전담인력 필수
              </td>
              <th><span class="red-star">*</span>주민등록번호</th>
              <td>
                <input type="text" id="resRegisNum1" style="width: 30%;"> - <input type="text" id="resRegisNum2" style="width: 30%;">
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
              <th>CAPS 번호</th>
              <td>
                <input type="text" id="capsNum" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>직급/등급</th>
              <td>
                <input type="text" id="positionOrNum" style="width: 50%;">
              </td>
              <th>팀</th>
              <td>
                <input type="text" id="deptTeamName" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>직군</th>
              <td>
                <input type="text" id="jobCode" style="width: 50%;">
              </td>
              <th>직책</th>
              <td>
                <input type="text" id="positionName" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>직무사항</th>
              <td>
                <input type="text" id="jobDetail" style="width: 50%;">
              </td>
              <th>학위</th>
              <td>
                <input type="text" id="degreeCode" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>입사 일자</th>
              <td>
                <input type="text" id="regDate" style="width: 50%;">
              </td>
              <th>홈페이지 게시</th>
              <td>
                <span type="text" id="homePageActive" name="homePageActive" style="width: 100%;"></span>
              </td>
            </tr>
            <tr>
              <th>전직경력</th>
              <td>
                <input type="text" id="beforCareer" style="width: 15%;"> 개월
              </td>
              <th>경과년차</th>
              <td>
                <input type="text" id="elapsedYear1" style="width: 15%;"> 년도기준
                <input type="text" id="elapsedYear2" style="width: 15%;"> 년차
              </td>
            </tr>
            <tr>
              <th>계좌정보</th>
              <td colspan="3">
                예금주 <input type="text" id="accountHolder" style="width: 20%; margin-right:10px;"> 은행명 <input type="text" id="bankName" style="width: 20%; margin-right:10px;"> 계좌번호  <input type="text" id="accountNum" style="width: 30%;">
              </td>
            </tr>
            <tr>
              <th>증명사진</th>
              <td colspan="3">
                <input type="file">
              </td>
            </tr>
            <tr>
              <th>거주지</th>
              <td colspan="3">
                <div style="display: flex">
                  <input type="text" id="addr" style="width: 15%; margin-right:10px;">
                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick=""/>
                </div>
                <div style="display: flex" class="mt5">
                  <input type="text" id="addrDetail" style="width: 80%;">
                </div>
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input type="text" id="officeTelNum" style="width: 50%;">
              </td>
              <th>휴대폰</th>
              <td>
                <input type="text" id="mobileTelNum" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td colspan="3">
                <input type="text" id="emailAddr" style="width: 30%;">
              </td>
            </tr>
            <tr <%--style="display: none;" id="noneTr"--%>>
              <th>차량소유</th>
              <td>
                <input type="checkbox" id="carActive" onclick="onDisplay();"> 차량을 소유하고 있음
              </td>
              <th>차량번호</th>
              <td>
                <input type="text" id="carNum1" style="width: 15%; margin-right:5px;"><input type="text" id="carNum2" style="width: 15%; margin-right:5px;"><input type="text" id="carNum3" style="width: 15%; margin-right:5px;">
                ex) 22 가 1111
              </td>
            </tr>
            </thead>
          </table>
          <table class="table table-bordered mb-0" id="userReqPopDetail" style="border-left:none;">
            <colgroup>
              <col width="13%">
              <col width="37%">
              <col width="13%">
              <col width="37%">
            </colgroup>
            <thead>
            <tr>
              <td colspan="4" style="height:20px; border-right:none; border-left:none;"></td>
            </tr>
            <tr>
              <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">직원 부가정보</th>
            </tr>
            <tr>
              <th>한자 이름</th>
              <td>
                <input type="text" id="empNameCn" style="width: 50%;">
              </td>
              <th>영문 이름</th>
              <td>
                <input type="text" id="empNameEn" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>
                <input type="text" id="bday" style="width: 50%;">
              </td>
              <th>긴급 연락처</th>
              <td>
                <input type="text" id="emgTelNum" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>본적</th>
              <td colspan="3">
                <input type="text" id="legalDomicile" style="width: 80%;">
              </td>
            </tr>
            <tr>
              <th>결혼 관계</th>
              <td>
                <span type="text" id="weddingActive" name="weddingActive" style="width: 100%;"></span>
              </td>
              </td>
              <th>결혼기념일</th>
              <td>
                <input type="text" id="weddingDay" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>혈액형</th>
              <td colspan="3">
                <span type="text" id="bloodType" name="bloodType" style="width: 100%;"></span>
              </td>
            </tr>
            <tr <%--style="display: none;" id="noneTr1"--%>>
              <th>재직여부</th>
              <td>
                <input type="checkbox" id="check3" onclick="onDisplay1();"> 퇴사직원임
              </td>
              <th>퇴사일자</th>
              <td>
                <input type="text" id="resignDay" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>취미</th>
              <td>
                <input type="text" id="hobby" style="width: 50%;">
              </td>
              <div style="display: none;" id="noneDiv">
                <th>특기</th>
                <td>
                  <input type="text" id="specialty" style="width: 50%;">
                </td>
              </div>
            </tr>
            <tr>
              <th>종교</th>
              <td>
                <input type="text" id="religion" style="width: 50%;">
              </td>
              <th>신장</th>
              <td>
                <input type="text" id="height" style="width: 50%;"> cm
              </td>
            </tr>
            <tr>
              <th>체중</th>
              <td>
                <input type="text" id="weight" style="width: 50%;"> kg
              </td>
              <th>시력</th>
              <td>
                좌 <input type="text" id="vision1" style="width: 20%;">
                우 <input type="text" id="vision2" style="width: 20%;"> (안경 착용 시력)
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
</div>
<script>
  userReqPop.defaultScript();

  function onDisplay() {
    $('#noneTr').show();
  }

  function onDisplay1() {
    $('#noneTr1').show();
  }
</script>
</body>
