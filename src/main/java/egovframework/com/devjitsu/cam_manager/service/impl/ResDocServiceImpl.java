package egovframework.com.devjitsu.cam_manager.service.impl;

import egovframework.com.devjitsu.cam_manager.repository.ResDocRepository;
import egovframework.com.devjitsu.cam_manager.service.ResDocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResDocServiceImpl implements ResDocService {

    @Autowired
    private ResDocRepository resDocRepository;
}
