<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/intra/cam_mng/newResolutionSubmitPage.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/common/solarToLunar.js?v=${today}"></script>

<style>

    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
</style>
<body class="font-opensans" style="background-color:#fff;">


<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>
<div class="col-lg-12" style="padding:0;">
	<div class="table-responsive">
		<div class="card-header pop-header">
			<h3 class="card-title title_NM">지급신청서 집행전송</h3>
			<div class="btn-st popButton">
				<button type="button" id="sendBtn" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="newResolutionSubmitPage.fn_send()">전송</button>
<%--				<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="">전송취소</button>--%>
				<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
			</div>
		</div>
		<form id="sendForm" style="padding: 20px 30px;">
            <input type="hidden" id="sendType" name="sendType"  value="${params.type}"/>
			<input type="hidden" name="C_DIKEYCODE" id="C_DIKEYCODE" value="${data.C_DIKEYCODE}" />
			<table class="popTable table table-bordered mb-0">
				<colgroup>
					<col width="13%">
					<col width="37%">
					<col width="13%">
					<col width="37%">
				</colgroup>
				<thead>
				<tr>
					<th>발의자</th>
					<td>
						<input   type="text" id="korNm" style="width:50%;"  value="${data.KOR_NM}"  title="${data.KOR_NM}"readonly name = "KOR_NM" disabled/>
						<input type="hidden" id="empSeq" value='${empSeq}'/>
					</td>
					<th>발의일자</th>
					<td>
						<input   type="text" style="width:70%" id="gisuDt" value='${data.GISU_DT}'  title="${data.GISU_DT}"readonly name = "GISU_DT" disabled/>
					</td>
				</tr>
				<tr>
<%--					<th>발의번호</th>--%>
<%--					<td>--%>
<%--						<input type="text" id="gisuSeq" style="width:30%" value='${data.GISU_SQ}' title="${data.GISU_SQ}" readonly name = "GISU_SQ" disabled/> ---%>
<%--						<input type="text" style="width:30%"  id="BG_SQ" value='${data.BG_SQ}' name = "BG_SQ" readonly disabled/>--%>
<%--						<input type="hidden" id="stateYn" value="${data.KUKGO_STATE == '미전송' ? 'N' : 'Y'}"  name = "KUKGO_STATE_YN"/>--%>
<%--					</td>--%>
					<th>문서번호</th>
					<td colspan="3">
						<input type="text" style="width:35%"  id="docNumber" value='${data.DOC_NUMBER}'  title="${data.DOC_NUMBER}" readonly name="DOC_NUMBER" disabled/>
<%--						<input type="button" id="docView" value='문서보기' />--%>
					</td>
				</tr>

				<tr>
					<th>제목</th>
					<td colspan="3">
						<input type="text"  style="width:75%" id="docTitle"  value="<c:out value='${data.DOC_TITLE}' />" value='${data.DOC_TITLE}' readonly name="DOC_TITLE" disabled/>
					</td>
				</tr>
				<tr>
					<th><span class="red-star">*</span>e나라도움 사업명</th>
					<td colspan="3">
						<input type="text" style="width:75%"  id="kukgoPjtNm" value='${data.KUKGO_PJTNM}' title="${data.KUKGO_PJTNM}" readonly  name="KUKGO_PJTNM" disabled/>
					</td>
				</tr>
				<tr>
