package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface SetManagementService {
    void setProject(Map<String, Object> params);

    List<Map<String, Object>> getCorpProjectList(Map<String, Object> params);

    List<Map<String, Object>> getCorpProjectListMng(Map<String, Object> params);

    Map<String, Object> getCorpProjectData(Map<String, Object> params);

    void setRequest(Map<String, Object> params);

    void setApprove(Map<String, Object> params);

    List<Map<String, Object>> getExnpDeChangeRs(Map<String, Object> params);

    void setExnpDeChangeRs(Map<String, Object> params);

    void delExnpDeChangeRs(Map<String, Object> params);

    void setRndProjectPrevNextAmt(Map<String, Object> params);

    Map<String, Object> getRndProjectPrevNextAmt(Map<String, Object> params);
}
