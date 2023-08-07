package egovframework.com.devjitsu.cam_crm.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CrmRepository extends AbstractDAO {
    public List<Map<String, Object>> getPopCrmList(Map<String, Object> params) {

        return selectList("crm.getPopCrmList", params);
    }

    public Map<String, Object> getCrmData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("crm.getCrmData", params);
    }
}
