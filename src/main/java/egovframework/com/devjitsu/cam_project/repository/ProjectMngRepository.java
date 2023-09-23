package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProjectMngRepository extends AbstractDAO {


    public List<Map<String, Object>> getLaborList(Map<String, Object> params) {
        return selectList("projectMng.getLaborList", params);
    }

    public Map<String, Object> getLaborData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectMng.getLaborData", params);
    }

    public void insLaborInfo(Map<String, Object> params) {
        insert("projectMng.insLaborInfo", params);
    }

    public void updLaborInfo(Map<String, Object> params) {
        update("projectMng.updLaborInfo", params);
    }

    public void insLaborHistInfo(Map<String, Object> params) {
        insert("projectMng.insLaborHistInfo", params);
    }

    public void updLaborHistInfo(Map<String, Object> params) {
        update("projectMng.updLaborHistInfo", params);
    }

    public Map<String, Object> getLaborHistData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectMng.getLaborHistData", params);
    }

    public void delLaborHistData(Map<String, Object> params) {
        delete("projectMng.delLaborHistData", params);
    }
}
