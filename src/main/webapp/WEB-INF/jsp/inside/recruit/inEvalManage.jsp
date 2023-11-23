<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/inEvalManage.js?v=${today}"/></script>
<style>
    a:hover{
        text-decoration: underline !important;
        color: blue;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">면접평가표 관리</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>

        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">관리명</th>
                        <td>
                            <input type="text" id="evalManageTitle" style="width: 150px;" onkeypress="if(window.event.keyCode==13){inEvalManage.gridReload()}">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid1" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    inEvalManage.init();
</script>
<script type="text/x-kendo-template" id="template">
    <div class='subGrid'></div>
</script>
</body>