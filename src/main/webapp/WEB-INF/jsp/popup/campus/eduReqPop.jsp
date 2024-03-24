<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/eduReqPop.js?v=${today}"></script>
<style>
  table > thead > tr > th { background-color: #8fa1c04a !important; }
  table > thead > tr > td { background-color: #fff; }
</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<%--<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>--%>
<input type="hidden" id="deptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="mode" value="${data.mode}"/>
<%--<input type="hidden" id="eduInfoId" value=""/>--%>

<form id="campusDraftFrm" method="post">
  <input type="hidden" id="menuCd" name="menuCd" value="campus">
  <input type="hidden" id="type" name="type" value="drafting">
  <input type="hidden" id="nowUrl" name="nowUrl" />
  <input type="hidden" id="eduInfoId" name="eduInfoId" value="${data.eduInfoId}"/>
  <input type="hidden" id="eduFormType" name="eduFormType" value="${data.eduFormType}"/>
</form>

<div class="col-lg-12" style="padding:0;">
  <div class="card-header pop-header">
    <h3 class="card-title title_NM">교육수강 신청서 작성</h3>
    <div class="btn-st popButton">
        <span id="campusBtnBox">

        </span>
        <input type="button" class="k-button k-button-solid-info" id="saveBtn" value="저장" onclick="eduReq.saveEduInfo();"/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close();"/>
    </div>
  </div>
  <div class="card-header" style="padding-top:25px;">
    <div class="col-lg-12" style="margin:0 auto;">
      <div class="table-responsive">
 <%--       <div class="popupTitleSt">교육수강 신청서 작성</div>--%>
        <form id="eduReqForm">
          <table class="table table-bordered" id="userInfoTable">
            <colgroup>
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
            </colgroup>
            <thead>
            <tr>
              <th>소 속</th>
              <td id="userDept">${loginVO.deptNm} ${loginVO.teamNm}</td>
              <th>직 위</th>
              <td id="userPosition">${loginVO.dutyNm eq '' ? loginVO.positionNm : loginVO.dutyNm}</td>
              <th>성 명</th>
              <td id="userName">${loginVO.name}</td>
            </tr>
           <%-- <c:if test="${eduFormType == 1}">--%>
            <tr>
              <th>담당직무</th>
              <td colspan="5">${loginVO.jobDetailNm}</td>
            </tr>
            <%--</c:if>--%>
          </table>
          <table class="table table-bordered mt20" id="eduReqTable">
            <colgroup>
              <col width="130px">
              <col width="370px">
              <col width="130px">
              <col width="370px">
            </colgroup>
            <thead>
            <tr>
              <th>학습목표</th>
              <td>
                <input type="text" id="eduCategoryDetailName" style="width: 150px">
                <input type="hidden" id="eduCategoryDetailId">
                <input type="button" id="targetTechBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="목표기술서 선택" onclick="eduReq.targetEduSetPop();"/>
              </td>
              <th>목표레벨</th>
              <td>
                <input type="text" id="levelId" style="width: 50px"> 레벨
                <input type="hidden" id="dutyClass">
              </td>
            </tr>
            <tr>
              <c:choose>
                <c:when test="${eduFormType == 5}">
                  <th>${eduNameVar}</th>
                  <td>
                    <input type="text" id="eduName" style="width: 300px">
                  </td>
                  <th>작가명</th>
                  <td>
                    <input type="text" id="bookWriter" style="width: 300px">
                  </td>
                </c:when>
                <c:otherwise>
                  <th>${eduNameVar}</th>
                  <td colspan="3">
                    <input type="text" id="eduName" style="width: 800px">
                  </td>
                </c:otherwise>
              </c:choose>
            </tr>
            <c:choose>
              <c:when test="${eduFormType == 3}">
                <tr>
                  <th>참석형태</th>
                  <td colspan="3">
                    <div style="display: flex; align-items: center">
                      <span id="objectForumType" class="mr20"></span> (발표제목 : <input type="text" id="objectForumVal" style="width: 450px">)
                    </div>
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 5}">
                <tr>
                  <th>페이지 수</th>
                  <td>
                    <input type="text" id="bookPage" style="width: 100px"> Page
                  </td>
                  <th>출판사</th>
                  <td>
                    <input type="text" id="bookPulish" style="width: 300px">
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 6}">
                <tr>
                  <th>출처</th>
                  <td>
                    <input type="text" id="treaOrigin" style="width: 300px">
                  </td>
                  <th>편수</th>
                  <td>
                    <input type="text" id="treaUnit" style="width: 100px"> 편
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 7}">
                <tr>
                  <th>학술지 유형</th>
                  <td>
                    <span id="treaType" class="mr20"></span>
                  </td>
                  <th>저자유형</th>
                  <td>
                    <span id="treaUser" class="mr20"></span>
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 8}">
                <tr>
                  <th>권수</th>
                  <td colspan="3">
                    <input type="text" id="bookUnit" style="width: 100px"> 권
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 9}">
                <tr>
                  <th>방문지</th>
                  <td colspan="3">
                    <input type="text" id="careName" style="width: 300px">
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 10}">
                <tr>
                  <th>취득종류</th>
                  <td colspan="3">
                    <span id="compType" class="mr20"></span>
                  </td>
                </tr>
                <tr>
                  <th>발급기관</th>
                  <td colspan="3">
                    <input type="text" id="careName" style="width: 300px">
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <c:if test="${eduFormType != 3}">
              <tr>
                <th><span>${eduObjectVar}</span></th>
                <td colspan="3">
                  <textarea id="eduObject" style="width: 800px; height: 100px"></textarea>
                </td>
              </tr>
            </c:if>
            <tr>
              <th><span>${eduContentVar}</span><br>(요약)</th>
              <td colspan="3">
                <textarea id="eduContent" style="width: 800px;  height: 200px"></textarea>
              </td>
            </tr>
            <tr>
              <th>${eduDateVar}</th>
              <td colspan="3">
                <input type="text" id="startDt" style="width: 150px"> ~ <input type="text" id="endDt" style="width: 150px">
                <c:choose>
                  <c:when test="${eduFormType == 1 || eduFormType == 2 || eduFormType == 3 || eduFormType == 4 || eduFormType == 5 || eduFormType == 6 || eduFormType == 9 || eduFormType == 10}">
                    (총 <input type="text" id="termDay" style="width: 50px"> 일 <input type="text" id="termTime" style="width: 50px"> 시간)
                    <c:choose>
                      <c:when test="${eduFormType == 5}">
                        / 50페이지당 1시간
                      </c:when>
                      <c:when test="${eduFormType == 6}">
                        / 2편당 1시간
                      </c:when>
                      <c:when test="${eduFormType == 9 || eduFormType == 10 || eduFormType == 11}">
                        / 1일 최대4시간
                      </c:when>
                    </c:choose>
                  </c:when>
                </c:choose>
              </td>
            </tr>
            <c:choose>
              <c:when test="${eduFormType == 1 || eduFormType == 2 || eduFormType == 3 || eduFormType == 4}">
                <tr>
                  <th>${careVar}</th>
                  <td colspan="3">
                    <span>${careNameVar}</span> : <input type="text" id="careName" style="width: 400px"><br><div class="mt5"></div>
                    <span>${careLocationVar}</span> : <input type="text" id="careLocation" style="width: 400px"> <span id="careTelNumVar">
                    <c:if test="${eduFormType == 1}">
                      (전화 : <input type="text" id="firstCareTelNum" style="width: 50px"> - <input type="text" id="secondCareTelNum" style="width: 50px"> - <input type="text" id="thirdCareTelNum" style="width: 50px">)</span>
                    </c:if>
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <c:choose>
              <c:when test="${eduFormType != 11}">
                <tr>
                  <th>${eduMoneyVar}</th>
                  <td>
                    <input type="text" id="eduMoney" style="width: 150px; text-align: right" value="0" onkeyup="fn_inputNumberFormat(this)" oninput="onlyNumber(this)"> 원
                  </td>
                  <th>결제수단</th>
                  <td>
                    <span id="eduMoneyType"></span>
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <c:choose>
              <c:when test="${eduFormType == 1 || eduFormType == 2 || eduFormType == 3 || eduFormType == 4}">
                <tr>
                  <th>환급 예상액</th>
                  <td>
                    <input type="text" id="returnMoney" style="width: 150px; text-align: right" value="0" onkeyup="fn_inputNumberFormat(this)" oninput="onlyNumber(this)"> 원
                  </td>
                  <th>환급 필요서류</th>
                  <td>
                    <input type="text" id="returnDoc" style="width: 300px">
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <tr>
              <th>관련사업</th>
              <td colspan="3">
                <span id="purcType"></span>
              </td>
            </tr>
            <tr id="project" style="display: none;">
              <th scope="row" class="text-center th-color">프로젝트</th>
              <td colspan="3">
                      <span>
                          <input type="text" id="pjtNm" value=""  style="width: 40%;">
                          <input type="hidden" id="pjtSn" value="" />
                          <input type="hidden" id="pjtCd" name="pjtCd">
                          <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="eduReq.fn_projectPop()">검색</button>
                      </span>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td colspan="3">
                <label for="fileList" class="k-button k-button-solid-base">파일첨부</label>
                <input type="file" id="fileList" name="fileList" onchange="eduReq.fileChange()" style="display: none" multiple>
                <ul id="ulSetFileName" style="padding-left: 20px;"></ul>
                <ul id="ulFileName" style="padding-left: 20px;"></ul>
              </td>
            </tr>
            <tr>
              <th>신청날짜</th>
              <td colspan="3">
                <input type="text" id="regDate"style="width: 150px">
              </td>
            </tr>
          </table>
        </form>
      </div>

    </div>
  </div>
</div>
<script>
  eduReq.fn_defaultScript();

  function selectProject(sn, nm, cd, baseYear){
    $("#pjtSn").val(sn);
    $("#pjtNm").val(nm);
    $("#pjtCd").val(cd);
  }


</script>
</body>
