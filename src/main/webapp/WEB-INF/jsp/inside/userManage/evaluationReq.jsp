<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-ocean-blue.min.css" />
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationReq.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/inside/evaluation/fn_evaluation.js?v=${today}"/></script>
<% pageContext.setAttribute("CRLF", "\r\n"); %>
<% pageContext.setAttribute("LF", "\n"); %>

<style>
    .likeTab{display: flex; list-style: none; margin-top:30px; padding-left: 0;}
    .likeTab li{padding: 5px 18px; border-radius: 5px 5px 0 0; background-color: #6787b0; border: 1px solid #eee; font-weight: 600; cursor: pointer; font-size:13px; color: white; width: 125px; text-align: center;}
    .likeTab li:hover {background-color: #262b36;}
    .likeTab li.activeY {background-color: #262b36;}
    .k-input-md{font-size:12px;}
    .subTitSt{font-weight: 600; text-align: left; font-size: 13px; padding: 10px;}
    .table > thead > tr > th, .table > tfoot > tr > th{ background-color: #00397f96; color: white;}
    .table > thead > tr > td, .table > thead > tr > th{border: 1px solid #dee2e6;}
    #filePrint{float: right; margin-right: 25px;}

    .jb-text {
        padding: 15px 20px;
        background-color: #444444;
        border-radius: 5px;
        color: #ffffff;
        position: absolute;
        display: none;
        right: 34px;
        width: 200px;
    }

    .jb-title:hover + .jb-text {
        display: block;
    }
    .table > tbody > tr > td{
        border: 1px solid #eee;
    }

    .subTable{
        width: 100%;
        border: 1px solid #b1b5bd;
    }

    .subTable th{
        text-align:center;
        background-color: #d8dce3;
        border: 1px solid #b1b5bd;
    }

    .subTable td{
        background-color: #fff;
        border: 1px solid #b1b5bd;
    }

    .textBox{
        width: 70%;
    }

    #evalPeriod li{
        text-align: center;
        margin: 0 32px 0 0;
    }

</style>


<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>



<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">평가등록</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 인사평가 > 평가등록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">년도</th>
                        <td>
                            <input type="text" id="evalYear" style="width: 150px;"> 년
                        </td>
                        <th class="text-center th-color">평가대상</th>
                        <td>
                            <input type="text" id="evalPersonCnt" style="width: 15%;"/> 명
                            <%--<input type="text" id="evalPersonSearch" style="width: 60%;"/>--%>
                            <input type="button" id="evalPersonSearch" value="평가대상 선택"/>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">상태</th>
                        <td colspan="3">
                            <span id="evalState" style="padding: 0 10px"></span>
                        </td>
                    </tr>
                </table>
            </div>

            <div>
                <div id="tabstrip">
                    <div class="capabilityTb">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="display:flex; justify-content: space-between;">
                                <div class="subTitSt">· 역량 평가</div>
                            </div>
                            <div class="btn-st">
                                <input type="button" class="k-button k-button-solid-info" value="추가하기" onclick="evaluationReq.fu_addCapability()"/>
                                <input type="button" class="k-button k-button-solid-error" value="삭제하기" onclick="evaluationReq.fu_removeCapability()"/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="5%">
                                        <col width="25%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="5%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th rowspan="3">회차</th>
                                        <th rowspan="3">평가기간</th>
                                        <th colspan="9">평가 차수별 가중치</th>
                                        <th rowspan="3">설정</th>
                                    </tr>
                                    <tr>
                                        <th colspan="3">팀원</th>
                                        <th colspan="3">팀장</th>
                                        <th colspan="3">부서장</th>
                                    </tr>
                                    <tr>
                                        <th>1차</th>
                                        <th>2차</th>
                                        <th>3차</th>
                                        <th>1차</th>
                                        <th>2차</th>
                                        <th>3차</th>
                                        <th>1차</th>
                                        <th>2차</th>
                                        <th>3차</th>
                                    </tr>
                                    </thead>
                                    <tbody id="capabilityTbody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="resultsTb">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 업적 평가</div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="15%">
                                        <col width="20%">
                                        <col width="15%">
                                        <col width="50%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>평가 기간</th>
                                        <td style="display:flex; flex-direction: column;border: none;">
                                            <span id="evalPeriod" style="padding: 0 10px"></span>
                                            <div id="allPeriod" style="display: none;">
                                                기간 : <input type="text" id="allSPr" class ="textBox" style="width: 35%;"> ~ <input type="text" id="allEPr" class ="textBox" style="width: 35%;">
                                            </div>
                                            <div id="partPeriod" style="display: none;">
                                                1차 평가 : <input type="text" id="partPr1_1" class ="textBox" style="width: 35%;"> ~ <input type="text" id="partPr1_2" class ="textBox" style="width: 35%;">
                                                2차 평가 : <input type="text" id="partPr2_1" class ="textBox" style="width: 35%;"> ~ <input type="text" id="partPr2_2" class ="textBox" style="width: 35%;">
                                                3차 평가 : <input type="text" id="partPr3_1" class ="textBox" style="width: 35%;"> ~ <input type="text" id="partPr3_2" class ="textBox" style="width: 35%;">
                                            </div>
                                        </td>
                                        <th style="padding: 5px;">차수별 가중치</th>
                                        <td>
                                            <table class="subTable">
                                                <tr>
                                                    <th>구분</th>
                                                    <th>팀(장)</th>
                                                    <th>부서장</th>
                                                </tr>
                                                <tr>
                                                    <td>1차 평가자</td>
                                                    <td><input type="text" id="assessor1_1" class ="textBox" width="100%" ></td>
                                                    <td><input type="text" id="assessor1_2" class ="textBox" width="100%" ></td>
                                                </tr>
                                                <tr>
                                                    <td>2차 평가자</td>
                                                    <td><input type="text" id="assessor2_1" class ="textBox" width="100%" ></td>
                                                    <td><input type="text" id="assessor2_2" class ="textBox" width="100%" ></td>
                                                </tr>
                                                <tr>
                                                    <th>계</th>
                                                    <td><input type="text" id="txtEvalST1" class ="textBox" ></td>
                                                    <td><input type="text" id="txtEvalST2" class ="textBox" ></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    </thead>
                                </table>
                                <p>※ 자기신고 기간 : 평가시작일 이전 일주일로 자동 설정</p>
                            </div>
                        </div>
                    </div>

                    <div class="resultsDetailTb">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt" id="mText">- 평가항목 및 가중치</div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" id="mTable">
                                    <colgroup>
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="15%">
                                        <col width="10%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>평가 대상</th>
                                        <th>평가 분야</th>
                                        <th>가중치(%)</th>
                                        <th>성과 지표</th>
                                    </tr>
                                    <tr>
                                        <td rowspan="8">사업인원</td>
                                        <td>팀원</td>
                                        <td colspan="3">
                                            <div class="btn-st" style="display: flex;flex-direction: row-reverse;margin-bottom: 5px;">
                                                <input type="button" class="k-button k-button-solid-error" value="삭제하기" style="margin: 3px;" onclick="evaluationReq.fu_removeBTList()"/>
                                                <input type="button" class="k-button k-button-solid-info" value="추가하기" style="margin: 3px;" onclick="evaluationReq.fu_addBTList()"/>
                                            </div>
                                            <table class="subTable">
                                                <colgroup>
                                                    <col width="10%">
                                                    <col width="20%">
                                                    <col width="20%">
                                                    <col width="40%">
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th>순번</th>
                                                    <th>평가 분야</th>
                                                    <th>가중치(%)</th>
                                                    <th>성과지표</th>
                                                </tr>
                                                </thead>
                                                <tbody id="btList"></tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>소계</td>
                                        <td colspan="3"><input type="text" id="btSum" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">팀장</td>
                                        <td>팀 성과</td>
                                        <td><input type="text" id="btResult1" class ="textBox" ></td>
                                        <td><input type="text" id="btResult2" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td>부서 성과</td>
                                        <td><input type="text" id="bdResult1" class ="textBox" ></td>
                                        <td><input type="text" id="bdResult2" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td>소계</td>
                                        <td colspan="3"><input type="text" id="bdSum" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">부서장</td>
                                        <td>부서 성과</td>
                                        <td><input type="text" id="bhResult1" class ="textBox" ></td>
                                        <td><input type="text" id="bhResult2" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td>법인 성과</td>
                                        <td><input type="text" id="bcResult1" class ="textBox" ></td>
                                        <td><input type="text" id="bcResult2" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td>소계</td>
                                        <td colspan="3"><input type="text" id="bhSum" class ="textBox" ></td>
                                    </tr>

                                    <tr>
                                        <td rowspan="8">지원인원<br>(경영기획실, <br>개발지원팀)</td>
                                        <td>팀원</td>
                                        <td colspan="3">
                                            <div class="btn-st" style="display: flex;flex-direction: row-reverse;margin-bottom: 5px;">
                                                <input type="button" class="k-button k-button-solid-error" value="삭제하기" style="margin: 3px;" onclick="evaluationReq.fu_removeBSList()"/>
                                                <input type="button" class="k-button k-button-solid-info" value="추가하기" style="margin: 3px;" onclick="evaluationReq.fu_addBSList()"/>
                                            </div>
                                            <table class="subTable">
                                                <colgroup>
                                                    <col width="10%">
                                                    <col width="20%">
                                                    <col width="20%">
                                                    <col width="40%">
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th>순번</th>
                                                    <th>평가 분야</th>
                                                    <th>가중치(%)</th>
                                                    <th>성과지표</th>
                                                </tr>
                                                </thead>
                                                <tbody id="bsList"></tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>소계</td>
                                        <td colspan="3"><input type="text" id="bsSum" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">팀장</td>
                                        <td>팀 성과</td>
                                        <td><input type="text" id="stResult1" class ="textBox" ></td>
                                        <td><input type="text" id="stResult2" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td>부서 성과</td>
                                        <td><input type="text" id="sdResult1" class ="textBox" ></td>
                                        <td><input type="text" id="sdResult2" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td>소계</td>
                                        <td colspan="3"><input type="text" id="sdSum" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">부서장</td>
                                        <td>부서 성과</td>
                                        <td><input type="text" id="shResult1" class ="textBox" ></td>
                                        <td><input type="text" id="shResult2" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td>법인 성과</td>
                                        <td><input type="text" id="scResult1" class ="textBox" ></td>
                                        <td><input type="text" id="scResult2" class ="textBox" ></td>
                                    </tr>
                                    <tr>
                                        <td>소계</td>
                                        <td colspan="3"><input type="text" id="scSum" class ="textBox" ></td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="scoreTb">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="display:flex; justify-content: space-between;">
                                <div class="subTitSt">· 평가 등급별 수준 및 점수</div>
                            </div>
                            <div class="btn-st">
                                <input type="button" class="k-button k-button-solid-info" value="추가하기" onclick="evaluationReq.fu_addScore()"/>
                                <input type="button" class="k-button k-button-solid-error" value="삭제하기" onclick="evaluationReq.fu_removeScore()"/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="40%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>등급</th>
                                        <th>수준</th>
                                        <th>인원 비율</th>
                                        <th>점수</th>
                                    </tr>
                                    </thead>
                                    <tbody id="scoreList"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="noticeTb">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="display:flex; justify-content: space-between;">
                                <div class="subTitSt">· 안내 페이지 설정</div>
                            </div>
                            <div id="noticeDiv">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    evaluationReq.fn_defaultScript();
</script>