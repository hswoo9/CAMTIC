package egovframework.com.devjitsu.subHoliday.repository;

import egovframework.com.devjitsu.main.dto.LoginVO;
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

    public void setOverWorkVacUse(Map<String, Object> params){
        update("subHoliday.setOverWorkVacUse", params);
    }

    public List<Map<String, Object>> getVacCodeList(Map<String, Object> params) {
        return selectList("subHoliday.getVacCodeList", params);
    }

    public List<Map<String, Object>> getVacUseHistoryList(Map<String, Object> params){ return selectList("subHoliday.getVacUseHistoryList", params);}

    public int getVacUseHistoryListTotal(Map<String, Object> params) {
        return (int) selectOne("subHoliday.getVacUseHistoryListTotal", params);
    }

}
