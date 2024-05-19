package egovframework.com.devjitsu.gw.user.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserRepository extends AbstractDAO {

    public List<Map<String, Object>> getOrgDeptList(Map<String, Object> param) {
        return selectList("user.getOrgDeptList", param);
    }

    public Map<String, Object> getUserInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("user.getUserInfo", params);
    }

    public Map<String, Object> getManagerInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("user.getManagerInfo", params);
    }

    public Map<String, Object> getTempMngInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("user.getTempMngInfo", params);
    }


    public Map<String, Object> getIdCheck(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("user.getIdCheck", params);
    }

    public List<Map<String, Object>> getEmpList(Map<String, Object> params) {
        return selectList("user.getEmpList", params);
    }

    public List<Map<String, Object>> getEmpSelList(Map<String, Object> params) {
        return selectList("user.getEmpSelList", params);
    }

    public void setUserInfoUpdate(Map<String, Object> params) {
        update("user.setUserInfoUpdate", params);
    }

    public Map<String,Object> getUserPersonnelOne (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("user.getUserPersonnelOne", params);
    }

    public Map<String, Object> getUserImageInfo(Map<String, Object> map){
        return (Map<String, Object>) selectOne("user.getUserImageInfo", map);
    }

    public Object setHistoryInfo(Map<String, Object> params) {return insert("user.setHistoryInfo", params);}

    public List<Map<String, Object>> getHistoryList(Map<String, Object> params) {return selectList("user.getHistoryList", params);}

    public Map<String, Object> getHistoryOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("user.getHistoryOne", params);
    }

    public List<Map<String, Object>> getHistoryFileInfo(Map<String, Object> params) {return selectList("user.getHistoryFileInfo", params);}

    public List<Map<String, Object>> getUserEncryptionList(Map<String, Object> params) {
        return selectList("user.getUserEncryptionList", params);
    }

    public Map<String, Object> getUserInfoToId(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("user.getUserInfoToId", params);
    }

    public String getMasterKey() {
        return (String) selectOne("user.getMasterKey");
    }
}
