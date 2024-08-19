package egovframework.com.devjitsu.cam_manager.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface KukgohService {

    // 공통코드 리스트 조회
    List<Map<String, Object>> getCmmnCodeList(Map<String, Object> params);

    List<Map<String, Object>> getCmmnCodeDetailList(Map<String, Object> params);

    void setCommCodeObject(Map<String, Object> params);

    List<Map<String, Object>> getPayAppList(Map<String, Object> params);

    void setEnaraSendExcept(Map<String, Object> params);

    List<Map<String, Object>> getBudgetGroupList(Map<String, Object> params);

    List<Map<String, Object>> getEnaraBudgetCdList(Map<String, Object> params);

    void setEnaraBudgetCode(Map<String, Object> params);

    void delBudgetCodeMatch(Map<String, Object> params);

    List<Map<String, Object>> getProjectList(Map<String, Object> params);

    List<Map<String, Object>> getEnaraPjtList(Map<String, Object> params);

    void setEnaraProject(Map<String, Object> params);

    Map<String, Object> getExecutionInfo(Map<String, Object> params);

    List<Map<String, Object>> getEnaraBankList(Map<String, Object> params);

    Map<String, Object> sendEnara(Map<String, Object> params);

    List<Map<String, Object>> getEnaraTempList();

    void insDjErpSend(Map<String, Object> resutMap);

    void delErpSendTrscId(Map<String, Object> resutMap);

    Map<String, Object> getErpSendTrscId(Map<String, Object> resutMap);

    Map<String, Object> getEtaxInfo(Map<String, Object> params);

    Map<String, Object> sendEtaxData(Map<String, Object> params);

    Map<String, Object> sendResultEtaxData(Map<String, Object> params);

    List<Map<String, Object>> getInterfaceList(Map<String, Object> params);

    void EnaraCall(Map<String, Object> params);

    List<Map<String, Object>> getCardPuchasRecptnList(Map<String, Object> params);
}
