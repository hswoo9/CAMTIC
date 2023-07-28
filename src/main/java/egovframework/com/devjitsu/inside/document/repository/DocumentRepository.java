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

    public List<Map<String, Object>> getSnackStatDept(Map<String, Object> params) {
        return selectList("document.getSnackStatDept", params);
    }

    public List<Map<String, Object>> getSnackStat(Map<String, Object> params) {
        return selectList("document.getSnackStat", params);
    }

    public List<Map<String, Object>> getSnackExcelList(Map<String, Object> params) {
        return selectList("document.getSnackExcelList", params);
    }

    public List<Map<String, Object>> getArchiveList(Map<String, Object> params) {
        return selectList("document.getArchiveList", params);
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

    public void setArchiveInsert(Map<String, Object> params) {
        insert("document.setArchiveInsert", params);
    }

    //문서고 등록 - 문서위치 조회
    public List<Map<String, Object>> getDocumentPlaceList(Map<String, Object> params) {
        return selectList("document.getDocumentPlaceList", params);
    }

    public void setProductInsert(Map<String, Object> params){
        insert("document.setProductInsert", params);
    }

    public void insOneFileInfo(Map<String, Object> params){
        insert("document.insOneFileInfo", params);
    }

    public void setDocuContractFileKey(Map<String, Object> params){
        update("document.setDocuContractFileKey", params);
    }
}
