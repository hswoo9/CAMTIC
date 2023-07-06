package egovframework.com.devjitsu.inside.history.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class HistoryRepository extends AbstractDAO {

    public void setHistoryInsert(Map<String, Object> params) {
        insert("history.setHistoryInsert", params);
    }
}
