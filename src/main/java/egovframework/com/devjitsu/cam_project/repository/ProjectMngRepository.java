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

    public void updTeamCostInfo(Map<String, Object> params) {
        update("projectMng.updTeamCostInfo", params);
    }

    public void updTeamCostHistInfo(Map<String, Object> params) {
        update("projectMng.updTeamCostHistInfo", params);
    }


    public Map<String, Object> getLaborHistData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectMng.getLaborHistData", params);
    }

    public void delLaborHistData(Map<String, Object> params) {
        delete("projectMng.delLaborHistData", params);
    }

    public List<Map<String, Object>> getTeamCostList(Map<String, Object> params) {
        return selectList("projectMng.getTeamCostList", params);
    }

    public Map<String, Object> getTeamCostData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectMng.getTeamCostData", params);
    }

    public void insTeamCostInfo(Map<String, Object> params) {
        insert("projectMng.insTeamCostInfo", params);
    }

    public void insTeamCostHistInfo(Map<String, Object> params) {
        insert("projectMng.insTeamCostHistInfo", params);
    }

    public void setProductInfo(Map<String, Object> params) {
        insert("projectMng.setProductInfo", params);
    }

    public void setProductUpd(Map<String, Object> params) {
        update("projectMng.setProductUpd", params);
    }

    public void setProductDel(Map<String, Object> params) {
        update("projectMng.setProductDel", params);
    }

    public List<Map<String, Object>> getProductCodeInfo(Map<String, Object> params) {
        return selectList("projectMng.getProductCodeInfo", params);
    }

    public Map<String, Object> getProductCodeOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectMng.getProductCodeOne", params);
    }

    public void setPerClosingUpd(Map<String, Object> params) {
        update("projectMng.setPerClosingUpd", params);
    }
}
