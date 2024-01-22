<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/system/code/commonBudgetCode.js?v=${today}"/></script>
<style>
    .k-prompt-container, .k-window-content {
        overflow : hidden !important;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <input type="hidden" id="budgetVal" value="A" />
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">예산코드관리</h4>
            <div class="title-road">시스템관리 > 코드관리 &gt; 예산코드관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div style="text-align:right;padding-left : 20px; padding-right: 20px;">
            <button type="button" class="k-button k-button-solid-base" id="btnA" onclick="fn_setBtn('A')" style="background-color: #9b9b9b !important; color: white !important;">지출</button>
            <button type="button" class="k-button k-button-solid-base" id="btnB" onclick="fn_setBtn('B')">수입</button>
        </div>
        <div class="panel-body">
            <div>
                <div class="col-md-4 col-lg-4">
                    장 코드
                    <div id="jangGrid" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    관 코드
                    <div id="gwanGrid" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    항 코드
                    <div id="hangGrid" style="margin:10px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    commBgCode.fn_defaultScript();


    function fn_setBtn(t){
        if(t == 'A'){
            $("#btnA").attr("style", "background-color : #9b9b9b !important; color : white !important");

            $("#btnB").attr("style", "background-color : #E4EBF3 !important; color : #2e2e2e !important");
        } else {
            $("#btnA").attr("style", "background-color : #E4EBF3 !important; color : #2e2e2e !important");

            $("#btnB").attr("style", "background-color : #9b9b9b !important; color : white !important");
        }

        $("#budgetVal").val(t);

        commBgCode.mainGrid();
    }
</script>
</body>
</html>