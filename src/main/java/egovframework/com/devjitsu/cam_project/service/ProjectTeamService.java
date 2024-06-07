package egovframework.com.devjitsu.cam_project.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ProjectTeamService {

    List<Map<String, Object>> getTeamVersion(Map<String, Object> params);
    List<Map<String, Object>> getTeamList(Map<String, Object> params);
    List<Map<String, Object>> getTeamMngList(Map<String, Object> params);
    List<Map<String, Object>> getTeamListAll(Map<String, Object> params);
    List<Map<String, Object>> getTeamBudgetList(Map<String, Object> params);

    Map<String, Object> getVerLeftAmt(Map<String, Object> params);
    Map<String, Object> getTeamData(Map<String, Object> params);
    Map<String, Object> getLastVerTeamData(Map<String, Object> params);

    void setTeamAddVersion(Map<String, Object> params);
    void updMyTeam(Map<String, Object> params);
    void setTeam(Map<String, Object> params);
    void delTeam(Map<String, Object> params);
    void updTeamVersionAppStat(Map<String, Object> params);
}
