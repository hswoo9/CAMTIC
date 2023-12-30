package egovframework.com.cmm.config;

import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.doc.approval.repository.ApprovalUserRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
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

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private ManageRepository manageRepository;

    public void setAbsentStartEndUpd() {approvalUserRepository.setAbsentStartEndUpd();}

    public void etaxG20Scheduler() {
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        Map<String, Object> params = new HashMap<>();
        params.put("date", simpleDateFormat.format(date));

        List<Map<String, Object>> list = new ArrayList<>();
        list = g20Repository.getEtaxDb(params);

        manageRepository.delDjEtax(params);
        manageRepository.insDjEtaxUp(list);
    }

}
