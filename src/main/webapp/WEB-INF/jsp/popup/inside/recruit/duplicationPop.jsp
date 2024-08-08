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
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">응시자 중복지원 목록</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>

    <div class="panel-body">
      <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
      <input type="hidden" id="notRecruitInfoSn" name="notRecruitInfoSn" value="${params.notRecruitInfoSn}">

      <table class="searchTable table table-bordered mb-0">
        <tr>
          <th>성명</th>
          <td>
            <span id="userName">${params.userName}</span>
          </td>
          <th>이메일</th>
          <td>
            <span id="userEmail">${params.userEmail}</span>
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
      notRecruitInfoSn : $("#notRecruitInfoSn").val(),
      userName : $("#userName").text(),
      userEmail : $("#userEmail").text()
    }

    $("#mainGrid").kendoGrid({
      dataSource: customKendo.fn_gridDataSource2("/inside/getUserDuplicationList.do", data),
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
          field: "JOB",
          title: "지원분야",
          // template : function(e){
          //   return '<a onclick="recruitAdminPop.applicationInfo(' + e.RECRUIT_INFO_SN + ')">' + e.JOB + '</a>'
          // }
        }, {
          field: "SAVE_DATE",
          title: "지원일시",
          width : 150
        }, {
          field: "DOC_SCREEN_AVERAGE",
          title: "서류심사(점수)",
          width : 120,
          template : function(e){
            if(e.DOC_SCREEN_AVERAGE != null){
              return Math.round(e.DOC_SCREEN_AVERAGE * 10) / 10;
            }else{
              return "-"
            }
          }
        }, {
          field: "IN_SCREEN_AVERAGE",
          title: "면접심사(점수)",
          width : 120,
          template : function(e){
            if(e.IN_SCREEN_AVERAGE != null && e.IN_AVOID != "Y"){
              return Math.round(e.IN_SCREEN_AVERAGE * 10) / 10;
            }else if(e.IN_AVOID == "Y"){
              return "불참"
            }else{
              return "-"
            }
          }
        }
      ],
    }).data("kendoGrid");
  }
</script>
</body>
