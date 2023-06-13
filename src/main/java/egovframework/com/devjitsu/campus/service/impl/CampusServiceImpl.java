package egovframework.com.devjitsu.campus.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.campus.repository.CampusRepository;
import egovframework.com.devjitsu.campus.service.CampusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class CampusServiceImpl implements CampusService {

    @Autowired
    private CampusRepository campusRepository;

    @Override
    public List<Map<String, Object>> getCodeList(Map<String, Object> params){
        return campusRepository.getCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getTargetOne(Map<String, Object> params){
        return campusRepository.getTargetOne(params);
    }

    @Override
    public List<Map<String, Object>> getTargetList(Map<String, Object> params){
        return campusRepository.getTargetList(params);
    }

    @Override
    public List<Map<String, Object>> getTargetCategoryList(Map<String, Object> params){
        return campusRepository.getTargetCategoryList(params);
    }

    @Override
    public List<Map<String, Object>> getTargetCategoryDetailList(Map<String, Object> params){
        return campusRepository.getTargetCategoryDetailList(params);
    }

    @Override
    public List<Map<String, Object>> getEduCategoryList(Map<String, Object> params){
        return campusRepository.getEduCategoryList(params);
    }

    @Override
    public List<Map<String, Object>> getEduCategoryDetailList(Map<String, Object> params){
        return campusRepository.getEduCategoryDetailList(params);
    }

    @Override
    @Transactional
    public Object setTargetInsert(Map<String, Object> params) {
        return campusRepository.setTargetInsert(params);
    }

    @Override
    @Transactional
    public Object setTargetDetailInsert(Map<String, Object> params) {
        if (params.containsKey("REG_EMP_SEQ") == true && params.get("REG_EMP_SEQ") != null && !params.get("REG_EMP_SEQ").equals("")) {
            campusRepository.setTargetDetailDelete(params);
        }
        Gson gson = new Gson();
        List<Map<String, Object>> SYSTEM_CATEGORY_DETAIL_LIST = gson.fromJson((String) params.get("EDU_CATEGORY_DETAIL_ID"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("EDU_CATEGORY_DETAIL_ID", SYSTEM_CATEGORY_DETAIL_LIST);
        return campusRepository.setTargetDetailInsert(params);
    }
}
