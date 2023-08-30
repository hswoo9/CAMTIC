package egovframework.com.devjitsu.inside.history.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class HistoryRepository extends AbstractDAO {

    public List<Map<String, Object>> getHistoryList(Map<String, Object> params) {
        return selectList("history.getHistoryList", params);
    }

    public List<Map<String, Object>> getUpdHistoryList(Map<String, Object> params) {
        return selectList("history.getUpdHistoryList", params);
    }

    public Map<String, Object> getHistoryOne(Map<String, Object> params) {
        return (Map<String,Object>)selectOne("history.getHistoryOne", params);
    }

    public List<Map<String, Object>> getRewardList(Map<String, Object> params) {
        return selectList("history.getRewardList", params);
    }

    public void setHistoryInsert(Map<String, Object> params) {
        insert("history.setHistoryInsert", params);
    }

    public void setHistoryInsertTest(Map<String, Object> params) {
        insert("history.setHistoryInsertTest", params);
    }

    public void setHistoryUpdate(Map<String, Object> params) {
        update("history.setHistoryUpdate", params);
    }

    public void setRewardInsert(Map<String, Object> params) {
        insert("history.setRewardInsert", params);
    }
}
