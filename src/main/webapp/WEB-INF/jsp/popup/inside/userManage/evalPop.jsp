<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalSn" value="${params.evalSn}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">역량평가</h3>
            <%--<div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" &lt;%&ndash;onclick="saveData()"&ndash;%&gt;>저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>--%>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="30%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">차수</th>
                    <th scope="row" class="text-center th-color">평가기간</th>
                    <th scope="row" class="text-center th-color">본인 평가</th>
                    <th scope="row" class="text-center th-color">1차 평가</th>
                    <th scope="row" class="text-center th-color">2차 평가</th>
                    <th scope="row" class="text-center th-color">비고</th>
                </tr>
                </thead>
                <tbody id="evalList">
                </tbody>
            </table>
        </div>
    </div>
</div>


<script>
    $(function (){
        $.ajax({
            url : "/evaluation/getEvaluationOneList",
            type : "post",
            data : { evalSn : $("#evalSn").val()},
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result.list);
                fn_addTbody(result.list);
            },
            error : function(e) {
                console.log(e);
            }
        });
    });

    function fn_addTbody(list){
        var html = "";
        html += '<tr>';
        html += '   <td>'+ list.EVAL_NUM +' 차</td>';
        html += '   <td>'+ list.EVAL_STR_DT +' ~ ' + list.EVAL_END_DT +'</td>';
        html += '   <td></td>';
        html += '   <td></td>';
        html += '   <td></td>';
        html += '   <td></td>';
        html += '</tr>';

        $('#evalList').append(html);
    }
</script>
</body>
</html>