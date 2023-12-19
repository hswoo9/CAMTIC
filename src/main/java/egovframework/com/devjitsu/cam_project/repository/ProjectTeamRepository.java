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

    public void setTeamAddVersion(Map<String, Object> params) {
        insert("projectTeam.setTeamAddVersion", params);
    }
}
