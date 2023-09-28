package egovframework.expend.common.vo.batch;

import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.vo.CommonInterface.commonCode;

public class CommonBatchCmsDataVO {

	/* Bizbox Alpha */
	/* Bizbox Alpha - t_ex_card_aq_tmp */
	private String cardNum = commonCode.emptyStr; /* 카드번호 */
	private String authNum = commonCode.emptyStr; /* 승인번호 */
	private String authDate = commonCode.emptyStr; /* 승인일자 */
	private String authTime = commonCode.emptyStr; /* 승인시간 */
	private String georaeColl = commonCode.emptyStr; /* 거래번호 */
	private String georaeStat = commonCode.emptyStr; /* 거래상태 */
	private String georaeCand = commonCode.emptyStr; /* 승인취소일자 */
	private String requestAmount = commonCode.emptySeq; /* 총금액 */
	private String amtAmount = commonCode.emptySeq; /* 공급가액 */
	private String vatAmount = commonCode.emptySeq; /* 부가세액 */
	private String serAmount = commonCode.emptySeq; /* 서비스금액 */
	private String freAmount = commonCode.emptySeq;
	private String amtMdAmount = commonCode.emptySeq; /* 공급가액 */
	private String vatMdAmount = commonCode.emptySeq; /* 부가세액 */
	private String georaeGukga = commonCode.emptyStr; /* 거래국가 */
	private String forAmount = commonCode.emptySeq;
	private String usdAmount = commonCode.emptySeq;
	private String mercName = commonCode.emptyStr; /* 거래처명 */
	private String mercSaupNo = commonCode.emptyStr; /* 거래처사업자등록번호 */
	private String mercAddr = commonCode.emptyStr; /* 거래처주소 */
	private String mercRepr = commonCode.emptyStr; /* 거래처대표자명 */
	private String mercTel = commonCode.emptyStr; /* 거래처연락처 */
	private String mercZip = commonCode.emptyStr; /* 거래처우편번호 */
	private String mccName = commonCode.emptyStr;
	private String mccCode = commonCode.emptyStr;
	private String mccStat = commonCode.emptyStr;
	private String vatStat = commonCode.emptyStr;
	private String gongjeNoChk = commonCode.emptyStr; /* 기본값 : N */
	private String abroad = commonCode.emptyStr; /* 해외사용구분 */ /* 기본값 : A */
	private String editedAction = commonCode.emptyStr; /* 기본값 : "" */
	/* ERPiU */
	private String acctNo = commonCode.emptyStr; /* 카드번호 */
	private String bankCode = commonCode.emptyStr; /* 금융기관 코드 */
	private String tradeDate = commonCode.emptyStr; /* 승인일자 */
	private String tradeTime = commonCode.emptyStr; /* 승인시간 */
	private String seq = commonCode.emptySeq; /* 순번 */
	/* iCUBE */
	/* iCUBE - 하나은행 */
	private String cardNo = commonCode.emptyStr;
	private String apprDate = commonCode.emptyStr;
	private String apprNo = commonCode.emptySeq;
	private String apprAmt = commonCode.emptySeq;
	private String apprSeq = commonCode.emptySeq;
	private String cmsType = commonCode.emptyStr;
	/* private String erpCompSeq = commonCode.emptyStr; */
	/* private String regNb = commonCode.emptyStr; */
	/* private String cmsType = commonCode.emptyStr; */
	/* iCUBE - 기업은행 */
	/* private String erpCompSeq = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String regNb = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String bankCode = commonCode.emptySeq; *//* ERPiU 포함 */
	/* private String cardNo = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* privaet String apprDate=commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* privaet String apprSeq=commonCode.emptySeq; *//* iCUBE - 하나은행 포함 */
	/* private String cmsType = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* iCUBE - 국민은행 */
	/* private String regNb =commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String bankCode = commonCode.emptyStr; *//* ERPiU 포함 */
	/* private String cardNo = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String apprDate = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String apprSeq = commonCode.emptySeq; *//* iCUBE - 하나은행 포함 */
	/* private String cmsType = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* iCUBE - 농협은행 */
	/* private String erpCompSeq = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String regNb = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String bankCode = commonCode.emptyStr; *//* ERPiU 포함 */
	/* private String cardNo = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String apprDate = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String apprSeq = commonCode.emptySeq; *//* iCUBE - 하나은행 포함 */
	/* private String cmsType = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* iCUBE - 신한은행 */
	private String cardSeq = commonCode.emptySeq;
	private String apprBuyDate = commonCode.emptyStr;
	private String apprBuyNbSeq = commonCode.emptySeq;
	/* private String apprDate = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String cmsType = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* iCUBE - 우리은행 */
	/* private String erpCompSeq = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String regNb = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	private String trnxId = commonCode.emptyStr;
	private String ifKey = commonCode.emptyStr;
	private String apprClass = commonCode.emptyStr;
	/* private String cmsType = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String cardNo = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* private String apprNo = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	private String transDate = commonCode.emptyStr;
	/* private String cmsType = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	/* iCUBE - 스마트증빙 */
	/* private String erpCompSeq = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	private String issDt = commonCode.emptyStr;
	private String issSq = commonCode.emptySeq;
	
	private String groupSeq = commonCode.emptySeq; 
	private String DB_NEOS = commonCode.emptySeq;
	private String DB_MOBILE = commonCode.emptySeq;
	private String DB_EDMS = commonCode.emptySeq;

	/* private String cmsType = commonCode.emptyStr; *//* iCUBE - 하나은행 포함 */
	public String getCardNum ( ) {
		return CommonConvert.CommonGetStr(cardNum);
	}

