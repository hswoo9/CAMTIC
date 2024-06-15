package egovframework.com.devjitsu.docView.service;


import java.util.List;
import java.util.Map;

public interface DocViewService {
    List<Map<String, Object>> getCardLossList(Map<String, Object> params);

    List<Map<String, Object>> getCardManager(Map<String, Object> params);

    void saveCardLoss(Map<String, Object> params);

    Map<String, Object> getCardLossData(Map<String, Object> params);

    void delCardLossData(Map<String, Object> params);

    List<Map<String, Object>> getAccCertList(Map<String, Object> params);

    void saveAccCert(Map<String, Object> params);

    Map<String, Object> getAccCertData(Map<String, Object> params);

    void delAccCertData(Map<String, Object> params);

    void saveCorpBank(Map<String, Object> params);

    Map<String, Object> getCorpBankData(Map<String, Object> params);

    List<Map<String, Object>> getCorpBankList(Map<String, Object> params);

    void delCorpBank(Map<String, Object> params);

    void saveCorpCard(Map<String, Object> params);

    Map<String, Object> getCorpCardData(Map<String, Object> params);

    List<Map<String, Object>> getCorpCardList(Map<String, Object> params);

    void delCorpCard(Map<String, Object> params);
}
