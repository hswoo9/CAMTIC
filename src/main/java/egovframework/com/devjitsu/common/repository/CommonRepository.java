package egovframework.com.devjitsu.common.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CommonRepository extends AbstractDAO {
    public List<Map<String, Object>> ctDept() {
        return selectList("common.ctDept");
    }

    public List<Map<String, Object>> getUserList(Map<String, Object> params) {
        return selectList("common.getUserList", params);
    }

    public int getUserListTotal(Map<String, Object> map) {
        return (int) selectOne("common.getUserListTotal", map);
    }
    public void insOneFileInfo(Map<String, Object> params) { insert("common.insOneFileInfo", params);}
    public void updOneFileInfo(Map<String, Object> params) { update("common.updOneFileInfo", params);}
}
