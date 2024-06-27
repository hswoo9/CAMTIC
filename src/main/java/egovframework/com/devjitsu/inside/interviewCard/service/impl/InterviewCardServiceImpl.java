package egovframework.com.devjitsu.inside.interviewCard.service.impl;

import egovframework.com.devjitsu.inside.interviewCard.repository.InterviewCardRepository;
import egovframework.com.devjitsu.inside.interviewCard.service.InterviewCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InterviewCardServiceImpl implements InterviewCardService {
    @Autowired
    private InterviewCardRepository interviewCardRepository;

    @Override
    public void setInterviewTitle(Map<String, Object> params) {
        interviewCardRepository.setInterviewTitle(params);
    }

    @Override
    public List<Map<String, Object>> getTopicList(Map<String, Object> params) {
        return interviewCardRepository.getTopicList(params);
    }

    @Override
    public void setInterviewContent(Map<String, Object> params){
        interviewCardRepository.setInterviewContent(params);
    }

    @Override
    public void setInterviewContent2(Map<String, Object> params){
        interviewCardRepository.setInterviewContent2(params);
    }

    @Override
    public List<Map<String, Object>> getInterviewCardList(Map<String, Object> params){
        System.out.println("------------------------------컨트롤러 탔다 --------------------------------------------------");
        return interviewCardRepository.getInterviewCardList(params);
    }

    @Override
    public List<Map<String, Object>> getInterviewDetail(Map<String, Object> params) {
        return interviewCardRepository.getInterviewDetail(params);
    }

    @Override
    public List<Map<String, Object>> getInterviewCardByEmpSeq(Map<String, Object> params){
        return interviewCardRepository.getInterviewCardByEmpSeq(params);
    }
}
