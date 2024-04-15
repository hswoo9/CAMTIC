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
    public List<Map<String, Object>> getEvalResultEmpList(Map<String, Object> params) {
        return evaluationRepository.getEvalResultEmpList(params);
    }
    @Override
    public Map<String, Object> getEvaluationOneList(Map<String, Object> params) {
        return evaluationRepository.getEvaluationOneList(params);
    }

    @Override
    public Map<String, Object> getEvaluationOne(Map<String, Object> params) {
        return evaluationRepository.getEvaluationOne(params);
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
            params.put("empSeqArr", params.get("empSeqArr").toString().split(","));
            evaluationRepository.delEvaluationEmp(params);
            evaluationRepository.insEvaluationEmp(params);
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
}
