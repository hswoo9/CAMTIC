package egovframework.com.devjitsu.inside.recruit.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EvalManageRepository extends AbstractDAO {
    public List<Map<String, Object>> getEvalItemMainList(Map<String, Object> params) { return selectList("evalManage.getEvalItemMainList", params);}
    public void setEvalItemActiveUpd(Map<String, Object> params) { update("evalManage.setEvalItemActiveUpd", params);}
    public void setEvalItemMain(Map<String, Object> params) { insert("evalManage.setEvalItemMain", params);}
    public void setEvalItemMainUpd(Map<String, Object> params) { update("evalManage.setEvalItemMainUpd", params);}
    public void setEvalItemDel(Map<String, Object> params) { delete("evalManage.setEvalItemDel", params);}
    public void setEvalItem(Map<String, Object> params) { insert("evalManage.setEvalItem", params);}

    public Map<String, Object> getEvalItemMain(Map<String, Object> params) { return (Map<String, Object>) selectOne("evalManage.getEvalItemMain", params);}
    public List<Map<String, Object>> getEvalItem(Map<String, Object> params) { return selectList("evalManage.getEvalItem", params);}
    public Map<String, Object> getRecruitEvalSelSheet(Map<String, Object> params) { return (Map<String, Object>) selectOne("evalManage.getRecruitEvalSelSheet", params);}
    public void setRecruitEvalSelSheet(Map<String, Object> params){ insert("evalManage.setRecruitEvalSelSheet", params);}
    public void setRecruitEvalSelSheetUpd(Map<String, Object> params){ update("evalManage.setRecruitEvalSelSheetUpd", params);}
}
