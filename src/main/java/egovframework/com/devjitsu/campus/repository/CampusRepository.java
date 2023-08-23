package egovframework.com.devjitsu.campus.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CampusRepository extends AbstractDAO  {

    public List<Map<String, Object>> getCodeList(Map<String, Object> params) { return selectList("campus.getCodeList", params); }
    public Map<String, Object> getCodeOne(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getCodeOne", params); }

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

    public Map<String, Object> getEduCategoryOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getEduCategoryOne", params); }
    public List<Map<String, Object>> getEduCategoryList(Map<String, Object> params) { return selectList("campus.getEduCategoryList", params); }
    public Map<String, Object> getEduCategoryDetailOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getEduCategoryDetailOne", params); }
    public List<Map<String, Object>> getEduCategoryDetailList(Map<String, Object> params) { return selectList("campus.getEduCategoryDetailList", params); }

    public List<Map<String, Object>> getTargetCategoryList(Map<String, Object> params) {
        return selectList("campus.getTargetCategoryList", params);
    }

    public List<Map<String, Object>> getTargetCategoryDetailList(Map<String, Object> params) {
        return selectList("campus.getTargetCategoryDetailList", params);
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

    public List<Map<String, Object>> getOpenStudyInfoList(Map<String, Object> params) {
        return selectList("campus.getOpenStudyInfoList", params);
    }

    public Map<String, Object> getOpenStudyInfoOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getOpenStudyInfoOne", params);
    }

    public List<Map<String, Object>> getEduStat(Map<String, Object> params) {
        return selectList("campus.getEduStat", params);
    }

    public List<Map<String, Object>> getEduAllStatList(Map<String, Object> params) {
        return selectList("campus.getEduAllStatList", params);
    }

    public List<Map<String, Object>> getDutyInfoList(Map<String, Object> params) {
        return selectList("campus.getDutyInfoList", params);
    }

    public Map<String, Object> getDutyInfoOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getDutyInfoOne", params);
    }

    public List<Map<String, Object>> getDutyInfoMngList(Map<String, Object> params) {
        return selectList("campus.getDutyInfoMngList", params);
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
    public void setOpenStudyInfoIns(Map<String, Object> params) { insert("campus.setOpenStudyInfoIns", params); }
    public void setOpenStudyInfoUpd(Map<String, Object> params) { update("campus.setOpenStudyInfoUpd", params); }
    public void setOpenNextStep(Map<String, Object> params) { update("campus.setOpenNextStep", params); }
    public void setOpenStudyUser(Map<String, Object> params) { update("campus.setOpenStudyUser", params); }

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

    public void setEduCode(Map<String, Object> params) { insert("campus.setEduCode", params); }
    public void setEduCategory(Map<String, Object> params) { insert("campus.setEduCategory", params); }
    public void setEduCategoryDetail(Map<String, Object> params) { insert("campus.setEduCategoryDetail", params); }
    public void setEduCodeUpd(Map<String, Object> params) { update("campus.setEduCodeUpd", params); }
    public void setEduCategoryUpd(Map<String, Object> params) { update("campus.setEduCategoryUpd", params); }
    public void setEduCategoryDetailUpd(Map<String, Object> params) { update("campus.setEduCategoryDetailUpd", params); }
    public void setEduCodeDel(Map<String, Object> params) { update("campus.setEduCodeDel", params); }
    public void setEduCategoryDel(Map<String, Object> params) { update("campus.setEduCategoryDel", params); }
    public void setEduCategoryDetailDel(Map<String, Object> params) { update("campus.setEduCategoryDetailDel", params); }

    public void setDutyInfoIns(Map<String, Object> params) { insert("campus.setDutyInfoIns", params); }
    public void setDutyInfoUpd(Map<String, Object> params) { update("campus.setDutyInfoUpd", params); }
    public void setDutyCertReq(Map<String, Object> params) { update("campus.setDutyCertReq", params); }
}
