<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/organizationHistoryPop.js?v=${today}"/></script>

<style>
    #txtArea{border: 1px solid #eee;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div>
        <div class="panel">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">직제이력등록</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-base" onclick="history.back();">뒤로가기</button>
                    <button type="button" class="k-button k-button-solid-info" onclick="organizationHistory.fu_saveInfo()">저장</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="organizationHistory.fn_windowClose()">닫기</button>
                </div>
            </div>
            <form id="" style="padding: 20px 30px;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="20%">
                        <col width="35%">
                        <col width="35%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>제목</th>
                        <td colspan="2">
                            <input type="text" style="width: 50%;">
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td colspan="2">
                            <textarea cols="100" id="txtArea" rows="3"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>첨부파일1</th>
                        <td colspan="2">
                            <label for="gradeFile" class="k-button k-button-solid-base">파일첨부</label>
                            <input type="file" id="gradeFile" name="gradeFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
                            <span id="gradeFileName"></span>
                        </td>
                    </tr>
                    <tr>
                        <th>첨부파일2</th>
                        <td colspan="2">
                            <label for="gradeFile" class="k-button k-button-solid-base">파일첨부</label>
                            <input type="file" id="gradeFile" name="gradeFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
                            <span id="gradeFileName"></span>
                        </td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td colspan="2">
                            <input type="text" id="degree" style="width: 50%;">
                        </td>
                    </tr>

                </table>
            </form>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    organizationHistory.init();
</script>
</body>
</html>