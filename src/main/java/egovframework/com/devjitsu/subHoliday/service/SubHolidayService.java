package egovframework.com.devjitsu.subHoliday.service;

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

    /**
     * 사용자 휴가저장 단일 데이터
     * @param params
     * @return
     */
    Map<String, Object> getVacUseHistoryOne(Map<String, Object> params);

    List<Map<String, Object>> getVacUseHistoryWorkList(Map<String, Object> params);

    int getVacUseHistoryListTotal(Map<String, Object> params);

    /**
     * 전체 사용자 연차 현황 리스트
     * @param params
     * @return
     */
    public List<Map<String, Object>> getUserVacList(Map<String, Object> params);

    public List<Map<String, Object>> getUserVacListStat(Map<String, Object> params);

}
