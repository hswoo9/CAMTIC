package egovframework.com.devjitsu.inside.workPlan.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class WorkPlanRepository extends AbstractDAO  {
    public List<Map<String, Object>> getWorkPlanReqChangeList(Map<String, Object> params) { return selectList("workPlan.getWorkPlanReqChangeList", params);}

    public void setWorkPlanChange(Map<String, Object> params) { insert("workPlan.setWorkPlanChange", params);}

    public void saveWorkPlanChangeDetail(Map<String, Object> params) { insert("workPlan.saveWorkPlanChangeDetail", params);}

    public List<Map<String, Object>> getWkCommonCodeWpT(Map<String, Object> params){ return selectList("workPlan.getWkCommonCodeWpT", params);}

    public int updateApprStat(Map<String, Object> params){
        return (int) update("workPlan.updateApprStat", params);
    }

    public List<Map<String, Object>> getWorkPlanDefaultList(Map<String, Object> params){
        return selectList("workPlan.getWorkPlanDefaultList", params);
    }

    public List<Map<String, Object>> getWorkPlanChangeList(Map<String, Object> params){
        return selectList("workPlan.getWorkPlanChangeList", params);
    }

    public List<Map<String, Object>> getWorkPlanUserList(Map<String, Object> params) {
        return selectList("workPlan.getWorkPlanUserList", params);
    }

    public List<Map<String, Object>> getWorkTimeCode(Map<String, Object> params) {
        return selectList("workPlan.getWorkTimeCode", params);
    }

    public List<Map<String, Object>> getWorkPlanList(Map<String, Object> params) {
        return selectList("workPlan.getWorkPlanList", params);
    }

    public int setWorkPlan(Map<String, Object> params) {
        return (int) insert("workPlan.setWorkPlan", params);
    }

    public void setWorkPlanDetail(Map<String, Object> params) {
        insert("workPlan.setWorkPlanDetail", params);
    }

    public void workPlanUserApp(Map<String, Object> params){
        update("workPlan.workPlanUserApp", params);
    }

    public void workPlanAdminApp(Map<String, Object> params){
        update("workPlan.workPlanAdminApp", params);
    }

    public void deleteWorkPlanData(Map<String, Object> params){
        update("workPlan.deleteWorkPlanData", params);
    }

    public Map<String, Object> getWorkPlanData(Map<String, Object> params){
        return (Map<String, Object>) selectOne("workPlan.getWorkPlanData", params);
    }

    public int updateWorkPlan(Map<String, Object> params){
        return (int) update("workPlan.updateWorkPlan", params);
    }

    public void delWorkPlanDetail(Map<String, Object> params){
        delete("workPlan.delWorkPlanDetail", params);
    }

}
