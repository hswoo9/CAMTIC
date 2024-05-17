<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/business/business.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripList.js?v=${today}"></script>

<script type="text/javascript" src="/js/intra/inside/bustrip/bustripInit.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripPopup.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripReqPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/carPop.js?v=${today}"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
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
<input type="hidden" id="pageName" value="bustripReqPop"/>
<input type="hidden" id="mod" value="${params.mode}"/>
<input type="hidden" id="paramsType" value="${params.type}" />
<input type="hidden" id="paramsTripCode" value="${params.tripCode}"/>
<input type="hidden" id="paramsPjtSn" value="${params.pjtSn}"/>
<input type="hidden" id="carReqSn" value=""/>

<form id="bustripDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="bustrip">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="hrBizReqId" name="hrBizReqId" value="${params.hrBizReqId}"/>
</form>

<div class="table-responsive">
    <div class="card-header pop-header">
        <c:if test="${params.hrBizReqId == null || params.hrBizReqId == ''}">
            <h3 class="card-title title_NM">출장신청</h3>
        </c:if>
        <c:if test="${params.hrBizReqId != null && params.hrBizReqId != ''}">
            <h3 class="card-title title_NM">출장정보</h3>
        </c:if>
        <div class="btn-st popButton">
            <span id="apprBtnBox">

            </span>
            <button type="button" class="k-button k-button-solid-info" id="modBtn" onclick="bustripReq.fn_saveBtn();">저장</button>
            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
        </div>
    </div>

    <form id="bustripReqPop" style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0" id="">
            <colgroup>
                <col width="8%">
                <col width="25%">
                <col width="8%">
                <col width="24%">
                <col width="8%">
                <col width="24%">
            </colgroup>
            <thead>
            <tr>
                <th>성명</th>
                <td>
                    <input id="regEmpName" name="regEmpName" class="defaultVal" value="${loginVO.name}" style="width: 80%;" disabled>
                </td>
                <th>부서명</th>
                <td>
                    <input id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 80%;" disabled>
                </td>
                <th>신청일</th>
                <td>
                    <input id="reqDate" name="reqDate" class="defaultVal" style="width: 80%;" disabled>
                </td>
            </tr>
            <tr>
                <th>출장자</th>
                <td colspan="5">
                    <input type="text" id="empName" name="empName" value="${loginVO.name}" style="width: 20%;" disabled>
                    <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}" style="width: 20%;" disabled>
                    <button type="button" class="k-button k-button-solid-info" onclick="fn_userMultiSelectPop('bustripT');">출장자 변경</button>
                </td>
            </tr>
            </thead>
        </table>
        <table class="popTable table table-bordered mb-0" id="bustripReqPopTb">
            <colgroup>
                <col width="10%">
                <col width="40%">
                <col width="10%">
                <col width="40%">
            </colgroup>
            <thead>
            <tr>
                <th><span class="red-star">*</span>구분</th>
                <td>
                    <span id="tripCode"></span>
                </td>
                <th><span class="red-star">*</span>관련사업</th>
                <td>
                    <span id="project"></span>
                </td>
            </tr>
            <tr id="busnLine" style="display:none">
                <th><span class="red-star">*</span>사업명</th>
                <td colspan="3">
                    <input type="text" id="busnName" name="busnName" style="width: 80%;" disabled />
                    <input type="hidden" id="pjtSn" />
                    <input type="hidden" id="pjtCd" name="pjtCd">
                    <button type="button" class="k-button k-button-solid-info" onclick="bustripReq.fn_projectPop()" id="projectAddBtn">사업선택</button>
                </td>
            </tr>
            <tr>
                <th>출장자</th>
                <td>
                    <input id="popEmpName" name="bustripAdd" readonly style="width: 300px;">
                    <button type="button" class="k-button k-button-solid-info" id="addMemberBtn" onclick="fn_userMultiSelectPop('bustrip');">출장자 추가</button>
                    <div id="companionList">
                        <input type="hidden" id="popEmpSeq" name="companionEmpSeq" value="">
                        <input type="hidden" id="popDeptSeq" name="companionDeptSeq" value="">
                        <input type="hidden" id="popDeptName" name="companionDeptSeq" value="">
                    </div>
                </td>
                <th>외부인력</th>
                <td>
                    <input id="externalName" name="bustripAdd" readonly style="width: 290px;">
                    <button type="button" id="exAddBtn" class="k-button k-button-solid-info" onclick="bustripPop.addExternalWorkforcePop();">외부인력 추가</button>
                    <div id="externalList">
                        <input type="hidden" id="externalBelong" name="externalEmpSeq" value="">
                        <input type="hidden" id="externalSpot" name="companionDeptSeq" value="">
                        <input type="hidden" id="externalEtc" name="companionDeptSeq" value="">
                    </div>
                </td>
            </tr>
            <tr>
                <th><span class="red-star">*</span>방문지</th>
                <td>
                    <input id="visitCrm" style="width: 60%;">
                    <input type="hidden" id="crmSn" />
                    <button id="crmBtn" type="button" class="k-button-solid-base k-button" onclick="bustripReq.fn_popCamCrmList()">업체선택</button>
                    <span style="margin-left: 10px;">
                        <input type="checkbox" id="crmYn" name="crmYn" checked onclick="bustripReq.fn_crmChk();"/>
                        <label for="crmYn">CRM 연계</label>
                    </span>
                </td>
                <th class="bustripTh"><span class="red-star">*</span>출장지역</th>
                <td class="bustripTh">
                    <input id="visitLoc" style="width: 75%;" />
                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick="bustripReq.addrSearch();"/>
                </td>

                <th class="businessTh" style="display: none"><span class="red-star">*</span>출장 도시 및 국가</th>
                <td class="businessTh" style="display: none">
                    <input id="nationList" style="width: 75%;" />
                    <span style="margin-left: 3px; color: red" id="nationText"></span>
                </td>
            </tr>
            <tr>
                <th>경유지</th>
                <td>
                    <div style="display: flex">
                        <input id="visitLocCode" style="width: 180px;">
                        <div class="visitMove" style="display: none; margin-left: 10px; margin-top: 5px"><span class="visitMoveSpan"></span></div>
                    </div>
                </td>
                <th class="visitLocSub" style="display: none"><span class="red-star">*</span>경유지명</th>
                <td class="visitLocSub" style="display: none;">
                    <input id="visitLocSub" style="width: 80%;"/>
                </td>
            </tr>
            <tr>
                <th><span class="red-star">*</span>출장일</th>
                <td colspan="3">
                    <input id="date1" style="width: 20%">
                    <input id="time1" style="width: 13%"> ~
                    <input id="date2" style="width: 20%">
                    <input id="time2" style="width: 13%">
                </td>
            </tr>
            <tr id="carLine">

                <th><span class="red-star">*</span>차량</th>
                <td colspan="3">
                    <input id="carList" style="width: 180px;">
                    <span id="inputWrap" style="display: none;"><input type="text" id="carRmk" style="width: 200px;"></span>
                    <input type="button" id="carBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="운행확인" onclick="bustripReq.carViewPop()"/><br>
                </td>
            </tr>
            <tr>
                <th><span class="red-star">*</span>출장목적</th>
                <td colspan="3">
                    <textarea id="bustObj" style="width: 100%; height: 60px"></textarea>
                </td>
            </tr>
            </thead>
        </table>
    </form>
    <div style="margin-bottom: 20px;">
        <form style="padding: 0px 30px;">
            <div class="card-header" style="padding: 5px;">
                <h3 class="card-title">첨부파일</h3>
                <div class="card-options">
                    <div class="filebox">
                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                            <span class="k-button-text">파일첨부</span>
                        </button>
                        <input type="file" id="fileList" name="fileList" onchange="bustrip.addFileInfoTable();" multiple style="display: none"/>
                    </div>
                    <button type="button" class="k-button k-button-solid-base" onclick="bustrip.fn_multiDownload();" style="margin-left: 5px;">일괄 다운로드</button>
                </div>
            </div>
            <div class="table-responsive">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="50%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr class="text-center th-color">
                        <th>파일명</th>
                        <th>확장자</th>
                        <th>용량</th>
                        <th>뷰어</th>
                        <th>기타</th>
                    </tr>
                    </thead>
                    <tbody id="fileGrid">
                    <tr class="defultTr">
                        <td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</div>
<script>
    var hrBizReqId = $("#hrBizReqId").val();
    bustripReq.init();

    function externalDataSet(arr){
        var extName = "";
        var extEtc = "";
        var extSpot = "";
        var extBelong = "";
        for(var i = 0 ; i < arr.length ; i++){
            extName += arr[i].name + ",";
            extEtc += arr[i].etc + ",";
            extSpot += arr[i].spot + ",";
            extBelong += arr[i].belong + ",";
        }

        $("#externalName").val(extName.substring(0,extName.length-1));
        $("#externalEtc").val(extEtc.substring(0,extEtc.length-1));
        $("#externalSpot").val(extSpot.substring(0,extSpot.length-1));
        $("#externalBelong").val(extBelong.substring(0,extBelong.length-1));

    }
</script>
</body>



