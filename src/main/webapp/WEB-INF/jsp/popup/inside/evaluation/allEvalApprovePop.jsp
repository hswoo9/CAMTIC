<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/evaluation/allEvalApprovePop.js?v=${today}"/></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    .eval {
       background-color: #daf2d0 !important;
    }
    .achieve {
        background-color: #f2ceef !important;
    }
    .finalEval {
        background-color: #c0e6f5 !important;
    }
    .totalCnt {
        background-color: #fbe2d5 !important;
        border: 1px solid rgba(0, 0, 0, .08);
    }


    .scoreInput {
        text-align: right;
    }

    #my-spinner { width: 100%; height: 100vh; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }


    #evalListDiv {
        margin-top: 10px;
        display: flex;
        width: 100%;
        height: 800px;
        overflow-x: hidden;
        overflow-y: auto;
        white-space: nowrap;
    }
    #evalListDiv thead tr:nth-child(1) th {position: sticky;top: 0;z-index: 998;}
    #evalListDiv thead tr:nth-child(2) th {position: sticky;top: 40px;z-index: 995;}
</style>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalSn" value="${params.pk}"/>
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
<input type="hidden" id="regJobDetailName" value="${loginVO.jobDetailNm}"/>

<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">역량&업적평가 결과</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="allEvalApprovePop.fn_excelDownload()">엑셀 다운로드</button>
                <c:choose>
                    <c:when test="${rs eq null}">
                        <button type="button" class="k-button k-button-solid-base" onclick="allEvalApprovePop.setAllEvalApproveDataSet('save')">저장</button>
                    </c:when>
                    <c:otherwise>
                        <button type="button" class="k-button k-button-solid-base" onclick="allEvalApprovePop.setAllEvalApproveDataSet('save')">저장</button>
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base approvalPopup" onclick="allEvalApprovePop.setAllEvalApproveDataSet('drafting')">
                            <span class="k-icon k-i-track-changes-accept k-button-icon"></span>
                            <span class="k-button-text">상신</span>
                        </button>
                    </c:otherwise>
                </c:choose>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0">
                <tr>
                    <th class="text-center th-color">부서/팀</th>
                    <td>
                        <input type="text" id="dept" style="width:160px;" onchange="allEvalApprovePop.getAllEvalList()">
                        <input type="text" id="team" style="width:165px;" onchange="allEvalApprovePop.getAllEvalList()">
                    </td>
                    <th class="text-center th-color">직책/직급</th>
                    <td >
                        <input type="text" id="position" style="width: 160px;" onchange="allEvalApprovePop.getAllEvalList()">
                        <input type="text" id="duty" style="width: 160px;" onchange="allEvalApprovePop.getAllEvalList()">
                    </td>
                    <td >
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="allEvalApprovePop.getAllEvalList();">	<span class="k-button-text">조회</span></button>
                    </td>

                </tr>
            </table>

            <table class="searchTable table table-bordered mb-0" id="statusTb" style="margin-top: 10px">
                <colgroup>
                    <col width="10%">
                    <col width="12%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                    <col width="6.1%">
                </colgroup>
                <tr>
                    <th class="text-center th-color" rowspan="2">부서명</th>
                    <th class="text-center th-color" rowspan="2">팀명</th>
                    <th class="text-center th-color" rowspan="2">인원</th>
                    <th class="text-center th-color" colspan="2">SS</th>
                    <th class="text-center th-color" colspan="2">S</th>
                    <th class="text-center th-color" colspan="2">A</th>
                    <th class="text-center th-color" colspan="2">B</th>
                    <th class="text-center th-color" colspan="2">C</th>
                </tr>
                <tr>
                    <th class="text-center th-color">인원</th>
                    <th class="text-center th-color">비율</th>
                    <th class="text-center th-color">인원</th>
                    <th class="text-center th-color">비율</th>
                    <th class="text-center th-color">인원</th>
                    <th class="text-center th-color">비율</th>
                    <th class="text-center th-color">인원</th>
                    <th class="text-center th-color">비율</th>
                    <th class="text-center th-color">인원</th>
                    <th class="text-center th-color">비율</th>
                </tr>
                <tr>
                    <td class="text-center totalCnt" colspan="2">${params.baseYear}년 평가(역량&업적) 결과</td>
                    <td class="text-center totalCnt" id="totalEmpCnt"></td>
                    <td class="text-center totalCnt" id="totalSSCnt"></td>
                    <td class="text-center totalCnt" id="totalSSAvg"></td>
                    <td class="text-center totalCnt" id="totalSCnt"></td>
                    <td class="text-center totalCnt" id="totalSAvg"></td>
                    <td class="text-center totalCnt" id="totalACnt"></td>
                    <td class="text-center totalCnt" id="totalAAvg"></td>
                    <td class="text-center totalCnt" id="totalBCnt"></td>
                    <td class="text-center totalCnt" id="totalBAvg"></td>
                    <td class="text-center totalCnt" id="totalCCnt"></td>
                    <td class="text-center totalCnt" id="totalCAvg"></td>
                </tr>
                <tbody id="statusTbody">

                </tbody>
            </table>
            <div id="evalListDiv">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="9%">
                        <col width="10%">
                        <col width="5%">
                        <col width="6%">
                        <col width="6%">
                        <col width="6%">
                        <col width="6%">
                        <col width="6%">
                        <col width="6%">
                        <col width="6%">
                        <col width="6%">
                        <col width="6%">
                        <col width="7%">
                        <col width="6%">
                        <col width="6%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="row" class="text-center" rowspan="2" style="background-color: #8fa1c0">부서명</th>
                        <th scope="row" class="text-center" rowspan="2" style="background-color: #8fa1c0">팀명</th>
                        <th scope="row" class="text-center" rowspan="2" style="background-color: #8fa1c0">성명</th>


                        <th scope="row" class="text-center eval" colspan="5">역량평가</th>
                        <th scope="row" class="text-center achieve" colspan="3">업적평가</th>
                        <th scope="row" class="text-center" rowspan="2" style="background-color: #8fa1c0">조정점수</th>
                        <th scope="row" class="text-center" rowspan="2" style="background-color: #8fa1c0">조정전점수</th>
                        <th scope="row" class="text-center finalEval" rowspan="2">최종점수</th>
                        <th scope="row" class="text-center finalEval" rowspan="2">최종등급</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center eval">상반기</th>
                        <th scope="row" class="text-center eval">하반기</th>
                        <th scope="row" class="text-center eval">최종점수</th>
                        <th scope="row" class="text-center eval">최종등급</th>
                        <th scope="row" class="text-center eval">가중치</th>

                        <th scope="row" class="text-center achieve">최종점수</th>
                        <th scope="row" class="text-center achieve">최종등급</th>
                        <th scope="row" class="text-center achieve">가중치</th>
                    </tr>
                    </thead>
                    <tbody id="evalList">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div id="hiddenGrid" style="display: none;"></div>

<form id="allEvalDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="evalAchieve">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="baseYear" name="baseYear" value="${params.baseYear}"/>
    <input type="hidden" id="allEvalApproveGroup" name="allEvalApproveGroup" value="${rs.ALL_EVAL_APPROVE_GROUP}" />
</form>

<script>
    allEvalApprovePop.init();
</script>
</body>
</html>