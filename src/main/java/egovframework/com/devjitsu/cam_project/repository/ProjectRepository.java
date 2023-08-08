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

    public void delProject(Map<String, Object> params) {

        delete("project.delProject", params);
    }

    public Map<String, Object> getProjectData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectData", params);
    }

    public void insStep1(Map<String, Object> params) {
        insert("project.insStep1", params);
    }

    public void insStep1Sub(Map<String, Object> params) {
        insert("project.insStep1Sub", params);
    }

    public void updProjectStep(Map<String, Object> params) {
        update("project.updProjectStep", params);
    }

    public void updProjectEngnStep(Map<String, Object> params) {
        update("project.updProjectEngnStep", params);
    }

    public List<Map<String, Object>> getStep1EstList(Map<String, Object> params) {
        return selectList("project.getStep1EstList", params);
    }

    public List<Map<String, Object>> getStep1EstSubList(Map<String, Object> params) {
        return selectList("project.getStep1EstSubList", params);
    }
}
