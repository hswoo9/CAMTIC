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

<form id="disAssetDraftFrm" method="post">
    <input type="hidden" id="disAssetSn" name="disAssetSn" value="${params.key}" />
    <input type="hidden" id="menuCd" name="menuCd" value="cardLoss">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">불용자산 처분신청서</span>
            </h3>
            <div class="btn-st popButton">
                <span id="disAssetBtnBox">

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
                    <th>자산명</th>
                    <td colspan="3">
                        <input type="text" id="assetNm" name="assetNm" value="" style="width: 94.2%;" readonly>
                        <input type="hidden" id="deptName" disabled name="deptName" value="${loginVO.orgnztNm}">
                        <input type="hidden" id="astInfoSn" name="astInfoSn" value="">
                        <button type="button" id="crmSelBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick="fn_popDisAssetList();">선택</button>
                    </td>
                </tr>
                <tr>
                    <th>자산관리번호</th>
                    <td>
                        <input type="text" id="assetNo" name="assetNo" value="" readonly>
                    </td>
                    <th>모델</th>
                    <td>
                        <input type="text" id="model" name="model" value="" readonly>
                    </td>
                </tr>
                <tr>
                    <th>취득일자</th>
                    <td>
                        <input type="text" id="insDe" name="insDe" style="" value="" readonly>
                    </td>
                    <th>취득금액</th>
                    <td>
                        <input type="text" id="insAmt" style="text-align: right" name="insAmt"  onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" readonly>
                    </td>
                </tr>
                <tr>
                    <th>구입처</th>
                    <td>
                        <input type="text" id="purcLoc" name="purcLoc" value="">
                    </td>
                    <th>사용자</th>
                    <td>
                        <input type="text" id="empName" name="empName" value="${loginVO.name}">
                    </td>
                </tr>
                <tr>
                    <th>고장발생일시</th>
                    <td colspan="3">
                        <input type="text" id="disAssetDe" name="disAssetDe" value="" style="width: 25%">
                    </td>
                </tr>
                <tr>
                    <th>불용사유</th>
                    <td colspan="3">
                        <textarea type="text" id="disIss" name="disIss" value=""></textarea>
                    </td>
                </tr>
                <tr>
                    <th>처분방법</th>
                    <td colspan="3">
                        <textarea type="text" id="disAssetPb" name="disAssetPb" value=""></textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function(){
        customKendo.fn_textBox(["empName", "assetNo", "model", "insAmt", "purcLoc", "assetNm"]);

        $("#disIss").kendoTextArea({
            rows: 5
        });

        $("#disAssetPb").kendoTextArea({
            rows: 5
        });

        customKendo.fn_datePicker("insDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("disAssetDe", "depth", "yyyy-MM-dd", new Date());

        if($("#disAssetSn").val() != "") {
            fn_setData();
        }
    });

    function fn_save (){
        var parameters = {
            empName : $("#empName").val(),
            deptName : $("#deptName").val(),
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            assetNo : $("#assetNo").val(),
            model : $("#model").val(),
            insAmt : uncomma($("#insAmt").val()),
            purcLoc : $("#purcLoc").val(),
            assetNm : $("#assetNm").val(),
            disIss : $("#disIss").val(),
            disAssetPb : $("#disAssetPb").val(),
            insDe : $("#insDe").val(),
            disAssetDe : $("#disAssetDe").val(),
        };

        if($("#disAssetSn").val() != ""){
            parameters.disAssetSn = $("#disAssetSn").val();
        }

       var rs = customKendo.fn_customAjax("/customDoc/saveDisAsset", parameters);

       if(rs.code == 200){
           alert("저장되었습니다.");

           location.href = "/customDoc/pop/popDisAsset.do?key=" + rs.params.disAssetSn;
       }
    }

    function fn_setData () {
        var rs = customKendo.fn_customAjax("/customDoc/getDisAssetData", {disAssetSn : $("#disAssetSn").val()});

        var result = rs.data;

        $("#assetNo").val(result.ASSET_NO);
        $("#model").val(result.MODEL);
        $("#insAmt").val(comma(result.INS_AMT));
        $("#purcLoc").val(result.PURC_LOC);
        $("#assetNm").val(result.ASSET_NM);

        $("#disIss").val(result.DIS_ISS);
        $("#disAssetPb").val(result.DIS_ASSET_PB);

        $("#insDe").val(result.INS_DE);
        $("#disAssetDe").val(result.DIS_ASSET_DE);

        fn_btnSet(result);
        fn_kendoUIEnableSet(result);
    }

    function fn_btnSet (data) {
        let html = makeApprBtnHtml(data, "disAssetDrafting()");
        $("#disAssetBtnBox").html(html);

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

    function disAssetDrafting(){
        $("#disAssetDraftFrm").one("submit", function() {
            var url = "/popup/customDoc/approvalFormPopup/disAssetApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/customDoc/approvalFormPopup/disAssetApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
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

    function fn_popDisAssetList(){
        var url = "/customDoc/pop/popAssetList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

    function selectAsset(key, astNo, astNm, modelNm, date, price, compName){
        $("#astInfoSn").val(key || ''); //기본키
        $("#assetNo").val(astNo || ''); //자산관리번호
        $("#assetNm").val(astNm || ''); //자산명
        $("#model").val(modelNm || ''); //모델명
        $("#insDe").val(date || ''); //취득일자
        $("#insAmt").val(price || ''); //취득금액
        $("#purcLoc").val(compName || ''); //구입처
    }
</script>
</body>
</html>