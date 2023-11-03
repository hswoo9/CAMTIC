package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProjectUnRndRepository extends AbstractDAO {


    public void insSubjectInfo(Map<String, Object> params) {
        insert("unRnd.insSubjectInfo", params);
    }

    public void updSubjectInfo(Map<String, Object> params) {
        update("unRnd.updSubjectInfo", params);
    }

    public Map<String, Object> getUnRndDetail(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getUnRndDetail", params);
    }

    public void insUnRndDetail(Map<String, Object> params) {
        insert("unRnd.insUnRndDetail", params);
    }

    public void updUnRndDetail(Map<String, Object> params) {
        update("unRnd.updUnRndDetail", params);
    }

    public void updUnRndFileSn(Map<String, Object> fileInsMap) {
        update("unRnd.updUnRndFileSn", fileInsMap);
    }

    public void setDelvApprove(Map<String, Object> params) {
        update("unRnd.setDelvApprove", params);
    }

    public void updUnRndProjectInfo(Map<String, Object> params) {
        update("unRnd.updUnRndProjectInfo", params);
    }

    public List<Map<String, Object>> getLectureTeacherList(Map<String, Object> params) {
        return selectList("unRnd.getLectureTeacherList", params);
    }
    public List<Map<String, Object>> getLectureList(Map<String, Object> params) {
        return selectList("unRnd.getLectureList", params);
    }
    public Map<String, Object> getLectureInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getLectureInfo", params);
    }
    public void insLectureInfo(Map<String, Object> params) {
        insert("unRnd.insLectureInfo", params);
    }
    public void updLectureInfo(Map<String, Object> params) {
        update("unRnd.updLectureInfo", params);
    }
    public void delLectureInfo(Map<String, Object> params) {
        update("unRnd.delLectureInfo", params);
    }
}
