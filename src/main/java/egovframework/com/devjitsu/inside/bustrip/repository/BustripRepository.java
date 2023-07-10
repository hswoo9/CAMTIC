package egovframework.com.devjitsu.inside.bustrip.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BustripRepository extends AbstractDAO {


    public List<Map<String, Object>> getUserList(Map<String, Object> params) {
        return selectList("bustrip.getUserList", params);
    }

    public void insBustripReq(Map<String, Object> params) {
        insert("bustrip.insBustripReq", params);
    }

    public void insBustripCompanion(Map<String, Object> params) {
        insert("bustrip.insBustripCompanion", params);
    }

    public List<Map<String, Object>> getBustripReq(Map<String, Object> params) {
        return selectList("bustrip.getBustripReq", params);
    }
}
