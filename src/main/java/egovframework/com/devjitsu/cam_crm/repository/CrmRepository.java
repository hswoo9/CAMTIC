package egovframework.com.devjitsu.cam_crm.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CrmRepository extends AbstractDAO {
    public List<Map<String, Object>> getPopCrmList(Map<String, Object> params) {

        return selectList("crm.getPopCrmList", params);
    }

    public Map<String, Object> getCrmData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("crm.getCrmData", params);
    }

    public List<Map<String, Object>> getCrmList(Map<String, Object> params) {
        return selectList("crm.getCrmList", params);
    }

    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("crm.getCrmInfo", params);
    }

    public void updCrmFile(Map<String, Object> fileInsMap) {
        insert("crm.updCrmFile", fileInsMap);
    }

    public void updCrmLics(Map<String, Object> fileInsMap) {
        insert("crm.updCrmLics", fileInsMap);
    }


    public void updBnCp(Map<String, Object> fileInsMap) {
        insert("crm.updBnCp", fileInsMap);
    }

    public List<Map<String, Object>> getCrmFileInfo(Map<String, Object> params) {
        return selectList("crm.getCrmFileInfo", params);
    }

    public List<Map<String, Object>> getCrmLicsInfo(Map<String, Object> params) {
        return selectList("crm.getCrmLicsInfo", params);
    }

    public List<Map<String, Object>> getBnCpInfo(Map<String, Object> params) {
        return selectList("crm.getBnCpInfo", params);
    }

    public void updCrmInfo(Map<String, Object> params) {
        update("crm.updCrmInfo", params);
    }

    public void insCrmInfo(Map<String, Object> params) {
        insert("crm.insCrmInfo", params);
    }
}
