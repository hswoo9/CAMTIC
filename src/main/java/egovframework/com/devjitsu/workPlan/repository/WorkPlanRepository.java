package egovframework.com.devjitsu.workPlan.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
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

}
