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
    public void setEvalItemMainCopy(Map<String, Object> params) { update("evalManage.setEvalItemMainCopy", params);}
    public void setInEvalItemCopy(Map<String, Object> params) { update("evalManage.setInEvalItemCopy", params);}
    public void setEvalItemActiveUpd(Map<String, Object> params) { update("evalManage.setEvalItemActiveUpd", params);}
    public void setEvalItemMain(Map<String, Object> params) { insert("evalManage.setEvalItemMain", params);}
    public void setEvalItemMainUpd(Map<String, Object> params) { update("evalManage.setEvalItemMainUpd", params);}
    public void setEvalItemDel(Map<String, Object> params) { delete("evalManage.setEvalItemDel", params);}
    public void setEvalItem(Map<String, Object> params) { insert("evalManage.setEvalItem", params);}

    public Map<String, Object> getEvalItemMain(Map<String, Object> params) { return (Map<String, Object>) selectOne("evalManage.getEvalItemMain", params);}
    public List<Map<String, Object>> getEvalItem(Map<String, Object> params) { return selectList("evalManage.getEvalItem", params);}
    public Map<String, Object> getRecruitEvalSelSheet(Map<String, Object> params) { return (Map<String, Object>) selectOne("evalManage.getRecruitEvalSelSheet", params);}
    public Map<String, Object> evalLoginChk(Map<String, Object> params) { return (Map<String, Object>) selectOne("evalManage.evalLoginChk", params);}
    public void setEvalSelection(Map<String, Object> params){ insert("evalManage.setEvalSelection", params);}
    public void setEvalSelectionEmpSeq(Map<String, Object> params){ insert("evalManage.setEvalSelectionEmpSeq", params);}
    public void setRecruitEvalSelSheet(Map<String, Object> params){ insert("evalManage.setRecruitEvalSelSheet", params);}
    public void setRecruitEvalSelSheetUpd(Map<String, Object> params){ update("evalManage.setRecruitEvalSelSheetUpd", params);}
    public List<Map<String, Object>> getApplicationScreenViewList(Map<String, Object> params) { return selectList("evalManage.getApplicationScreenViewList", params);}
    public List<Map<String, Object>> getApplicationInterViewList(Map<String, Object> params) { return selectList("evalManage.getApplicationInterViewList", params);}

    public void delLoginChk(Map<String, Object> map) {
        delete("evalManage.delLoginChk", map);
    }

    public Map<String, Object> getApplicationCountH(Map<String, Object> params) { return (Map<String, Object>) selectOne("evalManage.getApplicationCountH", params);}
}
