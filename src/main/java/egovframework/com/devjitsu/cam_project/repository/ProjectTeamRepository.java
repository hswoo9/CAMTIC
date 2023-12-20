package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProjectTeamRepository extends AbstractDAO {

    public List<Map<String, Object>> getTeamVersion(Map<String, Object> params) {
        return selectList("projectTeam.getTeamVersion", params);
    }

    public List<Map<String, Object>> getTeamList(Map<String, Object> params) {
        return selectList("projectTeam.getTeamList", params);
    }

    public Map<String, Object> getVerLeftAmt(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectTeam.getVerLeftAmt", params);
    }

    public void setTeamAddVersion(Map<String, Object> params) {
        insert("projectTeam.setTeamAddVersion", params);
    }

    public void setTeamDelv(Map<String, Object> params) {
        insert("projectTeam.setTeamDelv", params);
    }

    public void updMyTeam(Map<String, Object> params) {
        update("projectTeam.updMyTeam", params);
    }

    public void setTeam(Map<String, Object> params) {
        insert("projectTeam.setTeam", params);
    }
}
