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

    public Map<String, Object> getCarRequestInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("insideCode.getCarRequestInfo", params);
    }

    public List<Map<String, Object>> getCarRequestList(Map<String, Object> params) {
        return selectList("insideCode.getCarRequestList", params);
    }

    public List<Map<String, Object>> searchDuplicateCar(Map<String, Object> params) {
        return selectList("insideCode.searchDuplicateCar", params);
    }

    public Map<String, Object> getCarCodeInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("insideCode.getCarCodeInfo", params);
    }

    public List<Map<String, Object>> getCarCodeList(Map<String, Object> params) {
        return selectList("insideCode.getCarCodeList", params);
    }



    public void setCarRequestInsert(Map<String, Object> params) {
        insert("insideCode.setCarRequestInsert", params);
    }

    public void setCarRequestUpdate(Map<String, Object> params) {
        update("insideCode.setCarRequestUpdate", params);
    }

    public void setCarCodeInsert(Map<String, Object> params) {
        insert("insideCode.setCarCodeInsert", params);
    }

    public void setCarCodeUpdate(Map<String, Object> params) {
        update("insideCode.setCarCodeUpdate", params);
    }
}
