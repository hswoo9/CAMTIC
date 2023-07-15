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

    public void delBustripReq(Map<String, Object> params) {
        delete("bustrip.delBustripReq", params);
        delete("bustrip.delBustripCompn", params);
    }

    public Map<String, Object> getBustripReqInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripReqInfo", params);
    }

    public List<Map<String, Object>> getBustripCompanionInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripCompanionInfo", params);
    }

    public List<Map<String, Object>> getBustripReqFileInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripReqFileInfo", params);
    }

    public void updBustripReq(Map<String, Object> params) {
        update("bustrip.updBustripReq", params);
        delete("bustrip.delBustripCompnTarget", params);
    }

    public List<Map<String, Object>> getBustripReqCheck(Map<String, Object> params) {
        return selectList("bustrip.getBustripReqCheck", params);
    }

    public List<Map<String, Object>> getBustripTotInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripTotInfo", params);
    }

    public void updateApprStat(Map<String, Object> params) {
        update("bustrip.updateApprStat", params);
    }

    public void updateFinalApprStat(Map<String, Object> params) {
        update("bustrip.updateFinalApprStat", params);
    }

    public void saveBustripResult(Map<String, Object> params) {
        insert("bustrip.saveBustripResult", params);
    }
}
