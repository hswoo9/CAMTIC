package egovframework.com.devjitsu.workPlan.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.workPlan.repository.WorkPlanRepository;
import egovframework.com.devjitsu.workPlan.service.WorkPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
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

    @Override
    @Transactional
    public Map<String, Object> setWorkPlanChangeOrDetail(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        Gson gson = new Gson();
        List<Map<String, Object>> subList = gson.fromJson((String) params.get("workPlanChange"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        try {
            workPlanRepository.setWorkPlanChange(params);
            params.put("workPlanChangeId", params.get("WORK_PLAN_CHANGE_ID"));
            workPlanRepository.saveWorkPlanChangeDetail(params);
            result.put("code", "200");
            result.put("message", "신청 데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "신청 데이터 저장 중 에러가 발생했습니다.");
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getWkCommonCodeWpT(Map<String, Object> params) {
        return workPlanRepository.getWkCommonCodeWpT(params);
    }

    @Override
    public Map<String, Object> updateApprStat(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        String message = "";
        Gson gson = new Gson();
        List<String> selectList = gson.fromJson((String) params.get("selectList"), new TypeToken<List<String>>() {}.getType());
        if(selectList.size() < 1){
            message = "1개이상 선택해주세요.";
        }else{
            params.put("selectArr", selectList);
            int check = workPlanRepository.updateApprStat(params);
            if(check > 0){
                message = "처리되었습니다.";
            }
        }

        resultMap.put("message", message);
        return resultMap;
    }
}
