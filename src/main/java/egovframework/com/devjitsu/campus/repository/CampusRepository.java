package egovframework.com.devjitsu.campus.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CampusRepository extends AbstractDAO  {

    public List<Map<String, Object>> getCodeList(Map<String, Object> params) { return selectList("campus.getCodeList", params); }
    public Map<String, Object> getCodeOne(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getCodeOne", params); }
    public Map<String, Object> getRealEduTimeYear(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealEduTimeYear", params); }
    public Map<String, Object> getRealEduTimeStudyWeekly(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealEduTimeStudyWeekly", params); }
    public Map<String, Object> getRealEduTimePropagUsertWeekly(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealEduTimePropagUsertWeekly", params); }
    public Map<String, Object> getRealEduTimeOjtUserToday(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealEduTimeOjtUserToday", params); }
    public Map<String, Object> getRealEduTimeOjtMngToday(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealEduTimeOjtMngToday", params); }
    public Map<String, Object> getRealEduTimePropagMngtWeekly(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealEduTimePropagMngtWeekly", params); }
    public Map<String, Object> getRealStudyTimeStudyWeekly(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealStudyTimeStudyWeekly", params); }
    public Map<String, Object> getRealPropagTimeStudyWeekly(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealPropagTimeStudyWeekly", params); }
    public Map<String, Object> getRealOjtTimeStudyToday(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealOjtTimeStudyToday", params); }
    public Map<String, Object> getRealOjtOneTimeStudyToday(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealOjtOneTimeStudyToday", params); }
    public Map<String, Object> getStudyInfoCountStudyWeekly(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getStudyInfoCountStudyWeekly", params); }
    public Map<String, Object> getPropagInfoCountStudyWeekly(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getPropagInfoCountStudyWeekly", params); }
    public Map<String, Object> getOjtInfoCountStudyToday(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getOjtInfoCountStudyToday", params); }
    public Map<String, Object> getRealEduTimePropagWeekly(Map<String, Object> params) { return (Map<String, Object>)selectOne("campus.getRealEduTimePropagWeekly", params); }

    public List<Map<String, Object>> getEduInfoList(Map<String, Object> params) {
        return selectList("campus.getEduInfoList", params);
    }

    public List<Map<String, Object>> getEduResponsableList(Map<String, Object> params) {
        return selectList("campus.getEduResponsableList", params);
    }
    public void setEduInfoDelete(Map<String, Object> params) { update("campus.setEduInfoDelete", params); }

    public void setOpenStudyInfoDelete(Map<String, Object> params) { update("campus.setOpenStudyInfoDelete", params); }
    public void setStudyInfoDelete(Map<String, Object> params) { update("campus.setStudyInfoDelete", params); }

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

    public List<Map<String, Object>> getStudyInfoStatList(Map<String, Object> params) {return selectList("campus.getStudyInfoStatList", params); }
    public List<Map<String, Object>> getStudyInfoList(Map<String, Object> params) {return selectList("campus.getStudyInfoList", params); }
    public Map<String, Object> getStudyInfoOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getStudyInfoOne", params); }
    public Map<String, Object> getOjtResultInfoOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getOjtResultInfoOne", params); }
    public Map<String, Object> getOjtOjtResultSnOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getOjtOjtResultSnOne", params); }
    public List<Map<String, Object>> getStudyUserList(Map<String, Object> params) { return selectList("campus.getStudyUserList", params); }
    public List<Map<String, Object>> getStudyJournalList(Map<String, Object> params) { return selectList("campus.getStudyJournalList", params); }
    public Map<String, Object> getStudyJournalOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getStudyJournalOne", params); }

    public Map<String, Object> getStudyPropagInfoOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getStudyPropagInfoOne", params); }
    public List<Map<String, Object>> getStudyPropagList(Map<String, Object> params) { return selectList("campus.getStudyPropagList", params); }
    public List<Map<String, Object>> getStudyPropagUserList(Map<String, Object> params) { return selectList("campus.getStudyPropagUserList", params); }
    public List<Map<String, Object>> getStudyPropagUserInfo(Map<String, Object> params) { return selectList("campus.getStudyPropagUserInfo", params); }
    public List<Map<String, Object>> getStudyPropagUserInfo2(Map<String, Object> params) { return selectList("campus.getStudyPropagUserInfo2", params); }
    public List<Map<String, Object>> getStudyOjtUserInfo(Map<String, Object> params) { return selectList("campus.getStudyOjtUserInfo", params); }
    public List<Map<String, Object>> getOjtPlanList(Map<String, Object> params) { return selectList("campus.getOjtPlanList", params); }
    public Map<String, Object> getOjtPlanOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getOjtPlanOne", params); }
    public List<Map<String, Object>> getOjtResultList(Map<String, Object> params) { return selectList("campus.getOjtResultList", params); }
    public Map<String, Object> getOjtResultOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getOjtResultOne", params); }

    public List<Map<String, Object>> getOpenStudyInfoStatList(Map<String, Object> params) { return selectList("campus.getOpenStudyInfoStatList", params); }
    public List<Map<String, Object>> getOpenStudyInfoList(Map<String, Object> params) { return selectList("campus.getOpenStudyInfoList", params); }
    public List<Map<String, Object>> getOpenStudyInfoAdminList(Map<String, Object> params) { return selectList("campus.getOpenStudyInfoAdminList", params); }
    public Map<String, Object> getOpenStudyInfoOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getOpenStudyInfoOne", params); }
    public List<Map<String, Object>> getOpenStudyUserList(Map<String, Object> params) { return selectList("campus.getOpenStudyUserList", params); }
    public List<Map<String, Object>> getOpenStudyUserList2(Map<String, Object> params) { return selectList("campus.getOpenStudyUserList2", params); }
    public Map<String, Object> getOpenStudyResultList(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getOpenStudyResultList", params); }

    public List<Map<String, Object>> getCommonEduStatList(Map<String, Object> params) { return selectList("campus.getCommonEduStatList", params); }
    public List<Map<String, Object>> getCommonEduList(Map<String, Object> params) { return selectList("campus.getCommonEduList", params); }
    public List<Map<String, Object>> getCommonEduMngList(Map<String, Object> params) { return selectList("campus.getCommonEduMngList", params); }
    public Map<String, Object> getCommonEduOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getCommonEduOne", params); }
    public List<Map<String, Object>> getCommonEduUserList(Map<String, Object> params) { return selectList("campus.getCommonEduUserList", params); }
    public List<Map<String, Object>> getCommonEduUserAddList(Map<String, Object> params) { return selectList("campus.getCommonEduUserAddList", params); }

    public List<Map<String, Object>> getEduStat(Map<String, Object> params) {
        return selectList("campus.getEduStat", params);
    }

    public List<Map<String, Object>> getEduAllStatList(Map<String, Object> params) {
        return selectList("campus.getEduAllStatList", params);
    }

    public List<Map<String, Object>> getEduMyStatList(Map<String, Object> params) {
        return selectList("campus.getEduMyStatList", params);
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

    public Map<String, Object> getEduInfoFile(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getEduInfoFile", params);
    }

    public List<Map<String, Object>> getEduInfoFileList(Map<String, Object> params) {
        return selectList("campus.getEduInfoFile", params);
    }

    public List<Map<String, Object>> getEduResultInfoFileList(Map<String, Object> params) {
        return selectList("campus.getEduResultInfoFile", params);
    }





    public void setEduInfoInsert(Map<String, Object> params) { insert("campus.setEduInfoInsert", params); }
    public void setEduInfoModify(Map<String, Object> params) { insert("campus.setEduInfoModify", params); }
    public void setEduInfoUpdate(Map<String, Object> params) { update("campus.setEduInfoUpdate", params); }
    public void setEduResultInsert(Map<String, Object> params) { insert("campus.setEduResultInsert", params); }
    public void setEduResultModify(Map<String, Object> params) { update("campus.setEduResultModify", params); }
    public void setMngCheckUpd(Map<String, Object> params) { update("campus.setMngCheckUpd", params); }
    public void setEduResultEduTimeUpd(Map<String, Object> params) { update("campus.setEduResultEduTimeUpd", params); }

    public void setStudyInfoInsert(Map<String, Object> params) { insert("campus.setStudyInfoInsert", params); }
    public void setStudyInfoModify(Map<String, Object> params) {update("campus.setStudyInfoModify", params); }

    public void setStudyUserInsert(Map<String, Object> params) { insert("campus.setStudyUserInsert", params); }
    public void setStudyUserMngUpdate(Map<String, Object> params) { update("campus.setStudyUserMngReset", params); update("campus.setStudyUserMngUpdate", params); }
    public void studyReq(Map<String, Object> params) { update("campus.studyReq", params); }
    public void setStudyJournalInsert(Map<String, Object> params) { insert("campus.setStudyJournalInsert", params); }
    public void setStudyJournalModify(Map<String, Object> params) { update("campus.setStudyJournalModify", params); }
    public void setStudyResultUserDelete(Map<String, Object> params) {delete("campus.setStudyResultUserDelete", params);}
    public void setOjtUserDelete(Map<String, Object> params) {delete("campus.setOjtUserDelete", params);}
    public void setStudyJournalApp(Map<String, Object> params) { update("campus.setStudyJournalApp", params); }
    public void setOjtPlanInsert(Map<String, Object> params) { insert("campus.setOjtPlanInsert", params); }
    public void setOjtPlanUpdate(Map<String, Object> params) { update("campus.setOjtPlanUpdate", params); }
    public void setOjtPlanDelete(Map<String, Object> params) { update("campus.setOjtPlanDelete", params); }
    public void setOjtResultInsert(Map<String, Object> params) { insert("campus.setOjtResultInsert", params); }
    public void setOjtUserInsert(Map<String, Object> params) { insert("campus.setOjtUserInsert", params); }
    public void setPropagUserInsert(Map<String, Object> params) { insert("campus.setPropagUserInsert", params); }
    public void setPropagUserDelete(Map<String, Object> params) {delete("campus.setPropagUserDelete", params);}
    public void setPropagDelete(Map<String, Object> params) { delete("campus.setPropagDelete", params); }
    public void setResultPropagUpd(Map<String, Object> params) { update("campus.setResultPropagUpd", params); }
    public void setResultPropagUserUpd(Map<String, Object> params) { update("campus.setResultPropagUserUpd", params); }
    public void setStudyPropagInsert(Map<String, Object> params) { insert("campus.setStudyPropagInsert", params); }
    public void setStudyPropagModify(Map<String, Object> params) { update("campus.setStudyPropagModify", params); }
    public void setOjtResultModify(Map<String, Object> params) { update("campus.setOjtResultModify", params); }
    public void setOpenStudyInfoIns(Map<String, Object> params) { insert("campus.setOpenStudyInfoIns", params); }

    public void setOpenStudyRealEduTimeUpd(Map<String, Object> params) { update("campus.setOpenStudyRealEduTimeUpd", params); }
    public void setOpenStudyInfoUpd(Map<String, Object> params) { update("campus.setOpenStudyInfoUpd", params); }
    public List<Map<String, Object>> getRealEduTimeCheck(Map<String, Object> params) { return selectList("campus.getRealEduTimeCheck", params); }
    public void setOpenNextStep(Map<String, Object> params) { update("campus.setOpenNextStep", params); }
    public boolean getOpenStudyUserDoubleChk(Map<String, Object> params) {return (boolean) selectOne("campus.getOpenStudyUserDoubleChk", params);}
    public void setOpenStudyUser(Map<String, Object> params) { insert("campus.setOpenStudyUser", params); }
    public void setOpenStudyResultUpd(Map<String, Object> params) { update("campus.setOpenStudyResultUpd", params); }
    public void setOpenStudyUserResultUpd(Map<String, Object> params) { update("campus.setOpenStudyUserResultUpd", params); }
    public void delOpenStudyUser(Map<String, Object> params) { delete("campus.delOpenStudyUser", params); }
    public void setOpenStudyCertReq(Map<String, Object> params) { update("campus.setOpenStudyCertReq", params); }
    public void setCommonEduIns(Map<String, Object> params) { insert("campus.setCommonEduIns", params); }
    public void setCommonEduUpd(Map<String, Object> params) { update("campus.setCommonEduUpd", params); }
    public void setCommonEduAddUserAll(Map<String, Object> params) { insert("campus.setCommonEduAddUserAll", params); }
    public void setCommonEduUserUpd(Map<String, Object> params) { update("campus.setCommonEduUserUpd", params); }
    public void setCommonEduUserTimeUpd(Map<String, Object> params) { update("campus.setCommonEduUserTimeUpd", params); }

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

    public void updateStudyApprStat(Map<String, Object> params) {
        update("campus.updateStudyApprStat", params);
    }

    public void updateStudyFinalApprStat(Map<String, Object> params) {
        update("campus.updateStudyFinalApprStat", params);
    }

    public void updateStudyResApprStat(Map<String, Object> params) {
        update("campus.updateStudyResApprStat", params);
    }

    public void updateStudyResFinalApprStat(Map<String, Object> params) {
        update("campus.updateStudyResFinalApprStat", params);
    }

    public void updatePropagResApprStat(Map<String, Object> params) {
        update("campus.updatePropagResApprStat", params);
    }

    public void updatePropagResFinalApprStat(Map<String, Object> params) {
        update("campus.updatePropagResFinalApprStat", params);
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
    public void setTargetCertReq(Map<String, Object> params) { update("campus.setTargetCertReq", params); }
    public void setDutyCertReq(Map<String, Object> params) { update("campus.setDutyCertReq", params); }

    public Map<String, Object> getApprEmpInfo(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getApprEmpInfo", params); }

    public void setStudyJournalUpdate(Map<String, Object> fileInsMap) {
        update("campus.setStudyJournalUpdate", fileInsMap);
    }
    public void setStudyPropagUpdate(Map<String, Object> fileInsMap) {
        update("campus.setStudyPropagUpdate", fileInsMap);
    }

    public void deleteStudyJournal(Map<String, Object> params) {
        delete("campus.deleteStudyJournal", params);
    }

    public void setStudyInfoComplete(Map<String, Object> params) {
        update("campus.setStudyInfoComplete", params);
    }

    public void setPropagInfoComplete(Map<String, Object> params) {
        update("campus.setPropagInfoComplete", params);
    }

    public void setStudyResultModify(Map<String, Object> params) {
        insert("campus.setStudyResultModify", params);
    }

    public void setStudyResult(Map<String, Object> params) {insert("campus.setStudyResult", params);}

    public void setOjtOjtResultInsert(Map<String, Object> params) {insert("campus.setOjtOjtResultInsert", params);}

    public void setOjtOjtResultModify(Map<String, Object> params) {update("campus.setOjtOjtResultModify", params);}

    public void setStudyResultY(Map<String, Object> params) {update("campus.setStudyResultY", params);}

    public Map<String, Object> getStudyResultData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getStudyResultData", params);
    }

    public void setStudyResultComplete(Map<String, Object> params) {
        update("campus.setStudyResultComplete", params);
    }

    public Map<String, Object> getStudyResultOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getStudyResultOne", params);
    }

    public List<Map<String, Object>> getStudyResultList(Map<String, Object> params) {
        return selectList("campus.getStudyResultList", params);
    }

    public Map<String, Object> getStudyUserInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getStudyUserInfo", params);
    }

    public void setStudyResultUserInsert(Map<String, Object> params) {
        insert("campus.setStudyResultUserInsert", params);
    }

    public void deleteStudyResultUser(Map<String, Object> params) {
        delete("campus.deleteStudyResultUser", params);
    }

    public void setStudyResultSc(Map<String, Object> params) {
        update("campus.setStudyResultSc", params);
    }

    public void deleteOjtResult(Map<String, Object> params) {
        delete("campus.deleteOjtResult", params);
    }

    public void deleteOjtUser(Map<String, Object> params) {
        delete("campus.deleteOjtUser", params);
    }

    public void setOjtResultUpdate(Map<String, Object> fileInsMap) {
        update("campus.setOjtResultUpdate", fileInsMap);
    }

    public Object getOpenStudyUserCount(Map<String, Object> params){
        return (int) selectOne("campus.getOpenStudyUserCount", params);
    }
    public void setStudyUserDelete(Map<String, Object> params) {delete("campus.setStudyUserDelete", params);}
    public Map<String, Object> getStudyOjtInfoOne(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getStudyOjtInfoOne", params); }

    public Map<String, Object> getOjtOjtResultCount(Map<String, Object> params) { return (Map<String, Object>) selectOne("campus.getOjtOjtResultCount", params); }

    public Map<String, Object> getEmpTeamOrDept(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getEmpTeamOrDept", params);
    }

    public void agreeLd(Map<String, Object> params) {
        update("campus.agreeLd", params);
    }


    public void agreeMng(Map<String, Object> params) {
        update("campus.agreeMng", params);
    }

    public void agreeDutyLd(Map<String, Object> params) {
        update("campus.agreeDutyLd", params);
    }

    public void agreeDutyMng(Map<String, Object> params) {
        update("campus.agreeDutyMng", params);
    }

    public Map<String, Object> getEduTargetOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getEduTargetOne", params);
    }

    public void delPsCheck(Map<String, Object> params) {
        delete("campus.delPsCheck", params);
    }

    public void updPsStatus(Map<String, Object> params) {
        update("campus.updPsStatus", params);
    }

    public void updPsCancel(Map<String, Object> params) {
        update("campus.updPsCancel", params);
    }

    public Map<String, Object> getEduTargetPkOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("campus.getEduTargetPkOne", params);
    }

    public void delPropagUserDelete(Map<String, Object> params) {
        delete("campus.delPropagUserDelete", params);
    }

    public void updateApprStatMaster(Map<String, Object> params) {
        update("campus.updateApprStatMaster", params);
    }

    public void setDutyCertReqMaster(Map<String, Object> params) {
        update("campus.setDutyCertReqMaster", params);
    }
}
