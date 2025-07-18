package egovframework.com.devjitsu.cam_crm.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface CrmService {
    List<Map<String, Object>> getPopCrmList(Map<String, Object> params);
    Map<String, Object> getCrmData(Map<String, Object> params);
    List<Map<String, Object>> getCrmList(Map<String, Object> params);
    void setCrmDel(Map<String, Object> params);
    void crmRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws IOException;
    void crmExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception;
    Map<String, Object> getCrmInfo(Map<String, Object> params);
    void setCrmInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir);
    int crmReqCheck(Map<String, Object> params);
    Map<String, Object> getCrmFileInfo(Map<String, Object> params);
    void setCrmMemInfo(Map<String, Object> params);
    List<Map<String, Object>> getCrmMemList(Map<String, Object> params);
    void delCrmMemInfo(Map<String, Object> params);
    Map<String, Object> getCrmMemInfo(Map<String, Object> params);
    Map<String, Object> getCrmIndustry(Map<String, Object> params);
    void setCrmIndustry(Map<String, Object> params);
    Map<String, Object> getCrmCert(Map<String, Object> params);
    void setCrmCert(Map<String, Object> params);
    Map<String, Object> getCrmAccounting(Map<String, Object> params);
    void setCrmAccounting(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    Map<String, Object> getCrmMgScale(Map<String, Object> params);
    void setCrmMgScale(Map<String, Object> params);
    Map<String, Object> getCrmInterests(Map<String, Object> params);
    void setCrmInterests(Map<String, Object> params);
    List<Map<String, Object>> getCrmHistList(Map<String, Object> params);
    Map<String, Object> getCrmHist(Map<String, Object> params);
    List<Map<String, Object>> getCrmHistDetailList(Map<String, Object> params);
    List<Map<String, Object>> getCrmHistEngnList(Map<String, Object> params);
    List<Map<String, Object>> getCrmHistRndList(Map<String, Object> params);
    List<Map<String, Object>> getCrmHistNonRndList(Map<String, Object> params);
    void setCrmHist(Map<String, Object> params);
    void setCrmHistUpd(Map<String, Object> params);
    void deleteCrmHist(Map<String, Object> params);
    void setMfOverviewDel(Map<String, Object> params);
    void setMfOverviewByCrmInfoUpd(Map<String, Object> params);
    Map<String, Object> getMfOverviewInfo(Map<String, Object> params);
    List<Map<String, Object>> getMfOverviewStatInfo(Map<String, Object> params);
    List<Map<String, Object>> getMfOverviewAreaStat(Map<String, Object> params);
    Map<String, Object> getMfOverviewList(Map<String, Object> params);
    void templateExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException;
    void mfExcelUpload(Map<String, Object> params, MultipartHttpServletRequest request) throws Exception;
    List<Map<String, Object>> groupCodeList(Map<String, Object> params);
    void saveGroupCode(Map<String, Object> params);
    List<Map<String, Object>> codeList(Map<String, Object> params);
    void insSetLgCode(Map<String, Object> params);
    List<Map<String, Object>> smCodeList(Map<String, Object> params);
    void insCrmCode(Map<String, Object> params);
    List<Map<String, Object>> selLgCode(Map<String, Object> params);
    List<Map<String, Object>> selSmCode(Map<String, Object> params);
    List<Map<String, Object>> selLgSmCode(Map<String, Object> params);
    void setMouAgrInfo(Map<String, Object> params, MultipartFile[] mouFiles, String serverDir, String baseDir);
    List<Map<String, Object>> getMouAgrList(Map<String, Object> params);
    void setMouAgrSnDel(Map<String, Object> params);
    List<Map<String, Object>> getMouCrmList(Map<String, Object> params);
    void setMouAgrCrmInfo(Map<String, Object> params);
    void setMouCrmSnDel(Map<String, Object> params);
    Map<String, Object> getMouArgInfo(Map<String, Object> params);
    List<Map<String, Object>> getMouAgrFileInfo(Map<String, Object> params);

    List<Map<String, Object>> getCustomerCondition();

    List<Map<String, Object>> getCustomerIndustryCondition();

    List<Map<String, Object>> getDeptRelationList(Map<String, Object> params);

    Integer getDeptRelationCnt(Map<String, Object> params);
    Map<String, Object> getCrmHistOne(Map<String, Object> params);
}
