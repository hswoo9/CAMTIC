package egovframework.com.devjitsu.cam_manager.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ManageService {

    List<Map<String, Object>> getPurcReqManageList(Map<String, Object> params);
    void setPurcReq(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    Map<String, Object> getPurcReq(Map<String, Object> params);
}
