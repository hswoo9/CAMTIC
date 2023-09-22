package egovframework.com.devjitsu.camtic.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EvalRepository extends AbstractDAO {

    public Map<String, Object> getEvalLogin(Map<String, Object> params) { return (Map<String, Object>)selectOne("eval.getEvalLogin", params);}
    public List<Map<String, Object>> getApplicationScoreBoard(Map<String, Object> params) { return selectList("eval.getApplicationScoreBoard", params);}
    public List<Map<String, Object>> getApplicationScoreBoardEvalCnt(Map<String, Object> params) { return selectList("eval.getApplicationScoreBoardEvalCnt", params);}
    public Map<String, Object> getInEvalItemMain(Map<String, Object> params) { return (Map<String, Object>) selectOne("eval.getInEvalItemMain", params);}
    public List<Map<String, Object>> getInEvalItem(Map<String, Object> params) { return selectList("eval.getInEvalItem", params);}
    public void setApplicationEvalScreenDel(Map<String, Object> params) { delete("eval.setApplicationEvalScreenDel", params);}
    public void setApplicationEvalScreen(Map<String, Object> params) { insert("eval.setApplicationEvalScreen", params);}
    public boolean setEvalEndChk(Map<String, Object> params) { return (boolean) selectOne("eval.setEvalEndChk", params);}
    public void setEvalEndUpd(Map<String, Object> params) { update("eval.setEvalEndUpd", params);}
}
