package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProjectRndRepository extends AbstractDAO {


    public void insSubjectInfo(Map<String, Object> params) {
        insert("projectRnd.insSubjectInfo", params);
    }

    public void updSubjectInfo(Map<String, Object> params) {
        update("projectRnd.updSubjectInfo", params);
    }

    public List<Map<String, Object>> getPopRschList(Map<String, Object> params) {
        return selectList("projectRnd.getPopRschList", params);
    }

    public Map<String, Object> getRschData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectRnd.getRschData", params);
    }

    public void insRschData(Map<String, Object> params) {
        insert("projectRnd.insPjtRschData", params);
    }

    public List<Map<String, Object>> getPjtRschInfo(Map<String, Object> params) {
        return selectList("projectRnd.getPjtRschInfo", params);
    }

    public int getRschCount(Map<String, Object> params) {
        return (int) selectOne("projectRnd.getRschCount", params);
    }

    public void delRschData(Map<String, Object> params) {
        delete("projectRnd.delRschData", params);
    }

    public void insDevPjtVer(Map<String, Object> params) {
        insert("projectRnd.insDevPjtVer", params);
    }

    public void updDevInfo(Map<String, Object> params) {
        update("projectRnd.updDevInfo", params);
    }

    public List<Map<String, Object>> getRndDevScheduleList(Map<String, Object> params) {
        return selectList("projectRnd.getRndDevScheduleList", params);
    }

    public void insDevSchData(Map<String, Object> params) {
        insert("projectRnd.insDevSchData", params);
    }
}
