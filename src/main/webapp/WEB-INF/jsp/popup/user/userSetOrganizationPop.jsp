<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/inside/userManage/userSetOrganizationPop.js?v=${today}"/></script>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
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
<style>
    .dept {margin-top: 0px;}
</style>
<div style="padding:0;">
    <div>
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">조직도 직제 관리</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div class="panel">
            <div class="panel-body">
                <table style="width: 100%;">
                    <colgroup>
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <td>
                            <div id="gridForm" style="overflow: auto;border: 1px solid #dedfdf;width: 100%;">
                                <div style="display: flex;justify-content: flex-end;">
                                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" style="position: absolute;margin-right: 25px;z-index: 9999;" onclick="userSetOrganization.setDeptInfoDel()">삭제</button>
                                </div>
                                <div id="deptTree" style="height:635px;width: 100% !important;">

                                </div>
                            </div>
                        </td>
                        <td style="vertical-align:top; padding:10px">
                            <span style="font-weight: bold;">* 직제 등록</span>
                            <div style="float:right;">
                                <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userSetOrganization.setDeptInfo();">저장</button>
                            </div>
                           <table class="popTable table table-bordered mb-0 mt10" style="margin-top: 20px;">
                               <colgroup>
                                   <col width="25%">
                                   <col width="75%">
                               </colgroup>
                               <thead>
                               <tr>
                                   <th scope="row" class="text-center th-color">
                                       <span class="red-star"></span>부서
                                   </th>
                                   <td>
                                       <input type="hidden" id="deptSeq" name="deptSeq">
                                       <input type="text" id="deptName" name="deptName" style="width: 85%;">
                                       <input type="radio" id="newDeptChk" name="newChk" class="newDeptChk" onclick="userSetOrganization.newChk(this)">
                                       <label  class="newTeamChk" for="newDeptChk">신규</label>
                                   </td>
                               </tr>
                               <tr>
                                   <th scope="row" class="text-center th-color">
                                       <span class="red-star"></span>정렬순번</th>
                                   <td>
                                       <input type="text" id="deptSortSn" style="width: 100%;">
                                   </td>
                               </tr>
                               <tr class="teamTr">
                                   <th scope="row" class="text-center th-color">
                                       <span class="red-star"></span>팀</th>
                                   <td>
                                       <input type="hidden" id="teamSeq" style="width: 100%;">
                                       <input type="text" id="teamName" style="width: 85%;">
                                       <input type="radio" id="newTeamChk" name="newChk" class="newTeamChk" onclick="userSetOrganization.newChk(this)">
                                       <label  class="newTeamChk" for="newTeamChk">신규</label>
                                   </td>
                               </tr>
                               <tr class="teamTr">
                                   <th scope="row" class="text-center th-color">
                                       <span class="red-star"></span>정렬순번</th>
                                   <td>
                                       <input type="text" id="teamSortSn" style="width: 100%;">
                                   </td>
                               </tr>
                               </thead>
                           </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    userSetOrganization.init();
</script>
</body>
</html>