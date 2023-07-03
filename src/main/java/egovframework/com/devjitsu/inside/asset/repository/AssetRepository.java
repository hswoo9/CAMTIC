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
    public List<Map<String,Object>> getClassManageList(Map<String,Object> map) {
        return selectList("asset.getClassManageList", map);
    }
    //장비사용 목록 조회
    public List<Map<String, Object>> getEqipmnUseList(Map<String, Object> params) {
        return selectList("asset.getEqipmnUseList", params);
    }

    //장비사용 목록 삭제
    public void setEquipmenUseDelete(List<String> eqmnUsePk) { update("asset.setEquipmenUseDelete", eqmnUsePk);}

    //장비사용 목록 업데이트
    public void setEquipmenUseUpdate(Map<String, Object> params) { update("asset.setEquipmenUseUpdate", params);}

    //장비사용 등록 수정 창 조회
    public List<Map<String, Object>> getEqipmnUseUpdateList(Map<String, Object> params) {
        return selectList("asset.getEqipmnUseUpdateList", params);
    }
    public List<Map<String,Object>> getAssetPlaceList() {
        return selectList("asset.getAssetPlaceList");
    }
    public void setAssetCode(Map<String,Object> map) {
        insert("asset.setAssetCode", map);
    }
    public void delAssetCode(Map<String,Object> map) {
        delete("asset.delAssetCode", map);
    }
    public void setAssetPlace(Map<String,Object> map) {
        insert("asset.setAssetPlace", map);
    }
    public void delAssetPlace(Map<String,Object> map) {
        delete("asset.delAssetPlace", map);
    }

    public List<Map<String,Object>> getAstCodeList() {
        return selectList("asset.getAstCodeList");
    }

}
