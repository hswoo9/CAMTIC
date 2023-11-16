package egovframework.com.devjitsu.inside.attend.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AttendRepository extends AbstractDAO {
    public List<Map<String, Object>> getPersonAttendList(Map<String, Object> params) {
        return selectList("attend.getPersonAttendList", params);
    }

    public Map<String, Object> getPersonHrStatus(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("attend.getPersonHrStatus", params);
    }

    public Map<String, Object> getPersonHolidayStatus(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("attend.getPersonHolidayStatus", params);
    }

    public List<Map<String, Object>> getPersonAttendStat(Map<String, Object> params) {
        return selectList("attend.getPersonAttendStat", params);
    }

    public List<Map<String, Object>> personAnnvMainList(Map<String, Object> params) {
        return selectList("attend.personAnnvMainList", params);
    }

    public List<Map<String, Object>> getPersonAnnvInfoList(Map<String, Object> params) {
        return selectList("attend.getPersonAnnvInfoList", params);
    }

    public Map<String, Object> getAttendAllCountMonthly(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("attend.getAttendAllCountMonthly", params);
    }

    public List<Map<String, Object>> getAttendDeptCountMonthly(Map<String, Object> params) {
        return selectList("attend.getAttendDeptCountMonthly", params);
    }

    public List<Map<String, Object>> getAttendPersonalCountMonthly(Map<String, Object> params) {
        return selectList("attend.getAttendPersonalCountMonthly", params);
    }

    public List<Map<String, Object>> getSubHolidayApplyList(Map<String, Object> params){
        System.out.println("------------------------------컨트롤러 탔다 --------------------------------------------------");
        return selectList("attend.getSubHolidayApplyList", params);
    }

    public List<Map<String, Object>> getVacCodeList2(Map<String, Object> params) {
        return selectList("attend.getVacCodeList2", params);
    }

    public void setHistoryWorkApplyDel(Map<String, Object> params){
        update("attend.setHistoryWorkApplyDel", params);
    }
}
