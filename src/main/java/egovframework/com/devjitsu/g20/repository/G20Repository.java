package egovframework.com.devjitsu.g20.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class G20Repository extends AbstractDAO {
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {

        return selectListMs("g20.getProjectList", params);
    }

    public List<Map<String, Object>> getCommonGisuInfo(Map<String, Object> params) {
        return selectListMs("g20.getCommonGisuInfo", params);
    }

    public List<Map<String, Object>> getSubjectList(Map<String, Object> params) {
        return selectListMs("g20.getBgtList", params);
    }

    public int getProjectCount(Map<String, Object> params) {
        return (int) selectOneMs("g20.getProjectCount", params);
    }

    public void insProject(Map<String, Object> params) {
        insertMs("g20.insProject", params);
    }

    public List<Map<String, Object>> getBudgetInfo(Map<String, Object> params) {
        return selectListMs("g20.getBudgetInfo", params);
    }

    public List<Map<String, Object>> getBankList(Map<String, Object> params) {
        return selectListMs("g20.getBankList", params);
    }

    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOneMs("g20.getCrmInfo", params);
    }

    public void insCrmInfo(Map<String, Object> params) {
        insertMs("g20.insCrmInfo", params);
    }

    public List<Map<String, Object>> getClientList(Map<String, Object> params) {
        return selectListMs("g20.getClientList", params);
    }

    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        return selectListMs("g20.getCardList", params);
    }
}
