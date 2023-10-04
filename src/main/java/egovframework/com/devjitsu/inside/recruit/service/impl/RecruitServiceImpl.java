package egovframework.com.devjitsu.inside.recruit.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.camtic.repository.ApplicationRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.recruit.repository.RecruitRepository;
import egovframework.com.devjitsu.inside.recruit.service.RecruitService;
import egovframework.com.devjitsu.inside.userManage.repository.UserManageRepository;
import egovframework.com.devjitsu.system.repository.MenuManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecruitServiceImpl implements RecruitService {

    @Autowired
    private UserManageRepository userManageRepository;

    @Autowired
    private MenuManagementRepository menuManagementRepository;

    @Autowired
    private RecruitRepository recruitRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CommonRepository commonRepository;

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
                    if(careerType.indexOf(",") > -1){
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
    public List<Map<String, Object>> getRecruitAreaList(Map<String, Object> params) {
        return recruitRepository.getRecruitAreaList(params);
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
    public void setEvalEmpInfo(Map<String, Object> params) {
        userManageRepository.setUserReqDetailInsert(params);
        menuManagementRepository.setAuthorityGroupUser(params);
    }

    @Override
    public void setCommissionerEmpInfoDel(Map<String, Object> params) {
        recruitRepository.setCommissionerEmpInfoDel(params);
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
    public void setRecruitDel(Map<String, Object> params) {
        recruitRepository.setRecruitDel(params);
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
    public Map<String, Object> getApplication(Map<String, Object> params) {
        Map<String, Object> searchMap = new HashMap<>();

        /**
         * 기본정보
         */
        Map<String, Object> returnMap = applicationRepository.getApplicationForm1(params);
        searchMap.put("fileNo", returnMap.get("PHOTO_FILE"));
        returnMap.put("photoFile", applicationRepository.getApplicationFileInfo(searchMap));
        searchMap.put("fileNo", returnMap.get("ARMI_FILE"));
        returnMap.put("armiFile", applicationRepository.getApplicationFileInfo(searchMap));


        /**
         * 학력/경력
         */
        List<Map<String, Object>> schoolList = applicationRepository.getApplicationSchool(params);
        for(Map<String, Object> map : schoolList){
            searchMap.put("fileNo", map.get("DEGREE_FILE"));
            map.put("degreeFile", commonRepository.getContentFileOne(searchMap));
            searchMap.put("fileNo", map.get("SEXUAL_FILE"));
            map.put("sexualFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("school", schoolList);

        List<Map<String, Object>> careerList = applicationRepository.getApplicationCareer(params);
        for(Map<String, Object> map : careerList){
            searchMap.put("fileNo", map.get("CAREER_FILE"));
            map.put("careerFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("career", careerList);


        /**
         * 자격/면허
         */
        List<Map<String, Object>> certList = applicationRepository.getApplicationCert(params);
        for(Map<String, Object> map : certList){
            searchMap.put("fileNo", map.get("CERT_FILE"));
            map.put("certFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("cert", certList);

        List<Map<String, Object>> langList = applicationRepository.getApplicationLang(params);
        for(Map<String, Object> map : langList){
            searchMap.put("fileNo", map.get("LANG_FILE"));
            map.put("langFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("lang", langList);

        /**
         * 자기소개서
         */
        returnMap.put("introduce", applicationRepository.getApplicationIntroduce(params));

        return returnMap;
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
        Gson gson = new Gson();
        List<Map<String, Object>> appArr = gson.fromJson((String) params.get("appArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> map : appArr){
            recruitRepository.setInAvoidUpd(map);
        }

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
