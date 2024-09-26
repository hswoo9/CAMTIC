package egovframework.com.devjitsu.inside.document.service;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface DocumentService {
    /**
     * 등록대장 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getDocumentList(Map<String, Object> params);

    /**
     * 수주대장 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getDocuOrderList(Map<String, Object> params);

    /**
     * 계약대장 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getDocuContractList(Map<String, Object> params);

    /**
     * 계약대장 엑셀다운 커스텀 리스트
     * @param params
     * @return
     */
    List<Map<String, Object>> getDocuContractExcelDownList(Map<String, Object> params);
    Map<String, Object> getDocuContractOne(Map<String, Object> params);

    /**
     * 식대대장 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getSnackList(Map<String, Object> params);

    /**
     * 식대대장 데이터 조회
     * @param params
     * @return
     */
    Map<String, Object> getSnackOne(Map<String, Object> params);

    /**
     * 식대대장 통계 조회
     * @param params
     * @return
     */
    Map<String, Object> getSnackStat(Map<String, Object> params);

    /**
     * 식대대장 통계 엑셀다운로드
     * @param params
     * @return
     */
    void snackListDownload(Map<String, Object> params, HttpServletResponse response) throws IOException;

    /**
     * 문서고 리스트 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getArchiveList(Map<String, Object> params);

    /**
     * 등록대장 문서등록
     * @param params
     */
    void setDocumentInsert(Map<String, Object> params);

    /**
     * 접수대장 문서등록
     * @param params
     */
    void setInComeInsert(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    /**
     * 개발사업수주대장 등록
     * @param params
     */
    void setDocuOrderInsert(Map<String, Object> params);

    /**
     * 계약대장 등록
     * @param params
     */
    void setDocuContractInsert(Map<String, Object> params, MultipartFile[] file, String serverDir, String base_dir);
    void setDocuContractDel(Map<String, Object> params);
    void setDocuContractUnlink(Map<String, Object> params);

    /**
     * 식대대장 신청
     * @param params
     */
    void setSnackInsert(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    /**
     * 식대대장 삭제
     * @param params
     */
    void setSnackDel(Map<String, Object> params);

    /**
     * 식대대장 승인요청
     * @param params
     */
    void setSnackReqCert(Map<String, Object> params);

    /**
     * 문서고 등록
     * @param params
     */
    void setArchiveInsert(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    /**
     * 문서고 등록 - 문서위치 조회
     * @param params
     */
    List<Map<String, Object>> getDocumentPlaceList(Map<String, Object> params);

    /**
     * 문서고 삭제
     * */
    Map<String, Object> setAchiveDelete(List<String> archivePk);

    /**
     * 문서고 폐기
     * */
    Map<String, Object> setAchiveScrap(List<String> archivePk);

    /**
     * 문서고 업데이트
     * */
    Map<String, Object> setArchiveUpdate(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    /**
     * 문서고 수정에 들어갈 항목 조회
     * */
    Map<String,Object> getArchiveinfoList (Map<String,Object> params);

    /** 등록대장, 접수대장 임시 삭제*/
    void delDocumentList(Map<String, Object> params);

    /** 등록대장, 접수대장 삭제 복구*/
    void delCancelDocumentList(Map<String, Object> params);

    /** 등록대장, 접수대장 최종 삭제*/
    void delFinalDocumentList(Map<String, Object> params);

    /**
     * 등록대장 문서 삭제
     */
    void setRlDelete(Map<String, Object> params);

    /**
     * 등록대장 문서Pop
     */
    Map<String, Object> getDocViewOne(Map<String, Object> params);

    /**
     * 등록대장 문서 수정
     */
    void setDocumentUpdate(Map<String, Object> params);

    /**
    * 접수대장 팝업 조회
    */
    Map<String, Object> getInComeUpdateList(Map<String, Object> params);



    /**
     * 접수대장 팝업 수정
     */
    Map<String, Object> setInComeUpdate(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);


    /*List<Map<String, Object>> getInComeUpdateFileList(Map<String, Object> params);*/
    List<Map<String, Object>> getCardList(Map<String, Object> params);
    List<Map<String, Object>> getFileListC(Map<String, Object> params);
    List<Map<String, Object>> getFileList(Map<String, Object> params);

    void updateInComeDocState(Map<String, Object> bodyMap) throws Exception;

    Map<String, Object> setInComeDocNumUpdate(Map<String, Object> params);


}
