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

    public void setHistoryInsert(Map<String, Object> params) {
        insert("history.setHistoryInsert", params);
    }
}
