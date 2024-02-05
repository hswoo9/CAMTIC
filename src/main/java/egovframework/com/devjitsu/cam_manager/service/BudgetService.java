package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface BudgetService {
    void setBudget(Map<String, Object> params);

    List<Map<String, Object>> getProjectList(Map<String, Object> params);
}
