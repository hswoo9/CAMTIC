package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface CompanyCardService {


    List<Map<String, Object>> cardUseList(Map<String, Object> params);

    Map<String, Object> useCardDetailInfo(Map<String, Object> params);

    List<Map<String, Object>> getCardTOData(Map<String, Object> params);

    void saveRegCardTo(Map<String, Object> params);

    void delCardTo(Map<String, Object> params);
    void delCardHist(Map<String, Object> params);

    Map<String, Object> getCardToInfo(Map<String, Object> params);
    int getCardUseCheck(Map<String, Object> params);

    void updRegCardTo(Map<String, Object> params);

    void setUseCardHist(Map<String, Object> params);

    List<Map<String, Object>> cardToUseList(Map<String, Object> params);

    List<Map<String, Object>> getCardTOHistList(Map<String, Object> params);

    void updCardFromDe(Map<String, Object> params);
}
