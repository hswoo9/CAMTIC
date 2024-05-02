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
<input type="hidden" id="bsYear" value="${params.bsYear}"/>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="duty" value="${empData.DUTY_CODE}"/>
<input type="hidden" id="occupation" value="${empData.OCCUPATION_NM}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">역량평가</h3>
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
            data : {
                evalSn : $("#evalSn").val(),
                empSeq : $("#empSeq").val(),
                duty : $("#duty").val(),
                occupation : $("#occupation").val(),
                deptSeq : $("#deptSeq").val(),
                bsYear : $("#bsYear").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                fn_addTbody(result.list);
                if(result.self.self > 0){
                    $("#self").css("display" , "")
                }
                if(result.first.count > 0){
                    $("#first").css("display" , "")
                    $("#countF").text(" ("+result.first.count + " 명)")
                }
                if(result.second.count > 0){
                    $("#second").css("display" , "")
                    $("#countS").text(" ("+result.second.count + " 명)")
                }

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
        html += '   <td><button id="self" class="k-button" style="background-color: #dcdcdc; border: none; display: none;" onclick="fn_open_eval(0)">본인 평가</button></td>';
        html += '   <td><button id="first" class="k-button" style="background-color: #dcdcdc; border: none; display: none;" onclick="fn_open_eval(1)">1차 평가</button><span id="countF"></span></td>';
        html += '   <td><button id="second" class="k-button" style="background-color: #dcdcdc; border: none; display: none;" onclick="fn_open_eval(2)">2차 평가</button><span id="countS"></span></td>';
        html += '   <td></td>';
        html += '</tr>';

        $('#evalList').append(html);
    }

    function fn_open_eval(key) {
        if(key === 1 || key === 2){
            var url = "/evaluation/pop/evaluationEmpListPop.do?pk="+$("#evalSn").val()+"&empSeq="+$("#empSeq").val()+"&bsYear="+$("#bsYear").val()+"&key="+key;
            var name = "_blank";
            var option = "width=965, height=600, scrollbars=no, top=300, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        }else{
            var url = "/evaluation/pop/evaluationPop.do?pk="+$("#evalSn").val()+"&bsYear="+$("#bsYear").val()+"&empSeq="+$("#empSeq").val()+"&bsYear="+$("#bsYear").val()+"&key="+key;
            var name = "_blank";
            var option = "width = 1700, height = 820, top = 200, left = 600, location = no";
            var popup = window.open(url, name, option);
        }
    }
</script>
</body>
</html>