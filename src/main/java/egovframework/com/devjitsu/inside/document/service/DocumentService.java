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
     * 개발사업수주대장 등록
     * @param params
     */
    void setDocuOrderInsert(Map<String, Object> params);

    /**
     * 계약대장 등록
     * @param params
     */
    void setDocuContractInsert(Map<String, Object> params, String base_dir);

    /**
     * 식대대장 신청
     * @param params
     */
    void setSnackInsert(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

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

}
