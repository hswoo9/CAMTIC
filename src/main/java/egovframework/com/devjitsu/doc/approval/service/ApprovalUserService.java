package egovframework.com.devjitsu.doc.approval.service;

import java.util.List;
import java.util.Map;

public interface ApprovalUserService {

    /**
     * KendoTreeView 양식목록
     * @return
     */
    String getDraftFormList(Map<String, Object> params);

    /**
     * 사용자 문서별 리스트(열람문서 제외)
     * @param params
     * @return
     */
    List<Map<String, Object>> getUserDocStorageBoxList(Map<String, Object> params);

    /**
     * 사용자 문서별 리스트(열람문서)
     * @param params
     * @return
     */
    List<Map<String, Object>> getUserReadDocStorageBoxList(Map<String, Object> params);

    /**
     * 문서 삭제  (임시보관문서)
     * @param params
     */
    void setCheckedDocDel (Map<String, Object> params);
    void setDocDel (Map<String, Object> params);

    /** 결재함 */

    /**
     * 결재함 상태별 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getApproveDocBoxList(Map<String, Object> params);

    /**
     * 나의 즐겨찾기 결재선 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getUserFavApproveRouteList(Map<String, Object> params);

    /**
     * 즐겨찾기 결재선 저장
     * @param params
     * @return
     */
    Map<String, Object> setUserFavApproveRoute(Map<String, Object> params);

    /**
     * 나의 즐겨찾기 결재선 삭제
     * @param params
     * @return
     */
    Map<String, Object> setUserFavApproveRouteActiveN(Map<String, Object> params);

    /**
     * 나의 즐겨찾기 결재선 상세 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getUserFavApproveRouteDetail(Map<String, Object> params);

    /**
     * 부재설정 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getAbsentSetList(Map<String, Object> params);

    /**
     * 부재정보 중복체크
     * @param params
     * @return
     */
    Map<String, Object> getAbsentDuplicate(Map<String, Object> params);

    /**
     * 부재정보 등록
     * @param params
     * @return
     */
    void setAbsentInfo(Map<String, Object> params);

    /**
     * 부재정보 업데이트
     * @param params
     */
    int setAbsentInfoUpd(Map<String, Object> params);

    List<Map<String, Object>> getApprovalDocSearchList(Map<String, Object> params);

    /**
     * 메인페이지 사용자 상신문서 (결재상태 상신,재상신 데이터만)
     * @param params
     * @return
     */
    List<Map<String, Object>> getMainUserDocStorageBoxList(Map<String, Object> params);

    List<Map<String, Object>> getApproveDocBoxListMobile(Map<String, Object> params);

    List<Map<String, Object>> getMainUserDocStorageBoxListMobile(Map<String, Object> params);

    List<Map<String, Object>> getUserDocStorageBoxListMobile(Map<String, Object> params);
}
