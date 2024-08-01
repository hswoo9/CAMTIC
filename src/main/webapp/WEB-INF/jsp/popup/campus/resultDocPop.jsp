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

<form id="studyDraftFrm" method="post">
    <input type="hidden" id="studyResultSn" name="studyResultSn" value="${params.studyResultSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="studyRes">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>

<input type="hidden" id="resultMode" value="${params.mode}" />

<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="">
                    학습조 결과보고서
                </span>
        </h3>
        <div id="studyBtn" class="btn-st popButton">

        </div>
    </div>
    <form id="studyJournalForm">
        <table class="table table-bordered mt20" id="studyJournalTable">
            <colgroup>
                <col width="260px">
                <col width="740px">
            </colgroup>
            <thead>
            <tr>
                <th>학습조명</th>
                <td id="studyNameTd">${data.STUDY_NAME}</td>
            </tr>
            <tr>
                <th>학습일시</th>
                <td>
                    <input type="text" id="journalDt" style="width: 20%"> <input type="text" id="journalStartTime" style="width: 15%"> ~ <input type="text" id="journalEndTime" style="width: 15%">
                </td>
            </tr>
            <tr>
                <th>학습장소</th>
                <td>
                    <input type="text" id="studyLocation" style="width: 400px">
                </td>
            </tr>
            <tr>
                <th>참 여 자</th>
                <td>
                    <input type="text" id="studyUserName" style="width: 400px">
                    <input type="hidden" id="studyUserSeq">
                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="selMemBtn" value="학습자 선택" onclick="fn_setSubjectMember('${params.pk}')"/>
                </td>
            </tr>
            <tr>
                <th>중요내용</th>
                <td>
                    <textarea type="text" id="studyContent" style="width: 400px; height: 100px"></textarea>
                </td>
            </tr>
            <tr>
                <th>소요비용</th>
                <td>
                    <input type="text" id="studyMoney" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 150px; text-align: right" value="0"> 원 <input type="text" id="journalAmtClass" style="width: 150px; display: none;">
                </td>
            </tr>
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
        if($("#resultMode").val() == "mng"){
            $("#journalDt").prop("disabled", true);
            $("#journalStartTime").prop("disabled", true);
            $("#journalEndTime").prop("disabled", true);
            $("#studyLocation").prop("disabled", true);
            $("#studyUserName").prop("disabled", true);
            $("#selMemBtn").prop("disabled", true);
            $("#studyContent").prop("disabled", true);
            $("#studyMoney").prop("disabled", true);
            $(".k-datepicker button").prop("disabled", true);
            $(".k-timepicker button").prop("disabled", true);
        }
    });

    studyJournal.init();
    $("#journalAmtClass").data("kendoDropDownList").value(1);
    $("#journalAmtClass").data("kendoDropDownList").wrapper.hide();

    function fn_setSubjectMember(pk){
        var url = "/campus/pop/popSubjectMember.do?studyInfoSn=" + pk;

        var name = "inEvalRegPop";
        var option = "width=800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }

    let buttonHtml = "";
    buttonHtml += '<input type="button" id="saveBtn" style="margin-right:5px;" class="k-button k-button-solid-info" value="저장" onclick="fn_saveing();"/>';
    buttonHtml += "<input type=\"button\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" value=\"결과보고서\" id=\"compBtn\" onclick=\"propagView.fn_resultDocPop();\"/>";

    const studyResult = customKendo.fn_customAjax("/campus/getStudyResultData", {studyResultSn: $("#studyResultSn").val()});
    const studyInfo = studyResult.data;
    if(studyInfo != null){
        let status = studyInfo.STATUS;
        if(status == "0" || status == null){
            buttonHtml += '<input type="button" id="modBtn" style="margin-right:5px; display:none;" class="k-button k-button-solid-primary" value="수정" onclick="fn_saveing();"/>';
            buttonHtml += "<button type=\"button\" id=\"approvalBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"fn_save()\">상신</button>";
        }else if(status == "10" || status == "20" || status == "50"){
            buttonHtml += "<button type=\"button\" id=\"approvalBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
            buttonHtml += "<button type=\"button\" id=\"apprBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', '"+studyInfo.DOC_MENU_CD+"');\">결재</button>";
        }else if(status == "30" || status == "40"){
            buttonHtml += '<input type="button" id="modBtn" style="margin-right:5px; display:none;" class="k-button k-button-solid-primary" value="수정" onclick="fn_saveing();"/>';
            buttonHtml += "<button type=\"button\" id=\"approvalBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"tempOrReDraftingPop('"+studyInfo.DOC_ID+"', '"+studyInfo.DOC_MENU_CD+"', '"+studyInfo.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
        }else if(status == "100"){
            buttonHtml += "<button type=\"button\" id=\"approvalBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', '"+studyInfo.DOC_MENU_CD+"');\">열람</button>";
        }else if(status == "111"){
            buttonHtml += "<button type=\"button\" id=\"approvalBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+studyInfo.DOC_ID+"', '"+studyInfo.DOC_MENU_CD+"', '"+studyInfo.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
        }
    }
    buttonHtml += "<input type=\"button\" id=\"cancelBtn\" class=\"k-button k-button-solid-error\" value=\"닫기\" onclick=\"window.close();\"/>";

    $("#studyBtn").html(buttonHtml);
    if($("#resultMode").val() == "mng"){

    }

    if($("#resultMode").val() == "mng"){
        $("#apprBtn").css("display", "");

        var studyParam ={
            pk : $("#pk").val()
        }
        var rs = customKendo.fn_customAjax("/campus/getStudyInfoOne", studyParam);
        console.log(rs);
        if(rs.data.ADD_STATUS == "S"){
            $("#apprBtn").css("display", "none");
        }
    }

    if($("#studyResultSn").val() != ""){
        $.ajax({
            url : "/campus/getStudyResultData",
            data : {
                studyResultSn : $("#studyResultSn").val()
            },
            type: "post",
            dataType : "json",
            success :function(rs){
                $("#journalDt").val(rs.data.STUDY_RESULT_DT);
                $("#journalDt").val(rs.data.STUDY_RESULT_DT);
                $("#journalStartTime").val(rs.data.STUDY_RESULT_START_TIME);
                $("#journalEndTime").val(rs.data.STUDY_RESULT_END_TIME);
                $("#studyLocation").val(rs.data.STUDY_RESULT_LOCATE);
                $("#studyUserName").val(rs.data.STUDY_EMP_NAME);
                $("#studyUserSeq").val(rs.data.STUDY_EMP_SEQ);
                $("#studyContent").val(rs.data.STUDY_RESULT_CONTENT);
                $("#studyMoney").val(comma(rs.data.STUDY_RESULT_AMT));
            }
        });

        $("#main2").css("display", "");

        $("#saveBtn").css("display", "none");

        if($("#resultMode").val() == "upd") {
            $("#approvalBtn").css("display", "");
            $("#modBtn").css("display", "");
        }
        studyUserSetting();

        if($("#resultMode").val() == "upd"){
            var studyParam ={
                pk : $("#pk").val()
            }
            var rs = customKendo.fn_customAjax("/campus/getStudyInfoOne", studyParam);
            console.log(rs);
            if(rs.data.ADD_STATUS == "C"){
                $("#approvalBtn").css("display", "none");
                $("#modBtn").css("display", "none");

                $("input[type='text']").prop("disabled", true);
                $("#selMemBtn").prop("disabled", true);
                $("textarea").prop("disabled", true);
                $("button").prop("disabled", true);
            }
        }

    } else {
        $.ajax({
            url : "/campus/getStudyJournalList",
            data : {
                studyInfoSn : $("#pk").val()
            },
            type: "post",
            dataType : "json",
            success :function(rs){
                var item = rs.list;
                var cost = 0;
                for(var i = 0 ; i < item.length ; i++){
                    cost += Number(item[i].JOURNAL_AMT);
                }

                $("#studyMoney").val(comma(cost));
            }
        });
    }

    function studyUserSetting(){
        let data = {
            pk: $("#pk").val()
        }
        // const result = customKendo.fn_customAjax("/campus/getStudyUserList", data);
        const result = customKendo.fn_customAjax("/campus/getStudyResultList", data);

        studyView.global.studyUserList = result.list;


        let list = studyView.global.studyUserList;

        let html = '';
        html += '<colgroup>';
        html += '<col width="8%"><col width="25%"><col width="20%"><col width="20%"><col width="12%"><col width="12%">';
        html += '</colgroup>';

        html += '<thead>';
        html += '<tr>';
        html += '<th>구분</th>';
        html += '<th>부서명</th>';
        html += '<th>직위</th>';
        html += '<th>성명</th>';
        html += '<th>이수횟수</th>';
        html += '<th>이수시간</th>';
        html += '</tr>';

        for(let i=0; i<list.length; i++){
            html += '<tr>';
            html += '<td style="text-align: center">'+list[i].STUDY_CLASS_TEXT+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_DEPT_NAME+' '+list[i].STUDY_TEAM_NAME+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_POSITION_NAME+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_EMP_NAME+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_EMP_CNT+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_TIME+'</td>';
            html += '</tr>';
            if(list[i].STUDY_CLASS_TEXT == "조장"){
                studyView.global.mngEmpSeq = list[i].STUDY_EMP_SEQ;
            }
        }
        $("#studyUserTable").html(html);
    }


    function inputNumberFormat (obj){
        obj.value = comma(uncomma(obj.value));
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }

    function  fn_saveing(){
        let studyResultSn = $("#studyResultSn").val();
        let studyInfoSn = $("#pk").val();
        let studyNameTd = $("#studyNameTd").text();
        let journalDt = $("#journalDt").val();
        let journalStartTime = $("#journalStartTime").val();
        let journalEndTime = $("#journalEndTime").val();
        let studyLocation = $("#studyLocation").val();
        let studyUserSeq = $("#studyUserSeq").val();
        let studyUserName = $("#studyUserName").val();
        let studyContent = $("#studyContent").val();
        let studyMoney = uncomma($("#studyMoney").val());
        let journalAmtClass = $("#journalAmtClass").val();
        let journalAmtClassText = $("#journalAmtClass").data("kendoDropDownList").text();
        let journalAmtEtc = $("#journalAmtEtc").val();
        let regEmpName = $("#regEmpName").val();
        let empSeq = $("#regEmpSeq").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let eduTime = 0;

        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(journalDt == "" || journalStartTime == "" || journalEndTime == ""){ alert("학습일시가 작성되지 않았습니다."); return; }
        if(studyLocation == ""){ alert("학습장소가 작성되지 않았습니다."); return; }
        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(studyContent == ""){ alert("학습내용이 작성되지 않았습니다."); return; }
        if(studyMoney == ""){ alert("소모비용이 작성되지 않았습니다."); return; }
        if(journalAmtClass == ""){ alert("소요비용구분이 선택되지 않았습니다."); return; }

        /** 학습조 학습주 실제 인정시간 조회 */
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hour1 = journalStartTime.split(":")[0];
        var hour2 = journalEndTime.split(":")[0];
        var min1 = journalStartTime.split(":")[1];
        var min2 = journalEndTime.split(":")[1];
        var bfDate = new Date(year, month, day, hour1, min1);
        var afDate = new Date(year, month, day, hour2, min2);
        var diffSec = afDate.getTime() - bfDate.getTime();
        var diffMin = diffSec / 1000 / 60 / 60;

        /** 건당 최대 2시간 */
        // if(diffMin > 2){
        //     eduTime = 2
        // }else{
        eduTime = diffMin;
        // }

        /** 주당 최대 2시간 체크 */
        let realEduTimeYear = customKendo.fn_customAjax("/campus/getRealEduTimeStudyWeekly", {
            studyInfoSn: studyInfoSn,
            empSeq: empSeq,
            applyDt: journalDt,
        }).data.REAL_EDU_TIME;


        let realEduTime = eduTime;
        if(realEduTimeYear + realEduTime > 2){
            realEduTime = 2 - realEduTimeYear;
        }

        let data = {
            studyResultSn: studyResultSn,
            studyInfoSn: studyInfoSn,
            studyName: studyNameTd,
            studyEmpSeq : studyUserSeq,
            studyEmpName : studyUserName,
            studyResultDt: journalDt,
            studyResultStartTime: journalStartTime,
            studyResultEndTime: journalEndTime,
            studyResultLocate: studyLocation,
            studyResultContent: studyContent,
            studyResultAmt: studyMoney,
            regEmpName: regEmpName,
            studyResultTime: realEduTime,
            regEmpSeq : regEmpSeq
        }

        if(studyResultSn != ""){

            $.ajax({
                url: "/campus/setStudyResultModify",
                data: data,
                type: "post",
                dataType: "json",
                success: function (rs) {
                    if (rs.code == 200) {
                        alert("수정되었습니다.");
                        window.location.reload();
                        /*opener.location.reload();
                        location.href = "/campus/pop/resultDocPop.do?pk=" + rs.params.studyInfoSn + "&studyResultSn=" + rs.params.studyResultSn;*/
                    }
                }
            })
        }else{
            $.ajax({
                url: "/campus/setStudyResult",
                data: data,
                type: "post",
                dataType: "json",
                success: function (rs) {
                    if (rs.code == 200) {
                        alert("저장되었습니다.");

                        if(opener.opener != null){
                            opener.opener.parent.studyInfo.mainGrid();
                        }

                        if(opener != null){
                            if(opener.parent.studyInfo != null){
                                opener.parent.studyInfo.mainGrid();
                            } else {
                                opener.location.reload();
                            }
                            location.href = "/campus/pop/resultDocPop.do?pk=" + rs.params.studyInfoSn + "&mode=upd&&studyResultSn=" + rs.params.studyResultSn;
                        }
                    }
                }
            })
        }
    }

    function fn_save(){
        $("#studyDraftFrm").one("submit", function() {
            var url = "/Campus/pop/studyResApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/Campus/pop/studyResApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");

        /*let studyInfoSn = $("#pk").val();
        let data = {
            studyInfoSn: studyInfoSn
        }
        $.ajax({
            url : "/campus/setStudyResultY",
            data: data,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    alert("승인요청되었습니다.");
                    opener.location.reload();
                    window.close();
                }
            }
        })*/
    }

    function fn_approval(){
        /*if($("#resultMode").val() == "mng"){
            var data = {
                studyInfoSn : $("#pk").val(),
            }
            $.ajax({
                url : "/campus/setStudyResultSc",
                data : data,
                type : "post",
                dataType: "json",
                success :function(rs){
                    if(rs.code == 200){
                        alert("승인되었습니다.");
                        opener.location.reload();
                        window.close();
                    }
                }
            });
        }*/

        const studyResult = customKendo.fn_customAjax("/campus/getStudyResultData", {studyResultSn: $("#studyResultSn").val()});
        const studyInfo = studyResult.data;

        approveDocView(studyInfo.DOC_ID, studyInfo.APPRO_KEY, studyInfo.DOC_MENU_CD);
    }
</script>
</body>
