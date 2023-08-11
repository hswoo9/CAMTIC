<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/step1.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/step4.js?v=${today}'/>"></script>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="documentSn" value="${data.documentContractSn}"/>
<input type="hidden" id="deptName" style="width: 40%" value="${loginVO.orgnztNm}" disabled>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}" disabled>
<input type="hidden" id="befExpAmt" value="${hashMap.EXP_AMT}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">공정</span>
                <input type="hidden" id="pjtStep" value="E4">
                <input type="hidden" id="pjtSn" value="${hashMap.PJT_SN}" />
                <input type="hidden" id="pjtStepNm" value="공정">
                <input type="hidden" id="step" value="5" />
            </h3>

            <div class="btn-st popButton">
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="es4.fn_save()">저장</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" style="display: none;" onclick="es4.fn_mod()">수정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
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

<div id="dialog"></div>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/regProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/document/docuPop.js?v=${today}'/>"></script>

<script>
    var inParameters = ''//JSON.parse('${map}');

    var idx = 0;
    es4.fn_defaultScript(inParameters);
    function fn_userMultiSelectPop(i) {
        idx = i;
        window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }


    function addFileInfoTable(idx){
        fCommon.global.attFiles = new Array();
        for(var i = 0; i < $("input[name='fileList"+idx+"']")[0].files.length; i++){
            fCommon.global.attFiles.push($("input[name='fileList"+idx+"']")[0].files[i]);
        }

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid" + idx).find(".defultTr").remove();
            $("#fileGrid" + idx).find(".addFile").remove();

            var html = '';
            for (var i = 0; i < fCommon.global.attFiles.length; i++) {
                html += '<tr style="text-align: center" class="addFile">';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[0] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[1] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid" + idx).append(html);
        }
    }


</script>
</body>
</html>