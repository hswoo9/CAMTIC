package egovframework.com.devjitsu.overWk.service;

import java.util.List;
import java.util.Map;

public interface OverWkService {

    /**
     * 근무코드 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getWorkCodeList(Map<String, Object> params);

    /**
     * 사용자 초과근무 저장 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getOverWorkPlanReqList(Map<String, Object> params);

    Map<String, Object> getApplyDateOwpCheck(Map<String, Object> params);

    Map<String, Object> setOverWorkPlan(Map<String, Object> params);

    Map<String, Object> updateApprStat(Map<String, Object> params);


}
