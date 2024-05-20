package egovframework.com.cms.bannerpopup.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BannerPopupMngrService {

    /** 배너관리 | 팝업관리 리스트 조회 **/
    List<Map<String, Object>> getPopupList(Map<String, Object> params);
    /** 메인페이지 팝업 리스트 조회 **/
    List<Map<String, Object>> getMainPopupList();
    /** 오픈할 팝업 조회 **/
    Map<String, Object> getBannerPopupOpenOne(Map<String, Object> param);
    /** 팝업 관리 수정 페이지 데이터 조회 **/
    Map<String, Object> getBannerPopupOne(Map<String, Object> params);
    /** 팝업 관리 수정 페이지 파일 데이터 조회 **/
    Map<String, Object> getBannerPopupFile(Map<String, Object> params);
    void setBannerPopupInsert(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);
    void setBannerPopupDelete(Map<String, Object> param);
    List<Map<String, Object>> getPopupCancleList();
    List<Map<String, Object>> getPopupAgreeList();
    void setPopupCancleUpdate(Map<String, Object> param);
    void setPopupAgreeUpdate(Map<String, Object> param);
}
