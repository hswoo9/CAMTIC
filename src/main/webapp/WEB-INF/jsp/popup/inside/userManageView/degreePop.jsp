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
      <h3 class="card-title title_NM">학력 사항</h3>
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
          <th colspan="3">학력등록</th>
        </tr>--%>
        <tr>
          <th>구분</th>
          <td colspan="2">
            <input type="text" id="gubun" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>기간</th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;" disabled> ~ <input type="text" id="eDate" style="width: 45%;" disabled>
          </td>
        </tr>
        <tr>
          <th>학교 및 학과</th>
          <td colspan="2">
            <input type="text" id="school" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>학위</th>
          <td colspan="2">
            <input type="text" id="degree" value="" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>졸업</th>
          <td colspan="2">
            <input type="text" id="graduation" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>성적</th>
          <td colspan="2">
            <input type="text" id="score" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>학위증빙</th>
          <td colspan="2" style="padding:20 0 0 0px; cursor: pointer">
              <c:if test="${resultMap.gradeFile ne null}">
                  <span onclick="fileDown('${resultMap.gradeFile.file_path}${resultMap.gradeFile.file_uuid}', '${resultMap.gradeFile.file_org_name}.${resultMap.gradeFile.file_ext}')">
                      ${resultMap.gradeFile.file_org_name}.${resultMap.gradeFile.file_ext}
                  </span>
              </c:if>
          </td>
        </tr>
        <tr>
          <th>성적증빙</th>
          <td colspan="2" style="padding:20 0 0 0px; cursor: pointer">
            <c:if test="${resultMap.socreFile ne null}">
                  <span onclick="fileDown('${resultMap.socreFile.file_path}${resultMap.socreFile.file_uuid}', '${resultMap.socreFile.file_org_name}.${resultMap.socreFile.file_ext}')">
                      ${resultMap.socreFile.file_org_name}.${resultMap.socreFile.file_ext}
                  </span>
            </c:if>
          </td>
        </tr>
        <tr>
          <th>비고</th>
          <td colspan="2">
            <textarea name="bmk" id="bmk" style="width: 100%;"></textarea>
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
    customKendo.fn_datePicker("eDate", '', "yyyy-MM-dd", '');
    fn_codeSet();
    $("#gubun").kendoDropDownList({
      dataTextField: "HR_DT_CODE_NM",
      dataValueField: "value",
      dataSource: edCodeDataSource("B01")
    });
    $("#degree").kendoDropDownList({
      dataTextField: "HR_DT_CODE_NM",
      dataValueField: "value",
      dataSource: edCodeDataSource("B02")
    });
    $("#graduation").kendoDropDownList({
      dataTextField: "HR_DT_CODE_NM",
      dataValueField: "value",
      dataSource: edCodeDataSource("B03")
    });
    customKendo.fn_textBox("score");
    $("#bmk").kendoTextArea({
      rows : 5,
    });
    $("#school").kendoTextBox();
    $("#score").kendoTextBox();

  }
  function fn_dataSet() {
    var result = customKendo.fn_customAjax('/userManage/userInfoModDetail', {
      key : $("#key").val(),
      type : $("#type").val(),
      id : $("#id").val()
    });

    if(result.flag){
      var e = result.rs;

      $("#gubun").data("kendoDropDownList").value(e.GUBUN_CODE); //구분
      $("#sDate").val(e.ADMISSION_DAY); //입학일 '%Y-%m-%d'
      $("#eDate").val(e.GRADUATION_DAY); //졸업일
      $("#school").val(e.SCHOOL_NAME); //학교 및 학과
      $("#degree").data("kendoDropDownList").value(e.DEGREE_CODE); //학위
      $("#graduation").data("kendoDropDownList").value(e.GRADUATION_CODE); //졸업
      $("#bmk").val(e.RMK); //비고
      $("#score").val(e.SCORE); //성적
    }

    /*수정 안되게 disabled*/
    $("#gubun").data("kendoDropDownList").enable(false);
    $("#school").data("kendoTextBox").enable(false);
    $("#degree").data("kendoDropDownList").enable(false);
    $("#graduation").data("kendoDropDownList").enable(false);
    $("#score").data("kendoTextBox").enable(false);
    $("#bmk").data("kendoTextArea").enable(false);
  }
  function fn_codeSet() {
    $.ajax({
      url : '/userManage/getCodeList',
      type : "post",
      async : false,
      dataType : "json",
      success : function(result) {
        codeSet = result.rs;
        codeDropDown = result.rs;
      }
    })
  }

  function edCodeDataSource(code) {
    var data = [];
    var defaultCode = "";
    if(code != ""){
      switch (code){
        case "B01" :
          defaultCode = "학력구분"
          break
        case "B02" :
          defaultCode = "학위"
          break
        case "B03" :
          defaultCode = "졸업"
          break
        case "B04" :
          defaultCode = "전역여부"
          break
        default :
          defaultCode = "가족관계"
          break
      }
      data.push({"HR_DT_CODE_NM": defaultCode, "value" : ""});
    }else {
      data.push({"HR_DT_CODE_NM": "선택하세요", "value" : ""});
    }

    for(var i = 0 ; i < codeDropDown.length ; i++){
      codeDropDown[i].value = codeDropDown[i].HR_MC_CODE + codeDropDown[i].HR_MD_CODE + codeDropDown[i].HR_DT_CODE;
      if(codeDropDown[i].HR_MC_CODE + codeDropDown[i].HR_MD_CODE == code){
        data.push(codeDropDown[i]);
      }
    }
    return data;
  }

  function fn_windowClose() {
    window.close();
  }
</script>
