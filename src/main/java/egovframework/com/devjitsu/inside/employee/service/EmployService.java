package egovframework.com.devjitsu.inside.employee.service;

import java.util.List;
import java.util.Map;

public interface EmployService {
    List<Map<String, Object>> getBusinessParticipationList(Map<String, Object> params);

    List<Map<String, Object>> getBusinessParticipationData(Map<String, Object> params);
    Map<String, Object> getBusnPartRatePayData(Map<String, Object> params);

    List<Map<String, Object>> getUserPartRateList(Map<String, Object> params);

    void setBusnPartRatePay(Map<String, Object> params);

    List<Map<String, Object>> getCalcPartRate(Map<String, Object> params);

    List<Map<String, Object>> getMonthlyCalcPartRate(Map<String, Object> params);

    List<Map<String, Object>> getMonthlyPayRollLedgerList(Map<String, Object> params);

    List<Map<String, Object>> getDeptList(Map<String, Object> params);
}
