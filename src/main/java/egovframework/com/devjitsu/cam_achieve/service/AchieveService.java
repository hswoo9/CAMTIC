package egovframework.com.devjitsu.cam_achieve.service;

import java.util.List;
import java.util.Map;

public interface AchieveService {

    Map<String, Object> getAllPjtCalc(Map<String, Object> params);

    Map<String, Object> getDeptPayrollData(Map<String, Object> params);

    List<Map<String, Object>> getDeptPayrollList(Map<String, Object> params);

    List<Map<String, Object>> getDeptPayrollDutyList(Map<String, Object> params);

    List<Map<String, Object>> getEngnList(Map<String, Object> params);

    List<Map<String, Object>> getEngnDeptData(Map<String, Object> params);

    Map<String, Object> getSaleByDeptData(Map<String, Object> params);

    Map<String, Object> getIncpByDeptData(Map<String, Object> params);

    List<Map<String, Object>> getDeptObjList(Map<String, Object> params);

    List<Map<String, Object>> getObjByDeptList(Map<String, Object> params);

    void insDeptObjSetting(Map<String, Object> params);

    List<Map<String, Object>> getProjectListByAchieve(Map<String, Object> params);

    Map<String, Object> getExnpCompAmt(Map<String, Object> params);

    Map<String, Object> getIncpCompAmt(Map<String, Object> params);

    Map<String, Object> getIncpCompAmt2(Map<String, Object> params);

    Map<String, Object> getRealUseExnpAmt(Map<String, Object> params);

    Map<String, Object> getPlanExnpAmt(Map<String, Object> params);

    Map<String, Object> getResultProject(Map<String, Object> params);

    Map<String, Object> getPjtDevSn(Map<String, Object> params);

    void setProjectPaySet(Map<String, Object> params);

    Map<String, Object> getProjectPaySet(Map<String, Object> params);
    Map<String, Object> getProjectPayBef(Map<String, Object> params);
    Map<String, Object> getProjectPayAft(Map<String, Object> params);

    List<Map<String, Object>> getExnpList(Map<String, Object> params);

    List<Map<String, Object>> getExnpDetailList(Map<String, Object> params);

    List<Map<String, Object>> getDeptExnpList(Map<String, Object> params);

    List<Map<String, Object>> getDeptPayrollListForTotRate(Map<String, Object> params);

    List<Map<String, Object>> getExnpListForTotRate(Map<String, Object> params);

    void updateExnpStatus(Map<String, Object> params);

    void updChangeTeam(Map<String, Object> params);

    void updateExnpExceptPay(Map<String, Object> params);

    List<Map<String, Object>> getEmpRateValue(Map<String, Object> params);

    void insDeptExpenseRateValue (Map<String, Object> params);

    void updDeptExpenseRateStatus (Map<String, Object> params);

    List<Map<String, Object>> getPayRollCompList(Map<String, Object> params);

    List<Map<String, Object>> getDeptPayRollCompList(Map<String, Object> params);

    List<Map<String, Object>> getDeptPayrollCompDutyList(Map<String, Object> params);

    List<Map<String, Object>> getObjHistList(Map<String, Object> params);

    Map<String, Object> getCorpProjectData(Map<String, Object> params);

    Map<String, Object> getIncpPayData(Map<String, Object> params);

    Map<String, Object> getExnpPayData(Map<String, Object> params);

    List<Map<String, Object>> getIncpExpList(Map<String, Object> params);

    List<Map<String, Object>> getExnpExpList(Map<String, Object> params);

    void insExpStatus(Map<String, Object> params);

    void insExpectPayData(Map<String, Object> params);

    void updExpectPayStatus(Map<String, Object> params);

    Map<String, Object> getExpertPayData(Map<String, Object> params);

    List<Map<String, Object>> getPurcClaimList(Map<String, Object> params);

    List<Map<String, Object>> getPurcClaimDetList(Map<String, Object> params);

    Map<String, Object> getPurcCrmAchieveData(Map<String, Object> params);

    Map<String, Object> getPurcCrmLocAchieveData(Map<String, Object> params);

    List<Map<String, Object>> getPurcCrmCKAchieveData(Map<String, Object> params);

    List<Map<String, Object>> getPurcCrmCKAchieveDataDet(Map<String, Object> params);

    List<Map<String, Object>> getPurcFundAchieveData(Map<String, Object> params);

    List<Map<String, Object>> getPurcFund2AchieveData(Map<String, Object> params);

    List<Map<String, Object>> getPurcAchieveMngList(Map<String, Object> params);
}
