<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/document/snackPop.js?v=${today}"/></script>
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
<input type="hidden" id="snackInfoSn" value="${snackInfoSn}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">식대 사용 등록</h3>
            <div class="btn-st popButton">
                <c:choose>
                    <c:when test="${status == null}">
                        <button type="button" class="k-button k-button-solid-info" onclick="snackReq.saveBtn();">저장</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">취소</button>
                    </c:when>
                    <c:when test="${status == 0 && params.mode eq 'infoPop'}">
                        <button type="button" class="k-button k-button-solid-info" onclick="snackReq.saveBtn();">수정</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">취소</button>
                    </c:when>
                    <c:when test="${status == 10 && params.mode eq 'mng'}">
                        <button type="button" class="k-button k-button-md k-button-solid-info" onclick="snackReq.fn_snackCertReq(100)">승인</button>
                        <button type="button" class="k-button k-button-md k-button-solid-error" onclick="snackReq.fn_snackCertReq(30)">반려</button>
                    </c:when>
                    <c:when test="${status == 100}">
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="snackReq.snackPrintPop();">증빙양식 출력</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </c:when>
                    <c:otherwise>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
        <form id="table-responsive" style="padding: 20px 30px;">
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
                    <span class="red-star">*</span>이용 일시
                </th>
                <td>
                    <input id="useDt" type="date" style="width: 50%;"> <input id="useHour" type="text" style="width: 40px;" maxlength="2" oninput="onlyNumber(this);">시 <input id="useMin" type="text" style="width: 40px;" maxlength="2" oninput="onlyNumber(this);">분
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>식대 구분
                </th>
                <td colspan>
                    <input type="text" id="snackType" style="width: 100%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>이용자
                </th>
                <td>
                    <input type="text" id="userText" style="width: 65%;">
                    <input type="hidden" id="userSn" style="width: 65%;">
                    <button type="button" id="userMultiSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="fn_userMultiSelectPop();">
                        직원선택
                    </button>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>결제 구분
                </th>
                <td colspan>
                    <input type="text" id="payType" style="width: 100%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>거래확인 서류 수령자
                </th>
                <td>
                    <input type="text" id="chargeUser" style="width: 100%;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>법인카드
                </th>
                <td>
                    <input type="text" id="corporCard" style="width: 75%; text-align: right;">
                    <button type="button" id="cardSearch" disabled class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:20%; height:27px; line-height:0;" onclick="">
                        검색
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>주문처
                </th>
                <td colspan>
                    <input type="text" id="areaName" style="width: 65%;">
                    <button type="button" id="restaurantSearch" disabled class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="">
                        음식점 선택
                    </button>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>이용 금액
                </th>
                <td>
                    <input type="text" id="usAmount" style="width: 90%; text-align: right;" oninput="onlyNumber(this)"> 원
                </td>
            </tr>
            <tr style="display:none;" id="amtTr">
                <th><span class="red-star"></span>이용금액 상세</th>
                <td id="amtTd" colspan="3">

                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>이용 사유
                </th>
                <td colspan="3">
                    <textarea type="text" id="useReason" style="width: 100%;"></textarea>
                </td>
            </tr>
            </thead>
        </table>
        </form>
        <div>
            <form style="padding: 0px 30px;">
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title"><span class="red-star">*</span>영수증</h3>
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
                <div class="table-responsive">
                    <table class="popTable table table-bordered mb-0">
                        <colgroup>
                            <col width="50%">
                        </colgroup>
                        <thead>
                        <tr class="text-center th-color">
                            <th>파일명</th>
                            <th>확장자</th>
                            <th>용량</th>
                            <th class="resultTh">기타</th>
                        </tr>
                        </thead>
                        <tbody id="fileGrid">
                        <tr class="defultTr">
                            <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    </div>

    <div class="card-header pop-header" style="margin-top: 15px">
        <h3 class="card-title title_NM">법인카드 사용내역</h3>
        <div class="btn-st popButton">
            <input type="button" class="k-button k-button-solid-info" value="추가" onclick="snackReq.fn_paymentCardHistory()" />
            <input type="button" class="k-button k-button-solid-error" style="margin-right: 5px" value="삭제" onclick="snackReq.fn_ardHistoryDel()" />
        </div>
    </div>

    <form id="hist" style="padding: 20px 30px;">
        <div class="table-responsive detail">
            <table class="teamGrid popTable table table-bordered mb-0" style="margin-top: 0px">
                <colgroup>
                    <col width="4%">
                    <col width="15%">
                    <col width="10%">
                    <col width="17%">
                    <col width="11%">
                    <col width="18%">
                    <col width="15%">
                    <col width="10%">
                </colgroup>
                <thead id="detailRow">
                <tr>
                    <th><input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll('checkAll', 'card');"/></th>
                    <th>승인일자</th>
                    <th>승인번호</th>
                    <th>사용처</th>
                    <th>사업자번호</th>
                    <th>카드명</th>
                    <th>카드번호</th>
                    <th>금액</th>
                </tr>
                </thead>
            </table>
        </div>
    </form>
</div>


<script>
    let snackData = {};
    <c:if test="${flag eq 'true'}">
        snackData = JSON.parse('${data}');
    </c:if>
    snackReq.init(snackData);


    function cardHistSet(list){
        console.log("list");
        console.log(list);

        let html = '';
        for(let i=0; i<list.length; i++){
            const e = list[i];
            html += '<tr class="cardData">';
            html += '    <input type="hidden" class="cardNo" value="'+e.CARD_NO+'" />';
            html += '    <input type="hidden" class="authDate" value="'+e.AUTH_DD+'" />';
            html += '    <input type="hidden" class="authNum" value="'+e.AUTH_NO+'" />';
            html += '    <input type="hidden" class="authTime" value="'+e.AUTH_HH+'" />';
            html += '    <input type="hidden" class="buySts" value="'+e.BUY_STS+'" />';

            html += '    <td style="text-align: center"><input type="checkbox" name="card" style="position: relative; top: 2px"/></td>';
            html += '    <td>'+e.AUTH_DD.substring(0, 4) + '-' + e.AUTH_DD.substring(4, 6) + '-' + e.AUTH_DD.substring(6, 8)+'</td>';
            html += '    <td>'+e.AUTH_NO+'</td>';
            html += '    <td>'+e.MER_NM+'</td>';
            html += '    <td>'+e.MER_BIZNO.substring(0, 3) + '-' + e.MER_BIZNO.substring(3, 5) + '-' + e.MER_BIZNO.substring(5, 11)+'</td>';
            html += '    <td>'+(e.TR_NM == undefined ? "" : e.TR_NM)+'</td>';
            html += '    <td>'+e.CARD_NO.substring(0,4) + '-' + e.CARD_NO.substring(4,8) + '-' + e.CARD_NO.substring(8,12) + '-' + e.CARD_NO.substring(12,16)+'</td>';
            html += '    <td style="text-align: right">'+fn_numberWithCommas(e.AUTH_AMT)+'</td>';
            html += '</tr>';
        }

        $("#detailRow").append(html);
    }
</script>
</body>
</html>