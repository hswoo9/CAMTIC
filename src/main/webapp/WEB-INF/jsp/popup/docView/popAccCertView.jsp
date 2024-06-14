<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<style>
    th {
        background-color: #f0f6ff;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_mng/companyCard/regCardToPop.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/cam_item/popup/popBomView.js?v=${today}"/></script>

<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">

<form id="accCertDraftFrm" method="post">
    <input type="hidden" id="accCertSn" name="accCertSn" value="${params.key}" />
    <input type="hidden" id="menuCd" name="menuCd" value="cardLoss">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">공인인증서 사용신청서</span>
            </h3>
            <div class="btn-st popButton">
                <span id="accCertBtnBox">

                </span>
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" style="margin-right:5px;" onclick="fn_save()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th>신청자</th>
                    <td>
                        <input type="text" id="empName" disabled name="empName" value="${loginVO.name}">
                    </td>
                    <th>소속부서</th>
                    <td>
                        <input type="text" id="deptName" disabled name="deptName" value="${loginVO.orgnztNm}">
                    </td>
                </tr>
                <tr>
                    <th>사용신청서</th>
                    <td colspan="3">
                        <span id="accCertType"></span>
                    </td>

                </tr>
                <tr>
                    <th>사용용도</th>
                    <td colspan="3">
                        <textarea type="text" id="accCertUse" name="accCertUse" value="" ></textarea>
                    </td>

                </tr>
                <tr>
                    <th>사용기간</th>
                    <td colspan="3">
                        <input type="text" id="strDe" style="width: 30%"> ~ <input type="text" id="endDe" style="width: 30%">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "deptName"]);

        $("#accCertType").kendoRadioGroup({
            items: [
                { label : "은행용인증서", value : "A" },
                { label : "범용인증서", value : "B" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1"
        });

        customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", new Date());

        $("#accCertUse").kendoTextArea({rows: 5});

        if($("#accCertSn").val() != ""){
            fn_setData();
        }
    });

    function fn_save (){
        var parameters = {
            empName : $("#empName").val(),
            deptName : $("#deptName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            accCertType : $("#accCertType").data("kendoRadioGroup").value(),
            accCertUse : $("#accCertUse").val(),
            strDe : $("#strDe").val(),
            endDe : $("#endDe").val()
        };

        if($("#accCertSn").val() != ""){
            parameters.accCertSn = $("#accCertSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveAccCert", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popAccCertView.do?key=" + rs.params.accCertSn;
       }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getAccCertData", {accCertSn : $("#accCertSn").val()});

        var result = rs.data;

        $("#empName").val(result.EMP_NAME);
        $("#deptName").val(result.DEPT_NAME);
        $("#empSeq").val(result.EMP_SEQ);
        $("#deptSeq").val(result.DEPT_SEQ);
        $("#accCertType").data("kendoRadioGroup").value(result.ACC_CERT_TYPE);
        $("#accCertUse").val(result.ACC_CERT_USE);
        $("#strDe").val(result.STR_DE);
        $("#endDe").val(result.END_DE);

        fn_btnSet(result);
        fn_kendoUIEnableSet(result);
    }

    function fn_btnSet (data) {
        let html = makeApprBtnHtml(data, "accCertDrafting()");
        $("#accCertBtnBox").html(html);

        if(data != null && data.DOC_ID != null){
            reDraftOnlyOne(data.DOC_ID, $("#empSeq").val(), "reBtn");
        }
    }

    function fn_kendoUIEnableSet (data) {
        if(data != null){
            /** 상신, 재상신, 최종결재완료 상태일때 UI 비활성화 */
            if(data.STATUS == "10" || data.STATUS == "50" || data.STATUS == "100"){
                $("#saveBtn").css("display", "none");
            }
        }
    }

    function accCertDrafting(){
        $("#accCertDraftFrm").one("submit", function() {
            var url = "/popup/customDoc/approvalFormPopup/accCertApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/customDoc/approvalFormPopup/accCertApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }
</script>
</body>
</html>