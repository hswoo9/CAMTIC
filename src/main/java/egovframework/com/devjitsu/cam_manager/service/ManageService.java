package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface ManageService {

    List<Map<String, Object>> getMemList(Map<String, Object> params);

    Map<String, Object> getProjectData(Map<String, Object> map);

    Map<String, Object> getEmpInfo(Map<String, Object> params);

    List<Map<String, Object>> getUserPartRateInfo(Map<String, Object> params);

    List<Map<String, Object>> getUserSalList(Map<String, Object> params);

    List<Map<String, Object>> checkExnpDetData(Map<String, Object> params);
    void insIncmExpInfo(Map<String, Object> params);
    List<Map<String, Object>> getProjectBgtList(Map<String, Object> params);
    int getProjectBgtCheck(Map<String, Object> params);

    void setManageDepo(Map<String, Object> params);

    Map<String, Object> getManageDepo(Map<String, Object> params);

    List<Map<String, Object>> getEtaxListAll(Map<String, Object> params);


    List<Map<String, Object>> getUserAccountManagementList(Map<String, Object> map);

    Map<String, Object> getAccountInfoOne(Map<String, Object> params);

    Map<String, Object> getCurrentAmountStatus(Map<String, Object> params);

    List<Map<String, Object>> getBudgetDetailViewData(Map<String, Object> params);

    Map<String, Object> getBudgetCodeData(Map<String, Object> params);
}