<%--					<th>회계단위</th>--%>
<%--					<td>--%>
<%--						<input type="text" style="width:50%"  id="divNm"value='${data.DIV_NM}' title="${data.DIV_NM}" readonly name="DIV_NM" disabled/>--%>
<%--					</td>--%>
					<th>프로젝트</th>
					<td colspan="3">
						<input type="text" id="pjtNm" style="width:75%"  value='${data.PJT_NM}'  title="${data.PJT_NM}" readonly  name="PJT_NM" disabled/>
					</td>
				</tr>
				<tr>
					<th>예산과목</th>
					<td>
						<input type="text" id="abgtNm" style="width:50%" value='${data.ABGT_NM}'   title="${data.ABGT_NM}"readonly  name="ABGT_NM" disabled/>
					</td>
					<th>결제수단</th>
					<td>
						<input type="text" id="setFgNm" style="width:50%" value='${data.SET_FG_NM}'title="${data.SET_FG_NM}"  readonly  name="SET_FG_NM" disabled/>
					</td>
				</tr>
				<tr>
					<th>과세구분</th>
					<td>
						<input type="text" id="vatFgNm" style="width:50%" value='${data.VAT_FG_NM}' title="${data.VAT_FG_NM}" readonly  name="VAT_FG_NM" disabled/>
					</td>
					<th>금액</th>
					<td>
						<input type="text" id="unitAm" style="width:50%" value='${data.UNIT_AM}' title="${data.UNIT_AM}"  readonly  name="UNIT_AM" disabled/>
					</td>
				</tr>
				</thead>
			</table>

			<table class="popTable table table-bordered mb-0" id="userReqPopDetail" style="border-left:none;">
				<colgroup>
					<col width="13%">
					<col width="37%">
					<col width="13%">
					<col width="37%">
				</colgroup>
				<thead>
				<tr>
					<th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">집행 정보</th>
				</tr>
				<tr>
					<th><span class="red-star">*</span>보조세목</th>
					<td>
                        <input type="hidden" id="reqStatSn" name="reqStatSn" />
						<input type="text" id="ASSTN_TAXITM_CODE_NM" name="ASSTN_TAXITM_CODE_NM" value="${dataJson.ASSTN_TAXITM_CODE_NM }" style="width: 80%" disabled value=""  />
                        <input type="hidden" id="payAppDetSn" name="payAppDetSn" value="${params.payAppDetSn }" />
                        <input type="hidden" id="payAppSn" name="payAppSn" value="" />
						<input type="hidden" id="BSNSYEAR" name="BSNSYEAR" value='${dataJson.BSNSYEAR }'/>
						<input type="hidden" id="FILE_ID" name="FILE_ID"  value='${dataJson.FILE_ID }'/>
						<input type="hidden" id="DDTLBZ_ID" name="DDTLBZ_ID"  value='${dataJson.DDTLBZ_ID }'/>
						<input type="hidden" id="EXC_INSTT_ID" name="EXC_INSTT_ID"  value='${dataJson.EXC_INSTT_ID }'/>
                        <input type="hidden" id="PRUF_SE_NO" name="PRUF_SE_NO" value="${dataJson.PRUF_SE_NO }" />
						<!-- 집행정보 반영 -->
                        <input type="hidden" id="EXCUT_CNTC_ID" name="EXCUT_CNTC_ID" value="${dataJson.EXCUT_CNTC_ID }" />
						<input type="hidden" id="BCNC_ACNUT_NO_ENARA" name="BCNC_ACNUT_NO_ENARA" value="" />
						<input type="hidden" id="PJT_CD" name="PJT_CD"  value="${dataJson.PJT_CD }"/>
						<input type="hidden" id="APPLY_DIV" name="APPLY_DIV"  value="${dataJson.APPLY_DIV }"/>
						<input type="hidden" id="INTRFC_ID" name=""  value="${dataJson.INTRFC_ID }"/>
						<input type="hidden" id="EXCUT_TY_SE_CODE" name="EXCUT_TY_SE_CODE"  value="${dataJson.EXCUT_TY_SE_CODE }"/>
						<input type="hidden" id="BCNC_BANK_CODE" name="BCNC_BANK_CODE"  value="${dataJson.BCNC_BANK_CODE }"/>
						<input type="hidden" id="EXCUT_SPLPC" name="EXCUT_SPLPC"  value="${dataJson.EXCUT_SPLPC }"/>
						<input type="hidden" id="EXCUT_VAT" name="EXCUT_VAT"  value="${dataJson.EXCUT_VAT }"/>
						<input type="hidden" id="EXCUT_SUM_AMOUNT" name="EXCUT_SUM_AMOUNT"  value="${dataJson.EXCUT_SUM_AMOUNT }"/>
						<input type="hidden" id="PREPAR" name="PREPAR"  value="${dataJson.PREPAR }"/>
						<input type="hidden" id="EXCUT_EXPITM_TAXITM_CNT" name="EXCUT_EXPITM_TAXITM_CNT"  value="${dataJson.EXCUT_EXPITM_TAXITM_CNT }"/>
						<input type="hidden" id="ASSTN_TAXITM_CODE" name="ASSTN_TAXITM_CODE"  value="${dataJson.ASSTN_TAXITM_CODE }"/>
						<input type="hidden" id="EXCUT_TAXITM_CNTC_ID" name="EXCUT_TAXITM_CNTC_ID"  value="${dataJson.EXCUT_TAXITM_CNTC_ID }"/>
