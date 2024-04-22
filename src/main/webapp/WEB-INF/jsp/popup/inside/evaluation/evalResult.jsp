<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalResult.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalSn" value="${params.pk}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">역량평가 결과</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" <%--onclick="saveData()"--%>>평가점수 조정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0">
                <tr>
                    <th class="text-center th-color">부서/팀</th>
                    <td>
                        <input type="text" id="dept" style="width:160px;">
                        <input type="hidden" id="dept_seq">
                        <input type="text" id="team" style="width:165px;">
                        <input type="hidden" id="team_seq">
                    </td>
                    <th class="text-center th-color">직책/직급</th>
                    <td <%--style="display: flex; justify-content: space-between;"--%>>
                        <input type="text" id="position" style="width: 160px;">
                        <input type="text" id="duty" style="width: 160px;">
                    </td>
                    <td <%--style="display: flex; justify-content: space-between;"--%>>
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_empList();">	<span class="k-button-text">조회</span></button>
                    </td>
                    <%--<th class="text-center th-color">이름</th>
                    <td>
                        <input type="text" id="name" style="width: 150px;" onkeypress="if(window.event.keyCode==13){employmentManage.gridReload()}">
                    </td>--%>

                </tr>
            </table>

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="1%">
                    <col width="10%">
                    <col width="10%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="4%">
                    <col width="4%">
                    <col width="4%">
                    <col width="4%">
                    <col width="4%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color" rowspan="2"></th>
                    <th scope="row" class="text-center th-color" rowspan="2">부서명</th>
                    <th scope="row" class="text-center th-color" rowspan="2">팀명</th>
                    <th scope="row" class="text-center th-color" rowspan="2">성명</th>
                    <th scope="row" class="text-center th-color" rowspan="2">본인</th>
                    <th scope="row" class="text-center th-color" colspan="3">1차 평가자</th>
                    <th scope="row" class="text-center th-color" colspan="3">2차 평가자</th>
                    <th scope="row" class="text-center th-color" colspan="3">3차 평가자</th>
                    <th scope="row" class="text-center th-color" rowspan="2">평가점수</th>
                    <th scope="row" class="text-center th-color" rowspan="2">평가등급</th>
                    <th scope="row" class="text-center th-color" rowspan="2">조정점수</th>
                    <th scope="row" class="text-center th-color" rowspan="2">최종점수</th>
                    <th scope="row" class="text-center th-color" rowspan="2">최종등급</th>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">가중치</th>
                    <th scope="row" class="text-center th-color">환산</th>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">가중치</th>
                    <th scope="row" class="text-center th-color">환산</th>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">가중치</th>
                    <th scope="row" class="text-center th-color">환산</th>
                </tr>
                </thead>
                <tbody id="evalList">
                </tbody>
            </table>
        </div>
    </div>
</div>


<script>
    evalResult.init();

    $(function (){
        fn_empList();
    });
    function fn_empList(){
        $.ajax({
            url : "/evaluation/getEvalResultEmpList",
            type : "post",
            data : {
                evalSn : $("#evalSn").val(),
                dept : $("#dept").val(),
                team : $("#team").val(),
                position : $("#position").val(),
                duty : $("#duty").val()
                /*searchText : $("#searchText").val(),
                searchDate : $("#searchDate").val()*/
            },
            dataType : "json",
            async : false,
            success : function(result){
                fn_addTbody(result.list);
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

    function fn_addTbody(list){
        $("#evalList").empty();
        var html = "";

        for(var i = 0 ; i < list.length ; i++) {
            html += '<tr>';
            html += '   <td></td>';
            html += '   <td>' + list[i].DEPT_NAME + '</td>';
            html += '   <td>' + list[i].DEPT_TEAM_NAME + '</td>';
            html += '   <td>' + list[i].EMP_NAME_KR + '</td>';
            html += '   <td>' + list[i].EVAL_SCORE + '</td>';
            html += '   <td>' + list[i].EVAL_F_SCORE + '</td>';
            html += '   <td>70</td>';
            html += '   <td>70</td>';
            html += '   <td>' + list[i].EVAL_S_SCORE + '</td>';
            html += '   <td>30</td>';
            html += '   <td>30</td>';
            html += '   <td>0</td>';
            html += '   <td>0</td>';
            html += '   <td>0</td>';
            html += '   <td>100</td>';
            html += '   <td>S</td>';
            html += '   <td>0</td>';
            html += '   <td>100</td>';
            html += '   <td>S</td>';
            html += '</tr>';
        }

        $('#evalList').append(html);
    }
</script>
</body>
</html>