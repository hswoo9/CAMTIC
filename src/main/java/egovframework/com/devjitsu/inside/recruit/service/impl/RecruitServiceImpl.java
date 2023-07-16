package egovframework.com.devjitsu.inside.recruit.service.impl;

import egovframework.com.devjitsu.inside.recruit.repository.RecruitRepository;
import egovframework.com.devjitsu.inside.recruit.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RecruitServiceImpl implements RecruitService {
    @Autowired
    private RecruitRepository recruitRepository;

    @Override
    public Map<String, Object> getRecruitNum(){
        return recruitRepository.getRecruitNum();
    }
}
