package egovframework.expend.common.vo;

import egovframework.expend.common.helper.convert.CommonConvert;

public class CommonCodeVO {

    private String commonCode = CommonInterface.commonCode.emptyStr;
    private String commonName = CommonInterface.commonCode.emptySeq;
    private int commonOrder = 99999;

    public String getCommonCode ( ) {
        return CommonConvert.CommonGetStr(commonCode);
    }

    public void setCommonCode ( String commonCode ) {
        this.commonCode = commonCode;
    }

    public String getCommonName ( ) {
        return CommonConvert.CommonGetStr(commonName);
    }

    public void setCommonName ( String commonName ) {
        this.commonName = commonName;
    }

    public int getCommonOrder ( ) {
        return commonOrder;
    }

    public void setCommonOrder ( int commonOrder ) {
        this.commonOrder = commonOrder;
    }

    @Override
    public String toString ( ) {
        return "CommonCodeVO [commonCode=" + commonCode + ", commonName=" + commonName + ", commonOrder=" + commonOrder + "]";
    }
}
