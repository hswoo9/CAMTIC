<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/history/rewardReqBatchPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="mode" value="${data.mode}"/>
<input type="hidden" id="pk" value="${data.pk}"/>
<div class="card-header pop-header">
    <h3 class="card-title title_NM">포상 일괄등록</h3>
    <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" onclick="window.close();">닫기</button>
    </div>
</div>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel" style="margin: 0">
        <div class="panel-body" style="padding: 20px 0px;">
            <div>
                <div class="col-md-3 col-lg-3 dash-left">
                    <div class="col-md-12 col-lg-12 dash-left">
                        <div id="mainGrid"></div>
                    </div>
                </div>
                <div class="col-md-9 col-lg-9 dash-left">
                    <div class="table-responsive">
                        <div id="popMainGrid"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    rewardBatch.init();
</script>
</body>
