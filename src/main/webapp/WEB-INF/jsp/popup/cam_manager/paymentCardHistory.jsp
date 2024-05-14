<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/paymentCardHistory.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/paymentDetView.js?v=${today}'/>"></script>

<link rel="stylesheet" type="text/css" href='/css/pop/contents.css'>
<link rel="stylesheet" type="text/css" href='/css/pop/common.css'>


<!-- 공통팝업 호출 -->

<script type="text/javascript" src ="<c:url value='/js/html2canvas.min.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/es6-promise.auto.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/jspdf.min.js' />"></script>

<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }

    input[type="text"] {
        border : 0px !important;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="type" value="${params.type}" />
<input type="hidden" id="index" value="${params.index}" />
<input type="hidden" id="paySetting" value="${params.paySetting}" />

<input type="hidden" id="reqType" value="${params.reqType}" />

<input type="hidden" id="exnpType" value="${params.exnpType}" />

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    카드사용내역
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 13px;">
            <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="payCardHist.fn_selectCard()">반영</button>

            <!-- 출장전용 버튼  -->
            <button type="button" id="saveBtnBustrip" class="k-button k-button-solid-info" style="display: none" onclick="payCardHist.fn_selectCardBustrip()">반영</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <span style="margin-right: 10px">
            <b style="font-size: 12px">승인일시</b>
            <input id="startDt" style="width: 150px"> ~ <input id="endDt" style="width: 150px">
        </span>
        <span>
            <b style="font-size: 12px">카드정보</b>
            <input id="searchValue" style="width: 20%;">
<%--            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="cardSelBtn" onclick="payCardHist.gridReload()">선택</button>--%>
            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="bnkSelBtn" onclick="payCardHist.fn_search()" onkeypress="if(window.event.keyCode==13){payCardHist.fn_search()}">검색</button>
        </span>
        <span>
            <b style="font-size: 12px; margin-right: 5px; margin-left: 5px">조회</b>
            <button type="button" id="cardM" class="k-button k-button-solid-info" onclick="payCardHist.cardMainGridReload('M')">법인카드</button>
            <button type="button" id="cardP" class="k-button k-button-solid-base" onclick="payCardHist.cardMainGridReload('P')">개인카드</button>

            <%--<input type="radio" name="radio" value="A" id="radio1" onclick="payCardHist.gridReload()" checked><label for="radio1" style="position: relative; top : 4px;">카드사용내역</label>
            <input type="radio" name="radio" value="M" id="radio2" onclick="payCardHist.cardMainGridReload('M')"><label for="radio2" style="position: relative; top : 4px;">법인카드</label>
            <input type="radio" name="radio" value="P" id="radio3" onclick="payCardHist.cardMainGridReload('P')"><label for="radio3" style="position: relative; top : 4px;">개인카드</label>--%>
        </span>
        <div id="mainGrid" style="margin-top:12px"></div>
        <div id="cardMainGrid" style="margin-top:12px; display: none"></div>
        <div id="cardMainGrid2" style="margin-top:12px; display: none"></div>
    </div>
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
                    <td class="ri">대표자명  <!--대표자명--></td>
                    <td class="fwb le" id="ceoNm">  </td>
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

<input type="hidden" id="requestType" value="${params.requestType}" />
<input type="hidden" id="cardBaNb" value="${params.cardBaNb}" />
<input type="hidden" id="corpType" value="${params.corpType}" />
<script>
    payCardHist.fn_defaultScript();

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
                <%--                <c:set var="search" value="'" />--%>
                <%--                <c:set var="replace" value="`" />--%>
                <%--                <c:set var="cardTradeName" value="${fn:replace(cardInfo.mercName, search, replace)}"/>--%>
                var ceoNm = cardInfo.MER_CEONM;
                var tradeName = cardInfo.MER_NM;
                var tradeSeq = cardInfo.MER_BIZNO;
                var addr = cardInfo.MER_ADR1;
                var tel = cardInfo.MER_TELNO;
                var georaeStat = cardInfo.georaeStat;
                var stdAmt = cardInfo.SUPP_PRICE;
                var vatAmt = cardInfo.SURTAX;
                var serAmt = cardInfo.SVC_AMT;
                var amt = cardInfo.AUTH_AMT;

                var mccName = cardInfo.BIZTYPE_NM;
                if(!mccName){
                    $('#tr_mccName').remove();
                } else if(mccName){
                    // window.resizeTo(445, 600);
                }

                $('#cardNum').html(fnGetCardCode(cardNum));
                $('#authDate').html(fnGetAuthDate(authDate, authTime));
                $('#mccName').html(mccName);
                $('#authNum').html(authNum);
                $('#ceoNm').html(ceoNm);
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

                            opener.parent.$("#fileNo" + index).val(fileNo);

                            alert("반영되었습니다.");

                            if($("#paySetting").val() == "Y" && opener.parent.$(".payTr").length == 1){
                                var openerAmt = uncommaN(opener.parent.$("#reqAmt0").val());
                                opener.parent.$("#reqAmt0").val(comma(Number(openerAmt) + Number(amt)));
                            }


                            window.close();

                        },
                        error : function(a, b, c) {
                            alert("error");
                        }
                    });
                });

            }
        });
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
</script>