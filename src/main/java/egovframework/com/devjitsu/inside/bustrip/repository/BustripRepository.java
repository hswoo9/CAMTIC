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

    public List<Map<String, Object>> getAbroadBustripReqFileInfo(Map<String, Object> params) {
        return selectList("bustrip.getAbroadBustripReqFileInfo", params);
    }

    public List<Map<String, Object>> getBustripReqDocFileList(Map<String, Object> params) {
        return selectList("bustrip.getBustripReqDocFileList", params);
    }

    public List<Map<String, Object>> getBustripResReqFileInfo(Map<String, Object> params) {
        return selectList("bustrip.getBustripResReqFileInfo", params);
    }

    public List<Map<String, Object>> getBustripReqFileInfoR(Map<String, Object> params) {
        return selectList("bustrip.getBustripReqFileInfoR", params);
    }

    public void updBustripReq(Map<String, Object> params) {
        update("bustrip.updBustripReq", params);
        delete("bustrip.delBustripCompnTarget", params);
    }

    public List<Map<String, Object>> getExnpFile(Map<String, Object> params) {
        return selectList("bustrip.getExnpFile", params);
    }

    public List<Map<String, Object>> getExnpFileNum(Map<String, Object> params) {
        return selectList("bustrip.getExnpFileNum", params);
    }

    public Map<String, Object> getBustripId(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripId", params);
    }
    public List<Map<String, Object>> getBustripDocFile(Map<String, Object> params) {
        return selectList("bustrip.getBustripDocFile", params);
    }

    public void updBustripResult(Map<String, Object> params) {
        update("bustrip.updBustripResReq", params);

        if("Y".equals(params.get("companionChangeCheck"))) {
            delete("bustrip.delBustripResCompnTarget", params);
            delete("bustrip.delBustripExnpTarget", params);
            delete("bustrip.delBustripExnpFile", params);
        }
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

    public List<Map<String, Object>> getBusinessExnpInfo(Map<String, Object> params) {
        return selectList("bustrip.getBusinessExnpInfo", params);
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

    public List<Map<String, Object>> getBusinessCostList(Map<String, Object> params) {
        return selectList("bustrip.getBusinessCostList", params);
    }

    public List<Map<String, Object>> nationCodeList(Map<String, Object> params) {
        return selectList("bustrip.nationCodeList", params);
    }

    public List<Map<String, Object>> nationSmCodeList(Map<String, Object> params) {
        return selectList("bustrip.nationSmCodeList", params);
    }

    public List<Map<String, Object>> getNationCode(Map<String, Object> params) {
        return selectList("bustrip.getNationCode", params);
    }

    public Map<String, Object> getNationCodeInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getNationCodeInfo", params);
    }

    public void setBustripCostInsert(Map<String, Object> params) {
        insert("bustrip.setBustripCostInsert", params);
    }

    public void setBustripCostUpdate(Map<String, Object> params) {
        insert("bustrip.setBustripCostUpdate", params);
    }

    public void setBusinessCostInsert(Map<String, Object> params) {
        insert("bustrip.setBusinessCostInsert", params);
    }

    public Map<String, Object> getBusinessCostOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBusinessCostOne", params);
    }

    public void insNationCode(Map<String, Object> params) {
        insert("bustrip.insNationCode", params);
    }

    public void setBustripFuelCostInsert(Map<String, Object> params) {
        insert("bustrip.setBustripFuelCostInsert", params);
    }

    public void setBustripFuelCostUpdate(Map<String, Object> params) {
        update("bustrip.setBustripFuelCostUpdate", params);
    }

    public void setBustripFuelCostInfoUpdate(Map<String, Object> params) {
        update("bustrip.setBustripFuelCostInfoUpdate", params);
    }

    public void setFuelCostDelete(Map<String, Object> params) {
        delete("bustrip.setFuelCostDelete", params);
    }

    public void setExchangeRateUpdate(Map<String, Object> params) {
        update("bustrip.setExchangeRateUpdate", params);
    }

    public List<Map<String, Object>> getWaypointCostList(Map<String, Object> params) {
        return selectList("bustrip.getWaypointCostList", params);
    }

    public void setWaypointCostInsert(Map<String, Object> params) {
        insert("bustrip.setWaypointCostInsert", params);
    }

    public void setWaypointCostUpdate(Map<String, Object> params) {
        update("bustrip.setWaypointCostUpdate", params);
    }

    public Map<String, Object> getWaypointCostOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getWaypointCostOne", params);
    }

    public void setWaypointCostDelete(Map<String, Object> params) {
        delete("bustrip.setWaypointCostDelete", params);
    }

    public void setReqCert(Map<String, Object> params) {
        update("bustrip.setReqCert", params);

        //여비정산 반려시에 작성했던 출장결과보고서 데이터가 유지 되어야 한다고 함.
        //if(params.get("status") == "30" || "30".equals(params.get("status"))){
        //    delete("bustrip.delExnpData", params);
        //}
    }

    public void setBusiCert(Map<String, Object> params) {
        update("bustrip.setBusiCert", params);
    }

    public List<Map<String, Object>> getBustripFuelCostList(Map<String, Object> params) {
        return selectList("bustrip.getBustripFuelCostList", params);
    }

    public Map<String, Object> getBustripFuelCostOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripFuelCostOne", params);
    }

    public Map<String, Object> getBustripFuelCostInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripFuelCostInfo", params);
    }

    public Map<String, Object> getRegFuelCost(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getRegFuelCost", params);
    }

    public Map<String, Object> getExchangeInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getExchangeInfo", params);
    }

    public List<Map<String, Object>> getPopBustripList(Map<String, Object> params) {
        return selectList("bustrip.getPopBustripList", params);
    }

    public List<Map<String, Object>> getBustripSettleList(Map<String, Object> params) {
        return selectList("bustrip.getBustripSettleList", params);
    }

    public void setBustripFileNum(Map<String, Object> params) {
        update("bustrip.setBustripFileNum", params);
    }

    public void delBustripCompanion(Map<String, Object> params) {
        delete("bustrip.delBustripCompanion", params);
    }

    public int findCompanionKey(Map<String, Object> params) {
        return (int) selectOne("bustrip.findCompanionKey", params);
    }

    public void updBustripResCompanion(Map<String, Object> params) {
        update("bustrip.updBustripResCompanion", params);
    }

    public void delPjtBustrip(Map<String, Object> params) {
        update("bustrip.updBustPjtReqReset", params);
        delete("bustrip.updBustPjtsnReset", params);
    }

    public Map<String, Object> getBustripExnpSum(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getBustripExnpSum", params);
    }
    public void delBustripCost(Map<String, Object> params) {
        update("bustrip.delBustripCost", params);
    }

    public List<Map<String, Object>> getProjectBustList(Map<String, Object> params) {
        return selectList("bustrip.getProjectBustList", params);
    }

    public List<Map<String, Object>> getProjectBustMetList(Map<String, Object> params) {
        return selectList("bustrip.getProjectBustMetList", params);
    }

    public void insCardHist(Map<String, Object> params) {
        insert("bustrip.insCardHist", params);
    }

    public void delCardHist(Map<String, Object> params) {
        delete("bustrip.delCardHist", params);
    }

    public void delBusiCardHist(Map<String, Object> params) {
        delete("bustrip.delBusiCardHist", params);
    }

    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        return selectList("bustrip.getCardList", params);
    }

    public List<Map<String, Object>> getPersonalExnpData(Map<String, Object> params) {
        return selectList("bustrip.getPersonalExnpData", params);
    }

    public List<Map<String, Object>> getPersonalBusiExnpData(Map<String, Object> params) {
        return selectList("bustrip.getPersonalBusiExnpData", params);
    }

    public List<Map<String, Object>> getCorpExnpData(Map<String, Object> params) {
        return selectList("bustrip.getCorpExnpData", params);
    }

    public List<Map<String, Object>> getBusinessOverExnpData(Map<String, Object> params) {
        return selectList("bustrip.getBusinessOverExnpData", params);
    }

    public List<Map<String, Object>> getBusinessCorpOverExnpData(Map<String, Object> params) {
        return selectList("bustrip.getBusinessCorpOverExnpData", params);
    }

    public Map<String, Object> getExnpHistFileOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getExnpHistFileOne", params);
    }
    public List<Map<String, Object>> getExnpHistFileList(Map<String, Object> params) {
        return selectList("bustrip.getExnpHistFileList", params);
    }
    public Map<String, Object> getExnpHistOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getExnpHistOne", params);
    }

    public Map<String, Object> getCorpCarExnpData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bustrip.getCorpCarExnpData", params);
    }

    public void saveBustripOutExnpPop(Map<String, Object> params) {
        insert("bustrip.saveBustripOutExnpPop", params);
    }

    public void updateBustripOutExnpPop(Map<String, Object> params) {
        update("bustrip.updateBustripOutExnpPop", params);
    }

    public List<Map<String, Object>> getBusinessOverExnpInfo(Map<String, Object> params) {
        return selectList("bustrip.getBusinessOverExnpInfo", params);
    }

    public List<Map<String, Object>> getExtData(Map<String, Object> params) {
        return selectList("bustrip.getExtData", params);
    }

    public void insBustripExternal(Map<String, Object> extMap) {
        insert("bustrip.insBustripExternal", extMap);
    }

    public void delBustripExternal(Map<String, Object> params) {
        delete("bustrip.delBustripExternal", params);
    }

    public List<Map<String, Object>> getBustripPopList(Map<String, Object> params) {
        return selectList("bustrip.getBustripPopList", params);
    }
}
