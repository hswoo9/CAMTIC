package egovframework.com.devjitsu.etc.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EtcRepository extends AbstractDAO {

    public List<Map<String, Object>> getSignInfoList(Map<String, Object> params) {
        return selectList("etc.getSignInfoList", params);
    }

    public Map<String, Object> getSignInfoOne(Map<String, Object> params) {
        return (Map<String, Object>)selectOne("etc.getSignInfoOne", params);
    }

    public void setSignInfoIns(Map<String, Object> params) {
        insert("etc.setSignInfoIns", params);
    }

    public void setSignInfoUpd(Map<String, Object> params) {
        update("etc.setSignInfoUpd", params);
    }

    public void setSignInfoDel(Map<String, Object> params) {
        update("etc.setSignInfoDel", params);
    }

}
