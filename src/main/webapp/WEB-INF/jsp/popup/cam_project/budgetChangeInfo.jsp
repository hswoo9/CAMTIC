<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/budgetChangeInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>
    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
</style>

<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}">

<input type="hidden" id="searchKeyword" />
<input type="hidden" id="searchValue" />

<form id="changeDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="pjtChSn" name="pjtChSn" value="" />
    <input type="hidden" id="menuCd" name="menuCd" value="pjtChange">
    <input type="hidden" id="mgtCd" value="${data.PJT_CD}" />
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

<div id="budgetChangeDialog">
    <div id='my-spinner'>
        <div>
            <span>
                <img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
            </span>
        </div>
    </div>

    <span id="temp1" style="display: flex; justify-content: space-between;"></span>
    <span id="temp2"></span>
</div>

<script>
    budgetChangeInfo.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

    function budgetChangeOpenModal(){
        alert("1. 열람자 지정 필수(예산담당자) \n2. 기존에 없는 비목으로 변경이 필요한 경우 전자결재 내의 한글양식에서 수정하여 사용해주시기바랍니다.");

        $("#budgetChangeDialog").data("kendoWindow").open();
    }

    $("#budgetChangeDialog").kendoWindow({
        title : "변경 예산 선택",
        width: "700px",
        visible: false,
        modal: true,
        position : {
            top : 200,
            left : 400
        },
        open : function (){
            const accInfo = customKendo.fn_customAjax("/projectRnd/getAccountInfo", {pjtSn: $("#pjtSn").val()});
            const accList = accInfo.list;

            let arr = [];
            let firstValue = "";
            for(let i=0; i<accList.length; i++){
                let label = "";
                if(accList[i].IS_TYPE == "1"){
                    label = "국비";
                }else if(accList[i].IS_TYPE == "2"){
                    label = "도비";
                }else if(accList[i].IS_TYPE == "3"){
                    label = "시비";
                }else if(accList[i].IS_TYPE == "4"){
                    label = "자부담";
                }else if(accList[i].IS_TYPE == "5"){
                    label = "업체부담";
                }else if(accList[i].IS_TYPE == "9"){
                    label = "기타";
                }
                let data = {
                    label: label,
                    value: $("#mgtCd").val().slice(0, -1) + accList[i].IS_TYPE
                };
                arr.push(data);
                if(i == 0){
                    firstValue = $("#mgtCd").val().slice(0, -1) + accList[i].IS_TYPE;
                }
            }

            if(accList.length == 0){
                arr = [
                    {
                        label: "사업비",
                        value: $("#mgtCd").val()
                    }
                ];
                firstValue = $("#mgtCd").val();
            }

            let htmlStr = "";

            htmlStr +='<div>';

            for(let i=0; i<arr.length; i++){
                if(i == 0){
                    htmlStr += '<input type="radio" name="isType" value="'+firstValue+'" id="'+firstValue+'" checked="checked" onclick="accountChange();" />' +
                               '<label style="margin-right: 10px;" for="'+firstValue+'">'+arr[i].label+'</label>';
                } else {
                    htmlStr += '<input type="radio" name="isType" value="'+arr[i].value+'" id="'+arr[i].value+'" onclick="accountChange();"/>' +
                               '<label style="margin-right: 10px;" for="'+arr[i].value+'">'+arr[i].label+'</label>';
                }
            }

            htmlStr +='</div><div>' +
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="budgetChangeInfo.changeDrafting()">작성</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#budgetChangeDialog \').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>';

            $("#temp1").html(htmlStr);

            accountChange();
        },
        close: function () {
            $("#temp2").empty();
        }
    });

    function accountChange(){
        const date = new Date();
        let data = {
            stat: "project",
            gisu: "23",
            fromDate: $("#sbjStrDe").val().replace(/-/g, ""),
            toDate: $("#sbjEndDe").val().replace(/-/g, ""),
            mgtSeq: $("input[name='isType']:checked").val(),
            opt01: "3",
            opt02: "1",
            opt03: "2",
            temp: "2",
            baseDate: $("#sbjStrDe").val().split("-")[0] + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'),
            pjtSn: $("#pjtSn").val(),
        }

        $.ajax({
            url: "/g20/getSubjectList",
            data: data,
            type: "post",
            dataType: "json",
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success: function(rs) {
                $("#my-spinner").hide();

                if(rs.list.length == 0){
                    alert("생성된 예산이 없습니다."); return;
                }

                var htmlStr2 =
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
                for(let i=0; i<rs.list.length; i++){
                    const g20Map = rs.list[i];
                    console.log(g20Map);
                    if(g20Map.DIV_FG_NM == "장"){
                        largeText = g20Map.BGT_NM;
                    }
                    if(g20Map.DIV_FG_NM == "관"){
                        mediumText = g20Map.BGT_NM;
                    }
                    if(g20Map.DIV_FG_NM == "항"){
                        htmlStr2 +=
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
                htmlStr2 +=
                    '	</thead>' +
                    '</table>';

                $("#temp2").html(htmlStr2);
            },
        });
    }
</script>
</body>
</html>