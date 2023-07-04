<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/recruitReqPop.js?v=${today}"></script>
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
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header" style="padding-top:45px;">
      <div class="col-lg-11" style="margin:0 auto;">
        <div class="table-responsive">
          <div class="popupTitleSt">채용 등록</div>
          <form id="recruitReqForm">
            <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
            <table class="table table-bordered mb-0" id="recruitReqPop">
              <colgroup>
                <col width="15%">
                <col width="28%">
                <col width="28%">
                <col width="28%">
              </colgroup>
              <thead>
              <tr>
                <th>구분</th>
                <th colspan="3">내용</th>
              </tr>
              <tr>
                <td style="text-align: center">공고번호</td>
                <td colspan="3">
                  공고 <input type="text" id="text1" style="width: 30%" value="제2023-01호">
                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="중복확인" onclick=""/>
                </td>
              </tr>
              <tr>
                <td style="text-align: center">공고제목</td>
                <td colspan="3">
                  <input type="text" id="text2" style="width: 70%">
                </td>
              </tr>
              <tr>
                <td style="text-align: center">공고내용</td>
                <td colspan="3">
                  <input type="text" id="text3" style="width: 70%">
                </td>
              </tr>
              <tr>
                <td style="text-align: center">공고일자</td>
                <td colspan="3">
                  <input type="text" id="date1" style="width: 15%">
                  <input type="text" id="text4" style="width: 50%">
                </td>
              </tr>
              <tr>
                <td style="text-align: center">모집일시</td>
                <td colspan="3">
                  <input type="text" id="date2" style="width: 15%">
                  <input type="text" id="time1" style="width: 10%"> ~ <input type="text" id="date3" style="width: 15%">
                  <input type="text" id="time2" style="width: 10%">
                </td>
              </tr>
              <tr>
                <td rowspan="3" style="text-align: center">모집분야<br><input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base mt10" value="추가" onclick=""/></td>
                <td>
                  <div style="display:flex; justify-content: space-between; align-items: center">
                    부서<input type="text" id="drop1" style="width: 70%">
                  </div>
                </td>
                <td>
                  <div style="display:flex; justify-content: space-between; align-items: center">
                    팀 <input type="text" id="drop2" style="width: 70%">
                  </div>
                </td>
                <td>
                  <div style="display:flex; justify-content: space-between; align-items: center">
                    직무(모집분야) <input type="text" id="text5" style="width: 70%">
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  채용인원 <input type="text" id="text6" style="width: 20%"> 명
                </td>
                <td>
                  경력 <input type="checkbox" id="check1">신입 <input type="checkbox" id="check2">경력 <input type="text" id="drop3" style="width: 40%">
                </td>
                <td>
                  필요경력 <input type="text" id="text7" style="width: 20%"> 년 근무형태 <input type="text" id="text8" style="width: 20%">
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  자격요건 <input type="text" id="text9" style="width: 80%">
                </td>
              </tr>
              <tr>
                <td>
                  모집분야 기타
                </td>
                <td colspan="3">
                  <input type="text" id="text10" style="width: 80%">
                </td>
              </tr>
              <tr>
                <td>
                  응시자격 기타
                </td>
                <td colspan="3">
                  <input type="text" id="text11" style="width: 80%">
                </td>
              </tr>
              <tr>
                <td>
                  근무형태
                </td>
                <td colspan="3">
                  <input type="text" id="text12" style="width: 80%">
                </td>
              </tr>
              <tr>
                <td>
                  전형방법
                </td>
                <td colspan="3">
                  <input type="text" id="text13" style="width: 80%">
                </td>
              </tr>
              <tr>
                <td rowspan="2">
                  지원서류
                </td>
                <td colspan="3">
                  <input type="checkbox" id="check3">
                  <input type="text" id="text14" style="width: 80%"><input type="file" class="mt5">
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <input type="checkbox" id="check4">
                  <input type="text" id="text15" style="width: 80%"><input type="file" class="mt5">
                </td>
              </tr>
              <tr>
                <td>
                  공고자료
                </td>
                <td colspan="3">
                  <input type="text" id="text16" style="width: 80%"><input type="file" class="mt5">
                </td>
              </tr>
              <tr>
                <td>
                  원서접수
                </td>
                <td colspan="3">
                  <input type="text" id="text17" style="width: 80%">
                </td>
              </tr>
              <tr>
                <td>
                  기타사항
                </td>
                <td colspan="3">
                  <input type="text" id="text18" style="width: 80%">
                </td>
              </tr>
              <tr>
                <td>
                  상태(값 자동변경)
                </td>
                <td colspan="3">
                  <input type="radio" id="radio1">작성중(임시저장)
                  <input type="radio" id="radio2">접수중
                  <input type="radio" id="radio3">심사중
                  <input type="radio" id="radio4">채용완료
                </td>
              </tr>
            </table>
          </form>
        </div>
        <div class="btn-st" style="margin-top:10px; text-align:center;">
          <input type="button" class="k-button k-button-solid-info" value="임시저장" onclick=""/>
          <input type="button" class="k-button k-button-solid-info" value="등록" onclick=""/>
          <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick=""/>
        </div>
      </div>
    </div>
</div>
<script>
  recruitReqPop.defaultScript();
</script>
</body>
