package egovframework.expend.common.vo.batch;

import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.vo.CommonInterface.commonCode;

public class CommonBatchCmsConfigVO {

	public String compSeq = commonCode.emptySeq;
	public String cmsSyncYN = commonCode.emptyNo;
	public String cmsBatchYN = commonCode.emptyNo;
	public String cmsProcessYN = commonCode.emptyNo;
	public String customYN = commonCode.emptyNo;
	public String cmsBaseDate = commonCode.emptyStr;
	public String cmsBaseDay = commonCode.emptySeq;
	public String serverIp = commonCode.emptyStr;
	public String modifyDate = commonCode.emptyStr;
	
	public String getCompSeq ( ) {
		return CommonConvert.CommonGetStr(compSeq);
	}

	public void setCompSeq ( String compSeq ) {
		this.compSeq = compSeq;
	}

	public String getCmsSyncYN ( ) {
		return CommonConvert.CommonGetStr(cmsSyncYN);
	}

	public void setCmsSyncYN ( String cmsSyncYN ) {
		this.cmsSyncYN = cmsSyncYN;
	}

	public String getCmsBatchYN ( ) {
		return CommonConvert.CommonGetStr(cmsBatchYN);
	}

	public void setCmsBatchYN ( String cmsBatchYN ) {
		this.cmsBatchYN = cmsBatchYN;
	}

	public String getCmsProcessYN ( ) {
		return CommonConvert.CommonGetStr(cmsProcessYN);
	}

	public void setCmsProcessYN ( String cmsProcessYN ) {
		this.cmsProcessYN = cmsProcessYN;
	}

	public String getCustomYN ( ) {
		return CommonConvert.CommonGetStr(customYN);
	}

	public void setCustomYN ( String customYN ) {
		this.customYN = customYN;
	}

	public String getCmsBaseDate ( ) {
		return CommonConvert.CommonGetStr(cmsBaseDate);
	}

	public void setCmsBaseDate ( String cmsBaseDate ) {
		this.cmsBaseDate = cmsBaseDate;
	}

	public String getCmsBaseDay ( ) {
		return CommonConvert.CommonGetStr(cmsBaseDay);
	}

	public void setCmsBaseDay ( String cmsBaseDay ) {
		this.cmsBaseDay = cmsBaseDay;
	}

	public String getServerIp() {
		return CommonConvert.CommonGetStr(serverIp);
	}

	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}
	
	public String getModifyDate ( ) {
		return CommonConvert.CommonGetStr(modifyDate);
	}

	public void setModifyDate ( String modifyDate ) {
		this.modifyDate = modifyDate;
	}	

	@Override
	public String toString ( ) {
		return "CommonBatchCmsConfigVO [compSeq=" + compSeq + ", cmsSyncYN=" + cmsSyncYN + ", cmsBatchYN=" + cmsBatchYN + ", cmsProcessYN=" + cmsProcessYN + ", customYN=" + customYN + ", cmsBaseDate=" + cmsBaseDate + ", cmsBaseDay=" + cmsBaseDay + ", modifyDate=" + modifyDate + ", serverIp=" + serverIp + "]";
	}
}
