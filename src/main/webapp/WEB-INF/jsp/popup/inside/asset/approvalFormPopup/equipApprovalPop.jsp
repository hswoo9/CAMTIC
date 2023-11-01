<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
    <table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <tr>
            <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">
                <table border="3" style="border-collapse: collapse; margin: 0px;">
                    <colgroup>
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 55px" rowspan="3"><p style="font-size:10px;"><b>구분</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 100px" rowspan="3"><p style="font-size:10px;"><b>장비명</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 60px" rowspan="3"><p style="font-size:10px;"><b>담당자</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 100px" rowspan="2" colspan="2"><p style="font-size:10px;"><b>시간(h)</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 60px" rowspan="3"><p style="font-size:10px;"><b>건수<br>(건)</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 190px" colspan="4"><p style="font-size:10px;"><b>업체수(개사, 중복제외)</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 148px" rowspan="3"><p style="font-size:10px;"><b>비고</b></p></td>
                    </tr>
                    <tr>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 48px" rowspan="2"><p style="font-size:10px;"><b>업체수</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 94px" colspan="2"><p style="font-size:10px;"><b>도내</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 48px" rowspan="2"><p style="font-size:10px;"><b>도외</b></p></td>
                    </tr>
                    <tr>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 50px"><p style="font-size:10px;"><b>전월</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 50px"><p style="font-size:10px;"><b>당월</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 42px"><p style="font-size:10px;"><b>단지</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 52px"><p style="font-size:10px;"><b>단지외</b></p></td>
                    </tr>
                    <c:set var="befUseTimeSumTotal" value="0"/>
                    <c:set var="useTimeSumTotal" value="0"/>
                    <c:set var="epCountSumTotal" value="0"/>
                    <c:set var="prtcoGbnNameSumTotal" value="0"/>
                    <c:set var="prtcoGbnSnASumTotal" value="0"/>
                    <c:set var="prtcoGbnSnBSumTotal" value="0"/>
                    <c:set var="prtcoGbnSnCSumTotal" value="0"/>

                    <c:set var="befUseTimeSum" value="0"/>
                    <c:set var="useTimeSum" value="0"/>
                    <c:set var="epCountSum" value="0"/>
                    <c:set var="prtcoGbnNameSum" value="0"/>
                    <c:set var="prtcoGbnSnASum" value="0"/>
                    <c:set var="prtcoGbnSnBSum" value="0"/>
                    <c:set var="prtcoGbnSnCSum" value="0"/>
                    <c:forEach var="list" items="${list}" varStatus="status">
                        <c:if test="${list.EQIPMN_GBN_NAME eq prev_row}"><c:set var="check_row" value="${check_row + 1}" /></c:if>
                        <c:if test="${list.EQIPMN_GBN_NAME ne prev_row}">
                            <c:set var="check_row" value="0" />
                        </c:if>

                        <c:if test="${list.EQIPMN_GBN_NAME ne prev_row && status.index ne 0}">
                            <tr>
                                <td style="height:30px; background-color:#FFF2CC; text-align:center;" colspan="2"><p style="font-size:10px;">소계</p></td>
                                <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${befUseTimeSum}"/></p></td>
                                <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${useTimeSum}"/></p></td>
                                <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${epCountSum}"/></p></td>
                                <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnNameSum}"/></p></td>
                                <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnASum}"/></p></td>
                                <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnBSum}"/></p></td>
                                <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnCSum}"/></p></td>
                                <td style="height:30px; text-align:center;"><p style="font-size:10px;"></p></td>
                                <c:set var="befUseTimeSum" value="0"/>
                                <c:set var="useTimeSum" value="0"/>
                                <c:set var="epCovuntSum" value="0"/>
                                <c:set var="prtcoGbnNameSum" value="0"/>
                                <c:set var="prtcoGbnSnASum" value="0"/>
                                <c:set var="prtcoGbnSnBSum" value="0"/>
                                <c:set var="prtcoGbnSnCSum" value="0"/>
                            </tr>
                        </c:if>
                        <tr>
                            <c:if test="${check_row == 0}">
                                <td rowspan="<c:out value='${list.PART_CNT + 1}'/>" style="height:30px; background-color:#FFF2CC; text-align:center; writing-mode: vertical-rl;">
                                    <c:if test="${list.EQIPMN_GBN_NAME eq '복합소재'}">
                                        복<br>합<br>소<br>재<br>
                                    </c:if>
                                    <c:if test="${list.EQIPMN_GBN_NAME eq '드론산업'}">
                                        드<br>론<br>산<br>업<br>
                                    </c:if>
                                    <c:if test="${list.EQIPMN_GBN_NAME eq '메이커스페이스'}">
                                        메<br>이<br>커<br>스<br>페<br>이<br>스<br>
                                    </c:if>
                                    (${list.PART_CNT + 1}종)
                                </td>
                            </c:if>
                            <td style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;">${list.EQIPMN_NAME}</p></td>
                            <td style="height:30px;text-align:center;"><p style="font-size:10px;">${list.REGTR_NAME}</p></td>
                            <td class="number" style="height:30px;text-align:center;"><p style="font-size:10px;">${list.BEF_USE_TIME}</p></td>
                            <td class="number" style="height:30px; background-color:#FCE4D6; text-align:center;"><p style="font-size:10px;">${list.USE_TIME}</p></td>
                            <td class="number" style="height:30px; background-color:#FCE4D6; text-align:center;"><p style="font-size:10px;">${list.EP_COUNT}</p></td>
                            <td class="number" style="height:30px; background-color:#FCE4D6; text-align:center;"><p style="font-size:10px;">${list.PRTPCO_GBN_NAME}</p></td>
                            <td class="number" style="height:30px;  background-color:#EDEDED;text-align:center;"><p style="font-size:10px;">${list.PRTPCO_GBN_SN_A}</p></td>
                            <td class="number" style="height:30px;  background-color:#EDEDED;text-align:center;"><p style="font-size:10px;">${list.PRTPCO_GBN_SN_B}</p></td>
                            <td class="number" style="height:30px;  background-color:#EDEDED;text-align:center;"><p style="font-size:10px;">${list.PRTPCO_GBN_SN_C}</p></td>
                            <td style="height:30px;text-align:center;"><p style="font-size:10px;"></p></td>
                        </tr>
                        <c:set var="befUseTimeSum" value="${befUseTimeSum + list.BEF_USE_TIME}"/>
                        <c:set var="useTimeSum" value="${useTimeSum + list.USE_TIME}"/>
                        <c:set var="epCountSum" value="${epCountSum + list.EP_COUNT}"/>
                        <c:set var="prtcoGbnNameSum" value="${prtcoGbnNameSum + list.PRTPCO_GBN_NAME}"/>
                        <c:set var="prtcoGbnSnASum" value="${prtcoGbnSnASum + list.PRTPCO_GBN_SN_A}"/>
                        <c:set var="prtcoGbnSnBSum" value="${prtcoGbnSnBSum + list.PRTPCO_GBN_SN_B}"/>
                        <c:set var="prtcoGbnSnCSum" value="${prtcoGbnSnCSum + list.PRTPCO_GBN_SN_C}"/>
                        <c:set var="prev_row"><c:out value="${list.EQIPMN_GBN_NAME}" /></c:set>

                        <c:set var="befUseTimeSumTotal" value="${befUseTimeSumTotal + list.BEF_USE_TIME}"/>
                        <c:set var="useTimeSumTotal" value="${useTimeSumTotal + list.USE_TIME}"/>
                        <c:set var="epCountSumTotal" value="${epCountSumTotal + list.EP_COUNT}"/>
                        <c:set var="prtcoGbnNameSumTotal" value="${prtcoGbnNameSumTotal + list.PRTPCO_GBN_NAME}"/>
                        <c:set var="prtcoGbnSnASumTotal" value="${prtcoGbnSnASumTotal + list.PRTPCO_GBN_SN_A}"/>
                        <c:set var="prtcoGbnSnBSumTotal" value="${prtcoGbnSnBSumTotal + list.PRTPCO_GBN_SN_B}"/>
                        <c:set var="prtcoGbnSnCSumTotal" value="${prtcoGbnSnCSumTotal + list.PRTPCO_GBN_SN_C}"/>
                    </c:forEach>
                    <tr>
                        <td style="height:30px; background-color:#FFF2CC; text-align:center;" colspan="2"><p style="font-size:10px;">소계</p></td>
                        <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${befUseTimeSum}"/></p></td>
                        <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${useTimeSum}"/></p></td>
                        <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${epCountSum}"/></p></td>
                        <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnNameSum}"/></p></td>
                        <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnASum}"/></p></td>
                        <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnBSum}"/></p></td>
                        <td class="number" style="height:30px; background-color:#FFF2CC; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnCSum}"/></p></td>
                        <td style="height:30px; text-align:center;"><p style="font-size:10px;"></p></td>
                    </tr>
                    <tr>
                        <td style="height:30px; background-color:#DDEBF7; text-align:center;" colspan="3"><p style="font-size:10px;">합계</p></td>
                        <td style="height:30px; background-color:#DDEBF7; text-align:center;"><p style="font-size:10px;"><c:out value="${befUseTimeSumTotal}"/></p></td>
                        <td style="height:30px; background-color:#DDEBF7; text-align:center;"><p style="font-size:10px;"><c:out value="${useTimeSumTotal}"/></p></td>
                        <td style="height:30px; background-color:#DDEBF7; text-align:center;"><p style="font-size:10px;"><c:out value="${epCountSumTotal}"/></p></td>
                        <td style="height:30px; background-color:#DDEBF7; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnNameSumTotal}"/></p></td>
                        <td style="height:30px; background-color:#DDEBF7; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnASumTotal}"/></p></td>
                        <td style="height:30px; background-color:#DDEBF7; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnBSumTotal}"/></p></td>
                        <td style="height:30px; background-color:#DDEBF7; text-align:center;"><p style="font-size:10px;"><c:out value="${prtcoGbnSnCSumTotal}"/></p></td>
                        <td style="height:30px; text-align:center;"><p style="font-size:10px;"></p></td>
                    </tr>
                    <tr>
                        <td style="height:120px; text-align:left;" colspan="11">
                            <p style="font-size:14px;">※ 이슈사항</p>
                            <c:set var="befTotal" value="0"/>
                            <c:set var="nowTotal" value="0"/>(
                            <c:forEach var="lcList" items="${data.LGCategory}" varStatus="status">
                                <c:set var="befTotal" value="${befTotal + lcList.BEF_USE_TIME}"/>
                                <c:set var="nowTotal" value="${nowTotal + lcList.USE_TIME}"/>
                            </c:forEach>
                            <c:if test="${befTotal gt nowTotal}">
                                <c:set var="totalStatus" value="감"/>
                                <c:set var="totalColor" value="#FF0000"/>
                                <c:set var="diffTotal" value="${befTotal - nowTotal}"/>
                            </c:if>
                            <c:if test="${befTotal lt nowTotal}">
                                <c:set var="totalStatus" value="증"/>
                                <c:set var="totalColor" value="#0080FF"/>
                                <c:set var="diffTotal" value="${nowTotal - befTotal}"/>
                            </c:if>
                            <p style="font-size:14px;">1. 가동시간 : 전월대비 총 <font style="font-size: 14px; color: ${totalColor}"> <c:out value="${totalStatus}"/> <c:out value="${diffTotal}"/>H </font>(
                                    <c:forEach var="lcList" items="${data.LGCategory}" varStatus="status">
                                        <c:if test="${status.index ne 0}">
                                            &nbsp/
                                        </c:if>
                                        <c:if test="${lcList.STATUS eq '증'}">
                                            <c:set var="totalColor" value="#0080FF"/>
                                        </c:if>
                                        <c:if test="${lcList.STATUS eq '감'}">
                                            <c:set var="totalColor" value="#FF0000"/>
                                        </c:if>
                                        ${lcList.EQIPMN_GBN_NAME} <font style="font-size: 14px; color: ${totalColor}">${lcList.STATUS}  ${lcList.DIFF}H</font>
                                    </c:forEach>
                                &nbsp)</p>
                            <p style="font-size:14px;">2. 특이사항 : </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<script>
    window.resizeTo(965, 900);
    $.each($('.number'), function(i, v){
        let text = $(v).text();
        if(text == "0"){
            $(v).text("-");
        }
    });
    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "140";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[장비활용실적보고서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "equipment";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "8";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticEquipment";
        approvalParams.approKey = "camticEquipment_${params.eqipnmApprovalSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
