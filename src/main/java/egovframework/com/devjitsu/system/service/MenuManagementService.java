package egovframework.com.devjitsu.system.service;

import java.util.List;
import java.util.Map;

public interface MenuManagementService {

    /**
     * 메뉴 데이터 조정
     * @param params
     */
    void setMenuPathUpd(Map<String, Object> params);

    /**
     * 전체 메뉴 treeView 구조화 Select
     * @return
     */
    String getStringMenuList(Map<String, Object> params);

    /**
     * ListMap 형식 메뉴 Select
     * @return
     */
    List<Map<String, Object>> getMenuList(Map<String, Object> params);

    /**
     * 메뉴 저장/수정
     * @param params
     */
    void setMenu(Map<String, Object> params);

    /**
     * 메뉴 삭제
     * @param params
     */
    void setMenuDel(Map<String, Object> params);

    /**
     * 메뉴 권한 그룹 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getMenuAuthorityGroupList(Map<String, Object> params);

    /**
     * 메뉴 권한그룹(접근허용 메뉴) 조회
     * @param params
     * @return
     */
    Map<String, Object> getMenuAuthorityGroup(Map<String, Object> params);

    /**
     * 메뉴 권한 그룹 삭제
     * @param agiAr
     */
    void setMenuAuthorityGroupDel(List<String> agiAr);

    /**
     * 메뉴 권한 그룹(접근허용 메뉴) 저장/수정
     * @param params
     */
    void setMenuAuthorityGroup(Map<String, Object> params);

    /**
     * 메뉴 권한 그룹별 사용자 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getAuthorityGroupUserList(Map<String, Object> params);

    /**
     * 메뉴 권한 그룹 사용자 추가
     * @param params
     */
    void setAuthorityGroupUser(Map<String, Object> params);

    /**
     * 메뉴 권한 그룹 사용자 삭제
     * @param params
     */
    void setAuthorityGroupUserDel(List<String> aguAr);

    /**
     * ListMap 형식 메뉴 Select
     * @return
     */
    List<Map<String, Object>> getRequestBoardMenuList(Map<String, Object> params);
}
