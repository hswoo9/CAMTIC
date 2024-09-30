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

<form id="poemDraftFrm" method="post">
    <input type="hidden" id="poemSn" name="poemSn" value="${params.key}" />
    <input type="hidden" id="menuCd" name="menuCd" value="poem">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">시말서</span>
            </h3>
            <div class="btn-st popButton">
                <span id="poemBtnBox">

                </span>
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" style="margin-right:5px;" onclick="fn_save()">저장</button>
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
                    <th>부서</th>
                    <td>
                        <input type="text" id="deptName" disabled name="deptName" value="${loginVO.orgnztNm}">
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
                    <th>신청일자</th>
                    <td>
                        <input type="text" id="poemDe" disabled name="poemDe">
                    </td>
                </tr>
                <tr>
                    <th>위반내용<br><span style="color:red;">(상세히 기술요망)</span></th>
                    <td colspan="3">
                        <textArea id="poemCont"></textArea>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["deptName", "position" , "empName"]);

        $("#poemCont").kendoTextArea({
            rows: 10
        });

        customKendo.fn_datePicker("poemDe", "depth", "yyyy-MM-dd", new Date());

        if($("#poemSn").val() != "") {
            fn_setData();
        }
    });

    function fn_save (){
        var parameters = {
            deptSeq : $("#deptSeq").val(),
            deptName : $("#deptName").val(),
            position : $("#position").val(),
            empName : $("#empName").val(),
            empSeq : $("#empSeq").val(),
            poemCont : $("#poemCont").val(),
        };

        if($("#poemSn").val() != ""){
            parameters.poemSn = $("#poemSn").val();
        }

        var rs = customKendo.fn_customAjax("/customDoc/savePoem", parameters);

        if(rs.code == 200){
            alert("저장되었습니다.");

            location.href = "/customDoc/pop/popPoem.do?key=" + rs.params.poemSn;
            window.opener.parent.gridReload();
        }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getPoemData", {poemSn : $("#poemSn").val()});

        var result = rs.data;

        $("#deptName").val(result.DEPT_NAME);
        $("#empName").val(result.EMP_NAME);
        $("#position").val(result.POSITION);
        $("#poemCont").val(result.POEM_CONT);
        $("#poemDe").val(result.REG_DE);

        fn_btnSet(result);
        fn_kendoUIEnableSet(result);
    }

    function fn_btnSet (data) {
        let html = makeApprBtnHtml(data, "poemDrafting()");
        $("#poemBtnBox").html(html);

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

    function poemDrafting(){
        $("#poemDraftFrm").one("submit", function() {
            var url = "/popup/customDoc/approvalFormPopup/poemApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/customDoc/approvalFormPopup/poemApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }
</script>
</body>
</html>