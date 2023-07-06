package egovframework.com.devjitsu.inside.history.service;

import java.util.List;
import java.util.Map;

public interface HistoryService {

    /**
     * 발령조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getHistoryList(Map<String, Object> params);

    /**
     * 발령 단일조회
     * @param params
     * @return
     */
    Map<String, Object> getHistoryOne(Map<String, Object> params);

    /**
     * 발령등록
     * @param params
     */
    void setHistoryInsert(Map<String, Object> params);
}
