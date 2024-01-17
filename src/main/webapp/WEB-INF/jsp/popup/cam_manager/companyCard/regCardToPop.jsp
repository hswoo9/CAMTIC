<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>


<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>


<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="cardToSn" value="${params.cardToSn}"/>
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="cardToTitle">
                    반출요청서
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 12px;">
            <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="fn_save()">등록</button>
<%--            <button type="button" class="k-button k-button-solid-primary" style="display:none" id="modBtn" onclick="fn_update()">수정</button>--%>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>반출자
                </th>
                <td>
                    <input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
                    <input type="text" id="empName" value="${loginVO.name}" disabled>
<%--                    <button type="button" class="k-button k-button-solid-base" onclick="userSearch()">검색</button>--%>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>카드선택
                </th>
                <td colspan="3">
                    <input type="hidden" id="trCd" style="" value="${params.trCd}">
                    <input type="text" id="trNm" disabled style="width: 70%" value="${params.trNm}">
                    <input type="hidden" id="cardBaNb" disabled style="width: 100%;" value="${params.baNb}">
                    <button type="button" class="k-button k-button-solid-base" onclick="fn_popRegDet(8, 0)">검색</button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>반출일시
                </th>
                <td>
                    <input type="text" id="cardToDe" value="" style="width: 48%;">
                    <input type="text" name="cardToTime" id="cardToTime" style="width: 48%">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>반납예정일시
                </th>
                <td>
                    <input type="text" id="cardFromDe" value="" style="width: 48%;">
                    <input type="text" name="cardFromTime" id="cardFromTime" style="width: 48%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>반출목적
                </th>
                <td colspan="3">
                    <input type="text" id="cardToPurpose" value="" style="width: 20%;">
                    <span id="cardToPurpose2Div" style="display: none;">
                        <input type="text" id="cardToPurpose2" style="width: 30%;" />
                    </span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>관련사업
                </th>
                <td colspan="3">
                    <input type="text" id="businessYn" style="width: 20%;" onchange="fn_businessChk()">
                    <span id="busWrap" style="display: none;">
                        <input type="text" id="pjtNm" value="" style="width: 70%;" disabled>
                        <input type="hidden" id="pjtSn" value="" />
                        <input type="hidden" id="pjtCd" value="" />
                        <button type="button" class="k-button k-button-solid-base" onclick="fn_projectPop()">검색</button>
                    </span>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    $(function(){
        customKendo.fn_textBox(["trNm", "pjtNm", "empName", "cardToPurpose2"]);
        customKendo.fn_datePicker("cardToDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("cardFromDe", "depth", "yyyy-MM-dd", new Date());

        $("#cardToTime, #cardFromTime").kendoTimePicker({
            format: "HH:mm",
            interval : 10,
            value : "09:00"
        });

        $("#cardToPurpose").kendoDropDownList({
            dataSource : [
                {text : "선택하세요", value : ""},
                {text : "출장", value : "출장"},
                {text : "구매", value : "구매"},
                {text : "회의", value : "회의"},
                {text : "영업", value : "영업"},
                {text : "식대(야간/휴일)", value : "식대(야간/휴일)"},
                {text : "기타", value : "기타"},
            ],
            dataTextField : "text",
            dataValueField : "value",
            change : function(e){
                console.log(this.value())
                if(this.value() == "기타"){
                    $("#cardToPurpose2Div").css("display", "");
                } else {
                    $("#cardToPurpose2Div").css("display", "none");
                }
            }
        });

        $("#businessYn").kendoDropDownList({
            dataSource : [
                {text : "선택하세요", value : ""},
                {text : "해당없음", value : "N"},
                {text : "사업선택", value : "Y"},
            ],
            dataTextField : "text",
            dataValueField : "value"
        });

        var data = {
            cardToSn : $("#cardToSn").val()
        }
        
        if($("#cardToSn").val() != ""){
            $.ajax({
                url : "/card/getCardToInfo",
                data : data,
                dataType : "json",
                success : function(rs){
                    var rs = rs.cardInfo;

                    $("#trCd").val(rs.TR_CD);
                    $("#trNm").val(rs.TR_NM);
                    $("#cardToDe").val(rs.CARD_TO_DE);
                    $("#empSeq").val(rs.USE_EMP_SEQ);
                    $("#empName").val(rs.USE_EMP_NAME);
                    $("#jiroNm").val(rs.JIRO_NM);
                    $("#baNb").val(rs.BA_NB);
                    $("#depositor").val(rs.DEPOSITOR);
                    $("#cardBaNb").val(rs.CARD_BA_NB);
                    $("#regEmpSeq").val(rs.REG_EMP_SEQ);

                    $("#cardToTitle").text("반출/사용 수정");

                    $("#saveBtn").css("display", "none");
                    $("#modBtn").css("display", "");
                }
            });
        }
    });

    function fn_businessChk() {
        if($("#businessYn").val() == "Y"){
            $("#busWrap").show();
        } else {
            $("#busWrap").hide();
        }
    }

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

    function fn_popRegDet(v, i){
        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    function fn_save(){
        var checkFlag = true;

        $.ajax({
            url : '/card/getCardUseCheck',
            type : 'POST',
            data: {cardBaNb : $("#cardBaNb").val()},
            dataType : "json",
            async : false,
            success: function(e) {
                var checkCnt = 0;

                checkCnt = e.checkCnt;

                if(checkCnt > 0){
                    alert("사용중인 카드입니다.");
                    fn_selCardInfo("", "", "", "", "", "", "", ""); // 카드정보 초기화
                    checkFlag = false;
                    return;
                }
            }
        });

        if(!checkFlag){return;}

        if(!confirm("저장하시겠습니까?")){
            return;
        }

        var parameters = {
            trCd : $("#trCd").val(),
            trNm: $("#trNm").val(),
            cardToDe: $("#cardToDe").val(),             // 반출날짜
            cardToTime: $("#cardToTime").val(),         // 반출시간
            cardFromDe: $("#cardFromDe").val(),           // 반납예정날짜
            cardFromTime: $("#cardFromTime").val(),   // 반납예정시간
            empSeq: $("#empSeq").val(),
            empName: $("#empName").val(),
            cardBaNb: $("#cardBaNb").val(),     // 카드번호
            cardToPurpose : $("#cardToPurpose").val(),  // 반출목적
            businessYn : $("#businessYn").val(),  // 관련사업유무
            pjtSn : $("#pjtSn").val(),
            pjtCd : $("#pjtCd").val(),
            pjtNm : $("#pjtNm").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if(parameters.trNm == ""){
            alert("카드를 선택해주세요.");
            return;
        }

        if(parameters.empName == ""){
            alert("신청자를 선택해주세요.");
            return;
        }

        if(parameters.cardToPurpose == ""){
            alert("반출목적을 선택해주세요.");
            return;
        }

        if(parameters.businessYn == ""){
            alert("관련사업을 선택해주세요.");
            return;
        }

        if(parameters.businessYn == "Y" && parameters.pjtCd == ""){
            alert("관련사업을 선택해주세요.");
            return;
        }

        if(parameters.cardToPurpose == "기타"){
            if($("#cardToPurpose2").val() == ""){
                alert("반출목적을 입력해주세요.");
                return;
            }
            parameters.cardToPurpose = $("#cardToPurpose2").val()
        }


        $.ajax({
            url : "/card/saveRegCardTo",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    opener.parent.statementList.mainGrid();
                    opener.parent.$("#mainHistGrid").css("display", "none");
                    window.close();
                }
            }
        });
    }

    function fn_update(){
        if(!confirm("수정하시겠습니까?")){
            return;
        }


        var parameters = {
            trCd : $("#trCd").val(),
            trNm: $("#trNm").val(),
            cardToDe: $("#cardToDe").val(),
            empSeq: $("#empSeq").val(),
            empName: $("#empName").val(),
            jiroNm: $("#jiroNm").val(),
            baNb: $("#baNb").val(),
            depositor: $("#depositor").val(),
            cardBaNb: $("#cardBaNb").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            cardToSn : $("#cardToSn").val()
        }

        if(parameters.trNm == ""){
            alert("카드를 선택해주세요.");
            return;
        }

        if(parameters.empName == ""){
            alert("신청자를 선택해주세요.");
            return;
        }

        $.ajax({
            url : "/card/updRegCardTo",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("수정되었습니다.");
                    opener.parent.statementList.mainGrid();
                    window.close();
                }
            }
        })
    }

    function fn_projectPop (){
        var url = "/project/pop/g20ProjectView.do?";

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

    function selectProject(sn, nm, cd, baseYear){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);
    }
</script>