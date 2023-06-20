package egovframework.com.devjitsu.inside.asset.service;

import java.util.List;
import java.util.Map;

public interface AssetService {

    //장비관리 팝업창 (관리자) - 장비등록
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
}
