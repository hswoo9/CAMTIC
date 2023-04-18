package egovframework.com.devjitsu.workPlan.service.impl;

import egovframework.com.devjitsu.workPlan.repository.WorkPlanRepository;
import egovframework.com.devjitsu.workPlan.service.WorkPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WorkPlanServiceImpl implements WorkPlanService {

    @Autowired
    private WorkPlanRepository workPlanRepository;


    /**
     * 유연근무 신청 저장 리스트
     * @param params
     * @return
     */
    @Override
    public List<Map<String, Object>> getWorkPlanReqChangeList(Map<String, Object> params){
        return workPlanRepository.getWorkPlanReqChangeList(params);
    }
}
