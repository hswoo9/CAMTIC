package egovframework.com.devjitsu.subHoliday.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SubHolidayRepository extends AbstractDAO  {

    public void setVacUseHist(Map<String, Object> params){ insert("subHoliday.setVacUseHist", params);}

    public void updateVacUseHist(Map<String, Object> params){
        update("subHoliday.updateVacUseHist", params);
    }

    public void updateVacUseHistWork(Map<String, Object> params){
        update("subHoliday.updateVacUseHistWork", params);
    }

    public void setOverWorkVacUse(Map<String, Object> params){
        update("subHoliday.setOverWorkVacUse", params);
    }

    public List<Map<String, Object>> getVacCodeList(Map<String, Object> params) {
        return selectList("subHoliday.getVacCodeList", params);
    }

    public List<Map<String, Object>> getVacUseHistoryList(Map<String, Object> params){ return selectList("subHoliday.getVacUseHistoryList", params);}

    public List<Map<String, Object>> getVacUseHistoryListAdmin(Map<String, Object> params){ return selectList("subHoliday.getVacUseHistoryListAdmin", params);}

    public Map<String, Object> getVacUseHistoryOne(Map<String, Object> params){ return (Map<String, Object>)selectOne("subHoliday.getVacUseHistoryOne", params);}

    public List<Map<String, Object>> getVacUseHistoryWorkList(Map<String, Object> params){ return selectList("subHoliday.getVacUseHistoryWorkList", params);}

    public int getVacUseHistoryListTotal(Map<String, Object> params) {
        return (int) selectOne("subHoliday.getVacUseHistoryListTotal", params);
    }

    public List<Map<String, Object>> getUserVacList(Map<String, Object> params) { return selectList("subHoliday.getUserVacList", params);}

    public List<Map<String, Object>> getUserVacListStat(Map<String, Object> params) { return selectList("subHoliday.getUserVacListStat", params);}


    public void updateApprStat(Map<String, Object> params) {
        update("subHoliday.updateApprStat", params);
    }

    public void updateFinalApprStat(Map<String, Object> params) {
        update("subHoliday.updateFinalApprStat", params);
    }

    public void setUserVacUpdate(Map<String, Object> params){
        update("subHoliday.setUserVacUpdate", params);
    }


}
