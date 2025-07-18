package egovframework.com.devjitsu.cam_manager.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface PayAppService {

    void payAppSetData(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR);

    Map<String, Object> getPayAppReqData(Map<String, Object> params);

    List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params);

    List<Map<String, Object>> getPayAppDetailDataDupl(Map<String, Object> params);

    List<Map<String, Object>> getPaymentList(Map<String, Object> params);

    List<Map<String, Object>> getPaymentMngList(Map<String, Object> params);

    List<Map<String, Object>> getPaymentListForExcelDown(Map<String, Object> params);

    List<Map<String, Object>> getWaitPaymentList(Map<String, Object> params);

    void updatePayAppDocState(Map<String, Object> bodyMap);

    void setPayAppDetData(Map<String, Object> params);

    void setPayAppCostApp(Map<String, Object> params);

    void setPayAppDetCostApp(Map<String, Object> params);

    void setExnpData(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR);

    Map<String, Object> getExnpData(Map<String, Object> params);

    List<Map<String, Object>> getExnpDetailData(Map<String, Object> params);

    List<Map<String, Object>> getExnpDetailDataDupl(Map<String, Object> params);

    List<Map<String, Object>> getExnpList(Map<String, Object> params);

    List<Map<String, Object>> getExnpListForExcelDown(Map<String, Object> params);

    List<Map<String, Object>> getExnpReList(Map<String, Object> params);

    List<Map<String, Object>> getExnpReListForExcelDown(Map<String, Object> params);

    List<Map<String, Object>> getIncpList(Map<String, Object> params);

    List<Map<String, Object>> getIncpListForExcelDown(Map<String, Object> params);

    List<Map<String, Object>> getIncpReList(Map<String, Object> params);

    void payIncpSetData(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR);

    Map<String, Object> getPayIncpReqData(Map<String, Object> params);
    List<Map<String, Object>> getPayIncpDetailData(Map<String, Object> params);
    List<Map<String, Object>> getStoredPayIncpFileList(Map<String, Object> params);

    void updateExnpAppDocState(Map<String, Object> bodyMap);

    void updateIncpAppDocState(Map<String, Object> bodyMap);

    void resolutionExnpAppr(Map<String, Object> params);

    void resolutionIncpAppr(Map<String, Object> params);

    void updPayAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file, String SERVER_DIR, String BASE_DIR);

    void updExnpAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file, String SERVER_DIR, String BASE_DIR);
    Map<String, Object> getPayAttInfo(Map<String, Object> params);
    List<Map<String, Object>> getPayAttList(Map<String, Object> params);
    Map<String, Object> getExnpAttInfo(Map<String, Object> params);
    List<Map<String, Object>> getExnpAttList(Map<String, Object> params);

    List<Map<String, Object>> getPartRatePay(Map<String, Object> params);

    List<Map<String, Object>> getDepositList(Map<String, Object> params);

    void setPayDepo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);

    void delPayDepo(Map<String, Object> params);

    Map<String, Object> getPayDepoData(Map<String, Object> params);

    void setApprIncome(Map<String, Object> params);

    List<Map<String, Object>> getCheckBudget(Map<String, Object> params);

    void delPayApp(int[] params);

    List<Map<String, Object>> getPayAppFileList(Map<String, Object> params);
    List<Map<String, Object>> getPayAppDocFileList(Map<String, Object> params);

    List<Map<String, Object>> getExnpFileList(Map<String, Object> params);

    List<Map<String, Object>> getApprovalExnpFileData(Map<String, Object> params);

    List<Map<String, Object>> getPjtExnpList(Map<String, Object> params);

    void updExnpDe(int[] params, Map<String, Object> params2);

    void setProjectTaxInfo(Map<String, Object> params);

    Map<String, Object> getProjectSettingInfo(Map<String, Object> params);

    Map<String, Object> getProjectSettingInfoByPjtSn(Map<String, Object> params);

    void setProjectBudgetInfo(Map<String, Object> params);

    void payAppRevert(Map<String, Object> params);

    List<Map<String, Object>> getPayDepoFileList(Map<String, Object> params);

    List<Map<String, Object>> getPayExnpFileList(Map<String, Object> params);

    void regReListFile(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR);

    void updExnpReFileDeadLine(Map<String, Object> params);

    List<Map<String, Object>> getRegIncmReData(Map<String, Object> params);

    Map<String, Object> setIncpRe(Map<String, Object> params);

    List<Map<String, Object>> getPayIncpReData(Map<String, Object> params);

    void payAppMngFileSet(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir);

    Map<String, Object> getPartRatePayBsYm(Map<String, Object> params);

    void delExnpData(Map<String, Object> params);

    void regExnpCancel(Map<String, Object> params);

    void regIncpCancel(Map<String, Object> params);

    void updateExnpDe(Map<String, Object> params);

    List<Map<String, Object>> getPaymentNotDoneList(Map<String, Object> params);

    void delIncpData(Map<String, Object> params);

    void delIncpRe(Map<String, Object> params);

    Map<String, Object> getDepoInfo(Map<String, Object> params);

    Map<String, Object> getApproveIncpAmt(Map<String, Object> params);

    Map<String, Object> getApproveExnpAmtTp2(Map<String, Object> params);

    Map<String, Object> getApproveExnpAmtTp1(Map<String, Object> params);

    Map<String, Object> getWaitExnp(Map<String, Object> params);

    Map<String, Object> getReturnPayAmt(Map<String, Object> params);

    Map<String, Object> getWaitIncp(Map<String, Object> params);

    Map<String, Object> g20ExnpManage(Map<String, Object> params);

    Map<String, Object> g20IncpManage(Map<String, Object> params);

    void makeCorpCardPdf(Map<String, Object> params, String SERVER_DIR, String BASE_DIR);

    void makeBustripPdf(Map<String, Object> params, String SERVER_DIR, String BASE_DIR);

    List<Map<String, Object>> getExnpDepoListExcelDown(Map<String, Object> params);
}
