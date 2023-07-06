<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    .removeDay{
        text-decoration:line-through;
        font-weight:700;
        color:red
    }
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-grid-norecords{
        justify-content: space-around;
    }
    .k-grid tbody tr{
        height: 38px;
    }
    #wptDiv{
        margin: 0 auto;
        width: 100px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
    }
    #wptDiv > label {
        margin : 0
    }
    #timeDiff{
        height: 255px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-header {padding: 0px 0px 40px 0px;}
    table { background-color: white; }
    .table > thead > tr > th, .table > tfoot > tr > th{ background-color: #8fa1c04a;}
</style>
<script type="text/javascript" src="/js/intra/inside/history/historyView.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
        <div class="table-responsive">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">세부 발령 사항</h3>
                    <div class="btn-st" style="margin-top:10px; text-align:center;">

                    </div>
                </div>
            </div>
            <div style="padding: 20px 30px;">
                <table class="table table-bordered mb-0" id="historyViewTb" style="margin-top: 10px;">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>호수</th>
                            <td>
                                ${data.NUMBER_NAME}
                            </td>
                            <th>발령 일자</th>
                            <td>
                                ${data.HISTORY_DT}
                            </td>
                        </tr>
                        <tr>
                            <th>사번</th>
                            <td>
                                ${data.ERP_EMP_SEQ}
                            </td>
                            <th>성명</th>
                            <td>
                                ${data.EMP_NAME}
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<script>
    historyViewPop.init();
</script>
</body>
