package egovframework.com.devjitsu.docView.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DocViewRepository extends AbstractDAO {
    public List<Map<String, Object>> getCardLossList(Map<String, Object> params) {
        return (List<Map<String, Object>>) selectList("docView.getCardLossList", params);
    }

    public List<Map<String, Object>> getCardManager(Map<String, Object> params) {
        return (List<Map<String, Object>>) selectList("docView.getCardManager", params);
    }

    public void insertCardLoss(Map<String, Object> params) {
        insert("docView.insertCardLoss", params);
    }

    public void updateCardLoss(Map<String, Object> params) {
        update("docView.updateCardLoss", params);
    }

    public Map<String, Object> getCardLossData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("docView.getCardLossData", params);
    }

    public void delCardLossData(Map<String, Object> params) {
        delete("docView.delCardLossData", params);
    }

    public List<Map<String, Object>> getAccCertList(Map<String, Object> params) {
        return (List<Map<String, Object>>) selectList("docView.getAccCertList", params);
    }

    public void updateAccCert(Map<String, Object> params) {
        update("docView.updateAccCert", params);
    }

    public void insertAccCert(Map<String, Object> params) {
        insert("docView.insertAccCert", params);
    }

    public Map<String, Object> getAccCertData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("docView.getAccCertData", params);
    }

    public void delAccCertData(Map<String, Object> params) {
        delete("docView.delAccCertData", params);
    }

    public void updateCorpBank(Map<String, Object> params) {
        update("docView.updateCorpBank", params);
    }

    public void insertCorpBank(Map<String, Object> params) {
        insert("docView.insertCorpBank", params);
    }

    public Map<String, Object> getCorpBankData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("docView.getCorpBankData", params);
    }

    public List<Map<String, Object>> getCorpBankList(Map<String, Object> params) {
        return selectList("docView.getCorpBankList", params);
    }

    public void delCorpBank(Map<String, Object> params) {
        delete("docView.delCorpBank", params);
    }

    public void updateCorpCard(Map<String, Object> params) {
        update("docView.updateCorpCard", params);
    }

    public void insertCorpCard(Map<String, Object> params) {
        insert("docView.insertCorpCard", params);
    }

    public Map<String, Object> getCorpCardData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("docView.getCorpCardData", params);
    }

    public List<Map<String, Object>> getCorpCardList(Map<String, Object> params) {
        return selectList("docView.getCorpCardList", params);
    }

    public void delCorpCard(Map<String, Object> params) {
        delete("docView.delCorpCard", params);
    }

    public void updateSignetTo(Map<String, Object> params) {
        update("docView.updateSignetTo", params);
    }

    public void insertSignetTo(Map<String, Object> params) {
        insert("docView.insertSignetTo", params);
    }

    public Map<String, Object> getSignetToData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("docView.getSignetToData", params);
    }

    public List<Map<String, Object>> getSignetToList(Map<String, Object> params) {
        return selectList("docView.getSignetToList", params);
    }

    public void delSignetTo(Map<String, Object> params) {
        delete("docView.delSignetTo", params);
    }

    public void updateDisAsset(Map<String, Object> params) {
        update("docView.updateDisAsset", params);
    }

    public void insertDisAsset(Map<String, Object> params) {
        insert("docView.insertDisAsset", params);
    }

    public Map<String, Object> getDisAssetData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("docView.getDisAssetData", params);
    }

    public List<Map<String, Object>> getDisAssetList(Map<String, Object> params) {
        return selectList("docView.getDisAssetList", params);
    }

    public void delDisAsset(Map<String, Object> params) {
        delete("docView.delDisAsset", params);
    }
}
