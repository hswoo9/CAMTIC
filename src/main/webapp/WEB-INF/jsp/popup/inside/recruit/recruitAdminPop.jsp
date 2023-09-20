<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/recruitAdminPop.js?v=${today}"></script>
<style>
  .k-grid-toolbar{
    justify-content: flex-end !important;
  }

  .k-grid-norecords{
    justify-content: space-around;
  }

  /*:root {*/
  /*  --line-border-fill: #3498db;*/
  /*  --line-border-empty: #e0e0e0;*/
  /*}*/

  /*.container {*/
  /*  text-align: center;*/
  /*  margin-bottom: 15px;*/
  /*}*/

  /*.progress-container {*/
  /*  display: flex;*/
  /*  justify-content: space-between;*/
  /*  position: relative;*/
  /*  max-width: 100%;*/
  /*}*/

  /*.progress-container::before {*/
  /*  content: ""; !* Mandatory with ::before *!*/
  /*  position: absolute;*/
  /*  top: 50%;*/
  /*  left: 0;*/
  /*  transform: translateY(-50%);*/
  /*  height: 4px;*/
  /*  width: 100%;*/
  /*  z-index: -1;*/
  /*}*/

  /*.circle {*/
  /*  background-color: #fff;*/
  /*  color: #999;*/
  /*  height: 30px;*/
  /*  width: 300px;*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  justify-content: center;*/
  /*  border: 3px solid var(--line-border-empty);*/
  /*  transition: 0.4s ease;*/
  /*  margin-left: 15px;*/
  /*  cursor: pointer;*/
  /*}*/

  /*.circle.active {*/
  /*  border-color: var(--line-border-fill);*/
  /*  font-weight: bold;*/
  /*  color: black;*/
  /*}*/
  /*.circle.ready {*/
  /*  border-color: #FF772EFF;*/
  /*  font-weight: bold;*/
  /*  color: black;*/
  /*}*/

  a:hover {
    text-decoration: underline !important;
    color: blue !important;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">채용공고 관리</h3>
      <input type="hidden" id="recruitStatusSn" value="">
      <div class="btn-st popButton" style="display: flex;gap: 5px;">
        <div id="recruitStatusDiv">
        </div>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>

    <div class="panel-body">
      <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${params.recruitInfoSn}">
      <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
      <table class="searchTable table table-bordered mb-0">
        <colgroup>
          <col width="10%">
          <col>
          <col width="10%">
          <col width="20%">
          <col width="10%">
          <col width="20%">
        </colgroup>
        <tr>
          <th class="text-center th-color">채용분야</th>
          <td>
            <input type="text" id="recruitAreaInfoSn">
          </td>
          <th class="text-center th-color">서류심사</th>
          <td>
            <input type="text" id="docScreenType">
          </td>
          <th class="text-center th-color">면접심사</th>
          <td>
            <input type="text" id="interViewType">
          </td>
        </tr>
      </table>

      <div class="mt10" style="text-align: right">
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="docScreenPopBtn" value="S" onclick="recruitAdminPop.screenViewPop('doc')">
          <span>서류심사 평가표</span>
        </button>
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" id="inScreenPopBtn" value="S" onclick="recruitAdminPop.screenViewPop('in')">
          <span>면접심사 평가표</span>
        </button>
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="S" onclick="recruitAdminPop.recruitDetailPop();">
          <span>공고내용 조회</span>
        </button>
      </div>

      <div class="mt10" style="text-align: right">
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="docUrl" onclick="recruitAdminPop.getEvalUrlSet('doc')">
          <span>서류심사 바로가기</span>
        </button>
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="docPass" value="D" onclick="recruitAdminPop.setApplicationUpd(this.value, 'pass')">
          <span>서류심사 합격</span>
        </button>
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="docFail" value="DF" onclick="recruitAdminPop.setApplicationUpd(this.value, 'fail')">
          <span>서류심사 불합격</span>
        </button>

        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" id="inUrl" onclick="recruitAdminPop.getEvalUrlSet('in')">
          <span>면접심사 URL 생성</span>
        </button>
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info"onclick="recruitAdminPop.inTimeSetPop()">
          <span>면접정보 설정</span>
        </button>
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" id="inPass" value="I" onclick="recruitAdminPop.setApplicationUpd(this.value, 'pass')">
          <span>면접심사 합격</span>
        </button>
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" id="inFail" value="IF" onclick="recruitAdminPop.setApplicationUpd(this.value, 'fail')">
          <span>면접심사 불합격</span>
        </button>
        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" id="inAvoid" value="I" onclick="recruitAdminPop.setInAvoidUpd()">
          <span>면접불참</span>
        </button>
      </div>

      <div>
        <div id="mainGrid" style="margin:20px 0;"></div>
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  recruitAdminPop.init(JSON.parse('${recruit}'));
</script>
</body>
