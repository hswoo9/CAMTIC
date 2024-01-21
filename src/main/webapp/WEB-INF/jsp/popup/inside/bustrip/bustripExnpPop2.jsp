<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    td {
        padding-left: 5px !important;
        padding-right: 5px !important;;
    }
</style>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripExnpPop2.js?v=${today}"></script>
<!-- 공통팝업 호출 -->

<script type="text/javascript" src ="<c:url value='/js/html2canvas.min.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/es6-promise.auto.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/jspdf.min.js' />"></script>
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
<input type="hidden" id="hrBizReqResultId" value="${params.hrBizReqResultId}"/>
<input type="hidden" id="mod" value="${params.mode}"/>
<input type="hidden" id="type" value="${type}"/>
<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">출장 여비정산</h3>
        <div class="btn-st popButton">
            <c:choose>
                <c:when test="${params.mode eq 'mng'}">
                    <input type="button" class="k-button k-button-solid-primary" value="수정" onclick="bustripExnpReq.fn_saveBtn('${params.hrBizReqResultId}', '${type}', '${params.mode}')" />
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:when>
                <c:when test="${rs.EXP_STAT == 100}">
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:when>
                <c:when test="${rs.EXP_STAT != 10}">
                    <input type="button" class="k-button k-button-solid-info" value="저장" onclick="bustripExnpReq.fn_saveBtn('${params.hrBizReqResultId}', '${type}')" />
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:when>
                <c:otherwise>
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:otherwise>
            </c:choose>
        </div>
    </div>
    <form id="inBustripReqPop" style="padding: 20px 30px;">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
        <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
        <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">

        <table class="popTable table table-bordered mb-0" id="bustExnpTb">
            <colgroup>

            </colgroup>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>국내이동교통비</th>
                    <th>숙박비</th>
                    <th>기타</th>
                    <th>합계</th>
                </tr>
            <c:forEach var="list" items="${list}">
                <tr class="addData">
                    <td>
                        <input type="text" id="empName" class="empName" class="defaultVal" value="${list.EMP_NAME}" disabled style="text-align: center">
                        <input type="hidden" id="empSeq" class="empSeq" name="empSeq" class="defaultVal" value="${list.EMP_SEQ}">
                        <input type="hidden" id="hrBizExnpId" class="hrBizExnpId" name="hrBizExnpId" value="${list.HR_BIZ_EXNP_ID}" />
                    </td>
                    <td>
                        <%--<input id="trafCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.TRAF_CORP_YN}">--%>
                        <input type="text" id="trafCost${list.EMP_SEQ}" class="trafCost" value="${list.TRAF_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                    </td>
                    <td>
                        <%--<input id="trafDayCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.TRAF_DAY_CORP_YN}">--%>
                        <input type="text" id="trafDayCost${list.EMP_SEQ}" class="trafDayCost" value="${list.TRAF_DAY_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                    </td>
                    <td>
                        <%--<input id="etcCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.ETC_CORP_YN}">--%>
                        <input type="text" id="etcCost${list.EMP_SEQ}" class="etcCost" value="${list.ETC_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                    </td>
                    <td>
                        <input type="text" id="totalCost${list.EMP_SEQ}" class="totalCost" value="${list.TOT_COST}" disabled />
                    </td>
                </tr>
            </c:forEach>
                <tr class="corpData">
                    <td>
                        <div style="text-align: center">법인</div>
                    </td>
                    <td>
                        <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="bustripExnpReq.fn_popRegDet(3, 2)"></i>
                        <input type="text" id="corp2" class="corpInput"  style="width: 50%;" disabled/>
                        <input type="hidden" id="corpCardNum2" value=""/>
                        <input type="button" class="k-button k-button-solid-info" value="추가" onclick="bustripExnpReq.fn_paymentCardHistory(2)" />
                    </td>
                    <td>
                        <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="bustripExnpReq.fn_popRegDet(3, 3)"></i>
                        <input type="text" id="corp3" class="corpInput" style="width: 50%;" disabled/>
                        <input type="hidden" id="corpCardNum3" value=""/>
                        <input type="button" class="k-button k-button-solid-info" value="추가" onclick="bustripExnpReq.fn_paymentCardHistory(3)" />
                    </td>
                    <td>
                        <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="bustripExnpReq.fn_popRegDet(3, 8)"></i>
                        <input type="text" id="corp8" class="corpInput" style="width: 50%;" disabled/>
                        <input type="hidden" id="corpCardNum8" value=""/>
                        <input type="button" class="k-button k-button-solid-info" value="추가" onclick="bustripExnpReq.fn_paymentCardHistory(8)" />
                    </td>
                    <td>
                        <input type="text" id="corpTotal" class="corpInput" style="width: 100%; text-align: right;" disabled/>
                    </td>
                </tr>
                <tr class="TotalData">
                    <td>
                        <div style="text-align: center">합계</div>
                    </td>
                    <td>
                        <input type="text" id="trafTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="trafDayTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="etcTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="totalTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                </tr>
            </thead>
        </table>
        <table class="popTable table table-bordered mb-0">
            <colgroup>

            </colgroup>
            <thead>
            <tr>
                <th>국내이동교통비</th>
                <th>숙박비</th>
                <th>기타</th>
            </tr>
            <tr>
                <td>
                    <input type="file" id="exnpTraf" multiple style="width: 98%;" />
                    <div id="exnpTrafDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpTrafDay" multiple style="width: 98%;" />
                    <div id="exnpTrafDayDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpEtc" multiple style="width: 98%;" />
                    <div id="exnpEtcDiv">

                    </div>
                </td>
            </tr>
            </thead>
        </table>
    </form>

    <div class="card-header pop-header">
        <h3 class="card-title title_NM">법인카드 사용내역</h3>
        <div class="btn-st popButton">
            <%--<input type="button" class="k-button k-button-solid-info" value="추가" onclick="bustripExnpReq.fn_paymentCardHistory()" />--%>
            <input type="button" class="k-button k-button-solid-error" style="margin-right: 5px" value="삭제" onclick="bustripExnpReq.fn_ardHistoryDel()" />
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

