package egovframework.com.devjitsu.overWk.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.overWk.repository.OverWkRepository;
import egovframework.com.devjitsu.overWk.service.OverWkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OverWkServiceImpl implements OverWkService {

    @Autowired
    private OverWkRepository overWkRepository;
    @Override
    public List<Map<String, Object>> getWorkCodeList(Map<String, Object> params) {
        return overWkRepository.getWorkCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getOverWorkPlanReqList(Map<String, Object> params) {
        return overWkRepository.getOverWorkPlanReqList(params);
    }

    @Override
    public Map<String, Object> getApplyDateOwpCheck(Map<String, Object> params) {
        //return overWkRepository.getApplyDateOwpCheck(params);
        return params;
    }

    @Override
    public Map<String, Object> setOverWorkPlan(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        try {
            overWkRepository.setOverWorkPlan(params);
            result.put("code", "200");
            result.put("message", "신청 데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "신청 데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> updateApprStat(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        String message = "";
        Gson gson = new Gson();
        List<String> owpAr = gson.fromJson((String) params.get("owpAr"), new TypeToken<List<String>>() {}.getType());
        if(owpAr.size() < 1){
            message = "1개이상 선택해주세요.";
        }else{
            params.put("selectArr", owpAr);
            int check = overWkRepository.updateApprStat(params);
            if(check > 0){
                message = "처리되었습니다.";
            }
        }

        resultMap.put("message", message);
        return resultMap;
    }

    @Override
    public List<Map<String, Object>> getOverWorkPlanUserList(Map<String, Object> params){
        return overWkRepository.getOverWorkPlanUserList(params);
    }
}
