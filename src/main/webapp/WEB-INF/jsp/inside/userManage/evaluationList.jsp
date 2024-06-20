<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationList.js?v=${today}"/></script>

<style>
    .pink{background-color: #eee0d9;font-weight: bold;text-align: center;}
    .yellow{background-color: #ffffdd;font-weight: bold;text-align: center;}
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">평가관리(관리자)</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 성과관리 > 인사평가 > 평가관리(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

       <%--<div class="panel-body">

            <div id="mainGrid" />
        </div>--%>


        <div class="panel-body">
            <div style="float: right; margin: 10px 5px;">
                <%--<input type="text" id="SearchYear" style="width: 110px;" onchange="getEvaluationList()">--%>
                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="evaluationList.fn_popEvaluationSet()">
                    <span class="k-button-text">평가등록</span>
                </button>
            </div>
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="7%">
                        <col width="5%">
                        <col width="7%">
                        <col width="7%">
                        <col width="15%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="7%">
                        <col width="15%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                    </colgroup>
                    <tr>
                        <th rowspan="3" class="text-center th-color">순번</th>
                        <th rowspan="3" class="text-center th-color">년도</th>
                        <th rowspan="3" class="text-center th-color">차수</th>
                        <th rowspan="3" class="text-center th-color">평가 인원</th>
                        <th colspan="12" class="text-center th-color">평가 결과</th>
                    </tr>
                    <tr>
                        <td colspan="6" class="pink">역량 평가</td>
                        <td colspan="6" class="yellow">업적 평가</td>
                    </tr>
                    <tr>
                        <td class="pink">평가 설정</td>
                        <td class="pink">역량 평가</td>
                        <td class="pink">S</td>
                        <td class="pink">A</td>
                        <td class="pink">B</td>
                        <td class="pink">C</td>
                        <td class="yellow">평가 설정</td>
                        <td class="yellow">업적 평가</td>
                        <td class="yellow">S</td>
                        <td class="yellow">A</td>
                        <td class="yellow">B</td>
                        <td class="yellow">C</td>
                    </tr>
                    <tbody id="evalList">
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    $(function (){

        $("#SearchYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        getEvaluationList();

    });


    function  getEvaluationList(){
        $.ajax({
            url : "/evaluation/getEvaluationList",
            type : "post",
            data : { year : $("#SearchYear").val()},
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result.list)
                fn_addEvalList(result.list);
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

    function fn_addEvalList(list){
        $('#evalList').empty();
        var html = "";

        if(list.length > 0){
            for(var i = 0; i < list.length; i++){
                html += "<tr style='text-align: center;'>";
                html += "     <td>" + (i+1) + "</td>";
                html += "     <td onclick='evalReqModify("+ list[i].EVAL_SN +")' style='cursor: pointer;'>" + list[i].BS_YEAR + "</td>";
                html += "     <td>" + list[i].EVAL_NUM + " 차</td>";
                html += "     <td>" + list[i].EVAL_MEM + " 명</td>";
                html += "     <td style='padding: 0px;'>";
                html += "         <button type='button' class='k-button k-button-solid-base' onclick='evalComModify("+ list[i].EVAL_SN +")' style='font-size: 11px;'>역량평가설정</button>";
                html += "     </td>";
                if(list[i].EVAL_STR_DT != null){
                    html += "     <td onclick='empList("+ list[i].EVAL_SN +")' style='cursor: pointer;'>" + list[i].EVAL_STR_DT + " ~ " + list[i].EVAL_END_DT + "</td>";
                }else{
                    html += "     <td onclick='empList("+ list[i].EVAL_SN +")' style='cursor: pointer;'>-</td>";
                }
                html += "     <td></td>";
                html += "     <td></td>";
                html += "     <td></td>";
                html += "     <td></td>";
                html += "     <td style='padding: 0px;'>";
                html += "         <button type='button' class='k-button k-button-solid-base' onclick='evalModify("+ list[i].EVAL_SN +")' style='font-size: 11px;'>업적평가설정</button>";
                html += "     </td>";
                html += "     <td>-</td>";
                html += "     <td>-</td>";
                html += "     <td>-</td>";
                html += "     <td>-</td>";
                html += "     <td>-</td>";
                html += '</tr>';
            }
        }else{
            html += '<tr style="text-align: center;">';
            html += "     <td colspan='14'>데이터가 없습니다.</td>";
            html += '</tr>';
        }

        $('#evalList').append(html);
    }
    function evalModify(pk){
        var url = "/evaluation/pop/evaluationSet.do?pk="+pk;

        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    function evalReqModify(pk){
        var url = "/evaluation/pop/evaluationReq.do?pk="+pk;

        var name = "_blank";
        var option = "width = 1400, height = 800, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
    function evalComModify(pk){
        var url = "/evaluation/pop/evaluationCom.do?pk="+pk;

        var name = "_blank";
        var option = "width = 1400, height = 800, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    function empList(pk) {
        var url = "/evaluation/pop/evalResultMng.do?pk="+pk;
        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    /*evaluationList.fn_defaultScript();*/

</script>
