package egovframework.com.devjitsu.inside.interviewCard.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface InterviewCardService {
    void setInterviewTitle (Map<String, Object> params);

    /**
     * 면담 주제 조회
     * @param params
     * @return
     */
    List<Map<String, Object>> getTopicList(Map<String, Object> params);

    void setInterviewContent(Map<String, Object> params);

    void setInterviewContent2(Map<String, Object> params);

    List<Map<String, Object>> getInterviewCardList(Map<String, Object> params);

    List<Map<String, Object>> getInterviewDetail(Map<String, Object> params);

    List<Map<String, Object>> getInterviewCardByEmpSeq(Map<String, Object> params);
}