	public void setCardNum ( String cardNum ) {
		this.cardNum = cardNum;
	}

	public String getAuthNum ( ) {
		return CommonConvert.CommonGetStr(authNum);
	}

	public void setAuthNum ( String authNum ) {
		this.authNum = authNum;
	}

	public String getAuthDate ( ) {
		return CommonConvert.CommonGetStr(authDate);
	}

	public void setAuthDate ( String authDate ) {
		this.authDate = authDate;
	}

	public String getAuthTime ( ) {
		return CommonConvert.CommonGetStr(authTime);
	}

	public void setAuthTime ( String authTime ) {
		this.authTime = authTime;
	}

	public String getGeoraeColl ( ) {
		return CommonConvert.CommonGetStr(georaeColl);
	}

	public void setGeoraeColl ( String georaeColl ) {
		this.georaeColl = georaeColl;
	}

	public String getGeoraeStat ( ) {
		return CommonConvert.CommonGetStr(georaeStat);
	}

	public void setGeoraeStat ( String georaeStat ) {
		this.georaeStat = georaeStat;
	}

	public String getGeoraeCand ( ) {
		return CommonConvert.CommonGetStr(georaeCand);
	}

	public void setGeoraeCand ( String georaeCand ) {
		this.georaeCand = georaeCand;
	}

	public String getRequestAmount ( ) {
		return CommonConvert.CommonGetStr(requestAmount);
	}

	public void setRequestAmount ( String requestAmount ) {
		this.requestAmount = requestAmount;
	}

	public String getAmtAmount ( ) {
		return CommonConvert.CommonGetStr(amtAmount);
	}

	public void setAmtAmount ( String amtAmount ) {
		this.amtAmount = amtAmount;
	}

	public String getVatAmount ( ) {
		return CommonConvert.CommonGetStr(vatAmount);
	}

	public void setVatAmount ( String vatAmount ) {
		this.vatAmount = vatAmount;
	}

	public String getSerAmount ( ) {
		return CommonConvert.CommonGetStr(serAmount);
	}

	public void setSerAmount ( String serAmount ) {
		this.serAmount = serAmount;
	}

	public String getFreAmount ( ) {
		return CommonConvert.CommonGetStr(freAmount);
	}

	public void setFreAmount ( String freAmount ) {
		this.freAmount = freAmount;
	}

	public String getAmtMdAmount ( ) {
		return CommonConvert.CommonGetStr(amtMdAmount);
	}

	public void setAmtMdAmount ( String amtMdAmount ) {
		this.amtMdAmount = amtMdAmount;
	}

	public String getVatMdAmount ( ) {
		return CommonConvert.CommonGetStr(vatMdAmount);
	}

	public void setVatMdAmount ( String vatMdAmount ) {
		this.vatMdAmount = vatMdAmount;
	}

	public String getGeoraeGukga ( ) {
		return CommonConvert.CommonGetStr(georaeGukga);
	}

	public void setGeoraeGukga ( String georaeGukga ) {
		this.georaeGukga = georaeGukga;
	}

	public String getForAmount ( ) {
		return CommonConvert.CommonGetStr(forAmount);
	}

	public void setForAmount ( String forAmount ) {
		this.forAmount = forAmount;
	}

	public String getUsdAmount ( ) {
		return CommonConvert.CommonGetStr(usdAmount);
	}

	public void setUsdAmount ( String usdAmount ) {
		this.usdAmount = usdAmount;
	}

	public String getMercName ( ) {
		return CommonConvert.CommonGetStr(mercName);
	}

	public void setMercName ( String mercName ) {
		this.mercName = mercName;
	}

	public String getMercSaupNo ( ) {
		return CommonConvert.CommonGetStr(mercSaupNo);
	}

