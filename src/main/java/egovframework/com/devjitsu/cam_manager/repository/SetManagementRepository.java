package egovframework.com.devjitsu.cam_manager.repository;


import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SetManagementRepository extends AbstractDAO {


    public void insCorpProject(Map<String, Object> params) {
        insert("manage.insCorpProject", params);
    }

    public List<Map<String, Object>> getCorpProjectList(Map<String, Object> params) {
        return selectList("manage.getCorpProjectList", params);
    }

    public Map<String, Object> getCorpProjectData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("manage.getCorpProjectData", params);
    }

    public void updCorpProject(Map<String, Object> params) {
        update("manage.updCorpProject", params);
    }
}
