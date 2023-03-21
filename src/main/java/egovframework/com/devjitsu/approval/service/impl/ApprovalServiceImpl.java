package egovframework.com.devjitsu.approval.service.impl;

import egovframework.com.devjitsu.approval.repository.ApprovalRepository;
import egovframework.com.devjitsu.approval.service.ApprovalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ApprovalServiceImpl implements ApprovalService {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalServiceImpl.class);

    @Autowired
    private ApprovalRepository approvalRepository;

    @Override
    public Map<String, Object> getLinkageProcessDocInterlock(Map<String, Object> params) {
        return approvalRepository.getLinkageProcessDocInterlock(params);
    }


}
