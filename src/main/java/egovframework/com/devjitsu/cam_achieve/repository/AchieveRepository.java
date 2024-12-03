package egovframework.com.devjitsu.cam_achieve.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class AchieveRepository extends AbstractDAO {


    public Map<String, Object> getAllPjtCalc(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getAllPjtCalc", params);
    }

    public List<Map<String, Object>> getEngnPjtCalc(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnPjtCalc", params);
    }

    public List<Map<String, Object>> getRndPjtCalc(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getRndPjtCalc", params);
    }

    public Long getRndSaleAmt(Map<String, Object> params) {

        return (Long) selectOne("achieve.getRndSaleAmt", params);
    }

    public long getPurcRndAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getPurcRndAmt", params);
    }

    public long getBustripRndAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getBustripRndAmt", params);
    }

    public long getExnpRndAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getExnpRndAmt", params);
    }

    public List<Map<String, Object>> getExnpRndAmtList(Map<String, Object> params) {

        return selectList("achieve.getExnpRndAmtList", params);
    }

    public List<Map<String, Object>> getIncpRndAmtList(Map<String, Object> params) {

        return selectList("achieve.getIncpRndAmtList", params);
    }

    public long getPurcEngnAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getPurcEngnAmt", params);
    }

    public long getBustripEngnAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getBustripEngnAmt", params);
    }

    public long getEstEngnAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getEstEngnAmt", params);
    }

    public List<Map<String, Object>> getEngnList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnList", params);
    }

    public List<Map<String, Object>> getEngnDeptData(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnDeptData", params);
    }

    public List<Map<String, Object>> getEngnSaleList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnSaleList", params);
    }

    public List<Map<String, Object>> getEngnPurcList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnPurcList", params);
    }

    public List<Map<String, Object>> getEngnBustripList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnBustripList", params);
    }

    public List<Map<String, Object>> getRndSaleList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getRndSaleList", params);
    }

    public List<Map<String, Object>> getEngnEstList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEngnEstList", params);
    }

    public List<Map<String, Object>> getRndIncpList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getRndIncpList", params);
    }

    public List<Map<String, Object>> getDeptObjList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getDeptObjList", params);
    }

    public List<Map<String, Object>> getObjByDeptList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getObjByDeptList", params);
    }

    public void insDeptObjSetting(Map<String, Object> params) {

        insert("achieve.insDeptObjSetting", params);
    }

    public void updDeptObjSetting(Map<String, Object> params) {

        update("achieve.updDeptObjSetting", params);
    }

    public List<Map<String, Object>> getProjectListByAchieve(Map<String, Object> params) {

        return selectList("achieve.getProjectListByAchieve", params);
    }

    public Map<String, Object> getExnpCompAmt(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getExnpCompAmt", params);
    }
    public Map<String, Object> getExnpCompAmtAll(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getExnpCompAmtAll", params);
    }

    public Map<String, Object> getIncpCompAmt(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getIncpCompAmt", params);
    }

    public Map<String, Object> getIncpCompAmt2(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getIncpCompAmt2", params);
    }

    public Map<String, Object> getRealUseExnpAmt(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getRealUseExnpAmt", params);
    }
    public Map<String, Object> getRealUseExnpAmt2(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getRealUseExnpAmt2", params);
    }
    public Map<String, Object> getRealUseExnpAmt3(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getRealUseExnpAmt3", params);
    }

    public Map<String, Object> getRealUseExnpAllAmt(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getRealUseExnpAllAmt", params);
    }
    public Map<String, Object> getRealUseExnpAllAmt2(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getRealUseExnpAllAmt2", params);
    }
    public Map<String, Object> getRealUseExnpAllAmt3(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getRealUseExnpAllAmt3", params);
    }

    public Map<String, Object> getPlanExnpAmt(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getPlanExnpAmt", params);
    }

    public Map<String, Object> getUseExnpAmt(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getUseExnpAmt", params);
    }

    public Map<String, Object> getGoodsAmt(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getGoodsAmt", params);
    }

    public Map<String, Object> getGoodsLastInfo(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getGoodsLastInfo", params);
    }

    public Map<String, Object> getResultProject(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getResultProject", params);
    }

    public Map<String, Object> getPjtDevSn(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("achieve.getPjtDevSn", params);
    }

    public void insProjectPaySet(Map<String, Object> params) {

        insert("achieve.insProjectPaySet", params);
    }

    public void updProjectPaySet(Map<String, Object> params) {

        update("achieve.updProjectPaySet", params);
    }

    public Map<String, Object> getProjectPaySet(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getProjectPaySet", params);
    }
    public Map<String, Object> getProjectPayBef(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getProjectPayBef", params);
    }
    public Map<String, Object> getProjectPayNow(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getProjectPayNow", params);
    }
    public Map<String, Object> getProjectPayAft(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getProjectPayAft", params);
    }
    public Map<String, Object> getProjectPayBefMul(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getProjectPayBefMul", params);
    }
    public Map<String, Object> getProjectPayNowMul(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getProjectPayNowMul", params);
    }

    public Map<String, Object> getDeptObjAmt(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getDeptObjAmt", params);
    }

    public Map<String, Object> getDeptPayrollData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getDeptPayrollData", params);
    }

    public List<Map<String, Object>> getDeptPayrollList(Map<String, Object> params) {
        return selectList("achieve.getDeptPayrollList", params);
    }

    public List<Map<String, Object>> getDeptPayrollDutyList(Map<String, Object> params) {
        return selectList("achieve.getDeptPayrollDutyList", params);
    }

    public List<Map<String, Object>> getExnpList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getExnpList", params);
    }

    public List<Map<String, Object>> getExnpDetailList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getExnpDetailList", params);
    }

    public List<Map<String, Object>> getDeptExnpList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getDeptExnpList", params);
    }

    public List<Map<String, Object>> getDeptPayrollListForTotRate(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getDeptPayrollListForTotRate", params);
    }

    public List<Map<String, Object>> getExnpListForTotRate(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getExnpListForTotRate", params);
    }

    public void updateExnpStatus(Map<String, Object> params) {

        update("achieve.updateExnpStatus", params);
    }

    public void updChangeTeam(Map<String, Object> params) {

        update("achieve.updChangeTeam", params);
    }

    public void updateExnpExceptPay(Map<String, Object> params) {

        update("achieve.updateExnpExceptPay", params);
    }

    public List<Map<String, Object>> getEmpRateValue(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getEmpRateValue", params);
    }

    public void insDeptExpenseRateValue(List<Map<String, Object>> params) {

        insert("achieve.insDeptExpenseRateValue", params);
    }

    public void updDeptExpenseRateStatus(Map<String, Object> params) {

        update("achieve.updDeptExpenseRateStatus", params);
    }

    public List<Map<String, Object>> getPayRollCompList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getPayRollCompList", params);
    }

    public List<Map<String, Object>> getDeptPayRollCompList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getDeptPayRollCompList", params);
    }

    public List<Map<String, Object>> getDeptPayrollCompDutyList(Map<String, Object> params) {

        return (List<Map<String, Object>>) selectList("achieve.getDeptPayrollCompDutyList", params);
    }

    public List<Map<String, Object>> getObjHistList(Map<String, Object> params) {
        return selectList("achieve.getObjHistList", params);
    }


    public void insDeptObjSettingHistory(Map<String, Object> params) {
        insert("achieve.insDeptObjSettingHistory", params);
    }

    public Map<String, Object> getCorpProjectData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getCorpProjectData", params);
    }

    public Map<String, Object> getIncpPayData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getIncpPayData", params);
    }

    public long getCommPayData(Map<String, Object> params) {
        return (long) selectOne("achieve.getCommPayData", params);
    }

    public List<Map<String, Object>> getCommPayWaitData(Map<String, Object> params) {
        return selectList("achieve.getCommPayWaitData", params);
    }

    public List<Map<String, Object>> getCommPayApprData(Map<String, Object> params) {
        return selectList("achieve.getCommPayApprData", params);
    }

    public Map<String, Object> getExnpPersonnelData(Map<String, Object> params) {
        return  (Map<String, Object>) selectOne("achieve.getExnpPersonnelData", params);
    }

    public Map<String, Object> getExnpOperationData(Map<String, Object> params) {
        return  (Map<String, Object>) selectOne("achieve.getExnpOperationData", params);
    }

    public Map<String, Object> getExnpPurcData(Map<String, Object> params) {
        return  (Map<String, Object>) selectOne("achieve.getExnpPurcData", params);
    }

    public List<Map<String, Object>> getIncpExpList(Map<String, Object> params) {
        return selectList("achieve.getIncpExpList", params);
    }

    public List<Map<String, Object>> getExnpExpList(Map<String, Object> params) {
        return selectList("achieve.getExnpExpList", params);
    }

    public void insExpStatus(Map<String, Object> params) {
        insert("achieve.insExpStatus", params);
    }

    public void updExpStatus(Map<String, Object> params) {
        update("achieve.updExpStatus", params);
    }

    public void insExpectPayData(Map<String, Object> params) {
        insert("achieve.insExpectPayData", params);
    }

    public void updExpectPayData(Map<String, Object> params) {
        update("achieve.updExpectPayData", params);
    }

    public void updExpectPayStatus(Map<String, Object> params) {
        update("achieve.updExpectPayStatus", params);
    }

    public Map<String, Object> getExpertPayData(Map<String , Object> params) {
        return (Map<String, Object>) selectOne("achieve.getExpertPayData", params);
    }

    public List<Map<String, Object>> getPurcClaimList(Map<String, Object> params) {
        return selectList("achieve.getPurcClaimList", params);
    }

    public List<Map<String, Object>> getPurcClaimDetList(Map<String, Object> params) {
        return selectList("achieve.getPurcClaimDetList", params);
    }

    public Map<String, Object> getPurcCrmAchieveData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getPurcCrmAchieveData", params);
    }

    public Map<String, Object> getPurcCrmLocAchieveData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("achieve.getPurcCrmLocAchieveData", params);
    }

    public List<Map<String, Object>> getPurcCrmCKAchieveData(Map<String, Object> params) {
        return selectList("achieve.getPurcCrmCKAchieveData", params);
    }

    public List<Map<String, Object>> getPurcCrmCKAchieveDataDet(Map<String, Object> params) {
        return selectList("achieve.getPurcCrmCKAchieveDataDet", params);
    }

    public List<Map<String, Object>> getPurcFundAchieveData(Map<String, Object> params) {
        return selectList("achieve.getPurcFundAchieveData", params);
    }

    public List<Map<String, Object>> getPurcFund2AchieveData(Map<String, Object> params) {
        return selectList("achieve.getPurcFund2AchieveData", params);
    }

    public List<Map<String, Object>> getPurcAchieveMngList(Map<String, Object> params) {
        return selectList("achieve.getPurcAchieveMngList", params);
    }

    public int getPjtTeamInvAmt(Map<String, Object> params) {
        return (int) selectOne("achieve.getPjtTeamInvAmt", params);
    }

    public long getEngnGoodsAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getEngnGoodsAmt", params);
    }

    public long getEngnUseExnpCostAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getEngnUseExnpCostAmt", params);
    }

    public long getEngnUseExnpPurcAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getEngnUseExnpPurcAmt", params);
    }

    public long getEngnUseExnpBustAmt(Map<String, Object> params) {

        return (long) selectOne("achieve.getEngnUseExnpBustAmt", params);
    }
}
