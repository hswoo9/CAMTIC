<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/form/formSelectPop.js?v=${today}"/>
<body class="font-opensans" style="background-color:#fff;">

<style>
  .k-treeview .k-i-collapse:before{background: url("/images/ico/ico_organ03_open.png");content: "";}
  .k-treeview .k-i-expand:before{background: url("/images/ico/ico_organ03_close.png");content: "";}
  .k-treeview .k-treeview-top.k-treeview-bot .k-i-collapse:before{background: url("/images/ico/ico_organ01.png")}
  .k-treeview .k-treeview-top.k-treeview-bot .k-i-expand:before{background: url("/images/ico/ico_organ01.png")}

  .k-treeview .k-i-collapse-disabled, .k-treeview .k-i-expand-disabled {
    cursor: default
  }
  .k-treeview .k-treeview-top, .k-treeview .k-treeview-mid, .k-treeview .k-treeview-bot {
    background-image: url('/images/bg/treeview-nodes.png');
    background-repeat: no-repeat;
    margin-left: -16px;
    padding-left: 16px;
  }
  .k-treeview .k-item { background-image: url('/images/bg/treeview-line.png'); }
  .k-treeview .k-last { background-image: none; }
  .k-treeview .k-treeview-top { background-position: -91px 2px; }
  .k-treeview .k-treeview-bot { background-position: -69px -17px; }
  .k-treeview .k-treeview-mid { background-position: -47px -42px; }
  /*.k-treeview .k-last .k-treeview-top { background-position: -25px -62px; }*/
  .k-treeview .k-group .k-last .k-treeview-bot { background-position: -69px -22px; }
  .k-treeview .k-item {
    background-repeat: no-repeat;
  }
  .k-treeview .k-treeview-top.k-treeview-bot{background: none;}

  .k-treeview .k-first {
    background-repeat: no-repeat;
    background-position: 0 16px;
  }

  .k-grid-toolbar{
    justify-content: flex-end !important;
  }

  .k-grid-norecords{
    justify-content: space-around;
  }
  #approvalLineDataTb tbody tr:hover:not(.active) {
    background-color: #ededed;
  }
  .active{
    background-color: rgb(241, 248, 255);
  }
  #formTreeViewDiv{
    width: auto !important;
    font-size: 12px;
    padding : 10px;
    line-height: 1.4;
  }
  .tit_p{
    font-weight: bold;
    margin-bottom: 13px;
    padding-left: 12px;
    font-size: 13px;
  }
</style>

<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="pageName" value="bustripReqPop"/>
<input type="hidden" id="mod" value="${params.mode}"/>
<input type="hidden" id="paramsType" value="${params.type}" />
<input type="hidden" id="paramsTripCode" value="${params.tripCode}"/>
<input type="hidden" id="paramsPjtSn" value="${params.pjtSn}"/>
<input type="hidden" id="carReqSn" value=""/>

<form id="bustripDraftFrm" method="post">
  <input type="hidden" id="menuCd" name="menuCd" value="bustrip">
  <input type="hidden" id="type" name="type" value="drafting">
  <input type="hidden" id="nowUrl" name="nowUrl" />
  <input type="hidden" id="hrBizReqId" name="hrBizReqId" value="${params.hrBizReqId}"/>
</form>

<div class="col-lg-12" style="padding:0;">
  <div class="card">
    <div class="card-header" style="padding:20px 0;">
      <div class="col-lg-11" style="margin:0 auto;">
        <div class="card-header" style="padding:40px 0 10px 0;">
          <h3 class="card-title" style="font-size:18px;">양식목록</h3>
          <div class="title-road">홈 &gt; 전자문서 &gt; 전자결재 &gt; 양식목록</div>
        </div>
        <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        <div>
          <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
          <table class="table table-bordered mb-0">
            <colgroup>
              <col width="27%">
            </colgroup>
            <tr>
              <td style="padding: 15px 20px 15px 20px">
                <div>
                  <input id="formSearch" name="formSearch" placeholder="양식명" style="width: 272px" onkeypress="if(window.event.keyCode==13){draftFormList.getDraftFromSearch()}"/>
                  <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="draftFormList.getDraftFromSearch()">
                    <span class="k-icon k-i-search k-button-icon"></span>
                  </button>
                </div>
              </td>
              <td rowspan="2" style="padding: 0 25px 0 25px;">
                <div style="display:flex; justify-content: space-between; align-items: center; margin:0 10px; height: 45px">
                  <div class="spanft" style="font-weight: bold;">· 선택된 양식 목록</div>
                  <div class="btn-st" style="margin: 0">
                    <button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="fsp.setFormList()">
                      <span class="k-button-text">저장</span>
                    </button>
                    <button type="button" id="delBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="" onclick="fsp.tableDelete()">
                      <span class="k-button-text">삭제</span>
                    </button>
                  </div>
                </div>
                <div style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
                <div style="height: 707px" id="formSelectDiv">
                  <table id="formItemInfo" class="table table-bordered">
                    <tbody>
                    <tr>
                      <th class="text-center th-color" style="width: 140px;"><input type="checkbox" id="checkAll" onclick="fsp.checkAll();"></th>
                      <th class="text-center th-color">양식명</th>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0">
                <div id="gridForm" style="height:740px; width: 320px;overflow: auto;border: none;">
                  <div id="formTreeViewDiv">

                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  var datas = JSON.parse('${data}');
  fsp.init(datas);
</script>
</body>



