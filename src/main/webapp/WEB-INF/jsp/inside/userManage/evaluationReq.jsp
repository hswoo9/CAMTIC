<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-ocean-blue.min.css" />
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationReq.js?v=${today}"/></script>
<% pageContext.setAttribute("CRLF", "\r\n"); %>
<% pageContext.setAttribute("LF", "\n"); %>

<style>
    .likeTab{display: flex; list-style: none; margin-top:30px; padding-left: 0;}
    .likeTab li{padding: 5px 18px; border-radius: 5px 5px 0 0; background-color: #6787b0; border: 1px solid #eee; font-weight: 600; cursor: pointer; font-size:13px; color: white; width: 125px; text-align: center;}
    .likeTab li:hover {background-color: #262b36;}
    .likeTab li.activeY {background-color: #262b36;}
    .k-input-md{font-size:12px;}
    .subTitSt{font-weight: 600; text-align: left; font-size: 13px; padding: 10px;}
    .table > thead > tr > th, .table > tfoot > tr > th{ background-color: #00397f96; color: white;}
    .table > thead > tr > td, .table > thead > tr > th{border: 1px solid #dee2e6;}
    #filePrint{float: right; margin-right: 25px;}

    .jb-text {
        padding: 15px 20px;
        background-color: #444444;
        border-radius: 5px;
        color: #ffffff;
        position: absolute;
        display: none;
        right: 34px;
        width: 200px;
    }

    .jb-title:hover + .jb-text {
        display: block;
    }
    .table > tbody > tr > td{
        border: 1px solid #eee;
    }

    .subTable{
        width: 100%;
        border: 1px solid #b1b5bd;
    }

    .subTable th{
        text-align:center;
        background-color: #d8dce3;
        border: 1px solid #b1b5bd;
    }

    .subTable td{
        background-color: #fff;
        border: 1px solid #b1b5bd;
    }

    .textBox{
        width: 70%;
    }

    #evalPeriod li{
        text-align: center;
        margin: 0 32px 0 0;
    }

</style>

<form name="evalForm0">
    <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}"/>
    <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}"/>
    <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}"/>
    <input type="hidden" id="evalStat" name="evalStat" value=""/>
    <input type="hidden" id="evalSn" name="evalSn" value=""/>
    <input type="hidden" id="bsYear" name="bsYear" value=""/>
</form>


<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">역량평가하기</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 성과관리 > 인사평가 > 역량평가하기</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div id="evalContent" style="display: flex; justify-content: center;">

            </div>

            <div style="margin: 40px 0; display: flex; justify-content: center;">
                <button id="eval" class="k-button k-button-md k-button-solid k-button-solid-error" style="margin: 10px; display: none;" onclick="evalPop()">역량평가 하기</button>
                <button id="evalResult" class="k-button k-button-md k-button-solid-info" style="margin: 10px;" onclick="evalResultPop()">인사평가 결과 조회</button>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    /*evaluationReq.fn_defaultScript();*/

    var bsYear;
    var evalSn;

    $.ajax({
        url : "/evaluation/getEvaluationOne",
        type : "post",
        data : { year : $("#SearchYear").val()},
        dataType : "json",
        async : false,
        success : function(result){
            $("#evalStat").val(result.data.EVAL_STAT);
            $("#bsYear").val(result.data.BS_YEAR);
            $("#evalSn").val(result.data.EVAL_SN);
            bsYear = result.data.BS_YEAR;
            evalSn = result.data.EVAL_SN;
            fn_addNotice(result.data);
        },
        error : function(e) {
            console.log(e);
        }
    });

    if($("#evalStat").val() == "I"){
        const nowEvalInfo = customKendo.fn_customAjax("/evaluation/getNowEvalCount", {
            evalSn : $("#evalSn").val(),
            regEmpSeq : $("#empSeq").val()
        });
        const nowEvalList = nowEvalInfo.list;

        let ck = false;
        if(nowEvalInfo != null && nowEvalList.length > 0){
            ck = true;
        }
        if(ck){
            $("#eval").css("display" , "");
        }
    }else if($("#evalStat").val() == "C"){
        $("#eval").css("display" , "none");
        $("#evalResult").css("display" , "");
    }else{
        $("#eval").css("display" , "none");
    }

    function  fn_addNotice(data){
        var html = "";
        html += data.EVAL_CONTENT ;
        $('#evalContent').append(html);
    }

    function evalPop(){
        let url = "/Inside/pop/evalPop.do";
        const option = "width=1000, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open("", "evalForm0", option);

        const myForm = document.evalForm0;
        myForm.action = url;
        myForm.target = "evalForm0";
        myForm.method = "post";
        myForm.submit();
    }

    function evalResultPopBak(){
        var url = "/evaluation/pop/evalResult.do?pk="+evalSn;
        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    function evalResultPop(){
        let url = "/Inside/pop/evalPop.do";
        const option = "width=1000, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open("", "evalForm0", option);

        const myForm = document.evalForm0;

        const param = document.createElement("input");
        param.setAttribute("name", "result");
        param.setAttribute("value", "Y");
        param.setAttribute("type", "hidden");
        myForm.appendChild(param);

        myForm.action = url;
        myForm.target = "evalForm0";
        myForm.method = "post";
        myForm.submit();
    }


</script>