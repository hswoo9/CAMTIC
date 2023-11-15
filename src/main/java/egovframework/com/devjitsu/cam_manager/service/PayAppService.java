package egovframework.com.devjitsu.cam_manager.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface PayAppService {

    void payAppSetData(Map<String, Object> params);

    Map<String, Object> getPayAppReqData(Map<String, Object> params);

    List<Map<String, Object>> getPayAppDetailData(Map<String, Object> params);

    List<Map<String, Object>> getPaymentList(Map<String, Object> params);

    void updatePayAppDocState(Map<String, Object> bodyMap);

    void setPayAppDetData(Map<String, Object> params);

    void setExnpData(Map<String, Object> params);

    Map<String, Object> getExnpData(Map<String, Object> params);

    List<Map<String, Object>> getExnpDetailData(Map<String, Object> params);

    List<Map<String, Object>> getExnpList(Map<String, Object> params);

    List<Map<String, Object>> getExnpReList(Map<String, Object> params);

    List<Map<String, Object>> getIncpList(Map<String, Object> params);

    void updateExnpAppDocState(Map<String, Object> bodyMap);

    void resolutionExnpAppr(Map<String, Object> params);

    void updPayAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file, String SERVER_DIR, String BASE_DIR);

    void updExnpAttDetData(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file, String SERVER_DIR, String BASE_DIR);
    Map<String, Object> getPayAttInfo(Map<String, Object> params);
    Map<String, Object> getExnpAttInfo(Map<String, Object> params);
}
