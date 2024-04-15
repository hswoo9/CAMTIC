package egovframework.com.devjitsu.inside.evaluation.service;

import java.util.List;
import java.util.Map;

public interface EvaluationService {
    List<Map<String, Object>> getRequestEvaluationMemberTot(Map<String, Object> params);
    List<Map<String, Object>> getRequestEvaluationUser(Map<String, Object> params);
    Map<String, Object> getEvaluationOneList(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationList(Map<String, Object> params);
    List<Map<String, Object>> getEvalResultEmpList(Map<String, Object> params);
    Map<String, Object> getRequestEvaluationUserCnt(Map<String, Object> params);
    void setEvaluation(Map<String, Object> params);
    void setEvaluationMngList(Map<String, Object> params);
    Map<String, Object> getEvaluation(Map<String, Object> params);
    Map<String, Object> getEvaluationBs(Map<String, Object> params);
    Map<String, Object> getEvaluationBt(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationBsList(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationBtList(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationScList(Map<String, Object> params);
    Map<String, Object> getEvaluationOne(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationMngList(Map<String, Object> params);
}
