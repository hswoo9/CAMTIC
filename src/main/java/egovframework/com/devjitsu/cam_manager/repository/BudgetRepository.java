package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BudgetRepository extends AbstractDAO {


    public List<Map<String, Object>> getBudgetList(Map<String, Object> params) {

        return selectList("budget.getBudgetList", params);
    }

    public void insBudgetAData(Map<String, Object> params) {

        insert("budget.insBudgetAData", params);
    }

    public void insBudgetBData(Map<String, Object> params) {

        insert("budget.insBudgetBData", params);
    }

    public int getBudgetACdCheck(Map<String, Object> params) {

        return (int) selectOne("budget.getBudgetACdCheck", params);
    }

    public int getBudgetBCdCheck(Map<String, Object> params) {

        return (int) selectOne("budget.getBudgetBCdCheck", params);
    }

    public List<Map<String, Object>> getBudgetAList(Map<String, Object> params) {

        return selectList("budget.getBudgetAList", params);
    }

    public List<Map<String, Object>> getBudgetBList(Map<String, Object> params) {

        return selectList("budget.getBudgetBList", params);
    }

    public Map<String, Object> getBudgetAData(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("budget.getBudgetAData", params);
    }

    public Map<String, Object> getBudgetBData(Map<String, Object> params) {

        return (Map<String, Object>) selectOne("budget.getBudgetBData", params);
    }

    public void updBudgetAData(Map<String, Object> params) {

        update("budget.updBudgetAData", params);
    }

    public void updBudgetBData(Map<String, Object> params) {

        update("budget.updBudgetBData", params);
    }

    public void insBudgetAHist(Map<String, Object> params) {

        insert("budget.insBudgetAHist", params);
    }

    public void insBudgetBHist(Map<String, Object> params) {

        insert("budget.insBudgetBHist", params);
    }

    public List<Map<String, Object>> getPreConditionA(Map<String, Object> params) {

        return selectList("budget.getPreConditionA", params);
    }

    public List<Map<String, Object>> getPreConditionB(Map<String, Object> params) {

        return selectList("budget.getPreConditionB", params);
    }

    public void delPjtBudgetA(Map<String, Object> params) {

        delete("budget.delPjtBudgetA", params);
    }

    public void delPjtBudgetB(Map<String, Object> params) {

        delete("budget.delPjtBudgetB", params);
    }

    public void regCloseBudgetA(Map<String, Object> params) {

        update("budget.regCloseBudgetA", params);
    }

    public void regCloseBudgetB(Map<String, Object> params) {

        update("budget.regCloseBudgetB", params);
    }

    public List<Map<String, Object>> getBudgetDetR(Map<String, Object> params) {

        return selectList("budget.getBudgetDetR", params);
    }

    public List<Map<String, Object>> getBudgetDetM(Map<String, Object> params) {

        return selectList("budget.getBudgetDetM", params);
    }

    public List<Map<String, Object>> getBudgetDetS(Map<String, Object> params) {

        return selectList("budget.getBudgetDetS", params);
    }

    public List<Map<String, Object>> getBudgetDetD(Map<String, Object> params) {

        return selectList("budget.getBudgetDetD", params);
    }

    public List<Map<String, Object>> getBudgetDetV(Map<String, Object> params) {

        return selectList("budget.getBudgetDetV", params);
    }



    public List<Map<String, Object>> getPjtBudgetAHistList(Map<String, Object> params) {

        return selectList("budget.getPjtBudgetAHistList", params);
    }

    public List<Map<String, Object>> getPjtBudgetBHistList(Map<String, Object> params) {

        return selectList("budget.getPjtBudgetBHistList", params);
    }


}
