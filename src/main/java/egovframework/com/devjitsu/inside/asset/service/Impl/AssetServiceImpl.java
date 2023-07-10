package egovframework.com.devjitsu.inside.asset.service.Impl;

import egovframework.com.devjitsu.inside.asset.repository.AssetRepository;
import egovframework.com.devjitsu.inside.asset.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
    public List<Map<String,Object>> getClassPositionList(Map<String,Object> params) {
        return assetRepository.getClassPositionList(params);
    }

    @Override
    public Map<String, Object> getClassPosition(Map<String, Object> params) {
        return assetRepository.getClassPosition(params);
    }

    @Override
    public List<Map<String, Object>> getClassDivisionList(Map<String, Object> params) {
        return assetRepository.getClassDivisionList(params);
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
    public void setAssetCodePosition(Map<String,Object> params) {
        if(StringUtils.isEmpty(params.get("astCodeCompanyId"))){
            assetRepository.setAssetCodePosition(params);
        }else{
            assetRepository.setAssetCodePositionUpd(params);
        }
    }

    @Override
    public void setAssetCodePositionDel(Map<String, Object> params) {
        assetRepository.setAssetCodePositionDel(params);
    }

    @Override
    public Map<String, Object> getClassDivision(Map<String, Object> params) {
        return assetRepository.getClassDivision(params);
    }

    @Override
    public void setClassDivision(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("astCodeTypeId"))){
            assetRepository.setClassDivision(params);
        }else{
            assetRepository.setClassDivisionUpd(params);
        }
    }

    @Override
    public void setClassDivisionDel(Map<String, Object> params) {
        assetRepository.setClassDivisionDel(params);
    }

    @Override
    public Map<String, Object> getAssetPlace(Map<String, Object> params) {
        return assetRepository.getAssetPlace(params);
    }

    @Override
    public void setAssetPlace(Map<String,Object> params) {
        if(StringUtils.isEmpty(params.get("astPlaceSn"))){
            assetRepository.setAssetPlace(params);
        }else{
            assetRepository.setAssetPlaceUpd(params);
        }
    }
    @Override
    public void setAssetPlaceDel(Map<String,Object> map) {
        assetRepository.setAssetPlaceDel(map);
    }
    @Override
    public List<Map<String,Object>> getAstCategoryList(Map<String, Object> params) {
        return assetRepository.getAstCategoryList(params);
    }

    @Override
    public Map<String, Object> getAstCategory(Map<String, Object> params) {
        return assetRepository.getAstCategory(params);
    }


    @Override
    public void setCategoryCode(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("astCodeId"))){
            if(params.get("categoryType").equals("categoryB") || params.get("categoryType").equals("categoryC")){
                params.put("astCode", assetRepository.getMaxCategoryCode(params));
            }

            assetRepository.setCategoryCode(params);
        }else{
            assetRepository.setCategoryCodeUpd(params);
        }
    }

    @Override
    public void getAstCategoryDel(Map<String, Object> params) {
        assetRepository.setCategoryCodeDel(params);
    }

    @Override
    public List<Map<String,Object>> getBookList(Map<String, Object> params) {
        return assetRepository.getBookList(params);
    }

    @Override
    public void setBookInsert(Map<String, Object> params) {
        assetRepository.setBookInsert(params);
    }

}
