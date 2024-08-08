package egovframework.com.devjitsu.inside.asset.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface AssetService {

    /** 자산관리 - 자산리스트 */
    List<Map<String, Object>> getAssetList(Map<String, Object> params);
    List<Map<String, Object>> getInsideCodeList(Map<String, Object> params);
    void setAssetInfo(Map<String, Object> params, MultipartHttpServletRequest request, MultipartFile[] file, String server_dir, String base_dir);
    void setAssetDel(Map<String, Object> params);
    Map<String, Object> getAssetInfo(Map<String, Object> params);
    Map<String, Object> getAssetInfoAll(Map<String, Object> params);
    Map<String, Object> getAstManage();
    void setAstOtherHistory(Map<String, Object> params);
    void setAstManage(Map<String, Object> params);
    void setAstInfoBatch(Map<String, Object> params);

    /** 프로젝트 리스트 */
    List<Map<String,Object>> getPjtList(Map<String,Object> params);
    /** 분류관리 */
    List<Map<String,Object>> getClassPositionList(Map<String,Object> map);
    Map<String, Object> getClassPosition(Map<String, Object> params);
    List<Map<String,Object>> getClassDivisionList(Map<String,Object> map);
    List<Map<String,Object>> getAstCategoryList(Map<String, Object> params);
    Map<String, Object> getAstCategory(Map<String, Object> params);
    void setCategoryCode(Map<String, Object> params);
    void getAstCategoryDel(Map<String, Object> params);

    /** */
    void setEquipmentInsert(Map<String, Object> params);

    //공통코드 - 장비관리구분 조회
    List<Map<String, Object>> getEqipmnList(Map<String, Object> params);

    //장비등록 목록 조회
    List<Map<String, Object>> getEqipmnRegList(Map<String, Object> params);

    //장비등록 목록 삭제
    Map<String, Object> setEquipmentDelete(List<String> eqmnPk);

    //장비등록 목록 업데이트
    Map<String, Object> setEquipmentUpdate(Map<String, Object> params);

    //장비관리 팝업창 - 장비사용 등록
    void setEquipmentUseInsert(Map<String, Object> params);

    //장비사용 등록 - 장비명 조회
    List<Map<String, Object>> getEqipmnNameList(Map<String, Object> params);

    //장비사용 등록 - 업체구분 조회
    List<Map<String, Object>> getPrtpcoGbnNameList(Map<String, Object> params);

    //장비사용 등록 - 사용자로 장비 조회
    Map<String, Object> getEqipmnOne(Map<String, Object> param);

    List<Map<String,Object>> getAssetMdCodeList(Map<String,Object> map);
    List<Map<String,Object>> getAssetDtCodeList(Map<String,Object> map);


    /** PDA 연동 */
    List<Map<String, Object>> getAstPdaInfoList(Map<String, Object> params);
    void setAstPdaInfoBatch(Map<String, Object> params);
    void getAssetListToPdaList(Map<String, Object> params);
    Map<String, Object> getAstPdaInfo(Map<String, Object> params);
    void updInspectionType(Map<String, Object> params);
    void setAstPdaOptInspection(Map<String, Object> params);
    void setAssetInspectionUpload(Map<String, Object> params);
    void setAppApkDownLoad(HttpServletRequest request, HttpServletResponse response);


    /** 지식재산권 */
    Map<String, Object> getInventionInfo(Map<String, Object> params);
    List<Map<String, Object>> getInventionShareList(Map<String, Object> params);
    List<Map<String, Object>> getRprReceiptList(Map<String, Object> params);
    List<Map<String, Object>> getIPList(Map<String, Object> params);

    void setInventionInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir);

    void setRprResultInsert(Map<String, Object> params);
    void setRprReceiptInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir);
    void updateDocState(Map<String, Object> bodyMap) throws Exception;


    //장비사용 목록 조회
    List<Map<String, Object>> getEqipmnUseList(Map<String, Object> params);
    List<Map<String, Object>> getEqipmnUseListByPjt(Map<String, Object> params);

    //장비사용 목록 삭제
    Map<String, Object> setEquipmenUseDelete(List<String> eqmnUsePk);

    //장비사용 목록 업데이트
    Map<String, Object> setEquipmenUseUpdate(Map<String, Object> params);

    //장비사용 등록 수정 창 조회
    List<Map<String, Object>> getEqipmnUseUpdateList(Map<String, Object> params);

    List<Map<String,Object>> getAssetPlaceList();

    //장비사용 마감
    Map<String, Object> setEquipmenUseEndStat(List<String> eqmnUsePk);

    //장비사용 마감취소
    //Map<String, Object> setEquipmenUseEndStatCancel(List<String> eqmnUsePk);

    void setAssetCodePosition(Map<String,Object> map);
    void setAssetCodePositionDel(Map<String, Object> params);
    Map<String, Object> getClassDivision(Map<String, Object> params);
    void  setClassDivision(Map<String,Object> params);
    void  setClassDivisionDel(Map<String,Object> params);
    Map<String, Object> getAssetPlace(Map<String, Object> params);
    void setAssetPlace(Map<String,Object> map);
    void setAssetPlaceDel(Map<String,Object> map);
    Map<String,Object> getCategoryMonthly(Map<String, Object> params);
    List<Map<String,Object>> getLGCategoryMonthly(Map<String, Object> params);
    List<Map<String,Object>> getMDCategoryMonthly(Map<String, Object> params);


    //
    List<Map<String,Object>> getBookList(Map<String, Object> params);

    //도서등록
    void setBookInsert(Map<String, Object> params);

    //지식재산권 리스트 삭제
    Map<String, Object> setRprListDelete(List<String> rprPk);

    //지식재산권 리스트 수정 창 조회
    List<Map<String, Object>> getRprReceiptUpdateList(Map<String, Object> params);

    /** 지식재산권 수정 */
    void updRprReceipt(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir);

    /** 지식재산권 일괄변경 */
    void updRprAllChange(Map<String, Object> params);

    /** 장비 전자결재 */
    List<Map<String,Object>> getEquipApprovalData(Map<String, Object> params);
    List<Map<String, Object>> getEquipApprovalInfo(Map<String, Object> params);
    void setEquipApprovalInfo(Map<String, Object> params);
    void updateEquipDocState(Map<String, Object> bodyMap) throws Exception;

    /** 장비 통계 */
    Map<String, Object> getEquipStat(Map<String, Object> params);
    List<Map<String, Object>> getEquipStatRear(Map<String, Object> params);

    Map<String, Object> getData(Map<String, Object> params);

    void setBookDelete(Map<String, Object> params);

    void setBookCode(Map<String, Object> params);

    List<Map<String, Object>> getMdCode(Map<String, Object> params);

    List<Map<String, Object>> getCode(Map<String, Object> params);

    Map<String, Object> getBookInfoOne(Map<String, Object> params);

    void setBookImg(Map<String, Object> params);

    Map<String, Object> getApprovalData(Map<String, Object> params);

    void delBookCode(Map<String, Object> params);


    List<Map<String, Object>> getClassCtgAList(Map<String, Object> params);

    List<Map<String, Object>> getClassCtgBList(Map<String, Object> params);

    void insQrCodeSet(Map<String, Object> params);

    int cntQrCodeGroup(Map<String, Object> params);

    void insFileInfo(Map<String, Object> fileInfo);

    void updQrFileSn(Map<String, Object> params);

    Map<String, Object> getastData(Map<String, Object> params);

    Map<String, Object> getastprint(Map<String, Object> params);

    Map<String, Object> getAssetPdaInfo(Map<String, Object> params);
}
