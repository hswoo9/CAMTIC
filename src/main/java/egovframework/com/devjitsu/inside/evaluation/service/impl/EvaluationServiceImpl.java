package egovframework.com.devjitsu.inside.evaluation.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_achieve.repository.AchieveRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.inside.evaluation.repository.EvaluationRepository;
import egovframework.com.devjitsu.inside.evaluation.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import sun.security.krb5.internal.PAData;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private AchieveRepository achieveRepository;

    @Override
    public List<Map<String, Object>> getRequestEvaluationMemberTot(Map<String, Object> params) {
        return evaluationRepository.getRequestEvaluationMemberTot(params);
    }

    @Override
    public List<Map<String, Object>> getRequestEvaluationUser(Map<String, Object> params) {
        return evaluationRepository.getRequestEvaluationUser(params);
    }

    @Override
    public Map<String, Object> getEvaluationList(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        result.put("evaluationList", evaluationRepository.getEvaluationList(params));
        result.put("evalAchieveSetList", evaluationRepository.getEvalAchieveSetList(params));
        return result;
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
    public Map<String, Object> getTeamAchieveApprove(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        result.put("teamAchieveApprove", evaluationRepository.getTeamAchieveApprove(params));
        result.put("teamGoalApprove",  evaluationRepository.getTeamGoalApprove(params));
        result.put("evalAchieveSet",  evaluationRepository.getEvalAchieveSet(params));

        return result;
    }

    @Override
    public Map<String, Object> getEvalGoalList(Map<String, Object> params) {
        Map<String, Object> returnMap = new HashMap<>();
        Map<String, Object> evalSetMap = evaluationRepository.getEvalAchieveSet(params);
        if(evalSetMap != null){
            params.put("excludesSeq", evalSetMap.get("EXCLUDES_SEQ"));
        }

        List<Map<String, Object>> goalList = evaluationRepository.getEvalGoalList(params);
        params.put("empSeqArr", goalList.stream()
                .map(map -> map.get("EMP_SEQ"))
                .collect(Collectors.toList()));
        returnMap.put("goalList", goalList);
        returnMap.put("achieveList", evaluationRepository.getEvalAchieveList2(params));


        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("pjtYear", params.get("pjtYear"));
        searchMap.put("deptSeq", params.get("teamSeq"));
        searchMap.put("record", params.get("record"));
        searchMap.put("reqYear", params.get("pjtYear"));

        List<Map<String, Object>> pjtList = achieveRepository.getProjectListByAchieve(searchMap);
        if (pjtList.size() > 0) {
            for(Map<String, Object> map : pjtList){
                searchMap.put("pjtSn", map.get("PJT_SN"));
                Map<String, Object> getPjtAmtSetData = projectRepository.getPjtAmtSetData(searchMap);
                map.put("pjtAmtSetData", getPjtAmtSetData);
            }
            returnMap.put("pjtList", pjtList);
        }

        return returnMap;
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
        searchMap.put("year", params.get("searchYear"));
        searchMap.put("pjtYear", params.get("searchYear"));
        searchMap.put("deptSeq", params.get("teamSeq"));
        searchMap.put("record", params.get("record"));
        searchMap.put("reqYear", params.get("searchYear"));

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> pjtList = achieveRepository.getProjectListByAchieve(searchMap);
        if (pjtList.size() > 0) {
            for(Map<String, Object> map : pjtList){
                searchMap.put("pjtSn", map.get("PJT_SN"));
                Map<String, Object> getPjtAmtSetData = projectRepository.getPjtAmtSetData(searchMap);
                map.put("pjtAmtSetData", getPjtAmtSetData);

                map.put("pjtSn", map.get("PJT_SN"));
                map.put("pjtPerformanceList", projectRepository.getPjtPerformanceList(map));
                map.put("evalAchieveList", evaluationRepository.getEvalAchieveList(map));
            }
            result.put("pjtList", pjtList);
        }

        Map<String, Object> evalSetMap = evaluationRepository.getEvalAchieveSet(searchMap);
        if(evalSetMap != null){
            params.put("excludesSeq", evalSetMap.get("EXCLUDES_SEQ"));
        }
        result.put("evalGoalList", evaluationRepository.getEvalGoalList(params));

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

    @Override
    public List<Map<String, Object>> getUserList(Map<String, Object> params) {
        return Collections.emptyList();
    }

    @Override
    public void setEvalGoalTemp(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> empEvalGoalTempArr = gson.fromJson((String) params.get("empEvalGoalTempArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        if(empEvalGoalTempArr.size() > 0){
            int evalGoalTempGroup = evaluationRepository.getEvalGoalTempMaxGroup(params);
            params.put("evalGoalTempGroup", evalGoalTempGroup);

            for (Map<String, Object> map : empEvalGoalTempArr){
                map.put("evalGoalTempGroup", evalGoalTempGroup);
                evaluationRepository.setEvalGoalTemp(map);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getEvalGoalTempList(Map<String, Object> params) {
        return evaluationRepository.getEvalGoalTempList(params);
    }

    @Override
    public void updateEvalGoalState(Map<String, Object> bodyMap) {
        String docSts = String.valueOf(bodyMap.get("approveStatCode"));
        String evalGoalTempGroup = String.valueOf(bodyMap.get("approKey"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        evalGoalTempGroup = evalGoalTempGroup.split("_")[1];

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("evalGoalTempGroup", evalGoalTempGroup);
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);
        evaluationRepository.updateEvalGoalState(params);

        if("100".equals(docSts) || "101".equals(docSts)) {
            List<Map<String, Object>> list = evaluationRepository.getEvalGoalTempList(params);
            for (Map<String, Object> map : list){
                map.put("empSeq", map.get("EMP_SEQ"));
                map.put("baseYear", map.get("BASE_YEAR"));

                Map<String, Object> goal = getEvalGoal(map);
                if(goal != null){
                    goal.put("evalGoalSn", goal.get("EVAL_GOAL_SN"));
                    goal.put("orderGoals", map.get("ORDER_GOALS"));
                    goal.put("salesGoals", map.get("SALES_GOALS"));
                    goal.put("revenueGoals", map.get("REVENUE_GOALS"));
                    goal.put("costGoals", map.get("COST_GOALS"));
                    goal.put("commerIndexGoals", map.get("COMMER_INDEX_GOALS"));
                    goal.put("regEmpSeq", empSeq);
                    evaluationRepository.setEvalGoalUpd(goal);
                }else{
                    goal = new HashMap<>();
                    goal.put("empSeq", map.get("EMP_SEQ"));
                    goal.put("teamSeq", map.get("TEAM_SEQ"));
                    goal.put("orderGoals", map.get("ORDER_GOALS"));
                    goal.put("salesGoals", map.get("SALES_GOALS"));
                    goal.put("revenueGoals", map.get("REVENUE_GOALS"));
                    goal.put("costGoals", map.get("COST_GOALS"));
                    goal.put("commerIndexGoals", map.get("COMMER_INDEX_GOALS"));
                    goal.put("regEmpSeq", empSeq);
                    evaluationRepository.setEvalGoal(goal);
                }
            }
        }
    }

    @Override
    public void setEvalAchieveApprove(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> empEvalAchieveArr = gson.fromJson((String) params.get("empEvalAchieveArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        if(empEvalAchieveArr.size() > 0){
            int evalAchieveApproveGroup = evaluationRepository.getEvalAchieveApproveMaxGroup(params);
            params.put("evalAchieveApproveGroup", evalAchieveApproveGroup);

            for (Map<String, Object> map : empEvalAchieveArr){
                map.put("evalAchieveApproveGroup", evalAchieveApproveGroup);
                evaluationRepository.setEvalAchieveApprove(map);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getEvalAchieveApproveList(Map<String, Object> params) {
        return evaluationRepository.getEvalAchieveApproveList(params);
    }

    @Override
    public void updateEvalAchieveState(Map<String, Object> bodyMap) {
        String docSts = String.valueOf(bodyMap.get("approveStatCode"));
        String evalAchieveApproveGroup = String.valueOf(bodyMap.get("approKey"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        String docId = String.valueOf(bodyMap.get("docId"));
        evalAchieveApproveGroup = evalAchieveApproveGroup.split("_")[1];

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("evalAchieveApproveGroup", evalAchieveApproveGroup);
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);
        params.put("docId", docId);
        evaluationRepository.updateEvalAchieveState(params);
    }

    @Override
    public void setEvalAchieveSetting(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("evalAchieveSetSn"))){
            evaluationRepository.setEvalAchieveSet(params);
        }else{
            evaluationRepository.setEvalAchieveSetUpd(params);
        }

        Gson gson = new Gson();
        List<Map<String, Object>> ratingArr = gson.fromJson((String) params.get("ratingArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        evaluationRepository.setEvalAchieveRatingDel(params);
        if(ratingArr.size() > 0){
            for (Map<String, Object> map : ratingArr){
                map.put("evalAchieveSetSn", params.get("evalAchieveSetSn"));
                evaluationRepository.setEvalAchieveRating(map);
            }
        }
    }

    @Override
    public boolean setEvalAchieveSetChk(Map<String, Object> params) {
        return evaluationRepository.setEvalAchieveSetChk(params);
    }

    @Override
    public Map<String, Object> getEvalAchieveSet(Map<String, Object> params) {
        Map<String, Object> result = evaluationRepository.getEvalAchieveSet(params);
        if(StringUtils.isEmpty(params.get("evalAchieveSetSn")) && result != null){
            params.put("evalAchieveSetSn", result.get("EVAL_ACHIEVE_SET_SN"));
            result.put("ratingList", evaluationRepository.getEvalAchieveRatingList(params));
        }

        params.put("objType", "team");
        result.put("teamGoal", achieveRepository.getDeptObjList(params));
        params.put("objType", "oper");
        result.put("teamGoalOper", achieveRepository.getDeptObjList(params));

        return result;
    }

    @Override
    public void setEvalAchieveSetDel(Map<String, Object> params) {
        evaluationRepository.setEvalAchieveSetDel(params);
    }

    @Override
    public List<Map<String, Object>> getEvalAchieveResultList(Map<String, Object> params) {
        return evaluationRepository.getEvalAchieveResultList(params);
    }

    @Override
    public Map<String, Object> getAllEvalApproveList(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        result.put("evaluationYearMax", evaluationRepository.getEvaluationYearMax(params));
        result.put("evalResultEmpList", evaluationRepository.getEvalResultEmpApproveList(params));
        result.put("evalAchieveList", evaluationRepository.getEvalAchieveResultList(params));
        return result;
    }
}
