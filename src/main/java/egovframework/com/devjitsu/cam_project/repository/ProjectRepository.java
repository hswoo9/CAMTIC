package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProjectRepository extends AbstractDAO {

    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return selectList("project.getProjectList", params);
    }

    public Map<String, Object> getProjectStep1(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectStep1", params);
    }

    public void insProject(Map<String, Object> params) {
        insert("project.insProject", params);
    }

    public void insPjtEngn(Map<String, Object> params) {
        insert("project.insPjtEngn", params);
    }
}
