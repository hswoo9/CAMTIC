package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ManageRepository extends AbstractDAO {

    public List<Map<String, Object>> getMemList(Map<String, Object> params) {
        return selectList("manage.getMemList", params);
    }

    public Map<String, Object> getProjectData(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("manage.getProjectData", map);
    }

    public Map<String, Object> getEmpInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getEmpInfo", params);
    }

    public List<Map<String, Object>> getUserPartRateInfo(Map<String, Object> params) {
        return selectList("manage.getUserPartRateInfo", params);
    }

    public Map<String, Object> getUserSalList(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getUserSalList", params);
    }

    public Map<String, Object> checkExnpDetData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.checkExnpDetData", params);
    }

    public void insIncmExpInfo(List<Map<String, Object>> params){
        insert("manage.insIncmExpInfo", params);
    }

    public void incmExpInfoActiveN(Map<String, Object> params){
        update("manage.incmExpInfoActiveN", params);
    }

    public List<Map<String, Object>> getProjectBgtList(Map<String, Object> params) {
        return selectList("manage.getProjectBgtList", params);
    }

    public int getProjectBgtCheck(Map<String, Object> params) {
        return (int) selectOne("manage.getProjectBgtCheck", params);
    }
}
