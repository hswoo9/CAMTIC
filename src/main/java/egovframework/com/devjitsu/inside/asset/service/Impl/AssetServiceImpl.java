package egovframework.com.devjitsu.inside.asset.service.Impl;

import egovframework.com.devjitsu.inside.asset.repository.AssetRepository;
import egovframework.com.devjitsu.inside.asset.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository assetRepository;

    //장비관리 팝업창 (관리자) - 장비등록
    @Override
    public void setEquipmentInsert(Map<String, Object> params) {
        assetRepository.setEquipmentInsert(params);
    }

    //공통코드 - 장비관리구분 조회
    @Override
    public List<Map<String,Object>> getEqipmnList(Map<String, Object> params) {
        return assetRepository.getEqipmnList(params);
    }

    //장비등록 목록 조회
    @Override
    public List<Map<String, Object>> getEqipmnRegList(Map<String, Object> params) {
        return assetRepository.getEqipmnRegList(params);
    }

    //장비등록 목록 삭제
    @Override
    public Map<String, Object> setEquipmentDelete(List<String> eqmnPk) {
        Map<String, Object> result = new HashMap<>();

        try {
            assetRepository.setEquipmentDelete(eqmnPk);

            result.put("code", "200");
            result.put("message", "장비목록 삭제가 완료되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "장비목록 삭제 중 에러가 발생했습니다.");
        }

        return result;
    }

    //장비등록 목록 업데이트
    @Override
    public Map<String, Object> setEquipmentUpdate(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            assetRepository.setEquipmentUpdate(params);

            result.put("code", "200");
            result.put("message", "장비목록 수정이 완료되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "장비목록 수정 중 에러가 발생했습니다.");
        }

        return result;
    }

    //장비관리 팝업창 - 장비사용 등록
    @Override
    public void setEquipmentUseInsert(Map<String, Object> params) {
        assetRepository.setEquipmentUseInsert(params);
    }

    //장비사용 등록 - 장비명 조회
    @Override
    public List<Map<String,Object>> getEqipmnNameList(Map<String, Object> params) {
        return assetRepository.getEqipmnNameList(params);
    }

    //장비사용 등록 - 업체구분 조회
    @Override
    public List<Map<String,Object>> getPrtpcoGbnNameList(Map<String, Object> params) {
        return assetRepository.getPrtpcoGbnNameList(params);
    }

    public List<Map<String,Object>> getInsideCodeList() {
        return assetRepository.getInsideCodeList();
    }
    @Override
    public List<Map<String,Object>> getAssetMcCodeList() {
        return assetRepository.getAssetMcCodeList();
    }
    @Override
    public List<Map<String,Object>> getAssetMdCodeList(Map<String,Object> map) {
        return assetRepository.getAssetMdCodeList(map);
    }
    @Override
    public List<Map<String,Object>> getAssetDtCodeList(Map<String,Object> map) {
        return assetRepository.getAssetDtCodeList(map);
    }
    @Override
    public List<Map<String,Object>> getClassManageList(Map<String,Object> map) {
        return assetRepository.getClassManageList(map);
    }

    //장비사용 목록 조회
    @Override
    public List<Map<String, Object>> getEqipmnUseList(Map<String, Object> params) {
        return assetRepository.getEqipmnUseList(params);
    }

    //장비사용 목록 삭제
    @Override
    public Map<String, Object> setEquipmenUseDelete(List<String> eqmnUsePk) {
        Map<String, Object> result = new HashMap<>();

        try {
            assetRepository.setEquipmenUseDelete(eqmnUsePk);

            result.put("code", "200");
            result.put("message", "장비사용 목록 삭제가 완료되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "장비사용 목록 삭제 중 에러가 발생했습니다.");
        }

        return result;
    }

    //장비사용 목록 업데이트
    @Override
    public Map<String, Object> setEquipmenUseUpdate(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            assetRepository.setEquipmenUseUpdate(params);

            result.put("code", "200");
            result.put("message", "장비목록 수정이 완료되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "장비목록 수정 중 에러가 발생했습니다.");
        }

        return result;
    }

    //장비사용 등록 수정 창 조회
    @Override
    public List<Map<String, Object>> getEqipmnUseUpdateList(Map<String, Object> params) {
        return assetRepository.getEqipmnUseUpdateList(params);
    }
    @Override
    public List<Map<String,Object>> getAssetPlaceList() {
        return assetRepository.getAssetPlaceList();
    }
    @Override
    public String setAssetCode(Map<String,Object> map) {
        try {
            assetRepository.setAssetCode(map);
            return "SUCCESS";
        }catch (Exception e) {
            return "FAILED";
        }
    }
    @Override
    public String delAssetCode(Map<String,Object> map) {
        try {
            assetRepository.delAssetCode(map);
            return "SUCCESS";
        }catch (Exception e) {
            return "FAILED";
        }
    }
    @Override
    public String setAssetPlace(Map<String,Object> map) {
        try {
            assetRepository.setAssetPlace(map);
            return "SUCCESS";
        }catch (Exception e) {
            return "FAILED";
        }
    }
    @Override
    public String delAssetPlace(Map<String,Object> map) {
        try {
            assetRepository.delAssetPlace(map);
            return "SUCCESS";
        }catch (Exception e) {
            return "FAILED";
        }
    }
    @Override
    public List<Map<String,Object>> getAstCodeList() {
        return assetRepository.getAstCodeList();
    }

}
