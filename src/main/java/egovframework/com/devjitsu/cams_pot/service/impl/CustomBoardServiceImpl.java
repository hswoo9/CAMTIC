package egovframework.com.devjitsu.cams_pot.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cams_pot.repository.CustomBoardRepository;
import egovframework.com.devjitsu.cams_pot.repository.camsBoardRepository;
import egovframework.com.devjitsu.cams_pot.service.CustomBoardService;
import egovframework.com.devjitsu.cams_pot.service.camsBoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.Pagination;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import egovframework.com.devjitsu.system.repository.BoardManagementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomBoardServiceImpl implements CustomBoardService {
	
	private static final Logger logger = (Logger) LoggerFactory.getLogger(CustomBoardServiceImpl.class);

    @Autowired
    private CustomBoardRepository customBoardRepository;

    @Override
    public List<Map<String, Object>> getScheduleList(Map<String, Object> params) {
        return customBoardRepository.getScheduleList(params);
    }

    @Override
    public void setScheduleReg(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("scheduleBoardId"))){
            customBoardRepository.setScheduleReg(params);
        }else{
            customBoardRepository.setScheduleRegUpd(params);
        }
    }

    @Override
    public Map<String, Object> getSchedule(Map<String, Object> params) {
        return customBoardRepository.getSchedule(params);
    }
}