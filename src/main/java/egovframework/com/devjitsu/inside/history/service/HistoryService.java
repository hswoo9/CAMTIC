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
     * 포상조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getRewardList(Map<String, Object> params);

    /**
     * 발령등록
     * @param params
     */
    void setHistoryInsert(Map<String, Object> params, String base_dir);

    /**
     * 포상등록
     * @param params
     */
    void setRewardInsert(Map<String, Object> params);
}
