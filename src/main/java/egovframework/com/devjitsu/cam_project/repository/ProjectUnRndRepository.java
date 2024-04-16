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

    public Map<String,Object> getMemberIdCheck (Map<String,Object> params) {return (Map<String,Object>)selectOne("unRnd.getMemberIdCheck", params);}

    public void insUnRndDetail(Map<String, Object> params) {
        insert("unRnd.insUnRndDetail", params);
    }

    public void insUnRndDetail2(Map<String, Object> params) {
        insert("unRnd.insUnRndDetail2", params);
    }

    public void updUnRndDetail(Map<String, Object> params) {
        update("unRnd.updUnRndDetail", params);
    }

    public void updUnRndDetail2(Map<String, Object> params) {
        update("unRnd.updUnRndDetail2", params);
    }

    public void updUnRndFileSn(Map<String, Object> fileInsMap) {
        update("unRnd.updUnRndFileSn", fileInsMap);
    }

    public void updUnRndTotResCost(Map<String, Object> fileInsMap) {
        update("unRnd.updUnRndTotResCost", fileInsMap);
    }

    public void updUnRndTotResCost2(Map<String, Object> fileInsMap) {
        update("unRnd.updUnRndTotResCost2", fileInsMap);
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

    public List<Map<String, Object>> getConTeacherList(Map<String, Object> params) {
        return selectList("unRnd.getConTeacherList", params);
    }
    public List<Map<String, Object>> getPersonList(Map<String, Object> params) {
        return selectList("unRnd.getPersonList", params);
    }
    public Map<String, Object> getPersonData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getPersonData", params);
    }
    public Map<String, Object> getPersonReqData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getPersonReqData", params);
    }
    public Map<String, Object> getTeacherData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getTeacherData", params);
    }
    public List<Map<String, Object>> getLectureTeacherReqList(Map<String, Object> params) {
        return selectList("unRnd.getLectureTeacherReqList", params);
    }
    public List<Map<String, Object>> getConTeacherReqList(Map<String, Object> params) {
        return selectList("unRnd.getConTeacherReqList", params);
    }
    public List<Map<String, Object>> getLecturePersonReqList(Map<String, Object> params) {
        return selectList("unRnd.getLecturePersonReqList", params);
    }
    public List<Map<String, Object>> getLecturePersonDupleCk(Map<String, Object> params) {
        return selectList("unRnd.getLecturePersonDupleCk", params);
    }
    public List<Map<String, Object>> getLectureList(Map<String, Object> params) {
        return selectList("unRnd.getLectureList", params);
    }

    public List<Map<String, Object>> getConsultingList(Map<String, Object> params) {
        return selectList("unRnd.getConsultingList", params);
    }
    public Map<String, Object> getLectureInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getLectureInfo", params);
    }
    public List<Map<String, Object>> getLectureTeacherInfo(Map<String, Object> params) {
        return selectList("unRnd.getLectureTeacherInfo", params);
    }
    public Map<String, Object> getConsultingInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getConsultingInfo", params);
    }
    public List<Map<String, Object>> getConsultingTeacherInfo(Map<String, Object> params) {
        return selectList("unRnd.getConsultingTeacherInfo", params);
    }
    public void insLectureTeacherInfo(Map<String, Object> params) {
        insert("unRnd.insLectureTeacherInfo", params);
    }

    public void insConTeacherInfo(Map<String, Object> params) {
        insert("unRnd.insConTeacherInfo", params);
    }
    public void updConTeacherInfo(Map<String, Object> params) {
        insert("unRnd.updConTeacherInfo", params);
    }
    public void insLecturePersonInfo(Map<String, Object> params) {
        insert("unRnd.insLecturePersonInfo", params);
    }
    public void insPersonData(Map<String, Object> params) {
        insert("unRnd.insPersonData", params);
    }
    public void updPersonData(Map<String, Object> params) {
        update("unRnd.updPersonData", params);
    }
    public void insTeacherData(Map<String, Object> params) {
        insert("unRnd.insTeacherData", params);
    }
    public void updTeacherData(Map<String, Object> params) {
        update("unRnd.updTeacherData", params);
    }
    public void delPersonData(Map<String, Object> params) {
        update("unRnd.delPersonData", params);
    }
    public void delTeacherData(Map<String, Object> params) {
        update("unRnd.delTeacherData", params);
    }
    public void insLectureInfo(Map<String, Object> params) {
        insert("unRnd.insLectureInfo", params);
    }
    public void insConsultingInfo(Map<String, Object> params) {
        insert("unRnd.insConsultingInfo", params);
    }
    public void updLectureInfo(Map<String, Object> params) {update("unRnd.updLectureInfo", params);}
    public void updLectureInfo2(Map<String, Object> params) {update("unRnd.updLectureInfo2", params);}
    public void updLectureTime(Map<String, Object> params) {update("unRnd.updLectureTime", params);}
    public void updConsultingTime(Map<String, Object> params) {update("unRnd.updConsultingTime", params);}
    public void updConsultingInfo(Map<String, Object> params) {update("unRnd.updConsultingInfo", params);}
    public void updPersonApp(Map<String, Object> params) {
        update("unRnd.updPersonApp", params);
    }
    public void updPersonPartic(Map<String, Object> params) {
        update("unRnd.updPersonPartic", params);
    }
    public void updPersonAudit(Map<String, Object> params) {
        update("unRnd.updPersonAudit", params);
    }
    public void updPersonRefund(Map<String, Object> params) {
        update("unRnd.updPersonRefund", params);
    }
    public void updPersonPay(Map<String, Object> params) {
        update("unRnd.updPersonPay", params);
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
    public void delConTeacherInfo(Map<String, Object> params) {
        update("unRnd.delConTeacherInfo", params);
    }
    public void insConTeacherTimeInfo(Map<String, Object> params) {
        update("unRnd.insConTeacherTimeInfo", params);
    }
    public void setLecCopyInsert(Map<String, Object> params) {
        insert("unRnd.setLecCopyInsert", params);
    }
    public void setLecTeacherCopyInsert(Map<String, Object> params) {
        insert("unRnd.setLecTeacherCopyInsert", params);
    }
    public void delLecture(Map<String, Object> params) {update("unRnd.delLecture", params);}
    public void delConsulting(Map<String, Object> params) {update("unRnd.delConsulting", params);}

    public void updUnRndProjectInfoRes(Map<String, Object> params) {
        update("unRnd.updUnRndProjectInfoRes", params);
    }

    public void updateUnRndDelvApprStat(Map<String, Object> params) {
        update("unRnd.updateUnRndDelvApprStat", params);
    }
    public void updateUnRndDelvFinalApprStat(Map<String, Object> params) {
        update("unRnd.updateUnRndDelvFinalApprStat", params);
    }

    public void updateUnRndResApprStat(Map<String, Object> params) {
        update("unRnd.updateUnRndResApprStat", params);
    }
    public void updateUnRndResFinalApprStat(Map<String, Object> params) {
        update("unRnd.updateUnRndResFinalApprStat", params);
    }

    public List<Map<String, Object>> getPopCrmList(Map<String, Object> params) {return selectList("unRnd.getPopCrmList", params);}
    public Map<String, Object> getPopCrmOne(Map<String, Object> params) {return (Map<String, Object>)selectOne("unRnd.getPopCrmOne", params);}
}
