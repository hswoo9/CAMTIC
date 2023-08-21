package egovframework.com.devjitsu.campus.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CampusRepository extends AbstractDAO  {
    public List<Map<String, Object>> getCodeList(Map<String, Object> params) {
        return selectList("campus.getCodeList", params);
    }

    public List<Map<String, Object>> getEduInfoList(Map<String, Object> params) {
        return selectList("campus.getEduInfoList", params);
    }

    public Map<String, Object> getEduInfoOne(Map<String, Object> params) {
        return (Map<String, Object>)selectOne("campus.getEduInfoOne", params);
    }

    public Map<String, Object> getEduResultOne(Map<String, Object> params) {
        return (Map<String, Object>)selectOne("campus.getEduResultOne", params);
    }

    public List<Map<String, Object>> getTargetYearList(Map<String, Object> params) {
        return selectList("campus.getTargetYearList", params);
    }

    public List<Map<String, Object>> getTargetOne(Map<String, Object> params) {
        return selectList("campus.getTargetOne", params);
    }

    public List<Map<String, Object>> getTargetList(Map<String, Object> params) {
        return selectList("campus.getTargetList", params);
    }

    public Map<String, Object> getCategoryOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getCategoryOne", params);
    }

    public List<Map<String, Object>> getTargetCategoryList(Map<String, Object> params) {
        return selectList("campus.getTargetCategoryList", params);
    }

    public List<Map<String, Object>> getTargetCategoryDetailList(Map<String, Object> params) {
        return selectList("campus.getTargetCategoryDetailList", params);
    }

    public List<Map<String, Object>> getEduCategoryList(Map<String, Object> params) {
        return selectList("campus.getEduCategoryList", params);
    }

    public List<Map<String, Object>> getEduCategoryDetailList(Map<String, Object> params) {
        return selectList("campus.getEduCategoryDetailList", params);
    }

    public List<Map<String, Object>> getEduPlanList(Map<String, Object> params) {
        return selectList("campus.getEduPlanList", params);
    }

    public List<Map<String, Object>> getEduPlanOne(Map<String, Object> params) {
        return selectList("campus.getEduPlanOne", params);
    }

    public List<Map<String, Object>> getStudyInfoList(Map<String, Object> params) {
        return selectList("campus.getStudyInfoList", params);
    }

    public Map<String, Object> getStudyInfoOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getStudyInfoOne", params);
    }

    public List<Map<String, Object>> getStudyUserList(Map<String, Object> params) {
        return selectList("campus.getStudyUserList", params);
    }

    public List<Map<String, Object>> getStudyJournalList(Map<String, Object> params) {
        return selectList("campus.getStudyJournalList", params);
    }

    public Map<String, Object> getStudyJournalOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getStudyJournalOne", params);
    }

    public List<Map<String, Object>> getEduStat(Map<String, Object> params) {
        return selectList("campus.getEduStat", params);
    }

    public List<Map<String, Object>> getEduAllStatList(Map<String, Object> params) {
        return selectList("campus.getEduAllStatList", params);
    }




    public void setEduInfoInsert(Map<String, Object> params) {
        insert("campus.setEduInfoInsert", params);
    }

    public void setEduInfoUpdate(Map<String, Object> params) {
        update("campus.setEduInfoUpdate", params);
    }

    public void setEduResultInsert(Map<String, Object> params) {
        insert("campus.setEduResultInsert", params);
    }

    public void setStudyInfoInsert(Map<String, Object> params) { insert("campus.setStudyInfoInsert", params); }

    public void setStudyUserInsert(Map<String, Object> params) { insert("campus.setStudyUserInsert", params); }
    public void setStudyUserMngUpdate(Map<String, Object> params) { update("campus.setStudyUserMngReset", params); update("campus.setStudyUserMngUpdate", params); }
    public void studyReq(Map<String, Object> params) { update("campus.studyReq", params); }
    public void setStudyJournalInsert(Map<String, Object> params) { insert("campus.setStudyJournalInsert", params); }
    public void setStudyJournalApp(Map<String, Object> params) { update("campus.setStudyJournalApp", params); }

    public void setTargetInsert(Map<String, Object> params) {
        insert("campus.setTargetInsert", params);
    }

    public void setTargetDetailInsert(Map<String, Object> params) {
        insert("campus.setTargetDetailInsert", params);
    }

    public void setEduTargetDetailUpdate(Map<String, Object> params) {
        update("campus.setEduTargetDetailUpdate", params);
    }

    public void setTargetDetailDelete(Map<String, Object> params) {
        delete("campus.setTargetDetailDelete", params);
    }

    public void setEduPlanInsert(Map<String, Object> params) {
        insert("campus.setEduPlanInsert", params);
    }

    public void setEduPlanUpdate(Map<String, Object> params) {
        update("campus.setEduPlanUpdate", params);
    }

    public void updateEduInfoApprStat(Map<String, Object> params) {
        update("campus.updateEduInfoApprStat", params);
    }

    public void updateEduInfoFinalApprStat(Map<String, Object> params) {
        update("campus.updateEduInfoFinalApprStat", params);
    }

    public void updateEduResultApprStat(Map<String, Object> params) {
        update("campus.updateEduResultApprStat", params);
    }

    public void updateEduResultFinalApprStat(Map<String, Object> params) {
        update("campus.updateEduResultFinalApprStat", params);
    }

    public void updateApprStat(Map<String, Object> params) {
        update("campus.updateApprStat", params);
    }
}
