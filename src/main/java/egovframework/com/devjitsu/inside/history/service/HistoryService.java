package egovframework.com.devjitsu.inside.history.service;

import java.util.Map;

public interface HistoryService {

    /**
     * 발령등록
     * @param params
     * @return
     */
    void setHistoryInsert(Map<String, Object> params);
}
