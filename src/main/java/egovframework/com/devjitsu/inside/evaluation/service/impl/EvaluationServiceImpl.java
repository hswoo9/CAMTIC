package egovframework.com.devjitsu.inside.evaluation.service.impl;

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
}
