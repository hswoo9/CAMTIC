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

    public void insAccountInfo(Map<String, Object> params) {
        insert("projectRnd.insAccountInfo", params);
    }

    public void delAccountInfo(Map<String, Object> params) {
        delete("projectRnd.delAccountInfo", params);
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

    public void updRschData(Map<String, Object> params) {
        update("projectRnd.updRschData", params);
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

    public void updRschStatus(Map<String, Object> params) {
        update("projectRnd.updRschStatus", params);
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

    public List<Map<String, Object>> getRndDevJobList(Map<String, Object> params) {
        return selectList("projectRnd.getRndDevJobList", params);
    }

    public Map<String, Object> getDevJobData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectRnd.getDevJobData", params);
    }

    public void updDevJobInfo(Map<String, Object> params) {
        update("projectRnd.updDevJobInfo", params);
    }

    public List<Map<String, Object>> getDevSchInfo(Map<String, Object> params) {
        return selectList("projectRnd.getDevSchInfo", params);
    }

    public Map<String, Object> getRndDetail(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectRnd.getRndDetail", params);
    }

    public void insRndDetail(Map<String, Object> params) {
        insert("projectRnd.insRndDetail", params);
    }
    public void insRndDetail2(Map<String, Object> params) {
        insert("projectRnd.insRndDetail2", params);
    }

    public void updRndDetail(Map<String, Object> params) {
        update("projectRnd.updRndDetail", params);
    }
    public void updRndDetail2(Map<String, Object> params) {
        update("projectRnd.updRndDetail2", params);
    }

    public void updPjtSepRnd(Map<String, Object> fileInsMap) {
        update("projectRnd.updPjtSepRnd", fileInsMap);
    }

    public void updRndFileSn(Map<String, Object> fileInsMap) {
        update("projectRnd.updRndFileSn", fileInsMap);
    }

    public void updRndTotResCost(Map<String, Object> fileInsMap) {
        update("projectRnd.updRndTotResCost", fileInsMap);
    }

    public void updRndTotResCost2(Map<String, Object> fileInsMap) {
        update("projectRnd.updRndTotResCost2", fileInsMap);
    }

    public void setDelvApprove(Map<String, Object> params) {
        update("projectRnd.setDelvApprove", params);
    }

    public void updRndProjectInfo(Map<String, Object> params) {
        update("projectRnd.updRndProjectInfo", params);
    }

    public void updRndProjectInfoRes(Map<String, Object> params) {
        update("projectRnd.updRndProjectInfoRes", params);
    }

    public Map<String, Object> getReqPartRateData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectRnd.getReqPartRateData", params);
    }

    public void insReqPartRateData(Map<String, Object> params) {
        insert("projectRnd.insReqPartRateData", params);
    }

    public void updReqPartRateData(Map<String, Object> params) {
        update("projectRnd.updReqPartRateData", params);
    }

    public void insReqPartRateVerData(Map<String, Object> params) {
        insert("projectRnd.insReqPartRateVerData", params);
    }

    public void setPartRateRequest(Map<String, Object> params) {
        update("projectRnd.setPartRateRequest", params);
    }

    public List<Map<String, Object>> getReqPartRateVerList(Map<String, Object> params) {
        return selectList("projectRnd.getReqPartRateVerList", params);
    }

    public List<Map<String, Object>> getAccountInfo(Map<String, Object> params) {
        return selectList("projectRnd.getAccountInfo", params);
    }

    public List<Map<String, Object>> getChangeList(Map<String, Object> params) {
        return selectList("projectRnd.getChangeList", params);
    }

    public int getPartRateVerCount(Map<String, Object> map) {
        return (int) selectOne("projectRnd.getPartRateVerCount", map);
    }

    public Map<String, Object> getPartRateDetail(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectRnd.getPartRateDetail", params);
    }

    public void insPartRateDetail(Map<String, Object> params) {
        insert("projectRnd.insPartRateDetail", params);
    }

    public void delPartRateDetail(Map<String, Object> params) {
        delete("projectRnd.delPartRateDetail", params);
    }

    public void updReqPartRateStatus(Map<String, Object> params) {
        update("projectRnd.updReqPartRateStatus", params);
    }

    public Map<String, Object> getPjtDevSchData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("projectRnd.getPjtDevSchData", params);
    }

    public void tmpUpdDevPlanApprove(Map<String, Object> params) {
        update("projectRnd.tmpUpdDevPlanApprove", params);
    }

    public void insPjtPsRnd(Map<String, Object> params) {
        insert("projectRnd.insPjtPsRnd", params);
    }

    public void updPjtPsRnd(Map<String, Object> params) {
        update("projectRnd.updPjtPsRnd", params);
    }

    public void delPjtPsRnd(Map<String, Object> params) {
        delete("projectRnd.delPjtPsRnd", params);
    }

    public void updateRndDelvApprStat(Map<String, Object> params) {
        update("projectRnd.updateRndDelvApprStat", params);
    }
    public void updateRndDelvFinalApprStat(Map<String, Object> params) {
        update("projectRnd.updateRndDelvFinalApprStat", params);
    }

    public void updateRndDevApprStat(Map<String, Object> params) {
        update("projectRnd.updateRndDevApprStat", params);
    }
    public void updateRndDevFinalApprStat(Map<String, Object> params) {
        update("projectRnd.updateRndDevFinalApprStat", params);
    }

    public void updateRndResApprStat(Map<String, Object> params) {
        update("projectRnd.updateRndResApprStat", params);
    }
    public void updateRndResFinalApprStat(Map<String, Object> params) {
        update("projectRnd.updateRndResFinalApprStat", params);
    }

    public void insChangeInfo(Map<String, Object> params) {
        insert("projectRnd.insChangeInfo", params);
    }

    public void updateChangeApprStat(Map<String, Object> params) {
        update("projectRnd.updateChangeApprStat", params);
    }
    public void updateChangeFinalApprStat(Map<String, Object> params) {
        update("projectRnd.updateChangeFinalApprStat", params);
    }

    public void updateRateApprStat(Map<String, Object> params) {
        update("projectRnd.updateRateApprStat", params);
    }
    public void updateRateFinalApprStat(Map<String, Object> params) {
        update("projectRnd.updateRateFinalApprStat", params);
    }

    public void updPartRateVer(Map<String, Object> params) {
        update("projectRnd.updPartRateVer", params);
    }

    public void insPartRateDetBef(Map<String, Object> map) {
        insert("projectRnd.insPartRateDetBef", map);
    }

    public Map<String, Object> getPartRateVerBerData(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("projectRnd.getPartRateVerBerData", map);
    }

    public void updReqPartRateVerToReqPartRate(Map<String, Object> params) {
        update("projectRnd.updReqPartRateVerToReqPartRate", params);
    }

    public void delDevSch(Map<String, Object> params) {
        delete("projectRnd.delDevSch", params);
    }
    public void carryoverApp(Map<String, Object> params) {
        update("projectRnd.carryoverApp", params);
    }
}