<%--						<input type="hidden" id="FNRSC_SE_CODE" name="FNRSC_SE_CODE"  value="${dataJson.FNRSC_SE_CODE }"/>--%>
						<input type="hidden" id="ACNUT_OWNER_NM" name="ACNUT_OWNER_NM" value="${dataJson.ACNUT_OWNER_NM }"/>

						<input type="hidden" id="ETXBL_CONFM_NO" name="ETXBL_CONFM_NO"  value='${dataJson.ETXBL_CONFM_NO }'/>
						<input type="hidden" id="LN_SQ" name="LN_SQ" value="${dataJson.LN_SQ }" />
						<input type="hidden" id="attachLnSeq" name="attachLnSeq" value="${dataJson.attachLnSeq }" />
						<input type="hidden" id="CO_CD" name="CO_CD"  value="${data.CO_CD}"/>
						<input type="hidden" id="TRNSC_ID_TIME" name="TRNSC_ID_TIME"  value="${dataJson.TRNSC_ID_TIME }"/>
						<input type="hidden" id="TRNSC_ID" name="TRNSC_ID"  value="${dataJson.TRNSC_ID }"/>
						<input type="hidden" id="CNTC_CREAT_DT" name="CNTC_CREAT_DT"  value="${dataJson.CNTC_CREAT_DT }"/>
						<input type="hidden" id="TAXITM_FNRSC_CNT" name="TAXITM_FNRSC_CNT"  value="${dataJson.TAXITM_FNRSC_CNT }"/>

						<input type="hidden" id="KUKGO_STATE_YN" name=""  value="${data.KUKGO_STATE == '미전송' ? 'N' : 'Y'}"/>
						<input type="hidden" id="attachGisuSeq" name="attachGisuSeq"  value=""/>

						<input type="hidden" id="tempFileSeq" name=""  value=""/>
						<input type="hidden" id="tempFileSeq1" name=""  value=""/>
						<input type="hidden" id="tmpGisu" name=""  value=""/>
						<input type="hidden" id="MD_DT" name="MD_DT" style="width: 150px" readonly value="${MD_DT }"  />
					</td>
					<th>집행용도</th>
					<td>
						<input style="width: 80%" type="text" id="EXCUT_PRPOS_CN" name="EXCUT_PRPOS_CN" value="${dataJson.EXCUT_PRPOS_CN }"/>
					</td>
				</tr>
				<tr>
					<th><span class="red-star">*</span>품목</th>
					<td>
						<input style="width: 80%" type="text" id="PRDLST_NM" name="PRDLST_NM" value="${dataJson.PRDLST_NM }"/>
					</td>
					<th><span class="red-star">*</span>증빙유형</th>
					<td>
						<input type="text" style="width: 45%" name="PRUF_SE_CODE" id="PRUF_SE_CODE" onchange="" placeholder="" value=""/>
					</td>
				</tr>
				<tr>
					<th>정산서류 등록</th>
					<td>
