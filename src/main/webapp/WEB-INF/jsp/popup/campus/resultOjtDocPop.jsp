<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/study/studyJournalPop.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/study/studyViewPop.js?v=${today}"></script>
<style>
    input {
        border: 1px solid #bbb;
        line-height: 25px;
        border-radius: 3px;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="ojtOjtResultSn" value="${params.ojtOjtResultSn}" />
<%--<input type="hidden" id="studyResultSn" value="${params.studyResultSn}" />--%>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="resultMode" value="${params.mode}" />


<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="">
                    OJT 결과보고서
                </span>
        </h3>
        <div class="btn-st popButton">
            <input type="button" id="modifyBtn" style=" margin-right:5px;" class="k-button k-button-solid-primary" value="수정" onclick="saveBtn();"/>
            <input type="button" id="savesBtn" style=" margin-right:5px;" class="k-button k-button-solid-info" value="저장" onclick="saveBtn();"/>
            <input type="button" id="apprBtn" style="margin-right:5px; display:none;" class="k-button k-button-solid-info" value="승인" onclick="fn_approval();"/>
            <input type="button" id="saveBtn" style="margin-right:5px;" class="k-button k-button-solid-info" value="승인요청" onclick="fn_save();"/>
            <input type="button" id="cancelBtn" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close();"/>
        </div>
        <%--<div class="btn-st popButton">
            <input type="button" id="apprBtn" style="margin-right:5px; display:none;" class="k-button k-button-solid-info" value="승인" onclick="fn_approval();"/>
            <input type="button" id="saveBtn" style="margin-right:5px;" class="k-button k-button-solid-info" value="저장" onclick="fn_saveing();"/>
            <input type="button" id="modBtn" style="margin-right:5px; display:none;" class="k-button k-button-solid-primary" value="수정" onclick="fn_saveing();"/>
            <input type="button" id="approvalBtn" style="margin-right:5px; display:none;" class="k-button k-button-solid-info" value="승인요청" onclick="fn_save();"/>
            <input type="button" id="cancelBtn" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close();"/>
        </div>--%>
    </div>
    <form id="ojtResultForm">
        <table class="table table-bordered mt20">
            <colgroup>
                <col width="20%">
                <col width="80%">
            </colgroup>
            <thead>
            <tr>
                <th>지도명칭</th>
                <td id="ojtNameTd"></td>
            </tr>
            <tr>
                <th>지도기간</th>
                <td>
                    <input type="text" id="START_DT" style="width: 150px"> ~ <input type="text" id="END_DT" style="width: 150px">
                </td>
            </tr>
            <tr>
                <th>지도장소</th>
                <td >
                    <input type="text" id="ojtLocationTd" style="width: 400px">
                </td>
            </tr>
            <tr style="display: none;">
                <th>학습목표</th>
                <td id="ojtObjectTd">a</td>
            </tr>
            <tr>
                <th>지도목적</th>
                <td >
                    <input type="text" id="ojtContentTd" style="width: 400px">
                </td>
            </tr>
            <tr>
                <th>소요비용</th>
                <td>
                    <input type="text" id="ojtAmtTd" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 150px; text-align: right" value="0"> 원
                </td>
            </tr>
            <tr>
                <th>비용내역</th>
                <td >
                    <input type="text" id="ojtAmtTextTd" style="width: 400px">
                </td>
            </tr>
            <tr>
                <th>결과보고일</th>
                <td>
                    <input type="text" id="regDateTd" style="width: 150px">
                </td>
            </tr>

            </thead>
        </table>
    </form>
</div>

<div class="table-responsive" id="main2" style="display: none;">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="">
                    학습자
                </span>
        </h3>
        <div class="btn-st popButton">

        </div>
    </div>
    <form id="studyReqForm">
        <table class="table table-bordered mt20" id="studyUserTable">
        </table>
    </form>
</div>

<script>
    $(function (){

        customKendo.fn_datePicker("START_DT", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("END_DT", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("regDateTd", "month", "yyyy-MM-dd", new Date());

        let ojtInfo = customKendo.fn_customAjax("/campus/getStudyInfoOne", {
            pk: $("#pk").val()
        }).data;
        $("#ojtNameTd").text(ojtInfo.STUDY_NAME);

        let ojtResultInfo = customKendo.fn_customAjax("/campus/getOjtResultInfoOne", {
            pk: $("#pk").val()
        }).data;

        if($("#resultMode").val() == "modify" || $("#resultMode").val() == "mng"){
                $("#START_DT").val(ojtResultInfo.START_DT);
                $("#END_DT").val(ojtResultInfo.END_DT);
                $("#ojtLocationTd").val(ojtResultInfo.STUDY_LOCATION);
                $("#ojtObjectTd").val(ojtResultInfo.STUDY_OBJECT);
                $("#ojtContentTd").val(ojtResultInfo.STUDY_CONTENT);
                $("#ojtAmtTd").val(fn_numberWithCommas(ojtResultInfo.STUDY_MONEY));
                $("#ojtAmtTextTd").val(ojtResultInfo.STUDY_MONEY_VAL);
                $("#regDateTd").val(ojtResultInfo.REG_DT);
                $("#savesBtn").hide();
        }else if($("#resultMode").val() == "upd"){
            $("#START_DT").val(ojtInfo.START_DT);
            $("#END_DT").val(ojtInfo.END_DT);
            $("#ojtLocationTd").val(ojtInfo.STUDY_LOCATION);
            $("#ojtObjectTd").val(ojtInfo.STUDY_OBJECT);
            $("#ojtContentTd").val(ojtInfo.STUDY_CONTENT);
            $("#ojtAmtTd").val(fn_numberWithCommas(ojtInfo.STUDY_MONEY));
            $("#ojtAmtTextTd").val(ojtInfo.STUDY_MONEY_VAL);
            $("#regDateTd").val(ojtInfo.REG_DT);
            $("#modifyBtn").hide();
        }

        if($("#resultMode").val() == "mng"){
            $("#savesBtn").hide();
            $("#modifyBtn").hide();
            $("#START_DT, #END_DT, #END_DT, #ojtLocationTd, #ojtContentTd, #ojtAmtTd, #ojtAmtTextTd, #regDateTd").attr("readonly", true);
        }

        if(ojtInfo.ADD_STATUS == "C" || ojtInfo.ADD_STATUS == "S"){
            $("#saveBtn").hide();
            $("#savesBtn").hide();
            $("#modifyBtn").hide();
        }

        if($("#resultMode").val() == "mng"){
            $("#saveBtn").css("display", "none");
            if(ojtInfo.ADD_STATUS == "C"){
                $("#apprBtn").css("display", "");
            }
        } else {
            if(ojtInfo.ADD_STATUS == "S"){
                $("#saveBtn").css("display", "none");
                $("#apprBtn").css("display", "none");
            }
        }
    });

    function fn_save (){
        var data = {
            studyInfoSn : $("#pk").val(),
        }
        $.ajax({
            url : "/campus/getOjtOjtResultCount",
            data: data,
            type :"post",
            dataType :"json",
            success : function (result){
                if(result.data.ojtResultCount == 1){
                    $.ajax({
                        url : "/campus/setStudyResultComplete",
                        data: data,
                        type :"post",
                        dataType :"json",
                        success : function (rs){
                            if(rs.code == 200){
                                alert("승인 요청되었습니다.");
                                window.close();
                            }
                        }
                    })
                 }else{
                    alert('결과보고서를 저장해주세요.');
                    return;
                }
            }
        })





       /* $.ajax({
            url : "/campus/setStudyResultComplete",
            data: data,
            type :"post",
            dataType :"json",
            success : function (rs){
                if(rs.code == 200){
                    alert("승인 요청되었습니다.");
                    window.close();
                }
            }
        })*/
    }

    function fn_approval(){
        var data = {
            studyInfoSn : $("#pk").val()
        }

        $.ajax({
            url : "/campus/setStudyResultSc",
            data: data,
            type :"post",
            dataType :"json",
            success : function (rs){
                if(rs.code == 200){
                    alert("승인 완료되었습니다.");
                    window.close();
                }
            }
        })
    }
    function saveBtn(){
        let ojtResultSn = $("#ojtOjtResultSn").val();
        let studyInfoSn = $("#pk").val();
        let START_DT = $("#START_DT").val();
        let END_DT = $("#END_DT").val();
        let ojtLocationTd = $("#ojtLocationTd").val();
        let ojtObjectTd = $("#ojtObjectTd").val();
        let ojtContentTd = $("#ojtContentTd").val();
        let ojtAmtTd = $("#ojtAmtTd").val();
        let ojtAmtTextTd = $("#ojtAmtTextTd").val();
        let regDateTd = $("#regDateTd").val();

        let data = {
            ojtResultSn: ojtResultSn,
            studyInfoSn: studyInfoSn,
            START_DT: START_DT,
            END_DT : END_DT,
            ojtLocationTd : ojtLocationTd,
            ojtObjectTd: ojtObjectTd,
            ojtContentTd: ojtContentTd,
            ojtAmtTd: ojtAmtTd,
            ojtAmtTextTd: ojtAmtTextTd,
            regDateTd: regDateTd
        }

        if($("#resultMode").val() == "modify") {
            /*수정*/
            $.ajax({
                url: "/campus/setOjtOjtResultModify",
                data: data,
                type: "post",
                dataType: "json",
                success: function (result) {
                    alert("수정되었습니다.");
                    opener.location.reload();
                }
            })
        }else{
            /*저장*/
            $.ajax({
                url: "/campus/setOjtOjtResultInsert",
                data: data,
                type: "post",
                dataType: "json",
                success: function (result) {
                        alert("저장되었습니다.");
                        opener.location.reload();
                    }
            })
        }

    }
</script>
</body>
