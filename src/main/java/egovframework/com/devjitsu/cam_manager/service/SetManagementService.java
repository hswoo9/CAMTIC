package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface SetManagementService {
    void setProject(Map<String, Object> params);

    List<Map<String, Object>> getCorpProjectList(Map<String, Object> params);

    Map<String, Object> getCorpProjectData(Map<String, Object> params);
}