<div class="pop_wrap creditSlip" id="capture" style="display: none; margin-top: 200px">
    <div class="card-header pop_head">
        <h3 class="card-title title_NM"><span style="color: black; margin-left: 11px;">카드승인전표</span>  <!--카드승인전표--></h3>
        <%--			<a href="#n" class="clo"><img src="../../../Images/btn/btn_pop_clo02.png" alt="" /></a>--%>
    </div>

    <div class="pop_con mr25 ml25" style="">
        <div class="com_ta4 bgnth hover_no">
            <table>
                <colgroup>
                    <col width="100"/>
                    <col />
                </colgroup>
                <tr>
                    <td class="ri">카드번호  <!--카드번호--></td>
                    <td class="fwb le" id="cardNum">  </td>
                </tr>
                <tr>
                    <td class="ri">승인일시 <!--승인일시--></td>
                    <td class="fwb le" id="authDate"> </td>
                </tr>
                <tr>
                    <td class="ri">승인번호  <!--승인번호--></td>
                    <td class="fwb le" id="authNum">  </td>
                </tr>
                <tr>
                    <td class="ri">가맹점명  <!--가맹점명--></td>
                    <td class="fwb le" id="tradeName">  </td>
                </tr>
                <tr>
                    <td class="ri">사업자번호  <!--사업자번호--></td>
                    <td class="fwb le" id="tradeSeq">  </td>
                </tr>
                <tr id="tr_mccName">
                    <td class="ri">업종  <!--업종--></td>
                    <td class="fwb le" id="mccName">  </td>
                </tr>
                <tr>
                    <td class="ri">주소  <!--주소--></td>
                    <td class="fwb le lh18 vt" style="height:35px;" id="addr">  </td>
                </tr>
                <tr>
                    <td class="ri">전화번호  <!--전화번호--></td>
                    <td class="fwb le" id="tel">  </td>
                </tr>
                <tr>
                    <td class="ri">공급가액  <!--공급가액--></td>
                    <td class="fwb le" id="stdAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">부가세  <!--부가세--></td>
                    <td class="fwb le" id="vatAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">서비스금액  <!--서비스금액--></td>
                    <td class="fwb le" id="serAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">금액  <!--금액--></td>
                    <td class="fwb le" id="amt">  </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div><!--// pop_con -->