	public void setMercSaupNo ( String mercSaupNo ) {
		this.mercSaupNo = mercSaupNo;
	}

	public String getMercAddr ( ) {
		return CommonConvert.CommonGetStr(mercAddr);
	}

	public void setMercAddr ( String mercAddr ) {
		this.mercAddr = mercAddr;
	}

	public String getMercRepr ( ) {
		return CommonConvert.CommonGetStr(mercRepr);
	}

	public void setMercRepr ( String mercRepr ) {
		this.mercRepr = mercRepr;
	}

	public String getMercTel ( ) {
		return CommonConvert.CommonGetStr(mercTel);
	}

	public void setMercTel ( String mercTel ) {
		this.mercTel = mercTel;
	}

	public String getMercZip ( ) {
		return CommonConvert.CommonGetStr(mercZip);
	}

	public void setMercZip ( String mercZip ) {
		this.mercZip = mercZip;
	}

	public String getMccName ( ) {
		return CommonConvert.CommonGetStr(mccName);
	}

	public void setMccName ( String mccName ) {
		this.mccName = mccName;
	}

	public String getMccCode ( ) {
		return CommonConvert.CommonGetStr(mccCode);
	}

	public void setMccCode ( String mccCode ) {
		this.mccCode = mccCode;
	}

	public String getMccStat ( ) {
		return CommonConvert.CommonGetStr(mccStat);
	}

	public void setMccStat ( String mccStat ) {
		this.mccStat = mccStat;
	}

	public String getVatStat ( ) {
		return CommonConvert.CommonGetStr(vatStat);
	}

	public void setVatStat ( String vatStat ) {
		this.vatStat = vatStat;
	}

	public String getGongjeNoChk ( ) {
		return CommonConvert.CommonGetStr(gongjeNoChk);
	}

	public void setGongjeNoChk ( String gongjeNoChk ) {
		this.gongjeNoChk = gongjeNoChk;
	}

	public String getAbroad ( ) {
		return CommonConvert.CommonGetStr(abroad);
	}

	public void setAbroad ( String abroad ) {
		this.abroad = abroad;
	}

	public String getEditedAction ( ) {
		return CommonConvert.CommonGetStr(editedAction);
	}

	public void setEditedAction ( String editedAction ) {
		this.editedAction = editedAction;
	}

	public String getAcctNo ( ) {
		return CommonConvert.CommonGetStr(acctNo);
	}

	public void setAcctNo ( String acctNo ) {
		this.acctNo = acctNo;
	}

	public String getBankCode ( ) {
		return CommonConvert.CommonGetStr(bankCode);
	}

	public void setBankCode ( String bankCode ) {
		this.bankCode = bankCode;
	}

	public String getTradeDate ( ) {
		return CommonConvert.CommonGetStr(tradeDate);
	}

	public void setTradeDate ( String tradeDate ) {
		this.tradeDate = tradeDate;
	}

	public String getTradeTime ( ) {
		return CommonConvert.CommonGetStr(tradeTime);
	}

	public void setTradeTime ( String tradeTime ) {
		this.tradeTime = tradeTime;
	}

	public String getSeq ( ) {
		return CommonConvert.CommonGetStr(seq);
	}

	public void setSeq ( String seq ) {
		this.seq = seq;
	}

	public String getCardNo ( ) {
		return CommonConvert.CommonGetStr(cardNo);
	}

	public void setCardNo ( String cardNo ) {
		this.cardNo = cardNo;
	}

	public String getApprDate ( ) {
		return CommonConvert.CommonGetStr(apprDate);
	}

	public void setApprDate ( String apprDate ) {
		this.apprDate = apprDate;
	}

	public String getApprNo ( ) {
		return CommonConvert.CommonGetStr(apprNo);
	}

	public void setApprNo ( String apprNo ) {
		this.apprNo = apprNo;
	}

	public String getApprAmt ( ) {
		return CommonConvert.CommonGetStr(apprAmt);
	}

	public void setApprAmt ( String apprAmt ) {
		this.apprAmt = apprAmt;
	}

	public String getApprSeq ( ) {
		return CommonConvert.CommonGetStr(apprSeq);
	}

	public void setApprSeq ( String apprSeq ) {
		this.apprSeq = apprSeq;
	}

	public String getCmsType ( ) {
		return CommonConvert.CommonGetStr(cmsType);
	}

	public void setCmsType ( String cmsType ) {
		this.cmsType = cmsType;
	}

	public String getCardSeq ( ) {
		return CommonConvert.CommonGetStr(cardSeq);
	}

	public void setCardSeq ( String cardSeq ) {
		this.cardSeq = cardSeq;
	}

