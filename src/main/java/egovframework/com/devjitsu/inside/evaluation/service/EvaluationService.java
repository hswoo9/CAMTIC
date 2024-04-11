package egovframework.com.devjitsu.inside.evaluation.service;

import java.util.List;
import java.util.Map;

public interface EvaluationService {
    List<Map<String, Object>> getRequestEvaluationMemberTot(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationList(Map<String, Object> params);
    void setEvaluation(Map<String, Object> params);
    Map<String, Object> getEvaluationOne(Map<String, Object> params);
}
