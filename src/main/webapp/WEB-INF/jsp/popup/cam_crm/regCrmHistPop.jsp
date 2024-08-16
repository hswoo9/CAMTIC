<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<style>
    .ck-editor__editable { height: 200px; }
</style>
<script type="text/javascript" src="/js/intra/cam_crm/regCrmHistPop.js?v=${today}"/></script>
<script src="https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/ckeditor.js"></script>
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="crmSn" name="crmSn" value="${params.crmSn}" />
<input type="hidden" id="crmHistSn" value="${params.crmHistSn}" />
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">고객관계이력 등록</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="regCrmHist.fn_save();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
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
                        <span class="red-star">*</span>업체명
                    </th>
                    <td>
                        <input type="text" id="crmNm" style="width: 80%;" disabled>
<%--                        <button type="button" id="crmSelBtn" class="k-button k-button-solid-base" onclick="regCrmHist.fn_popCamCrmList();">검색</button>--%>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>대표자
                    </th>
                    <td>
                        <input type="text" id="crmCeo" style="width: 90%;" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업자 번호
                    </th>
                    <td>
                        <input type="text" id="crmNo" style="width: 90%;" disabled>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>설립일
                    </th>
                    <td>
                        <input type="text" id="crmEstNo" style="width: 90%;" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>[우편번호] 주소
                    </th>
                    <td colspan="3">
                        <input type="text" id="addr" style="width: 90%;" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>전화번호
                    </th>
                    <td>
                        <input type="text" id="telNum" style="width: 90%;" disabled>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>팩스번호
                    </th>
                    <td>
                        <input type="text" id="fax" style="width: 90%;" disabled>
                    </td>
                </tr>

                </thead>
            </table>

            <span class="red-star" style="float: right; font-size: 12px; margin-top: 10px;">(*)는 필수 입력사항 입니다. </span>
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
                        <span class="red-star">*</span>관계유형
                    </th>
                    <td colspan="3">
                        <input type="text" id="crmRelTp" style="width: 15%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>일시
                    </th>
                    <td colspan="3">
                        <input type="text" id="crmRelStrDt" style="width: 20%;">
                        ~
                        <input type="text" id="crmRelEndDt" style="width: 20%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        컨텍포인트
                    </th>
                    <td>
                        <input type="text" id="crmMemNm" style="width: 80%;" disabled>
                        <input type="hidden" id="crmMemSn" />
                        <button type="button" class="k-button k-button-solid-base" onclick="regCrmHist.fn_popCamCrmMemList();">검색</button>
                    </td>
                    <th scope="row" class="text-center th-color">
                        담당자 연락처
                    </th>
                    <td>
                        <input type="text" id="crmMemPhn" style="width: 90%" disabled>
                    </td>
                </tr>
                <%-- TODO. 관심분야 삭제--%>
<%--                <tr>--%>
<%--                    <th scope="row" class="text-center th-color">--%>
<%--                        관심분야 선택--%>
<%--                    </th>--%>
<%--                    <td colspan="3">--%>
<%--                        <div style="text-align: left">--%>
<%--                            <button type="button" class="k-button k-button-solid-base" onclick="regCrmHist.codeTableExpand(this)">▼</button>--%>
<%--                        </div>--%>
<%--                        <table id="codeTable" class="table table-bordered mb-0 mt-10" style="display: none">--%>
<%--                            <colgroup>--%>
<%--                                <col style="width: 15%">--%>
<%--                            </colgroup>--%>

<%--                        </table>--%>
<%--                    </td>--%>
<%--                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관계사업 선택
                    </th>
                    <td colspan="3">
                        <input type="radio" id="N" name="crmRelPjt" style="margin-right: 5px;" value="N" checked><label for="N">해당없음</label>
                        <input type="radio" id="R" name="crmRelPjt" style="margin-right: 5px;" value="R"><label for="R">R&D</label>
                        <input type="radio" id="S" name="crmRelPjt" style="margin-right: 5px;" value="S"><label for="S">비R&D</label>
                        <input type="radio" id="D" name="crmRelPjt" style="margin-right: 5px;" value="D"><label for="D">엔지니어링</label>
                        <input type="radio" id="V" name="crmRelPjt" style="margin-right: 5px;" value="V"><label for="V">용역/기타</label><br>
                        <input type="hidden" id="pjtSn" name="pjtSn">
                        <input type="hidden" id="pjtCd" name="pjtCd">
                        <input type="text" id="pjtNm" name="pjtNm" class="k-input k-textbox" readonly style="width:90%;display: none" onclick="regCrmHist.fn_projectPop()">
                        <button id="pjtSelBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="display: none" onclick="regCrmHist.fn_projectPop()">사업선택</button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관계내용
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="crmRelCont" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관계내용 공유
                    </th>
                    <td colspan="3">
                        <input type="text" id="crmShareEmpName" style="width: 30%;" disabled>
                        <input type="hidden" id="crmShareEmp" />
                        <button type="button" class="k-button k-button-solid-base" onclick="regCrmHist.fn_popUser();">검색</button>
                        <button type="button" class="k-button k-button-solid-base" onclick="regCrmHist.fn_shareEmpReset();">초기화</button>
                        <span style="position: relative; top: 3px;">
                            <input type="checkbox" id="smsChk">
                            <label for="smsChk" style="margin-right: 15px;">SMS발송</label>
                            <input type="checkbox" id="mailChk">
                            <label for="mailChk">메일발송</label>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        보안글
                    </th>
                    <td colspan="3">
                        <span style="position: relative; top: 3px;">
                            <input type="checkbox" id="secChk">
                            <label for="secChk">보안글</label>
                            <span class="red-start" style="font-size: 12px;"> ※ 체크시 해당 팀장 이상에서만 조회 가능합니다. </span>
                        </span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    regCrmHist.fn_defaultScript();

    function userDataSet(arr, empNameAr, empSeqAr){
        $("#crmShareEmpName").val(empNameAr.substring(0, empNameAr.length-1));
        $("#crmShareEmp").val(empSeqAr.substring(0, empSeqAr.length-1));
    }

    function selectProject(sn, nm, cd, baseYear){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);
    }

</script>
</body>
</html>