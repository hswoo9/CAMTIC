package egovframework.com.devjitsu.inside.salary.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.salary.repository.SalaryManageRepository;
import egovframework.com.devjitsu.inside.salary.service.SalaryManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SalaryManageServiceImpl implements SalaryManageService {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(SalaryManageServiceImpl.class);

    @Autowired
    private SalaryManageRepository salaryManageRepository;

    @Override
    public List<Map<String, Object>> getEmpSalaryManageList(Map<String, Object> params) {
        return salaryManageRepository.getEmpSalaryManageList(params);
    }

    @Override
    public List<Map<String, Object>> getSocialRateManageList(Map<String, Object> params) {
        return salaryManageRepository.getSocialRateManageList(params);
    }

    @Override
    public void setSocialRate(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> newRateArr = gson.fromJson((String) params.get("newRateArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(newRateArr.size() > 0){
            params.put("newRateArr", newRateArr);
            salaryManageRepository.setSocialRate(params);
        }
        List<Map<String, Object>> oldRateArr = gson.fromJson((String) params.get("oldRateArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        if(oldRateArr.size() > 0){
            for(Map<String, Object> map : oldRateArr){
                salaryManageRepository.setSocialRateUpd(map);
            }
        }
    }

    @Override
    public void setSocialRateDel(Map<String, Object> params) {
        salaryManageRepository.setSocialRateDel(params);
    }
}
