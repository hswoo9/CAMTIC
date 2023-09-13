<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<%--<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>--%>
<body class="font-opensans" style="background-color:#fff;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">보유 면허</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="fn_windowClose()">닫기</button>
      </div>
    </div>
    <form id="subHolidayReqPop" style="padding: 20px 30px;">
      <input type="hidden" id="type" name="type" value="${params.type}">
      <input type="hidden" id="key" name="key" value="${params.key}">
      <input type="hidden" id="id" name="id" value="${params.id}">
      <table class="popTable table table-bordered mb-0" id="userReqPop">
        <colgroup>
          <col width="30%">
          <col width="30%">
          <col width="30%">
        </colgroup>
        <thead>
        <%--<tr>
          <th colspan="3">보유 면허</th>
        </tr>--%>
        <tr>
          <th>종류</th>
          <td colspan="2">
            <input type="text" id="licenseName" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>취득일</th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;" disabled>
          </td>
        </tr>
        <tr>
          <th>자격번호</th>
          <td colspan="2">
            <input type="text" id="licenseNum" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>발급기관</th>
          <td colspan="2">
            <input type="text" id="agency" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>증명서</th>
          <td colspan="2" style="padding:20 0 0 0px; cursor: pointer">
            <c:if test="${resultMap.certificateAddFile ne null}">
                  <span onclick="fileDown('${resultMap.certificateAddFile.file_path}${resultMap.certificateAddFile.file_uuid}', '${resultMap.certificateAddFile.file_org_name}.${resultMap.certificateAddFile.file_ext}')">
                      ${resultMap.certificateAddFile.file_org_name}.${resultMap.certificateAddFile.file_ext}
                  </span>
            </c:if>
          </td>
        </tr>
        <tr>
          <th>비고</th>
          <td colspan="2">
            <textarea name="bmk" id="bmk" placeholder="비고" style="width: 100%;"></textarea>
          </td>
        </tr>
      </table>
    </form>
  </div>
</body>
<script>
  $(function(){
    fn_default();
    fn_dataSet();
  });
  function fn_default() {
    customKendo.fn_datePicker("sDate", '', "yyyy-MM-dd", '');
    customKendo.fn_textBox("licenseName");
    customKendo.fn_textBox("licenseNum");
    customKendo.fn_textBox("agency");
    $("#bmk").kendoTextArea({
      rows : 5,
    });
    $("#licenseName").kendoTextBox();
    $("#licenseNum").kendoTextBox();
    $("#agency").kendoTextBox();
  }
  function fn_dataSet() {
    var result = customKendo.fn_customAjax('/userManage/userInfoModDetail', {
      key : $("#key").val(),
      type : $("#type").val(),
      id : $("#id").val()
    });

    if(result.flag) {
      var e = result.rs;

      $("#licenseName").val(e.CERTIFICATE_NAME); //자격/면허명
      $("#sDate").val(e.ACQUISITION_DAY); //취득일
      $("#licenseNum").val(e.CERTIFICATE_NUM); //자격/면허 번호
      $("#agency").val(e.ISSUER); //발급기관
      $("#bmk").val(e.RMK); //비고
    }

    /*수정 안되게 disabled*/
    $("#licenseName").data("kendoTextBox").enable(false);
    $("#licenseNum").data("kendoTextBox").enable(false);
    $("#agency").data("kendoTextBox").enable(false);
    $("#bmk").data("kendoTextArea").enable(false);

  }

  function fn_windowClose() {
    window.close();
  }

</script>
