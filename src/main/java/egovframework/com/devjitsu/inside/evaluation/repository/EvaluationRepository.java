package egovframework.com.devjitsu.inside.evaluation.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public class EvaluationRepository extends AbstractDAO {
    public List<Map<String, Object>> getRequestEvaluationMemberTot(Map<String, Object> params) {
        return selectList("evaluation.requestEvaluationMemberTot", params);
    }

    public List<Map<String, Object>> getRequestEvaluationUser(Map<String, Object> params) {
        return selectList("evaluation.getRequestEvaluationUser", params);
    }

    public List<Map<String, Object>> getEvaluationList(Map<String, Object> params) {
        return selectList("evaluation.getEvaluationList", params);
    }

    public List<Map<String, Object>> getEvalAchieveSetList(Map<String, Object> params) {
        return selectList("evaluation.getEvalAchieveSetList", params);
    }

    public Map<String, Object> getEvalAchieveSet(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvalAchieveSet", params);
    }

    public List<Map<String, Object>> getEvaluationEmpList(Map<String, Object> params) {
        return selectList("evaluation.getEvaluationEmpList", params);
    }
    public Map<String, Object> getEvaluationEmpCount(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationEmpCount", params);
    }

    public List<Map<String, Object>> getEvalResultEmpList(Map<String, Object> params) {
        return selectList("evaluation.getEvalResultEmpList", params);
    }
    public Map<String, Object> getEvaluationApp(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationApp", params);
    }
    public Map<String, Object> getEvaluationOneList(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationOneList", params);
    }

    public Map<String, Object> getEvaluationSelf(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationSelf", params);
    }

    public Map<String, Object> getEvaluationOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationOne", params);
    }
    public Map<String, Object> getEvaluationPerOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationPerOne", params);
    }
    public Map<String, Object> getEvaluationChk(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationChk", params);
    }

    public Map<String, Object> getEvaluationView(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationView", params);
    }

    public Map<String, Object> getEvalMemDet(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvalMemDet", params);
    }

    public Map<String, Object> getEvaluation(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluation", params);
    }

    public Map<String, Object> getRequestEvaluationUserCnt(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getRequestEvaluationUserCnt", params);
    }

    public Map<String, Object> getUserPersonnelinformOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getUserPersonnelinformOne", params);
    }

    public Map<String, Object> getEvaluationBs(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationBs", params);
    }

    public Map<String, Object> getEvaluationBt(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationBt", params);
    }

    public List<Map<String, Object>> getEvaluationBsList(Map<String, Object> params) {
        return selectList("evaluation.getEvaluationBsList", params);
    }

    public List<Map<String, Object>> getEvaluationBtList(Map<String, Object> params) {
        return selectList("evaluation.getEvaluationBtList", params);
    }

    public List<Map<String, Object>> getEvaluationScList(Map<String, Object> params) {
        return selectList("evaluation.getEvaluationScList", params);
    }

    public List<Map<String, Object>> getEvaluationMngList(Map<String, Object> params) {
        return selectList("evaluation.getEvaluationMngList", params);
    }

    public List<Map<String, Object>> getEvaluationScoreList(Map<String, Object> params) {
        return selectList("evaluation.getEvaluationScoreList", params);
    }
    public void insEvaluation(Map<String, Object> params) {
        insert("evaluation.insEvaluation", params);
    }

    public void insEvaluationAppBt(Map<String, Object> params) {
        insert("evaluation.insEvaluationAppBt", params);
    }

    public void insEvaluationAppBs(Map<String, Object> params) {
        insert("evaluation.insEvaluationAppBs", params);
    }

    public void updEvaluation(Map<String, Object> params) {insert("evaluation.updEvaluation", params);}
    public void updReqEvaluation(Map<String, Object> params) {insert("evaluation.updReqEvaluation", params);}
    public void insReqEvaluation(Map<String, Object> params) {insert("evaluation.insReqEvaluation", params);}
    public void updComEvaluation(Map<String, Object> params) {insert("evaluation.updComEvaluation", params);}
    public void delEvaluation(Map<String, Object> params) {insert("evaluation.delEvaluation", params);}

    public void updEvaluationAppBt(Map<String, Object> params) {
        insert("evaluation.updEvaluationAppBt", params);
    }

    public void updEvaluationAppBs(Map<String, Object> params) {
        insert("evaluation.updEvaluationAppBs", params);
    }

    public void insEvaluationEmp(Map<String, Object> params) {
        insert("evaluation.insEvaluationEmp", params);
    }

    public void delEvaluationEmp(Map<String, Object> params) {
        insert("evaluation.delEvaluationEmp", params);
    }

    public void delEvaluationCap(Map<String, Object> params) {
        delete("evaluation.delEvaluationCap", params);
    }
    public void insEvaluationCap(Map<String, Object> capBody) {
        insert("evaluation.insEvaluationCap", capBody);
    }

    public void delEvaluationBt(Map<String, Object> params) {
        delete("evaluation.delEvaluationBt", params);
    }
    public void insEvaluationBt(Map<String, Object> btBody) {
        insert("evaluation.insEvaluationBt", btBody);
    }

    public void delEvaluationBs(Map<String, Object> params) {
        delete("evaluation.delEvaluationBs", params);
    }
    public void insEvaluationBs(Map<String, Object> bsBody) {
        insert("evaluation.insEvaluationBs", bsBody);
    }

    public void delEvaluationScore(Map<String, Object> params) {
        delete("evaluation.delEvaluationScore", params);
    }
    public void insEvaluationScore(Map<String, Object> scoreBody) {
        insert("evaluation.insEvaluationScore", scoreBody);
    }

    public void delEvaluationMngList(Map<String, Object> params) {
        delete("evaluation.delEvaluationMngList", params);
    }

    public void setEvaluationMngList(Map<String, Object> scoreBody) {
        insert("evaluation.setEvaluationMngList", scoreBody);
    }

    public void delEvalScoreTemSave(Map<String, Object> params) {
        delete("evaluation.delEvalScoreTemSave", params);
    }

    public void setEvalScoreTemSave(Map<String, Object> evalBody) {
        insert("evaluation.setEvalScoreTemSave", evalBody);
    }

    public void updEvalView(Map<String, Object> evalBody) {
        insert("evaluation.updEvalView", evalBody);
    }
    public void setSaveMngScore(Map<String, Object> scoreBody) {
        update("evaluation.setSaveMngScore", scoreBody);
    }

    public void updEvalScoreTemSave(Map<String, Object> scoreBody) {
        insert("evaluation.updEvalScoreTemSave", scoreBody);
    }

    public void updEvaluationMem(Map<String, Object> params) {
        insert("evaluation.updEvaluationMem", params);
    }

    public void updEvaluationMemAll(Map<String, Object> params) {
        insert("evaluation.updEvaluationMemAll", params);
    }

    public void delEvaluationItemCopy(Map<String, Object> params) {
        delete("evaluation.delEvaluationItemCopy", params);
    }
    public void setEvaluationItemCopy(Map<String, Object> scoreBody) {
        insert("evaluation.setEvaluationItemCopy", scoreBody);
    }

    public List<Map<String, Object>> getEvalResultList(Map<String, Object> params) {
        return selectList("evaluation.getEvalResultList", params);
    }

    public List<Map<String, Object>> getNowEvalCount(Map<String, Object> params) {
        return selectList("evaluation.getNowEvalCount", params);
    }

    public List<Map<String, Object>> getExcelDownloadData(Map<String, Object> params) {
        return selectList("evaluation.getExcelDownloadData", params);
    }

    public List<Map<String, Object>> getEvalEmpList(Map<String, Object> params) {
        return selectList("evaluation.getEvalEmpList", params);
    }

    public Map<String, Object> getEvalGoal(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvalGoal", params);
    }

    public Map<String, Object> getTeamGoalApprove(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getTeamGoalApprove", params);
    }

    public Map<String, Object> getTeamAchieveApprove(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getTeamAchieveApprove", params);
    }

    public List<Map<String, Object>> getEvalAchieveList(Map<String, Object> params) {
        return selectList("evaluation.getEvalAchieveList", params);
    }

    public List<Map<String, Object>> getEvalGoalList(Map<String, Object> params) {
        return selectList("evaluation.getEvalGoalList", params);
    }

    public void setEvalGoal(Map<String, Object> params) {
        insert("evaluation.setEvalGoal", params);
    }

    public void setEvalGoalUpd(Map<String, Object> params) {
        update("evaluation.setEvalGoalUpd", params);
    }

    public String getEvalAchieveChk(Map<String, Object> params){
        return (String) selectOne("evaluation.getEvalAchieveChk", params);
    }

    public void setEvalAchieve(Map<String, Object> params){
        insert("evaluation.setEvalAchieve", params);
    }

    public void setEvalAchieveUpd(Map<String, Object> params){
        update("evaluation.setEvalAchieveUpd", params);
    }
    public List<Map<String, Object>> getEvalAchieveList2(Map<String, Object> params){
        return selectList("evaluation.getEvalAchieveList2", params);
    }

    public int getEvalGoalTempMaxGroup(Map<String, Object> params){
        return (int)selectOne("evaluation.getEvalGoalTempMaxGroup", params);
    }

    public void setEvalGoalTemp(Map<String, Object> params) {
        insert("evaluation.setEvalGoalTemp", params);
    }

    public List<Map<String, Object>> getEvalGoalTempList(Map<String, Object> params) {
        return selectList("evaluation.getEvalGoalTempList", params);
    }

    public void updateEvalGoalState(Map<String, Object> params) {
        update("evaluation.updateEvalGoalState", params);
    }

    public int getEvalAchieveApproveMaxGroup(Map<String, Object> params){
        return (int)selectOne("evaluation.getEvalAchieveApproveMaxGroup", params);
    }

    public void setEvalAchieveApprove(Map<String, Object> map) {
        insert("evaluation.setEvalAchieveApprove", map);
    }

    public List<Map<String, Object>> getEvalAchieveApproveList(Map<String, Object> params) {
        return selectList("evaluation.getEvalAchieveApproveList", params);
    }

    public void updateEvalAchieveState(Map<String, Object> params) {
        update("evaluation.updateEvalAchieveState", params);
    }





    public void setEvalAchieveSet(Map<String, Object> params) {
        insert("evaluation.setEvalAchieveSet", params);
    }

    public void setEvalAchieveSetUpd(Map<String, Object> params) {
        update("evaluation.setEvalAchieveSetUpd", params);
    }

    public void setEvalAchieveRatingDel(Map<String, Object> params) {
        delete("evaluation.setEvalAchieveRatingDel", params);
    }

    public void setEvalAchieveRating(Map<String, Object> map) {
        insert("evaluation.setEvalAchieveRating", map);
    }

    public boolean setEvalAchieveSetChk(Map<String, Object> params) {
        return (Boolean) selectOne("evaluation.setEvalAchieveSetChk", params);
    }

    public List<Map<String, Object>> getEvalAchieveRatingList(Map<String, Object> params) {
        return selectList("evaluation.getEvalAchieveRatingList", params);
    }

    public void setEvalAchieveSetDel(Map<String, Object> params) {
        delete("evaluation.setEvalAchieveSetDel", params);
    }

    public Map<String, Object> getAllEvalApproveYearGroup(Map<String, Object> params){
        return (Map<String, Object>) selectOne("evaluation.getAllEvalApproveYearGroup", params);
    }

    public List<Map<String, Object>> getEvalAchieveResultList(Map<String, Object> params) {
        return selectList("evaluation.getEvalAchieveResultList", params);
    }

    public Object getEvalResultEmpApproveList(Map<String, Object> params) {
        return selectList("evaluation.getEvalResultEmpApproveList", params);
    }

    public Map<String, Object> getEvaluationYearMax(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationYearMax", params);
    }

    public int getAllEvalApproveMaxGroup(Map<String, Object> params) {
        return (int)selectOne("evaluation.getAllEvalApproveMaxGroup", params);
    }

    public void setAllEvalApproveGroupDel(Map<String, Object> params){
        delete("evaluation.setAllEvalApproveGroupDel", params);
    }
    public void setAllEvalApprove(Map<String, Object> map) {
        insert("evaluation.setAllEvalApprove", map);
    }

    public List<Map<String, Object>> getAllEvalApproveList(Map<String, Object> params) {
        return selectList("evaluation.getAllEvalApproveList", params);
    }

    public void updateAllEvalApproveState(Map<String, Object> params) {
        update("evaluation.updateAllEvalApproveState", params);
    }

    public Map<String, Object> getAllEvalApprove(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getAllEvalApprove", params);
    }

    public void updEvalAchieveApproveActive(Map<String, Object> params) {
        update("evaluation.updEvalAchieveApproveActive", params);
    }
}
