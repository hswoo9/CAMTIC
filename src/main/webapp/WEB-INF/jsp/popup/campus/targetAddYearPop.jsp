<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/targetAddYearPop.js?v=${today}"></script>
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
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="loginId" value="${loginVO.id}"/>
<div class="col-md-12 col-lg-12 dash-left">
  <div class="panel">
    <div class="panel-heading">
      <h4 class="panel-title">학습 목표기술서 설정</h4>
      <div class="title-road">직무관리 &gt; 학습체계도설정</div>
    </div>

    <div class="panel-body">
      <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

      <div>
        <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
          <tr>
            <td>
              STEP1 : 년도 선택
              <br> 1. 적용될 년도를 선택하여 줍니다.
              <br> 2. 이후 "주업무"와 연계업무" 설정시 기본 년도로 설정 됩니다.
            </td>
          </tr>
          <tr>
            <td style="border-bottom:0; background-color: white">
              <div style="display:flex;">
                <div>
                  <span>년도선택</span>
                  <input type="text" id="targetYear" style="width: 140px;">
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="btn-st mt10" style="text-align: center">
        <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick="targetAddYearPop.saveTarget();"/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick="window.close()"/>
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  targetAddYearPop.init();
</script>
</body>
