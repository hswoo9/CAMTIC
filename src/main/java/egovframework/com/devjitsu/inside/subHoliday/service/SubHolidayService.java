package egovframework.com.devjitsu.inside.subHoliday.service;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;

import java.util.List;
import java.util.Map;

public interface SubHolidayService {


    List<Map<String, Object>> getVacCodeList(Map<String, Object> params);

    /**
     * 사용자 휴가저장 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getVacUseHistoryList(Map<String, Object> params);

    /**
     * 사용자 휴가사용이력 저장
     * @param params
     */
    int setVacUseHist(Map<String, Object> params);

    /**
     * 사용자 휴일근로이력 저장
     * @param params
     */
    int setVacUseHist2(Map<String, Object> params);

    /**
     * 사용자 휴가사용이력 삭제
     * @param params
     */
    void setVacUseHistDel(Map<String, Object> params);

    /**
     * 사용자 휴가저장 리스트 admin
     * @param params
     * @return
     */
    List<Map<String, Object>> getVacUseHistoryListAdmin(Map<String, Object> params);

    /**
     * 사용자 휴가저장 단일 데이터
     * @param params
     * @return
     */
    Map<String, Object> getVacUseHistoryOne(Map<String, Object> params);
    Map<String, Object> getHolidayWorkMasterOne(Map<String, Object> params);
    List<Map<String, Object>> getHolidayWorkHistOne(Map<String, Object> params);

    List<Map<String, Object>> getVacUseHistoryWorkList(Map<String, Object> params);

    int getVacUseHistoryListTotal(Map<String, Object> params);

    /**
     * 전체 사용자 연차 현황 리스트
     * @param params
     * @return
     */
    public List<Map<String, Object>> getUserVacList(Map<String, Object> params);

    public List<Map<String, Object>> getUserVacListStat(Map<String, Object> map);

    void setUserVac(Map<String, Object> params);

    /**
     * 휴가 전자결재 상태값 업데이트
     * @param params
     * @throws Exception
     */
    void updateDocState(Map<String, Object> bodyMap) throws Exception;

    Map<String, Object> getuserHolyData(Map<String, Object> params);

    void setUserVacList(List<Map<String, Object>> list);

    void setUserVacList2(List<Map<String, Object>> list, String uniqId, String reason);

    /**
     * 공휴일 데이터 조회 */
    public List<Map<String, Object>> getHolidayList(Map<String, Object> params);

    /**
     * 공휴일 저장(삽입,수정) */
    void setHoliday(Map<String, Object> params);

    /**
     * 공휴일 삭제 */
    void deleteHoliday(Map<String, Object> params);

    /**
     * 연가 일괄 등록
     * 리스트
     * 직원구분(수)
     * 연가 신청
     */
    List<Map<String,Object>> getUserInfoList (Map<String,Object> map);

    Map<String, Integer> getCountMap2();

    void setSubHolidayByEmpInfo2(Map<String, Object> params);

    /**
     * 이력관리(발생 연차 수정 내역)
     * 리스트
     */
    List<Map<String,Object>> getModVacList (Map<String,Object> map);

    List<Map<String, Object>> getGrantDay(Map<String, Object > map);

    void workHolidayReqApp(Map<String, Object> bodyMap) throws Exception;
    void workHolidayReqAdminApp(Map<String, Object> bodyMap) throws Exception;

    void setDocReaderReset(Map<String, Object> params);

    void delYn(Map<String, Object> params);
}
