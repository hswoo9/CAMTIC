<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/fundsManagement.js?v=${today}'/>"></script>


<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<style>

</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">자금관리</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 자금관리 &gt; 자금관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="25%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="25%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">연도선택</th>
                    <td colspan="6">
                        <input type="text" id="year" style="width: 150px;">
                    </td>
                </tr>
            </table>
            <div>
                <span style="font-weight: bold; font-size: 13px;">◎ 총괄</span>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="15%">
                        <col width="35%">
                        <col width="15%">
                        <col width="35%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color" style="text-align: left">이월현금</th>
                        <td style="text-align: right">
                            <span id="currentAmt"></span>
                        </td>
                        <th class="text-center th-color" style="text-align: left">수입예상액</th>
                        <td style="text-align: right">
                            <span id="expIncpAmt"></span>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color" style="text-align: left">지출예상액</th>
                        <td style="text-align: right">
                            <span id="expExnpAmt"></span>
                        </td>
                        <th class="text-center th-color" style="text-align: left">선택한 날짜 월말 잔액</th>
                        <td>

                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <span style="font-weight: bold; font-size: 13px;">◎ 월별수지현황</span>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="6.5%">
                        <col width="9%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color" style="text-align: center" colspan="2">이월현금</th>
                        <th class="text-center th-color" style="text-align: center">1월</th>
                        <th class="text-center th-color" style="text-align: center">2월</th>
                        <th class="text-center th-color" style="text-align: center">3월</th>
                        <th class="text-center th-color" style="text-align: center">4월</th>
                        <th class="text-center th-color" style="text-align: center">5월</th>
                        <th class="text-center th-color" style="text-align: center">6월</th>
                        <th class="text-center th-color" style="text-align: center">7월</th>
                        <th class="text-center th-color" style="text-align: center">8월</th>
                        <th class="text-center th-color" style="text-align: center">9월</th>
                        <th class="text-center th-color" style="text-align: center">10월</th>
                        <th class="text-center th-color" style="text-align: center">11월</th>
                        <th class="text-center th-color" style="text-align: center">12월</th>
                        <th class="text-center th-color" style="text-align: center">합계</th>
                    </tr>
                    <tr>
                        <td class="text-center" style="text-align: center" rowspan="2">수입</td>
                        <td class="text-center" style="text-align: center">민간</td>
                        <td id="inEn1" style="text-align: right;"></td>
                        <td id="inEn2" style="text-align: right;"></td>
                        <td id="inEn3" style="text-align: right;"></td>
                        <td id="inEn4" style="text-align: right;"></td>
                        <td id="inEn5" style="text-align: right;"></td>
                        <td id="inEn6" style="text-align: right;"></td>
                        <td id="inEn7" style="text-align: right;"></td>
                        <td id="inEn8" style="text-align: right;"></td>
                        <td id="inEn9" style="text-align: right;"></td>
                        <td id="inEn10" style="text-align: right;"></td>
                        <td id="inEn11" style="text-align: right;"></td>
                        <td id="inEn12" style="text-align: right;"></td>
                        <td id="inEnTot" style="text-align: right;"></td>
                    </tr>
                    <tr>
                        <td class="text-center" style="text-align: center">정부사업</td>
                        <td id="inRn1" style="text-align: right;"></td>
                        <td id="inRn2" style="text-align: right;"></td>
                        <td id="inRn3" style="text-align: right;"></td>
                        <td id="inRn4" style="text-align: right;"></td>
                        <td id="inRn5" style="text-align: right;"></td>
                        <td id="inRn6" style="text-align: right;"></td>
                        <td id="inRn7" style="text-align: right;"></td>
                        <td id="inRn8" style="text-align: right;"></td>
                        <td id="inRn9" style="text-align: right;"></td>
                        <td id="inRn10" style="text-align: right;"></td>
                        <td id="inRn11" style="text-align: right;"></td>
                        <td id="inRn12" style="text-align: right;"></td>
                        <td id="inRnTot" style="text-align: right;"></td>
                    </tr>
                    <tr style="background-color: #f2ffff;">
                        <td class="text-center" style="text-align: center;"colspan="2">수입합계</td>
                        <td id="inTo1" style="text-align: right;"></td>
                        <td id="inTo2" style="text-align: right;"></td>
                        <td id="inTo3" style="text-align: right;"></td>
                        <td id="inTo4" style="text-align: right;"></td>
                        <td id="inTo5" style="text-align: right;"></td>
                        <td id="inTo6" style="text-align: right;"></td>
                        <td id="inTo7" style="text-align: right;"></td>
                        <td id="inTo8" style="text-align: right;"></td>
                        <td id="inTo9" style="text-align: right;"></td>
                        <td id="inTo10" style="text-align: right;"></td>
                        <td id="inTo11" style="text-align: right;"></td>
                        <td id="inTo12" style="text-align: right;"></td>
                        <td id="inToTot" style="text-align: right;"></td>
                    </tr>
                    <tr>
                        <td class="text-center" style="text-align: center" rowspan="4">지출</td>
                        <td class="text-center" style="text-align: center">인건비</td>
                        <td id="outPs1" style="text-align: right;"></td>
                        <td id="outPs2" style="text-align: right;"></td>
                        <td id="outPs3" style="text-align: right;"></td>
                        <td id="outPs4" style="text-align: right;"></td>
                        <td id="outPs5" style="text-align: right;"></td>
                        <td id="outPs6" style="text-align: right;"></td>
                        <td id="outPs7" style="text-align: right;"></td>
                        <td id="outPs8" style="text-align: right;"></td>
                        <td id="outPs9" style="text-align: right;"></td>
                        <td id="outPs10" style="text-align: right;"></td>
                        <td id="outPs11" style="text-align: right;"></td>
                        <td id="outPs12" style="text-align: right;"></td>
                        <td id="outPsTot" style="text-align: right;"></td>
                    </tr>
                    <tr>
                        <td class="text-center" style="text-align: center">직접비</td>
                        <td id="outDr1" style="text-align: right;"></td>
                        <td id="outDr2" style="text-align: right;"></td>
                        <td id="outDr3" style="text-align: right;"></td>
                        <td id="outDr4" style="text-align: right;"></td>
                        <td id="outDr5" style="text-align: right;"></td>
                        <td id="outDr6" style="text-align: right;"></td>
                        <td id="outDr7" style="text-align: right;"></td>
                        <td id="outDr8" style="text-align: right;"></td>
                        <td id="outDr9" style="text-align: right;"></td>
                        <td id="outDr10" style="text-align: right;"></td>
                        <td id="outDr11" style="text-align: right;"></td>
                        <td id="outDr12" style="text-align: right;"></td>
                        <td id="outDrTot" style="text-align: right;"></td>
                    </tr>
                    <tr>
                        <td class="text-center" style="text-align: center">일반운영비</td>
                        <td id="outOp1" style="text-align: right;"></td>
                        <td id="outOp2" style="text-align: right;"></td>
                        <td id="outOp3" style="text-align: right;"></td>
                        <td id="outOp4" style="text-align: right;"></td>
                        <td id="outOp5" style="text-align: right;"></td>
                        <td id="outOp6" style="text-align: right;"></td>
                        <td id="outOp7" style="text-align: right;"></td>
                        <td id="outOp8" style="text-align: right;"></td>
                        <td id="outOp9" style="text-align: right;"></td>
                        <td id="outOp10" style="text-align: right;"></td>
                        <td id="outOp11" style="text-align: right;"></td>
                        <td id="outOp12" style="text-align: right;"></td>
                        <td id="outOpTot" style="text-align: right;"></td>
                    </tr>
                    <tr>
                        <td class="text-center" style="text-align: center">기타</td>
                        <td id="outEtc1" style="text-align: right;">0</td>
                        <td id="outEtc2" style="text-align: right;">0</td>
                        <td id="outEtc3" style="text-align: right;">0</td>
                        <td id="outEtc4" style="text-align: right;">0</td>
                        <td id="outEtc5" style="text-align: right;">0</td>
                        <td id="outEtc6" style="text-align: right;">0</td>
                        <td id="outEtc7" style="text-align: right;">0</td>
                        <td id="outEtc8" style="text-align: right;">0</td>
                        <td id="outEtc9" style="text-align: right;">0</td>
                        <td id="outEtc10" style="text-align: right;">0</td>
                        <td id="outEtc11" style="text-align: right;">0</td>
                        <td id="outEtc12" style="text-align: right;">0</td>
                        <td id="outEtcTot" style="text-align: right;">0</td>
                    </tr>
                    <tr style="background-color: #f2ffff;">
                        <td class="text-center" style="text-align: center" colspan="2">지출합계</td>
                        <td id="outTo1" style="text-align: right;"></td>
                        <td id="outTo2" style="text-align: right;"></td>
                        <td id="outTo3" style="text-align: right;"></td>
                        <td id="outTo4" style="text-align: right;"></td>
                        <td id="outTo5" style="text-align: right;"></td>
                        <td id="outTo6" style="text-align: right;"></td>
                        <td id="outTo7" style="text-align: right;"></td>
                        <td id="outTo8" style="text-align: right;"></td>
                        <td id="outTo9" style="text-align: right;"></td>
                        <td id="outTo10" style="text-align: right;"></td>
                        <td id="outTo11" style="text-align: right;"></td>
                        <td id="outTo12" style="text-align: right;"></td>
                        <td id="outToTot" style="text-align: right;"></td>
                    </tr>
                    <tr>
                        <td class="text-center" style="text-align: center" colspan="2">예상잔액</td>
                        <td id="estBl1" style="text-align: right;"></td>
                        <td id="estBl2" style="text-align: right;"></td>
                        <td id="estBl3" style="text-align: right;"></td>
                        <td id="estBl4" style="text-align: right;"></td>
                        <td id="estBl5" style="text-align: right;"></td>
                        <td id="estBl6" style="text-align: right;"></td>
                        <td id="estBl7" style="text-align: right;"></td>
                        <td id="estBl8" style="text-align: right;"></td>
                        <td id="estBl9" style="text-align: right;"></td>
                        <td id="estBl10" style="text-align: right;"></td>
                        <td id="estBl11" style="text-align: right;"></td>
                        <td id="estBl12" style="text-align: right;"></td>
                        <td id="estBlTot" style="text-align: right;"></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    fundsMn.fn_defaultScript();

</script>
