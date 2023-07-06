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


    public Map<String, Object> getIdCheck(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("user.getIdCheck", params);
    }

    public List<Map<String, Object>> getEmpList(Map<String, Object> params) {
        return selectList("user.getEmpList", params);
    }

    public List<Map<String, Object>> getEmpSelList(Map<String, Object> params) {
        return selectList("user.getEmpSelList", params);
    }
}
