package egovframework.com.devjitsu.inside.asset.service.Impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.utiles.CommonUtil;
import egovframework.com.devjitsu.inside.asset.repository.AssetRepository;
import egovframework.com.devjitsu.inside.asset.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getAssetList(Map<String, Object> params) {
        return assetRepository.getAssetList(params);
    }

    @Override
    public List<Map<String, Object>> getInsideCodeList(Map<String, Object> params) {
        return assetRepository.getInsideCodeList(params);
    }

    @Override
    public void setAssetInfo(Map<String, Object> params, MultipartFile relatedFile, MultipartFile astFile, String server_dir, String base_dir) {
        params.put("astNo", params.get("astNo") + "-" + assetRepository.getAssetInfoBarcordMax(params));
        if(StringUtils.isEmpty(params.get("astInfoSn"))){
            assetRepository.setAssetInfo(params);
        }else{
            assetRepository.setAssetInfoUpd(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();


        if(!relatedFile.isEmpty()){
            fileInsMap = mainLib.fileUpload(relatedFile, filePath(params, server_dir));
            fileInsMap.put("astInfoSn", params.get("astInfoSn"));
            fileInsMap.put("fileCd", params.get("menuCd"));
            fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
            fileInsMap.put("filePath", filePath(params, base_dir));
            fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
            fileInsMap.put("empSeq", params.get("empSeq"));
            commonRepository.insOneFileInfo(fileInsMap);

            fileInsMap.put("relatedFileNo", fileInsMap.get("file_no"));
            assetRepository.setAstRelatedFileNoUpd(fileInsMap);
        }

        if(!astFile.isEmpty()){
            fileInsMap = mainLib.fileUpload(astFile, filePath(params, server_dir));
            fileInsMap.put("astInfoSn", params.get("astInfoSn"));
            fileInsMap.put("fileCd", params.get("menuCd"));
            fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
            fileInsMap.put("filePath", filePath(params, base_dir));
            fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
            fileInsMap.put("empSeq", params.get("empSeq"));
            commonRepository.insOneFileInfo(fileInsMap);

            fileInsMap.put("astFileNo", fileInsMap.get("file_no"));
            assetRepository.setAstFileNoUpd(fileInsMap);
        }

    }

    @Override
    public Map<String, Object> getAssetInfo(Map<String, Object> params) {
        Map<String, Object> returnMap = assetRepository.getAssetInfo(params);

        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("fileNo", returnMap.get("AST_FILE_NO"));
        returnMap.put("astFile", commonRepository.getContentFileOne(searchMap));
        searchMap.put("fileNo", returnMap.get("RELATED_FILE_NO"));
        returnMap.put("relatedFile", commonRepository.getContentFileOne(searchMap));
        return returnMap;
    }

    @Override
    public Map<String, Object> getAssetInfoAll(Map<String, Object> params) {
        Map<String, Object> returnMap = assetRepository.getAssetInfoAll(params);

        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("fileNo", returnMap.get("AST_FILE_NO"));
        returnMap.put("astFile", commonRepository.getContentFileOne(searchMap));
        searchMap.put("fileNo", returnMap.get("RELATED_FILE_NO"));
        returnMap.put("relatedFile", commonRepository.getContentFileOne(searchMap));

        return returnMap;
    }

    @Override
    public Map<String, Object> getAstManage() {
        return assetRepository.getAstManage();
    }

    @Override
    public void setAstManage(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("astManageSn"))){
            assetRepository.setAstManage(params);
        }else{
            assetRepository.setAstManageUpd(params);
        }
    }

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

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }
}
