package egovframework.com.devjitsu.cams_pot.service;

import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface CustomBoardService {

    List<Map<String, Object>> getScheduleList(Map<String, Object> params);
    void setScheduleReg(Map<String, Object> params);
    Map<String, Object> getSchedule(Map<String, Object> params);
}
