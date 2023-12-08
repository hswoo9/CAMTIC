<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
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
    <div id="btnDiv">
        <button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="processInfo.fn_save()">저장</button>
    </div>
    <div class="table-responsive">
        <div id="commFileHtml1" style="margin-top:10px; display :none">
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

                    <textarea id="file1Etc" style="margin-top:5px;"></textarea>
                </div>
            </form>
        </div>

        <div id="commFileHtml2" style="margin-top:10px; display :none">
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
                    <textarea id="file2Etc" style="margin-top:5px;"></textarea>
                </div>
            </form>
        </div>

        <div id="commFileHtml3" style="margin-top:10px; display :none">
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
                    <textarea id="file3Etc" style="margin-top:5px;"></textarea>
                </div>
            </form>
        </div>

        <div id="commFileHtml4" style="margin-top:10px; display :none">
            <form style="padding: 0px 30px;">
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title">참여관리</h3>
                    <div class="card-options">
                        <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload4" onclick="$('#fileList4').click()">
                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                <span class="k-button-text">파일첨부</span>
                            </button>
                            <input type="file" id="fileList4" name="fileList4" onchange="addFileInfoTable(4);" multiple style="display: none"/>
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
                        <tbody id="fileGrid4">
                        <tr class="defultTr">
                            <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                    <textarea id="file4Etc" style="margin-top:5px;"></textarea>
                </div>
            </form>
        </div>

        <div id="commFileHtml5" style="margin-top:10px; display :none">
            <form style="padding: 0px 30px;">
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title">기획관리</h3>
                    <div class="card-options">
                        <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload5" onclick="$('#fileList5').click()">
                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                <span class="k-button-text">파일첨부</span>
                            </button>
                            <input type="file" id="fileList5" name="fileList5" onchange="addFileInfoTable(5);" multiple style="display: none"/>
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
                        <tbody id="fileGrid5">
                        <tr class="defultTr">
                            <td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                    <textarea id="file5Etc" style="margin-top:5px;"></textarea>
                </div>
            </form>
        </div>

        <div id="commFileHtml6" style="margin-top:10px">
            <form style="padding: 0px 30px;">
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title">기타</h3>
                    <div class="card-options">
                        <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload6" onclick="$('#fileList6').click()">
                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                <span class="k-button-text">파일첨부</span>
                            </button>
                            <input type="file" id="fileList6" name="fileList6" onchange="addFileInfoTable(6);" multiple style="display: none"/>
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
                        <tbody id="fileGrid6">
                        <tr class="defultTr">
                            <td colspan="6" style="text-align: center">선택된 파일이 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                    <textarea id="file6Etc" style="margin-top:5px;"></textarea>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    processInfo.fn_defaultScript();
    function addFileInfoTable(idx){
        if(idx == 1){
            fCommon.global.attFiles1 = new Array();
            for(var i = 0; i < $("input[name='fileList"+idx+"']")[0].files.length; i++){
                fCommon.global.attFiles1.push($("input[name='fileList"+idx+"']")[0].files[i]);
            }

            if(fCommon.global.attFiles1.length > 0){
                $("#fileGrid" + idx).find(".defultTr").remove();
                $("#fileGrid" + idx).find(".addFile").remove();

                var html = '';
                for (var i = 0; i < fCommon.global.attFiles1.length; i++) {
                    html += '<tr style="text-align: center" class="addFile">';
                    html += '   <td>' + fCommon.global.attFiles1[i].name.split(".")[0] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles1[i].name.split(".")[1] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles1[i].size + '</td>';
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#fileGrid" + idx).append(html);
            }
        } else if(idx == 2){
            fCommon.global.attFiles2 = new Array();
            for(var i = 0; i < $("input[name='fileList"+idx+"']")[0].files.length; i++){
                fCommon.global.attFiles2.push($("input[name='fileList"+idx+"']")[0].files[i]);
            }

            if(fCommon.global.attFiles2.length > 0){
                $("#fileGrid" + idx).find(".defultTr").remove();
                $("#fileGrid" + idx).find(".addFile").remove();

                var html = '';
                for (var i = 0; i < fCommon.global.attFiles2.length; i++) {
                    html += '<tr style="text-align: center" class="addFile">';
                    html += '   <td>' + fCommon.global.attFiles2[i].name.split(".")[0] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles2[i].name.split(".")[1] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles2[i].size + '</td>';
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#fileGrid" + idx).append(html);
            }
        } else if(idx == 3){
            fCommon.global.attFiles3 = new Array();
            for(var i = 0; i < $("input[name='fileList"+idx+"']")[0].files.length; i++){
                fCommon.global.attFiles3.push($("input[name='fileList"+idx+"']")[0].files[i]);
            }

            if(fCommon.global.attFiles3.length > 0){
                $("#fileGrid" + idx).find(".defultTr").remove();
                $("#fileGrid" + idx).find(".addFile").remove();

                var html = '';
                for (var i = 0; i < fCommon.global.attFiles3.length; i++) {
                    html += '<tr style="text-align: center" class="addFile">';
                    html += '   <td>' + fCommon.global.attFiles3[i].name.split(".")[0] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles3[i].name.split(".")[1] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles3[i].size + '</td>';
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#fileGrid" + idx).append(html);
            }
        } else if (idx == 4) {
            fCommon.global.attFiles4 = new Array();
            for(var i = 0; i < $("input[name='fileList"+idx+"']")[0].files.length; i++){
                fCommon.global.attFiles4.push($("input[name='fileList"+idx+"']")[0].files[i]);
            }

            if(fCommon.global.attFiles4.length > 0){
                $("#fileGrid" + idx).find(".defultTr").remove();
                $("#fileGrid" + idx).find(".addFile").remove();

                var html = '';
                for (var i = 0; i < fCommon.global.attFiles4.length; i++) {
                    html += '<tr style="text-align: center" class="addFile">';
                    html += '   <td>' + fCommon.global.attFiles4[i].name.split(".")[0] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles4[i].name.split(".")[1] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles4[i].size + '</td>';
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#fileGrid" + idx).append(html);
            }
        } else if (idx == 5) {
            fCommon.global.attFiles5 = new Array();
            for(var i = 0; i < $("input[name='fileList"+idx+"']")[0].files.length; i++){
                fCommon.global.attFiles5.push($("input[name='fileList"+idx+"']")[0].files[i]);
            }

            if(fCommon.global.attFiles5.length > 0){
                $("#fileGrid" + idx).find(".defultTr").remove();
                $("#fileGrid" + idx).find(".addFile").remove();

                var html = '';
                for (var i = 0; i < fCommon.global.attFiles5.length; i++) {
                    html += '<tr style="text-align: center" class="addFile">';
                    html += '   <td>' + fCommon.global.attFiles5[i].name.split(".")[0] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles5[i].name.split(".")[1] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles5[i].size + '</td>';
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#fileGrid" + idx).append(html);
            }
        } else if (idx == 6) {
            fCommon.global.attFiles6 = new Array();
            for(var i = 0; i < $("input[name='fileList"+idx+"']")[0].files.length; i++){
                fCommon.global.attFiles6.push($("input[name='fileList"+idx+"']")[0].files[i]);
            }

            if(fCommon.global.attFiles6.length > 0){
                $("#fileGrid" + idx).find(".defultTr").remove();
                $("#fileGrid" + idx).find(".addFile").remove();

                var html = '';
                for (var i = 0; i < fCommon.global.attFiles6.length; i++) {
                    html += '<tr style="text-align: center" class="addFile">';
                    html += '   <td>' + fCommon.global.attFiles6[i].name.split(".")[0] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles6[i].name.split(".")[1] + '</td>';
                    html += '   <td>' + fCommon.global.attFiles6[i].size + '</td>';
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#fileGrid" + idx).append(html);
            }
        }


    }
</script>
</body>
</html>