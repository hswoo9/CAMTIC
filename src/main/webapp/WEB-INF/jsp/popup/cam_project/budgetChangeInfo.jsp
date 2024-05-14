<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/budgetChangeInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}">

<input type="hidden" id="searchKeyword" />
<input type="hidden" id="searchValue" />

<form id="changeDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="pjtChange">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="list" name="list" />
</form>

<div style="padding: 10px">
    <div class="table-responsive">
        <input type="hidden" id="budgetChangeEmpSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="budgetChangeDeptSeq" value="${loginVO.orgnztId}">

        <div id="budgetChangeMainGrid" style="margin-top: 20px"></div>
    </div>
</div>

<script>
    budgetChangeInfo.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

    function budgetChangeOpenModal(){
        alert("열람자 지정 필수(예산담당자)");

        $("#dialog").data("kendoWindow").open();
    }

    $("#dialog").kendoWindow({
        title : "변경 예산 선택",
        width: "700px",
        visible: false,
        modal: true,
        position : {
            top : 200,
            left : 400
        },
        open : function (){
            const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#pjtSn").val()});
            const map = pjtInfo.rs;

            const date = new Date();
            const year = date.getFullYear().toString().substring(2,4);
            let data = {
                stat: "project",
                gisu: "23",
                fromDate: $("#sbjStrDe").val().replace(/-/g, ""),
                toDate: $("#sbjEndDe").val().replace(/-/g, ""),
                mgtSeq: map.PJT_CD,
                opt01: "3",
                opt02: "1",
                opt03: "2",
                temp: "2",
                baseDate: $("#sbjStrDe").val().split("-")[0] + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'),
                pjtSn: $("#pjtSn").val(),
            }
            const g20 = customKendo.fn_customAjax("/g20/getSubjectList", data);

            if(g20.list.length == 0){
                alert("생성된 예산이 없습니다."); return;
            }

            var htmlStr =
                '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="budgetChangeInfo.changeDrafting()">작성</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#dialog \').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="5%">' +
                '		<col width="20%">' +
                '		<col width="20%">' +
                '		<col width="20%">' +
                '		<col width="20%">' +
                '	</colgroup>' +
                '	<thead>';

            let largeText = "";
            let mediumText = "";
            for(let i=0; i<g20.list.length; i++){
                const g20Map = g20.list[i];
                console.log(g20Map);
                if(g20Map.DIV_FG_NM == "장"){
                    largeText = g20Map.BGT_NM;
                }
                if(g20Map.DIV_FG_NM == "관"){
                    mediumText = g20Map.BGT_NM;
                }
                if(g20Map.DIV_FG_NM == "항"){
                    htmlStr +=
                        '		<tr>' +
                        '			<td>' +
                        '               <input type="checkbox" class="bgtCd" name="bgtCd" value="'+g20Map.BGT_CD+'" />' +
                        '			</td>' +
                        '			<td>' +largeText+'			</td>' +
                        '			<td>' +mediumText+'			</td>' +
                        '			<td>' +g20Map.BGT_NM+'			</td>' +
                        '			<td>' +fn_numberWithCommas(g20Map.CALC_AM)+'			</td>' +
                        '		</tr>';
                }
            }
            htmlStr +=
                '	</thead>' +
                '</table>';

            $("#dialog").html(htmlStr);
        },
        close: function () {
            $("#dialog").empty();
        }
    });
</script>
</body>
</html>