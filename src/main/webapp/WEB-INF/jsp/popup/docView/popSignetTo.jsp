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

<form id="signetToDraftFrm" method="post">
    <input type="hidden" id="signSn" name="signSn" value="${params.key}" />
    <input type="hidden" id="menuCd" name="menuCd" value="cardLoss">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">인감 반출신청서</span>
            </h3>
            <div class="btn-st popButton">
                <span id="signetToBtnBox">

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
                    <th>신청자</th>
                    <td>
                        <input type="text" id="empName" disabled name="empName" value="${loginVO.name}">
                    </td>
                    <th>신청부서</th>
                    <td>
                        <input type="text" id="deptName" disabled name="deptName" value="${loginVO.orgnztNm}">
                    </td>
                </tr>
                <tr>
                    <th>인감종류</th>
                    <td colspan="3">
                        <span id="signType"></span>
                    </td>
                </tr>
                <tr id="subTr" style="display: none">
                    <th>소분류</th>
                    <td colspan="3">
                        <span id="signType2"></span>
                    </td>
                </tr>
                <tr>
                    <th>반출기간</th>
                    <td>
                        <input type="text" id="strDe" name="strDe" style="width: 45%" value=""> ~ <input type="text" id="endDe" style="width: 45%" name="endDe" value="">
                    </td>
                    <th>직위</th>
                    <td>
                        <input type="text" id="position" disabled name="position" value="${loginVO.positionNm}">
                    </td>
                </tr>
                <tr>
                    <th>신청사유<br>(사용용도)</th>
                    <td colspan="3">
                        <textarea type="text" id="useIss" name="useIss" value=""></textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "deptName", "position"]);

        $("#useIss").kendoTextArea({
            rows: 5
        });

        $("#signType").kendoRadioGroup({
            items: [
                { label : "법인인감", value : "A" },
                { label : "사용인감", value : "B" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "A"
        })

        $("#signType").data("kendoRadioGroup").bind("change", function(){
            if($("#signType").data("kendoRadioGroup").value() == "B"){
                $("#subTr").show();
                $("#signType2").data("kendoRadioGroup").value("z");
            } else {
                $("#subTr").hide();
                $("#signType2").data("kendoRadioGroup").value("");
            }
        })

        $("#signType2").kendoRadioGroup({
            items: [
                { label : "이사장인", value : "z" },
                { label : "원 장 인(대)", value : "x" },
                { label : "원 장 인(소)", value : "c" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "z"
        })


        customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", new Date());

        if($("#signSn").val() != "") {
            fn_setData();
        }
    });

    function fn_save (){
        var parameters = {
            empName : $("#empName").val(),
            deptName : $("#deptName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            signType : $("#signType").data("kendoRadioGroup").value(),
            subType : $("#signType2").data("kendoRadioGroup").value(),
            strDe : $("#strDe").val(),
            endDe : $("#endDe").val(),
            useIss : $("#useIss").val(),
            position : $("#position").val()
        };

        if($("#signSn").val() != ""){
            parameters.signSn = $("#signSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveSignetTo", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popSignetTo.do?key=" + rs.params.signSn;
       }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getSignetToData", {signSn : $("#signSn").val()});

        var result = rs.data;

        $("#useIss").val(result.USE_ISS);
        $("#strDe").val(result.STR_DE);
        $("#endDe").val(result.END_DE);
        $("#position").val(result.POSITION);

        if(result.SIGN_TYPE == "B"){
            $("#signType").data("kendoRadioGroup").value("B");
            $("#subTr").show();
            $("#signType2").data("kendoRadioGroup").value(result.SUB_TYPE);
        } else {
            $("#signType").data("kendoRadioGroup").value("A");
            $("#subTr").hide();
            $("#signType2").data("kendoRadioGroup").value("");
        }

        fn_btnSet(result);
        fn_kendoUIEnableSet(result);
    }

    function fn_btnSet (data) {
        let html = makeApprBtnHtml(data, "signetToDrafting()");
        $("#signetToBtnBox").html(html);

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

    function signetToDrafting(){
        $("#signetToDraftFrm").one("submit", function() {
            var url = "/popup/customDoc/approvalFormPopup/signetToApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/customDoc/approvalFormPopup/signetToApprovalPop.do";
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