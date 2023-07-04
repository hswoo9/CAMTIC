<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/systemAdminPop.js?v=${today}"></script>
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

  .k-grid td {
    padding: 0;
    padding-left: 8px;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-md-12 col-lg-12 dash-left">
  <div class="panel">
    <div class="panel-heading">
      <h4 class="panel-title">학습체계도 설정</h4>
      <div class="title-road">목표기술서관리 &gt; 학습체계도설정</div>
    </div>

    <div class="panel-body">
      <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

      <div>
        <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
          <tr>
            <td style="border-bottom:0; background-color: white">
              <div style="display:flex;">
                <div class="mr10">
                  <span>연도</span>
                  <input type="text" id="recruitYear" style="width: 140px;">
                </div>
                <div class="mr10">
                  <input type="text" id="searchType" style="width: 140px;">
                  <input type="text" id="searchVal" style="width: 140px;">
                </div>
                <div class="mr10">
                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick=""/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div class="col-md-6 col-lg-6 pl-0">
          <div id="mainGrid" style="margin:20px 0;"></div>
        </div>
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  systemAdminPop.init();
</script>
</body>
