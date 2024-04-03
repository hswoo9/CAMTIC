package egovframework.com.devjitsu.cam_project.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ProjectRepository extends AbstractDAO {


    public Map<String, Object> getProjectInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectInfo", params);
    }

    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return selectList("project.getProjectList", params);
    }
    public List<Map<String, Object>> getDepoManageProjectList(Map<String, Object> params) {
        return selectList("project.getDepoManageProjectList", params);
    }

    public List<Map<String, Object>> getAllProjectList(Map<String, Object> params) {
        return selectList("project.getAllProjectList", params);
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

    public void updProjectInfo(Map<String, Object> params) {
        update("project.updProjectInfo", params);
    }

    public void updPjtEngn(Map<String, Object> params) {
        update("project.updPjtEngn", params);
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

    public void updProjectStepDev(Map<String, Object> params) {
        update("project.updProjectStepDev", params);
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

    public Map<String, Object> getEstData(Map<String, Object> params) {
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

    public List<Map<String, Object>> getProcessList2(Map<String, Object> params) {
        return selectList("project.getProcessList2", params);
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

    public List<Map<String, Object>> getTeamInvList(Map<String, Object> params) {
        return selectList("project.getTeamInvList", params);
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
//        update("bustrip.updBustPjtsnReset", params);
        update("bustrip.updBustPjtSn", params);
        update("bustrip.updBustReqPjtSn", params);
    }

    public void updProject(Map<String, Object> params) {
        update("project.updProject", params);
    }

    public void updProjectGoods(Map<String, Object> params) {
        update("project.updProjectGoods", params);
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

    public void updateResApprStat(Map<String, Object> params) {
        update("project.updateResApprStat", params);
    }
    public void updateResFinalApprStat(Map<String, Object> params) {
        update("project.updateResFinalApprStat", params);
    }

    public void updateCostApprStat(Map<String, Object> params) {
        update("project.updateCostApprStat", params);
    }
    public void updateCostFinalApprStat(Map<String, Object> params) {
        update("project.updateCostFinalApprStat", params);
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

    public void updDelvApproveStat(Map<String, Object> params) {
        update("project.updDelvApproveStat", params);
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

    public void setDevInfoDel(Map<String, Object> params) {
        update("project.setDevInfoDel", params);
    }

    public Map<String, Object> getDevSn(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDevSn", params);
    }

    public Map<String, Object> getDevData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDevData", params);
    }

    public void stopProject(Map<String, Object> params) {
        update("project.stopProject", params);
    }

    public Map<String, Object> getPsPrepInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getPsPrepInfo", params);
    }

    public void insPsPrepInfo(Map<String, Object> params) {
        insert("project.insPsPrepInfo", params);
    }

    public void updPsPrepInfo(Map<String, Object> psPrepMap) {
        update("project.updPsPrepInfo", psPrepMap);
    }


    public List<Map<String, Object>> getPsFile1(Map<String, Object> params) {
        return selectList("project.getPsFile1", params);
    }

    public List<Map<String, Object>> getPsFile2(Map<String, Object> params) {
        return selectList("project.getPsFile2", params);
    }

    public List<Map<String, Object>> getPsFile3(Map<String, Object> params) {
        return selectList("project.getPsFile3", params);
    }

    public List<Map<String, Object>> getPsFile4(Map<String, Object> params) {
        return selectList("project.getPsFile4", params);
    }

    public List<Map<String, Object>> getPsFile5(Map<String, Object> params) {
        return selectList("project.getPsFile5", params);
    }

    public List<Map<String, Object>> getPsFile6(Map<String, Object> params) {
        return selectList("project.getPsFile6", params);
    }

    public void updGoodsInfo(Map<String, Object> params) {
        update("project.updGoodInfo", params);
    }

    public void setEstInfoDel(Map<String, Object> params) {
        delete("project.setEstInfoDel", params);
    }

    public void delEstSub(Map<String, Object> params) {
        delete("project.delEstSub", params);
    }

    public void updEstInfo(Map<String, Object> params) {
        update("project.updEstInfo", params);
    }

    public Map<String, Object> getResultInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getResultInfo", params);
    }

    public void insResultInfo(Map<String, Object> params) {
        insert("project.insResultInfo", params);
    }

    public void insPerformanceInfo(Map<String, Object> params) {
        insert("project.insPerformanceInfo", params);
    }

    public void updResultInfo(Map<String, Object> params) {
        update("project.updResultInfo", params);
    }

    public void setPerformanceInfo(Map<String, Object> params) {
        update("project.setPerformanceInfo", params);
    }

    public void updResultDevFile(Map<String, Object> fileInsMap) {
        update("project.updResultDevFile", fileInsMap);
    }

    public void updResultDesignFile(Map<String, Object> fileInsMap) {
        update("project.updResultDesignFile", fileInsMap);
    }

    public void updResultProdFile(Map<String, Object> fileInsMap) {
        update("project.updResultProdFile", fileInsMap);
    }

    public Map<String, Object> getGoodsFile(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getGoodsFile", params);
    }

    public Map<String, Object> getDesignFile(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDesignFile", params);
    }

    public Map<String, Object> getProdFile(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProdFile", params);
    }

    public void updDelvFile(Map<String, Object> fileInsMap) {
        update("project.updDelvFile", fileInsMap);
    }

    public void updDevFile(Map<String, Object> fileInsMap) {
        update("project.updDevFile", fileInsMap);
    }

    public void updDevEstFile(Map<String, Object> fileInsMap) {
        update("project.updDevEstFile", fileInsMap);
    }

    public Map<String, Object> getDelvFile(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("project.getDelvFile", map);
    }

    public Map<String, Object> getDevFile(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDevFile", params);
    }

    public Map<String, Object> getEstFile(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getEstFile", params);
    }

    public void setFileDocNm(Map<String, Object> params) {
        update("project.setFileDocNm", params);
    }

    public void setDelvFileDocNm(Map<String, Object> params) {
        update("project.setDelvFileDocNm", params);
    }

    public void setFileCopy(Map<String, Object> params) {
        update("project.setFileCopy", params);
    }

    public void setDelvFileCopy(Map<String, Object> params) {
        update("project.setDelvFileCopy", params);
    }

    public void setDevFileDocNm(Map<String, Object> params) {
        update("project.setDevFileDocNm", params);
    }

    public void setPsFileDocNm(Map<String, Object> params) {
        update("project.setPsFileDocNm", params);
    }

    public void setResultFileDocNm(Map<String, Object> params) {
        update("project.setResultFileDocNm", params);
    }

    public void setPurcFileDocNm(Map<String, Object> params) {
        update("project.setPurcFileDocNm", params);
    }

    public void insTeamInfo(Map<String, Object> params) {
        insert("project.insTeamInfo", params);
    }

    public List<Map<String, Object>> getTeamList(Map<String, Object> params) {
        return selectList("project.getTeamList", params);
    }

    public Map<String, Object> getTeamInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getTeamInfo", params);
    }

    public Map<String, Object> getBustResInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getBustResInfo", params);
    }

    public Map<String, Object> getCostData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getCostData", params);
    }

    public void insCostInfo(Map<String, Object> params) {
        insert("project.insCostInfo", params);
    }

    public void updCostInfo(Map<String, Object> params) {
        update("project.updCostInfo", params);
    }

    public Map<String, Object> getProjectDocInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectDocInfo", params);
    }

    public void addDevVersion(Map<String, Object> params) {
        insert("project.addDevVersion", params);
    }

    public void setDevTeamApp(Map<String, Object> params) {
        update("project.setDevTeamApp", params);
    }

    public void setPjtTeamApp(Map<String, Object> params) {
        update("project.setPjtTeamApp", params);
    }

    public void updPjtDevTotAmt(Map<String, Object> params) {
        update("project.updPjtDevTotAmt", params);
    }

    public List<Map<String, Object>> getPartRateVersionList(Map<String, Object> params) {
        return selectList("project.getPartRateVersionList", params);
    }

    public Map<String, Object> getPartRateVer(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getPartRateVer", params);
    }

    public Map<String, Object> getPartRateBefVer(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getPartRateBefVer", params);
    }

    public Map<String, Object> getProjectManagerInfo(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("project.getProjectManagerInfo", map);
    }

    public Map<String, Object> getProjectUnRndManagerInfo(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("project.getProjectUnRndManagerInfo", map);
    }

    public List<Map<String, Object>> getProjectMemberInfo(Map<String, Object> map) {
        return selectList("project.getProjectMemberInfo", map);
    }

    public void updTmpProjectCode(Map<String, Object> params) {
        update("project.updTmpProjectCode", params);
    }

    public void updProjectCode(Map<String, Object> params) {
        update("project.updProjectCode", params);
    }

    public void updEngnProjectCode(Map<String, Object> params) {
        update("project.updEngnProjectCode", params);
    }
    public List<Map<String, Object>> getProjectBudgetList(Map<String, Object> params) {
        return selectList("project.getProjectBudgetList", params);
    }
    public Map<String, Object> getProjectBudgetTotal(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectBudgetTotal", params);
    }
    public List<Map<String, Object>> getProjectBudgetListSum(Map<String, Object> params) {
        return selectList("project.getProjectBudgetListSum", params);
    }
    public Map<String, Object> getProjectTotalData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectTotalData", params);
    }

    public List<Map<String, Object>> getResultPsMember(Map<String, Object> params) {
        return selectList("project.getResultPsMember", params);
    }

    public void insTeamProject(Map<String, Object> params) {
        insert("project.insTeamProject", params);
    }

    public void updTeamProject(Map<String, Object> params) {
        update("project.updTeamProject", params);
    }

    public void delTeamProject(Map<String, Object> params) {
        delete("project.delTeamProject", params);
        delete("project.delTeamProjectData", params);
    }

    public List<Map<String, Object>> getTeamProjectList(Map<String, Object> params) {
        return selectList("project.getTeamProjectList", params);
    }

    public List<Map<String, Object>> partRateEmpInfo(String[] params) {
        return selectList("project.partRateEmpInfo", params);
    }

    public void confirmPartRate(Map<String, Object> params) {
        update("project.confirmPartRate", params);
    }

    public void updPartRateBefVersionStatus(Map<String, Object> params) {
        update("project.updPartRateBefVersionStatus", params);
    }

    public void updPMInfo(Map<String, Object> params) {
        update("project.updPMInfo", params);
    }

    public List<Map<String, Object>> getPartRateDet(Map<String, Object> params) {
        return selectList("project.getPartRateDet", params);
    }

    public void insPartRateMonth(Map<String, Object> userPRMap) {
        insert("project.insPartRateMonth", userPRMap);
    }

    public void delPartRateMonthData(Map<String, Object> params) {
        delete("project.delPartRateMonthData", params);
    }


    public void updJoinMember(Map<String, Object> params) {
        update("project.updJoinMember", params);
    }

    public Map<String, Object> getProjectByPjtCd(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectByPjtCd", params);
    }

    public Map<String, Object> getProjectByDocId(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectByDocId", params);
    }

    public Map<String, Object> getProjectByDocId2(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getProjectByDocId2", params);
    }

    public List<Map<String, Object>> getDepositList(Map<String, Object> params) {
        return selectList("project.getDepositList", params);
    }

    public Map<String, Object> getProjectCodeData(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("project.getProjectCodeData", map);
    }

    public Map<String, Object> getDevMap(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("project.getDevMap", params);
    }

    public void insCustomBudget(Map<String, Object> params) {
        insert("project.insCustomBudget", params);
    }
    public void delCustomBudget(Map<String, Object> params) {
        delete("project.delCustomBudget", params);
    }

    public void delJoinMember(Map<String, Object> params) {
        delete("project.delJoinMember", params);
    }

    public void delUpdJoinMember(Map<String, Object> params) {
        update("project.delUpdJoinMember", params);
    }

    public Map<String, Object> getProjectMemberTemp(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("project.getProjectMemberTemp", map);
    }

    public List<Map<String, Object>> getFinalPartRateChangeDocList(Map<String, Object> params) {
        return selectList("project.getFinalPartRateChangeDocList", params);
    }

    public void setReferencesAdd(Map<String, Object> params) {
        update("project.setReferencesAdd", params);
    }

    public void insUnitBusnInfo(Map<String, Object> params) {
        insert("unRnd.insUnitBusnInfo", params);
    }

    public void updUnitBusnInfo(Map<String, Object> params) {
        update("unRnd.updUnitBusnInfo", params);
    }

    public Map<String, Object> getPjtUnitData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("unRnd.getPjtUnitData", params);
    }

    public List<Map<String, Object>> getUnitBusnList(Map<String, Object> params) {
        return selectList("unRnd.getUnitBusnList", params);
    }

    public void delUnitBusn(Map<String, Object> params) {
        delete("unRnd.delUnitBusn", params);
    }

    public void insUnitBusnItem(Map<String, Object> item) {
        insert("unRnd.insUnitBusnItem", item);
    }

    public void delUnitBusnItem(Map<String, Object> params) {
        delete("unRnd.delUnitBusnItem", params);
    }

    public List<Map<String, Object>> getPjtUnitCrmList(Map<String, Object> params) {
        return selectList("unRnd.getPjtUnitCrmList", params);
    }

    public void updPurcUnitCrm(Map<String, Object> params) {
        update("unRnd.updPurcUnitCrm", params);
    }


    public void delUnitBusnDet(Map<String, Object> params) {
        delete("unRnd.delUnitBusnDet", params);
    }

    public void updPurcPjtUnitDetSn(Map<String, Object> data) {
        update("unRnd.updPurcPjtUnitDetSn", data);
    }

    public List<Map<String, Object>> getPsListByDevSn(Map<String, Object> params) {
        return selectList("project.getPsListByDevSn", params);
    }

    public void modProcessData(Map<String, Object> params) {
        update("project.modProcessData", params);
    }

    public void updInvestData(Map<String, Object> params) {
        update("project.updInvestData", params);
    }
}
