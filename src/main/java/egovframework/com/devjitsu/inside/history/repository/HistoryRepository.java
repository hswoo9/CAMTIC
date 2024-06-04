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

    public List<Map<String, Object>> getHistoryListAdmin(Map<String, Object> params) {
        return selectList("history.getHistoryListAdmin", params);
    }

    public List<Map<String, Object>> getUpdHistoryList(Map<String, Object> params) {
        return selectList("history.getUpdHistoryList", params);
    }

    public List<Map<String, Object>> getUpdRewardList(Map<String, Object> params) {
        return selectList("history.getUpdRewardList", params);
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

    public void setHistoryDelete(Map<String, Object> params) {
        delete("history.setHistoryDelete", params);
    }

    public void setTmpActiveUpdate(Map<String,Object> params) {update("history.setTmpActiveUpdate", params);}

    public void setRewardInsert(Map<String, Object> params) {
        insert("history.setRewardInsert", params);
    }
    public void setRewardUpdate(Map<String, Object> params) {
        insert("history.setRewardUpdate", params);
    }

    public void setRewardDelete(Map<String, Object> params) {
        update("history.setRewardDelete", params);
    }

    public void modAf(Map<String, Object> params) {
        update("history.modAf", params);
    }

    //포상관리 첨부파일
    public void setInRewardAddFileNoUpdNoTmp(Map<String, Object> params) { insert("history.setInRewardAddFileNoUpdNoTmp", params);}
    public List<Map<String, Object>> appointmentNowList(Map<String, Object> params) { return selectList("history.appointmentNowList", params);}
    public void appointmentEmpInfoUpd(Map<String, Object> params) { update("history.appointmentEmpInfoUpd", params);}
    public void appointmentComplete(Map<String, Object> params) { update("history.appointmentComplete", params);}
}
