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
        <input type="hidden" id="pjtSn" value="${params.pjtSn}"/>
        <input type="hidden" id="year" value="${params.year}"/>

        <input type="hidden" id="aAmt" value="${data.BEF_EXP_SALE_AMT}"/>
        <input type="hidden" id="bAmt" value="${data.BEF_EXP_PROFIT_AMT}"/>

        <input type="hidden" id="cAmt" value="${data.AFT_SALE_AMT}"/>
        <input type="hidden" id="dAmt" value="${data.AFT_PROFIT_AMT}"/>

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">금액설정</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="fn_save()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <div>
            <div style="padding: 10px 15px;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="25%">
                        <col width="25%">
                        <col width="25%">
                        <col width="25%">
                    </colgroup>
                    <tr style="color : black ; background-color: #f0f6ff;">
                        <td style="text-align: center;"><b>전년도 매출액</b></td>
                        <td style="text-align: center;"><b>전년도 운영수익</b></td>
                        <td style="text-align: center;"><b>차년도 매출액</b></td>
                        <td style="text-align: center;"><b>차년도 운영수익</b></td>
                    </tr>
                    <tr style="background-color: white">
                        <td>
                            <input type="text" id="befExpSaleAmt" style="width: 100%; text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        </td>
                        <td>
                            <input type="text" id="befExpProfitAmt" style="width: 100%; text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        </td>
                        <td>
                            <input type="text" id="aftSaleAmt" style="width: 100%; text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        </td>
                        <td>
                            <input type="text" id="aftProfitAmt" style="width: 100%; text-align: right" value="0" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                        </td>
                    </tr>
            </table>
            </div>
        </div>
    </div>
</div>

<script>
    $(function(){
        customKendo.fn_textBox(["befExpSaleAmt", "befExpProfitAmt", "aftSaleAmt", "aftProfitAmt"]);

        $("#befExpSaleAmt").val(comma($("#aAmt").val() || 0));
        $("#befExpProfitAmt").val(comma($("#bAmt").val() || 0));
        $("#aftSaleAmt").val(comma($("#cAmt").val() || 0));
        $("#aftProfitAmt").val(comma($("#dAmt").val() || 0));
    });

    function fn_save(){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            year : $("#year").val(),
            befExpSaleAmt : uncomma($("#befExpSaleAmt").val()),
            befExpProfitAmt : uncomma($("#befExpProfitAmt").val()),
            aftSaleAmt : uncomma($("#aftSaleAmt").val()),
            aftProfitAmt : uncomma($("#aftProfitAmt").val()),
            regEmpSeq : $("#regEmpSeq").val()
        }

        var rs = customKendo.fn_customAjax("/cam_achieve/setProjectPaySet", parameters);

        if(rs.code == 200){
            alert("등록되었습니다.");

            window.close();
        }
    }

    function inputNumberFormat (obj){
        obj.value = comma(uncomma(obj.value));
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }

</script>
</body>
</html>