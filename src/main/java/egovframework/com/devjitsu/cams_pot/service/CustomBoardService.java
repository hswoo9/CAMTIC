package egovframework.com.devjitsu.cams_pot.service;

import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface CustomBoardService {

    PagingResponse<PostResponse> getSuggestionSystemList(ArticlePage articlePage);
    Map<String, Object> getSuggestionSystem(Map<String, Object> params);
    void setSuggestionSystem(Map<String, Object> params);
    void setCustomBoardFileInit(Map<String, Object> params, MultipartFile[] mpfList, String server_dir, String base_dir);
    void setSuggestionSystemDel(Map<String, Object> params);
    List<Map<String, Object>> getScheduleList(Map<String, Object> params);
    List<Map<String, Object>> getTodayScheduleList(Map<String, Object> params);
    List<Map<String, Object>> getBoardFileInfo(Map<String, Object> params);
    void setScheduleReg(Map<String, Object> params);
    void setScheduleDel(Map<String, Object> params);
    Map<String, Object> getSchedule(Map<String, Object> params);
    PagingResponse<PostResponse> getRequestBoardList(ArticlePage articlePage);
    void setRequestBoard(Map<String, Object> params, MultipartFile[] file, String SERVER_DIR, String BASE_DIR);
    Map<String, Object> getRequestBoard(Map<String, Object> params);
    void setRequestBoardDel(Map<String, Object> params);
    void setRequestBoardStatusUpd(Map<String, Object> params);
    PagingResponse<PostResponse> getWatchBoardList(ArticlePage articlePage);
    void setWatchBoard(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR);
    void setWatchBoardViewCount(Map<String, Object> params);
    Map<String, Object> getWatchBoard(Map<String, Object> params);
    void setWatchBoardDel(Map<String, Object> params);

    Map<String, Object> getWatchBoardOne(Map<String, Object> params);

    PagingResponse<PostResponse> getMainScheduleList(ArticlePage params);

    List<Map<String, Object>> getMainScheduleList2(Map<String, Object> params);

    List<Map<String, Object>> getCustomSchedules(Map<String, Object> params);
    void setRequestBoardAdvancementFixesUpd(Map<String, Object> params);
}
