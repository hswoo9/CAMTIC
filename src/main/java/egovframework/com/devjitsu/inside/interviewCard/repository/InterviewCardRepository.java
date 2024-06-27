package egovframework.com.devjitsu.inside.interviewCard.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class InterviewCardRepository extends AbstractDAO {
    public void setInterviewTitle(Map<String, Object> params) { insert("employInterviewCard.setInterviewTitle", params);}

    public List<Map<String, Object>> getTopicList(Map<String, Object> params) {
        return selectList("employInterviewCard.getTopicList", params);
    }

    public void setInterviewContent(Map<String, Object> params) {insert("employInterviewCard.setInterviewContent", params);}

    public void setInterviewContent2(Map<String, Object> params) {update("employInterviewCard.setInterviewContent2", params);}

    public List<Map<String, Object>> getInterviewCardList(Map<String, Object> params){
        System.out.println("------------------------------컨트롤러 탔다 --------------------------------------------------");
        return selectList("employInterviewCard.getInterviewCardList", params);
    }

    public List<Map<String, Object>> getInterviewDetail(Map<String, Object> params){
        return selectList("employInterviewCard.getInterviewDetail", params);
    }

    public List<Map<String, Object>> getInterviewCardByEmpSeq(Map<String, Object> params){
        return selectList("employInterviewCard.getInterviewCardByEmpSeq", params);
    }
}
