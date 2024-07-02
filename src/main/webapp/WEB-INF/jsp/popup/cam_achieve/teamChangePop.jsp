<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="exnpDetSn" name="exnpDetSn" value="${params.exnpDetSn}">
        <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="year" value="${params.year}">
        <input type="hidden" id="type" value="${params.type}">
        <input type="hidden" id="deptLevel" value="${params.deptLevel}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">팀 변경</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="saveBtn()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <div>
            <div style="padding: 10px 15px;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="25%">
                        <col width="75%">
                    </colgroup>
                    <tr style="color : black ; background-color: #f0f6ff;">
                        <td style="text-align: center;"><b>팀</b></td>
                        <td style="text-align: center;">
                            <input type="text" id="team" name="team">
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
            deptLevel : 2
        });

        customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq","9");
    });

    function saveBtn(){

        var parameters = {
            teamSeq : $("#team").data("kendoDropDownList").value(),
            teamName : $("#team").data("kendoDropDownList").text(),
            exnpDetSn : $("#exnpDetSn").val()

        }

        var rs = customKendo.fn_customAjax("/cam_achieve/updChangeTeam", parameters);

        if(rs.code == 200){
            alert("저장되었습니다.");
            window.close();
        }

    }

</script>
</body>
</html>