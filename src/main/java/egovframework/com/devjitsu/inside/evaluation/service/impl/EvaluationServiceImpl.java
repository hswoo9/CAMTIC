package egovframework.com.devjitsu.inside.evaluation.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.evaluation.repository.EvaluationRepository;
import egovframework.com.devjitsu.inside.evaluation.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

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
    }    @Override
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

        if(params.get("save").equals("10")){
            evaluationRepository.updEvaluationMem(params);
        }

    }

    @Override
    public void setSaveMngScore(Map<String, Object> params) {

        Gson gson = new Gson();
        List<Map<String, Object>> evalScoreMngArr = gson.fromJson((String) params.get("evalScoreMngArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(Map<String, Object> evalScoreMng : evalScoreMngArr){
            evaluationRepository.setSaveMngScore(evalScoreMng);
        }


    }
}
