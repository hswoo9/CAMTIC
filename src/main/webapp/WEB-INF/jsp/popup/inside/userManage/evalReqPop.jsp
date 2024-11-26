<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/contentPop.js?v=${today}"/></script>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">업적평가 목표 설정</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="saveData()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수주
                    </th>
                    <td>
                        <input type="text" id="content1" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>매출
                    </th>
                    <td>
                        <input type="text" id="content2" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수익
                    </th>
                    <td>
                        <input type="text" id="content3" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>비용
                    </th>
                    <td>
                        <input type="text" id="content4" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>사업화지수
                    </th>
                    <td>
                        <input type="text" id="content5" style="width: 100%;">
                    </td>
                    <td colspan="2"></td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>

    function saveData() {
        $.ajax({
            type: "POST",
            url: "",
            data: {
                content1: $("#content1").val(),
                content2: $("#content2").val(),
                content3: $("#content3").val(),
                content4: $("#content4").val(),
                content5: $("#content5").val()
            },
            success: function(response) {
                alert("설정이 완료되었습니다.");
                window.close();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error occurred while saving data:", textStatus);
            }
        });
    }

    contentPop.init();
</script>
</body>
</html>