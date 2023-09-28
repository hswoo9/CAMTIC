package egovframework.expend.common.helper.info;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.helper.exception.CheckErpVersionException;
import egovframework.expend.common.helper.exception.NotFoundConnectionException;
import egovframework.expend.common.helper.exception.NotFoundLoginSessionException;
import egovframework.expend.common.helper.logger.ExpInfo;
import egovframework.expend.common.vo.*;
import egovframework.expend.common.vo.CommonInterface.commonCode;
import egovframework.expend.common.vo.ex.ExOptionVO;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("CommonInfo")
public class CommonInfo {

    // 변수정의
    private org.apache.logging.log4j.Logger logger = LogManager.getLogger(this.getClass());

    /* 변수정의 - DAO */
    @Resource(name = "CommonInfoDAO")
    private CommonInfoDAO dao;

    /* 전자결재 버전 정조 조회 ( comp_seq 버전 ) - DAO */
    public String CommonGetCompEaTypeInfo(String compSeq) throws NotFoundLoginSessionException {
        return CommonGetCompEaTypeInfo(CommonConvert.CommonGetEmpVO().getGroupSeq(), compSeq);
    }

    public String CommonGetCompEaTypeInfo(String groupSeq, String compSeq) {
        String result = commonCode.emptyStr;
        result = dao.SelectCommonCompEaTypeInfo(groupSeq, CommonConvert.CommonGetStr(compSeq));
        return result;
    }

    /* 전자결재 버전 정조 조회 ( emp_seq 버전 ) - DAO */
    public String CommonGetEmpEaTypeInfo(String empSeq) {
        String result = commonCode.emptyStr;
        result = dao.SelectCommonEmpEaTypeInfo(CommonConvert.CommonGetStr(empSeq));
        return result;
    }

    /* 연동시스템 정보 조회 */
    public ConnectionVO CommonGetConnectionInfo(LoginVO login) throws Exception, NotFoundLoginSessionException {
        if (login.getCompSeq() == null || login.getCompSeq().equals("")) {
            throw new NotFoundLoginSessionException("CommonGetConnectionInfo - 로그인 정볼를 확인할 수 없습니다.");
        } else {
            return this.CommonGetConnectionInfo(login.getCompSeq());
        }
    }

    public ConnectionVO CommonGetConnectionInfo(String compSeq) throws Exception, NotFoundLoginSessionException {
        /*
         * Cloud 버전 사용을 위하여, groupSeq 전송 형태로 변경 - 2018-02-13 - 김상겸
         */
        return CommonGetConnectionInfo(CommonConvert.CommonGetStr(CommonConvert.CommonGetEmpVO().getGroupSeq()), compSeq);
    }