</div><!--// pop_wrap -->
<script>
    const hrBizReqResultId = '${params.hrBizReqResultId}';
    const tripDayFr = '${rs.TRIP_DAY_FR}';
    const tripDayTo = '${rs.TRIP_DAY_TO}';
    const tripNum = '${fn:length(list)}';

    bustripExnpReq.init('${type}');

    let index = 0;

    function cardHistSet(list){
        console.log("list");
        console.log(list);

        let html = '';
        for(let i=0; i<list.length; i++){
            html = '';
            index ++;

            const e = list[i];
            html += '<tr class="cardData">';
            html += '    <input type="hidden" class="cardNo" value="'+e.CARD_NO+'" />';
            html += '    <input type="hidden" class="authDate" value="'+e.AUTH_DD+'" />';
            html += '    <input type="hidden" class="authNum" value="'+e.AUTH_NO+'" />';
            html += '    <input type="hidden" class="authTime" value="'+e.AUTH_HH+'" />';
            html += '    <input type="hidden" class="buySts" value="'+e.BUY_STS+'" />';
            html += '    <input type="hidden" id="fileNo'+index+'" class="fileNo"/>';

            html += '    <td style="text-align: center"><input type="checkbox" name="card" style="position: relative; top: 2px"/></td>';
            html += '    <td>'+e.AUTH_DD.substring(0, 4) + '-' + e.AUTH_DD.substring(4, 6) + '-' + e.AUTH_DD.substring(6, 8)+'</td>';
            html += '    <td>'+e.AUTH_NO+'</td>';
            html += '    <td>'+e.MER_NM+'</td>';
            html += '    <td>'+e.MER_BIZNO.substring(0, 3) + '-' + e.MER_BIZNO.substring(3, 5) + '-' + e.MER_BIZNO.substring(5, 11)+'</td>';
            html += '    <td>'+(e.TR_NM == undefined ? "" : e.TR_NM)+'</td>';
            html += '    <td>'+e.CARD_NO.substring(0,4) + '-' + e.CARD_NO.substring(4,8) + '-' + e.CARD_NO.substring(8,12) + '-' + e.CARD_NO.substring(12,16)+'</td>';
            html += '    <td class="amt" style="text-align: right">'+fn_numberWithCommas(e.AUTH_AMT)+'</td>';
            html += '</tr>';
            $("#detailRow").append(html);
            fn_setCardInfo(e.AUTH_NO, e.AUTH_DD, e.AUTH_HH, e.CARD_NO, e.BUY_STS, index);
        }
    }

    function fn_setCardInfo(authNo, authDate, authTime, cardNo, buySts, index){

        var data = {
            authNo : authNo,
            authDate : authDate,
            authTime : authTime,
            cardNo : cardNo,
            buySts : buySts
        }

        $.ajax({
            url : "/cam_mng/companyCard/useCardDetail",
            data : data,
            type : "post",
            dataType: "json",
            async : false,
            success : function(rs){
                var cardInfo = rs.cardInfo;
                var cardNum = cardInfo.CARD_NO;
                var authDate = cardInfo.AUTH_DD;
                var authTime = cardInfo.AUTH_HH;
                var authNum = cardInfo.AUTH_NO;
                var tradeName = cardInfo.MER_NM;
                var tradeSeq = cardInfo.MER_BIZNO;
                var addr = cardInfo.MER_ADR1;
                var tel = cardInfo.MER_TELNO;
                var georaeStat = cardInfo.georaeStat;
                var stdAmt = cardInfo.SUPP_PRICE;
                var vatAmt = cardInfo.SURTAX;
                var serAmt = cardInfo.SVC_AMT;
                var amt = cardInfo.SUPP_PRICE + cardInfo.SURTAX;

                var mccName = cardInfo.BIZTYPE_NM;
                if(!mccName){
                    $('#tr_mccName').remove();
                }

                $('#cardNum').html(fnGetCardCode(cardNum));
                $('#authDate').html(fnGetAuthDate(authDate, authTime));
                $('#mccName').html(mccName);
                $('#authNum').html(authNum);
                $('#tradeName').html(tradeName);
                $('#tradeSeq').html(tradeSeq);
                $('#addr').html(addr);
                $('#tel').html(tel);

                $('#stdAmt').html( fnGetCurrencyCode( fnMinusAmtCheck(georaeStat, stdAmt), 0 ) );
                $('#vatAmt').html( fnGetCurrencyCode( fnMinusAmtCheck(georaeStat, vatAmt), 0 ) );
                $('#serAmt').html( fnGetCurrencyCode( fnMinusAmtCheck(georaeStat, serAmt), 0 ) );
                $('#amt').html( fnGetCurrencyCode( fnMinusAmtCheck(georaeStat, amt), 0 ) );

                if(georaeStat === '0'){
                    $('#stdAmt, #vatAmt, #serAmt, #amt').css('color', 'red');
                }

                $("#capture").css("display", "");
                html2canvas(document.querySelector("#capture")).then(function(canvas) {

                    // jsPDF 객체 생성 생성자에는 가로, 세로 설정, 페이지 크기 등등 설정할 수 있다. 자세한건 문서 참고. // 현재 파라미터는 기본값이다 굳이 쓰지 않아도 되는데 저것이 기본값이라고 보여준다
                    var doc = new jsPDF('p', 'mm', 'a4'); // html2canvas의 canvas를 png로 바꿔준다.
                    var imgData = canvas.toDataURL('image/png'); //Image 코드로 뽑아내기 // image 추가
                    imgData = imgData.replace("data:image/png;base64,", "");
                    data.imgValue = 'card';
                    data.imgSrc = imgData;
                    data.empSeq = $("#empSeq").val()
                    $.ajax({
                        type : "POST",
                        data : data,
                        dataType : "text",
                        url : "/mng/imgSaveTest",
                        async : false,
                        success : function(data) {
                            var data = JSON.parse(data);
                            var fileNo = data.result.fileNo;

                            $("#fileNo" + index).val(fileNo);
                        },
                        error : function(a, b, c) {
                            alert("error");
                        }
                    });
                });

            }
        });

        $("#capture").css("display", "none");

        corpTotalSet();
    }

    function corpTotalSet(){
        var totalAmt = 0;

        $('.amt').each(function(){
            totalAmt += Number($(this).text().replace(/,/g, ''));
        });

        $("#corpTotal").val(fn_numberWithCommas(totalAmt));
    }

    function fnMinusAmtCheck(georaeStat, amtValue){
        if(georaeStat === '0'){
            /* 승인 취소 건 */
            if(amtValue.indexOf('-') < 0){
                if(Number(amtValue.replace(/,/g, '')) != 0){
                    amtValue = '-' + amtValue;
                }
            }
        }

        return amtValue;
    }

    /*  [공통함수] 날짜 표기 형태 리턴
    Params / 날짜, 시간
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetAuthDate(date, time){
        var authDate = date.replace(/[^0-9]/g,'');
        var authTime = time.replace(/[^0-9]/g,'');

        return authDate.substring(0, 4) + '-'+ authDate.substring(4, 6) + '-'+ authDate.substring(6, 8)
            + ' ' +authTime.substring(0, 2) + ':'+ authTime.substring(2, 4) + ':'+ authTime.substring(4, 6);
    }

    /*  [공통함수] 카드 번호 표기 형태 리턴
    Params / 카드 번호
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetCardCode(val){
        var cardNum = val.replace(/[^0-9]/g,'');
        return cardNum.substring(0, 4) + '-'+ cardNum.substring(4, 8) + '-'+ cardNum.substring(8, 12) + '-'+ cardNum.substring(12, 16);
    }

    /*  [공통함수] 통화 코드 적용
    일천 단위에 통화코드 ','적용.
    Params /
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetCurrencyCode(value, defaultVal) {
        value = '' + value || '';
        value = '' + value.split('.')[0];
        value = value.replace(/[^0-9\-]/g, '') || (defaultVal != undefined ? defaultVal : '0');
        var returnVal = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnVal;
    }

    //카드 선택
    function fn_selCardInfo(trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor, idx){
        $("#corpCardNum" + idx).val(cardBaNb);
        if(trNm != "" && trNm != null && trNm != undefined){
            $("#corp" + idx).val(trNm);
        }else{
            alert("선택한 카드의 카드명이 존재하지 않습니다.");
        }
    }
</script>
</body>
