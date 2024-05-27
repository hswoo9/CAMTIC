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

    public void setInComeInsert(Map<String, Object> params) {
        insert("document.setInComeInsert", params);
    }

    public void setDocuOrderInsert(Map<String, Object> params) {
        insert("document.setDocuOrderInsert", params);
    }

    public void setDocuContractInsert(Map<String, Object> params) {
        insert("document.setDocuContractInsert", params);
    }

    public int setSnackInsert(Map<String, Object> params) { int result = (int)insert("document.setSnackInsert", params); return result;}

    public void setSnackUpdate(Map<String, Object> params) { update("document.setSnackUpdate", params);}

    public void setSnackDel(Map<String, Object> params) { delete("document.setSnackDel", params); }

    public void setSnackCompanionInsert(Map<String, Object> params) { insert("document.setSnackCompanionInsert", params); }

    public void insCardHist(Map<String, Object> params) {
        insert("document.insCardHist", params);
    }

    public void delCardHist(Map<String, Object> params) {
        delete("document.delCardHist", params);
    }

    public void delSnackUseCardInfo(Map<String, Object> params) { delete("document.delSnackUseCardInfo", params); }

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

    //문서고 삭제
    public void setAchiveDelete(List<String> archivePk) { update("document.setAchiveDelete", archivePk);}

    //문서고 폐기
    public void setAchiveScrap(List<String> archivePk) { update("document.setAchiveScrap", archivePk);}

    //문서고 업데이트
    public void setArchiveUpdate(Map<String, Object> params) { update("document.setArchiveUpdate", params);}

    //문서고 수정에 들어갈 항목 조회
    public Map<String,Object> getArchiveinfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("document.getArchiveinfoList", params);
    }

    //등록대장, 접수대장 임시 삭제
    public void delDocumentList(Map<String, Object> params) { update("document.delDocumentList", params);}

    //등록대장, 접수대장 삭제 복구
    public void delCancelDocumentList(Map<String, Object> params) { update("document.delCancelDocumentList", params);}

    //등록대장, 접수대장 최종 삭제
    public void delFinalDocumentList(Map<String, Object> params) { update("document.delFinalDocumentList", params);}

    // 등록대장 문서 삭제
    public void setRlDelete(Map<String, Object> params) { update("document.setRlDelete", params);}

    // 등록대장 상세 조회
    public Map<String, Object> getDocViewOne(Map<String, Object> params) {
        return (Map<String,Object>)selectOne("document.getDocViewOne", params);
    }
    
    // 등록대장 수정 업데이트
    public void setDocumentUpdate(Map<String, Object> params) { update("document.setDocumentUpdate", params);}

    //접수대장 팝업 조회
    public Map<String, Object> getInComeUpdateList (Map<String, Object> params) {
        return (Map<String,Object>)selectOne("document.getInComeUpdateList", params);
    }

    //접수대장 팝업 수정
    public void setInComeUpdate(Map<String, Object> params) {update("document.setInComeUpdate", params);
    }

/*
    public List<Map<String, Object>> getInComeUpdateFileList(Map<String, Object> params) {
        return selectList("document.getInComeUpdateFileList", params);
    }
*/

    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        return selectList("document.getCardList", params);
    }
    public List<Map<String, Object>> getFileList(Map<String, Object> params) {
        return selectList("document.getFileList", params);
    }


    public Map<String, Object> migFileInfo(Map<String, Object> map) {
        return (Map<String,Object>)selectOne("document.migFileInfo", map);
    }

    public void updateInComeApprStat(Map<String, Object> params) {
        update("document.updateInComeApprStat", params);
    }
    public void updateInComeFinalApprStat(Map<String, Object> params) {
        update("document.updateInComeFinalApprStat", params);
    }
    public void setIncomeFileDocNm(Map<String, Object> params) {
        update("document.setIncomeFileDocNm", params);
    }
}
