package egovframework.com.devjitsu.inside.asset.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AssetRepository extends AbstractDAO {

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

    public List<Map<String,Object>> getInsideCodeList() {
        return selectList("asset.getInsideCodeList");
    }
    public List<Map<String,Object>> getAssetMcCodeList() {
        return selectList("asset.getAssetMcCodeList");
    }
    public List<Map<String,Object>> getAssetMdCodeList(Map<String,Object> map) {
        return selectList("asset.getAssetMdCodeList", map);
    }
    public List<Map<String,Object>> getAssetDtCodeList(Map<String,Object> map) {
        return selectList("asset.getAssetDtCodeList", map);
    }

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


    public List<Map<String,Object>> getBookList(Map<String, Object> params) {
        return selectList("asset.getBookList", params);
    }

    public void setBookInsert(Map<String, Object> params) {
        insert("asset.setBookInsert", params);
    }

}
