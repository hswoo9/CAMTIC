package egovframework.com.devjitsu.subHoliday.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.subHoliday.repository.SubHolidayRepository;
import egovframework.com.devjitsu.subHoliday.service.SubHolidayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubHolidayServiceImpl implements SubHolidayService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(SubHolidayServiceImpl.class);

    @Autowired
    private SubHolidayRepository subHolidayRepository;

    @Override
    @Transactional
    public void setVacUseHist(Map<String, Object> params) {
        if(params.containsKey("vacUseHistId")){
            subHolidayRepository.updateVacUseHist(params);
        }else{
            if(params.containsKey("checkUseYn")){
                subHolidayRepository.setVacUseHist(params);
                subHolidayRepository.updateVacUseHistWork(params);
            }else {
                subHolidayRepository.setVacUseHist(params);
            }
        }
    }

    @Override
    public List<Map<String, Object>> getVacCodeList(Map<String, Object> params) {
        return subHolidayRepository.getVacCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getVacUseHistoryList(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryList(params);
    }

    @Override
    public List<Map<String, Object>> getVacUseHistoryWorkList(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryWorkList(params);
    }

    @Override
    public int getVacUseHistoryListTotal(Map<String, Object> params) {
        return subHolidayRepository.getVacUseHistoryListTotal(params);
    }

    @Override
    public List<Map<String, Object>> getUserVacList(Map<String, Object> params) {
        return subHolidayRepository.getUserVacList(params);
    }

    @Override
    public List<Map<String, Object>> getUserVacListStat(Map<String, Object> params) {
        return subHolidayRepository.getUserVacListStat(params);
    }

}
