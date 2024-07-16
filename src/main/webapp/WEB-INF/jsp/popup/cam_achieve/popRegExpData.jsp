<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="budgetType" value="${params.budgetType}">
        <input type="hidden" id="expPaySn" value="${params.pk}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <c:if test="${params.budgetType eq 'incp'}">
                    <span style="position: relative; top: 3px;" id="popTitle">수입예정 추가</span>
                </c:if>
                <c:if test="${params.budgetType eq 'exnp'}">
                    <span style="position: relative; top: 3px;" id="popTitle">지출예정 추가</span>
                </c:if>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="fn_expSave();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <div>
            <div style="padding: 15px;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="22%">
                        <col width="28%">
                        <col width="22%">
                        <col width="28%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>구분
                        </th>
                        <td>
                            <input type="text" id="gubun" style="width: 100%;" value="기타" disabled>
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>세부구분
                        </th>
                        <td>
                            <input type="text" id="gubunDetail" style="width: 100%;" value="기타" disabled>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <c:if test="${params.budgetType eq 'incp'}">
                                <span class="red-star">*</span>프로젝트명
                            </c:if>
                            <c:if test="${params.budgetType eq 'exnp'}">
                                <span class="red-star">*</span>예산프로젝트명
                            </c:if>
                        </th>
                        <td colspan="3">
                            <input type="text" id="pjtNm" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>거래처
                        </th>
                        <td colspan="3">
                            <input type="text" id="crmNm" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <c:if test="${params.budgetType eq 'incp'}">
                                <span class="red-star">*</span>입금예정액 (vat 포함)
                            </c:if>
                            <c:if test="${params.budgetType eq 'exnp'}">
                                <span class="red-star">*</span>지출예정액 (vat 포함)
                            </c:if>
                        </th>
                        <td>
                            <input type="text" id="expPay" style="width: 100%; text-align: right;" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <th scope="row" class="text-center th-color">
                            <c:if test="${params.budgetType eq 'incp'}">
                                <span class="red-star">*</span>입금예정일
                            </c:if>
                            <c:if test="${params.budgetType eq 'exnp'}">
                                <span class="red-star">*</span>지출예정일
                            </c:if>
                        </th>
                        <td>
                            <input type="text" id="expDe" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>상태
                        </th>
                        <td>
                            <input type="text" id="expStat" style="width: 100%;">
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<script>
    $(function(){
        fn_defaultScript();
    });

    function fn_defaultScript() {
        customKendo.fn_textBox(["gubun", "gubunDetail", "pjtNm", "crmNm", "expPay"]);
        customKendo.fn_datePicker("expDe", 'month', "yyyy-MM-dd", new Date());

        $("#expStat").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "확정", value: "A"},
                {text: "예정", value: "B"},
                {text: "추가", value: "C"},
            ]
        });

        if($("#expPaySn").val()){
            fn_dataSet();
        }
    }

    function fn_dataSet(){
        let result = customKendo.fn_customAjax("/cam_achieve/getExpertPayData", { expPaySn : $("#expPaySn").val() });
        if(result.flag) {
            $("#pjtNm").val(result.data.PJT_NM);
            $("#crmNm").val(result.data.CRM_NM);
            $("#expPay").val(comma(result.data.EXP_PAY));
            $("#expDe").val(result.data.EXP_DE);
            $("#expStat").data("kendoDropDownList").value(result.data.STATUS);
        }
    }

    function fn_expSave(){

        if(!$("#gubun").val()) {
            alert("구분을 입력해주세요.");
            return;
        } else if(!$("#gubunDetail").val()) {
            alert("세부구분을 입력해주세요.");
            return;
        } else if(!$("#pjtNm").val()) {
            alert("프로젝트명을 입력해주세요.");
            return;
        } else if(!$("#crmNm").val()) {
            alert("거래처를 입력해주세요.");
            return;
        } else if(!$("#expPay").val()) {
            alert("입금예정액을 입력해주세요.");
            return;
        } else if(!$("#expDe").val()) {
            alert("입금예정일을 입력해주세요.");
            return;
        } else if(!$("#expStat").data("kendoDropDownList").value()) {
            alert("상태를 선택해주세요.");
            return;
        }

        let data = {
            budgetType : $("#budgetType").val(),
            gubun : $("#gubun").val(),
            gubunDetail : $("#gubunDetail").val(),
            pjtNm : $("#pjtNm").val(),
            crmNm : $("#crmNm").val(),
            expPay : uncommaN($("#expPay").val()),
            expDe : $("#expDe").val(),
            status : $("#expStat").data("kendoDropDownList").value(),
        }

        if($("#expPaySn").val()){
            data.expPaySn = $("#expPaySn").val()
        }

        $.ajax({
            url : "/cam_achieve/insExpectPayData",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");

                    if($("#budgetType").val() == "incp"){
                        opener.parent.expMn.gridReload1();
                    } else {
                        opener.parent.expMn.gridReload2();
                    }

                    window.close();
                }
            }
        });
    }
</script>
</body>
</html>