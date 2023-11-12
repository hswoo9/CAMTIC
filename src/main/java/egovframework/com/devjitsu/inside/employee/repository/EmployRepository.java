package egovframework.com.devjitsu.inside.employee.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EmployRepository extends AbstractDAO {


    public List<Map<String, Object>> getBusinessParticipationList(Map<String, Object> params) {
        return selectList("employM.getBusinessParticipationList", params);
    }
}
