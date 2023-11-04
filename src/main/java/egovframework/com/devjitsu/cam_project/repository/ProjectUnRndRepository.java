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
    public List<Map<String, Object>> getPersonList(Map<String, Object> params) {
        return selectList("unRnd.getPersonList", params);
    }
    public List<Map<String, Object>> getLectureTeacherReqList(Map<String, Object> params) {
        return selectList("unRnd.getLectureTeacherReqList", params);
    }
    public List<Map<String, Object>> getLecturePersonReqList(Map<String, Object> params) {
        return selectList("unRnd.getLecturePersonReqList", params);
    }
    public List<Map<String, Object>> getLectureList(Map<String, Object> params) {
        return selectList("unRnd.getLectureList", params);
    }
    public Map<String, Object> getLectureInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getLectureInfo", params);
    }
    public void insLectureTeacherInfo(Map<String, Object> params) {
        insert("unRnd.insLectureTeacherInfo", params);
    }
    public void insLecturePersonInfo(Map<String, Object> params) {
        insert("unRnd.insLecturePersonInfo", params);
    }
    public void insLectureInfo(Map<String, Object> params) {
        insert("unRnd.insLectureInfo", params);
    }
    public void updLectureInfo(Map<String, Object> params) {
        update("unRnd.updLectureInfo", params);
    }
    public void updPersonApp(Map<String, Object> params) {
        update("unRnd.updPersonApp", params);
    }
    public void updPersonPartic(Map<String, Object> params) {
        update("unRnd.updPersonPartic", params);
    }
    public void delLecturePersonInfo(Map<String, Object> params) {
        update("unRnd.delLecturePersonInfo", params);
    }
    public void delLectureInfo(Map<String, Object> params) {
        update("unRnd.delLectureInfo", params);
    }
    public void delLectureTeacherInfo(Map<String, Object> params) {
        update("unRnd.delLectureTeacherInfo", params);
    }
}
