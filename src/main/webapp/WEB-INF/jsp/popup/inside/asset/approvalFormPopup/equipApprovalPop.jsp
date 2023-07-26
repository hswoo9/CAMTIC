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
                <table border="1" style="border-collapse: collapse; margin-top: 0px;">
                    <colgroup>
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 45px" rowspan="3"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>구분</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 70px" rowspan="3"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>장비명</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 50px" rowspan="3"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>담당자</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 90px" rowspan="2" colspan="2"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>시간</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 50px" rowspan="3"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>건수</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 180px" colspan="4"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>업체수</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 115px" rowspan="3"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>비고</b></p></td>
                    </tr>
                    <tr>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 45px" rowspan="2"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>업체수</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 90px" colspan="2"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>도내</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 45px" rowspan="2"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>도외</b></p></td>
                    </tr>
                    <tr>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 45px"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>전월</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 45px"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>당일</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 40px"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>단지</b></p></td>
                        <td style="height:15px;background-color:#D9E1F2; text-align:center; width: 50px"><p style="font-family:굴림; font-size:10px; letter-spacing:10px"><b>단지외</b></p></td>
                    </tr>
                    <tr>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                        <td style="height:30px;text-align:center;"><p style="font-family:굴림; font-size:10px;">1</p></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "140";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "equipment";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "8";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticEquipment";
        approvalParams.approKey = "camticEquipment_${params.searchDe}".replace("-", "");

        linkageProcessOn(approvalParams);
    }

    console.log('${data}');
</script>
</body>
</html>
