<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/history/rewardGubunPop.js?v=${today}"></script>
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

  .k-grid-header th.k-header .k-checkbox {
    margin: 0;
  }

  .dash-left .table > thead > tr > th, .dash-right .table > thead > tr > th, .dash-left .table > tbody > tr > th, .dash-right .table > tbody > tr > th, .dash-left .table > tfoot > tr > th, .dash-right .table > tfoot > tr > th, .dash-left .table > thead > tr > td, .dash-right .table > thead > tr > td, .dash-left .table > tbody > tr > td, .dash-right .table > tbody > tr > td, .dash-left .table > tfoot > tr > td, .dash-right .table > tfoot > tr > td {
    padding-left: 10px;
    padding-right: 10px;
  }

  td {
    text-align: center;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-md-12 col-lg-12 dash-left">
  <div class="panel">
    <div class="panel-heading">
      <h4 class="panel-title">포상 구분 관리</h4>
    </div>

    <div class="panel-body">
      <div class="table-responsive mt20">
        <table class="table table-bordered">
          <colgroup>
            <col width="20%">
            <col width="45%">
            <col width="33%">
          </colgroup>
          <thead>
            <tr>
              <th>순번</th>
              <th>포상구분</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                1
              </td>
              <td>
                <input type="text" id="text1" style="width: 100%">
              </td>
              <td>
                <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="저장" onclick=""/>
              </td>
            </tr>
            <tr>
              <td>
                추가
              </td>
              <td>
                <input type="text" id="text2" style="width: 100%">
              </td>
              <td>
                <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="추가" onclick=""/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-st" style="margin-top:10px; text-align:center;">
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="닫기"  onclick=""/>
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  rewardGubunPop.init();
</script>
</body>
