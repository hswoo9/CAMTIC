package egovframework.com.devjitsu.inside.recruit.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.recruit.repository.EvalManageRepository;
import egovframework.com.devjitsu.inside.recruit.service.EvalManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class EvalManageServiceImpl implements EvalManageService {

    private static final Logger logger = LoggerFactory.getLogger(EvalManageServiceImpl.class);

    @Autowired
    private EvalManageRepository evalManageRepository;

    @Override
    public List<Map<String, Object>> getEvalItemMainList(Map<String, Object> params) {
        return evalManageRepository.getEvalItemMainList(params);
    }

    @Override
    public void setEvalItemActiveUpd(Map<String, Object> params) {
        evalManageRepository.setEvalItemActiveUpd(params);
    }

    @Override
    public void setEvalItemMain(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> evalItemArr = gson.fromJson((String) params.get("evalItemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(StringUtils.isEmpty(params.get("evalItemMainId"))){
            evalManageRepository.setEvalItemMain(params);
        }else{
            evalManageRepository.setEvalItemMainUpd(params);
        }

        evalManageRepository.setEvalItemDel(params);
        params.put("evalItemArr", evalItemArr);
        evalManageRepository.setEvalItem(params);
    }

    @Override
    public Map<String, Object> getEvalItemMain(Map<String, Object> params) {
        Map<String, Object> returnMap = evalManageRepository.getEvalItemMain(params);
        returnMap.put("itemList", evalManageRepository.getEvalItem(params));

        return returnMap;
    }

    @Override
    public Map<String, Object> getRecruitEvalSelSheet(Map<String, Object> params) {
        return evalManageRepository.getRecruitEvalSelSheet(params);
    }

    @Override
    public void setRecruitEvalSelSheet(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("recruitEvalSheetId"))){
            evalManageRepository.setRecruitEvalSelSheet(params);
        }else{
            evalManageRepository.setRecruitEvalSelSheetUpd(params);
        }
    }
}
