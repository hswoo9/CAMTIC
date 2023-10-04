<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_project/commonProject.js?v=${today}"/></script>
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="devSchSn" value="${params.devSchSn}" />


<form name="g20Form">
    <input type="hidden" name="atTrName" id="atTrName" value="" />
    <input type="hidden" name="bankNumber" id="bankNumber" value="" />
    <input type="hidden" name="isBusinessLink" id="isBusinessLink" value="" />
    <input type="hidden" name="pjtDeptName" id="pjtDeptName" value="" />
    <input type="hidden" name="pjtName" id="pjtName" value="" />
    <input type="hidden" name="pjtSeq" id="pjtSeq" value="" />
    <input type="hidden" name="progFg" id="progFg" value="" />
    <input type="hidden" name="trSeq" id="trSeq" value="" />
    <input type="hidden" name="uid" id="uid" value="" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">예산 등록</span>
            </h3>
            <button type="button" id="saveBtn" style="float: right; top:5px" class="k-button k-button-solid-base" onclick="save()">저장</button>
        </div>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>프로젝트
                </th>
                <td colspan="3">
                    <input type="text" disabled id="g20Proejct" style="width: 40%; text-align: left" />
                    <button type="button" class="k-button k-button-solid-base" onclick="fn_getProject()">조회</button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>예산과목
                </th>
                <td colspan="3">
                    <input type="text" disabled id="g20Subject" style="width: 40%; text-align: left" />
                    <button type="button" class="k-button k-button-solid-base" onclick="fn_getSubject()">조회</button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>계정과목명
                </th>
                <td colspan="3">
                    <input type="text" id="devSchCd" style="width: 40%; text-align: left">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>계정코드
                </th>
                <td colspan="3">
                    <textarea type="text" id="devSchCont" style="width: 100%; text-align: left"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>예산액
                </th>
                <td colspan="3">
                    <input type="text" id="devSchCont222" style="width: 100%; text-align: left">
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
<script type="text/javascript">

    $(function (){
        customKendo.fn_textBox(["devSchTitle", "devSchCont222"]);
        customKendo.fn_datePicker("schEndDe", "month", "yyyy-MM-dd", new Date());

        $("#devSchCont").kendoTextArea({
            rows: 5
        })

        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var schDs = customKendo.fn_customAjax("/projectRnd/getRndDevScheduleList", data);
        customKendo.fn_dropDownList("devSchCd", schDs.list, "DEV_SCH_NM", "DEV_SCH_CD");

    });

    function save(){
        if(!confirm("저장하시겠습니까?")){
            return;
        }

    }



</script>
</body>
</html>