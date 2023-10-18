package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class ProjectUnRndRepository extends AbstractDAO {


    public void insSubjectInfo(Map<String, Object> params) {
        insert("projectUnRnd.insSubjectInfo", params);
    }

    public void updSubjectInfo(Map<String, Object> params) {
        update("projectUnRnd.updSubjectInfo", params);
    }
}
