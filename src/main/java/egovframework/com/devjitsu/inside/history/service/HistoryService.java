package egovframework.com.devjitsu.inside.history.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface HistoryService {

    /**
     * 발령조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getHistoryList(Map<String, Object> params);
    List<Map<String, Object>> getHistoryListAdmin(Map<String, Object> params);

    /**
     * 발령조회(수정팝업)
     * @param params
     * @return
     */
    List<Map<String, Object>> getUpdHistoryList(Map<String, Object> params);

    /**
     * 포상조회(수정팝업)
     * @param params
     * @return
     */
    List<Map<String, Object>> getUpdRewardList(Map<String, Object> params);

    /**
     * 발령 단일조회
     * @param params
     * @return
     */
    Map<String, Object> getHistoryOne(Map<String, Object> params);

    /**
     * 포상조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getRewardList(Map<String, Object> params);

    /**
     * 발령등록
     * @param params
     */
    void setHistoryInsert(Map<String, Object> params, String base_dir);

    /**
     * 발령수정
     * @param params
     */
    void setHistoryUpdate(Map<String, Object> params);

    void setHistoryDelete(Map<String, Object> params);

    /**
     * 포상등록
     * @param params
     */
    //void setRewardInsert(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);
    void setRewardInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir);

    void setRewardDelete(Map<String, Object> params);

    void modAf(Map<String, Object> params);

    void setTmpActiveUpdate(Map<String, Object> params);

    void appointmentEmpInfoUpd(Map<String, Object> params);
}
