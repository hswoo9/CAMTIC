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

    public List<Map<String, Object>> getPersonAttendStat(Map<String, Object> params) {
        return selectList("attend.getPersonAttendStat", params);
    }

    public List<Map<String, Object>> personAnnvMainList(Map<String, Object> params) {
        return selectList("attend.personAnnvMainList", params);
    }

    public List<Map<String, Object>> getPersonAnnvInfoList(Map<String, Object> params) {
        return selectList("attend.getPersonAnnvInfoList", params);
    }
}
