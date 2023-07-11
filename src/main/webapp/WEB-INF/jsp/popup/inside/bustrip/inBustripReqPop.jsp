<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/inBustripReqPop.js?v=${today}"></script>
<style>
    .card-header {padding: 0px 0px 40px 0px;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
        <div class="table-responsive">
            <c:if test="${params.hrBizReqId == null || params.hrBizReqId == ''}">
                <div style="background-color: #00397f;">
                    <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                        <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">출장신청</h3>
                        <div class="btn-st" style="text-align:center; margin-top: 10px;">
                            <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="inBustripReqPop.fn_saveBtn();">저장</button>
                            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                        </div>
                    </div>
                </div>
            </c:if>
            <c:if test="${params.hrBizReqId != '' && params.hrBizReqId != null}">
                <div style="background-color: #00397f;">
                    <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                        <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">출장정보</h3>
                        <div class="btn-st" style="text-align:center; margin-top: 10px;">
                            <button type="button" class="k-button k-button-solid-info" id="modBtn" onclick="inBustripReqPop.fn_updBtn('${params.hrBizReqId}');">수정</button>
                            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                        </div>
                    </div>
                </div>
            </c:if>
            <form id="inBustripReqPop" style="padding: 20px 30px;">
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="popTable table table-bordered mb-0" id="inBustripReqPopTb" style="margin-top: 10px;">
                    <colgroup>
                        <col width="10%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>사번</th>
                        <td>
                            <input type="text" id="empSeq" name="empNumber" class="defaultVal" value="${loginVO.uniqId}" style="width: 80%;">
                        </td>
                        <th>성명</th>
                        <td>
                            <input type="text" id="empName" name="empName" class="defaultVal" value="${loginVO.name}" style="width: 80%;">
                        </td>
                    </tr>
                    <tr>
                        <th>부서명</th>
                        <td>
                            <input type="text" id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 80%;">
                        </td>
                        <th>신청일</th>
                        <td>
                            <input type="text" id="reqDate" name="reqDate" class="defaultVal" disabled style="width: 80%;">
                        </td>
                    </tr>
                    <tr>
                        <th><span class="red-star">*</span>구분</th>
                        <td>
                            <input type="text" id="tripCode" style="width: 80%;">
                        </td>
                        <th><span class="red-star">*</span>관련사업</th>
                        <td>
                            <input type="text" id="project" style="width: 80%;">
                        </td>
                    </tr>
                    <tr id="busnLine" style="display: none;">
                        <th><span class="red-star">*</span>사업명</th>
                        <td colspan="3">
                            <input type="text" id="busnName" name="busnName" readonly style="width: 80%;">
                            <button type="button" class="k-button k-button-solid-info" id="projectAddBtn">사업선택</button>
                        </td>
                    </tr>
                    <tr>
                        <th>동반자</th>
                        <td colspan="3">
                            <input type="text" id="popEmpName" name="bustripAdd" readonly style="width: 80%;">
                            <button type="button" class="k-button k-button-solid-info" id="addMemberBtn" onclick="userMultiSearch();">출장자 추가</button>
                            <div id="companionList">
                                <input type="hidden" id="popEmpSeq" name="companionEmpSeq" value="">
                                <input type="hidden" id="popDeptSeq" name="companionDeptSeq" value="">
                                <input type="hidden" id="popDeptName" name="companionDeptSeq" value="">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><span class="red-star">*</span>방문지</th>
                        <td>
                            <input type="text" id="visitLoc" style="width: 60%;">
                            <button type="button" class="k-button-solid-base k-button" disabled>업체선택</button>
                        </td>
                        <th>경유지</th>
                        <td>
                            <input type="text" id="visitLocSub" style="width: 60%;"> ex) 전라북도 전주시
                        </td>
                    </tr>
                    <tr>
                        <th><span class="red-star">*</span>출장일</th>
                        <td colspan="3">
                            <input type="text" id="date1" style="width: 20%">
                            <input type="text" id="time1" style="width: 13%"> ~
                            <input type="text" id="date2" style="width: 20%">
                            <input type="text" id="time2" style="width: 13%">
                        </td>
                    </tr>
                    <tr id="carLine">
                        <th><span class="red-star">*</span>업무차량</th>
                        <td>
                            <div style="position: relative; top: 4px;">
                                <input type="radio" name="useCar" id="car1" value="N" checked>
                                <label for="car1">미사용</label>
                                <input type="radio" name="useCar" id="car2" value="Y">
                                <label for="car2">사용</label>
                            </div>
                        </td>
                        <th>차량</th>
                        <td>
                            <input type="text" id="carList" style="width: 40%;">
                            <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="운행확인" disabled onclick=""/><br>
                        </td>
                    </tr>
                    <tr>
                        <th><span class="red-star">*</span>출장목적</th>
                        <td colspan="3">
                            <input type="text" id="bustObj" style="width: 100%;">
                        </td>
                    </tr>
                    </thead>
                </table>
            </form>
            <form style="padding: 0px 30px;">
                <div class="card-header">
                    <h3 class="card-title">첨부파일</h3>
                    <div class="card-options">
                        <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                <span class="k-button-text">파일첨부</span>
                            </button>
                            <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" multiple style="display: none"/>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="table-responsive">
                        <table class="popTable table table-bordered">
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
                            <tbody id="fileGrid">
                            <tr class="defultTr">
                                <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    inBustripReqPop.init();

    var dataConf = '${params.hrBizReqId}';

    if(dataConf != ''){
        inBustripReqPop.setData(dataConf);
    }

    function userMultiSearch() {
        window.open("/common/deptMultiPop.do","조직도","width=750,height=650");
    }
</script>
</body>



