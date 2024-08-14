package egovframework.com.devjitsu.inside.code.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class InsideCodeRepository extends AbstractDAO {

    public List<Map<String, Object>> getCarCode(Map<String, Object> params) {
        return selectList("insideCode.getCarCode", params);
    }

    public List<Map<String, Object>> getRoomCode(Map<String, Object> params) {
        return selectList("insideCode.getRoomCode", params);
    }

    public Map<String, Object> getCarRequestInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("insideCode.getCarRequestInfo", params);
    }

    public List<Map<String, Object>> getCarRequestList(Map<String, Object> params) {
        return selectList("insideCode.getCarRequestList", params);
    }

    public List<Map<String, Object>> searchDuplicateCar(Map<String, Object> params) {
        return selectList("insideCode.searchDuplicateCar", params);
    }

    public List<Map<String, Object>> getCarStatType(Map<String, Object> params) {
        return selectList("insideCode.getCarStatType", params);
    }

    public List<Map<String, Object>> getCarStat(Map<String, Object> params) {
        return selectList("insideCode.getCarStat", params);
    }

    public List<Map<String, Object>> getRoomStatType(Map<String, Object> params) {
        return selectList("insideCode.getRoomStatType", params);
    }

    public List<Map<String, Object>> getRoomStat(Map<String, Object> params) {
        return selectList("insideCode.getRoomStat", params);
    }

    public Map<String, Object> getCarCodeInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("insideCode.getCarCodeInfo", params);
    }

    public List<Map<String, Object>> getCarCodeList(Map<String, Object> params) {
        return selectList("insideCode.getCarCodeList", params);
    }

    public List<Map<String, Object>> getRoomRequestList(Map<String, Object> params) {
        return selectList("insideCode.getRoomRequestList", params);
    }

    public Map<String, Object> getRoomRequest(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("insideCode.getRoomRequest", params);
    }

    public List<Map<String, Object>> searchDuplicateRoom(Map<String, Object> params) {
        return selectList("insideCode.searchDuplicateRoom", params);
    }

    public Map<String, Object> getRoomCodeInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("insideCode.getRoomCodeInfo", params);
    }

    public List<Map<String, Object>> getRoomCodeList(Map<String, Object> params) {
        return selectList("insideCode.getRoomCodeList", params);
    }



    public void setCarRequestInsert(Map<String, Object> params) {
        insert("insideCode.setCarRequestInsert", params);
    }

    public void setCarRequestUpdate(Map<String, Object> params) {
        update("insideCode.setCarRequestUpdate", params);
    }

    public void setCarRequestDelete(Map<String, Object> params) {
        delete("insideCode.setCarRequestDelete", params);
    }

    public void setCarCodeInsert(Map<String, Object> params) {
        insert("insideCode.setCarCodeInsert", params);
    }

    public void setCarCodeUpdate(Map<String, Object> params) {
        update("insideCode.setCarCodeUpdate", params);
    }

    public void setCarCodeDelete(Map<String, Object> params) {
        update("insideCode.setCarCodeDelete", params);
    }

    public void setRoomRequestInsert(Map<String, Object> params) {
        insert("insideCode.setRoomRequestInsert", params);
    }
    public void setRoomRequestUpdate(Map<String, Object> params){
        update("insideCode.setRoomRequestUpdate", params);
    }
    public void setRoomRequestDelete(Map<String, Object> params) {
        delete("insideCode.setRoomRequestDelete", params);
    }

    public void setRoomCodeInsert(Map<String, Object> params) {
        insert("insideCode.setRoomCodeInsert", params);
    }

    public void setRoomCodeUpdate(Map<String, Object> params) {
        update("insideCode.setRoomCodeUpdate", params);
    }

    public void setRoomCodeDelete(Map<String, Object> params) {
        update("insideCode.setRoomCodeDelete", params);
    }
    public void updateCarApprStat(Map<String, Object> params) {
        update("insideCode.updateCarApprStat", params);
    }
    public void updateCarFinalApprStat(Map<String, Object> params) {
        update("insideCode.updateCarFinalApprStat", params);
    }

    public List<Map<String, Object>> getAccountList(Map<String, Object> params) {
        return selectList("insideCode.getAccountList", params);
    }

    public void saveRegAccountTo(Map<String, Object> params) {
        insert("insideCode.saveRegAccountTo", params);
    }

    public void updRegAccountTo(Map<String, Object> params) {
        update("insideCode.updRegAccountTo", params);
    }
    public void delRegAccountTo(Map<String, Object> params) {
        update("insideCode.delRegAccountTo", params);
    }

    public Map<String, Object> getAccountToInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("insideCode.getAccountToInfo", params);
    }

    public int carRequestCheck(Map<String, Object> map) {
        return (int) selectOne("insideCode.carRequestCheck", map);
    }

    public List<Map<String, Object>> getUserCarReqList(Map<String, Object> params) {
        return selectList("insideCode.getUserCarReqList", params);
    }
}
