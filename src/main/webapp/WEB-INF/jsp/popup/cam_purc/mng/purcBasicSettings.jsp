<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}"/>
<input type="hidden" id="claimSn" name="claimSn" value="${params.claimSn}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">구매지급설정</span>
            </h3>

            <div id="payAppBtnDiv" class="btn-st popButton" style="font-size: 13px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="fn_regist();">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="fn_close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table id="popTable" class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead id="payTableBody">
                    <tr>
                        <th class="text-center">프로젝트</th>
                        <td colspan="3">
                            <input type="text" id="pjtNm" name="pjtNm" readonly style="width: 80%" />
                            <input type="hidden" id="pjtSn" name="pjtSn" />
                            <input type="hidden" id="pjtCd" name="pjtCd" />
                            <button type="button" class="k-button k-button-solid-base" onclick="fn_projectPop('regPay')">검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center">예산비목</th>
                        <td colspan="3">
                            <input type="text" id="budgetNm" name="budgetNm" readonly style="width: 80%" />
                            <input type="hidden" id="budgetSn" name="budgetSn" />
                            <button type="button" class="k-button k-button-solid-base" onclick="fn_budgetPop()">검색</button>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script>

    $(function(){
        customKendo.fn_textBox(["pjtNm", "budgetNm"]);

        if(opener.parent.purcMngAppList.global.clmList.length > 0){

            var claimSn = opener.parent.purcMngAppList.global.clmList[0];

            var data = {
                claimSn : claimSn
            }

            $.ajax({
                url : "/purc/getBasicSetting",
                data : data,
                type : "post",
                dataType : "json",
                success : function(rs){
                    if(rs.map != null) {
                        $("#budgetSn").val(rs.map.BUDGET_SN);
                        $("#budgetNm").val(rs.map.BUDGET_NM);
                        $("#pjtNm").val(rs.map.PJT_NM);
                        $("#pjtCd").val(rs.map.PJT_CD);
                    }
                }
            })
        }
    });

    function fn_close() {
        window.close();
    }

    function fn_projectPop(type){
        var url = "/project/pop/g20ProjectView.do?type=" + type;

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

    function fn_budgetPop (idx){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val();

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    }

    function fn_selBudgetInfo(name, cd, idx, subAmt){
        $("#budgetNm").val(name);
        $("#budgetSn").val(cd);
    }

    function selectProject(key, name, cd, baseYear){
        $("#pjtNm").val(name);
        $("#pjtCd").val(cd);
    }

    function fn_regist(){
        var itemArr = "";

        for(var i = 0; i < opener.parent.purcMngAppList.global.clmList.length; i++){
            itemArr += opener.parent.purcMngAppList.global.clmList[i] + ",";
        }

        itemArr = itemArr.substring(0, itemArr.length - 1);

        if(!$("#pjtNm").val()) {
            alert("프로젝트가 선택되지 않았습니다.");
            return;
        } else if(!$("#budgetNm").val()) {
            alert("예산비목이 선택되지 않았습니다.");
            return;
        }

        var data = {
            itemArr : itemArr,
            pjtNm : $("#pjtNm").val(),
            pjtCd : $("#pjtCd").val(),
            budgetNm : $("#budgetNm").val(),
            budgetSn : $("#budgetSn").val(),
            mngSetStat : "Y"
        }

        $.ajax({
            url : "/purc/mng/setPurcBasicSetting",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("설정이 완료되었습니다.");
                    opener.parent.purcMngAppList.gridReload();

                    window.close();
                }
            }
        });

    }
</script>
</body>
</html>