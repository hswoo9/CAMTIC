package egovframework.com.devjitsu.cam_manager.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface PayAppService {

    void payAppSetData(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR);

    Map<String, Object> getPayAppReqData(Map<String, Object> params);

    List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params);

    List<Map<String, Object>> getPaymentList(Map<String, Object> params);

    List<Map<String, Object>> getWaitPaymentList(Map<String, Object> params);

    void updatePayAppDocState(Map<String, Object> bodyMap);

    void setPayAppDetData(Map<String, Object> params);

    void setPayAppCostApp(Map<String, Object> params);

    void setPayAppDetCostApp(Map<String, Object> params);

    void setExnpData(Map<String, Object> params);

    Map<String, Object> getExnpData(Map<String, Object> params);

    List<Map<String, Object>> getExnpDetailData(Map<String, Object> params);

    List<Map<String, Object>> getExnpList(Map<String, Object> params);

    List<Map<String, Object>> getExnpReList(Map<String, Object> params);

    List<Map<String, Object>> getIncpList(Map<String, Object> params);

    List<Map<String, Object>> getIncpReList(Map<String, Object> params);

    void payIncpSetData(Map<String, Object> params);

    Map<String, Object> getPayIncpReqData(Map<String, Object> params);
    List<Map<String, Object>> getPayIncpDetailData(Map<String, Object> params);

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

    void setPayDepo(Map<String, Object> params);

    Map<String, Object> getPayDepoData(Map<String, Object> params);

    void setApprIncome(Map<String, Object> params);

    List<Map<String, Object>> getCheckBudget(Map<String, Object> params);

    void delPayApp(int[] params);

    List<Map<String, Object>> getPayAppFileList(Map<String, Object> params);

    List<Map<String, Object>> getApprovalExnpFileData(Map<String, Object> params);

    List<Map<String, Object>> getPjtExnpList(Map<String, Object> params);
}
