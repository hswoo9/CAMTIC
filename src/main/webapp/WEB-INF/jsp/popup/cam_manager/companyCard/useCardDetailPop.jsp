<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>


<link rel="stylesheet" type="text/css" href='/css/pop/contents.css'>
<link rel="stylesheet" type="text/css" href='/css/pop/common.css'>


<!-- 공통팝업 호출 -->

<script type="text/javascript" src ="<c:url value='/js/html2canvas.min.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/es6-promise.auto.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/jspdf.min.js' />"></script>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Camtic-DevJitsu</title>
</head>

<body>
	<div class="pop_wrap creditSlip" id="capture">
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
	<div style="text-align: center;margin-top: 10px;">
		<button id = "download" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
			<span class="k-button-text">내려받기</span>
		</button>
	</div>
</body>
</html>


<script>
	/*	[document.ready] 법인카드 상세내역 문서 준비
	-------------------------------------------------- */
	$(document).ready(function(){

		$("#download").on("click", function() {
			html2canvas(document.querySelector("#capture")).then(function(canvas) {

				// jsPDF 객체 생성 생성자에는 가로, 세로 설정, 페이지 크기 등등 설정할 수 있다. 자세한건 문서 참고. // 현재 파라미터는 기본값이다 굳이 쓰지 않아도 되는데 저것이 기본값이라고 보여준다
				var doc = new jsPDF('p', 'mm', 'a4'); // html2canvas의 canvas를 png로 바꿔준다.
				var imgData = canvas.toDataURL('image/png'); //Image 코드로 뽑아내기 // image 추가
				doc.addImage(imgData, 'PNG', 0, 0, 180, 220); // pdf로 저장
				doc.save(authNum + '.pdf');

			});
		});

		window.resizeTo(448, 508);
		
		var cardNum = '${cardInfo.CARD_NO}';
		var authDate = '${cardInfo.AUTH_DD}';
		var authTime = '${cardInfo.AUTH_HH}';
		var authNum = '${cardInfo.AUTH_NO}';
		<c:set var="search" value="'" />
		<c:set var="replace" value="`" />
		<c:set var="cardTradeName" value="${fn:replace(cardInfo.mercName, search, replace)}"/>
		var ceoNm = '${cardInfo.MER_CEONM}';
		var tradeName = '${cardInfo.MER_NM}';
		var tradeSeq = '${cardInfo.MER_BIZNO}';
		var addr = '${cardInfo.MER_ADR1}';
		var tel = '${cardInfo.MER_TELNO}';
		var georaeStat = '${cardInfo.georaeStat}';
		var stdAmt = '${cardInfo.SUPP_PRICE}';
		var vatAmt = '${cardInfo.SURTAX}';
		var serAmt = '${cardInfo.SVC_AMT}';
		var amt = '${cardInfo.AUTH_AMT}';
		
		var mccName = '${cardInfo.BIZTYPE_NM}';
		if(!mccName){
			$('#tr_mccName').remove();
		}else if(mccName){
			window.resizeTo(445, 600); 
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
	});
	
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