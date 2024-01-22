package egovframework.com.devjitsu.inside.workPlan.service;

import java.util.List;
import java.util.Map;

public interface WorkPlanService {
    /**
     * 유연근무 신청 저장 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getWorkPlanReqChangeList(Map<String, Object> params);

    Map<String, Object> setWorkPlanChangeOrDetail(Map<String, Object> params) throws Exception;

    List<Map<String, Object>> getWkCommonCodeWpT(Map<String, Object> params);
    Map<String, Object> updateApprStat(Map<String, Object> params);

    List<Map<String, Object>> getWorkPlanDefaultList(Map<String, Object> params);

    /**
     * 유연근무 현황 유저 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getWorkPlanUserList(Map<String, Object> params);

    List<Map<String, Object>> getWorkTimeCode(Map<String, Object> params);

    List<Map<String, Object>> getWorkPlanList(Map<String, Object> params);

    Map<String, Object> setWorkPlan(Map<String, Object> params);

    void workPlanUserApp(Map<String, Object> bodyMap) throws Exception;

    void workPlanAdminApp(Map<String, Object> bodyMap) throws Exception;




}
