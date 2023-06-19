package egovframework.com.devjitsu.inside.asset.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AssetRepository extends AbstractDAO {

    //장비관리 팝업창 (관리자) - 장비등록
    public void setEquipmentInsert(Map<String, Object> params) {
        insert("asset.setEquipmentInsert", params);
    }

    //공통코드 - 장비관리구분
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

}
