package egovframework.com.devjitsu.inside.workPlan.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.workPlan.repository.WorkPlanRepository;
import egovframework.com.devjitsu.inside.workPlan.service.WorkPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WorkPlanServiceImpl implements WorkPlanService {

    @Autowired
    private WorkPlanRepository workPlanRepository;


    /**
     * 유연근무 신청 저장 리스트
     * @param params
     * @return
     */
    @Override
    public List<Map<String, Object>> getWorkPlanReqChangeList(Map<String, Object> params){
        return workPlanRepository.getWorkPlanReqChangeList(params);
    }

    @Override
    @Transactional
    public Map<String, Object> setWorkPlanChangeOrDetail(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        Gson gson = new Gson();
        List<Map<String, Object>> subList = gson.fromJson((String) params.get("workPlanChange"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        try {
            workPlanRepository.setWorkPlanChange(params);
            params.put("workPlanChangeId", params.get("WORK_PLAN_CHANGE_ID"));
            workPlanRepository.saveWorkPlanChangeDetail(params);
            result.put("code", "200");
            result.put("message", "신청 데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "신청 데이터 저장 중 에러가 발생했습니다.");
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getWkCommonCodeWpT(Map<String, Object> params) {
        return workPlanRepository.getWkCommonCodeWpT(params);
    }

    @Override
    public Map<String, Object> updateApprStat(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        String message = "";
        Gson gson = new Gson();
        List<String> selectList = gson.fromJson((String) params.get("selectList"), new TypeToken<List<String>>() {}.getType());
        if(selectList.size() < 1){
            message = "1개이상 선택해주세요.";
        }else{
            params.put("selectArr", selectList);
            int check = workPlanRepository.updateApprStat(params);
            if(check > 0){
                message = "처리되었습니다.";
            }
        }

        resultMap.put("message", message);
        return resultMap;
    }

    @Override
    public List<Map<String, Object>> getWorkPlanDefaultList(Map<String, Object> params) {
        List<Map<String, Object>> resultList = new ArrayList<>();
        List<Map<String, Object>> originList = new ArrayList<>();
        List<Map<String, Object>> changeList = new ArrayList<>();
        originList = workPlanRepository.getWorkPlanDefaultList(params);
        changeList = workPlanRepository.getWorkPlanChangeList(params);
        if(originList.size() > 0){
            if(changeList.size() > 0){
                for(int i = 0 ; i < originList.size() ; i++){
                    for(int j = 0 ; j < changeList.size() ; j++){
                        String originWorkDate = originList.get(i).get("WORK_DATE").toString();
                        String changeWorkDate = changeList.get(j).get("WORK_DATE").toString();
                    }
                }
            }else{
                resultList = originList;
            }
        }else{
            if(changeList.size() > 0){
                    for(int j = 0 ; j < changeList.size() ; j++){
                        String changeWorkDate = changeList.get(j).get("WORK_DATE").toString();
                    }
            }else{
                resultList = changeList;
            }
        }
        return changeList;
    }

    @Override
    public List<Map<String, Object>> getWorkPlanUserList(Map<String, Object> params){
        return workPlanRepository.getWorkPlanUserList(params);
    }

    @Override
    public List<Map<String, Object>> getWorkTimeCode(Map<String, Object> params){
        return workPlanRepository.getWorkTimeCode(params);
    }
    @Override
    public List<Map<String, Object>> getWorkPlanList(Map<String, Object> params){
        return workPlanRepository.getWorkPlanList(params);
    }

    @Override
    public Map<String, Object> setWorkPlan(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        String code = "";
        String message = "";
        try{
            int insertCheck = workPlanRepository.setWorkPlan(params);
            if(insertCheck > 0){
                workPlanRepository.setWorkPlanDetail(params);
                code = "success";
                message = "처리되었습니다.";
            }
        }catch (Exception e){
            code = "fail";
            message = e.getMessage();
        }
        resultMap.put("code", code);
        resultMap.put("message", message);
        return resultMap;
    }

    @Override
    public Map<String, Object> updateWorkPlan(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        String code = "";
        String message = "";
        try{
            int insertCheck = workPlanRepository.updateWorkPlan(params);
            if(insertCheck > 0){
                workPlanRepository.delWorkPlanDetail(params);
                workPlanRepository.setWorkPlanDetail(params);
                code = "success";
                message = "처리되었습니다.";
            }
        }catch (Exception e){
            code = "fail";
            message = e.getMessage();
        }
        resultMap.put("code", code);
        resultMap.put("message", message);
        return resultMap;
    }

    @Override
    public void workPlanUserApp(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("workPlanApprovalId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            params.put("status", "C");
            workPlanRepository.workPlanUserApp(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            params.put("status", "E");
            workPlanRepository.workPlanUserApp(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "Y");
            workPlanRepository.workPlanUserApp(params);
        }
    }

    @Override
    public void workPlanAdminApp(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("workPlanApprovalId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            params.put("adminStatus", "C");
            workPlanRepository.workPlanAdminApp(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            params.put("adminStatus", "E");
            workPlanRepository.workPlanAdminApp(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("adminStatus", "Y");
            workPlanRepository.workPlanAdminApp(params);
        }
    }

    @Override
    public void deleteWorkPlanData(Map<String, Object> params) {
        workPlanRepository.deleteWorkPlanData(params);
    }

    @Override
    public Map<String, Object> getWorkPlanData(Map<String, Object> params) {
        Map<String, Object> resultMap = workPlanRepository.getWorkPlanData(params);
        resultMap.put("workTimeList", workPlanRepository.getWorkTimeCode(params));
        return resultMap;
    }
}