<%--						<input type="button" id="attachFile" name="attachFile" onclick="fileRow(this);" value='첨부' />--%>
						<div>
							<button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="newResolutionSubmitPage.fn_regPayAttPop()">첨부파일 확인</button>
							<span id="fileList">첨부파일이 없습니다.</span>
						</div>
					</td>
					<th><span class="red-star">*</span>증빙일자</th>
					<td colspan="3">
						<input type="text" style="width: 45%" id="EXCUT_REQUST_DE" name="EXCUT_REQUST_DE" value="${dataJson.EXCUT_REQUST_DE }"/>
					</td>
				</tr>
				<tr id="prufSeNoWrap" style="display: none;">
					<th><span class="red-star">*</span>증빙구분번호</th>
					<td>
						<input type="text"  style="width: 80%" id="PRUF_SE_NO_TXT" name="PRUF_SE_NO_TXT" disabled />
						<input id="cardBtn" style="display: none;" type="button" class="k-button k-button-solid-base" onclick="newResolutionSubmitPage.fn_cardPuchasRecptnPop();" value="검색" />
					</td>
					<td colspan="2"></td>
				</tr>
				</thead>
			</table>

			<table class="popTable table table-bordered mb-0" style="border-left:none;">
				<colgroup>
					<col width="8%">
					<col width="20%">
					<col width="8%">
					<col width="20%">
					<col width="8%">
					<col width="20%">
				</colgroup>
				<thead>
				<tr>
					<th colspan="6" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">재원정보</th>
				</tr>
				<tr>
					<th>합계금액</th>
					<td>
						<input type="text" id="SUM_AMOUNT" name="SUM_AMOUNT" style="width: 60%;"  value="${dataJson.SUM_AMOUNT }" readonly class= "money" disabled/>
					</td>
					<th>공급가액</th>
					<td>
						<input type="text" id="SPLPC" name="SPLPC" style="width: 60%;"  value="${dataJson.SPLPC }" readonly class= "money" disabled/>
					</td>
					<th>부가세액</th>
					<td>
						<input type="text" id="VAT" name="VAT" style="width: 60%;"  value="${dataJson.VAT }" readonly class= "money" disabled/>
					</td>
				</tr>
				<tr>
					<th>재원구분코드</th>
					<td>
						<input type="text" id="FNRSC_SE_CODE" name="FNRSC_SE_CODE"  value="${dataJson.FNRSC_SE_CODE }"/>
					</td>
					<td colspan="4"></td>
				</tr>
				</thead>
			</table>

			<table class="popTable table table-bordered mb-0" id="userReqPop">
				<colgroup>
					<col width="13%">
					<col width="37%">
					<col width="13%">
					<col width="37%">
				</colgroup>
				<thead>
				<tr>
					<th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">거래처 정보</th>
				</tr>
				<tr>
					<th><span class="red-star">*</span>거래처 구분</th>
					<td>
						<input type="text" id="BCNC_SE_CODE" name="BCNC_SE_CODE" style="width: 50%;"  value="" />
					</td>
					<th><span class="red-star">*</span>거래처명</th>
					<td>
						<input style="width: 50%;" type="text" id="BCNC_CMPNY_NM" name="BCNC_CMPNY_NM" value="${dataJson.BCNC_CMPNY_NM }"/>
					</td>
				</tr>
				<tr>
					<th><span class="red-star">*</span>사업자(주민)<br>등록번호</th>
					<td id="etcValue" colspan="3">
                        <input style="width: 30%;margin-bottom: 3px;" type="text" id="BCNC_LSFT_NO" name="BCNC_LSFT_NO" value="${dataJson.BCNC_LSFT_NO }" oninput="onlyNumber(this)" />
						<span class="red-star" style="margin-left: 5px;">* 숫자만 입력</span>
					</td>
