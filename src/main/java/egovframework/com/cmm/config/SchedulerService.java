package egovframework.com.cmm.config;

import egovframework.com.devjitsu.doc.approval.repository.ApprovalUserRepository;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.helper.exception.CommonException;
import egovframework.expend.common.helper.info.CommonInfo;
import egovframework.expend.common.helper.info.CommonInfoDAO;
import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.ResultVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("schedulerService")
public class SchedulerService {

    private static final Logger logger = LoggerFactory.getLogger(SchedulerService.class);

    @Autowired
    private ApprovalUserRepository approvalUserRepository;

    public void setAbsentStartEndUpd() {approvalUserRepository.setAbsentStartEndUpd();}

}
