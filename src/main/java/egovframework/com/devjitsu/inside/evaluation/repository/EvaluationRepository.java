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

    public void insEvaluation(Map<String, Object> params) {
        insert("evaluation.insEvaluation", params);
    }

    public void insEvaluationEmp(Map<String, Object> params) {
        insert("evaluation.insEvaluationEmp", params);
    }

    public void delEvaluationCap(Map<String, Object> params) {
        delete("evaluation.delEvaluationCap", params);
    }

    public void insEvaluationCap(Map<String, Object> capBody) {
        insert("evaluation.insEvaluationCap", capBody);
    }
}
