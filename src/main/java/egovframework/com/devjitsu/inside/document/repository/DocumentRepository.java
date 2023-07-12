package egovframework.com.devjitsu.inside.document.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DocumentRepository extends AbstractDAO {

    public List<Map<String, Object>> getDocumentList(Map<String, Object> params) {
        return selectList("document.getDocumentList", params);
    }

    public List<Map<String, Object>> getDocuOrderList(Map<String, Object> params) {
        return selectList("document.getDocuOrderList", params);
    }

    public List<Map<String, Object>> getDocuContractList(Map<String, Object> params) {
        return selectList("document.getDocuContractList", params);
    }

    public List<Map<String, Object>> getSnackList(Map<String, Object> params) {
        return selectList("document.getSnackList", params);
    }

    public Map<String, Object> getSnackOne(Map<String, Object> params) {
        return (Map<String, Object>)selectOne("document.getSnackOne", params);
    }

    public void setDocumentInsert(Map<String, Object> params) {
        insert("document.setDocumentInsert", params);
    }

    public void setDocuOrderInsert(Map<String, Object> params) {
        insert("document.setDocuOrderInsert", params);
    }

    public void setDocuContractInsert(Map<String, Object> params) {
        insert("document.setDocuContractInsert", params);
    }

    public void setSnackInsert(Map<String, Object> params) {
        insert("document.setSnackInsert", params);
    }

    public void setSnackReqCert(Map<String, Object> params) {
        update("document.setSnackReqCert", params);
    }
}
