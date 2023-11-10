package egovframework.com.devjitsu.cam_manager.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ManageService {

    List<Map<String, Object>> getMemList(Map<String, Object> params);

    Map<String, Object> getProjectData(Map<String, Object> map);
}
