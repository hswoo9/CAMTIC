package egovframework.com.devjitsu.gw.dept.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DeptRepository extends AbstractDAO {
    public List<Map<String, Object>> getDeptAList(Map<String, Object> params) {
        return selectList("getDeptAList", params);
    }

    public List<Map<String, Object>> getDeptBList(Map<String, Object> params) {
        return selectList("getDeptBList", params);
    }

    public List<Map<String, Object>> getDeptCList(Map<String, Object> params) {
        return selectList("getDeptCList", params);
    }
}
