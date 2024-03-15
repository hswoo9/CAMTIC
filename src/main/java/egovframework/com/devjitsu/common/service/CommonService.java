package egovframework.com.devjitsu.common.service;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface CommonService {

    /**
     * 다운로드
     * @param fileNm
     * @param path
     * @param request
     * @param response
     * @throws Exception
     */
    void fileDownLoad(String fileNm, String path, String fileType, HttpServletRequest request, HttpServletResponse response) throws Exception;

    /**
     * KendoTreeView 조직도
     * @param deptSeq
     * @return
     */
    String ctDept(String deptSeq);

    List<Map<String, Object>> getUserList(Map<String, Object> params);

    int getUserListTotal(Map<String, Object> map);

    /**
     * 사용자별 접근 메뉴 조회
     * @param loginVO
     * @return
     */
    String getMenuFullJsonString(LoginVO loginVO);

    Map<String, Object> getContentFileOne(Map<String, Object> params);

    List<Map<String, Object>> commonCodeList(Map<String, Object> params);

    void setDeptInfo(Map<String, Object> params);
    void setDeptInfoDel(Map<String, Object> params);

    List<Map<String, Object>> teamList(Map<String, Object> params);

    List<Map<String, Object>> getSearchMenu(Map<String, Object> params);

   /* *//** 즐겨찾기 추가 *//*
    void setFavoriteMenuInsert(Map<String, Object> params);*/

    /** 즐겨찾기 리스트 */
    List<Map<String, Object>> getFvMenu(Map<String, Object> params);

    /** 즐겨찾기 카운트 조회 */
    Map<String, Object> getSearchMenuCnt(Map<String, Object> params);

    void setDelFvMenu(Map<String, Object> params);

    void getContentFileDelOne(Map<String, Object> params);

    void insFileUpload(Map<String, Object> fileParameters);

    /**
     * 부서 하나
     * @param params
     * @return
     */
    Map<String, Object> getDept(Map<String, Object> params);

    /**
     * 알림
     */
    List<Map<String, Object>> getAlarmList(Map<String, Object> params);
    void setAlarm(Map<String, Object> params);
    void setAlarmCheck(Map<String, Object> params);
    void setAlarmTopListDel(Map<String, Object> params);
    void setAlarmAllCheck(Map<String, Object> params);

    /** 암호화 */
    void setPasswordEncryption(Map<String, Object> params);
    Map<String, Object> getFileInfo(Map<String, Object> params);
    List<Map<String, Object>> getFileList(Map<String, Object> params);

    List<Map<String, Object>> getJangCodeList(Map<String, Object> params);

    List<Map<String, Object>> getGwanCodeList(Map<String, Object> params);

    List<Map<String, Object>> getHangCodeList(Map<String, Object> params);

    Map<String, Object> getJangInfo(Map<String, Object> params);

    Map<String, Object> getGwanInfo(Map<String, Object> params);


    Map<String, Object> getHangInfo(Map<String, Object> params);

    void setJangInfo(Map<String, Object> params);

    void setGwanInfo(Map<String, Object> params);

    void setHangInfo(Map<String, Object> params);

    void delBudgetCode(Map<String, Object> params);

    void insFileInfoOne(Map<String, Object> params);
}
