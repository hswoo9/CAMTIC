<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<style>
    th {
        background-color: #f0f6ff;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_mng/companyCard/regCardToPop.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/cam_item/popup/popBomView.js?v=${today}"/></script>

<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
<input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}"/>

<form id="resignDraftFrm" method="post">
    <input type="hidden" id="resignSn" name="resignSn" value="${params.key}" />
    <input type="hidden" id="menuCd" name="menuCd" value="cardLoss">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">사직서</span>
            </h3>
            <div class="btn-st popButton">
                <span id="resignBtnBox">

                </span>
                <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="fn_save()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th>부서 / 팀</th>
                    <td>
                        <input type="text" id="deptTeamName" disabled name="deptTeamName" value="${data.DEPT_TEAM_NAME}">
                    </td>
                    <th>직위</th>
                    <td>
                        <input type="text" id="position" disabled name="position" value="${loginVO.positionNm}">
                    </td>
                </tr>
                <tr>
                    <th>성명</th>
                    <td>
                        <input type="text" id="empName" disabled name="empName" value="${loginVO.name}">
                    </td>
                    <th>주민등록번호</th>
                    <td>
                        <input type="text" id="registNo" disabled name="registNo" value="${data.REGIST_NO}">
                    </td>
                </tr>
                <tr>
                    <th>입사일자</th>
                    <td>
                        <input type="text" id="joinDay" disabled name="joinDay" value="${data.JOIN_DAY}">
                    </td>
                    <th>퇴직예정일자</th>
                    <td>
                        <input type="text" id="resignDay" name="resignDay" value="">
                    </td>
                </tr>
                <tr>
                    <th>직무명</th>
                    <td colspan="3">
                        <input type="text" id="jobDetail" name="jobDetail" value="${data.JOB_DETAIL}">
                    </td>
                </tr>
                <tr>
                    <th>퇴직사유</th>
                    <td colspan="3">
                        <span id="resignType" name="resignType"></span>
                    </td>
                </tr>
                <tr id="subTr" style="display:none;">
                    <th>사유</th>
                    <td colspan="3">
                        <textArea type="text" id="resignIss" name="resignIss"></textArea>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "position", "registNo", "jobDetail", "deptTeamName"]);

        $("#resignIss").kendoTextArea({
            rows: 5
        });

        $("#resignType").kendoRadioGroup({
            items: [
                { label : "전직", value : "A" },
                { label : "개인신병", value : "B" },
                { label : "진학", value : "C" },
                { label : "결혼", value : "D" },
                { label : "가사", value : "E" },
                { label : "기타", value : "F" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "A"
        })

        $("#resignType").data("kendoRadioGroup").bind("change", function(){
            if($("#resignType").data("kendoRadioGroup").value() == "F"){
                $("#subTr").show();
            } else {
                $("#subTr").hide();
            }
        })


        customKendo.fn_datePicker("joinDay", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("resignDay", "depth", "yyyy-MM-dd", new Date());

        if($("#resignSn").val() != "") {
            fn_setData();
        }
    });

    function fn_save (){
        var parameters = {
            empName : $("#empName").val(),
            deptName : $("#deptName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            deptTeamName : $("#deptTeamName").val(),
            position : $("#position").val(),
            registNo : $("#registNo").val(),
            joinDay : $("#joinDay").val(),
            resignDay : $("#resignDay").val(),
            jobDetail : $("#jobDetail").val(),
            resignType : $("#resignType").data("kendoRadioGroup").value(),
            resignIss : $("#resignIss").val()
        };

        if($("#resignSn").val() != ""){
            parameters.resignSn = $("#resignSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveResign", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popResign.do?key=" + rs.params.resignSn;
       }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getResignData", {resignSn : $("#resignSn").val()});

        var result = rs.data;

        $("#empName").val(result.EMP_NAME);
        $("#deptName").val(result.DEPT_NAME);
        $("#empSeq").val(result.EMP_SEQ);
        $("#deptSeq").val(result.DEPT_SEQ);
        $("#deptTeamName").val(result.DEPT_TEAM_NAME);
        $("#registNo").val(result.REGIST_NO);
        $("#joinDay").val(result.JOIN_DAY);
        $("#resignDay").val(result.RESIGN_DAY);
        $("#jobDetail").val(result.JOB_DETAIL);
        $("#resignType").data("kendoRadioGroup").value(result.RESIGN_TYPE);
        $("#resignIss").val(result.RESIGN_ISS);
        $("#position").val(result.POSITION);

        if(result.RESIGN_TYPE == "F"){
            $("#subTr").show();
        } else {
            $("#subTr").hide();
        }

        fn_btnSet(result);
        fn_kendoUIEnableSet(result);
    }

    function fn_btnSet (data) {
        let html = makeApprBtnHtml(data, "resignDrafting()");
        $("#resignBtnBox").html(html);

        if(data != null && data.DOC_ID != null){
            reDraftOnlyOne(data.DOC_ID, $("#empSeq").val(), "reBtn");
        }
    }

    function fn_kendoUIEnableSet (data) {
        if(data != null){
            /** 상신, 재상신, 최종결재완료 상태일때 UI 비활성화 */
            if(data.STATUS == "10" || data.STATUS == "50" || data.STATUS == "100"){
                $("#saveBtn").css("display", "none");
            }
        }
    }

    function resignDrafting(){
        $("#resignDraftFrm").one("submit", function() {
            var url = "/popup/customDoc/approvalFormPopup/resignApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/customDoc/approvalFormPopup/resignApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }
</script>
</body>
</html>