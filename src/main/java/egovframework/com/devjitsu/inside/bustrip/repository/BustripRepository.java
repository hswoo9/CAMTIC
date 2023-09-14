package egovframework.com.devjitsu.inside.bustrip.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BustripRepository extends AbstractDAO {


    public List<Map<String, Object>> getBustripList(Map<String, Object> params) { return selectList("bustrip.getBustripList", params); }

    public void insBustripReq(Map<String, Object> params) {
        insert("bustrip.insBustripReq", params);
    }

    public void saveBustripResult(Map<String, Object> params) {
        insert("bustrip.saveBustripResult", params);
    }

    public void insBustripCompanion(Map<String, Object> params) {
        insert("bustrip.insBustripCompanion", params);
    }

    public void insBustripResCompanion(Map<String, Object> params) {
        insert("bustrip.insBustripResCompanion", params);
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

    public List<Map<String, Object>> getBustripResCompanionInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripResCompanionInfo", params);
    }

    public List<Map<String, Object>> getBustripReqFileInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripReqFileInfo", params);
    }

    public void updBustripReq(Map<String, Object> params) {
        update("bustrip.updBustripReq", params);
        delete("bustrip.delBustripCompnTarget", params);
    }

    public void updBustripResult(Map<String, Object> params) {
        update("bustrip.updBustripResReq", params);
        delete("bustrip.delBustripResCompnTarget", params);
    }

    public List<Map<String, Object>> getBustripReqCheck(Map<String, Object> params) {
        return selectList("bustrip.getBustripReqCheck", params);
    }

    public List<Map<String, Object>> getBustripTotInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripTotInfo", params);
    }

    public List<Map<String, Object>> getBustripResTotInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripResTotInfo", params);
    }

    public void updateApprStat(Map<String, Object> params) {
        update("bustrip.updateApprStat", params);
    }

    public void updateFinalApprStat(Map<String, Object> params) {
        update("bustrip.updateFinalApprStat", params);
    }

    public void updateResApprStat(Map<String, Object> params) {
        update("bustrip.updateResApprStat", params);
    }

    public void updateResFinalApprStat(Map<String, Object> params) {
        update("bustrip.updateResFinalApprStat", params);
    }

    public void saveBustripExnpPop(Map<String, Object> params) {
        insert("bustrip.saveBustripExnpPop", params);
    }

    public void insBustripExnpResult(Map<String, Object> params) {
        insert("bustrip.insBustripExnpResult", params);
    }

    public void updBustripReqDriver(Map<String, Object> params) {
        update("bustrip.updBustripReqDriver", params);
    }

    public List<Map<String, Object>> getBustripExnpInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripExnpInfo", params);
    }

    public Map<String, Object> getBustripResultInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripResultInfo", params);
    }

    public Map<String, Object> getBustripResultInfoR(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripResultInfoR", params);
    }

    public void updateBustripExnpPop(Map<String, Object> params) {
        update("bustrip.updateBustripExnpPop", params);
    }

    public Map<String, Object> getBustripMaxDayCost(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripMaxDayCost", params);
    }

    public List<Map<String, Object>> getBustripCostList(Map<String, Object> params) {
        return selectList("bustrip.getBustripCostList", params);
    }

    public void setBustripCostInsert(Map<String, Object> params) {
        insert("bustrip.setBustripCostInsert", params);
    }

    public void setBustripFuelCostInsert(Map<String, Object> params) {
        insert("bustrip.setBustripFuelCostInsert", params);
    }

    public void setBustripFuelCostUpdate(Map<String, Object> params) {
        update("bustrip.setBustripFuelCostUpdate", params);
    }

    public List<Map<String, Object>> getWaypointCostList(Map<String, Object> params) {
        return selectList("bustrip.getWaypointCostList", params);
    }

    public void setWaypointCostInsert(Map<String, Object> params) {
        insert("bustrip.setWaypointCostInsert", params);
    }

    public void setReqCert(Map<String, Object> params) {
        update("bustrip.setReqCert", params);
    }

    public List<Map<String, Object>> getBustripFuelCostList(Map<String, Object> params) {
        return selectList("bustrip.getBustripFuelCostList", params);
    }

    public Map<String, Object> getBustripFuelCostInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripFuelCostInfo", params);
    }

    public List<Map<String, Object>> getPopBustripList(Map<String, Object> params) {
        return selectList("bustrip.getPopBustripList", params);
    }

    public List<Map<String, Object>> getBustripSettleList(Map<String, Object> params) {
        return selectList("bustrip.getBustripSettleList", params);
    }

    public List<Map<String, Object>> setBustripFileNum(Map<String, Object> params) {
        return selectList("bustrip.setBustripFileNum", params);
    }
}
