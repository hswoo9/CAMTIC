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

    public void updRndDetail(Map<String, Object> params) {
        update("projectRnd.updRndDetail", params);
    }

    public void setDelvApprove(Map<String, Object> params) {
        update("projectRnd.setDelvApprove", params);
    }

    public void updRndProjectInfo(Map<String, Object> params) {
        update("projectRnd.updRndProjectInfo", params);
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

    public void updateRndDelvApprStat(Map<String, Object> params) {
        update("project.updateRndDelvApprStat", params);
    }
    public void updateRndDelvFinalApprStat(Map<String, Object> params) {
        update("project.updateRndDelvFinalApprStat", params);
    }
}
