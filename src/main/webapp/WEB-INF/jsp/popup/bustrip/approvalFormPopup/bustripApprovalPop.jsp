<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div class="pop_wrap_dir" id="approvePop">
<div id="approveDataPop">
    <%--<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <tr>
            <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">
                <table border="1" style="border-collapse: collapse; margin-top: 0px;">
                    <tr>
                        <td style="height:30px;background-color:#FFE0E0; text-align:center;width:100px;"><p style="font-family:굴림; font-size:14px; letter-spacing:10px"><b>지급처</b></p></td>
                        <td style="height:30px;background-color:#FFE0E0; text-align:center;width:100px;"><p style="font-family:굴림; font-size:14px; letter-spacing:10px"><b>계약금액</b></p></td>
                        <td style="height:30px;background-color:#FFE0E0; text-align:center;width:100px;"><p style="font-family:굴림; font-size:14px; letter-spacing:10px"><b>선급금</b></p></td>
                        <td style="height:30px;background-color:#FFE0E0; text-align:center;width:100px;"><p style="font-family:굴림; font-size:14px; letter-spacing:10px"><b>잔금</b></p></td>
                        <td style="height:30px;background-color:#FFE0E0; text-align:center;width:100px;"><p style="font-family:굴림; font-size:14px; letter-spacing:10px"><b>잔금</b></p></td>
                    </tr>
                    <tr>
                        <td style="height:30px;text-align:center; width:100px;"><p style="font-family:굴림; font-size:14px;">1</p></td>
                        <td style="height:30px;text-align:center; width:100px;"><p style="font-family:굴림; font-size:14px;">1</p></td>
                        <td style="height:30px;text-align:center; width:100px;"><p style="font-family:굴림; font-size:14px;">1</p></td>
                        <td style="height:30px;text-align:center; width:100px;"><p style="font-family:굴림; font-size:14px;">1</p></td>
                        <td style="height:30px;text-align:center; width:100px;"><p style="font-family:굴림; font-size:14px;">1</p></td>
                    </tr>
                    <tr>
                        <td style="height:30px;text-align:center; width:160px;"><p style="font-family:함초롬돋움; font-size:14px;">1</p></td>
                        <td style="height:30px;text-align:center; width:160px;"><p style="font-family:함초롬돋움; font-size:14px;">1</p></td>
                        <td style="height:30px;text-align:center; width:160px;"><p style="font-family:함초롬돋움; font-size:14px;">1</p></td>
                        <td style="height:30px;text-align:center; width:160px;"><p style="font-family:함초롬돋움; font-size:14px;">1</p></td>
                        <td style="height:30px;text-align:center; width:160px;"><p style="font-family:함초롬돋움; font-size:14px;">1</p></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>--%>
</div>
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "135";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "bustrip";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "6";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticBustrip";
        approvalParams.approKey = "camticBustrip_${data.hrBizReqId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
