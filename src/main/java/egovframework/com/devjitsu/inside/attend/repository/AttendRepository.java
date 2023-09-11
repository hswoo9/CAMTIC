package egovframework.com.devjitsu.inside.attend.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AttendRepository extends AbstractDAO {
    public List<Map<String, Object>> personAttendList(Map<String, Object> params) {
        return selectList("attend.personAttendList", params);
    }

    public List<Map<String, Object>> personAnnvMainList(Map<String, Object> params) {
        return selectList("attend.personAnnvMainList", params);
    }
}
