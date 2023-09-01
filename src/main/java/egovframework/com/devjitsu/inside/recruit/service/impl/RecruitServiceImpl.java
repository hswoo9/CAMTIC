package egovframework.com.devjitsu.inside.recruit.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.recruit.repository.RecruitRepository;
import egovframework.com.devjitsu.inside.recruit.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class RecruitServiceImpl implements RecruitService {
    @Autowired
    private RecruitRepository recruitRepository;

    @Override
    public Map<String, Object> getRecruitNum(){
        return recruitRepository.getRecruitNum();
    }

    @Override
    public List<Map<String, Object>> getRecruitList(Map<String, Object> params) {
        List<Map<String, Object>> recruitList = recruitRepository.getRecruitList(params);
        if(recruitList.size() > 0){
            for(int i = 0 ; i < recruitList.size() ; i++){
                List<Map<String, Object>> recruitAreaList = recruitRepository.getRecruitAreaList(recruitList.get(i));
                if(recruitAreaList.size() > 0){
                    recruitList.get(i).put("recruitAreaList", recruitAreaList);
                }
            }
        }
        return recruitList;
    }

    @Override
    public Map<String, Object> getRecruit(Map<String, Object> params) {
        Map<String, Object> returnMap = recruitRepository.getRecruit(params);
        returnMap.put("recruitArea", recruitRepository.getRecruitAreaList(params));
        return returnMap;
    }

    @Override
    public Map<String, Object> getRecruitArea(Map<String, Object> params) {
        return recruitRepository.getRecruitArea(params);
    }

    @Override
    public List<Map<String, Object>> getCommissionerList(Map<String, Object> params) {
        return recruitRepository.getCommissionerList(params);
    }

    @Override
    public void setRecruitInsert(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> area = gson.fromJson((String) params.get("areaArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        // 1. 채용공고 저장 2. 모집분야 저장
        try {
            if(StringUtils.isEmpty(params.get("recruitInfoSn"))){
                recruitRepository.setRecruitInsert(params);
            }else{
                recruitRepository.setRecruitUpdate(params);
                recruitRepository.setRecruitAreaDelete(params);
            }

            if(!area.isEmpty()) {
                params.put("area", area);
                recruitRepository.setRecruitAreaInsert(params);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    public void setCommissionerInsert(Map<String, Object> params) {
        recruitRepository.setCommissionerInsert(params);
    }
}
