<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evalScorePop.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/cam_project/engn/costCalc.js?v=${today}"/></script>

<style>
    .table-bordered {border-collapse: unset;}
    .evalListTd{background-color: #fff;}
    .yellow{background-color: #fff2cc;font-weight: bold;text-align: center;}
    .green{background-color: #e2efda;font-weight: bold;text-align: center;}
    .blue{background-color: #ddebf7;font-weight: bold;text-align: center;}
    .normal{font-weight: bold;text-align: center ;}
    .table > thead > tr > th{padding-top: 5px;padding-bottom: 5px;}
    .searchTable > thead > tr > th {font-weight: bold;color: #696c74;}
    .table > tbody + tbody {border-top: 1px solid rgba(0,0,0,.08)}
    #evalList input{width: 100%;}
    #evalListDiv {
        display: flex;
        width: 100%;
        height: 680px;
        overflow-x: hidden;
        overflow-y: hidden;
        white-space: nowrap;
    }
    .fixed-table {
        display: block;
        width: 100%;
        height: 100%;
        overflow-x: auto;
        overflow-y: auto;
    }
    #evalListDiv .fixed-table {
        overflow-y: auto;
        height: 680px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px; /* 최소 너비 설정 */
    }
    th, td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: left;
    }
    /* 헤더 고정 스타일 */
    th {
        background-color: #f9f9f9;
        top: 0;
        z-index: 2;
    }
    #evalTheadList td{
        padding: 10px 15px;
    }
    #evalThead .yellow{background-color: #fff2cc!important;font-weight: bold!important;color: #696c74;}
    #evalThead .green{background-color: #e2efda!important;font-weight: bold!important;color: #696c74;}
    #evalThead .blue{background-color: #ddebf7!important;font-weight: bold!important;color: #696c74;}
    #evalThead .normal{background-color: #fff!important;font-weight: bold!important;color: #696c74;}

    /*상단 3줄 고정*/
    #evalThead tr:nth-child(1) th {position: sticky;top: 0;z-index: 998;}
    #evalThead tr:nth-child(2) th {position: sticky;top: 27px;z-index: 995;}
    #evalThead tr:nth-child(3) th {position: sticky;top: 54px;z-index: 995;}

    /*tbody 영역*/
    #evalThead tr {position: sticky;z-index: 999;}
    #evalList td {position: sticky;z-index: 996;}

    /*left 자동 조절 되어야함*/
    /*#evalThead tr:nth-child(1) th:nth-child(1) {position: sticky;left: 0;z-index: 999;}
    #evalThead tr:nth-child(1) th:nth-child(2){position: sticky;left: 704px;z-index: 999;}

    #evalThead tr:nth-child(2) th:nth-child(1){position: sticky;left: 0;z-index: 999;}
    #evalThead tr:nth-child(2) th:nth-child(2){position: sticky;left: 56px;z-index: 999;}
    #evalThead tr:nth-child(2) th:nth-child(3){position: sticky;left: 527px;z-index: 999;}
    #evalThead tr:nth-child(2) th:nth-child(4){position: sticky;left: 613px;z-index: 999;}
    #evalThead tr:nth-child(2) th:nth-child(5){position: sticky;left: 704px;z-index: 999;}
    #evalThead tr:nth-child(2) th:nth-child(6){position: sticky;left: 809px;z-index: 999;}
    #evalThead tr:nth-child(2) th:nth-child(7){position: sticky;left: 926px;z-index: 999;}

    #evalThead tr:nth-child(3) th:nth-child(1){position: sticky;left: 0;z-index: 999;}
    #evalThead tr:nth-child(3) th:nth-child(2){position: sticky;left: 704px;z-index: 999;}
    #evalThead tr:nth-child(3) th:nth-child(3){position: sticky;left: 809px;z-index: 999;}
    #evalThead tr:nth-child(3) th:nth-child(4){position: sticky;left: 926px;z-index: 999;}

    #evalList td:nth-child(1){position: sticky;left: 0;z-index: 996;}
    #evalList td:nth-child(2){position: sticky;left: 56px;z-index: 996;}
    #evalList td:nth-child(3){position: sticky;left: 527px;z-index: 996;}
    #evalList td:nth-child(4){position: sticky;left: 613px;z-index: 996;}
    #evalList td:nth-child(5){position: sticky;left: 704px;z-index: 996;}
    #evalList td:nth-child(6){position: sticky;left: 809px;z-index: 996;}
    #evalList td:nth-child(7){position: sticky;left: 926px;z-index: 996;}*/
</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="searchYear" value="${params.searchYear}"/>
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">개인 업적평가 점수산출</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="evalScorePop.saveData()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <div style="display: flex;justify-content: flex-end;gap: 10px;">
                <div style="display: flex;align-items: center;gap: 10px">
                    프로젝트 미참여 : <div style="width: 15px;height: 15px;background-color: #ffbebe; display: block"></div>
                </div>
                <div style="display: flex;align-items: center;gap: 10px">
                    수정여부 : <div style="width: 15px;height: 15px;background-color: rgb(198 159 239); display: block"></div>
                </div>
                <div style="display: flex;align-items: center;gap: 10px">
                    평가완료 : <div style="width: 15px;height: 15px;background-color: #00397f96; display: block"></div>
                </div>
            </div>
            <div id="evalListDiv">

            </div>
        </div>
    </div>
</div>


<script>
    evalScorePop.fn_defaultScript();
</script>
</body>
</html>