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

<form id="cardLossDraftFrm" method="post">
    <input type="hidden" id="tpClSn" name="tpClSn" value="${params.key}" />
    <input type="hidden" id="menuCd" name="menuCd" value="cardLoss">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">법인카드 분신 신고서</span>
            </h3>
            <div class="btn-st popButton">
                <span id="cardLossBtnBox">

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
                    <th>법인카드번호(4자리)</th>
                    <td>
                        <input type="text" id="cardNo" name="cardNo" value="" style="width: 80%">
                        <button type="button" class="k-button k-button-solid-base" onclick="regCardToPop.fn_popRegDet(8, 0);">조회</button>
                    </td>
                    <th>담당자</th>
                    <td>
                        <input type="text" id="cardMst" disabled name="cardMst" value="" >
                    </td>
                </tr>
                <tr>
                    <th>분실일자</th>
                    <td>
                        <input type="text" id="clDe" name="clDe" value="" >
                    </td>
                    <th>분실장소</th>
                    <td>
                        <input type="text" id="clLoc" name="clLoc" value="" >
                    </td>
                </tr>
                <tr>
                    <th>분실사유</th>
                    <td colspan="3">
                        <textarea id="clIss" name="clIss" value="" ></textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "deptName", "cardNo", "cardMst", "clLoc"]);

        customKendo.fn_datePicker("clDe", "depth", "yyyy-MM-dd", new Date());

        $("#clIss").kendoTextArea({rows: 5});

        if($("#tpClSn").val() != ""){
            fn_setData();
        }
    });

    function fn_save (){
        var parameters = {
            empName : $("#empName").val(),
            deptName : $("#deptName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            cardNo : $("#cardNo").val(),
            cardMst : $("#cardMst").val(),
            clDe : $("#clDe").val(),
            clLoc : $("#clLoc").val(),
            clIss : $("#clIss").val()
        };

        if($("#cardNo").val() == ""){
            alert("법인카드를 선택해주세요.")
            return;
        }

        if($("#tpClSn").val() != ""){
            parameters.tpClSn = $("#tpClSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveCardLoss", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popCLView.do?key=" + rs.params.tpClSn;
       }
    }


    function fn_selCardInfo(trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor, idx){
        $("#cardNo").val(cardBaNb);

        var parameters ={
            cardBaNb : cardBaNb.toString().replaceAll("-", "")
        }

        var rs = customKendo.fn_customAjax("/customDoc/getCardManager", parameters);

        $("#cardMst").val(rs.list[0].MNG_NAME);
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getCardLossData", {tpClSn : $("#tpClSn").val()});

        var result = rs.data;

        $("#empName").val(result.EMP_NM);
        $("#deptName").val(result.DEPT_NAME);
        $("#empSeq").val(result.EMP_SEQ);
        $("#deptSeq").val(result.DEPT_SEQ);
        $("#cardNo").val(result.CARD_NO);
        $("#cardMst").val(result.CARD_MST);
        $("#clDe").val(result.CL_DE);
        $("#clLoc").val(result.CL_LOC);
        $("#clIss").val(result.CL_ISS);

        fn_btnSet(result);
        fn_kendoUIEnableSet(result);
    }

    function fn_btnSet (data) {
        let html = makeApprBtnHtml(data, "cardLossDrafting()");
        $("#cardLossBtnBox").html(html);

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

    function cardLossDrafting(){
        $("#cardLossDraftFrm").one("submit", function() {
            var url = "/popup/customDoc/approvalFormPopup/cardLossApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/customDoc/approvalFormPopup/cardLossApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }
</script>
</body>
</html>