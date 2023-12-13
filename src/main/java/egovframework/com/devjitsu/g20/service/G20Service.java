package egovframework.com.devjitsu.g20.service;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;

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

    Map<String, Object> getSempData(Map<String, Object> params);

    List<Map<String, Object>> getBudgetList(Map<String, Object> params);

    List<Map<String, Object>> getCorpProjectList(Map<String, Object> params);

    void setDjCardList(List<Map<String, Object>> list);

    Map<String, Object> getProjectInfo(Map<String, Object> params);

    List<Map<String, Object>> getEtaxList(Map<String, Object> params);

    Map<String, Object> getEtaxData(Map<String, Object> params);
}
