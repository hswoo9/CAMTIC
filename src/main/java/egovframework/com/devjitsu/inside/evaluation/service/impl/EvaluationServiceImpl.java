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
    public void setEvaluation(Map<String, Object> params) {
//        evaluationRepository.insEvaluation(params);

        if(params.containsKey("empSeqArr")){
            params.put("empSeqArr", params.get("empSeqArr").toString().split(","));
//            evaluationRepository.insEvaluationEmp(params);
        }


        // 역량평가 데이터 insert / update
        Gson gson = new Gson();
        List<Map<String, Object>> capBodyArr = gson.fromJson((String) params.get("capBodyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

//        evaluationRepository.delEvaluationCap(params);

        for(Map<String, Object> capBody : capBodyArr){
            capBody.put("evalSn", params.get("evalSn"));
//            evaluationRepository.insEvaluationCap(capBody);
        }
    }
}
