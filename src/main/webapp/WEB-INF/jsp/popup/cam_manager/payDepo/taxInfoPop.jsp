<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<input type="hidden" id="payDepoSn" name="payDepoSn" value="${params.payDepoSn }" />
<input type="hidden" id="paramPjtSn" name="paramPjtSn" value="${params.pjtSn }" />
<input type="hidden" id="paramPjtNm" name="paramPjtNm" value="${hashMap.PJT_NM }" />
<input type="hidden" id="auth" value="${params.auth}" />
<input type="hidden" id="paramPm" value="${hashMap.PM}" />
<input type="hidden" id="paramPmSeq" value="${hashMap.PM_EMP_SEQ}" />
<input type="hidden" id="getDelvDe" value="${hashMap.DELV_DE}" />
<input type="hidden" id="depoSetSn" name="depoSetSn" value="${params.depoSetSn }" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <span id="titleStat">[민간사업] 세무정보</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="fn_save();">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="regDeptSeq" value="${loginVO.orgnztId}">
            <span id="lastRegEmpName"></span>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="15%">
                    <col width="10%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr style="display: none;" id="payDepReqUserTh">
                    <th scope="row" class="text-center th-color">요청자</th>
                    <td colspan="4">
                        <input type="text" id="payDepoReqUser" style="width: 15%" disabled>
                    </td>
                </tr>
                <tr id="project">
                    <th scope="row" rowspan="3" class="text-center th-color">사업장 코드 설정</th>
                    <th scope="row" class="text-center th-color">
                        <input type="radio" value="1" id="codeVal1" name="codeVal" style="position: relative; top: 3px;" />
                        <label for="codeVal1" style="position: relative; top: 1px;">수익사업</label>
                    </th>
                    <td colspan="3">
                        <input type="text" id="profitCode" name="profitCode" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <input type="radio" value="2" id="codeVal2" name="codeVal" style="position: relative; top: 3px;" />
                        <label for="codeVal2" style="position: relative; top: 1px;">고유목적사업</label>
                    </th>
                    <td colspan="3">
                        <input type="text" id="purpCode" name="profitCode" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <input type="radio" value="3" id="codeVal3" name="codeVal" style="position: relative; top: 3px;" />
                        <label for="codeVal3" style="position: relative; top: 1px;">공통사업</label>
                    </th>
                    <td colspan="3">
                        <input type="text" id="commCode" name="profitCode" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">구분</th>
                    <td colspan="4">
                        <input type="radio" id="tax" name="taxRadio" value="1" checked style="position: relative; top: 6px;"><label for="tax" class="radioInput" style="position: relative; top: 5px; margin-left: 2px">과세</label>
                        <input type="radio" id="dutyFree" name="taxRadio" value="2" style="position: relative; top: 6px; margin-left:5px;"><label for="dutyFree" class="radioInput" style="position: relative; top: 5px; margin-left: 2px">면세</label>
                        <input type="radio" id="unTax" name="taxRadio" value="3" style="position: relative; top: 6px; margin-left:5px;"><label for="unTax" class="radioInput" style="position: relative; top: 5px; margin-left: 2px">비과세</label>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        $("#profitCode, #purpCode, #commCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: ""},
                { text: "1000", value: "1000" },
                { text: "2000", value: "2000" },
                { text: "3000", value: "3000" },
                { text: "4000", value: "4000" },
                { text: "5000", value: "5000" },
                { text: "6000", value: "6000" },
                { text: "7000", value: "7000" },
            ]
        });

        $("#profitCode").data("kendoDropDownList").value("1000");
        $("#purpCode").data("kendoDropDownList").value("2000");
        $("#commCode").data("kendoDropDownList").value("3000");

        // 저장정보 가져오기
        if($("#depoSetSn").val() != "" && $("#depoSetSn").val() != null && $("#depoSetSn").val() != "undefined"){
            var data = {
                pjtSn : $("#paramPjtSn").val(),
                depoSetSn : $("#depoSetSn").val(),
            }

            $.ajax({
                url : "/pay/getProjectSettingInfo",
                type : "post",
                data : data,
                dataType : "json",
                success : function(rs){
                    var rs = rs.data;
                    $("input[name=codeVal][value=" + rs.CODE_VAL + "]").prop("checked", true);
                    $("#profitCode").data("kendoDropDownList").value(rs.PROFIT_CODE);
                    $("#purpCode").data("kendoDropDownList").value(rs.PURP_CODE);
                    $("#commCode").data("kendoDropDownList").value(rs.COMM_CODE);
                    $("input[name=taxRadio][value=" + rs.TAX_GUBUN + "]").prop("checked", true);

                    $("#lastRegEmpName").text("마지막 변경자: " + (rs.MOD_EMP_NAME ? rs.MOD_EMP_NAME : rs.REG_EMP_NAME));
                }
            });
        }
    });

    function fn_save () {
        var data = {
            pjtSn : $("#paramPjtSn").val(),
            codeVal : $("input[name=codeVal]:checked").val(),
            profitCode : $("#profitCode").data("kendoDropDownList").value(),
            purpCode : $("#purpCode").data("kendoDropDownList").value(),
            commCode : $("#commCode").data("kendoDropDownList").value(),
            taxGubun : $("input[name=taxRadio]:checked").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if(data.codeVal == "1"){
            profitCode : $("#profitCode").data("kendoDropDownList").value()
        } else if (data.codeVal == "2"){
            purpCode : $("#purpCode").data("kendoDropDownList").value()
        } else if (data.codeVal == "3"){
            commCode : $("#commCode").data("kendoDropDownList").value()
        }

        if($("#depoSetSn").val() != "" && $("#depoSetSn").val() != null && $("#depoSetSn").val() != "undefined"){
            data.depoSetSn = $("#depoSetSn").val();
        }

        $.ajax({
            url : "/pay/setProjectTaxInfo",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    opener.parent.prjDepositMng.gridSearch();
                    window.close();
                }
            }
        });
    }
</script>
</body>
</html>