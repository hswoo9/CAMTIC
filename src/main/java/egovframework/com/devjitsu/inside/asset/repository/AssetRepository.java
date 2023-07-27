package egovframework.com.devjitsu.inside.asset.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AssetRepository extends AbstractDAO {

    /** 자산리스트 */
    public List<Map<String,Object>> getAssetList(Map<String,Object> params) { return selectList("asset.getAssetList", params);}
    public List<Map<String,Object>> getInsideCodeList(Map<String,Object> params) { return selectList("asset.getInsideCodeList", params);}
    public Map<String, Object> getInsideCode(Map<String,Object> params) { return (Map<String, Object>) selectOne("asset.getInsideCode", params);}
    public String getAssetInfoBarcordMax(Map<String, Object> params) { return (String)selectOne("asset.getAssetInfoBarcordMax", params);}
    public void setAssetInfo(Map<String, Object> params) { insert("asset.setAssetInfo", params);}
    public void setAssetInfoUpd(Map<String, Object> params) { insert("asset.setAssetInfoUpd", params);}
    public void setAstFileNoUpd(Map<String, Object> params) { insert("asset.setAstFileNoUpd", params);}
    public void setAstRelatedFileNoUpd(Map<String, Object> params) { insert("asset.setAstRelatedFileNoUpd", params);}
    public Map<String, Object> getAssetInfo(Map<String,Object> params) { return (Map<String, Object>) selectOne("asset.getAssetInfo", params);}
    public Map<String, Object> getAssetInfoAll(Map<String,Object> params) { return (Map<String, Object>) selectOne("asset.getAssetInfoAll", params);}
    public Map<String, Object> getAstManage() { return (Map<String, Object>) selectOne("asset.getAstManage");}
    public List<Map<String,Object>> getAstInfoModHistory(Map<String,Object> params) { return selectList("asset.getAstInfoModHistory", params);}
    public List<Map<String,Object>> getAstInfoModHistoryItem(Map<String,Object> params) { return selectList("asset.getAstInfoModHistoryItem", params);}
    public void setAstManage(Map<String, Object> params) { insert("asset.setAstManage", params);}
    public void setAstManageUpd(Map<String, Object> params) { insert("asset.setAstManageUpd", params);}
    public void setAstInfoBatch(Map<String, Object> params) { insert("asset.setAstInfoBatch", params);}
    public void setAstInfoModHistory(Map<String, Object> params) { insert("asset.setAstInfoModHistory", params);}
    public void setAstInfoModHistoryItem(List<Map<String, Object>> params) { insert("asset.setAstInfoModHistoryItem", params);}
    public void setAstInfoModHistoryDel(Map<String, Object> params) { insert("asset.setAstInfoModHistoryDel", params);}

    /** 분류관리 */
    /** 소속관리*/
    public List<Map<String,Object>> getClassPositionList(Map<String,Object> params) { return selectList("asset.getClassPositionList", params);}
    public Map<String, Object> getClassPosition(Map<String,Object> params) { return (Map<String, Object>) selectOne("asset.getClassPosition", params);}
    public void setAssetCodePosition(Map<String, Object> params) { insert("asset.setAssetCodePosition", params);}
    public void setAssetCodePositionUpd(Map<String, Object> params) { insert("asset.setAssetCodePositionUpd", params);}
    public void setAssetCodePositionDel(Map<String, Object> params) { update("asset.setAssetCodePositionDel", params);}

    /** 구분관리 */
    public List<Map<String,Object>> getClassDivisionList(Map<String,Object> params) { return selectList("asset.getClassDivisionList", params);}
    public Map<String, Object> getClassDivision(Map<String,Object> params) { return (Map<String, Object>) selectOne("asset.getClassDivision", params);}
    public void setClassDivision(Map<String, Object> params) { insert("asset.setClassDivision", params);}
    public void setClassDivisionUpd(Map<String, Object> params) { insert("asset.setClassDivisionUpd", params);}
    public void setClassDivisionDel(Map<String, Object> params) { update("asset.setClassDivisionDel", params);}
    /** 위치관리 */
    public List<Map<String,Object>> getAssetPlaceList() { return selectList("asset.getAssetPlaceList");}
    public Map<String, Object> getAssetPlace(Map<String,Object> params) { return (Map<String, Object>) selectOne("asset.getAssetPlace", params);}
    public void setAssetPlace(Map<String, Object> params) { insert("asset.setAssetPlace", params);}
    public void setAssetPlaceUpd(Map<String, Object> params) { insert("asset.setAssetPlaceUpd", params);}
    public void setAssetPlaceDel(Map<String, Object> params) { update("asset.setAssetPlaceDel", params);}
    /** 카테고리 관리 */
    public List<Map<String,Object>> getAstCategoryList(Map<String,Object> params) { return selectList("asset.getAstCategoryList", params);}
    public Map<String, Object> getAstCategory(Map<String, Object> params) { return (Map<String, Object>) selectOne("asset.getAstCategory", params);}
    public String getMaxCategoryCode(Map<String,Object> params) { return (String) selectOne("asset.getMaxCategoryCode", params);}
    public void setCategoryCode(Map<String,Object> params) { update("asset.setCategoryCode", params);}
    public void setCategoryCodeUpd(Map<String,Object> params) { update("asset.setCategoryCodeUpd", params);}
    public void setCategoryCodeDel(Map<String,Object> params) { update("asset.setCategoryCodeDel", params);}
    /** 분류관리 끝 */

    /** PDA 연동 */
    public List<Map<String,Object>> getAstPdaInfoList(Map<String,Object> params) { return selectList("asset.getAstPdaInfoList", params);}
    public void setAstPdaActiveUpd(Map<String, Object> params) { update("asset.setAstPdaActiveUpd", params);};
    public void setAstPdaInfo(Map<String, Object> params) {
        insert("asset.setAstPdaInfo", params);
        insert("asset.setAstPdaOpt", params);
    }
    public Map<String, Object> getAstPdaInfo(Map<String, Object> params) { return (Map<String, Object>) selectOne("asset.getAstPdaInfo", params);}
    public void setAstPdaOptInspection(Map<String, Object> params) { update("asset.setAstPdaOptInspection", params);}
    public void setAssetInspectionUpload(Map<String, Object> params) { update("asset.setAssetInspectionUpload", params);}
    public void setAssetPdaActiveDtUpd(Map<String, Object> params) { update("asset.setAssetPdaActiveDtUpd", params);}

    /** 지식재산권 관리 */
    public Map<String, Object> getInventionInfo(Map<String,Object> params) { return (Map<String, Object>) selectOne("asset.getInventionInfo", params);}
    public List<Map<String,Object>> getInventionShareList(Map<String,Object> params) { return selectList("asset.getInventionShareList", params);}
    public List<Map<String, Object>> getRprReceiptList(Map<String, Object> params) { return selectList("asset.getRprReceiptList", params); }
    public int setInventionInsert(Map<String, Object> params) { int result = (int)insert("asset.setInventionInsert", params); return result;}
    public int setRprResultInsert(Map<String, Object> params) { int result = (int)insert("asset.setRprResultInsert", params); return result;}
    public int setRprReceiptInsert(Map<String, Object> params) { int result = (int)insert("asset.setRprReceiptInsert", params); return result;}
    public void setInventionShareInsert(Map<String, Object> params) { insert("asset.setInventionShareInsert", params);}
    public void updateApprStat(Map<String, Object> params) { update("asset.updateApprStat", params);}
    public void updateFinalApprStat(Map<String, Object> params) { update("asset.updateFinalApprStat", params); }
    /** 지식재산권 관리 끝 */

    //장비관리 팝업창 (관리자) - 장비등록
    public void setEquipmentInsert(Map<String, Object> params) {
        insert("asset.setEquipmentInsert", params);
    }

    //공통코드 - 장비관리구분 조회
    public List<Map<String, Object>> getEqipmnList(Map<String, Object> params) {
        return selectList("asset.getEqipmnList", params);
    }

    //장비등록 목록 조회
    public List<Map<String, Object>> getEqipmnRegList(Map<String, Object> params) {
        return selectList("asset.getEqipmnRegList", params);
    }

    //장비등록 목록 삭제
    public void setEquipmentDelete(List<String> eqmnPk) { update("asset.setEquipmentDelete", eqmnPk);}

    //장비등록 목록 업데이트
    public void setEquipmentUpdate(Map<String, Object> params) { update("asset.setEquipmentUpdate", params);}

    //장비관리 팝업창 - 장비사용 등록
    public void setEquipmentUseInsert(Map<String, Object> params) {
        insert("asset.setEquipmentUseInsert", params);
    }

    //장비사용 등록 - 장비명 조회
    public List<Map<String, Object>> getEqipmnNameList(Map<String, Object> params) {
        return selectList("asset.getEqipmnNameList", params);
    }

    //장비사용 등록 - 업체구분 조회
    public List<Map<String, Object>> getPrtpcoGbnNameList(Map<String, Object> params) {
        return selectList("asset.getPrtpcoGbnNameList", params);
    }
    public List<Map<String,Object>> getAssetMdCodeList(Map<String,Object> map) {
        return selectList("asset.getAssetMdCodeList", map);
    }
    public List<Map<String,Object>> getAssetDtCodeList(Map<String,Object> map) {
        return selectList("asset.getAssetDtCodeList", map);
    }


    //장비사용 목록 조회
    public List<Map<String, Object>> getEqipmnUseList(Map<String, Object> params) { return selectList("asset.getEqipmnUseList", params);}

    //장비사용 목록 삭제
    public void setEquipmenUseDelete(List<String> eqmnUsePk) { update("asset.setEquipmenUseDelete", eqmnUsePk);}

    //장비사용 목록 업데이트
    public void setEquipmenUseUpdate(Map<String, Object> params) { update("asset.setEquipmenUseUpdate", params);}

    //장비사용 등록 수정 창 조회
    public List<Map<String, Object>> getEqipmnUseUpdateList(Map<String, Object> params) {
        return selectList("asset.getEqipmnUseUpdateList", params);
    }
    
    //장비 전자결재
    public List<Map<String, Object>> getLGCategoryMonthly(Map<String, Object> params) { return selectList("asset.getLGCategoryMonthly", params);}
    public List<Map<String, Object>> getMDCategoryMonthly(Map<String, Object> params) { return selectList("asset.getMDCategoryMonthly", params);}


    public List<Map<String,Object>> getBookList(Map<String, Object> params) {
        return selectList("asset.getBookList", params);
    }

    public void setBookInsert(Map<String, Object> params) {
        insert("asset.setBookInsert", params);
    }

    //지식재산권 리스트 삭제
    public void setRprListDelete(List<String> rprPk) { update("asset.setRprListDelete", rprPk);}

    //지식재산권 리스트 수정 창 조회
    public List<Map<String, Object>> getRprReceiptUpdateList(Map<String, Object> params) {
        return selectList("asset.getRprReceiptUpdateList", params);
    }

}