    // ERP 연동 설정 정보 조회
    public ConnectionVO CommonGetConnectionInfo(String groupSeq, String compSeq) throws Exception {
        ConnectionVO conVo = new ConnectionVO();
        conVo = dao.SelectCommonConnectionInfo(CommonConvert.CommonGetStr(groupSeq), CommonConvert.CommonGetStr(compSeq));

        if (conVo == null) {
            ExpInfo.TipLog("ERP 연동 설정이 진행되지 않았습니다. ERP 연동 설정을 확인해주세요. =>> ConnectionVO == null");
            throw new NotFoundConnectionException("ERP 연동정보 확인중 오류가 발생되었습니다. - 연동정보의 값이 NULL입니다.");
        } else if (conVo.getDatabaseType().equals("")) {
            ExpInfo.TipLog("ERP 연동 설정이 진행되지 않았습니다. ERP 연동 설정을 확인해주세요. =>> ConnectionVO.getDatabaseType().equals(\"\")");
            throw new NotFoundConnectionException("ERP 연동정보 확인중 오류가 발생되었습니다. - database type의 값이 공백입니다.");
        } else if (!conVo.getErpTypeCode().equals("ERPiU") && !conVo.getErpTypeCode().equals("iCUBE")) {
            ExpInfo.TipLog("ERP 연동 설정이 진행되지 않았습니다. ERP 연동 설정을 확인해주세요. =>> !ConnectionVO.getErpTypeCode().equals(\"ERPiU\") && !ConnectionVO.getErpTypeCode().equals(\"iCUBE\")");
            throw new CheckErpVersionException("ERP 연동정보 확인중 오류가 발생되었습니다. - database type의 값이 ERPiU 또는 iCUBE에 해당되지 않습니다.");
        }

        return conVo;
    }

//    public ConnectionVO CommonGetConnectionInfo(Map<String, Object> param) {
//        /* 변수정의 */
//        ConnectionVO conVo = new ConnectionVO();
//        /* 조회 */
//        conVo = dao.SelectCommonConnectionInfo(param);
//        /* 반환정의 */
//        if (conVo == null || CommonConvert.CommonGetStr(conVo.getErpTypeCode()).equals(commonCode.emptyStr)) {
//            conVo = new ConnectionVO();
//            conVo.setDatabaseType(CommonConvert.CommonGetStr(BizboxAProperties.getProperty("BizboxA.DbType")));
//            conVo.setDriver(CommonConvert.CommonGetStr(BizboxAProperties.getProperty("BizboxA.DriverClassName")));
//            conVo.setUrl(CommonConvert.CommonGetStr(BizboxAProperties.getProperty("BizboxA.Url")));
//            conVo.setUserId(CommonConvert.CommonGetStr(BizboxAProperties.getProperty("BizboxA.UserName")));
//            conVo.setPassword(CommonConvert.CommonGetStr(BizboxAProperties.getProperty("BizboxA.Password")));
//            conVo.setErpTypeCode(commonCode.BizboxA);
//        }
//        /* 연동시스템 로그 기록 */
//        /* 반환처리 */
//        return conVo;
//    }

    /* 영리 전자결재 */
    /* 영리 전자결재 - 지출결의 양식 조회 */
    public List<Map<String, Object>> CommonGetExFormListInfo(Map<String, Object> empInfo) {
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        result = dao.CommonGetExFormListInfo(empInfo);
        return result;
    }

    /* 영리 전자결재 - 양식정보 조회 */
    public Map<String, Object> CommonGetEapFormInfo(String formSeq) throws NotFoundLoginSessionException {
        return CommonGetEapFormInfo(CommonConvert.CommonGetEmpVO().getGroupSeq(), formSeq);
    }

    public Map<String, Object> CommonGetEapFormInfo(String groupSeq, String formSeq) {
        Map<String, Object> param = new HashMap<String, Object>();
        Map<String, Object> result = new HashMap<String, Object>();
        param.put(commonCode.groupSeq, groupSeq);
        param.put(commonCode.formSeq, formSeq);
        result = dao.SelectCommonEapFormInfo(param);
        return result;
    }

    /* 영리 전자결재 - 양식상세 조회 */
    public Map<String, Object> CommonGetEapFormDetailInfo(Map<String, Object> param) throws Exception {
        return CommonGetEapFormDetailInfo(CommonConvert.CommonGetEmpVO().getGroupSeq(), param);
    }

    public Map<String, Object> CommonGetEapFormDetailInfo(String groupSeq, Map<String, Object> param) throws Exception {
        // 변수정의
        Map<String, Object> result = new HashMap<String, Object>();
        param.put(commonCode.groupSeq, groupSeq);
        result = dao.SelectCommonEapFormDetailInfo(param);
        return result;
    }

    /* 비영리 전자결재 - 양식정보 조회 */
    public EaFormVO CommonGetEaFormInfo(String formSeq) {
        EaFormVO formVo = new EaFormVO();
        formVo = dao.SelectCommonEaFormInfo(CommonConvert.CommonGetStr(formSeq));
        return formVo;
    }

