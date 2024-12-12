package egovframework.com.devjitsu.inside.evaluation.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.inside.evaluation.repository.EvaluationRepository;
import egovframework.com.devjitsu.inside.evaluation.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Map<String, Object>> getRequestEvaluationMemberTot(Map<String, Object> params) {
        return evaluationRepository.getRequestEvaluationMemberTot(params);
    }

    @Override
    public List<Map<String, Object>> getRequestEvaluationUser(Map<String, Object> params) {
        return evaluationRepository.getRequestEvaluationUser(params);
    }

    @Override
    public List<Map<String, Object>> getEvaluationList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationList(params);
    }
    @Override
    public List<Map<String, Object>> getEvaluationEmpList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationEmpList(params);
    }
    @Override
    public Map<String, Object> getEvaluationEmpCountFirst(Map<String, Object> params) {
        params.put("bsYMD", params.get("bsYear")+"-12-31");
        params.put("key", "1");

        return evaluationRepository.getEvaluationEmpCount(params);
    }
    @Override
    public Map<String, Object> getEvaluationEmpCount(Map<String, Object> params) {
        params.put("bsYMD", params.get("bsYear")+"-12-31");
        params.put("key", "2");

        return evaluationRepository.getEvaluationEmpCount(params);
    }
    @Override
    public List<Map<String, Object>> getEvalResultEmpList(Map<String, Object> params) {
        return evaluationRepository.getEvalResultEmpList(params);
    }
    @Override
    public Map<String, Object> getEvaluationApp(Map<String, Object> params) {
        return evaluationRepository.getEvaluationApp(params);
    }
    @Override
    public Map<String, Object> getEvaluationOneList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationOneList(params);
    }
    @Override
    public Map<String, Object> getEvaluationSelf(Map<String, Object> params) {
        return evaluationRepository.getEvaluationSelf(params);
    }

    @Override
    public Map<String, Object> getEvaluationOne(Map<String, Object> params) {
        return evaluationRepository.getEvaluationOne(params);
    }
    @Override
    public Map<String, Object> getEvaluationPerOne(Map<String, Object> params) {
        return evaluationRepository.getEvaluationPerOne(params);
    }
    @Override
    public Map<String, Object> getEvaluationChk(Map<String, Object> params) {
        return evaluationRepository.getEvaluationChk(params);
    }

    @Override
    public Map<String, Object> getEvaluationView(Map<String, Object> params) {
        return evaluationRepository.getEvaluationView(params);
    }

    @Override
    public Map<String, Object> getEvalMemDet(Map<String, Object> params) {
        return evaluationRepository.getEvalMemDet(params);
    }

    @Override
    public Map<String, Object> getEvaluation(Map<String, Object> params) {
        return evaluationRepository.getEvaluation(params);
    }

    @Override
    public Map<String, Object> getRequestEvaluationUserCnt(Map<String, Object> params) {
        return evaluationRepository.getRequestEvaluationUserCnt(params);
    }
    @Override
    public Map<String, Object> getUserPersonnelinformOne(Map<String, Object> params) {
        return evaluationRepository.getUserPersonnelinformOne(params);
    }
    @Override
    public Map<String, Object> getEvaluationBs(Map<String, Object> params) {
        return evaluationRepository.getEvaluationBs(params);
    }
    @Override
    public Map<String, Object> getEvaluationBt(Map<String, Object> params) {
        return evaluationRepository.getEvaluationBt(params);
    }

    @Override
    public List<Map<String, Object>> getEvaluationBsList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationBsList(params);
    }

    @Override
    public List<Map<String, Object>> getEvaluationBtList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationBtList(params);
    }

    @Override
    public List<Map<String, Object>> getEvaluationScList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationScList(params);
    }

    @Override
    public List<Map<String, Object>> getEvaluationMngList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationMngList(params);
    }

    @Override
    public List<Map<String, Object>> getEvaluationScoreList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationScoreList(params);
    }

    @Override
    public void setEvaluation(Map<String, Object> params) {
      /*  params.get("evalSn")*/

        if(params.get("evalSn") != null && !params.get("evalSn").equals("")){
            evaluationRepository.updEvaluation(params);
            evaluationRepository.updEvaluationAppBt(params); // 평가항목 및 가중치 사업인원 update
            evaluationRepository.updEvaluationAppBs(params); // 평가항목 및 가중치 지원인원 update
        }else{
            evaluationRepository.insEvaluation(params);
            evaluationRepository.insEvaluationAppBt(params); // 평가항목 및 가중치 사업인원 insert
            evaluationRepository.insEvaluationAppBs(params); // 평가항목 및 가중치 지원인원 insert
        }

        if(params.containsKey("empSeqArr")){
           /* params.put("empSeqArr", params.get("empSeqArr").toString().split(","));
            evaluationRepository.insEvaluationEmp(params);*/
            evaluationRepository.delEvaluationEmp(params);

            Gson gson = new Gson();
            List<Map<String, Object>> empSeqArr = gson.fromJson((String) params.get("empSeqArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            for(Map<String, Object> empSeq: empSeqArr){
                empSeq.put("evalSn", params.get("evalSn"));
                evaluationRepository.insEvaluationEmp(empSeq);
            }

        }

        // 역량평가 데이터 insert / update
        Gson gson = new Gson();
        List<Map<String, Object>> capBodyArr = gson.fromJson((String) params.get("capBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        evaluationRepository.delEvaluationCap(params);
        for(Map<String, Object> capBody : capBodyArr){
            capBody.put("evalSn", params.get("evalSn"));
            evaluationRepository.insEvaluationCap(capBody);
        }

        // 평가항목 및 가중치 사업인원 - 팀원 insert / update
        List<Map<String, Object>> btBodyArr = gson.fromJson((String) params.get("btBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        evaluationRepository.delEvaluationBt(params);
        for(Map<String, Object> btBody : btBodyArr){
            btBody.put("evalSn", params.get("evalSn"));
            evaluationRepository.insEvaluationBt(btBody);
        }

        // 평가항목 및 가중치 지원인원 - 팀원 insert / update
        List<Map<String, Object>> bsBodyArr = gson.fromJson((String) params.get("bsBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        evaluationRepository.delEvaluationBs(params);
        for(Map<String, Object> bsBody : bsBodyArr){
            bsBody.put("evalSn", params.get("evalSn"));
            evaluationRepository.insEvaluationBs(bsBody);
        }

        // 평가 등급별 수준 및 점수 insert / update
        List<Map<String, Object>> scoreBodyArr = gson.fromJson((String) params.get("scoreBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        evaluationRepository.delEvaluationScore(params);
        for(Map<String, Object> scoreBody : scoreBodyArr){
            scoreBody.put("evalSn", params.get("evalSn"));
            evaluationRepository.insEvaluationScore(scoreBody);
        }

    }
    @Override
    public void setUpdReqEvaluation(Map<String, Object> params) {
        if(params.get("evalSn") != null && !params.get("evalSn").equals("")){
            evaluationRepository.updReqEvaluation(params);
        }else{
            evaluationRepository.insReqEvaluation(params);
        }

        if(params.containsKey("empSeqArr")){
            Gson gson = new Gson();
            List<Map<String, Object>> empSeqArr = gson.fromJson((String) params.get("empSeqArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            if(!empSeqArr.isEmpty()){
                evaluationRepository.delEvaluationEmp(params);
                for(Map<String, Object> empSeq: empSeqArr){
                    empSeq.put("evalSn", params.get("evalSn"));
                    evaluationRepository.insEvaluationEmp(empSeq);
                }
            }
        }

        // 평가 등급별 수준 및 점수 insert / update
        Gson gson = new Gson();
        List<Map<String, Object>> scoreBodyArr = gson.fromJson((String) params.get("scoreBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        evaluationRepository.delEvaluationScore(params);
        for(Map<String, Object> scoreBody : scoreBodyArr){
            scoreBody.put("evalSn", params.get("evalSn"));
            evaluationRepository.insEvaluationScore(scoreBody);
        }

    }

    @Override
    public void setUpdComEvaluation(Map<String, Object> params) {
        if(params.get("evalSn") != null && !params.get("evalSn").equals("")){
            evaluationRepository.updComEvaluation(params);
        }else{
            evaluationRepository.insEvaluation(params);
        }

        // 역량평가 데이터 insert / update
        Gson gson = new Gson();
        List<Map<String, Object>> capBodyArr = gson.fromJson((String) params.get("capBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        evaluationRepository.delEvaluationCap(params);
        for(Map<String, Object> capBody : capBodyArr){
            capBody.put("evalSn", params.get("evalSn"));
            evaluationRepository.insEvaluationCap(capBody);
        }
    }



    @Override
    public void delEvaluation(Map<String, Object> params) {
        evaluationRepository.delEvaluation(params);
    }

    @Override
    public void setEvaluationItemCopy(Map<String, Object> params) {

        int evalSn = Integer.parseInt(params.get("evalSn").toString());
        int copyEvalSn = evalSn - 1;
        params.put("copyEvalSn", copyEvalSn);

        evaluationRepository.delEvaluationItemCopy(params);
        evaluationRepository.setEvaluationItemCopy(params);
    }






    @Override
    public void setEvaluationMngList(Map<String, Object> params) {

        Gson gson = new Gson();
        List<Map<String, Object>> evalBodyArr = gson.fromJson((String) params.get("evalBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        evaluationRepository.delEvaluationMngList(params);
        for(Map<String, Object> evalBody : evalBodyArr){
            evalBody.put("evalSn", params.get("evalSn"));
            evalBody.put("eType", params.get("eType"));
            evalBody.put("pType", params.get("pType"));
            evalBody.put("empSeq", params.get("empSeq"));

            evaluationRepository.setEvaluationMngList(evalBody);
        }

    }

    @Override
    public void setEvalScoreTemSave(Map<String, Object> params) {

        Gson gson = new Gson();
        List<Map<String, Object>> evalBodyArr = gson.fromJson((String) params.get("evalBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> evalBody : evalBodyArr){
            evalBody.put("evalSn", params.get("evalSn"));
            evalBody.put("evalEmpSeq", params.get("evalEmpSeq"));
            evalBody.put("empSeq", params.get("empSeq"));
            evalBody.put("evalType", params.get("evalResultType"));

            if(params.get("save").equals("10")){
                evaluationRepository.updEvalScoreTemSave(evalBody);
            }else{
                evaluationRepository.delEvalScoreTemSave(evalBody);
                evaluationRepository.setEvalScoreTemSave(evalBody);
                if(!params.get("evalResultType").equals("eval")) {
                    evaluationRepository.updEvalView(params);
                }
            }
        }

        evaluationRepository.updEvaluationMem(params);
    }

    @Override
    public void setEvalScoreTemSaveAll(Map<String, Object> params) {
        evaluationRepository.updEvaluationMemAll(params);
    }

    @Override
    public void setSaveMngScore(Map<String, Object> params) {

        Gson gson = new Gson();
        List<Map<String, Object>> evalScoreMngArr = gson.fromJson((String) params.get("evalScoreMngArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> evalScoreMng : evalScoreMngArr){
            evaluationRepository.setSaveMngScore(evalScoreMng);
        }


    }

    @Override
    public List<Map<String, Object>> getEvalResultList(Map<String, Object> params) {
        return evaluationRepository.getEvalResultList(params);
    }

    @Override
    public List<Map<String, Object>> getNowEvalCount(Map<String, Object> params) {
        return evaluationRepository.getNowEvalCount(params);
    }

    @Override
    public List<Map<String, Object>> getExcelDownloadData(Map<String, Object> params) {
        List<Map<String, Object>> resultMap = evaluationRepository.getExcelDownloadData(params);
        List<Map<String, Object>> scoreList = evaluationRepository.getEvaluationScList(params);

        for(Map<String, Object> map : resultMap){
            String evalGrade = "";
            String resEvalGrade = "";

            for(Map<String, Object> temp : scoreList) {
                // 평가등급
                if((Float.parseFloat(temp.get("EVAL_SCORE_B").toString()) >= Float.parseFloat(map.get("EVAL_TOTAL").toString())) &&
                        Float.parseFloat((map.get("EVAL_TOTAL").toString())) >= Float.parseFloat(temp.get("EVAL_SCORE_A").toString())) {
                    evalGrade = (String) temp.get("EVAL_GRADE");
                }

                // 최종등급
                if((Float.parseFloat(temp.get("EVAL_SCORE_B").toString()) >= Float.parseFloat(map.get("EVAL_FINAL_TOTAL").toString())) &&
                        Float.parseFloat((map.get("EVAL_FINAL_TOTAL").toString())) >= Float.parseFloat(temp.get("EVAL_SCORE_A").toString())){
                    resEvalGrade = (String) temp.get("EVAL_GRADE");
                }
            }

            map.put("EVAL_GRADE", evalGrade);
            map.put("EVAL_FINAL_GRADE", resEvalGrade);
        }

        return resultMap;
    }

    @Override
    public List<Map<String, Object>> getEvalEmpList(Map<String, Object> params) {
        return evaluationRepository.getEvalEmpList(params);
    }

    @Override
    public Map<String, Object> getEvalGoal(Map<String, Object> params) {
        return evaluationRepository.getEvalGoal(params);
    }

    @Override
    public List<Map<String, Object>> getEvalGoalList(Map<String, Object> params) {
        return evaluationRepository.getEvalGoalList(params);
    }

    @Override
    public void setEvalGoal(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("evalGoalSn"))){
            evaluationRepository.setEvalGoal(params);
        }else{
            evaluationRepository.setEvalGoalUpd(params);
        }
    }

    @Override
    public Map<String, Object> getEvalAchieveScoreList(Map<String, Object> params) {
        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("pjtYear", params.get("searchYear"));
        searchMap.put("deptSeq", params.get("deptSeq"));
        searchMap.put("busnSubClass", "res");

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> pjtList = projectRepository.getProjectList(searchMap);
        if (pjtList.size() > 0) {
            for(Map<String, Object> map : pjtList){
                map.put("pjtSn", map.get("PJT_SN"));
                map.put("pjtPerformanceList", projectRepository.getPjtPerformanceList(map));
                map.put("evalAchieveList", evaluationRepository.getEvalAchieveList(map));
            }
            result.put("pjtList", pjtList);
        }
        result.put("evalAchieveList", evaluationRepository.getEvalGoalList(params));

        return result;
    }

    @Override
    public void setEvalAchieve(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> achieveArr = gson.fromJson((String) params.get("achieveArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        if(achieveArr.size() > 0){
            for (Map<String, Object> map : achieveArr){
                String evalAchieveSn = evaluationRepository.getEvalAchieveChk(map);
                if (StringUtils.isEmpty(evalAchieveSn)) {
                    evaluationRepository.setEvalAchieve(map);
                }else{
                    map.put("evalAchieveSn", evalAchieveSn);
                    evaluationRepository.setEvalAchieveUpd(map);
                }
            }
        }
    }
}
