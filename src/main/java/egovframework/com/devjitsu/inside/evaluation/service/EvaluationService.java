package egovframework.com.devjitsu.inside.evaluation.service;

import java.util.List;
import java.util.Map;

public interface EvaluationService {
    List<Map<String, Object>> getRequestEvaluationMemberTot(Map<String, Object> params);
    List<Map<String, Object>> getRequestEvaluationUser(Map<String, Object> params);
    Map<String, Object> getEvaluationOneList(Map<String, Object> params);
    Map<String, Object> getEvaluationSelf(Map<String, Object> params);
    Map<String, Object> getEvaluationList(Map<String, Object> params);
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
    List<Map<String, Object>> getEvalResultList(Map<String, Object> params);
    List<Map<String, Object>> getNowEvalCount(Map<String, Object> params);
    List<Map<String, Object>> getExcelDownloadData(Map<String, Object> params);

    List<Map<String, Object>> getEvalEmpList(Map<String, Object> params);

    Map<String, Object> getEvalGoal(Map<String, Object> map);
    Map<String, Object> getTeamAchieveApprove(Map<String, Object> params);
    Map<String, Object> getEvalGoalList(Map<String, Object> params);
    void setEvalGoal(Map<String, Object> params);

    Map<String, Object> getEvalAchieveScoreList(Map<String, Object> params);
    void setEvalAchieve(Map<String, Object> params);

    List<Map<String, Object>> getUserList(Map<String, Object> params);

    void setEvalGoalTemp(Map<String, Object> params);

    List<Map<String, Object>> getEvalGoalTempList(Map<String, Object> params);

    void updateEvalGoalState(Map<String, Object> bodyMap);

    void setEvalAchieveApprove(Map<String, Object> params);

    List<Map<String, Object>> getEvalAchieveApproveList(Map<String, Object> params);

    void updateEvalAchieveState(Map<String, Object> bodyMap);

    void setEvalAchieveSetting(Map<String, Object> params);

    boolean setEvalAchieveSetChk(Map<String, Object> params);

    Map<String, Object> getEvalAchieveSet(Map<String, Object> params);

    void setEvalAchieveSetDel(Map<String, Object> params);

    Map<String, Object> getAllEvalApproveYearGroup(Map<String, Object> params);

    List<Map<String, Object>> getEvalAchieveResultList(Map<String, Object> params);

    Map<String, Object> getAllEvalList(Map<String, Object> params);

    void setAllEvalApprove(Map<String, Object> params);

    List<Map<String, Object>> getAllEvalApproveList(Map<String, Object> params);

    void updateAllEvalState(Map<String, Object> bodyMap);

    Map<String, Object> getAllEvalApprove(Map<String, Object> params);
}
