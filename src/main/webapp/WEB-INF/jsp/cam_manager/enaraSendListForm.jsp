<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/enaraSendList.js?v=${today}'/>"></script>

<style>
    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div:not(#spinnerContent) { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner #spinnerContent  { background: white; padding: 1em; border-radius: .7em; }
</style>

<div id='my-spinner'>
    <div>
        <span>
            <div id="spinnerContent" style="width: 6%;margin: 0 auto;">
                <img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'><br>
                <b style="font-size: 18px;color:black" id="doneCnt"></b>
                <b style="font-size: 18px;color:black">/</b>
                <b style="font-size: 18px;color:black" id="totalCnt"></b>
            </div>
        </span>
    </div>
</div>
<script>
    enaraSendList.fn_defaultScript();
</script>
<form id="sendForm" style="display: none">
    <input name="C_DIKEYCODE" id="C_DIKEYCODE" value="">
    <input name="reqStatSn" id="reqStatSn" value="">
    <input name="payAppDetSn" id="payAppDetSn" value="">
    <input name="payAppSn" id="payAppSn" value="">
    <input name="BSNSYEAR" id="BSNSYEAR" value="">
    <input name="FILE_ID" id="FILE_ID" value="">
    <input name="DDTLBZ_ID" id="DDTLBZ_ID" value="">
    <input name="EXC_INSTT_ID" id="EXC_INSTT_ID" value="">
    <input name="PRUF_SE_NO" id="PRUF_SE_NO" value="">
    <input name="EXCUT_CNTC_ID" id="EXCUT_CNTC_ID" value="">
    <input name="BCNC_ACNUT_NO_ENARA" id="BCNC_ACNUT_NO_ENARA" value="">
    <input name="PJT_CD" id="PJT_CD" value="">
    <input name="APPLY_DIV" id="APPLY_DIV" value="">
    <input name="EXCUT_TY_SE_CODE" id="EXCUT_TY_SE_CODE" value="">
    <input name="BCNC_BANK_CODE" id="BCNC_BANK_CODE" value="">
    <input name="EXCUT_SPLPC" id="EXCUT_SPLPC" value="">
    <input name="EXCUT_VAT" id="EXCUT_VAT" value="">
    <input name="EXCUT_SUM_AMOUNT" id="EXCUT_SUM_AMOUNT" value="">
    <input name="PREPAR" id="PREPAR" value="">
    <input name="EXCUT_EXPITM_TAXITM_CNT" id="EXCUT_EXPITM_TAXITM_CNT" value="">
    <input name="ASSTN_TAXITM_CODE" id="ASSTN_TAXITM_CODE" value="">
    <input name="EXCUT_TAXITM_CNTC_ID" id="EXCUT_TAXITM_CNTC_ID" value="">
    <input name="ACNUT_OWNER_NM" id="ACNUT_OWNER_NM" value="">
    <input name="ETXBL_CONFM_NO" id="ETXBL_CONFM_NO" value="">
    <input name="LN_SQ" id="LN_SQ" value="">
    <input name="attachLnSeq" id="attachLnSeq" value="">
    <input name="CO_CD" id="CO_CD" value="">
    <input name="TRNSC_ID_TIME" id="TRNSC_ID_TIME" value="">
    <input name="TRNSC_ID" id="TRNSC_ID" value="">
    <input name="CNTC_CREAT_DT" id="CNTC_CREAT_DT" value="">
    <input name="TAXITM_FNRSC_CNT" id="TAXITM_FNRSC_CNT" value="">
    <input name="attachGisuSeq" id="attachGisuSeq" value="">
    <input name="MD_DT" id="MD_DT" value="">
    <input name="EXCUT_PRPOS_CN" id="EXCUT_PRPOS_CN" value="">
    <input name="PRDLST_NM" id="PRDLST_NM" value="">
    <input name="PRUF_SE_CODE" id="PRUF_SE_CODE" value="">
    <input name="EXCUT_REQUST_DE" id="EXCUT_REQUST_DE" value="">
    <input name="FNRSC_SE_CODE" id="FNRSC_SE_CODE" value="">
    <input name="BCNC_SE_CODE" id="BCNC_SE_CODE" value="">
    <input name="BCNC_CMPNY_NM" id="BCNC_CMPNY_NM" value="">
    <input name="BCNC_LSFT_NO" id="BCNC_LSFT_NO" value="">
    <input name="BCNC_RPRSNTV_NM" id="BCNC_RPRSNTV_NM" value="">
    <input name="BCNC_TELNO" id="BCNC_TELNO" value="">
    <input name="BCNC_BIZCND_NM" id="BCNC_BIZCND_NM" value="">
    <input name="BCNC_INDUTY_NM" id="BCNC_INDUTY_NM" value="">
    <input name="POST_CD" id="POST_CD" value="">
    <input name="BCNC_ADRES" id="BCNC_ADRES" value="">
    <input name="ADDR_D" id="ADDR_D" value="">
    <input name="BCNC_ACNUT_NO" id="BCNC_ACNUT_NO" value="">
    <input name="TRANSFR_ACNUT_SE_CODE" id="TRANSFR_ACNUT_SE_CODE" value="">
    <input name="SBSACNT_TRFRSN_CODE" id="SBSACNT_TRFRSN_CODE" value="">
    <input name="SBSACNT_TRFRSN_CN" id="SBSACNT_TRFRSN_CN" value="">
    <input name="SBSIDY_BNKB_INDICT_CN" id="SBSIDY_BNKB_INDICT_CN" value="">
    <input name="BCNC_BNKB_INDICT_CN" id="BCNC_BNKB_INDICT_CN" value="">
</form>