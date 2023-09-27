package egovframework.com.devjitsu.cam_project.service;

import java.util.List;
import java.util.Map;

public interface ProjectRndService {
    void setSubjectInfo(Map<String, Object> params);

    List<Map<String, Object>> getPopRschList(Map<String, Object> params);

    Map<String, Object> getRschData(Map<String, Object> params);

    void setRschData(Map<String, Object> params);

    List<Map<String, Object>> getPjtRschInfo(Map<String, Object> params);

    int getRschCount(Map<String, Object> params);

    void delRschData(Map<String, Object> params);

    void setDevPjtVer(Map<String, Object> params);
}
