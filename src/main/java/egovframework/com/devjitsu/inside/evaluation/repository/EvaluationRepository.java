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

    public List<Map<String, Object>> getEvaluationEmpList(Map<String, Object> params) {
        return selectList("evaluation.getEvaluationEmpList", params);
    }


    public List<Map<String, Object>> getEvalResultEmpList(Map<String, Object> params) {
        return selectList("evaluation.getEvalResultEmpList", params);
    }

    public Map<String, Object> getEvaluationOneList(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationOneList", params);
    }

    public Map<String, Object> getEvaluationOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("evaluation.getEvaluationOne", params);
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

    public void updEvaluation(Map<String, Object> params) {
        insert("evaluation.updEvaluation", params);
    }

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

    public void setEvalScoreTemSave(Map<String, Object> scoreBody) {
        insert("evaluation.setEvalScoreTemSave", scoreBody);
    }

    public void updEvalScoreTemSave(Map<String, Object> scoreBody) {
        insert("evaluation.updEvalScoreTemSave", scoreBody);
    }

    public void updEvaluationMem(Map<String, Object> params) {
        insert("evaluation.updEvaluationMem", params);
    }
}
