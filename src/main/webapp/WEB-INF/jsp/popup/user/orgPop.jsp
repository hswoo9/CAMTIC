<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/intra/user/org.css?${toDate}">
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/user/user.js?${toDate}"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/organizationChart.js?${toDate}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/userPersonList.js?${toDate}'/>"></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">조직도</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                </div>
            </div>
            <div style="padding: 20px 30px;">
                <table>
                    <tr>
                        <td rowspan="2">
                            <div id="gridForm" style="width:255px; overflow: auto;border: 1px solid #dedfdf;">
                                <div id="deptTree" style="height:685px;">

                                </div>
                            </div>
                        </td>
                        <td colspan="2" style="height:350px;">
                            <div id="gridForm2" style="width:100%; height:100%;">
                                <div id="deptUserGrid">

                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
</div>


<script>
    var datas = JSON.parse('${data}');
    orgChart.fn_defaultScript(datas);
</script>
</body>
</html>