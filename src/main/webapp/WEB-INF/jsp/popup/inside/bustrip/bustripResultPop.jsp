<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripResultPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/inBustripReqPop.js?v=${today}"></script>
<style>
    .removeDay{
        text-decoration:line-through;
        font-weight:700;
        color:red
    }
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-grid-norecords{
        justify-content: space-around;
    }
    .k-grid tbody tr{
        height: 38px;
    }
    #wptDiv{
        margin: 0 auto;
        width: 100px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
    }
    #wptDiv > label {
        margin : 0
    }
    #timeDiff{
        height: 255px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header" style="padding-top:45px;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <div class="popupTitleSt">
                    출장결과보고 신청
                </div>
                <form id="inBustripReqPop">
                    <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                    <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                    <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                    <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                    <table class="table table-bordered mb-0" id="inBustripReqPopTb">
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
                        <tr>
                            <th><span class="red-star">*</span>운행거리</th>
                            <td colspan="3">
                                <input type="text" id="moveDst" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 10%;"> km
                                <button type="button" class="k-button k-button-solid-base" disabled>거리측정</button>
                                <button type="button" class="k-button k-button-solid-base" disabled>하이패스</button>
                                ID : camtic0, PW : camtic43   하이패스 번호 : 4617-7550-0003-9145
                                [<a href="#">이용방법 보기</a>]
                            </td>
                        </tr>
                        <tr>
                            <th><span class="red-star">*</span>운행자</th>
                            <td>
                                <input type="text" id="realDriver" />
                            </td>
                        </tr>
                        <tr>
                            <th><span class="red-star">*</span>출장결과</th>
                            <td colspan="3">
                                <input type="text" id="result" />
                            </td>
                        </tr>
                        </thead>
                    </table>
                </form>
                <div>
                    <div class="card-header">
                        <h3 class="card-title">첨부파일</h3>
                    </div>
                    <div>
                        <div class="table-responsive">
                            <table class="table table-bordered mb-0">
                                <colgroup>
                                    <col width="50%">
                                    <col width="10%">
                                    <col width="30%">
                                </colgroup>
                                <thead>
                                <tr class="text-center th-color">
                                    <th>파일명</th>
                                    <th>확장자</th>
                                    <th>용량</th>
                                </tr>
                                </thead>
                                <tbody id="fileGrid">
                                <tr class="defultTr">
                                    <td colspan="3" style="text-align: center">선택된 파일이 없습니다.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="btn-st" style="margin-top:10px; text-align:center;">
                <input type="button" class="k-button k-button-solid-info" value="저장" onclick=""/>
                <input type="button" class="k-button k-button-solid-info" value="결재" onclick=""/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick=""/>
            </div>
        </div>
    </div>
</div>
<script>
    inBustripReqPop.init();

    var dataConf = '${params.hrBizReqId}';
    bustripResultPop.init(dataConf);

    if(dataConf != ''){
        inBustripReqPop.setData(dataConf, "result");
    }

    function userMultiSearch() {
        window.open("/common/deptMultiPop.do","조직도","width=750,height=650");
    }
</script>
</body>
