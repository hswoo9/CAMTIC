<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
  .k-grid-toolbar{
    justify-content: flex-end !important;
  }

  .k-grid-norecords{
    justify-content: space-around;
  }

  a:hover {
    text-decoration: underline !important;
    color: blue !important;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">평가위원 평가이력</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>

    <div class="panel-body">
      <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
      <input type="hidden" id="evalEmpSeq" name="evalEmpSeq" value="${empInfo.EMP_SEQ}">

      <table class="searchTable table table-bordered mb-0">
        <colgroup>
          <col style="width: 10%">
        </colgroup>
        <tr>
          <th>평가위원</th>
          <td>
            <span id="userName">${empInfo.EMP_NAME_KR}</span>
          </td>
        </tr>
      </table>

      <div id="mainGrid" style="margin:20px 0;"></div>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  mainGrid();

  function mainGrid(){
    var record = 0;

    var data = {
      empSeq : $("#evalEmpSeq").val(),
    }

    $("#mainGrid").kendoGrid({
      dataSource: customKendo.fn_gridDataSource2("/inside/getEvalHistoryList.do", data),
      sortable: true,
      scrollable: true,
      height: 300,
      pageable : {
        refresh : true,
        pageSizes : [ 10, 20, 50, "ALL" ],
        buttonCount : 5
      },
      noRecords: {
        template: "데이터가 존재하지 않습니다."
      },
      columns: [
        {
          title: "순번",
          width: 50,
          template : function(e){
            return $("#mainGrid").data("kendoGrid").dataSource.total() - record++
          }
        }, {
          field: "RECRUIT_TITLE",
          title: "공고명",
        }, {
          field: "USER_NAME",
          title: "응시자명",
          width : 100,
          template : function(e){
            return '<a style="cursor: pointer;" onclick="applicationInfo(' + e.APPLICATION_ID + ')">' + e.USER_NAME + '</a>'
          }
        }, {
          field: "IN_SCREEN_AVERAGE",
          title: "평균점수",
          width : 120,
          template : function(e){
            if(e.IN_SCREEN_AVERAGE != null && e.IN_SCREEN_AVERAGE != ""){
              return e.IN_SCREEN_AVERAGE + "점"
            }else{
              return "-"
            }
          }
        }
      ],
    }).data("kendoGrid");
  }

  function applicationInfo(e) {
    var url = "/inside/pop/applicationView.do?applicationId=" + e;
    var name = "recruitReqPop";
    var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
    var popup = window.open(url, name, option);
  }
</script>
</body>
