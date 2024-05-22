package egovframework.com.devjitsu.cam_achieve.service.impl;

import egovframework.com.devjitsu.cam_achieve.repository.AchieveRepository;
import egovframework.com.devjitsu.cam_achieve.service.AchieveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
public class AchieveServiceImpl implements AchieveService {

    @Autowired
    private AchieveRepository achieveRepository;

    @Override
    public Map<String, Object> getAllPjtCalc(Map<String, Object> params) {
        return achieveRepository.getAllPjtCalc(params);
    }
}
