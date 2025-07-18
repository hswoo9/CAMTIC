package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface BudgetService {
    void setBudget(Map<String, Object> params);

    List<Map<String, Object>> getBudgetList(Map<String, Object> params);

    int getBudgetCdDuplCnt(Map<String, Object> params);

    List<Map<String, Object>> getBudgetAList(Map<String, Object> params);

    List<Map<String, Object>> getBudgetBList(Map<String, Object> params);

    List<Map<String, Object>> getBudgets(Map<String, Object> params);

    List<Map<String, Object>> getPreConditionA(Map<String, Object> params);

    List<Map<String, Object>> getPreConditionB(Map<String, Object> params);

    void delPjtBudgetItem(Map<String, Object> params);

    void regCloseBudget(Map<String, Object> params);

    Map<String, Object> getBudgetDetail(Map<String, Object> params);

    List<Map<String, Object>> getPjtBudgetHistList(Map<String, Object> params);
}
