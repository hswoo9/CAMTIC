package egovframework.com.devjitsu.inside.userManage.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserManageRepository extends AbstractDAO {
    public Map<String,Object> getUserPersonnelRecordList (Map<String,Object> map) {
        return (Map<String,Object>)selectOne("userManage.getUserPersonnelRecordList", map);
    }
    public List<Map<String,Object>> getEducationalList (Map<String,Object> map) {
        return selectList("userManage.getEducationalList", map);
    }
    public Map<String,Object> getMilitarySvcInfo (Map<String,Object> map) {
        return (Map<String,Object>)selectOne("userManage.getMilitarySvcInfo", map);
    }
    public List<Map<String,Object>> getAllUserPersonnelRecordList (Map<String,Object> map) {
        return selectList("userManage.getAllUserPersonnelRecordList", map);
    }
    public List<Map<String,Object>> getCodeList() {
        return selectList("userManage.getCodeList");
    }

    public Map<String, Object> setUserReqDetailInsert(Map<String, Object> params) {
        return (Map<String,Object>)insert("userManage.setUserReqDetailInsert", params);
    }

    public List<Map<String,Object>> getDeptCodeList2 (Map<String,Object> params) {
        return selectList("userManage.getDeptCodeList2", params);
    }

    public List<Map<String,Object>> getDeptCodeList (Map<String,Object> params) {
        return selectList("userManage.getDeptCodeList", params);
    }
}
