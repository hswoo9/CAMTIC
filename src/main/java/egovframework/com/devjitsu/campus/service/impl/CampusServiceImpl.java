package egovframework.com.devjitsu.campus.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.campus.repository.CampusRepository;
import egovframework.com.devjitsu.campus.service.CampusService;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CampusServiceImpl implements CampusService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CampusRepository campusRepository;

    @Override
    public List<Map<String, Object>> getCodeList(Map<String, Object> params){
        return campusRepository.getCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getEduInfoList(Map<String, Object> params){
        return campusRepository.getEduInfoList(params);
    }

    @Override
    public Map<String, Object> getEduInfoOne(Map<String, Object> params){
        return campusRepository.getEduInfoOne(params);
    }

    @Override
    public Map<String, Object> getEduResultOne(Map<String, Object> params){
        return campusRepository.getEduResultOne(params);
    }

    @Override
    public List<Map<String, Object>> getTargetYearList(Map<String, Object> params){
        return campusRepository.getTargetYearList(params);
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
    public Map<String, Object> getCategoryOne(Map<String, Object> params){
        return campusRepository.getCategoryOne(params);
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
    public List<Map<String, Object>> getEduPlanList(Map<String, Object> params){
        return campusRepository.getEduPlanList(params);
    }

    @Override
    public List<Map<String, Object>> getEduPlanOne(Map<String, Object> params){
        return campusRepository.getEduPlanOne(params);
    }

    @Override
    public List<Map<String, Object>> getEduStat(Map<String, Object> params){
        return campusRepository.getEduStat(params);
    }

    @Override
    public List<Map<String, Object>> getStudyInfoList(Map<String, Object> params){
        return campusRepository.getStudyInfoList(params);
    }

    @Override
    public Map<String, Object> getStudyInfoOne(Map<String, Object> params){
        return campusRepository.getStudyInfoOne(params);
    }

    @Override
    public List<Map<String, Object>> getStudyUserList(Map<String, Object> params){
        return campusRepository.getStudyUserList(params);
    }

    @Override
    public List<Map<String, Object>> getStudyJournalList(Map<String, Object> params){
        return campusRepository.getStudyJournalList(params);
    }

    @Override
    public Map<String, Object> getStudyJournalOne(Map<String, Object> params){
        return campusRepository.getStudyJournalOne(params);
    }




    @Override
    public void setEduInfoInsert(Map<String, Object> params) {
        campusRepository.setEduInfoInsert(params);
    }

    @Override
    public void setEduResultInsert(Map<String, Object> params) {
        campusRepository.setEduInfoUpdate(params);
        campusRepository.setEduResultInsert(params);
    }

    @Override
    public void setStudyInfoInsert(Map<String, Object> params) {
        campusRepository.setStudyInfoInsert(params);

        if(params.get("studyUserSeq") != null && !params.get("studyUserSeq").equals("")){
            String studyUserSeq = params.get("studyUserSeq").toString();
            String[] studyUserSeqArr = studyUserSeq.split(",");

            for(String str: studyUserSeqArr){
                params.put("empSeq", str);
                Map<String, Object> userMap = userRepository.getUserInfo(params);
                params.put("studyEmpName", userMap.get("EMP_NAME_KR"));
                params.put("studyDeptName", userMap.get("deptNm"));
                params.put("studyTeamName", userMap.get("teamNm"));
                params.put("studyPositionName", userMap.get("POSITION_NAME"));
                params.put("studyDutyName", userMap.get("DUTY_NAME"));

                campusRepository.setStudyUserInsert(params);
            }
        }
    }

    @Override
    public void setStudyUserMngUpdate(Map<String, Object> params) {
        campusRepository.setStudyUserMngUpdate(params);
    }

    @Override
    public void studyReq(Map<String, Object> params) {
        campusRepository.studyReq(params);
    }

    @Override
    public void setStudyJournalInsert(Map<String, Object> params) {
        campusRepository.setStudyJournalInsert(params);
    }

    @Override
    public void setStudyJournalApp(Map<String, Object> params) {
        campusRepository.setStudyJournalApp(params);
    }

    @Override
    public Map<String, Object> setTargetInsert(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.setTargetInsert(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        }catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    @Transactional
    public Map<String, Object> setTargetDetailInsert(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            if (params.containsKey("empSeq") == true && params.get("empSeq") != null && !params.get("empSeq").equals("")) {
                campusRepository.setTargetDetailDelete(params);
            }
            Gson gson = new Gson();
            List<Map<String, Object>> SYSTEM_CATEGORY_DETAIL_LIST = gson.fromJson((String) params.get("eduCategoryDetailIdList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            params.put("eduCategoryDetailIdList", SYSTEM_CATEGORY_DETAIL_LIST);
            campusRepository.setTargetDetailInsert(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        }catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> setEduTargetDetailUpdate(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            Gson gson = new Gson();
            List<Map<String, Object>> EDU_TARGET_DETAIL_LIST = gson.fromJson((String) params.get("eduTargetDetailIdList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            params.put("eduTargetDetailIdList", EDU_TARGET_DETAIL_LIST);
            campusRepository.setEduTargetDetailUpdate(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> setEduPlanInsert(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.setEduPlanInsert(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        }catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> setEduPlanUpdate(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.setEduPlanUpdate(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> updateEduInfoApprStat(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.updateEduInfoApprStat(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> updateApprStat(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.updateApprStat(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public void updateDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("eduInfoId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "10".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updateEduInfoApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { //반려
            params.put("status", "30");
            campusRepository.updateEduInfoApprStat(params);
        }else if("40".equals(docSts)) { //회수
            params.put("status", "40");
            campusRepository.updateEduInfoApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            campusRepository.updateEduInfoFinalApprStat(params);
        }
    }

    @Override
    public void updateResDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("eduInfoId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "10".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updateEduResultApprStat(params);
        }else if("30".equals(docSts)) { // 반려
            params.put("status", "30");
            campusRepository.updateEduResultApprStat(params);
        }else if("30".equals(docSts)) { // 회수
            params.put("status", "40");
            campusRepository.updateEduResultApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            campusRepository.updateEduResultFinalApprStat(params);
        }
    }
}