	public String getApprBuyDate ( ) {
		return CommonConvert.CommonGetStr(apprBuyDate);
	}

	public void setApprBuyDate ( String apprBuyDate ) {
		this.apprBuyDate = apprBuyDate;
	}

	public String getApprBuyNbSeq ( ) {
		return CommonConvert.CommonGetStr(apprBuyNbSeq);
	}

	public void setApprBuyNbSeq ( String apprBuyNbSeq ) {
		this.apprBuyNbSeq = apprBuyNbSeq;
	}

	public String getTrnxId ( ) {
		return CommonConvert.CommonGetStr(trnxId);
	}

	public void setTrnxId ( String trnxId ) {
		this.trnxId = trnxId;
	}

	public String getIfKey ( ) {
		return CommonConvert.CommonGetStr(ifKey);
	}

	public void setIfKey ( String ifKey ) {
		this.ifKey = ifKey;
	}

	public String getApprClass ( ) {
		return CommonConvert.CommonGetStr(apprClass);
	}

	public void setApprClass ( String apprClass ) {
		this.apprClass = apprClass;
	}

	public String getTransDate ( ) {
		return CommonConvert.CommonGetStr(transDate);
	}

	public void setTransDate ( String transDate ) {
		this.transDate = transDate;
	}

	public String getIssDt ( ) {
		return CommonConvert.CommonGetStr(issDt);
	}

	public void setIssDt ( String issDt ) {
		this.issDt = issDt;
	}

	public String getIssSq ( ) {
		return CommonConvert.CommonGetStr(issSq);
	}

	public void setIssSq ( String issSq ) {
		this.issSq = issSq;
	}

	public String getGroupSeq() {
		return groupSeq;
	}

	public void setGroupSeq(String groupSeq) {
		this.groupSeq = groupSeq;
	}

	public String getDB_NEOS ( ) {
		return CommonConvert.CommonGetStr(DB_NEOS);
	}

	public void setDB_NEOS ( String dB_NEOS ) {
		DB_NEOS = dB_NEOS + ".";
	}

	public String getDB_MOBILE ( ) {
		return CommonConvert.CommonGetStr(DB_MOBILE);
	}

	public void setDB_MOBILE ( String dB_MOBILE ) {
		DB_MOBILE = dB_MOBILE + ".";
	}

	public String getDB_EDMS ( ) {
		return CommonConvert.CommonGetStr(DB_EDMS);
	}

	public void setDB_EDMS ( String dB_EDMS ) {
		DB_EDMS = dB_EDMS + ".";
	}

	@Override
	public String toString ( ) {
		return "CommonBatchCmsDataVO [cardNum=" + cardNum + ", authNum=" + authNum + ", authDate=" + authDate + ", authTime=" + authTime + ", georaeColl=" + georaeColl + ", georaeStat=" + georaeStat + ", georaeCand=" + georaeCand + ", requestAmount=" + requestAmount + ", amtAmount=" + amtAmount + ", vatAmount=" + vatAmount + ", serAmount=" + serAmount + ", freAmount=" + freAmount + ", amtMdAmount=" + amtMdAmount + ", vatMdAmount=" + vatMdAmount + ", georaeGukga=" + georaeGukga + ", forAmount=" + forAmount + ", usdAmount=" + usdAmount + ", mercName=" + mercName + ", mercSaupNo=" + mercSaupNo + ", mercAddr=" + mercAddr + ", mercRepr=" + mercRepr + ", mercTel=" + mercTel + ", mercZip=" + mercZip + ", mccName=" + mccName + ", mccCode=" + mccCode + ", mccStat=" + mccStat + ", vatStat=" + vatStat + ", gongjeNoChk=" + gongjeNoChk + ", abroad=" + abroad + ", editedAction=" + editedAction + ", acctNo=" + acctNo + ", bankCode=" + bankCode + ", tradeDate=" + tradeDate + ", tradeTime="
				+ tradeTime + ", seq=" + seq + ", cardNo=" + cardNo + ", apprDate=" + apprDate + ", apprNo=" + apprNo + ", apprAmt=" + apprAmt + ", apprSeq=" + apprSeq + ", cmsType=" + cmsType + ", cardSeq=" + cardSeq + ", apprBuyDate=" + apprBuyDate + ", apprBuyNbSeq=" + apprBuyNbSeq + ", trnxId=" + trnxId + ", ifKey=" + ifKey + ", apprClass=" + apprClass + ", transDate=" + transDate + ", issDt=" + issDt + ", issSq=" + issSq + ", DB_NEOS=" + DB_NEOS + ", DB_MOBILE=" + DB_MOBILE + ", DB_EDMS=" + DB_EDMS + "]";
	}
}