    /* 전자결재 양식정보 상세 조회 (비영리) */
    public Map<String, Object> CommonEaFormInfoSelect(String template_key) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("c_tikeycode", template_key);
            result = dao.CommonEaFormInfoSelect(params);
        } catch (Exception e) {
            // TODO: handle exception
        }
        return result;
    }

    /* 전자결재 양식정보 상세 조회 (영리) */
    public Map<String, Object> CommonEapFormInfoSelect(String template_key) throws Exception {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("c_tikeycode", template_key);
            result = dao.CommonEaFormInfoSelect(params);
        } catch (Exception e) {
            // TODO: handle exception
        }
        return result;
    }

    /* 양식 기준 연동 예산정보 조회 */
    public String UtilIfBudgetInfoSelect(Map<String, Object> param) throws Exception {
        String result = commonCode.emptyStr;
        if (!StringUtils.isEmpty((String) param.get(commonCode.formDTp))) {
            String formDTp = (String) param.get(commonCode.formDTp);
            switch (formDTp) {
                case commonCode.exA:
                    result = commonCode.BizboxA;
                    break;
                case commonCode.exI:
                    result = commonCode.iCUBE;
                    break;
                case commonCode.exU:
                    result = commonCode.ERPiU;
                    break;
                default:
                    int budgetRange = Integer.parseInt(formDTp);
                    if (budgetRange >= CommonInterface.ifBudgetRange.minG && budgetRange <= CommonInterface.ifBudgetRange.maxG) {
                        result = commonCode.BizboxA;
                    } else if (budgetRange >= CommonInterface.ifBudgetRange.minU && budgetRange <= CommonInterface.ifBudgetRange.maxU) {
                        result = commonCode.ERPiU;
                    } else if (budgetRange >= CommonInterface.ifBudgetRange.minI && budgetRange <= CommonInterface.ifBudgetRange.maxI) {
                        result = commonCode.iCUBE;
                    }
                    break;
            }
        } else {
            result = commonCode.BizboxA;
        }
        return result;
    }

    /* 지출결의 옵션 조회 - DAO */
    public List<ExOptionVO> ExOptionLoadSetting(Map<String, Object> param) throws Exception {
        List<ExOptionVO> result = new ArrayList<ExOptionVO>();
        result = dao.SelectCommonExOptionInfo(param);
        return result;
    }

    /* 공통코드 - Bizbox Alpha */
    public List<Map<String, Object>> CommonGetCodeA(String groupSeq, String compSeq, String langCode, String code) {
        /* 변수정의 */
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        Map<String, Object> params = new HashMap<String, Object>();
        /* 파라미터 정의 */
        params.put("code", CommonConvert.CommonGetStr(code) == commonCode.emptyStr ? commonCode.emptyStr : CommonConvert.CommonGetStr(code));
        params.put(commonCode.langCode, CommonConvert.CommonGetStr(langCode) == commonCode.emptyStr ? "kr" : CommonConvert.CommonGetStr(langCode));
        params.put(commonCode.groupSeq, CommonConvert.CommonGetStr(groupSeq) == commonCode.emptyStr ? "" : CommonConvert.CommonGetStr(groupSeq));
        /* 데이터 조회 */
        result = dao.SelectCommonCodeListInfo(params);
        /* 반환 검증 */
        if (result == null || result.size() == 0) {
            result = new ArrayList<Map<String, Object>>();
        }
        /* 반환처리 */
        return result;
    }

    /* 공통코드 - iCUBE */
    public List<CommonCodeVO> CommonGetCodeI(LoginVO loginVo, String erpCompSeq, String code) {
        List<CommonCodeVO> result = new ArrayList<CommonCodeVO>();
        return result;
    }

    /* 공통코드 - ERPiU */
    public List<CommonCodeVO> CommonGetCodeU(LoginVO loginVo, String erpCompSeq, String code) {
        List<CommonCodeVO> result = new ArrayList<CommonCodeVO>();
        return result;
    }

    /* 사용자 명칭 정보 조회 */
    public CustomLabelVO CommonGetCustomLabelInfo(String compSeq, String langCode, String groupSeq) {
        /* 조회 */
        String pCompSeq = CommonConvert.CommonGetStr(compSeq);
        String pLangCode = CommonConvert.CommonGetStr(langCode);
        String pGroupSeq = CommonConvert.CommonGetStr(groupSeq);
        CustomLabelVO vo = new CustomLabelVO(dao.SelectCommonCustomLabelInfo(pCompSeq, pLangCode, pGroupSeq));
        return vo;
    }

    /* 비영리 품의결의 비영리 결재 양식 조회 */
    /* 사용자 명칭 정보 조회 */
    public List<Map<String, Object>> CommonGetNPFormListInfo(Map<String, Object> params) {
        /* 조회 */
        return dao.SelectCommonNpFormListInfo(params);
    }
}
