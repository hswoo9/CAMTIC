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

                String careerType = recruitList.get(i).get("CAREER_TYPE") == null ? "" : recruitList.get(i).get("CAREER_TYPE").toString();
                if(!StringUtils.isEmpty(careerType)){
                    if(careerType.indexOf("~") > -1){
                        careerType = "신입~경력";
                    }else{
                        if(careerType == "1"){
                            careerType = "경력";
                        }else{
                            careerType = "신입";
                        }
                    }
                }
                recruitList.get(i).put("careerType", careerType);
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
    public void setCommissionerDel(Map<String, Object> params) {
        recruitRepository.setCommissionerDel(params);
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

    @Override
    public void setRecruitStatusUpd(Map<String, Object> params) {
        if(params.get("recruitStatusSn").equals("2")){
            /** 홈페이지 채용공고 insert */
            
        }

        recruitRepository.setRecruitStatusUpd(params);
    }

    @Override
    public List<Map<String, Object>> getApplicationList(Map<String, Object> params) {
        List<Map<String, Object>> list = recruitRepository.getApplicationList(params);

//        for(Map<String, Object> map : list){
//
//        }

        return list;
    }

    @Override
    public List<Map<String, Object>> getUserDuplicationList(Map<String, Object> params) {
        return recruitRepository.getUserDuplicationList(params);
    }

    @Override
    public void setApplicationUpd(Map<String, Object> params) {
        recruitRepository.setApplicationUpd(params);
    }

    @Override
    public void setInAvoidUpd(Map<String, Object> params) {
        recruitRepository.setInAvoidUpd(params);
        /** 불참자 평가 데이터 삭제 */
//        recruitRepository.setInAvoidScoreBoardDel(params);
    }

    @Override
    public List<Map<String, Object>> getInApplicationList(Map<String, Object> params) {
        return recruitRepository.getInApplicationList(params);
    }

    @Override
    public void setApplicationInTime(Map<String, Object> params) {
        recruitRepository.setApplicationInTimeDel(params);

        Gson gson = new Gson();
        List<Map<String, Object>> inTimeArr = gson.fromJson((String) params.get("inTimeArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        recruitRepository.setApplicationInTime(inTimeArr);
    }

    @Override
    public void setPrePassAppl(Map<String, Object> params) {
        recruitRepository.setPrePassAppl(params);
    }
}
