package egovframework.com.devjitsu.inside.employee.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.employee.repository.EmployRepository;
import egovframework.com.devjitsu.inside.employee.service.EmployService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
    public Map<String, Object> getBusnPartRatePayData(Map<String, Object> params) {
        List<Map<String, Object>> list = employRepository.getBusnPartRatePayData(params);
        Map<String, Object> result = new HashMap<>();

        for(Map<String, Object> map : list) {
            result.put(map.get("BS_YEAR").toString(), map);
        }

        return result;
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

        String empSeq = "";
        for(Map<String, Object> map : paramArr) {
            map.put("pjtSn", params.get("pjtSn"));
            empSeq = map.get("empSeq").toString();

            List<Map<String, Object>> salMap = (List<Map<String, Object>>) map.get("salArr");

            for(Map<String, Object> map2 : salMap) {
                map2.put("empSeq", empSeq);
                map2.put("empSal", map.get("empSal"));
                map2.put("monSal", map.get("monSal"));
                map2.put("pjtSn", params.get("pjtSn"));

                map2.put("monPay1", map2.get("monPay1") != null ? map2.get("monPay1") : 0);
                map2.put("monPay2", map2.get("monPay2") != null ? map2.get("monPay2") : 0);
                map2.put("monPay3", map2.get("monPay3") != null ? map2.get("monPay3") : 0);
                map2.put("monPay4", map2.get("monPay4") != null ? map2.get("monPay4") : 0);
                map2.put("monPay5", map2.get("monPay5") != null ? map2.get("monPay5") : 0);
                map2.put("monPay6", map2.get("monPay6") != null ? map2.get("monPay6") : 0);
                map2.put("monPay7", map2.get("monPay7") != null ? map2.get("monPay7") : 0);
                map2.put("monPay8", map2.get("monPay8") != null ? map2.get("monPay8") : 0);
                map2.put("monPay9", map2.get("monPay9") != null ? map2.get("monPay9") : 0);
                map2.put("monPay10", map2.get("monPay10") != null ? map2.get("monPay10") : 0);
                map2.put("monPay11", map2.get("monPay11") != null ? map2.get("monPay11") : 0);
                map2.put("monPay12", map2.get("monPay12") != null ? map2.get("monPay12") : 0);

                map2.put("monItem1", map2.get("monItem1") != null ? map2.get("monItem1") : 0);
                map2.put("monItem2", map2.get("monItem2") != null ? map2.get("monItem2") : 0);
                map2.put("monItem3", map2.get("monItem3") != null ? map2.get("monItem3") : 0);
                map2.put("monItem4", map2.get("monItem4") != null ? map2.get("monItem4") : 0);
                map2.put("monItem5", map2.get("monItem5") != null ? map2.get("monItem5") : 0);
                map2.put("monItem6", map2.get("monItem6") != null ? map2.get("monItem6") : 0);
                map2.put("monItem7", map2.get("monItem7") != null ? map2.get("monItem7") : 0);
                map2.put("monItem8", map2.get("monItem8") != null ? map2.get("monItem8") : 0);
                map2.put("monItem9", map2.get("monItem9") != null ? map2.get("monItem9") : 0);
                map2.put("monItem10", map2.get("monItem10") != null ? map2.get("monItem10") : 0);
                map2.put("monItem11", map2.get("monItem11") != null ? map2.get("monItem11") : 0);
                map2.put("monItem12", map2.get("monItem12") != null ? map2.get("monItem12") : 0);

                employRepository.setBusnPartRatePay(map2);
            }

        }

    }

    @Override
    public List<Map<String, Object>> getCalcPartRate(Map<String, Object> params) {
        return employRepository.getCalcPartRate(params);
    }
}
