package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class KukgohRepository extends AbstractDAO {


    public List<Map<String, Object>> getCmmnCodeList(Map<String, Object> params) {

        return selectList("kukgoh.getCmmnCodeList", params);
    }

    public List<Map<String, Object>> getCmmnCodeDetailList(Map<String, Object> params) {

        return selectList("kukgoh.getCmmnCodeDetailList", params);
    }

    public void delCommCodeObject(Map<String, Object> params) {

        delete("kukgoh.delCommCodeObject", params);
    }

    public void insCommCodeObject(Map<String, Object> params) {

        insert("kukgoh.insCommCodeObject", params);
    }

    public List<Map<String, Object>> getPayAppList(Map<String, Object> params) {

        return selectList("kukgoh.getPayAppList", params);
    }

    public List<Map<String, Object>> getEnaraBudgetCdList(Map<String, Object> params) {

        return selectList("kukgoh.getEnaraBudgetCdList", params);
    }

    public void delEnaraBudgetCode(Map<String, Object> params) {

        delete("kukgoh.delEnaraBudgetCode", params);
    }

    public void insEnaraBudgetCode(Map<String, Object> params) {
        insert("kukgoh.insEnaraBudgetCode", params);
    }

    public Map<String, Object> getEnaraBudgetCdData(Map<String, Object> item) {

        return (Map<String, Object>) selectOne("kukgoh.getEnaraBudgetCdData", item);
    }

    public void delBudgetCodeMatch(Map<String, Object> params) {

        delete("kukgoh.delBudgetCodeMatch", params);
    }
}
