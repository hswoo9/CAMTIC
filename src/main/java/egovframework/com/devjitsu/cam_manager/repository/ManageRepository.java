package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ManageRepository extends AbstractDAO {

    public List<Map<String, Object>> getMemList(Map<String, Object> params) {
        return selectList("manage.getMemList", params);
    }

    public Map<String, Object> getProjectData(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("manage.getProjectData", map);
    }
}
