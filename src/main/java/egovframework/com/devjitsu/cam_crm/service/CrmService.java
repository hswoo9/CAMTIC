package egovframework.com.devjitsu.cam_crm.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface CrmService {
    List<Map<String, Object>> getPopCrmList(Map<String, Object> params);

    Map<String, Object> getCrmData(Map<String, Object> params);

    List<Map<String, Object>> getCrmList(Map<String, Object> params);

    Map<String, Object> getCrmInfo(Map<String, Object> params);

    void setCrmInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir);


    Map<String, Object> getCrmFileInfo(Map<String, Object> params);

    void setCrmMemInfo(Map<String, Object> params);

    List<Map<String, Object>> getCrmMemList(Map<String, Object> params);

    void delCrmMemInfo(Map<String, Object> params);

    Map<String, Object> getCrmMemInfo(Map<String, Object> params);

    List<Map<String, Object>> getCrmHistList(Map<String, Object> params);
}
