<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationSet.js?v=${today}"/></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>
    .searchTable > thead > tr > th, .searchTable > tfoot > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }

    .txt_area_01 {display: inline-block; width: 100%; height: 170px; border: 1px solid #c9c9c9; }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="evalAchieveSetSn" value="${params.pk}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="pop_sign_wrap">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                인사평가 등록
            </h3>

            <div id="btnDiv" class="btn-st popButton" style="font-size: 12px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" style="display: none;" onclick="evaluationSet.fn_save_chk()">등록</button>
                <button type="button" class="k-button k-button-solid-info" id="updBtn" style="display: none;" onclick="evaluationSet.fn_save()">수정</button>
                <button type="button" class="k-button k-button-solid-error" id="delBtn" style="display: none;" onclick="evaluationSet.fn_del()">삭제</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div class="panel-body" style="padding-bottom: 0">
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 5%">
                    <col style="width: 40%">
                </colgroup>
                <tr>
                    <th>년도</th>
                    <td>
                        <input type="text" id="baseYear" class="baseYear" style="text-align: right; width: 10%" />
                    </td>
                </tr>
            </table>
        </div>

        <div class="panel-body" style="padding-top: 0">
            <div class="card-header" style="padding-bottom: 0">
                <h4>
                    업적평가
                </h4>
            </div>
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 8%">
                    <col style="width: 26%">
                    <col style="width: 10%">
                    <col style="width: 62%">
                </colgroup>
                <tr>
                    <th>평가기간</th>
                    <td>
                        <input type="text" id="evalStrDt" style="width: 45%" /> ~
                        <input type="text" id="evalEndDt" style="width: 45%" />
                    </td>
                    <th>평가 가중치</th>
                    <td>
                        <table class="searchTable table table-bordered mb-0">
                            <colgroup>
                                <col width="25%">
                                <col width="25%">
                                <col width="25%">
                                <col width="25%">
                            </colgroup>
                            <tr>
                                <th>평가항목</th>
                                <th>수주금액</th>
                                <th>매출</th>
                                <th>이익</th>
                            </tr>
                            <tr>
                                <th>구분</th>
                                <td class="text-center">개별 OR 팀 공통</td>
                                <td colspan="2" class="text-center">개인성과지표</td>
                            </tr>
                            <tr>
                                <th>평가 가중치 선택</th>
                                <td>
                                    <input type="text" id="orderWeights" style="text-align: right;width: 89%" oninput="onlyNumber(this)" /> %
                                </td>
                                <td>
                                    <input type="text" id="salesWeights" style="text-align: right;width: 89%" oninput="onlyNumber(this)" /> %
                                </td>
                                <td>
                                    <input type="text" id="revenueWeights" style="text-align: right;width: 89%" oninput="onlyNumber(this)" /> %
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 8%">
                </colgroup>
                <tr>
                    <th>평가등급 설정</th>
                    <td>
                        <table class="searchTable table table-bordered mb-0" id="ratingTb">
                            <colgroup>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>평가등급</th>
                                <th>기준점수</th>
                                <th>환산점수</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th class="rating" rating="-">-</th>
                                <td>
                                    <input type="text" id="baseScore0" class="baseScore" style="text-align: right;" value="0" oninput="onlyNumber(this)" />
                                </td>
                                <td>
                                    <input type="text" id="conversionScore0" class="conversionScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                            </tr>
                            <tr>
                                <th class="rating" rating="D">D</th>
                                <td>
                                    <input type="text" id="baseScore1" class="baseScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                                <td>
                                    <input type="text" id="conversionScore1" class="conversionScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                            </tr>
                            <tr>
                                <th class="rating" rating="C">C</th>
                                <td>
                                    <input type="text" id="baseScore2" class="baseScore" style="text-align: right;" value="0" oninput="onlyNumber(this)" />
                                </td>
                                <td>
                                    <input type="text" id="conversionScore2" class="conversionScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                            </tr>
                            <tr>
                                <th class="rating" rating="B">B</th>
                                <td>
                                    <input type="text" id="baseScore3" class="baseScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                                <td>
                                    <input type="text" id="conversionScore3" class="conversionScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                            </tr>
                            <tr>
                                <th class="rating" rating="A">A</th>
                                <td>
                                    <input type="text" id="baseScore4" class="baseScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                                <td>
                                    <input type="text" id="conversionScore4" class="conversionScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                            </tr>
                            <tr>
                                <th class="rating" rating="S">S</th>
                                <td>
                                    <input type="text" id="baseScore5" class="baseScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                                <td>
                                    <input type="text" id="conversionScore5" class="conversionScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                            </tr>
                            <tr>
                                <th class="rating" rating="SS">SS</th>
                                <td>
                                    <input type="text" id="baseScore6" class="baseScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                                <td>
                                    <input type="text" id="conversionScore6" class="conversionScore" style="text-align: right;"  value="0" oninput="onlyNumber(this)" />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th>제외대상</th>
                    <td>
                        <input type="text" disabled id="excludesName" style="width: 85%;">
                        <input type="hidden" id="excludesSeq" style="width: 85%;">
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="$('#excludesName').val('');$('#excludesSeq').val('')">초기화</button>
                        <button type="button" id="userSearchBtn" onclick="evaluationSet.userSearch()" class="k-button k-button-solid-base">검색</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    evaluationSet.fn_defaultScript();

    function userDataSet(arr, empNameAr, empSeqAr){
        $("#excludesName").val(empNameAr.substring(0, empNameAr.length-1).replaceAll(",", ", "));
        $("#excludesSeq").val(empSeqAr.substring(0, empSeqAr.length-1));
    }
</script>
</body>