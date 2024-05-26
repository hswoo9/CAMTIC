package egovframework.com.devjitsu.inside.attend.service;

import java.util.List;
import java.util.Map;

public interface AttendService {
    /** 개인근태리스트 */
    List<Map<String, Object>> getPersonAttendList(Map<String, Object> params);

    /** 개인근태현황 - 출장 */
    Map<String, Object> getPersonHrStatus(Map<String, Object> params);

    /** 개인근태현황 - 휴가 */
    Map<String, Object> getPersonHolidayStatus(Map<String, Object> params);

    /** 직원근태리스트 */
    List<Map<String, Object>> getPersonAttendStat(Map<String, Object> params);

    /** 개인연차현황 리스트 조회 */
    List<Map<String, Object>> personAnnvMainList(Map<String, Object> params);

    /** 개인연차현황 표 리스트 조회 */
    List<Map<String, Object>> getPersonAnnvInfoList(Map<String, Object> params);

    /** 월별근태보고 월별 직원 근태현황 */
    Map<String, Object> getAttendAllCountMonthly(Map<String, Object> params);

    /** 월별근태보고 부서별 직원 근태현황 */
    List<Map<String, Object>> getAttendDeptCountMonthly(Map<String, Object> params);

    /** 직원별근태보고 부서별 직원 근태현황 */
    List<Map<String, Object>> getAttendPersonalCountMonthly(Map<String, Object> params);

    List<Map<String, Object>> getSubHolidayApplyList(Map<String, Object> params);

    List<Map<String, Object>> getVacCodeList2(Map<String, Object> params);

    void setHistoryWorkApplyDel(Map<String, Object> params);

    void setHistoryWorkApplyAdminDel(Map<String, Object> params);

    List<Map<String, Object>> getHolidayDetailsAdmin(Map<String, Object> params);

    List<Map<String, Object>> holidayWorkApplicationList(Map<String, Object> params);

    void setAttendAdjustment(Map<String, Object> params);
}
