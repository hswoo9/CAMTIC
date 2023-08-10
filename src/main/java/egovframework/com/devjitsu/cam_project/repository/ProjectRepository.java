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

    public Map<String, Object> getStep1EstData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getStep1EstData", params);
    }

    public void insStep2(Map<String, Object> params) {
        insert("project.insStep2", params);
    }

    public void updProjectDelv(Map<String, Object> params) {
        update("project.updProjectDelv", params);
    }

    public Map<String, Object> getStep2DelvData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getStep2DelvData", params);
    }

    public List<Map<String, Object>> groupCodeList(Map<String, Object> params) {
        return selectList("project.groupCodeList", params);
    }

    public void saveGroupCode(Map<String, Object> params) {
        insert("project.insGroupCode", params);
    }

    public List<Map<String, Object>> codeList(Map<String, Object> params) {
        return selectList("project.codeList", params);
    }

    public void insSetLgCode(Map<String, Object> params) {
        update("project.insSetLgCode", params);
    }

    public List<Map<String, Object>> smCodeList(Map<String, Object> params) {
        return selectList("project.smCodeList", params);
    }

    public void insPjtCode(Map<String, Object> params) {
        insert("project.insPjtCode", params);
    }

    public int checkModStep1(Map<String, Object> params) {
        return (int) selectOne("project.checkModStep1", params);
    }

    public List<Map<String, Object>> selLgCode(Map<String, Object> params) {
        return selectList("project.selLgCode", params);
    }

    public List<Map<String, Object>> selSmCode(Map<String, Object> params) {
        return selectList("project.selSmCode", params);
    }
}
