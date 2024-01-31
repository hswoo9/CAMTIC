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
<script type="text/javascript" src="/js/intra/campus/eduResultViewPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<div class="col-lg-12" style="padding:0;">
  <div class="card-header pop-header">
    <h3 class="card-title title_NM">회계담당자 설정</h3>
    <div class="btn-st popButton">
        <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick=""/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
    </div>
  </div>
  <div class="card-header" style="padding-top:25px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
          <table class="table table-bordered" id="userInfoTable" style="width: 888px;">
            <colgroup>
              <col width="30%">
              <col width="70%">
            </colgroup>
            <thead>
            <tr>
              <th>법인운영</th>
              <td><input type="text" id="responsable1" style="width: 100%;"></td>
            </tr>
            <tr>
              <th>R&D</th>
              <td><input type="text" id="responsable2" style="width: 100%;"></td>
            </tr>
            <tr>
              <th>비R&D</th>
              <td><input type="text" id="responsable3" style="width: 100%;"></td>
            </tr>
            <tr>
              <th>엔지니어링</th>
              <td><input type="text" id="responsable4" style="width: 100%;"></td>
            </tr>
            <tr>
              <th>용역/기타</th>
              <td><input type="text" id="responsable5" style="width: 100%;"></td>
            </tr>
            <tr>
              <th>캠아이템</th>
              <td><input type="text" id="responsable6" style="width: 100%;"></td>
            </tr>
          </table>
        </div>
    </div>
  </div>
</div>
</div>
<script>
  $(function (){

    var data = {};
    let responList = customKendo.fn_customAjax("/campus/getEduResponsableList", data);
    customKendo.fn_dropDownList("responsable1", responList.rs, "NAME_POSITION_TXT", "EMP_SEQ",2);
    customKendo.fn_dropDownList("responsable2", responList.rs, "NAME_POSITION_TXT", "EMP_SEQ",3);
    customKendo.fn_dropDownList("responsable3", responList.rs, "NAME_POSITION_TXT", "EMP_SEQ",3);
    customKendo.fn_dropDownList("responsable4", responList.rs, "NAME_POSITION_TXT", "EMP_SEQ",3);
    customKendo.fn_dropDownList("responsable5", responList.rs, "NAME_POSITION_TXT", "EMP_SEQ",3);
    customKendo.fn_dropDownList("responsable6", responList.rs, "NAME_POSITION_TXT", "EMP_SEQ",3);
  });
</script>
</body>
