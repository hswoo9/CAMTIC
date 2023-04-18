package egovframework.com.devjitsu.workPlan.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class WorkPlanRepository extends AbstractDAO  {
    public List<Map<String, Object>> getWorkPlanReqChangeList(Map<String, Object> params) { return selectList("workPlan.getWorkPlanReqChangeList", params);}
}
