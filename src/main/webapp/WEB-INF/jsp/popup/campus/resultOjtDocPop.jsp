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

<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="studyResultSn" value="${params.studyResultSn}" />
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
            <input type="button" id="apprBtn" style="margin-right:5px; display:none;" class="k-button k-button-solid-info" value="승인" onclick="fn_approval();"/>
            <input type="button" id="saveBtn" style="margin-right:5px;" class="k-button k-button-solid-info" value="승인요청" onclick="fn_save();"/>
            <input type="button" id="cancelBtn" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close();"/>
        </div>
    </div>
    <form id="ojtResultForm">
        <table class="popTable table table-bordered mb-0">
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
                <td id="ojtDtTd"></td>
            </tr>
            <tr>
                <th>지도장소</th>
                <td id="ojtLocationTd"></td>
            </tr>
            <tr style="display: none;">
                <th>학습목표</th>
                <td id="ojtObjectTd">a</td>
            </tr>
            <tr>
                <th>지도목적</th>
                <td id="ojtContentTd"></td>
            </tr>
            <tr>
                <th>소요비용</th>
                <td id="ojtAmtTd"></td>
            </tr>
            <tr>
                <th>비용내역</th>
                <td id="ojtAmtTextTd"></td>
            </tr>
            <tr>
                <th>결과보고일</th>
                <td id="regDateTd"></td>
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
        let ojtInfo = customKendo.fn_customAjax("/campus/getStudyInfoOne", {
            pk: $("#pk").val()
        }).data;

        console.log(ojtInfo);

        $("#ojtNameTd").text(ojtInfo.STUDY_NAME);
        $("#ojtDtTd").text(ojtInfo.START_DT+" ~ "+ojtInfo.END_DT);
        $("#ojtLocationTd").text(ojtInfo.STUDY_LOCATION);
        $("#ojtObjectTd").text(ojtInfo.STUDY_OBJECT);
        $("#ojtContentTd").text(ojtInfo.STUDY_CONTENT);
        $("#ojtAmtTd").text(fn_numberWithCommas(ojtInfo.STUDY_MONEY));
        $("#ojtAmtTextTd").text(ojtInfo.STUDY_MONEY_VAL);
        $("#regDateTd").text(ojtInfo.REG_DT);

        if($("#resultMode").val() == "mng"){
            $("#saveBtn").css("display", "none");
            if(ojtInfo.ADD_STATUS == "C"){
                $("#apprBtn").css("display", "");
            }
        } else {
            if(ojtInfo.ADD_STATUS == "S"){
                $("#saveBtn").css("display", "none");
            }
        }
    });

    function fn_save (){
        var data = {
            studyInfoSn : $("#pk").val()
        }

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
</script>
</body>
