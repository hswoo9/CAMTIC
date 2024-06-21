package egovframework.com.devjitsu.inside.evaluation.service;

import java.util.List;
import java.util.Map;

public interface EvaluationService {
    List<Map<String, Object>> getRequestEvaluationMemberTot(Map<String, Object> params);
    List<Map<String, Object>> getRequestEvaluationUser(Map<String, Object> params);
    Map<String, Object> getEvaluationOneList(Map<String, Object> params);
    Map<String, Object> getEvaluationSelf(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationList(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationEmpList(Map<String, Object> params);
    Map<String, Object> getEvaluationEmpCountFirst(Map<String, Object> params);
    Map<String, Object> getEvaluationEmpCount(Map<String, Object> params);
    List<Map<String, Object>> getEvalResultEmpList(Map<String, Object> params);
    Map<String, Object> getEvaluationApp(Map<String, Object> params);
    Map<String, Object> getRequestEvaluationUserCnt(Map<String, Object> params);
    Map<String, Object> getUserPersonnelinformOne(Map<String, Object> params);
    void setEvaluation(Map<String, Object> params);
    void setUpdReqEvaluation(Map<String, Object> params);
    void setUpdComEvaluation(Map<String, Object> params);
    void delEvaluation(Map<String, Object> params);
    void setEvaluationItemCopy(Map<String, Object> params);
    void setEvalScoreTemSave(Map<String, Object> params);
    void setEvalScoreTemSaveAll(Map<String, Object> params);
    void setSaveMngScore(Map<String, Object> params);
    void setEvaluationMngList(Map<String, Object> params);
    Map<String, Object> getEvaluation(Map<String, Object> params);
    Map<String, Object> getEvaluationBs(Map<String, Object> params);
    Map<String, Object> getEvaluationBt(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationBsList(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationBtList(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationScList(Map<String, Object> params);
    Map<String, Object> getEvaluationOne(Map<String, Object> params);
    Map<String, Object> getEvaluationPerOne(Map<String, Object> params);
    Map<String, Object> getEvaluationChk(Map<String, Object> params);

    List<Map<String, Object>> getEvaluationMngList(Map<String, Object> params);
    List<Map<String, Object>> getEvaluationScoreList(Map<String, Object> params);
    Map<String, Object> getEvaluationView(Map<String, Object> params);

    Map<String, Object> getEvalMemDet(Map<String, Object> params);
}
