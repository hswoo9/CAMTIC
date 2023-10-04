package egovframework.com.devjitsu.cam_project.service;

import java.util.List;
import java.util.Map;

public interface ProjectMngService {


    List<Map<String, Object>> getLaborList(Map<String, Object> params);

    void setLaborInfo(Map<String, Object> params);

    Map<String, Object> getLaborData(Map<String, Object> params);

    void insLaborHistInfo(Map<String, Object> params);

    Map<String, Object> getLaborHistData(Map<String, Object> params);

    void delLaborHistData(Map<String, Object> params);

    List<Map<String, Object>> getTeamCostList(Map<String, Object> params);

    void insTeamCostHistInfo(Map<String, Object> params);

    void setTeamInfo(Map<String, Object> params);
}
