package egovframework.expend.common.vo.ex;

import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.vo.CommonInterface.commonCode;

public class ExOptionVO {

    private String option_name = commonCode.emptyStr; /* 옵션 명 */
    private String option_code = commonCode.emptyStr; /* 옵션 코드 */
    private String option_value = commonCode.emptyStr; /* 옵션 값 */

    public String getOption_name ( ) {
        return CommonConvert.CommonGetStr(option_name);
    }

    public void setOption_name ( String option_name ) {
        this.option_name = option_name;
    }

    public String getOption_code ( ) {
        return CommonConvert.CommonGetStr(option_code);
    }

    public void setOption_code ( String option_code ) {
        this.option_code = option_code;
    }

    public String getOption_value ( ) {
        return CommonConvert.CommonGetStr(option_value);
    }

    public void setOption_value ( String option_value ) {
        this.option_value = option_value;
    }

    @Override
    public String toString ( ) {
        return "ExOptionVO [option_name=" + option_name + ", option_code=" + option_code + ", option_value=" + option_value + "]";
    }
}
