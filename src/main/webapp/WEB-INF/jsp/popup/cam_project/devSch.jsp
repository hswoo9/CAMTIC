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
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">과제일정 등록</span>
            </h3>
            <button type="button" id="saveBtn" style="float: right; top:5px" class="k-button k-button-solid-base" onclick="save()">추가</button>
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
                    <span class="red-star"></span>코드번호
                </th>
                <td colspan="3">
                    <input type="text" id="devSchCd" style="width: 40%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>비고
                </th>
                <td colspan="3">
                    <input type="text" id="devSchEtc" style="width: 90%; text-align: left">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>예정일
                </th>
                <td colspan="3">
                    <input type="text" id="schStrDe" style="width: 25%; text-align: left">
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
<script type="text/javascript">

    $(function (){
        customKendo.fn_textBox([ "devSchNm", "devSchEtc"]);
        customKendo.fn_datePicker("schStrDe", "month", "yyyy-MM-dd", new Date());

        var data = {

        }
        data.grpSn = "PJT_SCH";
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", data);
        customKendo.fn_dropDownList("devSchCd", lgCodeDs.rs, "LG_CD_NM", "LG_CD");
    });

    function save(){
        if(!confirm("추가하시겠습니까?")){
            return;
        }
        var data = {
            pjtSn : $("#pjtSn").val(),
            devSchNm : $("#devSchNm").val(),
            devSchEtc : $("#devSchEtc").val(),
            schStrDe : $("#schStrDe").val(),
            devSchCd : $("#devSchCd").val(),
            devSchNm : $("#devSchCd").data("kendoDropDownList").text(),
            empSeq : $("#empSeq").val()
        }

        console.log(data);
        $.ajax({
            url : "/projectRnd/setDevSchData",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    opener.parent.rndDS.gridReload();

                    window.close();
                }
            }
        })

    }
</script>
</body>
</html>