package egovframework.com.devjitsu.g20.service;

import java.util.List;
import java.util.Map;

public interface G20Service {
    List<Map<String, Object>> getProjectList(Map<String, Object> params);

    List<Map<String, Object>> getSubjectList(Map<String, Object> params);

    List<Map<String, Object>> getBankList(Map<String, Object> params);

    Map<String, Object> getCrmInfo(Map<String, Object> params);

    void setCrmInfo(Map<String, Object> params);

    List<Map<String, Object>> getClientList(Map<String, Object> params);

    List<Map<String, Object>> getCardList(Map<String, Object> params);

    List<Map<String, Object>> getOtherList(Map<String, Object> params);
}
