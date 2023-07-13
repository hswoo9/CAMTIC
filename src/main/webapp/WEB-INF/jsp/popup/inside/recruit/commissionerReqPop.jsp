<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/commissionerReqPop.js?v=${today}"></script>
<%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">면접심사 평가위원 등록</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
      </div>
    </div>
    <form id="recruitReqForm" style="padding: 20px 30px;">
      <table class="popTable table table-bordered mb-0" id="recruitReqPop">
        <colgroup>
          <col width="15%">
          <col width="35%">
          <col width="15%">
          <col width="35%">
        </colgroup>
        <thead>
        <tr>
          <th>
            <span class="red-star"></span>임시아이디
          </th>
          <td><input type="text" id="text1" style="width: 80%"></td>
          <th>
            <span class="red-star"></span>임시비밀번호
          </th>
          <td><input type="text" id="text2" style="width: 80%"></td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>성명
          </th>
          <td><input type="text" id="text3" style="width: 80%"></td>
          <th>
            <span class="red-star"></span>주민등록번호
          </th>
          <td><input type="text" id="text4" style="width: 30%"> - <input type="text" id="text5" style="width: 30%"></td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>휴대폰
          </th>
          <td><input type="text" id="text6" style="width: 80%"></td>
          <th>
            <span class="red-star"></span>이메일
          </th>
          <td><input type="text" id="text7" style="width: 80%"></td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>소속
          </th>
          <td><input type="text" id="text8" style="width: 80%"></td>
          <th>
            <span class="red-star"></span>김위원
          </th>
          <td><input type="text" id="text9" style="width: 80%"></td>
        </tr>
      </table>
    </form>
</div>
<script>
  commissionerReqPop.defaultScript();
</script>
</body>
