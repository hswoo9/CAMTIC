package egovframework.com.devjitsu.workPlan.service;

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


}
