<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
  .k-radio-list-horizontal, .k-radio-list.k-list-horizontal {
    gap: 0px;
  }
</style>
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/eduInfoViewPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="eduInfoId" value="${data.eduInfoId}"/>
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">교육수강 신청서 조회</div>
        <form id="eduReqForm">
          <table class="table table-bordered" id="userInfoTable" style="width: 1000px;">
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
              <td id="userDept"></td>
              <th>직 위</th>
              <td id="userPosition"></td>
              <th>성 명</th>
              <td id="userName"></td>
            </tr>
            <tr>
              <th>담당 직무</th>
              <td colspan="5" id="userDuty"></td>
            </tr>
          </table>

          <div class="mt20">
            <b>학습방법 : <span id="">교육기관 참가교육</span></b>
          </div>
          <table class="table table-bordered" id="eduReqTable" style="width: 1000px;">
            <colgroup>
              <col width="130px">
              <col width="370px">
              <col width="130px">
              <col width="370px">
            </colgroup>
            <thead>
            <tr>
              <th>학습목표</th>
              <td id="eduCategoryDetailNameTd"></td>
              <th>목표레벨</th>
              <td id="levelIdTd"></td>
            </tr>
            <tr id="eduNameTr">
              <th id="eduNameVar">과정명</th>
              <td colspan="3" id="eduNameTd"></td>
            </tr>
            <tr id="bookTr" style="display: none">
              <th id="bookPageVar">페이지 수</th>
              <td>
                <input type="text" id="bookPage" style="width: 100px"> Page
              </td>
              <th id="bookPulishVar">출판사</th>
              <td>
                <input type="text" id="bookPulish" style="width: 300px">
              </td>
            </tr>
            <tr id="objectForumTr" style="display: none">
              <th>참석형태</th>
              <td colspan="3">
                <div style="display: flex; align-items: center">
                  <span id="objectForumType" class="mr20"></span> (발표제목 : <input type="text" id="objectForumVal" style="width: 450px">)
                </div>
              </td>
            </tr>
            <tr id="eduObjectTr">
              <th><span id="eduObjectVar">학습목적</span></th>
              <td colspan="3" id="eduObjectTd"></td>
            </tr>
            <tr>
              <th><span id="eduContentVar">학습내용</span><br>(요약)</th>
              <td colspan="3" id="eduContentTd"></td>
            </tr>
            <tr>
              <th id="dtTh">학습기간</th>
              <td colspan="3" id="dtTd">
                <input type="text" id="startDt" style="width: 150px">~
                <input type="text" id="endDt" style="width: 150px">
                (총 <input type="text" id="termDay" style="width: 50px"> 일 <input type="text" id="termTime" style="width: 50px"> 시간)
              </td>
            </tr>
            <tr id="careTr">
              <th id="careTh">교육기관</th>
              <td colspan="3" id="careTd">
                <span id="careNameVar">기관명</span> : <input type="text" id="careName" style="width: 400px"><br><div class="mt5"></div>
                <span id="careLocationVar">소재지</span> : <input type="text" id="careLocation" style="width: 400px"> <span id="careTelNumVar">(전화 : <input type="text" id="firstCareTelNum" style="width: 50px"> - <input type="text" id="secondCareTelNum" style="width: 50px"> - <input type="text" id="thirdCareTelNum" style="width: 50px">)</span>
              </td>
            </tr>
            <tr>
              <th id="eduMoneyTh">교육비</th>
              <td id="eduMoneyTd">
                <input type="text" id="eduMoney" style="width: 150px" value="0"> 원
              </td>
              <th>결제수단</th>
              <td id="eduMoneyTypeTd">
                <span id="eduMoneyType"></span>
              </td>
            </tr>
            <tr>
              <th>여비신청여부</th>
              <td colspan="3" id="travelMoneyTypeTd">
                <span id="travelMoneyType"></span>
              </td>
            </tr>
            <tr>
              <th>환급 예상액</th>
              <td id="returnMoneyTd">
                <input type="text" id="returnMoney" style="width: 150px" value="0"> 원
              </td>
              <th>환급 필요서류</th>
              <td id="returnDocTd">
                <input type="text" id="returnDoc" style="width: 300px">
              </td>
            </tr>
            <tr>
              <th>관련사업</th>
              <td colspan="3">
                임시사업
              </td>
            </tr>
            <tr>
              <th>첨부서류</th>
              <td colspan="3" id="attachDocNameTd">
                <input type="text" id="attachDocName" style="width: 800px">
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td colspan="3">
              </td>
            </tr>
            <tr>
              <th>신청날짜</th>
              <td colspan="3" id="regDateTd">
                <input type="text" id="regDate"style="width: 150px">
              </td>
            </tr>
          </table>
        </form>
      </div>
      <div class="btn-st" style="margin-top:10px; text-align:center;">
        <input type="button" class="k-button k-button-solid-info k-rounded" value="결재요청" onclick="eduInfoViewPop.updateApprStat(10);"/>
        <input type="button" class="k-button k-button-solid-info k-rounded" value="결재승인" onclick="eduInfoViewPop.updateApprStat(20);"/>
        <input type="button" class="k-button k-button-solid-info k-rounded" value="결과보고서 작성" onclick="eduInfoViewPop.eduResultReqPop();"/>
        <input type="button" class="k-button k-button-solid-info k-rounded" value="결과보고서 조회" onclick="eduInfoViewPop.eduResultViewPop();"/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="취소" onclick="window.close();"/>
      </div>
    </div>
  </div>
</div>
<script>
  eduInfoViewPop.init();
</script>
</body>
