<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/commissionerReqPop.js?v=${today}"></script>
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
          <div class="popupTitleSt">면접심사 평가위원 등록</div>
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
                <col width="35%">
                <col width="15%">
                <col width="35%">
              </colgroup>
              <thead>
              <tr>
                <th>임시아이디</th>
                <td><input type="text" id="text1" style="width: 80%"></td>
                <th>임시비밀번호</th>
                <td><input type="text" id="text2" style="width: 80%"></td>
              </tr>
              <tr>
                <th>성명</th>
                <td><input type="text" id="text3" style="width: 80%"></td>
                <th>주민등록번호</th>
                <td><input type="text" id="text4" style="width: 30%"> - <input type="text" id="text5" style="width: 30%"></td>
              </tr>
              <tr>
                <th>휴대폰</th>
                <td><input type="text" id="text5" style="width: 80%"></td>
                <th>이메일</th>
                <td><input type="text" id="text6" style="width: 80%"></td>
              </tr>
              <tr>
                <th>소속</th>
                <td><input type="text" id="text7" style="width: 80%"></td>
                <th>김위원</th>
                <td><input type="text" id="text8" style="width: 80%"></td>
              </tr>
            </table>
          </form>
        </div>
        <div class="btn-st" style="margin-top:10px; text-align:center;">
          <input type="button" class="k-button k-button-solid-info" value="저장" onclick=""/>
          <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick=""/>
        </div>
      </div>
    </div>
</div>
<script>
  commissionerReqPop.defaultScript();
</script>
</body>
