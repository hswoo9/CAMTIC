package egovframework.com.devjitsu.inside.asset.service.Impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.utiles.CommonUtil;
import egovframework.com.devjitsu.inside.asset.repository.AssetRepository;
import egovframework.com.devjitsu.inside.asset.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    @Transactional
    public void setAssetInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        params.put("astNo", params.get("astNo") + "-" + assetRepository.getAssetInfoBarcordMax(params));
        if(StringUtils.isEmpty(params.get("astInfoSn"))){
            assetRepository.setAssetInfo(params);
        }else{
            Map<String, Object> assetInfo = assetRepository.getAssetInfoAll(params);

            assetRepository.setAssetInfoUpd(params);

            setAssetInfoModHistory(assetInfo, params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile relatedFile = request.getFile("relatedFile");
        MultipartFile astFile = request.getFile("astFile");

        if(relatedFile != null){
            if(!relatedFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(relatedFile, filePath(params, server_dir));
                fileInsMap.put("astInfoSn", params.get("astInfoSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("relatedFileNo", fileInsMap.get("file_no"));
                assetRepository.setAstRelatedFileNoUpd(fileInsMap);
            }
        }

        if(astFile != null){
            if(!astFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(astFile, filePath(params, server_dir));
                fileInsMap.put("astInfoSn", params.get("astInfoSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("astFileNo", fileInsMap.get("file_no"));
                assetRepository.setAstFileNoUpd(fileInsMap);
            }
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

        returnMap.put("history", assetRepository.getAstInfoModHistory(params));
        returnMap.put("historyItem", assetRepository.getAstInfoModHistoryItem(params));

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

    @Override
    public void setAstInfoBatch(Map<String, Object> params) {
        String baseAstInfoSn = params.get("astInfoSn").toString();
        String[] astInfoSn = params.get("astInfoSn").toString().split(",");
        for(int i = 0; i < astInfoSn.length; i++){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("astInfoSn", astInfoSn[i]);
            Map<String, Object> assetInfo = assetRepository.getAssetInfoAll(searchMap);
            params.put("astInfoSn", astInfoSn[i]);
            setAssetInfoModHistory(assetInfo, params);
        }
        params.put("astInfoSn", baseAstInfoSn);

        assetRepository.setAstInfoBatch(params);
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
    public List<Map<String, Object>> getAstPdaInfoList(Map<String, Object> params) {
        return assetRepository.getAstPdaInfoList(params);
    }

    @Override
    @Transactional
    public void getAssetListToPdaList(Map<String, Object> params) {
        assetRepository.setAstPdaActiveUpd(params);

        assetRepository.setAstPdaInfo(params);
    }

    @Override
    public Map<String, Object> getAstPdaInfo(Map<String, Object> params) {
        Map<String, Object> returnMap = assetRepository.getAstPdaInfo(params);

        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("fileNo", returnMap.get("AST_FILE_NO"));
        returnMap.put("astFile", commonRepository.getContentFileOne(searchMap));
        searchMap.put("fileNo", returnMap.get("RELATED_FILE_NO"));
        returnMap.put("relatedFile", commonRepository.getContentFileOne(searchMap));

        searchMap.put("astInfoSn", returnMap.get("AST_INFO_SN"));
        returnMap.put("history", assetRepository.getAstInfoModHistory(searchMap));
        returnMap.put("historyItem", assetRepository.getAstInfoModHistoryItem(searchMap));

        return returnMap;
    }

    @Override
    public void setAstPdaOptInspection(Map<String, Object> params) {
        assetRepository.setAstPdaOptInspection(params);
    }

    @Override
    @Transactional
    public void setAssetInspectionUpload(Map<String, Object> params) {
        List<Map<String, Object>> pdaList = assetRepository.getAstPdaInfoList(params);
        if(pdaList.size() > 0){
            for(int i = 0; i < pdaList.size(); i++){
                Map<String, Object> saveMap = new HashMap<>();
                pdaList.get(i).put("astInfoSn", pdaList.get(i).get("AST_INFO_SN"));
                Map<String, Object> assetInfo = assetRepository.getAssetInfoAll(pdaList.get(i));

                saveMap.put("astInfoSn", pdaList.get(i).get("AST_INFO_SN"));
                saveMap.put("astPdaInfoSn", pdaList.get(i).get("AST_PDA_INFO_SN"));
                saveMap.put("newAstPlaceSn", pdaList.get(i).get("NEW_AST_PLACE_SN"));
                saveMap.put("newAstStsCode", pdaList.get(i).get("NEW_AST_STS_CODE"));
                saveMap.put("inspectionType", pdaList.get(i).get("INSPECTION_TYPE"));

                saveMap.put("regEmpIp", params.get("regEmpIp"));
                saveMap.put("regEmpSeq", params.get("regEmpSeq"));
                saveMap.put("regEmpName", params.get("regEmpName"));
                saveMap.put("empSeq", params.get("empSeq"));

                if(!StringUtils.isEmpty(saveMap.get("newAstPlaceSn")) || !StringUtils.isEmpty(saveMap.get("newAstStsCode"))){
                    assetRepository.setAssetInspectionUpload(saveMap);
                }
                assetRepository.setAssetPdaActiveDtUpd(saveMap);
                setAssetInfoModHistory(assetInfo, saveMap);
            }
        }
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

    @Override
    public Map<String, Object> getInventionInfo(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        result.put("info", assetRepository.getInventionInfo(params));
        result.put("shareList", assetRepository.getInventionShareList(params));
        return result;
    }

    @Override
    public List<Map<String, Object>> getInventionShareList(Map<String, Object> params) {
        return assetRepository.getInventionShareList(params);
    }

    @Override
    public List<Map<String, Object>> getRprReceiptList(Map<String, Object> params) {
        return assetRepository.getRprReceiptList(params);
    }

    @Override
    public void setInventionInsert(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> share = gson.fromJson((String) params.get("shareUser"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        // 1. 직무발명신고서 등록 2. 발명자+지분 등록
        try {
            assetRepository.setInventionInsert(params);
            if(!share.isEmpty()) {
                params.put("share", share);
                assetRepository.setInventionShareInsert(params);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    public void setRprResultInsert(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> share = gson.fromJson((String) params.get("shareUser"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        // 1. 직무발명신고서 등록 2. 발명자+지분 등록
        try {
            assetRepository.setRprResultInsert(params);
            if(!share.isEmpty()) {
                params.put("share", share);
                assetRepository.setInventionShareInsert(params);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    public void setRprReceiptInsert(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> share = gson.fromJson((String) params.get("shareUser"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        // 1. 지식재산권 등록 2. 발명자+지분 등록
        try {
            assetRepository.setRprReceiptInsert(params);
            if(!share.isEmpty()) {
                params.put("share", share);
                assetRepository.setInventionShareInsert(params);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    public void updateDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("inventionInfoSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            assetRepository.updateApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            assetRepository.updateApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("approveStatCode", 100);
            assetRepository.updateFinalApprStat(params);
        }
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
        if(StringUtils.isEmpty(params.get("astTypeCode"))){
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
    public Map<String, Object> getCategoryMonthly(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        result.put("LGCategory", assetRepository.getLGCategoryMonthly(params));
        result.put("MDCategory", assetRepository.getMDCategoryMonthly(params));
        return result;
    }
    @Override
    public List<Map<String,Object>> getLGCategoryMonthly(Map<String, Object> params) {
        return assetRepository.getLGCategoryMonthly(params);
    }
    @Override
    public List<Map<String,Object>> getMDCategoryMonthly(Map<String, Object> params) {
        return assetRepository.getMDCategoryMonthly(params);
    }

    @Override
    public List<Map<String,Object>> getBookList(Map<String, Object> params) {
        return assetRepository.getBookList(params);
    }

    @Override
    public void setBookInsert(Map<String, Object> params) {
        assetRepository.setBookInsert(params);
    }

    private void setAssetInfoModHistory(Map<String, Object> assetInfo, Map<String, Object> params){
        assetRepository.setAstInfoModHistory(params);

        List<Map<String, Object>> historyItemModList = new ArrayList<>();
        Map<String, Object> modMap = new HashMap<>();
        Map<String, Object> searchMap = new HashMap<>();

        modMap.put("astInfoModSn", params.get("astInfoModSn"));
        modMap.put("regEmpSeq", params.get("regEmpSeq"));

        if(!StringUtils.isEmpty(params.get("astCodeCompanyId"))){
            if(!assetInfo.get("AST_CODE_COMPANY_ID").equals(params.get("astCodeCompanyId"))){
                modMap.put("modItemName", "자산소속");
                searchMap.put("astCodeCompanyId", assetInfo.get("AST_CODE_COMPANY_ID"));
                modMap.put("modOldItemInfo", assetRepository.getClassPosition(searchMap).get("AST_CP_CODE_NM"));

                searchMap.put("astCodeCompanyId", params.get("astCodeCompanyId"));
                modMap.put("modNewItemInfo", assetRepository.getClassPosition(searchMap).get("AST_CP_CODE_NM"));

                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("astTypeCode"))){
            if(!assetInfo.get("AST_TYPE_CODE").equals(params.get("astTypeCode"))){
                modMap.put("modItemName", "자산분류");

                searchMap.put("astTypeCode", assetInfo.get("AST_TYPE_CODE"));
                modMap.put("modOldItemInfo", assetRepository.getClassDivision(searchMap).get("AST_TYPE_CODE_NM"));

                searchMap.put("astTypeCode", params.get("astTypeCode"));
                modMap.put("modNewItemInfo", assetRepository.getClassDivision(searchMap).get("AST_TYPE_CODE_NM"));

                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("astCodeId1"))) {
            if (!assetInfo.get("AST_CODE_ID_1").equals(params.get("astCodeId1"))) {
                modMap.put("modItemName", "자산카테고리(대)");

                searchMap.put("astCodeId", assetInfo.get("AST_CODE_ID_1"));
                modMap.put("modOldItemInfo", assetRepository.getAstCategory(searchMap).get("AST_CODE_NM"));

                searchMap.put("astCodeId", params.get("astCodeId1"));
                modMap.put("modNewItemInfo", assetRepository.getAstCategory(searchMap).get("AST_CODE_NM"));

                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("astCodeId2"))) {
            if (!assetInfo.get("AST_CODE_ID_2").equals(params.get("astCodeId2"))) {
                /** 코드 조회 */
                modMap.put("modItemName", "자산카테고리(중)");

                searchMap.put("astUpperCode", assetInfo.get("AST_CODE_ID_1"));
                searchMap.put("astCodeId", assetInfo.get("AST_CODE_ID_2"));
                modMap.put("modOldItemInfo", assetRepository.getAstCategory(searchMap).get("AST_CODE_NM"));

                searchMap.put("astUpperCode", params.get("astCodeId1"));
                searchMap.put("astCodeId", params.get("astCodeId2"));
                modMap.put("modNewItemInfo", assetRepository.getAstCategory(searchMap).get("AST_CODE_NM"));

                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("astCodeId3"))) {
            if (!assetInfo.get("AST_CODE_ID_3").equals(params.get("astCodeId3"))) {
                /** 코드 조회 */
                modMap.put("modItemName", "자산카테고리(소)");

                searchMap.put("astUpperCode", assetInfo.get("AST_CODE_ID_2"));
                searchMap.put("astCodeId", assetInfo.get("AST_CODE_ID_3"));
                modMap.put("modOldItemInfo", assetRepository.getAstCategory(searchMap).get("AST_CODE_NM"));

                searchMap.put("astUpperCode", params.get("astCodeId2"));
                searchMap.put("astCodeId", params.get("astCodeId3"));
                modMap.put("modNewItemInfo", assetRepository.getAstCategory(searchMap).get("AST_CODE_NM"));

                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("astStsCode"))) {
            if (!assetInfo.get("AST_STS_CODE").equals(params.get("astStsCode"))) {
                /** 코드 조회 */
                modMap.put("modItemName", "자산상태");

                searchMap.put("insideMdCode", "03");

                searchMap.put("insideDtCode", assetInfo.get("AST_STS_CODE"));
                modMap.put("modOldItemInfo", assetRepository.getInsideCode(searchMap).get("INSIDE_DT_CODE_NM"));

                searchMap.put("insideDtCode", params.get("astStsCode"));
                modMap.put("modNewItemInfo", assetRepository.getInsideCode(searchMap).get("INSIDE_DT_CODE_NM"));

                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("astPlaceSn"))) {
            if (!assetInfo.get("AST_PLACE_SN").equals(params.get("astPlaceSn"))) {
                /** 코드 조회 */
                modMap.put("modItemName", "설치장소");

                searchMap.put("astPlaceSn", assetInfo.get("AST_PLACE_SN"));
                modMap.put("modOldItemInfo", assetRepository.getAssetPlace(searchMap).get("AST_PLACE_NAME"));

                searchMap.put("astPlaceSn", params.get("astPlaceSn"));
                modMap.put("modNewItemInfo", assetRepository.getAssetPlace(searchMap).get("AST_PLACE_NAME"));

                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("astName"))) {
            if (!assetInfo.get("AST_NAME").equals(params.get("astName"))) {
                modMap.put("modItemName", "자산명");
                modMap.put("modOldItemInfo", assetInfo.get("AST_NAME"));
                modMap.put("modNewItemInfo", params.get("astName"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("purcDate"))) {
            if (!assetInfo.get("PURC_DATE").equals(params.get("purcDate"))) {
                modMap.put("modItemName", "구입일자");
                modMap.put("modOldItemInfo", assetInfo.get("PURC_DATE"));
                modMap.put("modNewItemInfo", params.get("purcDate"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("purcPrice"))) {
            if (!assetInfo.get("PURC_PRICE").equals(params.get("purcPrice"))) {
                modMap.put("modItemName", "구입금액");
                modMap.put("modOldItemInfo", assetInfo.get("PURC_PRICE"));
                modMap.put("modNewItemInfo", params.get("purcPrice"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("purcCompanyId"))) {
            if (!assetInfo.get("PURC_COMPANY_ID").equals(params.get("purcCompanyId"))) {
                /** 코드 조회 (업체 미정) */
                modMap.put("modItemName", "구입업체");
                modMap.put("modOldItemInfo", assetInfo.get("PURC_COMPANY_ID"));
                modMap.put("modNewItemInfo", params.get("purcCompanyId"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("modelSize"))) {
            if (!assetInfo.get("MODEL_SIZE").equals(params.get("modelSize"))) {
                modMap.put("modItemName", "규격");
                modMap.put("modOldItemInfo", assetInfo.get("MODEL_SIZE"));
                modMap.put("modNewItemInfo", params.get("modelSize"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("modelName"))) {
            if (!assetInfo.get("MODEL_NAME").equals(params.get("modelName"))) {
                modMap.put("modItemName", "모델명");
                modMap.put("modOldItemInfo", assetInfo.get("MODEL_NAME"));
                modMap.put("modNewItemInfo", params.get("modelName"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("mfCompany"))) {
            if (!assetInfo.get("MF_COMPANY").equals(params.get("mfCompany"))) {
                modMap.put("modItemName", "제조사");
                modMap.put("modOldItemInfo", assetInfo.get("MF_COMPANY"));
                modMap.put("modNewItemInfo", params.get("mfCompany"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("orgCountry"))) {
            if (!assetInfo.get("ORG_COUNTRY").equals(params.get("orgCountry"))) {
                modMap.put("modItemName", "생산국가");
                modMap.put("modOldItemInfo", assetInfo.get("ORG_COUNTRY"));
                modMap.put("modNewItemInfo", params.get("orgCountry"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("qty"))) {
            if (!assetInfo.get("QTY").equals(params.get("qty"))) {
                modMap.put("modItemName", "구입수량");
                modMap.put("modOldItemInfo", assetInfo.get("QTY"));
                modMap.put("modNewItemInfo", params.get("qty"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("unit"))) {
            if (!assetInfo.get("UNIT").equals(params.get("unit"))) {
                modMap.put("modItemName", "구입단위");
                modMap.put("modOldItemInfo", assetInfo.get("UNIT"));
                modMap.put("modNewItemInfo", params.get("unit"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("regType"))) {
            if (!assetInfo.get("REG_TYPE").equals(params.get("regType"))) {
                modMap.put("modItemName", "등록구분");
                modMap.put("modOldItemInfo", assetInfo.get("REG_TYPE").equals("1") ? "개별등록" : "일괄등록");
                modMap.put("modNewItemInfo", params.get("regType").equals("1") ? "개별등록" : "일괄등록");
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("barcodeType"))) {
            if (!assetInfo.get("BARCODE_TYPE").equals(params.get("barcodeType"))) {
                modMap.put("modItemName", "바코드타입");
                modMap.put("modOldItemInfo", assetInfo.get("BARCODE_TYPE").equals("1") ? "대" : "소");
                modMap.put("modNewItemInfo", params.get("barcodeType").equals("1") ? "대" : "소");
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("fundingSource"))) {
            if (!assetInfo.get("FUNDING_SOURCE").equals(params.get("fundingSource"))) {
                /** 코드 조회 */
                modMap.put("modItemName", "자금출처");
                modMap.put("modOldItemInfo", assetInfo.get("FUNDING_SOURCE_TXT"));
                modMap.put("modNewItemInfo", params.get("fundingSourceText"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("expAccount"))) {
            if (!assetInfo.get("EXP_ACCOUNT").equals(params.get("expAccount"))) {
                modMap.put("modItemName", "지출계좌");
                modMap.put("modOldItemInfo", assetInfo.get("EXP_ACCOUNT"));
                modMap.put("modNewItemInfo", params.get("expAccount"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("empName"))) {
            if (!assetInfo.get("EMP_NAME").equals(params.get("empName"))) {
                modMap.put("modItemName", "사용자");
                modMap.put("modOldItemInfo", assetInfo.get("EMP_NAME"));
                modMap.put("modNewItemInfo", params.get("empName"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("purpose"))) {
            if (!assetInfo.get("PURPOSE").equals(params.get("purpose"))) {
                modMap.put("modItemName", "용도");
                modMap.put("modOldItemInfo", assetInfo.get("PURPOSE"));
                modMap.put("modNewItemInfo", params.get("purpose"));
                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("remark"))) {
            if (!assetInfo.get("REMARK").equals(params.get("remark"))) {
                modMap.put("modItemName", "비고");
                modMap.put("modOldItemInfo", assetInfo.get("REMARK"));
                modMap.put("modNewItemInfo", params.get("remark"));
                historyItemModList.add(modMap);
            }
        }

        /** 재물조사 히스토리 */
        if(!StringUtils.isEmpty(params.get("newAstPlaceSn"))) {
            if (!assetInfo.get("AST_PLACE_SN").equals(params.get("newAstPlaceSn"))) {
                modMap = new HashMap<>();
                modMap.put("astInfoModSn", params.get("astInfoModSn"));
                modMap.put("regEmpSeq", params.get("empSeq"));
                modMap.put("modItemName", "위치/재물조사");

                searchMap.put("astPlaceSn", assetInfo.get("AST_PLACE_SN"));
                modMap.put("modOldItemInfo", assetRepository.getAssetPlace(searchMap).get("AST_PLACE_NAME"));

                searchMap.put("astPlaceSn", params.get("newAstPlaceSn"));
                modMap.put("modNewItemInfo", assetRepository.getAssetPlace(searchMap).get("AST_PLACE_NAME"));

                historyItemModList.add(modMap);
            }
        }

        if(!StringUtils.isEmpty(params.get("newAstStsCode"))) {
            if (!assetInfo.get("AST_STS_CODE").equals(params.get("newAstStsCode"))) {
                modMap = new HashMap<>();
                modMap.put("astInfoModSn", params.get("astInfoModSn"));
                modMap.put("regEmpSeq", params.get("empSeq"));
                modMap.put("modItemName", "자산상태/재물조사");

                searchMap.put("insideMdCode", "03");

                searchMap.put("insideDtCode", assetInfo.get("AST_STS_CODE"));
                modMap.put("modOldItemInfo", assetRepository.getInsideCode(searchMap).get("INSIDE_DT_CODE_NM"));

                searchMap.put("insideDtCode", params.get("newAstStsCode"));
                modMap.put("modNewItemInfo", assetRepository.getInsideCode(searchMap).get("INSIDE_DT_CODE_NM"));

                historyItemModList.add(modMap);
            }
        }

        if(historyItemModList.size() > 0){
            assetRepository.setAstInfoModHistoryItem(historyItemModList);
        }else{
            assetRepository.setAstInfoModHistoryDel(params);
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    //지식재산권 리스트 삭제
    @Override
    public Map<String, Object> setRprListDelete(List<String> rprPk) {
        Map<String, Object> result = new HashMap<>();

        try {
            assetRepository.setRprListDelete(rprPk);

            result.put("code", "200");
            result.put("message", "삭제가 완료되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 중 에러가 발생했습니다.");
        }

        return result;
    }

    //지식재산권 리스트 수정 창 조회
    @Override
    public List<Map<String, Object>> getRprReceiptUpdateList(Map<String, Object> params) {
        return assetRepository.getRprReceiptUpdateList(params);
    }

}
