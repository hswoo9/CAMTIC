package egovframework.com.devjitsu.inside.subHoliday.repository;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SubHolidayRepository extends AbstractDAO  {

    public List<Map<String, Object>> getVacCodeList(Map<String, Object> params) { return selectList("subHoliday.getVacCodeList", params); }
    public void setVacUseHist(Map<String, Object> params){ insert("subHoliday.setVacUseHist", params);}
    public void updateVacUseHist(Map<String, Object> params){
        update("subHoliday.updateVacUseHist", params);
    }
    public void updateVacUseHistWork(Map<String, Object> params){
        update("subHoliday.updateVacUseHistWork", params);
    }
    public void setVacUseHistDel(Map<String, Object> params){update("subHoliday.setVacUseHistDel", params);}
    public void setOverWorkVacUse(Map<String, Object> params){
        update("subHoliday.setOverWorkVacUse", params);
    }
    public List<Map<String, Object>> getVacUseHistoryList(Map<String, Object> params){ return selectList("subHoliday.getVacUseHistoryList", params);}
    public List<Map<String, Object>> getVacUseHistoryListAdmin(Map<String, Object> params){ return selectList("subHoliday.getVacUseHistoryListAdmin", params);}
    public Map<String, Object> getVacUseHistoryOne(Map<String, Object> params){ return (Map<String, Object>)selectOne("subHoliday.getVacUseHistoryOne", params);}
    public List<Map<String, Object>> getVacUseHistoryWorkList(Map<String, Object> params){ return selectList("subHoliday.getVacUseHistoryWorkList", params);}
    public int getVacUseHistoryListTotal(Map<String, Object> params) {return (int) selectOne("subHoliday.getVacUseHistoryListTotal", params);}
    public List<Map<String, Object>> getUserVacList(Map<String, Object> params) { return selectList("subHoliday.getUserVacList", params);}
    public List<Map<String, Object>> getUserVacListStat(Map<String, Object> map) { return selectList("subHoliday.getUserVacListStat", map);}
    public void updateApprStat(Map<String, Object> params) {
        update("subHoliday.updateApprStat", params);
    }
    public void updateFinalApprStat(Map<String, Object> params) {
        update("subHoliday.updateFinalApprStat", params);
    }
    public void setUserVacUpdate(Map<String, Object> params){
        update("subHoliday.setUserVacUpdate", params);
    }
    public Map<String, Object> getUserHolyData(Map<String, Object> params) {return (Map<String, Object>) selectOne("subHoliday.getUserHolyData", params);}
    public Map<String, Object> getUserBefHolyData(Map<String, Object> params) {return (Map<String, Object>) selectOne("subHoliday.getUserBefHolyData", params);}
    public void setUserVacList(List<Map<String, Object>> list) {update("subHoliday.setUserVacList", list);}

    //공휴일 데이터 조회
    public List<Map<String, Object>> getHolidayList(Map<String, Object> parmas){return selectList("subHoliday.getHolidayList", parmas); }

    //공휴일 데이터 갯수 조회
    public int getHoliday(Map<String, Object> params){return (int) selectOne ("subHoliday.getHoliday", params);}

    //공휴일 수정
    public void updateHoliday(Map<String, Object> params) {
        update("subHoliday.updateHoliday", params);
    }

    //공휴일 삽입
    public void insertHoliday(Map<String, Object> params) {
        insert("subHoliday.insertHoliday", params);
    }

    //공휴일 삭제
    public void deleteHoliday(Map<String, Object> params) {
        delete("subHoliday.deleteHoliday", params);
    }

    // 연가 일괄 등록
    public List<Map<String,Object>> getUserInfoList (Map<String,Object> map) {
        return selectList("subHoliday.getUserInfoList", map);
    }


    public int getCountForDsA2() {return (Integer) selectOne("subHoliday.getCountForDsA2");}
    public int getCountForDsB2() {return (Integer) selectOne("subHoliday.getCountForDsB2");}
    public int getCountForDsC2() {return (Integer) selectOne("subHoliday.getCountForDsC2");}
    public int getCountForDsD2() {return (Integer) selectOne("subHoliday.getCountForDsD2");}
    public int getCountForDsE2() {return (Integer) selectOne("subHoliday.getCountForDsE2");}
    public int getCountForDsF2() {return (Integer) selectOne("subHoliday.getCountForDsF2");}
    public int getCountForDsG2() {return (Integer) selectOne("subHoliday.getCountForDsG2");}
    public int getCountForDsH2() {return (Integer) selectOne("subHoliday.getCountForDsH2");}
    public int getCountForDsI2() {return (Integer) selectOne("subHoliday.getCountForDsI2");}
    public int getCountForDsJ2() {return (Integer) selectOne("subHoliday.getCountForDsJ2");}

}

