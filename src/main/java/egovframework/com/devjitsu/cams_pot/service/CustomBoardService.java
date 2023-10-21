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
    void setSuggestionSystemDel(Map<String, Object> parmas);
    List<Map<String, Object>> getScheduleList(Map<String, Object> params);
    void setScheduleReg(Map<String, Object> params);
    Map<String, Object> getSchedule(Map<String, Object> params);
}
