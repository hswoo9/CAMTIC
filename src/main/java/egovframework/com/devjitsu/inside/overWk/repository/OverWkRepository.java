package egovframework.com.devjitsu.inside.overWk.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class OverWkRepository extends AbstractDAO {

    public List<Map<String, Object>> getWorkCodeList(Map<String, Object> params) { return selectList("overWk.getWorkCodeList", params);}

    public List<Map<String, Object>> getOverWorkPlanReqList(Map<String, Object> params) { return selectList("overWk.getOverWorkPlanReqList", params);}

    public Map<String, Object> getApplyDateOwpCheck(Map<String, Object> params) { return (Map<String, Object>) selectOne("overWk.getApplyDateOwpCheck", params);}

    public void setOverWorkPlan(Map<String, Object> params) { insert("overWk.setOverWorkPlan", params);}

    public int updateApprStat(Map<String, Object> params){
        return (int) update("overWk.updateApprStat", params);
    }

    public List<Map<String, Object>> getOverWorkPlanUserList(Map<String, Object> params) {
        return selectList("overWk.getOverWorkPlanUserList", params);
    }


}
