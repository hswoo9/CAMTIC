package egovframework.com.devjitsu.cam_manager.service.impl;

import egovframework.com.devjitsu.cam_manager.repository.BudgetRepository;
import egovframework.com.devjitsu.cam_manager.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public void setBudget(Map<String, Object> params) {

    }

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return budgetRepository.getProjectList(params);
    }
}