<%--                    <td id="etcValue2" style="display:none" colspan="3">--%>
<%--                        <input style="width: 15%;" type="text" id="PIN_NO_1" style="" name = "PIN_NO_1" maxlength="6" value=""/> - <input style="width: 15%;" type="text" id="PIN_NO_2" name = "PIN_NO_2" maxlength="1" value="******"/>--%>
<%--                    </td>--%>
				</tr>

				<tr>
					<th>대표자명</th>
					<td>
						<input style="width: 50%;" type="text" id="BCNC_RPRSNTV_NM" name="BCNC_RPRSNTV_NM" value="${dataJson.BCNC_RPRSNTV_NM }" />
					</td>
					<th>전화번호</th>
					<td>
						<input style="width: 50%;" type="text" id="BCNC_TELNO" name="BCNC_TELNO" value="${dataJson.BCNC_TELNO }" />
					</td>
				</tr>
				<tr>
					<th>업태</th>
					<td>
						<input type="text" style="width: 50%;" name="BCNC_BIZCND_NM" id="BCNC_BIZCND_NM" onchange="" placeholder="" value="${dataJson.BCNC_BIZCND_NM }"/>
					</td>
					<th>업종</th>
					<td>
						<input type="text" style="width: 50%;" name="BCNC_INDUTY_NM" id="BCNC_INDUTY_NM" onchange="" placeholder="" value="${dataJson.BCNC_INDUTY_NM }"/>
					</td>
				</tr>
				<tr>
					<th>주소</th>
					<td>
						<div>
							<input type="text" style="width: 50%;" id="POST_CD" name="POST_CD" /><input type="button" class="k-button k-button-solid-base" style="margin-left:5px;" onclick="newResolutionSubmitPage.addrSearch();" value="검색">
						</div>
						<div  style="margin-top:5px;">
							<input type="text" style="width: 90%;"  id="BCNC_ADRES" name="BCNC_ADRES" value="${dataJson.BCNC_ADRES }"/>
							<input type="hidden"  id="ADDR_D" name="ADDR_D" />
						</div>
					</td>
					<th><span class="red-star">*</span>은행</th>
					<td>
						<input type="text" style="width: 50%;" id="BCNC_BANK_CODE_NM" disabled name="BCNC_BANK_CODE_NM" value="${dataJson.BCNC_BANK_CODE_NM }" /><img style="margin-left:5px; cursor: pointer;" src="/images/ico/ico_explain.png" onclick="newResolutionSubmitPage.fn_backClick();"/>
                        <input type="hidden" id="tmpBankNm" value="" />
					</td>
				</tr>
				<tr>
					<th><span class="red-star">*</span>계좌번호</th>
					<td>
						<input type="text" style="width: 50%;" id="BCNC_ACNUT_NO" name="BCNC_ACNUT_NO" value="${dataJson.BCNC_ACNUT_NO }"/>
						<span class="red-star" style="margin-left: 5px;">* 숫자만 입력</span>
					</td>
					<th><span class="red-star">*</span>이체구분</th>
					<td>
						<input type="text" style="width: 40%;" id="TRANSFR_ACNUT_SE_CODE" name="TRANSFR_ACNUT_SE_CODE" value="${dataJson.TRANSFR_ACNUT_SE_CODE }"/>
						<input type="text" style="width: 25%;" id="SBSACNT_TRFRSN_CODE" name="SBSACNT_TRFRSN_CODE" value="${dataJson.SBSACNT_TRFRSN_CODE }"/>
						<input type="text" style="width: 25%;" id="SBSACNT_TRFRSN_CN" name="SBSACNT_TRFRSN_CN" value="${dataJson.SBSACNT_TRFRSN_CN }"/>
					</td>
				</tr>
				<tr>
					<th>내통장표시</th>
					<td>
						<input type="text" style="width: 50%;" id="SBSIDY_BNKB_INDICT_CN" name="SBSIDY_BNKB_INDICT_CN" value="${dataJson.SBSIDY_BNKB_INDICT_CN }"/>
					</td>
					<th>받는통장표시</th>
					<td>
						<input type="text" style="width: 50%;" id="BCNC_BNKB_INDICT_CN" name="BCNC_BNKB_INDICT_CN" value="${dataJson.BCNC_BNKB_INDICT_CN }"/>
					</td>
				</tr>
				</thead>
			</table>

			<table class="popTable table table-bordered mb-0" id="">
				<colgroup>
					<col width="13%">
					<col width="37%">
					<col width="13%">
					<col width="37%">
				</colgroup>
				<thead>
				<tr>
					<th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">전송결과</th>
				</tr>
				<tr>
					<td colspan="4" style="text-align: center;">
						<input style="width: 100%;" type="text" id="PROCESS_RESULT_MSSAGE" disabled name="PROCESS_RESULT_MSSAGE" value="${dataJson.PROCESS_RESULT_MSSAGE }" />
					</td>
				</tr>
				</thead>
			</table>
		</form>
	</div>
</div>









<script>
	newResolutionSubmitPage.fn_defaultScript();

	$(document).on('dblclick', '#bankGrid .k-grid-content tr', function(){
		var subPopUpData = $("#bankGrid").data('kendoGrid').dataItem(this);
		//프로젝트
		$('#BCNC_BANK_CODE').val(subPopUpData.CMMN_DETAIL_CODE);
		$('#BCNC_BANK_CODE_NM').val(subPopUpData.CMMN_DETAIL_CODE_NM);

		$('#subPopUp').data("kendoWindow").close();
	});
</script>
</body>
</html>