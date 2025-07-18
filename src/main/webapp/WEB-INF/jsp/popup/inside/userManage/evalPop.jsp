<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<body class="font-opensans" style="background-color:#fff;">

<form name="evalForm">
    <input type="hidden" id="evalSn" name="pk" value="${params.evalSn}"/>
    <input type="hidden" id="key" name="key" value=""/>
    <input type="hidden" id="bsYear" name="bsYear" value="${params.bsYear}"/>
    <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}"/>
    <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}"/>
    <input type="hidden" id="duty" name="duty" value="${empData.DUTY_CODE}"/>
    <input type="hidden" id="occupation" name="occupation" value="${empData.OCCUPATION_NM}"/>
    <input type="hidden" id="targetEmpSeq" name="targetEmpSeq" value="${loginVO.uniqId}"/>
    <input type="hidden" id="result" name="result" value="${params.result}"/>
</form>

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
                key : $("#empSeq").val(),
                bsYear : $("#bsYear").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                console.log("result", result);
                fn_addTbody(result);
                if(result.self.self > 0){
                    $("#self").css("display" , "")
                }
                if(result.first.count > 0){
                    $("#first").css("display" , "")
                    $("#countF").text(" ("+result.first.count + "명)")
                }
                if(result.second.count > 0){
                    $("#second").css("display" , "")
                    $("#countS").text(" ("+result.second.count + "명)")
                }

            },
            error : function(e) {
                console.log(e);
            }
        });
    });

    function fn_addTbody(result){
        console.log("result", result);
        const list = result.list;
        var html = "";
        html += '<tr>';
        html += '   <td>'+ list.EVAL_NUM +' 차</td>';
        html += '   <td>'+ list.EVAL_STR_DT +' ~ ' + list.EVAL_END_DT +'</td>';

        if(result.self.self != "0"){
            var result = customKendo.fn_customAjax("/evaluation/getEvaluationScoreList", {
                evalSn : $("#evalSn").val(),
                empSeq : $("#empSeq").val(),
                rType : "eval"
            });
            console.log("fn_addTbody result", result);

            if(result.data.EVAL == "N"){
                html += '   <td><button id="self" class="k-button k-button-solid-base" style="display: none;" onclick="fn_open_eval(0)">평가하기</button></td>';
            }else{
                html += '   <td><button id="self" class="k-button k-button-solid-info" style="display: none;" onclick="fn_open_eval(0)">제출완료</button></td>';
            }
        }else{
            html += '<td>-</td>';
        }

        if($("#result").val() == "Y"){
            html += '   <td><button id="first" class="k-button k-button-solid-info" style="display: none;" onclick="fn_open_eval(1)">제출완료</button><span id="countF"></span></td>';
            html += '   <td><button id="second" class="k-button k-button-solid-info" style="display: none;" onclick="fn_open_eval(2)">제출완료</button><span id="countS"></span></td>';
        }else{
            html += '   <td><button id="first" class="k-button k-button-solid-base" style="display: none;" onclick="fn_open_eval(1)">평가하기</button><span id="countF"></span></td>';
            html += '   <td><button id="second" class="k-button k-button-solid-base" style="display: none;" onclick="fn_open_eval(2)">평가하기</button><span id="countS"></span></td>';
        }
        html += '   <td></td>';
        html += '</tr>';

        $('#evalList').append(html);
    }

    function fn_open_eval(key){
        $("#key").val(key);
        let url;
        if (key == 1 || key == 2) {
            url = "/evaluation/pop/evaluationEmpListPop.do";
        } else {
            url = "/evaluation/pop/evaluationPop.do";
        }
        const option = "width=1400, height=820, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open("", "evalForm", option);

        const myForm = document.evalForm;
        myForm.action = url;
        myForm.target = "evalForm";
        myForm.method = "post";
        myForm.submit();
    }
</script>
</body>
</html>