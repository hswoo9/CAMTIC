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
                    <span id="titleStat">[정부사업] 예산 설정</span>
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
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="10%">
                    <col width="15%">
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
                    <th scope="row" class="text-center th-color">구분</th>
                    <td colspan="4">
                        <input type="radio" id="pay" name="budgetRadio" value="CASH" checked style="position: relative; top: 6px;"><label for="pay" class="radioInput" style="position: relative; top: 5px; margin-left: 2px">현금</label>
                        <input type="radio" id="point" name="budgetRadio" value="POINT" style="position: relative; top: 6px; margin-left:5px;"><label for="point" class="radioInput" style="position: relative; top: 5px; margin-left: 2px">포인트</label>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">포인트-사업비<br> 집행시스템</th>
                    <td colspan="4">
                        <span>
                            <input type="text" id="execSystem" style="width: 30%">
                        </span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        $("#execSystem").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "e나라도움", value: "1" },
                { text: "RCMS", value: "2" },
                { text: "통합이지바로", value: "3"},
                { text: "보탬e", value: "4" },
                { text: "KIRIA", value: "5" },
                { text: "JBTP", value: "6" },
                { text: "기타", value: "99" },
            ],
        });

        $("#execSystem").data("kendoDropDownList").enable(false);


        $("input[name='budgetRadio']").click(function(){
            if($("input[name=budgetRadio]:checked").val() == "CASH"){
                $("#execSystem").data("kendoDropDownList").enable(false);
                $("#execSystem").data("kendoDropDownList").value("");
            } else {
                $("#execSystem").data("kendoDropDownList").enable(true);
            }
        });



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
                    $("#execSystem").data("kendoDropDownList").value(rs.EXEC_SYSTEM);
                    $("input[name=budgetRadio][value=" + rs.BUDGET_GUBUN + "]").prop("checked", true);

                    if($("input[name=budgetRadio]:checked").val() != "CASH"){
                        if(rs.BUDGET_GUBUN == "CASH"){
                            $("#execSystem").data("kendoDropDownList").enable(false);
                        } else {
                            $("#execSystem").data("kendoDropDownList").enable(true);
                        }
                    }
                }
            });
        }
    });

    function fn_save () {
        var data = {
            pjtSn : $("#paramPjtSn").val(),
            execSystem : $("#execSystem").data("kendoDropDownList").value(),
            budgetGubun : $("input[name=budgetRadio]:checked").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("input[name=budgetRadio]:checked").val() == "CASH"){
            data.execSystem = "";
        }

        if($("#depoSetSn").val() != "" && $("#depoSetSn").val() != null && $("#depoSetSn").val() != "undefined"){
            data.depoSetSn = $("#depoSetSn").val();
        }

        $.ajax({
            url : "/pay/setProjectBudgetInfo",
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