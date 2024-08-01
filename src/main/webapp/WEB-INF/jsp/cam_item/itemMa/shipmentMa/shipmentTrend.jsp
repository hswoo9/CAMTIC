<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<c:set var="year"><fmt:formatDate value="${today}" pattern="yyyy" /></c:set>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/shipmentMa/shipmentTrend.js?v=${today}'/>"></script>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">출하실적추이분석</h4>
            <div class="title-road">캠아이템 > 아이템관리 &gt; 출하관리 > 출하실적추이분석</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="28%">
                        <col width="5%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">업체</th>
                        <td>
                            <input type="hidden" id="crmSn" name="crmSn" onchange="std.setMakeTable();">
                            <input type="text" id="crmNm" style="width: 220px;" readonly onclick="std.fn_popCamCrmList()">
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="std.fn_popCamCrmList()">
                                조회
                            </button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="std.crmSnReset()">
                                초기화
                            </button>
                        </td>
                        <th class="text-center th-color">년월</th>
                        <td>
                            <input type="text" id="year" style="width: 15%;">
                        </td>
                    </tr>
                </table>

                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col style="width: 5%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col style="width: 6%">
                        <col>
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">년도</th>
                        <th class="text-center th-color">1월</th>
                        <th class="text-center th-color">2월</th>
                        <th class="text-center th-color">3월</th>
                        <th class="text-center th-color">4월</th>
                        <th class="text-center th-color">5월</th>
                        <th class="text-center th-color">6월</th>
                        <th class="text-center th-color">7월</th>
                        <th class="text-center th-color">8월</th>
                        <th class="text-center th-color">9월</th>
                        <th class="text-center th-color">10월</th>
                        <th class="text-center th-color">11월</th>
                        <th class="text-center th-color">12월</th>
                        <th class="text-center th-color">합계</th>
                        <th class="text-center th-color">월평균</th>
                    </tr>
                    <tbody id="progressTb" style="text-align: right">
                        <c:forEach begin="0" end="4" step="1" varStatus="st">
                            <tr id="${year - st.index}_Tr">
                                <td id="${year - st.index}_Td_year" class="text-center"></td>
                                <td id="${year - st.index}_Td_01"></td>
                                <td id="${year - st.index}_Td_02"></td>
                                <td id="${year - st.index}_Td_03"></td>
                                <td id="${year - st.index}_Td_04"></td>
                                <td id="${year - st.index}_Td_05"></td>
                                <td id="${year - st.index}_Td_06"></td>
                                <td id="${year - st.index}_Td_07"></td>
                                <td id="${year - st.index}_Td_08"></td>
                                <td id="${year - st.index}_Td_09"></td>
                                <td id="${year - st.index}_Td_10"></td>
                                <td id="${year - st.index}_Td_11"></td>
                                <td id="${year - st.index}_Td_12"></td>
                                <td id="${year - st.index}_Td_sum"></td>
                                <td id="${year - st.index}_Td_average"></td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    std.fn_defaultScript();
</script>
