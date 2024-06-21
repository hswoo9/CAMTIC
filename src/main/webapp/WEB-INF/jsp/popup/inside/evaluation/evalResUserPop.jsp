<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalResUser.js?v=${today}"/></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalSn" value="${params.pk}"/>
<input type="hidden" id="evalMemSn" value="${params.evalMemSn}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">역량평가 결과</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="saveMngScore()">평가점수 조정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div class="panel-body" style="padding-bottom: 0px">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 40%">
                    <col style="width: 10%">
                    <col style="width: 40%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" id="yearTd" style="font-weight: bold"></th>
                </tr>
                </thead>
            </table>
        </div>

        <div class="panel-body" style="padding-bottom: 0px">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 40%">
                    <col style="width: 10%">
                    <col style="width: 40%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" style="font-weight: bold">피평가자</th>
                </tr>
                <tr>
                    <th>부서명</th>
                    <td id="targetDept"></td>
                    <th>성명</th>
                    <td id="targetEmpName"></td>
                </tr>
                <tr>
                    <th>직위</th>
                    <td id="targetSpot"></td>
                    <th>직무</th>
                    <td id="targetJob"></td>
                </tr>
                </thead>
            </table>
        </div>

        <div class="panel-body" style="padding-bottom: 0px">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 20%">
                    <col style="width: 16%">
                    <col style="width: 10%">
                    <col style="width: 11%">
                    <col style="width: 11%">
                    <col style="width: 11%">
                    <col style="width: 11%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="8" style="font-weight: bold">평가자</th>
                </tr>
                <tr>
                    <th>구 분</th>
                    <th>소 속</th>
                    <th>직 위</th>
                    <th>성 명</th>
                    <th>평가점수</th>
                    <th>가중치</th>
                    <th>환산점수</th>
                    <th>최종점수</th>
                </tr>
                <tr id="tr1" style="text-align: center">
                    <td id="td1-1">1차</td>
                    <td id="td1-2"></td>
                    <td id="td1-3"></td>
                    <td id="td1-4"></td>
                    <td id="td1-5"></td>
                    <td id="td1-6"></td>
                    <td id="td1-7"></td>
                    <td id="td1-8"></td>
                </tr>
                <tr id="tr2" style="text-align: center">
                    <td id="td2-1">2차</td>
                    <td id="td2-2"></td>
                    <td id="td2-3"></td>
                    <td id="td2-4"></td>
                    <td id="td2-5"></td>
                    <td id="td2-6"></td>
                    <td id="td2-7"></td>
                    <td id="td2-8"></td>
                </tr>
                </thead>
            </table>
        </div>

        <div class="panel-body" style="padding-bottom: 0px">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 33.4%">
                    <col style="width: 33.3%">
                    <col style="width: 33.3%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="3" style="font-weight: bold">평가의견</th>
                </tr>
                <tr>
                    <th>본인평가</th>
                    <th>1차 평가자</th>
                    <th>2차 평가자</th>
                </tr>
                <tr id="tr3" style="text-align: center">
                    <td id="view1"></td>
                    <td id="view2"></td>
                    <td id="view3"></td>
                </tr>
                </thead>
            </table>
        </div>

        <div class="panel-body" style="padding-bottom: 0px">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 40%">
                    <col style="width: 10%">
                    <col style="width: 40%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" id="detailTd" style="font-weight: bold"></th>
                </tr>
                </thead>
            </table>
        </div>

        <div class="panel-body">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="5%">
                    <col width="9%">
                    <col width="20%">
                    <col width="38%">
                    <col width="7%">
                    <col width="7%">
                    <col width="7%">
                    <col width="7%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color" rowspan="2">순번</th>
                    <th scope="row" class="text-center th-color" rowspan="2">역량</th>
                    <th scope="row" class="text-center th-color" rowspan="2">정의</th>
                    <th scope="row" class="text-center th-color" rowspan="2">평가 착안점</th>
                    <th scope="row" class="text-center th-color" rowspan="2">배점</th>
                    <th scope="row" class="text-center th-color" colspan="3">평가기준</th>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">본인평가</th>
                    <th scope="row" class="text-center th-color">1차 평가</th>
                    <th scope="row" class="text-center th-color">2차 평가</th>
                </tr>
                </thead>
                <tbody id="evalList">
                </tbody>
            </table>
        </div>
    </div>
</div>


<script>
    evalResUser.fn_defaultScript();
</script>
</body>
</html>