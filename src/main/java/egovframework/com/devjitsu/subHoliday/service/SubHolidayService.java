package egovframework.com.devjitsu.subHoliday.service;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import egovframework.com.devjitsu.main.dto.LoginVO;
import java.util.List;
import java.util.Map;

public interface SubHolidayService {

    /**
     * 사용자 휴가사용이력 저장
     * @param params
     */
    void setVacUseHist(Map<String, Object> params);

    List<Map<String, Object>> getVacCodeList(Map<String, Object> params);

    /**
     * 사용자 휴가저장 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getVacUseHistoryList(Map<String, Object> params);

    List<Map<String, Object>> getVacUseHistoryWorkList(Map<String, Object> params);

    int getVacUseHistoryListTotal(Map<String, Object> params);

    /**
     * 전체 사용자 연차 현황 리스트
     * @param params
     * @return
     */
    public List<Map<String, Object>> getUserVacList(Map<String, Object> params);

}
