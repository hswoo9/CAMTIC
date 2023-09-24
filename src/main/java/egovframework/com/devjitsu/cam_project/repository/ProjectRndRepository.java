package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class ProjectRndRepository extends AbstractDAO {


    public void insSubjectInfo(Map<String, Object> params) {
        insert("projectRnd.insSubjectInfo", params);
    }
}
