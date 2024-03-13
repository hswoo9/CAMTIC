package egovframework.com.devjitsu.inside.employee.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.employee.repository.EmployRepository;
import egovframework.com.devjitsu.inside.employee.service.EmployService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EmployeServiceImpl implements EmployService {

    @Autowired
    private EmployRepository employRepository;

    @Override
    public List<Map<String, Object>> getBusinessParticipationList(Map<String, Object> params) {
        return employRepository.getBusinessParticipationList(params);
    }

    @Override
    public List<Map<String, Object>> getBusinessParticipationData(Map<String, Object> params) {
        return employRepository.getBusinessParticipationData(params);
    }

    @Override
    public List<Map<String, Object>> getUserPartRateList(Map<String, Object> params) {
        return employRepository.getUserPartRateList(params);
    }

    @Override
    public void setBusnPartRatePay(Map<String, Object> params) {

        List<Map<String, Object>> checkList = employRepository.getBusnPartRatePay(params);

        if(!checkList.isEmpty()){
            employRepository.delBusnPartRatePay(params);
        }

        Gson gson = new Gson();
        List<Map<String, Object>> paramArr = gson.fromJson((String) params.get("paramArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> param : paramArr) {
            param.put("pjtSn", params.get("pjtSn"));
            employRepository.setBusnPartRatePay(param);
        }

    }
}
