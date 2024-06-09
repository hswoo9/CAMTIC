package egovframework.com.devjitsu.cam_project.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface ProjectService {

    Map<String, Object> getProjectInfo(Map<String, Object> params);
    List<Map<String, Object>> getProjectList(Map<String, Object> params);

    List<Map<String, Object>> getRndProjectList(Map<String, Object> params);

    List<Map<String, Object>> getDepoManageProjectList(Map<String, Object> params);
    List<Map<String, Object>> getAllProjectList(Map<String, Object> params);

    Map<String, Object> getProjectDataOne(Map<String, Object> params);

    void setProject(Map<String, Object> params);

    Map<String, Object> getProjectStep(Map<String, Object> params);
    List<Map<String, Object>> getMultiPjtList(Map<String, Object> params);
    List<Map<String, Object>> getTeamPjtList(Map<String, Object> params);

    void delProject(Map<String, Object> params);

    Map<String, Object> getProjectData(Map<String, Object> params);

    void setEstInfo(Map<String, Object> params);
    void setEstInfoDel(Map<String, Object> params);

    void setEstSub(Map<String, Object> params);

    Map<String, Object> getEstData(Map<String, Object> params);

    Map<String, Object> getGoodsData(Map<String, Object> params);

    Map<String, Object> getStep1SubData(Map<String, Object> params);

    void insStep2(Map<String, Object> params);

    void updProjectDelv(Map<String, Object> params);

    Map<String, Object> getDelvData(Map<String, Object> params);

    List<Map<String, Object>> groupCodeList(Map<String, Object> params);

    void saveGroupCode(Map<String, Object> params);

    List<Map<String, Object>> codeList(Map<String, Object> params);

    void insSetLgCode(Map<String, Object> params);

    List<Map<String, Object>> smCodeList(Map<String, Object> params);

    void insPjtCode(Map<String, Object> params);

    List<Map<String, Object>> selLgCode(Map<String, Object> params);

    List<Map<String, Object>> selSmCode(Map<String, Object> params);

    List<Map<String, Object>> getDevPjtVerList(Map<String, Object> params);

    Map<String, Object> getStep3PmInfo(Map<String, Object> params);

    void insPjtPs(Map<String, Object> params);

    List<Map<String, Object>> getProcessList(Map<String, Object> params);

    List<Map<String, Object>> getProcessList2(Map<String, Object> params);

    void updProcess(Map<String, Object> params);

    void delProcess(Map<String, Object> params);

    void insInvData(Map<String, Object> params);

    List<Map<String, Object>> getInvList(Map<String, Object> params);

    List<Map<String, Object>> getTeamInvList(Map<String, Object> params);

    void updInvest(Map<String, Object> params);

    void delInvest(Map<String, Object> params);

    void insStep3(Map<String, Object> params);

    Map<String, Object> getDevelopPlan(Map<String, Object> params);

    Map<String, Object> getPjtSnToDev(Map<String, Object> params);

    List<Map<String, Object>> getPsList(Map<String, Object> params);

    void insStep4(Map<String, Object> params);

    void updStep5(Map<String, Object> params);

    void setEngnCrmInfo(Map<String, Object> params);

    void setBustInfo(Map<String, Object> params);

    /** 수주관리 결재 상태값에 따른 UPDATE 메서드 */
    void updateDelvDocState(Map<String, Object> bodyMap) throws Exception;

    /** 개발계획서 결재 상태값에 따른 UPDATE 메서드 */
    void updateDevDocState(Map<String, Object> bodyMap) throws Exception;

    /** 결과보고서 결재 상태값에 따른 UPDATE 메서드 */
    void updateResDocState(Map<String, Object> bodyMap) throws Exception;

    /** 원가보고서 결재 상태값에 따른 UPDATE 메서드 */
    void updateCostDocState(Map<String, Object> bodyMap) throws Exception;

    Map<String, Object> getCrmInfo(Map<String, Object> params);

    Map<String, Object> getBustInfo(Map<String, Object> params);

    void setDelvInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);

    void setDelvApprove(Map<String, Object> params);

    void updDelvApproveStat(Map<String, Object> params);

    void setDevInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);

    void setDevInfoDel(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);

    Map<String, Object> getDevData(Map<String, Object> params);

    void stopProject(Map<String, Object> params);

    void setProcessInfo(Map<String, Object> params, MultipartFile[] fileList1, MultipartFile[] fileList2, MultipartFile[] fileList3, MultipartFile[] fileList4, MultipartFile[] fileList5, MultipartFile[] fileList6, String serverDir, String baseDir);

    Map<String, Object> getPsFile(Map<String, Object> params);

    Map<String, Object> setGoodsInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);

    void setEstSubMod(Map<String, Object> params);

    void setResultInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir);

    void setPerformanceInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir);

    Map<String, Object> getResultInfo(Map<String, Object> params);

    Map<String, Object> getDelvFile(Map<String, Object> params);

    Map<String, Object> getDevFile(Map<String, Object> params);

    void delPjtBustrip(Map<String, Object> params);

    void setTeamInfo(Map<String, Object> params);

    List<Map<String, Object>> getTeamList(Map<String, Object> params);

    Map<String, Object> getTeamInfo(Map<String, Object> params);

    Map<String, Object> getBustResInfo(Map<String, Object> params);

    void setCostInfo(Map<String, Object> params);

    Map<String, Object> getProjectDocInfo(Map<String, Object> params);

    void addDevVersion(Map<String, Object> params);

    void setDevTeamApp(Map<String, Object> params);

    void setPjtTeamApp(Map<String, Object> params);

    void updPjtDevTotAmt(Map<String, Object> params);

    List<Map<String, Object>> getPartRateVersionList(Map<String, Object> params);

    Map<String, Object> getPartRateVer(Map<String, Object> params);

    Map<String, Object> getPartRateBefVer(Map<String, Object> params);

    Map<String, Object> getMngPartRate(Map<String, Object> map);
    List<Map<String, Object>> getProjectBudgetList(Map<String, Object> params);
    Map<String, Object> getProjectBudgetTotal(Map<String, Object> params);
    List<Map<String, Object>> getProjectBudgetListSum(Map<String, Object> params);
    Map<String, Object> getProjectTotalData(Map<String, Object> params);

    List<Map<String, Object>> getResultPsMember(Map<String, Object> params);

    void delTeamProject(Map<String, Object> params);

    Map<String, Object> getBankData(Map<String, Object> params);
    Map<String, Object> getG20ProjectData(Map<String, Object> params);

    List<Map<String, Object>> getTeamProjectList(Map<String, Object> params);

    List<Map<String, Object>> getPartRateEmpInfo(Map<String, Object> params);

    void confirmPartRate(Map<String, Object> params);

    List<Map<String, Object>> test(Map<String, Object> params);

    void updJoinMember(Map<String, Object> params);

    Map<String, Object> getProjectByPjtCd(Map<String, Object> params);

    Map<String, Object> getProjectByPjtCd2(Map<String, Object> params);

    Map<String, Object> getProjectByDocId(Map<String, Object> params);

    Map<String, Object> getProjectByDocId2(Map<String, Object> params);

    List<Map<String, Object>> getDepositList(Map<String, Object> params);

    List<Map<String, Object>> getG20ProjectList(Map<String, Object> params);

    Map<String, Object> getDevMap(Map<String, Object> params);
    Map<String, Object> getPartStartBs(Map<String, Object> params);
    void delJoinMember(Map<String, Object> params);

    List<Map<String, Object>> getFinalPartRateChangeDocList(Map<String, Object> params);

    void setReferencesAdd(Map<String, Object> params);

    List<Map<String, Object>> getHistEngnList(Map<String, Object> params);

    List<Map<String, Object>> getHistRndList(Map<String, Object> params);

    List<Map<String, Object>> getHistEduList(Map<String, Object> params);

    Map<String, Object> getProjectCodeData(Map<String, Object> params);

    void modProcessData(Map<String, Object> params);

    void updInvestData(Map<String, Object> params);

    Map<String, Object> projectEnterMemberList(Map<String, Object> params);

    List<Map<String, Object>> getPjtYear(Map<String, Object> params);
}
