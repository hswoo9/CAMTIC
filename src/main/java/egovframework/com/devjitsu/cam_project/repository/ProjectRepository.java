package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProjectRepository extends AbstractDAO {

    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return selectList("project.getProjectList", params);
    }

    public Map<String, Object> getProjectStep(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectStep", params);
    }

    public void insProject(Map<String, Object> params) {
        insert("project.insProject", params);
    }

    public void insPjtEngn(Map<String, Object> params) {
        insert("project.insPjtEngn", params);
    }

    public void delProject(Map<String, Object> params) {

        delete("project.delProject", params);
    }

    public Map<String, Object> getProjectData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectData", params);
    }

    public void insEngnEstInfo(Map<String, Object> params) {
        insert("project.insEngnEstInfo", params);
    }

    public void insEngnEstSub(Map<String, Object> params) {
        insert("project.insEngnEstSub", params);
    }

    public void updProjectStep(Map<String, Object> params) {
        update("project.updProjectStep", params);
    }

    public void updProjectEngnStep(Map<String, Object> params) {
        update("project.updProjectEngnStep", params);
    }

    public List<Map<String, Object>> getEstList(Map<String, Object> params) {
        return selectList("project.getStep1EstList", params);
    }

    public List<Map<String, Object>> getEstSubList(Map<String, Object> params) {
        return selectList("project.getEstSubList", params);
    }

    public Map<String, Object> getStep1EstData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getEstData", params);
    }

    public void insStep2(Map<String, Object> params) {
        insert("project.insStep2", params);
    }

    public void updProjectDelv(Map<String, Object> params) {
        update("project.updProjectDelv", params);
    }

    public Map<String, Object> getDelvData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDelvData", params);
    }

    public List<Map<String, Object>> groupCodeList(Map<String, Object> params) {
        return selectList("project.groupCodeList", params);
    }

    public void saveGroupCode(Map<String, Object> params) {
        insert("project.insGroupCode", params);
    }

    public List<Map<String, Object>> codeList(Map<String, Object> params) {
        return selectList("project.codeList", params);
    }

    public void insSetLgCode(Map<String, Object> params) {
        update("project.insSetLgCode", params);
    }

    public List<Map<String, Object>> smCodeList(Map<String, Object> params) {
        return selectList("project.smCodeList", params);
    }

    public void insPjtCode(Map<String, Object> params) {
        insert("project.insPjtCode", params);
    }

    public int checkModStep1(Map<String, Object> params) {
        return (int) selectOne("project.checkModStep1", params);
    }

    public int checkModStep2(Map<String, Object> params) {
        return (int) selectOne("project.checkModStep2", params);
    }

    public List<Map<String, Object>> selLgCode(Map<String, Object> params) {
        return selectList("project.selLgCode", params);
    }

    public List<Map<String, Object>> selSmCode(Map<String, Object> params) {
        return selectList("project.selSmCode", params);
    }

    public int cntProjectCode(Map<String, Object> params) {
        return (int) selectOne("project.cntProjectCode", params);
    }

    public int checkProjectCode(Map<String, Object> params) {
        return (int) selectOne("project.checkProjectCode", params);
    }

    public void updProjectDelvFn(Map<String, Object> params) {
        update("project.updProjectDelvFn", params);
    }

    public List<Map<String, Object>> getDevPjtVerList(Map<String, Object> params) {
        return selectList("project.getDevPjtVerList", params);
    }


    public Map<String, Object> getStep3PmInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getStep3PmInfo", params);
    }

    public void insPjtPs(Map<String, Object> params) {
        insert("project.insPjtPs", params);
    }

    public List<Map<String, Object>> getProcessList(Map<String, Object> params) {
        return selectList("project.getProcessList", params);
    }

    public void updProcess(Map<String, Object> params) {
        update("project.updProcess", params);
    }

    public void delProcess(Map<String, Object> params) {
        delete("project.delProcess", params);
    }

    public void insInvData(Map<String, Object> params) {
        insert("project.insInvData", params);
    }

    public List<Map<String, Object>> getInvList(Map<String, Object> params) {
        return selectList("project.getInvList", params);
    }

    public void updInvest(Map<String, Object> params) {
        update("project.updInvest", params);
    }

    public void delInvest(Map<String, Object> params) {
        delete("project.delInvest", params);
    }

    public void insStep3(Map<String, Object> params) {
        insert("project.insStep3", params);
    }

    public int checkModStep3(Map<String, Object> params) {
        return (int) selectOne("project.checkModStep3", params);
    }

    public Map<String, Object> getDevelopPlan(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDevelopPlan", params);
    }

    public Map<String, Object> getPjtSnToDev(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getPjtSnToDev", params);
    }

    public List<Map<String, Object>> getPsList(Map<String, Object> params) {
        return selectList("project.getPsList", params);
    }

    public int checkModStep4(Map<String, Object> params) {
        return (int) selectOne("project.checkModStep4", params);
    }

    public void insStep4(Map<String, Object> params) {
        insert("project.insStep4", params);
    }

    public void updStep5(Map<String, Object> params) {
        update("project.updStep5", params);
    }

    public void updStepEst5(Map<String, Object> params) {
        update("project.updStepEst5", params);
    }

    public void delStepEstSub5(Map<String, Object> params) {
        delete("project.delStepEstSub5", params);
    }

    public int checkDelvStat(Map<String, Object> params) {
        return (int) selectOne("project.checkDelvStat", params);
    }

    public void updEngnCrmInfo(Map<String, Object> params) {
        update("project.updEngnCrmInfo", params);
    }

    public void updEngn(Map<String, Object> params) {
        update("project.updEngn", params);
    }

    public void updBustInfo(Map<String, Object> params) {
        update("bustrip.updBustPjtsnReset", params);
        update("bustrip.updBustPjtSn", params);
    }

    public void updProject(Map<String, Object> params) {
        update("project.updProject", params);
    }

    public void updateDelvApprStat(Map<String, Object> params) {
        update("project.updateDelvApprStat", params);
    }
    public void updateDelvFinalApprStat(Map<String, Object> params) {
        update("project.updateProjectCode", params);
        update("project.updateDelvFinalApprStat", params);
    }

    public void updateDevApprStat(Map<String, Object> params) {
        update("project.updateDevApprStat", params);
    }
    public void updateDevFinalApprStat(Map<String, Object> params) {
        update("project.updateDevFinalApprStat", params);
    }

    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getCrmInfo", params);
    }

    public Map<String, Object> getBustInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getBustInfo", params);
    }

    public void insDelvInfo(Map<String, Object> params) {
        insert("project.insDelvInfo", params);
    }

    public void updDelvInfo(Map<String, Object> params) {
        update("project.updDelvInfo", params);
    }

    public void updProjectTmpCode(Map<String, Object> params) {
        update("project.updProjectTmpCode", params);
    }

    public void insDevInfo(Map<String, Object> params) {
        insert("project.insDevInfo", params);
    }

    public void updInvAndPs(Map<String, Object> params) {
        update("project.updInv", params);
        update("project.updPs", params);
    }

    public int checkAddVersion(Map<String, Object> params) {
        return (int) selectOne("project.checkAddVersion", params);
    }

    public void updDevInfo(Map<String, Object> params) {
        update("project.updDevInfo", params);
    }

    public Map<String, Object> getDevSn(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDevSn", params);
    }

    public Map<String, Object> getDevData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDevData", params);
    }
}
