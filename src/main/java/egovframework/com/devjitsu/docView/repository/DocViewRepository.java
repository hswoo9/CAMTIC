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
}
