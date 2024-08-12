package egovframework.com.cmm.config;

import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_manager.service.KukgohService;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.doc.approval.repository.ApprovalUserRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.inside.history.repository.HistoryRepository;
import egovframework.com.devjitsu.inside.history.service.HistoryService;
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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service("schedulerService")
public class SchedulerService {

    private static final Logger logger = LoggerFactory.getLogger(SchedulerService.class);

    @Autowired
    private ApprovalUserRepository approvalUserRepository;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private ManageRepository manageRepository;

    @Autowired
    private PayAppService payAppService;

    @Autowired
    private KukgohService kukgohService;

    public void setAbsentStartEndUpd() {approvalUserRepository.setAbsentStartEndUpd();}

    public void etaxG20Scheduler() {
        Date date = new Date();
        String strDate = "";
        String endDate = "";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        String nowDate = simpleDateFormat.format(date);

        LocalDate localDate = LocalDate.parse(nowDate);
        LocalDate firstDate = localDate.withDayOfMonth(1);
        LocalDate lastDate = localDate.withDayOfMonth(localDate.lengthOfMonth());

        strDate = firstDate.toString();
        endDate = lastDate.toString();

        Map<String, Object> params = new HashMap<>();

        params.put("strDate", strDate);
        params.put("endDate", endDate);

        List<Map<String, Object>> list = new ArrayList<>();
        list = g20Repository.getEtaxDb(params);

        if(list.size() > 0){
            manageRepository.delDjEtax(params);
            manageRepository.insDjEtaxUp(list);
        }
    }

    public void exnpApproveStatChangeSheduler(){
        List<Map<String, Object>> list = manageRepository.getApproveExnpList();

        for(Map<String, Object> map : list){
            Map<String, Object> params = new HashMap<>();
            params.put("regEmpSeq", map.get("REG_EMP_SEQ"));
            params.put("empSeq", map.get("EMP_SEQ"));
            params.put("exnpSn", map.get("EXNP_SN"));
            params.put("exnpG20Stat", 'Y');

            payAppService.resolutionExnpAppr(params);
        }
    }

    public void appointmentEmpInfoUpd(){
        Map<String, Object> params = new HashMap<>();
        historyService.appointmentEmpInfoUpd(params);
    }

    public void enaraCall(){
        for(Map<String, Object> map : kukgohService.getEnaraTempList()){
            kukgohService.EnaraCall(map);
        }
    }
}
