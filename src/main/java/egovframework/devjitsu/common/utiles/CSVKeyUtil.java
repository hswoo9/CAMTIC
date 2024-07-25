package egovframework.devjitsu.common.utiles;

public class CSVKeyUtil {

    // 공통코드 정보(ERP)
    public static final String T_IFS_ERP_CMMN_CODE[] = {
            "CNTC_SN",
            "CNTC_JOB_PROCESS_CODE",
            "INTRFC_ID",
            "TRNSC_ID",
            "FILE_ID",
            "CNTC_CREAT_DT",
            "CNTC_TRGET_SYS_CODE",
            "SYS_SE_CODE",
            "CMMN_CODE",
            "CMMN_CODE_NM",
            "CMMN_CODE_DC",
            "MANAGE_IEM_CN_1",
            "MANAGE_IEM_CN_2",
            "MANAGE_IEM_CN_3",
            "MANAGE_IEM_CN_4",
            "MANAGE_IEM_CN_5"
    };

    public static final String T_IFS_ERP_CMMN_CODE_DETAIL[] = {
            "CNTC_SN",
            "CNTC_JOB_PROCESS_CODE",
            "INTRFC_ID",
            "TRNSC_ID",
            "FILE_ID",
            "CNTC_CREAT_DT",
            "CNTC_TRGET_SYS_CODE",
            "SYS_SE_CODE",
            "CMMN_CODE",
            "CMMN_DETAIL_CODE",
            "CMMN_DETAIL_CODE_NM",
            "CMMN_CODE_DC",
            "INQIRE_ORDR",
            "MANAGE_IEM_CN_1",
            "MANAGE_IEM_CN_2",
            "MANAGE_IEM_CN_3",
            "MANAGE_IEM_CN_4",
            "MANAGE_IEM_CN_5"
    };

	//전자세금계산서 조회(송신)
	public static final String T_IFR_ETXBL_REQUEST_ERP[] = {
			"CNTC_SN" 
			,"CNTC_JOB_PROCESS_CODE" 
			,"INTRFC_ID" 
			,"TRNSC_ID" 
			,"FILE_ID" 
			,"CNTC_CREAT_DT" 
			,"CNTC_TRGET_SYS_CODE" 
			,"BSNSYEAR" 
			,"DDTLBZ_ID" 
			,"EXC_INSTT_ID" 
			,"ETXBL_CONFM_NO"};
	//집행등록요청
	public static final String T_IFR_EXCUT_REQUST_ERP[] = {
			"CNTC_SN"
			,"CNTC_JOB_PROCESS_CODE"
			,"INTRFC_ID"
			,"TRNSC_ID"
			,"FILE_ID"
			,"CNTC_CREAT_DT"
			,"CNTC_TRGET_SYS_CODE"
			,"BSNSYEAR"
			,"DDTLBZ_ID"
			,"EXC_INSTT_ID"
			,"EXCUT_CNTC_ID"
			,"EXCUT_TY_SE_CODE"
			,"PRUF_SE_CODE"
			,"PRUF_SE_NO"
			,"EXCUT_REQUST_DE"
			,"TRANSFR_ACNUT_SE_CODE"
			,"SBSACNT_TRFRSN_CODE"
			,"SBSACNT_TRFRSN_CN"
			,"BCNC_SE_CODE"
			,"BCNC_LSFT_NO"
			,"BCNC_CMPNY_NM"
			,"BCNC_INDUTY_NM"
			,"BCNC_BIZCND_NM"
			,"BCNC_RPRSNTV_NM"
			,"BCNC_ADRES"
			,"BCNC_TELNO"
			,"BCNC_BANK_CODE"
			,"BCNC_ACNUT_NO"
			,"EXCUT_SPLPC"
			,"EXCUT_VAT"
			,"EXCUT_SUM_AMOUNT"
			,"EXCUT_PRPOS_CN"
			,"BCNC_BNKB_INDICT_CN"
			,"SBSIDY_BNKB_INDICT_CN"
			,"PREPAR"
			,"EXCUT_EXPITM_TAXITM_CNT"

	};
	
	//집행등록_비목세목
	public static final String T_IFR_EXCUT_EXPRITM_ERP[] = {
			"CNTC_SN"
			,"CNTC_JOB_PROCESS_CODE"
			,"INTRFC_ID"
			,"TRNSC_ID"
			,"FILE_ID"
			,"CNTC_CREAT_DT"
			,"CNTC_TRGET_SYS_CODE"
			,"EXCUT_CNTC_ID"
			,"ASSTN_TAXITM_CODE"
			,"PRDLST_NM"
			,"EXCUT_TAXITM_CNTC_ID"
			,"TAXITM_FNRSC_CNT"			
	};
	
	//집행등록_비목세목 제원
	public static final String T_IFR_EXCUT_FNRSC_ERP[] = {
			"CNTC_SN"
			,"CNTC_JOB_PROCESS_CODE"
			,"INTRFC_ID"
			,"TRNSC_ID"
			,"FILE_ID"
			,"CNTC_CREAT_DT"
			,"CNTC_TRGET_SYS_CODE"
			,"EXCUT_CNTC_ID"
			,"EXCUT_TAXITM_CNTC_ID"
			,"FNRSC_SE_CODE"
			,"SPLPC"
			,"VAT"
			,"SUM_AMOUNT"
	};
	//집행등록 요청_첨부파일
	public static final String T_IF_INTRFC_FILE[] = {
			"INTRFC_ID"
			,"TRNSC_ID"
			,"FILE_ID"
			,"FILE_SN"
			,"CNTC_FILE_NM"
			,"CNTC_ORG_FILE_NM"
			,"CNTC_CREAT_DT"
	};
}
