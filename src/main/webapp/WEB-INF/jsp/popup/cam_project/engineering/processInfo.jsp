<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/processInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="expAmt" value="${params.expAmt}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<form id="devDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="devSn" name="devSn" value="">
    <input type="hidden" id="menuCd" name="menuCd" value="dev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>


<input type="hidden" id="step" value="E3" />
<input type="hidden" id="stepColumn" value="STEP4" />
<input type="hidden" id="nextStepColumn" value="STEP5" />
<input type="hidden" id="stepValue" value="Y" />
<input type="hidden" id="nextStepValue" value="R" />

<div style="padding: 10px">
    <div class="table-responsive">
        <div id="btnDiv">
            <%--<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="devInfo.fn_save()">저장</button>--%>
        </div>
        <div id="commFileHtml1" style="margin-top:10px; display: none">
            <form style="padding: 0px 30px;">
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title">설계관리</h3>
                    <div class="card-options">
                        <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList1').click()">
                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                <span class="k-button-text">파일첨부</span>
                            </button>
                            <input type="file" id="fileList1" name="fileList1" onchange="addFileInfoTable(1);" multiple style="display: none"/>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="popTable table table-bordered mb-0">
                        <colgroup>
                            <col width="50%">
                            <col width="10%">
                            <col width="30%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                        <tr class="text-center th-color">
                            <th>파일명</th>
                            <th>확장자</th>
                            <th>용량</th>
                            <th>기타</th>
                        </tr>
                        </thead>
                        <tbody id="fileGrid1">
                        <tr class="defultTr">
                            <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>

        <div id="commFileHtml2" style="margin-top:10px;display: none">
            <form style="padding: 0px 30px;">
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title">제작관리</h3>
                    <div class="card-options">
                        <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload2" onclick="$('#fileList2').click()">
                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                <span class="k-button-text">파일첨부</span>
                            </button>
                            <input type="file" id="fileList2" name="fileList2" onchange="addFileInfoTable(2);" multiple style="display: none"/>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="popTable table table-bordered mb-0">
                        <colgroup>
                            <col width="50%">
                            <col width="10%">
                            <col width="30%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                        <tr class="text-center th-color">
                            <th>파일명</th>
                            <th>확장자</th>
                            <th>용량</th>
                            <th>기타</th>
                        </tr>
                        </thead>
                        <tbody id="fileGrid2">
                        <tr class="defultTr">
                            <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>

        <div id="commFileHtml3" style="margin-top:10px;display: none">
            <form style="padding: 0px 30px;">
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title">품질관리</h3>
                    <div class="card-options">
                        <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload3" onclick="$('#fileList3').click()">
                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                <span class="k-button-text">파일첨부</span>
                            </button>
                            <input type="file" id="fileList3" name="fileList3" onchange="addFileInfoTable(3);" multiple style="display: none"/>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="popTable table table-bordered mb-0">
                        <colgroup>
                            <col width="50%">
                            <col width="10%">
                            <col width="30%">
                            <col width="10%">
                        </colgroup>
                        <thead>
                        <tr class="text-center th-color">
                            <th>파일명</th>
                            <th>확장자</th>
                            <th>용량</th>
                            <th>기타</th>
                        </tr>
                        </thead>
                        <tbody id="fileGrid3">
                        <tr class="defultTr">
                            <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    processInfo.fn_defaultScript();

</script>
</body>
</html>